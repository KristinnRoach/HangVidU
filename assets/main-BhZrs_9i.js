(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const Tm="modulepreload",Im=function(t){return"/HangVidU/"+t},Dl={},Je=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=Im(l),l in Dl)return;Dl[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Tm,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,D=globalThis,sn="10.26.0";function Ns(){return Ls(D),D}function Ls(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||sn,e[sn]=e[sn]||{}}function ei(t,e,n=D){const i=n.__SENTRY__=n.__SENTRY__||{},r=i[sn]=i[sn]||{};return r[t]||(r[t]=e())}const km=["debug","info","warn","error","log","assert","trace"],Rm="Sentry Logger ",Xr={};function ti(t){if(!("console"in D))return t();const e=D.console,n={},i=Object.keys(Xr);i.forEach(r=>{const s=Xr[r];n[r]=e[r],e[r]=s});try{return t()}finally{i.forEach(r=>{e[r]=n[r]})}}function Am(){Ga().enabled=!0}function Pm(){Ga().enabled=!1}function lh(){return Ga().enabled}function Nm(...t){za("log",...t)}function Lm(...t){za("warn",...t)}function Om(...t){za("error",...t)}function za(t,...e){C&&lh()&&ti(()=>{D.console[t](`${Rm}[${t}]:`,...e)})}function Ga(){return C?ei("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const b={enable:Am,disable:Pm,isEnabled:lh,log:Nm,warn:Lm,error:Om},uh=50,cn="?",Ml=/\(error: (.*)\)/,xl=/captureMessage|captureException/;function dh(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,r=0)=>{const s=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Ml.test(c)?c.replace(Ml,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){s.push(d);break}}if(s.length>=uh+r)break}}return Mm(s.slice(r))}}function Dm(t){return Array.isArray(t)?dh(...t):t}function Mm(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Tr(e).function||"")&&e.pop(),e.reverse(),xl.test(Tr(e).function||"")&&(e.pop(),xl.test(Tr(e).function||"")&&e.pop()),e.slice(0,uh).map(n=>({...n,filename:n.filename||Tr(e).filename,function:n.function||cn}))}function Tr(t){return t[t.length-1]||{}}const fo="<anonymous>";function Ft(t){try{return!t||typeof t!="function"?fo:t.name||fo}catch{return fo}}function Fl(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function hh(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Fr={},Ul={};function vn(t,e){Fr[t]=Fr[t]||[],Fr[t].push(e)}function wn(t,e){if(!Ul[t]){Ul[t]=!0;try{e()}catch(n){C&&b.error(`Error while instrumenting ${t}`,n)}}}function He(t,e){const n=t&&Fr[t];if(n)for(const i of n)try{i(e)}catch(r){C&&b.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Ft(i)}
Error:`,r)}}let po=null;function xm(t){const e="error";vn(e,t),wn(e,Fm)}function Fm(){po=D.onerror,D.onerror=function(t,e,n,i,r){return He("error",{column:i,error:r,line:n,msg:t,url:e}),po?po.apply(this,arguments):!1},D.onerror.__SENTRY_INSTRUMENTED__=!0}let go=null;function Um(t){const e="unhandledrejection";vn(e,t),wn(e,$m)}function $m(){go=D.onunhandledrejection,D.onunhandledrejection=function(t){return He("unhandledrejection",t),go?go.apply(this,arguments):!0},D.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const fh=Object.prototype.toString;function qa(t){switch(fh.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Ut(t,Error)}}function ni(t,e){return fh.call(t)===`[object ${e}]`}function ph(t){return ni(t,"ErrorEvent")}function $l(t){return ni(t,"DOMError")}function Bm(t){return ni(t,"DOMException")}function ut(t){return ni(t,"String")}function Ya(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Os(t){return t===null||Ya(t)||typeof t!="object"&&typeof t!="function"}function Wi(t){return ni(t,"Object")}function Ds(t){return typeof Event<"u"&&Ut(t,Event)}function Hm(t){return typeof Element<"u"&&Ut(t,Element)}function Wm(t){return ni(t,"RegExp")}function or(t){return!!(t?.then&&typeof t.then=="function")}function Vm(t){return Wi(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Ut(t,e){try{return t instanceof e}catch{return!1}}function gh(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function jm(t){return typeof Request<"u"&&Ut(t,Request)}const Ka=D,zm=80;function mh(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,r=[];let s=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||zm;for(;n&&s++<i&&(l=Gm(n,u),!(l==="html"||s>1&&o+r.length*c+l.length>=d));)r.push(l),o+=l.length,n=n.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function Gm(t,e){const n=t,i=[];if(!n?.tagName)return"";if(Ka.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const r=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(r?.length)r.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&ut(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const s=["aria-label","type","name","title","alt"];for(const o of s){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function Ja(){try{return Ka.document.location.href}catch{return""}}function qm(t){if(!Ka.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Ie(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const r=n(i);typeof r=="function"&&_h(r,i);try{t[e]=r}catch{C&&b.log(`Failed to replace method "${e}" in object`,t)}}function ln(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&b.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function _h(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,ln(t,"__sentry_original__",e)}catch{}}function Xa(t){return t.__sentry_original__}function yh(t){if(qa(t))return{message:t.message,name:t.name,stack:t.stack,...Hl(t)};if(Ds(t)){const e={type:t.type,target:Bl(t.target),currentTarget:Bl(t.currentTarget),...Hl(t)};return typeof CustomEvent<"u"&&Ut(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Bl(t){try{return Hm(t)?mh(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Hl(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function Ym(t){const e=Object.keys(yh(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function Eh(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Wl(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const r=t[i];try{gh(r)?n.push(hh(r)):n.push(String(r))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Ur(t,e,n=!1){return ut(t)?Wm(e)?e.test(t):ut(e)?n?t===e:t.includes(e):!1:!1}function Ms(t,e=[],n=!1){return e.some(i=>Ur(t,i,n))}function Km(){const t=D;return t.crypto||t.msCrypto}let mo;function Jm(){return Math.random()*16}function Ne(t=Km()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return mo||(mo="10000000100040008000"+1e11),mo.replace(/[018]/g,e=>(e^(Jm()&15)>>e/4).toString(16))}function vh(t){return t.exception?.values?.[0]}function Zt(t){const{message:e,event_id:n}=t;if(e)return e;const i=vh(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function Go(t,e,n){const i=t.exception=t.exception||{},r=i.values=i.values||[],s=r[0]=r[0]||{};s.value||(s.value=e||""),s.type||(s.type="Error")}function Hn(t,e){const n=vh(t);if(!n)return;const i={type:"generic",handled:!0},r=n.mechanism;if(n.mechanism={...i,...r,...e},e&&"data"in e){const s={...r?.data,...e.data};n.mechanism.data=s}}function Vl(t){if(Xm(t))return!0;try{ln(t,"__sentry_captured__",!0)}catch{}return!1}function Xm(t){try{return t.__sentry_captured__}catch{}}const wh=1e3;function ar(){return Date.now()/wh}function Qm(){const{performance:t}=D;if(!t?.now||!t.timeOrigin)return ar;const e=t.timeOrigin;return()=>(e+t.now())/wh}let jl;function dt(){return(jl??(jl=Qm()))()}function Zm(t){const e=dt(),n={sid:Ne(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>t_(n)};return t&&Wn(n,t),n}function Wn(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||dt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Ne()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function e_(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Wn(t,n)}function t_(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function cr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(i[r]=cr(i[r],e[r],n-1));return i}function zl(){return Ne()}function bh(){return Ne().substring(16)}const qo="_sentrySpan";function Gl(t,e){e?ln(t,qo,e):delete t[qo]}function ql(t){return t[qo]}const n_=100;class pt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:zl(),sampleRand:Math.random()}}clone(){const e=new pt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Gl(e,ql(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Wn(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof pt?n.getScopeData():Wi(n)?e:void 0,{tags:r,extra:s,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=i||{};return this._tags={...this._tags,...r},this._extra={...this._extra,...s},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Gl(this,void 0),this._attachments=[],this.setPropagationContext({traceId:zl(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:n_;if(i<=0)return this;const r={timestamp:ar(),...e,message:e.message?Eh(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ql(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=cr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||Ne();if(!this._client)return C&&b.warn("No client configured on scope - will not capture exception!"),i;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...n,event_id:i},this),i}captureMessage(e,n,i){const r=i?.event_id||Ne();if(!this._client)return C&&b.warn("No client configured on scope - will not capture message!"),r;const s=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:s,...i,event_id:r},this),r}captureEvent(e,n){const i=n?.event_id||Ne();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(C&&b.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function i_(){return ei("defaultCurrentScope",()=>new pt)}function r_(){return ei("defaultIsolationScope",()=>new pt)}class s_{constructor(e,n){let i;e?i=e:i=new pt;let r;n?r=n:r=new pt,this._stack=[{scope:i}],this._isolationScope=r}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(r){throw this._popScope(),r}return or(i)?i.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Vn(){const t=Ns(),e=Ls(t);return e.stack=e.stack||new s_(i_(),r_())}function o_(t){return Vn().withScope(t)}function a_(t,e){const n=Vn();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Yl(t){return Vn().withScope(()=>t(Vn().getIsolationScope()))}function c_(){return{withIsolationScope:Yl,withScope:o_,withSetScope:a_,withSetIsolationScope:(t,e)=>Yl(e),getCurrentScope:()=>Vn().getScope(),getIsolationScope:()=>Vn().getIsolationScope()}}function Qa(t){const e=Ls(t);return e.acs?e.acs:c_()}function jt(){const t=Ns();return Qa(t).getCurrentScope()}function lr(){const t=Ns();return Qa(t).getIsolationScope()}function l_(){return ei("globalScope",()=>new pt)}function u_(...t){const e=Ns(),n=Qa(e);if(t.length===2){const[i,r]=t;return i?n.withSetScope(i,r):n.withScope(r)}return n.withScope(t[0])}function Ee(){return jt().getClient()}function d_(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:r}=e,s={trace_id:n,span_id:r||bh()};return i&&(s.parent_span_id=i),s}const h_="sentry.source",f_="sentry.sample_rate",p_="sentry.previous_trace_sample_rate",g_="sentry.op",m_="sentry.origin",Sh="sentry.profile_id",Ch="sentry.exclusive_time",__=0,y_=1,E_="_sentryScope",v_="_sentryIsolationScope";function w_(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Th(t){const e=t;return{scope:e[E_],isolationScope:w_(e[v_])}}const b_="sentry-",S_=/^sentry-/;function C_(t){const e=T_(t);if(!e)return;const n=Object.entries(e).reduce((i,[r,s])=>{if(r.match(S_)){const o=r.slice(b_.length);i[o]=s}return i},{});if(Object.keys(n).length>0)return n}function T_(t){if(!(!t||!ut(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=Kl(n);return Object.entries(i).forEach(([r,s])=>{e[r]=s}),e},{}):Kl(t)}function Kl(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),r=e.slice(n+1);return[i,r].map(s=>{try{return decodeURIComponent(s.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const I_=/^o(\d+)\./,k_=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function R_(t){return t==="http"||t==="https"}function ur(t,e=!1){const{host:n,path:i,pass:r,port:s,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&r?`:${r}`:""}@${n}${s?`:${s}`:""}/${i&&`${i}/`}${o}`}function A_(t){const e=k_.exec(t);if(!e){ti(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,r="",s="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return Ih({host:s,pass:r,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function Ih(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function P_(t){if(!C)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(b.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?R_(i)?e&&isNaN(parseInt(e,10))?(b.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(b.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(b.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function N_(t){return t.match(I_)?.[1]}function L_(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=N_(n)),i}function O_(t){const e=typeof t=="string"?A_(t):Ih(t);if(!(!e||!P_(e)))return e}function D_(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const kh=1;let Jl=!1;function M_(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),r=i?e:Za(t).parent_span_id,s=Th(t).scope,o=i?s?.getPropagationContext().propagationSpanId||bh():e;return{parent_span_id:r,span_id:o,trace_id:n}}function x_(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...r},attributes:s})=>({span_id:e,trace_id:n,sampled:i===kh,attributes:s,...r}))}function Xl(t){return typeof t=="number"?Ql(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Ql(t.getTime()):dt()}function Ql(t){return t>9999999999?t/1e3:t}function Za(t){if(U_(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(F_(t)){const{attributes:i,startTime:r,name:s,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:s,parent_span_id:l,start_timestamp:Xl(r),timestamp:Xl(o)||void 0,status:B_(a),op:i[g_],origin:i[m_],links:x_(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function F_(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function U_(t){return typeof t.getSpanJSON=="function"}function $_(t){const{traceFlags:e}=t.spanContext();return e===kh}function B_(t){if(!(!t||t.code===__))return t.code===y_?"ok":t.message||"internal_error"}const H_="_sentryRootSpan";function Rh(t){return t[H_]||t}function Zl(){Jl||(ti(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Jl=!0)}function W_(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Ee()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function eu(t){b.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function tu(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(j_(n)){if(Ur(t.description,n))return C&&eu(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?Ur(t.description,n.name):!0,r=n.op?t.op&&Ur(t.op,n.op):!0;if(i&&r)return C&&eu(t),!0}return!1}function V_(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const r of t)r.parent_span_id===i&&(r.parent_span_id=n)}function j_(t){return typeof t=="string"||t instanceof RegExp}const ec="production",z_="_frozenDsc";function Ah(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},r={environment:n.environment||ec,release:n.release,public_key:i,trace_id:t,org_id:L_(e)};return e.emit("createDsc",r),r}function G_(t,e){const n=e.getPropagationContext();return n.dsc||Ah(n.traceId,t)}function q_(t){const e=Ee();if(!e)return{};const n=Rh(t),i=Za(n),r=i.data,s=n.spanContext().traceState,o=s?.get("sentry.sample_rate")??r[f_]??r[p_];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[z_];if(c)return a(c);const l=s?.get("sentry.dsc"),u=l&&C_(l);if(u)return a(u);const d=Ah(t.spanContext().traceId,e),h=r[h_],f=i.description;return h!=="url"&&f&&(d.transaction=f),W_()&&(d.sampled=String($_(n)),d.sample_rand=s?.get("sentry.sample_rand")??Th(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function nt(t,e=100,n=1/0){try{return Yo("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function Ph(t,e=3,n=100*1024){const i=nt(t,e);return X_(i)>n?Ph(t,e-1,n):i}function Yo(t,e,n=1/0,i=1/0,r=Q_()){const[s,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=Y_(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(s(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Yo("",f,c-1,i,r)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=yh(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Yo(f,p,c-1,i,r),d++}return o(e),u}function Y_(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(gh(e))return hh(e);if(Vm(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Ft(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=K_(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function K_(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function J_(t){return~-encodeURI(t).split(/%..|./).length}function X_(t){return J_(JSON.stringify(t))}function Q_(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function ii(t,e=[]){return[t,e]}function Z_(t,e){const[n,i]=t;return[n,[...i,e]]}function nu(t,e){const n=t[1];for(const i of n){const r=i[0].type;if(e(i,r))return!0}return!1}function Ko(t){const e=Ls(D);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function ey(t){const[e,n]=t;let i=JSON.stringify(e);function r(s){typeof i=="string"?i=typeof s=="string"?i+s:[Ko(i),s]:i.push(typeof s=="string"?Ko(s):s)}for(const s of n){const[o,a]=s;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(nt(a))}r(c)}}return typeof i=="string"?i:ty(i)}function ty(t){const e=t.reduce((r,s)=>r+s.length,0),n=new Uint8Array(e);let i=0;for(const r of t)n.set(r,i),i+=r.length;return n}function ny(t){const e=typeof t.data=="string"?Ko(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const iy={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function iu(t){return iy[t]}function Nh(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function ry(t,e,n,i){const r=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:ur(i)},...r&&{trace:r}}}function sy(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function oy(t,e,n,i){const r=Nh(n),s={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!i&&e&&{dsn:ur(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return ii(s,[o])}function ay(t,e,n,i){const r=Nh(n),s=t.type&&t.type!=="replay_event"?t.type:"event";sy(t,n?.sdk);const o=ry(t,r,i,e);return delete t.sdkProcessingMetadata,ii(o,[[{type:s},t]])}const _o=0,ru=1,su=2;function xs(t){return new Vi(e=>{e(t)})}function tc(t){return new Vi((e,n)=>{n(t)})}class Vi{constructor(e){this._state=_o,this._handlers=[],this._runExecutor(e)}then(e,n){return new Vi((i,r)=>{this._handlers.push([!1,s=>{if(!e)i(s);else try{i(e(s))}catch(o){r(o)}},s=>{if(!n)r(s);else try{i(n(s))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Vi((n,i)=>{let r,s;return this.then(o=>{s=!1,r=o,e&&e()},o=>{s=!0,r=o,e&&e()}).then(()=>{if(s){i(r);return}n(r)})})}_executeHandlers(){if(this._state===_o)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===ru&&n[1](this._value),this._state===su&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(s,o)=>{if(this._state===_o){if(or(o)){o.then(i,r);return}this._state=s,this._value=o,this._executeHandlers()}},i=s=>{n(ru,s)},r=s=>{n(su,s)};try{e(i,r)}catch(s){r(s)}}}function cy(t,e,n,i=0){try{const r=Jo(e,n,t,i);return or(r)?r:xs(r)}catch(r){return tc(r)}}function Jo(t,e,n,i){const r=n[i];if(!t||!r)return t;const s=r({...t},e);return C&&s===null&&b.log(`Event processor "${r.id||"?"}" dropped event`),or(s)?s.then(o=>Jo(o,e,n,i+1)):Jo(s,e,n,i+1)}function ly(t,e){const{fingerprint:n,span:i,breadcrumbs:r,sdkProcessingMetadata:s}=e;uy(t,e),i&&fy(t,i),py(t,n),dy(t,r),hy(t,s)}function ou(t,e){const{extra:n,tags:i,user:r,contexts:s,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;Ir(t,"extra",n),Ir(t,"tags",i),Ir(t,"user",r),Ir(t,"contexts",s),t.sdkProcessingMetadata=cr(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function Ir(t,e,n){t[e]=cr(t[e],n,1)}function uy(t,e){const{extra:n,tags:i,user:r,contexts:s,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(r).length&&(t.user={...r,...t.user}),Object.keys(s).length&&(t.contexts={...s,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function dy(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function hy(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function fy(t,e){t.contexts={trace:M_(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:q_(e),...t.sdkProcessingMetadata};const n=Rh(e),i=Za(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function py(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let qt,au,cu,vt;function gy(t){const e=D._sentryDebugIds,n=D._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],r=n?Object.keys(n):[];if(vt&&i.length===au&&r.length===cu)return vt;au=i.length,cu=r.length,vt={},qt||(qt={});const s=(o,a)=>{for(const c of o){const l=a[c],u=qt?.[c];if(u&&vt&&l)vt[u[0]]=l,qt&&(qt[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&vt&&qt){vt[p]=l,qt[c]=[p,l];break}}}}};return e&&s(i,e),n&&s(r,n),vt}function my(t,e,n,i,r,s){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Ne(),timestamp:e.timestamp||ar()},l=n.integrations||t.integrations.map(m=>m.name);_y(c,t),vy(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&yy(c,t.stackParser);const u=by(i,n.captureContext);n.mechanism&&Hn(c,n.mechanism);const d=r?r.getEventProcessors():[],h=l_().getScopeData();if(s){const m=s.getScopeData();ou(h,m)}if(u){const m=u.getScopeData();ou(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),ly(c,h);const p=[...d,...h.eventProcessors];return cy(p,c,n).then(m=>(m&&Ey(m),typeof o=="number"&&o>0?wy(m,o,a):m))}function _y(t,e){const{environment:n,release:i,dist:r,maxValueLength:s}=e;t.environment=t.environment||n||ec,!t.release&&i&&(t.release=i),!t.dist&&r&&(t.dist=r);const o=t.request;o?.url&&(o.url=s?Eh(o.url,s):o.url)}function yy(t,e){const n=gy(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(r=>{r.filename&&(r.debug_id=n[r.filename])})})}function Ey(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,r])=>{n.push({type:"sourcemap",code_file:i,debug_id:r})})}function vy(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function wy(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(r=>({...r,...r.data&&{data:nt(r.data,e,n)}}))},...t.user&&{user:nt(t.user,e,n)},...t.contexts&&{contexts:nt(t.contexts,e,n)},...t.extra&&{extra:nt(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=nt(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(r=>({...r,...r.data&&{data:nt(r.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=nt(t.contexts.flags,3,n)),i}function by(t,e){if(!e)return t;const n=t?t.clone():new pt;return n.update(e),n}function Sy(t,e){return jt().captureException(t,void 0)}function Lh(t,e){return jt().captureEvent(t,e)}function lu(t){const e=lr(),n=jt(),{userAgent:i}=D.navigator||{},r=Zm({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),s=e.getSession();return s?.status==="ok"&&Wn(s,{status:"exited"}),Oh(),e.setSession(r),r}function Oh(){const t=lr(),n=jt().getSession()||t.getSession();n&&e_(n),Dh(),t.setSession()}function Dh(){const t=lr(),e=Ee(),n=t.getSession();n&&e&&e.captureSession(n)}function uu(t=!1){if(t){Oh();return}Dh()}const Cy="7";function Ty(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function Iy(t){return`${Ty(t)}${t.projectId}/envelope/`}function ky(t,e){const n={sentry_version:Cy};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function Ry(t,e,n){return e||`${Iy(t)}?${ky(t,n)}`}const du=[];function Ay(t){const e={};return t.forEach(n=>{const{name:i}=n,r=e[i];r&&!r.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function Py(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(r=>{r.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const r=n(e);i=Array.isArray(r)?r:[r]}else i=e;return Ay(i)}function Ny(t,e){const n={};return e.forEach(i=>{i&&Mh(t,i,n)}),n}function hu(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Mh(t,e,n){if(n[e.name]){C&&b.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!du.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),du.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(r,s)=>i(r,s,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),r=Object.assign((s,o)=>i(s,o,t),{id:e.name});t.addEventProcessor(r)}C&&b.log(`Integration installed: ${e.name}`)}function Ly(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function Oy(t,e,n,i){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(r.dsn=ur(i)),ii(r,[Ly(t)])}function xh(t,e){const n=e??Dy(t)??[];if(n.length===0)return;const i=t.getOptions(),r=Oy(n,i._metadata,i.tunnel,t.getDsn());Fh().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(r)}function Dy(t){return Fh().get(t)}function Fh(){return ei("clientToLogBufferMap",()=>new WeakMap)}function My(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function xy(t,e,n,i){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(r.dsn=ur(i)),ii(r,[My(t)])}function Uh(t,e){const n=e??Fy(t)??[];if(n.length===0)return;const i=t.getOptions(),r=xy(n,i._metadata,i.tunnel,t.getDsn());$h().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(r)}function Fy(t){return $h().get(t)}function $h(){return ei("clientToMetricBufferMap",()=>new WeakMap)}function Uy(t,e,n){const i=[{type:"client_report"},{timestamp:ar(),discarded_events:t}];return ii(e?{dsn:e}:{},[i])}function Bh(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function $y(t){const{trace_id:e,parent_span_id:n,span_id:i,status:r,origin:s,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:r,timestamp:t.timestamp,trace_id:e??"",origin:s,profile_id:o?.[Sh],exclusive_time:o?.[Ch],measurements:t.measurements,is_segment:!0}}function By(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Sh]:t.profile_id},...t.exclusive_time&&{[Ch]:t.exclusive_time}}}},measurements:t.measurements}}const fu="Not capturing exception because it's already been captured.",pu="Discarded session because of missing or non-string release",Hh=Symbol.for("SentryInternalError"),Wh=Symbol.for("SentryDoNotSendEventError"),Hy=5e3;function $r(t){return{message:t,[Hh]:!0}}function yo(t){return{message:t,[Wh]:!0}}function gu(t){return!!t&&typeof t=="object"&&Hh in t}function mu(t){return!!t&&typeof t=="object"&&Wh in t}function _u(t,e,n,i,r){let s=0,o,a=!1;t.on(n,()=>{s=0,clearTimeout(o),a=!1}),t.on(e,c=>{s+=i(c),s>=8e5?r(t):a||(a=!0,o=setTimeout(()=>{r(t)},Hy))}),t.on("flush",()=>{r(t)})}class Wy{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=O_(e.dsn):C&&b.warn("No DSN provided, client will not send events."),this._dsn){const i=Ry(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs&&_u(this,"afterCaptureLog","flushLogs",Gy,xh),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&_u(this,"afterCaptureMetric","flushMetrics",zy,Uh)}captureException(e,n,i){const r=Ne();if(Vl(e))return C&&b.log(fu),r;const s={event_id:r,...n};return this._process(this.eventFromException(e,s).then(o=>this._captureEvent(o,s,i))),s.event_id}captureMessage(e,n,i,r){const s={event_id:Ne(),...i},o=Ya(e)?e:String(e),a=Os(e)?this.eventFromMessage(o,n,s):this.eventFromException(e,s);return this._process(a.then(c=>this._captureEvent(c,s,r))),s.event_id}captureEvent(e,n,i){const r=Ne();if(n?.originalException&&Vl(n.originalException))return C&&b.log(fu),r;const s={event_id:r,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,s,a||i,c)),s.event_id}captureSession(e){this.sendSession(e),Wn(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),r=await n.flush(e);return i&&r}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Mh(this,e,this._integrations),n||hu(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=ay(e,this._dsn,this._options._metadata,this._options.tunnel);for(const r of n.attachments||[])i=Z_(i,ny(r));this.sendEnvelope(i).then(r=>this.emit("afterSendEvent",e,r))}sendSession(e){const{release:n,environment:i=ec}=this._options;if("aggregates"in e){const s=e.attrs||{};if(!s.release&&!n){C&&b.warn(pu);return}s.release=s.release||n,s.environment=s.environment||i,e.attrs=s}else{if(!e.release&&!n){C&&b.warn(pu);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const r=oy(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const r=`${e}:${n}`;C&&b.log(`Recording outcome: "${r}"${i>1?` (${i} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,r=(...s)=>n(...s);return i.add(r),()=>{i.delete(r)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(r=>r(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&b.error("Error while sending envelope:",n),{}}return C&&b.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=Ny(this,e),hu(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",r=!1;const s=n.exception?.values;if(s){r=!0,i=!1;for(const c of s)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(Wn(e,{...i&&{status:"crashed"},errors:e.errors||Number(r||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,r){const s=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||r.setLastEventId(e.event_id||n.event_id),my(s,e,n,i,this,r).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:d_(i),...a.contexts};const c=G_(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=jt(),r=lr()){return C&&Xo(e)&&b.log(`Captured error event \`${Bh(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,r).then(s=>s.event_id,s=>{C&&(mu(s)?b.log(s.message):gu(s)?b.warn(s.message):b.warn(s))})}_processEvent(e,n,i,r){const s=this.getOptions(),{sampleRate:o}=s,a=Vh(e),c=Xo(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:D_(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),tc(yo(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,i,r).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),yo("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const y=jy(this,s,f,n);return Vy(y,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw yo(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||r.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,H=m-T;H>0&&this.recordDroppedEvent("before_send","span",H)}const y=f.transaction_info;if(a&&y&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...y,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw mu(f)||gu(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),$r(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[r,s]=n.split(":");return{reason:r,category:s,quantity:i}})}_flushOutcomes(){C&&b.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&b.log("No outcomes to send");return}if(!this._dsn){C&&b.log("No dsn provided, will not send outcomes");return}C&&b.log("Sending outcomes:",e);const n=Uy(e,this._options.tunnel&&ur(this._dsn));this.sendEnvelope(n)}}function Vy(t,e){const n=`${e} must return \`null\` or a valid event.`;if(or(t))return t.then(i=>{if(!Wi(i)&&i!==null)throw $r(n);return i},i=>{throw $r(`${e} rejected with ${i}`)});if(!Wi(t)&&t!==null)throw $r(n);return t}function jy(t,e,n,i){const{beforeSend:r,beforeSendTransaction:s,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Xo(c)&&r)return r(c,i);if(Vh(c)){if(o||a){const l=$y(c);if(a?.length&&tu(l,a))return null;if(o){const u=o(l);u?c=cr(n,By(u)):Zl()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&tu(f,a)){V_(d,f);continue}if(o){const p=o(f);p?u.push(p):(Zl(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(s){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return s(c,i)}}return c}function Xo(t){return t.type===void 0}function Vh(t){return t.type==="transaction"}function zy(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+jh(t.attributes)}function Gy(t){let e=0;return t.message&&(e+=t.message.length*2),e+jh(t.attributes)}function jh(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*yu(n[0]):Os(n)?e+=yu(n):e+=100}),e}function yu(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function qy(t,e){e.debug===!0&&(C?b.enable():ti(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),jt().update(e.initialScope);const i=new t(e);return Yy(i),i.init(),i}function Yy(t){jt().setClient(t)}const zh=Symbol.for("SentryBufferFullError");function Gh(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function r(o){if(!n())return tc(zh);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function s(o){if(!e.size)return xs(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:r,drain:s}}const Ky=60*1e3;function Jy(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?Ky:i-e}function Xy(t,e){return t[e]||t.all||0}function Qy(t,e,n=Date.now()){return Xy(t,e)>n}function Zy(t,{statusCode:e,headers:n},i=Date.now()){const r={...t},s=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(s)for(const a of s.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)r.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[f]=i+h):r[f]=i+h}else o?r.all=i+Jy(o,i):e===429&&(r.all=i+60*1e3);return r}const eE=64;function tE(t,e,n=Gh(t.bufferSize||eE)){let i={};const r=o=>n.drain(o);function s(o){const a=[];if(nu(o,(d,h)=>{const f=iu(h);Qy(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=ii(o[0],a),l=d=>{nu(c,(h,f)=>{t.recordDroppedEvent(d,iu(f))})},u=()=>e({body:ey(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&b.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=Zy(i,d),d),d=>{throw l("network_error"),C&&b.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===zh)return C&&b.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:s,flush:r}}function Eo(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function nE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function iE(t,e,n=[e],i="npm"){const r=t._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:n.map(s=>({name:`${i}:@sentry/${s}`,version:sn})),version:sn}),t._metadata=r}const rE=100;function un(t,e){const n=Ee(),i=lr();if(!n)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:s=rE}=n.getOptions();if(s<=0)return;const a={timestamp:ar(),...t},c=r?ti(()=>r(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,s))}let Eu;const sE="FunctionToString",vu=new WeakMap,oE=(()=>({name:sE,setupOnce(){Eu=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Xa(this),n=vu.has(Ee())&&e!==void 0?e:this;return Eu.apply(n,t)}}catch{}},setup(t){vu.set(t,!0)}})),aE=oE,cE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],lE="EventFilters",uE=(t={})=>{let e;return{name:lE,setup(n){const i=n.getOptions();e=wu(t,i)},processEvent(n,i,r){if(!e){const s=r.getOptions();e=wu(t,s)}return hE(n,e)?null:n}}},dE=((t={})=>({...uE(t),name:"InboundFilters"}));function wu(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:cE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function hE(t,e){if(t.type){if(t.type==="transaction"&&pE(t,e.ignoreTransactions))return C&&b.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Zt(t)}`),!0}else{if(fE(t,e.ignoreErrors))return C&&b.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Zt(t)}`),!0;if(yE(t))return C&&b.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Zt(t)}`),!0;if(gE(t,e.denyUrls))return C&&b.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Zt(t)}.
Url: ${Qr(t)}`),!0;if(!mE(t,e.allowUrls))return C&&b.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Zt(t)}.
Url: ${Qr(t)}`),!0}return!1}function fE(t,e){return e?.length?Bh(t).some(n=>Ms(n,e)):!1}function pE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Ms(n,e):!1}function gE(t,e){if(!e?.length)return!1;const n=Qr(t);return n?Ms(n,e):!1}function mE(t,e){if(!e?.length)return!0;const n=Qr(t);return n?Ms(n,e):!0}function _E(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Qr(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?_E(n):null}catch{return C&&b.error(`Cannot extract url for event ${Zt(t)}`),null}}function yE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function EE(t,e,n,i,r,s){if(!r.exception?.values||!s||!Ut(s.originalException,Error))return;const o=r.exception.values.length>0?r.exception.values[r.exception.values.length-1]:void 0;o&&(r.exception.values=Qo(t,e,i,s.originalException,n,r.exception.values,o,0))}function Qo(t,e,n,i,r,s,o,a){if(s.length>=n+1)return s;let c=[...s];if(Ut(i[r],Error)){bu(o,a);const l=t(e,i[r]),u=c.length;Su(l,r,u,a),c=Qo(t,e,n,i[r],r,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(Ut(l,Error)){bu(o,a);const d=t(e,l),h=c.length;Su(d,`errors[${u}]`,h,a),c=Qo(t,e,n,l,r,[d,...c],d,h)}}),c}function bu(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Su(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function vE(t){const e="console";vn(e,t),wn(e,wE)}function wE(){"console"in D&&km.forEach(function(t){t in D.console&&Ie(D.console,t,function(e){return Xr[t]=e,function(...n){He("console",{args:n,level:t}),Xr[t]?.apply(D.console,n)}})})}function bE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const SE="Dedupe",CE=(()=>{let t;return{name:SE,processEvent(e){if(e.type)return e;try{if(IE(e,t))return C&&b.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),TE=CE;function IE(t,e){return e?!!(kE(t,e)||RE(t,e)):!1}function kE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!Yh(t,e)||!qh(t,e))}function RE(t,e){const n=Cu(e),i=Cu(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!Yh(t,e)||!qh(t,e))}function qh(t,e){let n=Fl(t),i=Fl(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let r=0;r<i.length;r++){const s=i[r],o=n[r];if(s.filename!==o.filename||s.lineno!==o.lineno||s.colno!==o.colno||s.function!==o.function)return!1}return!0}function Yh(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function Cu(t){return t.exception?.values?.[0]}function Kh(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const ji=D;function AE(){return"history"in ji&&!!ji.history}function PE(){if(!("fetch"in ji))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Zo(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function NE(){if(typeof EdgeRuntime=="string")return!0;if(!PE())return!1;if(Zo(ji.fetch))return!0;let t=!1;const e=ji.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Zo(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&b.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function LE(t,e){const n="fetch";vn(n,t),wn(n,()=>OE(void 0,e))}function OE(t,e=!1){e&&!NE()||Ie(D,"fetch",function(n){return function(...i){const r=new Error,{method:s,url:o}=DE(i),a={args:i,fetchData:{method:s,url:o},startTimestamp:dt()*1e3,virtualError:r,headers:ME(i)};return He("fetch",{...a}),n.apply(D,i).then(async c=>(He("fetch",{...a,endTimestamp:dt()*1e3,response:c}),c),c=>{if(He("fetch",{...a,endTimestamp:dt()*1e3,error:c}),qa(c)&&c.stack===void 0&&(c.stack=r.stack,ln(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function ea(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Tu(t){return typeof t=="string"?t:t?ea(t,"url")?t.url:t.toString?t.toString():"":""}function DE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:Tu(n),method:ea(i,"method")?String(i.method).toUpperCase():"GET"}}const e=t[0];return{url:Tu(e),method:ea(e,"method")?String(e.method).toUpperCase():"GET"}}function ME(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(jm(e))return new Headers(e.headers)}catch{}}function xE(){return"npm"}const Z=D;let ta=0;function Jh(){return ta>0}function FE(){ta++,setTimeout(()=>{ta--})}function jn(t,e={}){function n(r){return typeof r=="function"}if(!n(t))return t;try{const r=t.__sentry_wrapped__;if(r)return typeof r=="function"?r:t;if(Xa(t))return t}catch{return t}const i=function(...r){try{const s=r.map(o=>jn(o,e));return t.apply(this,s)}catch(s){throw FE(),u_(o=>{o.addEventProcessor(a=>(e.mechanism&&(Go(a,void 0),Hn(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),Sy(s)}),s}};try{for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[r]=t[r])}catch{}_h(i,t),ln(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function UE(){const t=Ja(),{referrer:e}=Z.document||{},{userAgent:n}=Z.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function nc(t,e){const n=ic(t,e),i={type:VE(e),value:jE(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function $E(t,e,n,i){const s=Ee()?.getOptions().normalizeDepth,o=KE(e),a={__serialized__:Ph(e,s)};if(o)return{exception:{values:[nc(t,o)]},extra:a};const c={exception:{values:[{type:Ds(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:qE(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=ic(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function vo(t,e){return{exception:{values:[nc(t,e)]}}}function ic(t,e){const n=e.stacktrace||e.stack||"",i=HE(e),r=WE(e);try{return t(n,i,r)}catch{}return[]}const BE=/Minified React error #\d+;/i;function HE(t){return t&&BE.test(t.message)?1:0}function WE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Xh(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function VE(t){const e=t?.name;return!e&&Xh(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function jE(t){const e=t?.message;return Xh(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function zE(t,e,n,i){const r=n?.syntheticException||void 0,s=rc(t,e,r,i);return Hn(s),s.level="error",n?.event_id&&(s.event_id=n.event_id),xs(s)}function GE(t,e,n="info",i,r){const s=i?.syntheticException||void 0,o=na(t,e,s,r);return o.level=n,i?.event_id&&(o.event_id=i.event_id),xs(o)}function rc(t,e,n,i,r){let s;if(ph(e)&&e.error)return vo(t,e.error);if($l(e)||Bm(e)){const o=e;if("stack"in e)s=vo(t,e);else{const a=o.name||($l(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;s=na(t,c,n,i),Go(s,c)}return"code"in o&&(s.tags={...s.tags,"DOMException.code":`${o.code}`}),s}return qa(e)?vo(t,e):Wi(e)||Ds(e)?(s=$E(t,e,n,r),Hn(s,{synthetic:!0}),s):(s=na(t,e,n,i),Go(s,`${e}`),Hn(s,{synthetic:!0}),s)}function na(t,e,n,i){const r={};if(i&&n){const s=ic(t,n);s.length&&(r.exception={values:[{value:e,stacktrace:{frames:s}}]}),Hn(r,{synthetic:!0})}if(Ya(e)){const{__sentry_template_string__:s,__sentry_template_values__:o}=e;return r.logentry={message:s,params:o},r}return r.message=e,r}function qE(t,{isUnhandledRejection:e}){const n=Ym(t),i=e?"promise rejection":"exception";return ph(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:Ds(t)?`Event \`${YE(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function YE(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function KE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class JE extends Wy{constructor(e){const n=XE(e),i=Z.SENTRY_SDK_SOURCE||xE();iE(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:r,sendClientReports:s,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;Z.document&&(s||o||l)&&Z.document.addEventListener("visibilitychange",()=>{Z.document.visibilityState==="hidden"&&(s&&this._flushOutcomes(),o&&xh(this),l&&Uh(this))}),r&&this.on("beforeSendSession",nE)}eventFromException(e,n){return zE(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return GE(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,r)}}function XE(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:Z.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const QE=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,ge=D,ZE=1e3;let Iu,ia,ra;function ev(t){vn("dom",t),wn("dom",tv)}function tv(){if(!ge.document)return;const t=He.bind(null,"dom"),e=ku(t,!0);ge.document.addEventListener("click",e,!1),ge.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const r=ge[n]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(Ie(r,"addEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=ku(t);u.handler=d,s.call(this,o,d,c)}u.refCount++}catch{}return s.call(this,o,a,c)}}),Ie(r,"removeEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(s.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return s.call(this,o,a,c)}}))})}function nv(t){if(t.type!==ia)return!1;try{if(!t.target||t.target._sentryId!==ra)return!1}catch{}return!0}function iv(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function ku(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=rv(n);if(iv(n.type,i))return;ln(n,"_sentryCaptured",!0),i&&!i._sentryId&&ln(i,"_sentryId",Ne());const r=n.type==="keypress"?"input":n.type;nv(n)||(t({event:n,name:r,global:e}),ia=n.type,ra=i?i._sentryId:void 0),clearTimeout(Iu),Iu=ge.setTimeout(()=>{ra=void 0,ia=void 0},ZE)}}function rv(t){try{return t.target}catch{return null}}let kr;function Qh(t){const e="history";vn(e,t),wn(e,sv)}function sv(){if(ge.addEventListener("popstate",()=>{const e=ge.location.href,n=kr;if(kr=e,n===e)return;He("history",{from:n,to:e})}),!AE())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const r=kr,s=ov(String(i));if(kr=s,r===s)return e.apply(this,n);He("history",{from:r,to:s})}return e.apply(this,n)}}Ie(ge.history,"pushState",t),Ie(ge.history,"replaceState",t)}function ov(t){try{return new URL(t,ge.location.origin).toString()}catch{return t}}const Br={};function av(t){const e=Br[t];if(e)return e;let n=ge[t];if(Zo(n))return Br[t]=n.bind(ge);const i=ge.document;if(i&&typeof i.createElement=="function")try{const r=i.createElement("iframe");r.hidden=!0,i.head.appendChild(r);const s=r.contentWindow;s?.[t]&&(n=s[t]),i.head.removeChild(r)}catch(r){QE&&b.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,r)}return n&&(Br[t]=n.bind(ge))}function cv(t){Br[t]=void 0}const Ii="__sentry_xhr_v3__";function lv(t){vn("xhr",t),wn("xhr",uv)}function uv(){if(!ge.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const r=new Error,s=dt()*1e3,o=ut(i[0])?i[0].toUpperCase():void 0,a=dv(i[1]);if(!o||!a)return e.apply(n,i);n[Ii]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Ii];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:dt()*1e3,startTimestamp:s,xhr:n,virtualError:r};He("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Ii];return p&&ut(h)&&ut(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const r=n[Ii];if(!r)return e.apply(n,i);i[0]!==void 0&&(r.body=i[0]);const s={startTimestamp:dt()*1e3,xhr:n};return He("xhr",s),e.apply(n,i)}})}function dv(t){if(ut(t))return t;try{return t.toString()}catch{}}const hv=40;function fv(t,e=av("fetch")){let n=0,i=0;async function r(s){const o=s.body.length;n+=o,i++;const a={body:s.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw cv("fetch"),c}finally{n-=o,i--}}return tE(t,r,Gh(t.bufferSize||hv))}const pv=30,gv=50;function sa(t,e,n,i){const r={filename:t,function:e==="<anonymous>"?cn:e,in_app:!0};return n!==void 0&&(r.lineno=n),i!==void 0&&(r.colno=i),r}const mv=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,_v=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,yv=/\((\S*)(?::(\d+))(?::(\d+))\)/,Ev=/at (.+?) ?\(data:(.+?),/,vv=t=>{const e=t.match(Ev);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=mv.exec(t);if(n){const[,r,s,o]=n;return sa(r,cn,+s,+o)}const i=_v.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=yv.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[s,o]=Zh(i[1]||cn,i[2]);return sa(o,s,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},wv=[pv,vv],bv=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Sv=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Cv=t=>{const e=bv.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const s=Sv.exec(e[3]);s&&(e[1]=e[1]||"eval",e[3]=s[1],e[4]=s[2],e[5]="")}let i=e[3],r=e[1]||cn;return[r,i]=Zh(r,i),sa(i,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},Tv=[gv,Cv],Iv=[wv,Tv],kv=dh(...Iv),Zh=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:cn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Fs=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Rr=1024,Rv="Breadcrumbs",Av=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:Rv,setup(n){e.console&&vE(Ov(n)),e.dom&&ev(Lv(n,e.dom)),e.xhr&&lv(Dv(n)),e.fetch&&LE(Mv(n)),e.history&&Qh(xv(n)),e.sentry&&n.on("beforeSendEvent",Nv(n))}}}),Pv=Av;function Nv(t){return function(n){Ee()===t&&un({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:Zt(n)},{event:n})}}function Lv(t,e){return function(i){if(Ee()!==t)return;let r,s,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Rr&&(Fs&&b.warn(`\`dom.maxStringLength\` cannot exceed ${Rr}, but a value of ${a} was configured. Sentry will use ${Rr} instead.`),a=Rr),typeof o=="string"&&(o=[o]);try{const l=i.event,u=Fv(l)?l.target:l;r=mh(u,{keyAttrs:o,maxStringLength:a}),s=qm(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${i.name}`,message:r};s&&(c.data={"ui.component_name":s}),un(c,{event:i.event,name:i.name,global:i.global})}}function Ov(t){return function(n){if(Ee()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:bE(n.level),message:Wl(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${Wl(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;un(i,{input:n.args,level:n.level})}}function Dv(t){return function(n){if(Ee()!==t)return;const{startTimestamp:i,endTimestamp:r}=n,s=n.xhr[Ii];if(!i||!r||!s)return;const{method:o,url:a,status_code:c,body:l}=s,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:r},h={category:"xhr",data:u,type:"http",level:Kh(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),un(h,d)}}function Mv(t){return function(n){if(Ee()!==t)return;const{startTimestamp:i,endTimestamp:r}=n;if(r&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const s=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:r},a={category:"fetch",data:s,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),un(a,o)}else{const s=n.response,o={...n.fetchData,status_code:s?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,s?.status;const a={input:n.args,response:s,startTimestamp:i,endTimestamp:r},c={category:"fetch",data:o,type:"http",level:Kh(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),un(c,a)}}}function xv(t){return function(n){if(Ee()!==t)return;let i=n.from,r=n.to;const s=Eo(Z.location.href);let o=i?Eo(i):void 0;const a=Eo(r);o?.path||(o=s),s.protocol===a.protocol&&s.host===a.host&&(r=a.relative),s.protocol===o.protocol&&s.host===o.host&&(i=o.relative),un({category:"navigation",data:{from:i,to:r}})}}function Fv(t){return!!t&&!!t.target}const Uv=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],$v="BrowserApiErrors",Bv=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:$v,setupOnce(){e.setTimeout&&Ie(Z,"setTimeout",Ru),e.setInterval&&Ie(Z,"setInterval",Ru),e.requestAnimationFrame&&Ie(Z,"requestAnimationFrame",Wv),e.XMLHttpRequest&&"XMLHttpRequest"in Z&&Ie(XMLHttpRequest.prototype,"send",Vv);const n=e.eventTarget;n&&(Array.isArray(n)?n:Uv).forEach(r=>jv(r,e))}}}),Hv=Bv;function Ru(t){return function(...e){const n=e[0];return e[0]=jn(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Ft(t)}`}}),t.apply(this,e)}}function Wv(t){return function(e){return t.apply(this,[jn(e,{mechanism:{data:{handler:Ft(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function Vv(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in n&&typeof n[r]=="function"&&Ie(n,r,function(s){const o={mechanism:{data:{handler:Ft(s)},handled:!1,type:`auto.browser.browserapierrors.xhr.${r}`}},a=Xa(s);return a&&(o.mechanism.data.handler=Ft(a)),jn(s,o)})}),t.apply(this,e)}}function jv(t,e){const i=Z[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Ie(i,"addEventListener",function(r){return function(s,o,a){try{zv(o)&&(o.handleEvent=jn(o.handleEvent,{mechanism:{data:{handler:Ft(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&Gv(this,s,o),r.apply(this,[s,jn(o,{mechanism:{data:{handler:Ft(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Ie(i,"removeEventListener",function(r){return function(s,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,s,c,a)}catch{}return r.call(this,s,o,a)}}))}function zv(t){return typeof t.handleEvent=="function"}function Gv(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const qv=()=>({name:"BrowserSession",setupOnce(){if(typeof Z.document>"u"){Fs&&b.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}lu({ignoreDuration:!0}),uu(),Qh(({from:t,to:e})=>{t!==void 0&&t!==e&&(lu({ignoreDuration:!0}),uu())})}}),Yv="GlobalHandlers",Kv=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:Yv,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(Xv(n),Au("onerror")),e.onunhandledrejection&&(Qv(n),Au("onunhandledrejection"))}}}),Jv=Kv;function Xv(t){xm(e=>{const{stackParser:n,attachStacktrace:i}=ef();if(Ee()!==t||Jh())return;const{msg:r,url:s,line:o,column:a,error:c}=e,l=tw(rc(n,c||r,void 0,i,!1),s,o,a);l.level="error",Lh(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function Qv(t){Um(e=>{const{stackParser:n,attachStacktrace:i}=ef();if(Ee()!==t||Jh())return;const r=Zv(e),s=Os(r)?ew(r):rc(n,r,void 0,i,!0);s.level="error",Lh(s,{originalException:r,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function Zv(t){if(Os(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function ew(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function tw(t,e,n,i){const r=t.exception=t.exception||{},s=r.values=r.values||[],o=s[0]=s[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=nw(e)??Ja();return c.length===0&&c.push({colno:l,filename:d,function:cn,in_app:!0,lineno:u}),t}function Au(t){Fs&&b.log(`Global Handler attached: ${t}`)}function ef(){return Ee()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function nw(t){if(!(!ut(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",i=t.includes("base64,");return`<data:${n}${i?",base64":""}>`}return t}}const iw=()=>({name:"HttpContext",preprocessEvent(t){if(!Z.navigator&&!Z.location&&!Z.document)return;const e=UE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),rw="cause",sw=5,ow="LinkedErrors",aw=((t={})=>{const e=t.limit||sw,n=t.key||rw;return{name:ow,preprocessEvent(i,r,s){const o=s.getOptions();EE(nc,o.stackParser,n,e,i,r)}}}),cw=aw;function lw(){return uw()?(Fs&&ti(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function uw(){if(typeof Z.window>"u")return!1;const t=Z;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Ja(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(Z===Z.top&&i.some(s=>n.startsWith(`${s}://`)))}function dw(t){return[dE(),aE(),Hv(),Pv(),Jv(),cw(),TE(),iw(),qv()]}function hw(t={}){const e=!t.skipBrowserExtensionCheck&&lw();let n=t.defaultIntegrations==null?dw():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:Dm(t.stackParser||kv),integrations:Py({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||fv};return qy(JE,i)}const fw="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";hw({dsn:fw,sendDefaultPii:!0});/**
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
 */const pw=()=>{};var Pu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw ri(e)},ri=function(t){return new Error("Firebase Database ("+tf.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},gw=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const s=t[n++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Us={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){const s=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=s>>2,d=(s&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(nf(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):gw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){const s=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||a==null||l==null||d==null)throw new mw;const h=s<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class mw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const rf=function(t){const e=nf(t);return Us.encodeByteArray(e,!0)},Zr=function(t){return rf(t).replace(/\./g,"")},es=function(t){try{return Us.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _w(t){return sf(void 0,t)}function sf(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!yw(n)||(t[n]=sf(t[n],e[n]));return t}function yw(t){return t!=="__proto__"}/**
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
 */function of(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ew=()=>of().__FIREBASE_DEFAULTS__,vw=()=>{if(typeof process>"u"||typeof Pu>"u")return;const t=Pu.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ww=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&es(t[1]);return e&&JSON.parse(e)},sc=()=>{try{return pw()||Ew()||vw()||ww()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},af=t=>sc()?.emulatorHosts?.[t],bw=t=>{const e=af(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},cf=()=>sc()?.config,lf=t=>sc()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function si(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function uf(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Sw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Zr(JSON.stringify(n)),Zr(JSON.stringify(o)),""].join(".")}const Ai={};function Cw(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ai))Ai[e]?t.emulator.push(e):t.prod.push(e);return t}function Tw(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Nu=!1;function df(t,e){if(typeof window>"u"||typeof document>"u"||!si(window.location.host)||Ai[t]===e||Ai[t]||Nu)return;Ai[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",s=Cw().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Nu=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=Tw(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),y=n("learnmore"),m=document.getElementById(y)||document.createElement("a"),T=n("preprendIcon"),H=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const j=h.element;a(j),u(m,y);const w=l();c(H,T),j.append(H,p,m,w),document.body.appendChild(j)}s?(p.innerText="Preview backend disconnected.",H.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(H.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function ye(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function oc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ye())}function Iw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function kw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function hf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Rw(){const t=ye();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Aw(){return tf.NODE_ADMIN===!0}function ac(){try{return typeof indexedDB=="object"}catch{return!1}}function Pw(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw="FirebaseError";class zt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Nw,Object.setPrototypeOf(this,zt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,oi.prototype.create)}}class oi{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?Lw(s,i):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new zt(r,a,i)}}function Lw(t,e){return t.replace(Ow,(n,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const Ow=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(t){return JSON.parse(t)}function ne(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff=function(t){let e={},n={},i={},r="";try{const s=t.split(".");e=zi(es(s[0])||""),n=zi(es(s[1])||""),r=s[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:r}},Dw=function(t){const e=ff(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Mw=function(t){const e=ff(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function zn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ts(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ns(t,e,n){const i={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[r]=e.call(n,t[r],r,t));return i}function dn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const r of n){if(!i.includes(r))return!1;const s=t[r],o=e[r];if(Lu(s)&&Lu(o)){if(!dn(s,o))return!1}else if(s!==o)return!1}for(const r of i)if(!n.includes(r))return!1;return!0}function Lu(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let r=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^s&(o^a),u=1518500249):(l=s^o^a,u=1859775393):d<60?(l=s&o|a&(s|o),u=2400959708):(l=s^o^a,u=3395469782);const h=(r<<5|r>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=r,r=h}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let r=0;const s=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=i;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(s[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}else for(;r<n;)if(s[o]=e[r],++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let r=0;r<5;r++)for(let s=24;s>=0;s-=8)e[i]=this.chain_[r]>>s&255,++i;return e}}function Fw(t,e){const n=new Uw(t,e);return n.subscribe.bind(n)}class Uw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let r;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");$w(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:i},r.next===void 0&&(r.next=wo),r.error===void 0&&(r.error=wo),r.complete===void 0&&(r.complete=wo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function $w(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function wo(){}function Gn(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bw=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);if(r>=55296&&r<=56319){const s=r-55296;i++,g(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;r=65536+(s<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},$s=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw=1e3,Ww=2,Vw=14400*1e3,jw=.5;function zw(t,e=Hw,n=Ww){const i=e*Math.pow(n,t),r=Math.round(jw*i*(Math.random()-.5)*2);return Math.min(Vw,i+r)}/**
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
 */function le(t){return t&&t._delegate?t._delegate:t}class gt{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new ve;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Yw(e))try{this.getOrInitializeService({instanceIdentifier:Xt})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=Xt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xt){return this.instances.has(e)}getOptions(e=Xt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);i===a&&o.resolve(r)}return r}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(i)??new Set;r.add(e),this.onInitCallbacks.set(i,r);const s=this.instances.get(i);return s&&e(s,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:qw(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Xt){return this.component?this.component.multipleInstances?e:Xt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qw(t){return t===Xt?void 0:t}function Yw(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Gw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(O||(O={}));const Jw={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Xw=O.INFO,Qw={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Zw=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),r=Qw[e];if(r)console[r](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bs{constructor(e){this.name=e,this._logLevel=Xw,this._logHandler=Zw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Jw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const eb=(t,e)=>e.some(n=>t instanceof n);let Ou,Du;function tb(){return Ou||(Ou=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nb(){return Du||(Du=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pf=new WeakMap,oa=new WeakMap,gf=new WeakMap,bo=new WeakMap,cc=new WeakMap;function ib(t){const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Nt(t.result)),r()},o=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&pf.set(n,t)}).catch(()=>{}),cc.set(e,t),e}function rb(t){if(oa.has(t))return;const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});oa.set(t,e)}let aa={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return oa.get(t);if(e==="objectStoreNames")return t.objectStoreNames||gf.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Nt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function sb(t){aa=t(aa)}function ob(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(So(this),e,...n);return gf.set(i,e.sort?e.sort():[e]),Nt(i)}:nb().includes(t)?function(...e){return t.apply(So(this),e),Nt(pf.get(this))}:function(...e){return Nt(t.apply(So(this),e))}}function ab(t){return typeof t=="function"?ob(t):(t instanceof IDBTransaction&&rb(t),eb(t,tb())?new Proxy(t,aa):t)}function Nt(t){if(t instanceof IDBRequest)return ib(t);if(bo.has(t))return bo.get(t);const e=ab(t);return e!==t&&(bo.set(t,e),cc.set(e,t)),e}const So=t=>cc.get(t);function cb(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const o=indexedDB.open(t,e),a=Nt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Nt(o.result),c.oldVersion,c.newVersion,Nt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const lb=["get","getKey","getAll","getAllKeys","count"],ub=["put","add","delete","clear"],Co=new Map;function Mu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Co.get(e))return Co.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=ub.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||lb.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return Co.set(e,s),s}sb(t=>({...t,get:(e,n,i)=>Mu(e,n)||t.get(e,n,i),has:(e,n)=>!!Mu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(hb(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function hb(t){return t.getComponent()?.type==="VERSION"}const ca="@firebase/app",xu="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new Bs("@firebase/app"),fb="@firebase/app-compat",pb="@firebase/analytics-compat",gb="@firebase/analytics",mb="@firebase/app-check-compat",_b="@firebase/app-check",yb="@firebase/auth",Eb="@firebase/auth-compat",vb="@firebase/database",wb="@firebase/data-connect",bb="@firebase/database-compat",Sb="@firebase/functions",Cb="@firebase/functions-compat",Tb="@firebase/installations",Ib="@firebase/installations-compat",kb="@firebase/messaging",Rb="@firebase/messaging-compat",Ab="@firebase/performance",Pb="@firebase/performance-compat",Nb="@firebase/remote-config",Lb="@firebase/remote-config-compat",Ob="@firebase/storage",Db="@firebase/storage-compat",Mb="@firebase/firestore",xb="@firebase/ai",Fb="@firebase/firestore-compat",Ub="firebase",$b="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="[DEFAULT]",Bb={[ca]:"fire-core",[fb]:"fire-core-compat",[gb]:"fire-analytics",[pb]:"fire-analytics-compat",[_b]:"fire-app-check",[mb]:"fire-app-check-compat",[yb]:"fire-auth",[Eb]:"fire-auth-compat",[vb]:"fire-rtdb",[wb]:"fire-data-connect",[bb]:"fire-rtdb-compat",[Sb]:"fire-fn",[Cb]:"fire-fn-compat",[Tb]:"fire-iid",[Ib]:"fire-iid-compat",[kb]:"fire-fcm",[Rb]:"fire-fcm-compat",[Ab]:"fire-perf",[Pb]:"fire-perf-compat",[Nb]:"fire-rc",[Lb]:"fire-rc-compat",[Ob]:"fire-gcs",[Db]:"fire-gcs-compat",[Mb]:"fire-fst",[Fb]:"fire-fst-compat",[xb]:"fire-vertex","fire-js":"fire-js",[Ub]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is=new Map,Hb=new Map,ua=new Map;function Fu(t,e){try{t.container.addComponent(e)}catch(n){mt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function $t(t){const e=t.name;if(ua.has(e))return mt.debug(`There were multiple attempts to register component ${e}.`),!1;ua.set(e,t);for(const n of is.values())Fu(n,t);for(const n of Hb.values())Fu(n,t);return!0}function dr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function xe(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Lt=new oi("app","Firebase",Wb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vb{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new gt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Lt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=$b;function mf(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:la,automaticDataCollectionEnabled:!0,...e},r=i.name;if(typeof r!="string"||!r)throw Lt.create("bad-app-name",{appName:String(r)});if(n||(n=cf()),!n)throw Lt.create("no-options");const s=is.get(r);if(s){if(dn(n,s.options)&&dn(i,s.config))return s;throw Lt.create("duplicate-app",{appName:r})}const o=new Kw(r);for(const c of ua.values())o.addComponent(c);const a=new Vb(n,i,o);return is.set(r,a),a}function lc(t=la){const e=is.get(t);if(!e&&t===la&&cf())return mf();if(!e)throw Lt.create("no-app",{appName:t});return e}function ht(t,e,n){let i=Bb[t]??t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),s=e.match(/\s|\//);if(r||s){const o=[`Unable to register library "${i}" with version "${e}":`];r&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),mt.warn(o.join(" "));return}$t(new gt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const jb="firebase-heartbeat-database",zb=1,Gi="firebase-heartbeat-store";let To=null;function _f(){return To||(To=cb(jb,zb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Gi)}catch(n){console.warn(n)}}}}).catch(t=>{throw Lt.create("idb-open",{originalErrorMessage:t.message})})),To}async function Gb(t){try{const n=(await _f()).transaction(Gi),i=await n.objectStore(Gi).get(yf(t));return await n.done,i}catch(e){if(e instanceof zt)mt.warn(e.message);else{const n=Lt.create("idb-get",{originalErrorMessage:e?.message});mt.warn(n.message)}}}async function Uu(t,e){try{const i=(await _f()).transaction(Gi,"readwrite");await i.objectStore(Gi).put(e,yf(t)),await i.done}catch(n){if(n instanceof zt)mt.warn(n.message);else{const i=Lt.create("idb-set",{originalErrorMessage:n?.message});mt.warn(i.message)}}}function yf(t){return`${t.name}!${t.options.appId}`}/**
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
 */const qb=1024,Yb=30;class Kb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Xb(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=$u();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(r=>r.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>Yb){const r=Qb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){mt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=$u(),{heartbeatsToSend:n,unsentEntries:i}=Jb(this._heartbeatsCache.heartbeats),r=Zr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return mt.warn(e),""}}}function $u(){return new Date().toISOString().substring(0,10)}function Jb(t,e=qb){const n=[];let i=t.slice();for(const r of t){const s=n.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),Bu(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Bu(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Xb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ac()?Pw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Gb(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Uu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Uu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Bu(t){return Zr(JSON.stringify({version:2,heartbeats:t})).length}function Qb(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zb(t){$t(new gt("platform-logger",e=>new db(e),"PRIVATE")),$t(new gt("heartbeat",e=>new Kb(e),"PRIVATE")),ht(ca,xu,t),ht(ca,xu,"esm2020"),ht("fire-js","")}Zb("");var Hu={};const Wu="@firebase/database",Vu="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ef="";function vf(t){Ef=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ne(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:zi(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return tt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new eS(e)}}catch{}return new tS},nn=wf("localStorage"),nS=wf("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An=new Bs("@firebase/database"),iS=(function(){let t=1;return function(){return t++}})(),bf=function(t){const e=Bw(t),n=new xw;n.update(e);const i=n.digest();return Us.encodeByteArray(i)},hr=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=hr.apply(null,i):typeof i=="object"?e+=ne(i):e+=i,e+=" "}return e};let Pi=null,ju=!0;const rS=function(t,e){g(!0,"Can't turn on custom loggers persistently."),An.logLevel=O.VERBOSE,Pi=An.log.bind(An)},oe=function(...t){if(ju===!0&&(ju=!1,Pi===null&&nS.get("logging_enabled")===!0&&rS()),Pi){const e=hr.apply(null,t);Pi(e)}},fr=function(t){return function(...e){oe(t,...e)}},da=function(...t){const e="FIREBASE INTERNAL ERROR: "+hr(...t);An.error(e)},_t=function(...t){const e=`FIREBASE FATAL ERROR: ${hr(...t)}`;throw An.error(e),new Error(e)},_e=function(...t){const e="FIREBASE WARNING: "+hr(...t);An.warn(e)},sS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&_e("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Hs=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},oS=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},qn="[MIN_NAME]",hn="[MAX_NAME]",bn=function(t,e){if(t===e)return 0;if(t===qn||e===hn)return-1;if(e===qn||t===hn)return 1;{const n=zu(t),i=zu(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},aS=function(t,e){return t===e?0:t<e?-1:1},Ei=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ne(e))},uc=function(t){if(typeof t!="object"||t===null)return ne(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=ne(e[i]),n+=":",n+=uc(t[e[i]]);return n+="}",n},Sf=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let r=0;r<n;r+=e)r+e>n?i.push(t.substring(r,n)):i.push(t.substring(r,r+e));return i};function ce(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Cf=function(t){g(!Hs(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let r,s,o,a,c;t===0?(s=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),s=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(r?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},cS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},lS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function uS(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const dS=new RegExp("^-?(0*)\\d{1,10}$"),hS=-2147483648,fS=2147483647,zu=function(t){if(dS.test(t)){const e=Number(t);if(e>=hS&&e<=fS)return e}return null},li=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw _e("Exception was thrown by user callback.",n),e},Math.floor(0))}},pS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ni=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class gS{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,xe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){_e(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mS{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(oe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',_e(e)}}class Hr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Hr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dc="5",Tf="v",If="s",kf="r",Rf="f",Af=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Pf="ls",Nf="p",ha="ac",Lf="websocket",Of="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e,n,i,r,s=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=r,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=nn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&nn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function _S(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Mf(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let i;if(e===Lf)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Of)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);_S(t)&&(n.ns=t.namespace);const r=[];return ce(n,(s,o)=>{r.push(s+"="+o)}),i+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yS{constructor(){this.counters_={}}incrementCounter(e,n=1){tt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return _w(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io={},ko={};function hc(t){const e=t.toString();return Io[e]||(Io[e]=new yS),Io[e]}function ES(t,e){const n=t.toString();return ko[n]||(ko[n]=e()),ko[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<i.length;++r)i[r]&&li(()=>{this.onMessage_(i[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu="start",wS="close",bS="pLPCommand",SS="pRTLPCB",xf="id",Ff="pw",Uf="ser",CS="cb",TS="seg",IS="ts",kS="d",RS="dframe",$f=1870,Bf=30,AS=$f-Bf,PS=25e3,NS=3e4;class kn{constructor(e,n,i,r,s,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=fr(e),this.stats_=hc(n),this.urlFn=c=>(this.appCheckToken&&(c[ha]=this.appCheckToken),Mf(n,Of,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new vS(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(NS)),oS(()=>{if(this.isClosed_)return;this.scriptTagHolder=new fc((...s)=>{const[o,a,c,l,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Gu)this.id=a,this.password=c;else if(o===wS)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Gu]="t",i[Uf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[CS]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Tf]=dc,this.transportSessionId&&(i[If]=this.transportSessionId),this.lastSessionId&&(i[Pf]=this.lastSessionId),this.applicationId&&(i[Nf]=this.applicationId),this.appCheckToken&&(i[ha]=this.appCheckToken),typeof location<"u"&&location.hostname&&Af.test(location.hostname)&&(i[kf]=Rf);const r=this.urlFn(i);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){kn.forceAllow_=!0}static forceDisallow(){kn.forceDisallow_=!0}static isAvailable(){return kn.forceAllow_?!0:!kn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!cS()&&!lS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=rf(n),r=Sf(i,AS);for(let s=0;s<r.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[RS]="t",i[xf]=e,i[Ff]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ne(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class fc{constructor(e,n,i,r){this.onDisconnect=i,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=iS(),window[bS+this.uniqueCallbackIdentifier]=e,window[SS+this.uniqueCallbackIdentifier]=n,this.myIFrame=fc.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){oe("frame writing exception"),a.stack&&oe(a.stack),oe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||oe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[xf]=this.myID,e[Ff]=this.myPW,e[Uf]=this.currentSerial;let n=this.urlFn(e),i="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Bf+i.length<=$f;){const o=this.pendingSegs.shift();i=i+"&"+TS+r+"="+o.seg+"&"+IS+r+"="+o.ts+"&"+kS+r+"="+o.d,r++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(i,Math.floor(PS)),s=()=>{clearTimeout(r),i()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const r=i.readyState;(!r||r==="loaded"||r==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{oe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LS=16384,OS=45e3;let rs=null;typeof MozWebSocket<"u"?rs=MozWebSocket:typeof WebSocket<"u"&&(rs=WebSocket);class Fe{constructor(e,n,i,r,s,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=fr(this.connId),this.stats_=hc(n),this.connURL=Fe.connectionURL_(n,o,a,r,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,r,s){const o={};return o[Tf]=dc,typeof location<"u"&&location.hostname&&Af.test(location.hostname)&&(o[kf]=Rf),n&&(o[If]=n),i&&(o[Pf]=i),r&&(o[ha]=r),s&&(o[Nf]=s),Mf(e,Lf,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,nn.set("previous_websocket_failure",!0);try{let i;Aw(),this.mySock=new rs(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const r=i.message||i.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const r=i.message||i.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){Fe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&rs!==null&&!Fe.forceDisallow_}static previouslyFailed(){return nn.isInMemoryStorage||nn.get("previous_websocket_failure")===!0}markConnectionHealthy(){nn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=zi(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Sf(n,LS);i.length>1&&this.sendString_(String(i.length));for(let r=0;r<i.length;r++)this.sendString_(i[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(OS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Fe.responsesRequiredToBeHealthy=2;Fe.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{static get ALL_TRANSPORTS(){return[kn,Fe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Fe&&Fe.isAvailable();let i=n&&!Fe.previouslyFailed();if(e.webSocketOnly&&(n||_e("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Fe];else{const r=this.transports_=[];for(const s of qi.ALL_TRANSPORTS)s&&s.isAvailable()&&r.push(s);qi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}qi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DS=6e4,MS=5e3,xS=10*1024,FS=100*1024,Ro="t",qu="d",US="s",Yu="r",$S="e",Ku="o",Ju="a",Xu="n",Qu="p",BS="h";class HS{constructor(e,n,i,r,s,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=r,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=fr("c:"+this.id+":"),this.transportManager_=new qi(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Ni(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>FS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>xS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ro in e){const n=e[Ro];n===Ju?this.upgradeIfSecondaryHealthy_():n===Yu?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Ku&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ei("t",e),i=Ei("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Qu,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ju,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Xu,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ei("t",e),i=Ei("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ei(Ro,e);if(qu in e){const i=e[qu];if(n===BS){const r={...i};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===Xu){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===US?this.onConnectionShutdown_(i):n===Yu?this.onReset_(i):n===$S?da("Server Error: "+i):n===Ku?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):da("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),dc!==i&&_e("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),Ni(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(DS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ni(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(MS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Qu,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(nn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{put(e,n,i,r){}merge(e,n,i,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let r=0;r<i.length;r++)i[r].callback.apply(i[r].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const r=this.getInitialEvent(e);r&&n.apply(i,r)}off(e,n,i){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let s=0;s<r.length;s++)if(r[s].callback===n&&(!i||i===r[s].context)){r.splice(s,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss extends Wf{static getInstance(){return new ss}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!oc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu=32,ed=768;class L{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[i]=this.pieces_[r],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function N(){return new L("")}function I(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Bt(t){return t.pieces_.length-t.pieceNum_}function M(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new L(t.pieces_,e)}function pc(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function WS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Yi(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Vf(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new L(e,0)}function K(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof L)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let r=0;r<i.length;r++)i[r].length>0&&n.push(i[r])}return new L(n,0)}function k(t){return t.pieceNum_>=t.pieces_.length}function me(t,e){const n=I(t),i=I(e);if(n===null)return e;if(n===i)return me(M(t),M(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function VS(t,e){const n=Yi(t,0),i=Yi(e,0);for(let r=0;r<n.length&&r<i.length;r++){const s=bn(n[r],i[r]);if(s!==0)return s}return n.length===i.length?0:n.length<i.length?-1:1}function gc(t,e){if(Bt(t)!==Bt(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function Pe(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Bt(t)>Bt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class jS{constructor(e,n){this.errorPrefix_=n,this.parts_=Yi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=$s(this.parts_[i]);jf(this)}}function zS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=$s(e),jf(t)}function GS(t){const e=t.parts_.pop();t.byteLength_-=$s(e),t.parts_.length>0&&(t.byteLength_-=1)}function jf(t){if(t.byteLength_>ed)throw new Error(t.errorPrefix_+"has a key path longer than "+ed+" bytes ("+t.byteLength_+").");if(t.parts_.length>Zu)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Zu+") or object contains a cycle "+Qt(t))}function Qt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc extends Wf{static getInstance(){return new mc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi=1e3,qS=300*1e3,td=30*1e3,YS=1.3,KS=3e4,JS="server_kill",nd=3;class ft extends Hf{constructor(e,n,i,r,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=r,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=ft.nextPersistentConnectionId_++,this.log_=fr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=vi,this.maxReconnectDelay_=qS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");mc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ss.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const r=++this.requestNumber_,s={r,a:e,b:n};this.log_(ne(s)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),i&&(this.requestCBHash_[r]=i)}get(e){this.initConnection_();const n=new ve,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,i,r){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:i};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+i+" for "+r);const s={p:i},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const c=a.d,l=a.s;ft.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&tt(e,"w")){const i=zn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();_e(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Mw(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=td)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Dw(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,r=>{const s=r.s,o=r.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+r),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,r)&&this.connected_&&this.sendUnlisten_(i,r,e._queryObject,n)}sendUnlisten_(e,n,i,r){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";r&&(s.q=i,s.t=r),this.sendRequest(o,s)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,r){const s={p:n,d:i};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,i,r){this.putInternal("p",e,n,i,r)}merge(e,n,i,r){this.putInternal("m",e,n,i,r)}putInternal(e,n,i,r,s){this.initConnection_();const o={p:n,d:i};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const s=i.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ne(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):da("Unrecognized action received from server: "+ne(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>KS&&(this.reconnectDelay_=vi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*YS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+ft.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?oe("getToken() completed but was canceled"):(oe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new HS(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{_e(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(JS)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&_e(d),c())}}}interrupt(e){oe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){oe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ts(this.interruptReasons_)&&(this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(s=>uc(s)).join("$"):i="default";const r=this.removeListen_(e,i);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const i=new L(e).toString();let r;if(this.listens.has(i)){const s=this.listens.get(i);r=s.get(n),s.delete(n),s.size===0&&this.listens.delete(i)}else r=void 0;return r}onAuthRevoked_(e,n){oe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=nd&&(this.reconnectDelay_=td,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){oe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=nd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Ef.replace(/\./g,"-")]=1,oc()?e["framework.cordova"]=1:hf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ss.getInstance().currentlyOnline();return ts(this.interruptReasons_)&&e}}ft.nextPersistentConnectionId_=0;ft.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ws{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new R(qn,e),r=new R(qn,n);return this.compare(i,r)!==0}minPost(){return R.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ar;class zf extends Ws{static get __EMPTY_NODE(){return Ar}static set __EMPTY_NODE(e){Ar=e}compare(e,n){return bn(e.name,n.name)}isDefinedOn(e){throw ri("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return R.MIN}maxPost(){return new R(hn,Ar)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new R(e,Ar)}toString(){return".key"}}const Pn=new zf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,n,i,r,s=null){this.isReverse_=r,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class se{constructor(e,n,i,r,s){this.key=e,this.value=n,this.color=i??se.RED,this.left=r??we.EMPTY_NODE,this.right=s??we.EMPTY_NODE}copy(e,n,i,r,s){return new se(e??this.key,n??this.value,i??this.color,r??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let r=this;const s=i(e,r.key);return s<0?r=r.copy(null,null,null,r.left.insert(e,n,i),null):s===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,i)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return we.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,r;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return we.EMPTY_NODE;r=i.right.min_(),i=i.copy(r.key,r.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}se.RED=!0;se.BLACK=!1;class XS{copy(e,n,i,r,s){return this}insert(e,n,i){return new se(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class we{constructor(e,n=we.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new we(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,se.BLACK,null,null))}remove(e){return new we(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,se.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,r=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return r?r.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(r=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Pr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Pr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Pr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Pr(this.root_,null,this.comparator_,!0,e)}}we.EMPTY_NODE=new XS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QS(t,e){return bn(t.name,e.name)}function _c(t,e){return bn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fa;function ZS(t){fa=t}const Gf=function(t){return typeof t=="number"?"number:"+Cf(t):"string:"+t},qf=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&tt(e,".sv"),"Priority must be a string or number.")}else g(t===fa||t.isEmpty(),"priority of unexpected type.");g(t===fa||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let id;class re{static set __childrenNodeConstructor(e){id=e}static get __childrenNodeConstructor(){return id}constructor(e,n=re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),qf(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return k(e)?this:I(e)===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=I(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||Bt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,re.__childrenNodeConstructor.EMPTY_NODE.updateChild(M(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Gf(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Cf(this.value_):e+=this.value_,this.lazyHash_=bf(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof re.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,r=re.VALUE_TYPE_ORDER.indexOf(n),s=re.VALUE_TYPE_ORDER.indexOf(i);return g(r>=0,"Unknown leaf type: "+n),g(s>=0,"Unknown leaf type: "+i),r===s?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}re.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yf,Kf;function eC(t){Yf=t}function tC(t){Kf=t}class nC extends Ws{compare(e,n){const i=e.node.getPriority(),r=n.node.getPriority(),s=i.compareTo(r);return s===0?bn(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return R.MIN}maxPost(){return new R(hn,new re("[PRIORITY-POST]",Kf))}makePost(e,n){const i=Yf(e);return new R(n,new re("[PRIORITY-POST]",i))}toString(){return".priority"}}const J=new nC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iC=Math.log(2);class rC{constructor(e){const n=s=>parseInt(Math.log(s)/iC,10),i=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=i(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const os=function(t,e,n,i){t.sort(e);const r=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new se(h,d.node,se.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=r(c,f),y=r(f+1,l);return d=t[f],h=n?n(d):d,new se(h,d.node,se.BLACK,p,y)}},s=function(c){let l=null,u=null,d=t.length;const h=function(p,y){const m=d-p,T=d;d-=p;const H=r(m+1,T),j=t[m],w=n?n(j):j;f(new se(w,j.node,y,null,H))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const y=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));y?h(m,se.BLACK):(h(m,se.BLACK),h(m,se.RED))}return u},o=new rC(t.length),a=s(o);return new we(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ao;const Tn={};class rt{static get Default(){return g(Tn&&J,"ChildrenNode.ts has not been loaded"),Ao=Ao||new rt({".priority":Tn},{".priority":J}),Ao}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=zn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof we?n:null}hasIndex(e){return tt(this.indexSet_,e.toString())}addIndex(e,n){g(e!==Pn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let r=!1;const s=n.getIterator(R.Wrap);let o=s.getNext();for(;o;)r=r||e.isDefinedOn(o.node),i.push(o),o=s.getNext();let a;r?a=os(i,e.getCompare()):a=Tn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new rt(u,l)}addToIndexes(e,n){const i=ns(this.indexes_,(r,s)=>{const o=zn(this.indexSet_,s);if(g(o,"Missing index implementation for "+s),r===Tn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(R.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),os(a,o.getCompare())}else return Tn;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new R(e.name,a))),c.insert(e,e.node)}});return new rt(i,this.indexSet_)}removeFromIndexes(e,n){const i=ns(this.indexes_,r=>{if(r===Tn)return r;{const s=n.get(e.name);return s?r.remove(new R(e.name,s)):r}});return new rt(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wi;class v{static get EMPTY_NODE(){return wi||(wi=new v(new we(_c),null,rt.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&qf(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||wi}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?wi:n}}getChild(e){const n=I(e);return n===null?this:this.getImmediateChild(n).getChild(M(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new R(e,n);let r,s;n.isEmpty()?(r=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(i,this.children_)):(r=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(i,this.children_));const o=r.isEmpty()?wi:this.priorityNode_;return new v(r,o,s)}}updateChild(e,n){const i=I(e);if(i===null)return n;{g(I(e)!==".priority"||Bt(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(i).updateChild(M(e),n);return this.updateImmediateChild(i,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,r=0,s=!0;if(this.forEachChild(J,(o,a)=>{n[o]=a.val(e),i++,s&&v.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):s=!1}),!e&&s&&r<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Gf(this.getPriority().val())+":"),this.forEachChild(J,(n,i)=>{const r=i.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":bf(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const r=this.resolveIndex_(i);if(r){const s=r.getPredecessorKey(new R(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new R(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new R(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,R.Wrap);let s=r.peek();for(;s!=null&&n.compare(s,e)<0;)r.getNext(),s=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,R.Wrap);let s=r.peek();for(;s!=null&&n.compare(s,e)>0;)r.getNext(),s=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===pr?-1:0}withIndex(e){if(e===Pn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Pn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(J),r=n.getIterator(J);let s=i.getNext(),o=r.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=i.getNext(),o=r.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Pn?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class sC extends v{constructor(){super(new we(_c),v.EMPTY_NODE,rt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const pr=new sC;Object.defineProperties(R,{MIN:{value:new R(qn,v.EMPTY_NODE)},MAX:{value:new R(hn,pr)}});zf.__EMPTY_NODE=v.EMPTY_NODE;re.__childrenNodeConstructor=v;ZS(pr);tC(pr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oC=!0;function X(t,e=null){if(t===null)return v.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new re(n,X(e))}if(!(t instanceof Array)&&oC){const n=[];let i=!1;if(ce(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=X(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new R(o,c)))}}),n.length===0)return v.EMPTY_NODE;const s=os(n,QS,o=>o.name,_c);if(i){const o=os(n,J.getCompare());return new v(s,X(e),new rt({".priority":o},{".priority":J}))}else return new v(s,X(e),rt.Default)}else{let n=v.EMPTY_NODE;return ce(t,(i,r)=>{if(tt(t,i)&&i.substring(0,1)!=="."){const s=X(r);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(i,s))}}),n.updatePriority(X(e))}}eC(X);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aC extends Ws{constructor(e){super(),this.indexPath_=e,g(!k(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),r=this.extractChild(n.node),s=i.compareTo(r);return s===0?bn(e.name,n.name):s}makePost(e,n){const i=X(e),r=v.EMPTY_NODE.updateChild(this.indexPath_,i);return new R(n,r)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,pr);return new R(hn,e)}toString(){return Yi(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cC extends Ws{compare(e,n){const i=e.node.compareTo(n.node);return i===0?bn(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return R.MIN}maxPost(){return R.MAX}makePost(e,n){const i=X(e);return new R(n,i)}toString(){return".value"}}const lC=new cC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(t){return{type:"value",snapshotNode:t}}function Yn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ki(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ji(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function uC(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e){this.index_=e}updateChild(e,n,i,r,s,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(i.getChild(r))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Ki(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Yn(n,i)):o.trackChildChange(Ji(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(J,(r,s)=>{n.hasChild(r)||i.trackChildChange(Ki(r,s))}),n.isLeafNode()||n.forEachChild(J,(r,s)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(s)||i.trackChildChange(Ji(r,s,o))}else i.trackChildChange(Yn(r,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e){this.indexedFilter_=new yc(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Xi.getStartPost_(e),this.endPost_=Xi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,r,s,o){return this.matches(new R(n,i))||(i=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,r,s,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=v.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(v.EMPTY_NODE);const s=this;return n.forEachChild(J,(o,a)=>{s.matches(new R(o,a))||(r=r.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dC{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Xi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,r,s,o){return this.rangedFilter_.matches(new R(n,i))||(i=v.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,r,s,o):this.fullLimitUpdateChild_(e,n,i,s,o)}updateFullNode(e,n,i){let r;if(n.isLeafNode()||n.isEmpty())r=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=v.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(v.EMPTY_NODE);let s;this.reverse_?s=r.getReverseIterator(this.index_):s=r.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,r,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new R(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=r.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return s?.trackChildChange(Ji(n,i,d)),a.updateImmediateChild(n,i);{s?.trackChildChange(Ki(n,d));const y=a.updateImmediateChild(n,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(s?.trackChildChange(Yn(h.name,h.node)),y.updateImmediateChild(h.name,h.node)):y}}else return i.isEmpty()?e:u&&o(l,c)>=0?(s!=null&&(s.trackChildChange(Ki(l.name,l.node)),s.trackChildChange(Yn(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=J}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:qn}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:hn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===J}copy(){const e=new Vs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function hC(t){return t.loadsAllData()?new yc(t.getIndex()):t.hasLimit()?new dC(t):new Xi(t)}function rd(t){const e={};if(t.isDefault())return e;let n;if(t.index_===J?n="$priority":t.index_===lC?n="$value":t.index_===Pn?n="$key":(g(t.index_ instanceof aC,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ne(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=ne(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+ne(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=ne(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+ne(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function sd(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==J&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as extends Hf{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=r,this.log_=fr("p:rest:"),this.listens_={}}listen(e,n,i,r){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=as.getListenId_(e,i),a={};this.listens_[o]=a;const c=rd(e._queryParams);this.restRequest_(s+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(s,d,!1,i),zn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",r(h,null)}})}unlisten(e,n){const i=as.getListenId_(e,n);delete this.listens_[i]}get(e){const n=rd(e._queryParams),i=e._path.toString(),r=new ve;return this.restRequest_(i+".json",n,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(i,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,s])=>{r&&r.accessToken&&(n.auth=r.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ai(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=zi(a.responseText)}catch{_e("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&_e("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fC{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cs(){return{value:null,children:new Map}}function ui(t,e,n){if(k(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=I(e);t.children.has(i)||t.children.set(i,cs());const r=t.children.get(i);e=M(e),ui(r,e,n)}}function pa(t,e){if(k(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(J,(i,r)=>{ui(t,new L(i),r)}),pa(t,e)}}else if(t.children.size>0){const n=I(e);return e=M(e),t.children.has(n)&&pa(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function ga(t,e,n){t.value!==null?n(e,t.value):pC(t,(i,r)=>{const s=new L(e.toString()+"/"+i);ga(r,s,n)})}function pC(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gC{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ce(this.last_,(i,r)=>{n[i]=n[i]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od=10*1e3,mC=30*1e3,_C=300*1e3;class yC{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new gC(e);const i=od+(mC-od)*Math.random();Ni(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ce(e,(r,s)=>{s>0&&tt(this.statsToReport_,r)&&(n[r]=s,i=!0)}),i&&this.server_.reportStats(n),Ni(this.reportStats_.bind(this),Math.floor(Math.random()*2*_C))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ue;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ue||(Ue={}));function Ec(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function vc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function wc(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=Ue.ACK_USER_WRITE,this.source=Ec()}operationForChild(e){if(k(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new L(e));return new ls(N(),n,this.revert)}}else return g(I(this.path)===e,"operationForChild called for unrelated child."),new ls(M(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,n){this.source=e,this.path=n,this.type=Ue.LISTEN_COMPLETE}operationForChild(e){return k(this.path)?new Qi(this.source,N()):new Qi(this.source,M(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=Ue.OVERWRITE}operationForChild(e){return k(this.path)?new fn(this.source,N(),this.snap.getImmediateChild(e)):new fn(this.source,M(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=Ue.MERGE}operationForChild(e){if(k(this.path)){const n=this.children.subtree(new L(e));return n.isEmpty()?null:n.value?new fn(this.source,N(),n.value):new Kn(this.source,N(),n)}else return g(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Kn(this.source,M(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;const n=I(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EC{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function vC(t,e,n,i){const r=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(uC(o.childName,o.snapshotNode))}),bi(t,r,"child_removed",e,i,n),bi(t,r,"child_added",e,i,n),bi(t,r,"child_moved",s,i,n),bi(t,r,"child_changed",e,i,n),bi(t,r,"value",e,i,n),r}function bi(t,e,n,i,r,s){const o=i.filter(a=>a.type===n);o.sort((a,c)=>bC(t,a,c)),o.forEach(a=>{const c=wC(t,a,s);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function wC(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function bC(t,e,n){if(e.childName==null||n.childName==null)throw ri("Should only compare child_ events.");const i=new R(e.childName,e.snapshotNode),r=new R(n.childName,n.snapshotNode);return t.index_.compare(i,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function js(t,e){return{eventCache:t,serverCache:e}}function Li(t,e,n,i){return js(new Ht(e,n,i),t.serverCache)}function Xf(t,e,n,i){return js(t.eventCache,new Ht(e,n,i))}function us(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function pn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Po;const SC=()=>(Po||(Po=new we(aS)),Po);class F{static fromObject(e){let n=new F(null);return ce(e,(i,r)=>{n=n.set(new L(i),r)}),n}constructor(e,n=SC()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:N(),value:this.value};if(k(e))return null;{const i=I(e),r=this.children.get(i);if(r!==null){const s=r.findRootMostMatchingPathAndValue(M(e),n);return s!=null?{path:K(new L(i),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(k(e))return this;{const n=I(e),i=this.children.get(n);return i!==null?i.subtree(M(e)):new F(null)}}set(e,n){if(k(e))return new F(n,this.children);{const i=I(e),s=(this.children.get(i)||new F(null)).set(M(e),n),o=this.children.insert(i,s);return new F(this.value,o)}}remove(e){if(k(e))return this.children.isEmpty()?new F(null):new F(null,this.children);{const n=I(e),i=this.children.get(n);if(i){const r=i.remove(M(e));let s;return r.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,r),this.value===null&&s.isEmpty()?new F(null):new F(this.value,s)}else return this}}get(e){if(k(e))return this.value;{const n=I(e),i=this.children.get(n);return i?i.get(M(e)):null}}setTree(e,n){if(k(e))return n;{const i=I(e),s=(this.children.get(i)||new F(null)).setTree(M(e),n);let o;return s.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,s),new F(this.value,o)}}fold(e){return this.fold_(N(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((r,s)=>{i[r]=s.fold_(K(e,r),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,N(),n)}findOnPath_(e,n,i){const r=this.value?i(n,this.value):!1;if(r)return r;if(k(e))return null;{const s=I(e),o=this.children.get(s);return o?o.findOnPath_(M(e),K(n,s),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,N(),n)}foreachOnPath_(e,n,i){if(k(e))return this;{this.value&&i(n,this.value);const r=I(e),s=this.children.get(r);return s?s.foreachOnPath_(M(e),K(n,r),i):new F(null)}}foreach(e){this.foreach_(N(),e)}foreach_(e,n){this.children.inorderTraversal((i,r)=>{r.foreach_(K(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.writeTree_=e}static empty(){return new We(new F(null))}}function Oi(t,e,n){if(k(e))return new We(new F(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const r=i.path;let s=i.value;const o=me(r,e);return s=s.updateChild(o,n),new We(t.writeTree_.set(r,s))}else{const r=new F(n),s=t.writeTree_.setTree(e,r);return new We(s)}}}function ma(t,e,n){let i=t;return ce(n,(r,s)=>{i=Oi(i,K(e,r),s)}),i}function ad(t,e){if(k(e))return We.empty();{const n=t.writeTree_.setTree(e,new F(null));return new We(n)}}function _a(t,e){return Sn(t,e)!=null}function Sn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(me(n.path,e)):null}function cd(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(J,(i,r)=>{e.push(new R(i,r))}):t.writeTree_.children.inorderTraversal((i,r)=>{r.value!=null&&e.push(new R(i,r.value))}),e}function Ot(t,e){if(k(e))return t;{const n=Sn(t,e);return n!=null?new We(new F(n)):new We(t.writeTree_.subtree(e))}}function ya(t){return t.writeTree_.isEmpty()}function Jn(t,e){return Qf(N(),t.writeTree_,e)}function Qf(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((r,s)=>{r===".priority"?(g(s.value!==null,"Priority writes must always be leaf nodes"),i=s.value):n=Qf(K(t,r),s,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(K(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(t,e){return np(e,t)}function CC(t,e,n,i,r){g(i>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:r}),r&&(t.visibleWrites=Oi(t.visibleWrites,e,n)),t.lastWriteId=i}function TC(t,e,n,i){g(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=ma(t.visibleWrites,e,n),t.lastWriteId=i}function IC(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function kC(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let r=i.visible,s=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&RC(a,i.path)?r=!1:Pe(i.path,a.path)&&(s=!0)),o--}if(r){if(s)return AC(t),!0;if(i.snap)t.visibleWrites=ad(t.visibleWrites,i.path);else{const a=i.children;ce(a,c=>{t.visibleWrites=ad(t.visibleWrites,K(i.path,c))})}return!0}else return!1}function RC(t,e){if(t.snap)return Pe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Pe(K(t.path,n),e))return!0;return!1}function AC(t){t.visibleWrites=Zf(t.allWrites,PC,N()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function PC(t){return t.visible}function Zf(t,e,n){let i=We.empty();for(let r=0;r<t.length;++r){const s=t[r];if(e(s)){const o=s.path;let a;if(s.snap)Pe(n,o)?(a=me(n,o),i=Oi(i,a,s.snap)):Pe(o,n)&&(a=me(o,n),i=Oi(i,N(),s.snap.getChild(a)));else if(s.children){if(Pe(n,o))a=me(n,o),i=ma(i,a,s.children);else if(Pe(o,n))if(a=me(o,n),k(a))i=ma(i,N(),s.children);else{const c=zn(s.children,I(a));if(c){const l=c.getChild(M(a));i=Oi(i,N(),l)}}}else throw ri("WriteRecord should have .snap or .children")}}return i}function ep(t,e,n,i,r){if(!i&&!r){const s=Sn(t.visibleWrites,e);if(s!=null)return s;{const o=Ot(t.visibleWrites,e);if(ya(o))return n;if(n==null&&!_a(o,N()))return null;{const a=n||v.EMPTY_NODE;return Jn(o,a)}}}else{const s=Ot(t.visibleWrites,e);if(!r&&ya(s))return n;if(!r&&n==null&&!_a(s,N()))return null;{const o=function(l){return(l.visible||r)&&(!i||!~i.indexOf(l.writeId))&&(Pe(l.path,e)||Pe(e,l.path))},a=Zf(t.allWrites,o,e),c=n||v.EMPTY_NODE;return Jn(a,c)}}}function NC(t,e,n){let i=v.EMPTY_NODE;const r=Sn(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(J,(s,o)=>{i=i.updateImmediateChild(s,o)}),i;if(n){const s=Ot(t.visibleWrites,e);return n.forEachChild(J,(o,a)=>{const c=Jn(Ot(s,new L(o)),a);i=i.updateImmediateChild(o,c)}),cd(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const s=Ot(t.visibleWrites,e);return cd(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function LC(t,e,n,i,r){g(i||r,"Either existingEventSnap or existingServerSnap must exist");const s=K(e,n);if(_a(t.visibleWrites,s))return null;{const o=Ot(t.visibleWrites,s);return ya(o)?r.getChild(n):Jn(o,r.getChild(n))}}function OC(t,e,n,i){const r=K(e,n),s=Sn(t.visibleWrites,r);if(s!=null)return s;if(i.isCompleteForChild(n)){const o=Ot(t.visibleWrites,r);return Jn(o,i.getNode().getImmediateChild(n))}else return null}function DC(t,e){return Sn(t.visibleWrites,e)}function MC(t,e,n,i,r,s,o){let a;const c=Ot(t.visibleWrites,e),l=Sn(c,N());if(l!=null)a=l;else if(n!=null)a=Jn(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=s?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<r;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function xC(){return{visibleWrites:We.empty(),allWrites:[],lastWriteId:-1}}function ds(t,e,n,i){return ep(t.writeTree,t.treePath,e,n,i)}function bc(t,e){return NC(t.writeTree,t.treePath,e)}function ld(t,e,n,i){return LC(t.writeTree,t.treePath,e,n,i)}function hs(t,e){return DC(t.writeTree,K(t.treePath,e))}function FC(t,e,n,i,r,s){return MC(t.writeTree,t.treePath,e,n,i,r,s)}function Sc(t,e,n){return OC(t.writeTree,t.treePath,e,n)}function tp(t,e){return np(K(t.treePath,e),t.writeTree)}function np(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(i);if(r){const s=r.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(i,Ji(i,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(i,Ki(i,r.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(i,Yn(i,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(i,Ji(i,e.snapshotNode,r.oldSnap));else throw ri("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $C{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const ip=new $C;class Cc{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Ht(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Sc(this.writes_,e,i)}}getChildAfterChild(e,n,i){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:pn(this.viewCache_),s=FC(this.writes_,r,n,1,i,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BC(t){return{filter:t}}function HC(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function WC(t,e,n,i,r){const s=new UC;let o,a;if(n.type===Ue.OVERWRITE){const l=n;l.source.fromUser?o=Ea(t,e,l.path,l.snap,i,r,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!k(l.path),o=fs(t,e,l.path,l.snap,i,r,a,s))}else if(n.type===Ue.MERGE){const l=n;l.source.fromUser?o=jC(t,e,l.path,l.children,i,r,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=va(t,e,l.path,l.children,i,r,a,s))}else if(n.type===Ue.ACK_USER_WRITE){const l=n;l.revert?o=qC(t,e,l.path,i,r,s):o=zC(t,e,l.path,l.affectedTree,i,r,s)}else if(n.type===Ue.LISTEN_COMPLETE)o=GC(t,e,n.path,i,s);else throw ri("Unknown operation type: "+n.type);const c=s.getChanges();return VC(e,o,c),{viewCache:o,changes:c}}function VC(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const r=i.getNode().isLeafNode()||i.getNode().isEmpty(),s=us(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!i.getNode().equals(s)||!i.getNode().getPriority().equals(s.getPriority()))&&n.push(Jf(us(e)))}}function rp(t,e,n,i,r,s){const o=e.eventCache;if(hs(i,n)!=null)return e;{let a,c;if(k(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=pn(e),u=l instanceof v?l:v.EMPTY_NODE,d=bc(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const l=ds(i,pn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{const l=I(n);if(l===".priority"){g(Bt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=ld(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=M(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=ld(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Sc(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,r,s):a=o.getNode()}}return Li(e,a,o.isFullyInitialized()||k(n),t.filter.filtersNodes())}}function fs(t,e,n,i,r,s,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(k(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(n);if(!c.isCompleteForPath(n)&&Bt(n)>1)return e;const p=M(n),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,ip,null)}const d=Xf(e,l,c.isFullyInitialized()||k(n),u.filtersNodes()),h=new Cc(r,d,s);return rp(t,d,n,r,h,a)}function Ea(t,e,n,i,r,s,o){const a=e.eventCache;let c,l;const u=new Cc(r,e,s);if(k(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Li(e,l,!0,t.filter.filtersNodes());else{const d=I(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=Li(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=M(n),f=a.getNode().getImmediateChild(d);let p;if(k(h))p=i;else{const y=u.getCompleteChild(d);y!=null?pc(h)===".priority"&&y.getChild(Vf(h)).isEmpty()?p=y:p=y.updateChild(h,i):p=v.EMPTY_NODE}if(f.equals(p))c=e;else{const y=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Li(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function ud(t,e){return t.eventCache.isCompleteForChild(e)}function jC(t,e,n,i,r,s,o){let a=e;return i.foreach((c,l)=>{const u=K(n,c);ud(e,I(u))&&(a=Ea(t,a,u,l,r,s,o))}),i.foreach((c,l)=>{const u=K(n,c);ud(e,I(u))||(a=Ea(t,a,u,l,r,s,o))}),a}function dd(t,e,n){return n.foreach((i,r)=>{e=e.updateChild(i,r)}),e}function va(t,e,n,i,r,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;k(n)?l=i:l=new F(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=dd(t,f,h);c=fs(t,c,new L(d),p,r,s,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),y=dd(t,p,h);c=fs(t,c,new L(d),y,r,s,o,a)}}),c}function zC(t,e,n,i,r,s,o){if(hs(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return fs(t,e,n,c.getNode().getChild(n),r,s,a,o);if(k(n)){let l=new F(null);return c.getNode().forEachChild(Pn,(u,d)=>{l=l.set(new L(u),d)}),va(t,e,n,l,r,s,a,o)}else return e}else{let l=new F(null);return i.foreach((u,d)=>{const h=K(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),va(t,e,n,l,r,s,a,o)}}function GC(t,e,n,i,r){const s=e.serverCache,o=Xf(e,s.getNode(),s.isFullyInitialized()||k(n),s.isFiltered());return rp(t,o,n,i,ip,r)}function qC(t,e,n,i,r,s){let o;if(hs(i,n)!=null)return e;{const a=new Cc(i,e,r),c=e.eventCache.getNode();let l;if(k(n)||I(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=ds(i,pn(e));else{const d=e.serverCache.getNode();g(d instanceof v,"serverChildren would be complete if leaf node"),u=bc(i,d)}u=u,l=t.filter.updateFullNode(c,u,s)}else{const u=I(n);let d=Sc(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,M(n),a,s):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,v.EMPTY_NODE,M(n),a,s):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=ds(i,pn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||hs(i,N())!=null,Li(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YC{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,r=new yc(i.getIndex()),s=hC(i);this.processor_=BC(s);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new Ht(c,o.isFullyInitialized(),r.filtersNodes()),d=new Ht(l,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=js(d,u),this.eventGenerator_=new EC(this.query_)}get query(){return this.query_}}function KC(t){return t.viewCache_.serverCache.getNode()}function JC(t){return us(t.viewCache_)}function XC(t,e){const n=pn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!k(e)&&!n.getImmediateChild(I(e)).isEmpty())?n.getChild(e):null}function hd(t){return t.eventRegistrations_.length===0}function QC(t,e){t.eventRegistrations_.push(e)}function fd(t,e,n){const i=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,r);o&&i.push(o)})}if(e){let r=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return i}function pd(t,e,n,i){e.type===Ue.MERGE&&e.source.queryId!==null&&(g(pn(t.viewCache_),"We should always have a full cache before handling merges"),g(us(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,s=WC(t.processor_,r,e,n,i);return HC(t.processor_,s.viewCache),g(s.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,sp(t,s.changes,s.viewCache.eventCache.getNode(),null)}function ZC(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(J,(s,o)=>{i.push(Yn(s,o))}),n.isFullyInitialized()&&i.push(Jf(n.getNode())),sp(t,i,n.getNode(),e)}function sp(t,e,n,i){const r=i?[i]:t.eventRegistrations_;return vC(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ps;class op{constructor(){this.views=new Map}}function eT(t){g(!ps,"__referenceConstructor has already been defined"),ps=t}function tT(){return g(ps,"Reference.ts has not been loaded"),ps}function nT(t){return t.views.size===0}function Tc(t,e,n,i){const r=e.source.queryId;if(r!==null){const s=t.views.get(r);return g(s!=null,"SyncTree gave us an op for an invalid query."),pd(s,e,n,i)}else{let s=[];for(const o of t.views.values())s=s.concat(pd(o,e,n,i));return s}}function ap(t,e,n,i,r){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let a=ds(n,r?i:null),c=!1;a?c=!0:i instanceof v?(a=bc(n,i),c=!1):(a=v.EMPTY_NODE,c=!1);const l=js(new Ht(a,c,!1),new Ht(i,r,!1));return new YC(e,l)}return o}function iT(t,e,n,i,r,s){const o=ap(t,e,i,r,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),QC(o,n),ZC(o,n)}function rT(t,e,n,i){const r=e._queryIdentifier,s=[];let o=[];const a=Wt(t);if(r==="default")for(const[c,l]of t.views.entries())o=o.concat(fd(l,n,i)),hd(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{const c=t.views.get(r);c&&(o=o.concat(fd(c,n,i)),hd(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||s.push(c.query)))}return a&&!Wt(t)&&s.push(new(tT())(e._repo,e._path)),{removed:s,events:o}}function cp(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Dt(t,e){let n=null;for(const i of t.views.values())n=n||XC(i,e);return n}function lp(t,e){if(e._queryParams.loadsAllData())return Gs(t);{const i=e._queryIdentifier;return t.views.get(i)}}function up(t,e){return lp(t,e)!=null}function Wt(t){return Gs(t)!=null}function Gs(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gs;function sT(t){g(!gs,"__referenceConstructor has already been defined"),gs=t}function oT(){return g(gs,"Reference.ts has not been loaded"),gs}let aT=1;class gd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new F(null),this.pendingWriteTree_=xC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function dp(t,e,n,i,r){return CC(t.pendingWriteTree_,e,n,i,r),r?di(t,new fn(Ec(),e,n)):[]}function cT(t,e,n,i){TC(t.pendingWriteTree_,e,n,i);const r=F.fromObject(n);return di(t,new Kn(Ec(),e,r))}function It(t,e,n=!1){const i=IC(t.pendingWriteTree_,e);if(kC(t.pendingWriteTree_,e)){let s=new F(null);return i.snap!=null?s=s.set(N(),!0):ce(i.children,o=>{s=s.set(new L(o),!0)}),di(t,new ls(i.path,s,n))}else return[]}function gr(t,e,n){return di(t,new fn(vc(),e,n))}function lT(t,e,n){const i=F.fromObject(n);return di(t,new Kn(vc(),e,i))}function uT(t,e){return di(t,new Qi(vc(),e))}function dT(t,e,n){const i=kc(t,n);if(i){const r=Rc(i),s=r.path,o=r.queryId,a=me(s,e),c=new Qi(wc(o),a);return Ac(t,s,c)}else return[]}function ms(t,e,n,i,r=!1){const s=e._path,o=t.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||up(o,e))){const c=rT(o,e,n,i);nT(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const l=c.removed;if(a=c.events,!r){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(s,(h,f)=>Wt(f));if(u&&!d){const h=t.syncPointTree_.subtree(s);if(!h.isEmpty()){const f=pT(h);for(let p=0;p<f.length;++p){const y=f[p],m=y.query,T=gp(t,y);t.listenProvider_.startListening(Di(m),Zi(t,m),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(Di(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(qs(h));t.listenProvider_.stopListening(Di(h),f)}))}gT(t,l)}return a}function hp(t,e,n,i){const r=kc(t,i);if(r!=null){const s=Rc(r),o=s.path,a=s.queryId,c=me(o,e),l=new fn(wc(a),c,n);return Ac(t,o,l)}else return[]}function hT(t,e,n,i){const r=kc(t,i);if(r){const s=Rc(r),o=s.path,a=s.queryId,c=me(o,e),l=F.fromObject(n),u=new Kn(wc(a),c,l);return Ac(t,o,u)}else return[]}function wa(t,e,n,i=!1){const r=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(r,(h,f)=>{const p=me(h,r);s=s||Dt(f,p),o=o||Wt(f)});let a=t.syncPointTree_.get(r);a?(o=o||Wt(a),s=s||Dt(a,N())):(a=new op,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;s!=null?c=!0:(c=!1,s=v.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((f,p)=>{const y=Dt(p,N());y&&(s=s.updateImmediateChild(f,y))}));const l=up(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=qs(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=mT();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=zs(t.pendingWriteTree_,r);let d=iT(a,e,n,u,s,c);if(!l&&!o&&!i){const h=lp(a,e);d=d.concat(_T(t,e,h))}return d}function Ic(t,e,n){const r=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=me(o,e),l=Dt(a,c);if(l)return l});return ep(r,e,s,n,!0)}function fT(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=me(l,n);i=i||Dt(u,d)});let r=t.syncPointTree_.get(n);r?i=i||Dt(r,N()):(r=new op,t.syncPointTree_=t.syncPointTree_.set(n,r));const s=i!=null,o=s?new Ht(i,!0,!1):null,a=zs(t.pendingWriteTree_,e._path),c=ap(r,e,a,s?o.getNode():v.EMPTY_NODE,s);return JC(c)}function di(t,e){return fp(e,t.syncPointTree_,null,zs(t.pendingWriteTree_,N()))}function fp(t,e,n,i){if(k(t.path))return pp(t,e,n,i);{const r=e.get(N());n==null&&r!=null&&(n=Dt(r,N()));let s=[];const o=I(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=tp(i,o);s=s.concat(fp(a,c,l,u))}return r&&(s=s.concat(Tc(r,t,i,n))),s}}function pp(t,e,n,i){const r=e.get(N());n==null&&r!=null&&(n=Dt(r,N()));let s=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=tp(i,o),u=t.operationForChild(o);u&&(s=s.concat(pp(u,a,c,l)))}),r&&(s=s.concat(Tc(r,t,i,n))),s}function gp(t,e){const n=e.query,i=Zi(t,n);return{hashFn:()=>(KC(e)||v.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return i?dT(t,n._path,i):uT(t,n._path);{const s=uS(r,n);return ms(t,n,null,s)}}}}function Zi(t,e){const n=qs(e);return t.queryToTagMap.get(n)}function qs(t){return t._path.toString()+"$"+t._queryIdentifier}function kc(t,e){return t.tagToQueryMap.get(e)}function Rc(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new L(t.substr(0,e))}}function Ac(t,e,n){const i=t.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const r=zs(t.pendingWriteTree_,e);return Tc(i,n,r,null)}function pT(t){return t.fold((e,n,i)=>{if(n&&Wt(n))return[Gs(n)];{let r=[];return n&&(r=cp(n)),ce(i,(s,o)=>{r=r.concat(o)}),r}})}function Di(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(oT())(t._repo,t._path):t}function gT(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const r=qs(i),s=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(s)}}}function mT(){return aT++}function _T(t,e,n){const i=e._path,r=Zi(t,e),s=gp(t,n),o=t.listenProvider_.startListening(Di(e),r,s.hashFn,s.onComplete),a=t.syncPointTree_.subtree(i);if(r)g(!Wt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!k(l)&&u&&Wt(u))return[Gs(u).query];{let h=[];return u&&(h=h.concat(cp(u).map(f=>f.query))),ce(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Di(u),Zi(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Pc(n)}node(){return this.node_}}class Nc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=K(this.path_,e);return new Nc(this.syncTree_,n)}node(){return Ic(this.syncTree_,this.path_)}}const yT=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},md=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return ET(t[".sv"],e,n);if(typeof t[".sv"]=="object")return vT(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},ET=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},vT=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const r=e.node();if(g(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return i;const o=r.getValue();return typeof o!="number"?i:o+i},mp=function(t,e,n,i){return Lc(e,new Nc(n,t),i)},_p=function(t,e,n){return Lc(t,new Pc(e),n)};function Lc(t,e,n){const i=t.getPriority().val(),r=md(i,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,a=md(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new re(a,X(r)):t}else{const o=t;return s=o,r!==o.getPriority().val()&&(s=s.updatePriority(new re(r))),o.forEachChild(J,(a,c)=>{const l=Lc(c,e.getImmediateChild(a),n);l!==c&&(s=s.updateImmediateChild(a,l))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Dc(t,e){let n=e instanceof L?e:new L(e),i=t,r=I(n);for(;r!==null;){const s=zn(i.node.children,r)||{children:{},childCount:0};i=new Oc(r,i,s),n=M(n),r=I(n)}return i}function hi(t){return t.node.value}function yp(t,e){t.node.value=e,ba(t)}function Ep(t){return t.node.childCount>0}function wT(t){return hi(t)===void 0&&!Ep(t)}function Ys(t,e){ce(t.node.children,(n,i)=>{e(new Oc(n,t,i))})}function vp(t,e,n,i){n&&e(t),Ys(t,r=>{vp(r,e,!0)})}function bT(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function mr(t){return new L(t.parent===null?t.name:mr(t.parent)+"/"+t.name)}function ba(t){t.parent!==null&&ST(t.parent,t.name,t)}function ST(t,e,n){const i=wT(n),r=tt(t.node.children,e);i&&r?(delete t.node.children[e],t.node.childCount--,ba(t)):!i&&!r&&(t.node.children[e]=n.node,t.node.childCount++,ba(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=/[\[\].#$\/\u0000-\u001F\u007F]/,TT=/[\[\].#$\u0000-\u001F\u007F]/,No=10*1024*1024,Mc=function(t){return typeof t=="string"&&t.length!==0&&!CT.test(t)},wp=function(t){return typeof t=="string"&&t.length!==0&&!TT.test(t)},IT=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),wp(t)},bp=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Hs(t)||t&&typeof t=="object"&&tt(t,".sv")},_s=function(t,e,n,i){i&&e===void 0||Ks(Gn(t,"value"),e,n)},Ks=function(t,e,n){const i=n instanceof L?new jS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Qt(i));if(typeof e=="function")throw new Error(t+"contains a function "+Qt(i)+" with contents = "+e.toString());if(Hs(e))throw new Error(t+"contains "+e.toString()+" "+Qt(i));if(typeof e=="string"&&e.length>No/3&&$s(e)>No)throw new Error(t+"contains a string greater than "+No+" utf8 bytes "+Qt(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,s=!1;if(ce(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Mc(o)))throw new Error(t+" contains an invalid key ("+o+") "+Qt(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);zS(i,o),Ks(t,a,i),GS(i)}),r&&s)throw new Error(t+' contains ".value" child '+Qt(i)+" in addition to actual children.")}},kT=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const s=Yi(i);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Mc(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(VS);let r=null;for(n=0;n<e.length;n++){if(i=e[n],r!==null&&Pe(r,i))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+i.toString());r=i}},Sp=function(t,e,n,i){const r=Gn(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const s=[];ce(e,(o,a)=>{const c=new L(o);if(Ks(r,a,K(n,c)),pc(c)===".priority"&&!bp(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),kT(r,s)},RT=function(t,e,n){if(Hs(e))throw new Error(Gn(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!bp(e))throw new Error(Gn(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},xc=function(t,e,n,i){if(!wp(n))throw new Error(Gn(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},AT=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),xc(t,e,n)},kt=function(t,e){if(I(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},PT=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Mc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!IT(n))throw new Error(Gn(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Js(t,e){let n=null;for(let i=0;i<e.length;i++){const r=e[i],s=r.getPath();n!==null&&!gc(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(r)}n&&t.eventLists_.push(n)}function Cp(t,e,n){Js(t,n),Tp(t,i=>gc(i,e))}function De(t,e,n){Js(t,n),Tp(t,i=>Pe(i,e)||Pe(e,i))}function Tp(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const r=t.eventLists_[i];if(r){const s=r.path;e(s)?(LT(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function LT(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();Pi&&oe("event: "+n.toString()),li(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OT="repo_interrupt",DT=25;class MT{constructor(e,n,i,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new NT,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=cs(),this.transactionQueueTree_=new Oc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function xT(t,e,n){if(t.stats_=hc(t.repoInfo_),t.forceRestClient_||pS())t.server_=new as(t.repoInfo_,(i,r,s,o)=>{_d(t,i,r,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>yd(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ne(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new ft(t.repoInfo_,e,(i,r,s,o)=>{_d(t,i,r,s,o)},i=>{yd(t,i)},i=>{FT(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=ES(t.repoInfo_,()=>new yC(t.stats_,t.server_)),t.infoData_=new fC,t.infoSyncTree_=new gd({startListening:(i,r,s,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=gr(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Fc(t,"connected",!1),t.serverSyncTree_=new gd({startListening:(i,r,s,o)=>(t.server_.listen(i,s,r,(a,c)=>{const l=o(a,c);De(t.eventQueue_,i._path,l)}),[]),stopListening:(i,r)=>{t.server_.unlisten(i,r)}})}function Ip(t){const n=t.infoData_.getNode(new L(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Xs(t){return yT({timestamp:Ip(t)})}function _d(t,e,n,i,r){t.dataUpdateCount++;const s=new L(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(i){const c=ns(n,l=>X(l));o=hT(t.serverSyncTree_,s,c,r)}else{const c=X(n);o=hp(t.serverSyncTree_,s,c,r)}else if(i){const c=ns(n,l=>X(l));o=lT(t.serverSyncTree_,s,c)}else{const c=X(n);o=gr(t.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=Xn(t,s)),De(t.eventQueue_,a,o)}function yd(t,e){Fc(t,"connected",e),e===!1&&HT(t)}function FT(t,e){ce(e,(n,i)=>{Fc(t,n,i)})}function Fc(t,e,n){const i=new L("/.info/"+e),r=X(n);t.infoData_.updateSnapshot(i,r);const s=gr(t.infoSyncTree_,i,r);De(t.eventQueue_,i,s)}function Uc(t){return t.nextWriteId_++}function UT(t,e,n){const i=fT(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(r=>{const s=X(r).withIndex(e._queryParams.getIndex());wa(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=gr(t.serverSyncTree_,e._path,s);else{const a=Zi(t.serverSyncTree_,e);o=hp(t.serverSyncTree_,e._path,s,a)}return De(t.eventQueue_,e._path,o),ms(t.serverSyncTree_,e,n,null,!0),s},r=>(_r(t,"get for query "+ne(e)+" failed: "+r),Promise.reject(new Error(r))))}function $T(t,e,n,i,r){_r(t,"set",{path:e.toString(),value:n,priority:i});const s=Xs(t),o=X(n,i),a=Ic(t.serverSyncTree_,e),c=_p(o,a,s),l=Uc(t),u=dp(t.serverSyncTree_,e,c,l,!0);Js(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||_e("set at "+e+" failed: "+h);const y=It(t.serverSyncTree_,l,!p);De(t.eventQueue_,e,y),Vt(t,r,h,f)});const d=Bc(t,e);Xn(t,d),De(t.eventQueue_,d,[])}function BT(t,e,n,i){_r(t,"update",{path:e.toString(),value:n});let r=!0;const s=Xs(t),o={};if(ce(n,(a,c)=>{r=!1,o[a]=mp(K(e,a),X(c),t.serverSyncTree_,s)}),r)oe("update() called with empty data.  Don't do anything."),Vt(t,i,"ok",void 0);else{const a=Uc(t),c=cT(t.serverSyncTree_,e,o,a);Js(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||_e("update at "+e+" failed: "+l);const h=It(t.serverSyncTree_,a,!d),f=h.length>0?Xn(t,e):e;De(t.eventQueue_,f,h),Vt(t,i,l,u)}),ce(n,l=>{const u=Bc(t,K(e,l));Xn(t,u)}),De(t.eventQueue_,e,[])}}function HT(t){_r(t,"onDisconnectEvents");const e=Xs(t),n=cs();ga(t.onDisconnect_,N(),(r,s)=>{const o=mp(r,s,t.serverSyncTree_,e);ui(n,r,o)});let i=[];ga(n,N(),(r,s)=>{i=i.concat(gr(t.serverSyncTree_,r,s));const o=Bc(t,r);Xn(t,o)}),t.onDisconnect_=cs(),De(t.eventQueue_,N(),i)}function WT(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,r)=>{i==="ok"&&pa(t.onDisconnect_,e),Vt(t,n,i,r)})}function Ed(t,e,n,i){const r=X(n);t.server_.onDisconnectPut(e.toString(),r.val(!0),(s,o)=>{s==="ok"&&ui(t.onDisconnect_,e,r),Vt(t,i,s,o)})}function VT(t,e,n,i,r){const s=X(n,i);t.server_.onDisconnectPut(e.toString(),s.val(!0),(o,a)=>{o==="ok"&&ui(t.onDisconnect_,e,s),Vt(t,r,o,a)})}function jT(t,e,n,i){if(ts(n)){oe("onDisconnect().update() called with empty data.  Don't do anything."),Vt(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(r,s)=>{r==="ok"&&ce(n,(o,a)=>{const c=X(a);ui(t.onDisconnect_,K(e,o),c)}),Vt(t,i,r,s)})}function zT(t,e,n){let i;I(e._path)===".info"?i=wa(t.infoSyncTree_,e,n):i=wa(t.serverSyncTree_,e,n),Cp(t.eventQueue_,e._path,i)}function kp(t,e,n){let i;I(e._path)===".info"?i=ms(t.infoSyncTree_,e,n):i=ms(t.serverSyncTree_,e,n),Cp(t.eventQueue_,e._path,i)}function GT(t){t.persistentConnection_&&t.persistentConnection_.interrupt(OT)}function _r(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),oe(n,...e)}function Vt(t,e,n,i){e&&li(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let s=r;i&&(s+=": "+i);const o=new Error(s);o.code=r,e(o)}})}function Rp(t,e,n){return Ic(t.serverSyncTree_,e,n)||v.EMPTY_NODE}function $c(t,e=t.transactionQueueTree_){if(e||Qs(t,e),hi(e)){const n=Pp(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&qT(t,mr(e),n)}else Ep(e)&&Ys(e,n=>{$c(t,n)})}function qT(t,e,n){const i=n.map(l=>l.currentWriteId),r=Rp(t,e,i);let s=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=me(e,u.path);s=s.updateChild(d,u.currentOutputSnapshotRaw)}const a=s.val(!0),c=e;t.server_.put(c.toString(),a,l=>{_r(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(It(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();Qs(t,Dc(t.transactionQueueTree_,e)),$c(t,t.transactionQueueTree_),De(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)li(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{_e("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Xn(t,e)}},o)}function Xn(t,e){const n=Ap(t,e),i=mr(n),r=Pp(t,n);return YT(t,r,i),i}function YT(t,e,n){if(e.length===0)return;const i=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=me(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,r=r.concat(It(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=DT)u=!0,d="maxretry",r=r.concat(It(t.serverSyncTree_,c.currentWriteId,!0));else{const h=Rp(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Ks("transaction failed: Data returned ",f,c.path);let p=X(f);typeof f=="object"&&f!=null&&tt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,T=Xs(t),H=_p(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=H,c.currentWriteId=Uc(t),o.splice(o.indexOf(m),1),r=r.concat(dp(t.serverSyncTree_,c.path,H,c.currentWriteId,c.applyLocally)),r=r.concat(It(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",r=r.concat(It(t.serverSyncTree_,c.currentWriteId,!0))}De(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}Qs(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)li(i[a]);$c(t,t.transactionQueueTree_)}function Ap(t,e){let n,i=t.transactionQueueTree_;for(n=I(e);n!==null&&hi(i)===void 0;)i=Dc(i,n),e=M(e),n=I(e);return i}function Pp(t,e){const n=[];return Np(t,e,n),n.sort((i,r)=>i.order-r.order),n}function Np(t,e,n){const i=hi(e);if(i)for(let r=0;r<i.length;r++)n.push(i[r]);Ys(e,r=>{Np(t,r,n)})}function Qs(t,e){const n=hi(e);if(n){let i=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[i]=n[r],i++);n.length=i,yp(e,n.length>0?n:void 0)}Ys(e,i=>{Qs(t,i)})}function Bc(t,e){const n=mr(Ap(t,e)),i=Dc(t.transactionQueueTree_,e);return bT(i,r=>{Lo(t,r)}),Lo(t,i),vp(i,r=>{Lo(t,r)}),n}function Lo(t,e){const n=hi(e);if(n){const i=[];let r=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(It(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?yp(e,void 0):n.length=s+1,De(t.eventQueue_,mr(e),r);for(let o=0;o<i.length;o++)li(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KT(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let r=n[i];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function JT(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):_e(`Invalid query segment '${n}' in query '${t}'`)}return e}const vd=function(t,e){const n=XT(t),i=n.namespace;n.domain==="firebase.com"&&_t(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&_t("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||sS();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Df(n.host,n.secure,i,r,e,"",i!==n.subdomain),path:new L(n.pathString)}},XT=function(t){let e="",n="",i="",r="",s="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(r=KT(t.substring(u,d)));const h=JT(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),s=i}"ns"in h&&(s=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:r,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",QT=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let r;const s=new Array(8);for(r=7;r>=0;r--)s[r]=wd.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=s.join("");if(i){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=wd.charAt(e[r]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e,n,i,r){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ne(this.snapshot.exportVal())}}class Op{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Dp{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new ve;return WT(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){kt("OnDisconnect.remove",this._path);const e=new ve;return Ed(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){kt("OnDisconnect.set",this._path),_s("OnDisconnect.set",e,this._path,!1);const n=new ve;return Ed(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){kt("OnDisconnect.setWithPriority",this._path),_s("OnDisconnect.setWithPriority",e,this._path,!1),RT("OnDisconnect.setWithPriority",n);const i=new ve;return VT(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){kt("OnDisconnect.update",this._path),Sp("OnDisconnect.update",e,this._path);const n=new ve;return jT(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e,n,i,r){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=r}get key(){return k(this._path)?null:pc(this._path)}get ref(){return new qe(this._repo,this._path)}get _queryIdentifier(){const e=sd(this._queryParams),n=uc(e);return n==="{}"?"default":n}get _queryObject(){return sd(this._queryParams)}isEqual(e){if(e=le(e),!(e instanceof Zs))return!1;const n=this._repo===e._repo,i=gc(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&i&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+WS(this._path)}}class qe extends Zs{constructor(e,n){super(e,n,new Vs,!1)}get parent(){const e=Vf(this._path);return e===null?null:new qe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class gn{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new L(e),i=mn(this.ref,e);return new gn(this._node.getChild(n),i,J)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,r)=>e(new gn(r,mn(this.ref,i),J)))}hasChild(e){const n=new L(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function $(t,e){return t=le(t),t._checkNotDeleted("ref"),e!==void 0?mn(t._root,e):t._root}function mn(t,e){return t=le(t),I(t._path)===null?AT("child","path",e):xc("child","path",e),new qe(t._repo,K(t._path,e))}function Mp(t){return t=le(t),new Dp(t._repo,t._path)}function ys(t,e){t=le(t),kt("push",t._path),_s("push",e,t._path,!0);const n=Ip(t._repo),i=QT(n),r=mn(t,i),s=mn(t,i);let o;return o=Promise.resolve(s),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function _n(t){return kt("remove",t._path),Re(t,null)}function Re(t,e){t=le(t),kt("set",t._path),_s("set",e,t._path,!1);const n=new ve;return $T(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Nn(t,e){Sp("update",e,t._path);const n=new ve;return BT(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Mt(t){t=le(t);const e=new Hc(()=>{}),n=new yr(e);return UT(t._repo,t,n).then(i=>new gn(i,new qe(t._repo,t._path),t._queryParams.getIndex()))}class yr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Lp("value",this,new gn(e.snapshotNode,new qe(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Op(this,e,n):null}matches(e){return e instanceof yr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class eo{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Op(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const i=mn(new qe(n._repo,n._path),e.childName),r=n._queryParams.getIndex();return new Lp(e.type,this,new gn(e.snapshotNode,i,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof eo?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Wc(t,e,n,i,r){const s=new Hc(n,void 0),o=e==="value"?new yr(s):new eo(e,s);return zT(t._repo,t,o),()=>kp(t._repo,t,o)}function Vc(t,e,n,i){return Wc(t,"value",e)}function jc(t,e,n,i){return Wc(t,"child_added",e)}function xp(t,e,n,i){return Wc(t,"child_removed",e)}function Cn(t,e,n){let i=null;const r=n?new Hc(n):null;e==="value"?i=new yr(r):e&&(i=new eo(e,r)),kp(t._repo,t,i)}eT(qe);sT(qe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZT="FIREBASE_DATABASE_EMULATOR_HOST",Sa={};let eI=!1;function tI(t,e,n,i){const r=e.lastIndexOf(":"),s=e.substring(0,r),o=si(s);t.repoInfo_=new Df(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function Fp(t,e,n,i,r){let s=i||t.options.databaseURL;s===void 0&&(t.options.projectId||_t("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),oe("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=vd(s,r),a=o.repoInfo,c;typeof process<"u"&&Hu&&(c=Hu[ZT]),c?(s=`http://${c}?ns=${a.namespace}`,o=vd(s,r),a=o.repoInfo):o.repoInfo.secure;const l=new mS(t.name,t.options,e);PT("Invalid Firebase Database URL",o),k(o.path)||_t("Database URL must point to the root of a Firebase Database (not including a child path).");const u=iI(a,t,l,new gS(t,n));return new Up(u,t)}function nI(t,e){const n=Sa[e];(!n||n[t.key]!==t)&&_t(`Database ${e}(${t.repoInfo_}) has already been deleted.`),GT(t),delete n[t.key]}function iI(t,e,n,i){let r=Sa[e.name];r||(r={},Sa[e.name]=r);let s=r[t.toURLString()];return s&&_t("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new MT(t,eI,n,i),r[t.toURLString()]=s,s}class Up{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(xT(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new qe(this._repo,N())),this._rootInternal}_delete(){return this._rootInternal!==null&&(nI(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&_t("Cannot call "+e+" on a deleted database.")}}function $p(t=lc(),e){const n=dr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=bw("database");i&&Bp(n,...i)}return n}function Bp(t,e,n,i={}){t=le(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,s=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&dn(i,s.repoInfo_.emulatorOptions))return;_t("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&_t('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Hr(Hr.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Sw(i.mockUserToken,t.app.options.projectId);o=new Hr(a)}si(e)&&(uf(e),df("Database",!0)),tI(s,r,i,o)}/**
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
 */function rI(t){vf(ci),$t(new gt("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return Fp(i,r,s,n)},"PUBLIC").setMultipleInstances(!0)),ht(Wu,Vu,t),ht(Wu,Vu,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sI={".sv":"timestamp"};function on(){return sI}ft.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ft.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};rI();const oI=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:gn,Database:Up,OnDisconnect:Dp,_QueryImpl:Zs,_QueryParams:Vs,_ReferenceImpl:qe,_repoManagerDatabaseFromApp:Fp,_setSDKVersion:vf,_validatePathString:xc,_validateWritablePath:kt,child:mn,connectDatabaseEmulator:Bp,get:Mt,getDatabase:$p,off:Cn,onChildAdded:jc,onChildRemoved:xp,onDisconnect:Mp,onValue:Vc,push:ys,ref:$,remove:_n,serverTimestamp:on,set:Re,update:Nn},Symbol.toStringTag,{value:"Module"}));var aI="firebase",cI="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ht(aI,cI,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca=new Map,Hp={activated:!1,tokenObservers:[]},lI={initialized:!1,enabled:!1};function ie(t){return Ca.get(t)||{...Hp}}function uI(t,e){return Ca.set(t,e),Ca.get(t)}function to(){return lI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wp="https://content-firebaseappcheck.googleapis.com/v1",dI="exchangeRecaptchaEnterpriseToken",hI="exchangeDebugToken",bd={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},fI=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(e,n,i,r,s){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=r,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=r,r>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new ve,this.pending.promise.catch(n=>{}),await gI(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new ve,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function gI(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},be=new oi("appCheck","AppCheck",mI);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function zc(t){if(!ie(t).activated)throw be.create("use-before-activation",{appName:t.name})}function Vp(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-i*3600)/60),s=e-n*3600*24-i*3600-r*60;let o="";return n&&(o+=Nr(n)+"d:"),i&&(o+=Nr(i)+"h:"),o+=Nr(r)+"m:"+Nr(s)+"s",o}function Nr(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gc({url:t,body:e},n){const i={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const s={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,s)}catch(d){throw be.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw be.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw be.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw be.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function _I(t,e){const{projectId:n,appId:i,apiKey:r}=t.options;return{url:`${Wp}/projects/${n}/apps/${i}:${dI}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function jp(t,e){const{projectId:n,appId:i,apiKey:r}=t.options;return{url:`${Wp}/projects/${n}/apps/${i}:${hI}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI="firebase-app-check-database",EI=1,er="firebase-app-check-store",zp="debug-token";let Lr=null;function Gp(){return Lr||(Lr=new Promise((t,e)=>{try{const n=indexedDB.open(yI,EI);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(be.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const r=i.target.result;switch(i.oldVersion){case 0:r.createObjectStore(er,{keyPath:"compositeKey"})}}}catch(n){e(be.create("storage-open",{originalErrorMessage:n?.message}))}}),Lr)}function vI(t){return Yp(Kp(t))}function wI(t,e){return qp(Kp(t),e)}function bI(t){return qp(zp,t)}function SI(){return Yp(zp)}async function qp(t,e){const i=(await Gp()).transaction(er,"readwrite"),s=i.objectStore(er).put({compositeKey:t,value:e});return new Promise((o,a)=>{s.onsuccess=c=>{o()},i.onerror=c=>{a(be.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Yp(t){const n=(await Gp()).transaction(er,"readonly"),r=n.objectStore(er).get(t);return new Promise((s,o)=>{r.onsuccess=a=>{const c=a.target.result;s(c?c.value:void 0)},n.onerror=a=>{o(be.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function Kp(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new Bs("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CI(t){if(ac()){let e;try{e=await vI(t)}catch(n){Rt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Oo(t,e){return ac()?wI(t,e).catch(n=>{Rt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function TI(){let t;try{t=await SI()}catch{}if(t)return t;{const e=crypto.randomUUID();return bI(e).catch(n=>Rt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(){return to().enabled}async function Yc(){const t=to();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function II(){const t=of(),e=to();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new ve;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(TI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI={error:"UNKNOWN_ERROR"};function RI(t){return Us.encodeString(JSON.stringify(t),!1)}async function Ta(t,e=!1,n=!1){const i=t.app;zc(i);const r=ie(i);let s=r.token,o;if(s&&!Rn(s)&&(r.token=void 0,s=void 0),!s){const l=await r.cachedTokenPromise;l&&(Rn(l)?s=l:await Oo(i,void 0))}if(!e&&s&&Rn(s))return{token:s.token};let a=!1;if(qc())try{r.exchangeTokenPromise||(r.exchangeTokenPromise=Gc(jp(i,await Yc()),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const l=await r.exchangeTokenPromise;return await Oo(i,l),r.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Rt.warn(l.message):n&&Rt.error(l),Do(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),s=await ie(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Rt.warn(l.message):n&&Rt.error(l),o=l}let c;return s?o?Rn(s)?c={token:s.token,internalError:o}:c=Do(o):(c={token:s.token},r.token=s,await Oo(i,s)):c=Do(o),a&&Qp(i,c),c}async function AI(t){const e=t.app;zc(e);const{provider:n}=ie(e);if(qc()){const i=await Yc(),{token:r}=await Gc(jp(e,i),t.heartbeatServiceProvider);return{token:r}}else{const{token:i}=await n.getToken();return{token:i}}}function Jp(t,e,n,i){const{app:r}=t,s=ie(r),o={next:n,error:i,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&Rn(s.token)){const a=s.token;Promise.resolve().then(()=>{n({token:a.token}),Cd(t)}).catch(()=>{})}s.cachedTokenPromise.then(()=>Cd(t))}function Xp(t,e){const n=ie(t),i=n.tokenObservers.filter(r=>r.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function Cd(t){const{app:e}=t,n=ie(e);let i=n.tokenRefresher;i||(i=PI(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function PI(t){const{app:e}=t;return new pI(async()=>{const n=ie(e);let i;if(n.token?i=await Ta(t,!0):i=await Ta(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=ie(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,r),Math.max(0,i-Date.now())}else return 0},bd.RETRIAL_MIN_WAIT,bd.RETRIAL_MAX_WAIT)}function Qp(t,e){const n=ie(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function Rn(t){return t.expireTimeMillis-Date.now()>0}function Do(t){return{token:RI(kI),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NI{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=ie(this.app);for(const n of e)Xp(this.app,n.next);return Promise.resolve()}}function LI(t,e){return new NI(t,e)}function OI(t){return{getToken:e=>Ta(t,e),getLimitedUseToken:()=>AI(t),addTokenListener:e=>Jp(t,"INTERNAL",e),removeTokenListener:e=>Xp(t.app,e)}}const DI="@firebase/app-check",MI="0.11.0",xI="https://www.google.com/recaptcha/enterprise.js";function FI(t,e){const n=new ve,i=ie(t);i.reCAPTCHAState={initialized:n};const r=UI(t),s=Sd(!0);return s?Td(t,e,s,r,n):HI(()=>{const o=Sd(!0);if(!o)throw new Error("no recaptcha");Td(t,e,o,r,n)}),n.promise}function Td(t,e,n,i,r){n.ready(()=>{BI(t,e,n,i),r.resolve(n)})}function UI(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function $I(t){zc(t);const n=await ie(t).reCAPTCHAState.initialized.promise;return new Promise((i,r)=>{const s=ie(t).reCAPTCHAState;n.ready(()=>{i(n.execute(s.widgetId,{action:"fire_app_check"}))})})}function BI(t,e,n,i){const r=n.render(i,{sitekey:e,size:"invisible",callback:()=>{ie(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ie(t).reCAPTCHAState.succeeded=!1}}),s=ie(t);s.reCAPTCHAState={...s.reCAPTCHAState,widgetId:r}}function HI(t){const e=document.createElement("script");e.src=xI,e.onload=t,document.head.appendChild(e)}class Kc{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){VI(this._throttleData);const e=await $I(this._app).catch(i=>{throw be.create("recaptcha-error")});if(!ie(this._app).reCAPTCHAState?.succeeded)throw be.create("recaptcha-error");let n;try{n=await Gc(_I(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=WI(Number(i.customData?.httpStatus),this._throttleData),be.create("initial-throttle",{time:Vp(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=dr(e,"heartbeat"),FI(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Kc?this._siteKey===e._siteKey:!1}}function WI(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+fI,httpStatus:t};{const n=e?e.backoffCount:0,i=zw(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function VI(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw be.create("throttled",{time:Vp(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jI(t=lc(),e){t=le(t);const n=dr(t,"app-check");if(to().initialized||II(),qc()&&Yc().then(r=>console.log(`App Check debug token: ${r}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const r=n.getImmediate(),s=n.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return r;throw be.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return zI(t,e.provider,e.isTokenAutoRefreshEnabled),ie(t).isTokenAutoRefreshEnabled&&Jp(i,"INTERNAL",()=>{}),i}function zI(t,e,n=!1){const i=uI(t,{...Hp});i.activated=!0,i.provider=e,i.cachedTokenPromise=CI(t).then(r=>(r&&Rn(r)&&(i.token=r,Qp(t,{token:r.token})),r)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Rt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const GI="app-check",Id="app-check-internal";function qI(){$t(new gt(GI,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return LI(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Id).initialize()})),$t(new gt(Id,t=>{const e=t.getProvider("app-check").getImmediate();return OI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ht(DI,MI)}qI();const YI={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Jc=mf(YI),kd="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let Ia;if(kd.trim()!=="")Ia=new Kc(kd),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(Ia)try{jI(Jc,{provider:Ia,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const V=$p(Jc),$e=[];function en(t,e,n,i=null,r=null,s=null){e==="value"?Vc(t,n):e==="child_added"?jc(t,n):e==="child_removed"?xp(t,n):console.warn(`Unknown listener type: ${e}`),$e.push({ref:t,type:e,callback:n,roomId:i,userId:r,category:s})}function KI(){$e.forEach(({ref:t,type:e,callback:n})=>{try{Cn(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),$e.length=0}function no(t){if(!t)return;$e.filter(i=>i.roomId===t).forEach(({ref:i,type:r,callback:s})=>{try{Cn(i,r,s)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=$e.filter(i=>i.roomId!==t);$e.length=0,$e.push(...n)}function JI(t,e){if(!t||!e)return;const n=s=>s.userId===t&&s.roomId===e;$e.filter(n).forEach(({ref:s,type:o,callback:a})=>{try{Cn(s,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const r=$e.filter(s=>!n(s));$e.length=0,$e.push(...r)}function Wr(t,e,n=null){en(t,"value",e,n)}const Yt=t=>$(V,`rooms/${t}`),Or=t=>$(V,`rooms/${t}/members`),Rd=(t,e)=>$(V,`rooms/${t}/members/${e}`),XI=t=>$(V,`rooms/${t}/cancellation`),io=t=>$(V,`rooms/${t}/watch`),QI=t=>$(V,`users/${t}/recentCalls`),Xc=(t,e)=>$(V,`users/${t}/recentCalls/${e}`),Qc=t=>$(V,`users/${t}/outgoingCall`),Zp=t=>$(V,`rooms/${t}/offerCandidates`),eg=t=>$(V,`rooms/${t}/answerCandidates`);function tg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ZI=tg,ng=new oi("auth","Firebase",tg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es=new Bs("@firebase/auth");function ek(t,...e){Es.logLevel<=O.WARN&&Es.warn(`Auth (${ci}): ${t}`,...e)}function Vr(t,...e){Es.logLevel<=O.ERROR&&Es.error(`Auth (${ci}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(t,...e){throw el(t,...e)}function Ve(t,...e){return el(t,...e)}function Zc(t,e,n){const i={...ZI(),[e]:n};return new oi("auth","Firebase",i).create(e,{appName:t.name})}function an(t){return Zc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function tk(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&Ze(t,"argument-error"),Zc(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function el(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return ng.create(t,...e)}function S(t,e,...n){if(!t)throw el(e,...n)}function st(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Vr(e),new Error(e)}function yt(t,e){t||st(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(){return typeof self<"u"&&self.location?.href||""}function nk(){return Ad()==="http:"||Ad()==="https:"}function Ad(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ik(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(nk()||kw()||"connection"in navigator)?navigator.onLine:!0}function rk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,n){this.shortDelay=e,this.longDelay=n,yt(n>e,"Short delay should be less than long delay!"),this.isMobile=oc()||hf()}get(){return ik()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(t,e){yt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;st("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;st("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;st("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ok=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ak=new Er(3e4,6e4);function nl(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function fi(t,e,n,i,r={}){return rg(t,r,async()=>{let s={},o={};i&&(e==="GET"?o=i:s={body:JSON.stringify(i)});const a=ai({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return Iw()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&si(t.emulatorConfig.host)&&(l.credentials="include"),ig.fetch()(await sg(t,t.config.apiHost,n,a),l)})}async function rg(t,e,n){t._canInitEmulator=!1;const i={...sk,...e};try{const r=new lk(t),s=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Dr(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Dr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Dr(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Zc(t,u,l);Ze(t,u)}}catch(r){if(r instanceof zt)throw r;Ze(t,"network-request-failed",{message:String(r)})}}async function ck(t,e,n,i,r={}){const s=await fi(t,e,n,i,r);return"mfaPendingCredential"in s&&Ze(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function sg(t,e,n,i){const r=`${e}${n}?${i}`,s=t,o=s.config.emulator?tl(t.config,r):`${t.config.apiScheme}://${r}`;return ok.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class lk{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(Ve(this.auth,"network-request-failed")),ak.get())})}}function Dr(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const r=Ve(t,e,i);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uk(t,e){return fi(t,"POST","/v1/accounts:delete",e)}async function vs(t,e){return fi(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function dk(t,e=!1){const n=le(t),i=await n.getIdToken(e),r=il(i);S(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const s=typeof r.firebase=="object"?r.firebase:void 0,o=s?.sign_in_provider;return{claims:r,token:i,authTime:Mi(Mo(r.auth_time)),issuedAtTime:Mi(Mo(r.iat)),expirationTime:Mi(Mo(r.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Mo(t){return Number(t)*1e3}function il(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Vr("JWT malformed, contained fewer than 3 sections"),null;try{const r=es(n);return r?JSON.parse(r):(Vr("Failed to decode base64 JWT payload"),null)}catch(r){return Vr("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Pd(t){const e=il(t);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof zt&&hk(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function hk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mi(this.lastLoginAt),this.creationTime=Mi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ws(t){const e=t.auth,n=await t.getIdToken(),i=await tr(t,vs(e,{idToken:n}));S(i?.users.length,e,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const s=r.providerUserInfo?.length?og(r.providerUserInfo):[],o=gk(t.providerData,s),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Ra(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function pk(t){const e=le(t);await ws(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function gk(t,e){return[...t.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function og(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mk(t,e){const n=await rg(t,{},async()=>{const i=ai({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=t.config,o=await sg(t,r,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&si(t.emulatorConfig.host)&&(c.credentials="include"),ig.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function _k(t,e){return fi(t,"POST","/v2/accounts:revokeToken",nl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Pd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=Pd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:r,expiresIn:s}=await mk(e,n);this.updateTokensAndExpiration(i,r,Number(s))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:r,expirationTime:s}=n,o=new Ln;return i&&(S(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),r&&(S(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),s&&(S(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ln,this.toJSON())}_performRefresh(){return st("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(t,e){S(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Be{constructor({uid:e,auth:n,stsTokenManager:i,...r}){this.providerId="firebase",this.proactiveRefresh=new fk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ra(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await tr(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return dk(this,e)}reload(){return pk(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Be({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await ws(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(xe(this.auth.app))return Promise.reject(an(this.auth));const e=await this.getIdToken();return await tr(this,uk(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,r=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:y}=n;S(d&&y,e,"internal-error");const m=Ln.fromJSON(this.name,y);S(typeof d=="string",e,"internal-error"),wt(i,e.name),wt(r,e.name),S(typeof h=="boolean",e,"internal-error"),S(typeof f=="boolean",e,"internal-error"),wt(s,e.name),wt(o,e.name),wt(a,e.name),wt(c,e.name),wt(l,e.name),wt(u,e.name);const T=new Be({uid:d,auth:e,email:r,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(H=>({...H}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,i=!1){const r=new Ln;r.updateFromServerResponse(n);const s=new Be({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await ws(s),s}static async _fromGetAccountInfoResponse(e,n,i){const r=n.users[0];S(r.localId!==void 0,"internal-error");const s=r.providerUserInfo!==void 0?og(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!s?.length,a=new Ln;a.updateFromIdToken(i);const c=new Be({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new Ra(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!s?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=new Map;function ot(t){yt(t instanceof Function,"Expected a class definition");let e=Nd.get(t);return e?(yt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Nd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ag.type="NONE";const Aa=ag;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(t,e,n){return`firebase:${t}:${e}:${n}`}class On{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:r,name:s}=this.auth;this.fullUserKey=jr(this.userKey,r.apiKey,s),this.fullPersistenceKey=jr("persistence",r.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await vs(this.auth,{idToken:e}).catch(()=>{});return n?Be._fromGetAccountInfoResponse(this.auth,n,e):null}return Be._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new On(ot(Aa),e,i);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=r[0]||ot(Aa);const o=jr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await vs(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Be._fromGetAccountInfoResponse(e,h,u)}else d=Be._fromJSON(e,u);l!==s&&(a=d),s=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new On(s,e,i):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new On(s,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ld(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(dg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(cg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(fg(e))return"Blackberry";if(pg(e))return"Webos";if(lg(e))return"Safari";if((e.includes("chrome/")||ug(e))&&!e.includes("edge/"))return"Chrome";if(hg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function cg(t=ye()){return/firefox\//i.test(t)}function lg(t=ye()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ug(t=ye()){return/crios\//i.test(t)}function dg(t=ye()){return/iemobile/i.test(t)}function hg(t=ye()){return/android/i.test(t)}function fg(t=ye()){return/blackberry/i.test(t)}function pg(t=ye()){return/webos/i.test(t)}function rl(t=ye()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function yk(t=ye()){return rl(t)&&!!window.navigator?.standalone}function Ek(){return Rw()&&document.documentMode===10}function gg(t=ye()){return rl(t)||hg(t)||pg(t)||fg(t)||/windows phone/i.test(t)||dg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mg(t,e=[]){let n;switch(t){case"Browser":n=Ld(ye());break;case"Worker":n=`${Ld(ye())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ci}/${i}`}/**
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
 */class vk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function wk(t,e={}){return fi(t,"GET","/v2/passwordPolicy",nl(t,e))}/**
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
 */const bk=6;class Sk{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??bk,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ck{constructor(e,n,i,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Od(this),this.idTokenSubscription=new Od(this),this.beforeStateQueue=new vk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ng,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ot(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await On.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await vs(this,{idToken:e}),i=await Be._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(xe(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!s||s===o)&&a?.user&&(i=a.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(s){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ws(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=rk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(xe(this.app))return Promise.reject(an(this));const n=e?le(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return xe(this.app)?Promise.reject(an(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return xe(this.app)?Promise.reject(an(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ot(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await wk(this),n=new Sk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new oi("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await _k(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ot(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await On.create(this,[ot(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,r){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(xe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&ek(`Error while retrieving App Check token: ${e.error}`),e?.token}}function pi(t){return le(t)}class Od{constructor(e){this.auth=e,this.observer=null,this.addObserver=Fw(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Tk(t){sl=t}function Ik(t){return sl.loadJS(t)}function kk(){return sl.gapiScript}function Rk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ak(t,e){const n=dr(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),s=n.getOptions();if(dn(s,e??{}))return r;Ze(r,"already-initialized")}return n.initialize({options:e})}function Pk(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map(ot);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function Nk(t,e,n){const i=pi(t);S(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!1,s=_g(e),{host:o,port:a}=Lk(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!i._canInitEmulator){S(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),S(dn(l,i.config.emulator)&&dn(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,si(o)?(uf(`${s}//${o}${c}`),df("Auth",!0)):Ok()}function _g(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Lk(t){const e=_g(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const s=r[1];return{host:s,port:Dd(i.substr(s.length+1))}}else{const[s,o]=i.split(":");return{host:s,port:Dd(o)}}}function Dd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Ok(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return st("not implemented")}_getIdTokenResponse(e){return st("not implemented")}_linkToIdToken(e,n){return st("not implemented")}_getReauthenticationResolver(e){return st("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dn(t,e){return ck(t,"POST","/v1/accounts:signInWithIdp",nl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dk="http://localhost";class yn extends yg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new yn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ze("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r,...s}=n;if(!i||!r)return null;const o=new yn(i,r);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Dn(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Dn(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Dn(e,n)}buildRequest(){const e={requestUri:Dk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ai(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr extends ol{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends vr{constructor(){super("facebook.com")}static credential(e){return yn._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bt.credential(e.oauthAccessToken)}catch{return null}}}bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";bt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae extends vr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return yn._fromParams({providerId:Ae.PROVIDER_ID,signInMethod:Ae.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ae.credentialFromTaggedObject(e)}static credentialFromError(e){return Ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return Ae.credential(n,i)}catch{return null}}}Ae.GOOGLE_SIGN_IN_METHOD="google.com";Ae.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends vr{constructor(){super("github.com")}static credential(e){return yn._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.GITHUB_SIGN_IN_METHOD="github.com";St.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends vr{constructor(){super("twitter.com")}static credential(e,n){return yn._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Ct.credential(n,i)}catch{return null}}}Ct.TWITTER_SIGN_IN_METHOD="twitter.com";Ct.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,r=!1){const s=await Be._fromIdTokenResponse(e,i,r),o=Md(i);return new Qn({user:s,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const r=Md(i);return new Qn({user:e,providerId:r,_tokenResponse:i,operationType:n})}}function Md(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs extends zt{constructor(e,n,i,r){super(n.code,n.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,bs.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,r){return new bs(e,n,i,r)}}function Eg(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?bs._fromErrorAndOperation(t,s,e,i):s})}async function Mk(t,e,n=!1){const i=await tr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Qn._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xk(t,e,n=!1){const{auth:i}=t;if(xe(i.app))return Promise.reject(an(i));const r="reauthenticate";try{const s=await tr(t,Eg(i,r,e,t),n);S(s.idToken,i,"internal-error");const o=il(s.idToken);S(o,i,"internal-error");const{sub:a}=o;return S(t.uid===a,i,"user-mismatch"),Qn._forOperation(t,r,s)}catch(s){throw s?.code==="auth/user-not-found"&&Ze(i,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vg(t,e,n=!1){if(xe(t.app))return Promise.reject(an(t));const i="signIn",r=await Eg(t,i,e),s=await Qn._fromIdTokenResponse(t,i,r);return n||await t._updateCurrentUser(s.user),s}async function Fk(t,e){return vg(pi(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(t,e){return le(t).setPersistence(e)}function Uk(t,e,n,i){return le(t).onIdTokenChanged(e,n,i)}function $k(t,e,n){return le(t).beforeAuthStateChanged(e,n)}function wg(t,e,n,i){return le(t).onAuthStateChanged(e,n,i)}function Bk(t){return le(t).signOut()}const Ss="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ss,"1"),this.storage.removeItem(Ss),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hk=1e3,Wk=10;class Sg extends bg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=gg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),r=this.localCache[n];i!==r&&e(n,r,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},s=this.storage.getItem(i);Ek()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Wk):r()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},Hk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Sg.type="LOCAL";const Cg=Sg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg extends bg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Tg.type="SESSION";const Ig=Tg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const i=new ro(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:r,data:s}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await Vk(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ro.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function al(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=al("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(h.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(){return window}function zk(t){Qe().location.href=t}/**
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
 */function kg(){return typeof Qe().WorkerGlobalScope<"u"&&typeof Qe().importScripts=="function"}async function Gk(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function qk(){return navigator?.serviceWorker?.controller||null}function Yk(){return kg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg="firebaseLocalStorageDb",Kk=1,Cs="firebaseLocalStorage",Ag="fbase_key";class wr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function so(t,e){return t.transaction([Cs],e?"readwrite":"readonly").objectStore(Cs)}function Jk(){const t=indexedDB.deleteDatabase(Rg);return new wr(t).toPromise()}function Pa(){const t=indexedDB.open(Rg,Kk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(Cs,{keyPath:Ag})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(Cs)?e(i):(i.close(),await Jk(),e(await Pa()))})})}async function xd(t,e,n){const i=so(t,!0).put({[Ag]:e,value:n});return new wr(i).toPromise()}async function Xk(t,e){const n=so(t,!1).get(e),i=await new wr(n).toPromise();return i===void 0?null:i.value}function Fd(t,e){const n=so(t,!0).delete(e);return new wr(n).toPromise()}const Qk=800,Zk=3;class Pg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Pa(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>Zk)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return kg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ro._getInstance(Yk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Gk(),!this.activeServiceWorker)return;this.sender=new jk(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||qk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Pa();return await xd(e,Ss,"1"),await Fd(e,Ss),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>xd(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>Xk(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Fd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const s=so(r,!1).getAll();return new wr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:s}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Qk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pg.type="LOCAL";const Ng=Pg;new Er(3e4,6e4);/**
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
 */function Lg(t,e){return e?ot(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl extends yg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Dn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Dn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function eR(t){return vg(t.auth,new cl(t),t.bypassAuthState)}function tR(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),xk(n,new cl(t),t.bypassAuthState)}async function nR(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),Mk(n,new cl(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e,n,i,r,s=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:r,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return eR;case"linkViaPopup":case"linkViaRedirect":return nR;case"reauthViaPopup":case"reauthViaRedirect":return tR;default:Ze(this.auth,"internal-error")}}resolve(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iR=new Er(2e3,1e4);async function rR(t,e,n){if(xe(t.app))return Promise.reject(Ve(t,"operation-not-supported-in-this-environment"));const i=pi(t);tk(t,e,ol);const r=Lg(i,n);return new rn(i,"signInViaPopup",e,r).executeNotNull()}class rn extends Og{constructor(e,n,i,r,s){super(e,n,r,s),this.provider=i,this.authWindow=null,this.pollId=null,rn.currentPopupAction&&rn.currentPopupAction.cancel(),rn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){yt(this.filter.length===1,"Popup operations only handle one event");const e=al();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,rn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ve(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,iR.get())};e()}}rn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sR="pendingRedirect",zr=new Map;class oR extends Og{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=zr.get(this.auth._key());if(!e){try{const i=await aR(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}zr.set(this.auth._key(),e)}return this.bypassAuthState||zr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function aR(t,e){const n=uR(e),i=lR(t);if(!await i._isAvailable())return!1;const r=await i._get(n)==="true";return await i._remove(n),r}function cR(t,e){zr.set(t._key(),e)}function lR(t){return ot(t._redirectPersistence)}function uR(t){return jr(sR,t.config.apiKey,t.name)}async function dR(t,e){return await pi(t)._initializationPromise,Dg(t,e,!1)}async function Dg(t,e,n=!1){if(xe(t.app))return Promise.reject(an(t));const i=pi(t),r=Lg(i,e),o=await new oR(i,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hR=600*1e3;class fR{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!pR(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!Mg(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Ve(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hR&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ud(e))}saveEventToCache(e){this.cachedEventUids.add(Ud(e)),this.lastProcessedEventTime=Date.now()}}function Ud(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Mg({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function pR(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gR(t,e={}){return fi(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_R=/^https?/;async function yR(t){if(t.config.emulator)return;const{authorizedDomains:e}=await gR(t);for(const n of e)try{if(ER(n))return}catch{}Ze(t,"unauthorized-domain")}function ER(t){const e=ka(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!_R.test(n))return!1;if(mR.test(t))return i===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
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
 */const vR=new Er(3e4,6e4);function $d(){const t=Qe().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function wR(t){return new Promise((e,n)=>{function i(){$d(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$d(),n(Ve(t,"network-request-failed"))},timeout:vR.get()})}if(Qe().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Qe().gapi?.load)i();else{const r=Rk("iframefcb");return Qe()[r]=()=>{gapi.load?i():n(Ve(t,"network-request-failed"))},Ik(`${kk()}?onload=${r}`).catch(s=>n(s))}}).catch(e=>{throw Gr=null,e})}let Gr=null;function bR(t){return Gr=Gr||wR(t),Gr}/**
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
 */const SR=new Er(5e3,15e3),CR="__/auth/iframe",TR="emulator/auth/iframe",IR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},kR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function RR(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?tl(e,TR):`https://${t.config.authDomain}/${CR}`,i={apiKey:e.apiKey,appName:t.name,v:ci},r=kR.get(t.config.apiHost);r&&(i.eid=r);const s=t._getFrameworks();return s.length&&(i.fw=s.join(",")),`${n}?${ai(i).slice(1)}`}async function AR(t){const e=await bR(t),n=Qe().gapi;return S(n,t,"internal-error"),e.open({where:document.body,url:RR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:IR,dontclear:!0},i=>new Promise(async(r,s)=>{await i.restyle({setHideOnLeave:!1});const o=Ve(t,"network-request-failed"),a=Qe().setTimeout(()=>{s(o)},SR.get());function c(){Qe().clearTimeout(a),r(i)}i.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const PR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},NR=500,LR=600,OR="_blank",DR="http://localhost";class Bd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function MR(t,e,n,i=NR,r=LR){const s=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...PR,width:i.toString(),height:r.toString(),top:s,left:o},l=ye().toLowerCase();n&&(a=ug(l)?OR:n),cg(l)&&(e=e||DR,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(yk(l)&&a!=="_self")return xR(e||"",a),new Bd(null);const d=window.open(e||"",a,u);S(d,t,"popup-blocked");try{d.focus()}catch{}return new Bd(d)}function xR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const FR="__/auth/handler",UR="emulator/auth/handler",$R=encodeURIComponent("fac");async function Hd(t,e,n,i,r,s){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:ci,eventId:r};if(e instanceof ol){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",ts(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof vr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${$R}=${encodeURIComponent(c)}`:"";return`${BR(t)}?${ai(a).slice(1)}${l}`}function BR({config:t}){return t.emulator?tl(t,UR):`https://${t.authDomain}/${FR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo="webStorageSupport";class HR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ig,this._completeRedirectFn=Dg,this._overrideRedirectResult=cR}async _openPopup(e,n,i,r){yt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Hd(e,n,i,ka(),r);return MR(e,s,al())}async _openRedirect(e,n,i,r){await this._originValidation(e);const s=await Hd(e,n,i,ka(),r);return zk(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:s}=this.eventManagers[n];return r?Promise.resolve(r):(yt(s,"If manager is not set, promise should be"),s)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await AR(e),i=new fR(e);return n.register("authEvent",r=>(S(r?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Fo,{type:Fo},r=>{const s=r?.[0]?.[Fo];s!==void 0&&n(!!s),Ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=yR(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return gg()||lg()||rl()}}const WR=HR;var Wd="@firebase/auth",Vd="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zR(t){$t(new gt("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mg(t)},l=new Ck(i,r,s,c);return Pk(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),$t(new gt("auth-internal",e=>{const n=pi(e.getProvider("auth").getImmediate());return(i=>new VR(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ht(Wd,Vd,jR(t)),ht(Wd,Vd,"esm2020")}/**
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
 */const GR=300,qR=lf("authIdTokenMaxAge")||GR;let jd=null;const YR=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>qR)return;const r=n?.token;jd!==r&&(jd=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function KR(t=lc()){const e=dr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Ak(t,{popupRedirectResolver:WR,persistence:[Ng,Cg,Ig]}),i=lf("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(i,location.origin);if(location.origin===s.origin){const o=YR(s.toString());$k(n,o,()=>o(n.currentUser)),Uk(n,a=>o(a))}}const r=af("auth");return r&&Nk(n,`http://${r}`),n}function JR(){return document.getElementsByTagName("head")?.[0]??document}Tk({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=r=>{const s=Ve("internal-error");s.customData=r,n(s)},i.type="text/javascript",i.charset="UTF-8",JR().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zR("Browser");const tN=()=>!1,XR=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},B=(...t)=>{},QR=(...t)=>{localStorage.getItem("debug:console")},ZR="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",xi=new Set;function eA(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function tA(t){return B("[ONE TAP] Callback registered, total callbacks:",xi.size+1),xi.add(t),()=>xi.delete(t)}function In(t){B("[ONE TAP] Notifying status:",t,"to",xi.size,"callbacks"),xi.forEach(e=>{try{e(t)}catch{}})}function xg(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>xg(),100);return}eA(),google.accounts.id.initialize({client_id:ZR,callback:nA,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Fg(){if(ll()){In("not_needed");return}window.google?.accounts?.id&&(In("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?In("skipped"):e==="dismissed"?In("dismissed"):e==="display"&&In("displayed")}))}async function nA(t){try{B("[ONE TAP] Received credential, signing in with Firebase..."),In("signing_in");const e=Ae.credential(t.credential),n=await Fk(ke,e);B("[ONE TAP] ✅ Successfully signed in:",n.user.email),$g(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}let Na=!1;async function iA(){const t=he();if(!t||Na)return;const e=$(V,`users/${t}/presence`);try{await Re(e,{state:"online",lastChanged:on()}),await Mp(e).set({state:"offline",lastSeen:on(),lastChanged:on()}),Na=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function rA(){const t=he();if(!t)return;const e=$(V,`users/${t}/presence`);try{await Re(e,{state:"offline",lastSeen:on(),lastChanged:on()}),Na=!1}catch(n){console.error("Failed to set offline:",n)}}const ke=KR(Jc),Ug=(async()=>{try{await xo(ke,Ng)}catch{try{await xo(ke,Cg)}catch{await xo(ke,Aa)}}try{const t=await dR(ke);t?.user&&console.log("[AUTH] ✅ Sign-in completed (via Safari fallback), user:",t.user.email||t.user.uid)}catch(t){B("[AUTH] No redirect result:",t.code)}setTimeout(()=>{xg(),Fg()},500)})();let ki=!1;function $g(t){ki=t}function sA(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let Si=null;const oA=()=>Math.random().toString(36).substring(2,15),La="guestUser",aA=2880*60*1e3;function cA(){try{const t=typeof localStorage<"u"?localStorage.getItem(La):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(La)}catch{}return null}return e}catch{return null}}function lA(t,e=aA){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(La,JSON.stringify(i))}catch{}return i}function de(){const t=he();if(t)return t;if(!Si){const e=cA();e&&e.id?Si=e.id:(Si=oA(),lA(Si))}return Si}function Bg(){return ke.currentUser}function ll(){return ke.currentUser!==null}function he(){return ke.currentUser?.uid??null}function uA(){return new Promise(t=>{const e=wg(ke,n=>{e(),t(n)})})}function ul(t,{truncate:e=7}={}){return wg(ke,n=>{const i=!!n,r=n?.displayName||"Guest User",s=typeof r=="string"&&r.length>e?r.slice(0,e)+"...":r;i&&iA().catch(o=>{console.warn("Failed to initialize presence:",o)});try{t({user:n,isLoggedIn:i,userName:s})}catch{}})}async function Hg(){const t=new Ae;t.setCustomParameters({prompt:"select_account"});const n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})()&&/iphone|ipad|ipod/i.test(navigator.userAgent||"");try{if(n&&ki){ki=!1,sA();return}console.log("[AUTH] Starting popup sign-in flow...");const i=await rR(ke,t),s=Ae.credentialFromResult(i).accessToken,o=i.user;console.log("Signed in user:",o),B("Google Access Token exists:",!!s),ki=!1}catch(i){const r=i?.code||"unknown",s=i?.message||String(i);if(r==="auth/popup-closed-by-user"||r==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((r==="auth/network-request-failed"||r==="auth/popup-blocked")&&n){console.warn(`[AUTH] ${r} inside iOS standalone PWA. Arming Safari fallback.`),ki=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(r==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const o=i?.customData?.email,a=Ae.credentialFromError(i);if(console.error("Error during Google sign-in:",{errorCode:r,errorMessage:s,email:o,credential:a,origin:typeof window<"u"?window.location.origin:"n/a"}),r==="auth/unauthorized-domain"){const c=typeof window<"u"?window.location.origin:"",l=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",c?`• ${c}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];c&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(c).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${l.join(`
`)}`);return}alert(`Sign-in failed: ${s}`)}}async function Wg(){try{await rA(),await Bk(ke),console.info("User signed out"),setTimeout(()=>Fg(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const dA=Object.freeze(Object.defineProperty({__proto__:null,auth:ke,authReady:Ug,getCurrentUser:Bg,getCurrentUserAsync:uA,getLoggedInUserId:he,getUserId:de,isLoggedIn:ll,onAuthChange:ul,setSafariExternalOpenArmed:$g,signInWithGoogle:Hg,signOutUser:Wg},Symbol.toStringTag,{value:"Module"})),hA=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),fA=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,i)=>{const r=i.trim(),s=r.split(".").reduce((a,c)=>a?.[c],e);return s==null?"":r.endsWith("Html")?String(s):hA(String(s))}),pA=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=fA(t,e),n.content.cloneNode(!0)},gA=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const r=i.parentElement;if(!r)break;const s=Array.prototype.indexOf.call(r.children,i);n.push(s),i=r}return n.reverse()},mA=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),_A=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:gA(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),yA=t=>t.replace(/["'\\]/g,"\\$&"),EA=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const r=yA(n.name);i=t.querySelector(`input[name="${r}"], textarea[name="${r}"], select[name="${r}"]`)}else n.id?i=t.querySelector(`#${n.id}`):n.path&&(i=mA(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},vA=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),wA=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},bA=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=wA(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},SA=()=>document.readyState!=="loading",dl=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:r="div",className:s="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!SA())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(r);s&&(u.className=s);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const w=p[1].trim().split(".")[0];h.add(w)}const y=[],m=[],T={},H=()=>{let w=[],P=[];l&&(w=_A(u),P=vA(u)),u.textContent="";const x=pA(e,d);u.appendChild(x),Object.keys(n).forEach(fe=>{const pe=u.querySelectorAll(`[onclick="${fe}"]`),Ye=n[fe];pe.forEach(yi=>{yi.removeAttribute("onclick"),typeof Ye=="function"&&yi.addEventListener("click",Ye)})}),l&&(EA(u,w),bA(u,P)),y.forEach(fe=>fe({...d}))},j=w=>{if(!Array.isArray(w)||w.length===0)return;const P={props:{...d},changedKeys:w};m.forEach(x=>x(P))};for(const w of Object.keys(t))T[w]=[],Object.defineProperty(u,w,{get(){return d[w]},set(P){d[w]!==P&&(d[w]=P,h.has(w)&&H(),T[w].forEach(x=>x(P)),j([w]))},configurable:!0,enumerable:!0});if(u.update=w=>{let P=!1,x=!1;const fe=[];for(const pe in w)w[pe]!==d[pe]&&(d[pe]=w[pe],h.has(pe)&&(x=!0),T[pe]&&T[pe].forEach(Ye=>Ye(w[pe])),P=!0,fe.push(pe));P&&x&&H(),fe.length>0&&j(fe)},u.onRender=w=>{typeof w=="function"&&y.push(w)},u.onAnyPropUpdated=w=>{typeof w=="function"&&m.push(w)},u.onPropUpdated=(w,P)=>{typeof P=="function"&&T[w]&&T[w].push(P)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(w=>{typeof w=="function"&&w()}):typeof a=="function"&&a()),y.length=0,m.length=0;for(const w in T)T[w].length=0;u.remove()},H(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(w){QR("[createComponent]: Error in onMount handler of component",w)}return u};let Ci=null;const CA=(t,e=null)=>{if(Ci)return Ci;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,r=10;typeof e=="number"&&(r=e);const s=ll();return Ci=dl({initialProps:{isLoggedIn:s,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:r},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:Hg,handleLogout:Wg},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(s),n=ul(({isLoggedIn:c,userName:l})=>{B("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),i=tA(c=>{B("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),Ci=null},className:"auth-component",parent:t}),Ci},hl=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),fl=t=>{if(hl(t))return t.classList.contains("hidden")},A=t=>{hl(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},E=t=>{hl(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Vg=t=>t.classList.contains("small-frame"),Mn=t=>{if(t&&!Vg(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},at=t=>{if(Vg(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function Oa(t){return document.pictureInPictureElement===t}function oo(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const z=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let et=null,Gt=null,ao=null,pl=null,Ce=null,ee=null,te=null,q=null,W=null,Se=null,Le=null,Me=null,ze=null,gi=null,jg=null,Ge=null,co=null,mi=null,_i=null,En=null,gl=null,ml=null,_l=null,yl=null;function zd(){et=z("lobby"),Gt=z("lobby-call-btn"),ao=z("title-auth-bar"),pl=z("videos"),Ce=z("local-video-el"),ee=z("local-video-box"),te=z("remote-video-el"),q=z("remote-video-box"),W=z("shared-video-el"),Se=z("shared-video-box"),Le=z("chat-controls"),Me=z("call-btn"),ze=z("hang-up-btn"),gi=z("switch-camera-btn"),Ge=z("mute-btn"),co=z("fullscreen-partner-btn"),mi=z("mic-btn"),_i=z("camera-btn"),En=z("exit-watch-mode-btn"),gl=z("app-pip-btn"),ml=z("app-title-h1"),_l=z("app-title-a"),yl=z("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",zd):zd();const zg=()=>({lobbyDiv:et,lobbyCallBtn:Gt,titleAuthBar:ao,videosWrapper:pl,localVideoEl:Ce,localBoxEl:ee,remoteVideoEl:te,remoteBoxEl:q,sharedVideoEl:W,sharedBoxEl:Se,chatControls:Le,callBtn:Me,hangUpBtn:ze,switchCameraBtn:gi,installBtn:jg,mutePartnerBtn:Ge,fullscreenPartnerBtn:co,micBtn:mi,cameraBtn:_i,exitWatchModeBtn:En,appPipBtn:gl,appTitleH1:ml,appTitleA:_l,appTitleSpan:yl});function Gg(t,e=3,n=100){return new Promise(i=>{let r=0;const s=()=>{const o=document.getElementById(t);if(o){i(o);return}if(r++,r>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(s,n)};s()})}async function qg(t,e=3,n=100){const i={},r=t.map(async s=>{const o=await Gg(s,e,n);return i[s]=o,o});return await Promise.all(r),i}async function TA(){const t=await qg(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,r])=>!r).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const IA=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return gl},get appTitleA(){return _l},get appTitleH1(){return ml},get appTitleSpan(){return yl},get callBtn(){return Me},get cameraBtn(){return _i},get chatControls(){return Le},get exitWatchModeBtn(){return En},get fullscreenPartnerBtn(){return co},getElements:zg,get hangUpBtn(){return ze},initializeYouTubeElements:TA,installBtn:jg,get lobbyCallBtn(){return Gt},get lobbyDiv(){return et},get localBoxEl(){return ee},get localVideoEl(){return Ce},get micBtn(){return mi},get mutePartnerBtn(){return Ge},get remoteBoxEl(){return q},get remoteVideoEl(){return te},robustElementAccess:Gg,get sharedBoxEl(){return Se},get sharedVideoEl(){return W},get switchCameraBtn(){return gi},get titleAuthBar(){return ao},get videosWrapper(){return pl},waitForElements:qg},Symbol.toStringTag,{value:"Module"})),Gd="yt-video-box",Da="yt-player-root";let Y=null,Et=!1;const Fi=()=>Y,kA=()=>Et,Yg=t=>Et=t,xn=()=>{const t=document.getElementById(Gd);if(!t)throw new Error(`Container #${Gd} not found`);return t};function RA(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Kg(){const t=xn();if(!document.getElementById(Da)){const e=document.createElement("div");e.id=Da,t.appendChild(e)}A(t)}function Ts(){const t=xn();E(t)}function Uo(){const t=xn();return t&&!t.classList.contains("hidden")}function Ma(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Jg(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function AA({url:t,onReady:e,onStateChange:n}){const i=Jg(t);if(!i)throw new Error("Invalid YouTube URL");if(await RA(),Y){try{Y.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}Y=null}const r=(o=!0)=>{const a=xn(),c=Y.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=xn(),h=Y.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),Y.getPlayerState()!==window.YT.PlayerState.PLAYING?vl():br()}};document.addEventListener("keydown",l,{once:!0})}}},s=()=>{const o=xn(),a=Y.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Kg(),new Promise((o,a)=>{try{Y=new window.YT.Player(Da,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Et=!0,e&&e(c),o(Y)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&r(!1),c.data===window.YT.PlayerState.PAUSED&&r(),c.data===window.YT.PlayerState.PLAYING&&s(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function El(){if(Y){try{Ts(),Y.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}Y=null,Et=!1}}function vl(){Y&&Et&&Y.playVideo()}function br(){Y&&Et&&Y.pauseVideo()}function PA(t){Y&&Et&&Y.seekTo(t,!0)}function Is(){return Y&&Et?Y.getCurrentTime():0}function wl(){return Y&&Et?Y.getPlayerState():-1}const At={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let je=null,Sr=null,Xg=!1,Oe="none",bl=null;const Cr=()=>Xg,Qg=t=>Xg=t,tn=()=>Oe,NA=t=>{["yt","url","none"].includes(t)?Oe=t:console.warn("Invalid lastWatched platform:",t)};let Pt=!1,Ui=null,$i=0;async function Fn(t){if(!je)return;console.debug("Updating watch sync state, roomId:",je);const e=io(je);try{await Nn(e,{...t,updatedBy:Sr})}catch(n){console.error("Failed to update watch state:",n)}}function LA(t,e,n){if(!t)return;je=t,Sr=n;const i=io(t);Wr(i,OA,t),BA()}function OA(t){const e=t.val();e&&e.updatedBy!==Sr&&(Date.now()-$i<500||(e.url&&e.url!==bl&&DA(e.url),e.isYouTube?MA(e):$A(e)))}function DA(t){bl=t,Ma(t)?(E(Se),Zg(t),Oe="yt"):(El(),A(Se),W.src=t,Oe="url")}function MA(t){!Fi()||!kA()||(xA(t),FA(t))}function xA(t){const e=wl(),n=e===At.PLAYING;if([At.BUFFERING,At.UNSTARTED].includes(e)){UA();return}Pt||(t.playing&&!n?(vl(),Oe="yt"):!t.playing&&n&&(br(),Oe="yt"))}function FA(t){if(t.currentTime===void 0)return;const e=Is();Math.abs(e-t.currentTime)>.3&&!Pt&&(PA(t.currentTime),setTimeout(()=>{t.playing?vl():br(),Oe="yt"},500))}function UA(){Pt=!0,clearTimeout(Ui),Ui=setTimeout(async()=>{Pt=!1;const t=wl()===At.PLAYING;await Fn({playing:t,currentTime:Is()})},700)}function $A(t){t.playing!==void 0&&(t.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!W.paused&&W.pause()),t.currentTime!==void 0&&Math.abs(W.currentTime-t.currentTime)>1&&(W.currentTime=t.currentTime,t.playing?W.play().catch(n=>console.warn("Play failed:",n)):W.pause())}function BA(){W.addEventListener("play",async()=>{!Fi()&&je&&($i=Date.now(),await Fn({playing:!0,isYouTube:!1})),Oe="url"}),W.addEventListener("pause",async()=>{!Fi()&&je&&($i=Date.now(),await Fn({playing:!1,isYouTube:!1})),Oe="url"}),W.addEventListener("seeked",async()=>{!Fi()&&je&&($i=Date.now(),await Fn({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),Oe="url"})}async function HA(t){if(!t)return!1;if($i=Date.now(),Ma(t)){if(E(Se),!await Zg(t))return!1;Oe="yt"}else El(),A(Se),W.src=t,Oe="url";if(je){const e=io(je);Re(e,{url:t,playing:!1,currentTime:0,isYouTube:Ma(t),updatedBy:Sr})}return!0}async function xa(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;bl=t.url;const e=await HA(t.url);return Ua(),e}async function Zg(t){if(!Jg(t))return console.error("Invalid YouTube URL:",t),!1;try{return await AA({url:t,onReady:n=>{if(Yg(!0),je){const i=io(je);Re(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Sr})}},onStateChange:async n=>{if(!Fi())return;const r=n.data===At.PLAYING,s=n.data===At.PAUSED;if(n.data===At.BUFFERING){Pt=!0,Ui&&clearTimeout(Ui),Ui=setTimeout(async()=>{Pt=!1;const c=wl()===At.PLAYING;await Fn({playing:c,currentTime:Is()})},700);return}s&&Pt||!Pt&&(r||s)&&await Fn({playing:r,currentTime:Is()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function WA(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:r=null,hideOnEsc:s=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){A(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{E(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{E(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(m){if(s&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),E(t);function y(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return y}let ct=null,lt=null,em="user";function Fa(){return em}function tm(t){em=t}function lo(){return ct instanceof MediaStream}function Sl(){return!ct||!(ct instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",ct),null):ct}function nm(t){ct=t}function im(){ct&&(ct.getTracks().forEach(t=>t.stop()),ct=null)}function rm(){return lt instanceof MediaStream}function uo(){return!lt||!(lt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",lt),console.error("Call createLocalStream() before accessing local stream."),null):lt}function ks(t){lt=t}function sm(){lt&&(lt.getTracks().forEach(t=>t.stop()),lt=null)}const VA=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:sm,cleanupRemoteStream:im,getFacingMode:Fa,getLocalStream:uo,getRemoteStream:Sl,hasLocalStream:rm,hasRemoteStream:lo,setFacingMode:tm,setLocalStream:ks,setRemoteStream:nm},Symbol.toStringTag,{value:"Module"}));let nr=!1,Mr=!1,qd=null,Yd=null,Bi=null;const om=()=>nr;let Cl=()=>{if(!nr){if(!te||!lo()||te.paused||te.readyState<2){Mr||(Mr=!0,te.addEventListener("playing",()=>{Mr=!1,Cl()},{once:!0}));return}if(Mr=!1,nr=!0,A(q),A(ee),Mn(ee),E(et),E(Gt),Me.disabled=!0,Me.classList.add("disabled"),ze.disabled=!1,ze.classList.remove("disabled"),Ge.disabled=!1,Ge.classList.remove("disabled"),Bi||(Bi=WA(Le,{inactivityMs:2500,hideOnEsc:!0})),!qd){const t=()=>{Cr()?Mn(q):at(q),A(q)};te.addEventListener("leavepictureinpicture",t),qd=()=>te.removeEventListener("leavepictureinpicture",t)}if(!Yd){const t=()=>E(q);te.addEventListener("enterpictureinpicture",t),Yd=()=>te.removeEventListener("enterpictureinpicture",t)}}},am=()=>{nr&&(nr=!1,at(ee),E(ee),at(q),E(q),Me.disabled=!1,Me.classList.remove("disabled"),A(Gt),ze.disabled=!0,ze.classList.add("disabled"),Ge.disabled=!0,Ge.classList.add("disabled"),Bi&&(Bi(),Bi=null),A(et),A(Le))};const Tl=()=>{if(!lo())return!1;const t=Sl();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function jA(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Ua(){if(!Cr()){if(Qg(!0),E(et),E(Gt),Le.classList.remove("bottom"),Le.classList.add("watch-mode"),om()?(E(Me),A(ze)):(E(ze),E(mi),E(Ge),A(Me)),E(_i),E(gi),A(En),A(Le),!Tl()){E(q),at(q),Oa(Ce)||(A(ee),Mn(ee));return}E(ee),at(ee),Oa(te)?(E(q),at(q)):jA()?te.requestPictureInPicture().then(()=>{E(q),at(q)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Mn(q),A(q)}):(Mn(q),A(q))}}function Hi(){Cr()&&(E(En),A(Me),A(ze),A(mi),A(Ge),A(_i),A(gi),Le.classList.remove("watch-mode"),Le.classList.add("bottom"),A(Le),Tl()&&(Oa(te)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),at(q),A(q)),om()?(Mn(ee),A(ee)):(A(et),A(Gt),at(ee),E(ee)),Qg(!1))}class Un{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const r={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(r),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,r={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...r})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,r={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...r})}logNotificationDecision(e,n,i,r={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...r})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,r={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...r})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,r={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...r})}logMemberJoinEvent(e,n,i,r={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...r})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,r={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...r})}logFreshnessValidation(e,n,i,r={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...r})}logRaceCondition(e,n,i,r={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...r})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=e,r.click(),URL.revokeObjectURL(r.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const r=new Set(this.logs.map(o=>o.id)),s=i.logs.filter(o=>!r.has(o.id));return this.logs=[...this.logs,...s].sort((o,a)=>o.timestamp-a.timestamp),s.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Un.getPersistedLogKeys().forEach(r=>{try{const s=localStorage.getItem(r);if(s){const o=JSON.parse(s);o.exportTime&&o.exportTime<n&&localStorage.removeItem(r)}}catch{localStorage.removeItem(r)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(r=>r.category==="TIMING"&&r.event==="START"&&r.data.timingId===e);if(i){const r=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:r,operation:i.data.operation,...n}),r}return null}}let $o=null;function _(){return $o||($o=new Un),$o}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>_(),exportLogs:()=>{const e=_().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{_().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=_().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=_().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=_().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=_().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=_().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=_().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=_().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Un.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{_().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{_().enable(),console.log("Diagnostic logging enabled")},disable:()=>{_().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=_(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=_();t.logs.length>0&&t.persistLogs(),Un.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=_(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Un.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class zA{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const r=Date.now();i||(i=Math.random().toString(36).substring(2,15)),_().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:r});const s=Yt(i);try{return await Re(s,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),_().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-r}),await this.joinRoom(i,n),_().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-r}),i}catch(o){throw _().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-r}),o}}async checkRoomStatus(e){const n=Yt(e),i=await Mt(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const r=i.val(),s=r.members||{},o=Object.keys(s).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:r}}async getRoomData(e){const n=Yt(e),i=await Mt(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=Yt(e);await Nn(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const r=Rd(e,n);await Re(r,{displayName:i,joinedAt:Date.now()}),_().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const r=n||this.currentRoomId;if(!r||!e)return;const s=Rd(r,e),o=Or(r),a=Yt(r);try{await _n(s)}catch(c){_().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:r,userId:e})}if(i)try{const c=await Mt(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await _n(a).catch(d=>{_().logFirebaseOperation("delete_empty_room",!1,d,{roomId:r})})}catch(c){_().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:r})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const r=Yt(e),s={rejection:{by:n,reason:i,at:Date.now()}};try{await Nn(r,s),_().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw _().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const r=Yt(e),s={cancellation:{by:n,reason:i,at:Date.now()}};try{await Nn(r,s),_().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw _().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=XI(e);en(i,"value",n,e),_().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=Or(e);en(i,"child_added",n,e),_().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=Or(e);en(i,"child_removed",n,e),_().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const r=Or(e),s=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return en(r,"child_added",s,e,n),en(r,"child_removed",o,e,n),()=>JI(n,e)}get roomId(){return this.currentRoomId}}const Q=new zA;class GA{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=r=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,r),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class qA{constructor({incomingSrc:e,outgoingSrc:n,volume:i}={}){this.incomingSrc=e??"/sounds/incoming.mp3",this.outgoingSrc=n??"/sounds/outgoing.mp3",this.defaultVolume=i??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:i}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),i!==void 0&&(this.defaultVolume=i)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new GA(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const $n=new qA,Rs=3e4;let it=null,Ri=null;async function YA(t,e=null){const n=de(),i=he();if(!i)return;const r=Qc(i);await Re(r,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function As(){const t=he();if(!t)return;const e=Qc(t);await _n(e).catch(()=>{})}async function cm(t,e){if(!t)return!1;try{const n=Qc(t),i=await Mt(n);if(!i.exists())return!1;const r=i.val();return r.roomId!==e?!1:Date.now()-r.initiatedAt<Rs}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function lm(t){if(!t)return!1;try{const e=$(V,`rooms/${t}/createdAt`),n=await Mt(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<Rs}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function um(t,e,n){const i=_(),r=Date.now();xt(),await YA(t,e);const s=document.createElement("div");s.id="calling-modal",s.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-r});try{await Promise.all([As(),Q.cancelCall(t,de(),"caller_cancelled"),Q.leaveRoom(de(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}$n.stop(),xt()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),s.appendChild(o),document.body.appendChild(s),s.dataset.roomId=t,it=s,$n.playOutgoing(),Ri=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-r,timeoutMs:Rs});try{await Promise.all([As(),Q.cancelCall(t,de(),"auto_timeout"),Q.leaveRoom(de(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}$n.stop(),xt()},Rs)}function xt(){if($n.stop(),it){const t=it.dataset?.roomId||"unknown";_().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Ri,timestamp:Date.now()})}Ri&&(clearTimeout(Ri),Ri=null),it&&(it.remove(),it=null)}async function Il(){if(it){const t=it.dataset?.roomId||"unknown";_().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await As(),xt()}async function KA(t="user_rejected"){const e=_(),n=it?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await As(),xt()}const JA=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:xt,isOutgoingCallFresh:cm,isRoomCallFresh:lm,onCallAnswered:Il,onCallRejected:KA,showCallingUI:um},Symbol.toStringTag,{value:"Module"}));let Bn=null;function kl(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const r=i.querySelector('[data-action="confirm"]'),s=i.querySelector('[data-action="cancel"]');if(!r||!s){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),Bn===a&&(Bn=null),n(c)}r.addEventListener("click",()=>{a(!0)}),s.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),Bn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function XA(){if(typeof Bn=="function"){try{Bn(!1)}catch{}return Bn=null,!0}return!1}const QA=Object.freeze(Object.defineProperty({__proto__:null,default:kl,dismissActiveConfirmDialog:XA},Symbol.toStringTag,{value:"Module"}));function dm(t,e){return[t,e].sort().join("_")}const Kd=100;async function ZA(t,e){const n=he();if(!n){console.warn("Cannot send message: not logged in");return}const r=Bg()?.displayName||"Guest User",s=dm(n,t),o=ys($(V,`conversations/${s}/messages`));await Re(o,{text:e,from:n,fromName:r,sentAt:on(),read:!1}),eP(s).catch(a=>{console.warn("Failed to cleanup old messages:",a)})}async function eP(t){const{get:e,remove:n}=await Je(async()=>{const{get:l,remove:u}=await Promise.resolve().then(()=>oI);return{get:l,remove:u}},void 0),i=$(V,`conversations/${t}/messages`),r=await e(i);if(!r.exists())return;const s=r.val(),o=Object.keys(s).length;if(o<=Kd)return;const a=o-Kd,c=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0));for(let l=0;l<a;l++){const[u]=c[l];await n($(V,`conversations/${t}/messages/${u}`))}console.log(`[MESSAGING] Cleaned up ${a} old messages from conversation ${t}`)}function tP(t,e){const n=he();if(!n)return console.warn("Cannot listen to messages: not logged in"),()=>{};const i=dm(n,t),r=$(V,`conversations/${i}/messages`),s=o=>{const a=o.val();if(!a)return;const c=a.from===n;e(a.text,a,c),!c&&!a.read&&Nn(o.ref,{read:!0}).catch(l=>{console.warn("Failed to mark message as read:",l)})};return jc(r,s),()=>{Cn(r,"child_added",s)}}function Ps(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:r=!0,events:s=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{r&&l.key==="Escape"&&e(l)};return s.forEach(l=>document.addEventListener(l,a,{passive:!0})),r&&document.addEventListener("keydown",c),function(){s.forEach(u=>document.removeEventListener(u,a,{passive:!0})),r&&document.removeEventListener("keydown",c)}}const nP=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function iP(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function rP(t){let e=null,n=null,i=null,r=null,s=null,o=!1;const a=dl({initialProps:{unreadCount:0},template:`
      <div id="messages-toggle-btn">
        <button onclick="handleToggle">
          💬
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:P=>{P.preventDefault(),P.stopPropagation(),y()}},className:"messages-toggle-container",autoAppend:!1});let c=a.querySelector(".notification-badge");c&&(c.style.display="none"),a.onPropUpdated("unreadCount",P=>{const x=a.querySelector(".notification-badge");if(x&&(x.style.display=P>0?"flex":"none"),P>0){const fe=a.querySelector("#messages-toggle-btn");fe&&(fe.classList.add("new-message"),setTimeout(()=>{fe.classList.remove("new-message")},4e3))}});const l=document.createElement("div");if(l.innerHTML=`
    <div id="messages-box" class="messages-box hidden">
      <div id="messages"></div>
      <form id="messages-form">
        <input id="messages-input" placeholder="Type a message...">
        <button type="submit">Send</button>
      </form>
    </div>
  `,document.body.appendChild(l),e=a.querySelector("#messages-toggle-btn"),n=l.querySelector("#messages-box"),i=l.querySelector("#messages"),r=l.querySelector("#messages-form"),s=l.querySelector("#messages-input"),!e||!n||!i||!r||!s)return console.error("Messages UI elements not found."),null;function u(){if(!e||!n||n.classList.contains("hidden"))return;const P=e.getBoundingClientRect(),x=n.getBoundingClientRect(),fe=8;let pe=P.top-x.height-fe;pe<8&&(pe=P.bottom+fe);let Ye=P.left+P.width/2-x.width/2;const yi=window.innerWidth-x.width-8;Ye<8&&(Ye=8),Ye>yi&&(Ye=yi),n.style.top=`${Math.round(pe)}px`,n.style.left=`${Math.round(Ye)}px`}function d(){o||(o=!0,window.addEventListener("resize",u,{passive:!0}),window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("orientationchange",u,{passive:!0}))}function h(){o&&(o=!1,window.removeEventListener("resize",u),window.removeEventListener("scroll",u),window.removeEventListener("orientationchange",u))}const f=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu");a&&f&&f.appendChild(a);const p=new MutationObserver(P=>{P.forEach(x=>{x.type==="attributes"&&x.attributeName==="class"&&(n.classList.contains("hidden")||(a.unreadCount=0))})});p.observe(n,{attributes:!0});function y(){n.classList.toggle("hidden"),n.classList.contains("hidden")?(s.blur(),h(),n.style.top="",n.style.left="",n.style.bottom="",n.style.right=""):(s.focus(),nP?requestAnimationFrame(()=>{iP(n)||(u(),d())}):(u(),d()))}Ps(n,()=>{E(n),h(),n.style.top="",n.style.left="",n.style.bottom="",n.style.right=""},{ignore:[a],esc:!0});function m(){A(a)}function T(){E(a)}function H(P){const x=document.createElement("p");x.textContent=P,P.startsWith("You:")?x.style.textAlign="right":P.startsWith("Partner:")&&(x.style.textAlign="left"),i.appendChild(x),i.scrollTop=i.scrollHeight}function j(P){H(`Partner: ${P}`),fl(n)&&a.unreadCount++}r.addEventListener("submit",P=>{P.preventDefault();const x=s.value.trim();x&&(t(x),s.value="")});function w(){a&&a.parentNode&&a.parentNode.removeChild(a),h(),p.disconnect(),a.dispose(),l&&l.parentNode&&l.parentNode.removeChild(l)}return{appendChatMessage:H,receiveMessage:j,toggleMessages:y,showMessagesToggle:m,hideMessagesToggle:T,cleanup:w}}const Bo=new Map,Ti=new Map;async function Jd(t,e,n){const i=he();if(i){const r=$(V,`users/${i}/contacts/${t}`);await Re(r,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const r=localStorage.getItem("contacts")||"{}",s=JSON.parse(r);s[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(s))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function ir(){const t=he();if(t)try{const e=$(V,`users/${t}/contacts`),n=await Mt(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function sP(t,e){if(!t)return e||"Unknown";try{const n=await ir();for(const i of Object.values(n||{}))if(i?.roomId===t)return i.contactName||i.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function oP(t,e,n){if(!t||!e)return;const r=(await ir())?.[t];if(r){r.roomId!==e&&(await Jd(t,r.contactName,e),await rr(n)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),Zn(e);return}if(!await kl("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await Jd(t,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),Zn(e),await rr(n)}async function rr(t){if(!t)return;const e=await ir(),n=Object.keys(e);let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",E(i);return}A(i),i.innerHTML=`
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${n.map(r=>{const s=e[r];return`
            <div class="contact-entry">
              <button
                class="contact-message-btn"
                data-contact-id="${r}"
                data-contact-name="${s.contactName}"
                title="Send message to ${s.contactName}"
              >
                💬
              </button>
              <span
                class="contact-name"
                data-room-id="${s.roomId}"
                data-contact-name="${s.contactName}"
                data-contact-id="${r}"
                title="Call ${s.contactName}"
              >
                <span class="presence-indicator" data-contact-id="${r}"></span>
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
  `,aP(i,t),cP(n)}function aP(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=i=>{i.stopPropagation();const r=n.getAttribute("data-contact-id"),s=n.getAttribute("data-contact-name");r&&hm(r,s)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-room-id"),r=n.getAttribute("data-contact-name");i&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${i}`),Zn(i),await um(i,r),ho(i,{forceInitiator:!0}).catch(s=>{console.warn("Failed to call contact:",s),xt()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await lP(i),await rr(e))}})}function hm(t,e){if(!he()){alert("Please sign in to send messages");return}if(Ti.has(t)){Ti.get(t).messagesUI.toggleMessages();return}Ti.forEach((s,o)=>{console.log(`[MESSAGING] Closing previous session with ${s.contactName}`),s.unsubscribe(),s.messagesUI.cleanup(),Ti.delete(o)});const i=rP(s=>{ZA(t,s)}),r=tP(t,(s,o,a)=>{a?i.appendChatMessage(`You: ${s}`):i.receiveMessage(s)});Ti.set(t,{messagesUI:i,unsubscribe:r,contactId:t,contactName:e}),i.showMessagesToggle(),i.toggleMessages(),console.log(`[MESSAGING] Opened messaging session with ${e}`)}function cP(t){Bo.forEach(({ref:e,callback:n})=>{Cn(e,"value",n)}),Bo.clear(),he()&&t.forEach(e=>{const n=$(V,`users/${e}/presence`),i=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!i)return;const r=s=>{const a=s.val()?.state==="online";i.style.backgroundColor=a?"#00d26a":"#444",i.title=a?"Online":"Offline"};Vc(n,r),Bo.set(e,{ref:n,callback:r})})}async function lP(t){const e=he();if(e){try{await _n($(V,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}function uP(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class dP{constructor(){this.originalTitle=document.title,this.originalFavicon=uP(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[VisibilityManager] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[VisibilityManager] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[VisibilityManager] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[VisibilityManager] Badge set to: ${e}`)}).catch(n=>{console.warn("[VisibilityManager] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[VisibilityManager] Badge cleared")}).catch(e=>{console.warn("[VisibilityManager] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[VisibilityManager] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[VisibilityManager] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[VisibilityManager] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[VisibilityManager] Wake lock released manually")}).catch(n=>{console.warn("[VisibilityManager] Wake lock release failed:",n)})}}}const Xd=new dP,sr=new WeakMap;function Rl(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(sr.has(t)||sr.set(t,[]),e==="initiator")Qd(t,"offerCandidates",n),Zd(t,"answerCandidates",n);else if(e==="joiner")Qd(t,"answerCandidates",n),Zd(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Qd(t,e,n){t.onicecandidate=i=>{if(i.candidate){const r=ys(e==="offerCandidates"?Zp(n):eg(n));Re(r,i.candidate.toJSON())}}}function Zd(t,e,n){const i=e==="offerCandidates"?Zp(n):eg(n);let r=!1;const s=()=>{if(r)return;r=!0;const a=()=>{t.remoteDescription&&(Al(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};en(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=sr.get(t);l&&(l.push(c),l.length===1&&s())}},n)}function Al(t){if(!t||!sr.has(t))return;const e=sr.get(t);if(e.length!==0){B(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{B("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const hP=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Al,setupIceCandidates:Rl},Symbol.toStringTag,{value:"Module"}));let Ke=null,eh=null;function fm(t){eh=t,t.onconnectionstatechange=()=>{B("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Cl(),Il().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Ke&&(clearTimeout(Ke),Ke=null)):t.connectionState==="disconnected"?(Ke&&clearTimeout(Ke),Ke=setTimeout(()=>{t===eh&&t.connectionState==="disconnected"&&ae.cleanupCall({reason:"connection_lost"}),Ke=null},3e3)):t.connectionState==="failed"&&(oo(),Ke&&(clearTimeout(Ke),Ke=null),ae.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{B("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const Pl={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Ho=new WeakMap;function pm(t,e,n){Ho.has(t)||Ho.set(t,{});const i=Ho.get(t),r=e==="offer"?"lastOffer":"lastAnswer";return i[r]===n?!0:(i[r]=n,!1)}function gm(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function Nl(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function mm(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function _m(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function ym(t,e,n){if(pm(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!gm(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function Em(){return Math.random().toString(36).substring(2,9)}const fP=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:Nl,createAnswer:_m,createOffer:mm,generateRoomId:Em,isDuplicateSdp:pm,isValidSignalingState:gm,rtcConfig:Pl,setRemoteDescription:ym},Symbol.toStringTag,{value:"Module"}));async function pP({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:r,targetRoomId:s=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(Pl),a="initiator",c=s||Em(),l=de();Nl(o,t);const u=null,d=null;if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Rl(o,a,c),fm(o);const f=await mm(o);await Q.createNewRoom(f,l,c),r(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function gP({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:r,setupWatchSync:s,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await Q.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await Q.getRoomData(t)}catch(T){return B("Error: "+T.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(Pl),d="joiner",h=de();Nl(u,e);const f=null,p=null;if(!r(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Rl(u,d,t),fm(u),await ym(u,l,Al);const m=await _m(u);try{await Q.saveAnswer(t,m)}catch(T){return console.error("Failed to save answer to Firebase:",T),u.close(),{success:!1}}return s(t,d,h),await Q.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,messagesUI:p,role:d}}class mP{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(r){console.warn("CallController listener error",r)}}}class _P{constructor(){this.emitter=new mP,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=$(V,`rooms/${e}/cancellation`);let i=!1;const r=async s=>{const o=s.val();if(o&&!i){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Wr(n,r,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:r,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const r=$(V,`rooms/${e}/answer`),s=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Je(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>fP);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};Wr(r,s,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:r,callback:s,roomId:e})}setupRejectionListener(e){if(!e)return;const n=$(V,`rooms/${e}/rejection`);let i=!1;const r=async s=>{const o=s.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Je(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>JA);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await Q.leaveRoom(de(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Wr(n,r,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:r,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=de(),i=r=>{r.key!==n&&(this.setPartnerId(r.key),this.emitter.emit("memberJoined",{memberId:r.key,roomId:e}))};Q.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=de(),i=r=>{r.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:r.key,roomId:e})};Q.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&Cn(i.ref,"value",i.callback)}catch(r){console.warn(`Failed to remove ${e} listener`,r)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{no(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await pP(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:i}=await Je(async()=>{const{drainIceCandidateQueue:r}=await Promise.resolve().then(()=>hP);return{drainIceCandidateQueue:r}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await gP({...e,onMessagesUIReady:r=>{this.messagesUI=r}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,!this.messagesUI&&i.messagesUI&&(this.messagesUI=i.messagesUI),this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await Q.cancelCall(this.roomId,de(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId;this.removeTrackedListeners();try{await Q.leaveRoom(de(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear remote video",r)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear local video",r)}try{const{cleanupLocalStream:r}=await Je(async()=>{const{cleanupLocalStream:s}=await Promise.resolve().then(()=>VA);return{cleanupLocalStream:s}},void 0);r()}catch(r){console.warn("CallController: failed to cleanup local stream",r)}try{const{resetLocalStreamInitFlag:r}=await Je(async()=>{const{resetLocalStreamInitFlag:s}=await Promise.resolve().then(()=>eN);return{resetLocalStreamInitFlag:s}},void 0);r()}catch{}if(this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e}),this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(r){console.warn("CallController: failed to cleanup messages UI",r)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const ae=new _P,$a={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function vm(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?$a.withVoiceIsolationIfSupported:$a.default}const yP=()=>$a.default,EP={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},vP=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function Ll(t){const e=vP()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",r=EP[i][e];return{facingMode:t,...r}}function wP(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function bP(){return wP()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function SP(){const t=await bP();let e=!1,n=!1;return t.forEach(i=>{const r=i.label.toLowerCase();(r.includes("front")||r.includes("user"))&&(e=!0),(r.includes("back")||r.includes("rear")||r.includes("environment"))&&(n=!0)}),e&&n}async function CP({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const r=n==="user"?"environment":"user";try{const s=await navigator.mediaDevices.getUserMedia({video:Ll(r),audio:vm()}),o=s.getVideoTracks()[0],a=s.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:s,facingMode:r}}catch(s){return console.error("Failed to switch camera:",s),null}}let Wo=!1,Kt=null,Jt=null;function TP({getLocalStream:t,getFacingMode:e}){return Kt&&Jt&&Kt.removeEventListener("change",Jt),Kt=window.matchMedia("(orientation: portrait)"),Jt=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";IP({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},Kt.addEventListener("change",Jt),()=>{Kt&&Jt&&Kt.removeEventListener("change",Jt),Kt=null,Jt=null}}async function IP({localStream:t,currentFacingMode:e}){if(!(Wo||!t?.getVideoTracks()[0])){Wo=!0;try{const n=t.getVideoTracks()[0],i=Ll(e);B("Applying constraints:",i),await n.applyConstraints(i),B("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Wo=!1}}}let Ba=[];function kP(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function RP({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:r=null,micBtn:s,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){s&&(s.onclick=()=>{const d=t();if(!d)return;const h=d.getAudioTracks()[0];h&&(h.enabled=!h.enabled,kP(!h.enabled,s))}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=TP({getLocalStream:t,getFacingMode:Fa});Ba.push(u),a&&(a.onclick=async()=>{const d=await CP({localStream:t(),localVideo:e(),currentFacingMode:Fa(),peerConnection:i()||null});d?(tm(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof r=="function"&&r(d.newStream)):console.error("Camera switch failed.")},(async()=>await SP()?A(a):E(a))()),c&&(c.onclick=()=>{const d=n();if(!d)return;d.muted=!d.muted;const h=c.querySelector("i");h.className=d.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function AP(){Ba.forEach(t=>t()),Ba=[]}let Vo=null,Tt=null,G=null,U=null,th=!1,xr=!1,Xe=[],Ha="",ue=-1,Wa=[];const PP="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",NP="https://www.googleapis.com/youtube/v3";async function LP(){if(th||xr)return!1;xr=!0;const{initializeYouTubeElements:t}=await Je(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>IA);return{initializeYouTubeElements:o}},void 0),e=await t();if(Vo=e.searchContainer,Tt=e.searchBtn,G=e.searchQuery,U=e.searchResults,!Vo||!Tt||!G||!U)return console.error("YouTube search elements not found in DOM"),xr=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(U?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),ue=o??-1};Tt.onclick=async()=>{const o=G.value.trim();if(fl(G)){A(G),G.focus();return}if(!o){qr(),E(G);return}if(rh()&&o===Ha)Va(Xe);else if(!n(o))await nh(o);else{await xa({url:o}),E(U),G.value="",E(G),ue=-1;return}},Vo.addEventListener("keydown",async o=>{const a=U.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=ue+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=ue-1;c<0&&(c=ue===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&ue>=0){a[ue].click(),E(G),E(U),ue=-1;return}const c=G.value.trim();if(c)if(rh()&&c===Ha)Va(Xe);else if(!n(c))await nh(c);else{await xa({url:c}),E(U),ue=-1,G.value="",E(G);return}}else o.key==="Escape"&&(DP()?qr():G.value?G.value="":E(G))}),G.addEventListener("input",()=>{G.value.trim()===""&&qr(),ue=-1});const r=Ps(G,()=>E(G),{ignore:[Tt],esc:!1});Wa.push(r);const s=Ps(U,()=>E(U),{ignore:[Tt],esc:!1});return Wa.push(s),xr=!1,th=!0,!0}async function nh(t){if(!Tt||!U){console.error("Search elements not initialized");return}Xe=[],Ha=t,Tt.disabled=!0,U.innerHTML='<div class="search-loading">Searching YouTube...</div>',A(U);try{const e=await fetch(`${NP}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${PP}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){ih("No videos found"),Xe=[];return}Xe=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Va(Xe)}catch(e){console.error("YouTube search failed:",e),ih(e.message||"Search failed. Please try again.")}finally{Tt.disabled=!1}}function Va(t){if(!U){console.error("Search results element not initialized");return}if(!t||t.length===0){U.innerHTML='<div class="search-no-results">No results found</div>',Xe=[],ue=-1;return}U.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(await xa(n),E(U),ue=-1,!G){console.error("Search query element not initialized");return}G.value="",E(G)},U.appendChild(i)}),A(U),ue=0,U.querySelectorAll(".search-result-item").forEach((n,i)=>{i===ue?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function ih(t){if(Xe=[],ue=-1,!U){console.error("Search results element not initialized");return}U.innerHTML=`<div class="search-error">${t}</div>`,A(U)}function qr(){Xe=[],ue=-1,U&&(U.innerHTML="",E(U))}function OP(){qr(),Wa.forEach(t=>t())}function DP(){return!fl(U)}function rh(){return Xe.length>0}function MP({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let r=e;const s=dl({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():r&&r.toggleList()}},className:"notifications-toggle-container",parent:t});let o=s.querySelector(".notification-badge");return o&&(o.style.display="none"),s.onPropUpdated("unreadCount",a=>{const c=s.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),s.show=()=>{s.isHidden=!1,s.style.display="block"},s.hide=()=>{s.isHidden=!0,s.style.display="none"},s.setUnread=a=>{s.unreadCount=a,a>0?s.show():i&&s.hide()},s.setManager=a=>{r=a},s.hide(),s}class xP{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=Ps(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const FP=new xP;const UP=async()=>{if(rm())return console.debug("Reusing existing local MediaStream."),uo();const t=Ll("user"),e=vm();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return ks(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const i=yP(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return ks(r),r}throw n}};async function $P(t){const e=await UP(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function BP(t,e,n){return t.ontrack=i=>{B(`REMOTE TRACK RECEIVED: ${i.track.kind}`);const r=lo()?Sl():null;let s;i.streams&&i.streams[0]&&i.streams[0]instanceof MediaStream?s=i.streams[0]:(console.warn("No stream in track event, using fallback track handling"),r?(r.addTrack(i.track),s=r):s=new MediaStream([i.track])),nm(s),e.srcObject=s,r!==s||B(`Added ${i.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let sh=!1;function HP(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const r=document.createElement("h2");r.className="copy-link-dialog__title",r.textContent=e.title,i.appendChild(r);const s=document.createElement("div");s.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),s.appendChild(o),i.appendChild(s);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function WP(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};VP();const{dialog:i,input:r,copyButton:s,cancelButton:o,feedback:a}=HP(t,n);jP(i);let c=!1;const l=async()=>{await zP(t,r)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),r.readOnly=!1,r.addEventListener("click",()=>{r.select()}),n.onError&&n.onError())};return s.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function VP(){if(sh)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),sh=!0}function jP(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function zP(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function GP(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",r=i.replace(/\/$/,"");let s;try{s=new URL(r).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===s)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,r).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}XR(!0);_().disable();let Ol=[];async function qP(){YP();const t=zg(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:s}=await Je(async()=>{const{setupPWA:o}=await import("./PWA-Duy0epOb.js");return{setupPWA:o}},[]);await s()}LP(),XP(),await Ug;const i=CA(ao);i&&Ol.push(i.dispose);const r=document.querySelector(".top-right-menu");if(r){const s=MP({parent:r,hideWhenAllRead:!0});FP.setToggle(s)}return!0}catch(i){return console.error("Initialization error:",i),!1}}let ja=!1;function wm(){ja=!1}async function Yr(){ja||(ja=!0,await $P(Ce),RP({getLocalStream:uo,getLocalVideo:()=>Ce,getRemoteVideo:()=>te,getPeerConnection:()=>ae.getState().pc,setLocalStream:ks,micBtn:mi,cameraBtn:_i,switchCameraBtn:gi,mutePartnerBtn:Ge,fullscreenPartnerBtn:co}),Ce&&(Ce.addEventListener("enterpictureinpicture",()=>ee&&E(ee)),Ce.addEventListener("leavepictureinpicture",()=>{ee&&!(Cr()&&Tl())&&A(ee)})))}function YP(){E(q),E(ee),E(Se),E(Le)}function bm(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),wm()}function Kr(t=null){return{localStream:uo(),localVideoEl:Ce,remoteVideoEl:te,mutePartnerBtn:Ge,setupRemoteStream:BP,setupWatchSync:LA,targetRoomId:t}}function Jr(t,e=!1){return t.success?(e&&t.roomLink&&WP(t.roomLink,{onCopy:()=>B("Link ready! Share with your partner."),onCancel:()=>B("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function ho(t,{forceInitiator:e=!1}={}){try{await Yr()}catch(s){return console.error("Failed to initialize local media stream:",s),bm(s),!1}const n=Date.now();if(e){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await Yr();const s=await ae.createCall(Kr(t));return Jr(s,!1)}let i=await Q.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await Q.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0}),await Yr();const s=await ae.createCall(Kr(t));return Jr(s,!0)}_().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const r=await ae.answerCall({roomId:t,...Kr()});return Jr(r,!1)}const Te=new Set,Sm=new Map;function oh(t){t&&(no(t),Te.delete(t),Sm.delete(t),_().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Te.size}))}function KP(){B(`[LISTENER] Removing all incoming listeners (${Te.size} rooms)`);const t=Array.from(Te);t.forEach(e=>{no(e)}),Te.clear(),Sm.clear(),_().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function JP(t){const e=Date.now(),n=e+1440*60*1e3,i=he();if(i){const r=Xc(i,t);await Re(r,{roomId:t,savedAt:e,expiresAt:n});return}try{const r=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(r);s[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(s))}catch(r){console.warn("Failed to save recent call to localStorage",r)}}async function jo(t){const e=he();if(e){try{await _n(Xc(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function Zn(t){t&&(Te.has(t)&&(Te.delete(t),no(t)),B(`[LISTENER] Attaching listener for room: ${t} (total: ${Te.size+1})`),Te.add(t),_().logListenerAttachment(t,"member_join",Te.size,{action:"incoming_call_listener_attached"}),Q.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,r=de();if(n&&n!==r){_().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:r});const s=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(s&&(l=Date.now()-s,a=l<o,c="joinedAt"),!a){const j=await cm(n,t),w=await lm(t);a=j||w,c=j?"outgoingState":w?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(_().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:s,CALL_FRESH_MS:o}),!a){_().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await Q.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===r)return;const y=ae.getState();if(!!y.pc&&y.pc.connectionState==="connected"){_().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:y.pc?.connectionState});return}_().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const T=await sP(t,n);$n.playIncoming(),Xd.startCallIndicators(T);let H=!1;try{H=await kl(`Incoming call from ${T}.

Accept?`)}finally{$n.stop(),Xd.stopCallIndicators()}if(H)oh(t),_().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),ho(t).catch(j=>{console.warn("Failed to answer incoming call:",j),_().logFirebaseOperation("join_room_on_accept",!1,j,{roomId:t,joiningUserId:n})});else{_().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await Q.rejectCall(t,de(),"user_rejected")}catch(j){console.warn("Failed to signal rejection via RTDB:",j)}await jo(t).catch(j=>{console.warn("Failed to remove recent call on rejection:",j)})}}}),Q.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:i}=await Je(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>QA);return{dismissActiveConfirmDialog:r}},void 0);typeof i=="function"&&i()}catch{}await jo(t).catch(()=>{})}}),Q.onMemberLeft(t,async e=>{const n=e.key,i=de();if(!(!n||n===i))try{(await Q.checkRoomStatus(t)).hasMembers||(await jo(t),oh(t),B(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(r){console.warn("Failed to evaluate room status on member leave",r)}}))}async function ah(){const t=Date.now();_().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Te.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Je(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>dA);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=he();if(_().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=QI(e);try{const i=await Mt(n),r=i.exists()?i.val():null,s=new Set;if(r)for(const[o,a]of Object.entries(r)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await _n(Xc(e,o)).catch(()=>{});continue}s.add(o)}try{const o=await ir();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>Zn(o)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(s),totalListeners:Te.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),_().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),r={},s=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(r[o]=a,s.add(o));try{const o=await ir();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>Zn(o)),localStorage.setItem("recentCalls",JSON.stringify(r)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(s),totalListeners:Te.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-s.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),_().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function zo(){return W&&Se&&!Se.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let ch=!1;function XP(){if(ch)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!t()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",tn()),console.log("isYTVisible():",Uo()),console.log("isSharedVideoVisible():",zo()),console.log("isWatchModeActive():",Cr()),tn()==="yt"?Uo()?(Ts(),Hi()):(Kg(),Ua()):tn()==="url"&&(zo()?(E(Se),Hi()):(A(Se),Ua()))),e.key==="m"||e.key==="M")){const n=ae.getState();n.messagesUI&&n.messagesUI.toggleMessages()}e.key==="Escape"&&(tn()==="yt"&&Uo()?(br(),Ts()):tn()==="url"&&zo()&&(W.pause(),E(Se)),Hi())}),ch=!0}const Cm=async()=>{try{await Yr();const t=await ae.createCall(Kr());Jr(t,!0)}catch(t){console.error("Failed to start call:",t),bm(t)}};Me.onclick=Cm;Gt.onclick=Cm;En&&(En.onclick=()=>{tn()==="yt"?(br(),Ts()):tn()==="url"&&(W.pause(),E(Se)),Hi()});ze.onclick=async()=>{console.debug("Hanging up..."),await ae.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function QP(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await ho(e);return n||(oo(),am()),n}GP();window.onload=async()=>{if(!await qP()){Me.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await ah().catch(r=>console.warn("Failed to start saved-room listeners",r)),rr(et).catch(r=>{console.warn("Failed to render contacts list:",r)});let e=null;const n=ul(async({isLoggedIn:r,user:s})=>{try{const o=e===null,a=e===!0&&!r,c=e===!1&&r;e=r,await rr(et),a?(B("[AUTH] User logged out - cleaning up incoming listeners"),KP()):c?(B("[AUTH] User logged in - re-attaching incoming listeners"),await ah().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&r&&B("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});Ol.push(()=>{try{typeof n=="function"&&n()}catch{}}),await QP()};window.addEventListener("beforeunload",async t=>{const e=ae.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await ZP()});ae.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),ae.setPartnerId(t),hm(t,t),Cl(),Il().catch(n=>console.warn("Failed to clear calling state:",n)),JP(e).catch(n=>console.warn("Failed to save recent call:",n))});ae.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});ae.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{xt(),im(),am(),oo();const i=ae.getState();i.messagesUI&&typeof i.messagesUI.cleanup=="function"&&(i.messagesUI.cleanup(),i.messagesUI=null),e&&t&&setTimeout(()=>{oP(e,t,et).catch(r=>{console.warn("Failed to save contact after cleanup:",r)})},500)});async function ZP(){await ae.hangUp({emitCancel:!0,reason:"page_unload"}),AP(),KI(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=ae.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),W.src="",sm(),Ce&&Ce.srcObject&&(Ce.srcObject=null),te&&te.srcObject&&(te.srcObject=null),Hi(),oo(),NA("none"),El(),Yg(!1),OP(),Ol.forEach(e=>e())}const eN=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:ho,listenForIncomingOnRoom:Zn,resetLocalStreamInitFlag:wm},Symbol.toStringTag,{value:"Module"}));export{Je as _,dl as c,B as d,E as h,tN as i,FP as n,A as s};
