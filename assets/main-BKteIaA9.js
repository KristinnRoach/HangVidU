(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const jw="modulepreload",Vw=function(t){return"/HangVidU/"+t},Dd={},he=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");s=c(n.map(l=>{if(l=Vw(l),l in Dd)return;Dd[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":jw,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},O=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,W=globalThis,zn="10.36.0";function Vo(){return Wo(W),W}function Wo(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||zn,e[zn]=e[zn]||{}}function Ji(t,e,n=W){const i=n.__SENTRY__=n.__SENTRY__||{},s=i[zn]=i[zn]||{};return s[t]||(s[t]=e())}const Ww=["debug","info","warn","error","log","assert","trace"],qw="Sentry Logger ",ro={};function Xi(t){if(!("console"in W))return t();const e=W.console,n={},i=Object.keys(ro);i.forEach(s=>{const r=ro[s];n[s]=e[s],e[s]=r});try{return t()}finally{i.forEach(s=>{e[s]=n[s]})}}function zw(){Ol().enabled=!0}function Gw(){Ol().enabled=!1}function Rp(){return Ol().enabled}function Kw(...t){Ll("log",...t)}function Yw(...t){Ll("warn",...t)}function Jw(...t){Ll("error",...t)}function Ll(t,...e){O&&Rp()&&Xi(()=>{W.console[t](`${qw}[${t}]:`,...e)})}function Ol(){return O?Ji("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const I={enable:zw,disable:Gw,isEnabled:Rp,log:Kw,warn:Yw,error:Jw},Ap=50,Qn="?",Md=/\(error: (.*)\)/,xd=/captureMessage|captureException/;function Np(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,s=0)=>{const r=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Md.test(c)?c.replace(Md,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=Ap+s)break}}return Qw(r.slice(s))}}function Xw(t){return Array.isArray(t)?Np(...t):t}function Qw(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Or(e).function||"")&&e.pop(),e.reverse(),xd.test(Or(e).function||"")&&(e.pop(),xd.test(Or(e).function||"")&&e.pop()),e.slice(0,Ap).map(n=>({...n,filename:n.filename||Or(e).filename,function:n.function||Qn}))}function Or(t){return t[t.length-1]||{}}const Ha="<anonymous>";function Cn(t){try{return!t||typeof t!="function"?Ha:t.name||Ha}catch{return Ha}}function Fd(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function Pp(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Wr={},Ud={};function pi(t,e){Wr[t]=Wr[t]||[],Wr[t].push(e)}function gi(t,e){if(!Ud[t]){Ud[t]=!0;try{e()}catch(n){O&&I.error(`Error while instrumenting ${t}`,n)}}}function ft(t,e){const n=t&&Wr[t];if(n)for(const i of n)try{i(e)}catch(s){O&&I.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Cn(i)}
Error:`,s)}}let ja=null;function Zw(t){const e="error";pi(e,t),gi(e,ev)}function ev(){ja=W.onerror,W.onerror=function(t,e,n,i,s){return ft("error",{column:i,error:s,line:n,msg:t,url:e}),ja?ja.apply(this,arguments):!1},W.onerror.__SENTRY_INSTRUMENTED__=!0}let Va=null;function tv(t){const e="unhandledrejection";pi(e,t),gi(e,nv)}function nv(){Va=W.onunhandledrejection,W.onunhandledrejection=function(t){return ft("unhandledrejection",t),Va?Va.apply(this,arguments):!0},W.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Lp=Object.prototype.toString;function qo(t){switch(Lp.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Tn(t,Error)}}function Qi(t,e){return Lp.call(t)===`[object ${e}]`}function Op(t){return Qi(t,"ErrorEvent")}function $d(t){return Qi(t,"DOMError")}function iv(t){return Qi(t,"DOMException")}function jt(t){return Qi(t,"String")}function Dl(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function zo(t){return t===null||Dl(t)||typeof t!="object"&&typeof t!="function"}function Hs(t){return Qi(t,"Object")}function Go(t){return typeof Event<"u"&&Tn(t,Event)}function sv(t){return typeof Element<"u"&&Tn(t,Element)}function rv(t){return Qi(t,"RegExp")}function dr(t){return!!(t?.then&&typeof t.then=="function")}function ov(t){return Hs(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Tn(t,e){try{return t instanceof e}catch{return!1}}function Dp(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function Mp(t){return typeof Request<"u"&&Tn(t,Request)}const Ml=W,av=80;function xp(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,s=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||av;for(;n&&r++<i&&(l=cv(n,u),!(l==="html"||r>1&&o+s.length*c+l.length>=d));)s.push(l),o+=l.length,n=n.parentNode;return s.reverse().join(a)}catch{return"<unknown>"}}function cv(t,e){const n=t,i=[];if(!n?.tagName)return"";if(Ml.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const s=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(s?.length)s.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&jt(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function xl(){try{return Ml.document.location.href}catch{return""}}function lv(t){if(!Ml.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function ze(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const s=n(i);typeof s=="function"&&Fp(s,i);try{t[e]=s}catch{O&&I.log(`Failed to replace method "${e}" in object`,t)}}function Sn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{O&&I.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function Fp(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,Sn(t,"__sentry_original__",e)}catch{}}function Fl(t){return t.__sentry_original__}function Up(t){if(qo(t))return{message:t.message,name:t.name,stack:t.stack,...Hd(t)};if(Go(t)){const e={type:t.type,target:Bd(t.target),currentTarget:Bd(t.currentTarget),...Hd(t)};return typeof CustomEvent<"u"&&Tn(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Bd(t){try{return sv(t)?xp(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Hd(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function uv(t){const e=Object.keys(Up(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}let yi;function Ko(t){if(yi!==void 0)return yi?yi(t):t();const e=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=W;return e in n&&typeof n[e]=="function"?(yi=n[e],yi(t)):(yi=null,t())}function oo(){return Ko(()=>Math.random())}function Yo(){return Ko(()=>Date.now())}function kc(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function jd(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const s=t[i];try{Dp(s)?n.push(Pp(s)):n.push(String(s))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function qr(t,e,n=!1){return jt(t)?rv(e)?e.test(t):jt(e)?n?t===e:t.includes(e):!1:!1}function Jo(t,e=[],n=!1){return e.some(i=>qr(t,i,n))}function dv(){const t=W;return t.crypto||t.msCrypto}let Wa;function hv(){return oo()*16}function et(t=dv()){try{if(t?.randomUUID)return Ko(()=>t.randomUUID()).replace(/-/g,"")}catch{}return Wa||(Wa="10000000100040008000"+1e11),Wa.replace(/[018]/g,e=>(e^(hv()&15)>>e/4).toString(16))}function $p(t){return t.exception?.values?.[0]}function jn(t){const{message:e,event_id:n}=t;if(e)return e;const i=$p(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function Rc(t,e,n){const i=t.exception=t.exception||{},s=i.values=i.values||[],r=s[0]=s[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function Fi(t,e){const n=$p(t);if(!n)return;const i={type:"generic",handled:!0},s=n.mechanism;if(n.mechanism={...i,...s,...e},e&&"data"in e){const r={...s?.data,...e.data};n.mechanism.data=r}}function Vd(t){if(fv(t))return!0;try{Sn(t,"__sentry_captured__",!0)}catch{}return!1}function fv(t){try{return t.__sentry_captured__}catch{}}const Bp=1e3;function hr(){return Yo()/Bp}function pv(){const{performance:t}=W;if(!t?.now||!t.timeOrigin)return hr;const e=t.timeOrigin;return()=>(e+Ko(()=>t.now()))/Bp}let Wd;function Vt(){return(Wd??(Wd=pv()))()}function gv(t){const e=Vt(),n={sid:et(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>_v(n)};return t&&Ui(n,t),n}function Ui(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Vt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:et()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function mv(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Ui(t,n)}function _v(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function fr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=fr(i[s],e[s],n-1));return i}function qd(){return et()}function Hp(){return et().substring(16)}const Ac="_sentrySpan";function zd(t,e){e?Sn(t,Ac,e):delete t[Ac]}function Gd(t){return t[Ac]}const yv=100;class zt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:qd(),sampleRand:oo()}}clone(){const e=new zt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,zd(e,Gd(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Ui(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,n){return this.setAttributes({[e]:n})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof zt?n.getScopeData():Hs(n)?e:void 0,{tags:s,attributes:r,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:d}=i||{};return this._tags={...this._tags,...s},this._attributes={...this._attributes,...r},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),d&&(this._propagationContext=d),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,zd(this,void 0),this._attachments=[],this.setPropagationContext({traceId:qd(),sampleRand:oo()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:yv;if(i<=0)return this;const s={timestamp:hr(),...e,message:e.message?kc(e.message,2048):e.message};return this._breadcrumbs.push(s),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Gd(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=fr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||et();if(!this._client)return O&&I.warn("No client configured on scope - will not capture exception!"),i;const s=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:s,...n,event_id:i},this),i}captureMessage(e,n,i){const s=i?.event_id||et();if(!this._client)return O&&I.warn("No client configured on scope - will not capture message!"),s;const r=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...i,event_id:s},this),s}captureEvent(e,n){const i=n?.event_id||et();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(O&&I.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function wv(){return Ji("defaultCurrentScope",()=>new zt)}function vv(){return Ji("defaultIsolationScope",()=>new zt)}class bv{constructor(e,n){let i;e?i=e:i=new zt;let s;n?s=n:s=new zt,this._stack=[{scope:i}],this._isolationScope=s}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(s){throw this._popScope(),s}return dr(i)?i.then(s=>(this._popScope(),s),s=>{throw this._popScope(),s}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function $i(){const t=Vo(),e=Wo(t);return e.stack=e.stack||new bv(wv(),vv())}function Ev(t){return $i().withScope(t)}function Cv(t,e){const n=$i();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Kd(t){return $i().withScope(()=>t($i().getIsolationScope()))}function Tv(){return{withIsolationScope:Kd,withScope:Ev,withSetScope:Cv,withSetIsolationScope:(t,e)=>Kd(e),getCurrentScope:()=>$i().getScope(),getIsolationScope:()=>$i().getIsolationScope()}}function Ul(t){const e=Wo(t);return e.acs?e.acs:Tv()}function Ln(){const t=Vo();return Ul(t).getCurrentScope()}function pr(){const t=Vo();return Ul(t).getIsolationScope()}function Sv(){return Ji("globalScope",()=>new zt)}function Iv(...t){const e=Vo(),n=Ul(e);if(t.length===2){const[i,s]=t;return i?n.withSetScope(i,s):n.withScope(s)}return n.withScope(t[0])}function Le(){return Ln().getClient()}function kv(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:s}=e,r={trace_id:n,span_id:s||Hp()};return i&&(r.parent_span_id=i),r}const Rv="sentry.source",Av="sentry.sample_rate",Nv="sentry.previous_trace_sample_rate",Pv="sentry.op",Lv="sentry.origin",jp="sentry.profile_id",Vp="sentry.exclusive_time",Ov=0,Dv=1,Mv="_sentryScope",xv="_sentryIsolationScope";function Fv(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Wp(t){const e=t;return{scope:e[Mv],isolationScope:Fv(e[xv])}}const Uv="sentry-",$v=/^sentry-/;function Bv(t){const e=Hv(t);if(!e)return;const n=Object.entries(e).reduce((i,[s,r])=>{if(s.match($v)){const o=s.slice(Uv.length);i[o]=r}return i},{});if(Object.keys(n).length>0)return n}function Hv(t){if(!(!t||!jt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=Yd(n);return Object.entries(i).forEach(([s,r])=>{e[s]=r}),e},{}):Yd(t)}function Yd(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),s=e.slice(n+1);return[i,s].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const jv=/^o(\d+)\./,Vv=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function Wv(t){return t==="http"||t==="https"}function gr(t,e=!1){const{host:n,path:i,pass:s,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&s?`:${s}`:""}@${n}${r?`:${r}`:""}/${i&&`${i}/`}${o}`}function qv(t){const e=Vv.exec(t);if(!e){Xi(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,s="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return qp({host:r,pass:s,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function qp(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function zv(t){if(!O)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(I.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?Wv(i)?e&&isNaN(parseInt(e,10))?(I.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(I.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(I.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function Gv(t){return t.match(jv)?.[1]}function Kv(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=Gv(n)),i}function Yv(t){const e=typeof t=="string"?qv(t):qp(t);if(!(!e||!zv(e)))return e}function Jv(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const zp=1;let Jd=!1;function Xv(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),s=i?e:$l(t).parent_span_id,r=Wp(t).scope,o=i?r?.getPropagationContext().propagationSpanId||Hp():e;return{parent_span_id:s,span_id:o,trace_id:n}}function Qv(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...s},attributes:r})=>({span_id:e,trace_id:n,sampled:i===zp,attributes:r,...s}))}function Xd(t){return typeof t=="number"?Qd(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Qd(t.getTime()):Vt()}function Qd(t){return t>9999999999?t/1e3:t}function $l(t){if(eb(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(Zv(t)){const{attributes:i,startTime:s,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:r,parent_span_id:l,start_timestamp:Xd(s),timestamp:Xd(o)||void 0,status:nb(a),op:i[Pv],origin:i[Lv],links:Qv(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function Zv(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function eb(t){return typeof t.getSpanJSON=="function"}function tb(t){const{traceFlags:e}=t.spanContext();return e===zp}function nb(t){if(!(!t||t.code===Ov))return t.code===Dv?"ok":t.message||"internal_error"}const ib="_sentryRootSpan";function Gp(t){return t[ib]||t}function Zd(){Jd||(Xi(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Jd=!0)}function sb(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Le()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function eh(t){I.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function th(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(ob(n)){if(qr(t.description,n))return O&&eh(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?qr(t.description,n.name):!0,s=n.op?t.op&&qr(t.op,n.op):!0;if(i&&s)return O&&eh(t),!0}return!1}function rb(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const s of t)s.parent_span_id===i&&(s.parent_span_id=n)}function ob(t){return typeof t=="string"||t instanceof RegExp}const Bl="production",ab="_frozenDsc";function Kp(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},s={environment:n.environment||Bl,release:n.release,public_key:i,trace_id:t,org_id:Kv(e)};return e.emit("createDsc",s),s}function cb(t,e){const n=e.getPropagationContext();return n.dsc||Kp(n.traceId,t)}function lb(t){const e=Le();if(!e)return{};const n=Gp(t),i=$l(n),s=i.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??s[Av]??s[Nv];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[ab];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&Bv(l);if(u)return a(u);const d=Kp(t.spanContext().traceId,e),h=s[Rv],f=i.description;return h!=="url"&&f&&(d.transaction=f),sb()&&(d.sampled=String(tb(n)),d.sample_rand=r?.get("sentry.sample_rand")??Wp(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Dt(t,e=100,n=1/0){try{return Nc("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function Yp(t,e=3,n=100*1024){const i=Dt(t,e);return fb(i)>n?Yp(t,e-1,n):i}function Nc(t,e,n=1/0,i=1/0,s=pb()){const[r,o]=s;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=ub(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Nc("",f,c-1,i,s)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Up(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Nc(f,p,c-1,i,s),d++}return o(e),u}function ub(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Dp(e))return Pp(e);if(ov(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Cn(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=db(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function db(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function hb(t){return~-encodeURI(t).split(/%..|./).length}function fb(t){return hb(JSON.stringify(t))}function pb(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function Zi(t,e=[]){return[t,e]}function gb(t,e){const[n,i]=t;return[n,[...i,e]]}function Pc(t,e){const n=t[1];for(const i of n){const s=i[0].type;if(e(i,s))return!0}return!1}function mb(t,e){return Pc(t,(n,i)=>e.includes(i))}function Lc(t){const e=Wo(W);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function _b(t){const[e,n]=t;let i=JSON.stringify(e);function s(r){typeof i=="string"?i=typeof r=="string"?i+r:[Lc(i),r]:i.push(typeof r=="string"?Lc(r):r)}for(const r of n){const[o,a]=r;if(s(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)s(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Dt(a))}s(c)}}return typeof i=="string"?i:yb(i)}function yb(t){const e=t.reduce((s,r)=>s+r.length,0),n=new Uint8Array(e);let i=0;for(const s of t)n.set(s,i),i+=s.length;return n}function wb(t){const e=typeof t.data=="string"?Lc(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const vb={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function nh(t){return vb[t]}function Jp(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function bb(t,e,n,i){const s=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:gr(i)},...s&&{trace:s}}}function Eb(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Cb(t,e,n,i){const s=Jp(n),r={sent_at:new Date().toISOString(),...s&&{sdk:s},...!!i&&e&&{dsn:gr(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Zi(r,[o])}function Tb(t,e,n,i){const s=Jp(n),r=t.type&&t.type!=="replay_event"?t.type:"event";Eb(t,n?.sdk);const o=bb(t,s,i,e);return delete t.sdkProcessingMetadata,Zi(o,[[{type:r},t]])}const qa=0,ih=1,sh=2;function Xo(t){return new js(e=>{e(t)})}function Hl(t){return new js((e,n)=>{n(t)})}class js{constructor(e){this._state=qa,this._handlers=[],this._runExecutor(e)}then(e,n){return new js((i,s)=>{this._handlers.push([!1,r=>{if(!e)i(r);else try{i(e(r))}catch(o){s(o)}},r=>{if(!n)s(r);else try{i(n(r))}catch(o){s(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new js((n,i)=>{let s,r;return this.then(o=>{r=!1,s=o,e&&e()},o=>{r=!0,s=o,e&&e()}).then(()=>{if(r){i(s);return}n(s)})})}_executeHandlers(){if(this._state===qa)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===ih&&n[1](this._value),this._state===sh&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===qa){if(dr(o)){o.then(i,s);return}this._state=r,this._value=o,this._executeHandlers()}},i=r=>{n(ih,r)},s=r=>{n(sh,r)};try{e(i,s)}catch(r){s(r)}}}function Sb(t,e,n,i=0){try{const s=Oc(e,n,t,i);return dr(s)?s:Xo(s)}catch(s){return Hl(s)}}function Oc(t,e,n,i){const s=n[i];if(!t||!s)return t;const r=s({...t},e);return O&&r===null&&I.log(`Event processor "${s.id||"?"}" dropped event`),dr(r)?r.then(o=>Oc(o,e,n,i+1)):Oc(r,e,n,i+1)}let Un,rh,oh,sn;function Ib(t){const e=W._sentryDebugIds,n=W._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],s=n?Object.keys(n):[];if(sn&&i.length===rh&&s.length===oh)return sn;rh=i.length,oh=s.length,sn={},Un||(Un={});const r=(o,a)=>{for(const c of o){const l=a[c],u=Un?.[c];if(u&&sn&&l)sn[u[0]]=l,Un&&(Un[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&sn&&Un){sn[p]=l,Un[c]=[p,l];break}}}}};return e&&r(i,e),n&&r(s,n),sn}function kb(t,e){const{fingerprint:n,span:i,breadcrumbs:s,sdkProcessingMetadata:r}=e;Ab(t,e),i&&Lb(t,i),Ob(t,n),Nb(t,s),Pb(t,r)}function ah(t,e){const{extra:n,tags:i,attributes:s,user:r,contexts:o,level:a,sdkProcessingMetadata:c,breadcrumbs:l,fingerprint:u,eventProcessors:d,attachments:h,propagationContext:f,transactionName:p,span:g}=e;ps(t,"extra",n),ps(t,"tags",i),ps(t,"attributes",s),ps(t,"user",r),ps(t,"contexts",o),t.sdkProcessingMetadata=fr(t.sdkProcessingMetadata,c,2),a&&(t.level=a),p&&(t.transactionName=p),g&&(t.span=g),l.length&&(t.breadcrumbs=[...t.breadcrumbs,...l]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),d.length&&(t.eventProcessors=[...t.eventProcessors,...d]),h.length&&(t.attachments=[...t.attachments,...h]),t.propagationContext={...t.propagationContext,...f}}function ps(t,e,n){t[e]=fr(t[e],n,1)}function Rb(t,e){const n=Sv().getScopeData();return t&&ah(n,t.getScopeData()),e&&ah(n,e.getScopeData()),n}function Ab(t,e){const{extra:n,tags:i,user:s,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(s).length&&(t.user={...s,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Nb(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Pb(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Lb(t,e){t.contexts={trace:Xv(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:lb(e),...t.sdkProcessingMetadata};const n=Gp(e),i=$l(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function Ob(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}function Db(t,e,n,i,s,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||et(),timestamp:e.timestamp||hr()},l=n.integrations||t.integrations.map(m=>m.name);Mb(c,t),Ub(c,l),s&&s.emit("applyFrameMetadata",e),e.type===void 0&&xb(c,t.stackParser);const u=Bb(i,n.captureContext);n.mechanism&&Fi(c,n.mechanism);const d=s?s.getEventProcessors():[],h=Rb(r,u),f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),kb(c,h);const p=[...d,...h.eventProcessors];return Sb(p,c,n).then(m=>(m&&Fb(m),typeof o=="number"&&o>0?$b(m,o,a):m))}function Mb(t,e){const{environment:n,release:i,dist:s,maxValueLength:r}=e;t.environment=t.environment||n||Bl,!t.release&&i&&(t.release=i),!t.dist&&s&&(t.dist=s);const o=t.request;o?.url&&r&&(o.url=kc(o.url,r)),r&&t.exception?.values?.forEach(a=>{a.value&&(a.value=kc(a.value,r))})}function xb(t,e){const n=Ib(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.filename&&(s.debug_id=n[s.filename])})})}function Fb(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.debug_id&&(s.abs_path?e[s.abs_path]=s.debug_id:s.filename&&(e[s.filename]=s.debug_id),delete s.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,s])=>{n.push({type:"sourcemap",code_file:i,debug_id:s})})}function Ub(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function $b(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(s=>({...s,...s.data&&{data:Dt(s.data,e,n)}}))},...t.user&&{user:Dt(t.user,e,n)},...t.contexts&&{contexts:Dt(t.contexts,e,n)},...t.extra&&{extra:Dt(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=Dt(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(s=>({...s,...s.data&&{data:Dt(s.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=Dt(t.contexts.flags,3,n)),i}function Bb(t,e){if(!e)return t;const n=t?t.clone():new zt;return n.update(e),n}function Hb(t,e){return Ln().captureException(t,void 0)}function Xp(t,e){return Ln().captureEvent(t,e)}function ch(t){const e=pr(),n=Ln(),{userAgent:i}=W.navigator||{},s=gv({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),r=e.getSession();return r?.status==="ok"&&Ui(r,{status:"exited"}),Qp(),e.setSession(s),s}function Qp(){const t=pr(),n=Ln().getSession()||t.getSession();n&&mv(n),Zp(),t.setSession()}function Zp(){const t=pr(),e=Le(),n=t.getSession();n&&e&&e.captureSession(n)}function lh(t=!1){if(t){Qp();return}Zp()}const jb="7";function Vb(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function Wb(t){return`${Vb(t)}${t.projectId}/envelope/`}function qb(t,e){const n={sentry_version:jb};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function zb(t,e,n){return e||`${Wb(t)}?${qb(t,n)}`}const uh=[];function Gb(t){const e={};return t.forEach(n=>{const{name:i}=n,s=e[i];s&&!s.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function Kb(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(s=>{s.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const s=n(e);i=Array.isArray(s)?s:[s]}else i=e;return Gb(i)}function Yb(t,e){const n={};return e.forEach(i=>{i&&eg(t,i,n)}),n}function dh(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function eg(t,e,n){if(n[e.name]){O&&I.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!uh.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),uh.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(s,r)=>i(s,r,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),s=Object.assign((r,o)=>i(r,o,t),{id:e.name});t.addEventProcessor(s)}O&&I.log(`Integration installed: ${e.name}`)}function Jb(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function Xb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=gr(i)),Zi(s,[Jb(t)])}function tg(t,e){const n=e??Qb(t)??[];if(n.length===0)return;const i=t.getOptions(),s=Xb(n,i._metadata,i.tunnel,t.getDsn());ng().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(s)}function Qb(t){return ng().get(t)}function ng(){return Ji("clientToLogBufferMap",()=>new WeakMap)}function Zb(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function eE(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=gr(i)),Zi(s,[Zb(t)])}function ig(t,e){const n=e??tE(t)??[];if(n.length===0)return;const i=t.getOptions(),s=eE(n,i._metadata,i.tunnel,t.getDsn());sg().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(s)}function tE(t){return sg().get(t)}function sg(){return Ji("clientToMetricBufferMap",()=>new WeakMap)}const jl=Symbol.for("SentryBufferFullError");function Vl(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function s(o){if(!n())return Hl(jl);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function r(o){if(!e.size)return Xo(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:s,drain:r}}const nE=60*1e3;function iE(t,e=Yo()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?nE:i-e}function sE(t,e){return t[e]||t.all||0}function rE(t,e,n=Yo()){return sE(t,e)>n}function oE(t,{statusCode:e,headers:n},i=Yo()){const s={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)s.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(s[f]=i+h):s[f]=i+h}else o?s.all=i+iE(o,i):e===429&&(s.all=i+60*1e3);return s}const rg=64;function aE(t,e,n=Vl(t.bufferSize||rg)){let i={};const s=o=>n.drain(o);function r(o){const a=[];if(Pc(o,(d,h)=>{const f=nh(h);rE(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Zi(o[0],a),l=d=>{if(mb(c,["client_report"])){O&&I.warn(`Dropping client report. Will not send outcomes (reason: ${d}).`);return}Pc(c,(h,f)=>{t.recordDroppedEvent(d,nh(f))})},u=()=>e({body:_b(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&O&&I.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=oE(i,d),d),d=>{throw l("network_error"),O&&I.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===jl)return O&&I.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:s}}function cE(t,e,n){const i=[{type:"client_report"},{timestamp:hr(),discarded_events:t}];return Zi(e?{dsn:e}:{},[i])}function og(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function lE(t){const{trace_id:e,parent_span_id:n,span_id:i,status:s,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:s,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[jp],exclusive_time:o?.[Vp],measurements:t.measurements,is_segment:!0}}function uE(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[jp]:t.profile_id},...t.exclusive_time&&{[Vp]:t.exclusive_time}}}},measurements:t.measurements}}const hh="Not capturing exception because it's already been captured.",fh="Discarded session because of missing or non-string release",ag=Symbol.for("SentryInternalError"),cg=Symbol.for("SentryDoNotSendEventError"),dE=5e3;function zr(t){return{message:t,[ag]:!0}}function za(t){return{message:t,[cg]:!0}}function ph(t){return!!t&&typeof t=="object"&&ag in t}function gh(t){return!!t&&typeof t=="object"&&cg in t}function mh(t,e,n,i,s){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=i(c),r>=8e5?s(t):a||(a=!0,o=setTimeout(()=>{s(t)},dE))}),t.on("flush",()=>{s(t)})}class hE{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Vl(e.transportOptions?.bufferSize??rg),e.dsn?this._dsn=Yv(e.dsn):O&&I.warn("No DSN provided, client will not send events."),this._dsn){const i=zb(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&mh(this,"afterCaptureLog","flushLogs",mE,tg),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&mh(this,"afterCaptureMetric","flushMetrics",gE,ig)}captureException(e,n,i){const s=et();if(Vd(e))return O&&I.log(hh),s;const r={event_id:s,...n};return this._process(()=>this.eventFromException(e,r).then(o=>this._captureEvent(o,r,i)).then(o=>o),"error"),r.event_id}captureMessage(e,n,i,s){const r={event_id:et(),...i},o=Dl(e)?e:String(e),a=zo(e),c=a?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(()=>c.then(l=>this._captureEvent(l,r,s)),a?"unknown":"error"),r.event_id}captureEvent(e,n,i){const s=et();if(n?.originalException&&Vd(n.originalException))return O&&I.log(hh),s;const r={event_id:s,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope,l=_h(e.type);return this._process(()=>this._captureEvent(e,r,a||i,c),l),r.event_id}captureSession(e){this.sendSession(e),Ui(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),s=await n.flush(e);return i&&s}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];eg(this,e,this._integrations),n||dh(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=Tb(e,this._dsn,this._options._metadata,this._options.tunnel);for(const s of n.attachments||[])i=gb(i,wb(s));this.sendEnvelope(i).then(s=>this.emit("afterSendEvent",e,s))}sendSession(e){const{release:n,environment:i=Bl}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){O&&I.warn(fh);return}r.release=r.release||n,r.environment=r.environment||i,e.attrs=r}else{if(!e.release&&!n){O&&I.warn(fh);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const s=Cb(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(s)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const s=`${e}:${n}`;O&&I.log(`Recording outcome: "${s}"${i>1?` (${i} times)`:""}`),this._outcomes[s]=(this._outcomes[s]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,s=(...r)=>n(...r);return i.add(s),()=>{i.delete(s)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(s=>s(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return O&&I.error("Error while sending envelope:",n),{}}return O&&I.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=Yb(this,e),dh(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",s=!1;const r=n.exception?.values;if(r){s=!0,i=!1;for(const c of r)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(Ui(e,{...i&&{status:"crashed"},errors:e.errors||Number(s||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,s){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||s.setLastEventId(e.event_id||n.event_id),Db(r,e,n,i,this,s).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:kv(i),...a.contexts};const c=cb(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=Ln(),s=pr()){return O&&Dc(e)&&I.log(`Captured error event \`${og(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,s).then(r=>r.event_id,r=>{O&&(gh(r)?I.log(r.message):ph(r)?I.warn(r.message):I.warn(r))})}_processEvent(e,n,i,s){const r=this.getOptions(),{sampleRate:o}=r,a=lg(e),c=Dc(e),u=`before send for type \`${e.type||"error"}\``,d=typeof o>"u"?void 0:Jv(o);if(c&&typeof d=="number"&&oo()>d)return this.recordDroppedEvent("sample_rate","error"),Hl(za(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=_h(e.type);return this._prepareEvent(e,n,i,s).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),za("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const g=pE(this,r,f,n);return fE(g,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw za(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||s.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,L=m-T;L>0&&this.recordDroppedEvent("before_send","span",L)}const g=f.transaction_info;if(a&&g&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...g,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw gh(f)||ph(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),zr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e,n){this._numProcessing++,this._promiseBuffer.add(e).then(i=>(this._numProcessing--,i),i=>(this._numProcessing--,i===jl&&this.recordDroppedEvent("queue_overflow",n),i))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[s,r]=n.split(":");return{reason:s,category:r,quantity:i}})}_flushOutcomes(){O&&I.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){O&&I.log("No outcomes to send");return}if(!this._dsn){O&&I.log("No dsn provided, will not send outcomes");return}O&&I.log("Sending outcomes:",e);const n=cE(e,this._options.tunnel&&gr(this._dsn));this.sendEnvelope(n)}}function _h(t){return t==="replay_event"?"replay":t||"error"}function fE(t,e){const n=`${e} must return \`null\` or a valid event.`;if(dr(t))return t.then(i=>{if(!Hs(i)&&i!==null)throw zr(n);return i},i=>{throw zr(`${e} rejected with ${i}`)});if(!Hs(t)&&t!==null)throw zr(n);return t}function pE(t,e,n,i){const{beforeSend:s,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Dc(c)&&s)return s(c,i);if(lg(c)){if(o||a){const l=lE(c);if(a?.length&&th(l,a))return null;if(o){const u=o(l);u?c=fr(n,uE(u)):Zd()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&th(f,a)){rb(d,f);continue}if(o){const p=o(f);p?u.push(p):(Zd(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,i)}}return c}function Dc(t){return t.type===void 0}function lg(t){return t.type==="transaction"}function gE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+ug(t.attributes)}function mE(t){let e=0;return t.message&&(e+=t.message.length*2),e+ug(t.attributes)}function ug(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*yh(n[0]):zo(n)?e+=yh(n):e+=100}),e}function yh(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function _E(t){return qo(t)&&"__sentry_fetch_url_host__"in t&&typeof t.__sentry_fetch_url_host__=="string"}function wh(t){return _E(t)?`${t.message} (${t.__sentry_fetch_url_host__})`:t.message}function yE(t,e){e.debug===!0&&(O?I.enable():Xi(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Ln().update(e.initialScope);const i=new t(e);return wE(i),i.init(),i}function wE(t){Ln().setClient(t)}function Ga(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function vE(t,e=!0){if(t.startsWith("data:")){const n=t.match(/^data:([^;,]+)/),i=n?n[1]:"text/plain",s=t.includes(";base64,"),r=t.indexOf(",");let o="";if(e&&r!==-1){const a=t.slice(r+1);o=a.length>10?`${a.slice(0,10)}... [truncated]`:a}return`data:${i}${s?",base64":""}${o?`,${o}`:""}`}return t}function bE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function EE(t,e,n=[e],i="npm"){const s=t._metadata||{};s.sdk||(s.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${i}:@sentry/${r}`,version:zn})),version:zn}),t._metadata=s}const CE=100;function Zn(t,e){const n=Le(),i=pr();if(!n)return;const{beforeBreadcrumb:s=null,maxBreadcrumbs:r=CE}=n.getOptions();if(r<=0)return;const a={timestamp:hr(),...t},c=s?Xi(()=>s(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,r))}let vh;const TE="FunctionToString",bh=new WeakMap,SE=(()=>({name:TE,setupOnce(){vh=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Fl(this),n=bh.has(Le())&&e!==void 0?e:this;return vh.apply(n,t)}}catch{}},setup(t){bh.set(t,!0)}})),IE=SE,kE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],RE="EventFilters",AE=(t={})=>{let e;return{name:RE,setup(n){const i=n.getOptions();e=Eh(t,i)},processEvent(n,i,s){if(!e){const r=s.getOptions();e=Eh(t,r)}return PE(n,e)?null:n}}},NE=((t={})=>({...AE(t),name:"InboundFilters"}));function Eh(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:kE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function PE(t,e){if(t.type){if(t.type==="transaction"&&OE(t,e.ignoreTransactions))return O&&I.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${jn(t)}`),!0}else{if(LE(t,e.ignoreErrors))return O&&I.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${jn(t)}`),!0;if(FE(t))return O&&I.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${jn(t)}`),!0;if(DE(t,e.denyUrls))return O&&I.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${jn(t)}.
Url: ${ao(t)}`),!0;if(!ME(t,e.allowUrls))return O&&I.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${jn(t)}.
Url: ${ao(t)}`),!0}return!1}function LE(t,e){return e?.length?og(t).some(n=>Jo(n,e)):!1}function OE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Jo(n,e):!1}function DE(t,e){if(!e?.length)return!1;const n=ao(t);return n?Jo(n,e):!1}function ME(t,e){if(!e?.length)return!0;const n=ao(t);return n?Jo(n,e):!0}function xE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function ao(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?xE(n):null}catch{return O&&I.error(`Cannot extract url for event ${jn(t)}`),null}}function FE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function UE(t,e,n,i,s,r){if(!s.exception?.values||!r||!Tn(r.originalException,Error))return;const o=s.exception.values.length>0?s.exception.values[s.exception.values.length-1]:void 0;o&&(s.exception.values=Mc(t,e,i,r.originalException,n,s.exception.values,o,0))}function Mc(t,e,n,i,s,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(Tn(i[s],Error)){Ch(o,a);const l=t(e,i[s]),u=c.length;Th(l,s,u,a),c=Mc(t,e,n,i[s],s,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(Tn(l,Error)){Ch(o,a);const d=t(e,l),h=c.length;Th(d,`errors[${u}]`,h,a),c=Mc(t,e,n,l,s,[d,...c],d,h)}}),c}function Ch(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Th(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function $E(t){const e="console";pi(e,t),gi(e,BE)}function BE(){"console"in W&&Ww.forEach(function(t){t in W.console&&ze(W.console,t,function(e){return ro[t]=e,function(...n){ft("console",{args:n,level:t}),ro[t]?.apply(W.console,n)}})})}function HE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const jE="Dedupe",VE=(()=>{let t;return{name:jE,processEvent(e){if(e.type)return e;try{if(qE(e,t))return O&&I.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),WE=VE;function qE(t,e){return e?!!(zE(t,e)||GE(t,e)):!1}function zE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!hg(t,e)||!dg(t,e))}function GE(t,e){const n=Sh(e),i=Sh(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!hg(t,e)||!dg(t,e))}function dg(t,e){let n=Fd(t),i=Fd(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let s=0;s<i.length;s++){const r=i[s],o=n[s];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function hg(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function Sh(t){return t.exception?.values?.[0]}function fg(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Vs=W;function KE(){return"history"in Vs&&!!Vs.history}function YE(){if(!("fetch"in Vs))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function xc(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function JE(){if(typeof EdgeRuntime=="string")return!0;if(!YE())return!1;if(xc(Vs.fetch))return!0;let t=!1;const e=Vs.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=xc(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){O&&I.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function XE(t,e){const n="fetch";pi(n,t),gi(n,()=>QE(void 0,e))}function QE(t,e=!1){e&&!JE()||ze(W,"fetch",function(n){return function(...i){const s=new Error,{method:r,url:o}=ZE(i),a={args:i,fetchData:{method:r,url:o},startTimestamp:Vt()*1e3,virtualError:s,headers:eC(i)};return ft("fetch",{...a}),n.apply(W,i).then(async c=>(ft("fetch",{...a,endTimestamp:Vt()*1e3,response:c}),c),c=>{ft("fetch",{...a,endTimestamp:Vt()*1e3,error:c}),qo(c)&&c.stack===void 0&&(c.stack=s.stack,Sn(c,"framesToPop",1));const u=Le()?.getOptions().enhanceFetchErrorMessages??"always";if(u!==!1&&c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const f=new URL(a.fetchData.url).host;u==="always"?c.message=`${c.message} (${f})`:Sn(c,"__sentry_fetch_url_host__",f)}catch{}throw c})}})}function Gr(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Ih(t){return typeof t=="string"?t:t?Gr(t,"url")?t.url:t.toString?t.toString():"":""}function ZE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:Ih(n),method:Gr(i,"method")?String(i.method).toUpperCase():Mp(n)&&Gr(n,"method")?String(n.method).toUpperCase():"GET"}}const e=t[0];return{url:Ih(e),method:Gr(e,"method")?String(e.method).toUpperCase():"GET"}}function eC(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(Mp(e))return new Headers(e.headers)}catch{}}function tC(){return"npm"}const ue=W;let Fc=0;function pg(){return Fc>0}function nC(){Fc++,setTimeout(()=>{Fc--})}function Bi(t,e={}){function n(s){return typeof s=="function"}if(!n(t))return t;try{const s=t.__sentry_wrapped__;if(s)return typeof s=="function"?s:t;if(Fl(t))return t}catch{return t}const i=function(...s){try{const r=s.map(o=>Bi(o,e));return t.apply(this,r)}catch(r){throw nC(),Iv(o=>{o.addEventProcessor(a=>(e.mechanism&&(Rc(a,void 0),Fi(a,e.mechanism)),a.extra={...a.extra,arguments:s},a)),Hb(r)}),r}};try{for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s])}catch{}Fp(i,t),Sn(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function iC(){const t=xl(),{referrer:e}=ue.document||{},{userAgent:n}=ue.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function Wl(t,e){const n=ql(t,e),i={type:cC(e),value:lC(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function sC(t,e,n,i){const r=Le()?.getOptions().normalizeDepth,o=pC(e),a={__serialized__:Yp(e,r)};if(o)return{exception:{values:[Wl(t,o)]},extra:a};const c={exception:{values:[{type:Go(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:hC(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=ql(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Ka(t,e){return{exception:{values:[Wl(t,e)]}}}function ql(t,e){const n=e.stacktrace||e.stack||"",i=oC(e),s=aC(e);try{return t(n,i,s)}catch{}return[]}const rC=/Minified React error #\d+;/i;function oC(t){return t&&rC.test(t.message)?1:0}function aC(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function gg(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function cC(t){const e=t?.name;return!e&&gg(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function lC(t){const e=t?.message;return gg(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?wh(e.error):wh(t):"No error message"}function uC(t,e,n,i){const s=n?.syntheticException||void 0,r=zl(t,e,s,i);return Fi(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),Xo(r)}function dC(t,e,n="info",i,s){const r=i?.syntheticException||void 0,o=Uc(t,e,r,s);return o.level=n,i?.event_id&&(o.event_id=i.event_id),Xo(o)}function zl(t,e,n,i,s){let r;if(Op(e)&&e.error)return Ka(t,e.error);if($d(e)||iv(e)){const o=e;if("stack"in e)r=Ka(t,e);else{const a=o.name||($d(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=Uc(t,c,n,i),Rc(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return qo(e)?Ka(t,e):Hs(e)||Go(e)?(r=sC(t,e,n,s),Fi(r,{synthetic:!0}),r):(r=Uc(t,e,n,i),Rc(r,`${e}`),Fi(r,{synthetic:!0}),r)}function Uc(t,e,n,i){const s={};if(i&&n){const r=ql(t,n);r.length&&(s.exception={values:[{value:e,stacktrace:{frames:r}}]}),Fi(s,{synthetic:!0})}if(Dl(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return s.logentry={message:r,params:o},s}return s.message=e,s}function hC(t,{isUnhandledRejection:e}){const n=uv(t),i=e?"promise rejection":"exception";return Op(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:Go(t)?`Event \`${fC(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function fC(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function pC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class gC extends hE{constructor(e){const n=mC(e),i=ue.SENTRY_SDK_SOURCE||tC();EE(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:s,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;ue.document&&(r||o||l)&&ue.document.addEventListener("visibilitychange",()=>{ue.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&tg(this),l&&ig(this))}),s&&this.on("beforeSendSession",bE)}eventFromException(e,n){return uC(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return dC(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,s){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,s)}}function mC(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:ue.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const _C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Me=W,yC=1e3;let kh,$c,Bc;function wC(t){pi("dom",t),gi("dom",vC)}function vC(){if(!Me.document)return;const t=ft.bind(null,"dom"),e=Rh(t,!0);Me.document.addEventListener("click",e,!1),Me.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const s=Me[n]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(ze(s,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=Rh(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),ze(s,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function bC(t){if(t.type!==$c)return!1;try{if(!t.target||t.target._sentryId!==Bc)return!1}catch{}return!0}function EC(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function Rh(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=CC(n);if(EC(n.type,i))return;Sn(n,"_sentryCaptured",!0),i&&!i._sentryId&&Sn(i,"_sentryId",et());const s=n.type==="keypress"?"input":n.type;bC(n)||(t({event:n,name:s,global:e}),$c=n.type,Bc=i?i._sentryId:void 0),clearTimeout(kh),kh=Me.setTimeout(()=>{Bc=void 0,$c=void 0},yC)}}function CC(t){try{return t.target}catch{return null}}let Dr;function mg(t){const e="history";pi(e,t),gi(e,TC)}function TC(){if(Me.addEventListener("popstate",()=>{const e=Me.location.href,n=Dr;if(Dr=e,n===e)return;ft("history",{from:n,to:e})}),!KE())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const s=Dr,r=SC(String(i));if(Dr=r,s===r)return e.apply(this,n);ft("history",{from:s,to:r})}return e.apply(this,n)}}ze(Me.history,"pushState",t),ze(Me.history,"replaceState",t)}function SC(t){try{return new URL(t,Me.location.origin).toString()}catch{return t}}const Kr={};function IC(t){const e=Kr[t];if(e)return e;let n=Me[t];if(xc(n))return Kr[t]=n.bind(Me);const i=Me.document;if(i&&typeof i.createElement=="function")try{const s=i.createElement("iframe");s.hidden=!0,i.head.appendChild(s);const r=s.contentWindow;r?.[t]&&(n=r[t]),i.head.removeChild(s)}catch(s){_C&&I.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,s)}return n&&(Kr[t]=n.bind(Me))}function kC(t){Kr[t]=void 0}const Cs="__sentry_xhr_v3__";function RC(t){pi("xhr",t),gi("xhr",AC)}function AC(){if(!Me.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const s=new Error,r=Vt()*1e3,o=jt(i[0])?i[0].toUpperCase():void 0,a=NC(i[1]);if(!o||!a)return e.apply(n,i);n[Cs]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Cs];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Vt()*1e3,startTimestamp:r,xhr:n,virtualError:s};ft("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Cs];return p&&jt(h)&&jt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const s=n[Cs];if(!s)return e.apply(n,i);i[0]!==void 0&&(s.body=i[0]);const r={startTimestamp:Vt()*1e3,xhr:n};return ft("xhr",r),e.apply(n,i)}})}function NC(t){if(jt(t))return t;try{return t.toString()}catch{}}const PC=40;function LC(t,e=IC("fetch")){let n=0,i=0;async function s(r){const o=r.body.length;n+=o,i++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw kC("fetch"),c}finally{n-=o,i--}}return aE(t,s,Vl(t.bufferSize||PC))}const Qo=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,OC=30,DC=50;function Hc(t,e,n,i){const s={filename:t,function:e==="<anonymous>"?Qn:e,in_app:!0};return n!==void 0&&(s.lineno=n),i!==void 0&&(s.colno=i),s}const MC=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,xC=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,FC=/\((\S*)(?::(\d+))(?::(\d+))\)/,UC=/at (.+?) ?\(data:(.+?),/,$C=t=>{const e=t.match(UC);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=MC.exec(t);if(n){const[,s,r,o]=n;return Hc(s,Qn,+r,+o)}const i=xC.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=FC.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[r,o]=_g(i[1]||Qn,i[2]);return Hc(o,r,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},BC=[OC,$C],HC=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,jC=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,VC=t=>{const e=HC.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=jC.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let i=e[3],s=e[1]||Qn;return[s,i]=_g(s,i),Hc(i,s,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},WC=[DC,VC],qC=[BC,WC],zC=Np(...qC),_g=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:Qn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Mr=1024,GC="Breadcrumbs",KC=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:GC,setup(n){e.console&&$E(QC(n)),e.dom&&wC(XC(n,e.dom)),e.xhr&&RC(ZC(n)),e.fetch&&XE(eT(n)),e.history&&mg(tT(n)),e.sentry&&n.on("beforeSendEvent",JC(n))}}}),YC=KC;function JC(t){return function(n){Le()===t&&Zn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:jn(n)},{event:n})}}function XC(t,e){return function(i){if(Le()!==t)return;let s,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Mr&&(Qo&&I.warn(`\`dom.maxStringLength\` cannot exceed ${Mr}, but a value of ${a} was configured. Sentry will use ${Mr} instead.`),a=Mr),typeof o=="string"&&(o=[o]);try{const l=i.event,u=nT(l)?l.target:l;s=xp(u,{keyAttrs:o,maxStringLength:a}),r=lv(u)}catch{s="<unknown>"}if(s.length===0)return;const c={category:`ui.${i.name}`,message:s};r&&(c.data={"ui.component_name":r}),Zn(c,{event:i.event,name:i.name,global:i.global})}}function QC(t){return function(n){if(Le()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:HE(n.level),message:jd(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${jd(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;Zn(i,{input:n.args,level:n.level})}}function ZC(t){return function(n){if(Le()!==t)return;const{startTimestamp:i,endTimestamp:s}=n,r=n.xhr[Cs];if(!i||!s||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:s},h={category:"xhr",data:u,type:"http",level:fg(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Zn(h,d)}}function eT(t){return function(n){if(Le()!==t)return;const{startTimestamp:i,endTimestamp:s}=n;if(s&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:s},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Zn(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:i,endTimestamp:s},c={category:"fetch",data:o,type:"http",level:fg(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Zn(c,a)}}}function tT(t){return function(n){if(Le()!==t)return;let i=n.from,s=n.to;const r=Ga(ue.location.href);let o=i?Ga(i):void 0;const a=Ga(s);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(s=a.relative),r.protocol===o.protocol&&r.host===o.host&&(i=o.relative),Zn({category:"navigation",data:{from:i,to:s}})}}function nT(t){return!!t&&!!t.target}const iT=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],sT="BrowserApiErrors",rT=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:sT,setupOnce(){e.setTimeout&&ze(ue,"setTimeout",Ah),e.setInterval&&ze(ue,"setInterval",Ah),e.requestAnimationFrame&&ze(ue,"requestAnimationFrame",aT),e.XMLHttpRequest&&"XMLHttpRequest"in ue&&ze(XMLHttpRequest.prototype,"send",cT);const n=e.eventTarget;n&&(Array.isArray(n)?n:iT).forEach(s=>lT(s,e))}}}),oT=rT;function Ah(t){return function(...e){const n=e[0];return e[0]=Bi(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Cn(t)}`}}),t.apply(this,e)}}function aT(t){return function(e){return t.apply(this,[Bi(e,{mechanism:{data:{handler:Cn(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function cT(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(s=>{s in n&&typeof n[s]=="function"&&ze(n,s,function(r){const o={mechanism:{data:{handler:Cn(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${s}`}},a=Fl(r);return a&&(o.mechanism.data.handler=Cn(a)),Bi(r,o)})}),t.apply(this,e)}}function lT(t,e){const i=ue[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(ze(i,"addEventListener",function(s){return function(r,o,a){try{uT(o)&&(o.handleEvent=Bi(o.handleEvent,{mechanism:{data:{handler:Cn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&dT(this,r,o),s.apply(this,[r,Bi(o,{mechanism:{data:{handler:Cn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),ze(i,"removeEventListener",function(s){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&s.call(this,r,c,a)}catch{}return s.call(this,r,o,a)}}))}function uT(t){return typeof t.handleEvent=="function"}function dT(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const hT=()=>({name:"BrowserSession",setupOnce(){if(typeof ue.document>"u"){Qo&&I.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}ch({ignoreDuration:!0}),lh(),mg(({from:t,to:e})=>{t!==void 0&&t!==e&&(ch({ignoreDuration:!0}),lh())})}}),fT="GlobalHandlers",pT=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:fT,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(mT(n),Nh("onerror")),e.onunhandledrejection&&(_T(n),Nh("onunhandledrejection"))}}}),gT=pT;function mT(t){Zw(e=>{const{stackParser:n,attachStacktrace:i}=yg();if(Le()!==t||pg())return;const{msg:s,url:r,line:o,column:a,error:c}=e,l=vT(zl(n,c||s,void 0,i,!1),r,o,a);l.level="error",Xp(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function _T(t){tv(e=>{const{stackParser:n,attachStacktrace:i}=yg();if(Le()!==t||pg())return;const s=yT(e),r=zo(s)?wT(s):zl(n,s,void 0,i,!0);r.level="error",Xp(r,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function yT(t){if(zo(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function wT(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function vT(t,e,n,i){const s=t.exception=t.exception||{},r=s.values=s.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=bT(e)??xl();return c.length===0&&c.push({colno:l,filename:d,function:Qn,in_app:!0,lineno:u}),t}function Nh(t){Qo&&I.log(`Global Handler attached: ${t}`)}function yg(){return Le()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function bT(t){if(!(!jt(t)||t.length===0))return t.startsWith("data:")?`<${vE(t,!1)}>`:t}const ET=()=>({name:"HttpContext",preprocessEvent(t){if(!ue.navigator&&!ue.location&&!ue.document)return;const e=iC(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),CT="cause",TT=5,ST="LinkedErrors",IT=((t={})=>{const e=t.limit||TT,n=t.key||CT;return{name:ST,preprocessEvent(i,s,r){const o=r.getOptions();UE(Wl,o.stackParser,n,e,i,s)}}}),kT=IT;function RT(){return AT()?(Qo&&Xi(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function AT(){if(typeof ue.window>"u")return!1;const t=ue;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=xl(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(ue===ue.top&&i.some(r=>n.startsWith(`${r}://`)))}function NT(t){return[NE(),IE(),oT(),YC(),gT(),kT(),WE(),ET(),hT()]}function PT(t={}){const e=!t.skipBrowserExtensionCheck&&RT();let n=t.defaultIntegrations==null?NT():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:Xw(t.stackParser||zC),integrations:Kb({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||LC};return yE(gC,i)}const LT="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";PT({dsn:LT,sendDefaultPii:!0});/**
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
 */const OT=()=>{};var Ph={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _=function(t,e){if(!t)throw es(e)},es=function(t){return new Error("Firebase Database ("+wg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vg=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},DT=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Zo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(vg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):DT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new MT;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class MT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bg=function(t){const e=vg(t);return Zo.encodeByteArray(e,!0)},co=function(t){return bg(t).replace(/\./g,"")},lo=function(t){try{return Zo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xT(t){return Eg(void 0,t)}function Eg(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!FT(n)||(t[n]=Eg(t[n],e[n]));return t}function FT(t){return t!=="__proto__"}/**
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
 */function Cg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const UT=()=>Cg().__FIREBASE_DEFAULTS__,$T=()=>{if(typeof process>"u"||typeof Ph>"u")return;const t=Ph.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},BT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&lo(t[1]);return e&&JSON.parse(e)},Gl=()=>{try{return OT()||UT()||$T()||BT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Tg=t=>Gl()?.emulatorHosts?.[t],HT=t=>{const e=Tg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Sg=()=>Gl()?.config,Ig=t=>Gl()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function ts(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function kg(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function jT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[co(JSON.stringify(n)),co(JSON.stringify(o)),""].join(".")}const Is={};function VT(){const t={prod:[],emulator:[]};for(const e of Object.keys(Is))Is[e]?t.emulator.push(e):t.prod.push(e);return t}function WT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Lh=!1;function Rg(t,e){if(typeof window>"u"||typeof document>"u"||!ts(window.location.host)||Is[t]===e||Is[t]||Lh)return;Is[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=VT().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Lh=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=WT(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),g=n("learnmore"),m=document.getElementById(g)||document.createElement("a"),T=n("preprendIcon"),L=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const $=h.element;a($),u(m,g);const y=l();c(L,T),$.append(L,p,m,y),document.body.appendChild($)}r?(p.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(L.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function Be(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Kl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Be())}function qT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function zT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ag(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function GT(){const t=Be();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function KT(){return wg.NODE_ADMIN===!0}function ea(){try{return typeof indexedDB=="object"}catch{return!1}}function Ng(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function YT(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JT="FirebaseError";class en extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=JT,Object.setPrototypeOf(this,en.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,On.prototype.create)}}class On{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?XT(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new en(s,a,i)}}function XT(t,e){return t.replace(QT,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const QT=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(t){return JSON.parse(t)}function ge(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Ws(lo(r[0])||""),n=Ws(lo(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},ZT=function(t){const e=Pg(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},eS=function(t){const e=Pg(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Hi(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function uo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ho(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function ei(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Oh(r)&&Oh(o)){if(!ei(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Oh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function nS(t,e){const n=new iS(t,e);return n.subscribe.bind(n)}class iS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");sS(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=Ya),s.error===void 0&&(s.error=Ya),s.complete===void 0&&(s.complete=Ya);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ya(){}function ji(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rS=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,_(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ta=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oS=1e3,aS=2,cS=14400*1e3,lS=.5;function uS(t,e=oS,n=aS){const i=e*Math.pow(n,t),s=Math.round(lS*i*(Math.random()-.5)*2);return Math.min(cS,i+s)}/**
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
 */function re(t){return t&&t._delegate?t._delegate:t}class Ye{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class dS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new He;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(fS(e))try{this.getOrInitializeService({instanceIdentifier:$n})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=$n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$n){return this.instances.has(e)}getOptions(e=$n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:hS(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=$n){return this.component?this.component.multipleInstances?e:$n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function hS(t){return t===$n?void 0:t}function fS(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new dS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(z||(z={}));const gS={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},mS=z.INFO,_S={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},yS=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=_S[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class na{constructor(e){this.name=e,this._logLevel=mS,this._logHandler=yS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}}const wS=(t,e)=>e.some(n=>t instanceof n);let Dh,Mh;function vS(){return Dh||(Dh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function bS(){return Mh||(Mh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Lg=new WeakMap,jc=new WeakMap,Og=new WeakMap,Ja=new WeakMap,Yl=new WeakMap;function ES(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Wt(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Lg.set(n,t)}).catch(()=>{}),Yl.set(e,t),e}function CS(t){if(jc.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});jc.set(t,e)}let Vc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return jc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Og.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Wt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function TS(t){Vc=t(Vc)}function SS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Xa(this),e,...n);return Og.set(i,e.sort?e.sort():[e]),Wt(i)}:bS().includes(t)?function(...e){return t.apply(Xa(this),e),Wt(Lg.get(this))}:function(...e){return Wt(t.apply(Xa(this),e))}}function IS(t){return typeof t=="function"?SS(t):(t instanceof IDBTransaction&&CS(t),wS(t,vS())?new Proxy(t,Vc):t)}function Wt(t){if(t instanceof IDBRequest)return ES(t);if(Ja.has(t))return Ja.get(t);const e=IS(t);return e!==t&&(Ja.set(t,e),Yl.set(e,t)),e}const Xa=t=>Yl.get(t);function ia(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Wt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Wt(o.result),c.oldVersion,c.newVersion,Wt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function Qa(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Wt(n).then(()=>{})}const kS=["get","getKey","getAll","getAllKeys","count"],RS=["put","add","delete","clear"],Za=new Map;function xh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Za.get(e))return Za.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=RS.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||kS.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Za.set(e,r),r}TS(t=>({...t,get:(e,n,i)=>xh(e,n)||t.get(e,n,i),has:(e,n)=>!!xh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(NS(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function NS(t){return t.getComponent()?.type==="VERSION"}const Wc="@firebase/app",Fh="0.14.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt=new na("@firebase/app"),PS="@firebase/app-compat",LS="@firebase/analytics-compat",OS="@firebase/analytics",DS="@firebase/app-check-compat",MS="@firebase/app-check",xS="@firebase/auth",FS="@firebase/auth-compat",US="@firebase/database",$S="@firebase/data-connect",BS="@firebase/database-compat",HS="@firebase/functions",jS="@firebase/functions-compat",VS="@firebase/installations",WS="@firebase/installations-compat",qS="@firebase/messaging",zS="@firebase/messaging-compat",GS="@firebase/performance",KS="@firebase/performance-compat",YS="@firebase/remote-config",JS="@firebase/remote-config-compat",XS="@firebase/storage",QS="@firebase/storage-compat",ZS="@firebase/firestore",eI="@firebase/ai",tI="@firebase/firestore-compat",nI="firebase",iI="12.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc="[DEFAULT]",sI={[Wc]:"fire-core",[PS]:"fire-core-compat",[OS]:"fire-analytics",[LS]:"fire-analytics-compat",[MS]:"fire-app-check",[DS]:"fire-app-check-compat",[xS]:"fire-auth",[FS]:"fire-auth-compat",[US]:"fire-rtdb",[$S]:"fire-data-connect",[BS]:"fire-rtdb-compat",[HS]:"fire-fn",[jS]:"fire-fn-compat",[VS]:"fire-iid",[WS]:"fire-iid-compat",[qS]:"fire-fcm",[zS]:"fire-fcm-compat",[GS]:"fire-perf",[KS]:"fire-perf-compat",[YS]:"fire-rc",[JS]:"fire-rc-compat",[XS]:"fire-gcs",[QS]:"fire-gcs-compat",[ZS]:"fire-fst",[tI]:"fire-fst-compat",[eI]:"fire-vertex","fire-js":"fire-js",[nI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=new Map,rI=new Map,zc=new Map;function Uh(t,e){try{t.container.addComponent(e)}catch(n){Gt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function it(t){const e=t.name;if(zc.has(e))return Gt.debug(`There were multiple attempts to register component ${e}.`),!1;zc.set(e,t);for(const n of fo.values())Uh(n,t);for(const n of rI.values())Uh(n,t);return!0}function Dn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ot(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},yn=new On("app","Firebase",oI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ye("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw yn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is=iI;function Dg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:qc,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw yn.create("bad-app-name",{appName:String(s)});if(n||(n=Sg()),!n)throw yn.create("no-options");const r=fo.get(s);if(r){if(ei(n,r.options)&&ei(i,r.config))return r;throw yn.create("duplicate-app",{appName:s})}const o=new pS(s);for(const c of zc.values())o.addComponent(c);const a=new aI(n,i,o);return fo.set(s,a),a}function sa(t=qc){const e=fo.get(t);if(!e&&t===qc&&Sg())return Dg();if(!e)throw yn.create("no-app",{appName:t});return e}function Ge(t,e,n){let i=sI[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Gt.warn(o.join(" "));return}it(new Ye(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const cI="firebase-heartbeat-database",lI=1,qs="firebase-heartbeat-store";let ec=null;function Mg(){return ec||(ec=ia(cI,lI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(qs)}catch(n){console.warn(n)}}}}).catch(t=>{throw yn.create("idb-open",{originalErrorMessage:t.message})})),ec}async function uI(t){try{const n=(await Mg()).transaction(qs),i=await n.objectStore(qs).get(xg(t));return await n.done,i}catch(e){if(e instanceof en)Gt.warn(e.message);else{const n=yn.create("idb-get",{originalErrorMessage:e?.message});Gt.warn(n.message)}}}async function $h(t,e){try{const i=(await Mg()).transaction(qs,"readwrite");await i.objectStore(qs).put(e,xg(t)),await i.done}catch(n){if(n instanceof en)Gt.warn(n.message);else{const i=yn.create("idb-set",{originalErrorMessage:n?.message});Gt.warn(i.message)}}}function xg(t){return`${t.name}!${t.options.appId}`}/**
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
 */const dI=1024,hI=30;class fI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new gI(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Bh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>hI){const s=mI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Gt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Bh(),{heartbeatsToSend:n,unsentEntries:i}=pI(this._heartbeatsCache.heartbeats),s=co(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Gt.warn(e),""}}}function Bh(){return new Date().toISOString().substring(0,10)}function pI(t,e=dI){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Hh(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Hh(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class gI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ea()?Ng().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await uI(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return $h(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return $h(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Hh(t){return co(JSON.stringify({version:2,heartbeats:t})).length}function mI(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _I(t){it(new Ye("platform-logger",e=>new AS(e),"PRIVATE")),it(new Ye("heartbeat",e=>new fI(e),"PRIVATE")),Ge(Wc,Fh,t),Ge(Wc,Fh,"esm2020"),Ge("fire-js","")}_I("");var jh={};const Vh="@firebase/database",Wh="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fg="";function Ug(t){Fg=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ge(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ws(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Lt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new yI(e)}}catch{}return new wI},Vn=$g("localStorage"),vI=$g("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=new na("@firebase/database"),bI=(function(){let t=1;return function(){return t++}})(),Bg=function(t){const e=rS(t),n=new tS;n.update(e);const i=n.digest();return Zo.encodeByteArray(i)},mr=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=mr.apply(null,i):typeof i=="object"?e+=ge(i):e+=i,e+=" "}return e};let ks=null,qh=!0;const EI=function(t,e){_(!0,"Can't turn on custom loggers persistently."),Ti.logLevel=z.VERBOSE,ks=Ti.log.bind(Ti)},ve=function(...t){if(qh===!0&&(qh=!1,ks===null&&vI.get("logging_enabled")===!0&&EI()),ks){const e=mr.apply(null,t);ks(e)}},_r=function(t){return function(...e){ve(t,...e)}},Gc=function(...t){const e="FIREBASE INTERNAL ERROR: "+mr(...t);Ti.error(e)},Kt=function(...t){const e=`FIREBASE FATAL ERROR: ${mr(...t)}`;throw Ti.error(e),new Error(e)},$e=function(...t){const e="FIREBASE WARNING: "+mr(...t);Ti.warn(e)},CI=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&$e("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ra=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},TI=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Vi="[MIN_NAME]",ti="[MAX_NAME]",mi=function(t,e){if(t===e)return 0;if(t===Vi||e===ti)return-1;if(e===Vi||t===ti)return 1;{const n=zh(t),i=zh(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},SI=function(t,e){return t===e?0:t<e?-1:1},gs=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ge(e))},Jl=function(t){if(typeof t!="object"||t===null)return ge(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=ge(e[i]),n+=":",n+=Jl(t[e[i]]);return n+="}",n},Hg=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function Te(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const jg=function(t){_(!ra(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},II=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},kI=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function RI(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const AI=new RegExp("^-?(0*)\\d{1,10}$"),NI=-2147483648,PI=2147483647,zh=function(t){if(AI.test(t)){const e=Number(t);if(e>=NI&&e<=PI)return e}return null},ss=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw $e("Exception was thrown by user callback.",n),e},Math.floor(0))}},LI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Rs=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class OI{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,ot(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){$e(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ve("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',$e(e)}}class Yr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Yr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="5",Vg="v",Wg="s",qg="r",zg="f",Gg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Kg="ls",Yg="p",Kc="ac",Jg="websocket",Xg="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Vn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Vn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function MI(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Zg(t,e,n){_(typeof e=="string","typeof type must == string"),_(typeof n=="object","typeof params must == object");let i;if(e===Jg)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Xg)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);MI(t)&&(n.ns=t.namespace);const s=[];return Te(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(){this.counters_={}}incrementCounter(e,n=1){Lt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return xT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc={},nc={};function Ql(t){const e=t.toString();return tc[e]||(tc[e]=new xI),tc[e]}function FI(t,e){const n=t.toString();return nc[n]||(nc[n]=e()),nc[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&ss(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh="start",$I="close",BI="pLPCommand",HI="pRTLPCB",em="id",tm="pw",nm="ser",jI="cb",VI="seg",WI="ts",qI="d",zI="dframe",im=1870,sm=30,GI=im-sm,KI=25e3,YI=3e4;class Ei{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=_r(e),this.stats_=Ql(n),this.urlFn=c=>(this.appCheckToken&&(c[Kc]=this.appCheckToken),Zg(n,Xg,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new UI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(YI)),TI(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Zl((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Gh)this.id=a,this.password=c;else if(o===$I)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Gh]="t",i[nm]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[jI]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Vg]=Xl,this.transportSessionId&&(i[Wg]=this.transportSessionId),this.lastSessionId&&(i[Kg]=this.lastSessionId),this.applicationId&&(i[Yg]=this.applicationId),this.appCheckToken&&(i[Kc]=this.appCheckToken),typeof location<"u"&&location.hostname&&Gg.test(location.hostname)&&(i[qg]=zg);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ei.forceAllow_=!0}static forceDisallow(){Ei.forceDisallow_=!0}static isAvailable(){return Ei.forceAllow_?!0:!Ei.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!II()&&!kI()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ge(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=bg(n),s=Hg(i,GI);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[zI]="t",i[em]=e,i[tm]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ge(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Zl{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=bI(),window[BI+this.uniqueCallbackIdentifier]=e,window[HI+this.uniqueCallbackIdentifier]=n,this.myIFrame=Zl.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ve("frame writing exception"),a.stack&&ve(a.stack),ve(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ve("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[em]=this.myID,e[tm]=this.myPW,e[nm]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+sm+i.length<=im;){const o=this.pendingSegs.shift();i=i+"&"+VI+s+"="+o.seg+"&"+WI+s+"="+o.ts+"&"+qI+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(KI)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{ve("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JI=16384,XI=45e3;let po=null;typeof MozWebSocket<"u"?po=MozWebSocket:typeof WebSocket<"u"&&(po=WebSocket);class at{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=_r(this.connId),this.stats_=Ql(n),this.connURL=at.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Vg]=Xl,typeof location<"u"&&location.hostname&&Gg.test(location.hostname)&&(o[qg]=zg),n&&(o[Wg]=n),i&&(o[Kg]=i),s&&(o[Kc]=s),r&&(o[Yg]=r),Zg(e,Jg,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Vn.set("previous_websocket_failure",!0);try{let i;KT(),this.mySock=new po(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){at.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&po!==null&&!at.forceDisallow_}static previouslyFailed(){return Vn.isInMemoryStorage||Vn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Vn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Ws(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=ge(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Hg(n,JI);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(XI))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}at.responsesRequiredToBeHealthy=2;at.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{static get ALL_TRANSPORTS(){return[Ei,at]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=at&&at.isAvailable();let i=n&&!at.previouslyFailed();if(e.webSocketOnly&&(n||$e("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[at];else{const s=this.transports_=[];for(const r of zs.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);zs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}zs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QI=6e4,ZI=5e3,ek=10*1024,tk=100*1024,ic="t",Kh="d",nk="s",Yh="r",ik="e",Jh="o",Xh="a",Qh="n",Zh="p",sk="h";class rk{constructor(e,n,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=_r("c:"+this.id+":"),this.transportManager_=new zs(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Rs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>tk?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ek?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ic in e){const n=e[ic];n===Xh?this.upgradeIfSecondaryHealthy_():n===Yh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Jh&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=gs("t",e),i=gs("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Zh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Xh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Qh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=gs("t",e),i=gs("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=gs(ic,e);if(Kh in e){const i=e[Kh];if(n===sk){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Qh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===nk?this.onConnectionShutdown_(i):n===Yh?this.onReset_(i):n===ik?Gc("Server Error: "+i):n===Jh?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Gc("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Xl!==i&&$e("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),Rs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(QI))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Rs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(ZI))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Zh,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Vn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){_(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go extends om{static getInstance(){return new go}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Kl()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return _(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=32,tf=768;class q{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function H(){return new q("")}function M(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function In(t){return t.pieces_.length-t.pieceNum_}function Y(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new q(t.pieces_,e)}function eu(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function ok(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Gs(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function am(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new q(e,0)}function ie(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof q)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new q(n,0)}function x(t){return t.pieceNum_>=t.pieces_.length}function xe(t,e){const n=M(t),i=M(e);if(n===null)return e;if(n===i)return xe(Y(t),Y(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function ak(t,e){const n=Gs(t,0),i=Gs(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=mi(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function tu(t,e){if(In(t)!==In(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function Ze(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(In(t)>In(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class ck{constructor(e,n){this.errorPrefix_=n,this.parts_=Gs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ta(this.parts_[i]);cm(this)}}function lk(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=ta(e),cm(t)}function uk(t){const e=t.parts_.pop();t.byteLength_-=ta(e),t.parts_.length>0&&(t.byteLength_-=1)}function cm(t){if(t.byteLength_>tf)throw new Error(t.errorPrefix_+"has a key path longer than "+tf+" bytes ("+t.byteLength_+").");if(t.parts_.length>ef)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ef+") or object contains a cycle "+Bn(t))}function Bn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu extends om{static getInstance(){return new nu}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return _(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=1e3,dk=300*1e3,nf=30*1e3,hk=1.3,fk=3e4,pk="server_kill",sf=3;class qt extends rm{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=qt.nextPersistentConnectionId_++,this.log_=_r("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ms,this.maxReconnectDelay_=dk,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");nu.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&go.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(ge(r)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new He,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;qt.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Lt(e,"w")){const i=Hi(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();$e(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||eS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=nf)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=ZT(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ge(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Gc("Unrecognized action received from server: "+ge(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ms,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ms,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>fk&&(this.reconnectDelay_=ms),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*hk)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+qt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){_(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?ve("getToken() completed but was canceled"):(ve("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new rk(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{$e(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(pk)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&$e(d),c())}}}interrupt(e){ve("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ve("Resuming connection for reason: "+e),delete this.interruptReasons_[e],uo(this.interruptReasons_)&&(this.reconnectDelay_=ms,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Jl(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new q(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){ve("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=sf&&(this.reconnectDelay_=nf,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ve("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=sf&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Fg.replace(/\./g,"-")]=1,Kl()?e["framework.cordova"]=1:Ag()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=go.getInstance().currentlyOnline();return uo(this.interruptReasons_)&&e}}qt.nextPersistentConnectionId_=0;qt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class oa{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new F(Vi,e),s=new F(Vi,n);return this.compare(i,s)!==0}minPost(){return F.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xr;class lm extends oa{static get __EMPTY_NODE(){return xr}static set __EMPTY_NODE(e){xr=e}compare(e,n){return mi(e.name,n.name)}isDefinedOn(e){throw es("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return F.MIN}maxPost(){return new F(ti,xr)}makePost(e,n){return _(typeof e=="string","KeyIndex indexValue must always be a string."),new F(e,xr)}toString(){return".key"}}const Si=new lm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class we{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??we.RED,this.left=s??je.EMPTY_NODE,this.right=r??je.EMPTY_NODE}copy(e,n,i,s,r){return new we(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return je.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return je.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}we.RED=!0;we.BLACK=!1;class gk{copy(e,n,i,s,r){return this}insert(e,n,i){return new we(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class je{constructor(e,n=je.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new je(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,we.BLACK,null,null))}remove(e){return new je(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,we.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Fr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Fr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Fr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Fr(this.root_,null,this.comparator_,!0,e)}}je.EMPTY_NODE=new gk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mk(t,e){return mi(t.name,e.name)}function iu(t,e){return mi(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yc;function _k(t){Yc=t}const um=function(t){return typeof t=="number"?"number:"+jg(t):"string:"+t},dm=function(t){if(t.isLeafNode()){const e=t.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Lt(e,".sv"),"Priority must be a string or number.")}else _(t===Yc||t.isEmpty(),"priority of unexpected type.");_(t===Yc||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rf;class ye{static set __childrenNodeConstructor(e){rf=e}static get __childrenNodeConstructor(){return rf}constructor(e,n=ye.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),dm(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ye(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ye.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return x(e)?this:M(e)===".priority"?this.priorityNode_:ye.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:ye.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=M(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(_(i!==".priority"||In(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,ye.__childrenNodeConstructor.EMPTY_NODE.updateChild(Y(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+um(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=jg(this.value_):e+=this.value_,this.lazyHash_=Bg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ye.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ye.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=ye.VALUE_TYPE_ORDER.indexOf(n),r=ye.VALUE_TYPE_ORDER.indexOf(i);return _(s>=0,"Unknown leaf type: "+n),_(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}ye.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hm,fm;function yk(t){hm=t}function wk(t){fm=t}class vk extends oa{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?mi(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return F.MIN}maxPost(){return new F(ti,new ye("[PRIORITY-POST]",fm))}makePost(e,n){const i=hm(e);return new F(n,new ye("[PRIORITY-POST]",i))}toString(){return".priority"}}const se=new vk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bk=Math.log(2);class Ek{constructor(e){const n=r=>parseInt(Math.log(r)/bk,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const mo=function(t,e,n,i){t.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new we(h,d.node,we.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=s(c,f),g=s(f+1,l);return d=t[f],h=n?n(d):d,new we(h,d.node,we.BLACK,p,g)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,g){const m=d-p,T=d;d-=p;const L=s(m+1,T),$=t[m],y=n?n($):$;f(new we(y,$.node,g,null,L))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const g=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));g?h(m,we.BLACK):(h(m,we.BLACK),h(m,we.RED))}return u},o=new Ek(t.length),a=r(o);return new je(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sc;const wi={};class Ft{static get Default(){return _(wi&&se,"ChildrenNode.ts has not been loaded"),sc=sc||new Ft({".priority":wi},{".priority":se}),sc}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Hi(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof je?n:null}hasIndex(e){return Lt(this.indexSet_,e.toString())}addIndex(e,n){_(e!==Si,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(F.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=mo(i,e.getCompare()):a=wi;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Ft(u,l)}addToIndexes(e,n){const i=ho(this.indexes_,(s,r)=>{const o=Hi(this.indexSet_,r);if(_(o,"Missing index implementation for "+r),s===wi)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(F.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),mo(a,o.getCompare())}else return wi;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new F(e.name,a))),c.insert(e,e.node)}});return new Ft(i,this.indexSet_)}removeFromIndexes(e,n){const i=ho(this.indexes_,s=>{if(s===wi)return s;{const r=n.get(e.name);return r?s.remove(new F(e.name,r)):s}});return new Ft(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _s;class S{static get EMPTY_NODE(){return _s||(_s=new S(new je(iu),null,Ft.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&dm(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||_s}updatePriority(e){return this.children_.isEmpty()?this:new S(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?_s:n}}getChild(e){const n=M(e);return n===null?this:this.getImmediateChild(n).getChild(Y(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(_(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new F(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?_s:this.priorityNode_;return new S(s,o,r)}}updateChild(e,n){const i=M(e);if(i===null)return n;{_(M(e)!==".priority"||In(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(Y(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(se,(o,a)=>{n[o]=a.val(e),i++,r&&S.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+um(this.getPriority().val())+":"),this.forEachChild(se,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Bg(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new F(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new F(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new F(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,F.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,F.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===yr?-1:0}withIndex(e){if(e===Si||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new S(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Si||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(se),s=n.getIterator(se);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Si?null:this.indexMap_.get(e.toString())}}S.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Ck extends S{constructor(){super(new je(iu),S.EMPTY_NODE,Ft.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return S.EMPTY_NODE}isEmpty(){return!1}}const yr=new Ck;Object.defineProperties(F,{MIN:{value:new F(Vi,S.EMPTY_NODE)},MAX:{value:new F(ti,yr)}});lm.__EMPTY_NODE=S.EMPTY_NODE;ye.__childrenNodeConstructor=S;_k(yr);wk(yr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tk=!0;function ae(t,e=null){if(t===null)return S.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new ye(n,ae(e))}if(!(t instanceof Array)&&Tk){const n=[];let i=!1;if(Te(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=ae(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new F(o,c)))}}),n.length===0)return S.EMPTY_NODE;const r=mo(n,mk,o=>o.name,iu);if(i){const o=mo(n,se.getCompare());return new S(r,ae(e),new Ft({".priority":o},{".priority":se}))}else return new S(r,ae(e),Ft.Default)}else{let n=S.EMPTY_NODE;return Te(t,(i,s)=>{if(Lt(t,i)&&i.substring(0,1)!=="."){const r=ae(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(ae(e))}}yk(ae);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk extends oa{constructor(e){super(),this.indexPath_=e,_(!x(e)&&M(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?mi(e.name,n.name):r}makePost(e,n){const i=ae(e),s=S.EMPTY_NODE.updateChild(this.indexPath_,i);return new F(n,s)}maxPost(){const e=S.EMPTY_NODE.updateChild(this.indexPath_,yr);return new F(ti,e)}toString(){return Gs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik extends oa{compare(e,n){const i=e.node.compareTo(n.node);return i===0?mi(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return F.MIN}maxPost(){return F.MAX}makePost(e,n){const i=ae(e);return new F(n,i)}toString(){return".value"}}const kk=new Ik;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(t){return{type:"value",snapshotNode:t}}function Wi(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ks(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ys(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Rk(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Ks(n,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Wi(n,i)):o.trackChildChange(Ys(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(se,(s,r)=>{n.hasChild(s)||i.trackChildChange(Ks(s,r))}),n.isLeafNode()||n.forEachChild(se,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Ys(s,r,o))}else i.trackChildChange(Wi(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?S.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e){this.indexedFilter_=new su(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Js.getStartPost_(e),this.endPost_=Js.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new F(n,i))||(i=S.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=S.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(S.EMPTY_NODE);const r=this;return n.forEachChild(se,(o,a)=>{r.matches(new F(o,a))||(s=s.updateImmediateChild(o,S.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ak{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Js(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new F(n,i))||(i=S.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=S.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=S.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(S.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,S.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;_(a.numChildren()===this.limit_,"");const c=new F(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Ys(n,i,d)),a.updateImmediateChild(n,i);{r?.trackChildChange(Ks(n,d));const g=a.updateImmediateChild(n,S.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Wi(h.name,h.node)),g.updateImmediateChild(h.name,h.node)):g}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Ks(l.name,l.node)),r.trackChildChange(Wi(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,S.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=se}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Vi}hasEnd(){return this.endSet_}getIndexEndValue(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ti}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===se}copy(){const e=new aa;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Nk(t){return t.loadsAllData()?new su(t.getIndex()):t.hasLimit()?new Ak(t):new Js(t)}function of(t){const e={};if(t.isDefault())return e;let n;if(t.index_===se?n="$priority":t.index_===kk?n="$value":t.index_===Si?n="$key":(_(t.index_ instanceof Sk,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ge(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=ge(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+ge(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=ge(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+ge(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function af(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==se&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o extends rm{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(_(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=_r("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=_o.getListenId_(e,i),a={};this.listens_[o]=a;const c=of(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Hi(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,n){const i=_o.getListenId_(e,n);delete this.listens_[i]}get(e){const n=of(e._queryParams),i=e._path.toString(),s=new He;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ns(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Ws(a.responseText)}catch{$e("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&$e("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk{constructor(){this.rootNode_=S.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(){return{value:null,children:new Map}}function rs(t,e,n){if(x(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=M(e);t.children.has(i)||t.children.set(i,yo());const s=t.children.get(i);e=Y(e),rs(s,e,n)}}function Jc(t,e){if(x(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(se,(i,s)=>{rs(t,new q(i),s)}),Jc(t,e)}}else if(t.children.size>0){const n=M(e);return e=Y(e),t.children.has(n)&&Jc(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Xc(t,e,n){t.value!==null?n(e,t.value):Lk(t,(i,s)=>{const r=new q(e.toString()+"/"+i);Xc(s,r,n)})}function Lk(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ok{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Te(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf=10*1e3,Dk=30*1e3,Mk=300*1e3;class xk{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Ok(e);const i=cf+(Dk-cf)*Math.random();Rs(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;Te(e,(s,r)=>{r>0&&Lt(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),Rs(this.reportStats_.bind(this),Math.floor(Math.random()*2*Mk))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(lt||(lt={}));function ru(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ou(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function au(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=lt.ACK_USER_WRITE,this.source=ru()}operationForChild(e){if(x(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new q(e));return new wo(H(),n,this.revert)}}else return _(M(this.path)===e,"operationForChild called for unrelated child."),new wo(Y(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,n){this.source=e,this.path=n,this.type=lt.LISTEN_COMPLETE}operationForChild(e){return x(this.path)?new Xs(this.source,H()):new Xs(this.source,Y(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class qi{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=lt.MERGE}operationForChild(e){if(x(this.path)){const n=this.children.subtree(new q(e));return n.isEmpty()?null:n.value?new ni(this.source,H(),n.value):new qi(this.source,H(),n)}else return _(M(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new qi(this.source,Y(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(x(e))return this.isFullyInitialized()&&!this.filtered_;const n=M(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fk{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Uk(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Rk(o.childName,o.snapshotNode))}),ys(t,s,"child_removed",e,i,n),ys(t,s,"child_added",e,i,n),ys(t,s,"child_moved",r,i,n),ys(t,s,"child_changed",e,i,n),ys(t,s,"value",e,i,n),s}function ys(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>Bk(t,a,c)),o.forEach(a=>{const c=$k(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function $k(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Bk(t,e,n){if(e.childName==null||n.childName==null)throw es("Should only compare child_ events.");const i=new F(e.childName,e.snapshotNode),s=new F(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(t,e){return{eventCache:t,serverCache:e}}function As(t,e,n,i){return ca(new kn(e,n,i),t.serverCache)}function gm(t,e,n,i){return ca(t.eventCache,new kn(e,n,i))}function vo(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function ii(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rc;const Hk=()=>(rc||(rc=new je(SI)),rc);class X{static fromObject(e){let n=new X(null);return Te(e,(i,s)=>{n=n.set(new q(i),s)}),n}constructor(e,n=Hk()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:H(),value:this.value};if(x(e))return null;{const i=M(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(Y(e),n);return r!=null?{path:ie(new q(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(x(e))return this;{const n=M(e),i=this.children.get(n);return i!==null?i.subtree(Y(e)):new X(null)}}set(e,n){if(x(e))return new X(n,this.children);{const i=M(e),r=(this.children.get(i)||new X(null)).set(Y(e),n),o=this.children.insert(i,r);return new X(this.value,o)}}remove(e){if(x(e))return this.children.isEmpty()?new X(null):new X(null,this.children);{const n=M(e),i=this.children.get(n);if(i){const s=i.remove(Y(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new X(null):new X(this.value,r)}else return this}}get(e){if(x(e))return this.value;{const n=M(e),i=this.children.get(n);return i?i.get(Y(e)):null}}setTree(e,n){if(x(e))return n;{const i=M(e),r=(this.children.get(i)||new X(null)).setTree(Y(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new X(this.value,o)}}fold(e){return this.fold_(H(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ie(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,H(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(x(e))return null;{const r=M(e),o=this.children.get(r);return o?o.findOnPath_(Y(e),ie(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,H(),n)}foreachOnPath_(e,n,i){if(x(e))return this;{this.value&&i(n,this.value);const s=M(e),r=this.children.get(s);return r?r.foreachOnPath_(Y(e),ie(n,s),i):new X(null)}}foreach(e){this.foreach_(H(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(ie(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this.writeTree_=e}static empty(){return new pt(new X(null))}}function Ns(t,e,n){if(x(e))return new pt(new X(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=xe(s,e);return r=r.updateChild(o,n),new pt(t.writeTree_.set(s,r))}else{const s=new X(n),r=t.writeTree_.setTree(e,s);return new pt(r)}}}function Qc(t,e,n){let i=t;return Te(n,(s,r)=>{i=Ns(i,ie(e,s),r)}),i}function lf(t,e){if(x(e))return pt.empty();{const n=t.writeTree_.setTree(e,new X(null));return new pt(n)}}function Zc(t,e){return _i(t,e)!=null}function _i(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(xe(n.path,e)):null}function uf(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(se,(i,s)=>{e.push(new F(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new F(i,s.value))}),e}function wn(t,e){if(x(e))return t;{const n=_i(t,e);return n!=null?new pt(new X(n)):new pt(t.writeTree_.subtree(e))}}function el(t){return t.writeTree_.isEmpty()}function zi(t,e){return mm(H(),t.writeTree_,e)}function mm(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(_(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=mm(ie(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(ie(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(t,e){return vm(e,t)}function jk(t,e,n,i,s){_(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Ns(t.visibleWrites,e,n)),t.lastWriteId=i}function Vk(t,e,n,i){_(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=Qc(t.visibleWrites,e,n),t.lastWriteId=i}function Wk(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function qk(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);_(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&zk(a,i.path)?s=!1:Ze(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Gk(t),!0;if(i.snap)t.visibleWrites=lf(t.visibleWrites,i.path);else{const a=i.children;Te(a,c=>{t.visibleWrites=lf(t.visibleWrites,ie(i.path,c))})}return!0}else return!1}function zk(t,e){if(t.snap)return Ze(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ze(ie(t.path,n),e))return!0;return!1}function Gk(t){t.visibleWrites=_m(t.allWrites,Kk,H()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Kk(t){return t.visible}function _m(t,e,n){let i=pt.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)Ze(n,o)?(a=xe(n,o),i=Ns(i,a,r.snap)):Ze(o,n)&&(a=xe(o,n),i=Ns(i,H(),r.snap.getChild(a)));else if(r.children){if(Ze(n,o))a=xe(n,o),i=Qc(i,a,r.children);else if(Ze(o,n))if(a=xe(o,n),x(a))i=Qc(i,H(),r.children);else{const c=Hi(r.children,M(a));if(c){const l=c.getChild(Y(a));i=Ns(i,H(),l)}}}else throw es("WriteRecord should have .snap or .children")}}return i}function ym(t,e,n,i,s){if(!i&&!s){const r=_i(t.visibleWrites,e);if(r!=null)return r;{const o=wn(t.visibleWrites,e);if(el(o))return n;if(n==null&&!Zc(o,H()))return null;{const a=n||S.EMPTY_NODE;return zi(o,a)}}}else{const r=wn(t.visibleWrites,e);if(!s&&el(r))return n;if(!s&&n==null&&!Zc(r,H()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(Ze(l.path,e)||Ze(e,l.path))},a=_m(t.allWrites,o,e),c=n||S.EMPTY_NODE;return zi(a,c)}}}function Yk(t,e,n){let i=S.EMPTY_NODE;const s=_i(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(se,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=wn(t.visibleWrites,e);return n.forEachChild(se,(o,a)=>{const c=zi(wn(r,new q(o)),a);i=i.updateImmediateChild(o,c)}),uf(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=wn(t.visibleWrites,e);return uf(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Jk(t,e,n,i,s){_(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ie(e,n);if(Zc(t.visibleWrites,r))return null;{const o=wn(t.visibleWrites,r);return el(o)?s.getChild(n):zi(o,s.getChild(n))}}function Xk(t,e,n,i){const s=ie(e,n),r=_i(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=wn(t.visibleWrites,s);return zi(o,i.getNode().getImmediateChild(n))}else return null}function Qk(t,e){return _i(t.visibleWrites,e)}function Zk(t,e,n,i,s,r,o){let a;const c=wn(t.visibleWrites,e),l=_i(c,H());if(l!=null)a=l;else if(n!=null)a=zi(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function eR(){return{visibleWrites:pt.empty(),allWrites:[],lastWriteId:-1}}function bo(t,e,n,i){return ym(t.writeTree,t.treePath,e,n,i)}function cu(t,e){return Yk(t.writeTree,t.treePath,e)}function df(t,e,n,i){return Jk(t.writeTree,t.treePath,e,n,i)}function Eo(t,e){return Qk(t.writeTree,ie(t.treePath,e))}function tR(t,e,n,i,s,r){return Zk(t.writeTree,t.treePath,e,n,i,s,r)}function lu(t,e,n){return Xk(t.writeTree,t.treePath,e,n)}function wm(t,e){return vm(ie(t.treePath,e),t.writeTree)}function vm(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;_(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),_(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Ys(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ks(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Wi(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ys(i,e.snapshotNode,s.oldSnap));else throw es("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iR{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const bm=new iR;class uu{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new kn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return lu(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ii(this.viewCache_),r=tR(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sR(t){return{filter:t}}function rR(t,e){_(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function oR(t,e,n,i,s){const r=new nR;let o,a;if(n.type===lt.OVERWRITE){const l=n;l.source.fromUser?o=tl(t,e,l.path,l.snap,i,s,r):(_(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!x(l.path),o=Co(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===lt.MERGE){const l=n;l.source.fromUser?o=cR(t,e,l.path,l.children,i,s,r):(_(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=nl(t,e,l.path,l.children,i,s,a,r))}else if(n.type===lt.ACK_USER_WRITE){const l=n;l.revert?o=dR(t,e,l.path,i,s,r):o=lR(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===lt.LISTEN_COMPLETE)o=uR(t,e,n.path,i,r);else throw es("Unknown operation type: "+n.type);const c=r.getChanges();return aR(e,o,c),{viewCache:o,changes:c}}function aR(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=vo(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(pm(vo(e)))}}function Em(t,e,n,i,s,r){const o=e.eventCache;if(Eo(i,n)!=null)return e;{let a,c;if(x(n))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=ii(e),u=l instanceof S?l:S.EMPTY_NODE,d=cu(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=bo(i,ii(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=M(n);if(l===".priority"){_(In(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=df(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=Y(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=df(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=lu(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return As(e,a,o.isFullyInitialized()||x(n),t.filter.filtersNodes())}}function Co(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(x(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=M(n);if(!c.isCompleteForPath(n)&&In(n)>1)return e;const p=Y(n),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,bm,null)}const d=gm(e,l,c.isFullyInitialized()||x(n),u.filtersNodes()),h=new uu(s,d,r);return Em(t,d,n,s,h,a)}function tl(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const u=new uu(s,e,r);if(x(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=As(e,l,!0,t.filter.filtersNodes());else{const d=M(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=As(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=Y(n),f=a.getNode().getImmediateChild(d);let p;if(x(h))p=i;else{const g=u.getCompleteChild(d);g!=null?eu(h)===".priority"&&g.getChild(am(h)).isEmpty()?p=g:p=g.updateChild(h,i):p=S.EMPTY_NODE}if(f.equals(p))c=e;else{const g=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=As(e,g,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function hf(t,e){return t.eventCache.isCompleteForChild(e)}function cR(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=ie(n,c);hf(e,M(u))&&(a=tl(t,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=ie(n,c);hf(e,M(u))||(a=tl(t,a,u,l,s,r,o))}),a}function ff(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function nl(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;x(n)?l=i:l=new X(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=ff(t,f,h);c=Co(t,c,new q(d),p,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),g=ff(t,p,h);c=Co(t,c,new q(d),g,s,r,o,a)}}),c}function lR(t,e,n,i,s,r,o){if(Eo(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(x(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Co(t,e,n,c.getNode().getChild(n),s,r,a,o);if(x(n)){let l=new X(null);return c.getNode().forEachChild(Si,(u,d)=>{l=l.set(new q(u),d)}),nl(t,e,n,l,s,r,a,o)}else return e}else{let l=new X(null);return i.foreach((u,d)=>{const h=ie(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),nl(t,e,n,l,s,r,a,o)}}function uR(t,e,n,i,s){const r=e.serverCache,o=gm(e,r.getNode(),r.isFullyInitialized()||x(n),r.isFiltered());return Em(t,o,n,i,bm,s)}function dR(t,e,n,i,s,r){let o;if(Eo(i,n)!=null)return e;{const a=new uu(i,e,s),c=e.eventCache.getNode();let l;if(x(n)||M(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=bo(i,ii(e));else{const d=e.serverCache.getNode();_(d instanceof S,"serverChildren would be complete if leaf node"),u=cu(i,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=M(n);let d=lu(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,Y(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,S.EMPTY_NODE,Y(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=bo(i,ii(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Eo(i,H())!=null,As(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hR{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new su(i.getIndex()),r=Nk(i);this.processor_=sR(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(S.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(S.EMPTY_NODE,a.getNode(),null),u=new kn(c,o.isFullyInitialized(),s.filtersNodes()),d=new kn(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=ca(d,u),this.eventGenerator_=new Fk(this.query_)}get query(){return this.query_}}function fR(t){return t.viewCache_.serverCache.getNode()}function pR(t){return vo(t.viewCache_)}function gR(t,e){const n=ii(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!x(e)&&!n.getImmediateChild(M(e)).isEmpty())?n.getChild(e):null}function pf(t){return t.eventRegistrations_.length===0}function mR(t,e){t.eventRegistrations_.push(e)}function gf(t,e,n){const i=[];if(n){_(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function mf(t,e,n,i){e.type===lt.MERGE&&e.source.queryId!==null&&(_(ii(t.viewCache_),"We should always have a full cache before handling merges"),_(vo(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=oR(t.processor_,s,e,n,i);return rR(t.processor_,r.viewCache),_(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Cm(t,r.changes,r.viewCache.eventCache.getNode(),null)}function _R(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(se,(r,o)=>{i.push(Wi(r,o))}),n.isFullyInitialized()&&i.push(pm(n.getNode())),Cm(t,i,n.getNode(),e)}function Cm(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Uk(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let To;class Tm{constructor(){this.views=new Map}}function yR(t){_(!To,"__referenceConstructor has already been defined"),To=t}function wR(){return _(To,"Reference.ts has not been loaded"),To}function vR(t){return t.views.size===0}function du(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return _(r!=null,"SyncTree gave us an op for an invalid query."),mf(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(mf(o,e,n,i));return r}}function Sm(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=bo(n,s?i:null),c=!1;a?c=!0:i instanceof S?(a=cu(n,i),c=!1):(a=S.EMPTY_NODE,c=!1);const l=ca(new kn(a,c,!1),new kn(i,s,!1));return new hR(e,l)}return o}function bR(t,e,n,i,s,r){const o=Sm(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),mR(o,n),_R(o,n)}function ER(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=Rn(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(gf(l,n,i)),pf(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(gf(c,n,i)),pf(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!Rn(t)&&r.push(new(wR())(e._repo,e._path)),{removed:r,events:o}}function Im(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function vn(t,e){let n=null;for(const i of t.views.values())n=n||gR(i,e);return n}function km(t,e){if(e._queryParams.loadsAllData())return ua(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Rm(t,e){return km(t,e)!=null}function Rn(t){return ua(t)!=null}function ua(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let So;function CR(t){_(!So,"__referenceConstructor has already been defined"),So=t}function TR(){return _(So,"Reference.ts has not been loaded"),So}let SR=1;class _f{constructor(e){this.listenProvider_=e,this.syncPointTree_=new X(null),this.pendingWriteTree_=eR(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Am(t,e,n,i,s){return jk(t.pendingWriteTree_,e,n,i,s),s?os(t,new ni(ru(),e,n)):[]}function IR(t,e,n,i){Vk(t.pendingWriteTree_,e,n,i);const s=X.fromObject(n);return os(t,new qi(ru(),e,s))}function fn(t,e,n=!1){const i=Wk(t.pendingWriteTree_,e);if(qk(t.pendingWriteTree_,e)){let r=new X(null);return i.snap!=null?r=r.set(H(),!0):Te(i.children,o=>{r=r.set(new q(o),!0)}),os(t,new wo(i.path,r,n))}else return[]}function wr(t,e,n){return os(t,new ni(ou(),e,n))}function kR(t,e,n){const i=X.fromObject(n);return os(t,new qi(ou(),e,i))}function RR(t,e){return os(t,new Xs(ou(),e))}function AR(t,e,n){const i=fu(t,n);if(i){const s=pu(i),r=s.path,o=s.queryId,a=xe(r,e),c=new Xs(au(o),a);return gu(t,r,c)}else return[]}function Io(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Rm(o,e))){const c=ER(o,e,n,i);vR(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>Rn(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=LR(h);for(let p=0;p<f.length;++p){const g=f[p],m=g.query,T=Om(t,g);t.listenProvider_.startListening(Ps(m),Qs(t,m),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(Ps(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(da(h));t.listenProvider_.stopListening(Ps(h),f)}))}OR(t,l)}return a}function Nm(t,e,n,i){const s=fu(t,i);if(s!=null){const r=pu(s),o=r.path,a=r.queryId,c=xe(o,e),l=new ni(au(a),c,n);return gu(t,o,l)}else return[]}function NR(t,e,n,i){const s=fu(t,i);if(s){const r=pu(s),o=r.path,a=r.queryId,c=xe(o,e),l=X.fromObject(n),u=new qi(au(a),c,l);return gu(t,o,u)}else return[]}function il(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=xe(h,s);r=r||vn(f,p),o=o||Rn(f)});let a=t.syncPointTree_.get(s);a?(o=o||Rn(a),r=r||vn(a,H())):(a=new Tm,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=S.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,p)=>{const g=vn(p,H());g&&(r=r.updateImmediateChild(f,g))}));const l=Rm(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=da(e);_(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=DR();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=la(t.pendingWriteTree_,s);let d=bR(a,e,n,u,r,c);if(!l&&!o&&!i){const h=km(a,e);d=d.concat(MR(t,e,h))}return d}function hu(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=xe(o,e),l=vn(a,c);if(l)return l});return ym(s,e,r,n,!0)}function PR(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=xe(l,n);i=i||vn(u,d)});let s=t.syncPointTree_.get(n);s?i=i||vn(s,H()):(s=new Tm,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new kn(i,!0,!1):null,a=la(t.pendingWriteTree_,e._path),c=Sm(s,e,a,r?o.getNode():S.EMPTY_NODE,r);return pR(c)}function os(t,e){return Pm(e,t.syncPointTree_,null,la(t.pendingWriteTree_,H()))}function Pm(t,e,n,i){if(x(t.path))return Lm(t,e,n,i);{const s=e.get(H());n==null&&s!=null&&(n=vn(s,H()));let r=[];const o=M(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=wm(i,o);r=r.concat(Pm(a,c,l,u))}return s&&(r=r.concat(du(s,t,i,n))),r}}function Lm(t,e,n,i){const s=e.get(H());n==null&&s!=null&&(n=vn(s,H()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=wm(i,o),u=t.operationForChild(o);u&&(r=r.concat(Lm(u,a,c,l)))}),s&&(r=r.concat(du(s,t,i,n))),r}function Om(t,e){const n=e.query,i=Qs(t,n);return{hashFn:()=>(fR(e)||S.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?AR(t,n._path,i):RR(t,n._path);{const r=RI(s,n);return Io(t,n,null,r)}}}}function Qs(t,e){const n=da(e);return t.queryToTagMap.get(n)}function da(t){return t._path.toString()+"$"+t._queryIdentifier}function fu(t,e){return t.tagToQueryMap.get(e)}function pu(t){const e=t.indexOf("$");return _(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new q(t.substr(0,e))}}function gu(t,e,n){const i=t.syncPointTree_.get(e);_(i,"Missing sync point for query tag that we're tracking");const s=la(t.pendingWriteTree_,e);return du(i,n,s,null)}function LR(t){return t.fold((e,n,i)=>{if(n&&Rn(n))return[ua(n)];{let s=[];return n&&(s=Im(n)),Te(i,(r,o)=>{s=s.concat(o)}),s}})}function Ps(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(TR())(t._repo,t._path):t}function OR(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=da(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function DR(){return SR++}function MR(t,e,n){const i=e._path,s=Qs(t,e),r=Om(t,n),o=t.listenProvider_.startListening(Ps(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)_(!Rn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!x(l)&&u&&Rn(u))return[ua(u).query];{let h=[];return u&&(h=h.concat(Im(u).map(f=>f.query))),Te(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Ps(u),Qs(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new mu(n)}node(){return this.node_}}class _u{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ie(this.path_,e);return new _u(this.syncTree_,n)}node(){return hu(this.syncTree_,this.path_)}}const xR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},yf=function(t,e,n){if(!t||typeof t!="object")return t;if(_(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return FR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return UR(t[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},FR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:_(!1,"Unexpected server value: "+t)}},UR=function(t,e,n){t.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&_(!1,"Unexpected increment value: "+i);const s=e.node();if(_(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Dm=function(t,e,n,i){return yu(e,new _u(n,t),i)},Mm=function(t,e,n){return yu(t,new mu(e),n)};function yu(t,e,n){const i=t.getPriority().val(),s=yf(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=yf(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new ye(a,ae(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new ye(s))),o.forEachChild(se,(a,c)=>{const l=yu(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function vu(t,e){let n=e instanceof q?e:new q(e),i=t,s=M(n);for(;s!==null;){const r=Hi(i.node.children,s)||{children:{},childCount:0};i=new wu(s,i,r),n=Y(n),s=M(n)}return i}function as(t){return t.node.value}function xm(t,e){t.node.value=e,sl(t)}function Fm(t){return t.node.childCount>0}function $R(t){return as(t)===void 0&&!Fm(t)}function ha(t,e){Te(t.node.children,(n,i)=>{e(new wu(n,t,i))})}function Um(t,e,n,i){n&&e(t),ha(t,s=>{Um(s,e,!0)})}function BR(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function vr(t){return new q(t.parent===null?t.name:vr(t.parent)+"/"+t.name)}function sl(t){t.parent!==null&&HR(t.parent,t.name,t)}function HR(t,e,n){const i=$R(n),s=Lt(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,sl(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,sl(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jR=/[\[\].#$\/\u0000-\u001F\u007F]/,VR=/[\[\].#$\u0000-\u001F\u007F]/,oc=10*1024*1024,bu=function(t){return typeof t=="string"&&t.length!==0&&!jR.test(t)},$m=function(t){return typeof t=="string"&&t.length!==0&&!VR.test(t)},WR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),$m(t)},Bm=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!ra(t)||t&&typeof t=="object"&&Lt(t,".sv")},ko=function(t,e,n,i){i&&e===void 0||fa(ji(t,"value"),e,n)},fa=function(t,e,n){const i=n instanceof q?new ck(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Bn(i));if(typeof e=="function")throw new Error(t+"contains a function "+Bn(i)+" with contents = "+e.toString());if(ra(e))throw new Error(t+"contains "+e.toString()+" "+Bn(i));if(typeof e=="string"&&e.length>oc/3&&ta(e)>oc)throw new Error(t+"contains a string greater than "+oc+" utf8 bytes "+Bn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Te(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!bu(o)))throw new Error(t+" contains an invalid key ("+o+") "+Bn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);lk(i,o),fa(t,a,i),uk(i)}),s&&r)throw new Error(t+' contains ".value" child '+Bn(i)+" in addition to actual children.")}},qR=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Gs(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!bu(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ak);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&Ze(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Hm=function(t,e,n,i){const s=ji(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Te(e,(o,a)=>{const c=new q(o);if(fa(s,a,ie(n,c)),eu(c)===".priority"&&!Bm(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),qR(s,r)},zR=function(t,e,n){if(ra(e))throw new Error(ji(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Bm(e))throw new Error(ji(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Eu=function(t,e,n,i){if(!$m(n))throw new Error(ji(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},GR=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Eu(t,e,n)},pn=function(t,e){if(M(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},KR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!bu(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!WR(n))throw new Error(ji(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function pa(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!tu(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function jm(t,e,n){pa(t,n),Vm(t,i=>tu(i,e))}function st(t,e,n){pa(t,n),Vm(t,i=>Ze(i,e)||Ze(e,i))}function Vm(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(JR(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function JR(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();ks&&ve("event: "+n.toString()),ss(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XR="repo_interrupt",QR=25;class ZR{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new YR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=yo(),this.transactionQueueTree_=new wu,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function eA(t,e,n){if(t.stats_=Ql(t.repoInfo_),t.forceRestClient_||LI())t.server_=new _o(t.repoInfo_,(i,s,r,o)=>{wf(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>vf(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ge(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new qt(t.repoInfo_,e,(i,s,r,o)=>{wf(t,i,s,r,o)},i=>{vf(t,i)},i=>{tA(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=FI(t.repoInfo_,()=>new xk(t.stats_,t.server_)),t.infoData_=new Pk,t.infoSyncTree_=new _f({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=wr(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Cu(t,"connected",!1),t.serverSyncTree_=new _f({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);st(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function Wm(t){const n=t.infoData_.getNode(new q(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ga(t){return xR({timestamp:Wm(t)})}function wf(t,e,n,i,s){t.dataUpdateCount++;const r=new q(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=ho(n,l=>ae(l));o=NR(t.serverSyncTree_,r,c,s)}else{const c=ae(n);o=Nm(t.serverSyncTree_,r,c,s)}else if(i){const c=ho(n,l=>ae(l));o=kR(t.serverSyncTree_,r,c)}else{const c=ae(n);o=wr(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=Gi(t,r)),st(t.eventQueue_,a,o)}function vf(t,e){Cu(t,"connected",e),e===!1&&rA(t)}function tA(t,e){Te(e,(n,i)=>{Cu(t,n,i)})}function Cu(t,e,n){const i=new q("/.info/"+e),s=ae(n);t.infoData_.updateSnapshot(i,s);const r=wr(t.infoSyncTree_,i,s);st(t.eventQueue_,i,r)}function Tu(t){return t.nextWriteId_++}function nA(t,e,n){const i=PR(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=ae(s).withIndex(e._queryParams.getIndex());il(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=wr(t.serverSyncTree_,e._path,r);else{const a=Qs(t.serverSyncTree_,e);o=Nm(t.serverSyncTree_,e._path,r,a)}return st(t.eventQueue_,e._path,o),Io(t.serverSyncTree_,e,n,null,!0),r},s=>(br(t,"get for query "+ge(e)+" failed: "+s),Promise.reject(new Error(s))))}function iA(t,e,n,i,s){br(t,"set",{path:e.toString(),value:n,priority:i});const r=ga(t),o=ae(n,i),a=hu(t.serverSyncTree_,e),c=Mm(o,a,r),l=Tu(t),u=Am(t.serverSyncTree_,e,c,l,!0);pa(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||$e("set at "+e+" failed: "+h);const g=fn(t.serverSyncTree_,l,!p);st(t.eventQueue_,e,g),An(t,s,h,f)});const d=Iu(t,e);Gi(t,d),st(t.eventQueue_,d,[])}function sA(t,e,n,i){br(t,"update",{path:e.toString(),value:n});let s=!0;const r=ga(t),o={};if(Te(n,(a,c)=>{s=!1,o[a]=Dm(ie(e,a),ae(c),t.serverSyncTree_,r)}),s)ve("update() called with empty data.  Don't do anything."),An(t,i,"ok",void 0);else{const a=Tu(t),c=IR(t.serverSyncTree_,e,o,a);pa(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||$e("update at "+e+" failed: "+l);const h=fn(t.serverSyncTree_,a,!d),f=h.length>0?Gi(t,e):e;st(t.eventQueue_,f,h),An(t,i,l,u)}),Te(n,l=>{const u=Iu(t,ie(e,l));Gi(t,u)}),st(t.eventQueue_,e,[])}}function rA(t){br(t,"onDisconnectEvents");const e=ga(t),n=yo();Xc(t.onDisconnect_,H(),(s,r)=>{const o=Dm(s,r,t.serverSyncTree_,e);rs(n,s,o)});let i=[];Xc(n,H(),(s,r)=>{i=i.concat(wr(t.serverSyncTree_,s,r));const o=Iu(t,s);Gi(t,o)}),t.onDisconnect_=yo(),st(t.eventQueue_,H(),i)}function oA(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Jc(t.onDisconnect_,e),An(t,n,i,s)})}function bf(t,e,n,i){const s=ae(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&rs(t.onDisconnect_,e,s),An(t,i,r,o)})}function aA(t,e,n,i,s){const r=ae(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&rs(t.onDisconnect_,e,r),An(t,s,o,a)})}function cA(t,e,n,i){if(uo(n)){ve("onDisconnect().update() called with empty data.  Don't do anything."),An(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&Te(n,(o,a)=>{const c=ae(a);rs(t.onDisconnect_,ie(e,o),c)}),An(t,i,s,r)})}function lA(t,e,n){let i;M(e._path)===".info"?i=il(t.infoSyncTree_,e,n):i=il(t.serverSyncTree_,e,n),jm(t.eventQueue_,e._path,i)}function qm(t,e,n){let i;M(e._path)===".info"?i=Io(t.infoSyncTree_,e,n):i=Io(t.serverSyncTree_,e,n),jm(t.eventQueue_,e._path,i)}function uA(t){t.persistentConnection_&&t.persistentConnection_.interrupt(XR)}function br(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ve(n,...e)}function An(t,e,n,i){e&&ss(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function zm(t,e,n){return hu(t.serverSyncTree_,e,n)||S.EMPTY_NODE}function Su(t,e=t.transactionQueueTree_){if(e||ma(t,e),as(e)){const n=Km(t,e);_(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&dA(t,vr(e),n)}else Fm(e)&&ha(e,n=>{Su(t,n)})}function dA(t,e,n){const i=n.map(l=>l.currentWriteId),s=zm(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const u=n[l];_(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=xe(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{br(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(fn(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();ma(t,vu(t.transactionQueueTree_,e)),Su(t,t.transactionQueueTree_),st(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)ss(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{$e("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Gi(t,e)}},o)}function Gi(t,e){const n=Gm(t,e),i=vr(n),s=Km(t,n);return hA(t,s,i),i}function hA(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=xe(n,c.path);let u=!1,d;if(_(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(fn(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=QR)u=!0,d="maxretry",s=s.concat(fn(t.serverSyncTree_,c.currentWriteId,!0));else{const h=zm(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){fa("transaction failed: Data returned ",f,c.path);let p=ae(f);typeof f=="object"&&f!=null&&Lt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,T=ga(t),L=Mm(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=L,c.currentWriteId=Tu(t),o.splice(o.indexOf(m),1),s=s.concat(Am(t.serverSyncTree_,c.path,L,c.currentWriteId,c.applyLocally)),s=s.concat(fn(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",s=s.concat(fn(t.serverSyncTree_,c.currentWriteId,!0))}st(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}ma(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)ss(i[a]);Su(t,t.transactionQueueTree_)}function Gm(t,e){let n,i=t.transactionQueueTree_;for(n=M(e);n!==null&&as(i)===void 0;)i=vu(i,n),e=Y(e),n=M(e);return i}function Km(t,e){const n=[];return Ym(t,e,n),n.sort((i,s)=>i.order-s.order),n}function Ym(t,e,n){const i=as(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);ha(e,s=>{Ym(t,s,n)})}function ma(t,e){const n=as(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,xm(e,n.length>0?n:void 0)}ha(e,i=>{ma(t,i)})}function Iu(t,e){const n=vr(Gm(t,e)),i=vu(t.transactionQueueTree_,e);return BR(i,s=>{ac(t,s)}),ac(t,i),Um(i,s=>{ac(t,s)}),n}function ac(t,e){const n=as(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(_(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(_(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(fn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?xm(e,void 0):n.length=r+1,st(t.eventQueue_,vr(e),s);for(let o=0;o<i.length;o++)ss(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fA(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function pA(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):$e(`Invalid query segment '${n}' in query '${t}'`)}return e}const Ef=function(t,e){const n=gA(t),i=n.namespace;n.domain==="firebase.com"&&Kt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Kt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||CI();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Qg(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new q(n.pathString)}},gA=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=fA(t.substring(u,d)));const h=pA(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",mA=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Cf.charAt(n%64),n=Math.floor(n/64);_(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Cf.charAt(e[s]);return _(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ge(this.snapshot.exportVal())}}class Xm{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Qm{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new He;return oA(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){pn("OnDisconnect.remove",this._path);const e=new He;return bf(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){pn("OnDisconnect.set",this._path),ko("OnDisconnect.set",e,this._path,!1);const n=new He;return bf(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){pn("OnDisconnect.setWithPriority",this._path),ko("OnDisconnect.setWithPriority",e,this._path,!1),zR("OnDisconnect.setWithPriority",n);const i=new He;return aA(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){pn("OnDisconnect.update",this._path),Hm("OnDisconnect.update",e,this._path);const n=new He;return cA(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return x(this._path)?null:eu(this._path)}get ref(){return new wt(this._repo,this._path)}get _queryIdentifier(){const e=af(this._queryParams),n=Jl(e);return n==="{}"?"default":n}get _queryObject(){return af(this._queryParams)}isEqual(e){if(e=re(e),!(e instanceof _a))return!1;const n=this._repo===e._repo,i=tu(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+ok(this._path)}}class wt extends _a{constructor(e,n){super(e,n,new aa,!1)}get parent(){const e=am(this._path);return e===null?null:new wt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class si{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new q(e),i=ri(this.ref,e);return new si(this._node.getChild(n),i,se)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new si(s,ri(this.ref,i),se)))}hasChild(e){const n=new q(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function b(t,e){return t=re(t),t._checkNotDeleted("ref"),e!==void 0?ri(t._root,e):t._root}function ri(t,e){return t=re(t),M(t._path)===null?GR("child","path",e):Eu("child","path",e),new wt(t._repo,ie(t._path,e))}function Zm(t){return t=re(t),new Qm(t._repo,t._path)}function Zs(t,e){t=re(t),pn("push",t._path),ko("push",e,t._path,!0);const n=Wm(t._repo),i=mA(n),s=ri(t,i),r=ri(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Je(t){return pn("remove",t._path),ee(t,null)}function ee(t,e){t=re(t),pn("set",t._path),ko("set",e,t._path,!1);const n=new He;return iA(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function bn(t,e){Hm("update",e,t._path);const n=new He;return sA(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Pe(t){t=re(t);const e=new ku(()=>{}),n=new Er(e);return nA(t._repo,t,n).then(i=>new si(i,new wt(t._repo,t._path),t._queryParams.getIndex()))}class Er{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Jm("value",this,new si(e.snapshotNode,new wt(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Xm(this,e,n):null}matches(e){return e instanceof Er?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ya{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Xm(this,e,n):null}createEvent(e,n){_(e.childName!=null,"Child events should have a childName.");const i=ri(new wt(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new Jm(e.type,this,new si(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ya?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function wa(t,e,n,i,s){const r=new ku(n,void 0),o=e==="value"?new Er(r):new ya(e,r);return lA(t._repo,t,o),()=>qm(t._repo,t,o)}function Ru(t,e,n,i){return wa(t,"value",e)}function Ki(t,e,n,i){return wa(t,"child_added",e)}function rl(t,e,n,i){return wa(t,"child_changed",e)}function e_(t,e,n,i){return wa(t,"child_removed",e)}function ut(t,e,n){let i=null;const s=n?new ku(n):null;e==="value"?i=new Er(s):e&&(i=new ya(e,s)),qm(t._repo,t,i)}yR(wt);CR(wt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _A="FIREBASE_DATABASE_EMULATOR_HOST",ol={};let yA=!1;function wA(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=ts(r);t.repoInfo_=new Qg(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function t_(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Kt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ve("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Ef(r,s),a=o.repoInfo,c;typeof process<"u"&&jh&&(c=jh[_A]),c?(r=`http://${c}?ns=${a.namespace}`,o=Ef(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new DI(t.name,t.options,e);KR("Invalid Firebase Database URL",o),x(o.path)||Kt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=bA(a,t,l,new OI(t,n));return new n_(u,t)}function vA(t,e){const n=ol[e];(!n||n[t.key]!==t)&&Kt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),uA(t),delete n[t.key]}function bA(t,e,n,i){let s=ol[e.name];s||(s={},ol[e.name]=s);let r=s[t.toURLString()];return r&&Kt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new ZR(t,yA,n,i),s[t.toURLString()]=r,r}class n_{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(eA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new wt(this._repo,H())),this._rootInternal}_delete(){return this._rootInternal!==null&&(vA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Kt("Cannot call "+e+" on a deleted database.")}}function i_(t=sa(),e){const n=Dn(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=HT("database");i&&s_(n,...i)}return n}function s_(t,e,n,i={}){t=re(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&ei(i,r.repoInfo_.emulatorOptions))return;Kt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Kt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Yr(Yr.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:jT(i.mockUserToken,t.app.options.projectId);o=new Yr(a)}ts(e)&&(kg(e),Rg("Database",!0)),wA(r,s,i,o)}/**
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
 */function EA(t){Ug(is),it(new Ye("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return t_(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),Ge(Vh,Wh,t),Ge(Vh,Wh,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CA={".sv":"timestamp"};function Gn(){return CA}qt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};qt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};EA();const r_=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:si,Database:n_,OnDisconnect:Qm,_QueryImpl:_a,_QueryParams:aa,_ReferenceImpl:wt,_repoManagerDatabaseFromApp:t_,_setSDKVersion:Ug,_validatePathString:Eu,_validateWritablePath:pn,child:ri,connectDatabaseEmulator:s_,get:Pe,getDatabase:i_,off:ut,onChildAdded:Ki,onChildChanged:rl,onChildRemoved:e_,onDisconnect:Zm,onValue:Ru,push:Zs,ref:b,remove:Je,serverTimestamp:Gn,set:ee,update:bn},Symbol.toStringTag,{value:"Module"}));var TA="firebase",SA="12.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ge(TA,SA,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al=new Map,o_={activated:!1,tokenObservers:[]},IA={initialized:!1,enabled:!1};function me(t){return al.get(t)||{...o_}}function kA(t,e){return al.set(t,e),al.get(t)}function va(){return IA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_="https://content-firebaseappcheck.googleapis.com/v1",RA="exchangeRecaptchaEnterpriseToken",AA="exchangeDebugToken",Tf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},NA=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(e,n,i,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new He,this.pending.promise.catch(n=>{}),await LA(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new He,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function LA(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OA={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Ve=new On("appCheck","AppCheck",OA);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Au(t){if(!me(t).activated)throw Ve.create("use-before-activation",{appName:t.name})}function c_(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-i*3600)/60),r=e-n*3600*24-i*3600-s*60;let o="";return n&&(o+=Ur(n)+"d:"),i&&(o+=Ur(i)+"h:"),o+=Ur(s)+"m:"+Ur(r)+"s",o}function Ur(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nu({url:t,body:e},n){const i={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const r={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,r)}catch(d){throw Ve.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Ve.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Ve.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Ve.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function DA(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${a_}/projects/${n}/apps/${i}:${RA}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function l_(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${a_}/projects/${n}/apps/${i}:${AA}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MA="firebase-app-check-database",xA=1,er="firebase-app-check-store",u_="debug-token";let $r=null;function d_(){return $r||($r=new Promise((t,e)=>{try{const n=indexedDB.open(MA,xA);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(Ve.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore(er,{keyPath:"compositeKey"})}}}catch(n){e(Ve.create("storage-open",{originalErrorMessage:n?.message}))}}),$r)}function FA(t){return f_(p_(t))}function UA(t,e){return h_(p_(t),e)}function $A(t){return h_(u_,t)}function BA(){return f_(u_)}async function h_(t,e){const i=(await d_()).transaction(er,"readwrite"),r=i.objectStore(er).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},i.onerror=c=>{a(Ve.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function f_(t){const n=(await d_()).transaction(er,"readonly"),s=n.objectStore(er).get(t);return new Promise((r,o)=>{s.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{o(Ve.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function p_(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new na("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HA(t){if(ea()){let e;try{e=await FA(t)}catch(n){gn.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function cc(t,e){return ea()?UA(t,e).catch(n=>{gn.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function jA(){let t;try{t=await BA()}catch{}if(t)return t;{const e=crypto.randomUUID();return $A(e).catch(n=>gn.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(){return va().enabled}async function Lu(){const t=va();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function VA(){const t=Cg(),e=va();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new He;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(jA())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WA={error:"UNKNOWN_ERROR"};function qA(t){return Zo.encodeString(JSON.stringify(t),!1)}async function cl(t,e=!1,n=!1){const i=t.app;Au(i);const s=me(i);let r=s.token,o;if(r&&!Ci(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(Ci(l)?r=l:await cc(i,void 0))}if(!e&&r&&Ci(r))return{token:r.token};let a=!1;if(Pu())try{s.exchangeTokenPromise||(s.exchangeTokenPromise=Nu(l_(i,await Lu()),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const l=await s.exchangeTokenPromise;return await cc(i,l),s.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?gn.warn(l.message):n&&gn.error(l),lc(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),r=await me(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?gn.warn(l.message):n&&gn.error(l),o=l}let c;return r?o?Ci(r)?c={token:r.token,internalError:o}:c=lc(o):(c={token:r.token},s.token=r,await cc(i,r)):c=lc(o),a&&__(i,c),c}async function zA(t){const e=t.app;Au(e);const{provider:n}=me(e);if(Pu()){const i=await Lu(),{token:s}=await Nu(l_(e,i),t.heartbeatServiceProvider);return{token:s}}else{const{token:i}=await n.getToken();return{token:i}}}function g_(t,e,n,i){const{app:s}=t,r=me(s),o={next:n,error:i,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&Ci(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),If(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>If(t))}function m_(t,e){const n=me(t),i=n.tokenObservers.filter(s=>s.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function If(t){const{app:e}=t,n=me(e);let i=n.tokenRefresher;i||(i=GA(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function GA(t){const{app:e}=t;return new PA(async()=>{const n=me(e);let i;if(n.token?i=await cl(t,!0):i=await cl(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=me(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},Tf.RETRIAL_MIN_WAIT,Tf.RETRIAL_MAX_WAIT)}function __(t,e){const n=me(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function Ci(t){return t.expireTimeMillis-Date.now()>0}function lc(t){return{token:qA(WA),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KA{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=me(this.app);for(const n of e)m_(this.app,n.next);return Promise.resolve()}}function YA(t,e){return new KA(t,e)}function JA(t){return{getToken:e=>cl(t,e),getLimitedUseToken:()=>zA(t),addTokenListener:e=>g_(t,"INTERNAL",e),removeTokenListener:e=>m_(t.app,e)}}const XA="@firebase/app-check",QA="0.11.0",ZA="https://www.google.com/recaptcha/enterprise.js";function eN(t,e){const n=new He,i=me(t);i.reCAPTCHAState={initialized:n};const s=tN(t),r=Sf(!0);return r?kf(t,e,r,s,n):sN(()=>{const o=Sf(!0);if(!o)throw new Error("no recaptcha");kf(t,e,o,s,n)}),n.promise}function kf(t,e,n,i,s){n.ready(()=>{iN(t,e,n,i),s.resolve(n)})}function tN(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function nN(t){Au(t);const n=await me(t).reCAPTCHAState.initialized.promise;return new Promise((i,s)=>{const r=me(t).reCAPTCHAState;n.ready(()=>{i(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function iN(t,e,n,i){const s=n.render(i,{sitekey:e,size:"invisible",callback:()=>{me(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{me(t).reCAPTCHAState.succeeded=!1}}),r=me(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:s}}function sN(t){const e=document.createElement("script");e.src=ZA,e.onload=t,document.head.appendChild(e)}class Ou{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){oN(this._throttleData);const e=await nN(this._app).catch(i=>{throw Ve.create("recaptcha-error")});if(!me(this._app).reCAPTCHAState?.succeeded)throw Ve.create("recaptcha-error");let n;try{n=await Nu(DA(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=rN(Number(i.customData?.httpStatus),this._throttleData),Ve.create("initial-throttle",{time:c_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Dn(e,"heartbeat"),eN(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Ou?this._siteKey===e._siteKey:!1}}function rN(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+NA,httpStatus:t};{const n=e?e.backoffCount:0,i=uS(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function oN(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Ve.create("throttled",{time:c_(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aN(t=sa(),e){t=re(t);const n=Dn(t,"app-check");if(va().initialized||VA(),Pu()&&Lu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return s;throw Ve.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return cN(t,e.provider,e.isTokenAutoRefreshEnabled),me(t).isTokenAutoRefreshEnabled&&g_(i,"INTERNAL",()=>{}),i}function cN(t,e,n=!1){const i=kA(t,{...o_});i.activated=!0,i.provider=e,i.cachedTokenPromise=HA(t).then(s=>(s&&Ci(s)&&(i.token=s,__(t,{token:s.token})),s)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&gn.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const lN="app-check",Rf="app-check-internal";function uN(){it(new Ye(lN,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return YA(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Rf).initialize()})),it(new Ye(Rf,t=>{const e=t.getProvider("app-check").getImmediate();return JA(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ge(XA,QA)}uN();const dN={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},ba=Dg(dN),hN="BIk-HpbCt3Vn7GtQtnFfv0h-hvj_2moy04xGYbmXoqH-AsfQVtiTyxl-QZG1plpYHUysu3yaK7jm1wE0OC6Byys",Af="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let ll;if(Af.trim()!=="")ll=new Ou(Af),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(ll)try{aN(ba,{provider:ll,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const E=i_(ba),dt=[];function an(t,e,n,i=null,s=null,r=null){e==="value"?Ru(t,n):e==="child_added"?Ki(t,n):e==="child_removed"?e_(t,n):console.warn(`Unknown listener type: ${e}`),dt.push({ref:t,type:e,callback:n,roomId:i,userId:s,category:r})}function y_(){dt.forEach(({ref:t,type:e,callback:n})=>{try{ut(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),dt.length=0}function Cr(t){if(!t)return;dt.filter(i=>i.roomId===t).forEach(({ref:i,type:s,callback:r})=>{try{ut(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=dt.filter(i=>i.roomId!==t);dt.length=0,dt.push(...n)}function w_(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;dt.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{ut(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const s=dt.filter(r=>!n(r));dt.length=0,dt.push(...s)}function Ii(t,e,n=null){an(t,"value",e,n)}const on=t=>b(E,`rooms/${t}`),Ts=t=>b(E,`rooms/${t}/members`),ul=(t,e)=>b(E,`rooms/${t}/members/${e}`),v_=t=>b(E,`rooms/${t}/cancellation`),Tr=t=>b(E,`rooms/${t}/watch`),Sr=t=>b(E,`rooms/${t}/watch/fileRequest`),b_=t=>b(E,`users/${t}/recentCalls`),Ea=(t,e)=>b(E,`users/${t}/recentCalls/${e}`),Du=t=>b(E,`users/${t}/outgoingCall`),Mu=t=>b(E,`rooms/${t}/offerCandidates`),xu=t=>b(E,`rooms/${t}/answerCandidates`),fN=Object.freeze(Object.defineProperty({__proto__:null,addRTDBListener:an,getAnswerCandidatesRef:xu,getOfferCandidatesRef:Mu,getRoomCancellationRef:v_,getRoomMemberRef:ul,getRoomMembersRef:Ts,getRoomRef:on,getUserOutgoingCallRef:Du,getUserRecentCallRef:Ea,getUserRecentCallsRef:b_,getWatchRef:Tr,getWatchRequestRef:Sr,onDataChange:Ii,removeAllRTDBListeners:y_,removeRTDBListenersForRoom:Cr,removeRTDBListenersForUser:w_,rtdb:E},Symbol.toStringTag,{value:"Module"}));function E_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const pN=E_,C_=new On("auth","Firebase",E_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro=new na("@firebase/auth");function gN(t,...e){Ro.logLevel<=z.WARN&&Ro.warn(`Auth (${is}): ${t}`,...e)}function Jr(t,...e){Ro.logLevel<=z.ERROR&&Ro.error(`Auth (${is}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(t,...e){throw Uu(t,...e)}function gt(t,...e){return Uu(t,...e)}function Fu(t,e,n){const i={...pN(),[e]:n};return new On("auth","Firebase",i).create(e,{appName:t.name})}function Kn(t){return Fu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function mN(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&Pt(t,"argument-error"),Fu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Uu(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return C_.create(t,...e)}function k(t,e,...n){if(!t)throw Uu(e,...n)}function Ut(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Jr(e),new Error(e)}function Yt(t,e){t||Ut(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(){return typeof self<"u"&&self.location?.href||""}function _N(){return Nf()==="http:"||Nf()==="https:"}function Nf(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yN(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_N()||zT()||"connection"in navigator)?navigator.onLine:!0}function wN(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,n){this.shortDelay=e,this.longDelay=n,Yt(n>e,"Short delay should be less than long delay!"),this.isMobile=Kl()||Ag()}get(){return yN()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(t,e){Yt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ut("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ut("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ut("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vN={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bN=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],EN=new Ir(3e4,6e4);function Bu(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function cs(t,e,n,i,s={}){return S_(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=ns({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return qT()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&ts(t.emulatorConfig.host)&&(l.credentials="include"),T_.fetch()(await I_(t,t.config.apiHost,n,a),l)})}async function S_(t,e,n){t._canInitEmulator=!1;const i={...vN,...e};try{const s=new TN(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Br(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Br(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Br(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Br(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Fu(t,u,l);Pt(t,u)}}catch(s){if(s instanceof en)throw s;Pt(t,"network-request-failed",{message:String(s)})}}async function CN(t,e,n,i,s={}){const r=await cs(t,e,n,i,s);return"mfaPendingCredential"in r&&Pt(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function I_(t,e,n,i){const s=`${e}${n}?${i}`,r=t,o=r.config.emulator?$u(t.config,s):`${t.config.apiScheme}://${s}`;return bN.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class TN{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(gt(this.auth,"network-request-failed")),EN.get())})}}function Br(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=gt(t,e,i);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SN(t,e){return cs(t,"POST","/v1/accounts:delete",e)}async function Ao(t,e){return cs(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function IN(t,e=!1){const n=re(t),i=await n.getIdToken(e),s=Hu(i);k(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Ls(uc(s.auth_time)),issuedAtTime:Ls(uc(s.iat)),expirationTime:Ls(uc(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function uc(t){return Number(t)*1e3}function Hu(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Jr("JWT malformed, contained fewer than 3 sections"),null;try{const s=lo(n);return s?JSON.parse(s):(Jr("Failed to decode base64 JWT payload"),null)}catch(s){return Jr("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Pf(t){const e=Hu(t);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof en&&kN(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function kN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ls(this.lastLoginAt),this.creationTime=Ls(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function No(t){const e=t.auth,n=await t.getIdToken(),i=await tr(t,Ao(e,{idToken:n}));k(i?.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const r=s.providerUserInfo?.length?k_(s.providerUserInfo):[],o=NN(t.providerData,r),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new hl(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function AN(t){const e=re(t);await No(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function NN(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function k_(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PN(t,e){const n=await S_(t,{},async()=>{const i=ns({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=await I_(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&ts(t.emulatorConfig.host)&&(c.credentials="include"),T_.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function LN(t,e){return cs(t,"POST","/v2/accounts:revokeToken",Bu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Pf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){k(e.length!==0,"internal-error");const n=Pf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await PN(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new ki;return i&&(k(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(k(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(k(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ki,this.toJSON())}_performRefresh(){return Ut("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t,e){k(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ht{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new RN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new hl(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await tr(this,this.stsTokenManager.getToken(this.auth,e));return k(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return IN(this,e)}reload(){return AN(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ht({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await No(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ot(this.auth.app))return Promise.reject(Kn(this.auth));const e=await this.getIdToken();return await tr(this,SN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:g}=n;k(d&&g,e,"internal-error");const m=ki.fromJSON(this.name,g);k(typeof d=="string",e,"internal-error"),rn(i,e.name),rn(s,e.name),k(typeof h=="boolean",e,"internal-error"),k(typeof f=="boolean",e,"internal-error"),rn(r,e.name),rn(o,e.name),rn(a,e.name),rn(c,e.name),rn(l,e.name),rn(u,e.name);const T=new ht({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(L=>({...L}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,i=!1){const s=new ki;s.updateFromServerResponse(n);const r=new ht({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await No(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];k(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?k_(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new ki;a.updateFromIdToken(i);const c=new ht({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new hl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf=new Map;function $t(t){Yt(t instanceof Function,"Expected a class definition");let e=Lf.get(t);return e?(Yt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Lf.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}R_.type="NONE";const fl=R_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xr(t,e,n){return`firebase:${t}:${e}:${n}`}class Ri{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Xr(this.userKey,s.apiKey,r),this.fullPersistenceKey=Xr("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ao(this.auth,{idToken:e}).catch(()=>{});return n?ht._fromGetAccountInfoResponse(this.auth,n,e):null}return ht._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Ri($t(fl),e,i);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||$t(fl);const o=Xr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Ao(e,{idToken:u}).catch(()=>{});if(!h)break;d=await ht._fromGetAccountInfoResponse(e,h,u)}else d=ht._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Ri(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Ri(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Of(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(L_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(A_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(D_(e))return"Blackberry";if(M_(e))return"Webos";if(N_(e))return"Safari";if((e.includes("chrome/")||P_(e))&&!e.includes("edge/"))return"Chrome";if(O_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function A_(t=Be()){return/firefox\//i.test(t)}function N_(t=Be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function P_(t=Be()){return/crios\//i.test(t)}function L_(t=Be()){return/iemobile/i.test(t)}function O_(t=Be()){return/android/i.test(t)}function D_(t=Be()){return/blackberry/i.test(t)}function M_(t=Be()){return/webos/i.test(t)}function ju(t=Be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ON(t=Be()){return ju(t)&&!!window.navigator?.standalone}function DN(){return GT()&&document.documentMode===10}function x_(t=Be()){return ju(t)||O_(t)||M_(t)||D_(t)||/windows phone/i.test(t)||L_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F_(t,e=[]){let n;switch(t){case"Browser":n=Of(Be());break;case"Worker":n=`${Of(Be())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${is}/${i}`}/**
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
 */class MN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function xN(t,e={}){return cs(t,"GET","/v2/passwordPolicy",Bu(t,e))}/**
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
 */const FN=6;class UN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??FN,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $N{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Df(this),this.idTokenSubscription=new Df(this),this.beforeStateQueue=new MN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=C_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=$t(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ri.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ao(this,{idToken:e}),i=await ht._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ot(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await No(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=wN()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ot(this.app))return Promise.reject(Kn(this));const n=e?re(e):null;return n&&k(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ot(this.app)?Promise.reject(Kn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ot(this.app)?Promise.reject(Kn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence($t(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await xN(this),n=new UN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new On("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await LN(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&$t(e)||this._popupRedirectResolver;k(n,this,"argument-error"),this.redirectPersistenceManager=await Ri.create(this,[$t(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=F_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(ot(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&gN(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ls(t){return re(t)}class Df{constructor(e){this.auth=e,this.observer=null,this.addObserver=nS(n=>this.observer=n)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function BN(t){Vu=t}function HN(t){return Vu.loadJS(t)}function jN(){return Vu.gapiScript}function VN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WN(t,e){const n=Dn(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(ei(r,e??{}))return s;Pt(s,"already-initialized")}return n.initialize({options:e})}function qN(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map($t);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function zN(t,e,n){const i=ls(t);k(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=U_(e),{host:o,port:a}=GN(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){k(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),k(ei(l,i.config.emulator)&&ei(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,ts(o)?(kg(`${r}//${o}${c}`),Rg("Auth",!0)):KN()}function U_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function GN(t){const e=U_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Mf(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Mf(o)}}}function Mf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function KN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ut("not implemented")}_getIdTokenResponse(e){return Ut("not implemented")}_linkToIdToken(e,n){return Ut("not implemented")}_getReauthenticationResolver(e){return Ut("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ai(t,e){return CN(t,"POST","/v1/accounts:signInWithIdp",Bu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YN="http://localhost";class oi extends $_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new oi(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Pt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=n;if(!i||!s)return null;const o=new oi(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ai(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Ai(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ai(e,n)}buildRequest(){const e={requestUri:YN,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ns(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr extends Wu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn extends kr{constructor(){super("facebook.com")}static credential(e){return oi._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return cn.credential(e.oauthAccessToken)}catch{return null}}}cn.FACEBOOK_SIGN_IN_METHOD="facebook.com";cn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends kr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return oi._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return kt.credential(n,i)}catch{return null}}}kt.GOOGLE_SIGN_IN_METHOD="google.com";kt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends kr{constructor(){super("github.com")}static credential(e){return oi._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ln.credential(e.oauthAccessToken)}catch{return null}}}ln.GITHUB_SIGN_IN_METHOD="github.com";ln.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends kr{constructor(){super("twitter.com")}static credential(e,n){return oi._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return un.credential(n,i)}catch{return null}}}un.TWITTER_SIGN_IN_METHOD="twitter.com";un.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await ht._fromIdTokenResponse(e,i,s),o=xf(i);return new Yi({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=xf(i);return new Yi({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function xf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po extends en{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Po.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new Po(e,n,i,s)}}function B_(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Po._fromErrorAndOperation(t,r,e,i):r})}async function JN(t,e,n=!1){const i=await tr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Yi._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XN(t,e,n=!1){const{auth:i}=t;if(ot(i.app))return Promise.reject(Kn(i));const s="reauthenticate";try{const r=await tr(t,B_(i,s,e,t),n);k(r.idToken,i,"internal-error");const o=Hu(r.idToken);k(o,i,"internal-error");const{sub:a}=o;return k(t.uid===a,i,"user-mismatch"),Yi._forOperation(t,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&Pt(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H_(t,e,n=!1){if(ot(t.app))return Promise.reject(Kn(t));const i="signIn",s=await B_(t,i,e),r=await Yi._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function QN(t,e){return H_(ls(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(t,e){return re(t).setPersistence(e)}function ZN(t,e,n,i){return re(t).onIdTokenChanged(e,n,i)}function eP(t,e,n){return re(t).beforeAuthStateChanged(e,n)}function j_(t,e,n,i){return re(t).onAuthStateChanged(e,n,i)}function tP(t){return re(t).signOut()}async function nP(t){return re(t).delete()}const Lo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Lo,"1"),this.storage.removeItem(Lo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iP=1e3,sP=10;class W_ extends V_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=x_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);DN()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,sP):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},iP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}W_.type="LOCAL";const q_=W_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_ extends V_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}z_.type="SESSION";const G_=z_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rP(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new Ca(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await rP(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ca.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qu(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oP{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=qu("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(){return window}function aP(t){At().location.href=t}/**
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
 */function K_(){return typeof At().WorkerGlobalScope<"u"&&typeof At().importScripts=="function"}async function cP(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function lP(){return navigator?.serviceWorker?.controller||null}function uP(){return K_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_="firebaseLocalStorageDb",dP=1,Oo="firebaseLocalStorage",J_="fbase_key";class Rr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ta(t,e){return t.transaction([Oo],e?"readwrite":"readonly").objectStore(Oo)}function hP(){const t=indexedDB.deleteDatabase(Y_);return new Rr(t).toPromise()}function pl(){const t=indexedDB.open(Y_,dP);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(Oo,{keyPath:J_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(Oo)?e(i):(i.close(),await hP(),e(await pl()))})})}async function Ff(t,e,n){const i=Ta(t,!0).put({[J_]:e,value:n});return new Rr(i).toPromise()}async function fP(t,e){const n=Ta(t,!1).get(e),i=await new Rr(n).toPromise();return i===void 0?null:i.value}function Uf(t,e){const n=Ta(t,!0).delete(e);return new Rr(n).toPromise()}const pP=800,gP=3;class X_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await pl(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>gP)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return K_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ca._getInstance(uP()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await cP(),!this.activeServiceWorker)return;this.sender=new oP(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||lP()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await pl();return await Ff(e,Lo,"1"),await Uf(e,Lo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ff(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>fP(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Uf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Ta(s,!1).getAll();return new Rr(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),pP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}X_.type="LOCAL";const Q_=X_;new Ir(3e4,6e4);/**
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
 */function Z_(t,e){return e?$t(e):(k(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu extends $_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ai(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ai(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ai(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function mP(t){return H_(t.auth,new zu(t),t.bypassAuthState)}function _P(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),XN(n,new zu(t),t.bypassAuthState)}async function yP(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),JN(n,new zu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return mP;case"linkViaPopup":case"linkViaRedirect":return yP;case"reauthViaPopup":case"reauthViaRedirect":return _P;default:Pt(this.auth,"internal-error")}}resolve(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wP=new Ir(2e3,1e4);async function vP(t,e,n){if(ot(t.app))return Promise.reject(gt(t,"operation-not-supported-in-this-environment"));const i=ls(t);mN(t,e,Wu);const s=Z_(i,n);return new Wn(i,"signInViaPopup",e,s).executeNotNull()}class Wn extends ey{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Wn.currentPopupAction&&Wn.currentPopupAction.cancel(),Wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){Yt(this.filter.length===1,"Popup operations only handle one event");const e=qu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(gt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(gt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(gt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,wP.get())};e()}}Wn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bP="pendingRedirect",Qr=new Map;class EP extends ey{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=Qr.get(this.auth._key());if(!e){try{const i=await CP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}Qr.set(this.auth._key(),e)}return this.bypassAuthState||Qr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function CP(t,e){const n=IP(e),i=SP(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function TP(t,e){Qr.set(t._key(),e)}function SP(t){return $t(t._redirectPersistence)}function IP(t){return Xr(bP,t.config.apiKey,t.name)}async function kP(t,e){return await ls(t)._initializationPromise,ty(t,e,!1)}async function ty(t,e,n=!1){if(ot(t.app))return Promise.reject(Kn(t));const i=ls(t),s=Z_(i,e),o=await new EP(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RP=600*1e3;class AP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!NP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!ny(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(gt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=RP&&this.cachedEventUids.clear(),this.cachedEventUids.has($f(e))}saveEventToCache(e){this.cachedEventUids.add($f(e)),this.lastProcessedEventTime=Date.now()}}function $f(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function ny({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function NP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ny(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PP(t,e={}){return cs(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,OP=/^https?/;async function DP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await PP(t);for(const n of e)try{if(MP(n))return}catch{}Pt(t,"unauthorized-domain")}function MP(t){const e=dl(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!OP.test(n))return!1;if(LP.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const xP=new Ir(3e4,6e4);function Bf(){const t=At().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function FP(t){return new Promise((e,n)=>{function i(){Bf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Bf(),n(gt(t,"network-request-failed"))},timeout:xP.get()})}if(At().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(At().gapi?.load)i();else{const s=VN("iframefcb");return At()[s]=()=>{gapi.load?i():n(gt(t,"network-request-failed"))},HN(`${jN()}?onload=${s}`).catch(r=>n(r))}}).catch(e=>{throw Zr=null,e})}let Zr=null;function UP(t){return Zr=Zr||FP(t),Zr}/**
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
 */const $P=new Ir(5e3,15e3),BP="__/auth/iframe",HP="emulator/auth/iframe",jP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},VP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function WP(t){const e=t.config;k(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?$u(e,HP):`https://${t.config.authDomain}/${BP}`,i={apiKey:e.apiKey,appName:t.name,v:is},s=VP.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${ns(i).slice(1)}`}async function qP(t){const e=await UP(t),n=At().gapi;return k(n,t,"internal-error"),e.open({where:document.body,url:WP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jP,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=gt(t,"network-request-failed"),a=At().setTimeout(()=>{r(o)},$P.get());function c(){At().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const zP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},GP=500,KP=600,YP="_blank",JP="http://localhost";class Hf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function XP(t,e,n,i=GP,s=KP){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...zP,width:i.toString(),height:s.toString(),top:r,left:o},l=Be().toLowerCase();n&&(a=P_(l)?YP:n),A_(l)&&(e=e||JP,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(ON(l)&&a!=="_self")return QP(e||"",a),new Hf(null);const d=window.open(e||"",a,u);k(d,t,"popup-blocked");try{d.focus()}catch{}return new Hf(d)}function QP(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const ZP="__/auth/handler",e0="emulator/auth/handler",t0=encodeURIComponent("fac");async function jf(t,e,n,i,s,r){k(t.config.authDomain,t,"auth-domain-config-required"),k(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:is,eventId:s};if(e instanceof Wu){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",uo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof kr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${t0}=${encodeURIComponent(c)}`:"";return`${n0(t)}?${ns(a).slice(1)}${l}`}function n0({config:t}){return t.emulator?$u(t,e0):`https://${t.authDomain}/${ZP}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc="webStorageSupport";class i0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=G_,this._completeRedirectFn=ty,this._overrideRedirectResult=TP}async _openPopup(e,n,i,s){Yt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await jf(e,n,i,dl(),s);return XP(e,r,qu())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await jf(e,n,i,dl(),s);return aP(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(Yt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await qP(e),i=new AP(e);return n.register("authEvent",s=>(k(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(hc,{type:hc},s=>{const r=s?.[0]?.[hc];r!==void 0&&n(!!r),Pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=DP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return x_()||N_()||ju()}}const s0=i0;var Vf="@firebase/auth",Wf="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o0(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function a0(t){it(new Ye("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;k(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:F_(t)},l=new $N(i,s,r,c);return qN(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),it(new Ye("auth-internal",e=>{const n=ls(e.getProvider("auth").getImmediate());return(i=>new r0(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ge(Vf,Wf,o0(t)),Ge(Vf,Wf,"esm2020")}/**
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
 */const c0=300,l0=Ig("authIdTokenMaxAge")||c0;let qf=null;const u0=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>l0)return;const s=n?.token;qf!==s&&(qf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function d0(t=sa()){const e=Dn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=WN(t,{popupRedirectResolver:s0,persistence:[Q_,q_,G_]}),i=Ig("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=u0(r.toString());eP(n,o,()=>o(n.currentUser)),ZN(n,a=>o(a))}}const s=Tg("auth");return s&&zN(n,`http://${s}`),n}function h0(){return document.getElementsByTagName("head")?.[0]??document}BN({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=gt("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",h0().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});a0("Browser");const f0=()=>!1,p0=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},G=(...t)=>{},g0=(...t)=>{localStorage.getItem("debug:console")},m0="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Os=new Set;function _0(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function y0(t){return G("[ONE TAP] Callback registered, total callbacks:",Os.size+1),Os.add(t),()=>Os.delete(t)}function bi(t){G("[ONE TAP] Notifying status:",t,"to",Os.size,"callbacks"),Os.forEach(e=>{try{e(t)}catch{}})}function Hn(){if(Hn.retryCount||(Hn.retryCount=0),typeof google>"u"||!google.accounts?.id){if(Hn.retryCount++,Hn.retryCount>50)return;setTimeout(()=>Hn(),100);return}Hn.retryCount=0,_0(),google.accounts.id.initialize({client_id:m0,callback:w0,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Gu(){if(Yu()){bi("not_needed");return}window.google?.accounts?.id&&(bi("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?bi("skipped"):e==="dismissed"?bi("dismissed"):e==="display"&&bi("displayed")}))}async function w0(t){try{G("[ONE TAP] Received credential, signing in with Firebase..."),bi("signing_in");const e=kt.credential(t.credential),n=await QN(Fe,e);G("[ONE TAP] ✅ Successfully signed in:",n.user.email),nr(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}function v0(){typeof google<"u"&&google.accounts?.id&&google.accounts.id.cancel()}let gl=!1;async function b0(){const t=P();if(!t||gl)return;const e=b(E,`users/${t}/presence`);try{await ee(e,{state:"online",lastChanged:Gn()}),await Zm(e).set({state:"offline",lastSeen:Gn(),lastChanged:Gn()}),gl=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function iy(){const t=P();if(!t)return;const e=b(E,`users/${t}/presence`);try{await ee(e,{state:"offline",lastSeen:Gn(),lastChanged:Gn()}),gl=!1}catch(n){console.error("Failed to set offline:",n)}}function Sa(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();let n="";for(const s of new TextEncoder().encode(e))n+=String.fromCharCode(s);return btoa(n).replace(/\//g,"-")}async function sy(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=Sa(t.email),n=b(E,`usersByEmail/${e}`),i={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await ee(n,i),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(s){throw console.error("[USER DISCOVERY] Failed to register user:",s),s}}async function ry(t){if(!t||typeof t!="string")return null;try{const e=Sa(t),n=b(E,`usersByEmail/${e}`),i=await Pe(n);return i.exists()?i.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function oy(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async i=>{const s=await ry(i);e[i]=s});return await Promise.all(n),e}async function E0(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");try{const e=Sa(t),n=b(E,`usersByEmail/${e}`),{remove:i}=await he(async()=>{const{remove:s}=await Promise.resolve().then(()=>r_);return{remove:s}},void 0);await i(n),console.log("[USER DISCOVERY] Removed user from directory:",t)}catch(e){throw console.error("[USER DISCOVERY] Failed to remove user from directory:",e),e}}const C0=Object.freeze(Object.defineProperty({__proto__:null,findUserByEmail:ry,findUsersByEmails:oy,hashEmail:Sa,registerUserInDirectory:sy,removeUserFromDirectory:E0},Symbol.toStringTag,{value:"Module"}));async function T0(t){if(!t?.uid)return;const e=b(E,`users/${t.uid}/profile`);try{await ee(e,{displayName:t.displayName||null,photoURL:t.photoURL||null})}catch(n){console.error("Failed to save user profile:",n)}}async function ay(t){if(!t)return null;try{const e=await Pe(b(E,`users/${t}/profile`));return e.exists()?e.val():null}catch(e){return console.error("Failed to fetch user profile:",e),null}}const Fe=d0(ba);async function S0(){const t=Fe.currentUser;return t?t.getIdToken(!1):null}const I0=typeof import.meta<"u"&&!0;function Ku(t,e,n={}){const i=typeof window<"u"?window.location.origin:"n/a";I0?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:i,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:i})}const cy=(async()=>{try{await dc(Fe,Q_)}catch{try{await dc(Fe,q_)}catch{await dc(Fe,fl)}}try{(await kP(Fe))?.user&&G("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){G("[AUTH] No redirect result:",t.code)}setTimeout(()=>{Hn(),Gu()},500)})();let ly=!1;function nr(t){ly=t}function k0(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function uy(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,i=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:i,isIOSStandalone:n&&i}}function R0(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:i}=uy();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),nr(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const s=t?.customData?.email;if(Ku("Google sign-in",t,{email:s?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let ws=null;const A0=()=>Math.random().toString(36).substring(2,15),ml="guestUser",N0=2880*60*1e3;function P0(){try{const t=typeof localStorage<"u"?localStorage.getItem(ml):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(ml)}catch{}return null}return e}catch{return null}}function L0(t,e=N0){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(ml,JSON.stringify(i))}catch{}return i}function pe(){const t=P();if(t)return t;if(!ws){const e=P0();e&&e.id?ws=e.id:(ws=A0(),L0(ws))}return ws}function Jt(){return Fe.currentUser}function Yu(){return Fe.currentUser!==null}function P(){return Fe.currentUser?.uid??null}function O0(){return new Promise(t=>{const e=j_(Fe,n=>{e(),t(n)})})}function Ju(t,{truncate:e=7}={}){return j_(Fe,n=>{const i=!!n,s=n?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;i?(b0().catch(o=>{console.warn("Failed to initialize presence:",o)}),T0(n).catch(o=>{console.warn("Failed to save user profile:",o)}),sy(n).catch(o=>{console.warn("Failed to register user in directory:",o)})):Ia();try{t({user:n,isLoggedIn:i,userName:r})}catch{}})}const Do=async()=>{const t=new kt;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=uy();try{if(e&&ly){G("[AUTH] Using Safari external fallback"),nr(!1),k0();return}G("[AUTH] Starting popup sign-in flow...");const n=await vP(Fe,t);return G("[AUTH] Popup sign-in successful:",n.user.email),nr(!1),n}catch(n){R0(n)}};async function dy(){try{await iy(),Ia(),await tP(Fe),console.info("User signed out"),setTimeout(()=>Gu(),1500)}catch(t){throw Ku("Sign out",t),t}}async function hy(){const t=Fe.currentUser;if(!t)throw new Error("No user logged in");const e=t.uid;try{console.info("[AUTH] Starting account deletion for user:",e),await iy(),Ia();const{ref:n,remove:i}=await he(async()=>{const{ref:r,remove:o}=await Promise.resolve().then(()=>r_);return{ref:r,remove:o}},void 0),{rtdb:s}=await he(async()=>{const{rtdb:r}=await Promise.resolve().then(()=>fN);return{rtdb:r}},void 0);console.info("[AUTH] Cleaning up user data from RTDB...");try{await i(n(s,`users/${e}`))}catch(r){console.warn("[AUTH] Failed to remove user node from RTDB:",r)}try{const{FCMTransport:r}=await he(async()=>{const{FCMTransport:a}=await Promise.resolve().then(()=>HD);return{FCMTransport:a}},void 0);await new r().deleteToken()}catch(r){console.warn("[AUTH] Failed to delete FCM token:",r)}if(t.email)try{const{removeUserFromDirectory:r}=await he(async()=>{const{removeUserFromDirectory:o}=await Promise.resolve().then(()=>C0);return{removeUserFromDirectory:o}},void 0);await r(t.email)}catch(r){console.warn("[AUTH] Failed to remove user from discovery directory:",r)}console.info("[AUTH] Deleting Firebase Auth account..."),await nP(t),console.info("[AUTH] Account deleted successfully"),setTimeout(()=>Gu(),1500)}catch(n){throw Ku("Delete account",n),n.code==="auth/requires-recent-login"?new Error("For security, please sign out and sign in again before deleting your account."):n}}const zf="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",D0=6e4,ir={};function M0(t){const e=ir[t];return e&&Date.now()<e.expiresAt?e.token:(delete ir[t],null)}function x0(t,e,n){const i=n>0?n:3600;ir[t]={token:e,expiresAt:Date.now()+i*1e3-D0}}function Ia(){for(const t in ir)delete ir[t]}function fy(t,e,{interactive:n=!1}={}){const i=M0(t);return i?(console.log(`[AUTH] Using cached ${t} token`),Promise.resolve(i)):new Promise((s,r)=>{if(typeof google>"u"||!google.accounts?.oauth2){r(new Error("Google Identity Services not loaded"));return}const a=Jt()?.email||void 0;function c(d,h){if(d.error){if(h){console.log(`[AUTH] Silent ${t} token failed (${d.error}), trying interactive...`),h();return}console.error(`[AUTH] ${t} token request error:`,d.error),d.error==="access_denied"?r(new Error("Authorization cancelled")):r(new Error(d.error_description||d.error));return}if(!d.access_token){r(new Error("No access token received"));return}console.log(`[AUTH] ${t} access granted`),x0(t,d.access_token,d.expires_in||3600),s(d.access_token)}function l(){console.log(`[AUTH] Requesting ${t} access via interactive popup...`),google.accounts.oauth2.initTokenClient({client_id:zf,scope:e,hint:a,callback:h=>c(h,null),error_callback:h=>{console.error(`[AUTH] ${t} interactive error:`,h),h.type==="popup_closed"?r(new Error("Authorization cancelled")):r(new Error(h.message||"Authorization failed"))}}).requestAccessToken()}if(n){l();return}console.log(`[AUTH] Attempting silent ${t} token acquisition...`),google.accounts.oauth2.initTokenClient({client_id:zf,scope:e,hint:a,callback:d=>c(d,l),error_callback:()=>{console.log(`[AUTH] Silent ${t} error_callback, trying interactive...`),l()}}).requestAccessToken({prompt:"none"})})}function py(){return fy("contacts","https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly")}function gy(){return fy("gmail-send","https://www.googleapis.com/auth/gmail.send",{interactive:!0})}const Xu=Object.freeze(Object.defineProperty({__proto__:null,auth:Fe,authReady:cy,clearGISTokenCache:Ia,deleteAccount:hy,getCurrentUser:Jt,getCurrentUserAsync:O0,getLoggedInUserId:P,getLoggedInUserToken:S0,getUserId:pe,isLoggedIn:Yu,onAuthChange:Ju,requestContactsAccess:py,requestGmailSendAccess:gy,setSafariExternalOpenArmed:nr,signInWithAccountSelection:Do,signOutUser:dy},Symbol.toStringTag,{value:"Module"}));function ka(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}class F0{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}async addReaction(e,n,i){throw new Error("MessagingTransport.addReaction() must be implemented by subclass")}async removeReaction(e,n,i){throw new Error("MessagingTransport.removeReaction() must be implemented by subclass")}async getReactions(e,n){throw new Error("MessagingTransport.getReactions() must be implemented by subclass")}}const Gf=100;class U0 extends F0{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const i=P();if(!i)throw new Error("Cannot send message: not logged in");const r=Jt()?.displayName||"Guest User",o=this._getConversationId(i,e),a=Zs(b(E,`conversations/${o}/messages`));await ee(a,{text:n,from:i,fromName:r,sentAt:Gn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const i=P();if(!i)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=new Set,a=l=>{const u=l.key,d=l.val();if(!d||o.has(u))return;o.add(u);const h=d.from===i,f={...d,messageId:u};n(d.text,f,h)},c=l=>{const u=l.key,d=l.val();if(!(!d||!o.has(u))&&d.reactions!==void 0){const h=d.from===i,f={...d,messageId:u,_reactionUpdate:!0};n(d.text,f,h)}};return Ki(r,a),rl(r,c),()=>{ut(r,"child_added",a),ut(r,"child_changed",c)}}async getUnreadCount(e){const n=P();if(!n)return 0;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await Pe(s);if(!r.exists())return 0;const o=r.val();return Object.values(o).filter(a=>!a.read&&a.from===e).length}catch(r){return console.warn("[RTDBTransport] Failed to get unread count:",r),0}}async markAsRead(e){const n=P();if(!n)return;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await Pe(s);if(!r.exists())return;const o=r.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${i}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await bn(b(E),a)}catch(r){console.warn("[RTDBTransport] Failed to mark messages as read:",r)}}listenToUnreadCount(e,n){const i=P();if(!i)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return Ki(r,a),rl(r,c),()=>{ut(r,"child_added",a),ut(r,"child_changed",c)}}async _cleanupOldMessages(e){const n=b(E,`conversations/${e}/messages`),i=await Pe(n);if(!i.exists())return;const s=i.val(),r=Object.keys(s).length;if(r<=Gf)return;const o=r-Gf,a=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await bn(b(E),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}async addReaction(e,n,i){const s=P();if(!s)throw new Error("Cannot add reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ee(b(E,o),!0)}async removeReaction(e,n,i){const s=P();if(!s)throw new Error("Cannot remove reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ee(b(E,o),null)}async getReactions(e,n){const i=P();if(!i)return{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages/${n}/reactions`);try{const o=await Pe(r);if(!o.exists())return{};const a=o.val(),c={};for(const[l,u]of Object.entries(a))c[l]=Object.keys(u);return c}catch(o){return console.warn("[RTDBTransport] Failed to get reactions:",o),{}}}async hasMyReaction(e,n,i){const s=P();if(!s)return!1;const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;try{return(await Pe(b(E,o))).exists()}catch{return!1}}}class $0{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:i}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const s=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&i&&typeof i=="function"&&this.transport.getUnreadCount(e).then(l=>i(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),r={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},addReaction:(o,a)=>this.transport.addReaction(e,o,a),removeReaction:(o,a)=>this.transport.removeReaction(e,o,a),hasMyReaction:(o,a)=>this.transport.hasMyReaction(e,o,a),getReactions:o=>this.transport.getReactions(e,o),_unsubscribe:s};return this.sessions.set(e,r),r}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const En=new $0(new U0);function sr(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,i]=[t,e].sort(),s=`${n}_${i}`;let r=0;for(let u=0;u<s.length;u++){const d=s.charCodeAt(u);r=(r<<5)-r+d,r=r&r}let o=5381;for(let u=0;u<s.length;u++)o=(o<<5)+o+s.charCodeAt(u);const a=Math.abs(r).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}class B0{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=s=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,s),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class H0{constructor({incomingSrc:e,outgoingSrc:n,volume:i}={}){const s="/HangVidU/";this.incomingSrc=e??`${s}sounds/incoming.mp3`,this.outgoingSrc=n??`${s}sounds/outgoing.mp3`,this.defaultVolume=i??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:i}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),i!==void 0&&(this.defaultVolume=i)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new B0(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const Yn=new H0,rr=new WeakMap;function Qu(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(rr.has(t)||rr.set(t,[]),e==="initiator")Kf(t,"offerCandidates",n),Yf(t,"answerCandidates",n);else if(e==="joiner")Kf(t,"answerCandidates",n),Yf(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Kf(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=Zs(e==="offerCandidates"?Mu(n):xu(n));ee(s,i.candidate.toJSON())}}}function Yf(t,e,n){const i=e==="offerCandidates"?Mu(n):xu(n);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{t.remoteDescription&&(Zu(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};an(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=rr.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function Zu(t){if(!t||!rr.has(t))return;const e=rr.get(t);if(e.length!==0){G(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{G("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const j0=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Zu,setupIceCandidates:Qu},Symbol.toStringTag,{value:"Module"}));class Ni{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...s})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,n,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...s})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,n,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...s})}logFreshnessValidation(e,n,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,n,i,s={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...s})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Ni.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...n}),s}return null}}let fc=null;function v(){return fc||(fc=new Ni),fc}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>v(),exportLogs:()=>{const e=v().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{v().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=v().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=v().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=v().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=v().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=v().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=v().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=v().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Ni.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{v().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{v().enable(),console.log("Diagnostic logging enabled")},disable:()=>{v().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=v(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=v();t.logs.length>0&&t.persistLogs(),Ni.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=v(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Ni.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class V0{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),v().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:s});const r=on(i);try{return await ee(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),v().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-s}),await this.joinRoom(i,n),v().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-s}),i}catch(o){throw v().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-s}),o}}async checkRoomStatus(e){const n=on(e),i=await Pe(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const n=on(e),i=await Pe(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=on(e);await bn(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const s=ul(e,n);await ee(s,{displayName:i,joinedAt:Date.now()}),v().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const s=n||this.currentRoomId;if(!s||!e)return;const r=ul(s,e),o=Ts(s),a=on(s);try{await Je(r)}catch(c){v().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await Pe(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Je(a).catch(d=>{v().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){v().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const s=on(e),r={rejection:{by:n,reason:i,at:Date.now()}};try{await bn(s,r),v().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw v().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const s=on(e),r={cancellation:{by:n,reason:i,at:Date.now()}};try{await bn(s,r),v().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw v().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=v_(e);an(i,"value",n,e),v().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=Ts(e);an(i,"child_added",n,e),v().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=Ts(e);an(i,"child_removed",n,e),v().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const s=Ts(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return an(s,"child_added",r,e,n),an(s,"child_removed",o,e,n),()=>w_(n,e)}get roomId(){return this.currentRoomId}}const ce=new V0,Xt={view:"lobby",currentMedia:"none",setView(t){t!==this.view&&(this.view=t,document.body.dataset.view=t)},setMainContent(t){t!==this.currentMedia&&(this.currentMedia=t,document.body.dataset.mainContent=t)}};document.body.dataset.view=Xt.view;document.body.dataset.mainContent=Xt.currentMedia;const _l=3e4;let xt=null,Ss=null;async function W0(t,e=null){const n=pe(),i=P();if(!i)return;const s=Du(i);await ee(s,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function Mo(){const t=P();if(!t)return;const e=Du(t);await Je(e).catch(()=>{})}async function my(t){if(!t)return!1;try{const e=b(E,`rooms/${t}/createdAt`),n=await Pe(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<_l}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function _y(t,e,n){const i=v(),s=Date.now();Jn(),await W0(t,e),Xt.setView("calling");const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([Mo(),ce.cancelCall(t,pe(),"caller_cancelled"),ce.leaveRoom(pe(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Yn.stop(),Jn()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,xt=r,Yn.playOutgoing(),Ss=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:_l});try{await Promise.all([Mo(),ce.cancelCall(t,pe(),"auto_timeout"),ce.leaveRoom(pe(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Yn.stop(),Jn()},_l)}function Jn(){if(Yn.stop(),Xt.view==="calling"&&Xt.setView("lobby"),xt){const t=xt.dataset?.roomId||"unknown";v().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Ss,timestamp:Date.now()})}Ss&&(clearTimeout(Ss),Ss=null),xt&&(xt.remove(),xt=null)}async function ed(){if(xt){const t=xt.dataset?.roomId||"unknown";v().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await Mo(),Jn()}async function q0(t="user_rejected"){const e=v(),n=xt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await Mo(),Jn()}const z0=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Jn,isRoomCallFresh:my,onCallAnswered:ed,onCallRejected:q0,showCallingUI:_y},Symbol.toStringTag,{value:"Module"})),K=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Ke=null,Mn=null,Ra=null,td=null,Xe=null,Ee=null,fe=null,De=null,B=null,Ue=null,tt=null,We=null,mt=null,us=null,yy=null,_t=null,Aa=null,Nn=null,ds=null,hs=null,ai=null,nd=null,id=null,sd=null,rd=null,Pi=null,or=null,od=null;function Jf(){Ke=K("lobby"),Mn=K("lobby-call-btn"),Ra=K("title-auth-bar"),td=K("videos"),Xe=K("local-video-el"),Ee=K("local-video-box"),fe=K("remote-video-el"),De=K("remote-video-box"),B=K("shared-video-el"),Ue=K("shared-video-box"),tt=K("chat-controls"),We=K("call-btn"),mt=K("hang-up-btn"),us=K("switch-camera-btn"),_t=K("mute-btn"),Aa=K("fullscreen-partner-btn"),Nn=K("remote-pip-btn"),ds=K("mic-btn"),hs=K("camera-btn"),ai=K("exit-watch-mode-btn"),nd=K("app-pip-btn"),id=K("app-title-h1"),sd=K("app-title-a"),rd=K("app-title-span"),Pi=K("paste-join-btn"),or=K("add-contact-btn"),od=K("test-notifications-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Jf):Jf();const wy=()=>({lobbyDiv:Ke,lobbyCallBtn:Mn,titleAuthBar:Ra,videosWrapper:td,localVideoEl:Xe,localBoxEl:Ee,remoteVideoEl:fe,remoteBoxEl:De,sharedVideoEl:B,sharedBoxEl:Ue,chatControls:tt,callBtn:We,hangUpBtn:mt,switchCameraBtn:us,installBtn:yy,mutePartnerBtn:_t,fullscreenPartnerBtn:Aa,remotePipBtn:Nn,micBtn:ds,cameraBtn:hs,exitWatchModeBtn:ai,appPipBtn:nd,appTitleH1:id,appTitleA:sd,appTitleSpan:rd,pasteJoinBtn:Pi,addContactBtn:or,testNotificationsBtn:od});function vy(t,e=3,n=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(t);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(r,n)};r()})}async function by(t,e=3,n=100){const i={},s=t.map(async r=>{const o=await vy(r,e,n);return i[r]=o,o});return await Promise.all(s),i}async function G0(){const t=await by(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,s])=>!s).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const K0=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return or},get appPipBtn(){return nd},get appTitleA(){return sd},get appTitleH1(){return id},get appTitleSpan(){return rd},get callBtn(){return We},get cameraBtn(){return hs},get chatControls(){return tt},get exitWatchModeBtn(){return ai},get fullscreenPartnerBtn(){return Aa},getElements:wy,get hangUpBtn(){return mt},initializeYouTubeElements:G0,installBtn:yy,get lobbyCallBtn(){return Mn},get lobbyDiv(){return Ke},get localBoxEl(){return Ee},get localVideoEl(){return Xe},get micBtn(){return ds},get mutePartnerBtn(){return _t},get pasteJoinBtn(){return Pi},get remoteBoxEl(){return De},get remotePipBtn(){return Nn},get remoteVideoEl(){return fe},robustElementAccess:vy,get sharedBoxEl(){return Ue},get sharedVideoEl(){return B},get switchCameraBtn(){return us},get testNotificationsBtn(){return od},get titleAuthBar(){return Ra},get videosWrapper(){return td},waitForElements:by},Symbol.toStringTag,{value:"Module"})),ad=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),xo=t=>{if(ad(t))return t.classList.contains("hidden")},U=t=>{ad(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},C=t=>{ad(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Ey=t=>t.classList.contains("small-frame"),ar=t=>{if(t&&!Ey(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Pn=t=>{if(Ey(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function cd(t){return document.pictureInPictureElement===t}function Y0(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}async function Cy(t,e){if(!t||!e)return"small-frame";if(cd(t))return Pn(e),"already-pip";if(!Y0())return ar(e),U(e),"small-frame";try{return await t.requestPictureInPicture(),Pn(e),"pip"}catch(n){return console.warn("Failed to enter Picture-in-Picture:",n),ar(e),U(e),"small-frame"}}async function Na(t){try{if(t&&!cd(t))return;document.pictureInPictureElement&&await document.exitPictureInPicture()}catch(e){console.warn("Failed to exit Picture-in-Picture:",e)}}function J0(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){U(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{C(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{C(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),C(t);try{typeof s=="function"&&s()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(m){if(r&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),C(t);try{typeof s=="function"&&s()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),C(t);function g(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return g}let Bt=null,Ht=null,Ty="user";function Sy(){return Ty}function Iy(t){Ty=t}function Pa(){return Bt instanceof MediaStream}function ld(){return!Bt||!(Bt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",Bt),null):Bt}function ky(t){Bt=t}function Ry(){Bt&&(Bt.getTracks().forEach(t=>t.stop()),Bt=null)}function Ay(){return Ht instanceof MediaStream}function La(){return!Ht||!(Ht instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",Ht),console.error("Call createLocalStream() before accessing local stream."),null):Ht}function Fo(t){Ht=t}function Ny(){Ht&&(Ht.getTracks().forEach(t=>t.stop()),Ht=null)}const X0=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Ny,cleanupRemoteStream:Ry,getFacingMode:Sy,getLocalStream:La,getRemoteStream:ld,hasLocalStream:Ay,hasRemoteStream:Pa,setFacingMode:Iy,setLocalStream:Fo,setRemoteStream:ky},Symbol.toStringTag,{value:"Module"})),Xf="yt-video-box",yl="yt-player-root";let ne=null,tn=!1;const Ds=()=>ne,Q0=()=>tn,Py=t=>tn=t,Li=()=>{const t=document.getElementById(Xf);if(!t)throw new Error(`Container #${Xf} not found`);return t};function Z0(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Ly(){const t=Li();if(!document.getElementById(yl)){const e=document.createElement("div");e.id=yl,t.appendChild(e)}U(t)}function Uo(){const t=Li();C(t)}function pc(){const t=Li();return t&&!t.classList.contains("hidden")}function wl(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Oy(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function eL({url:t,onReady:e,onStateChange:n}){const i=Oy(t);if(!i)throw new Error("Invalid YouTube URL");if(await Z0(),ne){try{ne.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}ne=null}const s=(o=!0)=>{const a=Li(),c=ne.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Li(),h=ne.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),ne.getPlayerState()!==window.YT.PlayerState.PLAYING?dd():Ar()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=Li(),a=ne.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Ly(),new Promise((o,a)=>{try{ne=new window.YT.Player(yl,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{tn=!0,e&&e(c),o(ne)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function ud(){if(ne){try{Uo(),ne.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}ne=null,tn=!1}}function dd(){ne&&tn&&ne.playVideo()}function Ar(){ne&&tn&&ne.pauseVideo()}function tL(t){ne&&tn&&ne.seekTo(t,!0)}function $o(){return ne&&tn?ne.getCurrentTime():0}function hd(){return ne&&tn?ne.getPlayerState():-1}const mn={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},Dy=()=>{if(!Pa())return!1;const t=ld();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function nL(){ci()||(xy(!0),C(Ke),C(Mn),tt.classList.remove("bottom"),tt.classList.add("watch-mode"),bl()?(C(We),U(mt)):(C(mt),C(ds),C(_t),U(We)),C(hs),C(us),U(ai),U(tt),bl()&&(C(Ee),Pn(Ee),C(De),Cy(fe,De)))}function iL(){ci()&&(C(ai),U(We),U(mt),U(ds),U(_t),U(hs),U(us),tt.classList.remove("watch-mode"),tt.classList.add("bottom"),U(tt),Dy()&&(Na(fe),Pn(De),U(De)),bl()?(ar(Ee),U(Ee)):(U(Ke),U(Mn),Pn(Ee),C(Ee)),xy(!1))}function Bo(){Xt.setMainContent("ytVideo"),nL()}function Ms(){Xt.setMainContent("remoteStream"),iL()}let ke=null,Qt=null,My=!1,yt="none",xs=null,nt=null;const ci=()=>My,xy=t=>My=t,St=()=>yt,sL=t=>{["yt","url","file","none"].includes(t)?yt=t:console.warn("Invalid lastWatched platform:",t)};let _n=!1,Fs=null,Oi=0,gc=!1;async function Di(t){if(!ke)return;console.debug("Updating watch sync state, roomId:",ke);const e=Tr(ke);try{await bn(e,{...t,updatedBy:Qt})}catch(n){console.error("Failed to update watch state:",n)}}function rL(t,e,n){if(!t)return;ke=t,Qt=n;const i=Tr(t),s=Sr(t);Ii(i,lL,t),Ii(s,cL,t),mL()}function fd(t){return typeof t=="string"&&t.startsWith("blob:")}async function oL(t,e){if(!ke||!Qt)return!1;const n=Sr(ke);try{return await ee(n,{fileName:t,requestedBy:Qt,timestamp:Date.now()}),nt&&clearTimeout(nt),nt=setTimeout(()=>{vl()},300*1e3),!0}catch(i){return console.error("Failed to create watch request:",i),!1}}async function aL(t){if(!ke)return!1;const e=Sr(ke);try{await Je(e)}catch(n){console.warn("Failed to remove watch request:",n)}return nt&&(clearTimeout(nt),nt=null),await cr(t)}async function vl(){if(!ke)return;nt&&(clearTimeout(nt),nt=null);const t=Sr(ke);try{await Je(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function cL(t){const e=t.val();if(!e){nt&&(clearTimeout(nt),nt=null);return}e.requestedBy!==Qt&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function lL(t){const e=t.val();e&&e.updatedBy!==Qt&&(Date.now()-Oi<500||(e.url&&e.url!==xs&&!fd(e.url)&&uL(e.url),e.isYouTube?dL(e):gL(e)))}function uL(t){xs=t,wl(t)?(C(Ue),Fy(t),yt="yt"):(ud(),U(Ue),B.src=t,yt="url"),Bo()}function dL(t){!Ds()||!Q0()||(hL(t),fL(t))}function hL(t){const e=hd(),n=e===mn.PLAYING;if([mn.BUFFERING,mn.UNSTARTED].includes(e)){pL();return}_n||(t.playing&&!n?(dd(),yt="yt"):!t.playing&&n&&(Ar(),yt="yt"))}function fL(t){if(t.currentTime===void 0)return;const e=$o();Math.abs(e-t.currentTime)>.3&&!_n&&(tL(t.currentTime),setTimeout(()=>{t.playing?dd():Ar(),yt="yt"},500))}function pL(){_n=!0,clearTimeout(Fs),Fs=setTimeout(async()=>{_n=!1;const t=hd()===mn.PLAYING;await Di({playing:t,currentTime:$o()})},700)}function gL(t){Oi=Date.now(),t.playing!==void 0&&(t.playing&&B.paused?B.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!B.paused&&B.pause()),t.currentTime!==void 0&&Math.abs(B.currentTime-t.currentTime)>1&&(B.currentTime=t.currentTime,t.playing?B.play().catch(n=>console.warn("Play failed:",n)):B.pause())}function mL(){const t=()=>{yt!=="file"&&(yt="url")};B.addEventListener("play",async()=>{!Ds()&&ke&&(Oi=Date.now(),await Di({playing:!0,currentTime:B.currentTime,isYouTube:!1})),t()}),B.addEventListener("pause",async()=>{B.seeking||(!Ds()&&ke&&(Oi=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:B.currentTime}),await Di({playing:!1,currentTime:B.currentTime,isYouTube:!1})),t())}),B.addEventListener("playing",()=>{gc=!0}),B.addEventListener("pause",()=>{B.seeking||(gc=!1)},!0),B.addEventListener("seeked",async()=>{!Ds()&&ke&&(Oi=Date.now(),await Di({currentTime:B.currentTime,playing:gc,isYouTube:!1})),t()})}async function _L(t){if(!t)return!1;Oi=Date.now();const e=fd(t);if(wl(t)){if(C(Ue),!await Fy(t))return!1;yt="yt"}else ud(),U(Ue),B.src=t,yt=e?"file":"url";if(ke){const n=Tr(ke);e?await ee(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Qt}):ee(n,{url:t,playing:!1,currentTime:0,isYouTube:wl(t),updatedBy:Qt})}return Bo(),!0}async function cr(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;xs=e;const n=await _L(e);return n||fd(xs)&&t instanceof File&&(URL.revokeObjectURL(e),xs=null),n}async function Fy(t){if(!Oy(t))return console.error("Invalid YouTube URL:",t),!1;try{return await eL({url:t,onReady:n=>{if(Py(!0),ke){const i=Tr(ke);ee(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Qt})}},onStateChange:async n=>{if(!Ds())return;const s=n.data===mn.PLAYING,r=n.data===mn.PAUSED;if(n.data===mn.BUFFERING){_n=!0,Fs&&clearTimeout(Fs),Fs=setTimeout(async()=>{_n=!1;const c=hd()===mn.PLAYING;await Di({playing:c,currentTime:$o()})},700);return}r&&_n||!_n&&(s||r)&&await Di({playing:s,currentTime:$o()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}let Mi=!1,Hr=!1,Qf=null,Zf=null,Us=null;const bl=()=>Mi,Uy=()=>{if(!Mi){if(!fe||!Pa()||fe.paused||fe.readyState<2){Hr||(Hr=!0,fe.addEventListener("playing",()=>{Hr=!1,Uy()},{once:!0}));return}if(Hr=!1,Mi=!0,U(De),U(Ee),ar(Ee),C(Ke),C(Mn),We.disabled=!0,We.classList.add("disabled"),mt.disabled=!1,mt.classList.remove("disabled"),_t.disabled=!1,_t.classList.remove("disabled"),Nn.disabled=!1,Nn.classList.remove("disabled"),Us||(Us=J0(tt,{inactivityMs:2500,hideOnEsc:!0})),!Qf){const t=()=>{Mi&&(ci()?ar(De):Pn(De),U(De))};fe.addEventListener("leavepictureinpicture",t),Qf=()=>fe.removeEventListener("leavepictureinpicture",t)}if(!Zf){const t=()=>C(De);fe.addEventListener("enterpictureinpicture",t),Zf=()=>fe.removeEventListener("enterpictureinpicture",t)}}},yL=()=>{Mi&&(Mi=!1,Na(fe),Pn(Ee),C(Ee),Pn(De),C(De),We.disabled=!1,We.classList.remove("disabled"),mt.disabled=!0,mt.classList.add("disabled"),_t.disabled=!0,_t.classList.add("disabled"),Nn.disabled=!0,Nn.classList.add("disabled"),Us&&(Us(),Us=null),ci()||(U(Mn),U(Ke),U(tt)))};function $y(){Xt.setView("connected"),Uy()}function By(){Xt.setView("lobby"),yL()}let Tt=null,ep=null;function Hy(t){ep=t,t.onconnectionstatechange=()=>{G("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?($y(),ed().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Tt&&(clearTimeout(Tt),Tt=null)):t.connectionState==="disconnected"?(Tt&&clearTimeout(Tt),Tt=setTimeout(()=>{t===ep&&t.connectionState==="disconnected"&&Ce.cleanupCall({reason:"connection_lost"}),Tt=null},3e3)):t.connectionState==="failed"&&(ka(),Tt&&(clearTimeout(Tt),Tt=null),Ce.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{G("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const pd={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},mc=new WeakMap;function jy(t,e,n){mc.has(t)||mc.set(t,{});const i=mc.get(t),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===n?!0:(i[s]=n,!1)}function Vy(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function gd(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Wy(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function qy(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function zy(t,e,n){if(jy(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Vy(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function Gy(){return Math.random().toString(36).substring(2,9)}const wL=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:gd,createAnswer:qy,createOffer:Wy,generateRoomId:Gy,isDuplicateSdp:jy,isValidSignalingState:Vy,rtcConfig:pd,setRemoteDescription:zy},Symbol.toStringTag,{value:"Module"}));async function vL({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(pd),a="initiator",c=r||Gy(),l=pe();gd(o,t);const u=o.createDataChannel("files");if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Qu(o,a,c),Hy(o);const h=await Wy(o);await ce.createNewRoom(h,l,c),s(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function bL({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await ce.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await ce.getRoomData(t)}catch(m){return G("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(pd),d="joiner",h=pe();gd(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,G("[Call Flow] DataChannel received by joiner",{label:f.label})},!s(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Qu(u,d,t),Hy(u),await zy(u,l,Zu);const g=await qy(u);try{await ce.saveAnswer(t,g)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return r(t,d,h),await ce.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class EL{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const CL={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function TL(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function SL(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const i=new DataView(t).getUint32(0,!0),s=4+i;if(t.byteLength<s)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",s,"got:",t.byteLength),null;const r=new Uint8Array(t,4,i),o=new TextDecoder().decode(r),a=JSON.parse(o),c=4+i,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const IL=1024;function kL(t,e,n){let i=0,s=0;const r=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(s++,i+=c.byteLength):r.push(l)});const o=e-i;return{isComplete:s===n&&Math.abs(o)<=IL,validChunks:s,totalSize:i,missingChunks:r,sizeDifference:o}}const _c=CL.FILE_CONFIG.NETWORK_CHUNK_SIZE,tp=5e3;class RL{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>tp*1024*1024)throw new Error(`File too large (max ${tp} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const i=`${e.name}-${e.size}-${Date.now()}`,s=Math.ceil(e.size/_c);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:i,name:e.name,size:e.size,mimeType:e.type,totalChunks:s}));for(let r=0;r<s;r++){const o=r*_c,a=Math.min(o+_c,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:i,chunkIndex:r,totalChunks:s},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((r+1)/s);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await TL(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const i=SL(n);if(!i){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:s,chunkData:r}=i,o=this.receivedChunks.get(s.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",s.fileId);return}if(o[s.chunkIndex]=r,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/s.totalChunks)}o.filter(a=>a).length===s.totalChunks&&this.assembleFile(s.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),i=this.receivedChunks.get(e),s=kL(i,n.size,n.totalChunks);if(!s.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...s}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:s});return}const r=new Blob(i,{type:n.mimeType}),o=new File([r],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class AL extends EL{constructor(e){if(super(),!e)throw new Error("WebRTCFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new RL(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}function lr(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"],ignoreInputBlur:o=!1}=n,a=()=>{let f=n.ignore||[];return typeof f=="function"&&(f=f()),Array.isArray(f)?f.filter(Boolean):[]};let c=!1;const l=f=>{try{const p=f.target;if(t.contains(p))return;const g=a();for(const m of g)if(m&&m.contains&&m.contains(p)||m===p)return;if(o&&c&&!(p.tagName==="INPUT"||p.tagName==="TEXTAREA"||p.isContentEditable)){c=!1;return}e(f)}catch(p){console.error("closeOnClickOutside handler error:",p)}},u=f=>{s&&f.key==="Escape"&&e(f)},d=()=>{c=!0},h=()=>{setTimeout(()=>{c=!1},0)};return r.forEach(f=>document.addEventListener(f,l,{passive:!0})),s&&document.addEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(p=>{p.addEventListener("focus",d),p.addEventListener("blur",h)}),function(){r.forEach(p=>document.removeEventListener(p,l,{passive:!0})),s&&document.removeEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(g=>{g.removeEventListener("focus",d),g.removeEventListener("blur",h)})}}const NL=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),PL=/\[\[([^\]]+)\]\]|\$\{([^}]+)\}/g,LL=(t,e)=>t.replace(PL,(n,i,s)=>{const r=(i??s).trim(),o=r.split(".").reduce((c,l)=>c?.[l],e);return o==null?"":r.endsWith("Html")?String(o):NL(String(o))}),OL=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=LL(t,e),n.content.cloneNode(!0)},DL=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);n.push(r),i=s}return n.reverse()},ML=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),xL=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:DL(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),FL=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),UL=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const s=t.querySelectorAll("input[name], textarea[name], select[name]");for(const r of s)if(r.getAttribute("name")===n.name){i=r;break}}else if(n.id)try{i=t.querySelector("#"+FL(n.id))}catch{i=t.querySelector(`#${n.id}`)}else n.path&&(i=ML(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},$L=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),BL=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},HL=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=BL(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},jL=()=>document.readyState!=="loading";function Qe(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Oa=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!jL())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...t};const h=new Set,f=/\[\[([^\]]+)\]\]|\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const y=(p[1]||p[2]).trim().split(".")[0];h.add(y)}const g=[],m=[],T={},L=()=>{let y=[],N=[];l&&(y=xL(u),N=$L(u)),u.textContent="";const oe=OL(e,d);u.appendChild(oe),Object.keys(n).forEach(_e=>{const J=u.querySelectorAll(`[onclick="${_e}"]`),vt=n[_e];J.forEach(rt=>{rt.removeAttribute("onclick"),typeof vt=="function"&&rt.addEventListener("click",vt)})}),l&&(UL(u,y),HL(u,N)),g.forEach(_e=>_e({...d}))},$=y=>{if(!Array.isArray(y)||y.length===0)return;const N={props:{...d},changedKeys:y};m.forEach(oe=>oe(N))};for(const y of Object.keys(t))T[y]=[],Object.defineProperty(u,y,{get(){return d[y]},set(N){d[y]!==N&&(d[y]=N,h.has(y)&&L(),T[y].forEach(oe=>oe(N)),$([y]))},configurable:!0,enumerable:!0});if(u.update=y=>{let N=!1,oe=!1;const _e=[];for(const J in y)y[J]!==d[J]&&(d[J]=y[J],h.has(J)&&(oe=!0),T[J]&&T[J].forEach(vt=>vt(y[J])),N=!0,_e.push(J));N&&oe&&L(),_e.length>0&&$(_e)},u.onRender=y=>{typeof y=="function"&&g.push(y)},u.onAnyPropUpdated=y=>{typeof y=="function"&&m.push(y)},u.onPropUpdated=(y,N)=>{typeof N=="function"&&T[y]&&T[y].push(N)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(y=>{typeof y=="function"&&y()}):typeof a=="function"&&a()),g.length=0,m.length=0;for(const y in T)T[y].length=0;u.remove()},L(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(y){g0("[createComponent]: Error in onMount handler of component",y)}return u};function Ky({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:i=0,id:s=null,startHidden:r=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=Oa({initialProps:{icon:n,unreadCount:i},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          [[icon]]
          <span class="notification-badge">
            [[unreadCount]]
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(r?" hidden":""),autoAppend:!1});if(s&&o&&typeof s=="string")try{o.id=s}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=i>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function np(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),i=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(n||i)&&!window.MSStream,r=/Android/i.test(e),o=s||r;return t&&console.table({"User Agent":e,isAndroid:r,isiOSUA:n,isiPadOSDesktopUA:i,isMobileDevice:o}),o}function VL(t){if(!t)return null;let e=String(t).trim();if(!e)return null;/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(e)||(e="http://"+e);let n="",i=null;try{i=new URL(e,window.location&&window.location.origin?window.location.origin:void 0),n=i.protocol}catch{const o=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);n=o?o[1].toLowerCase():""}if(i&&!i.hostname)return null;const s=n.toLowerCase();return s!=="http:"&&s!=="https:"?null:e}function WL(t){const e=document.createDocumentFragment();if(!t)return e;const n=/((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;let i=0,s;for(;(s=n.exec(t))!==null;){const r=s[0],o=s.index;o>i&&e.appendChild(document.createTextNode(t.slice(i,o)));const a=r.replace(/[.,!?:;\)\]\}]+$/g,""),c=r.slice(a.length),l=VL(a);if(!l)e.appendChild(document.createTextNode(r));else{const u=document.createElement("a");u.href=l,u.textContent=a,u.target="_blank",u.rel="noopener noreferrer",u.className="message-link",e.appendChild(u),c&&e.appendChild(document.createTextNode(c))}i=o+r.length}return i<t.length&&e.appendChild(document.createTextNode(t.slice(i))),e}const El={heart:"❤️",thumbsUp:"👍",laugh:"😂"},Xn={doubleTapDelay:300,longPressDelay:500,defaultReaction:"heart",maxReactionsPerMessage:0,enableAnimations:!0};function ip(t){return El[t]||El.heart}function qL(){return{...El}}class zL{constructor(){this.reactions=new Map}addReaction(e,n=Xn.defaultReaction,i){if(!e)throw new Error("messageId is required");this.reactions.has(e)||this.reactions.set(e,{});const s=this.reactions.get(e);return s[n]||(s[n]=new Set),i?s[n].add(i):s[n].add(`_anon_${Date.now()}_${Math.random()}`),this.getReactions(e)}removeReaction(e,n=Xn.defaultReaction,i){if(!e)throw new Error("messageId is required");const s=this.reactions.get(e);if(!s)return{};const r=s[n];if(!r||r.size===0)return this.getReactions(e);if(i)r.delete(i);else{console.debug("[ReactionManager] removeReaction called without userId - using legacy fallback");const o=r.values().next().value;o&&r.delete(o)}return r.size===0&&delete s[n],Object.keys(s).length===0&&this.reactions.delete(e),this.getReactions(e)}hasUserReaction(e,n,i){const s=this.reactions.get(e);return!s||!s[n]?!1:s[n].has(i)}getUserReactionType(e,n){const i=this.reactions.get(e);if(!i)return null;for(const[s,r]of Object.entries(i))if(r.has(n))return s;return null}getReactions(e){const n=this.reactions.get(e);if(!n)return{};const i={};for(const[s,r]of Object.entries(n))i[s]=r.size;return i}syncFromRemote(e,n){if(!e)throw new Error("messageId is required");if(this.reactions.delete(e),!n||Object.keys(n).length===0)return;const i={};for(const[s,r]of Object.entries(n))Array.isArray(r)&&r.length>0&&(i[s]=new Set(r));Object.keys(i).length>0&&this.reactions.set(e,i)}hasReactions(e){const n=this.reactions.get(e);return!!(n&&Object.keys(n).length>0)}getReactionCount(e,n){const i=this.reactions.get(e);return!i||!i[n]?0:i[n].size}clearReactions(e){this.reactions.delete(e)}clearAll(){this.reactions.clear()}}class GL{constructor(e){this.reactionManager=e,this.doubleTapTimers=new Map,this.longPressTimers=new Map,this.activePicker=null,this.activePickerMessageElement=null,this.pickerJustShown=!1}enableDoubleTap(e,n,i){if(!e||!n){console.warn("[ReactionUI] Invalid parameters for enableDoubleTap");return}const s="ontouchstart"in window,r=s?"touchend":"click",o=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=Date.now(),d=this.doubleTapTimers.get(e);d&&u-d<Xn.doubleTapDelay?(l.preventDefault(),this.handleDoubleTap(e,n,i),this.doubleTapTimers.delete(e)):this.doubleTapTimers.set(e,u)},a=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=setTimeout(()=>{this.showPicker(e,n,i)},Xn.longPressDelay);this.longPressTimers.set(e,u)},c=()=>{const l=this.longPressTimers.get(e);l&&(clearTimeout(l),this.longPressTimers.delete(e),this.activePicker||(e.style.userSelect="",e.style.webkitUserSelect=""))};e.addEventListener(r,o,{passive:!1}),s?(e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",c,{passive:!0}),e.addEventListener("touchmove",c,{passive:!0}),e.addEventListener("touchcancel",c,{passive:!0})):(e.addEventListener("mousedown",a),e.addEventListener("mouseup",c),e.addEventListener("mouseleave",c)),e._reactionCleanup=()=>{e.removeEventListener(r,o),s?(e.removeEventListener("touchstart",a),e.removeEventListener("touchend",c),e.removeEventListener("touchmove",c),e.removeEventListener("touchcancel",c)):(e.removeEventListener("mousedown",a),e.removeEventListener("mouseup",c),e.removeEventListener("mouseleave",c)),this.doubleTapTimers.delete(e),c()}}async handleDoubleTap(e,n,i){const s=Xn.defaultReaction;i&&await i(s,e,n,"doubleTap")}renderReactions(e,n,i){let s=e.querySelector(".message-reactions");if(!s){s=document.createElement("div"),s.className="message-reactions";const o=e.querySelector(".message-text");o?o.appendChild(s):e.appendChild(s)}if(s.innerHTML="",!Object.values(i).some(o=>o>0)){s.style.display="none";return}s.style.display="";for(const[o,a]of Object.entries(i))if(a>0){const c=this.createReactionBadge(o);s.appendChild(c)}}createReactionBadge(e){const n=document.createElement("span");return n.className="reaction-badge",n.dataset.reactionType=e,n.textContent=ip(e),n}showReactionAnimation(e,n){const i=ip(n),s=document.createElement("div");s.className="reaction-animation",s.textContent=i;const r=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${r.left+r.width/2}px`,s.style.top=`${r.top+r.height/2}px`,document.body.appendChild(s),setTimeout(()=>{s.remove()},1e3)}showPicker(e,n,i){this.hidePicker();const s=document.createElement("div");s.className="reaction-picker";const r=qL();for(const[a,c]of Object.entries(r)){const l=document.createElement("button");l.type="button",l.className="reaction-picker-btn",l.textContent=c,l.dataset.reactionType=a,l.addEventListener("click",async u=>{u.stopPropagation(),i&&await i(a,e,n,"picker"),this.hidePicker()}),s.appendChild(l)}const o=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${o.left+o.width/2}px`,s.style.top=`${o.top-8}px`,document.body.appendChild(s),this.activePicker=s,this.activePickerMessageElement=e,this.pickerJustShown=!0,setTimeout(()=>{this.pickerCleanup=lr(s,()=>{if(this.pickerJustShown){this.pickerJustShown=!1;return}this.hidePicker()})},0)}hidePicker(){this.activePicker&&(this.activePicker.remove(),this.activePicker=null,this.activePickerMessageElement&&(this.activePickerMessageElement.style.userSelect="",this.activePickerMessageElement.style.webkitUserSelect="",this.activePickerMessageElement=null)),this.pickerCleanup&&(this.pickerCleanup(),this.pickerCleanup=null),this.pickerJustShown=!1}cleanup(e){e._reactionCleanup&&e._reactionCleanup()}}function md(t,e={}){const{duration:n=3e3,type:i="info",position:s="bottom",onClick:r}=e,o=document.createElement("div");o.className=`toast toast-${i} toast-${s}`,o.textContent=t,r&&(o.classList.add("toast-clickable"),o.addEventListener("click",()=>{r(),c()})),document.body.appendChild(o),requestAnimationFrame(()=>{o.classList.add("toast-show")});let a=!1;function c(){a||(a=!0,o.classList.remove("toast-show"),setTimeout(()=>o.remove(),300))}setTimeout(c,n)}function _d(t,e={}){md(t,{...e,type:"success"})}function KL(t,e={}){md(t,{...e,type:"error"})}function Yy(t,e={}){md(t,{...e,type:"info"})}function YL(){const t=document.createElement("div");t.innerHTML=`
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
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),i=t.querySelector("#messages-form"),s=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const r=CSS.supports?.("field-sizing","content");let o=null;if(s&&s.tagName==="TEXTAREA"&&!r){const a=()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`};s.addEventListener("input",a,{passive:!0}),o=()=>{s.style.height=""},requestAnimationFrame(a)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:i,messagesInput:s,resetInputHeight:o}}const JL=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function XL(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function QL(){let t=!1,e=null,n=null,i=!1,s=new Map;const r=new zL,o=new GL(r),a=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),c=Ky({parent:a,onToggle:()=>fs(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!c)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const l=c.element,{messagesBoxContainer:u,messagesBox:d,messagesMessages:h,messagesForm:f,messagesInput:p,resetInputHeight:g}=YL();if(!l||!d||!h||!f||!p)return console.error("Messages UI elements not found."),null;const m=document.getElementById("attach-file-btn"),T=document.getElementById("file-input"),L=f.querySelector('button[type="submit"]');C(m),m.addEventListener("click",()=>{T.click()}),T.addEventListener("change",async w=>{const R=w.target.files[0];if(!R||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const A=L.textContent;L.textContent="Sending...";try{await n.sendFile(R,D=>{L.textContent=`${Math.round(D*100)}%`}),R.type.startsWith("video/")&&s.set(R.name,R),Se(`📎 Sent: ${R.name}`,{isSentByMe:!0})}catch(D){console.error("[MessagesUI] File send failed:",D),Se("❌ Failed to send file")}finally{L.textContent=A,T.value=""}});async function $(w){return new Promise(R=>{const A=document.createElement("div");A.className="file-action-overlay",A.style.cssText=`
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
      `;const D=document.createElement("div");D.className="file-action-prompt",D.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,D.innerHTML=`
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
      `,A.appendChild(D),document.body.appendChild(A);const Z=D.querySelector("#file-name-display");Z.textContent=w;const j=D.querySelector("#download-file-btn"),V=D.querySelector("#watch-together-btn");j.addEventListener("mouseenter",()=>{j.style.background="var(--bg-hover, #333)"}),j.addEventListener("mouseleave",()=>{j.style.background="var(--bg-secondary, #2a2a2a)"}),V.addEventListener("mouseenter",()=>{V.style.opacity="0.9"}),V.addEventListener("mouseleave",()=>{V.style.opacity="1"}),j.addEventListener("click",()=>{A.remove(),R("download")}),V.addEventListener("click",()=>{A.remove(),R("watch")}),A.addEventListener("click",de=>{de.target===A&&(A.remove(),R("download"))})})}async function y(w){return new Promise(R=>{const A=document.createElement("div");A.className="watch-request-overlay",A.style.cssText=`
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
      `;const D=document.createElement("div");D.className="watch-request-prompt",D.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,D.innerHTML=`
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
      `,A.appendChild(D),document.body.appendChild(A);const Z=D.querySelector("#watch-request-filename");Z.textContent=w;const j=D.querySelector("#decline-watch-btn"),V=D.querySelector("#accept-watch-btn");j.addEventListener("mouseenter",()=>{j.style.background="var(--bg-hover, #333)"}),j.addEventListener("mouseleave",()=>{j.style.background="var(--bg-secondary, #2a2a2a)"}),V.addEventListener("mouseenter",()=>{V.style.opacity="0.9"}),V.addEventListener("mouseleave",()=>{V.style.opacity="1"}),j.addEventListener("click",()=>{A.remove(),R(!1)}),V.addEventListener("click",()=>{A.remove(),R(!0)}),A.addEventListener("click",de=>{de.target===A&&(A.remove(),R(!1))})})}window.onFileWatchRequestReceived=async w=>{const R=s.get(w);if(!R){Se(`❌ File not available to watch together: ${w}`),await vl();return}Se(`🎬 Partner wants to watch: ${w}`),await y(w)?(Se("✅ Joining watch together..."),await aL(R)||Se("❌ Failed to load video")):(Se("❌ Declined watch together request"),await vl())};function N(){if(!l||!d||d.classList.contains("hidden"))return;const w=l.getBoundingClientRect(),R=d.getBoundingClientRect(),A=8;let D=w.top-R.height-A;D<8&&(D=w.bottom+A);let Z=w.left+w.width/2-R.width/2;const j=window.innerWidth-R.width-8;Z<8&&(Z=8),Z>j&&(Z=j),d.style.top=`${Math.round(D)}px`,d.style.left=`${Math.round(Z)}px`}function oe(){t||(t=!0,window.addEventListener("resize",N,{passive:!0}),window.addEventListener("scroll",N,{passive:!0}),window.addEventListener("orientationchange",N,{passive:!0}))}function _e(){t&&(t=!1,window.removeEventListener("resize",N),window.removeEventListener("scroll",N),window.removeEventListener("orientationchange",N))}let J=null;const vt=new MutationObserver(w=>{w.forEach(R=>{R.type==="attributes"&&R.attributeName==="class"&&(d.classList.contains("hidden")||c.clearBadge())})});vt.observe(d,{attributes:!0});function rt(){return!d.classList.contains("hidden")}function Ua(){return document.activeElement===p}function Dw(){Ua()||p.focus()}function Mw(){Ua()&&p.blur()}function fs(){d.classList.toggle("hidden"),rt()?(np()||p.focus(),JL?requestAnimationFrame(()=>{XL(d)||(N(),oe())}):(N(),oe()),Ad(),J=lr(d,()=>{C(d),_e(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",J&&(J(),J=null)},{ignore:()=>[c.element,o.activePicker].filter(Boolean),esc:!0,ignoreInputBlur:np()})):(document.activeElement===p&&p.blur(),_e(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",J&&(J(),J=null))}function $a(){U(c.element)}function Rd(){C(c.element)}const Ba=new Map;function Se(w,R={}){const{isSentByMe:A,senderDisplay:D,fileDownload:Z,messageId:j,reactions:V}=R,de=D??(A===!0?"Me":""),Ae=document.createElement("p");A===!0?Ae.classList.add("message-local"):A===!1&&Ae.classList.add("message-remote");const bt=document.createElement("span");bt.className="sender-avatar"+(A===!0?" sender-avatar--me":""),bt.textContent=de,bt.setAttribute("aria-hidden","true");const Oe=document.createElement("span");if(Oe.className="message-text",!D&&typeof A>"u"&&Ae.classList.add("message-system"),Z){const{fileName:le,url:Ot}=Z,Ie=w.split(le)[0];Ie&&Oe.appendChild(document.createTextNode(Ie));const Et=document.createElement("a");Et.textContent=le,Et.href=Ot,Et.download=le,Et.style.cursor="pointer",Et.style.textDecoration="underline",Et.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(Ot),100)}),Oe.appendChild(Et)}else{const le=WL(w);Oe.appendChild(le)}if(Z&&Ae.classList.add("message-system"),Ae.appendChild(bt),Ae.appendChild(Oe),typeof A<"u"&&!Z&&j){if(Ae.dataset.messageId=j,Ba.set(j,Ae),V&&Object.keys(V).length>0){r.syncFromRemote(j,V);const le=r.getReactions(j);o.renderReactions(Ae,j,le)}o.enableDoubleTap(Ae,j,async(le,Ot,Ie,Et)=>{if(!e){console.warn("[MessagesUI] No current session for reaction");return}const nn=P();if(!nn){console.warn("[MessagesUI] No userId available for reaction");return}try{if(Et==="doubleTap"){const Ct=r.getUserReactionType(Ie,nn);let Fn;Ct?(await e.removeReaction(Ie,Ct),Fn=r.removeReaction(Ie,Ct,nn)):(await e.addReaction(Ie,le),Fn=r.addReaction(Ie,le,nn),Xn.enableAnimations&&o.showReactionAnimation(Ot,le)),o.renderReactions(Ot,Ie,Fn)}else if(Et==="picker"){const Ct=r.getUserReactionType(Ie,nn);let Fn;Ct===le?(await e.removeReaction(Ie,le),Fn=r.removeReaction(Ie,le,nn)):(Ct&&(await e.removeReaction(Ie,Ct),r.removeReaction(Ie,Ct,nn)),await e.addReaction(Ie,le),Fn=r.addReaction(Ie,le,nn),Xn.enableAnimations&&o.showReactionAnimation(Ot,le)),o.renderReactions(Ot,Ie,Fn)}}catch(Ct){console.warn("[MessagesUI] Failed to handle reaction:",Ct)}})}h.appendChild(Ae),Ad()}let xn=null;function Ad(){h&&(xn!==null&&cancelAnimationFrame(xn),xn=requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight,xn=null}))}function Nd(w,{isUnread:R=!0,senderDisplay:A="U",messageId:D,reactions:Z}={}){if(Se(w,{isSentByMe:!1,senderDisplay:A,messageId:D,reactions:Z}),xo(d)&&R){const j=c.element.unreadCount||0;c.setUnreadCount(j+1)}}function Pd(){const w=p.value.trim();w&&(e?(e.send(w),p.value="",g&&g()):console.warn("[MessagesUI] No active session to send message"))}f.addEventListener("submit",w=>{w.preventDefault(),Pd()}),p.addEventListener("keydown",w=>{w.key==="Enter"&&!w.shiftKey&&(w.preventDefault(),Pd())});const xw=()=>{const w=document.activeElement;return w&&(w.tagName==="INPUT"||w.tagName==="TEXTAREA"||w.isContentEditable)},Ld=w=>{(w.key==="m"||w.key==="M")&&!rt()&&!xw()&&(w.preventDefault(),fs())};document.addEventListener("keydown",Ld);function Pr(){xn!==null&&(cancelAnimationFrame(xn),xn=null),h.innerHTML="",h.scrollTop=0}function Lr(w){e!==null&&e!==w&&Pr(),e=w}function Fw(){return e}function Uw(w){n=w,n?(U(m),n.onFileReceived=async R=>{const A=URL.createObjectURL(R);if(R.type.startsWith("video/"))if(await $(R.name)==="watch"){if(Se(`📹 Received video: ${R.name}`,{isSentByMe:!1}),Se("🎬 Requesting partner to join watch together..."),!await cr(R)){Se("❌ Failed to load video");return}const j=await oL(R.name);Se(j?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const Z=document.createElement("a");Z.href=A,Z.download=R.name,Z.click(),setTimeout(()=>URL.revokeObjectURL(A),1e3),Se(`📎 Downloaded: ${R.name}`)}else Se(`📎 Received: ${R.name}`,{isSentByMe:!1,fileDownload:{fileName:R.name,url:A}});if(xo(d)){const D=c.element.unreadCount||0;c.setUnreadCount(D+1)}i&&(L.textContent="Send",i=!1)},n.onReceiveProgress=R=>{i=!0,L.textContent=`${Math.round(R*100)}%`}):C(m)}function $w(){Pr(),e=null,n=null,i=!1,Rd(),C(d),c.clearBadge(),p.value="",g&&g(),L&&(L.textContent="Send"),C(m),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",_e(),Ba.clear(),r.clearAll()}function Od(w,R){const A=Ba.get(w);if(!A)return;const D={};for(const[V,de]of Object.entries(R||{}))D[V]=de.length;const Z=r.getReactions(w);((V,de)=>{const Ae=Object.keys(V),bt=Object.keys(de);return Ae.length===bt.length&&Ae.every(Oe=>V[Oe]===de[Oe])})(D,Z)||(console.debug(`[MessagesUI] Syncing reaction state for ${w}:`,{local:Z,remote:D}),r.syncFromRemote(w,R),o.renderReactions(A,w,D))}function Bw(){if(c&&c.cleanup(),_e(),typeof J=="function")try{J()}catch(w){console.error("Error removing messages box outside click handler:",w)}vt.disconnect(),document.removeEventListener("keydown",Ld),u&&u.parentNode&&u.parentNode.removeChild(u)}function Hw(w,R,A=!1){if(!P()){Yy("Please sign in to send messages");return}const D=En.getSession(w);if(D){Lr(D),$a(),A&&!rt()&&fs(),D.markAsRead().catch(V=>{console.warn("Failed to mark messages as read:",V)});return}En.getAllSessions().forEach(V=>{V.close()}),Pr(),Lr(null);const j=En.openSession(w,{onMessage:(V,de,Ae)=>{if(de._reactionUpdate){const Oe={};if(de.reactions)for(const[le,Ot]of Object.entries(de.reactions))Oe[le]=Object.keys(Ot);Od(de.messageId,Oe);return}const bt={};if(de.reactions)for(const[Oe,le]of Object.entries(de.reactions))bt[Oe]=Object.keys(le);if(Ae)Se(V,{isSentByMe:!0,messageId:de.messageId,reactions:bt});else{const Oe=!de.read;Nd(V,{isUnread:Oe,messageId:de.messageId,reactions:bt})}}});j.contactName=R,Lr(j),$a(),A&&!rt()&&fs(),j.markAsRead().catch(V=>{console.warn("Failed to mark messages as read:",V)})}return{appendChatMessage:Se,receiveMessage:Nd,updateMessageReactions:Od,isMessagesUIOpen:rt,toggleMessages:fs,showMessagesToggle:$a,hideMessagesToggle:Rd,isMessageInputFocused:Ua,focusMessageInput:Dw,unfocusMessageInput:Mw,setSession:Lr,getCurrentSession:Fw,clearMessages:Pr,setFileTransfer:Uw,openContactMessages:Hw,reset:$w,cleanup:Bw}}const li=QL();class ZL{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(s){console.warn("CallController listener error",s)}}}class eO{constructor(){this.emitter=new ZL,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map,this.wasConnected=!1}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}getPeerConnection(){if(!this.pc)return console.warn("CallController.getPeerConnection: pc is null",{state:this.state,roomId:this.roomId,role:this.role,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}),null;const{connectionState:e,iceConnectionState:n,signalingState:i}=this.pc;return(e==="closed"||n==="closed")&&console.warn("CallController.getPeerConnection: pc is closed",{connectionState:e,iceConnectionState:n,signalingState:i}),this.pc}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=b(E,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(!o||i)return;const a=pe();if(o.by!==a){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(c){console.warn("Failed to clear remote video after cancellation",c)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(c){console.warn("Failed to trigger CallController cleanup",c)}}};Ii(n,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:s,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const s=b(E,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await he(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>wL);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};Ii(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=b(E,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await he(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>z0);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await ce.leaveRoom(pe(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Ii(n,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=pe(),i=s=>{s.key!==n&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};ce.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=pe(),i=s=>{s.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};ce.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&ut(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{Cr(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await vL(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.pc&&typeof this.pc.addEventListener=="function"&&this.pc.addEventListener("connectionstatechange",()=>{this.pc.connectionState==="connected"&&(this.wasConnected=!0,this.state!=="connected"&&(this.state="connected"))}),this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:i}=await he(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>j0);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await bL({...e,onMessagesUIReady:s=>{this.messagesUI=s}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,!this.messagesUI&&i.messagesUI&&(this.messagesUI=i.messagesUI),this.state="connected",this.wasConnected=!0,this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=s=>{this.dataChannel=s.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const i=new AL(e);En.setFileTransport(i),li.setFileTransfer(i.fileTransfer),G("[CallController] File transport initialized")}catch(i){console.error("[CallController] Failed to setup file transport:",i)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await ce.cancelCall(this.roomId,pe(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId,s=this.role,r=this.wasConnected;this.removeTrackedListeners();try{await ce.leaveRoom(pe(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear remote video",o)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear local video",o)}try{const{cleanupLocalStream:o}=await he(async()=>{const{cleanupLocalStream:a}=await Promise.resolve().then(()=>X0);return{cleanupLocalStream:a}},void 0);o()}catch(o){console.warn("CallController: failed to cleanup local stream",o)}try{const{resetLocalStreamInitFlag:o}=await he(async()=>{const{resetLocalStreamInitFlag:a}=await Promise.resolve().then(()=>FM);return{resetLocalStreamInitFlag:a}},void 0);o()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e});try{En.clearFileTransport(),li.setFileTransfer(null)}catch(o){console.warn("CallController: failed to cleanup file transport",o)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(o){console.warn("CallController: failed to cleanup messages UI",o)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,role:s,wasConnected:r,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const Ce=new eO,Cl={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function Jy(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?Cl.withVoiceIsolationIfSupported:Cl.default}const tO=()=>Cl.default,nO={landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30}}},iO=()=>{const t=window.matchMedia?.("(orientation: portrait)");if(t)return t.matches;const e=window.screen?.orientation?.type;return typeof e=="string"?e.includes("portrait"):window.innerHeight>=window.innerWidth};function Xy(t,e=null){if(e===null&&(e=iO()?"portrait":"landscape"),/Mobi|Android/i.test(navigator.userAgent))return{facingMode:t};const i=nO[e];return{facingMode:t,...i}}const sO=async()=>{if(Ay())return console.debug("Reusing existing local MediaStream."),La();const t=Xy("user"),e=Jy();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Fo(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const i=tO(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return Fo(s),s}throw n}};async function rO(t){const e=await sO(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function oO(t,e,n){return t.ontrack=i=>{G(`REMOTE TRACK RECEIVED: ${i.track.kind}`);const s=Pa()?ld():null;let r;i.streams&&i.streams[0]&&i.streams[0]instanceof MediaStream?r=i.streams[0]:(console.warn("No stream in track event, using fallback track handling"),s?(s.addTrack(i.track),r=s):r=new MediaStream([i.track])),ky(r),e.srcObject=r,i.track.kind==="video"&&(e.readyState>=1?e.style.opacity="1":(e.style.opacity="0",e.addEventListener("loadedmetadata",()=>{e.style.opacity="1"},{once:!0}))),s!==r||G(`Added ${i.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible")}catch(o){console.warn("Visibility override failed:",o)}},!0}let eo=null,It=null;async function sp(t,e="User"){const n=P(),i=Jt();if(!n||!i)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const s=sr(n,t),r=b(E,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:i.displayName||"Anonymous",fromEmail:i.email||"",fromPhotoURL:i.photoURL||null,roomId:s,timestamp:Date.now(),status:"pending"};await ee(r,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function aO(t){const e=P();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};Tl();const n=b(E,`users/${e}/incomingInvites`);return eo=Ki(n,i=>{const s=i.key,r=i.val();r&&r.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${r.fromName}`),t(s,r))}),console.log("[INVITATIONS] Listening for incoming invites"),Tl}async function Qy(t,e){const n=P(),i=Jt();if(!n||!i)throw new Error("Must be logged in to accept invites");const s=b(E,`users/${n}/contacts/${t}`);await ee(s,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const r=b(E,`users/${t}/acceptedInvites/${n}`);await ee(r,{acceptedByUserId:n,acceptedByName:i.displayName||"User",acceptedByEmail:i.email||"",acceptedByPhotoURL:i.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=b(E,`users/${n}/incomingInvites/${t}`);await Je(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function cO(t){const e=P();if(!e)throw new Error("Must be logged in to decline invites");const n=b(E,`users/${e}/incomingInvites/${t}`);await Je(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function lO(t){const e=P();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};It&&(It(),It=null);const n=b(E,`users/${e}/acceptedInvites`);return It=Ki(n,async i=>{const s=i.key,r=i.val();if(r)try{const o=b(E,`users/${e}/contacts/${s}`);await ee(o,{contactId:s,contactName:r.acceptedByName||"User",roomId:r.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${r.acceptedByName} (invite accepted)`);const a=b(E,`users/${e}/acceptedInvites/${s}`);await Je(a),t&&t(s,r)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{It&&(It(),It=null)}}function Tl(){eo&&(eo(),eo=null),It&&(It(),It=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}function Zy({template:t,handlers:e={},className:n="notification",parent:i=document.body,initialProps:s={},...r}){return Oa({template:t,handlers:e,className:n,parent:i,initialProps:s,containerTag:"div",autoAppend:!1,...r})}function uO({referrerName:t,referrerPhotoURL:e,onSignIn:n}){const i=t||"Someone",s=e?`<img src="${Qe(e)}" alt="${Qe(i)}" class="notification-avatar" />`:'<span class="notification-icon">👤</span>';return Zy({template:`
      <div class="notification-content">
        <div class="notification-header">
          ${s}
          <span class="notification-title">You've been invited</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${Qe(i)}</strong> invited you to connect
          </p>
          <p class="notification-detail">Sign in to add them as a contact</p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-accept" onclick="handleSignIn">
            Sign in
          </button>
        </div>
      </div>
    `,className:"notification referral-notification",handlers:{handleSignIn:async r=>{const o=r.target;o.disabled=!0,o.textContent="Signing in...";try{n&&await n()}catch(a){console.error("[REFERRAL NOTIFICATION] Sign-in failed:",a),o.disabled=!1,o.textContent="Sign in"}}}})}class dO{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=lr(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const ct=new dO;async function hO(){const e=new URLSearchParams(window.location.search).get("ref");if(e){console.log("[REFERRAL] Captured referrer ID:",e),localStorage.setItem("referredBy",e);const n=new URL(window.location.href);n.searchParams.delete("ref"),window.history.replaceState({},"",n.toString());const i=await ay(e),s=i?.displayName||null,r=i?.photoURL||null,o=s?`${s} invited you — tap here to sign in and connect`:"Tap here to sign in and connect with your inviter";Yy(o,{duration:8e3,onClick:()=>Do()});const a=uO({referrerName:s,referrerPhotoURL:r,onSignIn:()=>Do()});ct.add(`referral-${e}`,a)}}async function rp(){const t=localStorage.getItem("referredBy"),e=P();if(!(!t||!e)){if(t===e){console.log("[REFERRAL] Self-referral detected, skipping"),localStorage.removeItem("referredBy");return}try{console.log("[REFERRAL] Processing referral from:",t);const n=await ay(t),i=n?.displayName||t,s=n?.photoURL||null,r=sr(e,t),o={fromUserId:t,fromName:i,fromEmail:"",fromPhotoURL:s,roomId:r,timestamp:Date.now(),status:"pending"};await Qy(t,o),console.log(`[REFERRAL] ✅ Connected with ${i} via referral link!`),_d(`✅ Connected with ${i}!`),ct.remove(`referral-${t}`),localStorage.removeItem("referredBy")}catch(n){console.error("[REFERRAL] Failed to process referral:",n)}}}const ew="@firebase/installations",yd="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tw=1e4,nw=`w:${yd}`,iw="FIS_v2",fO="https://firebaseinstallations.googleapis.com/v1",pO=3600*1e3,gO="installations",mO="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _O={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ui=new On(gO,mO,_O);function sw(t){return t instanceof en&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rw({projectId:t}){return`${fO}/projects/${t}/installations`}function ow(t){return{token:t.token,requestStatus:2,expiresIn:wO(t.expiresIn),creationTime:Date.now()}}async function aw(t,e){const i=(await e.json()).error;return ui.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function cw({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function yO(t,{refreshToken:e}){const n=cw(t);return n.append("Authorization",vO(e)),n}async function lw(t){const e=await t();return e.status>=500&&e.status<600?t():e}function wO(t){return Number(t.replace("s","000"))}function vO(t){return`${iw} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bO({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=rw(t),s=cw(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:iw,appId:t.appId,sdkVersion:nw},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await lw(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:ow(l.authToken)}}else throw await aw("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uw(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EO(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CO=/^[cdef][\w-]{21}$/,Sl="";function TO(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=SO(t);return CO.test(n)?n:Sl}catch{return Sl}}function SO(t){return EO(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Da(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw=new Map;function hw(t,e){const n=Da(t);fw(n,e),IO(n,e)}function fw(t,e){const n=dw.get(t);if(n)for(const i of n)i(e)}function IO(t,e){const n=kO();n&&n.postMessage({key:t,fid:e}),RO()}let qn=null;function kO(){return!qn&&"BroadcastChannel"in self&&(qn=new BroadcastChannel("[Firebase] FID Change"),qn.onmessage=t=>{fw(t.data.key,t.data.fid)}),qn}function RO(){dw.size===0&&qn&&(qn.close(),qn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AO="firebase-installations-database",NO=1,di="firebase-installations-store";let yc=null;function wd(){return yc||(yc=ia(AO,NO,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(di)}}})),yc}async function Ho(t,e){const n=Da(t),s=(await wd()).transaction(di,"readwrite"),r=s.objectStore(di),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&hw(t,e.fid),e}async function pw(t){const e=Da(t),i=(await wd()).transaction(di,"readwrite");await i.objectStore(di).delete(e),await i.done}async function Ma(t,e){const n=Da(t),s=(await wd()).transaction(di,"readwrite"),r=s.objectStore(di),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&hw(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vd(t){let e;const n=await Ma(t.appConfig,i=>{const s=PO(i),r=LO(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===Sl?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function PO(t){const e=t||{fid:TO(),registrationStatus:0};return gw(e)}function LO(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ui.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=OO(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:DO(t)}:{installationEntry:e}}async function OO(t,e){try{const n=await bO(t,e);return Ho(t.appConfig,n)}catch(n){throw sw(n)&&n.customData.serverCode===409?await pw(t.appConfig):await Ho(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function DO(t){let e=await op(t.appConfig);for(;e.registrationStatus===1;)await uw(100),e=await op(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await vd(t);return i||n}return e}function op(t){return Ma(t,e=>{if(!e)throw ui.create("installation-not-found");return gw(e)})}function gw(t){return MO(t)?{fid:t.fid,registrationStatus:0}:t}function MO(t){return t.registrationStatus===1&&t.registrationTime+tw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xO({appConfig:t,heartbeatServiceProvider:e},n){const i=FO(t,n),s=yO(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:nw,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await lw(()=>fetch(i,a));if(c.ok){const l=await c.json();return ow(l)}else throw await aw("Generate Auth Token",c)}function FO(t,{fid:e}){return`${rw(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bd(t,e=!1){let n;const i=await Ma(t.appConfig,r=>{if(!mw(r))throw ui.create("not-registered");const o=r.authToken;if(!e&&BO(o))return r;if(o.requestStatus===1)return n=UO(t,e),r;{if(!navigator.onLine)throw ui.create("app-offline");const a=jO(r);return n=$O(t,a),a}});return n?await n:i.authToken}async function UO(t,e){let n=await ap(t.appConfig);for(;n.authToken.requestStatus===1;)await uw(100),n=await ap(t.appConfig);const i=n.authToken;return i.requestStatus===0?bd(t,e):i}function ap(t){return Ma(t,e=>{if(!mw(e))throw ui.create("not-registered");const n=e.authToken;return VO(n)?{...e,authToken:{requestStatus:0}}:e})}async function $O(t,e){try{const n=await xO(t,e),i={...e,authToken:n};return await Ho(t.appConfig,i),n}catch(n){if(sw(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await pw(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await Ho(t.appConfig,i)}throw n}}function mw(t){return t!==void 0&&t.registrationStatus===2}function BO(t){return t.requestStatus===2&&!HO(t)}function HO(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+pO}function jO(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function VO(t){return t.requestStatus===1&&t.requestTime+tw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WO(t){const e=t,{installationEntry:n,registrationPromise:i}=await vd(e);return i?i.catch(console.error):bd(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qO(t,e=!1){const n=t;return await zO(n),(await bd(n,e)).token}async function zO(t){const{registrationPromise:e}=await vd(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GO(t){if(!t||!t.options)throw wc("App Configuration");if(!t.name)throw wc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw wc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function wc(t){return ui.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w="installations",KO="installations-internal",YO=t=>{const e=t.getProvider("app").getImmediate(),n=GO(e),i=Dn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},JO=t=>{const e=t.getProvider("app").getImmediate(),n=Dn(e,_w).getImmediate();return{getId:()=>WO(n),getToken:s=>qO(n,s)}};function XO(){it(new Ye(_w,YO,"PUBLIC")),it(new Ye(KO,JO,"PRIVATE"))}XO();Ge(ew,yd);Ge(ew,yd,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QO="/firebase-messaging-sw.js",ZO="/firebase-cloud-messaging-push-scope",yw="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",eD="https://fcmregistrations.googleapis.com/v1",ww="google.c.a.c_id",tD="google.c.a.c_l",nD="google.c.a.ts",iD="google.c.a.e",cp=1e4;var lp;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(lp||(lp={}));/**
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
 */var ur;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(ur||(ur={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function sD(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vc="fcm_token_details_db",rD=5,up="fcm_token_object_Store";async function oD(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(vc))return null;let e=null;return(await ia(vc,rD,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(up))return;const a=o.objectStore(up),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:Mt(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Mt(l.auth),p256dh:Mt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Mt(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Mt(l.auth),p256dh:Mt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Mt(l.vapidKey)}}}}}})).close(),await Qa(vc),await Qa("fcm_vapid_details_db"),await Qa("undefined"),aD(e)?e:null}function aD(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cD="firebase-messaging-database",lD=1,hi="firebase-messaging-store";let bc=null;function Ed(){return bc||(bc=ia(cD,lD,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(hi)}}})),bc}async function vw(t){const e=Td(t),i=await(await Ed()).transaction(hi).objectStore(hi).get(e);if(i)return i;{const s=await oD(t.appConfig.senderId);if(s)return await Cd(t,s),s}}async function Cd(t,e){const n=Td(t),s=(await Ed()).transaction(hi,"readwrite");return await s.objectStore(hi).put(e,n),await s.done,e}async function uD(t){const e=Td(t),i=(await Ed()).transaction(hi,"readwrite");await i.objectStore(hi).delete(e),await i.done}function Td({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Re=new On("messaging","Messaging",dD);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hD(t,e){const n=await Id(t),i=Ew(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(Sd(t.appConfig),s)).json()}catch(o){throw Re.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Re.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw Re.create("token-subscribe-no-token");return r.token}async function fD(t,e){const n=await Id(t),i=Ew(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${Sd(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw Re.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Re.create("token-update-failed",{errorInfo:o})}if(!r.token)throw Re.create("token-update-no-token");return r.token}async function bw(t,e){const i={method:"DELETE",headers:await Id(t)};try{const r=await(await fetch(`${Sd(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw Re.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw Re.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function Sd({projectId:t}){return`${eD}/projects/${t}/registrations`}async function Id({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Ew({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==yw&&(s.web.applicationPubKey=i),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pD=10080*60*1e3;async function gD(t){const e=await yD(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Mt(e.getKey("auth")),p256dh:Mt(e.getKey("p256dh"))},i=await vw(t.firebaseDependencies);if(i){if(wD(i.subscriptionOptions,n))return Date.now()>=i.createTime+pD?_D(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await bw(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return dp(t.firebaseDependencies,n)}else return dp(t.firebaseDependencies,n)}async function mD(t){const e=await vw(t.firebaseDependencies);e&&(await bw(t.firebaseDependencies,e.token),await uD(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function _D(t,e){try{const n=await fD(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await Cd(t.firebaseDependencies,i),n}catch(n){throw n}}async function dp(t,e){const i={token:await hD(t,e),createTime:Date.now(),subscriptionOptions:e};return await Cd(t,i),i.token}async function yD(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:sD(e)})}function wD(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hp(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return vD(e,t),bD(e,t),ED(e,t),e}function vD(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function bD(t,e){e.data&&(t.data=e.data)}function ED(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const i=e.fcmOptions?.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CD(t){return typeof t=="object"&&!!t&&ww in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TD(t){if(!t||!t.options)throw Ec("App Configuration Object");if(!t.name)throw Ec("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw Ec(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Ec(t){return Re.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SD{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=TD(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cw(t){try{t.swRegistration=await navigator.serviceWorker.register(QO,{scope:ZO}),t.swRegistration.update().catch(()=>{}),await ID(t.swRegistration)}catch(e){throw Re.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function ID(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${cp} ms`)),cp),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{r.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kD(t,e){if(!e&&!t.swRegistration&&await Cw(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Re.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RD(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=yw)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tw(t,e){if(!navigator)throw Re.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Re.create("permission-blocked");return await RD(t,e?.vapidKey),await kD(t,e?.serviceWorkerRegistration),gD(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AD(t,e,n){const i=ND(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[ww],message_name:n[tD],message_time:n[nD],message_device_time:Math.floor(Date.now()/1e3)})}function ND(t){switch(t){case ur.NOTIFICATION_CLICKED:return"notification_open";case ur.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PD(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===ur.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(hp(n)):t.onMessageHandler.next(hp(n)));const i=n.data;CD(i)&&i[iD]==="1"&&await AD(t,n.messageType,i)}const fp="@firebase/messaging",pp="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LD=t=>{const e=new SD(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>PD(e,n)),e},OD=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>Tw(e,i)}};function DD(){it(new Ye("messaging",LD,"PUBLIC")),it(new Ye("messaging-internal",OD,"PRIVATE")),Ge(fp,pp),Ge(fp,pp,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MD(){try{await Ng()}catch{return!1}return typeof window<"u"&&ea()&&YT()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xD(t){if(!navigator)throw Re.create("only-available-in-window");return t.swRegistration||await Cw(t),mD(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FD(t,e){if(!navigator)throw Re.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UD(t=sa()){return MD().then(e=>{if(!e)throw Re.create("unsupported-browser")},e=>{throw Re.create("indexed-db-unsupported")}),Dn(re(t),"messaging").getImmediate()}async function $D(t,e){return t=re(t),Tw(t,e)}function gp(t){return t=re(t),xD(t)}function BD(t,e){return t=re(t),FD(t,e)}DD();class xa{constructor(){this.messaging=null,this.currentToken=null,this.vapidKey=hN,this.isInitialized=!1,this.messageCallbacks=new Set,this.tokenRefreshCallbacks=new Set}async initialize(){if(this.isInitialized)return!0;try{return xa.isSupported()?this.vapidKey?(this.messaging=UD(ba),BD(this.messaging,e=>{console.log("[FCMTransport] Foreground message received:",e),this.messageCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in message callback:",i)}})}),this.isInitialized=!0,console.log("[FCMTransport] Initialized successfully"),!0):(console.warn("[FCMTransport] VAPID key not configured"),!1):(console.warn("[FCMTransport] FCM not supported in this environment"),!1)}catch(e){return console.error("[FCMTransport] Initialization failed:",e),!1}}async getToken(){if(!this.isInitialized&&(console.log("[FCMTransport] Not initialized, initializing now..."),!await this.initialize()))return console.error("[FCMTransport] Initialization failed, cannot get token"),null;try{console.log("[FCMTransport] Requesting FCM token..."),console.log("[FCMTransport] VAPID key present:",!!this.vapidKey),console.log("[FCMTransport] Messaging instance:",!!this.messaging);const e=await $D(this.messaging,{vapidKey:this.vapidKey});return e?(this.currentToken=e,console.log("[FCMTransport] Token obtained successfully"),console.log("[FCMTransport] Token (truncated):",e.substring(0,20)+"..."),await this.storeUserToken(e),e):(console.warn("[FCMTransport] No registration token available"),console.warn("[FCMTransport] This usually means:"),console.warn("[FCMTransport]   1. Service worker is not registered"),console.warn("[FCMTransport]   2. Notification permission not granted"),console.warn("[FCMTransport]   3. VAPID key is incorrect"),null)}catch(e){return console.error("[FCMTransport] Failed to get token:",e),console.error("[FCMTransport] Error name:",e.name),console.error("[FCMTransport] Error code:",e.code),console.error("[FCMTransport] Error message:",e.message),e.code==="messaging/unsupported-browser"?console.error("[FCMTransport] Browser does not support FCM"):e.code==="messaging/permission-blocked"?console.error("[FCMTransport] Notification permission is blocked"):e.code==="messaging/failed-service-worker-registration"&&(console.error("[FCMTransport] Service worker registration failed"),console.error("[FCMTransport] Make sure service worker is registered before calling getToken()")),null}}async refreshToken(){if(console.log("[FCMTransport] Refreshing token..."),this.currentToken)try{await gp(this.messaging),await this.removeUserToken(this.currentToken)}catch(n){console.warn("[FCMTransport] Failed to delete old token:",n)}this.currentToken=null;const e=await this.getToken();return e&&this.tokenRefreshCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in token refresh callback:",i)}}),e}async deleteToken(){if(!this.messaging||!this.currentToken)return!0;try{return await gp(this.messaging),await this.removeUserToken(this.currentToken),this.currentToken=null,console.log("[FCMTransport] Token deleted successfully"),!0}catch(e){return console.error("[FCMTransport] Failed to delete token:",e),!1}}async storeUserToken(e){const n=P();if(!n){console.warn("[FCMTransport] Cannot store token: user not logged in");return}try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`),s={token:e,deviceInfo:{platform:this.getPlatform(),timestamp:Date.now()},createdAt:Date.now(),lastUsed:Date.now()};await ee(i,s),console.log("[FCMTransport] Token stored in RTDB")}catch(i){console.error("[FCMTransport] Failed to store token in RTDB:",i)}}async removeUserToken(e){const n=P();if(n)try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`);await Je(i),console.log("[FCMTransport] Token removed from RTDB")}catch(i){console.error("[FCMTransport] Failed to remove token from RTDB:",i)}}async getUserTokens(e){try{const n=b(E,`users/${e}/fcmTokens`),i=await Pe(n);if(i.exists()){const s=i.val();return Object.values(s)}return[]}catch(n){return console.error("[FCMTransport] Failed to get user tokens:",n),[]}}async sendCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Incoming call from ${r}`,body:"Tap to answer or decline",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMissedCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"missed_call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Missed call from ${r}`,body:"Tap to call back",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMessageNotification(e,n){const{senderId:i,senderName:s,messageText:r}=n,o=typeof r=="string"?r:String(r||""),a=o.length>50?o.substring(0,47)+"...":o,c={type:"message",senderId:i,senderName:s,messagePreview:a,timestamp:Date.now().toString()},l="/HangVidU/",u={notification:{title:`New message from ${s}`,body:a,icon:`${l}icons/play-arrows-v1/icon-192.png`,badge:`${l}icons/play-arrows-v1/icon-192.png`},data:c};return this.sendNotification(e,u)}async sendNotification(e,n){try{{let o=null;try{const{getLoggedInUserToken:l}=await he(async()=>{const{getLoggedInUserToken:u}=await Promise.resolve().then(()=>Xu);return{getLoggedInUserToken:u}},void 0);o=await l()}catch(l){console.warn("[FCMTransport] Failed to get auth token:",l)}const a={"Content-Type":"application/json"};o&&(a.Authorization=`Bearer ${o}`);const c=await fetch("https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification",{method:"POST",headers:a,body:JSON.stringify({targetUserId:e,callData:n.data})});if(c.ok){const l=await c.json();return console.log(`[FCMTransport] FCM notification sent to ${e}:`,l),!0}else return console.error("[FCMTransport] FCM function failed:",c.status),!1}const i=b(E,`notifications/${e}`),s=Zs(i).key,r={id:s,payload:n,createdAt:Date.now(),delivered:!1};return await ee(b(E,`notifications/${e}/${s}`),r),console.log(`[FCMTransport] Notification queued for user ${e} (dev mode)`),!0}catch(i){return console.error("[FCMTransport] Failed to send notification:",i),!1}}onMessage(e){return this.messageCallbacks.add(e),()=>this.messageCallbacks.delete(e)}onTokenRefresh(e){return this.tokenRefreshCallbacks.add(e),()=>this.tokenRefreshCallbacks.delete(e)}getTokenId(e){return btoa(e).replace(/[^a-zA-Z0-9]/g,"").substring(0,20)}getPlatform(){const e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)?"ios":/Android/.test(e)?"android":/Macintosh/.test(e)?"macos":/Windows/.test(e)?"windows":"unknown"}static isSupported(){return"serviceWorker"in navigator&&"Notification"in window&&"PushManager"in window}}const HD=Object.freeze(Object.defineProperty({__proto__:null,FCMTransport:xa},Symbol.toStringTag,{value:"Module"}));class jD{constructor(e=null,n={}){this.transport=e||new xa,this.isEnabled=!1,this.permissionState="default",this.options={enableCallNotifications:!0,enableMessageNotifications:!0,privacyMode:!1,autoHideSuccessMs:6e3,...n},this.activeNotifications=new Map,this.permissionCallbacks=new Set,this.notificationCallbacks=new Set}async initialize(){try{return await this.transport.initialize()?(this.permissionState=this.getPermissionState(),this.transport.onMessage(n=>{this.handleForegroundMessage(n)}),console.log("[PushNotificationController] Initialized successfully"),!0):(console.warn("[PushNotificationController] Transport initialization failed"),!1)}catch(e){return console.error("[PushNotificationController] Initialization failed:",e),!1}}async requestPermission(e={}){const{title:n="Enable notifications",explain:i="Get notified of incoming calls and messages even when the app is closed.",onGranted:s=null,onDenied:r=null,onDismissed:o=null}=e;if(!this.isNotificationSupported())return console.warn("[PushNotificationController] Notifications not supported"),{state:"denied",reason:"unsupported"};this.detectBrowser();const a=Notification.permission;if(this.permissionState=a,a==="granted")return await this.enable(),s?.(),{state:"granted"};if(a==="denied")return r?.("already-denied"),{state:"denied",reason:"already-denied"};let c;try{c=await Notification.requestPermission()}catch(l){console.error("[PushNotificationController] Permission request failed:",l),c=Notification.permission}return this.permissionState=c,c==="granted"?(await this.enable(),s?.(),{state:"granted"}):a==="default"&&c==="denied"?(r?.("silent-block"),{state:"denied",reason:"silent-block"}):c==="default"?(o?.(),{state:"dismissed"}):(r?.(),{state:"denied"})}async enable(){if(this.permissionState!=="granted")return console.warn("[PushNotificationController] Cannot enable: permission not granted"),!1;try{return await this.transport.getToken()?(this.isEnabled=!0,console.log("[PushNotificationController] Notifications enabled"),this.permissionCallbacks.forEach(n=>{try{n("enabled")}catch(i){console.error("[PushNotificationController] Error in permission callback:",i)}}),!0):(console.warn("[PushNotificationController] Failed to get FCM token"),!1)}catch(e){return console.error("[PushNotificationController] Failed to enable notifications:",e),!1}}async disable(){try{return await this.transport.deleteToken(),this.isEnabled=!1,this.activeNotifications.clear(),console.log("[PushNotificationController] Notifications disabled"),this.permissionCallbacks.forEach(e=>{try{e("disabled")}catch(n){console.error("[PushNotificationController] Error in permission callback:",n)}}),!0}catch(e){return console.error("[PushNotificationController] Failed to disable notifications:",e),!1}}async sendCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[PushNotificationController] Call notifications disabled"),!1;try{const i=await this.transport.sendCallNotification(e,n);if(i){const s=`call_${n.roomId}_${Date.now()}`;this.activeNotifications.set(s,{type:"call",roomId:n.roomId,targetUserId:e,timestamp:Date.now()}),console.log(`[PushNotificationController] Call notification sent to ${e}`)}return i}catch(i){return console.error("[PushNotificationController] Failed to send call notification:",i),!1}}async sendMissedCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[PushNotificationController] Call notifications disabled (missed call masked)"),!1;try{const i=await this.transport.sendMissedCallNotification(e,n);return i&&console.log(`[PushNotificationController] Missed call notification sent to ${e}`),i}catch(i){return console.error("[PushNotificationController] Failed to send missed call notification:",i),!1}}async sendMessageNotification(e,n){if(!this.options.enableMessageNotifications)return console.log("[PushNotificationController] Message notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[PushNotificationController] Not sending message notification (app in foreground)"),!1;try{const i=await this.transport.sendMessageNotification(e,n);if(i){const s=`message_${e}_${Date.now()}`;this.activeNotifications.set(s,{type:"message",senderId:n.senderId,targetUserId:e,timestamp:Date.now()}),console.log(`[PushNotificationController] Message notification sent to ${e}`)}return i}catch(i){return console.error("[PushNotificationController] Failed to send message notification:",i),!1}}async dismissCallNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="call"&&s.roomId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[PushNotificationController] Dismissed ${n.length} call notifications for room ${e}`)}catch(n){console.error("[PushNotificationController] Failed to dismiss call notifications:",n)}}async dismissMessageNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="message"&&s.senderId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[PushNotificationController] Dismissed ${n.length} message notifications from ${e}`)}catch(n){console.error("[PushNotificationController] Failed to dismiss message notifications:",n)}}async cleanupOldNotifications(){const e=Date.now(),n=1440*60*1e3,i=[];for(const[s,r]of this.activeNotifications)e-r.timestamp>n&&i.push(s);i.forEach(s=>this.activeNotifications.delete(s)),i.length>0&&console.log(`[PushNotificationController] Cleaned up ${i.length} old notifications`)}handleForegroundMessage(e){console.log("[PushNotificationController] Foreground message received:",e);const n=e?.data?.senderId||e?.data?.callerId,i=P();if(n&&i&&n===i){console.log("[PushNotificationController] Ignoring self-notification");return}this.notificationCallbacks.forEach(s=>{try{s(e)}catch(r){console.error("[PushNotificationController] Error in notification callback:",r)}})}shouldSendNotification(){return document.hidden||!document.hasFocus()}getPermissionState(){return this.isNotificationSupported()?Notification.permission:"unsupported"}isNotificationEnabled(){return this.isEnabled&&this.permissionState==="granted"}isNotificationSupported(){const e=this.transport?.constructor;return typeof e?.isSupported=="function"?e.isSupported():"Notification"in window&&"serviceWorker"in navigator}updateOptions(e){this.options={...this.options,...e},console.log("[PushNotificationController] Options updated:",this.options)}onPermissionChange(e){return this.permissionCallbacks.add(e),()=>this.permissionCallbacks.delete(e)}onNotification(e){return this.notificationCallbacks.add(e),()=>this.notificationCallbacks.delete(e)}detectBrowser(){if(navigator.userAgentData&&navigator.userAgentData.brands){const n=navigator.userAgentData.brands.map(i=>i.brand);if(n.some(i=>i.includes("Microsoft Edge")))return"Edge";if(n.some(i=>i.includes("Google Chrome")))return"Chrome";if(n.some(i=>i.includes("Chromium")))return"Chromium"}const e=navigator.userAgent;return e.includes("Edg/")?"Edge":e.includes("Chrome/")?"Chrome":e.includes("Safari/")&&!e.includes("Chrome")?"Safari":e.includes("Firefox/")?"Firefox":"Your browser"}async formatCallNotification(e){const{roomId:n,callerId:i,callerName:s}=e;let r=s||i||"Unknown caller";if(!s)try{const{resolveCallerName:o}=await he(async()=>{const{resolveCallerName:a}=await Promise.resolve().then(()=>Il);return{resolveCallerName:a}},void 0);r=await o(n,i)}catch(o){console.warn("[PushNotificationController] Failed to resolve caller name:",o)}return this.options.privacyMode&&(r="Someone"),{...e,callerName:r}}async formatMessageNotification(e){const{senderId:n,senderName:i,messageText:s}=e;let r=i,o=s;try{const{getContacts:a}=await he(async()=>{const{getContacts:l}=await Promise.resolve().then(()=>Il);return{getContacts:l}},void 0),c=await a();c&&c[n]&&(r=c[n].name||i)}catch(a){console.warn("[PushNotificationController] Failed to resolve sender name:",a),r=i||n||"Unknown sender"}return this.options.privacyMode?(r="Someone",o="New message"):o&&o.length>50&&(o=o.substring(0,47)+"..."),{...e,senderName:r,messageText:o}}}const be=new jD;function VD(){C(De),C(Ee),C(Ue),C(tt)}function WD(t){t.on("memberJoined",$y),t.on("cleanup",()=>{Jn(),By()})}let xi=null;function Fa(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),xi===a&&(xi=null),n(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),xi=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function qD(){if(typeof xi=="function"){try{xi(!1)}catch{}return xi=null,!0}return!1}const zD=Object.freeze(Object.defineProperty({__proto__:null,default:Fa,dismissActiveConfirmDialog:qD},Symbol.toStringTag,{value:"Module"})),$s=new Map,Bs=new Map,dn=new Map,mp=14;function GD(t){return Object.keys(t).sort((e,n)=>{const i=t[e]?.lastInteractionAt||t[e]?.savedAt||0;return(t[n]?.lastInteractionAt||t[n]?.savedAt||0)-i})}async function jo(t,e,n){const i=P(),s=Date.now();if(i){const r=b(E,`users/${i}/contacts/${t}`);await ee(r,{contactId:t,contactName:e,roomId:n,savedAt:s,lastInteractionAt:s});return}try{const r=localStorage.getItem("contacts")||"{}",o=JSON.parse(r);o[t]={contactId:t,contactName:e,roomId:n,savedAt:s,lastInteractionAt:s},localStorage.setItem("contacts",JSON.stringify(o))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function Sw(t){const e=P();if(e)try{const n=b(E,`users/${e}/contacts/${t}`);await bn(n,{lastInteractionAt:Date.now()})}catch(n){console.warn("Failed to update lastInteractionAt",n)}}async function Zt(){const t=P();if(t)try{const e=b(E,`users/${t}/contacts`),n=await Pe(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function KD(t){if(!t)return null;try{const e=await Zt();for(const n of Object.values(e||{}))if(n?.roomId===t)return n}catch(e){console.warn("Failed to get contact by roomId",e)}return null}async function Iw(t,e){if(!t)return e||"Unknown";try{const n=await Zt();for(const i of Object.values(n||{}))if(i?.roomId===t)return i.contactName||i.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function kw(t,e,n){if(!t||!e)return;const s=(await Zt())?.[t];if(s){s.roomId!==e&&(await jo(t,s.contactName,e),await Nt(n)),fi(e);return}if(!await Fa("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await jo(t,o,e),fi(e),await Nt(n)}async function Nt(t){if(!t)return;const e=await Zt(),n=GD(e);let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",C(i);return}U(i),i.innerHTML=`
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
                ${r.contactName&&r.contactName.length>mp?r.contactName.slice(0,mp-2)+"..":r.contactName}
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
  `,YD(i,t),JD(n),await XD(i,n,e),P()&&Promise.all(n.map(async s=>{if(!(await Pe(b(E,`users/${s}/presence`))).exists()){const o=i.querySelector(`.contact-entry:has([data-contact-id="${s}"])`);o&&o.remove()}})).catch(s=>console.warn("[CONTACTS] Background presence check failed:",s))}function YD(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=i=>{i.stopPropagation();const s=n.getAttribute("data-contact-id"),r=n.getAttribute("data-contact-name");if(s){li.openContactMessages(s,r);const o=dn.get(s);o&&o.clearBadge()}}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let i=n.getAttribute("data-room-id");const s=n.getAttribute("data-contact-name"),r=n.getAttribute("data-contact-id");if(!i&&r){const o=P();if(o)try{i=sr(o,r),console.log("[CONTACTS] Generated deterministic room ID:",i),await jo(r,s,i),n.setAttribute("data-room-id",i)}catch(a){console.error("[CONTACTS] Failed to generate or save room ID:",a);return}}if(i&&(fi(i),await Nr(i,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1)))){Sw(r),await _y(i,s);try{const a=Jt(),c=a?.displayName||a?.email||P();await be.sendCallNotification(r,{roomId:i,callerId:P(),callerName:c}),console.log("[CONTACTS] Call notification sent to:",s)}catch(a){console.warn("[CONTACTS] Failed to send call notification:",a)}}}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!await Fa("Delete this contact?")||(await QD(i),await Nt(e))}}),t.querySelectorAll(".contact-edit-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");if(!i)return;const r=(await Zt())[i];if(!r)return;const o=prompt("Enter new name for this contact:",r.contactName);o&&o.trim()&&o.trim()!==r.contactName&&(await jo(i,o.trim(),r.roomId),await Nt(e))}})}function JD(t){$s.forEach(({ref:e,callback:n})=>{ut(e,"value",n)}),$s.clear(),P()&&t.forEach(e=>{const n=b(E,`users/${e}/presence`),i=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!i)return;const s=r=>{const a=r.val()?.state==="online";i.classList.toggle("online",a),i.title=a?"Online":"Offline"};Ru(n,s),$s.set(e,{ref:n,callback:s})})}let vs=!1,vi=null;async function XD(t,e,n){if(!P())return;const i=10;let s=0;for(;vs&&s<i;)await new Promise(r=>setTimeout(r,100)),s++;if(vs){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}vs=!0,vi&&clearTimeout(vi),vi=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),vs=!1},5e3);try{dn.forEach(o=>{o.cleanup()}),dn.clear(),Bs.forEach(o=>{o()}),Bs.clear();const r=P();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=Ky({parent:c,onToggle:()=>{li.openContactMessages(o,a.contactName,!0);const d=dn.get(o);d&&d.clearBadge()},icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}dn.set(o,l);const u=En.listenToUnreadCount(o,d=>{l.setUnreadCount(d),d>0&&Sw(o)});Bs.set(o,u)}Promise.all(e.map(o=>En.getUnreadCount(o).then(a=>{const c=dn.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{vi&&(clearTimeout(vi),vi=null),vs=!1}}async function QD(t){const e=P();if(e){try{await Je(b(E,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}function Rw(){$s.forEach(({ref:t,callback:e})=>{ut(t,"value",e)}),$s.clear(),Bs.forEach(t=>t()),Bs.clear(),dn.forEach(t=>t.cleanup()),dn.clear()}const Il=Object.freeze(Object.defineProperty({__proto__:null,cleanupContacts:Rw,getContactByRoomId:KD,getContacts:Zt,renderContactsList:Nt,resolveCallerName:Iw,saveContact:kw},Symbol.toStringTag,{value:"Module"}));function ZD(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function eM(){return ZD()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function tM(){const t=await eM();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function nM({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:Xy(s),audio:Jy()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let _p=[];function iM(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function sM({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){r&&(r.onclick=()=>{const d=t();if(!d)return;const h=d.getAudioTracks()[0];h&&(h.enabled=!h.enabled,iM(!h.enabled,r))}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}}),a&&(a.onclick=async()=>{const d=await nM({localStream:t(),localVideo:e(),currentFacingMode:Sy(),peerConnection:i()||null});d?(Iy(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof s=="function"&&s(d.newStream)):console.error("Camera switch failed.")},(async()=>await tM()?U(a):C(a))()),c&&(c.onclick=()=>{const d=n();if(!d)return;d.muted=!d.muted;const h=c.querySelector("i");h.className=d.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const d=n();d&&(cd(d)?await Na(d):await Cy(d,d.parentElement))})}function rM(){_p.forEach(t=>t()),_p=[]}let Cc=null,hn=null,te=null,Q=null,yp=!1,jr=!1,Rt=[],kl="",Ne=-1,Rl=[];const oM="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",aM="https://www.googleapis.com/youtube/v3";async function cM(){if(yp||jr)return!1;jr=!0;const{initializeYouTubeElements:t}=await he(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>K0);return{initializeYouTubeElements:o}},void 0),e=await t();if(Cc=e.searchContainer,hn=e.searchBtn,te=e.searchQuery,Q=e.searchResults,!Cc||!hn||!te||!Q)return console.error("YouTube search elements not found in DOM"),jr=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(Q?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),Ne=o??-1};hn.onclick=async()=>{const o=te.value.trim();if(xo(te)){U(te),te.focus();return}if(!o){to(),C(te);return}if(bp()&&o===kl)Al(Rt);else if(!n(o))await wp(o);else{await cr({url:o,title:o,channel:"",thumbnail:"",id:o}),C(Q),te.value="",C(te),Ne=-1;return}},Cc.addEventListener("keydown",async o=>{const a=Q.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=Ne+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=Ne-1;c<0&&(c=Ne===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&Ne>=0){a[Ne].click(),C(te),C(Q),Ne=-1;return}const c=te.value.trim();if(c)if(bp()&&c===kl)Al(Rt);else if(!n(c))await wp(c);else{await cr({url:c,title:c,channel:"",thumbnail:"",id:c}),C(Q),Ne=-1,te.value="",C(te);return}}else o.key==="Escape"&&(uM()?to():te.value?te.value="":C(te))}),te.addEventListener("input",()=>{te.value.trim()===""&&to(),Ne=-1});const s=lr(te,()=>C(te),{ignore:[hn],esc:!1});Rl.push(s);const r=lr(Q,()=>C(Q),{ignore:[hn],esc:!1});return Rl.push(r),jr=!1,yp=!0,!0}async function wp(t){if(!hn||!Q){console.error("Search elements not initialized");return}Rt=[],kl=t,hn.disabled=!0,Q.innerHTML='<div class="search-loading">Searching YouTube...</div>',U(Q);try{const e=await fetch(`${aM}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${oM}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){vp("No videos found"),Rt=[];return}Rt=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Al(Rt)}catch(e){console.error("YouTube search failed:",e),vp(e.message||"Search failed. Please try again.")}finally{hn.disabled=!1}}function Al(t){if(!Q){console.error("Search results element not initialized");return}if(!t||t.length===0){Q.innerHTML='<div class="search-no-results">No results found</div>',Rt=[],Ne=-1;return}Q.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(await cr(n),C(Q),Ne=-1,!te){console.error("Search query element not initialized");return}te.value="",C(te)},Q.appendChild(i)}),U(Q),Ne=0,Q.querySelectorAll(".search-result-item").forEach((n,i)=>{i===Ne?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function vp(t){if(Rt=[],Ne=-1,!Q){console.error("Search results element not initialized");return}Q.innerHTML=`<div class="search-error">${t}</div>`,U(Q)}function to(){Rt=[],Ne=-1,Q&&(Q.innerHTML="",C(Q))}function lM(){to(),Rl.forEach(t=>t())}function uM(){return!xo(Q)}function bp(){return Rt.length>0}function dM({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let s=e;const r=Oa({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():s&&s.toggleList()}},className:"notifications-toggle-container",parent:t});let o=r.querySelector(".notification-badge");return o&&(o.style.display="none"),r.onPropUpdated("unreadCount",a=>{const c=r.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),r.show=()=>{r.isHidden=!1,r.style.display="block"},r.hide=()=>{r.isHidden=!0,r.style.display="none"},r.setUnread=a=>{r.unreadCount=a,a>0?r.show():i&&r.hide()},r.setManager=a=>{s=a},r.hide(),r}function hM({fromUserId:t,inviteData:e,onAccept:n,onDecline:i}){const s=e.fromName||"Someone",r=e.fromEmail||"",o=e.fromPhotoURL,a=o?`<img src="${Qe(o)}" alt="${Qe(s)}" class="notification-avatar" />`:'<span class="notification-icon">👤</span>';return Zy({template:`
      <div class="notification-content">
        <div class="notification-header">
          ${a}
          <span class="notification-title">Contact Invitation</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${Qe(s)}</strong> wants to connect
          </p>
          ${r?`<p class="notification-detail">${Qe(r)}</p>`:""}
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
    `,className:"notification invite-notification",handlers:{handleAccept:async l=>{const u=l.target;u.disabled=!0,u.textContent="Accepting...";try{n&&await n()}catch(d){console.error("[INVITE NOTIFICATION] Accept failed:",d),u.disabled=!1,u.textContent="Accept"}},handleDecline:async l=>{const u=l.target;u.disabled=!0,u.textContent="Declining...";try{i&&await i()}catch(d){console.error("[INVITE NOTIFICATION] Decline failed:",d),u.disabled=!1,u.textContent="Decline"}}}})}let bs=null;function fM(t,e=20){if(!t||t.length<=e)return t;const i=t.split(" ")[0];return i.length<=e?i:i.slice(0,e-3)+"..."}const pM=(t,e=null)=>{if(bs)return bs;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,s=10;typeof e=="number"&&(s=e);const r=Yu();return bs=Oa({initialProps:{isLoggedIn:r,userName:"Guest User",userPhotoURL:"",userPhotoDisplay:"none",userInfoDisplay:"none",avatarDisplay:"none",signingInDisplay:"none",loginBtnMarginRightPx:s,loginBtnDisplay:r?"none":"inline-block",logoutBtnDisplay:r?"inline-block":"none"},template:`
      <button style="margin-right: [[loginBtnMarginRightPx]]px; display: [[loginBtnDisplay]]" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button style="display: [[logoutBtnDisplay]]" id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      ${f0()?'<button id="delete-account-btn" class="delete-account-btn" onclick="handleDeleteAccount">Delete Account</button>':""}
      <span class="signing-in-indicator" style="display: [[signingInDisplay]]; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info" style="display: [[userInfoDisplay]]">
        <img src="[[userPhotoURL]]" alt="[[userName]]" class="user-avatar" style="display: [[userPhotoDisplay]]" />
        <span class="user-avatar-placeholder" style="display: [[avatarDisplay]]">👤</span>
        <span class="user-name">[[userName]]</span>
      </div>
    `,handlers:{handleLogin:async o=>{try{await Do(o)}catch(a){console.error("[AuthComponent] Handle login error:",a),alert("Login failed. Please refresh the page, check your connection and try again.")}},handleLogout:dy,handleDeleteAccount:async()=>{if(confirm(`Are you sure you want to delete your account?

This will permanently delete:
• Your account
• All contacts
• Call history
• All associated data

This action cannot be undone.`))try{await hy(),alert("Your account has been deleted successfully.")}catch(a){console.error("[AuthComponent] Delete account error:",a),alert(a.message||"Failed to delete account. Please try again.")}}},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.style.display=c?"none":"inline-block",u.style.display=c?"inline-block":"none");const d=o.querySelector("#delete-account-btn");d&&(d.style.display=c?"inline-block":"none")};a(r),n=Ju(({isLoggedIn:c,userName:l,user:u})=>{const d=fM(u?.displayName||l),h=u?.photoURL||"";G("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:d,photoURL:h}),c&&v0(),a(c),o.update({isLoggedIn:c,userName:d,userPhotoURL:h,userPhotoDisplay:h?"block":"none",userInfoDisplay:c?"flex":"none",avatarDisplay:h?"none":"flex",signingInDisplay:"none",loginBtnDisplay:c?"none":"inline-block",logoutBtnDisplay:c?"inline-block":"none"})}),i=y0(c=>{G("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),bs=null},className:"auth-component",parent:t}),bs},gM="https://people.googleapis.com/v1/people/me/connections",mM="https://people.googleapis.com/v1/otherContacts";async function _M(t){if(!t)throw new Error("Access token is required");const e=[],n=await Ep(t,gM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const i=await Ep(t,mM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${i.length}`),e.push(...i),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const s=new Set;return e.filter(o=>s.has(o.email)?!1:(s.add(o.email),!0))}async function Ep(t,e,n){const i=[];let s=null;do{const r=new URL(e);r.searchParams.set("pageSize","100"),e.includes("otherContacts")?r.searchParams.set("readMask",n):r.searchParams.set("personFields",n),s&&r.searchParams.set("pageToken",s);const o=await fetch(r.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),i;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&i.push({email:f.value.toLowerCase().trim(),name:h})}s=a.nextPageToken}while(s);return i}function yM(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function wM(t,e,n,i){const r=[`To: ${(Array.isArray(e)?e:[e]).join(", ")}`,`Subject: ${n}`,"Content-Type: text/plain; charset=utf-8","",i].join(`\r
`),o=yM(new TextEncoder().encode(r)),a=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({raw:o})});if(!a.ok){const l=await a.json().catch(()=>({}));throw new Error(l.error?.message||`Gmail API error: ${a.status}`)}const c=await a.json();return console.log("[GMAIL] Email sent successfully:",c.id),c}async function vM(t,e,n,i){const s={sent:0,failed:0,errors:[]};for(let r=0;r<e.length;r++){const o=e[r];try{await wM(t,o.email,n,i),s.sent++,console.log(`[GMAIL] Sent to ${o.name} (${o.email})`)}catch(a){s.failed++;const c=a&&a.message||String(a);s.errors.push({email:o.email,name:o.name,error:c}),console.error(`[GMAIL] Failed to send to ${o.name}:`,c)}r<e.length-1&&await new Promise(a=>setTimeout(a,150))}return console.log(`[GMAIL] Bulk send complete: ${s.sent} sent, ${s.failed} failed`),s}async function bM(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
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
    `;const n=e.querySelector('[data-action="cancel"]'),i=e.querySelector("#contact-search-input"),s=e.querySelector("#import-status"),r=e.querySelector("#contacts-container"),o=e.querySelector("#bulk-actions-container"),a=e.querySelectorAll(".platform-btn");let c="google",l=[],u=[];const d=new Set;function h(){e.close(),e.remove(),t()}n.addEventListener("click",h),e.addEventListener("cancel",h),a.forEach(p=>{p.addEventListener("click",async()=>{if(p.disabled)return;const g=p.getAttribute("data-platform");a.forEach(m=>m.classList.remove("active")),p.classList.add("active"),c=g,g==="google"&&await f()})}),i.addEventListener("input",()=>{const p=i.value.trim().toLowerCase();p?u=l.filter(g=>{const m=(g.name||"").toLowerCase().includes(p),T=(g.email||"").toLowerCase().includes(p);return m||T}):u=l,Cp(r,o,u,d)});async function f(){s.textContent="Requesting access...",s.className="import-status loading",r.innerHTML="",l=[],u=[];try{const p=await py();s.textContent="Fetching contacts...";const g=await _M(p);if(g.length===0){s.textContent="No contacts with email addresses found.",s.className="import-status not-found",r.innerHTML='<p class="empty-state">No contacts found.</p>';return}s.textContent=`Found ${g.length} contacts. Checking HangVidU...`;const m=await Zt(),T=new Set(Object.keys(m||{})),L=g.map(N=>N.email),$=await oy(L),y=Jt();l=[];for(const N of g){const oe=$[N.email],_e=oe&&oe.uid===y?.uid,J=oe&&T.has(oe.uid);_e||l.push({...N,user:oe,isAlreadySaved:J})}l.sort((N,oe)=>{const _e=rt=>rt.user&&!rt.isAlreadySaved?1:2,J=_e(N),vt=_e(oe);return J!==vt?J-vt:(N.name||"").localeCompare(oe.name||"",void 0,{sensitivity:"base"})}),u=l,s.textContent=`Found ${l.length} contacts`,s.className="import-status success",Cp(r,o,u,d)}catch(p){console.error("[ADD CONTACT] Import error:",p),p.message==="Authorization cancelled"?(s.textContent="Import cancelled.",s.className="import-status cancelled"):(s.textContent=`Error: ${p.message}`,s.className="import-status error"),r.innerHTML='<p class="empty-state">Failed to load contacts.</p>'}}document.body.appendChild(e),e.showModal(),c==="google"&&f()})}function Cp(t,e,n,i){if(t.innerHTML="",n.length===0){t.innerHTML='<p class="empty-state">No contacts found.</p>';return}const s=document.createElement("div");s.className="results-header",s.innerHTML=`
    <label class="select-all-label">
      <input type="checkbox" id="select-all-checkbox" />
      <span>Select All (${n.length})</span>
    </label>
  `,t.appendChild(s);const r=document.createElement("div");r.className="contacts-scroll-list";const o=document.createElement("ul");o.className="contact-list";for(const h of n){const{name:f,email:p,user:g,isAlreadySaved:m}=h,T=document.createElement("li");T.className="contact-item";let L="",$="";if(m?(L='<span class="status-badge saved">✓ Saved</span>',$=""):g?(L='<span class="status-badge on-app">On HangVidU</span>',$=`
        <button type="button" class="invite-btn" data-uid="${Qe(g.uid)}" data-name="${Qe(g.displayName)}">
          Invite
        </button>
      `):(L='<span class="status-badge not-on-app">Not on app</span>',$=""),T.innerHTML=`
      <label class="contact-item-label">
        <input type="checkbox" class="contact-checkbox" data-email="${Qe(p)}" ${m?"disabled":""} />
        <span class="contact-info">
          <strong class="contact-name">${Qe(f)}</strong>
          <small class="contact-email">${Qe(p)}</small>
        </span>
        ${L}
      </label>
      ${$}
    `,g&&!m){const N=T.querySelector(".invite-btn");N.addEventListener("click",async()=>{N.disabled=!0,N.textContent="Sending...";try{await sp(g.uid,g.displayName),N.textContent="✓ Sent",N.classList.add("sent")}catch(oe){console.error("[ADD CONTACT] Invite error:",oe),N.textContent="Error",N.disabled=!1}})}const y=T.querySelector(".contact-checkbox");y&&!m&&(y.checked=i.has(h),y.addEventListener("change",()=>{y.checked?i.add(h):i.delete(h),u()})),o.appendChild(T)}r.appendChild(o),t.appendChild(r);const a=s.querySelector("#select-all-checkbox");a.addEventListener("change",()=>{o.querySelectorAll(".contact-checkbox:not([disabled])").forEach(f=>{f.checked=a.checked;const p=f.getAttribute("data-email"),g=n.find(m=>m.email===p);g&&(a.checked?i.add(g):i.delete(g))}),u()}),e.innerHTML=`
    <div class="bulk-actions">
      <button type="button" id="invite-selected-btn" class="action-btn" disabled>
        Invite Selected (0)
      </button>
      <button type="button" id="share-link-btn" class="action-btn secondary" disabled>
        Email Invite (0)
      </button>
    </div>
  `;const c=e.querySelector("#invite-selected-btn"),l=e.querySelector("#share-link-btn");function u(){const h=Array.from(i),f=h.filter(g=>g.user&&!g.isAlreadySaved).length,p=h.filter(g=>!g.user).length;c.disabled=f===0,c.textContent=`Invite Selected (${f})`,l.disabled=p===0,l.textContent=`Email Invite (${p})`}c.addEventListener("click",async()=>{const h=Array.from(i).filter(p=>p.user&&!p.isAlreadySaved);if(h.length===0)return;c.disabled=!0,c.textContent="Sending invites...";let f=0;for(const p of h)try{await sp(p.user.uid,p.user.displayName),f++}catch(g){console.error("[ADD CONTACT] Failed to invite:",p.name,g)}c.textContent=`✓ Sent ${f} invite${f!==1?"s":""}`,setTimeout(()=>{i.clear(),u(),o.querySelectorAll(".contact-checkbox").forEach(p=>p.checked=!1),a.checked=!1},2e3)}),l.addEventListener("click",async()=>{const h=Array.from(i).filter(f=>!f.user);if(h.length!==0){l.disabled=!0,l.textContent="Requesting permission...";try{const f=await gy();l.textContent="Sending emails...";const p=P(),g=p?`${window.location.origin}/?ref=${p}`:window.location.origin,T=Jt()?.displayName||"A friend",L="Join me on HangVidU!",$=`Hi!

${T} invited you to join HangVidU - an app for text messaging, video calls and video sharing.

Click here to get started:
${g}

See you there!`,y=await vM(f,h,L,$);y.sent>0?(l.textContent=`✓ Sent ${y.sent} email${y.sent!==1?"s":""}!`,l.classList.add("success"),setTimeout(()=>{i.clear(),u(),o.querySelectorAll(".contact-checkbox").forEach(N=>N.checked=!1),a.checked=!1,l.classList.remove("success")},3e3)):(l.textContent="Failed to send emails",l.disabled=!1),y.failed>0&&console.warn(`[ADD CONTACT] ${y.failed} emails failed:`,y.errors)}catch(f){console.error("[ADD CONTACT] Gmail send error:",f),f.message==="Authorization cancelled"?(l.textContent="Permission denied - using email client...",setTimeout(()=>{d(h),l.textContent=`Email Invite (${h.length})`,l.disabled=!1},1500)):(l.textContent="Error - try again",l.disabled=!1,alert(`Failed to send emails: ${f.message}

Please try again or use your email client.`))}}});function d(h){const f=P(),p=f?`${window.location.origin}/?ref=${f}`:window.location.origin,m=Jt()?.displayName||"A friend",T=encodeURIComponent("Join me on HangVidU!"),L=encodeURIComponent(`Hi!

${m} invited you to join HangVidU - an app for text messaging, video calls and video sharing.

Click here to get started:
${p}

See you there!
`);let $;h.length===1?$=`mailto:${h[0].email}?subject=${T}&body=${L}`:$=`mailto:?bcc=${h.map(N=>N.email).join(",")}&subject=${T}&body=${L}`,window.location.href=$}}function EM(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class CM{constructor(){this.originalTitle=document.title,this.originalFavicon=EM(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[CallIndicators] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/HangVidU/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[CallIndicators] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[CallIndicators] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[CallIndicators] Badge set to: ${e}`)}).catch(n=>{console.warn("[CallIndicators] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[CallIndicators] Badge cleared")}).catch(e=>{console.warn("[CallIndicators] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[CallIndicators] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[CallIndicators] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[CallIndicators] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[CallIndicators] Wake lock released manually")}).catch(n=>{console.warn("[CallIndicators] Wake lock release failed:",n)})}}}const Tc=new CM;let Tp=!1;function TM(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function SM(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};IM();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=TM(t,n);kM(i);let c=!1;const l=async()=>{await RM(t,s)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function IM(){if(Tp)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Tp=!0}function kM(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function RM(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function AM(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",s=i.replace(/\/$/,"");let r;try{r=new URL(s).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,s).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}AM();p0(!0);v().disable();let kd=[];async function NM(){VD();const t=wy(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{cM(),OM(),await cy;const i=pM(Ra);i&&kd.push(i.dispose);const s=document.querySelector(".top-right-menu");if(s){const r=dM({parent:s,hideWhenAllRead:!0});ct.setToggle(r)}try{if(await be.initialize())console.log("[MAIN] FCM notifications initialized successfully");else if(console.warn("[MAIN] FCM notifications failed to initialize"),!be.isNotificationSupported()){const{showPushUnsupportedNotification:o}=await he(async()=>{const{showPushUnsupportedNotification:a}=await import("./push-unsupported-notification-wq_iahwk.js");return{showPushUnsupportedNotification:a}},[]);o()}}catch(r){console.error("[MAIN] FCM initialization error:",r)}return window.pushNotificationController=be,window.notificationController=be,window.getLoggedInUserId=P,!0}catch(i){return console.error("Initialization error:",i,i&&i.stack),!1}}let Nl=!1;function Aw(){Nl=!1}async function Nw(){Nl||(Nl=!0,await rO(Xe),sM({getLocalStream:La,getLocalVideo:()=>Xe,getRemoteVideo:()=>fe,getPeerConnection:()=>Ce.getPeerConnection(),setLocalStream:Fo,micBtn:ds,cameraBtn:hs,switchCameraBtn:us,mutePartnerBtn:_t,fullscreenPartnerBtn:Aa,remotePipBtn:Nn}),Xe&&(Xe.addEventListener("enterpictureinpicture",()=>Ee&&C(Ee)),Xe.addEventListener("leavepictureinpicture",()=>{Ee&&!(ci()&&Dy())&&U(Ee)})))}function Pw(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),Aw()}function no(t=null){return{localStream:La(),localVideoEl:Xe,remoteVideoEl:fe,mutePartnerBtn:_t,setupRemoteStream:oO,setupWatchSync:rL,targetRoomId:t}}function io(t,e=!1){return t.success?(e&&t.roomLink&&SM(t.roomLink,{onCopy:()=>G("Link ready! Share with your partner."),onCancel:()=>G("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function Nr(t,{forceInitiator:e=!1}={}){try{await Nw()}catch(r){return console.error("Failed to initialize local media stream:",r),Pw(r),!1}const n=Date.now();if(e){v().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await Ce.createCall(no(t));return io(r,!1)}let i=await ce.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await ce.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){v().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await Ce.createCall(no(t));return io(r,!0)}v().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const s=await Ce.answerCall({roomId:t,...no()});return io(s,!1)}const qe=new Set,Lw=new Map;function Sc(t){t&&(Cr(t),qe.delete(t),Lw.delete(t),v().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:qe.size}))}function PM(){G(`[LISTENER] Removing all incoming listeners (${qe.size} rooms)`);const t=Array.from(qe);t.forEach(e=>{Cr(e)}),qe.clear(),Lw.clear(),v().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function LM(t){const e=Date.now(),n=e+1440*60*1e3,i=P();if(i){const s=Ea(i,t);await ee(s,{roomId:t,savedAt:e,expiresAt:n});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function Ic(t){const e=P();if(e){try{await Je(Ea(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function fi(t){t&&(qe.has(t)&&(qe.delete(t),Cr(t)),G(`[LISTENER] Attaching listener for room: ${t} (total: ${qe.size+1})`),qe.add(t),v().logListenerAttachment(t,"member_join",qe.size,{action:"incoming_call_listener_attached"}),ce.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,s=pe();if(n&&n!==s){v().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const $=await my(t);a=$,c=$?"roomCreatedAt":"failed",l=null}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(v().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){v().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await ce.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===s)return;const g=Ce.getState();if(!!g.pc&&g.pc.connectionState==="connected"){v().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:g.pc?.connectionState});return}v().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const T=await Iw(t,n);Yn.playIncoming(),Tc.startCallIndicators(T);let L=!1;try{L=await Fa(`Incoming call from ${T}.

Accept?`)}finally{Yn.stop(),Tc.stopCallIndicators()}if(L)Sc(t),be.isNotificationEnabled()&&await be.dismissCallNotifications(t),v().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),Nr(t).catch($=>{console.warn("Failed to answer incoming call:",$),v().logFirebaseOperation("join_room_on_accept",!1,$,{roomId:t,joiningUserId:n})});else{be.isNotificationEnabled()&&await be.dismissCallNotifications(t),v().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await ce.rejectCall(t,pe(),"user_rejected")}catch($){console.warn("Failed to signal rejection via RTDB:",$)}await Ic(t).catch($=>{console.warn("Failed to remove recent call on rejection:",$)})}}}),ce.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){Yn.stop(),Tc.stopCallIndicators(),be.isNotificationEnabled()&&await be.dismissCallNotifications(t).catch(()=>{});try{const{dismissActiveConfirmDialog:i}=await he(async()=>{const{dismissActiveConfirmDialog:s}=await Promise.resolve().then(()=>zD);return{dismissActiveConfirmDialog:s}},void 0);typeof i=="function"&&i()}catch{}await Ic(t).catch(()=>{}),Sc(t)}}),ce.onMemberLeft(t,async e=>{const n=e.key,i=pe();if(!(!n||n===i))try{(await ce.checkRoomStatus(t)).hasMembers||(await Ic(t),Sc(t),G(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function Sp(){const t=Date.now();v().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:qe.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await he(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>Xu);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=P();if(v().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=b_(e);try{const i=await Pe(n),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Je(Ea(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await Zt();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)r.add(c.roomId);else if(a&&e)try{const l=sr(e,a);r.add(l)}catch{}})}catch{}r.forEach(o=>fi(o)),v().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:qe.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),v().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await Zt(),a=pe();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)r.add(l.roomId);else if(c&&a)try{const u=sr(a,c);r.add(u)}catch{}})}catch{}r.forEach(o=>fi(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),v().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:qe.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),v().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Vr(){return B&&Ue&&!Ue.classList.contains("hidden")&&B.src&&B.src.trim()!==""}let Ip=!1;function OM(){if(Ip)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",St()),console.log("isYTVisible():",pc()),console.log("isSharedVideoVisible():",Vr()),console.log("isWatchModeActive():",ci()),St()==="yt"?pc()?(Uo(),Ms()):(Ly(),Bo()):(St()==="url"||St()==="file")&&(Vr()?(C(Ue),Ms()):(U(Ue),Bo()))),e.key==="Escape"&&ci()&&(St()==="yt"&&pc()?(Ar(),Uo()):(St()==="url"&&Vr()||St()==="file"&&Vr())&&(B.pause(),C(Ue)),Ms())}),Ip=!0}const Ow=async()=>{try{await Nw();const t=await Ce.createCall(no());io(t,!0)}catch(t){console.error("Failed to start call:",t),Pw(t)}};We.onclick=Ow;Mn.onclick=Ow;Pi&&(navigator.clipboard&&navigator.clipboard.readText?Pi.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=DM(t);if(!e){alert("No valid room link found in clipboard.");return}await Nr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(Pi.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));or&&(or.onclick=async()=>{await bM()});ai&&(ai.onclick=()=>{St()==="yt"?(Ar(),Uo()):(St()==="url"||St()==="file")&&(B.pause(),B.src.startsWith("blob:")&&URL.revokeObjectURL(B.src),C(Ue)),Ms()});mt.onclick=async()=>{console.debug("Hanging up..."),await Ce.hangUp({emitCancel:!0,reason:"user_hung_up"})};function DM(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),i=n.searchParams.get("room");if(i)return i;const s=n.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function MM(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await Nr(e);return n||(ka(),By()),n}const Pl=[];let Es=!1;async function so(){if(Es||Pl.length===0)return;Es=!0;const{fromUserId:t,inviteData:e}=Pl.shift();try{const n=hM({fromUserId:t,inviteData:e,onAccept:async()=>{try{await Qy(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Nt(Ke).catch(()=>{}),_d(`✅ ${e.fromName} added to contacts!`),ct.remove(`invite-${t}`)}catch(i){console.error("[INVITATIONS] Failed to accept invite:",i),KL("Failed to add contact. Please try again.")}finally{Es=!1,so()}},onDecline:async()=>{try{await cO(t),console.log("[INVITATIONS] Invite declined"),ct.remove(`invite-${t}`)}catch(i){console.error("[INVITATIONS] Failed to decline invite:",i)}finally{Es=!1,so()}}});ct.add(`invite-${t}`,n),ct.isListVisible()||ct.showList()}catch(n){console.error("[INVITATIONS] Failed to process invite:",n),Es=!1,so()}}function kp(){aO((t,e)=>{Pl.push({fromUserId:t,inviteData:e}),so()}),lO(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Nt(Ke).catch(()=>{}),_d(`✅ ${e.acceptedByName} is now in your contacts!`)})}window.onload=async()=>{if(await hO(),!await NM()){We&&(We.disabled=!0,We.title="Initialization failed. Please reload the page or check your camera/microphone permissions."),console.error("Initialization failed. Call functionality disabled. Please reload the page."),alert(`Hangvidu could not initialize properly.

Please check your camera/microphone permissions and reload the page.`);return}WD(Ce),await Sp().catch(s=>console.warn("Failed to start saved-room listeners",s)),Nt(Ke).catch(s=>{console.warn("Failed to render contacts list:",s)});let e=null;const n=Ju(async({isLoggedIn:s,user:r})=>{try{const o=e===null,a=e===!0&&!s,c=e===!1&&s;e=s,await Nt(Ke),a?(G("[AUTH] User logged out - cleaning up messaging and listeners"),li.reset(),En.closeAllSessions(),be.isNotificationEnabled()&&await be.disable().catch(l=>{console.warn("[AUTH] Failed to disable notifications on logout:",l)}),PM(),Tl()):c?(G("[AUTH] User logged in - re-attaching incoming listeners"),await rp().catch(l=>console.warn("[REFERRAL] Failed to process referral on login:",l)),await Nt(Ke).catch(()=>{}),await Sp().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),kp(),await be.requestPermission().catch(l=>console.warn("[AUTH] Push notification setup failed:",l))):o&&s&&(G("[AUTH] Initial load with logged-in user"),await rp().catch(l=>console.warn("[REFERRAL] Failed to process referral on initial load:",l)),kp(),await be.requestPermission().catch(l=>console.warn("[AUTH] Push notification setup failed:",l)))}catch(o){console.warn("Failed to handle auth change:",o)}});kd.push(()=>{try{typeof n=="function"&&n()}catch{}}),await MM()};window.addEventListener("beforeunload",async t=>{const e=Ce.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await xM()});Ce.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),Ce.setPartnerId(t),li.showMessagesToggle(),li.openContactMessages(t,t),ed().catch(n=>console.warn("Failed to clear calling state:",n)),LM(e).catch(n=>console.warn("Failed to save recent call:",n))});Ce.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});Ce.on("cleanup",async({roomId:t,partnerId:e,reason:n,role:i,wasConnected:s})=>{if(i==="initiator"&&!e&&!s&&t){console.log("[MAIN] Potential missed call detected for room:",t);try{const{getContactByRoomId:a,callContact:c}=await he(async()=>{const{getContactByRoomId:u,callContact:d}=await Promise.resolve().then(()=>Il);return{getContactByRoomId:u,callContact:d}},void 0),l=await a(t);if(l&&l.contactId){const{getCurrentUser:u}=await he(async()=>{const{getCurrentUser:m}=await Promise.resolve().then(()=>Xu);return{getCurrentUser:m}},void 0),h=u()?.displayName||"Friend";console.log(`[MAIN] Sending missed call push notification to ${l.contactName} (${l.contactId})`),await be.sendMissedCallNotification(l.contactId,{roomId:t,callerId:pe(),callerName:h});const{createMissedCallNotification:f}=await he(async()=>{const{createMissedCallNotification:m}=await import("./missed-call-notification-fhr3rKpr.js");return{createMissedCallNotification:m}},[]),p=`missed-call-${l.contactId}-${Date.now()}`,g=f({callerId:l.contactId,callerName:l.contactName,roomId:t,onCallBack:async()=>{await c(l.contactId,l.contactName),ct.remove(p)},onDismiss:()=>{ct.remove(p)}});ct.add(p,g),console.log("[MAIN] In-app missed call notification added")}else console.log("[MAIN] No saved contact found for room, skipping missed call notification")}catch(a){console.warn("[MAIN] Failed to handle missed call:",a)}}t&&be.isNotificationEnabled()&&be.dismissCallNotifications(t).catch(a=>{console.warn("[MAIN] Failed to dismiss call notifications:",a)});const o=Ce.getState();o.messagesUI&&typeof o.messagesUI.cleanup=="function"&&(o.messagesUI.cleanup(),o.messagesUI=null),Ry(),ka(),t&&fi(t),e&&t&&setTimeout(()=>{kw(e,t,Ke).catch(a=>{console.warn("Failed to save contact after cleanup:",a)})},500)});async function xM(){await Ce.hangUp({emitCancel:!0,reason:"page_unload"}),rM(),y_(),Rw(),Na();const t=Ce.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),B.src="",Ny(),Xe&&Xe.srcObject&&(Xe.srcObject=null),fe&&fe.srcObject&&(fe.srcObject=null),Ms(),sL("none"),ud(),lM(),ka(),Py(!1),kd.forEach(e=>e())}const FM=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:Nr,listenForIncomingOnRoom:fi,resetLocalStreamInitFlag:Aw},Symbol.toStringTag,{value:"Module"}));export{Oa as a,f0 as b,Zy as c,G as d,Qe as e,C as h,ct as i,U as s};
