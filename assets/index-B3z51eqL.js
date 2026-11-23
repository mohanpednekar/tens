var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=void 0)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function te(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=M(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(te(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function N(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var re=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ie(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,re)}catch(e){re(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function P(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ie(P.bind(null,e))}var ae={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ae,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=P,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ie,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),ee=Symbol.for(`react.fragment`),j=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),M=Symbol.for(`react.consumer`),N=Symbol.for(`react.context`),ne=Symbol.for(`react.forward_ref`),re=Symbol.for(`react.suspense`),ie=Symbol.for(`react.suspense_list`),P=Symbol.for(`react.memo`),ae=Symbol.for(`react.lazy`),oe=Symbol.for(`react.activity`),se=Symbol.for(`react.legacy_hidden`),ce=Symbol.for(`react.memo_cache_sentinel`),le=Symbol.for(`react.view_transition`),ue=Symbol.for(`react.recoverable`),de=Symbol.iterator;function fe(e){return typeof e!=`object`||!e?null:(e=de&&e[de]||e[`@@iterator`],typeof e==`function`?e:null)}var pe=Symbol.for(`react.client.reference`);function me(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ee:return`Fragment`;case te:return`Profiler`;case j:return`StrictMode`;case re:return`Suspense`;case ie:return`SuspenseList`;case oe:return`Activity`;case le:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case N:return e.displayName||`Context`;case M:return(e._context.displayName||`Context`)+`.Consumer`;case ne:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case P:return t=e.displayName||null,t===null?me(e.type)||`Memo`:t;case ae:t=e._payload,e=e._init;try{return me(e(t))}catch{}}return null}var he=Array.isArray,F=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ge={pending:!1,data:null,method:null,action:null},_e=[],ve=-1;function ye(e){return{current:e}}function be(e){0>ve||(e.current=_e[ve],_e[ve]=null,ve--)}function xe(e,t){ve++,_e[ve]=e.current,e.current=t}var Se=ye(null),Ce=ye(null),we=ye(null),Te=ye(null);function Ee(e,t){switch(xe(we,t),xe(Ce,e),xe(Se,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mp(t),e=hp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}be(Se),xe(Se,e)}function De(){be(Se),be(Ce),be(we)}function Oe(e){var t=e.memoizedState;t!==null&&(lh._currentValue=t.memoizedState,xe(Te,e)),t=Se.current;var n=hp(t,e.type);t!==n&&(xe(Ce,e),xe(Se,n))}function ke(e){Ce.current===e&&(be(Se),be(Ce)),Te.current===e&&(be(Te),lh._currentValue=ge)}var Ae,je;function Me(e){if(Ae===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ae=t&&t[1]||``,je=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ae+e+je}var Ne=!1;function Pe(e,t){if(!e||Ne)return``;Ne=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ne=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Me(n):``}function Fe(e,t){switch(e.tag){case 26:case 27:case 5:return Me(e.type);case 16:return Me(`Lazy`);case 13:return e.child!==t&&t!==null?Me(`Suspense Fallback`):Me(`Suspense`);case 19:return Me(`SuspenseList`);case 0:case 15:return Pe(e.type,!1);case 11:return Pe(e.type.render,!1);case 1:return Pe(e.type,!0);case 31:return Me(`Activity`);case 30:return Me(`ViewTransition`);default:return``}}function Ie(e){try{var t=``,n=null;do t+=Fe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Le=Object.prototype.hasOwnProperty,Re=t.unstable_scheduleCallback,ze=t.unstable_cancelCallback,Be=t.unstable_shouldYield,Ve=t.unstable_requestPaint,He=t.unstable_now,Ue=t.unstable_getCurrentPriorityLevel,We=t.unstable_ImmediatePriority,Ge=t.unstable_UserBlockingPriority,Ke=t.unstable_NormalPriority,qe=t.unstable_LowPriority,Je=t.unstable_IdlePriority,Ye=t.log,Xe=t.unstable_setDisableYieldValue,Ze=null,Qe=null;function $e(e){if(typeof Ye==`function`&&Xe(e),Qe&&typeof Qe.setStrictMode==`function`)try{Qe.setStrictMode(Ze,e)}catch{}}var et=Math.clz32?Math.clz32:rt,tt=Math.log,nt=Math.LN2;function rt(e){return e>>>=0,e===0?32:31-(tt(e)/nt|0)|0}var it=256,at=262144,ot=4194304;function st(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ct(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=st(n))):i=st(o):i=st(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=st(n))):i=st(o)):i=st(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function lt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ut(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-et(n),i=1<<r;t|=e[r],n&=~i}return t}function dt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ft(){var e=ot;return ot<<=1,!(ot&62914560)&&(ot=4194304),e}function pt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function mt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ht(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-et(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&gt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function gt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-et(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function _t(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-et(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function vt(e,t){var n=t&-t;return n=n&42?1:yt(n),(n&(e.suspendedLanes|t))===0?n:0}function yt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function bt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function L(){var e=I.p;return e===0?(e=window.event,e===void 0?32:Th(e.type)):e}function xt(e,t){var n=I.p;try{return I.p=e,t()}finally{I.p=n}}var St=Math.random().toString(36).slice(2),Ct=`__reactFiber$`+St,wt=`__reactProps$`+St,Tt=`__reactContainer$`+St,Et=`__reactEvents$`+St,Dt=`__reactListeners$`+St,Ot=`__reactHandles$`+St,kt=`__reactResources$`+St,At=`__reactMarker$`+St,jt=`__reactLoad$`+St;function Mt(e){delete e[Ct],delete e[wt],delete e[Dt],delete e[Ot]}function Nt(e){var t;if(t=e[Ct])return t;for(var n=e.parentNode;n;){if(t=n[Tt]||n[Ct]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gm(e);e!==null;){if(n=e[Ct])return n;e=gm(e)}return t}e=n,n=e.parentNode}return null}function R(e){if(e=e[Ct]||e[Tt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Pt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ft(e){var t=e[kt];return t||=e[kt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function It(e){e[At]=!0}function Lt(e){e[jt]=void 0}var Rt=new Set,zt={};function Bt(e,t){Vt(e,t),Vt(e+`Capture`,t)}function Vt(e,t){for(zt[e]=t,e=0;e<t.length;e++)Rt.add(t[e])}var Ht=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ut={},Wt={};function Gt(e){return Le.call(Wt,e)?!0:Le.call(Ut,e)?!1:Ht.test(e)?Wt[e]=!0:(Ut[e]=!0,!1)}var z=!1;function Kt(){var e=z;return z=!1,e}function qt(e,t,n){if(Gt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Jt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Yt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Xt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Qt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $t(e){if(!e._valueTracker){var t=Zt(e)?`checked`:`value`;e._valueTracker=Qt(e,t,``+e[t])}}function en(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Zt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var tn=/[\n"\\]/g;function nn(e){return e.replace(tn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function rn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Xt(t)):e.value!==``+Xt(t)&&(e.value=``+Xt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):on(e,Xt(n)):o===`number`&&e.value==t?on(e,Xt(e.value)):on(e,Xt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Xt(s):e.removeAttribute(`name`)}function an(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){$t(e);return}n=n==null?``:``+Xt(n),t=t==null?n:``+Xt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),$t(e)}function on(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function sn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Xt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function cn(e,t,n){t!=null&&(t=``+Xt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Xt(n)}function ln(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(he(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Xt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),$t(e)}function un(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var dn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function fn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||dn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function pn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,z=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(fn(e,a,r),z=!0)}else for(var o in t)t.hasOwnProperty(o)&&fn(e,o,t[o])}function mn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var hn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),gn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function _n(e){return gn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function vn(){}var yn=null;function bn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xn=null,Sn=null;function Cn(e){var t=R(e);if(t&&(e=t.stateNode)){var n=e[wt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(rn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+nn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[wt]||null;if(!a)throw Error(i(90));rn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&en(r)}break a;case`textarea`:cn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&sn(e,!!n.multiple,t,!1)}}}var wn=!1;function Tn(e,t,n){if(wn)return e(t,n);wn=!0;try{return e(t)}finally{if(wn=!1,(xn!==null||Sn!==null)&&(Hd(),xn&&(t=xn,e=Sn,Sn=xn=null,Cn(t),e)))for(t=0;t<e.length;t++)Cn(e[t])}}function En(e,t){var n=e.stateNode;if(n===null)return null;var r=n[wt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Dn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,On=!1;if(Dn)try{var kn={};Object.defineProperty(kn,"passive",{get:function(){On=!0}}),window.addEventListener(`test`,kn,kn),window.removeEventListener(`test`,kn,kn)}catch{On=!1}var An=null,jn=null,Mn=null;function Nn(){if(Mn)return Mn;var e,t=jn,n=t.length,r,i=`value`in An?An.value:An.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Mn=i.slice(e,1<r?1-r:void 0)}function Pn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Fn(){return!0}function In(){return!1}function Ln(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Fn:In,this.isPropagationStopped=In,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Fn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Fn)},persist:function(){},isPersistent:Fn}),t}var Rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zn=Ln(Rn),Bn=D({},Rn,{view:0,detail:0}),Vn=Ln(Bn),Hn,Un,Wn,Gn=D({},Bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Wn&&(Wn&&e.type===`mousemove`?(Hn=e.screenX-Wn.screenX,Un=e.screenY-Wn.screenY):Un=Hn=0,Wn=e),Hn)},movementY:function(e){return`movementY`in e?e.movementY:Un}}),Kn=Ln(Gn),qn=Ln(D({},Gn,{dataTransfer:0})),Jn=Ln(D({},Bn,{relatedTarget:0})),Yn=Ln(D({},Rn,{animationName:0,elapsedTime:0,pseudoElement:0})),Xn=Ln(D({},Rn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Zn=Ln(D({},Rn,{data:0})),Qn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},$n={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},er={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function tr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=er[e])?!!t[e]:!1}function nr(){return tr}var rr=Ln(D({},Bn,{key:function(e){if(e.key){var t=Qn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Pn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?$n[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nr,charCode:function(e){return e.type===`keypress`?Pn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Pn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ir=Ln(D({},Gn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ar=Ln(D({},Rn,{submitter:0})),or=Ln(D({},Bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nr})),sr=Ln(D({},Rn,{propertyName:0,elapsedTime:0,pseudoElement:0})),cr=Ln(D({},Gn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),lr=Ln(D({},Rn,{newState:0,oldState:0,source:0})),ur=[9,13,27,32],dr=Dn&&`CompositionEvent`in window,fr=null;Dn&&`documentMode`in document&&(fr=document.documentMode);var pr=Dn&&`TextEvent`in window&&!fr,mr=Dn&&(!dr||fr&&8<fr&&11>=fr),hr=` `,gr=!1;function _r(e,t){switch(e){case`keyup`:return ur.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function vr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var yr=!1;function br(e,t){switch(e){case`compositionend`:return vr(t);case`keypress`:return t.which===32?(gr=!0,hr):null;case`textInput`:return e=t.data,e===hr&&gr?null:e;default:return null}}function xr(e,t){if(yr)return e===`compositionend`||!dr&&_r(e,t)?(e=Nn(),Mn=jn=An=null,yr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return mr&&t.locale!==`ko`?null:t.data;default:return null}}var Sr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Sr[e.type]:t===`textarea`}function wr(e,t,n,r){xn?Sn?Sn.push(r):Sn=[r]:xn=r,t=Zf(t,`onChange`),0<t.length&&(n=new zn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Tr=null,Er=null;function Dr(e){Wf(e,0)}function Or(e){if(en(Pt(e)))return e}function kr(e,t){if(e===`change`)return t}var Ar=!1;if(Dn){var jr;if(Dn){var Mr=`oninput`in document;if(!Mr){var Nr=document.createElement(`div`);Nr.setAttribute(`oninput`,`return;`),Mr=typeof Nr.oninput==`function`}jr=Mr}else jr=!1;Ar=jr&&(!document.documentMode||9<document.documentMode)}function Pr(){Tr&&(Tr.detachEvent(`onpropertychange`,Fr),Er=Tr=null)}function Fr(e){if(e.propertyName===`value`&&Or(Er)){var t=[];wr(t,Er,e,bn(e)),Tn(Dr,t)}}function Ir(e,t,n){e===`focusin`?(Pr(),Tr=t,Er=n,Tr.attachEvent(`onpropertychange`,Fr)):e===`focusout`&&Pr()}function Lr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Or(Er)}function Rr(e,t){if(e===`click`)return Or(t)}function zr(e,t){if(e===`input`||e===`change`)return Or(t)}function Br(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Vr=typeof Object.is==`function`?Object.is:Br;function Hr(e,t){if(Vr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Le.call(t,i)||!Vr(e[i],t[i]))return!1}return!0}function Ur(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Wr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gr(e,t){var n=Wr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Wr(n)}}function Kr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ur(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ur(e.document)}return t}function Jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Yr=Dn&&`documentMode`in document&&11>=document.documentMode,Xr=null,Zr=null,Qr=null,$r=!1;function ei(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$r||Xr==null||Xr!==Ur(r)||(r=Xr,`selectionStart`in r&&Jr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qr&&Hr(Qr,r)||(Qr=r,r=Zf(Zr,`onSelect`),0<r.length&&(t=new zn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Xr)))}function ti(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ni={animationend:ti(`Animation`,`AnimationEnd`),animationiteration:ti(`Animation`,`AnimationIteration`),animationstart:ti(`Animation`,`AnimationStart`),transitionrun:ti(`Transition`,`TransitionRun`),transitionstart:ti(`Transition`,`TransitionStart`),transitioncancel:ti(`Transition`,`TransitionCancel`),transitionend:ti(`Transition`,`TransitionEnd`)},ri={},ii={};Dn&&(ii=document.createElement(`div`).style,`AnimationEvent`in window||(delete ni.animationend.animation,delete ni.animationiteration.animation,delete ni.animationstart.animation),`TransitionEvent`in window||delete ni.transitionend.transition);function ai(e){if(ri[e])return ri[e];if(!ni[e])return e;var t=ni[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ii)return ri[e]=t[n];return e}var oi=ai(`animationend`),si=ai(`animationiteration`),ci=ai(`animationstart`),li=ai(`transitionrun`),ui=ai(`transitionstart`),di=ai(`transitioncancel`),fi=ai(`transitionend`),pi=new Map,mi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);mi.push(`scrollEnd`);function hi(e,t){pi.set(e,t),Bt(t,[e])}var gi=0;function _i(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=Cd.identifierPrefix;var n=gi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function vi(e){if(e==null||typeof e==`string`)return e;var t=null,n=jd;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function yi(e,t){return e=vi(e),t=vi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var bi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},xi=[],Si=0,Ci=0;function wi(){for(var e=Si,t=Ci=Si=0;t<e;){var n=xi[t];xi[t++]=null;var r=xi[t];xi[t++]=null;var i=xi[t];xi[t++]=null;var a=xi[t];if(xi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Oi(n,i,a)}}function Ti(e,t,n,r){xi[Si++]=e,xi[Si++]=t,xi[Si++]=n,xi[Si++]=r,Ci|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ei(e,t,n,r){return Ti(e,t,n,r),ki(e)}function Di(e,t){return Ti(e,null,null,t),ki(e)}function Oi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-et(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ki(e){if(50<Md)throw Md=0,Nd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ai={};function ji(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mi(e,t,n,r){return new ji(e,t,n,r)}function Ni(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Pi(e,t){var n=e.alternate;return n===null?(n=Mi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Fi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ii(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Ni(r)&&(s=1);else if(typeof r==`string`)s=Xm(e,n,Se.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case oe:return e=Mi(31,n,t,a),e.elementType=oe,e.lanes=o,e;case ee:return Li(n.children,a,o,t);case j:s=8,a|=24;break;case te:return e=Mi(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case re:return e=Mi(13,n,t,a),e.elementType=re,e.lanes=o,e;case ie:return e=Mi(19,n,t,a),e.elementType=ie,e.lanes=o,e;case se:case le:return e=a|32,e=Mi(30,n,t,e),e.elementType=le,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case N:s=10;break a;case M:s=9;break a;case ne:s=11;break a;case P:s=14;break a;case ae:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Mi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Li(e,t,n,r){return e=Mi(7,e,r,t),e.lanes=n,e}function Ri(e,t,n){return e=Mi(6,e,null,t),e.lanes=n,e}function zi(e){var t=Mi(18,null,null,0);return t.stateNode=e,t}function Bi(e,t,n){return t=Mi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Vi=new WeakMap;function Hi(e,t){if(typeof e==`object`&&e){var n=Vi.get(e);return n===void 0?(t={value:e,source:t,stack:Ie(t)},Vi.set(e,t),t):n}return{value:e,source:t,stack:Ie(t)}}var Ui=[],Wi=0,Gi=null,Ki=0,qi=[],Ji=0,Yi=null,Xi=1,Zi=``;function Qi(e,t){Ui[Wi++]=Ki,Ui[Wi++]=Gi,Gi=e,Ki=t}function $i(e,t,n){qi[Ji++]=Xi,qi[Ji++]=Zi,qi[Ji++]=Yi,Yi=e;var r=Xi;e=Zi;var i=32-et(r)-1;r&=~(1<<i),n+=1;var a=32-et(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Xi=1<<32-et(t)+i|n<<i|r,Zi=a+e}else Xi=1<<a|n<<i|r,Zi=e}function ea(e){e.return!==null&&(Qi(e,1),$i(e,1,0))}function ta(e){for(;e===Gi;)Gi=Ui[--Wi],Ui[Wi]=null,Ki=Ui[--Wi],Ui[Wi]=null;for(;e===Yi;)Yi=qi[--Ji],qi[Ji]=null,Zi=qi[--Ji],qi[Ji]=null,Xi=qi[--Ji],qi[Ji]=null}function na(e,t){qi[Ji++]=Xi,qi[Ji++]=Zi,qi[Ji++]=Yi,Xi=t.id,Zi=t.overflow,Yi=e}var ra=null,ia=null,B=!1,aa=null,oa=!1,sa=Error(i(519));function V(e){throw pa(Hi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),sa}function ca(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Ct]=e,t[wt]=r,n){case`dialog`:Y(`cancel`,t),Y(`close`,t);break;case`iframe`:case`object`:case`embed`:Y(`load`,t);break;case`video`:case`audio`:for(n=0;n<Hf.length;n++)Y(Hf[n],t);break;case`source`:Y(`error`,t);break;case`img`:case`image`:case`link`:Y(`error`,t),Y(`load`,t);break;case`details`:Y(`toggle`,t);break;case`input`:Y(`invalid`,t),an(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Y(`invalid`,t);break;case`textarea`:Y(`invalid`,t),ln(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||rp(t.textContent,n)?(r.popover!=null&&(Y(`beforetoggle`,t),Y(`toggle`,t)),r.onScroll!=null&&Y(`scroll`,t),r.onScrollEnd!=null&&Y(`scrollend`,t),r.onClick!=null&&(t.onclick=vn),t=!0):t=!1,t||V(e,!0)}function la(e){for(ra=e.return;ra;)switch(ra.tag){case 5:case 31:case 13:oa=!1;return;case 27:case 3:oa=!0;return;default:ra=ra.return}}function ua(e){if(e!==ra)return!1;if(!B)return la(e),B=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||_p(e.type,e.memoizedProps)),n=!n),n&&ia&&V(e),la(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ia=hm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ia=hm(e)}else t===27?(t=ia,Ep(e.type)?(e=mm,mm=null,ia=e):ia=t):ia=ra?pm(e.stateNode.nextSibling):null;return!0}function da(){ia=ra=null,B=!1}function fa(){var e=aa;return e!==null&&(hd===null?hd=e:hd.push.apply(hd,e),aa=null),e}function pa(e){aa===null?aa=[e]:aa.push(e)}var ma=ye(null),ha=null,ga=null;function _a(e,t,n){xe(ma,t._currentValue),t._currentValue=n}function va(e){e._currentValue=ma.current,be(ma)}function ya(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ba(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ya(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ya(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ya(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function xa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Vr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Te.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[lh]:e.push(lh))}a=a.return}return e!==null&&ba(t,e,n,r),t.flags|=262144,e!==null}function Sa(e){for(e=e.firstContext;e!==null;){if(!Vr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){ha=e,ga=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function wa(e){return Ea(ha,e)}function Ta(e,t){return ha===null&&Ca(e),Ea(e,t)}function Ea(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ga===null){if(e===null)throw Error(i(308));ga=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ga=ga.next=t;return n}var Da=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Oa=t.unstable_scheduleCallback,ka=t.unstable_NormalPriority,Aa={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ja(){return{controller:new Da,data:new Map,refCount:0}}function Ma(e){e.refCount--,e.refCount===0&&Oa(ka,function(){e.controller.abort()})}function Na(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Pa=null;function Fa(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Ia=null,La=0,Ra=0,za=null;function Ba(e,t){if(Ia===null){var n=Ia=[];La=0,Ra=Lf(),za={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return La++,t.then(Va,Va),t}function Va(){if(--La===0&&(Pa=null,Ia!==null)){za!==null&&(za.status=`fulfilled`);var e=Ia;Ia=null,Ra=0,za=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ha(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ua=F.S;F.S=function(e,t){if(vd=He(),typeof t==`object`&&t&&typeof t.then==`function`&&Ba(e,t),Pa!==null)for(var n=Cf;n!==null;)Na(n,Pa),n=n.next;if(n=e.types,n!==null){for(var r=Cf;r!==null;)Na(r,n),r=r.next;if(Ra!==0){r=Pa,r===null&&(r=Pa=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ua!==null&&Ua(e,t)};var Wa=ye(null);function Ga(){var e=Wa.current;return e===null?td.pooledCache:e}function Ka(e,t){t===null?xe(Wa,Wa.current):xe(Wa,t.pool)}function qa(){var e=Ga();return e===null?null:{parent:Aa._currentValue,pool:e}}var Ja=Error(i(460)),Ya=Error(i(474)),Xa=Error(i(542)),Za={then:function(){}};function Qa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function $a(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(vn,vn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(vn,vn);else{if(e=td,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e}throw to=t,Ja}}function eo(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(to=e,Ja):e}}var to=null;function no(){if(to===null)throw Error(i(459));var e=to;return to=null,e}function ro(e){if(e===Ja||e===Xa)throw Error(i(483))}var io=null,ao=0;function oo(e){var t=ao;return ao+=1,io===null&&(io=[]),$a(io,e,t)}function so(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function co(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function lo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Pi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ri(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ee?(e=d(e,t,n.props.children,r,n.key),so(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ae&&eo(i)===t.type)?(t=a(t,n.props),so(t,n),t.return=e,t):(t=Ii(n.type,n.key,n.props,null,e.mode,r),so(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Bi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Li(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ri(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Ii(t.type,t.key,t.props,null,e.mode,n),so(n,t),n.return=e,n;case A:return t=Bi(t,e.mode,n),t.return=e,t;case ae:return t=eo(t),f(e,t,n)}if(he(t)||fe(t))return t=Li(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,oo(t),n);if(t.$$typeof===N)return f(e,Ta(e,t),n);co(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case ae:return n=eo(n),p(e,t,n,r)}if(he(n)||fe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,oo(n),r);if(n.$$typeof===N)return p(e,t,Ta(e,n),r);co(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ae:return r=eo(r),m(e,t,n,r,i)}if(he(r)||fe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,oo(r),i);if(r.$$typeof===N)return m(e,t,n,Ta(t,r),i);co(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),B&&Qi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return B&&Qi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),B&&Qi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),B&&Qi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return B&&Qi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),B&&Qi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ee&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ee){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),so(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ae&&eo(l)===r.type){n(e,r.sibling),c=a(r,o.props),so(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ee?(c=Li(o.props.children,e.mode,c,o.key),so(c,o),c.return=e,e=c):(c=Ii(o.type,o.key,o.props,null,e.mode,c),so(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Bi(o,e.mode,c),c.return=e,e=c}return s(e);case ae:return o=eo(o),_(e,r,o,c)}if(he(o))return h(e,r,o,c);if(fe(o)){if(l=fe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,oo(o),c);if(o.$$typeof===N)return _(e,r,Ta(e,o),c);co(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ri(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ao=0;var i=_(e,t,n,r);return io=null,i}catch(t){if(t===Ja||t===Xa)throw t;var a=Mi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var uo=lo(!0),fo=lo(!1),po=!1;function mo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ho(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function go(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _o(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ed&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ki(e),Oi(e,null,n),t}return Ti(e,r,t,n),ki(e)}function vo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_t(e,n)}}function yo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var bo=!1;function xo(){if(bo){var e=za;if(e!==null)throw e}}function So(e,t,n,r){bo=!1;var i=e.updateQueue;po=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===Ra&&(bo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:po=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),ld|=o,e.lanes=o,e.memoizedState=d}}function Co(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function wo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Co(n[e],t)}var To=ye(null),Eo=ye(0);function Do(e,t){e=sd,xe(Eo,e),xe(To,t),sd=e|t.baseLanes}function Oo(){xe(Eo,sd),xe(To,To.current)}function ko(){sd=Eo.current,be(To),be(Eo)}var Ao=ye(null),jo=null;function Mo(e){var t=e.alternate;xe(Lo,Lo.current&1),xe(Ao,e),jo===null&&(t===null||To.current!==null||t.memoizedState!==null)&&(jo=e)}function No(e){xe(Lo,Lo.current),xe(Ao,e),jo===null&&(jo=e)}function Po(e){e.tag===22?(xe(Lo,Lo.current),xe(Ao,e),jo===null&&(jo=e)):Fo()}function Fo(){xe(Lo,Lo.current),xe(Ao,Ao.current)}function Io(e){be(Ao),jo===e&&(jo=null),be(Lo)}var Lo=ye(0);function Ro(e,t){xe(Ao,Ao.current),xe(Lo,t)}function zo(e){be(Lo),be(Ao),jo===e&&(jo=null)}function Bo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||um(n)||dm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Vo=0,H=null,U=null,W=null,Ho=!1,Uo=!1,Wo=!1,Go=0,Ko=0,qo=null,Jo=0;function Yo(){throw Error(i(321))}function Xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Vr(e[n],t[n]))return!1;return!0}function Zo(e,t,n,r,i,a){return Vo=a,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,F.H=e===null||e.memoizedState===null?pc:mc,Wo=!1,a=n(r,i),Wo=!1,Uo&&(a=$o(t,n,r,i)),Qo(e),a}function Qo(e){F.H=fc;var t=U!==null&&U.next!==null;if(Vo=0,W=U=H=null,Ho=!1,Ko=0,qo=null,t)throw Error(i(300));e===null||jc||(e=e.dependencies,e!==null&&Sa(e)&&(jc=!0))}function $o(e,t,n,r){H=e;var a=0;do{if(Uo&&(qo=null),Ko=0,Uo=!1,25<=a)throw Error(i(301));if(a+=1,W=U=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}F.H=hc,o=t(n,r)}while(Uo);return o}function es(){var e=F.H,t=e.useState()[0];return t=typeof t.then==`function`?ss(t):t,e=e.useState()[0],(U===null?null:U.memoizedState)!==e&&(H.flags|=1024),t}function ts(){var e=Go!==0;return Go=0,e}function ns(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function rs(e){if(Ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ho=!1}Vo=0,W=U=H=null,Uo=!1,Ko=Go=0,qo=null}function is(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return W===null?H.memoizedState=W=e:W=W.next=e,W}function as(){if(U===null){var e=H.alternate;e=e===null?null:e.memoizedState}else e=U.next;var t=W===null?H.memoizedState:W.next;if(t!==null)W=t,U=e;else{if(e===null)throw H.alternate===null?Error(i(467)):Error(i(310));U=e,e={memoizedState:U.memoizedState,baseState:U.baseState,baseQueue:U.baseQueue,queue:U.queue,next:null},W===null?H.memoizedState=W=e:W=W.next=e}return W}function os(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ss(e){var t=Ko;return Ko+=1,qo===null&&(qo=[]),e=$a(qo,e,t),t=H,(W===null?t.memoizedState:W.next)===null&&(t=t.alternate,F.H=t===null||t.memoizedState===null?pc:mc),e}function cs(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ss(e);if(e.$$typeof===ue)return;if(e.$$typeof===N)return wa(e)}throw Error(i(438,String(e)))}function ls(e){var t=null,n=H.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=H.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=os(),H.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ce;return t.index++,n}function us(e,t){return typeof t==`function`?t(e):t}function ds(e){return fs(as(),U,e)}function fs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Vo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ra&&(d=!0);else if((Vo&p)===p){u=u.next,p===Ra&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,H.lanes|=p,ld|=p;f=u.action,Wo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,H.lanes|=f,ld|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Vr(o,e.memoizedState)&&(jc=!0,d&&(n=za,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ps(e){var t=as(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Vr(o,t.memoizedState)||(jc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ms(e,t,n){var r=H,a=as(),o=B;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Vr((U||a).memoizedState,n);if(s&&(a.memoizedState=n,jc=!0),a=a.queue,zs(_s.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||W!==null&&!!(W.memoizedState.tag&1),Ps(e?9:8,{destroy:void 0},gs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,td===null)throw Error(i(349));o||Vo&127||hs(r,t,n)}return n}function hs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t=os(),H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gs(e,t,n,r){t.value=n,t.getSnapshot=r,vs(t)&&ys(e)}function _s(e,t,n){return n(function(){vs(t)&&ys(e)})}function vs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Vr(e,n)}catch{return!0}}function ys(e){var t=Di(e,2);t!==null&&Ld(t,e,2)}function bs(e){var t=is();if(typeof e==`function`){var n=e;if(e=n(),Wo){$e(!0);try{n()}finally{$e(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:e},t}function xs(e,t,n,r){return e.baseState=n,fs(e,U,typeof r==`function`?r:us)}function Ss(e,t,n,r,a){if(lc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};F.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Cs(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Cs(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=F.T,o={};o.types=a===null?null:a.types,F.T=o;try{var s=n(i,r),c=F.S;c!==null&&c(o,s),ws(e,t,s)}catch(n){Es(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),F.T=a}}else try{a=n(i,r),ws(e,t,a)}catch(n){Es(e,t,n)}}function ws(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Ts(e,t,n)},function(n){return Es(e,t,n)}):Ts(e,t,n)}function Ts(e,t,n){t.status=`fulfilled`,t.value=n,Ds(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Cs(e,n)))}function Es(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ds(t),t=t.next;while(t!==r)}e.action=null}function Ds(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Os(e,t){return t}function ks(e,t){if(B){var n=td.formState;if(n!==null){a:{var r=H;if(B){if(ia){b:{for(var i=ia,a=oa;i.nodeType!==8;)if(!a||(i=pm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ia=pm(i.nextSibling),r=i.data===`F!`;break a}}V(r)}r=!1}r&&(t=n[0])}}return n=is(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Os,lastRenderedState:t},n.queue=r,n=oc.bind(null,H,r),r.dispatch=n,r=bs(!1),a=cc.bind(null,H,!1,r.queue),r=is(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ss.bind(null,H,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function As(e){return js(as(),U,e)}function js(e,t,n){if(t=fs(e,t,Os)[0],e=ds(us)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ss(t)}catch(e){throw e===Ja?Xa:e}else r=t;t=as();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(H.flags|=2048,Ps(9,{destroy:void 0},Ms.bind(null,i,n),null)),[r,a,e]}function Ms(e,t){e.action=t}function Ns(e){var t=as(),n=U;if(n!==null)return js(t,n,e);as(),t=t.memoizedState,n=as();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ps(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=H.updateQueue,t===null&&(t=os(),H.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Fs(){return as().memoizedState}function Is(e,t,n,r){var i=is();H.flags|=e,i.memoizedState=Ps(1|t,{destroy:void 0},n,r===void 0?null:r)}function Ls(e,t,n,r){var i=as();r=r===void 0?null:r;var a=i.memoizedState.inst;U!==null&&r!==null&&Xo(r,U.memoizedState.deps)?i.memoizedState=Ps(t,a,n,r):(H.flags|=e,i.memoizedState=Ps(1|t,a,n,r))}function Rs(e,t){Is(8390656,8,e,t)}function zs(e,t){Ls(2048,8,e,t)}function Bs(e){H.flags|=4;var t=H.updateQueue;if(t===null)t=os(),H.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Vs(e){var t=as().memoizedState;return Bs({ref:t,nextImpl:e}),function(){if(ed&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Hs(e,t){return Ls(4,2,e,t)}function Us(e,t){return Ls(4,4,e,t)}function Ws(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function G(e,t,n){n=n==null?null:n.concat([e]),Ls(4,4,Ws.bind(null,t,e),n)}function Gs(){}function Ks(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qs(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xo(t,r[1]))return r[0];if(r=e(),Wo){$e(!0);try{e()}finally{$e(!1)}}return n.memoizedState=[r,t],r}function Js(e,t,n){return n===void 0||Vo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Fd(),H.lanes|=e,ld|=e,n)}function Ys(e,t,n,r){return Vr(n,t)?n:To.current===null?!(Vo&106)||Vo&1073741824&&!(q&261930)?(jc=!0,e.memoizedState=n):(e=Fd(),H.lanes|=e,ld|=e,t):(e=Js(e,n,r),Vr(e,t)||(jc=!0),e)}function Xs(e,t,n,r,i){var a=I.p;I.p=a!==0&&8>a?a:8;var o=F.T,s={};s.types=o===null?null:o.types,F.T=s,cc(e,!1,t,n);try{var c=i(),l=F.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?sc(e,t,Ha(c,r),Pd(e)):sc(e,t,r,Pd(e))}catch(n){sc(e,t,{then:function(){},status:`rejected`,reason:n},Pd())}finally{I.p=a,o!==null&&s.types!==null&&(o.types=s.types),F.T=o}}function Zs(){}function Qs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=$s(e).queue;Xs(e,a,t,ge,n===null?Zs:function(){return ec(e),n(r)})}function $s(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ge,baseState:ge,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:ge},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ec(e){var t=$s(e);t.next===null&&(t=e.alternate.memoizedState),sc(e,t.next.queue,{},Pd())}function tc(){return wa(lh)}function nc(){return as().memoizedState}function rc(){return as().memoizedState}function ic(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Pd();e=go(n);var r=_o(t,e,n);r!==null&&(Ld(r,t,n),vo(r,t,n)),t={cache:ja()},e.payload=t;return}t=t.return}}function ac(e,t,n){var r=Pd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},lc(e)?uc(t,n):(n=Ei(e,t,n,r),n!==null&&(Ld(n,e,r),dc(n,t,r)))}function oc(e,t,n){sc(e,t,n,Pd())}function sc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(lc(e))uc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Vr(s,o))return Ti(e,t,i,0),td===null&&wi(),!1}catch{}if(n=Ei(e,t,i,r),n!==null)return Ld(n,e,r),dc(n,t,r),!0}return!1}function cc(e,t,n,r){if(r={lane:2,revertLane:Lf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(e)){if(t)throw Error(i(479))}else t=Ei(e,n,r,2),t!==null&&Ld(t,e,2)}function lc(e){var t=e.alternate;return e===H||t!==null&&t===H}function uc(e,t){Uo=Ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_t(e,n)}}var fc={readContext:wa,use:cs,useCallback:Yo,useContext:Yo,useEffect:Yo,useImperativeHandle:Yo,useLayoutEffect:Yo,useInsertionEffect:Yo,useMemo:Yo,useReducer:Yo,useRef:Yo,useState:Yo,useDebugValue:Yo,useDeferredValue:Yo,useTransition:Yo,useSyncExternalStore:Yo,useId:Yo,useHostTransitionStatus:Yo,useFormState:Yo,useActionState:Yo,useOptimistic:Yo,useMemoCache:Yo,useCacheRefresh:Yo,useEffectEvent:Yo},pc={readContext:wa,use:cs,useCallback:function(e,t){return is().memoizedState=[e,t===void 0?null:t],e},useContext:wa,useEffect:Rs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Is(4194308,4,Ws.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Is(4194308,4,e,t)},useInsertionEffect:function(e,t){Is(4,2,e,t)},useMemo:function(e,t){var n=is();t=t===void 0?null:t;var r=e();if(Wo){$e(!0);try{e()}finally{$e(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=is();if(n!==void 0){var i=n(t);if(Wo){$e(!0);try{n(t)}finally{$e(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ac.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=is();return e={current:e},t.memoizedState=e},useState:function(e){e=bs(e);var t=e.queue,n=oc.bind(null,H,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Gs,useDeferredValue:function(e,t){return Js(is(),e,t)},useTransition:function(){var e=bs(!1);return e=Xs.bind(null,H,e.queue,!0,!1),is().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=H,a=is();if(B){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),td===null)throw Error(i(349));q&127||hs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Rs(_s.bind(null,r,o,e),[e]),r.flags|=2048,Ps(9,{destroy:void 0},gs.bind(null,r,o,n,t),null),n},useId:function(){var e=is(),t=td.identifierPrefix;if(B){var n=Zi,r=Xi;n=(r&~(1<<32-et(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Jo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:tc,useFormState:ks,useActionState:ks,useOptimistic:function(e){var t=is();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=cc.bind(null,H,!0,n),n.dispatch=t,[e,t]},useMemoCache:ls,useCacheRefresh:function(){return is().memoizedState=ic.bind(null,H)},useEffectEvent:function(e){var t=is(),n={impl:e};return t.memoizedState=n,function(){if(ed&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},mc={readContext:wa,use:cs,useCallback:Ks,useContext:wa,useEffect:zs,useImperativeHandle:G,useInsertionEffect:Hs,useLayoutEffect:Us,useMemo:qs,useReducer:ds,useRef:Fs,useState:function(){return ds(us)},useDebugValue:Gs,useDeferredValue:function(e,t){return Ys(as(),U.memoizedState,e,t)},useTransition:function(){var e=ds(us)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ms,useId:nc,useHostTransitionStatus:tc,useFormState:As,useActionState:As,useOptimistic:function(e,t){return xs(as(),U,e,t)},useMemoCache:ls,useCacheRefresh:rc,useEffectEvent:Vs},hc={readContext:wa,use:cs,useCallback:Ks,useContext:wa,useEffect:zs,useImperativeHandle:G,useInsertionEffect:Hs,useLayoutEffect:Us,useMemo:qs,useReducer:ps,useRef:Fs,useState:function(){return ps(us)},useDebugValue:Gs,useDeferredValue:function(e,t){var n=as();return U===null?Js(n,e,t):Ys(n,U.memoizedState,e,t)},useTransition:function(){var e=ps(us)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ms,useId:nc,useHostTransitionStatus:tc,useFormState:Ns,useActionState:Ns,useOptimistic:function(e,t){var n=as();return U===null?(n.baseState=e,[e,n.queue.dispatch]):xs(n,U,e,t)},useMemoCache:ls,useCacheRefresh:rc,useEffectEvent:Vs};function gc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _c={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Pd(),i=go(r);i.payload=t,n!=null&&(i.callback=n),t=_o(e,i,r),t!==null&&(Ld(t,e,r),vo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Pd(),i=go(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=_o(e,i,r),t!==null&&(Ld(t,e,r),vo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Pd(),r=go(n);r.tag=2,t!=null&&(r.callback=t),t=_o(e,r,n),t!==null&&(Ld(t,e,n),vo(t,e,n))}};function vc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Hr(n,r)||!Hr(i,a):!0}function yc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&_c.enqueueReplaceState(t,t.state,null)}function bc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function xc(e){bi(e)}function Sc(e){console.error(e)}function Cc(e){bi(e)}function wc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){return n=go(n),n.tag=3,n.payload={element:null},n.callback=function(){wc(e,t)},n}function Dc(e){return e=go(e),e.tag=3,e}function Oc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Tc(t,n,r),typeof i!=`function`&&(xd===null?xd=new Set([this]):xd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function kc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&xa(t,n,a,!0),n=Ao.current,n!==null){switch(n.tag){case 31:case 13:case 19:return jo===null?Yd():n.alternate===null&&cd===0&&(cd=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),_f(e,r,a)),!1;case 22:return n.flags|=65536,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),_f(e,r,a)),!1}throw Error(i(435,n.tag))}return _f(e,r,a),Yd(),!1}if(B)return t=Ao.current,t===null?(r!==sa&&(t=Error(i(423),{cause:r}),pa(Hi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Hi(r,n),a=Ec(e.stateNode,r,a),yo(e,a),cd!==4&&(cd=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==sa&&(e=Error(i(422),{cause:r}),pa(Hi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Hi(o,n),md===null?md=[o]:md.push(o),cd!==4&&(cd=2),t===null)return!0;r=Hi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ec(n.stateNode,r,e),yo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(xd===null||!xd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Dc(a),Oc(a,e,n,r),yo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Ac=Error(i(461)),jc=!1;function Mc(e,t,n,r){t.child=e===null?fo(t,null,n,r):uo(t,e.child,n,r)}function Nc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ca(t),r=Zo(e,t,n,o,a,i),s=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(B&&s&&ea(t),t.flags|=1,Mc(e,t,r,i),t.child)}function Pc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Ni(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Fc(e,t,a,r,i)):(e=Ii(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!cl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Hr:n,n(o,r)&&e.ref===t.ref)return sl(e,t,i)}return t.flags|=1,e=Pi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Fc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Hr(a,r)&&e.ref===t.ref){if(jc=!1,t.pendingProps=r=a,cl(e,i))e.flags&131072&&(jc=!0);else return t.lanes=e.lanes,sl(e,t,i)}}return Uc(e,t,n,r,i)}function Ic(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Rc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ka(t,a===null?null:a.cachePool),a===null?Oo():Do(t,a),Po(t);else return r=t.lanes=536870912,Rc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ka(t,null),Oo(),Fo()):(Ka(t,a.cachePool),Do(t,a),Fo(),t.memoizedState=null);return Mc(e,t,i,n),t.child}function Lc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Rc(e,t,n,r,i){var a=Ga();return a=a===null?null:{parent:Aa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ka(t,null),Oo(),Po(t),e!==null&&xa(e,t,r,!0),t.childLanes=i,null}function zc(e,t){return t=Qc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Bc(e,t,n){return uo(t,e.child,null,n),e=zc(t,t.pendingProps),e.flags|=2,Io(t),t.memoizedState=null,e}function Vc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(B){if(r.mode===`hidden`)return e=zc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Lc(null,e);if(No(t),(e=ia)?(e=lm(e,oa),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Yi===null?null:{id:Xi,overflow:Zi},retryLane:536870912,hydrationErrors:null},n=zi(e),n.return=t,t.child=n,ra=t,ia=null)):e=null,e===null)throw V(t);return t.lanes=536870912,null}return zc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(No(t),a){if(t.flags&256)t.flags&=-257,t=Bc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(jc||xa(e,t,n,!1),a=(n&e.childLanes)!==0,jc||a){if(To.current===null){if(r=td,r!==null&&(s=vt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Di(e,s),Ld(r,e,s),Ac;Yd()}t=Bc(e,t,n)}else e=o.treeContext,ia=pm(s.nextSibling),ra=t,B=!0,aa=null,oa=!1,e!==null&&na(t,e),t=zc(t,r),t.flags|=134221824;return t}return e=Pi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Uc(e,t,n,r,i){return Ca(t),n=Zo(e,t,n,r,void 0,i),r=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(B&&r&&ea(t),t.flags|=1,Mc(e,t,n,i),t.child)}function Wc(e,t,n,r,i,a){return Ca(t),t.updateQueue=null,n=$o(t,r,n,i),Qo(e),r=ts(),e!==null&&!jc?(ns(e,t,a),sl(e,t,a)):(B&&r&&ea(t),t.flags|=1,Mc(e,t,n,a),t.child)}function Gc(e,t,n,r,i){if(Ca(t),t.stateNode===null){var a=Ai,o=n.contextType;typeof o==`object`&&o&&(a=wa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=_c,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},mo(t),o=n.contextType,a.context=typeof o==`object`&&o?wa(o):Ai,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(gc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&_c.enqueueReplaceState(a,a.state,null),So(t,r,a,i),xo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=bc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ai,typeof u==`object`&&u&&(o=wa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&yc(t,a,r,o),po=!1;var f=t.memoizedState;a.state=f,So(t,r,a,i),xo(),l=t.memoizedState,s||f!==l||po?(typeof d==`function`&&(gc(t,n,d,r),l=t.memoizedState),(c=po||vc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,ho(e,t),o=t.memoizedProps,u=bc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ai,typeof l==`object`&&l&&(c=wa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&yc(t,a,r,c),po=!1,f=t.memoizedState,a.state=f,So(t,r,a,i),xo();var p=t.memoizedState;o!==d||f!==p||po||e!==null&&e.dependencies!==null&&Sa(e.dependencies)?(typeof s==`function`&&(gc(t,n,s,r),p=t.memoizedState),(u=po||vc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Sa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Hc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=uo(t,e.child,null,i),t.child=uo(t,null,n,i)):Mc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=sl(e,t,i),e}function Kc(e,t,n,r){return da(),t.flags|=256,Mc(e,t,n,r),t.child}var qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:qa()}}function Yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=fd),e}function Xc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Lo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(B){if(i?Mo(t):Fo(),(e=ia)?(e=lm(e,oa),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Yi===null?null:{id:Xi,overflow:Zi},retryLane:536870912,hydrationErrors:null},n=zi(e),n.return=t,t.child=n,ra=t,ia=null)):e=null,e===null)throw V(t);return t.lanes=dm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Fo(),i=t.mode,a=Qc({mode:`hidden`,children:a},i),r=Li(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Jc(n),r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(null,r)):(Mo(t),Zc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return el(e,t,a,o,r,c,s,n)}return i?(Fo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Pi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Li(i,a,n,null),i.flags|=2):i=Pi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Lc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Jc(n):(a=i.cachePool,a===null?a=qa():(s=Aa._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(e.child,r)):(Mo(t),n=e.child,e=n.sibling,n=Pi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Zc(e,t){return t=Qc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Qc(e,t){return e=Mi(22,e,null,t),e.lanes=0,e}function $c(e,t,n){return uo(t,e.child,null,n),e=Zc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function el(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Mo(t),t.flags&=-257,$c(e,t,c)):t.memoizedState===null?(Fo(),o=a.fallback,s=t.mode,a=Qc({mode:`visible`,children:a.children},s),o=Li(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,uo(t,e.child,null,c),a=t.child,a.memoizedState=Jc(c),a.childLanes=Yc(e,r,c),t.memoizedState=qc,Lc(null,a)):(Fo(),t.child=e.child,t.flags|=128,null);if(Mo(t),dm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,pa({value:a,source:null,stack:null})),$c(e,t,c)}if(jc||xa(e,t,c,!1),r=(c&e.childLanes)!==0,jc||r){if(To.current!==null)return $c(e,t,c);if(r=td,r!==null&&(a=vt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Di(e,a),Ld(r,e,a),Ac;return um(o)||Yd(),$c(e,t,c)}return um(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,ia=pm(o.nextSibling),ra=t,B=!0,aa=null,oa=!1,e!==null&&na(t,e),t=Zc(t,a.children),t.flags|=134221824,t)}function tl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ya(e.return,t,n)}function nl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Bo(n)===null&&(t=e),e=e.sibling}return t}function rl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function il(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function al(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Lo.current;if(t.flags&128)return Ro(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Ro(t,o),i===`backwards`&&e!==null?(il(e),Mc(e,t,r,n),il(e)):Mc(e,t,r,n),r=B?Ki:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tl(e,n,t);else if(e.tag===19)tl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,il(t)),rl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Bo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}rl(t,!0,n,null,a,r);break;case`together`:rl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),rl(t,!1,i,n,a,r)}return t.child}function ol(e,t,n){var r=t.pendingProps;return _a(t,t.type,r.value),Mc(e,t,r.children,n),t.child}function sl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ld|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(xa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Pi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Pi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function cl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Sa(e)))}function ll(e,t,n){switch(t.tag){case 3:Ee(t,t.stateNode.containerInfo),_a(t,Aa,e.memoizedState.cache),da();break;case 27:case 5:Oe(t);break;case 4:Ee(t,t.stateNode.containerInfo);break;case 10:_a(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,No(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Mo(t),t.flags|=128,null;r=xa(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Xc(e,t,n):(Mo(t),e=sl(e,t,n),e===null?null:e.sibling)}Mo(t);break;case 19:if(t.flags&128)return al(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(xa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return al(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ro(t,Lo.current),r)break;return null;case 22:return t.lanes=0,Ic(e,t,n,t.pendingProps);case 24:_a(t,Aa,e.memoizedState.cache)}return sl(e,t,n)}function ul(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)jc=!0;else{if(!cl(e,n)&&!(t.flags&128))return jc=!1,ll(e,t,n);jc=!!(e.flags&131072)}}else jc=!1,B&&t.flags&1048576&&$i(t,Ki,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=eo(t.elementType),t.type=e,typeof e==`function`)Ni(e)?(r=bc(e,r),t.tag=1,t=Gc(null,t,e,r,n)):(t.tag=0,t=Uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ne){t.tag=11,t=Nc(null,t,e,r,n);break a}if(a===P){t.tag=14,t=Pc(null,t,e,r,n);break a}if(a===N){t.tag=10,t.type=e,t=ol(null,t,n);break a}}throw t=me(e)||e,Error(i(306,t,``))}}return t;case 0:return Uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=bc(r,t.pendingProps),Gc(e,t,r,a,n);case 3:a:{if(Ee(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,ho(e,t),So(t,r,null,n);var s=t.memoizedState;if(r=s.cache,_a(t,Aa,r),r!==o.cache&&ba(t,[Aa],n,!0),xo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Kc(e,t,r,n);break a}if(r!==a){a=Hi(Error(i(424)),t),pa(a),t=Kc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ia=pm(e.firstChild),ra=t,B=!0,aa=null,oa=!0,n=fo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(da(),r===a){t=sl(e,t,n);break a}Mc(e,t,r,n)}t=t.child}return t;case 26:return Hc(e,t),e===null?(n=Lm(t.type,null,t.pendingProps,null))?t.memoizedState=n:B||(t.stateNode=gp(t.type,t.pendingProps,we.current,t)):t.memoizedState=Lm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Oe(t),e===null&&B&&(r=t.stateNode=ym(t.type,t.pendingProps,we.current),ra=t,oa=!0,a=ia,Ep(t.type)?(mm=a,ia=pm(r.firstChild)):ia=a),Mc(e,t,t.pendingProps.children,n),Hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&B&&((a=r=ia)&&(r=sm(r,t.type,t.pendingProps,oa),r===null?a=!1:(t.stateNode=r,ra=t,ia=pm(r.firstChild),oa=!1,a=!0)),a||V(t)),Oe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,_p(a,o)?r=null:s!==null&&_p(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Zo(e,t,es,null,null,n),lh._currentValue=a),Hc(e,t),Mc(e,t,r,n),t.child;case 6:return e===null&&B&&((e=n=ia)&&(n=cm(n,t.pendingProps,oa),n===null?e=!1:(t.stateNode=n,ra=t,ia=null,e=!0)),e||V(t)),null;case 13:return Xc(e,t,n);case 4:return Ee(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=uo(t,null,r,n):Mc(e,t,r,n),t.child;case 11:return Nc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Hc(e,t),Mc(e,t,r,n),t.child;case 8:return Mc(e,t,t.pendingProps.children,n),t.child;case 12:return Mc(e,t,t.pendingProps.children,n),t.child;case 10:return ol(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Ca(t),a=wa(a),r=r(a),t.flags|=1,Mc(e,t,r,n),t.child;case 14:return Pc(e,t,t.type,t.pendingProps,n);case 15:return Fc(e,t,t.type,t.pendingProps,n);case 19:return al(e,t,n);case 31:return Vc(e,t,n);case 22:return Ic(e,t,n,t.pendingProps);case 24:return Ca(t),r=wa(Aa),e===null?(a=Ga(),a===null&&(a=td,o=ja(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},mo(t),_a(t,Aa,a)):((e.lanes&n)!==0&&(ho(e,t),So(t,null,null,n),xo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,_a(t,Aa,r),r!==a.cache&&ba(t,[Aa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),_a(t,Aa,r))),Mc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:B&&ea(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Hc(e,t),Mc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function dl(e){e.flags|=4}function fl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Zm(t,r):Zm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Kd())e.flags|=8192;else throw to=Za,Ya}}else e.flags&=-16777217}function pl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Qm(t)){if(Kd())e.flags|=8192;else throw to=Za,Ya}}function ml(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ft(),e.lanes|=t,pd|=t)}function hl(e,t){if(!B)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function gl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _l(e,t,n){var r=t.pendingProps;switch(ta(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gl(t),null;case 1:return gl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),va(Aa),De(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ua(t)?dl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,fa())),gl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(dl(t),o===null?(gl(t),fl(t,a,null,r,n)):(gl(t),pl(t,o))):o?o===e.memoizedState?(gl(t),t.flags&=-16777217):(dl(t),gl(t),pl(t,o)):(e=e.memoizedProps,e!==r&&dl(t),gl(t),fl(t,a,e,r,n)),null;case 27:if(ke(t),n=we.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}e=Se.current,ua(t)?ca(t,e):(e=ym(a,r,n),t.stateNode=e,dl(t))}return gl(t),t.subtreeFlags&=-33554433,null;case 5:if(ke(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}if(o=Se.current,ua(t))ca(t,o);else{var s=pp(we.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Ct]=t,o[wt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(op(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&dl(t)}}return gl(t),t.subtreeFlags&=-33554433,fl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=we.current,ua(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ra,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Ct]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||rp(e.nodeValue,n)),e||V(t,!0)}else e=pp(e).createTextNode(r),e[Ct]=t,t.stateNode=e}return gl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=ua(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Ct]=t}else da(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),e=!1}else n=fa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Io(t),t):(Io(t),null);if(t.flags&128)throw Error(i(558))}return gl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=ua(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Ct]=t}else da(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),a=!1}else a=fa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Io(t),t):(Io(t),null)}return Io(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ml(t,t.updateQueue),gl(t),null);case 4:return De(),e===null&&qf(t.stateNode.containerInfo),t.flags|=67108864,gl(t),null;case 10:return va(t.type),gl(t),null;case 19:if(zo(t),r=t.memoizedState,r===null)return gl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)hl(r,!1);else{if(cd!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Bo(e),o!==null){for(t.flags|=128,hl(r,!1),e=o.updateQueue,t.updateQueue=e,ml(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Fi(n,e),n=n.sibling;return Ro(t,Lo.current&1|2),B&&Qi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&He()>yd&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Bo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ml(t,e),hl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!B)return gl(t),null}else 2*He()-r.renderingStartTime>yd&&n!==536870912&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=He(),e.sibling=null,o=Lo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||B?Ro(t,o):(n=o,xe(Ao,t),xe(Lo,n),jo===null&&(jo=t)),B&&Qi(t,r.treeForkCount),e}return gl(t),null;case 22:case 23:return Io(t),ko(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(gl(t),t.subtreeFlags&6&&(t.flags|=8192)):gl(t),n=t.updateQueue,n!==null&&ml(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&be(Wa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),va(Aa),gl(t),null;case 25:return null;case 30:return t.flags|=33554432,gl(t),null}throw Error(i(156,t.tag))}function vl(e,t){switch(ta(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return va(Aa),De(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ke(t),null;case 31:if(t.memoizedState!==null){if(Io(t),t.alternate===null)throw Error(i(340));da()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Io(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));da()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return zo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return De(),null;case 10:return va(t.type),null;case 22:case 23:return Io(t),ko(),e!==null&&be(Wa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return va(Aa),null;case 25:return null;default:return null}}function yl(e,t){switch(ta(t),t.tag){case 3:va(Aa),De();break;case 26:case 27:case 5:ke(t);break;case 4:De();break;case 31:t.memoizedState!==null&&Io(t);break;case 13:Io(t);break;case 19:zo(t);break;case 10:va(t.type);break;case 22:case 23:Io(t),ko(),e!==null&&be(Wa);break;case 24:va(Aa)}}function bl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){gf(t,t.return,e)}}function xl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){gf(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){gf(t,t.return,e)}}function Sl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{wo(t,n)}catch(t){gf(e,e.return,t)}}}function Cl(e,t,n){n.props=bc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){gf(e,t,n)}}function wl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=_i(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Rp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new zp(e);m(e.child,!1,nm,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){gf(e,t,n)}}function Tl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){gf(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){gf(e,t,n)}else n.current=null}}function El(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)im(e.stateNode,t[n])}function Dl(e){for(var t=e.return;t!==null&&(Al(t)&&im(e.stateNode,t.stateNode),!kl(t));)t=t.return}function Ol(e){for(var t=e.return;t!==null&&(Al(t)&&am(e.stateNode,t.stateNode),!kl(t));)t=t.return}function kl(e){return e.tag===5||e.tag===3||e.tag===27}function Al(e){return e&&e.tag===7&&e.stateNode!==null}function jl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){gf(e,e.return,t)}}function Ml(e,t,n){try{var r=e.stateNode;cp(r,e.type,n,t),r[wt]=t}catch(t){gf(e,e.return,t)}}function Nl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ep(e.type)||e.tag===4}function Pl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Nl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ep(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=vn)),El(e,r),z=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Ep(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),El(e,r),z=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Ep(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Il(e,t,n,r),e=e.sibling;e!==null;)Il(e,t,n,r),e=e.sibling}function Ll(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);op(t,r,n),t[Ct]=e,t[wt]=n}catch(t){gf(e,e.return,t)}}var Rl=!1,zl=null;function Bl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Rl=!0)}var Vl=null;function Hl(){var e=Vl;return Vl=null,e}var Ul=0;function Wl(e,t,n,r,i){return Ul=0,Gl(e.child,t,n,r,i)}function Gl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Mp(o);r.push(s),s.view&&(a=!0)}else a||Mp(o).view&&(a=!0);Rl=!0,kp(o,Ul===0?t:t+`_`+Ul,n),Ul++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Gl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Kl(e,t){for(;e!==null;)e.tag===5?Ap(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Kl(e.child,t),e=e.sibling}function ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(ql(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=yi(t.default,t.share),t!==`none`&&(Wl(e,n,t,null,!1)||Kl(e.child,!1))}e=e.sibling}}function Jl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=_i(r,n),a=yi(r.default,n.paired?r.share:r.enter);a===`none`?ql(e):Wl(e,i,a,null,!1)?(ql(e),n.paired||t||Id(e,r.onEnter)):Kl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Jl(e,t),e=e.sibling;else ql(e)}function Yl(e){if(zl!==null&&zl.size!==0){var t=zl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=yi(n.default,n.share);if(a!==`none`&&(Wl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Id(e,n.onShare)):Kl(e.child,!1)),t.delete(r),t.size===0)break}}}Yl(e)}e=e.sibling}}}function Xl(e){if(e.tag===30){var t=e.memoizedProps,n=_i(t,e.stateNode),r=zl===null?void 0:zl.get(n),i=yi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Wl(e,n,i,null,!1)?r===void 0?Id(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,zl.delete(n),Id(e,t.onShare)):Kl(e.child,!1)),zl!==null&&Yl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Xl(e),e=e.sibling;else zl!==null&&Yl(e)}function Zl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=_i(t,e.stateNode);t=yi(t.default,t.update),e.flags&=-5,t!==`none`&&Wl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Zl(e);e=e.sibling}}function Ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Kl(e.child,!1))}Ql(e)}e=e.sibling}}function $l(e){if(e.tag===30)e.stateNode.paired=null,Kl(e.child,!1),Ql(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)$l(e),e=e.sibling;else Ql(e)}function eu(e){for(e=e.child;e!==null;)e.tag===30?Kl(e.child,!1):e.subtreeFlags&33554432&&eu(e),e=e.sibling}function tu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Ul<a.length){var l=a[Ul],u=Mp(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&kp(c,Ul===0?n:n+`_`+Ul,i),s&&e.flags&4||(Vl===null&&(Vl=[]),Vl.push(c,Ul===0?r:r+`_`+Ul,t.memoizedProps)),Ul++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:tu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function nu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=_i(n,r),a=yi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Np)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Ul=0,i=tu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Id(e,n.onUpdate))}else e.subtreeFlags&33554432&&nu(e,t);e=e.sibling}}var ru=!1,iu=!1,au=!1,ou=!1,su=typeof WeakSet==`function`?WeakSet:Set,cu=null,lu=!1,uu=!1,du=!1,fu=!1;function pu(e,t,n){if(e=e.containerInfo,dp=vh,e=qr(e),Jr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(fp={focusedElem:e,selectionRange:r},vh=!1,n=(n&335544064)===n,cu=t,t=n?9270:1024;cu!==null;){if(e=cu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Xl(r[a]);if(e.alternate===null&&e.flags&2)n&&Bl(e),mu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Xl(r),mu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Bl(e),mu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,cu=r):(n&&Zl(e),mu(n))}}zl=null}function mu(e){for(;cu!==null;){var t=cu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=bc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){gf(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)om(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:om(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=_i(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=yi(a.default,a.update),a!==`none`&&Wl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,cu=r;break}cu=t.return}}function hu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Fu(e,n),r&4&&bl(5,n);break;case 1:if(Fu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){gf(n,n.return,e)}else{var i=bc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){gf(n,n.return,e)}}}r&64&&Sl(n),r&512&&wl(n,n.return);break;case 3:if(Fu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{wo(e,t)}catch(e){gf(n,n.return,e)}}break;case 27:t===null&&r&4&&Ll(n);case 26:case 5:Fu(e,n),t===null&&r&4&&jl(n),r&512&&wl(n,n.return);break;case 12:Fu(e,n);break;case 31:Fu(e,n),r&4&&wu(e,n);break;case 13:Fu(e,n),r&4&&Tu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=bf.bind(null,n),fm(e,n))));break;case 22:if(r=n.memoizedState!==null||ru,!r){var a=t!==null&&t.memoizedState!==null||iu;t=ru,i=iu,ru=r,(iu=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Lu(e,n,r)):Fu(e,n),ru=t,iu=i}break;case 30:Fu(e,n),r&512&&wl(n,n.return);break;case 7:r&512&&wl(n,n.return);default:Fu(e,n)}}function gu(e,t){for(e=e.child;e!==null;)_u(e,t),e=e.sibling}function _u(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){gf(e,e.return,t)}vu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,z=!0}catch(t){gf(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Op(s,!0):Op(e.stateNode,!1)}catch(t){gf(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&gu(e,t);break;default:gu(e,t)}}function vu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:_u(n,r);break a;case 22:n.memoizedState===null&&vu(n,r);break a;default:vu(n,r)}}e=e.sibling}}function yu(e){var t=e.alternate;t!==null&&(e.alternate=null,yu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Mt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var bu=null,xu=!1;function Su(e,t,n){for(n=n.child;n!==null;)Cu(e,t,n),n=n.sibling}function Cu(e,t,n){if(Qe&&typeof Qe.onCommitFiberUnmount==`function`)try{Qe.onCommitFiberUnmount(Ze,n)}catch{}switch(n.tag){case 26:iu||Tl(n,t),Su(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!iu&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:iu||Tl(n,t),Ol(n);var r=bu,i=xu;Ep(n.type)&&(bu=n.stateNode,xu=!1),Su(e,t,n),bm(n.stateNode,n.type,n.memoizedProps),bu=r,xu=i;break;case 5:iu||Tl(n,t),Ol(n);case 6:if(n.tag===6&&Ol(n),r=bu,i=xu,bu=null,Su(e,t,n),bu=r,xu=i,bu!==null){if(xu)try{(bu.nodeType===9?bu.body:bu.nodeName===`HTML`?bu.ownerDocument.body:bu).removeChild(n.stateNode),z=!0}catch(e){gf(n,t,e)}else try{bu.removeChild(n.stateNode),z=!0}catch(e){gf(n,t,e)}}break;case 18:bu!==null&&(xu?(e=bu,Dp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Wh(e)):Dp(bu,n.stateNode));break;case 4:r=bu,i=xu,bu=n.stateNode.containerInfo,xu=!0,Su(e,t,n),bu=r,xu=i;break;case 0:case 11:case 14:case 15:xl(2,n,t),iu||xl(4,n,t),Su(e,t,n);break;case 1:iu||(Tl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Cl(n,t,r)),Su(e,t,n);break;case 21:Su(e,t,n);break;case 22:iu=(r=iu)||n.memoizedState!==null,Su(e,t,n),iu=r;break;case 30:Tl(n,t),Su(e,t,n);break;case 7:iu||Tl(n,t),Su(e,t,n);break;default:Su(e,t,n)}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Wh(e)}catch(e){gf(t,t.return,e)}}}function Tu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Wh(e)}catch(e){gf(t,t.return,e)}}function Eu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new su),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new su),t;default:throw Error(i(435,e.tag))}}function Du(e,t){var n=Eu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=xf.bind(null,e,t);t.then(r,r)}})}function Ou(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Ep(l.type)){bu=l.stateNode,xu=!1;break a}break;case 5:bu=l.stateNode,xu=!1;break a;case 3:case 4:bu=l.stateNode.containerInfo,xu=!0;break a}l=l.return}if(bu===null)throw Error(i(160));Cu(s,c,o),bu=null,xu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Au(t,e,n),t=t.sibling}var ku=null;function Au(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Ou(t,e,n),ju(e),a&4&&(xl(3,e,e.return),bl(3,e),xl(5,e,e.return));break;case 1:Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),a&64&&ru&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ku,Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(ru)e.stateNode=gp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[At]||r[Ct]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),op(r,t,n),r[Ct]=e,It(r),t=r;break a;case`link`:if(o=Jm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Jm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Ct]=e,It(r),t=r}e.stateNode=t}}else ru||Ym(o,e.type,e.stateNode)}else e.stateNode=Wm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Ml(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||iu||t.parentNode.removeChild(t)):a.count--,n===null?ru||Ym(o,e.type,e.stateNode):Wm(o,n,e.memoizedProps))}break;case 27:Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),r!==null&&a&4&&Ml(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=au,au=!1,Ou(t,e,n),au=o,ju(e),a&512&&(iu||r===null||Tl(r,r.return)),e.flags&32){t=e.stateNode;try{un(t,``),z=!0}catch(t){gf(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Ml(e,t,r===null?t:r.memoizedProps)),a&1024&&(ou=!0);break;case 6:if(Ou(t,e,n),ju(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,z=!0}catch(t){gf(e,e.return,t)}}break;case 3:if(z=!1,qm=null,o=ku,ku=wm(t.containerInfo),Ou(t,e,n),ku=o,ju(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Wh(t.containerInfo)}catch(t){gf(e,e.return,t)}ou&&(ou=!1,Mu(e)),z=!1;break;case 4:a=au,au=ru,r=Kt(),o=ku,ku=wm(e.stateNode.containerInfo),Ou(t,e,n),ju(e),ku=o,z&&uu&&(du=!0),z=r,au=a;break;case 12:Ou(t,e,n),ju(e);break;case 31:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 13:Ou(t,e,n),ju(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(_d=He()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=ru,l=iu,u=au;ru=c||o,au=u||o,iu=l||s,Ou(t,e,n),iu=l,au=u,ru=c,ju(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||ru||iu||(t=s||iu,n=ru,r=iu,ru=o||ru,iu=t,Iu(e,2),ru=n,iu=r),!o&&au||gu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Du(e,n))));break;case 19:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 30:a&512&&(iu||r===null||Tl(r,r.return)),a=Kt(),o=uu,s=(n&335544064)===n,c=e.memoizedProps,uu=s&&yi(c.default,c.update)!==`none`,Ou(t,e,n),ju(e),s&&r!==null&&z&&(e.flags|=4),uu=o,z=a;break;case 21:break;case 7:a&512&&(iu||r===null||Tl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Ou(t,e,n),ju(e)}}function ju(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Nl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Al(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(kl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Il(e,Pl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(un(l,``),n.flags&=-33),Il(e,Pl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Fl(e,Pl(e),u,s);break;default:throw Error(i(161))}}catch(t){gf(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Mu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Mu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,vh=!0,t.reset(),vh=!1),e=e.sibling}}function Nu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Pu(t,e),t=t.sibling;else nu(t,!1)}function Pu(e,t){var n=e.alternate;if(n===null)Jl(e,!1);else switch(e.tag){case 3:if(fu=lu=!1,Hl(),Nu(t,e),!lu&&!du){if(e=Vl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ap(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),fu=!0}Vl=null;break;case 5:Nu(t,e);break;case 4:r=lu,lu=!1,Nu(t,e),lu&&(du=!0),lu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Nu(t,e):Jl(e,!1));break;case 30:r=lu,i=Hl(),lu=!1,Nu(t,e),lu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=_i(a,o),o=_i(n.memoizedProps,o);var s=yi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Ul=0,t=tu(e,n,t,o,s,a,!0),Ul!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Id(e,e.memoizedProps.onUpdate),Vl=i):i!==null&&(i.push.apply(i,Vl),Vl=i),lu=e.flags&32?!0:r;break;default:Nu(t,e)}}function Fu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)hu(e,t.alternate,t),t=t.sibling}function Iu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:xl(4,n,n.return),Iu(n,r);break;case 1:Tl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Cl(n,n.return,i),Iu(n,r);break;case 27:r&2&&bm(n.stateNode,n.type,n.memoizedProps);case 5:Tl(n,n.return),n.tag!==5&&n.tag!==27||Ol(n),Iu(n,r);break;case 6:Ol(n);break;case 26:Tl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||iu||i.parentNode.removeChild(i),Iu(n,r);break;case 22:n.memoizedState===null&&Iu(n,r);break;case 30:Tl(n,n.return),Iu(n,r);break;case 7:Tl(n,n.return);default:Iu(n,r)}e=e.sibling}}function Lu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Lu(i,a,n),bl(4,a);break;case 1:if(Lu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){gf(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Co(l[i],c)}catch(e){gf(r,r.return,e)}}s&&o&64&&Sl(a),wl(a,a.return);break;case 27:n&2&&Ll(a);case 5:a.tag!==5&&a.tag!==27||Dl(a),Lu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 6:Dl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||ru||Ym(wm(c.ownerDocument),a.type,c),Lu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 12:Lu(i,a,n);break;case 31:Lu(i,a,n),s&&o&4&&wu(i,a);break;case 13:Lu(i,a,n),s&&o&4&&Tu(i,a);break;case 22:a.memoizedState===null&&Lu(i,a,n),wl(a,a.return);break;case 30:Lu(i,a,n),wl(a,a.return);break;case 7:wl(a,a.return);default:Lu(i,a,n)}t=t.sibling}}function Ru(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Ma(n))}function zu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ma(e))}function Bu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Vu(e,t,n,r),t=t.sibling;else i&&eu(t)}function Vu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&$l(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Bu(e,t,n,r),a&2048&&bl(9,t);break;case 1:Bu(e,t,n,r);break;case 3:Bu(e,t,n,r),i&&fu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Ma(a)));break;case 12:if(a&2048){Bu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){gf(t,t.return,e)}}else Bu(e,t,n,r);break;case 31:Bu(e,t,n,r);break;case 13:Bu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&$l(t),o._visibility&2?Bu(e,t,n,r):(o._visibility|=2,Hu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&$l(s),o._visibility&2?Bu(e,t,n,r):Uu(e,t)),a&2048&&Ru(s,t);break;case 24:Bu(e,t,n,r),a&2048&&zu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Kl(a.child,!0),Kl(t.child,!0))),Bu(e,t,n,r);break;default:Bu(e,t,n,r)}}function Hu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Hu(a,o,s,c,i),bl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Hu(a,o,s,c,i)):u._visibility&2?Hu(a,o,s,c,i):Uu(a,o),i&&l&2048&&Ru(o.alternate,o);break;case 24:Hu(a,o,s,c,i),i&&l&2048&&zu(o.alternate,o);break;default:Hu(a,o,s,c,i)}t=t.sibling}}function Uu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Uu(n,r),i&2048&&Ru(r.alternate,r);break;case 24:Uu(n,r),i&2048&&zu(r.alternate,r);break;default:Uu(n,r)}t=t.sibling}}var Wu=8192;function Gu(e,t,n){if(e.subtreeFlags&Wu)for(e=e.child;e!==null;)Ku(e,t,n),e=e.sibling}function Ku(e,t,n){switch(e.tag){case 26:Gu(e,t,n),e.flags&Wu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&$m(n,e)):eh(n,ku,e.memoizedState,e.memoizedProps));break;case 5:Gu(e,t,n),e.flags&Wu&&(e=e.stateNode,(t&335544128)===t&&$m(n,e));break;case 3:case 4:var r=ku;ku=wm(e.stateNode.containerInfo),Gu(e,t,n),ku=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Wu,Wu=16777216,Gu(e,t,n),Wu=r):Gu(e,t,n));break;case 30:if((e.flags&Wu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,zl===null&&(zl=new Map),zl.set(r,i)}Gu(e,t,n);break;default:Gu(e,t,n)}}function qu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ju(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];cu=r,Zu(r,e)}qu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Yu(e),e=e.sibling}function Yu(e){switch(e.tag){case 0:case 11:case 15:Ju(e),e.flags&2048&&xl(9,e,e.return);break;case 3:Ju(e);break;case 12:Ju(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Xu(e)):Ju(e);break;default:Ju(e)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];cu=r,Zu(r,e)}qu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:xl(8,t,t.return),Xu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Xu(t));break;default:Xu(t)}e=e.sibling}}function Zu(e,t){for(;cu!==null;){var n=cu;switch(n.tag){case 0:case 11:case 15:xl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ma(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,cu=r;else a:for(n=e;cu!==null;){r=cu;var i=r.sibling,a=r.return;if(yu(r),r===n){cu=null;break a}if(i!==null){i.return=a,cu=i;break a}cu=a}}}var Qu={getCacheForType:function(e){var t=wa(Aa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return wa(Aa).controller.signal}},$u=typeof WeakMap==`function`?WeakMap:Map,ed=0,td=null,K=null,q=0,nd=0,rd=null,id=!1,ad=!1,od=!1,sd=0,cd=0,ld=0,ud=0,dd=0,fd=0,pd=0,md=null,hd=null,gd=!1,_d=0,vd=0,yd=1/0,bd=null,xd=null,Sd=0,Cd=null,wd=null,Td=0,Ed=0,Dd=null,Od=null,kd=null,Ad=null,jd=null,Md=0,Nd=null;function Pd(){return ed&2&&q!==0?q&-q:F.T===null?L():Lf()}function Fd(){if(fd===0){if(!(q&536870912)||B){var e=at;at<<=1,!(at&3932160)&&(at=262144),fd=e}else fd=536870912}return e=Ao.current,e!==null&&(e.flags|=32),fd}function Id(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Rp(_i(e.memoizedProps,n))),Ad===null&&(Ad=[]),Ad.push(t.bind(null,r))}}function Ld(e,t,n){(e===td&&(nd===2||nd===9)||e.cancelPendingCommit!==null)&&(Wd(e,0),Vd(e,q,fd,!1)),mt(e,n),ed&2&&e===td||(e===td&&(!(ed&2)&&(ud|=n),cd===4&&Vd(e,q,fd,!1)),kf(e))}function Rd(e,t,n){if(ed&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||lt(e,t),a=r?Qd(e,t):Xd(e,t,!0),o=r;do{if(a===0){ad&&!r&&Vd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Bd(n))a=Xd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=md;var l=c.current.memoizedState.isDehydrated;if(l&&(Wd(c,s).flags|=256),s=Xd(c,s,!1),s!==2&&s!==6){if(od&&!l){c.errorRecoveryDisabledLanes|=o,ud|=o,a=4;break a}o=hd,hd=a,o!==null&&(hd===null?hd=o:hd.push.apply(hd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Wd(e,0),Vd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Vd(r,t,fd,!id);break a;case 2:hd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=_d+300-He(),10<a)){if(Vd(r,t,fd,!id),ct(r,0,!0)!==0)break a;Td=t,r.timeoutHandle=bp(zd.bind(null,r,n,hd,bd,gd,t,fd,ud,pd,id,o,`Throttled`,-0,0),a);break a}zd(r,n,hd,bd,gd,t,fd,ud,pd,id,o,null,-0,0)}break}}while(1);kf(e)}function zd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vn},zl=null,Ku(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=ih.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?_d-He():(a&4194048)===a?vd-He():0,m=nh(d,m),m!==null)?(Td=a,e.cancelPendingCommit=m(J.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Vd(e,a,o,!l)):J(e,t,a,n,r,i,o,s,c,l,u,d)}function Bd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Vr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Vd(e,t,n,r){t=ut(e,t),t&=~dd,t&=~ud,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-et(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&gt(e,n,t)}function Hd(){return ed&6?!0:(Af(0,!1),!1)}function Ud(){if(K!==null){if(nd===0)var e=K.return;else e=K,ga=ha=null,rs(e),io=null,ao=0,e=K;for(;e!==null;)yl(e.alternate,e),e=e.return;K=null}}function Wd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,xp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Td=0,Ud(),td=e,K=n=Pi(e.current,null),q=t,nd=0,rd=null,id=!1,ad=lt(e,t),od=!1,pd=fd=dd=ud=ld=cd=0,hd=md=null,gd=!1,sd=ut(e,t),wi(),n}function Gd(e,t){H=null,F.H=fc,t===Ja||t===Xa?(t=no(),nd=3):t===Ya?(t=no(),nd=4):nd=t===Ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,rd=t,K===null&&(cd=1,wc(e,Hi(t,e.current)))}function Kd(){var e=Ao.current;return e===null?!0:(q&4194048)===q?jo===null:(q&62914560)===q||q&536870912?e===jo:!1}function qd(){var e=F.H;return F.H=fc,e===null?fc:e}function Jd(){var e=F.A;return F.A=Qu,e}function Yd(){cd=4,id||(q&4194048)!==q&&Ao.current!==null||(ad=!0),!(ld&134217727)&&!(ud&134217727)||td===null||Vd(td,q,fd,!1)}function Xd(e,t,n){var r=ed;ed|=2;var i=qd(),a=Jd();(td!==e||q!==t)&&(bd=null,Wd(e,t)),t=!1;var o=cd;a:do try{if(nd!==0&&K!==null){var s=K,c=rd;switch(nd){case 8:Ud(),o=6;break a;case 3:case 2:case 9:case 6:Ao.current===null&&(t=!0);var l=nd;if(nd=0,rd=null,nf(e,s,c,l),n&&ad){o=0;break a}break;default:l=nd,nd=0,rd=null,nf(e,s,c,l)}}Zd(),o=cd;break}catch(t){Gd(e,t)}while(1);return t&&e.shellSuspendCounter++,ga=ha=null,ed=r,F.H=i,F.A=a,K===null&&(td=null,q=0,wi()),o}function Zd(){for(;K!==null;)ef(K)}function Qd(e,t){var n=ed;ed|=2;var r=qd(),a=Jd();td!==e||q!==t?(bd=null,yd=He()+500,Wd(e,t)):ad=lt(e,t);a:do try{if(nd!==0&&K!==null){t=K;var o=rd;b:switch(nd){case 1:nd=0,rd=null,nf(e,t,o,1);break;case 2:case 9:if(Qa(o)){nd=0,rd=null,tf(t);break}t=function(){nd!==2&&nd!==9||td!==e||(nd=7),kf(e)},o.then(t,t);break a;case 3:nd=7;break a;case 4:nd=5;break a;case 7:Qa(o)?(nd=0,rd=null,tf(t)):(nd=0,rd=null,nf(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Qm(s):c.stateNode.complete){nd=0,rd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,rf(u))}break b}}nd=0,rd=null,nf(e,t,o,5);break;case 6:nd=0,rd=null,nf(e,t,o,6);break;case 8:Ud(),cd=6;break a;default:throw Error(i(462))}}$d();break}catch(t){Gd(e,t)}while(1);return ga=ha=null,F.H=r,F.A=a,ed=n,K===null?(td=null,q=0,wi(),cd):0}function $d(){for(;K!==null&&!Be();)ef(K)}function ef(e){var t=ul(e.alternate,e,sd);e.memoizedProps=e.pendingProps,t===null?rf(e):K=t}function tf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Wc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Wc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:rs(t);var r=t;r===ra&&(B?(la(r),r.tag===5&&r.stateNode!=null&&(ia=r.stateNode)):(la(r),B=!0));default:yl(n,t),t=K=Fi(t,sd),t=ul(n,t,sd)}e.memoizedProps=e.pendingProps,t===null?rf(e):K=t}function nf(e,t,n,r){ga=ha=null,rs(t),io=null,ao=0;var i=t.return;try{if(kc(e,i,t,n,q)){cd=1,wc(e,Hi(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;cd=1,wc(e,Hi(n,e.current)),K=null;return}t.flags&32768?(B||r===1?e=!0:ad||q&536870912?e=!1:(id=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ao.current,r!==null&&r.tag===13&&(r.flags|=16384))),af(t,e)):rf(t)}function rf(e){var t=e;do{if(t.flags&32768){af(t,id);return}e=t.return;var n=_l(t.alternate,t,sd);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);cd===0&&(cd=5)}function af(e,t){do{var n=vl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);cd=6,K=null}function J(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do pf();while(Sd!==0);if(ed&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===td&&(K=td=null,q=0),wd=t,Cd=e,Td=n,Dd=a,Od=r,of(e,t,n,s,c,l,f)}}function of(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Ed=s,s|=Ci,ht(e,n,s,r,i,a),Ad=null,(n&335544064)===n?(jd=Fa(e),r=10262):(jd=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,Sf(Ke,function(){return mf(),null})):(e.callbackNode=null,e.callbackPriority=0),Rl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=F.T,F.T=null,i=I.p,I.p=2,a=ed,ed|=4;try{pu(e,t,n)}finally{ed=a,I.p=i,F.T=r}}Sd=1,Rl?kd=Ip(o,e.containerInfo,jd,lf,uf,cf,df,mf,sf,null,null):(lf(),uf(),df())}function sf(e){if(Sd!==0){var t=Cd.onRecoverableError;t(e,{componentStack:null})}}function cf(){Sd===3&&(Sd=0,Pu(wd,Cd),Sd=4)}function lf(){if(Sd===1){Sd=0;var e=Cd,t=wd,n=Td,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=F.T,F.T=null;var i=I.p;I.p=2;var a=ed;ed|=4;try{uu=du=!1,Au(t,e,n),n=fp;var o=qr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Kr(s.ownerDocument.documentElement,s)){if(c!==null&&Jr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Gr(s,h),v=Gr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}vh=!!dp,fp=dp=null}finally{ed=a,I.p=i,F.T=r}}e.current=t,Sd=2}}function uf(){if(Sd===2){Sd=0;var e=Cd,t=wd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=F.T,F.T=null;var r=I.p;I.p=2;var i=ed;ed|=4;try{hu(e,t.alternate,t)}finally{ed=i,I.p=r,F.T=n}}Sd=3}}function df(){if(Sd===4||Sd===3){Sd=0;var e=kd;kd=null,Ve();var t=Cd,n=wd,r=Td,i=Od,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Sd=5:(Sd=0,wd=Cd=null,ff(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(xd=null),bt(r),n=n.stateNode,Qe&&typeof Qe.onCommitFiberRoot==`function`)try{Qe.onCommitFiberRoot(Ze,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=F.T,a=I.p,I.p=2,F.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{F.T=n,I.p=a}}if(i=Ad,o=jd,jd=null,i!==null&&(Ad=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Td&3&&pf(),kf(t),a=t.pendingLanes,r&261930&&a&42?t===Nd?Md++:(Md=0,Nd=t):(Md=0,Nd=null),Af(0,!1)}}function ff(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ma(t)))}function pf(){return kd!==null&&(kd.skipTransition(),kd=null),lf(),uf(),df(),mf()}function mf(){if(Sd!==5)return!1;var e=Cd,t=Ed;Ed=0;var n=bt(Td),r=F.T,a=I.p;try{I.p=32>n?32:n,F.T=null,n=Dd,Dd=null;var o=Cd,s=Td;if(Sd=0,wd=Cd=null,Td=0,ed&6)throw Error(i(331));var c=ed;if(ed|=4,Yu(o.current),Vu(o,o.current,s,n),ed=c,Af(0,!1),Qe&&typeof Qe.onPostCommitFiberRoot==`function`)try{Qe.onPostCommitFiberRoot(Ze,o)}catch{}return!0}finally{I.p=a,F.T=r,ff(e,t)}}function hf(e,t,n){t=Hi(n,t),t=Ec(e.stateNode,t,2),e=_o(e,t,2),e!==null&&(mt(e,2),kf(e))}function gf(e,t,n){if(e.tag===3)hf(e,e,n);else for(;t!==null;){if(t.tag===3){hf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(xd===null||!xd.has(r))){e=Hi(n,e),n=Dc(2),r=_o(t,n,2),r!==null&&(Oc(n,r,t,e),mt(r,2),kf(r));break}}t=t.return}}function _f(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new $u;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(od=!0,i.add(n),e=vf.bind(null,e,t,n),t.then(e,e))}function vf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,td===e&&(q&n)===n&&(cd===4||cd===3&&(q&62914560)===q&&300>He()-_d?ed&2?dd|=n:Wd(e,0):dd|=n,pd===q&&(pd=0)),kf(e)}function yf(e,t){t===0&&(t=ft()),e=Di(e,t),e!==null&&(mt(e,t),kf(e))}function bf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),yf(e,n)}function xf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),yf(e,n)}function Sf(e,t){return Re(e,t)}var Cf=null,wf=null,Tf=!1,Ef=!1,Df=!1,Of=0;function kf(e){e!==wf&&e.next===null&&(wf===null?Cf=wf=e:wf=wf.next=e),Ef=!0,Tf||(Tf=!0,If())}function Af(e,t){if(!Df&&Ef){Df=!0;do for(var n=!1,r=Cf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-et(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Ff(r,a))}else a=q,a=ct(r,r===td?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||lt(r,a)||(n=!0,Ff(r,a))}r=r.next}while(n);Df=!1}}function jf(){Mf()}function Mf(){Ef=Tf=!1;var e=0;Of!==0&&yp()&&(e=Of);for(var t=He(),n=null,r=Cf;r!==null;){var i=r.next,a=Nf(r,t);a===0?(r.next=null,n===null?Cf=i:n.next=i,i===null&&(wf=n)):(n=r,(e!==0||a&3)&&(Ef=!0)),r=i}Sd!==0&&Sd!==5||Af(e,!1),Of!==0&&(Of=0)}function Nf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-et(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=dt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=td,n=q,n=ct(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(nd===2||nd===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ze(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||lt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ze(r),bt(n)){case 2:case 8:n=Ge;break;case 32:n=Ke;break;case 268435456:n=Je;break;default:n=Ke}return r=Pf.bind(null,e),n=Re(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ze(r),e.callbackPriority=2,e.callbackNode=null,2}function Pf(e,t){if(Sd!==0&&Sd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(pf()&&e.callbackNode!==n)return null;var r=q;return r=ct(e,e===td?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Rd(e,r,t),Nf(e,He()),e.callbackNode!=null&&e.callbackNode===n?Pf.bind(null,e):null)}function Ff(e,t){if(pf())return null;Rd(e,t,!0)}function If(){wp(function(){ed&6?Re(We,jf):Mf()})}function Lf(){if(Of===0){var e=Ra;e===0&&(e=it,it<<=1,!(it&261888)&&(it=256)),Of=e}return Of}function Rf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:_n(e)}function zf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Rf((i[wt]||null).action),o=r.submitter;o&&(t=(t=o[wt]||null)?Rf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new zn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Of!==0){var e=new FormData(i,o);Qs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Qs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Bf=0;Bf<mi.length;Bf++){var Vf=mi[Bf];hi(Vf.toLowerCase(),`on`+(Vf[0].toUpperCase()+Vf.slice(1)))}hi(oi,`onAnimationEnd`),hi(si,`onAnimationIteration`),hi(ci,`onAnimationStart`),hi(`dblclick`,`onDoubleClick`),hi(`focusin`,`onFocus`),hi(`focusout`,`onBlur`),hi(li,`onTransitionRun`),hi(ui,`onTransitionStart`),hi(di,`onTransitionCancel`),hi(fi,`onTransitionEnd`),Vt(`onMouseEnter`,[`mouseout`,`mouseover`]),Vt(`onMouseLeave`,[`mouseout`,`mouseover`]),Vt(`onPointerEnter`,[`pointerout`,`pointerover`]),Vt(`onPointerLeave`,[`pointerout`,`pointerover`]),Bt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Bt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Bt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Bt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Bt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Bt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Hf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Uf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Hf));function Wf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){bi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){bi(e)}i.currentTarget=null,a=c}}}}function Y(e,t){var n=t[Et];n===void 0&&(n=t[Et]=new Set);var r=e+`__bubble`;n.has(r)||(Jf(t,e,2,!1),n.add(r))}function Gf(e,t,n){var r=0;t&&(r|=4),Jf(n,e,r,t)}var Kf=`_reactListening`+Math.random().toString(36).slice(2);function qf(e){if(!e[Kf]){e[Kf]=!0,Rt.forEach(function(t){t!==`selectionchange`&&(Uf.has(t)||Gf(t,!1,e),Gf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Kf]||(t[Kf]=!0,Gf(`selectionchange`,!1,t))}}function Jf(e,t,n,r){switch(Th(t)){case 2:var i=yh;break;case 8:i=bh;break;default:i=xh}n=i.bind(null,t,n,e),i=void 0,!On||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Yf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Nt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Tn(function(){var r=a,i=bn(n),s=[];a:{var c=pi.get(e);if(c!==void 0){var l=zn,u=e;switch(e){case`keypress`:if(Pn(n)===0)break a;case`keydown`:case`keyup`:l=rr;break;case`focusin`:u=`focus`,l=Jn;break;case`focusout`:u=`blur`,l=Jn;break;case`beforeblur`:case`afterblur`:l=Jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=qn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=or;break;case oi:case si:case ci:l=Yn;break;case fi:l=sr;break;case`scroll`:case`scrollend`:l=Vn;break;case`wheel`:l=cr;break;case`copy`:case`cut`:case`paste`:l=Xn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=ir;break;case`submit`:l=ar;break;case`toggle`:case`beforetoggle`:l=lr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=En(m,p),g!=null&&d.push(Xf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==yn&&(u=n.relatedTarget||n.fromElement)&&(Nt(u)||u[Tt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Nt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Kn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=ir,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Pt(c),h=l==null?u:Pt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Nt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Qf):null,c!==null&&$f(s,u,c,d,!1),l!==null&&f!==null&&$f(s,f,l,d,!0)))}a:{if(c=r?Pt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=kr;else if(Cr(c)){if(Ar)_=zr;else{_=Lr;var v=Ir}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&mn(r.elementType)&&(_=kr):_=Rr;if(_&&=_(e,r)){wr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Pt(r):window,e){case`focusin`:(Cr(v)||v.contentEditable===`true`)&&(Xr=v,Zr=r,Qr=null);break;case`focusout`:Qr=Zr=Xr=null;break;case`mousedown`:$r=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:$r=!1,ei(s,n,i);break;case`selectionchange`:if(Yr)break;case`keydown`:case`keyup`:ei(s,n,i)}var y;if(dr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else yr?_r(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(mr&&n.locale!==`ko`&&(yr||b!==`onCompositionStart`?b===`onCompositionEnd`&&yr&&(y=Nn()):(An=i,jn=`value`in An?An.value:An.textContent,yr=!0)),v=Zf(r,b),0<v.length&&(b=new Zn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=vr(n),y!==null&&(b.data=y)))),(y=pr?br(e,n):xr(e,n))&&(b=Zf(r,`onBeforeInput`),0<b.length&&(v=new Zn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),zf(s,e,r,n,i)}Wf(s,t)})}function Xf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Zf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=En(e,n),i!=null&&r.unshift(Xf(e,i,a)),i=En(e,t),i!=null&&r.push(Xf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Qf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function $f(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=En(n,a),l!=null&&o.unshift(Xf(n,l,c))):i||(l=En(n,a),l!=null&&o.push(Xf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var ep=/\r\n?/g,tp=/\u0000|\uFFFD/g;function np(e){return(typeof e==`string`?e:``+e).replace(ep,`
`).replace(tp,``)}function rp(e,t){return t=np(t),np(e)===t}function ip(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||un(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&un(e,``+r);else return;break;case`className`:Jt(e,`class`,r);break;case`tabIndex`:Jt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Jt(e,n,r);break;case`style`:pn(e,r,o);return;case`data`:if(t!==`object`){Jt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=_n(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&ip(e,t,`name`,a.name,a,null),ip(e,t,`formEncType`,a.formEncType,a,null),ip(e,t,`formMethod`,a.formMethod,a,null),ip(e,t,`formTarget`,a.formTarget,a,null)):(ip(e,t,`encType`,a.encType,a,null),ip(e,t,`method`,a.method,a,null),ip(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=_n(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=vn);return;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=_n(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Y(`beforetoggle`,e),Y(`toggle`,e),qt(e,`popover`,r);break;case`xlinkActuate`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:qt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=hn.get(n)||n,qt(e,n,r);else return}z=!0}function ap(e,t,n,r,a,o){switch(n){case`style`:pn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)un(e,r);else if(typeof r==`number`||typeof r==`bigint`)un(e,``+r);else return;break;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=vn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!zt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[wt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}z=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):qt(e,n,r)}return}z=!0}function op(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Y(`error`,e),Y(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,o,s,n,null)}}a&&ip(e,t,`srcSet`,n.srcSet,n,null),r&&ip(e,t,`src`,n.src,n,null);return;case`input`:Y(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:ip(e,t,r,d,n,null)}}an(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Y(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:ip(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&sn(e,!!r,n,!0):sn(e,!!r,t,!1);return;case`textarea`:for(s in Y(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:ip(e,t,s,c,n,null)}ln(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:ip(e,t,l,r,n,null)}return;case`dialog`:Y(`beforetoggle`,e),Y(`toggle`,e),Y(`cancel`,e),Y(`close`,e);break;case`iframe`:case`object`:Y(`load`,e);break;case`video`:case`audio`:for(r=0;r<Hf.length;r++)Y(Hf[r],e);break;case`image`:Y(`error`,e),Y(`load`,e);break;case`details`:Y(`toggle`,e);break;case`embed`:case`source`:case`link`:Y(`error`,e),Y(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,u,r,n,null)}return;default:if(mn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&ap(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&ip(e,t,c,r,n,null))}var sp={};function cp(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||ip(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(z=!0),o=m;break;case`name`:m!==f&&(z=!0),a=m;break;case`checked`:m!==f&&(z=!0),u=m;break;case`defaultChecked`:m!==f&&(z=!0),d=m;break;case`value`:m!==f&&(z=!0),s=m;break;case`defaultValue`:m!==f&&(z=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&ip(e,t,p,m,r,f)}}rn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||ip(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(z=!0),p=o;break;case`defaultValue`:o!==l&&(z=!0),c=o;break;case`multiple`:o!==l&&(z=!0),s=o;default:o!==l&&ip(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?sn(e,!!n,n?[]:``,!1):sn(e,!!n,t,!0)):sn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:ip(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(z=!0),p=a;break;case`defaultValue`:a!==o&&(z=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&ip(e,t,s,a,r,o)}cn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:ip(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(z=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:ip(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&ip(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:ip(e,t,u,p,r,m)}return;default:if(mn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&ap(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||ap(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&ip(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||ip(e,t,f,p,r,m)}function lp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function up(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&lp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&lp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var dp=null,fp=null;function pp(e){return e.nodeType===9?e:e.ownerDocument}function mp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function hp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function gp(e,t,n,r){return n=pp(n).createElement(e),n[Ct]=r,n[wt]=t,op(n,e,t),It(n),n}function _p(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vp=null;function yp(){var e=window.event;return e&&e.type===`popstate`?e!==vp&&(vp=e,!0):(vp=null,!1)}var bp=typeof setTimeout==`function`?setTimeout:void 0,xp=typeof clearTimeout==`function`?clearTimeout:void 0,Sp=typeof Promise==`function`?Promise:void 0,Cp=typeof requestAnimationFrame==`function`?requestAnimationFrame:bp,wp=typeof queueMicrotask==`function`?queueMicrotask:Sp===void 0?bp:function(e){return Sp.resolve(null).then(e).catch(Tp)};function Tp(e){setTimeout(function(){throw e})}function Ep(e){return e===`head`}function Dp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Wh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)xm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,xm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[At]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&xm(e.ownerDocument.body)}n=i}while(n);Wh(t)}function Op(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function kp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ap(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function jp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Mp(e){return jp(e.getBoundingClientRect(),getComputedStyle(e),e)}function Np(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return jp(t,n,e)}function Pp(e){return e.documentElement.clientHeight}function Fp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Ip(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Pp(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Z(f),u>th){s.length=o;break}f=new Promise(Fp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Lp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Lp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Lp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Lp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Rp(e){return{name:e,group:new Lp(`group`,e),imagePair:new Lp(`image-pair`,e),old:new Lp(`old`,e),new:new Lp(`new`,e)}}function zp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}zp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Wp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Hp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Bp,e,s,r)}this._eventListeners=a}};function Bp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}zp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Wp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Hp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Vp,e,n,i),r.splice(t,1),a!==null&&a()}};function Vp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Hp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Up(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Wp(e,t,n,r){if(e.length===0)return-1;r=Up(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Up(a.optionsOrUseCapture)===r)return i}return-1}zp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},zp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Gp,e,void 0,void 0)};function Gp(e,t){return e.tag!==6&&(e=b(e),_m(e,t))}zp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Kp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Gp(t[n],e);n--);};function Kp(e,t){return t.push(e),!1}zp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=pp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,qp,e,void 0,void 0))};function qp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}zp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Jp,e,void 0,void 0)};function Jp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}zp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Yp,e,void 0,void 0);for(var n=t=0;n<Xp.length;n++){var r=Xp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Xp[t++]=r}Xp.length=t}};function Yp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Xp=[],Zp=!1;function Qp(e,t,n){Xp.push({fragmentInstance:e,observer:t,instance:n}),Zp||(Zp=!0,vm(function(){Zp=!1;var e=Xp;Xp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}zp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,$p,e,void 0,void 0),e};function $p(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}zp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},zp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Kp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||em(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function em(e,t,n,r,i){var a=Nt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function tm(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}zp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Kp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),tm(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),tm(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function nm(e,t){return e=b(e),rm(e,t),!1}function rm(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function im(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Xp.length;i++){var a=Xp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Xp[r++]=a)}Xp.length=r,n.observe(e)}),rm(e,t))}function am(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Qp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function om(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:om(n),Mt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function sm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[At])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=pm(e.nextSibling),e===null)break}return null}function cm(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=pm(e.nextSibling),e===null))return null;return e}function lm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=pm(e.nextSibling),e===null))return null;return e}function um(e){return e.data===`$?`||e.data===`$~`}function dm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function fm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function pm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var mm=null;function hm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return pm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function gm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function _m(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function vm(e){Cp(function(){Cp(function(t){return e(t)})})}function ym(e,t,n){switch(t=pp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function bm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&ip(e,t,r,null,sp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===vn&&(e.onclick=null),Mt(e)}function xm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Mt(e)}var Sm=new Map,Cm=new Set;function wm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Tm=I.d;I.d={f:Em,r:Dm,D:Am,C:jm,L:Mm,m:Nm,X:Fm,S:Pm,M:Im};function Em(){var e=Tm.f(),t=Hd();return e||t}function Dm(e){var t=R(e);t!==null&&t.tag===5&&t.type===`form`?ec(t):Tm.r(e)}var Om=typeof document>`u`?null:document;function km(e,t,n){var r=Om;if(r&&typeof t==`string`&&t){var i=nn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Cm.has(i)||(Cm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),op(t,`link`,e),It(t),r.head.appendChild(t)))}}function Am(e){Tm.D(e),km(`dns-prefetch`,e,null)}function jm(e,t){Tm.C(e,t),km(`preconnect`,e,t)}function Mm(e,t,n){Tm.L(e,t,n);var r=Om;if(r&&e&&t){var i=`link[rel="preload"][as="`+nn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+nn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+nn(n.imageSizes)+`"]`)):i+=`[href="`+nn(e)+`"]`;var a=i;switch(t){case`style`:a=Rm(e);break;case`script`:a=Hm(e)}if(!(Sm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),Sm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(zm(a))||t===`script`&&r.querySelector(Um(a))))){var o=r.createElement(`link`);op(o,`link`,e),t===`style`&&(o[jt]=!0,o.onload=o.onerror=function(){Lt(o)}),It(o),r.head.appendChild(o)}}}function Nm(e,t){Tm.m(e,t);var n=Om;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+nn(r)+`"][href="`+nn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Hm(e)}if(!Sm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),Sm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Um(a)))return}r=n.createElement(`link`),op(r,`link`,e),It(r),n.head.appendChild(r)}}}function Pm(e,t,n){Tm.S(e,t,n);var r=Om;if(r&&e){var i=Ft(r).hoistableStyles,a=Rm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(zm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=Sm.get(a))&&Km(e,n);var c=o=r.createElement(`link`);It(c),op(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Gm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Fm(e,t){Tm.X(e,t);var n=Om;if(n&&e){var r=Ft(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0},t),(t=Sm.get(i))&&X(e,t),a=n.createElement(`script`),It(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Im(e,t){Tm.M(e,t);var n=Om;if(n&&e){var r=Ft(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=Sm.get(i))&&X(e,t),a=n.createElement(`script`),It(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Lm(e,t,n,r){var a=(a=we.current)?wm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Rm(n.href),t=Ft(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Rm(n.href);var o=Ft(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(zm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=Sm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Sm.set(e,o)),Vm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Hm(n),t=Ft(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Rm(e){return`href="`+nn(e)+`"`}function zm(e){return`link[rel="stylesheet"][`+e+`]`}function Bm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Vm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[jt]){r.loading=1;return}}else t=e.createElement(`link`),t[jt]=!0,t.onload=t.onerror=Lt.bind(null,t),op(t,`link`,n),It(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Hm(e){return`[src="`+nn(e)+`"]`}function Um(e){return`script[async]`+e}function Wm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+nn(n.href)+`"]`);if(r)return t.instance=r,It(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),It(r),op(r,`style`,a),Gm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Rm(n.href);var o=e.querySelector(zm(a));if(o)return t.state.loading|=4,t.instance=o,It(o),o;r=Bm(n),(a=Sm.get(a))&&Km(r,a),o=(e.ownerDocument||e).createElement(`link`),It(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),op(o,`link`,r),t.state.loading|=4,Gm(o,n.precedence,e),t.instance=o;case`script`:return o=Hm(n.src),(a=e.querySelector(Um(o)))?(t.instance=a,It(a),a):(r=n,(a=Sm.get(o))&&(r=D({},n),X(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),It(a),op(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Gm(r,n.precedence,e));return t.instance}function Gm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Km(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function X(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var qm=null;function Jm(e,t,n){if(qm===null){var r=new Map,i=qm=new Map;i.set(n,r)}else i=qm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[At]||a[Ct]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Ym(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Xm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Zm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Qm(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Z(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function $m(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Z(t),e.suspenseyImages.push(t)),e=ah.bind(e),t.decode().then(e,e))}function eh(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Rm(r.href),a=t.querySelector(zm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=ih.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,It(a);return}a=t.ownerDocument||t,r=Bm(r),(i=Sm.get(i))&&Km(r,i),a=a.createElement(`link`),It(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),op(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=ih.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var th=0;function nh(e,t){return e.stylesheets&&e.count===0&&sh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&th===0&&(th=62500*up());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>th?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function rh(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)sh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function ih(){this.count--,rh(this)}function ah(){this.imgCount--,rh(this)}var oh=null;function sh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,oh=new Map,t.forEach(ch,e),oh=null,ih.call(e))}function ch(e,t){if(!(t.state.loading&4)){var n=oh.get(e);if(n)var r=n.get(null);else{n=new Map,oh.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=ih.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var lh={$$typeof:N,Provider:null,Consumer:null,_currentValue:ge,_currentValue2:ge,_threadCount:0};function uh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=pt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pt(0),this.hiddenUpdates=pt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function dh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new uh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Mi(3,null,null,t),e.current=a,a.stateNode=e,t=ja(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},mo(a),e}function fh(e){return e?(e=Ai,e):Ai}function ph(e,t,n,r,i,a){i=fh(i),r.context===null?r.context=i:r.pendingContext=i,r=go(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=_o(e,r,t),n!==null&&(Ld(n,e,t),vo(n,e,t))}function mh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function hh(e,t){mh(e,t),(e=e.alternate)&&mh(e,t)}function gh(e){if(e.tag===13||e.tag===31){var t=Di(e,67108864);t!==null&&Ld(t,e,67108864),hh(e,67108864)}}function _h(e){if(e.tag===13||e.tag===31){var t=Pd();t=yt(t);var n=Di(e,t);n!==null&&Ld(n,e,t),hh(e,t)}}var vh=!0;function yh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=2,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function bh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=8,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function xh(e,t,n,r){if(vh){var i=Sh(r);if(i===null)Yf(e,t,r,Ch,n),Ph(e,r);else if(Ih(i,e,t,n,r))r.stopPropagation();else if(Ph(e,r),t&4&&-1<Nh.indexOf(e)){for(;i!==null;){var a=R(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=st(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-et(o);s.entanglements[1]|=c,o&=~c}kf(a),!(ed&6)&&(yd=He()+500,Af(0,!1))}}break;case 31:case 13:s=Di(a,2),s!==null&&Ld(s,a,2),Hd(),hh(a,2)}if(a=Sh(r),a===null&&Yf(e,t,r,Ch,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Yf(e,t,r,null,n)}}function Sh(e){return e=bn(e),wh(e)}var Ch=null;function wh(e){if(Ch=null,e=Nt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ch=e,null}function Th(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ue()){case We:return 2;case Ge:return 8;case Ke:case qe:return 32;case Je:return 268435456;default:return 32}default:return 32}}var Eh=!1,Dh=null,Oh=null,kh=null,Ah=new Map,jh=new Map,Mh=[],Nh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ph(e,t){switch(e){case`focusin`:case`focusout`:Dh=null;break;case`dragenter`:case`dragleave`:Oh=null;break;case`mouseover`:case`mouseout`:kh=null;break;case`pointerover`:case`pointerout`:Ah.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:jh.delete(t.pointerId)}}function Fh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=R(t),t!==null&&gh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ih(e,t,n,r,i){switch(t){case`focusin`:return Dh=Fh(Dh,e,t,n,r,i),!0;case`dragenter`:return Oh=Fh(Oh,e,t,n,r,i),!0;case`mouseover`:return kh=Fh(kh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Ah.set(a,Fh(Ah.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,jh.set(a,Fh(jh.get(a)||null,e,t,n,r,i)),!0}return!1}function Lh(e){var t=Nt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,xt(e.priority,function(){_h(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,xt(e.priority,function(){_h(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Rh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Sh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);yn=r,n.target.dispatchEvent(r),yn=null}else return t=R(n),t!==null&&gh(t),e.blockedOn=n,!1;t.shift()}return!0}function zh(e,t,n){Rh(e)&&n.delete(t)}function Bh(){Eh=!1,Dh!==null&&Rh(Dh)&&(Dh=null),Oh!==null&&Rh(Oh)&&(Oh=null),kh!==null&&Rh(kh)&&(kh=null),Ah.forEach(zh),jh.forEach(zh)}function Vh(e,n){e.blockedOn===n&&(e.blockedOn=null,Eh||(Eh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Bh)))}var Hh=null;function Uh(e){Hh!==e&&(Hh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Hh===e&&(Hh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(wh(r||n)===null)continue;break}var a=R(n);a!==null&&(e.splice(t,3),t-=3,Qs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Wh(e){function t(t){return Vh(t,e)}Dh!==null&&Vh(Dh,e),Oh!==null&&Vh(Oh,e),kh!==null&&Vh(kh,e),Ah.forEach(t),jh.forEach(t);for(var n=0;n<Mh.length;n++){var r=Mh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Mh.length&&(n=Mh[0],n.blockedOn===null);)Lh(n),n.blockedOn===null&&Mh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[wt]||null;if(typeof a==`function`)o||Uh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[wt]||null)s=o.formAction;else if(wh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Uh(n)}}}function Gh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Kh(e){this._internalRoot=e}qh.prototype.render=Kh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;ph(n,Pd(),e,t,null,null)},qh.prototype.unmount=Kh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ph(e.current,2,null,e,null,null),Hd(),t[Tt]=null}};function qh(e){this._internalRoot=e}qh.prototype.unstable_scheduleHydration=function(e){if(e){var t=L();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Mh.length&&t!==0&&t<Mh[n].priority;n++);Mh.splice(n,0,e),n===0&&Lh(e)}};var Jh=n.version;if(Jh!==`19.3.1`)throw Error(i(527,Jh,`19.3.1`));I.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Yh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:F,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Xh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xh.isDisabled&&Xh.supportsFiber)try{Ze=Xh.inject(Yh),Qe=Xh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=xc,s=Sc,c=Cc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=dh(e,1,!1,null,null,n,r,null,o,s,c,Gh),e[Tt]=t.current,qf(e),new Kh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,ee=10**120*8,j=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),te=[j(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),j(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),j(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:6}),j(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),j(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),j(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:3,clockSpeedPower:2}),j(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:5}),j(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),j(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),j(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),j(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),j(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),j(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),j(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),j(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),j(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:30}),j(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),j(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),j(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),j(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:ee,levers:{clockSpeedPower:.5}}],M=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),N=te.map(e=>({...e,rule:[e.rule,M(e.levers)].filter(Boolean).join(` `)})),ne=.5,re=1e3,ie=.01,P=1e3,ae=1e6,oe=.05,se=.02,ce=Object.fromEntries(N.map(e=>[e.id,e])),le=new Set(N.map(e=>e.id)),ue={enabled:!0},de={enabled:!0},fe=.05,pe=e=>Math.max(5,e),me=[1,2,3,4,5,6,7,8,9,10],he=[{id:`firstSession`,name:`First session`,boostArea:`foundry`},{id:`foundry`,name:`Foundry`,boostArea:`foundry`},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`},{id:`levelPower`,name:`Level power`,boostArea:`factory`},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`}],F=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],I=[1,3,6,8,b.length],ge=[{arrayStepGain:.02},{arrayStepGain:.03},{lakeSpeed:.05},{lakeSpeed:.05},{syncedBitrate:!0}],_e=e=>`${Math.round(e*1e3)/10}%`,ve=({arrayStepGain:e,lakeSpeed:t,syncedBitrate:n})=>{let r=[],i=[];return e&&(r.push(`Disk step ${_e(e)}`),i.push(`Disk-size steps without a Flush Pool upgrade close ${_e(e)} of the gap to 1.0 (was 1%)`)),t&&(r.push(`Lake speed +${_e(t)}`),i.push(`Every Data Lake fills at +${_e(t)} more of its pool's Bandwidth`)),n&&(r.push(`One Upgrade does both`),i.push(`Bitrate always matches Capacity: there is no separate Upgrade Bitrate, and every Upgrade raises both`)),{shortBonus:r.join(`, `),bonus:i.join(`. `)}},ye=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,short:`Ping`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,short:`Compile`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,short:`Ping ×256`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,short:`1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...I.map((e,t)=>({id:`reclaim${t+1}`,name:`Reclamation ${[`I`,`II`,`III`,`IV`,`V`][t]}`,group:`foundry`,trigger:e===1?`Flush a Storage pool for the first time`:t===I.length-1?`Flush every Storage pool at least once`:`Flush ${e} different Storage pools`,short:e===1?`Flush a pool`:t===I.length-1?`Flush every pool`:`Flush ${e} pools`,...ve(ge[t]),condition:{kind:`poolsCompacted`,min:e}})),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:F[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,short:`Buy ${e.symbol}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,name:`Spent QB`,group:`tierLadder`,trigger:`Restage while holding 0 Quettabytes`,short:`Restage at 0 QB`,shortBonus:`QB credited without balance`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`counter`,key:`emptyRestages`,min:1}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,short:`Accelerate 1`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,short:`Accelerate 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,short:`Overclock`,condition:{kind:`overclocked`}},...me.map((e,t)=>({id:`levelPower${t+1}`,name:`${b[e-1].symbol} Level ${pe(e)}`,group:`levelPower`,trigger:`Reach level ${pe(e)} on ${b[e-1].name} (${pe(e)-1} levels completed)`,short:`${b[e-1].symbol} level ${pe(e)}`,shortBonus:`+${fe} per-level multiplier`,bonus:`The per-level production multiplier rises by ${fe} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:pe(e)}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,short:`First Overclock at 6+`,shortBonus:`Overclock step −1`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,short:`2 Overclocks/Purge, no Accelerate`,shortBonus:`Overclock step −1`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,short:`DeGoogol, Overclock at 12+`,shortBonus:`Overclock step −1`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}}].map(e=>({secret:!1,platformDependent:!1,bonus:null,short:null,shortBonus:null,...e})),be=[{id:`ping`,name:`Ping`,members:[`helloWorld`,`pingOfDeath`]},{id:`poolReset`,name:`Reclamation`,members:I.map((e,t)=>`reclaim${t+1}`)},{id:`tierBought`,name:`First purchase`,members:b.map((e,t)=>`tier${String(t+1).padStart(2,`0`)}Bought`)},{id:`accelerate`,name:`Accelerate`,members:[`tickTock`,`megahertzMyth`]},{id:`levelPower`,name:`Level power`,members:me.map((e,t)=>`levelPower${t+1}`)},{id:`overclockStep`,name:`Overclock step`,members:[`overclockStep1`,`overclockStep2`,`overclockStep3`]}],xe=Object.fromEntries(be.flatMap(e=>e.members.map((t,n)=>[t,{...e,level:n+1}]))),Se=Object.fromEntries(ye.map(e=>[e.id,e])),Ce=1024,we=1e3,Te=8*we**2/10,Ee=(e=1)=>({startBits:8,endBits:8/10*we**(Math.max(1,Math.floor(Number(e)||1))+1)}),De=.5,Oe=.9,ke=8e3,Ae=1e3,je=8*Ce,Me=8e3,Ne=Te/2,Pe=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],Fe={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},Ie=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],Le=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],Re=[1,10,100],ze=[9,9,9],Be=1e3,Ve=[1,10,100,Be],He=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],Ue=10*Re.length,We=[1,10,100,1e3],Ge=.5,Ke=86400,qe=14400,Je=14400,Ye=[4,40,400,4e3,4e4],Xe=2e3,Ze=1024,Qe=1.1,$e=.01,et=.1,tt=Math.floor(Math.log2(Ze)),nt=.9,rt=.01,it={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},at={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},ot={baseCost:100,baseSeconds:16},st=.01,ct=.1,lt=.01,ut=.01,dt=.1,ft=1e3,pt=1e30,mt=1e-4,ht=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],gt=Object.assign(Object.create(null),Object.fromEntries(ht.map(e=>[e.id,e]))),_t=Object.assign(Object.create(null),Object.fromEntries(ht.map((e,t)=>[e.id,t]))),vt=k,yt=1e-5,bt=()=>b[b.length-1].id,L=e=>Math.max(0,Number.isFinite(e)?e:0),xt=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),St=1e-9,Ct=1e-9,wt=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},Tt=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),Et=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=Tt();return e},Dt=()=>({resources:wt().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,accelerateBoughtThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:xt()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:ei(1),unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:ht.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:ht.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:ht.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:ht.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:Et(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),Ot=new Intl.NumberFormat(`en-US`),kt=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),At=1e4,jt=1e3,Mt=1+1e-12,Nt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*Mt;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*jt)/jt;return`${Number(r.toFixed(3))}e${t}`},R=e=>{let t=L(e);return t<At?Ot.format(t):Nt(t)},Pt=1e-9,Ft=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>Pt?null:`${Nt(10**t)} ${E(T)}`},It=e=>{let t=Math.floor(L(e)),n=E(O);return t<At?`${kt.format(t)} ${n}`:Ft(t)??`${Nt(t)} ${n}`},Lt=e=>{let t=Math.floor(L(e)),n=E(T);return t<At?`${kt.format(t)} ${n}`:`${Nt(t)} ${n}`},Rt=8e3,zt=e=>{let t=Math.floor(L(e));if(t<Rt)return It(t);let n=Math.floor(t/8);return n<At?`${kt.format(n)} B`:`${Nt(n)} B`},Bt=e=>{let t=L(e);return t===0?1:2+(t-1)*t/2},Vt=e=>{let t=e.purchaseLevels?.[bt()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},Ht=(e,t)=>{let n=S[e?.id];if(n===void 0)return Bt(t);let r=L(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},Ut=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(Ht(e,n)-1)},Wt=(e,t,n)=>{let r=Math.max(0,L(e)-L(t));return Math.max(0,Math.min(L(n),r))},Gt=(e,t,n,r,i)=>Ut(e,t)*Wt(n,r,i),z=(e,t,n,r,i,a)=>{let o=Wt(n,r,a),s=Ut(e,t);return s<=0?o:Math.min(o,Math.floor(L(i)/s))},Kt=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),qt=(e,t)=>Kt(Math.max(0,S[e]??-1))**Math.max(0,L(t)-1),Jt=(e,t)=>qt(e,t),Yt=e=>1+Math.max(0,S[e]??-1)*1,Xt=e=>11+Math.max(0,S[e]??-1)*1,Zt=e=>{let t=L(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=Yt(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=Xt(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=it.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=it.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=it.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=it.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=it.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},Qt=(e,t=et)=>(1+t)**L((e??1)-1),$t=e=>10**(L(e)+1),en=e=>$t(e)*8,tn=e=>(e.resources?.base??0)>=en(e.globalTickspeedMultiplier??0),nn=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,rn=(e,t=0)=>{let n=L(e??0);return(1+st*xr(t))**n},an=e=>(e.scaleUpTierCounts?.[Fr(e).id]??0)>=1,on=e=>(1+ut)**L(e),sn=e=>Math.max(1,Math.ceil(dt*L(e))),cn=(e,t=!0)=>{let n=L(e);return!t||n<1?1:n<2?Qe:1+Math.log10(n)},ln=e=>!!e.prestigeSpeedBonusUnlocked,un=e=>{if(e.prestigeSpeedBonusUnlocked||L(e.purge.points)<1)return e;let t=wn(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},dn=e=>e.playtimeBonusUnlocked?1+$e*(L(e.activePlaySeconds??0)/3600):1,fn=e=>{if(e.playtimeBonusUnlocked||L(e.purge.points)<100)return e;let t=wn(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},pn=e=>{if(e.buyMaxUnlocked||L(e.purge.points)<2)return e;let t=wn(e);return{...t,purge:{...t.purge,points:t.purge.points-2},buyMaxUnlocked:!0}},mn=e=>{if(e.cacheWarmUnlocked||L(e.purge.points)<20)return e;let t=wn(e);return gn({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},hn=e=>b[Math.min(b.length,Math.max(1,ha(e)))-1],gn=e=>{if(!e.cacheWarmUnlocked||Er(e))return e;let t=hn(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,Vt(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:Ei(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},_n=Ye.length,vn=e=>Math.min(_n,Math.floor(L(e?.sleepModeCapLevel??0))),yn=e=>Math.min(Ke,qe+Je*vn(e)),bn=e=>Ye[e]??null,xn=e=>{let t=vn(e),n=bn(t);if(n===null||L(e.purge.points)<n)return e;let r=wn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},Sn=e=>t=>({...t,activePlaySeconds:L(t.activePlaySeconds??0)+L(e)}),Cn=e=>!!e.computeFlops?.pageUnlocked||L(e.purge?.points??0)>=100,wn=e=>e.computeFlops?.pageUnlocked||L(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},Tn=(e,t,n)=>{let r=gt[t];if(!r)return{affordable:0,totalCost:0};let i=L(e.computeFlops?.owned?.[t]??0),a=L(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=Dn(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},En=(e,t,n)=>r=>{if(t<=0)return r;let i=wn(r),a=L(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},Dn=(e,t=0)=>{let n=t+1;return Ut({baseCost:e.baseCostPP},n)},On=(e,t)=>{let n=gt[t];if(!n)return!1;let r=Dn(n,L(e.computeFlops?.owned?.[t]??0));return L(e.purge?.points??0)>=r},kn=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=Dn(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},An=(e,t=1)=>n=>{let r=gt[e];if(!r)return n;let i=wn(n),a=L(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=kn(r,a,L(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:L(a+o)}}}},jn=e=>10**L(e),Mn=e=>ht.reduce((t,n,r)=>t+L(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*jn(r),0),Nn=e=>{let t=L(e.hyperscalerCount??0);return t<=0?0:t*(mt+L(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*yt)},Pn=(e,t)=>1+L(e.computeFlops?.cumulativeBoost?.[t]??0)+Nn(e),Fn=e=>{let t=L(e);return t===0?`0 Flops`:`${R(t)} Flops`},In=e=>t=>{if(e<=0)return wn(t);let n=wn(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost};return ht.forEach(t=>{let n=L(r[t.id]??0);if(n<=0)return;let o=n*mt*e;if(o<=0)return;let s=t.boostsTierId;a[s]=L((a[s]??0)+o),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},Ln=e=>L(e.purge?.points??0)>=vt,Rn=e=>1+L(e.eonsUpgrades?.eonAmplifierLevel??0)*1,zn=e=>1*10**L(e),Bn=e=>L(e.eons?.balance??0)>=zn(e.hyperscalerCount??0),Vn=e=>{if(!Bn(e))return e;let t=zn(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:L(e.eons.balance)-t},hyperscalerCount:L(e.hyperscalerCount??0)+1}},Hn=e=>1+Math.max(0,_t[e]??-1)*1,Un=e=>{let t=L(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return ht.forEach(e=>{(r[e.id]??null)===null&&t>=Hn(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},Wn=(e,t)=>n=>!ht.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},Gn=e=>t=>{if(e<=0)return t;let n=t;return ht.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+St);if(i>=1){let{affordable:e,totalCost:a}=Tn(n,t.id,i);e>0&&(n=En(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},Kn=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},qn=e=>Jn(e.intro),Jn=e=>{let t=0;for(let n=1;n<=10;n+=1)Number(e?.poolExponentBonuses?.[n])>=1&&(t+=1);return t},Yn=e=>{let t=Jn(e);return I.filter(e=>t>=e).length},Xn=(e,t)=>{let n=ge.slice(0,Yn(e)).filter(e=>e.arrayStepGain);return n.length?n.at(-1).arrayStepGain:t},Zn=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||ao(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolsCompacted`:return qn(e)>=t.min;default:return!1}},Qn=(e,t)=>{if(t.min<=1)return null;switch(t.kind){case`counter`:return t.key===`maxFirstOverclock`?null:{current:e.achievements?.counters?.[t.key]??0,target:t.min};case`clockSpeedLevel`:return{current:e.globalTickspeedMultiplier??0,target:t.min};case`tierLevel`:return{current:e.purchaseLevels?.[t.tierId]??1,target:t.min};case`poolsCompacted`:return{current:qn(e),target:t.min};case`storageUnlocked`:{let t=e=>Math.log2(Math.max(e,8)/8);return{current:Math.floor(t(e.intro?.capacity??0)),target:t(je)}}default:return null}},$n=e=>e.bonus??null,er=e=>e.short??e.trigger,tr=e=>e.shortBonus??e.bonus??null,nr=e=>e>=1?Math.max(lt,10/(1+Math.log10(e))):1/0,rr=(e,t)=>!!e.achievements?.earned?.[t],ir=e=>{if(!ue.enabled)return e;let t=ye.filter(t=>!rr(e,t.id)&&Zn(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},ar=e=>he.filter(t=>{let n=ye.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>rr(e,t.id))}).map(e=>e.id),or=.1,sr=(e,t)=>{let n=ye.filter(e=>e.group===t&&!e.platformDependent),r=n.filter(t=>rr(e,t.id)).length,i=n.length>0&&r===n.length,a=Math.ceil(n.length*or);return{earned:r,bonus:i?a:0,total:n.length+a,complete:i}},cr=e=>he.reduce((t,n)=>{let{earned:r,bonus:i}=sr(e,n.id);return t+r+i},0),lr=e=>{if(!Ln(e))return e;let t=Dt(),n=Rn(e),r=L(e.era?.count??0)+1,i=wr(e);return gn(Un({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:Kn(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:xt()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:L(e.eons?.balance??0)+n},hyperscalerCount:L(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},ur=e=>{let t=e.prestigeDoublePpLevel??0,n=di(t);if(L(e.purge.points)<n)return e;let r=wn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},dr=e=>{let t=ye.filter(t=>t.group===`levelPower`&&rr(e,t.id)).length;return Math.round((1+fe*t)*1e6)/1e6},fr=(e,t=1)=>{let n=Math.max(0,L(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},pr=e=>2**L(e),mr=(e,t)=>Or(e,`scaleUpNoDoubling`)||kr(e,`singleInstance`)===t?1:pr(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**jr(e,`scaleUpPower`,1),hr=e=>Math.min(L(e.scaleUpTargetTierIndex??0),Pr(e)-1),gr=e=>b[hr(e)],_r=e=>3*(Math.max(0,L(e.scaleUpCount??0)-(Pr(e)-1))+1),vr=e=>{let t=br(e);return t===null?5:t+yr(e)},yr=e=>{let t=ye.filter(t=>t.group===`overclockStep`&&rr(e,t.id)).length;return Math.max(1,4-t)},br=e=>{let t=e.overclockLastClaimCompletedLevels??(L(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:L(t)},xr=e=>(1+ct)**L(e),Sr=e=>it[e],Cr=e=>1/id(e,`purge`),wr=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&id(e,`purge`)<=1,Tr=e=>!!ce[e]&&le.has(e),Er=e=>{let t=e.challenges?.active;return t&&Tr(t)?ce[t]:null},Dr=(e,t)=>!!e.challenges?.completed?.[t],Or=(e,t)=>Er(e)?.effect===t,kr=(e,t)=>{let n=Er(e);return n?.effect===t?n.automation.key:null},Ar=(e,t)=>({balance:Math.max(e.balance??0,L(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),jr=(e,t,n)=>Er(e)?.levers?.[t]??e.runLevers?.[t]??n,Mr=(e,t)=>(kr(e,`halfDuplex`)===t?ne:1)*jr(e,`production`,1),Nr=(e,t)=>{let n=x[t];if(!n)return n;let r=(kr(e,`premiumTier`)===t?re:1)*jr(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},Pr=e=>Or(e,`addressSpace`)?6:b.length,Fr=e=>b[Pr(e)-1],Ir=e=>Math.floor(L(e.challenges?.activeSeconds)/30+1e-9)%2==0,Lr=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!Er(e))return n;if(kr(e,`clockGated`)===t||kr(e,`dutyCycle`)===t&&!Ir(e))return 1;if(kr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},Rr=e=>{if(!Or(e,`bitRot`))return 0;let t=L(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(ae,P*2**(t/30))/10**(Bi(e.intro)-1)},zr=e=>Er(e)?.goal??8e100,Br=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,Vr=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?Yt(n):t===`tierTickspeed`?Xt(n):Sr(n))},Hr=(e,t)=>{let n=ce[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:od(e,i))&&L(e.purge?.count??0)>=Vr(n)},Ur=(e,t)=>N.find(n=>n.automation.kind===e&&n.automation.key===t&&Tr(n.id))??null,Wr=(e,t,n)=>{let r=Ur(t,n);return!!r&&!Dr(e,r.id)},Gr=e=>{let t=e.challenges?.completed??{},n=N.filter(n=>Tr(n.id)&&!t[n.id]&&Br(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...Dt().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},Kr=e=>t=>{if(!Er(t))return t;let n=t.challenges.run??xt();return{...t,challenges:{...t.challenges,activeSeconds:L(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:L(n.cycleSeconds)+e}}}},qr=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??xt(),...t}}}),Jr=(e,t,n)=>{if(n===t)return n;let r=n;if(kr(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return kr(n,`writeLock`)===e&&(r=qr(r,{haltSeconds:10})),r},Yr={hardRefresh:{interval:300,apply:(e,t)=>qr({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},Xr=(e,t)=>{let n=t,r=kr(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-ie)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=qr({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(Or(n,`bitRot`)&&Rr(n)>L(n.resources.base)){let e=Dd(n,!1);n={...e,challenges:{...e.challenges,run:{...xt(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},Zr=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=Er(r);if(!e)return vi(i,t,0)(r);let n=Yr[e.effect],a=L(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=L(r.challenges.run?.haltSeconds),l=c>0?qr(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>Er(e)?Kr(o)(e):e)(vi(o,t,c)(l)),d=!Er(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=Er(d)?Xr(o,d):d,s&&Er(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},Qr=e=>!wr(e)&&L(e.resources.base)>=zr(e),$r=e=>t=>{let n=S[t.id]??-1;if(n>=Pr(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},ei=e=>ti(L(e)/8),ti=e=>{let t=L(e);return t<1?0:Math.floor(Math.log10(t))},ni=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=ti(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},ri=e=>{let t=L(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},ii=e=>Or(e,`clockSpeedDisabled`)?1:rn(e.globalTickspeedMultiplier??null,br(e)??0)**jr(e,`clockSpeedPower`,1),ai=e=>Or(e,`clockSpeedDisabled`)?0:(1+st*xr(br(e)??0))**jr(e,`clockSpeedPower`,1)-1,oi=e=>Or(e,`scaleUpNoDoubling`)?1:2**jr(e,`scaleUpPower`,1),si=(e,t)=>{let n=Qt(Lr(e,t),kr(e,`halfStep`)===t?oe:et)*(t===Fr(e).id?on(e.lastTierXpConsumed??0):1),r=ii(e),i=kr(e,`noisyNeighbour`),a=(kr(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+se)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:Ct},ci=()=>Math.log2(64),li=(e=0)=>{let t=L(e);return 64/2**Math.min(t,ci())},ui=(e=0)=>{let t=L(e),n=ci();return t>n?2**(t-n):1},di=(e=0)=>10**(L(e)+1),fi=(e,t=0)=>{let n=L(e);if(n<8e100)return 0;let r=Math.floor(Math.log10(k)),i=Math.max(0,ti(n)-r),a=li(t),o=ui(t);return(1+Math.floor(i/a))*o},pi=(e,t)=>{let n=ei(L(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},mi=200,hi=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<mi;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=mi&&(o=Math.min(o,1)),{state:a,budget:o}},gi=(e,t,n,r)=>{let{state:i,budget:a}=hi(e,t,id(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},_i=`unit`,vi=(e,t=1,n=0)=>r=>{let i=ko(r),a=Pa(e)(i),o=Va(is(e)(Za(e)(eo(e)(Ao(e)(a))))),s=js(e)(o),c=Ts(e)(s),l=Sd(js(0)(c)),u=pu.reduce((t,n)=>n(e)(t),l),d=Mc(e)(u),f=jo(Lu(e)(d)),p=qc(il(e,f)(Fa(e)(f))),m=el(e)(p),h=Gn(e)(In(e)(m)),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=Bs(Rs(t)),r=$o(e)(ns(e)(n));return r===t?t:js(0)(r)};if(Qr(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+Cr(h)*e;return _(t>=.999999999?wd(h):{...h,autoPurgeAttemptBudget:t})}let v=cn(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*dn(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!$r(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/Xu(n,r.id);for(;a>=.999999999&&!(Math.floor(a+St)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=Oi(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=Qu(i,r.id);if(n>1&&e===0){let e=Li(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!Mi(i,r))break;let o=Oi(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,L(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!$r(y)(e)||k)return;let t=si(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+St)/t);if(T[e.id]=n-r*t,r<=0)return;let i=kr(y,`flatRate`)===e.id?1:fr(y.purchaseLevels?.[e.id]??1,dr(y)),a=Mr(y,e.id),o=Cu(y.intro,S[e.id]+1),s=Pn(y,e.id),c=mr(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=L((C.base??0)+l*8)):C[e.producesResourceId]=L((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=L((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,ee=x[bt()],j=Math.max(0,(y.purchaseLevels?.[ee.id]??1)-1);if(j>0&&rr(y,`quettaSpent`)&&$r(y)(ee)&&!k){let e=nr(j);A+=D;let t=Math.floor(A/e+St);t>0&&(A=Math.max(0,A-t*e),C[ee.id]=L((C[ee.id]??0)+t),w[ee.id]=L((w[ee.id]??0)+t))}let te={...y,lastTierLevelCreditTimer:A,resources:C,owned:w,tierProductionAccumulators:T,purge:pi(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+Cr(y)*e}:{}},M=te.runPeaks?Ar(te.runPeaks,te):null,N=te;wr(N)&&g&&L(N.resources.base)>=zr(N)&&(N.autoPurgeAttemptBudget??0)>=.999999999&&(N=wd(N));let ne=N.autoOverclock&&(N.autoOverclockEnabled??!0)?gi(N,e,`overclock`,Nd):N,re=ne.autoScaleUp&&(ne.autoScaleUpEnabled??!0)?gi(ne,e,`scaleUp`,Md):ne,ie=re.autoXpTickspeed&&(re.autoXpTickspeedEnabled??!0)?gi(re,e,`restage`,e=>Bd(e.purge.xp)(e)):re,P=M?{...ie,runPeaks:M}:ie,ae=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=hi(t,e,ud(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>Ku(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},P);return _(ae.autoGlobalTickspeed&&(ae.autoGlobalTickspeedEnabled??!0)?gi(ae,e,`speedUp`,_d):ae)},yi=(e,t=1)=>n=>ir(Er(n)&&e>0?Zr(e,t,n):vi(e,t,0)(n)),bi=(e,t=Ke)=>{let n=Math.min(L(e),t,Ke);return Math.floor(n*(n>600?Ge:1))},xi=(e,t=1)=>n=>{let r=bi(e,yn(n)),i=n;for(let e=0;e<r;e++)i=yi(1,t)(i);return i},Si=(e,t=Ke)=>Math.floor(Math.min(L(e),t,Ke))-bi(e,t),Ci=(e,t=1,n)=>r=>{let i=Si(e,n??yn(r)),a=r;for(let e=0;e<i;e++)a=yi(1,t)(a);return a},wi=e=>{let t=Math.max(0,Math.floor(L(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Ti=(e,t)=>e.resources[t.costResourceId]??0,Ei=(e,t)=>e.purchased?.[t]??0,Di=(e,t)=>n=>{if(Qr(n))return n;let r=Nr(n,e);if(!r||!$r(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Vt(n),s=z(r,i,o,a,Ti(n,r),t);if(s<=0)return n;let c=Ut(r,i)*s,l=Ei(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:L((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},Oi=(e,t)=>n=>Jr(e,n,Di(e,t)(n)),ki=e=>!!e.buyMaxUnlocked,Ai=e=>L(e.purge?.count??0)>=1||L(e.era?.count??0)>=1||Pe.some(t=>!!e.intro?.[t.autoFlagField]),ji=e=>t=>{let n=t;for(let t=0;t<Ze;t++){let t=e(n);if(t===n)break;n=t}return n},Mi=(e,t)=>{let n=Nr(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=Vt(e),a=e.purchaseLevelProgress?.[n.id]??0;return z(n,r,i,a,Ti(e,n),i)>=i-a},Ni=(e,t)=>{let n=Nr(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=Vt(e);return z(n,r,i,0,Ti(e,n),i)>=i},Pi=e=>t=>{if(Qr(t))return t;let n=Nr(t,e);if(!n||!$r(t)(n))return t;if(!Ni(t,n))return Oi(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&Ni(r,n);t++){let t=Oi(e,2**53-1)(r);if(t===r)break;r=t}return r},Fi=e=>t=>Jr(e,t,Pi(e)(t)),Ii=(e,t)=>n=>{if(Qr(n))return n;let r=Nr(n,e);if(!r||!$r(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,Ze)&&Ni(i,r);n++){let t=Oi(e,2**53-1)(i);if(t===i)break;i=t}return i},Li=(e,t)=>n=>Jr(e,n,Ii(e,t)(n)),Ri=(e,t)=>{let n=Nr(e,t);if(Qr(e)||!n||!$r(e)(n)||!Ni(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&Ni(r,n);e++){let e=Oi(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=Vt(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,z(n,o,a,0,Ti(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:Ti(e,n)-Ti(r,n),lastLevelCost:Ti(i,n)-Ti(r,n),partialQuantity:s,partialCost:s>0?Gt(n,o,a,0,s):0}},zi=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=Vt(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Ei(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},Bi=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*Re.length,Number.isFinite(t)&&t>=1?t:1)},Vi=e=>{let t=Bi(e),n=Math.floor((t-1)/Re.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(Re.length-1,Math.max(0,t-1-(n-1)*Re.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=Oe,o=1-Xn(e,(1-a)**2);return 1-(1-De)*a**(n+i)*o**(r-i)},Hi=(e,t=De)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},Ui=e=>ge.slice(0,Yn(e)).some(e=>e.syncedBitrate),Wi=e=>Ui(e)?e.capacity??0:e.speedCapacity??e.capacity??0,Gi=e=>Hi(Wi(e),Vi(e))*8,Ki=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(Ae);return 10**(n-t*(n-Math.log10(10)))},qi=Math.log(Ae/100),Ji=Math.log(Ae/10),Yi=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-qi)*(Math.exp(Ji*s)-Math.exp(Ji*o))/Ji},Xi=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(Ji*a)+Ji*n/t*Math.exp(qi)*r,s=t/Ji*Math.log(o);return Math.min(t,s)-i},Zi=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,Qi=e=>Ki(Zi(e)),$i=e=>Qi(e),ea=e=>1+(e?.dataStreamTapBonusPercent??0)/100,ta=e=>$i(e)/100,na=e=>Gi(e)*Su(e)*ta(e),ra=100,ia=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?qa(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=ea(e),o=ra*a,s=Gi(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},B=e=>{if(ao(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(Gi(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},aa=e=>{let t=B(e);if(!ue.enabled||t===e)return t;let n=t.achievements??Dt().achievements;return ir({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}})},oa=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},sa=()=>10,V=e=>{let t=Vs(e);return t?Math.ceil(t/Re.length):null},ca=(e,t)=>{if(!Number.isInteger(t)||t<1||t>sa())return!1;let n=(t-1)*Re.length+1;return Re.every((t,r)=>{let i=Mo(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},la=e=>{let t=(e-1)*Re.length+1;return Re.map((e,n)=>Mo(t+n))},ua=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!G(e,r)?.rebuilding}),da=(e,t)=>!!G(e,t)?.rebuilding,fa=(e,t)=>!Number.isInteger(t)||t<1||t>sa()?!1:t===1||ca(e,t-1),pa=e=>{let t=0;for(let n=1;n<=sa()&&fa(e,n);n+=1)t=n;return t},ma=e=>8*Ce**e,ha=e=>{let t=1;for(let n=2;n<=sa()&&!((e.intro?.capacity??0)<ma(n));n+=1)t=n;return t},ga=[1,2,4,8,16,32,64,125,250,500],_a=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return ga[t%10]*1e3**Math.floor(t/10)*8},va=Math.log10(2),ya=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*va)*8},ba=(e,t)=>{if(!Number.isInteger(t)||t<1||t>ha(e))return 0;let n=(Ca(e,t)/8)**Vi(e.intro),r=Gi(e.intro??{})/8,i=_a(Math.min(r,n)*8),a=Math.max(0,G(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=_a(o*Math.SQRT2);if(t>=sa())return o;let s=ba(e,t+1);return Math.max(i,Math.min(o,s/2))},xa=(e,t)=>{let n=ba(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,ma(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=ba({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:_a(Gi(e.intro??{}))},Sa=(e,t)=>{let n=ya(e??0),r=t===1?Ee(1).startBits:Ee(t-1).endBits,i=Ee(t).endBits;return Math.min(Math.max(n,r),i)},Ca=(e,t)=>!Number.isInteger(t)||t<1||t>ha(e)?0:Sa(e.intro?.capacity??0,t),wa=(e,t)=>Ca(e,t),Ta=(e,t)=>t<=ha(e)?wa(e,t):Sa(ma(t),t),Ea=(e,t)=>e.intro?.poolBuffers?.[t]??0,Da=(e,t)=>{let n=wa(e,t);return n>0?Math.min(1,Ea(e,t)/n):0},Oa=(e,t)=>Ki(Da(e,t)),ka=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,Aa=(e,t)=>Oa(e,t),ja=(e,t)=>1+ka(e,t)/100,Ma=(e,t)=>{let n=Gi(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-ba(e,r));return Math.min(ba(e,t),n)},Na=e=>t=>{if(!Number.isInteger(e)||e<1||e>ha(t))return t;let n=ka(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},Pa=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},Fa=e=>t=>{if(!ao(t))return t;let n=ha(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=Ma(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=wa(t,s),u=Math.max(0,l-c),d=n*Tu(t.intro,s),f=e;if(u>0){let t=Xi(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=Yi(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!yc(t,s)||!ca(t,s)||rl(t,s))continue;let{lake:p,remainingBits:m,changed:h}=Qc(t,s,n*vc(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},Ia=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||Ua(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,Vs(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,Vs(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,Vs(i.diskBuild.size)??1)),o>Bi(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>sa())continue;let i=e[r]??0,a=Ta(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=V(c);if(u){let t=Ta({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=Xc(o),c=Math.max(Ys(Js(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),We[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=Ve.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=Bo(t),a=U(t,n),o=Vo(t,n),s=xd(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},La=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=Ns(e,t);return!n||S[n.id]>=Pr(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},Ra=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>La(e,t)),za=(e,t)=>{if(!t||t>ha(e))return 0;let n=Xc(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},Ba=e=>{if(e.intro.diskBuild||Io(e)||zo(e))return!1;let t=Bo(e);if(U(e,t)>=Vo(e,t))return!0;let n=V(t);return da(e,n)||ua(e,n)?!1:ba(e,n)>0&&wa(e,n)>=t},Va=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=sa();e+=1){let n=G(t,e);if(!n?.rebuilding)continue;let r=la(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=Bc(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(wa(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},Ha=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!Ua(e),Ua=e=>{let t=sa(),{endBits:n}=Ee(t);return Ca(e,t)>=n},Wa=e=>Ha(e),Ga=e=>{let t=ul(e)?ro(e):e,n=t.intro.capacity*2,r=Ui(t.intro)?n:t.intro.speedCapacity??t.intro.capacity;return ko({...t,intro:{...t.intro,speedCapacity:r,capacity:n,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},Ka=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!Ua(e)},qa=e=>Wi(e),Ja=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated||Ui(t)?!1:qa(t)*2<=t.capacity},Ya=e=>Ja(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,Xa=e=>{if(!e.intro?.speedUpgradeQueued||!Ui(e.intro))return e;let t=Math.max(0,Number(e.intro.speedUpgradeProgress)||0);return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t),speedUpgradeQueued:!1,speedUpgradeProgress:0}}},Za=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;if(Ui(t.intro))return Xa(t);let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=qa(t.intro),a=Math.min(t.intro.bits,Gi(t.intro)*ea(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},Qa=e=>$a(e),$a=e=>Ka(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,eo=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(Ua(t))return to(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,Gi(t.intro)*ea(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?Ga(a):a},to=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,no=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],ro=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of Le)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of no)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},io=e=>(e.intro?.capacity??0)>=ke,ao=e=>(e.intro?.capacity??0)>=je,oo=[`B`,...b.map(e=>e.symbol)],so=1e3,co=[`b`,...oo.slice(1).map(e=>e.replace(/B$/,`b`))],lo=e=>{let t=1,n=0;for(;e/t>=so&&n<co.length-1;)t*=so,n+=1;return{symbol:co[n],divisor:t}},uo=e=>{let t=8,n=0;for(;e/t>=so&&n<oo.length-1;)t*=so,n+=1;return{symbol:oo[n],divisor:t}},fo=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],po=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<fo.length-1;)n*=Ce,r+=1;return{symbol:fo[r],divisor:n}},mo=(e,t)=>Math.floor(e*10**t)/10**t,ho=e=>{let t=Math.floor(e);return`${R(t)} bit${t===1?``:`s`}`},go=3,_o=5,vo=e=>e>=4?_o:4,yo=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(go,Math.max(0,vo(t)-t))},bo=(e,t)=>{if(t){let n=e/t.divisor,r=mo(n,yo(n));return r>0&&r<1?ho(e):`${R(r)} ${t.symbol}`}return ho(e)},xo=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),So=(e,t)=>{if(!t)return ho(e);let n=e/t.divisor,r=yo(n),i=mo(n,r);return i>0&&i<1?ho(e):i===0?`${R(i)} ${t.symbol}`:`${xo[r].format(i)} ${t.symbol}`},Co=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},wo=e=>e.replace(/^[\d,]*\.?\d+/,e=>Co(Number(e.replace(/,/g,``)))),To=e=>bo(e,po(e,!0)),Eo=e=>bo(e,uo(e)),Do=e=>Ut(b[0],e.purchaseLevels?.[b[0].id]??1)*8,Oo=e=>{let t=Do(e);if(e.intro.bits<t)return e;let n=b[0].id;return zi(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},ko=e=>e.intro?.mainGameUnlocked||!ao(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},Ao=e=>t=>{if(!t.intro.byteCreated)return t;let n=Gi(t.intro)*Su(t.intro),r=Xi(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},jo=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=Wt(Vt(e),n,2**53-1),i=Do(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return zi(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},Mo=e=>Me*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),No=e=>pa(e)*Re.length,Po=e=>Math.min(No(e),Bi(e.intro)),Fo=e=>Mo(Bi(e.intro)),Io=e=>{let t=Bo(e);return t<Fo(e)&&!da(e,V(t))},Lo=e=>e.intro?.diskBuild||!zo(e)?!1:Bi(e.intro)<No(e),Ro=e=>{if(!Lo(e))return e;let t=Bi(e.intro)+1,n=Cd(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},zo=e=>((e.intro?.disksBuiltTotal??{})[Mo(Po(e))]??0)>=9,Bo=e=>{let t=e.intro?.disksBuiltTotal??{},n=Po(e),r=1,i=Mo(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=Mo(r);return i},Vo=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),H=(e,t)=>t*Vo(e,t),U=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,W=Eo,Ho=e=>({symbol:oo[e]??oo[oo.length-1],divisor:8*so**e}),Uo=(e,t)=>bo(e,Ho(t)),Wo=(e,t)=>{let n=Ho(t);return e>0&&e<n.divisor?uo(e):n},Go=(e,t)=>bo(e,Wo(e,t)),Ko=(e,t)=>So(e,Wo(e,t)),qo=e=>bo(e,lo(e)),Jo=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=Bo(e),i=[];for(let t=1;t<=ha(e);t+=1)i.push(Xc(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},Yo=e=>Ba(e)&&!Ra(e),Xo=e=>!Yo(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},Zo=e=>e.intro?.diskBuildQueued||Io(e)||e.intro.diskBuild||zo(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},Qo=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,$o=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!Yo(t))return t;let n=Bo(t),r=V(n),i=U(t,n),a=Vo(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?xd(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=Ea(t,r),u=Math.max(0,l-za(t,r)),d=ba(t,r)*ja(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-St){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-St;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},es=200,ts=(e,t)=>{let n=V(t);return t/Math.max(xa(e,n)*ja(e,n),Number.MIN_VALUE)},ns=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!Io(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<es;e+=1){let e={...t,intro:n};if(!Io(e))break;let a=Bo(e),o=V(a);if(da(e,o)||ua(e,o)||wa(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=ba(e,o)*ja(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-za(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},rs=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!Io(e))return t;let n=Bi(e.intro);for(let r=1;r<n;r+=1){let n=Mo(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,ba(e,V(n))<=0&&(t.projected=!0);let s=ts(e,n);t.seconds+=(9-a-o)*s}return t},is=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>St?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},as=e=>{let t=Vs(e);return t?Mo(t+1):e*10},os=e=>{let t=V(e);return!!t&&V(as(e))===t},ss=(e,t)=>e.intro?.diskWriteCache?.[t]??null,cs=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,ls=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],us=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,ds=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,cs(e)-(e.segmentsCollected??0)*t),r=ls(e).reduce((e,t)=>e+us(t),0);return Math.min(1,Math.max(0,(n+r)/t))},fs=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,ps=(e,t)=>{let n=ss(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=ls(n);return r.length>0&&r.every(t=>Ps(e,t.size))},ms=e=>{let t=Vs(e);if(!t||t<=1)return null;let n=Mo(t-1),r=V(e);return r&&V(n)===r?n:null},hs=(e,t)=>!ms(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),gs=(e,t,n=!1)=>({sourceSize:ms(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),_s=(e,t)=>{if(!ms(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=ss(e,t);return!n||!n.expedite&&n.segmentsCollected<10},vs=(e,t)=>!!ss(e,t)?.expedite,ys=e=>t=>{if(!_s(t,e))return t;let n=ss(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:gs(t,e,!0)}}}},bs=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},xs=(e,t)=>{let n=ba(e,V(t))*5;return t/Math.max(n,Number.MIN_VALUE)},Ss=(e,t,n,r)=>{let i=V(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of ls(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=la(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||Ps(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},Cs=1-1e-9,ws=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),Ts=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=V(s.sourceSize);if(c===V(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,Ta(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;hs(t,e)&&(i[e]=gs(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=V(c),d=ja(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>St){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??ms(c);if(!(p>0))continue;let m=ls(l),h=cs(l),g=[];for(let t of m){if(Ps(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>St?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=bs(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-za(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*Cs){let e=g.reduce((e,t)=>e+t.size,0);for(let n of Ss(s,c,c-h-e,g)){let e=xs(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*Cs){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&ws(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},Es=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,Ds=(e,t)=>{let n=t/8,r=ba(e,V(t))*2;return n/Math.max(r,Number.MIN_VALUE)},Os=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,ks=(e,t)=>Es(e,t)?Ps(e,t):!1,As=e=>Us(e)===Re[0],js=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=ha(t),d=e=>{if(!As(e))return!1;let t=V(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=V(n);r&&(i[r]=Math.min(a(r)+s[n],Ta(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(Xc(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=V(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*ba(t,r)*5*ja(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*St?n:e,l=!0}}}for(let e of p){if(c[e]||ss(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||Ps(t,e))continue;let a=Ds(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||Ps(h,r))continue;let a=i.remainingSeconds-e*ja(t,V(r));if(a>St){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},Ms=e=>{let t=Us(e);return t?Re.indexOf(t)+1:null},Ns=(e,t)=>{let n=Hs(t),r=Ms(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},Ps=(e,t)=>Ns(e,t)!==void 0,Fs=(e,t)=>{let n=Hs(t),r=Ms(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},Is=(e,t)=>Ns(e,t)?.name??null,Ls=e=>t=>{if(!La(t,e))return t;let n=Ns(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return zi(n.id,Vt(t))({...t,intro:{...t.intro,disks:o}})},Rs=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>La(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:Ls(t)(e)},zs=(e,t)=>{if(e<1||e>10)return null;let n=Re[t-1];return n===void 0?null:Mo(Yc(e,n))},Bs=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=Pr(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=zs(S[e.id]+1,1);if(i===null||La(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=Ut(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=Vt(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=zi(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},Vs=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/Me;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||Mo(n)!==e?null:n},Hs=e=>{let t=Vs(e);return!t||t>Ue?null:Math.floor((t-1)/Re.length)+1},Us=e=>{let t=Vs(e);return!t||t>Ue?null:Re[(t-1)%Re.length]},Ws=e=>He[e-1]??null,G=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??Tt(),Gs=(e,t)=>G(e,t)?.capacityLevel??0,Ks=(e,t)=>Gs(e,t)>=3,qs=(e,t)=>We[Math.min(Gs(e,t),3)]+Math.max(0,G(e,t)?.resetCount??0)*1e3,Js=(e,t)=>{let n={};return Re.forEach((t,r)=>{n[t]=r<e?ze[r]:0}),n[Be]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},Ys=e=>Ve.reduce((t,n)=>t+n*(e[n]??0),0),Xs=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},Zs=(e,t)=>Js(Gs(e,t),G(e,t)?.resetCount??0),Qs=(e,t)=>Ys(Zs(e,t)),$s=(e,t)=>Math.min(qs(e,t),Qs(e,t)+1),ec=(e,t)=>Xs(G(e,t)?.depositedUnits??0).disks,tc=(e,t)=>G(e,t)?.fillBits??0,nc=(e,t)=>{let n=Xc(t);return n>0&&tc(e,t)>=n},rc=(e,t)=>{let n=Xc(t);return n>0?Math.min(1,Math.max(0,tc(e,t)/n)):0},ic=(e,t)=>G(e,t)?.lakeTransfer??null,ac=(e,t)=>{let n=ic(e,t);if(!n)return 0;let r=n.target*Xc(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},oc=(e,t)=>(G(e,t)?.depositedUnits??0)+ +!!nc(e,t),sc=(e,t)=>{let n=G(e,t),r=Xc(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},cc=(e,t)=>{let n=xc(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=sc(e,t);return r>=n*(1-1e-9)&&Nc(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},lc=(e,t)=>xc(t)(e)<=$s(e,t),uc=(e,t)=>!nc(e,t),dc=(e,t)=>{let n=G(e,t);if(!n||n.lakeTransfer||!nc(e,t))return null;let r=Zs(e,t),i=n.depositedUnits??0,a=Xs(i).disks;for(let e=Ve.length-1;e>=0;--e){let t=Ve[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},fc=(e,t,n)=>ba(e,t)*ja(e,t)*(n===1?2:5),pc=(e,t)=>{let n=tc(e,t);return n>0&&n<Xc(t)},mc=(e,t)=>{let n=wa(e,t);return n>0&&Ea(e,t)>=n},hc=(e,t)=>!!G(e,t)?.acquiring,gc=(e,t)=>pc(e,t)?!0:hc(e,t)?tl(e,t)&&!nl(e,t,!0)&&Ea(e,t)>za(e,t):mc(e,t),_c=e=>ge.slice(0,Yn(e.intro)).reduce((e,t)=>e+(t.lakeSpeed??0),0),vc=(e,t)=>Math.round((.1+.1*Math.max(0,G(e,t)?.resetCount??0)+_c(e))*1e6)/1e6,yc=(e,t)=>(e.intro?.disksBuiltTotal?.[Xc(t)]??0)>0,bc=(e,t)=>(G(e,t)?.boostersUnlocked??!1)||yc(e,t),xc=e=>t=>{let n=G(t,e);return n?(n.purchased??0)+1:0},Sc=(e,t)=>{let n=Pe[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},Cc=(e,t)=>Sc(e,t)?18:10,wc=(e,t)=>Cc(e,Le.indexOf(t)+1),Tc=(e,t)=>{let n=Le[t-1];return n?Math.max(0,Cc(e,t)-(e.intro?.[n]??0)):0},Ec=(e,t)=>{if(!Sc(e,t))return 0;let n=Pe[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=Le[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+kc(e,t-1))},Dc=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},Oc=(e,t)=>Dc(e,t)!==null,kc=(e,t)=>{let n=Dc(e,t);return n===null?0:Math.floor(n/1+St)},Ac=(e,t)=>{let n=Pe[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!Oc(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<wc(e,n.outputField)},jc=e=>t=>Ac(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,Mc=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=Pe[r],s=Dc(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=wc({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+St)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=wc({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},Nc=(e,t,n)=>{if(!G(e,t)||!(n>0))return null;let r=ec(e,t),i=[(r[1]??0)+ +!!nc(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},Pc=(e,t)=>bc(e,t)&&Tc(e,t)>0&&Nc(e,t,xc(t)(e))!==null,Fc=(e,t)=>Tc(e,t)<=0,Ic=(e,t=1)=>n=>{let r=G(n,e);if(!r||!bc(n,e))return n;let i=Le[e-1];if(!i)return n;let a=Tc(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=Nc(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=ec(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=Jc(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},Lc=(e,t)=>{let n=xc(t)(e);if(Nc(e,t,n)!==null)return 0;let r=Xc(t);return Math.max(r,(n-sc(e,t))*r)},Rc=(e,t)=>{if(ca(e,t)||!yc(e,t))return!1;let n=Xc(t);return Lc(e,t)<=n*1e-9||xc(t)(e)>$s(e,t)||!uc(e,t)?!1:Ea(e,t)>0&&gc(e,t)},zc=e=>t=>{if(!Rc(t,e))return t;let n=Lc(t,e),r=Ea(t,e),i=Xc(e)-tc(t,e),a=hc(t,e)&&!pc(t,e)?Math.max(0,r-za(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=Zc(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},Bc=(e,t)=>n=>{let r=G(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},Vc=(e,t)=>G(e,t)?.autoConvertActive??!1,Hc=(e,t)=>!!G(e,t)?.boosterAuto||ca(e,t),Uc=(e,t)=>{let n=G(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!bc(e,t)||!yc(e,t)?!1:Tc(e,t)>0},Wc=(e,t)=>{let n=G(e,t);return!n||n.rebuilding||!ca(e,t)?!1:!n.lakeTransfer&&oc(e,t)>=qs(e,t)&&xc(t)(e)>qs(e,t)},Gc=e=>t=>{if(!Wc(t,e))return t;let n=G(t,e),r=la(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=V(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return ir({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},Kc=e=>t=>{let n=G(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&Pc(t,e)?Ic(e,1)(t):Uc(t,e)?Bc(e,!0)(t):t},qc=e=>{let t=e;for(let e=1;e<=10;e+=1){if(ca(t,e)&&!G(t,e)?.boosterAuto){let n=G(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}G(t,e)?.boosterAuto&&xc(e)(t)<=qs(t,e)&&Pc(t,e)&&(t=Ic(e,1)(t)),Vc(t,e)&&(Tc(t,e)<=0?t=Bc(e,!1)(t):yc(t,e)?Pc(t,e)?(t=Ic(e,1)(t),t=Bc(e,!1)(t)):t=zc(e)(t):t=Bc(e,!1)(t))}return t},Jc=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},Yc=(e,t)=>(e-1)*Re.length+Re.indexOf(t)+1,Xc=e=>Mo(Yc(e,Re[0])),Zc=(e,t,n,r)=>{let i=t[n]??G(e,n),a=Xc(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},Qc=(e,t,n,r,i)=>{let a=G(e,t),o=Math.max(0,Xc(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=Zc(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},$c=(e,t,n)=>{let r=G(e,t);if(!r||!yc(e,t))return r;let i=Xc(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=dc(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=fc(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},el=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=G(t,r),a=$c(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},tl=(e,t)=>la(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),nl=(e,t,n=!1)=>{let r=e.intro??{};if(da(e,t))return!0;if(Io(e)){let n=Bo(e);if(V(n)===t&&wa(e,t)>=n)return!0}if(r.diskBuild&&V(r.diskBuild.size)===t)return!0;let i=la(t);return!n&&i.some(t=>U(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(Bo(e))},rl=(e,t)=>!yc(e,t)||!uc(e,t)?!1:pc(e,t)?Ea(e,t)>0:(hc(e,t)||mc(e,t))&&tl(e,t)&&!nl(e,t,hc(e,t))&&Ea(e,t)>za(e,t),il=(e,t=null)=>n=>{if(!(e>0))return n;let r=ha(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!rl(n,o))continue;let r=Ea(n,o),s=pc(n,o)?r:Math.max(0,r-za(n,o));if(s<=0)continue;let c=ba(n,o)*ja(n,o)*vc(n,o),{lake:l,remainingBits:u,changed:d}=Qc(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},al=(e,t)=>sc(e,t)*Xc(t),ol=(e,t)=>Mo(Yc(e,Re[t])),sl=(e,t)=>{if(t<1||t>10||Ks(e,t))return!1;let n=ol(t,Gs(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},cl=(e,t)=>sl(e,t),ll=e=>t=>{if(!cl(t,e))return t;let n=G(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:Gs(t,e)+1}}}}},ul=e=>(e.intro?.capacity??0)>=Ne,dl=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},fl=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=dl(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,wc(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},pl=fl(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),ml=fl(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),hl=fl(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),gl=fl(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),_l=fl(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),vl=fl(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),yl=fl(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),bl=fl(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),xl=fl(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Sl=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=wc(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},Cl=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(wc(r,n),(r.intro?.[n]??0)+1))}}},wl=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!Oc(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=Tl(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?Sl(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?Bu(d,a+1):d;return Cl(e,i,n)(f)},Tl=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=Pe.length)return 0;let n=t+1,r=ba(e,n);return!(r>0)||!Number.isFinite(r)?0:8*Ds(e,Mo((n-1)*Re.length+1))},El=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,Dl=(e,t)=>n=>El(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,Ol=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<wc(e,n),kl=(e,t)=>{let n=Pe[t];return n?Ol(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},Al=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=Pe[e];return Ol(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},jl=e=>wl(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),Ml=Dl(`computeNodes`,`autoMergeCoresIntoNode`),Nl=e=>El(e,`computeNodes`,`autoMergeCoresIntoNode`),Pl=Al(0),Fl=e=>wl(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),Il=Dl(`computeClusters`,`autoMergeNodesIntoCluster`),Ll=e=>El(e,`computeClusters`,`autoMergeNodesIntoCluster`),Rl=Al(1),zl=e=>wl(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),Bl=Dl(`computeNetworks`,`autoMergeClustersIntoNetwork`),Vl=e=>El(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),Hl=Al(2),Ul=e=>wl(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),Wl=Dl(`computeGrids`,`autoMergeNetworksIntoGrid`),Gl=e=>El(e,`computeGrids`,`autoMergeNetworksIntoGrid`),Kl=Al(3),ql=e=>wl(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),Jl=Dl(`computeFabrics`,`autoMergeGridsIntoFabric`),Yl=e=>El(e,`computeFabrics`,`autoMergeGridsIntoFabric`),Xl=Al(4),Zl=e=>wl(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),Ql=Dl(`computeClouds`,`autoMergeFabricsIntoCloud`),$l=e=>El(e,`computeClouds`,`autoMergeFabricsIntoCloud`),eu=Al(5),tu=e=>wl(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),nu=Dl(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),ru=e=>El(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),iu=Al(6),au=e=>wl(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),ou=Dl(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),su=e=>El(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),cu=Al(7),lu=e=>wl(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),uu=Dl(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),du=e=>El(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),fu=Al(8),pu=[jl,Fl,zl,Ul,ql,Zl,tu,au,lu],mu=e=>Number.isInteger(e)&&e>=1&&e<=Le.length,hu=e=>mu(e)?Le[e-1]:null,gu=(e,t)=>{let n=Fe[e];return!n||!mu(t)?0:n.multiplier},_u=(e,t)=>{let n=Fe[e];return!n||!mu(t)?0:n.durationSeconds},vu=e=>{let t=e?.computeBoostType??null;if(!t||!Fe[t])return null;let n=e.computeBoostTierIndex??1,r=mu(n)?n:1,i=Fe[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},yu=e=>{let t=e?.computeBoosts??{},n=vu(e),r=[];for(let e of Object.keys(Fe)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},bu=(e,t)=>yu(e).find(e=>e.type===t)??null,xu=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},Su=e=>yu(e).reduce((e,t)=>e+Fe[t.type].multiplier,0)||1,Cu=(e,t)=>yu(e).reduce((e,n)=>e+(n.queue[0]>=t?Fe[n.type].multiplier:0),0)||1,wu=e=>yu(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),Tu=(e,t)=>1+yu(e).reduce((e,n)=>e+(n.queue[0]>=t?Fe[n.type].poolBonusPercent??0:0),0)/100,Eu=(e,t,n)=>{if(!Fe[t])return!1;let r=hu(n);return!r||(bu(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},Du=(e,t,n)=>Eu(e,t,n),Ou=(e,t)=>{let n=bu(e.intro,t);return!!n&&Eu(e,t,n.queue[0])},ku=(e,t)=>Ou(e,t),Au=(e,t)=>Math.max(0,(bu(e.intro,t)?.queue.length??0)-1),ju=(e,t)=>Au(e,t)>0,Mu=e=>t=>{if(!ju(t,e))return t;let n=yu(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=hu(i),o=xu(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},Nu=(e,t)=>{let n=bu(e.intro,t);return!!n&&n.queue.length===1},Pu=e=>t=>Nu(t,e)?xu(t,yu(t.intro).filter(t=>t.type!==e)):t,Fu=(e,t)=>n=>{if(!Du(n,e,t))return n;let r=hu(t),i=yu(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:_u(e,t)};let s=xu(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},Iu=e=>t=>ku(t,e)?Fu(e,bu(t.intro,e).queue[0])(t):t,Lu=e=>t=>{let n=yu(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=_u(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return xu(t,r)},Ru=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},zu=e=>t=>!Fe[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},Bu=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=Fe[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return Du(e,n,t)?Fu(n,t)(e):e},Vu=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},Hu=(e,t,n)=>n+ +(kr(e,`egressFees`)===t),Uu=(e,t,n)=>{let r=Hu(e,t,n);return kr(e,`burnRate`)===t?qt(t,r):Jt(t,r)},Wu=(e,t,n)=>Math.max(qt(t,Hu(e,t,n)),Uu(e,t,n)+(t===bt()?0:1)),Gu=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(kr(e,`clockGated`)===t||kr(e,`rateLimit`)===t&&n+1>4)return!0;if(kr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},Ku=e=>t=>{if(Qr(t))return t;let n=x[e];if(!n||!$r(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(Gu(t,e))return t;let i=Uu(t,e,r+1),a=t.resources[n.id]??0;return a<Wu(t,e,r+1)?t:ir({...t,resources:{...t.resources,[n.id]:L(a-i)},owned:{...t.owned,[n.id]:L(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},qu=e=>1*((S[e]??0)+1),Ju=e=>Math.max(0,Math.ceil(Math.log(rt/qu(e))/Math.log(nt))),Yu=(e,t)=>Math.max(rt,qu(e)*nt**t),Xu=(e,t)=>Yu(t,e.autobuyerIntervalLevels?.[t]??0),Zu=(e,t)=>Math.min(tt,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-Ju(t))),Qu=(e,t)=>2**Zu(e,t),$u=e=>Ju(e)+tt,ed=e=>ga[e%10]*1e3**Math.floor(e/10),td=(e,t)=>{let n=1,r=ga.indexOf(e);for(;r===-1&&n<e;)n*=10,r=ga.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*ed(r+t)},K=(e,t=b[0].id)=>((S[t]??0)+1)*td(10,e),q=e=>t=>{if(Qr(t)||Wr(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=$u(e))return t;let r=K(n,e);if(L(t.purge.points)<r)return t;let i=wn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},nd=e=>Math.max(0,Math.ceil(Math.log(rt/e)/Math.log(nt))),rd=e=>nd(at[e].baseSeconds),id=(e,t)=>Math.max(rt,at[t].baseSeconds*nt**(e.automationIntervalLevels?.[t]??0)),ad=(e,t)=>td(at[e].baseCost,t),od=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,sd=od,cd=e=>t=>{if(!at[e]||Qr(t)||Wr(t,`global`,e)||!od(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=rd(e))return t;let r=ad(e,n);if(L(t.purge.points)<r)return t;let i=wn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},ld=()=>nd(ot.baseSeconds),ud=(e,t)=>Math.max(rt,ot.baseSeconds*nt**(e.tierTickspeedIntervalLevels?.[t]??0)),dd=(e,t=b[0].id)=>((S[t]??0)+1)*td(ot.baseCost,e),fd=e=>t=>{if(Qr(t)||Wr(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=ld())return t;let r=dd(n,e);if(L(t.purge.points)<r)return t;let i=wn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},pd=e=>t=>({...t,computeAutoChargeEnabled:!!e}),md=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,hd=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,gd=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},_d=e=>{if(Qr(e)||Or(e,`clockSpeedDisabled`)||!nn(e))return e;let t=e.globalTickspeedMultiplier??null,n=en(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},vd=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(L(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(L(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(L(n?.capacityLevel??0))),r=Math.max(0,Math.floor(L(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,L(e?.capacity??8)),speedCapacity:Math.max(8,L(e?.speedCapacity??e?.capacity??8))}},yd=(e,t)=>{let n=e??vd(null),r=t??vd(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},bd=(e,t)=>{let n=Bo(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:U(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},xd=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=U(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},Sd=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=oa(n);e!==n&&(n=e,r=!0)}if(!Io(n)&&bd(n,t)){let e=Xo(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=!Ui(n.intro)&&(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=Ya(n)),a===n&&i&&(a=$a(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((G(n,t)?.purchased??0)<(i.purchased??0)&&Pc(n,t)){let e=Ic(t,(i.purchased??0)-(G(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((G(n,t)?.purchased??0)>=(i.purchased??0)||Fc(n,t)||xc(t)(n)>qs(n,t))&&Gs(n,t)<(i.capacityLevel??0)){let e=ll(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},Cd=e=>{let t=Dt().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=yd(n.foundryResetCaps,vd(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:Bi(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},wd=e=>{if(L(e.resources.base)<zr(e))return e;let t=Er(e);if(!t)return gn(Dd(e,!0));let n=Dr(e,t.id),r=L(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return gn({...Dd(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:xt(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},Td=e=>t=>{if(!Tr(e)||Er(t)||!Hr(t,e))return t;let n={...Dt().challenges,...t.challenges};return{...Dd(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:xt()}}},Ed=e=>Er(e)?gn({...Dd(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:xt()}}):e,Dd=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=t?fi(e.resources[O],n):0,i=Dt(),a=e.purge.count+ +!!t,o=wr(e),s={id:`p${a}-${Date.now()}`,at:Date.now(),purgeNumber:a,pointsAwarded:r,moneyBits:L(e.resources[O])},c=e.prestigeMuseum??i.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return Zt({...i,challenges:e.challenges??i.challenges,achievements:e.achievements??i.achievements,daily:e.daily??i.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...i.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??i.intro.mainGameUnlocked,capacity:e.intro?.capacity??i.intro.capacity,byteCreated:e.intro?.byteCreated??i.intro.byteCreated,bits:e.intro?.bits??i.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??i.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??i.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??i.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??i.intro.diskCache,diskBuild:e.intro?.diskBuild??i.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??i.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??i.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??i.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??i.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??i.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:Bi(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??i.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??i.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??i.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??i.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??i.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??i.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??i.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??i.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??i.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??i.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??i.intro.computeNodes,computeClusters:e.intro?.computeClusters??i.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??i.intro.computeNetworks,computeGrids:e.intro?.computeGrids??i.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??i.intro.computeFabrics,computeClouds:e.intro?.computeClouds??i.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??i.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??i.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??i.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??i.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??i.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??i.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??i.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??i.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??i.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??i.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??i.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??i.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??i.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??i.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??i.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??i.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??i.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??i.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??i.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??i.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??i.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??i.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??i.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??i.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??i.autobuyers,autobuyersEnabled:e.autobuyersEnabled??i.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??i.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??i.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??i.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??i.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??i.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??i.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??i.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??i.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??i.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??i.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??i.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??i.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??i.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??i.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??i.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??i.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??i.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??i.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??i.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??i.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??i.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??i.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??i.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??i.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??i.autoGlobalTickspeedEnabled,era:e.era??i.era,eons:e.eons??i.eons,hyperscalerCount:e.hyperscalerCount??i.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??i.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??i.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??i.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||L(e.purge.points)+r>=100,owned:e.computeFlops?.owned??i.computeFlops.owned,cumulativeBoost:i.computeFlops.cumulativeBoost},purge:{...i.purge,points:L(e.purge.points)+r,count:a,unboundedUnlocked:o}})},Od=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},kd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},Ad=(e,t)=>t!==e&&Or(t,`bitRot`)?qr(t,{cycleSeconds:0}):t,jd=(e,t)=>t===e?t:gn(t),Md=e=>Ad(e,jd(e,Pd(e))),Nd=e=>{let t=Id(e);return t===e?Ad(e,jd(e,t)):ir(Fd(e,Ad(e,jd(e,t))))},Pd=e=>{if(Qr(e))return e;let t=gr(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<_r(e))return e;let n=Dt(),r=hr(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<Pr(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:L(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:br(e)??n.overclockLastClaimCompletedLevels}},Fd=(e,t)=>{let n=Math.max(0,(e.purchaseLevels?.[Fr(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=br(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&rr(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),wr(e)&&n>=12&&rr(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},Id=e=>{if(Qr(e)||Or(e,`overclockDisabled`))return e;let t=Fr(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<vr(e))return e;let r=Dt();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},Ld=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,Rd=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,zd=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,Bd=e=>t=>Hd(e,!1)(t),Vd=e=>t=>{let n=L(t.owned?.[Fr(t).id])<=0,r=Hd(e,!0)(t);if(!n||r===t||!ue.enabled)return r;let i=r.achievements??Dt().achievements;return ir({...r,achievements:{...i,counters:{...i.counters,emptyRestages:(i.counters?.emptyRestages??0)+1}}})},Hd=(e,t)=>n=>{if(Qr(n)||Or(n,`restageDisabled`)||!an(n))return n;let r=Fr(n).id;if(!t&&L(n.owned?.[r])<=0)return n;let i=Math.floor(L(e));if(i<=0)return n;let a=n.lastTierXpConsumed??0;if(i<sn(a))return n;let o=L(n.purge.xp);if(i>o)return n;let s=b.filter(e=>e.id!==r).map(e=>e.id);return{...n,purge:{...n.purge,xp:o-i},lastTierXpConsumed:a+i,owned:{...n.owned,...s.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...n.resources,[O]:0,...s.reduce((e,t)=>({...e,[t]:0}),{})}}},Ud=`-ms-`,Wd=`-moz-`,Gd=`-webkit-`,Kd=`comm`,qd=`rule`,Jd=`decl`,Yd=`@import`,Xd=`@namespace`,Zd=`@keyframes`,Qd=`@layer`,$d=Math.abs,ef=String.fromCharCode,tf=Object.assign;function nf(e,t){return sf(e,0)^45?(((t<<2^sf(e,0))<<2^sf(e,1))<<2^sf(e,2))<<2^sf(e,3):0}function rf(e){return e.trim()}function af(e,t){return(e=t.exec(e))?e[0]:e}function J(e,t,n){return e.replace(t,n)}function of(e,t,n){return e.indexOf(t,n)}function sf(e,t){return e.charCodeAt(t)|0}function cf(e,t,n){return e.slice(t,n)}function lf(e){return e.length}function uf(e){return e.length}function df(e,t){return t.push(e),e}function ff(e,t){return e.map(t).join(``)}function pf(e,t){return e.filter(function(e){return!af(e,t)})}var mf=1,hf=1,gf=0,_f=0,vf=0,yf=``;function bf(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:mf,column:hf,length:o,return:``,siblings:s}}function xf(e,t){return tf(bf(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Sf(e){for(;e.root;)e=xf(e.root,{children:[e]});df(e,e.siblings)}function Cf(){return vf}function wf(){return vf=_f>0?sf(yf,--_f):0,hf--,vf===10&&(hf=1,mf--),vf}function Tf(){return vf=_f<gf?sf(yf,_f++):0,hf++,vf===10&&(hf=1,mf++),vf}function Ef(){return sf(yf,_f)}function Df(){return _f}function Of(e,t){return cf(yf,e,t)}function kf(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Af(e){return mf=hf=1,gf=lf(yf=e),_f=0,[]}function jf(e){return yf=``,e}function Mf(e){return rf(Of(_f-1,Ff(e===91?e+2:e===40?e+1:e)))}function Nf(e){for(;(vf=Ef())&&vf<33;)Tf();return kf(e)>2||kf(vf)>3?``:` `}function Pf(e,t){for(;--t&&Tf()&&!(vf<48||vf>102||vf>57&&vf<65||vf>70&&vf<97););return Of(e,Df()+(t<6&&Ef()==32&&Tf()==32))}function Ff(e){for(;Tf();)switch(vf){case e:return _f;case 34:case 39:e!==34&&e!==39&&Ff(vf);break;case 40:e===41&&Ff(e);break;case 92:Tf()}return _f}function If(e,t){for(;Tf()&&e+vf!==57&&(e+vf!==84||Ef()!==47););return`/*`+Of(t,_f-1)+`*`+ef(e===47?e:Tf())}function Lf(e){for(;!kf(Ef());)Tf();return Of(e,_f)}function Rf(e){return jf(zf(``,null,null,null,[``],e=Af(e),0,[0],e))}function zf(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Tf()){case 40:if(m!=108&&sf(C,d-1)==58){of(C+=J(Mf(v),`&`,`&\f`),`&\f`,$d(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Mf(v);break;case 9:case 10:case 13:case 32:C+=Nf(m);break;case 92:C+=Pf(Df()-1,7);continue;case 47:switch(Ef()){case 42:case 47:df(Vf(If(Tf(),Df()),t,n,c),c),(kf(m||1)==5||kf(Ef()||1)==5)&&lf(C)&&cf(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=lf(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=J(C,/\f/g,``)),p>0&&(lf(C)-d||h===0&&m===47)&&df(p>32?Hf(C+`;`,r,n,d-1,c):Hf(J(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(df(S=Bf(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)zf(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(sf(C,3)===110)break;case 108:if(sf(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?zf(e,S,S,r&&df(Bf(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):zf(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+lf(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&wf()==125)continue}switch(C+=ef(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(lf(C)-1)*_,_=1;break;case 64:Ef()===45&&(C+=Mf(Tf())),f=Ef(),u=d=lf(y=C+=Lf(Df())),v++;break;case 45:m===45&&lf(C)==2&&(h=0)}}return a}function Bf(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=uf(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=cf(e,f+1,f=$d(g=o[h])),b=e;v<m;++v)(b=rf(g>0?p[v]+` `+y:J(y,/&\f/g,p[v])))&&(c[_++]=b);return bf(e,t,n,i===0?qd:s,c,l,u,d)}function Vf(e,t,n,r){return bf(e,t,n,Kd,ef(Cf()),cf(e,2,-2),0,r)}function Hf(e,t,n,r,i){return bf(e,t,n,Jd,cf(e,0,r),cf(e,r+1,-1),r,i)}function Uf(e,t,n){switch(nf(e,t)){case 5103:return Gd+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Gd+e+e;case 4855:return Gd+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return Wd+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Gd+e+Wd+e+Ud+e+e;case 5936:switch(sf(e,t+11)){case 114:return Gd+e+Ud+J(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return Gd+e+Ud+J(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return Gd+e+Ud+J(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return Gd+e+Ud+e+e;case 6165:return Gd+e+Ud+`flex-`+e+e;case 5187:return Gd+e+J(e,/(\w+).+(:[^]+)/,Gd+`box-$1$2`+Ud+`flex-$1$2`)+e;case 5443:return Gd+e+Ud+`flex-item-`+J(e,/flex-|-self/g,``)+(af(e,/flex-|baseline/)?``:Ud+`grid-row-`+J(e,/flex-|-self/g,``))+e;case 4675:return Gd+e+Ud+`flex-line-pack`+J(e,/align-content|flex-|-self/g,``)+e;case 5548:return Gd+e+Ud+J(e,`shrink`,`negative`)+e;case 5292:return Gd+e+Ud+J(e,`basis`,`preferred-size`)+e;case 6060:return Gd+`box-`+J(e,`-grow`,``)+Gd+e+Ud+J(e,`grow`,`positive`)+e;case 4554:return Gd+J(e,/([^-])(transform)/g,`$1`+Gd+`$2`)+e;case 6187:return J(J(J(e,/(zoom-|grab)/,Gd+`$1`),/(image-set)/,Gd+`$1`),e,``)+e;case 5495:case 3959:return J(e,/(image-set\([^]*)/,Gd+"$1$`$1");case 4968:return J(J(e,/(.+:)(flex-)?(.*)/,Gd+`box-pack:$3`+Ud+`flex-pack:$3`),/space-between/,`justify`)+Gd+e+e;case 4200:if(!af(e,/flex-|baseline/))return Ud+`grid-column-align`+cf(e,t)+e;break;case 2592:case 3360:return Ud+J(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,af(e.props,/grid-\w+-end/)})?~of(e+(n=n[t].value),`span`,0)?e:Ud+J(e,`-start`,``)+e+Ud+`grid-row-span:`+(~of(n,`span`,0)?af(n,/\d+/):+af(n,/\d+/)-af(e,/\d+/))+`;`:Ud+J(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return af(e.props,/grid-\w+-start/)})?e:Ud+J(J(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return J(e,/(.+)-inline(.+)/,Gd+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(lf(e)-1-t>6)switch(sf(e,t+1)){case 109:if(sf(e,t+4)!==45)break;case 102:return J(e,/(.+:)(.+)-([^]+)/,`$1`+Gd+`$2-$3$1`+Wd+(sf(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~of(e,`stretch`,0)?Uf(J(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return J(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return Ud+n+`:`+r+s+(i?Ud+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(sf(e,t+6)===121)return J(e,`:`,`:`+Gd)+e;break;case 6444:switch(sf(e,sf(e,14)===45?18:11)){case 120:return J(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+Gd+(sf(e,14)===45?`inline-`:``)+`box$3$1`+Gd+`$2$3$1`+Ud+`$2box$3`)+e;case 100:return J(e,`:`,`:`+Ud)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return J(e,`scroll-`,`scroll-snap-`)+e}return e}function Wf(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Y(e,t,n,r){switch(e.type){case Qd:if(e.children.length)break;case Yd:case Xd:case Jd:return e.return=e.return||e.value;case Kd:return``;case Zd:return e.return=e.value+`{`+Wf(e.children,r)+`}`;case qd:if(!lf(e.value=e.props.join(`,`)))return``}return lf(n=Wf(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Gf(e){var t=uf(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Kf(e){return function(t){t.root||(t=t.return)&&e(t)}}function qf(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Jd:e.return=Uf(e.value,e.length,n);return;case Zd:return Wf([xf(e,{value:J(e.value,`@`,`@`+Gd)})],r);case qd:if(e.length)return ff(n=e.props,function(t){switch(af(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Sf(xf(e,{props:[J(t,/:(read-\w+)/,`:`+Wd+`$1`)]})),Sf(xf(e,{props:[t]})),tf(e,{props:pf(n,r)});break;case`::placeholder`:Sf(xf(e,{props:[J(t,/:(plac\w+)/,`:`+Gd+`input-$1`)]})),Sf(xf(e,{props:[J(t,/:(plac\w+)/,`:`+Wd+`$1`)]})),Sf(xf(e,{props:[J(t,/:(plac\w+)/,Ud+`input-$1`)]})),Sf(xf(e,{props:[t]})),tf(e,{props:pf(n,r)})}return``})}}function Jf(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Yf=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Xf=`active`,Zf=`data-styled-version`,Qf=`6.6.0`,$f=`/*!sc*/
`,ep=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw Jf(19);function tp(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var np=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:tp(`REACT_APP_SC_DISABLE_SPEEDY`)??tp(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),rp=`sc-keyframes-`,ip={},ap=new Map,op=new Map,sp=1,cp=e=>{if(ap.has(e))return ap.get(e);for(;op.has(sp);)sp++;let t=sp++;return ap.set(e,t),op.set(t,e),t},lp=e=>op.get(e),up=(e,t)=>{sp=t+1,ap.set(e,t),op.set(t,e)},dp=Object.freeze([]),fp=Object.freeze({});function pp(e,t,n=fp){return e.theme!==n.theme&&e.theme||t||n.theme}var mp=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,hp=/(^-|-$)/g;function gp(e){return e.replace(mp,`-`).replace(hp,``)}var _p=/(a)(d)/gi,vp=e=>String.fromCharCode(e+(e>25?39:97));function yp(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=vp(t%52)+n;return(vp(t%52)+n).replace(_p,`$1-$2`)}var bp=5381,xp=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Sp=e=>xp(bp,e);function Cp(e){return yp(Sp(e)>>>0)}function wp(e){return e.displayName||e.name||`Component`}function Tp(e){return typeof e==`string`&&!0}function Ep(e){return Tp(e)?`styled.${e}`:`Styled(${wp(e)})`}var Dp=Symbol.for(`react.memo`),Op=Symbol.for(`react.forward_ref`),kp={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Ap={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},jp={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Mp={[Op]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Dp]:jp};function Np(e){return(`type`in(t=e)&&t.type.$$typeof)===Dp?jp:`$$typeof`in e?Mp[e.$$typeof]:kp;var t}var Pp=Object.defineProperty,Fp=Object.getOwnPropertyNames,Ip=Object.getOwnPropertySymbols,Lp=Object.getOwnPropertyDescriptor,Rp=Object.getPrototypeOf,zp=Object.prototype;function Bp(e,t,n){if(typeof t!=`string`){let r=Rp(t);r&&r!==zp&&Bp(e,r,n);let i=Fp(t).concat(Ip(t)),a=Np(e),o=Np(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in Ap||n&&n[s]||o&&s in o||a&&s in a)){let n=Lp(t,s);try{Pp(e,s,n)}catch{}}}}return e}function Vp(e){return typeof e==`function`}var Hp=Symbol.for(`react.forward_ref`);function Up(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Hp&&`styledComponentId`in e}function Wp(e,t){return e&&t?e+` `+t:e||t||``}function Gp(e,t){return e.join(t||``)}function Kp(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function qp(e,t,n=!1){if(!n&&!Kp(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=qp(e[n],t[n]);else if(Kp(t))for(let n in t)e[n]=qp(e[n],t[n]);return e}function Jp(e,t){Object.defineProperty(e,"toString",{value:t})}var Yp=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw Jf(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+$f;return t}},Xp=`style[${Yf}][${Zf}="${Qf}"]`,Zp=RegExp(`^${Yf}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Qp=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,$p=e=>{if(!e)return document;if(Qp(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Qp(t))return t}return document},em=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},tm=(e,t)=>{let n=(t.textContent??``).split($f),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Zp);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(up(n,t),em(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},nm=e=>{let t=$p(e.options.target).querySelectorAll(Xp);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Yf)!==Xf&&(tm(e,r),r.parentNode&&r.parentNode.removeChild(r))}},rm=!1;function im(){if(!1!==rm)return rm;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return rm=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return rm=t.getAttribute(`content`)||void 0}return rm=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var am=(e,t)=>{if(typeof document>`u`)throw Jf(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Yf}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Yf,Xf),i.setAttribute(Zf,Qf);let s=t||im();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},om=class{constructor(e,t){this.element=am(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw Jf(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},sm=class{constructor(e,t){this.element=am(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},cm=ep,lm={isServer:!ep,useCSSOMInjection:!np},um=class e{static registerId(e){return cp(e)}constructor(e=fp,t={},n){this.options=Object.assign(Object.assign({},lm),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&ep&&cm&&(cm=!1,nm(this)),Jp(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=lp(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Yf+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&ep&&nm(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&ep&&t.target!==this.options.target&&$p(this.options.target)!==$p(t.target)&&nm(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new om(t,n):new sm(t,n))(this.options),new Yp(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){cp(e),e.startsWith(rp)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(cp(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(cp(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},dm=new WeakSet,fm={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function pm(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in fm||e.startsWith(`--`)?String(t).trim():t+`px`}var mm=47;function hm(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var gm=Symbol.for(`sc-keyframes`);function _m(e){return typeof e==`object`&&!!e&&gm in e}function vm(e){return Vp(e)&&!(e.prototype&&e.prototype.isReactComponent)}var ym=e=>e==null||!1===e||e===``,bm=Symbol.for(`react.client.reference`);function xm(e){return e.$$typeof===bm}function Sm(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!ym(r)&&(Array.isArray(r)&&dm.has(r)||Vp(r)?t.push(hm(n)+`:`,r,`;`):Kp(r)?(t.push(n+` {`),Sm(r,t),t.push(`}`)):t.push(hm(n)+`: `+pm(n,r)+`;`))}}function Cm(e,t,n,r,i=[]){if(ym(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return xm(e)?i:vm(e)&&t?Cm(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Cm(e[a],t,n,r,i);return i}return Up(e)?(i.push(`.${e.styledComponentId}`),i):_m(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):xm(e)?i:Kp(e)&&e.toString===Object.prototype.toString?(Sm(e,i),i):(i.push(e.toString()),i)}var wm=Sp(Qf),Tm=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=xp(wm,t),this.baseStyle=n,um.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(vm(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Gp(Cm(r,e,t,n)))}else i+=Gp(Cm(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=yp(xp(xp(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=Wp(r,a)}}return r}},Em=/&/g;function Dm(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Om(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==mm||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===mm&&(o=!1,c++);else if(l!==34&&l!==39||Dm(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function km(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&km(a.children,t)}return e}function Am({options:e=fp,plugins:t=dp}=fp){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Em,r).replace(i,a))}),e.prefix&&o.push(qf),o.push(Y);let s=[],c=Gf(o.concat(Kf(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Om(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Dm(e,o)){if(s===0){if(t===mm&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==mm);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===mm)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===mm&&o+1<r&&e.charCodeAt(o+1)===mm){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Om(i)):l===0?e:Om(e)}(t),d=Rf(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=km(d,e.namespace)),s=[],Wf(d,c),s},u=e,d=bp;for(let e=0;e<t.length;e++)t[e].name||Jf(15),d=xp(d,t[e].name);return u!=null&&u.namespace&&(d=xp(d,u.namespace)),u!=null&&u.prefix&&(d=xp(d,`p`)),l.hash=d===bp?``:d.toString(),l}var jm=new um,Mm=Am(),Nm=v.createContext({shouldForwardProp:void 0,styleSheet:jm,stylis:Mm,stylisPlugins:void 0});Nm.Consumer;function Pm(){return v.useContext(Nm)}var Fm=v.createContext(void 0);Fm.Consumer;function Im(){let e=v.useContext(Fm);if(!e)throw Jf(18);return e}function Lm(e){let t=v.useContext(Fm),n=v.useMemo(()=>function(e,t){if(!e)throw Jf(14);if(Vp(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw Jf(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(Fm.Provider,{value:n},e.children):null}var Rm={};function zm(e,t){let n=typeof e==`string`?gp(e):`sc`;Rm[n]=(Rm[n]||0)+1;let r=n+`-`+Cp(Qf+n+Rm[n]);return t?t+`-`+r:r}function Bm(e,t,n){let r=Up(e),i=e,a=!Tp(e),{attrs:o=dp,componentId:s=zm(t.displayName,t.parentComponentId),displayName:c=Ep(e)}=t,l=t.displayName&&t.componentId?gp(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Tm(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(Fm),u=Pm(),d=e.shouldForwardProp||u.shouldForwardProp,f=pp(t,l,a)||fp,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=Vp(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=Wp(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=Wp(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=Tp(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=Wp(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?Wp(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)qp(e,n,!0);return e}({},i.defaultProps,e):e}}),Jp(m,()=>`.${m.styledComponentId}`),a&&Bp(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Vm=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function Hm(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Um=e=>(dm.add(e),e);function Wm(e,...t){if(Vp(e)||Kp(e))return Um(Cm(Hm(dp,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Cm(n):Um(Cm(Hm(n,t)))}function Gm(e,t,n=fp){if(!t)throw Jf(1,t);let r=(r,...i)=>e(t,n,Wm(r,...i));return r.attrs=r=>Gm(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Gm(e,t,Object.assign(Object.assign({},n),r)),r}var Km=e=>Gm(Bm,e),X=Km;Vm.forEach(e=>{X[e]=Km(e)});var qm=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(Vp(n)&&!Up(n))return!1}return!0}(e),um.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=Gp(Cm(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function Jm(e,...t){let n=Wm(e,...t),r=`sc-global-${Cp(JSON.stringify(n))}`,i=new qm(n,r),a=e=>{let t=Pm(),n=v.useContext(Fm),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,ip,n,o);else{let s=Object.assign(Object.assign({},t),{theme:pp(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var Ym,Xm=class{constructor(e,t){this[Ym]=!0,this.inject=(e,t=Mm)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=rp+e,this.rules=t,cp(this.id),Jp(this,()=>{throw Jf(12,String(this.name))})}getName(e=Mm){return e.hash?this.name+yp(e.hash>>>0):this.name}};function Zm(e,...t){let n=Gp(Wm(e,...t));return new Xm(Cp(n),n)}Ym=gm,`${Yf}`,`${Yf}`,`${Yf}`;var Qm=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Z=o(((e,t)=>{t.exports=Qm()}))(),$m=5e3,eh=X.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  left: 0;
  padding: calc(0.75rem + env(safe-area-inset-top)) 1rem 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1010;
`,th=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,nh=X.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,rh=X.div`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  margin-top: ${e=>e.theme.space.xs};
`,ih=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),ah=()=>typeof document<`u`&&document.visibilityState===`hidden`,oh=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||ah()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+$m};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{ah()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function sh({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=oh(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=ue.enabled?ih(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&Se[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,Z.jsx)(eh,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,Z.jsxs)(th,{children:[(0,Z.jsx)(nh,{children:`Achievement unlocked`}),Se[t].name,tr(Se[t])&&(0,Z.jsx)(rh,{children:tr(Se[t])})]},e))})}var ch=X.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,lh=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg} ${e=>e.theme.radius.lg} 0 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  left: 50%;
  max-width: 420px;
  padding: ${e=>e.theme.space.lg} ${e=>e.theme.space.md}
    calc(${e=>e.theme.space.lg} + env(safe-area-inset-bottom));
  position: fixed;
  transform: translateX(-50%);
  width: min(100%, 420px);
  z-index: 51;
`,uh=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,dh=X.button`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  cursor: pointer;
  display: flex;
  font-family: ${e=>e.theme.font.body};
  font-size: 0.95rem;
  font-weight: 500;
  gap: 0.65rem;
  justify-content: flex-start;
  padding: 0.75rem 0.9rem;
  text-align: left;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,fh=X.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,ph=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,Z.jsx)(ch,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,Z.jsxs)(lh,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,Z.jsx)(uh,{children:`More`}),(0,Z.jsxs)(dh,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,Z.jsx)(fh,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,Z.jsxs)(dh,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,Z.jsx)(fh,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),ue.enabled&&(0,Z.jsxs)(dh,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,Z.jsx)(fh,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,Z.jsxs)(dh,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,Z.jsx)(fh,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),!1]})})},mh=X.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,hh=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,gh=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,_h=X.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,vh=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,yh=X(mh)`
  gap: 0.4rem;
`,bh=X.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,xh=X.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  padding: 0;
  text-align: left;
  text-transform: inherit;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Sh=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Ch=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,wh=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,Th=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,Eh=X.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,Dh=(e,t,n)=>{let r=Qn(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},Oh=e=>{let t=[],n={};return e.forEach(e=>{let r=xe[e.id];r?(n[r.id]||(n[r.id]={key:r.id,name:r.name,levels:[]},t.push(n[r.id])),n[r.id].levels.push(e)):t.push({key:e.id,def:e})}),t},kh=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=Im(),c=new Set(ar(t)),l=he.map(e=>({...e,members:ye.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0),u=cr(t),d=l.reduce((e,n)=>e+sr(t,n.id).bonus,0),f=l.reduce((e,n)=>e+sr(t,n.id).total,0);return(0,Z.jsxs)(hh,{children:[(0,Z.jsxs)(gh,{children:[(0,Z.jsx)(`h1`,{children:`Achievements`}),(0,Z.jsxs)(_h,{"aria-label":`total stars ${u} of ${f}`,children:[`⭐ `,u,`/`,f,d>0?` (incl. ${d} bonus)`:``]})]}),(0,Z.jsx)(vh,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>rr(t,e.id)).length,u=c.has(e.id),d=sr(t,e.id);return(0,Z.jsxs)(yh,{"aria-label":`${e.name} achievement group`,children:[(0,Z.jsxs)(bh,{children:[(0,Z.jsxs)(xh,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,Z.jsxs)(Eh,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length,u&&d.bonus>0?` · ⭐ +${d.bonus}`:``]})]}),n[e.id]&&Oh(e.members).map(e=>{if(e.levels){let n=e.levels.filter(e=>rr(t,e.id)).length,r=e.levels.length,c=n===r,l=e.levels.find(e=>!rr(t,e.id)),u=e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,d=e.levels.length>4,f=[...new Map(e.levels.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,Z.jsxs)(Sh,{"aria-label":`${e.name} achievement level ${n} of ${r}`,style:{alignItems:`flex-start`},children:[(0,Z.jsxs)(Ch,{$earned:n>0,children:[(0,Z.jsx)(xh,{"aria-expanded":!!i[e.key],"aria-label":`${e.name} details`,onClick:()=>o(a,e.key),type:`button`,children:(0,Z.jsx)(`strong`,{children:e.name})}),!i[e.key]&&l&&(0,Z.jsxs)(wh,{children:[`Next: `,er(l),Dh(t,l,!1)?` (${Dh(t,l,!1)})`:``]}),!i[e.key]&&l&&tr(l)&&(0,Z.jsxs)(wh,{"aria-label":`${e.name} next reward`,children:[`Reward: `,tr(l)]}),i[e.key]&&u&&(0,Z.jsxs)(wh,{children:[`Reward each level: `,u]}),i[e.key]&&d&&!u&&f.map(([e,t])=>(0,Z.jsxs)(wh,{children:[e,`: `,t]},e)),i[e.key]&&e.levels.map((n,r)=>{let i=rr(t,n.id),a=Dh(t,n,i);if(d){let t=u?null:tr(n);return(0,Z.jsxs)(wh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,er(n),a&&!i?` (${a})`:``,t?` · ${t}`:``]},n.id)}return(0,Z.jsxs)(Th,{children:[(0,Z.jsxs)(wh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,n.trigger,a&&!i?` (${a})`:``]}),!u&&$n(n)&&(0,Z.jsxs)(wh,{"aria-label":`${e.name} level ${r+1} reward ${i?`earned`:`pending`}`,children:[i?`Reward earned`:`Reward`,`: `,$n(n)]})]},n.id)})]}),(0,Z.jsxs)(Eh,{$color:c?s.color.good:s.color.textMuted,children:[c?`✅ `:n===0?`🔒 `:``,`Lv `,n,`/`,r]})]},e.key)}let{def:n}=e,r=rr(t,n.id),c=n.secret&&!r,l=c?null:Dh(t,n,r),u=c?`???`:n.name;return(0,Z.jsxs)(Sh,{"aria-label":`${u} achievement ${r?`earned`:`not yet earned`}`,children:[(0,Z.jsxs)(Ch,{$earned:r,children:[c?(0,Z.jsx)(`strong`,{children:u}):(0,Z.jsx)(xh,{"aria-expanded":!!i[n.id],"aria-label":`${n.name} details`,onClick:()=>o(a,n.id),type:`button`,children:(0,Z.jsx)(`strong`,{children:u})}),!c&&i[n.id]&&(0,Z.jsx)(wh,{children:n.trigger}),!c&&i[n.id]&&$n(n)&&(0,Z.jsxs)(wh,{"aria-label":`${n.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,$n(n)]})]}),(0,Z.jsxs)(Eh,{$color:r?s.color.good:s.color.textMuted,children:[l&&!r?`${l} `:``,r?`✅`:`🔒`]})]},n.id)})]},e.id)})})]})},Ah=`high`,jh=`normal`,Mh=()=>b[b.length-1],Nh=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],Ph=[Nl,Ll,Vl,Gl,Yl,$l,ru,su,du],Fh=e=>Nh.some((t,n)=>Ac(e,n)),Ih=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,Lh=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,Rh=e=>io(e)&&(e.intro?.bits??0)>=Do(e),zh=1,Bh={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},Vh=(e,t)=>{let[n,r]=Bh[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&id(e,t)<zh},Hh=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&Xu(e,t)<zh,Uh=(e,t)=>e?Ah:t?jh:!1,Wh=e=>{if(Qr(e))return!1;let t=Vt(e);return b.some(n=>{if(!$r(e)(n)||Hh(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:z(n,r,t,i,Ti(e,n),2**53-1)>=a})},Gh=e=>Qr(e)||!nn(e)||Vh(e,`speedUp`)?!1:tn(e),Kh=e=>{if(Qr(e)||Vh(e,`scaleUp`))return!1;let t=gr(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=_r(e)},qh=e=>{if(Qr(e)||Vh(e,`overclock`))return!1;let t=Mh();return $r(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=vr(e):!1},Jh=e=>Qr(e)&&!Vh(e,`purge`),Yh=e=>Jh(e)||Wh(e)||Gh(e)||Kh(e)||qh(e),Xh=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],Zh=e=>{if((e.purge?.count??0)<1||Qr(e))return!1;let t=e.purge?.points??0;return Xh.some(n=>{if(!sd(e,n))return!1;let r=Ur(`global`,n);if(r&&!Dr(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<rd(n)&&t>=ad(n,i)})},Qh=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=di(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.buyMaxUnlocked&&t>=2||!e.cacheWarmUnlocked&&t>=20)return!0;let n=bn(vn(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},$h=e=>Zh(e)||Qh(e),eg=e=>Yh(e),tg=e=>Uh(Jh(e)||Wh(e),eg(e)),ng=e=>Ih(e)||Lh(e)||Wa(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||Ja(e)&&(e.intro?.bits??0)>=qa(e.intro)||Yo(e)&&!e.intro?.diskBuildQueued||Lo(e)||Rh(e),rg=e=>Uh(Ih(e)||Lh(e),ng(e)),ig=e=>Nh.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(dl(e,r)<10||a<wc(e,n))}),ag=e=>ul(e)?ig(e)||Ph.some(t=>t(e))||Fh(e):!1,og=e=>ul(e)?Uh(ig(e),ag(e)):!1,sg=e=>Cn(e)?ht.some(t=>On(e,t.id)):!1,cg=e=>sg(e)?jh:!1,lg=e=>({game:tg(e),foundry:rg(e),boosters:og(e),compute:cg(e),perks:$h(e)?jh:!1}),ug=`3.25rem`,dg=Zm`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,fg=X.nav`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: 0;
  display: flex;
  gap: 0.15rem;
  justify-content: space-around;
  left: 0;
  padding: 0.35rem 0.4rem calc(0.35rem + env(safe-area-inset-bottom));
  position: fixed;
  right: 0;
  z-index: 40;
`,pg=X.button`
  align-items: center;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
  border: 1px solid ${e=>e.$active?e.theme.color.borderStrong:`transparent`};
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.$active?e.theme.color.accent:e.theme.color.textMuted};
  cursor: pointer;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  font-family: ${e=>e.theme.font.body};
  font-size: 0.65rem;
  font-weight: ${e=>e.$active?600:500};
  gap: 0.15rem;
  justify-content: center;
  letter-spacing: 0.01em;
  max-width: 5.5rem;
  min-width: 0;
  padding: 0.35rem 0.25rem;
  position: relative;
  transition:
    color ${e=>e.theme.motion.duration.base} ${e=>e.theme.motion.easing.standard},
    background ${e=>e.theme.motion.duration.base} ${e=>e.theme.motion.easing.standard},
    border-color ${e=>e.theme.motion.duration.base} ${e=>e.theme.motion.easing.standard};

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,mg=X.span`
  font-size: 1.05rem;
  line-height: 1;
`,hg=X.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,gg=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?Wm`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${dg} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:Wm`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,_g=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,Z.jsxs)(fg,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,Z.jsxs)(pg,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,Z.jsx)(gg,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,Z.jsx)(mg,{"aria-hidden":`true`,children:n.icon}),(0,Z.jsx)(hg,{children:n.label})]},n.id)}),(0,Z.jsxs)(pg,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,Z.jsx)(mg,{"aria-hidden":`true`,children:`⋯`}),(0,Z.jsx)(hg,{children:`More`})]})]})},vg=`calc(${ug} + env(safe-area-inset-bottom))`,yg={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},bg=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&yg[e];return i?r?n.color.disabled:n.color[i]:t},xg={white:`255, 255, 255`,darkgrey:`169, 169, 169`},Sg=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},Cg=e=>e?e.startsWith(`#`)?Sg(e):xg[e]??`255, 255, 255`:`255, 255, 255`,wg=Zm`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,Tg=e=>Math.min(100,Math.max(0,e??0)),Eg=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=Tg(t),l=Tg(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return Wm`
    background: linear-gradient(
      to right,
      ${o}${u} 0%,
      ${o}${u} ${c}%,
      ${s}${d} ${c}%,
      ${s}${d} ${l}%,
      transparent ${l}%,
      transparent 100%
    ), ${a.color.surfaceSunken};
  `},Q=X.button.withConfig({shouldForwardProp:e=>e!==`variant`})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95em;
  font-weight: 600;
  margin: 0;
  padding: 0.5em 0.9em;
  border-radius: 6px;
  color: ${bg};
  border: 1.5px solid ${bg};
  background: ${e=>e.theme.color.surfaceSunken};
  ${Eg}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>Cg(bg(e))};
  animation: ${e=>e.$pulse&&!e.disabled?Wm`${wg} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${bg};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Dg=X.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,Og=X.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,kg=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,$=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,Z.jsx)(Og,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!kg.test(n)?(0,Z.jsx)(Og,{children:n}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Dg,{children:n.slice(0,r+1)}),(0,Z.jsx)(Og,{children:n.slice(r+1)})]})},Ag=X.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,jg=X.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.82);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(1.5rem + env(safe-area-inset-top)) calc(1rem + env(safe-area-inset-right))
    calc(1.5rem + env(safe-area-inset-bottom)) calc(1rem + env(safe-area-inset-left));
  position: fixed;
  right: 0;
  top: 0;
  z-index: 960;
`,Mg=X(mh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,Ng=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,Pg=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,Fg=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,Z.jsx)(jg,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,Z.jsxs)(Mg,{$raised:!0,children:[(0,Z.jsx)(Ng,{id:n,children:`Save not compatible`}),(0,Z.jsx)(Pg,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,Z.jsx)(Q,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},Ig=1e80,Lg=30,Rg=20,zg=2**53-1,Bg=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],Vg=[1,2,5],Hg=Object.fromEntries(Bg.map(e=>[e.id,e])),Ug=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],Wg=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>Vu(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>hd(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:zd,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:Rd,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:Ld,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:md,isOn:e=>e.autoOverclockEnabled??!0}],Gg=Object.fromEntries(Wg.map(e=>[e.key,e])),Kg=(e,t)=>!!Gg[t]?.isOn(e),qg=e=>new Date(e).toISOString().slice(0,10),Jg=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},Yg=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},Xg=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},Zg=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),Qg=(e,t)=>{let n=Wg.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},$g=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},e_=e=>e.startBytes*8,t_=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,n_=(e,t,n)=>{let r=$g(t,n.levers);return t_(e)===t_(r)?r:{...r,resources:{...r.resources,[O]:e_(n)}}},r_={buyTier:{make:e=>Oi(e,zg)},tierTickspeed:{make:e=>Ku(e)},clockSpeed:{make:()=>_d},scaleUp:{make:()=>Md},overclock:{make:()=>Nd},restage:{make:e=>Vd(e)},automation:{make:e=>Object.hasOwn(Gg,e?.key??``)?Gg[e.key].set(!!e.enabled):e=>e}},i_=b[b.length-1],a_=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${R(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${R(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${i_.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),o_=Object.fromEntries(a_.map(e=>[e.key,e])),s_=Object.fromEntries(a_.map(e=>[e.key,0])),c_={balance:0,clock:0,owned:{},purchaseLevels:{}},l_=(e,t=e)=>({...e,runPeaks:Ar(e.runPeaks??c_,t)}),u_=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=br(t)??0;return a!==(br(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},d_=(e,t,n,r)=>{let i=e.game,a=n_(i,l_(yi(n,zg)(i)),t);return r&&t_(i)!==t_(a)&&r(a),{game:a,metrics:u_(i,a,e.metrics)}},f_=(e,t,n,r,i)=>{let a=e.game,o=r_[n].make(r)(a);if(o===a)return e;let s=n_(a,l_({...o,runPeaks:a.runPeaks},o),t);return i&&t_(a)!==t_(s)&&i(s),{game:s,metrics:u_(a,s,e.metrics)}},p_=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],m_=(e,t,n)=>{let r=e;for(let e=0;e<Rg;e++){let e=r;for(let[r,i]of p_)e=f_(e,t,r,i,n);if(e===r)break;r=e}return r},h_=e=>({...e,runPeaks:Ar(c_,e)}),g_=e=>({game:e,metrics:u_(e,e,s_)}),__=(e,t,n,r,i)=>{let a=m_(g_(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=m_(d_(a,t,n,i),t,i),o.push(a.metrics);return o},v_=(e,t=0)=>e.map(e=>[t,e,!0]),y_=[v_([`scaleUp`,`restage`,`overclock`]),v_([`scaleUp`,`restage`]),[...v_([`scaleUp`,`restage`]),...v_([`overclock`],1)],[...v_([`scaleUp`,`restage`]),...v_([`overclock`],2)],[...v_([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...v_([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],v_([`overclock`,`restage`])],b_=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},x_=(e,t,n,r,i)=>{let a=g_(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=d_(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=f_(a,t,e,n);o.push(a.metrics)}return o},S_=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},C_=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:br(e)??0}),w_=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=S_(n,e);if(t>i)return t}return null},T_=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(S_(t/e,1));if(i>n&&i<t)return i}let i=r(S_(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},E_=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},D_=(e,t,n)=>{let r=Hg[t],i=n===`fallback`,a=Yg(`${e}|${t}|v8|${n}`),o=Xg(a),s=i?1e6:Vg[Math.floor(o()*Vg.length)]*10**Zg(o,r.startExponent),c=[];if(!i){let e=[...Ug],t=Zg(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:Qg(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:Zg(o,r.warmupSeconds.map(e=>e/Lg))*Lg,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:8,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>Ug.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=Dt();v.resources={...v.resources,[O]:e_(_)};for(let e of u)v=Gg[e].unlock(v);v=h_($g(v,l));let y=v;__(v,_,Lg,f/Lg,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=n_(y,Gg[e].set(!1)(y),_);y=h_(y);let b=[g_(y).metrics];for(let e=g_(y),t=0;t<p;t++)e=d_(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?a_:E_(o,a_),C=(e,t)=>{let n=w_(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=T_(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=y_.map(e=>b_(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:x_(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=Ig);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=__(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:C_(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},O_=new Map,k_=(e,t)=>{let n=`${e}|${t}`,r=O_.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=D_(e,t,n);r??=D_(e,t,`fallback`),O_.size>64&&O_.clear(),O_.set(n,r)}return r},A_=(e,t)=>k_(e,t).def,j_=e=>de.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),M_=e=>e.metrics?.[e.def.objective?.key]??0,N_=e=>M_(e)>=e.def.objective?.target,P_=e=>{let t=e.def.objective;if(!t)return 0;let n=M_(e);if(n>=t.target)return 1;if(!o_[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},F_=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),I_=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=N_(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||M_(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=F_(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},L_=(e,t)=>n=>{if(!j_(n)||!Hg[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=k_(qg(t),e);return F_(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:g_(i).metrics})},R_=e=>t=>t.daily.runs[e]?F_(t,e,null):t,z_=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===qg(n)},B_=(e,t)=>n=>z_(n,e,t)?L_(e,t)(R_(e)(n)):n,V_=e=>t=>{let n=t;for(let t of Bg){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==8){n=F_(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=d_(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=I_(F_(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},H_=(e,t,n,r)=>i=>{if(!Object.hasOwn(r_,t))return i;let a=V_(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=f_(s,o.def,t,n);return c===s?a:I_(F_(a,e,{...o,...c}),e,r)},U_=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},W_=X.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.72);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(1.5rem + env(safe-area-inset-top)) calc(1rem + env(safe-area-inset-right))
    calc(1.5rem + env(safe-area-inset-bottom)) calc(1rem + env(safe-area-inset-left));
  position: fixed;
  right: 0;
  top: 0;
  z-index: 950;
`,G_=X(mh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,K_=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,q_=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,J_=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,Y_=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,Z.jsx)(W_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,Z.jsxs)(G_,{$raised:!0,children:[(0,Z.jsx)(K_,{id:d,children:t}),(0,Z.jsx)(q_,{children:n}),(0,Z.jsxs)(J_,{children:[(0,Z.jsx)(Q,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,Z.jsx)(Q,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},X_={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},Z_=e=>wu(e)>0,Q_=e=>Z_(e),$_=(e,t)=>t<wu(e),ev=(e,t)=>t<=wu(e),tv=(e,t=0)=>{let n=yu(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*Fe[e.type].durationSeconds;return`${X_[e.type]??e.type} ×${Fe[e.type].multiplier} (${wi(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${Cu(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},nv=Wm`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${Zm`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,rv={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},iv=e=>wi(e).replace(/ 0[ms]$/,``),av=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,ov=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,sv=X.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,cv=`2.8em`,lv=X(ov)`
  flex: 0 0 ${cv};
  width: ${cv};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,uv=X.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${cv};
  width: ${cv};
`,dv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,fv=X.div`
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(max-content, 1fr) minmax(0, auto) minmax(max-content, 1fr);
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  padding: 0.45em 0.75em;
  border-radius: ${e=>e.theme.radius.sm};
  border: 1px solid ${e=>e.theme.color.warn};
  background: linear-gradient(
    to right,
    color-mix(in srgb, ${e=>e.theme.color.warn} 28%, transparent) ${e=>e.$fill}%,
    ${e=>e.theme.color.surfaceRaised} ${e=>e.$fill}%
  );
  color: ${e=>e.theme.color.text};
  font-size: 0.85em;
  font-variant-numeric: tabular-nums;
  opacity: ${e=>e.$waiting?.7:1};
`,pv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,mv=X.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,hv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,gv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,_v=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},vv=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=rv[r]??{icon:`⚡`,label:r},s=_u(r,i[0]),c=gu(r,i[0]),l=_v(i),u=l.length-1;return(0,Z.jsx)(dv,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=av(e.tierIndex);return(0,Z.jsxs)(sv,{children:[i===u?ju(t,r)?(0,Z.jsx)(lv,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↩`})}):(0,Z.jsx)(lv,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!Nu(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`✕`})}):(0,Z.jsx)(uv,{"aria-hidden":`true`}),(0,Z.jsxs)(fv,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${av(e.tierIndex,`name`)}, ${wi(f)}${l?` once it starts`:` left`}`,children:[(0,Z.jsx)(pv,{children:`${e.count}x`}),(0,Z.jsx)(mv,{children:`${m} ${o.icon} ×${c}`}),(0,Z.jsx)(hv,{children:wi(f)})]}),i===0?(0,Z.jsx)(lv,{"aria-label":`stack the ${o.label} compute boost`,disabled:!ku(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${iv(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`+`})}):(0,Z.jsx)(uv,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},yv=({state:e,actions:t})=>{let n=yu(e.intro??{});return n.length===0?null:(0,Z.jsx)(gv,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,Z.jsx)(vv,{lane:n,state:e,actions:t},n.type))})},bv=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,Z.jsx)(Y_,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,Z.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},xv=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},Sv=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,Cv=e=>`Unlocks at Purge ${Vr(e)}`,wv=e=>`${e.id} · ${e.target} · ${e.codename}`,Tv=(e,t)=>t-e%t,Ev=e=>{let t=Er(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${xv(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${xv(Tv(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${xv(Tv(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${xv(Math.ceil(Tv(n,30)))}`];case`bitRot`:return[`Corruption ${It(Rr(e))} vs ${It(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},Dv=X.section`
  align-items: center;
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm} ${e=>e.theme.space.md};
  justify-content: space-between;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.md};
`,Ov=X.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  padding: 0;
  text-align: left;
  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.warn};
    outline-offset: 2px;
  }
`,kv=X.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,Av=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,jv=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=Er(e);if(!a)return null;let o=xv(e.challenges.activeSeconds);return(0,Z.jsxs)(Dv,{"aria-label":`active challenge banner`,children:[(0,Z.jsxs)(kv,{children:[(0,Z.jsxs)(Ov,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,Z.jsx)(Av,{children:a.rule}),(0,Z.jsxs)(Av,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,Sv(a.goal)]}),Ev(e).map(e=>(0,Z.jsx)(Av,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,Z.jsx)(bv,{challenge:a,onExit:t})]})},Mv=X.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,Nv=Object.freeze({removeAds:!1}),Pv=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>Nv}),Fv=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return Pv();let n=null,r=null,i=null,a=Nv,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},Iv=null,Lv=()=>(Iv??=Fv({loadAds:null,loadIap:null}),Iv),Rv=1e4,zv=400,Bv=100,Vv=X.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(1.5rem + env(safe-area-inset-top)) calc(1rem + env(safe-area-inset-right))
    calc(1.5rem + env(safe-area-inset-bottom)) calc(1rem + env(safe-area-inset-left));
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 900;
`,Hv=X(mh).attrs({role:`status`,"aria-live":`polite`})`
  align-items: center;
  max-width: 26rem;
  opacity: ${e=>+!e.$fading};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${zv}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Uv=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Wv=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,Gv=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=Lv()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+Rv}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+Rv})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,Bv);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,zv);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&Si(e.elapsedRealSeconds,e.capSeconds)>0;return(0,Z.jsx)(Vv,{children:(0,Z.jsxs)(Hv,{"aria-label":`offline progress notice`,$fading:c,children:[(0,Z.jsxs)(Uv,{children:[`Resumed from sleep! You were away for `,wi(e.elapsedRealSeconds),` — simulated `,wi(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,Z.jsxs)(Wv,{children:[f&&(0,Z.jsx)(Q,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,Z.jsxs)(Q,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},Kv=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,qv=Wm`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Jv=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,Yv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Xv=Zm`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Zv=X(mh)`
  display: grid;
  grid-template-areas:
    'name upgrade buy'
    'details details details';
  grid-template-columns: minmax(0, 1fr) 6.5rem 9rem;
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  row-gap: 0;
  padding: 3px ${e=>e.theme.space.xs} 3px ${e=>e.theme.space.md};
  border-left: 3px solid ${e=>e.$accent};
  transition: border-color ${e=>e.theme.motion.duration.base} ${e=>e.theme.motion.easing.standard};
  animation: ${e=>e.$animateReveal?Wm`${Xv} 0.4s ease-out`:`none`};
  ${e=>e.$boosted&&nv}

  &:hover {
    border-color: ${e=>e.theme.color.borderStrong};
    border-left-color: ${e=>e.$accent};
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.$accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  /* Layout-class breakpoints (theme/layout.js, #1152) are 600/900/1360px; these 40rem/24.5rem/21rem
     phone-density literals don't map to them, so they stay as-is (no visual change). */
  @media (max-width: 40rem) {
    /* Same areas as desktop; narrower fixed button tracks for phone widths. */
    grid-template-columns: minmax(0, 1fr) 5.7rem 7.9rem;
    column-gap: 6px;
    padding: 3px 3px 3px ${e=>e.theme.space.sm};
  }

  @media (max-width: 24.5rem) {
    grid-template-columns: minmax(0, 1fr) 5.9rem 7.3rem;

    /* Symbol stacks over the owned count so the count gets the full name track (both lines
       together are still shorter than the 2rem buttons, so the row height is unchanged). */
    & > div:first-child {
      flex-direction: column;
      align-items: flex-start;
    }

    & h3 {
      font-size: ${e=>e.theme.type.scale.sm.size};
      line-height: 1.1;
    }

    & h3 > span {
      min-width: 0;
    }
  }

  @media (max-width: 21rem) {
    grid-template-columns: minmax(0, 1fr) 5.9rem 6.9rem;
    column-gap: 4px;

    & button > span:first-child {
      padding-right: 0.25em;
    }

    & button {
      font-size: 0.7rem;
      padding: 0 0.35em;
    }
  }
`,Qv=e=>Wm`
  --feature-button-width: 9rem;
  align-items: center;
  border-left: 3px solid ${e};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--feature-button-width);
  padding: 0.3rem ${e=>e.theme.space.xs} 0.3rem ${e=>e.theme.space.md};
  row-gap: 0.4rem;

  > details {
    min-width: 0;
  }

  > button {
    width: var(--feature-button-width);
  }

  &:has(> details[open]) {
    grid-template-columns: minmax(0, 1fr);

    > button {
      justify-self: end;
    }
  }

  h2 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1rem;
    line-height: 1.2;
    margin: 0;
  }

  @media (max-width: 40rem) {
    --feature-button-width: 7.9rem;
    column-gap: 6px;
    padding: 0.3rem 3px 0.3rem ${e=>e.theme.space.sm};
  }

  @media (max-width: 24.5rem) {
    --feature-button-width: 7.3rem;
  }

  @media (max-width: 21rem) {
    --feature-button-width: 6.9rem;
    column-gap: 4px;
  }
`,$v=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,ey=X.div`
  align-items: baseline;
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
  max-width: 100%;
  min-width: 0;

  h2 {
    white-space: nowrap;
  }
`,ty=X(mh)`
  ${Qv(`#0e7490`)}
`,ny=X(mh)`
  ${Qv(`#1d4ed8`)}
`,ry=X(mh)`
  ${Qv(`#8b5cf6`)}
`,iy=X(mh)`
  ${Qv(`#c2410c`)}
`,ay=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,oy=X(mh)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&Wm`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&Wm`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,sy=X.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,cy=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,ly=X.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,uy=X(Mv)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,dy=X(cy)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,fy=X.div`
  position: relative;
`,py=X.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,my=X.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,hy=X.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,gy=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${vg};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,_y=X.div`
  ${e=>Eg({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,vy=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,yy=X(oy)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,by=X.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,xy=X.div`
  background: ${e=>e.theme.color.page};
  display: flex;
  flex-direction: ${e=>e.$compressed?`row`:`column`};
  gap: ${e=>e.$compressed?`0.5rem`:`0.6rem`};
  position: sticky;
  top: ${e=>e.$belowBar?`${e.$belowBarHeight}px`:`env(safe-area-inset-top)`};
  z-index: 100;
  /* Promotes this sticky element to its own compositor layer so Chromium repaints it via GPU
     compositing while scrolling instead of repainting from scratch each frame — without this, a
     sticky element with a background fill (needed here so scrolled tier rows don't show through
     the gap between the two cards) can visibly flicker/flash during scroll. */
  will-change: transform;

  ${e=>e.$compressed&&Wm`
    box-shadow: ${e.theme.shadow.md};
    padding: 0.25rem 0;

    ${oy} {
      flex: 1;
      gap: 0.2rem;
      justify-content: center;
      min-width: 0;
      padding: 0.3rem 0.6rem;
    }

    /* CenteredCard's align-items: center (needed to center these cards' content when expanded)
       otherwise lets a flex-column child shrink-wrap to its own full content width instead of the
       card's allotted share — silently defeating the overflow/ellipsis rules below and letting a
       long balance or PP status string visually spill into the neighboring card. An explicit
       width pins each child to the card's actual width so truncation has something to truncate
       against. */
    ${Mv} {
      font-size: 1em;
      overflow: hidden;
      padding: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    p {
      font-size: 0.85em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  `}
`,Sy=X.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,Cy=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,wy=X.div`
  grid-area: details;
  font-size: ${e=>e.theme.type.scale.xs.size};
  line-height: ${e=>e.theme.type.scale.xs.lineHeight};
  margin-top: ${e=>e.theme.space.xs};
  padding-top: ${e=>e.theme.space.xs};
  border-top: 1px solid ${e=>e.theme.color.border};

  ul {
    color: ${e=>e.theme.color.textMuted};
    margin: ${e=>e.theme.space.xs} 0 0;
    padding-left: 1.1rem;
  }

  li {
    margin: 0.15rem 0;
  }
`,Ty=X.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.92);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(${e=>e.theme.space[`2xl`]} + env(safe-area-inset-top))
    calc(${e=>e.theme.space.lg} + env(safe-area-inset-right))
    calc(${e=>e.theme.space[`2xl`]} + env(safe-area-inset-bottom))
    calc(${e=>e.theme.space.lg} + env(safe-area-inset-left));
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`,Ey=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.borderStrong};
  border-radius: ${e=>e.theme.radius.lg};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 28rem;
  padding: ${e=>e.theme.space.xl} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;

  h2 {
    color: ${e=>e.theme.color.warn};
    font-family: ${e=>e.theme.font.display};
    font-size: ${e=>e.theme.type.scale.xl.size};
    font-weight: 700;
    line-height: ${e=>e.theme.type.scale.xl.lineHeight};
    margin: 0 0 ${e=>e.theme.space.md};
  }

  ul {
    color: ${e=>e.theme.color.textMuted};
    font-size: ${e=>e.theme.type.scale.sm.size};
    line-height: ${e=>e.theme.type.scale.sm.lineHeight};
    margin: ${e=>e.theme.space.lg} 0 ${e=>e.theme.space.xl};
    padding-left: 1.25rem;
    text-align: left;
  }

  li {
    margin: 0.3rem 0;
  }
`,Dy=X.div`
  align-items: center;
  background: ${e=>e.theme.color.surfaceRaised};
  border-bottom: 2px solid ${e=>e.theme.color.warn};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  left: 0;
  padding: calc(${e=>e.theme.space.sm} + env(safe-area-inset-top))
    calc(${e=>e.theme.space.lg} + env(safe-area-inset-right))
    ${e=>e.theme.space.sm}
    calc(${e=>e.theme.space.lg} + env(safe-area-inset-left));
  position: fixed;
  right: 0;
  top: 0;
  z-index: 900;
`,Oy=X.div`
  height: ${e=>e.$height}px;
`,ky=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,Ay=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,jy=X.h3`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  line-height: ${e=>e.theme.type.scale.lg.lineHeight};
  font-weight: 700;
  flex-shrink: 0;
  margin: 0;

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.md.size};
    line-height: ${e=>e.theme.type.scale.md.lineHeight};
  }
`,My=X.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,Ny=X.details`
  summary {
    cursor: pointer;
    list-style: none;
    user-select: none;
    width: fit-content;
    max-width: 100%;
    border-radius: ${e=>e.theme.radius.sm};
  }

  summary:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary h2 {
    display: inline;
    margin: 0;
  }

  /* A summary holding a CardTitleGroup spans the card so its effect can sit at the right edge; only
     the name itself stays clickable (the empty gap must not toggle the disclosure). */
  summary:has(${ey}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${ey}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`,Py=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  margin: 0;
  ${qv}

  @media (max-width: 24.5rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    line-height: 1.15;
  }
`,Fy=X(Q)`
  grid-area: buy;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  min-height: 2rem;
  padding: 0 0.6em;
  ${qv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,Iy=X(Dg)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,Ly=X.span`
  font-weight: 800;
`,Ry=X(Og)`
  flex: 1 0 auto;
  text-align: right;
`,zy=X(Q)`
  grid-area: upgrade;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  min-height: 2rem;
  padding: 0 0.5em;
  ${qv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.4em;
  }
`,By=(e,t)=>t===`base`?It(e):t===`bytes`?Lt(e):`${R(e)} ${E(t)}`,Vy=(e,t)=>Math.min(100,Math.round(e/t*100)),Hy=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),Uy=e=>Math.round((e-1)*100),Wy=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),Gy=(e,{precise:t=!1}={})=>e>=2?`${Hy(e)}x`:`+${t?Wy(e):Uy(e)}%`,Ky=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=Im(),{purge:s}=a,c=a.resources[O]>=zr(a),l=wr(a),u=a.prestigeDoublePpLevel??0,d=ln(a),f=cn(s.count,d),p=fi(a.resources[O],u),m=ni(a.resources[O],zr(a)),h=ri(a.resources[O]),g=Math.round(h*100),_=a.resources[O],y=zt(_),x=It(_),S=!!Er(a)&&Dr(a,Er(a).id),C=Sv(zr(a)),w=S?0:Math.max(1,p),T=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${C})`,k=S?`${T} — completes the challenge repeat, awards no Purge Points`:`${T} — awards +${R(w)} Purge Point${w===1?``:`s`}`,[A]=(0,v.useState)(()=>new Set(b.filter(e=>$r(a)(e)).map(e=>e.id))),[ee,j]=(0,v.useState)(()=>new Set),te=e=>j(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),M=(0,v.useRef)(null),N=(0,v.useRef)(new Map),ne=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;j(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return M.current=e,()=>e.disconnect()},[]);let re=e=>(ne.current.has(e)||ne.current.set(e,t=>{let n=M.current,r=N.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(N.current.set(e,t),n&&n.observe(t)):N.current.delete(e)}),ne.current.get(e)),[ie,P]=(0,v.useState)(!1),ae=()=>P(e=>!e),oe=Qr(a),se=Er(a),ce=e=>se?.effect===e,le=se?` — disabled by challenge ${se.id} ${se.codename}`:``,ue=s.count===0,de=!!e.buyUnitMode,fe=!!e.buyMaxMode&&ki(a)&&!de,pe=Vt(a),me=oe&&ue,he=oe&&!ue,F=!!se||he||!!e.goal||yu(a.intro??{}).length>0,I=Fr(a),ge=a.purchaseLevels?.[I.id]??1,_e=$r(a)(I),ve=gr(a),ye=a.purchaseLevels?.[ve.id]??1,be=a.scaleUpCount??0,xe=_r(a),Se=Math.max(0,ge-1),Ce=Math.max(0,ye-1),we=xe,Te=Vy(Ce,we),Ee=!oe&&Ce>=xe,De=b[b.indexOf(ve)+1]??null,Oe=De?.symbol===`TB`,ke=oi(a),Ae=Number.isInteger(ke)?String(ke):ke.toFixed(2),je=ke===2?`doubles`:`multiplies by ${Ae}`,[Me,Ne]=(0,v.useState)(_e);(0,v.useEffect)(()=>{_e&&Ne(!0)},[_e]);let Pe=br(a)??0,Fe=vr(a),Ie=Fe,Le=1+ai(a),Re=1+ai({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),ze=1+ct,Be=Vy(Se,Ie),Ve=!oe&&!ce(`overclockDisabled`)&&Se>=Fe,He=a.globalTickspeedMultiplier??null,Ue=He!==null,We=ii(a),Ge=$t(He??0),Ke=nn(a),qe=!oe&&!ce(`clockSpeedDisabled`)&&Ke&&tn(a),Je=an(a),Ye=a.owned[I.id]??0,Xe=a.lastTierXpConsumed??0,Ze=Math.floor(a.purge.xp??0),Qe=sn(Xe),$e=Vy(Ze,Qe),et=Je&&!oe&&!ce(`restageDisabled`)&&Ze>=Qe,tt=Gy(on(Ze)),nt=()=>{et&&window.confirm(`Restage: consume ${R(Ze)} XP for ${tt} faster ${I.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.${Ye>0?``:` You own no ${I.name}, so nothing will be left producing.`}`)&&t.consumeXpForLastTierTickspeed(Ze)},rt=Vy(a.resources.base??0,en(He??0)),[it,at]=(0,v.useState)(Ke);(0,v.useEffect)(()=>{Ke&&at(!0)},[Ke]);let ot=(0,v.useRef)(null);(0,v.useEffect)(()=>{me&&ot.current?.focus()},[me]);let st=(0,v.useRef)(null),[lt,ut]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=st.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>ut(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[me]);let dt=(0,v.useRef)(null),[ft,pt]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=dt.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>pt(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[he]),me?(0,Z.jsx)(Ty,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,Z.jsxs)(Ey,{children:[(0,Z.jsx)(`h2`,{children:`💾 Disk full`}),(0,Z.jsxs)(ky,{children:[`You've reached `,It(a.resources[O]),` — 1 Googol Bytes. All production has stopped.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Resets your resources, owned tiers, and purchases`}),(0,Z.jsxs)(`li`,{children:[`Awards `,R(p),` Purge Point`,p===1?``:`s`,` — spend them on the Firmware page for automation and production bonuses`]}),(0,Z.jsx)(`li`,{children:`Keeps your unlocked autobuyers and Purge Points`})]}),(0,Z.jsx)(Q,{ref:ot,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:(0,Z.jsx)($,{children:`✦ Purge Now`})})]})}):(0,Z.jsxs)(Kv,{children:[(0,Z.jsx)(jv,{onExit:t.exitChallenge,state:a}),he&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(Dy,{ref:dt,"aria-label":`purge available banner`,children:[(0,Z.jsxs)(ky,{children:[C,` reached — production has stopped.`]}),(0,Z.jsxs)(Q,{"aria-label":k,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,Z.jsx)(Dg,{children:`✦ `}),(0,Z.jsx)(Og,{children:S?`Complete challenge`:`Purge +${R(w)} PP`})]})]}),(0,Z.jsx)(Oy,{$height:ft})]}),(0,Z.jsx)(gy,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,Z.jsxs)(_y,{$percent:e.goal?e.goal.percent:m,children:[(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${C}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:m,"aria-valuemin":0,"aria-valuemax":100}),(0,Z.jsx)(vy,{children:e.goal?e.goal.label:`${m}% to Purge`})]})}),F?(0,Z.jsx)(Ag,{as:`h1`,children:`Byte Factory`}):(0,Z.jsx)(Jv,{children:(0,Z.jsx)(`h1`,{children:`Byte Factory`})}),(0,Z.jsx)(yv,{actions:t,state:a}),(0,Z.jsx)(Gv,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,Z.jsx)(Sy,{ref:st,"aria-hidden":`true`}),(0,Z.jsxs)(xy,{$compressed:lt,$belowBar:he,$belowBarHeight:ft,children:[(0,Z.jsxs)(oy,{$raised:!0,children:[(0,Z.jsxs)(fy,{children:[(0,Z.jsx)(sy,{"aria-controls":`global-multipliers-details`,"aria-expanded":ie,"aria-label":`money display`,onClick:ae,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ae())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,Z.jsx)(uy,{children:y})}),!lt&&y!==x&&(0,Z.jsx)(dy,{"aria-label":`balance in bits: ${x}`,children:x})]}),!lt&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(py,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(h-n)/.125));return(0,Z.jsx)(my,{children:(0,Z.jsx)(hy,{$fraction:r})},t)})}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":g,"aria-valuemin":0,"aria-valuemax":100})]}),ie&&!lt&&(0,Z.jsxs)(by,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!ue&&(0,Z.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${Gy(dn(a))} production speed from ${R(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${R(100)} PP on Firmware → Prestige)`]}),!ue&&(0,Z.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${Gy(f)} production speed from ${R(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${R(1)} PP on Firmware → Prestige)`]}),(0,Z.jsxs)(`li`,{children:[`Scale Up: `,be>0?`${be} activation${be===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${R(we)} completed levels on ${ve.name})`]}),it&&(0,Z.jsxs)(`li`,{children:[`Accelerate: `,Ue?`${Gy(We,{precise:!0})} faster ticks on every tier`:`not yet active`]}),Me&&(0,Z.jsxs)(`li`,{children:[`Overclock: `,Pe>0?`The per-level speed bonus is now ${Wy(Le)}% (was ${Wy(Re)}%)`:`not yet claimed (reach ${R(Ie)} completed levels on ${I.name})`]})]})]}),!ue&&(0,Z.jsx)(yy,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,Z.jsxs)(cy,{children:[(0,Z.jsxs)(ly,{children:[R(s.points),` PP`]}),d&&` · ${Gy(f)} production speed`]})})]}),(it||Je)&&(0,Z.jsxs)(ay,{children:[it&&(0,Z.jsxs)(ny,{"aria-label":`global accelerate panel`,children:[(0,Z.jsxs)(Ny,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(ey,{children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)($v,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,Wy(Le),`%/lvl`]})]})}),(0,Z.jsx)(Ay,{children:Ue?`${Gy(We,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,Z.jsxs)(Q,{"aria-label":Ue?`Upgrade Accelerate for ${Lt(Ge)} (currently ${Gy(We,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${Lt(Ge)}`,color:qe?`#3b82f6`:`darkgrey`,disabled:!qe,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${ce(`clockSpeedDisabled`)?le:``}`,type:`button`,$progress:rt,$progressColor:`#3b82f6`,$pulse:qe,children:[(0,Z.jsx)(Dg,{children:`🌐 `}),(0,Z.jsx)(Og,{children:Lt(Ge)}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":rt,"aria-valuemin":0,"aria-valuemax":100})]})]}),Je&&(0,Z.jsxs)(ry,{"aria-label":`restage panel`,children:[(0,Z.jsxs)(Ny,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(ey,{children:[(0,Z.jsx)(`h2`,{children:`Restage`}),(0,Z.jsxs)($v,{title:`Each XP consumed makes ${I.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[I.symbol,` +`,Uy(on(1)),`%/XP`]})]})}),(0,Z.jsxs)(Ay,{children:[Gy(on(Xe),{precise:!0}),` faster `,I.name,` ticks`,` `,`from `,R(Xe),` XP consumed. Next consumption needs at least `,R(Qe),` XP.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Restage: consume ${R(Ze)} XP for ${tt} ${I.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${ce(`restageDisabled`)?le:``}`,variant:`smart`,disabled:!et,onClick:nt,title:Ye>0?`Consume XP for a compounding +1% ${I.name} tickspeed per XP (min ${R(Qe)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${I.name} owned right now — Restaging now resets everything with nothing left producing`,type:`button`,$progress:$e,$pulse:et,children:[(0,Z.jsx)(Dg,{children:`🧬 `}),(0,Z.jsxs)(Og,{children:[R(Ze),` XP`]}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`${I.name} Restage progress`,"aria-valuenow":$e,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,Z.jsx)(Yv,{children:b.map((e,n)=>{if(!$r(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=Ei(a,e.id),c=Ti(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,p=Nr(a,e.id)??e,m=z(p,l,pe,d,c,2**53-1),h=de?Math.min(1,m):m,g=Gt(p,l,pe,d,1),_=h>0?Gt(p,l,pe,d,h):g,v=m>0&&!oe,y=d/pe*100,b=h/pe*100,x=a.tickspeedLevels?.[e.id]??1,S=Qt(x)*(e.id===I.id?on(a.lastTierXpConsumed??0):1),C=Gy(S),w=fr(l,dr(a)),T=mr(a,e.id),O=Math.floor(i*f*T*w*Mr(a,e.id)),k=e.producesResourceId===`base`?It(O):e.producesResourceId===`bytes`?Lt(O):`${R(O)} ${E(e.producesResourceId)}`,j=D(e.id),M=si(a,e.id),N=Uu(a,e.id,x+1),ne=Wu(a,e.id,x+1),ie=r>=ne&&!oe&&!Gu(a,e.id),P=fe?Ri(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ae=P.levels>0?`Buy ${R(P.levels)} full level${P.levels===1?``:`s`} for ${It(P.cost)} total; highest level costs ${It(P.partialQuantity>0?P.partialCost:P.lastLevelCost)}${P.partialQuantity>0?` (${P.partialQuantity} of ${pe} purchases toward the next level)`:``} (${R(u)} completed levels)`:`Buy${h>1?` ×${h}`:``} for ${It(_)} (${R(u)} completed levels, ${R(d)} of ${pe} purchased toward the next)`,se=`Tickspeed multiplier (+10% faster ticks) for ${By(N,e.id)}${ne>N+1?` (requires ${By(ne,e.id)} owned)`:``}`,ce=P.levels>0?`+${R(P.levels)}`:``,le=`⚙ ${By(N,e.id)}`,ue=Vy(r,ne),me=o.tierAccents[n%o.tierAccents.length],he=ee.has(e.id),F=`${e.id}-details`,ge=$_(a.intro,n);return(0,Z.jsxs)(Zv,{ref:re(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:me,$animateReveal:!A.has(e.id),$boosted:ge,children:[(0,Z.jsxs)(Cy,{children:[(0,Z.jsx)(jy,{children:(0,Z.jsxs)(My,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":he,"aria-controls":F,onClick:()=>te(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),te(e.id))},children:[(0,Z.jsx)(Ag,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,Z.jsxs)(Py,{title:`Owned`,children:[(0,Z.jsx)(Ag,{children:`Owned: `}),R(i)]})]}),he&&(0,Z.jsx)(wy,{id:F,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Production: +`,k,` per delivery`]}),(0,Z.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,Hy(j),`s`]}),(0,Z.jsxs)(`li`,{children:[`Effective tickspeed: every `,Hy(M),`s (tier ×`,Hy(S),`, global ×`,Hy(We),`)`]}),(0,Z.jsxs)(`li`,{children:[`Completed levels: `,R(u),` (`,R(d),`/`,pe,` purchased toward the next) — purchase milestone bonus: ×`,Hy(w),` from `,R(s),` lifetime purchases`]}),T>1&&(0,Z.jsxs)(`li`,{children:[`Scale Up bonus: ×`,Hy(T)]}),ge&&(0,Z.jsx)(`li`,{children:tv(a.intro,n)}),(0,Z.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,Z.jsxs)(zy,{"aria-label":se,variant:`success`,disabled:!ie,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${x} (${C} faster ticks) — the next level makes it 10% more`,$progress:ue,$pulse:ie,children:[(0,Z.jsx)($,{children:le}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":ue,"aria-valuemin":0,"aria-valuemax":100})]}),(0,Z.jsxs)(Fy,{"aria-label":ae,variant:`plain`,disabled:!v,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${pe} purchases) also multiplies it by ×${dr(a)}`,$progress:y,$secondaryProgress:b,$pulse:v,children:[(0,Z.jsxs)(Iy,{children:[`🛒 `,R(u),ce&&(0,Z.jsx)(Ly,{children:ce})]}),(0,Z.jsx)(Ry,{children:It(P.levels>0?P.partialQuantity>0?P.partialCost:P.lastLevelCost:_)}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":pe})]})]},e.id)})}),(0,Z.jsxs)(ay,{children:[(0,Z.jsxs)(ty,{"aria-label":`scale up panel`,children:[(0,Z.jsxs)(Ny,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(ey,{children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)($v,{title:`${ke===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,Ae,Oe?` · 🔓 TB`:``]})]})}),(0,Z.jsxs)(Ay,{children:[`Resets tiers and `,je,` production of every tier unlocked so far`,De?`, and unlocks ${De.name}`:``,`. Needs `,R(we),` completed `,ve.name,` levels.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Scale Up (requires ${we} completed ${ve.name} levels) — ${je} production for tiers unlocked so far${Oe?` and unlocks TB`:``}`,color:Ee?`#22d3ee`:`darkgrey`,disabled:!Ee,onClick:t.scaleUp,title:`Resets tiers, ${je} production for tiers unlocked so far${De?`, and unlocks ${De.name}`:``} — requires ${we} completed ${ve.name} levels`,type:`button`,$progress:Te,$progressColor:`#22d3ee`,$pulse:Ee,children:[(0,Z.jsx)(Dg,{children:`⏩ `}),(0,Z.jsxs)(Og,{children:[ve.symbol,` `,R(Ce),`/`,R(we)]}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":Te,"aria-valuemin":0,"aria-valuemax":100})]})]}),Me&&(0,Z.jsxs)(iy,{"aria-label":`overclock panel`,children:[(0,Z.jsxs)(Ny,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(ey,{children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)($v,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,Hy(10),`%/lvl`]})]})}),(0,Z.jsx)(Ay,{children:Pe>0?`The per-level speed bonus is now ${Wy(Le)}% (was ${Wy(Re)}%).`:`Not claimed yet — reach ${R(Ie)} completed ${I.name} levels. Each completed level then multiplies the per-level speed bonus by ×${ze}.`})]}),(0,Z.jsxs)(Q,{"aria-label":`Overclock (requires ${Ie} completed ${I.name} levels) — resets Scale Up's bonus; each completed ${I.name} level (${R(Se)} now) multiplies the per-level speed bonus by ×${ze}`,color:Ve?`#fb923c`:`darkgrey`,disabled:!Ve,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${I.name} level multiplies the per-level speed bonus by ×${ze} — requires ${Ie} completed levels${ce(`overclockDisabled`)?le:``}`,type:`button`,$progress:Be,$progressColor:`#fb923c`,$pulse:Ve,children:[(0,Z.jsx)(Dg,{children:`⚡ `}),(0,Z.jsxs)(Og,{children:[I.symbol,` `,R(Se),`/`,R(Ie)]}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":Be,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},qy=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Jy=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,Yy={"10m":`good`,"1h":`info`,"10h":`violet`},Xy=X(mh)`
  align-items: center;
  border-left: 3px solid ${e=>e.theme.color[Yy[e.$formatId]]??e.theme.color.accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${e=>e.theme.space.sm};
  row-gap: 0;
`,Zy=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Qy=X.span`
  cursor: pointer;
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  grid-area: label;

  &:focus-visible {
    border-radius: ${e=>e.theme.radius.sm};
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,$y=X.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  grid-area: text;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  > span {
    color: ${e=>e.theme.color.textMuted};
    font-size: ${e=>e.theme.type.scale.xs.size};
  }
`,eb=X(Q)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,tb=X.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color[Yy[e.$formatId]]??e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,nb=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,rb=X.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,ib=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,ab=X.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  height: 0.4rem;
  margin-top: 0.3rem;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,ob=X.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,sb=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},cb=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],lb=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=cb.map(e=>({group:e,missing:Wg.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},ub=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,db=X.button`
  background: ${e=>e.$on?e.theme.color.good:`transparent`};
  border: 1px solid ${e=>e.$on?e.theme.color.good:e.theme.color.border};
  border-radius: 999px;
  color: ${e=>e.$on?e.theme.color.surface:e.theme.color.textMuted};
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  min-height: 1.75rem;
  padding: 0.1rem 0.6rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,fb=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return cb.map(r=>{let i=Wg.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,Z.jsxs)(ub,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,Z.jsx)(ib,{as:`span`,children:r.title}),i.map(n=>{let i=Kg(e.game,n.key),a=`${r.title} ${n.label}`;return(0,Z.jsx)(db,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},pb=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${R(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,lb(e)].filter(Boolean).join(` · `),mb={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},hb=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(P_(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(mh,{"aria-label":`daily run ${e.id}`,children:[(0,Z.jsxs)(ob,{children:[(0,Z.jsxs)(qy,{children:[`Daily `,e.label]}),(0,Z.jsx)(Q,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,Z.jsxs)(ib,{children:[o.label,` · now `,R(s),` · `,sb(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,Z.jsxs)(ib,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),pb(t.def)&&(0,Z.jsx)(ib,{"aria-label":`daily run conditions`,children:pb(t.def)}),(0,Z.jsx)(ab,{$percent:a,children:(0,Z.jsx)(`span`,{})}),(0,Z.jsx)(fb,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,Z.jsx)(Ky,{game:c})]})},gb=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=qg(n),f=U_(e,d),p=i?e.daily.runs[i]:null;return p?(0,Z.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,Z.jsx)(hb,{actions:t,format:Bg.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,Z.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,Z.jsxs)(Jy,{children:[d,` · `,(0,Z.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,sb(Jg(n)/1e3)]})]}),(0,Z.jsx)(Zy,{children:Bg.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:A_(d,n.id),f=c.has(n.id),p=pb(l),m=r?`${o?`from ${r.def.dateId} · `:``}${sb(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(P_(r)*100)}%`:[i&&mb[i.lastOutcome],i?.bestSeconds!=null&&`best ${sb(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,Z.jsxs)(Xy,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,Z.jsx)(Qy,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,Z.jsxs)($y,{title:`${l.objective.label} · ${m}`,children:[(0,Z.jsx)(`strong`,{children:l.objective.label}),m&&(0,Z.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,Z.jsx)(eb,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,Z.jsx)(eb,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,Z.jsx)(tb,{$formatId:n.id,$percent:Math.round(P_(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(P_(r)*100),role:`progressbar`,children:(0,Z.jsx)(`span`,{})}),f&&(0,Z.jsxs)(nb,{children:[p&&(0,Z.jsx)(ib,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,Z.jsxs)(rb,{children:[!o&&(0,Z.jsx)(Q,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,Z.jsx)(Q,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,Z.jsx)(Y_,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?z_(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,Z.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},_b=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,vb=X.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,yb=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,bb={completed:Wm`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:Wm`
    border-color: ${e=>e.theme.color.warn};
  `,active:Wm`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:Wm``},xb=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,Sb=X.button`
  align-items: center;
  aspect-ratio: 1.25;
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  color: ${e=>e.theme.color.text};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font: inherit;
  gap: 1px;
  justify-content: center;
  min-width: 0;
  padding: 2px;
  ${e=>bb[e.$status]}
  ${e=>e.$selected&&Wm`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Cb=X.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,wb=X.span`
  color: ${e=>xb(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Tb=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,Eb=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Db=Object.fromEntries(b.map(e=>[e.name,e.symbol])),Ob={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},kb=e=>{if(e.automation?.kind===`global`)return Ob[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${Db[n]??n}`},Ab={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},jb=(e,t)=>Er(e)?.id===t.id?`active`:Dr(e,t.id)?`completed`:`available`,Mb=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=Dr(t,e.id);return(0,Z.jsxs)(Y_,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${wv(e)}?`,children:[(0,Z.jsx)(`p`,{children:e.rule}),(0,Z.jsxs)(`p`,{children:[`Goal: `,Sv(e.goal),`, then Purge.`]}),(0,Z.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},Nb=({state:e,onStart:t,onExit:n})=>{let r=Er(e),i=N.filter(e=>le.has(e.id)).map(t=>{let n=Hr(e,t.id);return{def:t,unlocked:n,status:n?jb(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${Vr(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${xv(i).replace(` `,``)}`:kb(t)};return(0,Z.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,Z.jsxs)(mh,{children:[(0,Z.jsx)(_b,{children:`Factory challenges`}),(0,Z.jsxs)(vb,{"aria-label":`challenge counts`,children:[(0,Z.jsxs)(wb,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,Z.jsxs)(wb,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,Z.jsxs)(wb,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,Z.jsx)(yb,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,Z.jsxs)(Sb,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${Ab[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?wv(t):`${t.id} · ${t.target} · ${Cv(t)}`,type:`button`,children:[(0,Z.jsx)(Cb,{$status:r,children:t.id}),(0,Z.jsx)(wb,{$status:r,children:u(e)})]},t.id)})}),c&&(0,Z.jsxs)(Tb,{"aria-label":`challenge ${c.def.id}`,children:[(0,Z.jsxs)(`span`,{children:[c.unlocked?(0,Z.jsx)(`strong`,{children:wv(c.def)}):(0,Z.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,Z.jsx)(Eb,{children:c.def.rule}):(0,Z.jsxs)(Eb,{children:[`🔒 `,Cv(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,Z.jsx)(bv,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,Z.jsx)(Q,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${wv(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},Pb=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Fb=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,Ib=X.div`
  display: flex;
  gap: 0.5rem;
`,Lb=X(Q)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,Rb=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],zb=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=Im(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=j_(n),u=a===`daily`&&!l?`factory`:a;return(0,Z.jsxs)(Pb,{children:[(0,Z.jsx)(Fb,{children:(0,Z.jsx)(`h1`,{children:`Challenges`})}),(0,Z.jsx)(Ib,{role:`tablist`,"aria-label":`challenge types`,children:Rb.filter(e=>e.id!==`daily`||l).map(e=>(0,Z.jsxs)(Lb,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,Z.jsx)(Nb,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,Z.jsx)(gb,{actions:r,state:n}),(0,Z.jsx)(Mb,{def:s?N.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},Bb=`🏷️`,Vb=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,Hb=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Ub=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Wb=X.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,Gb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,Kb=Zm`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,qb=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,Jb=Zm`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,Yb=X.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${qb(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
  flex: 1 1 1.2rem;
  min-width: 0;
  max-width: 2rem;
  aspect-ratio: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  position: relative;
  border: 1.5px solid ${e=>e.$activeKind?qb(e):e.$full?e.theme.color.accent:e.$empty?e.theme.color.textMuted:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$pullEligible?e.theme.color.good:`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:e.$empty?e.theme.color.surfaceSunken:`transparent`};
  ${e=>e.$activeKind?`--disk-glow: ${qb(e)}; box-shadow: 0 0 0 1px var(--disk-glow), 0 0 10px 2px var(--disk-glow);`:``}
  ${e=>e.$queued?`border-style: dashed; border-color: ${e.theme.color.info};`:``}
  animation: ${e=>e.$activeKind&&!e.$paused?Jb:e.$pullEligible?Kb:`none`} 1.4s ease-in-out infinite;
  font: inherit;
  color: inherit;
  cursor: ${e=>e.$clickable?`pointer`:`default`};

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Xb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Zb=X.div`
  flex: 1 1 1.2rem;
  min-width: 0;
  height: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: ${e=>e.theme.radius.sm};
  border: 1.5px solid ${e=>e.$flushing?e.theme.color.info:e.$full?e.theme.color.accent:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$flushing?e.theme.color.info:`color-mix(in srgb, ${e.theme.color.accent} 30%, transparent)`:`transparent`};
  overflow: hidden;
  position: relative;
`,Qb=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,$b=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,ex=X.div`
  flex: 1 1 1.2rem;
  min-width: 0;
  /* The single full-width flush bar ($flushBar) spans roughly DISK_LADDER_SIZE_MULTIPLIER
     collecting segments' combined width; every segment and the flush bar share one thin height. */
  height: 0.75rem;
  border-radius: ${e=>e.theme.radius.sm};
  border: 1.5px solid ${e=>e.$active?e.theme.color.accent:e.theme.color.surfaceSunken};
  background: ${e=>e.$filled?`color-mix(in srgb, ${e.theme.color.accent} 30%, transparent)`:`transparent`};
  overflow: hidden;
  position: relative;
`,tx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,nx=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=Is(n,t),l=c!==null,u=La(n,t),d=Fs(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=W(t),g=qo(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=Bo(n),b=Io(n),x=t===y?U(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/Vo(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!Yo(n)||Math.max(0,(Ea(n,V(t))??0)-za(n,V(t)))<=0),O=Math.round(E*100),k=ss(n,t),A=k?ps(n,t):!1,ee=k?ds(k):0,j=k?fs(k):0,te=k&&k.segmentsCollected<10,M=k&&k.segmentsCollected>=10,N=_s(n,t)&&typeof e?.expediteDiskFill==`function`,ne=vs(n,t),re=ls(k).length>0,ie=Es(n,t),P=!!ie,ae=P&&ks(n,t),oe=P?Math.max(0,1-Os(ie)):1,se=P?t*oe:p,ce=As(t);return(0,Z.jsxs)(Vb,{children:[f?(0,Z.jsx)(Wb,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):ce?(0,Z.jsxs)(Hb,{children:[(0,Z.jsx)(Ub,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,Z.jsx)(Xb,{role:`group`,"aria-label":P?`${h} read cache flushing to disk${ae?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,se-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,Z.jsx)(Zb,{"aria-label":P?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:P?ae?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(ie.remainingSeconds/ja(n,V(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:P&&(a||o>0),children:o>0?(0,Z.jsx)(Qb,{$fill:o,$flushing:P}):null},r)})})]}):null,k&&!f?(0,Z.jsxs)(Hb,{children:[(0,Z.jsxs)(Ub,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,Z.jsx)($b,{role:`progressbar`,"aria-label":M?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((M?j:ee)*100),children:te?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=ds(k),i=t<n,a=t===n&&r>0;return(0,Z.jsx)(ex,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?re?`Collecting from smaller disks and Staging`:`Filling from Staging`:ne?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,Z.jsx)(ex,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,Z.jsx)(tx,{$fill:j})})})]}):null,(0,Z.jsxs)(Hb,{children:[(0,Z.jsx)(Ub,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,Z.jsx)(Gb,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&N,g=o&&!p&&ne&&r===i;return(0,Z.jsx)(Yb,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${os(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?ce?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},rx=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,ix=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,ax=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,ox=X.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,sx=X.h4`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.space.xs};
  margin: 0;
  min-width: 0;
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-weight: 700;
  color: ${e=>e.theme.color.text};
`,cx=X.span`
  flex-shrink: 0;
`,lx=X.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,ux=X.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
  font-variant-numeric: tabular-nums;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;

  & > p {
    text-align: left;
  }
`,dx=X.span`
  position: absolute;
  left: 50%;
  /* With the collapsed header's bar below, center on the title + sub rows only (bar = 4px + 0.3rem margin). */
  top: ${e=>e.$withBar?`calc(50% - 2px - 0.15rem)`:`50%`};
  transform: translate(-50%, -50%);
  pointer-events: none;
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  line-height: ${e=>e.theme.type.scale.lg.lineHeight};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-shadow: 0 0 2px ${e=>e.theme.color.surface};
`,fx=X.div`
  position: relative;
  width: 100%;
  height: 4px;
  margin-top: 0.3rem;
  border-radius: 2px;
  overflow: hidden;
  background: color-mix(in srgb, ${e=>e.theme.color.surfaceSunken} 70%, ${e=>e.theme.color.surface});

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${e=>e.theme.color.accent};
    transform-origin: left center;
    transform: scaleX(${e=>e.$fill??0});
  }
`,px=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,mx=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,hx=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:wi(t)},gx=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,_x=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,vx=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,yx=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,bx=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,xx=X.div`
  position: relative;
  flex: 1 1 1.2rem;
  min-width: 0;
  max-width: 2rem;
  aspect-ratio: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  border: 1.5px solid ${e=>e.$full?e.theme.color.accent:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:`transparent`};
`,Sx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Cx=X(Q)`
  /* Left padding gives back the 1px border so the pill's text lines up with the title above. */
  padding: 0 0.5rem 0 calc(0.5rem - 1px);
  min-height: 0;
  border-width: 1px;
  font-size: ${e=>e.theme.type.scale.xs.size};
  /* 12px line + 1px borders = the 14px of the pool tile's own second line. */
  line-height: 12px;

  &::before {
    content: '';
    position: absolute;
    inset: -6px -1px;
  }
  /* The pill's own padding must not shift its label off the lake's left/right text edges. */
  margin: 0 -0.5rem;
`,wx=X.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,Tx=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=G(e,n),a=Gs(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},Ex=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?Tx(t):[r];if(c.length===0)return null;let l=(0,Z.jsx)(ix,{children:c.map(n=>{let r=Ws(n),i=xc(n)(t),c=Ie[n-1]??`Cell`,l=Xc(n),u=qs(t,n),d=!Ks(t,n)&&We[Gs(t,n)+1],f=Uo(u*l,n),p=Uo(i*l,n),m=Zs(t,n),h=ec(t,n),g=tc(t,n),_=ic(t,n),v=cc(t,n),y=lc(t,n),b=sl(t,n),x=al(t,n),S=yc(t,n),C=ca(t,n),w=Hc(t,n),T=Pc(t,n),E=!T&&Fc(t,n),D=Vc(t,n),O=Wc(t,n),k=sc(t,n)*l,A=uc(t,n),ee=A&&rl(t,n),j=ee||A&&C&&Ea(t,n)>=wa(t,n)?ba(t,n)*(ee?ja(t,n):1)*vc(t,n):0,te=O||b&&!D&&!E&&!T,M=i*l,N=!te&&S&&!E&&j>0&&i<=u&&k<M?hx((M-k)/j):null,ne=S?v/100:0,re=(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(rx,{children:Bb}),p]}),ie=`${S?v:0}%`;return(0,Z.jsxs)(ax,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,Z.jsxs)(lx,{$flush:s,children:[(0,Z.jsxs)(ox,{children:[(0,Z.jsxs)(sx,{title:`${r} Data Lake — funds ${c}`,children:[(0,Z.jsxs)(cx,{"aria-hidden":`true`,children:[(0,Z.jsx)(rx,{children:`🏞️`}),r]}),(0,Z.jsx)(`span`,{children:`Lake`})]}),(0,Z.jsxs)(px,{title:`Current fill speed`,children:[`⚡ `,W(j),`/s`]})]}),(0,Z.jsxs)(ux,{children:[D?(0,Z.jsx)(gx,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:re}):E?(0,Z.jsx)(gx,{title:`${c} is already at the max — spend or charge it up first`,children:re}):w?(0,Z.jsx)(gx,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:re}):T?(0,Z.jsx)(Cx,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:re})}):S?(0,Z.jsx)(Cx,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:re})}):(0,Z.jsx)(gx,{title:`Build a ${W(l)} disk in Storage to unlock ${c} here`,children:re}),O?(0,Z.jsx)(Cx,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,Z.jsx)(Cx,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${W(x)} banked) to grow its capacity from ${f} to ${Uo(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⚡ Scale Out`})}):N?(0,Z.jsxs)(mx,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,N]}):null]}),s?(0,Z.jsx)(dx,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:ie}):(0,Z.jsx)(dx,{$withBar:!0,title:`Currently filled`,children:wo(Go(k,n))}),(0,Z.jsx)(fx,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:ne})]}),o&&(()=>{let e=S?rc(t,n):0,i=W(l);return(0,Z.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,Z.jsxs)(bx,{children:[(0,Z.jsx)(`span`,{children:`buffer`}),(0,Z.jsx)(`span`,{children:S?`${W(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,Z.jsx)(fx,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=ac(t,n),i=Uo(l*_.target,n);return(0,Z.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,Z.jsxs)(bx,{children:[(0,Z.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,Z.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,Z.jsx)(fx,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&Ve.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?ac(t,n):0,u=Uo(s,n);return(0,Z.jsxs)(vx,{children:[(0,Z.jsx)(yx,{"aria-hidden":`true`,children:u}),(0,Z.jsx)(_x,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,Z.jsx)(xx,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,Z.jsx)(Sx,{$fill:c})},t)})})]},e)}),o&&(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,sc(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,Z.jsxs)(Z.Fragment,{children:[a&&!s&&(0,Z.jsx)(wx,{}),l]}):(0,Z.jsx)(mh,{"aria-label":`Data Lakes`,children:l})},Dx=h(),Ox=X.div`
  position: fixed;
  z-index: 60;
  width: 17rem;
  max-width: calc(100vw - 16px);
  max-height: 60vh;
  overflow-y: auto;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.md};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  text-align: left;

  &:focus {
    outline: none;
  }
`,kx=X.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,Ax=X.dl`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px ${e=>e.theme.space.sm};
  margin: 0;

  dt {
    color: ${e=>e.theme.color.textMuted};
  }

  dd {
    margin: 0;
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
`,jx=X.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,Mx=8,Nx=6,Px=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-Mx-n,i=t.bottom+Nx,a=t.top-Nx-n,s=i<=r||a<Mx?Math.max(Mx,Math.min(i,r)):a,l=Math.max(Mx,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,Dx.createPortal)((0,Z.jsxs)(Ox,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:Mx,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,Z.jsx)(kx,{children:r}),(0,Z.jsx)(Ax,{children:i.map(({label:e,value:t})=>(0,Z.jsxs)(`div`,{style:{display:`contents`},children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),a&&(0,Z.jsx)(jx,{children:a})]}),document.body)},Fx=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,Ix=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,Lx=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,Rx=X.p`
  position: absolute;
  left: 50%;
  ${e=>e.$large?`top: 50%; transform: translate(-50%, -50%);`:`top: 0; transform: translateX(-50%);`}
  pointer-events: none;
  margin: 0;
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.$large?e.theme.type.scale.xl.size:e.theme.type.scale.md.size};
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 0 2px ${e=>e.theme.color.surface};
`,zx=X.button`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 2;
  border: 1.5px solid ${e=>e.theme.color.accent};
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surfaceSunken};
  color: ${e=>e.disabled?e.theme.color.disabled:e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled):not([aria-disabled='true']) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled):not([aria-disabled='true']) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`,Bx=({theme:e})=>Wm`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,Vx=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,Hx=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>Wm`
  button {
    background-color: ${Vx(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,Ux=X(mh)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${Bx}

  button {
    background-color: ${Vx};
    border: 0;
    border-radius: 0;
  }
`,Wx=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:wi(t)},Gx=(e,t,n)=>Yi(e,t,t,n),Kx=(e,t,n)=>{let r=Gx(e,t,n);return r===null?null:Wx(r)},qx=X.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,Jx=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,Yx=Zm`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,Xx=X.span`
  display: inline-block;
  animation: ${Yx} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Zx=X.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,Qx=X.span`
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  justify-self: start;
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-weight: 700;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,$x=X.span`
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  justify-self: start;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 360px) {
    font-size: 0.62rem;
  }
`,eS=X.span`
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: center;
  justify-self: center;
  font-family: ${e=>e.theme.font.display};
  /* Same size as the Data Lake's filled balance (LakeFilledText). */
  font-size: ${e=>e.theme.type.scale.lg.size};
  /* Like the pool/stream balance, the figure must not make the tile taller than its two text rows. */
  line-height: 1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  @media (max-width: 360px) {
    font-size: ${e=>e.theme.type.scale.md.size};
  }
`,tS=X.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,nS=X.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,rS=X(fx)`
  margin-top: 0;
`,iS=X.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,aS=X(mh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${Bx}
  ${e=>e.$boosted&&nv}
`,oS=X.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,sS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,cS=X(mh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${Bx}
  ${e=>e.$boosted&&nv}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`,lS=X.button`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: transparent;
  cursor: pointer;

  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: color-mix(in srgb, currentColor 10%, transparent);
  }

  &:active:not(:disabled) {
    background: color-mix(in srgb, currentColor 18%, transparent);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`,uS=X.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,dS=X.button`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.space.xs};
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  pointer-events: auto;
  border-radius: ${e=>e.theme.radius.sm};

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,fS=X.div`
  position: relative;
  width: 100%;
`,pS=X.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,mS=X.h3`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.space.xs};
  margin: 0;
  min-width: 0;
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-weight: 700;
  color: ${e=>e.theme.color.text};
`,hS=X.span`
  flex-shrink: 0;
`,gS=X(X.span`
  flex-shrink: 0;
  margin-left: auto;
  ${e=>e.$centered?`position: absolute; right: 0; top: 50%; transform: translateY(-50%);`:``}
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  color: ${e=>e.$color??e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`).attrs({as:`button`,type:`button`})`
  margin: 0 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  line-height: inherit;
  cursor: pointer;
  pointer-events: auto;
  border-radius: ${e=>e.theme.radius.sm};

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,_S=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${Eg}
  background-color: ${Vx};
`,vS=X(_S)`
  position: relative;
`,yS=X(_S)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,bS=X(_S)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,xS=(e,t,n,r=!0)=>{let i=po(t,n),a=i&&e>0&&e<i.divisor?po(e,n):i;return r?So(e,a):bo(e,a)},SS=(e,t,n=``)=>{let r=po(e,!0);return`${Co(e/r.divisor)} → ${Co(t/r.divisor)} ${r.symbol}${n}`},CS=(e,t)=>bo(e,po(e,t)),wS=5e3,TS=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),ES=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!TS(e))return;let t=setTimeout(()=>n(e),wS);return()=>clearTimeout(t)},[e,r]),t===e},DS=({bits:e,poolIndex:t,large:n})=>{let r=ES(Ko(e,t))?Go(e,t):Ko(e,t);return(0,Z.jsx)(Rx,{$large:n,children:r})},OS=e=>Math.min(100,Math.max(0,e)),kS=8,AS=X.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,jS=X.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,MS=X.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,NS=X.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,PS=X.div`
  position: relative;
  min-width: 0;
  height: ${kS}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,FS=X(X.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${e=>e.$widthPercent}%;
  border-radius: inherit;
  background: ${e=>e.theme.color.accent};
`)`
  background: ${e=>e.theme.color.warn};
`,IS=X.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,LS=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,Z.jsxs)(AS,{children:[(0,Z.jsxs)(jS,{children:[(0,Z.jsx)(rx,{children:`📦`}),e]}),o&&(0,Z.jsx)(PS,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,Z.jsx)(FS,{$widthPercent:a/100*100})}),o&&(0,Z.jsxs)(MS,{children:[`+`,Math.round(a),`% `,(0,Z.jsx)(IS,{children:`👆`})]}),!o&&r&&(0,Z.jsxs)(NS,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},RS=[[10,[229,72,77]],[100,[59,130,246]],[Ae,[48,164,108]]],zS=e=>{let t=RS.length-1;if(e<=RS[0][0])return`rgb(${RS[0][1].join(`,`)})`;if(e>=RS[t][0])return`rgb(${RS[t][1].join(`,`)})`;let n=RS.findIndex(([t])=>e<=t),[r,i]=RS[n-1],[a,o]=RS[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},BS=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=ES(xS(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=ao(o),f=ha(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${wo(To(e))}/s`,w=Gi(s),T=Su(s),E=s.byteCreated?C(na(s)):null,D=$i(s),O=Kx(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=Io(o),ee=Bo(o),j=Fo(o),te=H(o,j),M=Vo(o,j),N=V(j),ne=Math.max(0,Ea(o,N)-za(o,N)),re=zo(o),ie=Lo(o),P=Vi(s).toFixed(3),ae=Vi({...s,unlockedDiskSteps:Bi(s)+1}).toFixed(3),oe=W(Mo(Bi(s)+1)),se=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${oe} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${P} → ${ae}.`))&&n.unlockNextDiskSize()},ce=d?Jo(o):[],le=!A&&Yo(o),ue=s.diskBuild,de=!A&&!re&&Ba(o)&&!le&&!ue,fe=Math.min(M,U(o,j)),pe=Math.floor(fe+1e-9),me=fe>0||s.diskBuildQueued,he=ue?OS(100-ue.remainingSeconds/ue.totalSeconds*100):re?100:me?OS(fe/M*100):0,F=Is(o,j),I=Ka(o),ge=Ja(o),_e=!!s.capacityUpgradeQueued,ve=!!s.speedUpgradeQueued,ye=_e||ve,be=s.capacity,xe=qa(s),Se=s.capacity*2,Ce=CS(Se,!0),we=Ui(s),Te=Gi(we?{...s,capacity:Se}:{...s,speedCapacity:xe*2}),Ee=`${To(Te)}/s`,De=w>0?`×${Number((Te/w).toFixed(2))}`:``,Oe=OS(s.bits/8*100),ke=OS((s.capacityUpgradeProgress??0)/be*100),Ae=OS((s.speedUpgradeProgress??0)/xe*100),je=ve?Ae:ke,Me=ia(s),Ne=Me?.cost??0,Pe=Me?.progress??0,Fe=Me?.multiplierPercent??100,Ie=C(Me?.rate??0),Le=Me?.rate??0,Re=Wx(Le>0&&Ne>0?Math.max(0,Ne-Pe)/Le:1/0),ze=OS(s.bits/s.capacity*100),Be=()=>{le?n.provisionDisk():n.queueDiskBuild()},Ve=s.diskBuildQueued,He=`${pe}/${M}`,Ue=M>1||pe>0?` · ${He}`:``,We=`Provision ${W(j)} Disk`,Ge=!!Ve&&!ue&&!re&&!A,Ke=V(ee),qe=A?s.diskBuild?`waiting for build`:ua(o,Ke)?`waiting for earlier pool`:ba(o,Ke)<=0?`waiting for pool`:Ea(o,Ke)<=za(o,Ke)?`waiting for staging`:null:null,Je=ue?{icon:`🏗`,label:`Provisioning ${W(ue.size)} Disk`,status:`${Math.ceil(ue.remainingSeconds)}s left`}:re?{icon:`✅`,label:`All Pools Complete (${W(j)})`,status:null}:A?{icon:`🔁`,label:We,status:`Rebuilding ${W(ee)} first · ${qe??`automatic`}`}:Ve?{icon:`⏳`,label:`Provisioning ${W(j)} Disk`,status:`${pe>0?He:`Queued`} · ${le?ne>0?`building`:`waiting for staging`:de?`after disk fill`:`waiting for pool`}`}:le?{icon:`🏦`,label:We,status:`Ready · ${Bb} ${W(te)}${Ue}`}:{icon:`🏦`,label:We,status:`${Bb} ${W(te)}${Ue} · tap to queue`,reason:de?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},Ye=ja(o,A?Ke:N),Xe=100*Ye,Ze=(A?xa(o,Ke):ba(o,N))*Ye,Qe=`${wo(W(Ze))}/s`,$e=A&&ba(o,Ke)<=0,et=rs(o),tt=et.disksTotal>0?OS(et.disksDone/et.disksTotal*100):0,nt=et.seconds,rt=A?tt:he,it=Math.max(0,(M-fe)*j),at=Ma(o,N)*Aa(o,N)/100*Tu(s,N),ot=Math.min(it,ne),st=Ze>0?ot/Ze+(it-ot)/Math.max(Math.min(Ze,at),Number.MIN_VALUE):1/0,ct=A?Wx(nt):de?`—`:Wx(st),lt=d&&!re&&!ue&&Ze>0&&(A||Ve),ut=(0,Z.jsx)(Q,{"aria-label":`reformat to unlock disk size`,onClick:se,title:`Reformat the Byte Foundry to unlock ${oe} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${P} → ${ae}.`,type:`button`,variant:`prestige`,children:(0,Z.jsxs)(Jx,{children:[(0,Z.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,oe,` Disks`]}),(0,Z.jsx)(iS,{children:`Bitrate exponent ${P} → ${ae} · auto-rebuilds to your highs`})]})}),dt=ie?ut:(0,Z.jsxs)(Q,{"aria-label":ue?`disk array rebuilding`:re?`disk ladder complete`:`provision disk`,"aria-description":Je.reason?`${Je.status} (${Je.reason})`:Je.status??void 0,disabled:!!ue||re||A,onClick:Be,title:ue?`Provisioning ${W(ue.size)} — ${Math.ceil(ue.remainingSeconds)}s (array offline)`:re?`All ${sa()} storage pools are complete through ${W(j)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${W(ee)} now); ${W(j)} unlocks for provisioning once they are done`:Ve?`Armed — draws from the pool staging at the pool's fixed bandwidth${de?` once Disk Fill is done`:``} (${pe}/${M} passes so far)`:le?F?`Costs ${W(te)}, paid in ${M} pass${M===1?``:`es`} of ${W(j)} each (${pe}/${M} collected) — creates an empty ${W(j)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${F} level`:`Costs ${W(te)}, paid in ${M} pass${M===1?``:`es`} of ${W(j)} each (${pe}/${M} collected) — creates an empty ${W(j)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:de?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${pe}/${M} passes so far)`,type:`button`,variant:re||A?`neutral`:Ve?`smart`:le?`info`:`neutral`,$progress:rt,$pulse:Ge,children:[lt?(0,Z.jsxs)(Zx,{children:[(0,Z.jsxs)(Qx,{children:[Je.icon,` `,A?`Rebuilding`:`${W(j)} Disk…`]}),(0,Z.jsx)($x,{children:A?(()=>{let e=Mo(Bi(s)-1);return e>ee?`${W(ee)} → ${W(e)}`:`${W(ee)} disks`})():pe>0?He:`Queued`}),(0,Z.jsxs)(eS,{children:[Math.floor(rt),`%`]}),(0,Z.jsxs)(nS,{style:{color:zS(Xe),...A&&et.projected?{opacity:.55}:null},title:$e?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&et.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&et.projected?`~`:``,Qe]}),ct!==`—`&&(0,Z.jsxs)(tS,{style:et.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:et.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,et.projected?`~`:``,ct]})]}):(0,Z.jsxs)(Jx,{children:[(0,Z.jsxs)(`span`,{children:[Je.icon,` `,Je.label,Ge?`…`:``]}),Je.status&&(0,Z.jsx)(iS,{children:Je.status})]}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(rt),"aria-valuemin":0,"aria-valuemax":100})]}),ft=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&ye&&!!Me||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{ft||_(null)},[ft]);let pt=g===`stream`,mt=null;if(pt){let e=Qi(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=ba(o,e);mt=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:P},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...Me?[{label:`Upgrade bar drawing`,value:Ie}]:[],{label:`Buffer`,value:`${Math.floor(ze*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...ge&&!ye?[{label:`After Upgrade Bitrate`,value:`${Ee} (${De})`}]:[]]}let ht=g===`upgrade`&&!!Me,gt=ht?[{label:`Draw now`,value:Ie},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${To(Pe)} / ${To(Ne)}`},{label:`Time left`,value:Re},...Me.kind===`speed`?[{label:`Bitrate after`,value:SS(w,Te,`/s`)}]:[{label:`Capacity after`,value:SS(s.capacity,Se)},...we?[{label:`Bitrate after`,value:SS(w,Te,`/s`)}]:[]]]:null;return(0,Z.jsxs)(Fx,{children:[(0,Z.jsx)(Gv,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,Z.jsx)(Lx,{children:(0,Z.jsx)(Ix,{children:`🔥 Byte Foundry`})}),(0,Z.jsxs)(cS,{"aria-label":`Data Stream`,$boosted:Q_(s),children:[(0,Z.jsxs)(vS,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:ze,children:[s.mainGameUnlocked&&(0,Z.jsx)(lS,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,Z.jsxs)(uS,{children:[(0,Z.jsxs)(fS,{children:[(0,Z.jsxs)(pS,{children:[(0,Z.jsx)(mS,{children:(0,Z.jsxs)(`span`,{children:[(0,Z.jsx)(rx,{children:`🌊`}),`Data Stream`]})}),(0,Z.jsx)(Rx,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:xS(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,Z.jsxs)(gS,{ref:pt?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:zS(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":pt,"aria-controls":pt?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),pt&&(0,Z.jsx)(Px,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:mt})]}),(0,Z.jsx)(LS,{capacityText:CS(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&ye&&(0,Z.jsxs)(yS,{"aria-label":ve?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:ve?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${Ce} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,Z.jsxs)(Zx,{children:[(0,Z.jsxs)(Qx,{children:[(0,Z.jsx)(rx,{children:`⏫`}),`Upgrading`,(0,Z.jsx)(Xx,{children:`…`})]}),(0,Z.jsxs)($x,{children:[(0,Z.jsx)(rx,{children:ve?`⚡`:`📦`}),ve?SS(w,Te,`/s`):SS(s.capacity,Se)]}),(0,Z.jsxs)(eS,{children:[Math.floor(je),`%`]}),(0,Z.jsxs)(gS,{ref:ht?y:void 0,$color:zS(Fe),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Ie}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":ht,"aria-controls":ht?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Ie]}),ht&&(0,Z.jsx)(Px,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:Me.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:gt}),(0,Z.jsxs)(tS,{children:[`⏳ `,Re]})]}),(0,Z.jsx)(rS,{$fill:Math.min(1,Math.max(0,je/100)),"aria-hidden":`true`}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(je),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!ye)&&(0,Z.jsxs)(Hx,{children:[u&&(0,Z.jsxs)(Q,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:Oe,children:[(0,Z.jsx)($,{children:`🔗 Compile into a Byte`}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!ye&&(0,Z.jsx)(qx,{children:!ye&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`upgrade data stream capacity`,disabled:!I,onClick:n.pickIntroCapacityMilestone,title:I?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity${we?` and raises Bitrate with it`:``}`:`Capacity is already at its maximum`,"aria-description":I?`Costs ${To(be)}; capacity ${Ce}${we?` and bitrate ${Ee}`:``} after upgrading`:void 0,type:`button`,variant:I?`prestige`:`neutral`,children:(0,Z.jsxs)(Jx,{children:[(0,Z.jsx)(`span`,{children:we?`Upgrade`:`Upgrade Capacity`}),(0,Z.jsx)(iS,{children:I?`🏷️ ${To(be)} · 📦 ×2${we?` · ⚡ ${De}`:``}`:`📦 Max capacity`})]})}),!we&&(0,Z.jsx)(Q,{"aria-label":`upgrade data stream bitrate`,disabled:!ge,onClick:n.queueIntroSpeedUpgrade,title:ge?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${P} — upgrade Capacity first`,"aria-description":ge?`Costs ${To(xe)}; bitrate ${Ee} after upgrading`:void 0,type:`button`,variant:ge?`prestige`:`neutral`,children:(0,Z.jsxs)(Jx,{children:[(0,Z.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,Z.jsx)(iS,{children:ge?`🏷️ ${To(xe)} · ⚡ ${De}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,Z.jsx)(Ux,{"aria-label":`Provision Disk`,children:dt}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=Ma(o,r),a=Ea(o,r),c=wa(o,r),l=c>0?OS(a/c*100):0,u=a>=c,d=Aa(o,r),f=ka(o,r),p=Kx(a,c,i),_=rl(o,r),v=ce.filter(e=>V(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${wo(W(e))}/s`,D=E(i*d/100*Tu(s,r)),O=g===`pool-${r}`,k=null,A=ba(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=ba(o,t);let t=Oa(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*ja(o,r))}]:[]]}return(0,Z.jsxs)(aS,{"aria-label":`pool ${r}`,$boosted:ev(s,r),children:[(0,Z.jsxs)(bS,{$progress:l,children:[(0,Z.jsx)(lS,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,Z.jsxs)(uS,{children:[(0,Z.jsxs)(fS,{children:[(0,Z.jsxs)(pS,{children:[(0,Z.jsx)(mS,{children:(0,Z.jsxs)(dS,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,Z.jsxs)(hS,{"aria-hidden":`true`,children:[(0,Z.jsx)(rx,{children:`💧`}),T]}),(0,Z.jsx)(`span`,{children:`Pool`})]})}),(0,Z.jsx)(DS,{bits:a,poolIndex:r,large:f<=0}),(0,Z.jsxs)(gS,{ref:O?y:void 0,$centered:f<=0&&!p,$color:zS(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,Z.jsx)(Px,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,Z.jsx)(LS,{capacityText:Uo(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,Z.jsx)(oS,{children:(0,Z.jsx)(Ex,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,Z.jsxs)(sS,{children:[v.map(e=>(0,Z.jsx)(nx,{actions:n,size:e,state:o},e)),(0,Z.jsx)(Ex,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,Z.jsx)(zx,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},VS=X.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,HS=X.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,US=X.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,WS=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,GS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,KS=X(mh)`
  align-items: center;
  border-left: 3px solid ${e=>e.$accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'name boost buy'
    'details details details';
  grid-template-columns: minmax(0, 1fr) auto 9rem;
  padding: 3px ${e=>e.theme.space.xs} 3px ${e=>e.theme.space.md};
  row-gap: 0;

  @media (max-width: 40rem) {
    column-gap: 6px;
    grid-template-columns: minmax(0, 1fr) auto 7.9rem;
    padding: 3px 3px 3px ${e=>e.theme.space.sm};
  }

  @media (max-width: 24.5rem) {
    grid-template-columns: minmax(0, 1fr) auto 7.3rem;
  }
`,qS=Wm`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,JS=X.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,YS=X.span`
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: ${e=>e.theme.type.scale.md.lineHeight};
  min-width: 2.2rem;

  &:focus-visible {
    border-radius: ${e=>e.theme.radius.sm};
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,XS=X.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${qS}
`,ZS=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${qS}
`,QS=X(Q)`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${qS}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,$S=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,eC=Object.fromEntries(b.map(e=>[e.id,e])),tC=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=Mn(n),a=Cn(n),o=Im(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});return(0,Z.jsxs)(VS,{"aria-label":`compute flops screen`,children:[(0,Z.jsxs)(HS,{children:[(0,Z.jsx)(`h1`,{children:`🖥 Compute`}),(0,Z.jsx)(US,{"aria-label":`cumulative flops boost`,children:Fn(i)})]}),!a&&(0,Z.jsxs)(WS,{children:[`Unlocks at `,100,` PP — you have `,R(r),` PP.`]}),(0,Z.jsx)(GS,{"aria-label":`compute flops tiers`,children:ht.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=Pn(n,e.boostsTierId),d=Dn(e,c),f=On(n,e.id),p=eC[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(mt*100).toFixed(2);return(0,Z.jsxs)(KS,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,Z.jsxs)(JS,{children:[(0,Z.jsx)(YS,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,Z.jsxs)(XS,{title:`Owned`,children:[(0,Z.jsx)(Ag,{children:`Owned: `}),R(c)]})]}),(0,Z.jsxs)(ZS,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,Z.jsx)(QS,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${R(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${R(d)} PP for +${g}%/s on ${m}`:`Costs ${R(d)} PP — you have ${R(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,Z.jsxs)($,{children:[R(d),` PP`]})}),h&&(0,Z.jsxs)($S,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},nC=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,rC=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,iC=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,aC=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,oC=X.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,sC=X.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 1.9rem;
  position: relative;
  width: 100%;

  &::before {
    border-left: 2px dashed ${e=>e.theme.color.borderStrong};
    bottom: 0;
    content: '';
    left: 50%;
    position: absolute;
    top: 0;
  }

  > * {
    position: relative;
  }
`,cC=X.div`
  height: 0.6rem;
`,lC=X.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,uC=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,dC=X.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,fC=X.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,pC=X.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,mC=X.button`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.5rem;
  min-width: fit-content;
  border: none;
  border-radius: ${e=>e.theme.radius.sm};
  background: none;
  padding: 4px;
  cursor: pointer;
  color: inherit;
  font: inherit;
  text-align: left;

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,hC=X.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,gC=X.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,_C=X.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,vC=X.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,yC=X.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,bC=X.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,xC=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,SC=X(xC)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,CC=X(xC)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,wC=X.span`
  align-items: center;
  background: ${e=>{let t=e.$running?e.theme.color.warn:e.theme.color.accent,n=e.$running?100:Math.round(e.$fill*100);return`linear-gradient(90deg, color-mix(in srgb, ${t} 28%, ${e.theme.color.surfaceSunken}) ${n}%, ${e.theme.color.surfaceSunken} ${n}%)`}};
  border: 1px solid ${e=>e.$running?e.theme.color.warn:e.theme.color.borderStrong};
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.$running?e.theme.color.warn:e.theme.color.text};
  display: inline-flex;
  font-size: 0.78em;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  justify-content: center;
  min-height: 1.9rem;
  min-width: 3.9rem;
  padding: 0 0.6em;
  white-space: nowrap;
`,TC=X.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,EC=X.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1 1 0;
    min-width: 0;
  }
`,DC=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],OC=(e,t,n)=>e>=8&&t<n,kC=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=DC.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:yu(r)[0]?.queue[0]??1}),o=yu(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=r.computeMergePageUnlocked?i:1,u=(l?DC[l-1]:null)&&(0,Z.jsxs)(Z.Fragment,{children:[!r.computeMergePageUnlocked&&(0,Z.jsx)(TC,{title:`Boosts ${av(l,`name`)}`,children:`Boosts ${av(l)}`}),(0,Z.jsx)(EC,{role:`group`,"aria-label":`compute boost`,children:Object.keys(Fe).map(e=>{let i=gu(e,l),a=_u(e,l),o=rv[e].label,s=!!bu(r,e),c=`×${i} production, ${iv(a)}`;return(0,Z.jsx)(xC,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!Du(n,e,l),onClick:()=>t.activateComputeBoost(e,l),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`${rv[e].icon} ×${i} · ${iv(a)}`})},e)})})]});return(0,Z.jsxs)(nC,{children:[s?(0,Z.jsx)(Ag,{as:`h1`,children:`⚡ Power`}):(0,Z.jsx)(rC,{children:(0,Z.jsx)(iC,{children:`⚡ Power`})}),s&&(0,Z.jsx)(yv,{actions:t,state:n}),!s&&(0,Z.jsx)(TC,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,Z.jsx)(fC,{"aria-label":`boost`,children:u}),r.computeMergePageUnlocked?(0,Z.jsx)(oC,{"aria-label":`compute entities`,children:DC.map((e,i)=>{let o=i+1,s=r[e.countField]??0,d=!!e.autoFlagField,f=d?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=d&&!f&&p>=10,h=d?dl(n,e.autoFlagField):0,g=d&&!f&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=d?wc(n,e.mergeOutputField):10,S=d&&kl(n,i),C=d?Ec(n,o):0,w=d&&Oc(n,i),T=d&&Ac(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=f?S:OC(s,r[e.mergeOutputField]??0,x),O=d&&(!f||l===o||b||w||D||C>0),k=i>0?DC[i-1]:null,A=DC.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||f||b||l===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let ee=DC[i+1]?.symbol??`⬆`,j=d&&(f?(0,Z.jsx)(SC,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,Z.jsx)(SC,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!OC(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:`${e.symbol} 8→1 ${g?`🔌`:ee}`})})),te=d&&(f?(0,Z.jsx)(wC,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${wi(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${wi(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${wi(y)}`:`🔌 ${C}/8`}):m?(0,Z.jsx)(CC,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${R(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,Z.jsx)($,{children:`🔓 10/10`})}):(0,Z.jsx)(wC,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),M=d&&O;return(0,Z.jsxs)(v.Fragment,{children:[(0,Z.jsxs)(dC,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:l===o,children:[(0,Z.jsxs)(pC,{children:[(0,Z.jsxs)(mC,{type:`button`,onClick:()=>a(o),"aria-pressed":l===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${av(o,`name`)}`,$selected:l===o,children:[(0,Z.jsx)(vC,{"aria-hidden":`true`,children:e.symbol}),(0,Z.jsxs)(gC,{children:[(0,Z.jsxs)(_C,{children:[(0,Z.jsxs)(hC,{children:[e.label,(0,Z.jsx)(Ag,{children:` ${R(E)}/10`})]}),(0,Z.jsxs)(uC,{"aria-hidden":`true`,children:[`→ `,av(o)]})]}),(0,Z.jsx)(yC,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,Z.jsx)(bC,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),te&&(0,Z.jsx)(lC,{children:te})]}),l===o&&u]}),M?(0,Z.jsx)(sC,{children:j}):(0,Z.jsx)(cC,{})]},e.key)})}):(0,Z.jsx)(aC,{children:`⬡ ${R(r.computeCores??0)}/10 · 🔗 ${R(r.computeNodes??0)}/10`})]})},AC=X.button.attrs({type:`button`})`
  background: ${e=>e.$on?e.theme.color.good:e.theme.color.textMuted};
  border: none;
  border-radius: 999px;
  cursor: pointer;
  flex: 0 0 auto;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  position: relative;
  transition: background ${e=>e.theme.motion.duration.base} ${e=>e.theme.motion.easing.standard};
  width: 2.6rem;

  &::after {
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
    content: '';
    height: 1.1rem;
    left: ${e=>e.$on?`calc(100% - 1.1rem - 0.2rem)`:`0.2rem`};
    position: absolute;
    top: 0.2rem;
    transition: left ${e=>e.theme.motion.duration.base} ${e=>e.theme.motion.easing.standard};
    width: 1.1rem;
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::after {
      transition: none;
    }
  }
`;b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),ht.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{});var jC=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}];X.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,X(mh)`
  gap: 0.55rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  h3 {
    color: ${e=>e.theme.color.textMuted};
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    margin: 0.2rem 0 0;
    text-transform: uppercase;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    font-size: 0.85rem;
    margin: 0;
  }
`,X.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`,X.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,X.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`,X.div`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.35rem 0.55rem;

  dt {
    color: ${e=>e.theme.color.textMuted};
    font-size: 0.7rem;
  }

  dd {
    color: ${e=>e.theme.color.text};
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    margin: 0;
    overflow-wrap: anywhere;
  }
`,X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`,X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`,X(Q)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`,X.input`
  background: ${e=>e.theme.color.surfaceSunken};
  border: 1px solid ${e=>e[`aria-invalid`]?e.theme.color.danger:e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.body};
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
  min-width: 0;
  padding: 0.4rem 0.55rem;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`,X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`,X.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`,X.div`
  display: flex;
  gap: 0.3rem;
`,X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`,X(Q)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`,X.span`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
`,X.details`
  border-left: 2px solid ${e=>e.theme.color.border};
  padding-left: 0.6rem;
`,X.summary`
  color: ${e=>e.theme.color.text};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,X.textarea`
  background: ${e=>e.theme.color.surfaceSunken};
  border: 1px solid ${e=>e[`aria-invalid`]?e.theme.color.danger:e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  font-family: monospace;
  font-size: 0.8rem;
  min-height: 16rem;
  padding: 0.6rem;
  resize: vertical;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.good} !important;
  font-size: 0.8rem;
`,[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>jC.find(t=>t.id===e));var MC=`0.5.0`,NC=X.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,PC=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,FC=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,IC=X(mh)`
  h2 {
    font-size: ${e=>e.theme.type.scale.lg.size};
    margin: 0 0 0.4rem;
  }

  h3 {
    color: ${e=>e.theme.color.text};
    font-size: ${e=>e.theme.type.scale.md.size};
    font-weight: 600;
    margin: 0.65rem 0 0.25rem;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0 0 0.5rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul {
    color: ${e=>e.theme.color.textMuted};
    margin: 0 0 0.5rem;
    padding-left: 1.15rem;
  }

  ul:last-child {
    margin-bottom: 0;
  }

  li {
    margin: 0 0 0.3rem;
  }

  li:last-child {
    margin-bottom: 0;
  }

  ul ul {
    margin: 0.25rem 0 0.15rem;
  }
`,LC=()=>{let e=Yt(b[0].id),t=Yt(b[b.length-1].id),n=Xt(b[0].id),r=vr({}),i=b[b.length-1].name,a=b[0].name;return(0,Z.jsxs)(NC,{children:[(0,Z.jsxs)(PC,{children:[(0,Z.jsx)(`h1`,{children:`Tens — Manual`}),(0,Z.jsxs)(FC,{children:[`v`,MC]})]}),(0,Z.jsxs)(IC,{"aria-label":`overview section`,children:[(0,Z.jsx)(`h2`,{children:`Overview`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Buy every tier with `,(0,Z.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,Z.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,a,` produce Bytes, which are added to your Bits.`]}),(0,Z.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,Z.jsxs)(`li`,{children:[`Reaching `,(0,Z.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge — unless you have unlocked Overflow mode (see Purge).`]}),(0,Z.jsxs)(`li`,{children:[`Once bought (`,2,` PP on Firmware → ✦ Prestige), the `,(0,Z.jsx)(`strong`,{children:`Buy max`}),` toggle makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})]}),(0,Z.jsxs)(IC,{"aria-label":`prestige ladder section`,children:[(0,Z.jsx)(`h2`,{children:`Prestige ladder`}),(0,Z.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP, the per-cycle Compute (Flops) boost.`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, Overflow mode, the Byte generator, Capacity, Disks, Data Lakes, Compute entities, owned Compute (Flops) units and the System log.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reinstall`}),` — a future layer above Reboot, not yet in the game.`]})]})]}),(0,Z.jsxs)(IC,{"aria-label":`byte foundry section`,children:[(0,Z.jsx)(`h2`,{children:`Byte Foundry`}),(0,Z.jsxs)(`p`,{children:[`Every new save starts here, before any `,a,` exist. Unlocking the main game is permanent — no Purge or Reboot sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,Z.jsx)(`h3`,{children:`The loop`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,To(je),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,To(Ee(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,Ae/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,Ae/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,Z.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,Z.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,Z.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,De,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-Oe)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,a,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,To(je),` threshold.`]})]}),(0,Z.jsx)(`h3`,{children:`What resets vs. what stays`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,a,` level.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, every Compute entity, and the main-game unlock. Reboot resets most of this (see Reboot).`]}),(0,Z.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]}),(0,Z.jsx)(`h3`,{children:`Forced priority`}),(0,Z.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Disk Fill → Provision Disk → Compute Boost`}),(0,Z.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]}),(0,Z.jsxs)(IC,{"aria-label":`storage section`,children:[(0,Z.jsx)(`h2`,{children:`Storage`}),(0,Z.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,To(je),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,Z.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,Z.jsx)(`h3`,{children:`Provisioning Disks`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,Z.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]}),(0,Z.jsx)(`h3`,{children:`Cache and automatic pulling`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,Z.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,Z.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,Z.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,Z.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,Z.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]}),(0,Z.jsx)(`h3`,{children:`Data Lakes`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,Z.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,Z.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,Z.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,ze.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,Z.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,We.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,Z.jsx)(`li`,{children:`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the Reboot cycle — through pool flushes, Reformats and Purges.`})]}),(0,Z.jsx)(`h3`,{children:`Flushing`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,Z.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,Z.jsx)(`li`,{children:`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. A pool’s first two flushes also each upgrade one of its two disk-size exponent steps to close 10% of the gap to 1.0. These upgrades survive Reformat, Purge, and Reboot. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`}),(0,Z.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})]}),(0,Z.jsxs)(IC,{"aria-label":`power section`,children:[(0,Z.jsx)(`h2`,{children:`Power`}),(0,Z.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,To(Ne),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,Z.jsx)(`h3`,{children:`Cells and the charge chain`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,Z.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,Z.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,Z.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,Z.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]}),(0,Z.jsx)(`h3`,{children:`Compute Boost`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,Z.jsxs)(`li`,{children:[`Turbo ×`,Fe.burst.multiplier,` for`,` `,wi(Fe.burst.durationSeconds),`; Balanced ×`,Fe.standard.multiplier,` for`,` `,wi(Fe.standard.durationSeconds),`; Eco ×`,Fe.sustain.multiplier,` for`,` `,wi(Fe.sustain.durationSeconds),`.`]}),(0,Z.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,Fe.burst.poolBonusPercent,`% / +`,Fe.standard.poolBonusPercent,`% / +`,Fe.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,Z.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,Z.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,Z.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,Z.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,Z.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,Z.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,Z.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,Z.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})]}),(0,Z.jsxs)(IC,{"aria-label":`compute flops section`,children:[(0,Z.jsx)(`h2`,{children:`Compute`}),(0,Z.jsxs)(`p`,{children:[`A separate screen (nav `,(0,Z.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,Z.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,ft.toLocaleString(),` PP.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,ft.toLocaleString(),` –`,` `,pt.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,Z.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,Z.jsxs)(`li`,{children:[`Each owned unit adds `,(mt*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,Z.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,Z.jsxs)(`li`,{children:[`The header’s `,(0,Z.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,Z.jsx)(`sup`,{children:`n`}),` `,`(`,(0,Z.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,Z.jsxs)(IC,{"aria-label":`accelerate section`,children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,Z.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,Z.jsxs)(`li`,{children:[`Unlocks once `,a,` complete their first level.`]}),(0,Z.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,Z.jsxs)(`li`,{children:[i,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Restage while holding 0 `,i,` (nothing is left producing) to earn Spent QB — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,Z.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,i,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,i,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,it.restage,`) spends it for you, every `,at.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})]}),(0,Z.jsxs)(IC,{"aria-label":`scale up section`,children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,a,` — to claim a Scale Up.`]}),(0,Z.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,Z.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,Z.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,Z.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})]}),(0,Z.jsxs)(IC,{"aria-label":`overclock section`,children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach the required number of completed `,i,` levels to claim an Overclock.`]}),(0,Z.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,Z.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,Z.jsxs)(`li`,{children:[`The first claim needs `,r,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,Z.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})]}),(0,Z.jsxs)(IC,{"aria-label":`tier autobuyers section`,children:[(0,Z.jsx)(`h2`,{children:`Tier Autobuyers`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,Z.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,Z.jsxs)(`li`,{children:[`An autobuyer buys `,(0,Z.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,Z.jsx)(`strong`,{children:`Single`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,ot.baseCost,` PP × the same.`]})]})]}),(0,Z.jsxs)(IC,{"aria-label":`milestones section`,children:[(0,Z.jsx)(`h2`,{children:`Milestones`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,e,` (`,a,`) through Purge`,` `,t,` (`,i,`).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,n,`, then every`,` `,`Purge`,` after that.`]}),(0,Z.jsx)(`li`,{children:`More → Milestones tracks your story milestones and Reboot progress.`})]})]}),(0,Z.jsxs)(IC,{"aria-label":`prestige section`,children:[(0,Z.jsx)(`h2`,{children:`Purge`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge, Reboot, Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,Z.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge. Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,Z.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]}),(0,Z.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) at 1 Googol Bytes, plus 1 PP for every`,` `,64,` further powers of ten in your balance. Each Compression upgrade halves the powers needed per PP, and once that reaches 1, doubles the PP per power.`]}),(0,Z.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,Z.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,Z.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,Z.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,$e*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,Z.jsx)(`li`,{children:`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage and Power progress carries over.`}),(0,Z.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})]}),(0,Z.jsxs)(IC,{"aria-label":`sleep mode section`,children:[(0,Z.jsx)(`h2`,{children:`Sleep mode`}),(0,Z.jsx)(`ul`,{children:(0,Z.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,wi(qe),` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,Ye.map(e=>R(e)).join(` / `),` PP) adds`,` `,wi(Je),`, up to `,wi(Ke),`. Absences of `,wi(600),` `,`or less run at full speed; longer ones run at`,` `,Ge*100,`% speed and show a “Resumed from sleep” summary.`]})})]}),(0,Z.jsxs)(IC,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,vt.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,Z.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel plus `,1,` per Kernel Amplifier level. Ways to spend Kernels are coming in a later update.`]}),(0,Z.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,Z.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,Z.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})]})]})},RC=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,zC=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,BC=X(mh)`
  gap: 0.4rem;
`,VC=X.ol`
  list-style: none;
  margin: 0;
  padding: 0 0 0 1.4rem;
  position: relative;

  &::before {
    border-left: 2px solid ${e=>e.theme.color.borderStrong};
    bottom: 0.55rem;
    content: '';
    left: 0.45rem;
    position: absolute;
    top: 0.55rem;
  }
`,HC=X.li`
  color: ${e=>e.$reached?e.theme.color.text:e.theme.color.textFaint};
  font-weight: ${e=>e.$reached?600:400};
  padding: 0.3rem 0;
  position: relative;

  &::before {
    background: ${e=>e.$reached?e.theme.color.good:e.theme.color.surfaceSunken};
    border: 2px solid ${e=>e.$reached?e.theme.color.good:e.theme.color.borderStrong};
    border-radius: 50%;
    content: '';
    height: 0.65rem;
    left: -1.35rem;
    position: absolute;
    top: 0.55rem;
    width: 0.65rem;
  }
`,UC=X.p`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  gap: 0.35rem;
  margin: 0.3rem 0 0;
  padding-top: 0.55rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,WC=X.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,GC=({game:e})=>{let{state:t}=e,n=Im(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=Ln(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:wr(t)},{label:`First Reboot`,reached:i>0}];return(0,Z.jsxs)(RC,{children:[(0,Z.jsx)(zC,{children:(0,Z.jsx)(`h1`,{children:`Milestones`})}),(0,Z.jsxs)(BC,{"aria-label":`milestones page`,children:[(0,Z.jsx)(VC,{"aria-label":`milestones category`,children:s.map(e=>(0,Z.jsx)(HC,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),(0,Z.jsxs)(UC,{"aria-label":`reboot status`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,Z.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,Z.jsx)(`strong`,{children:i}),` Reboots`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,Z.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,Z.jsx)(`strong`,{children:a}),` Kernels`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,Z.jsx)(WC,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,Z.jsx)(WC,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${vt.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},KC=({game:e})=>{if(!ki(e.state))return null;let t=!!e.buyMaxMode;return(0,Z.jsx)(AC,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},qC=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,JC=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&Wm`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,YC=[{id:`level`,unit:!1,icon:`📶`,label:`Level`,title:`Buy level: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Single`,title:`Buy single: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],XC=({game:e})=>(0,Z.jsx)(qC,{role:`group`,"aria-label":`buy mode`,children:YC.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,Z.jsx)(JC,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),ZC=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,QC=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&Wm`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,$C=({value:e,onChange:t})=>(0,Z.jsx)(ZC,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(Fe).map(n=>{let r=rv[n],i=e===n;return(0,Z.jsx)(QC,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),ew=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,tw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,nw=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,rw=X.div`
  display: flex;
  gap: 0.5rem;
`,iw=X(Q)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,aw=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,ow=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,sw=X(mh)`
  gap: 0.4rem;
`,cw=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,lw=X.div`
  align-items: center;
  column-gap: 0.6rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  min-height: 2.75rem;
  padding: 0.35rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }

  & > :last-child {
    justify-self: end;
  }
`,uw=X.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,dw=({tier:e})=>(0,Z.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,Z.jsx)(Ag,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),fw=X.div`
  background: ${e=>e.$bare?`transparent`:e.theme.color.surfaceSunken};
  border: ${e=>e.$bare?`none`:`1px solid ${e.theme.color.border}`};
  border-radius: ${e=>e.theme.radius.sm};
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
  font-size: ${e=>e.$narrow?`0.88em`:`1em`};

  /* Narrow (symbol-only) cells: a slightly smaller Switch so even "MB" + Switch fit three-up at 320px. */
  ${e=>e.$narrow&&`
    & button[aria-pressed] {
      flex-shrink: 0;
      zoom: 0.85;
    }
  `}
  padding: ${e=>e.$bare?`0`:`0.35rem 0.3rem 0.35rem 0.4rem`};
`,pw=X.div`
  align-items: start;
  background: ${e=>e.theme.color.surfaceSunken};
  border: 1px solid ${e=>e.theme.color.border};
  border-left: 3px solid ${e=>e.$accent};
  border-radius: ${e=>e.theme.radius.sm};
  column-gap: 0.3rem;
  display: grid;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  padding: 0.35rem 0.25rem 0.35rem 0.45rem;

  & > :first-child {
    align-items: center;
    display: flex;
    font-size: 0.88em;
    font-weight: 600;
    min-height: 1.9rem;
  }
`,mw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,hw=X.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,gw=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,_w=X.div`
  align-items: center;
  aspect-ratio: 1.25;
  background: ${e=>e.$on?`color-mix(in srgb, ${e.theme.color.good} 14%, ${e.theme.color.surface})`:e.theme.color.surface};
  border: 1px solid ${e=>e.$on?e.theme.color.good:e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  min-width: 0;
  padding: 2px;
`,vw=X.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,yw=X.span`
  display: flex;
  gap: 4px;
`,bw=X.button`
  align-items: center;
  background: none;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.textMuted};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 0.72rem;
  gap: 2px;
  min-height: 1.4rem;
  padding: 0 2px;

  &::after {
    background: ${e=>e.$on?e.theme.color.good:e.theme.color.borderStrong};
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 8px;
    width: 8px;
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 1px;
  }
`,xw=X.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,Sw=X.div`
  align-items: center;
  display: flex;
  /* $wrap (inline-action cells): when a long cost won't fit, the button drops to its own line
     instead of the name collapsing to an ellipsis — one line whenever it fits. */
  flex-wrap: ${e=>e.$wrap?`wrap`:`nowrap`};
  gap: 0.15rem;
  row-gap: 0.3rem;
  justify-content: space-between;
  min-height: 1.9rem;

  /* Wide (global) rows: the name takes the slack so the interval, Switch and action columns line up row to row. */
  ${e=>e.$wrap&&!e.$narrow&&`
    column-gap: 0.4rem;

    & > span:first-child {
      flex: 1 1 auto;
    }
  `}

  & > span:first-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,Cw=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.8em;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;

  ${e=>e.$wide&&`
    margin-left: 0;
    min-width: 2.9em;
    text-align: right;
  `}
`,ww=X.span`
  flex-shrink: 0;

  /* Wide rows: a fixed-width action column keeps the Switch at the same x on every row. */
  ${e=>!e.$narrow&&`
    min-width: 4.2rem;

    & > button {
      width: 100%;
    }
  `}

  & > button {
    min-width: 3.75rem;
    padding: 0.35em 0.5em;
  }

  /* Glyph dropped inline (colour already says upgrade vs unlock) so the name keeps its width. */
  & > button > :first-child {
    display: none;
  }

  ${e=>e.$narrow&&`
    flex-shrink: 0;
    margin-left: auto;
    /* Common minimum so a wide cost (1,000 PP) doesn't shift its row's interval/Switch columns. */
    min-width: 4.4rem;

    && > button {
      white-space: nowrap;
      width: 100%;
      font-size: 0.78rem;
      min-height: 1.6rem;
      min-width: 0;
      padding: 0.15em 0.45em;
    }
  `}
`,Tw=X.div`
  & > button {
    min-width: 0;
    padding-left: 0.4em;
    padding-right: 0.4em;
    width: 100%;
  }

  ${e=>e.$narrow&&`
    & > button > :first-child {
      display: none;
    }

    /* Long costs (1.6e15 PP) wrap rather than ellipsize, so the price is never hidden. */
    & > button > span {
      overflow: visible;
      overflow-wrap: anywhere;
      white-space: normal;
    }
  `}
`,Ew=X.span`
  font-weight: 600;
  min-width: 0;
`,Dw=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,Ow=X.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,kw=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,Aw=X.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 0;
  text-align: left;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,jw=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,Mw=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,Nw=X.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,Pw=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,Fw=X(Q)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,Iw=X.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,Lw=(e,t)=>Math.min(100,Math.round(e/t*100)),Rw=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=Im();return(0,Z.jsxs)(Mw,{children:[(0,Z.jsx)(Iw,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,Z.jsxs)(Z.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},zw=({name:e,icon:t,title:n})=>{let r=Im();return(0,Z.jsxs)(Iw,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},Bw=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,Z.jsxs)(Fw,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:Lw(r,n),$progressColor:t,children:[(0,Z.jsx)(Dg,{children:s}),(0,Z.jsx)(Og,{children:c}),(0,Z.jsx)(Ag,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),Vw=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,Z.jsxs)(fw,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,Z.jsxs)(Sw,{$narrow:t,$wrap:r,children:[(0,Z.jsxs)(Ew,{children:[s&&l&&!i&&(0,Z.jsx)(Ag,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,Z.jsx)(Ow,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,Z.jsx)(Dw,{children:i})),o]}),s&&p&&(0,Z.jsx)(Cw,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,Z.jsx)(ww,{$narrow:t,children:y}),s&&l&&(0,Z.jsx)(AC,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,Z.jsx)(Tw,{$narrow:t,children:y})]})},Hw=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],Uw=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,Ww=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,Gw=e=>String(Number(e.toFixed(2))),Kw=e=>`${Number((e/3600).toFixed(1))}h`,qw=e=>{let t=ui(e+1);if(t>1)return`${R(ui(e))} → ${R(t)} PP per extra digit`;let[n,r]=[li(e),li(e+1)];return`1 PP per ${R(n)} → ${R(r)} extra digit${r===1?``:`s`}`},Jw=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,Z.jsxs)(lw,{"aria-label":e,children:[(0,Z.jsxs)(kw,{children:[(0,Z.jsx)(Ew,{children:(0,Z.jsxs)(Aw,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(Dw,{children:t}),n]})}),r&&(0,Z.jsx)(Pw,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,Z.jsx)(jw,{"aria-label":`${n} description`,children:i})]})},Yw=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],Xw=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=Im(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=Qr(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=Er(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=di(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=cn(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=!ki(n)&&o>=2,T=vn(n),E=bn(T),D=Kw(yn(n)),O=Kw(yn({...n,sleepModeCapLevel:T+1})),k=Kw(Je),A=!n.cacheWarmUnlocked&&o>=20,ee=hn(n),j=dn({...n,playtimeBonusUnlocked:!0}),te=Pe.some(e=>!!n.intro?.[e.autoFlagField]),M=n.computeAutoChargeEnabled??!0,ne=n.intro?.computeAutoBoostEnabled??!0,re={automation:Zh(n)&&`automation perk available`,prestige:Qh(n)&&`prestige perk available`},ie=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,Z.jsx)(Bw,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${R(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),P=e=>Hr(n,e.id)?(0,Z.jsxs)(Q,{"aria-label":`Start challenge ${wv(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,Z.jsxs)(Q,{"aria-label":`Challenge ${e.id} ${Cv(e).toLowerCase()}`,disabled:!0,title:Cv(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),ae=(e,t)=>{let r=Ur(e,t);return r&&!Dr(n,r.id)?r:null},oe=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=$u(e.id)&&r>=ld()&&!ae(`tierTickspeed`,e.id)&&!ae(`tierAutobuyer`,e.id)});return(0,Z.jsxs)(ew,{children:[(0,Z.jsxs)(tw,{children:[(0,Z.jsx)(`h1`,{children:`Firmware`}),(0,Z.jsxs)(nw,{"aria-label":`purge points display`,children:[`✦ `,R(o),` PP`]})]}),(0,Z.jsx)(rw,{role:`tablist`,"aria-label":`firmware view`,children:Hw.map(e=>(0,Z.jsxs)(iw,{"aria-label":e.ariaLabel,"aria-selected":d===e.id,color:d===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),re[e.id]&&(0,Z.jsx)(aw,{"aria-label":re[e.id]})]},e.id))}),d===`automation`&&(0,Z.jsxs)(ow,{"aria-label":`automation firmware page`,children:[(0,Z.jsxs)(sw,{"aria-label":`global automation category`,children:[(0,Z.jsx)(cw,{children:`Global Automation`}),(0,Z.jsx)(uw,{children:Yw.map(e=>{let t=e.owned(n),i=e.enabled(n),a=sd(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=rd(e.key),l=ad(e.key,o),u=Ur(`global`,e.key),d=u&&!Dr(n,u.id)?u:null;return(0,Z.jsx)(Vw,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,Z.jsx)(Rw,{current:s,milestone:Sr(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?P(d):ie({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${R(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?Ww(id(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${Uw(id(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})})]}),(0,Z.jsxs)(sw,{"aria-label":`tier autobuyers category`,children:[(0,Z.jsx)(cw,{children:`Tier Autobuyers`}),oe?(0,Z.jsx)(gw,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,Z.jsxs)(_w,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,Z.jsx)(vw,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,Z.jsx)(dw,{tier:e})}),(0,Z.jsxs)(yw,{children:[(0,Z.jsx)(Ag,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,Z.jsx)(bw,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,Z.jsx)(Ag,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,Z.jsx)(bw,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,Z.jsxs)(mw,{children:[(0,Z.jsxs)(hw,{"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{children:`Tier`}),(0,Z.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,Z.jsx)(`span`,{children:`🤖 Buy`})]}),b.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=Yt(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=$u(e.id),d=l>=Ju(e.id),f=a?Qu(n,e.id):1,p=K(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=ld(),v=dd(g,e.id),y=ae(`tierTickspeed`,e.id),b=ae(`tierAutobuyer`,e.id);return(0,Z.jsxs)(pw,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,Z.jsx)(dw,{tier:e}),(0,Z.jsx)(Vw,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(Rw,{current:s,milestone:Xt(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?P(y):ie({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${R(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?Ww(ud(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${Uw(ud(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,Z.jsx)(Vw,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(Rw,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?P(b):ie({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${R(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${R(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:Ww(Xu(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${Uw(Xu(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),te&&(0,Z.jsxs)(sw,{"aria-label":`power automation category`,children:[(0,Z.jsx)(cw,{children:`Power Automation`}),(0,Z.jsxs)(uw,{children:[te&&(0,Z.jsx)(Vw,{ariaLabel:`auto-charge row`,enabled:M,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!M),owned:!0,statusTitle:M?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,Z.jsx)(Vw,{ariaLabel:`auto boost row`,enabled:ne,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!ne),owned:!0,statusTitle:ne?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,Z.jsxs)(fw,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,Z.jsx)(Sw,{children:(0,Z.jsx)(Ew,{children:`Boost preset`})}),(0,Z.jsx)($C,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,Z.jsxs)(sw,{"aria-label":`compute autobuyers category`,children:[(0,Z.jsx)(cw,{children:`Compute Autobuyers`}),(0,Z.jsx)(gw,{"aria-label":`compute autobuyer tiles`,role:`group`,children:ht.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=Hn(e.id);return(0,Z.jsxs)(_w,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,Z.jsx)(vw,{$dimmed:!t,children:(0,Z.jsx)(dw,{tier:e})}),t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Ag,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,Z.jsx)(bw,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,Z.jsx)(xw,{children:(0,Z.jsx)(Rw,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),d===`prestige`&&(0,Z.jsxs)(ow,{"aria-label":`prestige firmware page`,children:[(0,Z.jsxs)(sw,{"aria-label":`purge points category`,children:[(0,Z.jsx)(cw,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,Z.jsx)(Nw,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,Z.jsx)(Jw,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${Gw(S)}`:`Production ×1 → ×${Gw(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,Z.jsx)(zw,{icon:`🚀`,name:`Speed bonus`}):(0,Z.jsx)(Bw,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${R(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,Z.jsx)(Jw,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at ${Ge*100}% speed past 10 min). Each level adds ${k}: ${Ye.map(e=>R(e)).join(` / `)} PP, up to ${Kw(Ke)}.`,icon:`😴`,name:`Sleep mode`,value:E===null?`Time away: up to ${D}`:`Time away: up to ${D} → ${O}`,children:E===null?(0,Z.jsx)(zw,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,Z.jsx)(Bw,{ariaLabel:`Buy Sleep mode level ${T+1} for ${R(E)} Purge Points — +${k} of time away`,color:`#a78bfa`,cost:E,disabled:o<E,icon:`⏫`,label:`${R(E)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,Z.jsx)(Jw,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:qw(g),children:(0,Z.jsx)(Bw,{ariaLabel:`Buy Compression level ${g+1} for ${R(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${R(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,Z.jsx)(Jw,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${ee.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${ee.symbol} level 1 done`:`Start runs with ${ee.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,Z.jsx)(zw,{icon:`🔥`,name:`Cache Warm`}):(0,Z.jsx)(Bw,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!A,icon:`🔓`,label:`${R(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,Z.jsx)(Jw,{ariaLabel:`playtime bonus upgrade`,details:`+${$e*100}% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${Gw(j)}`:`+${$e*100}% production per hour played`,children:n.playtimeBonusUnlocked?(0,Z.jsx)(zw,{icon:`⏱`,name:`Playtime bonus`}):(0,Z.jsx)(Bw,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${R(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(0,Z.jsx)(Jw,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:wr(n)?null:`Keep producing past 1 Googol Bytes`,children:wr(n)?(0,Z.jsx)(zw,{icon:`♾`,name:`Overflow mode`}):(0,Z.jsx)(Iw,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,Z.jsxs)(sw,{"aria-label":`purchasing category`,children:[(0,Z.jsx)(cw,{children:`Purchasing`}),(0,Z.jsx)(Jw,{ariaLabel:`buy mode toggle`,details:`Level (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Single: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Single they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,Z.jsx)(XC,{game:e})}),(0,Z.jsx)(Jw,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. One-time purchase; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:ki(n)?null:`Buy every affordable level in one tap`,children:ki(n)?(0,Z.jsx)(KC,{game:e}):(0,Z.jsx)(Bw,{ariaLabel:`Unlock Buy max for 2 Purge Points`,color:`#38bdf8`,cost:2,disabled:!w,icon:`🔓`,label:`${R(2)} PP`,onClick:r.buyBuyMaxUnlock,points:o,progressLabel:`Buy max unlock PP progress`})})]})]}),(0,Z.jsx)(Mb,{def:p?N.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},Zw=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),Qw=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),$w=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],eT=e=>e&&Zw(e)&&Object.keys(e).some(e=>Qw.has(e)),tT=e=>{if(!e||!Zw(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if($w.some(t=>{let n=e[t];return n&&Zw(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:$w.some(t=>eT(e[t]))?`legacy_tier_ids`:null},nT=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],rT=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],iT=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],aT=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},oT=e=>{let t=aT(e,nT);return t.automationIntervalLevels&&=aT(t.automationIntervalLevels,rT),t.automationAttemptBudgets&&=aT(t.automationAttemptBudgets,rT),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>aT(e,iT))}),t},sT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),cT=e=>{let{saveSchemaVersion:t,...n}=e;return n},lT=e=>{if(!sT(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:cT(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:oT(cT(e))};let t=tT(e);return t?{ok:!1,reason:t}:{ok:!0,payload:oT(e)}},uT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),dT=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),fT=()=>MT(),pT=(e,t=fT())=>{if(!t)return lT(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:oT(r)}},mT=`tens_game_state`,hT=`tens_last_save_timestamp`,gT=`tens_saves_meta`,_T=`tens_dev_mode_active`,vT=`dev`,yT=`tens_dev_state`,bT=`tens_dev_timestamp`,xT=`TENS-SUPPORT`,ST=e=>e===vT?yT:e===`0`?mT:`tens_slot_${e}_state`,CT=e=>e===vT?bT:e===`0`?hT:`tens_slot_${e}_timestamp`,wT=e=>`Save ${e+1}`,TT=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:wT(0)}]}),ET=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),DT=()=>{try{let e=localStorage.getItem(gT);return e?dT(e):null}catch{return null}},OT=e=>{try{localStorage.setItem(gT,JSON.stringify(e))}catch{}},kT=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:wT(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},AT=e=>{let t=TT();if(!uT(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!uT(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():wT(n)})}return kT({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},jT=()=>{let e=AT(DT());return OT(e),e},MT=()=>{try{return localStorage.getItem(_T)===`1`}catch{return!1}},NT=e=>{try{e?localStorage.setItem(_T,`1`):localStorage.removeItem(_T)}catch{}},PT=()=>MT()?vT:jT().activeSlotId,FT=(e=`code`)=>{let t=jT();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=kT({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return OT(n),{ok:!0,meta:n}},IT=e=>{try{return localStorage.getItem(ST(e))!=null}catch{return!1}},LT=()=>{let e=jT(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??wT(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!IT(i)})}return t},RT=e=>{if(MT())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=jT(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return OT(i),{ok:!0,meta:i}},zT=(e,t)=>{let n=String(e),r=jT(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return OT(s),{ok:!0,meta:s}},BT=e=>ET(e)===`TENS-SUPPORT`?FT(`code`):{ok:!1,reason:`invalid`},VT=()=>FT(`dummy_purchase`),HT=()=>{let e=jT();return e.slots.find(t=>t.id===e.activeSlotId)?.name??wT(0)},UT=()=>{let e=jT(),t=HT(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},WT=()=>`Reformat Byte Foundry on "${HT()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,GT=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,KT=()=>`Erase ALL save progress on this device?\n\n${jT().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,qT=e=>{try{localStorage.removeItem(ST(e)),localStorage.removeItem(CT(e))}catch{}},JT=e=>{if(MT())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=jT(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(qT(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},YT=()=>{if(MT())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)qT(String(e));return{ok:!0,meta:jT()}},XT=e=>{try{let t=PT(),n=(e??localStorage).getItem(ST(t));return n?dT(n):null}catch{return null}},ZT=()=>{let e=PT(),t=XT();if(!t)return null;let n=pT(t);return n.ok?null:(qT(e),fT()?null:n.reason)},QT=(e,t)=>({...e,...t??{}}),$T=e=>uT(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),eE=e=>$T(e)&&Array.isArray(e.transfers)?e.transfers.length:0,tE=e=>{let t=e.deposits??{},n=Re.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+eE(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},nE=(e,t)=>{let n=Et(),r={};for(let e of Object.keys(n)){let i=t?.[e];if($T(i)){n[e]={...n[e],...tE(i)};let t=eE(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},rE=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=Le[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},iE=e=>{let t=e,n=Dt(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=nE(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return Gr(Zt(Ia(Un({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:QT(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:QT(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:QT(n.owned,t.owned),purchased:QT(n.purchased,t.purchased),purchaseLevels:QT(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:QT(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:QT(n.autobuyers,t.autobuyers),autobuyersEnabled:QT(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:QT(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:QT(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:QT(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:QT(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:QT(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:QT(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:QT(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:QT(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:QT(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:{...n.eonsUpgrades,...t.eonsUpgrades??{}},computeFlopsAutobuyers:QT(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:QT(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:QT(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:rE({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},aE=e=>{let t=PT();try{localStorage.setItem(ST(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem(CT(t),String(Date.now()))}catch{}},oE=e=>{try{let t=XT(e);if(!t)return null;let n=pT(t);return n.ok?iE(n.payload):null}catch{return null}},sE=()=>{let e=PT();try{let t=localStorage.getItem(CT(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},cE=()=>{MT()?lE():JT(PT())},lE=()=>(qT(vT),{ok:!0}),uE=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=uT(i)&&uT(a)?uE(a,i):i,n},{...e}),dE=(e,t)=>{if(!MT())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=dT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!uT(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...uT(t)?uE(t,n):n};try{localStorage.setItem(yT,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=oE();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},fE=e=>JSON.stringify({saveSchemaVersion:3,...e}),pE=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(Dt(),e))||e.resources!==void 0&&!uT(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},mE=e=>{let t;try{t=dT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!uT(t))return{ok:!1,reason:`invalid_json`};let n=pT(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!fT()&&!pE(n.payload))return{ok:!1,reason:`invalid_state`};let r=iE(n.payload);return aE(r),{ok:!0,state:r}},hE=`tens_buy_max_mode`,gE=()=>{try{return localStorage.getItem(hE)===`true`}catch{return!1}},_E=e=>{try{localStorage.setItem(hE,e?`true`:`false`)}catch{}},vE=`tens_buy_unit_mode`,yE=()=>{try{return localStorage.getItem(vE)===`true`}catch{return!1}},bE=e=>{try{localStorage.setItem(vE,e?`true`:`false`)}catch{}},xE=`tens_theme_preference`,SE=()=>{try{let e=localStorage.getItem(xE);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},CE=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(xE,e)}catch{}},wE;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(wE||={});var TE=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},EE=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,DE=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?EE(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new TE(`"${e}" plugin is not implemented on ${c}`,wE.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new TE(`"${e}.${t}()" is not implemented on ${c}`,wE.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=TE,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},OE=(e=>e.Capacitor=DE(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),kE=OE.registerPlugin,AE=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new OE.Exception(e,wE.Unimplemented)}unavailable(e=`not available`){return new OE.Exception(e,wE.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},jE=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ME=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),NE=class extends AE{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=ME(n).trim(),r=ME(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=jE(e.key),n=jE(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};kE(`CapacitorCookies`,{web:()=>new NE});var PE=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),FE=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},IE=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,LE=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=FE(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},RE=class extends AE{async request(e){let t=LE(e,e.webFetchExtra),n=IE(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await PE(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};kE(`CapacitorHttp`,{web:()=>new RE});var zE;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(zE||={});var BE;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(BE||={});var VE=class extends AE{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};kE(`SystemBars`,{web:()=>new VE});var HE=`https://mohanpednekar.github.io/tens/`,UE=`${HE}privacy.html`,WE=`${HE}terms.html`,GE=X(mh)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,KE=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,qE=X.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,JE=X.input`
  background: ${e=>e.theme.color.surfaceSunken};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  flex: 1;
  font-family: ${e=>e.theme.font.body};
  font-size: 0.9rem;
  min-width: 10rem;
  padding: 0.5rem 0.65rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,YE=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,XE=X.textarea`
  background: ${e=>e.theme.color.surfaceSunken};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  font-family: monospace;
  font-size: 0.75rem;
  min-height: 6rem;
  padding: 0.5rem 0.65rem;
  resize: vertical;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,ZE={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},QE=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:ZE[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,Z.jsxs)(GE,{"aria-label":`manual save section`,children:[(0,Z.jsx)(`h2`,{children:`Backup / Restore`}),(0,Z.jsx)(XE,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,Z.jsxs)(KE,{children:[(0,Z.jsx)(Q,{onClick:o,type:`button`,children:(0,Z.jsx)($,{children:`Copy save`})}),(0,Z.jsx)(Q,{onClick:s,type:`button`,children:(0,Z.jsx)($,{children:`Download file`})}),(0,Z.jsx)(Q,{onClick:()=>a.current?.click(),type:`button`,children:(0,Z.jsx)($,{children:`Choose file…`})}),(0,Z.jsx)(Q,{onClick:()=>c(t),type:`button`,children:(0,Z.jsx)($,{children:`Import`})}),(0,Z.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,Z.jsx)(YE,{$error:r.error,children:r.text})]})},$E=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  a {
    color: ${e=>e.theme.color.accent};
    border-radius: ${e=>e.theme.radius.sm};

    &:focus-visible {
      outline: 2px solid ${e=>e.theme.color.accent};
      outline-offset: 2px;
    }
  }
`,eD=()=>(0,Z.jsxs)(GE,{"aria-label":`legal section`,children:[(0,Z.jsx)(`h2`,{children:`Legal`}),(0,Z.jsxs)($E,{children:[(0,Z.jsx)(`a`,{href:UE,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,Z.jsx)(`a`,{href:WE,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),tD={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},nD=({service:e=Lv()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,Z.jsxs)(GE,{"aria-label":`store section`,children:[(0,Z.jsx)(`h2`,{children:`Store`}),(0,Z.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,Z.jsxs)(KE,{children:[(0,Z.jsx)(Q,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),tD.removeAds),type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,Z.jsx)(Q,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),tD.supportTip),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Leave a tip`})}),(0,Z.jsx)(Q,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,Z.jsx)($,{children:`Restore purchases`})})]}),a&&(0,Z.jsx)(YE,{$error:a.error,children:a.text})]})},rD=X.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,iD=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,aD=X(KE)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,oD=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  flex: 1;

  strong {
    color: ${e=>e.theme.color.text};
    font-size: 0.95rem;
  }

  span {
    color: ${e=>e.theme.color.textMuted};
    font-size: 0.75rem;
  }
`,sD=X.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,cD=X.li`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
  padding: 0.5rem 0.6rem;

  strong {
    color: ${e=>e.theme.color.text};
  }

  span {
    color: ${e=>e.theme.color.textMuted};
    font-size: 0.8rem;
  }
`,lD=X.svg`
  display: block;
  height: 64px;
  width: 100%;
`,uD=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,dD=X.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,fD=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},pD=X.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,mD=X.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,hD=({label:e,danger:t=!1,children:n})=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(pD,{$danger:t,children:e}),(0,Z.jsx)(mD,{children:n})]}),gD=X.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,_D=Wm`
  align-items: center;
  background: none;
  border: 0;
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.text};
  display: flex;
  font: inherit;
  gap: 0.65rem;
  min-height: 2.9rem;
  padding: 0.45rem 0.75rem;
  text-align: left;
  width: 100%;
`,vD=X.button`
  ${_D}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,yD=X.div`
  ${_D}
`,bD=X.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,xD=X.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,SD=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,CD=X.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,wD=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  padding: 0.6rem 0.75rem 0.75rem;

  & > section {
    background: transparent;
    border: 0;
    box-shadow: none;
    padding: 0;
  }

  & > section > h2 {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`,TD=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,Z.jsx)(gD,{children:(0,Z.jsxs)(yD,{$danger:r,children:[(0,Z.jsx)(bD,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(xD,{children:t}),i]})}):(0,Z.jsxs)(gD,{children:[(0,Z.jsxs)(vD,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(bD,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(xD,{children:t}),n!=null&&n!==``&&(0,Z.jsx)(SD,{children:n}),(0,Z.jsx)(CD,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,Z.jsx)(wD,{children:a})]})},ED=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=Qr(e.state),o=!!e.savesMeta?.supporterUnlocked,[s,c]=(0,v.useState)(``),[l,u]=(0,v.useState)(null),[d,f]=(0,v.useState)(!1),p=e.state.era?.count??0,m=e.state.eons?.balance??0,h=Ln(e.state),g=Rn(e.state),_=e.state.purge?.points??0,y=e=>e===1?`Kernel`:`Kernels`,b=e.state.prestigeMuseum??{history:[],pinnedIds:[]},x=new Set(b.pinnedIds??[]),S=b.history??[],C=S.filter(e=>x.has(e.id)),w=o?S:S.slice(0,1),T=t=>{t.preventDefault();let n=e.redeemUnlockCode(s);n.ok?(c(``),u({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):u({error:!0,text:`That code is not valid.`})},E=()=>{let t=e.purchaseSupporterDummy();u({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},D=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},O=t=>{a&&t.isActive||window.confirm(GT(t))&&e.clearSlot(t.id)},k=()=>{a||window.confirm(KT())&&e.eraseAllSaveProgress()},A=()=>{Ln(e.state)&&(e.actions.eraAscend(),f(!1))},ee=!!Lv().iapAvailable,j=fD(e.opsSamples??[],`money`),te=fD(e.opsSamples??[],`prestigePoints`);return(0,Z.jsxs)(rD,{children:[(0,Z.jsx)(iD,{children:(0,Z.jsx)(`h1`,{children:`Settings`})}),(0,Z.jsxs)(hD,{label:`Game`,children:[(0,Z.jsx)(TD,{icon:`💛`,label:`Supporter`,value:o?`Unlocked`:`Free`,children:(0,Z.jsxs)(GE,{"aria-label":`supporter pack section`,children:[(0,Z.jsx)(`h2`,{children:`Supporter pack`}),(0,Z.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),o?(0,Z.jsxs)(YE,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(uD,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,Z.jsx)(`code`,{children:xT})]}),(0,Z.jsxs)(qE,{onSubmit:T,children:[(0,Z.jsx)(JE,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>c(e.target.value),placeholder:`Enter unlock code`,value:s}),(0,Z.jsx)(Q,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,Z.jsx)($,{children:`Redeem code`})})]}),(0,Z.jsx)(Q,{"aria-label":`dummy supporter checkout`,onClick:E,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Dummy checkout (free)`})})]}),l&&(0,Z.jsx)(YE,{$error:l.error,children:l.text})]})}),(0,Z.jsx)(TD,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,Z.jsxs)(GE,{"aria-label":`save slots section`,children:[(0,Z.jsx)(`h2`,{children:`Save slots`}),(0,Z.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),!1,(e.saveSlots??[]).map(t=>(0,Z.jsxs)(aD,{$active:t.isActive,children:[(0,Z.jsxs)(oD,{children:[(0,Z.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,Z.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,Z.jsxs)(KE,{children:[!t.isActive&&(0,Z.jsx)(Q,{"aria-label":`switch to ${t.name}`,disabled:!1,onClick:()=>e.switchSaveSlot(t.id),title:void 0,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Play`})}),(0,Z.jsx)(Q,{"aria-label":`rename ${t.name}`,onClick:()=>D(t),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Rename`})}),(0,Z.jsx)(Q,{"aria-label":`clear ${t.name}`,disabled:a&&t.isActive,onClick:()=>O(t),title:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Clear…`})})]})]},t.id))]})}),(0,Z.jsx)(TD,{icon:`⏻`,label:`Reboot`,value:`${m} ${y(m)}`,children:(0,Z.jsxs)(GE,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,Z.jsxs)(KE,{children:[(0,Z.jsx)(`span`,{children:`Reboots`}),(0,Z.jsx)(`strong`,{children:p})]}),(0,Z.jsxs)(KE,{children:[(0,Z.jsx)(`span`,{children:`Kernels`}),(0,Z.jsxs)(`strong`,{children:[m,` `,y(m)]})]}),(0,Z.jsx)(`p`,{children:h?`Ready — next Reboot awards ${g} ${y(g)}.`:`Requires 1 Googol PP unspent (you have ${R(_)} PP).`}),(0,Z.jsx)(Q,{"aria-label":h?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!h,onClick:()=>f(!0),type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⏻ Reboot…`})})]})}),(0,Z.jsx)(TD,{icon:`📜`,label:`System log`,value:o?`${S.length}`:`🔒`,children:(0,Z.jsxs)(GE,{"aria-label":`system log section`,children:[(0,Z.jsx)(`h2`,{children:`System log`}),o?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),C.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(uD,{children:`Pinned`}),(0,Z.jsx)(sD,{"aria-label":`pinned purge entries`,children:C.map(t=>(0,Z.jsxs)(cD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,zt(t.moneyBits)]})})]}),(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,Z.jsx)(uD,{children:`Recent history`}),w.length===0?(0,Z.jsx)(uD,{children:`No purges recorded yet.`}):(0,Z.jsx)(sD,{"aria-label":`system log history`,children:w.map(t=>(0,Z.jsxs)(cD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,It(t.moneyBits)]})})]}),x.has(t.id)?(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})}):(0,Z.jsx)(Q,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:x.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Pin`})})]},t.id))})]}):(0,Z.jsxs)(uD,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,S.length>0&&` Latest: Purge #${S[0].purgeNumber} (+${S[0].pointsAwarded} PP).`]})]})}),(0,Z.jsx)(TD,{icon:`📈`,label:`Task Manager`,value:o?null:`🔒`,children:(0,Z.jsxs)(GE,{"aria-label":`task manager section`,children:[(0,Z.jsx)(`h2`,{children:`Task Manager`}),o?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,zt(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,Z.jsx)(uD,{children:`Bits`}),(0,Z.jsx)(lD,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:j||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,Z.jsx)(uD,{children:`Purge Points`}),(0,Z.jsx)(lD,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:te||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,Z.jsx)(uD,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,Z.jsxs)(hD,{label:`Data`,children:[!1,(0,Z.jsx)(TD,{icon:`🗄`,label:`Backup / Restore`,children:(0,Z.jsx)(QE,{game:e})}),ee&&(0,Z.jsx)(TD,{icon:`🛒`,label:`Store`,children:(0,Z.jsx)(nD,{})}),(0,Z.jsx)(TD,{icon:`ℹ`,label:`About`,children:(0,Z.jsxs)(GE,{"aria-label":`about section`,children:[(0,Z.jsx)(`h2`,{children:`About`}),(0,Z.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,Z.jsx)(TD,{icon:`⚖`,label:`Legal`,children:(0,Z.jsx)(eD,{})})]}),(0,Z.jsx)(hD,{label:`Display`,children:(0,Z.jsx)(TD,{icon:`🎨`,inline:(0,Z.jsx)(dD,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,Z.jsx)(Q,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,Z.jsx)($,{children:t})},e))}),label:`Theme`})}),(0,Z.jsx)(hD,{danger:!0,label:`Danger zone`,children:(0,Z.jsx)(TD,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,Z.jsxs)(GE,{"aria-label":`danger zone`,children:[(0,Z.jsx)(`h2`,{children:`Danger zone`}),(0,Z.jsxs)(`p`,{children:[`Erase the `,(0,Z.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reset active save…`}),(0,Z.jsx)(Ag,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,Z.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reformat Byte Foundry…`}),(0,Z.jsx)(Ag,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,Z.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,Z.jsx)(Q,{"aria-label":`Erase all save progress`,disabled:a||!1,onClick:k,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Erase all save progress…`})})]})})}),(0,Z.jsxs)(Y_,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>f(!1),onConfirm:A,open:d,title:`Reboot?`,children:[(0,Z.jsxs)(`p`,{children:[`Awards `,g,` `,y(g),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},DD=2**53-1,OD=e=>e?_i:DD,kD=2,AD=(e,t,n=DD)=>{let r=e>0?bi(e,yn(t)):0;return r<=0?null:{state:xi(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:yn(t)}:null}},jD=()=>{jT();let e=ZT(),t=oE();if(!t)return{state:Dt(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=sE(),r=AD(n?(Date.now()-n)/1e3:0,t,OD(yE()))??{state:t,offlineProgress:null};return{...r,state:wn(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},MD=()=>{let[e]=(0,v.useState)(jD),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>jT()),[l,u]=(0,v.useState)(()=>LT()),[d,f]=(0,v.useState)(()=>MT()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(jT()),u(LT())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>kD){let r=yn(y.current),a=bi(t,r);if(a>0){n(e=>xi(t,OD(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=yi(r,OD(D.current))(e);return document.visibilityState===`visible`?Sn(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>V_(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{aE(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,Xe);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)(gE),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,_E(!!e),S(!!e)},[]),[T,E]=(0,v.useState)(yE),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,bE(!!e),E(!!e)},[]),k=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&ki(n)?t:e)(n));return{buyTierQuantity:t=>D.current?n(e=>Oi(t,1)(e)):e(Oi(t,DD),Fi(t)),buyTickspeedMultiplier:t=>e(Ku(t),ji(Ku(t))),buyAutobuyerIntervalUpgrade:e=>n(q(e)),buyAutomationIntervalUpgrade:e=>n(cd(e)),buyTierTickspeedIntervalUpgrade:e=>n(fd(e)),setAutoOverclockEnabled:e=>n(md(e)),startComputeCharge:e=>n(jc(e)),setComputeAutoChargeEnabled:e=>n(pd(e)),buyGlobalTickspeedMultiplier:()=>e(_d,ji(_d)),buyPlaytimeBonus:()=>n(fn),buyBuyMaxUnlock:()=>n(pn),buyCacheWarm:()=>n(mn),buySleepModeCapUpgrade:()=>e(xn,ji(xn)),buyPrestigeSpeedBonus:()=>n(un),buyPrestigeDoublePp:()=>e(ur,ji(ur)),buyComputeFlopsTier:t=>e(An(t),ji(An(t))),buyHyperscaler:()=>n(Vn),eraAscend:()=>n(lr),enterChallenge:e=>n(Td(e)),exitChallenge:()=>n(Ed),purge:()=>n(wd),dailyStart:e=>n(L_(e,Date.now())),dailyForfeit:e=>n(R_(e)),dailyRestart:e=>n(B_(e,Date.now())),dailyPlay:(e,t,r)=>n(H_(e,t,r,Date.now())),scaleUp:()=>n(Md),overclock:()=>n(Nd),setComputeAutoBoostEnabled:e=>n(Ru(e)),setComputeAutoBoostType:e=>n(zu(e)),consumeXpForLastTierTickspeed:e=>n(Vd(e)),setAutoScaleUpEnabled:e=>n(Rd(e)),setAutoXpTickspeedEnabled:e=>n(Ld(e)),setAutoGlobalTickspeedEnabled:e=>n(zd(e)),setAutoPurgeEnabled:e=>n(gd(e)),setAutobuyerEnabled:(e,t)=>n(Vu(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(hd(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(Wn(e,t)),tapIntroBit:()=>n(aa),tapPoolBuffer:e=>n(Na(e)),combineIntroByte:()=>n(oa),pickIntroCapacityMilestone:()=>n(Qa),queueIntroSpeedUpgrade:()=>n(Ya),unlockNextDiskSize:()=>n(Ro),clearIntroCapacityUpgradeQueue:()=>n(to),convertIntroBitsToKilobytes:()=>n(Oo),provisionDisk:()=>n(Xo),queueDiskBuild:()=>n(Zo),clearDiskBuildQueue:()=>n(Qo),expediteDiskFill:e=>n(ys(e)),doubleDataLakeCapacity:e=>n(ll(e)),activateComputeBoost:(e,t)=>n(Fu(e,t)),stackComputeBoost:e=>n(Iu(e)),reclaimComputeBoost:e=>n(Mu(e)),forfeitComputeBoost:e=>n(Pu(e)),mergeComputeCoresIntoNode:()=>n(pl),mergeComputeNodesIntoCluster:()=>n(ml),mergeComputeClustersIntoNetwork:()=>n(hl),mergeComputeNetworksIntoGrid:()=>n(gl),mergeComputeGridsIntoFabric:()=>n(_l),mergeComputeFabricsIntoCloud:()=>n(vl),mergeComputeCloudsIntoDatacenter:()=>n(yl),mergeComputeDatacentersIntoSupercomputer:()=>n(bl),mergeComputeSupercomputersIntoMegacomputer:()=>n(xl),enableAutoMergeCoresIntoNode:()=>n(Ml),enableAutoMergeNodesIntoCluster:()=>n(Il),enableAutoMergeClustersIntoNetwork:()=>n(Bl),enableAutoMergeNetworksIntoGrid:()=>n(Wl),enableAutoMergeGridsIntoFabric:()=>n(Jl),enableAutoMergeFabricsIntoCloud:()=>n(Ql),enableAutoMergeCloudsIntoDatacenter:()=>n(nu),enableAutoMergeDatacentersIntoSupercomputer:()=>n(ou),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(uu),startComputeCoresMerge:()=>n(Pl),startComputeNodesMerge:()=>n(Rl),startComputeClustersMerge:()=>n(Hl),startComputeNetworksMerge:()=>n(Kl),startComputeGridsMerge:()=>n(Xl),startComputeFabricsMerge:()=>n(eu),startComputeCloudsMerge:()=>n(iu),startComputeDatacentersMerge:()=>n(cu),startComputeSupercomputersMerge:()=>n(fu),startDataLakeAutoConvert:e=>n(Kc(e)),flushStoragePool:e=>n(Gc(e)),pinMuseumEntry:e=>n(Od(e)),unpinMuseumEntry:e=>n(kd(e))}},[]),A=(0,v.useCallback)(()=>{cE(),_(null),n(Dt()),i(null),o(null),m([]),b()},[b]),ee=(0,v.useCallback)(()=>{n(Cd)},[]),j=(0,v.useCallback)(e=>{let t=JT(e);return t.ok&&(t.clearedActive&&(_(null),n(Dt()),i(null),o(null),m([])),b()),t},[b]),te=(0,v.useCallback)(()=>{let e=YT();return e.ok&&(_(null),n(Dt()),i(null),o(null),m([]),b()),e},[b]),M=(0,v.useCallback)(()=>i(null),[]),N=(0,v.useRef)(new WeakSet),ne=(0,v.useCallback)(e=>!e||e.rewardClaimed||N.current.has(e)?!1:(N.current.add(e),n(t=>Ci(e.elapsedRealSeconds,OD(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+Si(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),re=(0,v.useCallback)(()=>o(null),[]),ie=(0,v.useCallback)(e=>{aE(y.current);let t=RT(e);if(!t.ok)return t;if(t.already)return b(),t;let r=ZT(),a=oE()??Dt(),s=sE(),c=AD(s?(Date.now()-s)/1e3:0,a,OD(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),P=(0,v.useCallback)(()=>{aE(y.current);let e=!MT();NT(e),f(e);let t=ZT(),r=oE();_(r),n(r??Dt()),i(null),o(t),m([]),b()},[b]),ae=(0,v.useCallback)(()=>{MT()&&(lE(),_(null),n(Dt()),i(null),o(null),m([]))},[]),oe=(0,v.useCallback)(e=>{let t=dE(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),se=(0,v.useCallback)(e=>{MT()&&n(t=>Ia(e(t)))},[]),ce=(0,v.useCallback)(()=>fE(y.current),[]),le=(0,v.useCallback)(e=>{let t=mE(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),ue=(0,v.useCallback)((e,t)=>{let n=zT(e,t);return n.ok&&b(),n},[b]),de=(0,v.useCallback)(e=>{let t=BT(e);return t.ok&&b(),t},[b]);return{actions:k,applyCloudSave:le,applyDevStateJson:oe,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:ne,clearSlot:j,devModeActive:d,dismissIncompatibleSaveNotice:re,dismissOfflineProgress:M,eraseAllSaveProgress:te,exportSaveJson:ce,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=VT();return e.ok&&b(),e},[b]),redeemUnlockCode:de,renameSaveSlot:ue,resetByteFoundry:ee,resetDevState:ae,resetGame:A,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:se,state:t,switchSaveSlot:ie,toggleDevMode:P}},ND=Jm`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${e=>e.theme.font.body};
    font-variant-numeric: ${e=>e.theme.type.numeric};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${e=>e.theme.color.page};
    color: ${e=>e.theme.color.text};
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }
`,PD={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},FD={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},ID={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},LD={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},RD={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},zD={minHeight:500,medium:600,expanded:900,wide:1360,splitMinWidth:784,splitMinAspect:.8},BD={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},VD={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},HD={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},UD=[`dark`,`light`],WD=`dark`,GD=e=>{let t=UD.includes(e)?e:WD;return{mode:t,color:PD[t],shadow:FD[t],tierAccents:ID[t],space:LD,radius:RD,motion:BD,breakpoints:zD,font:VD,type:HD}},KD={dark:GD(`dark`),light:GD(`light`)},qD=({width:e,height:t})=>!(t>=zD.minHeight)||!(e>=zD.medium)?`compact`:e<zD.expanded?`medium`:e<zD.wide?`expanded`:`wide`;zD.medium,zD.expanded,zD.wide;var JD={layoutClass:`compact`,width:0,height:0},YD=()=>{if(typeof window>`u`)return null;let e=window.visualViewport,t=Math.round(window.innerWidth||e?.width||0),n=Math.round(window.innerHeight||e?.height||0);return t>0&&n>0?{width:t,height:n}:null},XD=()=>{let e=YD();return e?{...e,layoutClass:qD(e)}:JD},ZD=()=>{let[e,t]=(0,v.useState)(XD);return(0,v.useEffect)(()=>{if(typeof window>`u`)return;let e=null,n=window.requestAnimationFrame??(e=>setTimeout(e,16)),r=window.cancelAnimationFrame??clearTimeout,i=()=>{e=null;let n=XD();t(e=>e.width===n.width&&e.height===n.height&&e.layoutClass===n.layoutClass?e:n)},a=()=>{e===null&&(e=n(i))};window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,a);let o=window.visualViewport;return o?.addEventListener(`resize`,a),a(),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,a),o?.removeEventListener(`resize`,a),e!==null&&r(e)}},[]),e},QD=(0,v.createContext)(JD),$D=({children:e})=>(0,Z.jsx)(QD.Provider,{value:ZD(),children:e}),eO=()=>typeof window>`u`||typeof window.matchMedia!=`function`?WD:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,tO=e=>e===`light`||e===`dark`?e:eO(),nO=({mode:e=WD,children:t})=>(0,Z.jsx)(Lm,{theme:KD[e]??KD.dark,children:t}),rO=()=>tO(SE()),iO=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`settings`,`dev`]),aO=X.div`
  padding-bottom: ${vg};
`;function oO(){let e=MD(),[t,n]=(0,v.useState)(SE),[r,i]=(0,v.useState)(rO),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!iO.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=ul(e.state),b=Cn(e.state),x=h,S=h&&Ai(e.state),C=S,w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{Qr(e.state)||window.confirm(UT())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{Qr(e.state)||window.confirm(WT())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(tO(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{CE(e),n(e),i(tO(e))},O;O=g?(0,Z.jsx)(BS,{focusNonce:p,game:e}):a===`info`?(0,Z.jsx)(LC,{}):a===`boosters`?(0,Z.jsx)(kC,{game:e}):a===`compute`?(0,Z.jsx)(tC,{game:e}):a===`perks`&&S?(0,Z.jsx)(Xw,{focusNonce:l,game:e}):a===`challenges`&&C?(0,Z.jsx)(zb,{focusNonce:d,game:e}):a===`milestones`?(0,Z.jsx)(GC,{game:e}):a===`achievements`&&ue.enabled?(0,Z.jsx)(kh,{game:e}):a===`dev`?(0,Z.jsx)(Ky,{game:e}):a===`settings`?(0,Z.jsx)(ED,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,Z.jsx)(Ky,{game:e});let k=lg(e.state);return(0,Z.jsxs)(nO,{mode:r,children:[(0,Z.jsx)(ND,{}),(0,Z.jsxs)($D,{children:[(0,Z.jsx)(aO,{children:O}),(0,Z.jsx)(_g,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,Z.jsx)(ph,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,Z.jsx)(sh,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,Z.jsx)(Fg,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})]})}var sO=`modulepreload`,cO=function(e){return`/tens/`+e},lO={},uO=function(e){return e.pathname.endsWith(`.css`)},dO=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},fO=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=cO(t,n);let r=s(t),i=uO(r);return dO(lO,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:sO,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},pO=e=>{e&&e instanceof Function&&fO(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},mO=document.getElementById(`root`);if(!mO)throw Error(`Root element not found`);(0,y.createRoot)(mO).render((0,Z.jsx)(v.StrictMode,{children:(0,Z.jsx)(oO,{})})),pO();