var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=`dev:`)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function te(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=M(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(te(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function N(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var re=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ie(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,re)}catch(e){re(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function P(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ie(P.bind(null,e))}var ae={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ae,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=P,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ie,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),ee=Symbol.for(`react.fragment`),j=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),M=Symbol.for(`react.consumer`),N=Symbol.for(`react.context`),ne=Symbol.for(`react.forward_ref`),re=Symbol.for(`react.suspense`),ie=Symbol.for(`react.suspense_list`),P=Symbol.for(`react.memo`),ae=Symbol.for(`react.lazy`),oe=Symbol.for(`react.activity`),se=Symbol.for(`react.legacy_hidden`),ce=Symbol.for(`react.memo_cache_sentinel`),le=Symbol.for(`react.view_transition`),ue=Symbol.for(`react.recoverable`),de=Symbol.iterator;function fe(e){return typeof e!=`object`||!e?null:(e=de&&e[de]||e[`@@iterator`],typeof e==`function`?e:null)}var pe=Symbol.for(`react.client.reference`);function me(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ee:return`Fragment`;case te:return`Profiler`;case j:return`StrictMode`;case re:return`Suspense`;case ie:return`SuspenseList`;case oe:return`Activity`;case le:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case N:return e.displayName||`Context`;case M:return(e._context.displayName||`Context`)+`.Consumer`;case ne:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case P:return t=e.displayName||null,t===null?me(e.type)||`Memo`:t;case ae:t=e._payload,e=e._init;try{return me(e(t))}catch{}}return null}var he=Array.isArray,F=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ge={pending:!1,data:null,method:null,action:null},_e=[],ve=-1;function ye(e){return{current:e}}function be(e){0>ve||(e.current=_e[ve],_e[ve]=null,ve--)}function L(e,t){ve++,_e[ve]=e.current,e.current=t}var xe=ye(null),Se=ye(null),Ce=ye(null),we=ye(null);function Te(e,t){switch(L(Ce,t),L(Se,e),L(xe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mp(t),e=hp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}be(xe),L(xe,e)}function Ee(){be(xe),be(Se),be(Ce)}function De(e){var t=e.memoizedState;t!==null&&(lh._currentValue=t.memoizedState,L(we,e)),t=xe.current;var n=hp(t,e.type);t!==n&&(L(Se,e),L(xe,n))}function Oe(e){Se.current===e&&(be(xe),be(Se)),we.current===e&&(be(we),lh._currentValue=ge)}var ke,Ae;function je(e){if(ke===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ke=t&&t[1]||``,Ae=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ke+e+Ae}var Me=!1;function Ne(e,t){if(!e||Me)return``;Me=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Me=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?je(n):``}function Pe(e,t){switch(e.tag){case 26:case 27:case 5:return je(e.type);case 16:return je(`Lazy`);case 13:return e.child!==t&&t!==null?je(`Suspense Fallback`):je(`Suspense`);case 19:return je(`SuspenseList`);case 0:case 15:return Ne(e.type,!1);case 11:return Ne(e.type.render,!1);case 1:return Ne(e.type,!0);case 31:return je(`Activity`);case 30:return je(`ViewTransition`);default:return``}}function Fe(e){try{var t=``,n=null;do t+=Pe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ie=Object.prototype.hasOwnProperty,Le=t.unstable_scheduleCallback,Re=t.unstable_cancelCallback,ze=t.unstable_shouldYield,Be=t.unstable_requestPaint,Ve=t.unstable_now,He=t.unstable_getCurrentPriorityLevel,Ue=t.unstable_ImmediatePriority,We=t.unstable_UserBlockingPriority,Ge=t.unstable_NormalPriority,Ke=t.unstable_LowPriority,qe=t.unstable_IdlePriority,Je=t.log,Ye=t.unstable_setDisableYieldValue,Xe=null,Ze=null;function Qe(e){if(typeof Je==`function`&&Ye(e),Ze&&typeof Ze.setStrictMode==`function`)try{Ze.setStrictMode(Xe,e)}catch{}}var $e=Math.clz32?Math.clz32:nt,et=Math.log,tt=Math.LN2;function nt(e){return e>>>=0,e===0?32:31-(et(e)/tt|0)|0}var rt=256,it=262144,at=4194304;function ot(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function st(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ot(n))):i=ot(o):i=ot(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ot(n))):i=ot(o)):i=ot(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ct(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function lt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-$e(n),i=1<<r;t|=e[r],n&=~i}return t}function ut(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dt(){var e=at;return at<<=1,!(at&62914560)&&(at=4194304),e}function ft(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function pt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function mt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-$e(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&R(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function R(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-$e(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ht(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-$e(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function gt(e,t){var n=t&-t;return n=n&42?1:_t(n),(n&(e.suspendedLanes|t))===0?n:0}function _t(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function vt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function yt(){var e=I.p;return e===0?(e=window.event,e===void 0?32:Th(e.type)):e}function bt(e,t){var n=I.p;try{return I.p=e,t()}finally{I.p=n}}var xt=Math.random().toString(36).slice(2),St=`__reactFiber$`+xt,Ct=`__reactProps$`+xt,wt=`__reactContainer$`+xt,Tt=`__reactEvents$`+xt,Et=`__reactListeners$`+xt,Dt=`__reactHandles$`+xt,z=`__reactResources$`+xt,Ot=`__reactMarker$`+xt,kt=`__reactLoad$`+xt;function At(e){delete e[St],delete e[Ct],delete e[Et],delete e[Dt]}function jt(e){var t;if(t=e[St])return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gm(e);e!==null;){if(n=e[St])return n;e=gm(e)}return t}e=n,n=e.parentNode}return null}function Mt(e){if(e=e[St]||e[wt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Pt(e){var t=e[z];return t||=e[z]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ft(e){e[Ot]=!0}function It(e){e[kt]=void 0}var Lt=new Set,Rt={};function zt(e,t){Bt(e,t),Bt(e+`Capture`,t)}function Bt(e,t){for(Rt[e]=t,e=0;e<t.length;e++)Lt.add(t[e])}var Vt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ht={},Ut={};function Wt(e){return Ie.call(Ut,e)?!0:Ie.call(Ht,e)?!1:Vt.test(e)?Ut[e]=!0:(Ht[e]=!0,!1)}var B=!1;function Gt(){var e=B;return B=!1,e}function Kt(e,t,n){if(Wt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function qt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Jt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Yt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Xt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Zt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Qt(e){if(!e._valueTracker){var t=Xt(e)?`checked`:`value`;e._valueTracker=Zt(e,t,``+e[t])}}function $t(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Xt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var en=/[\n"\\]/g;function tn(e){return e.replace(en,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function nn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Yt(t)):e.value!==``+Yt(t)&&(e.value=``+Yt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):an(e,Yt(n)):o===`number`&&e.value==t?an(e,Yt(e.value)):an(e,Yt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Yt(s):e.removeAttribute(`name`)}function rn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Qt(e);return}n=n==null?``:``+Yt(n),t=t==null?n:``+Yt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Qt(e)}function an(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function on(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Yt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function sn(e,t,n){t!=null&&(t=``+Yt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Yt(n)}function cn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(he(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Yt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Qt(e)}function ln(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var un=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function dn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||un.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function fn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,B=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(dn(e,a,r),B=!0)}else for(var o in t)t.hasOwnProperty(o)&&dn(e,o,t[o])}function pn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var mn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),hn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function gn(e){return hn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function _n(){}var vn=null;function yn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var bn=null,xn=null;function Sn(e){var t=Mt(e);if(t&&(e=t.stateNode)){var n=e[Ct]||null;a:switch(e=t.stateNode,t.type){case`input`:if(nn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+tn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ct]||null;if(!a)throw Error(i(90));nn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&$t(r)}break a;case`textarea`:sn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&on(e,!!n.multiple,t,!1)}}}var Cn=!1;function wn(e,t,n){if(Cn)return e(t,n);Cn=!0;try{return e(t)}finally{if(Cn=!1,(bn!==null||xn!==null)&&(Hd(),bn&&(t=bn,e=xn,xn=bn=null,Sn(t),e)))for(t=0;t<e.length;t++)Sn(e[t])}}function Tn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Ct]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var En=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Dn=!1;if(En)try{var On={};Object.defineProperty(On,"passive",{get:function(){Dn=!0}}),window.addEventListener(`test`,On,On),window.removeEventListener(`test`,On,On)}catch{Dn=!1}var kn=null,An=null,jn=null;function Mn(){if(jn)return jn;var e,t=An,n=t.length,r,i=`value`in kn?kn.value:kn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return jn=i.slice(e,1<r?1-r:void 0)}function Nn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Pn(){return!0}function Fn(){return!1}function In(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Pn:Fn,this.isPropagationStopped=Fn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Pn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Pn)},persist:function(){},isPersistent:Pn}),t}var Ln={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Rn=In(Ln),zn=D({},Ln,{view:0,detail:0}),Bn=In(zn),Vn,Hn,Un,Wn=D({},zn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Un&&(Un&&e.type===`mousemove`?(Vn=e.screenX-Un.screenX,Hn=e.screenY-Un.screenY):Hn=Vn=0,Un=e),Vn)},movementY:function(e){return`movementY`in e?e.movementY:Hn}}),Gn=In(Wn),Kn=In(D({},Wn,{dataTransfer:0})),qn=In(D({},zn,{relatedTarget:0})),Jn=In(D({},Ln,{animationName:0,elapsedTime:0,pseudoElement:0})),Yn=In(D({},Ln,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Xn=In(D({},Ln,{data:0})),Zn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Qn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},$n={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function er(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$n[e])?!!t[e]:!1}function tr(){return er}var nr=In(D({},zn,{key:function(e){if(e.key){var t=Zn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Nn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Qn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tr,charCode:function(e){return e.type===`keypress`?Nn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Nn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),rr=In(D({},Wn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ir=In(D({},Ln,{submitter:0})),ar=In(D({},zn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tr})),or=In(D({},Ln,{propertyName:0,elapsedTime:0,pseudoElement:0})),sr=In(D({},Wn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),cr=In(D({},Ln,{newState:0,oldState:0,source:0})),lr=[9,13,27,32],ur=En&&`CompositionEvent`in window,dr=null;En&&`documentMode`in document&&(dr=document.documentMode);var fr=En&&`TextEvent`in window&&!dr,pr=En&&(!ur||dr&&8<dr&&11>=dr),mr=` `,hr=!1;function gr(e,t){switch(e){case`keyup`:return lr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function _r(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var vr=!1;function yr(e,t){switch(e){case`compositionend`:return _r(t);case`keypress`:return t.which===32?(hr=!0,mr):null;case`textInput`:return e=t.data,e===mr&&hr?null:e;default:return null}}function br(e,t){if(vr)return e===`compositionend`||!ur&&gr(e,t)?(e=Mn(),jn=An=kn=null,vr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return pr&&t.locale!==`ko`?null:t.data;default:return null}}var xr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!xr[e.type]:t===`textarea`}function Cr(e,t,n,r){bn?xn?xn.push(r):xn=[r]:bn=r,t=Zf(t,`onChange`),0<t.length&&(n=new Rn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var wr=null,Tr=null;function Er(e){Wf(e,0)}function Dr(e){if($t(Nt(e)))return e}function Or(e,t){if(e===`change`)return t}var kr=!1;if(En){var Ar;if(En){var jr=`oninput`in document;if(!jr){var Mr=document.createElement(`div`);Mr.setAttribute(`oninput`,`return;`),jr=typeof Mr.oninput==`function`}Ar=jr}else Ar=!1;kr=Ar&&(!document.documentMode||9<document.documentMode)}function Nr(){wr&&(wr.detachEvent(`onpropertychange`,Pr),Tr=wr=null)}function Pr(e){if(e.propertyName===`value`&&Dr(Tr)){var t=[];Cr(t,Tr,e,yn(e)),wn(Er,t)}}function Fr(e,t,n){e===`focusin`?(Nr(),wr=t,Tr=n,wr.attachEvent(`onpropertychange`,Pr)):e===`focusout`&&Nr()}function Ir(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Dr(Tr)}function Lr(e,t){if(e===`click`)return Dr(t)}function Rr(e,t){if(e===`input`||e===`change`)return Dr(t)}function zr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Br=typeof Object.is==`function`?Object.is:zr;function Vr(e,t){if(Br(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ie.call(t,i)||!Br(e[i],t[i]))return!1}return!0}function Hr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Ur(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Wr(e,t){var n=Ur(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Ur(n)}}function Gr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Gr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Kr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Hr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Hr(e.document)}return t}function qr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Jr=En&&`documentMode`in document&&11>=document.documentMode,Yr=null,Xr=null,Zr=null,Qr=!1;function $r(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Qr||Yr==null||Yr!==Hr(r)||(r=Yr,`selectionStart`in r&&qr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Zr&&Vr(Zr,r)||(Zr=r,r=Zf(Xr,`onSelect`),0<r.length&&(t=new Rn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Yr)))}function ei(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ti={animationend:ei(`Animation`,`AnimationEnd`),animationiteration:ei(`Animation`,`AnimationIteration`),animationstart:ei(`Animation`,`AnimationStart`),transitionrun:ei(`Transition`,`TransitionRun`),transitionstart:ei(`Transition`,`TransitionStart`),transitioncancel:ei(`Transition`,`TransitionCancel`),transitionend:ei(`Transition`,`TransitionEnd`)},ni={},ri={};En&&(ri=document.createElement(`div`).style,`AnimationEvent`in window||(delete ti.animationend.animation,delete ti.animationiteration.animation,delete ti.animationstart.animation),`TransitionEvent`in window||delete ti.transitionend.transition);function ii(e){if(ni[e])return ni[e];if(!ti[e])return e;var t=ti[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ri)return ni[e]=t[n];return e}var ai=ii(`animationend`),oi=ii(`animationiteration`),si=ii(`animationstart`),ci=ii(`transitionrun`),li=ii(`transitionstart`),ui=ii(`transitioncancel`),di=ii(`transitionend`),fi=new Map,pi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);pi.push(`scrollEnd`);function mi(e,t){fi.set(e,t),zt(t,[e])}var hi=0;function gi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=Cd.identifierPrefix;var n=hi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function _i(e){if(e==null||typeof e==`string`)return e;var t=null,n=jd;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function vi(e,t){return e=_i(e),t=_i(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var yi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},bi=[],xi=0,Si=0;function Ci(){for(var e=xi,t=Si=xi=0;t<e;){var n=bi[t];bi[t++]=null;var r=bi[t];bi[t++]=null;var i=bi[t];bi[t++]=null;var a=bi[t];if(bi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Di(n,i,a)}}function wi(e,t,n,r){bi[xi++]=e,bi[xi++]=t,bi[xi++]=n,bi[xi++]=r,Si|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ti(e,t,n,r){return wi(e,t,n,r),Oi(e)}function Ei(e,t){return wi(e,null,null,t),Oi(e)}function Di(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-$e(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Oi(e){if(50<Md)throw Md=0,Nd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ki={};function Ai(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ji(e,t,n,r){return new Ai(e,t,n,r)}function Mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ni(e,t){var n=e.alternate;return n===null?(n=ji(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Pi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Fi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Mi(r)&&(s=1);else if(typeof r==`string`)s=Ym(e,n,xe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case oe:return e=ji(31,n,t,a),e.elementType=oe,e.lanes=o,e;case ee:return Ii(n.children,a,o,t);case j:s=8,a|=24;break;case te:return e=ji(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case re:return e=ji(13,n,t,a),e.elementType=re,e.lanes=o,e;case ie:return e=ji(19,n,t,a),e.elementType=ie,e.lanes=o,e;case se:case le:return e=a|32,e=ji(30,n,t,e),e.elementType=le,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case N:s=10;break a;case M:s=9;break a;case ne:s=11;break a;case P:s=14;break a;case ae:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ji(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ii(e,t,n,r){return e=ji(7,e,r,t),e.lanes=n,e}function Li(e,t,n){return e=ji(6,e,null,t),e.lanes=n,e}function Ri(e){var t=ji(18,null,null,0);return t.stateNode=e,t}function zi(e,t,n){return t=ji(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Bi=new WeakMap;function Vi(e,t){if(typeof e==`object`&&e){var n=Bi.get(e);return n===void 0?(t={value:e,source:t,stack:Fe(t)},Bi.set(e,t),t):n}return{value:e,source:t,stack:Fe(t)}}var Hi=[],Ui=0,Wi=null,Gi=0,Ki=[],qi=0,Ji=null,Yi=1,Xi=``;function V(e,t){Hi[Ui++]=Gi,Hi[Ui++]=Wi,Wi=e,Gi=t}function Zi(e,t,n){Ki[qi++]=Yi,Ki[qi++]=Xi,Ki[qi++]=Ji,Ji=e;var r=Yi;e=Xi;var i=32-$e(r)-1;r&=~(1<<i),n+=1;var a=32-$e(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Yi=1<<32-$e(t)+i|n<<i|r,Xi=a+e}else Yi=1<<a|n<<i|r,Xi=e}function Qi(e){e.return!==null&&(V(e,1),Zi(e,1,0))}function $i(e){for(;e===Wi;)Wi=Hi[--Ui],Hi[Ui]=null,Gi=Hi[--Ui],Hi[Ui]=null;for(;e===Ji;)Ji=Ki[--qi],Ki[qi]=null,Xi=Ki[--qi],Ki[qi]=null,Yi=Ki[--qi],Ki[qi]=null}function ea(e,t){Ki[qi++]=Yi,Ki[qi++]=Xi,Ki[qi++]=Ji,Yi=t.id,Xi=t.overflow,Ji=e}var ta=null,na=null,H=!1,ra=null,ia=!1,aa=Error(i(519));function oa(e){throw fa(Vi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),aa}function sa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[St]=e,t[Ct]=r,n){case`dialog`:Y(`cancel`,t),Y(`close`,t);break;case`iframe`:case`object`:case`embed`:Y(`load`,t);break;case`video`:case`audio`:for(n=0;n<Hf.length;n++)Y(Hf[n],t);break;case`source`:Y(`error`,t);break;case`img`:case`image`:case`link`:Y(`error`,t),Y(`load`,t);break;case`details`:Y(`toggle`,t);break;case`input`:Y(`invalid`,t),rn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Y(`invalid`,t);break;case`textarea`:Y(`invalid`,t),cn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||rp(t.textContent,n)?(r.popover!=null&&(Y(`beforetoggle`,t),Y(`toggle`,t)),r.onScroll!=null&&Y(`scroll`,t),r.onScrollEnd!=null&&Y(`scrollend`,t),r.onClick!=null&&(t.onclick=_n),t=!0):t=!1,t||oa(e,!0)}function ca(e){for(ta=e.return;ta;)switch(ta.tag){case 5:case 31:case 13:ia=!1;return;case 27:case 3:ia=!0;return;default:ta=ta.return}}function la(e){if(e!==ta)return!1;if(!H)return ca(e),H=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||_p(e.type,e.memoizedProps)),n=!n),n&&na&&oa(e),ca(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=hm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=hm(e)}else t===27?(t=na,Ep(e.type)?(e=mm,mm=null,na=e):na=t):na=ta?pm(e.stateNode.nextSibling):null;return!0}function ua(){na=ta=null,H=!1}function da(){var e=ra;return e!==null&&(hd===null?hd=e:hd.push.apply(hd,e),ra=null),e}function fa(e){ra===null?ra=[e]:ra.push(e)}var pa=ye(null),ma=null,ha=null;function ga(e,t,n){L(pa,t._currentValue),t._currentValue=n}function _a(e){e._currentValue=pa.current,be(pa)}function va(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ya(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),va(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),va(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),va(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ba(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Br(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===we.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[lh]:e.push(lh))}a=a.return}return e!==null&&ya(t,e,n,r),t.flags|=262144,e!==null}function xa(e){for(e=e.firstContext;e!==null;){if(!Br(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Sa(e){ma=e,ha=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ca(e){return Ta(ma,e)}function wa(e,t){return ma===null&&Sa(e),Ta(e,t)}function Ta(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ha===null){if(e===null)throw Error(i(308));ha=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ha=ha.next=t;return n}var Ea=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Da=t.unstable_scheduleCallback,Oa=t.unstable_NormalPriority,ka={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Aa(){return{controller:new Ea,data:new Map,refCount:0}}function ja(e){e.refCount--,e.refCount===0&&Da(Oa,function(){e.controller.abort()})}function Ma(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Na=null;function Pa(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Fa=null,Ia=0,La=0,Ra=null;function za(e,t){if(Fa===null){var n=Fa=[];Ia=0,La=Lf(),Ra={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ia++,t.then(Ba,Ba),t}function Ba(){if(--Ia===0&&(Na=null,Fa!==null)){Ra!==null&&(Ra.status=`fulfilled`);var e=Fa;Fa=null,La=0,Ra=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Va(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ha=F.S;F.S=function(e,t){if(vd=Ve(),typeof t==`object`&&t&&typeof t.then==`function`&&za(e,t),Na!==null)for(var n=Cf;n!==null;)Ma(n,Na),n=n.next;if(n=e.types,n!==null){for(var r=Cf;r!==null;)Ma(r,n),r=r.next;if(La!==0){r=Na,r===null&&(r=Na=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ha!==null&&Ha(e,t)};var Ua=ye(null);function Wa(){var e=Ua.current;return e===null?td.pooledCache:e}function Ga(e,t){t===null?L(Ua,Ua.current):L(Ua,t.pool)}function Ka(){var e=Wa();return e===null?null:{parent:ka._currentValue,pool:e}}var qa=Error(i(460)),Ja=Error(i(474)),Ya=Error(i(542)),Xa={then:function(){}};function Za(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Qa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(_n,_n),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,no(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(_n,_n);else{if(e=td,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,no(e),e}throw eo=t,qa}}function $a(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(eo=e,qa):e}}var eo=null;function to(){if(eo===null)throw Error(i(459));var e=eo;return eo=null,e}function no(e){if(e===qa||e===Ya)throw Error(i(483))}var ro=null,io=0;function ao(e){var t=io;return io+=1,ro===null&&(ro=[]),Qa(ro,e,t)}function oo(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function so(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function co(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Ni(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Li(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ee?(e=d(e,t,n.props.children,r,n.key),oo(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ae&&$a(i)===t.type)?(t=a(t,n.props),oo(t,n),t.return=e,t):(t=Fi(n.type,n.key,n.props,null,e.mode,r),oo(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=zi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ii(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Li(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Fi(t.type,t.key,t.props,null,e.mode,n),oo(n,t),n.return=e,n;case A:return t=zi(t,e.mode,n),t.return=e,t;case ae:return t=$a(t),f(e,t,n)}if(he(t)||fe(t))return t=Ii(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ao(t),n);if(t.$$typeof===N)return f(e,wa(e,t),n);so(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case ae:return n=$a(n),p(e,t,n,r)}if(he(n)||fe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ao(n),r);if(n.$$typeof===N)return p(e,t,wa(e,n),r);so(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ae:return r=$a(r),m(e,t,n,r,i)}if(he(r)||fe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ao(r),i);if(r.$$typeof===N)return m(e,t,n,wa(t,r),i);so(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),H&&V(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return H&&V(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),H&&V(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),H&&V(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return H&&V(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),H&&V(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ee&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ee){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),oo(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ae&&$a(l)===r.type){n(e,r.sibling),c=a(r,o.props),oo(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ee?(c=Ii(o.props.children,e.mode,c,o.key),oo(c,o),c.return=e,e=c):(c=Fi(o.type,o.key,o.props,null,e.mode,c),oo(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=zi(o,e.mode,c),c.return=e,e=c}return s(e);case ae:return o=$a(o),_(e,r,o,c)}if(he(o))return h(e,r,o,c);if(fe(o)){if(l=fe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,ao(o),c);if(o.$$typeof===N)return _(e,r,wa(e,o),c);so(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Li(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{io=0;var i=_(e,t,n,r);return ro=null,i}catch(t){if(t===qa||t===Ya)throw t;var a=ji(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var lo=co(!0),uo=co(!1),fo=!1;function po(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ho(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function go(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ed&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Oi(e),Di(e,null,n),t}return wi(e,r,t,n),Oi(e)}function _o(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}function vo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var yo=!1;function bo(){if(yo){var e=Ra;if(e!==null)throw e}}function xo(e,t,n,r){yo=!1;var i=e.updateQueue;fo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===La&&(yo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:fo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),ld|=o,e.lanes=o,e.memoizedState=d}}function So(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Co(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)So(n[e],t)}var wo=ye(null),To=ye(0);function Eo(e,t){e=sd,L(To,e),L(wo,t),sd=e|t.baseLanes}function Do(){L(To,sd),L(wo,wo.current)}function Oo(){sd=To.current,be(wo),be(To)}var ko=ye(null),Ao=null;function U(e){var t=e.alternate;L(Fo,Fo.current&1),L(ko,e),Ao===null&&(t===null||wo.current!==null||t.memoizedState!==null)&&(Ao=e)}function jo(e){L(Fo,Fo.current),L(ko,e),Ao===null&&(Ao=e)}function Mo(e){e.tag===22?(L(Fo,Fo.current),L(ko,e),Ao===null&&(Ao=e)):No()}function No(){L(Fo,Fo.current),L(ko,ko.current)}function Po(e){be(ko),Ao===e&&(Ao=null),be(Fo)}var Fo=ye(0);function Io(e,t){L(ko,ko.current),L(Fo,t)}function Lo(e){be(Fo),be(ko),Ao===e&&(Ao=null)}function Ro(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||um(n)||dm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zo=0,W=null,Bo=null,Vo=null,Ho=!1,Uo=!1,Wo=!1,Go=0,Ko=0,qo=null,Jo=0;function Yo(){throw Error(i(321))}function Xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Br(e[n],t[n]))return!1;return!0}function Zo(e,t,n,r,i,a){return zo=a,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,F.H=e===null||e.memoizedState===null?pc:mc,Wo=!1,a=n(r,i),Wo=!1,Uo&&(a=$o(t,n,r,i)),Qo(e),a}function Qo(e){F.H=fc;var t=Bo!==null&&Bo.next!==null;if(zo=0,Vo=Bo=W=null,Ho=!1,Ko=0,qo=null,t)throw Error(i(300));e===null||jc||(e=e.dependencies,e!==null&&xa(e)&&(jc=!0))}function $o(e,t,n,r){W=e;var a=0;do{if(Uo&&(qo=null),Ko=0,Uo=!1,25<=a)throw Error(i(301));if(a+=1,Vo=Bo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}F.H=hc,o=t(n,r)}while(Uo);return o}function es(){var e=F.H,t=e.useState()[0];return t=typeof t.then==`function`?ss(t):t,e=e.useState()[0],(Bo===null?null:Bo.memoizedState)!==e&&(W.flags|=1024),t}function ts(){var e=Go!==0;return Go=0,e}function ns(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function rs(e){if(Ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ho=!1}zo=0,Vo=Bo=W=null,Uo=!1,Ko=Go=0,qo=null}function is(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vo===null?W.memoizedState=Vo=e:Vo=Vo.next=e,Vo}function as(){if(Bo===null){var e=W.alternate;e=e===null?null:e.memoizedState}else e=Bo.next;var t=Vo===null?W.memoizedState:Vo.next;if(t!==null)Vo=t,Bo=e;else{if(e===null)throw W.alternate===null?Error(i(467)):Error(i(310));Bo=e,e={memoizedState:Bo.memoizedState,baseState:Bo.baseState,baseQueue:Bo.baseQueue,queue:Bo.queue,next:null},Vo===null?W.memoizedState=Vo=e:Vo=Vo.next=e}return Vo}function os(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ss(e){var t=Ko;return Ko+=1,qo===null&&(qo=[]),e=Qa(qo,e,t),t=W,(Vo===null?t.memoizedState:Vo.next)===null&&(t=t.alternate,F.H=t===null||t.memoizedState===null?pc:mc),e}function cs(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ss(e);if(e.$$typeof===ue)return;if(e.$$typeof===N)return Ca(e)}throw Error(i(438,String(e)))}function ls(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=W.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=os(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ce;return t.index++,n}function us(e,t){return typeof t==`function`?t(e):t}function ds(e){return fs(as(),Bo,e)}function fs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(zo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===La&&(d=!0);else if((zo&p)===p){u=u.next,p===La&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,W.lanes|=p,ld|=p;f=u.action,Wo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,W.lanes|=f,ld|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Br(o,e.memoizedState)&&(jc=!0,d&&(n=Ra,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ps(e){var t=as(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Br(o,t.memoizedState)||(jc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ms(e,t,n){var r=W,a=as(),o=H;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Br((Bo||a).memoizedState,n);if(s&&(a.memoizedState=n,jc=!0),a=a.queue,Rs(_s.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Vo!==null&&!!(Vo.memoizedState.tag&1),Ns(e?9:8,{destroy:void 0},gs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,td===null)throw Error(i(349));o||zo&127||hs(r,t,n)}return n}function hs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=os(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gs(e,t,n,r){t.value=n,t.getSnapshot=r,vs(t)&&ys(e)}function _s(e,t,n){return n(function(){vs(t)&&ys(e)})}function vs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Br(e,n)}catch{return!0}}function ys(e){var t=Ei(e,2);t!==null&&Ld(t,e,2)}function bs(e){var t=is();if(typeof e==`function`){var n=e;if(e=n(),Wo){Qe(!0);try{n()}finally{Qe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:e},t}function xs(e,t,n,r){return e.baseState=n,fs(e,Bo,typeof r==`function`?r:us)}function Ss(e,t,n,r,a){if(lc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};F.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Cs(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Cs(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=F.T,o={};o.types=a===null?null:a.types,F.T=o;try{var s=n(i,r),c=F.S;c!==null&&c(o,s),ws(e,t,s)}catch(n){Es(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),F.T=a}}else try{a=n(i,r),ws(e,t,a)}catch(n){Es(e,t,n)}}function ws(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Ts(e,t,n)},function(n){return Es(e,t,n)}):Ts(e,t,n)}function Ts(e,t,n){t.status=`fulfilled`,t.value=n,Ds(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Cs(e,n)))}function Es(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ds(t),t=t.next;while(t!==r)}e.action=null}function Ds(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Os(e,t){return t}function ks(e,t){if(H){var n=td.formState;if(n!==null){a:{var r=W;if(H){if(na){b:{for(var i=na,a=ia;i.nodeType!==8;)if(!a||(i=pm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){na=pm(i.nextSibling),r=i.data===`F!`;break a}}oa(r)}r=!1}r&&(t=n[0])}}return n=is(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Os,lastRenderedState:t},n.queue=r,n=oc.bind(null,W,r),r.dispatch=n,r=bs(!1),a=cc.bind(null,W,!1,r.queue),r=is(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ss.bind(null,W,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function As(e){return js(as(),Bo,e)}function js(e,t,n){if(t=fs(e,t,Os)[0],e=ds(us)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ss(t)}catch(e){throw e===qa?Ya:e}else r=t;t=as();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(W.flags|=2048,Ns(9,{destroy:void 0},Ms.bind(null,i,n),null)),[r,a,e]}function Ms(e,t){e.action=t}function G(e){var t=as(),n=Bo;if(n!==null)return js(t,n,e);as(),t=t.memoizedState,n=as();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ns(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=W.updateQueue,t===null&&(t=os(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ps(){return as().memoizedState}function Fs(e,t,n,r){var i=is();W.flags|=e,i.memoizedState=Ns(1|t,{destroy:void 0},n,r===void 0?null:r)}function Is(e,t,n,r){var i=as();r=r===void 0?null:r;var a=i.memoizedState.inst;Bo!==null&&r!==null&&Xo(r,Bo.memoizedState.deps)?i.memoizedState=Ns(t,a,n,r):(W.flags|=e,i.memoizedState=Ns(1|t,a,n,r))}function Ls(e,t){Fs(8390656,8,e,t)}function Rs(e,t){Is(2048,8,e,t)}function zs(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=os(),W.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Bs(e){var t=as().memoizedState;return zs({ref:t,nextImpl:e}),function(){if(ed&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Vs(e,t){return Is(4,2,e,t)}function Hs(e,t){return Is(4,4,e,t)}function Us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ws(e,t,n){n=n==null?null:n.concat([e]),Is(4,4,Us.bind(null,t,e),n)}function Gs(){}function Ks(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qs(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xo(t,r[1]))return r[0];if(r=e(),Wo){Qe(!0);try{e()}finally{Qe(!1)}}return n.memoizedState=[r,t],r}function Js(e,t,n){return n===void 0||zo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Fd(),W.lanes|=e,ld|=e,n)}function Ys(e,t,n,r){return Br(n,t)?n:wo.current===null?!(zo&106)||zo&1073741824&&!(q&261930)?(jc=!0,e.memoizedState=n):(e=Fd(),W.lanes|=e,ld|=e,t):(e=Js(e,n,r),Br(e,t)||(jc=!0),e)}function Xs(e,t,n,r,i){var a=I.p;I.p=a!==0&&8>a?a:8;var o=F.T,s={};s.types=o===null?null:o.types,F.T=s,cc(e,!1,t,n);try{var c=i(),l=F.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?sc(e,t,Va(c,r),Pd(e)):sc(e,t,r,Pd(e))}catch(n){sc(e,t,{then:function(){},status:`rejected`,reason:n},Pd())}finally{I.p=a,o!==null&&s.types!==null&&(o.types=s.types),F.T=o}}function Zs(){}function Qs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=$s(e).queue;Xs(e,a,t,ge,n===null?Zs:function(){return ec(e),n(r)})}function $s(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ge,baseState:ge,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:ge},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ec(e){var t=$s(e);t.next===null&&(t=e.alternate.memoizedState),sc(e,t.next.queue,{},Pd())}function tc(){return Ca(lh)}function nc(){return as().memoizedState}function rc(){return as().memoizedState}function ic(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Pd();e=ho(n);var r=go(t,e,n);r!==null&&(Ld(r,t,n),_o(r,t,n)),t={cache:Aa()},e.payload=t;return}t=t.return}}function ac(e,t,n){var r=Pd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},lc(e)?uc(t,n):(n=Ti(e,t,n,r),n!==null&&(Ld(n,e,r),dc(n,t,r)))}function oc(e,t,n){sc(e,t,n,Pd())}function sc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(lc(e))uc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Br(s,o))return wi(e,t,i,0),td===null&&Ci(),!1}catch{}if(n=Ti(e,t,i,r),n!==null)return Ld(n,e,r),dc(n,t,r),!0}return!1}function cc(e,t,n,r){if(r={lane:2,revertLane:Lf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(e)){if(t)throw Error(i(479))}else t=Ti(e,n,r,2),t!==null&&Ld(t,e,2)}function lc(e){var t=e.alternate;return e===W||t!==null&&t===W}function uc(e,t){Uo=Ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}var fc={readContext:Ca,use:cs,useCallback:Yo,useContext:Yo,useEffect:Yo,useImperativeHandle:Yo,useLayoutEffect:Yo,useInsertionEffect:Yo,useMemo:Yo,useReducer:Yo,useRef:Yo,useState:Yo,useDebugValue:Yo,useDeferredValue:Yo,useTransition:Yo,useSyncExternalStore:Yo,useId:Yo,useHostTransitionStatus:Yo,useFormState:Yo,useActionState:Yo,useOptimistic:Yo,useMemoCache:Yo,useCacheRefresh:Yo,useEffectEvent:Yo},pc={readContext:Ca,use:cs,useCallback:function(e,t){return is().memoizedState=[e,t===void 0?null:t],e},useContext:Ca,useEffect:Ls,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Fs(4194308,4,Us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fs(4194308,4,e,t)},useInsertionEffect:function(e,t){Fs(4,2,e,t)},useMemo:function(e,t){var n=is();t=t===void 0?null:t;var r=e();if(Wo){Qe(!0);try{e()}finally{Qe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=is();if(n!==void 0){var i=n(t);if(Wo){Qe(!0);try{n(t)}finally{Qe(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ac.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var t=is();return e={current:e},t.memoizedState=e},useState:function(e){e=bs(e);var t=e.queue,n=oc.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Gs,useDeferredValue:function(e,t){return Js(is(),e,t)},useTransition:function(){var e=bs(!1);return e=Xs.bind(null,W,e.queue,!0,!1),is().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=W,a=is();if(H){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),td===null)throw Error(i(349));q&127||hs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Ls(_s.bind(null,r,o,e),[e]),r.flags|=2048,Ns(9,{destroy:void 0},gs.bind(null,r,o,n,t),null),n},useId:function(){var e=is(),t=td.identifierPrefix;if(H){var n=Xi,r=Yi;n=(r&~(1<<32-$e(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Jo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:tc,useFormState:ks,useActionState:ks,useOptimistic:function(e){var t=is();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=cc.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:ls,useCacheRefresh:function(){return is().memoizedState=ic.bind(null,W)},useEffectEvent:function(e){var t=is(),n={impl:e};return t.memoizedState=n,function(){if(ed&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},mc={readContext:Ca,use:cs,useCallback:Ks,useContext:Ca,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:ds,useRef:Ps,useState:function(){return ds(us)},useDebugValue:Gs,useDeferredValue:function(e,t){return Ys(as(),Bo.memoizedState,e,t)},useTransition:function(){var e=ds(us)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ms,useId:nc,useHostTransitionStatus:tc,useFormState:As,useActionState:As,useOptimistic:function(e,t){return xs(as(),Bo,e,t)},useMemoCache:ls,useCacheRefresh:rc,useEffectEvent:Bs},hc={readContext:Ca,use:cs,useCallback:Ks,useContext:Ca,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:ps,useRef:Ps,useState:function(){return ps(us)},useDebugValue:Gs,useDeferredValue:function(e,t){var n=as();return Bo===null?Js(n,e,t):Ys(n,Bo.memoizedState,e,t)},useTransition:function(){var e=ps(us)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ms,useId:nc,useHostTransitionStatus:tc,useFormState:G,useActionState:G,useOptimistic:function(e,t){var n=as();return Bo===null?(n.baseState=e,[e,n.queue.dispatch]):xs(n,Bo,e,t)},useMemoCache:ls,useCacheRefresh:rc,useEffectEvent:Bs};function gc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _c={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Pd(),i=ho(r);i.payload=t,n!=null&&(i.callback=n),t=go(e,i,r),t!==null&&(Ld(t,e,r),_o(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Pd(),i=ho(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=go(e,i,r),t!==null&&(Ld(t,e,r),_o(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Pd(),r=ho(n);r.tag=2,t!=null&&(r.callback=t),t=go(e,r,n),t!==null&&(Ld(t,e,n),_o(t,e,n))}};function vc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Vr(n,r)||!Vr(i,a):!0}function yc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&_c.enqueueReplaceState(t,t.state,null)}function bc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function xc(e){yi(e)}function Sc(e){console.error(e)}function Cc(e){yi(e)}function wc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){return n=ho(n),n.tag=3,n.payload={element:null},n.callback=function(){wc(e,t)},n}function Dc(e){return e=ho(e),e.tag=3,e}function Oc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Tc(t,n,r),typeof i!=`function`&&(xd===null?xd=new Set([this]):xd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function kc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ba(t,n,a,!0),n=ko.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ao===null?Jd():n.alternate===null&&cd===0&&(cd=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Xa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),_f(e,r,a)),!1;case 22:return n.flags|=65536,r===Xa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),_f(e,r,a)),!1}throw Error(i(435,n.tag))}return _f(e,r,a),Jd(),!1}if(H)return t=ko.current,t===null?(r!==aa&&(t=Error(i(423),{cause:r}),fa(Vi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Vi(r,n),a=Ec(e.stateNode,r,a),vo(e,a),cd!==4&&(cd=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==aa&&(e=Error(i(422),{cause:r}),fa(Vi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Vi(o,n),md===null?md=[o]:md.push(o),cd!==4&&(cd=2),t===null)return!0;r=Vi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ec(n.stateNode,r,e),vo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(xd===null||!xd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Dc(a),Oc(a,e,n,r),vo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Ac=Error(i(461)),jc=!1;function Mc(e,t,n,r){t.child=e===null?uo(t,null,n,r):lo(t,e.child,n,r)}function Nc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Sa(t),r=Zo(e,t,n,o,a,i),s=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(H&&s&&Qi(t),t.flags|=1,Mc(e,t,r,i),t.child)}function Pc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Fc(e,t,a,r,i)):(e=Fi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!cl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Vr:n,n(o,r)&&e.ref===t.ref)return sl(e,t,i)}return t.flags|=1,e=Ni(a,r),e.ref=t.ref,e.return=t,t.child=e}function Fc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Vr(a,r)&&e.ref===t.ref){if(jc=!1,t.pendingProps=r=a,cl(e,i))e.flags&131072&&(jc=!0);else return t.lanes=e.lanes,sl(e,t,i)}}return Uc(e,t,n,r,i)}function Ic(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Rc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ga(t,a===null?null:a.cachePool),a===null?Do():Eo(t,a),Mo(t);else return r=t.lanes=536870912,Rc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ga(t,null),Do(),No()):(Ga(t,a.cachePool),Eo(t,a),No(),t.memoizedState=null);return Mc(e,t,i,n),t.child}function Lc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Rc(e,t,n,r,i){var a=Wa();return a=a===null?null:{parent:ka._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ga(t,null),Do(),Mo(t),e!==null&&ba(e,t,r,!0),t.childLanes=i,null}function zc(e,t){return t=Qc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Bc(e,t,n){return lo(t,e.child,null,n),e=zc(t,t.pendingProps),e.flags|=2,Po(t),t.memoizedState=null,e}function Vc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(H){if(r.mode===`hidden`)return e=zc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Lc(null,e);if(jo(t),(e=na)?(e=lm(e,ia),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ji===null?null:{id:Yi,overflow:Xi},retryLane:536870912,hydrationErrors:null},n=Ri(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=536870912,null}return zc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(jo(t),a){if(t.flags&256)t.flags&=-257,t=Bc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(jc||ba(e,t,n,!1),a=(n&e.childLanes)!==0,jc||a){if(wo.current===null){if(r=td,r!==null&&(s=gt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ei(e,s),Ld(r,e,s),Ac;Jd()}t=Bc(e,t,n)}else e=o.treeContext,na=pm(s.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=zc(t,r),t.flags|=134221824;return t}return e=Ni(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Uc(e,t,n,r,i){return Sa(t),n=Zo(e,t,n,r,void 0,i),r=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(H&&r&&Qi(t),t.flags|=1,Mc(e,t,n,i),t.child)}function Wc(e,t,n,r,i,a){return Sa(t),t.updateQueue=null,n=$o(t,r,n,i),Qo(e),r=ts(),e!==null&&!jc?(ns(e,t,a),sl(e,t,a)):(H&&r&&Qi(t),t.flags|=1,Mc(e,t,n,a),t.child)}function Gc(e,t,n,r,i){if(Sa(t),t.stateNode===null){var a=ki,o=n.contextType;typeof o==`object`&&o&&(a=Ca(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=_c,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},po(t),o=n.contextType,a.context=typeof o==`object`&&o?Ca(o):ki,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(gc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&_c.enqueueReplaceState(a,a.state,null),xo(t,r,a,i),bo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=bc(n,s);a.props=c;var l=a.context,u=n.contextType;o=ki,typeof u==`object`&&u&&(o=Ca(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&yc(t,a,r,o),fo=!1;var f=t.memoizedState;a.state=f,xo(t,r,a,i),bo(),l=t.memoizedState,s||f!==l||fo?(typeof d==`function`&&(gc(t,n,d,r),l=t.memoizedState),(c=fo||vc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,mo(e,t),o=t.memoizedProps,u=bc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ki,typeof l==`object`&&l&&(c=Ca(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&yc(t,a,r,c),fo=!1,f=t.memoizedState,a.state=f,xo(t,r,a,i),bo();var p=t.memoizedState;o!==d||f!==p||fo||e!==null&&e.dependencies!==null&&xa(e.dependencies)?(typeof s==`function`&&(gc(t,n,s,r),p=t.memoizedState),(u=fo||vc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&xa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Hc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=lo(t,e.child,null,i),t.child=lo(t,null,n,i)):Mc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=sl(e,t,i),e}function Kc(e,t,n,r){return ua(),t.flags|=256,Mc(e,t,n,r),t.child}var qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:Ka()}}function Yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=fd),e}function Xc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Fo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(H){if(i?U(t):No(),(e=na)?(e=lm(e,ia),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ji===null?null:{id:Yi,overflow:Xi},retryLane:536870912,hydrationErrors:null},n=Ri(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=dm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(No(),i=t.mode,a=Qc({mode:`hidden`,children:a},i),r=Ii(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Jc(n),r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(null,r)):(U(t),Zc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return el(e,t,a,o,r,c,s,n)}return i?(No(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ni(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ii(i,a,n,null),i.flags|=2):i=Ni(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Lc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Jc(n):(a=i.cachePool,a===null?a=Ka():(s=ka._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(e.child,r)):(U(t),n=e.child,e=n.sibling,n=Ni(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Zc(e,t){return t=Qc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Qc(e,t){return e=ji(22,e,null,t),e.lanes=0,e}function $c(e,t,n){return lo(t,e.child,null,n),e=Zc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function el(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(U(t),t.flags&=-257,$c(e,t,c)):t.memoizedState===null?(No(),o=a.fallback,s=t.mode,a=Qc({mode:`visible`,children:a.children},s),o=Ii(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,lo(t,e.child,null,c),a=t.child,a.memoizedState=Jc(c),a.childLanes=Yc(e,r,c),t.memoizedState=qc,Lc(null,a)):(No(),t.child=e.child,t.flags|=128,null);if(U(t),dm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,fa({value:a,source:null,stack:null})),$c(e,t,c)}if(jc||ba(e,t,c,!1),r=(c&e.childLanes)!==0,jc||r){if(wo.current!==null)return $c(e,t,c);if(r=td,r!==null&&(a=gt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ei(e,a),Ld(r,e,a),Ac;return um(o)||Jd(),$c(e,t,c)}return um(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,na=pm(o.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=Zc(t,a.children),t.flags|=134221824,t)}function tl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),va(e.return,t,n)}function nl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Ro(n)===null&&(t=e),e=e.sibling}return t}function rl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function il(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function al(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Fo.current;if(t.flags&128)return Io(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Io(t,o),i===`backwards`&&e!==null?(il(e),Mc(e,t,r,n),il(e)):Mc(e,t,r,n),r=H?Gi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tl(e,n,t);else if(e.tag===19)tl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,il(t)),rl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ro(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}rl(t,!0,n,null,a,r);break;case`together`:rl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),rl(t,!1,i,n,a,r)}return t.child}function ol(e,t,n){var r=t.pendingProps;return ga(t,t.type,r.value),Mc(e,t,r.children,n),t.child}function sl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ld|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ba(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Ni(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ni(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function cl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&xa(e)))}function ll(e,t,n){switch(t.tag){case 3:Te(t,t.stateNode.containerInfo),ga(t,ka,e.memoizedState.cache),ua();break;case 27:case 5:De(t);break;case 4:Te(t,t.stateNode.containerInfo);break;case 10:ga(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,jo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return U(t),t.flags|=128,null;r=ba(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Xc(e,t,n):(U(t),e=sl(e,t,n),e===null?null:e.sibling)}U(t);break;case 19:if(t.flags&128)return al(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ba(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return al(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Io(t,Fo.current),r)break;return null;case 22:return t.lanes=0,Ic(e,t,n,t.pendingProps);case 24:ga(t,ka,e.memoizedState.cache)}return sl(e,t,n)}function ul(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)jc=!0;else{if(!cl(e,n)&&!(t.flags&128))return jc=!1,ll(e,t,n);jc=!!(e.flags&131072)}}else jc=!1,H&&t.flags&1048576&&Zi(t,Gi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=$a(t.elementType),t.type=e,typeof e==`function`)Mi(e)?(r=bc(e,r),t.tag=1,t=Gc(null,t,e,r,n)):(t.tag=0,t=Uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ne){t.tag=11,t=Nc(null,t,e,r,n);break a}if(a===P){t.tag=14,t=Pc(null,t,e,r,n);break a}if(a===N){t.tag=10,t.type=e,t=ol(null,t,n);break a}}throw t=me(e)||e,Error(i(306,t,``))}}return t;case 0:return Uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=bc(r,t.pendingProps),Gc(e,t,r,a,n);case 3:a:{if(Te(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,mo(e,t),xo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ga(t,ka,r),r!==o.cache&&ya(t,[ka],n,!0),bo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Kc(e,t,r,n);break a}if(r!==a){a=Vi(Error(i(424)),t),fa(a),t=Kc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(na=pm(e.firstChild),ta=t,H=!0,ra=null,ia=!0,n=uo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ua(),r===a){t=sl(e,t,n);break a}Mc(e,t,r,n)}t=t.child}return t;case 26:return Hc(e,t),e===null?(n=Im(t.type,null,t.pendingProps,null))?t.memoizedState=n:H||(t.stateNode=gp(t.type,t.pendingProps,Ce.current,t)):t.memoizedState=Im(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return De(t),e===null&&H&&(r=t.stateNode=ym(t.type,t.pendingProps,Ce.current),ta=t,ia=!0,a=na,Ep(t.type)?(mm=a,na=pm(r.firstChild)):na=a),Mc(e,t,t.pendingProps.children,n),Hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&H&&((a=r=na)&&(r=sm(r,t.type,t.pendingProps,ia),r===null?a=!1:(t.stateNode=r,ta=t,na=pm(r.firstChild),ia=!1,a=!0)),a||oa(t)),De(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,_p(a,o)?r=null:s!==null&&_p(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Zo(e,t,es,null,null,n),lh._currentValue=a),Hc(e,t),Mc(e,t,r,n),t.child;case 6:return e===null&&H&&((e=n=na)&&(n=cm(n,t.pendingProps,ia),n===null?e=!1:(t.stateNode=n,ta=t,na=null,e=!0)),e||oa(t)),null;case 13:return Xc(e,t,n);case 4:return Te(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=lo(t,null,r,n):Mc(e,t,r,n),t.child;case 11:return Nc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Hc(e,t),Mc(e,t,r,n),t.child;case 8:return Mc(e,t,t.pendingProps.children,n),t.child;case 12:return Mc(e,t,t.pendingProps.children,n),t.child;case 10:return ol(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Sa(t),a=Ca(a),r=r(a),t.flags|=1,Mc(e,t,r,n),t.child;case 14:return Pc(e,t,t.type,t.pendingProps,n);case 15:return Fc(e,t,t.type,t.pendingProps,n);case 19:return al(e,t,n);case 31:return Vc(e,t,n);case 22:return Ic(e,t,n,t.pendingProps);case 24:return Sa(t),r=Ca(ka),e===null?(a=Wa(),a===null&&(a=td,o=Aa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},po(t),ga(t,ka,a)):((e.lanes&n)!==0&&(mo(e,t),xo(t,null,null,n),bo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ga(t,ka,r),r!==a.cache&&ya(t,[ka],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ga(t,ka,r))),Mc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:H&&Qi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Hc(e,t),Mc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function dl(e){e.flags|=4}function fl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Xm(t,r):Xm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(J())e.flags|=8192;else throw eo=Xa,Ja}}else e.flags&=-16777217}function pl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Zm(t)){if(J())e.flags|=8192;else throw eo=Xa,Ja}}function ml(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:dt(),e.lanes|=t,pd|=t)}function hl(e,t){if(!H)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function gl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _l(e,t,n){var r=t.pendingProps;switch($i(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gl(t),null;case 1:return gl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),_a(ka),Ee(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(la(t)?dl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,da())),gl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(dl(t),o===null?(gl(t),fl(t,a,null,r,n)):(gl(t),pl(t,o))):o?o===e.memoizedState?(gl(t),t.flags&=-16777217):(dl(t),gl(t),pl(t,o)):(e=e.memoizedProps,e!==r&&dl(t),gl(t),fl(t,a,e,r,n)),null;case 27:if(Oe(t),n=Ce.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}e=xe.current,la(t)?sa(t,e):(e=ym(a,r,n),t.stateNode=e,dl(t))}return gl(t),t.subtreeFlags&=-33554433,null;case 5:if(Oe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}if(o=xe.current,la(t))sa(t,o);else{var s=pp(Ce.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[St]=t,o[Ct]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(op(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&dl(t)}}return gl(t),t.subtreeFlags&=-33554433,fl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Ce.current,la(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ta,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[St]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||rp(e.nodeValue,n)),e||oa(t,!0)}else e=pp(e).createTextNode(r),e[St]=t,t.stateNode=e}return gl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=la(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[St]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),e=!1}else n=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Po(t),t):(Po(t),null);if(t.flags&128)throw Error(i(558))}return gl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=la(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[St]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),a=!1}else a=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Po(t),t):(Po(t),null)}return Po(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ml(t,t.updateQueue),gl(t),null);case 4:return Ee(),e===null&&qf(t.stateNode.containerInfo),t.flags|=67108864,gl(t),null;case 10:return _a(t.type),gl(t),null;case 19:if(Lo(t),r=t.memoizedState,r===null)return gl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)hl(r,!1);else{if(cd!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ro(e),o!==null){for(t.flags|=128,hl(r,!1),e=o.updateQueue,t.updateQueue=e,ml(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Pi(n,e),n=n.sibling;return Io(t,Fo.current&1|2),H&&V(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ve()>yd&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Ro(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ml(t,e),hl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!H)return gl(t),null}else 2*Ve()-r.renderingStartTime>yd&&n!==536870912&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ve(),e.sibling=null,o=Fo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||H?Io(t,o):(n=o,L(ko,t),L(Fo,n),Ao===null&&(Ao=t)),H&&V(t,r.treeForkCount),e}return gl(t),null;case 22:case 23:return Po(t),Oo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(gl(t),t.subtreeFlags&6&&(t.flags|=8192)):gl(t),n=t.updateQueue,n!==null&&ml(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&be(Ua),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),_a(ka),gl(t),null;case 25:return null;case 30:return t.flags|=33554432,gl(t),null}throw Error(i(156,t.tag))}function vl(e,t){switch($i(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return _a(ka),Ee(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Oe(t),null;case 31:if(t.memoizedState!==null){if(Po(t),t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Po(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Lo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ee(),null;case 10:return _a(t.type),null;case 22:case 23:return Po(t),Oo(),e!==null&&be(Ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return _a(ka),null;case 25:return null;default:return null}}function yl(e,t){switch($i(t),t.tag){case 3:_a(ka),Ee();break;case 26:case 27:case 5:Oe(t);break;case 4:Ee();break;case 31:t.memoizedState!==null&&Po(t);break;case 13:Po(t);break;case 19:Lo(t);break;case 10:_a(t.type);break;case 22:case 23:Po(t),Oo(),e!==null&&be(Ua);break;case 24:_a(ka)}}function bl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){gf(t,t.return,e)}}function xl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){gf(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){gf(t,t.return,e)}}function Sl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Co(t,n)}catch(t){gf(e,e.return,t)}}}function Cl(e,t,n){n.props=bc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){gf(e,t,n)}}function wl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=gi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Rp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new zp(e);m(e.child,!1,nm,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){gf(e,t,n)}}function Tl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){gf(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){gf(e,t,n)}else n.current=null}}function El(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)im(e.stateNode,t[n])}function Dl(e){for(var t=e.return;t!==null&&(Al(t)&&im(e.stateNode,t.stateNode),!kl(t));)t=t.return}function Ol(e){for(var t=e.return;t!==null&&(Al(t)&&am(e.stateNode,t.stateNode),!kl(t));)t=t.return}function kl(e){return e.tag===5||e.tag===3||e.tag===27}function Al(e){return e&&e.tag===7&&e.stateNode!==null}function jl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){gf(e,e.return,t)}}function Ml(e,t,n){try{var r=e.stateNode;cp(r,e.type,n,t),r[Ct]=t}catch(t){gf(e,e.return,t)}}function Nl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ep(e.type)||e.tag===4}function Pl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Nl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ep(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=_n)),El(e,r),B=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Ep(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),El(e,r),B=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Ep(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Il(e,t,n,r),e=e.sibling;e!==null;)Il(e,t,n,r),e=e.sibling}function Ll(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);op(t,r,n),t[St]=e,t[Ct]=n}catch(t){gf(e,e.return,t)}}var Rl=!1,zl=null;function Bl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Rl=!0)}var Vl=null;function Hl(){var e=Vl;return Vl=null,e}var Ul=0;function Wl(e,t,n,r,i){return Ul=0,Gl(e.child,t,n,r,i)}function Gl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Mp(o);r.push(s),s.view&&(a=!0)}else a||Mp(o).view&&(a=!0);Rl=!0,kp(o,Ul===0?t:t+`_`+Ul,n),Ul++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Gl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Kl(e,t){for(;e!==null;)e.tag===5?Ap(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Kl(e.child,t),e=e.sibling}function ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(ql(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=vi(t.default,t.share),t!==`none`&&(Wl(e,n,t,null,!1)||Kl(e.child,!1))}e=e.sibling}}function Jl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=gi(r,n),a=vi(r.default,n.paired?r.share:r.enter);a===`none`?ql(e):Wl(e,i,a,null,!1)?(ql(e),n.paired||t||Id(e,r.onEnter)):Kl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Jl(e,t),e=e.sibling;else ql(e)}function Yl(e){if(zl!==null&&zl.size!==0){var t=zl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=vi(n.default,n.share);if(a!==`none`&&(Wl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Id(e,n.onShare)):Kl(e.child,!1)),t.delete(r),t.size===0)break}}}Yl(e)}e=e.sibling}}}function Xl(e){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode),r=zl===null?void 0:zl.get(n),i=vi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Wl(e,n,i,null,!1)?r===void 0?Id(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,zl.delete(n),Id(e,t.onShare)):Kl(e.child,!1)),zl!==null&&Yl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Xl(e),e=e.sibling;else zl!==null&&Yl(e)}function Zl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode);t=vi(t.default,t.update),e.flags&=-5,t!==`none`&&Wl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Zl(e);e=e.sibling}}function Ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Kl(e.child,!1))}Ql(e)}e=e.sibling}}function $l(e){if(e.tag===30)e.stateNode.paired=null,Kl(e.child,!1),Ql(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)$l(e),e=e.sibling;else Ql(e)}function eu(e){for(e=e.child;e!==null;)e.tag===30?Kl(e.child,!1):e.subtreeFlags&33554432&&eu(e),e=e.sibling}function tu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Ul<a.length){var l=a[Ul],u=Mp(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&kp(c,Ul===0?n:n+`_`+Ul,i),s&&e.flags&4||(Vl===null&&(Vl=[]),Vl.push(c,Ul===0?r:r+`_`+Ul,t.memoizedProps)),Ul++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:tu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function nu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=gi(n,r),a=vi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Np)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Ul=0,i=tu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Id(e,n.onUpdate))}else e.subtreeFlags&33554432&&nu(e,t);e=e.sibling}}var ru=!1,iu=!1,au=!1,ou=!1,su=typeof WeakSet==`function`?WeakSet:Set,cu=null,lu=!1,uu=!1,du=!1,fu=!1;function pu(e,t,n){if(e=e.containerInfo,dp=vh,e=Kr(e),qr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(fp={focusedElem:e,selectionRange:r},vh=!1,n=(n&335544064)===n,cu=t,t=n?9270:1024;cu!==null;){if(e=cu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Xl(r[a]);if(e.alternate===null&&e.flags&2)n&&Bl(e),mu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Xl(r),mu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Bl(e),mu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,cu=r):(n&&Zl(e),mu(n))}}zl=null}function mu(e){for(;cu!==null;){var t=cu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=bc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){gf(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)om(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:om(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=gi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=vi(a.default,a.update),a!==`none`&&Wl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,cu=r;break}cu=t.return}}function hu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Fu(e,n),r&4&&bl(5,n);break;case 1:if(Fu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){gf(n,n.return,e)}else{var i=bc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){gf(n,n.return,e)}}}r&64&&Sl(n),r&512&&wl(n,n.return);break;case 3:if(Fu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Co(e,t)}catch(e){gf(n,n.return,e)}}break;case 27:t===null&&r&4&&Ll(n);case 26:case 5:Fu(e,n),t===null&&r&4&&jl(n),r&512&&wl(n,n.return);break;case 12:Fu(e,n);break;case 31:Fu(e,n),r&4&&wu(e,n);break;case 13:Fu(e,n),r&4&&Tu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=bf.bind(null,n),fm(e,n))));break;case 22:if(r=n.memoizedState!==null||ru,!r){var a=t!==null&&t.memoizedState!==null||iu;t=ru,i=iu,ru=r,(iu=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Lu(e,n,r)):Fu(e,n),ru=t,iu=i}break;case 30:Fu(e,n),r&512&&wl(n,n.return);break;case 7:r&512&&wl(n,n.return);default:Fu(e,n)}}function gu(e,t){for(e=e.child;e!==null;)_u(e,t),e=e.sibling}function _u(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){gf(e,e.return,t)}vu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,B=!0}catch(t){gf(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Op(s,!0):Op(e.stateNode,!1)}catch(t){gf(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&gu(e,t);break;default:gu(e,t)}}function vu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:_u(n,r);break a;case 22:n.memoizedState===null&&vu(n,r);break a;default:vu(n,r)}}e=e.sibling}}function yu(e){var t=e.alternate;t!==null&&(e.alternate=null,yu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&At(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var bu=null,xu=!1;function Su(e,t,n){for(n=n.child;n!==null;)Cu(e,t,n),n=n.sibling}function Cu(e,t,n){if(Ze&&typeof Ze.onCommitFiberUnmount==`function`)try{Ze.onCommitFiberUnmount(Xe,n)}catch{}switch(n.tag){case 26:iu||Tl(n,t),Su(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!iu&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:iu||Tl(n,t),Ol(n);var r=bu,i=xu;Ep(n.type)&&(bu=n.stateNode,xu=!1),Su(e,t,n),bm(n.stateNode,n.type,n.memoizedProps),bu=r,xu=i;break;case 5:iu||Tl(n,t),Ol(n);case 6:if(n.tag===6&&Ol(n),r=bu,i=xu,bu=null,Su(e,t,n),bu=r,xu=i,bu!==null){if(xu)try{(bu.nodeType===9?bu.body:bu.nodeName===`HTML`?bu.ownerDocument.body:bu).removeChild(n.stateNode),B=!0}catch(e){gf(n,t,e)}else try{bu.removeChild(n.stateNode),B=!0}catch(e){gf(n,t,e)}}break;case 18:bu!==null&&(xu?(e=bu,Dp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Wh(e)):Dp(bu,n.stateNode));break;case 4:r=bu,i=xu,bu=n.stateNode.containerInfo,xu=!0,Su(e,t,n),bu=r,xu=i;break;case 0:case 11:case 14:case 15:xl(2,n,t),iu||xl(4,n,t),Su(e,t,n);break;case 1:iu||(Tl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Cl(n,t,r)),Su(e,t,n);break;case 21:Su(e,t,n);break;case 22:iu=(r=iu)||n.memoizedState!==null,Su(e,t,n),iu=r;break;case 30:Tl(n,t),Su(e,t,n);break;case 7:iu||Tl(n,t),Su(e,t,n);break;default:Su(e,t,n)}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Wh(e)}catch(e){gf(t,t.return,e)}}}function Tu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Wh(e)}catch(e){gf(t,t.return,e)}}function Eu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new su),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new su),t;default:throw Error(i(435,e.tag))}}function Du(e,t){var n=Eu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=xf.bind(null,e,t);t.then(r,r)}})}function Ou(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Ep(l.type)){bu=l.stateNode,xu=!1;break a}break;case 5:bu=l.stateNode,xu=!1;break a;case 3:case 4:bu=l.stateNode.containerInfo,xu=!0;break a}l=l.return}if(bu===null)throw Error(i(160));Cu(s,c,o),bu=null,xu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Au(t,e,n),t=t.sibling}var ku=null;function Au(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Ou(t,e,n),ju(e),a&4&&(xl(3,e,e.return),bl(3,e),xl(5,e,e.return));break;case 1:Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),a&64&&ru&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ku,Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(ru)e.stateNode=gp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Ot]||r[St]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),op(r,t,n),r[St]=e,Ft(r),t=r;break a;case`link`:if(o=qm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=qm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[St]=e,Ft(r),t=r}e.stateNode=t}}else ru||Jm(o,e.type,e.stateNode)}else e.stateNode=Hm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Ml(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||iu||t.parentNode.removeChild(t)):a.count--,n===null?ru||Jm(o,e.type,e.stateNode):Hm(o,n,e.memoizedProps))}break;case 27:Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),r!==null&&a&4&&Ml(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=au,au=!1,Ou(t,e,n),au=o,ju(e),a&512&&(iu||r===null||Tl(r,r.return)),e.flags&32){t=e.stateNode;try{ln(t,``),B=!0}catch(t){gf(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Ml(e,t,r===null?t:r.memoizedProps)),a&1024&&(ou=!0);break;case 6:if(Ou(t,e,n),ju(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,B=!0}catch(t){gf(e,e.return,t)}}break;case 3:if(B=!1,Km=null,o=ku,ku=wm(t.containerInfo),Ou(t,e,n),ku=o,ju(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Wh(t.containerInfo)}catch(t){gf(e,e.return,t)}ou&&(ou=!1,Mu(e)),B=!1;break;case 4:a=au,au=ru,r=Gt(),o=ku,ku=wm(e.stateNode.containerInfo),Ou(t,e,n),ju(e),ku=o,B&&uu&&(du=!0),B=r,au=a;break;case 12:Ou(t,e,n),ju(e);break;case 31:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 13:Ou(t,e,n),ju(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(_d=Ve()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=ru,l=iu,u=au;ru=c||o,au=u||o,iu=l||s,Ou(t,e,n),iu=l,au=u,ru=c,ju(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||ru||iu||(t=s||iu,n=ru,r=iu,ru=o||ru,iu=t,Iu(e,2),ru=n,iu=r),!o&&au||gu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Du(e,n))));break;case 19:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 30:a&512&&(iu||r===null||Tl(r,r.return)),a=Gt(),o=uu,s=(n&335544064)===n,c=e.memoizedProps,uu=s&&vi(c.default,c.update)!==`none`,Ou(t,e,n),ju(e),s&&r!==null&&B&&(e.flags|=4),uu=o,B=a;break;case 21:break;case 7:a&512&&(iu||r===null||Tl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Ou(t,e,n),ju(e)}}function ju(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Nl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Al(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(kl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Il(e,Pl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(ln(l,``),n.flags&=-33),Il(e,Pl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Fl(e,Pl(e),u,s);break;default:throw Error(i(161))}}catch(t){gf(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Mu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Mu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,vh=!0,t.reset(),vh=!1),e=e.sibling}}function Nu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Pu(t,e),t=t.sibling;else nu(t,!1)}function Pu(e,t){var n=e.alternate;if(n===null)Jl(e,!1);else switch(e.tag){case 3:if(fu=lu=!1,Hl(),Nu(t,e),!lu&&!du){if(e=Vl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ap(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),fu=!0}Vl=null;break;case 5:Nu(t,e);break;case 4:r=lu,lu=!1,Nu(t,e),lu&&(du=!0),lu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Nu(t,e):Jl(e,!1));break;case 30:r=lu,i=Hl(),lu=!1,Nu(t,e),lu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=gi(a,o),o=gi(n.memoizedProps,o);var s=vi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Ul=0,t=tu(e,n,t,o,s,a,!0),Ul!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Id(e,e.memoizedProps.onUpdate),Vl=i):i!==null&&(i.push.apply(i,Vl),Vl=i),lu=e.flags&32?!0:r;break;default:Nu(t,e)}}function Fu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)hu(e,t.alternate,t),t=t.sibling}function Iu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:xl(4,n,n.return),Iu(n,r);break;case 1:Tl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Cl(n,n.return,i),Iu(n,r);break;case 27:r&2&&bm(n.stateNode,n.type,n.memoizedProps);case 5:Tl(n,n.return),n.tag!==5&&n.tag!==27||Ol(n),Iu(n,r);break;case 6:Ol(n);break;case 26:Tl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||iu||i.parentNode.removeChild(i),Iu(n,r);break;case 22:n.memoizedState===null&&Iu(n,r);break;case 30:Tl(n,n.return),Iu(n,r);break;case 7:Tl(n,n.return);default:Iu(n,r)}e=e.sibling}}function Lu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Lu(i,a,n),bl(4,a);break;case 1:if(Lu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){gf(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)So(l[i],c)}catch(e){gf(r,r.return,e)}}s&&o&64&&Sl(a),wl(a,a.return);break;case 27:n&2&&Ll(a);case 5:a.tag!==5&&a.tag!==27||Dl(a),Lu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 6:Dl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||ru||Jm(wm(c.ownerDocument),a.type,c),Lu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 12:Lu(i,a,n);break;case 31:Lu(i,a,n),s&&o&4&&wu(i,a);break;case 13:Lu(i,a,n),s&&o&4&&Tu(i,a);break;case 22:a.memoizedState===null&&Lu(i,a,n),wl(a,a.return);break;case 30:Lu(i,a,n),wl(a,a.return);break;case 7:wl(a,a.return);default:Lu(i,a,n)}t=t.sibling}}function Ru(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ja(n))}function zu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ja(e))}function Bu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Vu(e,t,n,r),t=t.sibling;else i&&eu(t)}function Vu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&$l(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Bu(e,t,n,r),a&2048&&bl(9,t);break;case 1:Bu(e,t,n,r);break;case 3:Bu(e,t,n,r),i&&fu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&ja(a)));break;case 12:if(a&2048){Bu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){gf(t,t.return,e)}}else Bu(e,t,n,r);break;case 31:Bu(e,t,n,r);break;case 13:Bu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&$l(t),o._visibility&2?Bu(e,t,n,r):(o._visibility|=2,Hu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&$l(s),o._visibility&2?Bu(e,t,n,r):Uu(e,t)),a&2048&&Ru(s,t);break;case 24:Bu(e,t,n,r),a&2048&&zu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Kl(a.child,!0),Kl(t.child,!0))),Bu(e,t,n,r);break;default:Bu(e,t,n,r)}}function Hu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Hu(a,o,s,c,i),bl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Hu(a,o,s,c,i)):u._visibility&2?Hu(a,o,s,c,i):Uu(a,o),i&&l&2048&&Ru(o.alternate,o);break;case 24:Hu(a,o,s,c,i),i&&l&2048&&zu(o.alternate,o);break;default:Hu(a,o,s,c,i)}t=t.sibling}}function Uu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Uu(n,r),i&2048&&Ru(r.alternate,r);break;case 24:Uu(n,r),i&2048&&zu(r.alternate,r);break;default:Uu(n,r)}t=t.sibling}}var Wu=8192;function Gu(e,t,n){if(e.subtreeFlags&Wu)for(e=e.child;e!==null;)Ku(e,t,n),e=e.sibling}function Ku(e,t,n){switch(e.tag){case 26:Gu(e,t,n),e.flags&Wu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&$m(n,e)):eh(n,ku,e.memoizedState,e.memoizedProps));break;case 5:Gu(e,t,n),e.flags&Wu&&(e=e.stateNode,(t&335544128)===t&&$m(n,e));break;case 3:case 4:var r=ku;ku=wm(e.stateNode.containerInfo),Gu(e,t,n),ku=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Wu,Wu=16777216,Gu(e,t,n),Wu=r):Gu(e,t,n));break;case 30:if((e.flags&Wu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,zl===null&&(zl=new Map),zl.set(r,i)}Gu(e,t,n);break;default:Gu(e,t,n)}}function qu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ju(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];cu=r,Zu(r,e)}qu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Yu(e),e=e.sibling}function Yu(e){switch(e.tag){case 0:case 11:case 15:Ju(e),e.flags&2048&&xl(9,e,e.return);break;case 3:Ju(e);break;case 12:Ju(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Xu(e)):Ju(e);break;default:Ju(e)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];cu=r,Zu(r,e)}qu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:xl(8,t,t.return),Xu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Xu(t));break;default:Xu(t)}e=e.sibling}}function Zu(e,t){for(;cu!==null;){var n=cu;switch(n.tag){case 0:case 11:case 15:xl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ja(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,cu=r;else a:for(n=e;cu!==null;){r=cu;var i=r.sibling,a=r.return;if(yu(r),r===n){cu=null;break a}if(i!==null){i.return=a,cu=i;break a}cu=a}}}var Qu={getCacheForType:function(e){var t=Ca(ka),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ca(ka).controller.signal}},$u=typeof WeakMap==`function`?WeakMap:Map,ed=0,td=null,K=null,q=0,nd=0,rd=null,id=!1,ad=!1,od=!1,sd=0,cd=0,ld=0,ud=0,dd=0,fd=0,pd=0,md=null,hd=null,gd=!1,_d=0,vd=0,yd=1/0,bd=null,xd=null,Sd=0,Cd=null,wd=null,Td=0,Ed=0,Dd=null,Od=null,kd=null,Ad=null,jd=null,Md=0,Nd=null;function Pd(){return ed&2&&q!==0?q&-q:F.T===null?yt():Lf()}function Fd(){if(fd===0){if(!(q&536870912)||H){var e=it;it<<=1,!(it&3932160)&&(it=262144),fd=e}else fd=536870912}return e=ko.current,e!==null&&(e.flags|=32),fd}function Id(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Rp(gi(e.memoizedProps,n))),Ad===null&&(Ad=[]),Ad.push(t.bind(null,r))}}function Ld(e,t,n){(e===td&&(nd===2||nd===9)||e.cancelPendingCommit!==null)&&(Wd(e,0),Vd(e,q,fd,!1)),pt(e,n),ed&2&&e===td||(e===td&&(!(ed&2)&&(ud|=n),cd===4&&Vd(e,q,fd,!1)),kf(e))}function Rd(e,t,n){if(ed&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ct(e,t),a=r?Zd(e,t):Yd(e,t,!0),o=r;do{if(a===0){ad&&!r&&Vd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Bd(n))a=Yd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=md;var l=c.current.memoizedState.isDehydrated;if(l&&(Wd(c,s).flags|=256),s=Yd(c,s,!1),s!==2&&s!==6){if(od&&!l){c.errorRecoveryDisabledLanes|=o,ud|=o,a=4;break a}o=hd,hd=a,o!==null&&(hd===null?hd=o:hd.push.apply(hd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Wd(e,0),Vd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Vd(r,t,fd,!id);break a;case 2:hd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=_d+300-Ve(),10<a)){if(Vd(r,t,fd,!id),st(r,0,!0)!==0)break a;Td=t,r.timeoutHandle=bp(zd.bind(null,r,n,hd,bd,gd,t,fd,ud,pd,id,o,`Throttled`,-0,0),a);break a}zd(r,n,hd,bd,gd,t,fd,ud,pd,id,o,null,-0,0)}break}}while(1);kf(e)}function zd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:_n},zl=null,Ku(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=ih.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?_d-Ve():(a&4194048)===a?vd-Ve():0,m=nh(d,m),m!==null)?(Td=a,e.cancelPendingCommit=m(af.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Vd(e,a,o,!l)):af(e,t,a,n,r,i,o,s,c,l,u,d)}function Bd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Br(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Vd(e,t,n,r){t=lt(e,t),t&=~dd,t&=~ud,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-$e(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&R(e,n,t)}function Hd(){return ed&6?!0:(Af(0,!1),!1)}function Ud(){if(K!==null){if(nd===0)var e=K.return;else e=K,ha=ma=null,rs(e),ro=null,io=0,e=K;for(;e!==null;)yl(e.alternate,e),e=e.return;K=null}}function Wd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,xp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Td=0,Ud(),td=e,K=n=Ni(e.current,null),q=t,nd=0,rd=null,id=!1,ad=ct(e,t),od=!1,pd=fd=dd=ud=ld=cd=0,hd=md=null,gd=!1,sd=lt(e,t),Ci(),n}function Gd(e,t){W=null,F.H=fc,t===qa||t===Ya?(t=to(),nd=3):t===Ja?(t=to(),nd=4):nd=t===Ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,rd=t,K===null&&(cd=1,wc(e,Vi(t,e.current)))}function J(){var e=ko.current;return e===null?!0:(q&4194048)===q?Ao===null:(q&62914560)===q||q&536870912?e===Ao:!1}function Kd(){var e=F.H;return F.H=fc,e===null?fc:e}function qd(){var e=F.A;return F.A=Qu,e}function Jd(){cd=4,id||(q&4194048)!==q&&ko.current!==null||(ad=!0),!(ld&134217727)&&!(ud&134217727)||td===null||Vd(td,q,fd,!1)}function Yd(e,t,n){var r=ed;ed|=2;var i=Kd(),a=qd();(td!==e||q!==t)&&(bd=null,Wd(e,t)),t=!1;var o=cd;a:do try{if(nd!==0&&K!==null){var s=K,c=rd;switch(nd){case 8:Ud(),o=6;break a;case 3:case 2:case 9:case 6:ko.current===null&&(t=!0);var l=nd;if(nd=0,rd=null,tf(e,s,c,l),n&&ad){o=0;break a}break;default:l=nd,nd=0,rd=null,tf(e,s,c,l)}}Xd(),o=cd;break}catch(t){Gd(e,t)}while(1);return t&&e.shellSuspendCounter++,ha=ma=null,ed=r,F.H=i,F.A=a,K===null&&(td=null,q=0,Ci()),o}function Xd(){for(;K!==null;)$d(K)}function Zd(e,t){var n=ed;ed|=2;var r=Kd(),a=qd();td!==e||q!==t?(bd=null,yd=Ve()+500,Wd(e,t)):ad=ct(e,t);a:do try{if(nd!==0&&K!==null){t=K;var o=rd;b:switch(nd){case 1:nd=0,rd=null,tf(e,t,o,1);break;case 2:case 9:if(Za(o)){nd=0,rd=null,ef(t);break}t=function(){nd!==2&&nd!==9||td!==e||(nd=7),kf(e)},o.then(t,t);break a;case 3:nd=7;break a;case 4:nd=5;break a;case 7:Za(o)?(nd=0,rd=null,ef(t)):(nd=0,rd=null,tf(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Zm(s):c.stateNode.complete){nd=0,rd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,nf(u))}break b}}nd=0,rd=null,tf(e,t,o,5);break;case 6:nd=0,rd=null,tf(e,t,o,6);break;case 8:Ud(),cd=6;break a;default:throw Error(i(462))}}Qd();break}catch(t){Gd(e,t)}while(1);return ha=ma=null,F.H=r,F.A=a,ed=n,K===null?(td=null,q=0,Ci(),cd):0}function Qd(){for(;K!==null&&!ze();)$d(K)}function $d(e){var t=ul(e.alternate,e,sd);e.memoizedProps=e.pendingProps,t===null?nf(e):K=t}function ef(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Wc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Wc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:rs(t);var r=t;r===ta&&(H?(ca(r),r.tag===5&&r.stateNode!=null&&(na=r.stateNode)):(ca(r),H=!0));default:yl(n,t),t=K=Pi(t,sd),t=ul(n,t,sd)}e.memoizedProps=e.pendingProps,t===null?nf(e):K=t}function tf(e,t,n,r){ha=ma=null,rs(t),ro=null,io=0;var i=t.return;try{if(kc(e,i,t,n,q)){cd=1,wc(e,Vi(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;cd=1,wc(e,Vi(n,e.current)),K=null;return}t.flags&32768?(H||r===1?e=!0:ad||q&536870912?e=!1:(id=e=!0,(r===2||r===9||r===3||r===6)&&(r=ko.current,r!==null&&r.tag===13&&(r.flags|=16384))),rf(t,e)):nf(t)}function nf(e){var t=e;do{if(t.flags&32768){rf(t,id);return}e=t.return;var n=_l(t.alternate,t,sd);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);cd===0&&(cd=5)}function rf(e,t){do{var n=vl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);cd=6,K=null}function af(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do pf();while(Sd!==0);if(ed&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===td&&(K=td=null,q=0),wd=t,Cd=e,Td=n,Dd=a,Od=r,of(e,t,n,s,c,l,f)}}function of(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Ed=s,s|=Si,mt(e,n,s,r,i,a),Ad=null,(n&335544064)===n?(jd=Pa(e),r=10262):(jd=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,Sf(Ge,function(){return mf(),null})):(e.callbackNode=null,e.callbackPriority=0),Rl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=F.T,F.T=null,i=I.p,I.p=2,a=ed,ed|=4;try{pu(e,t,n)}finally{ed=a,I.p=i,F.T=r}}Sd=1,Rl?kd=Ip(o,e.containerInfo,jd,lf,uf,cf,df,mf,sf,null,null):(lf(),uf(),df())}function sf(e){if(Sd!==0){var t=Cd.onRecoverableError;t(e,{componentStack:null})}}function cf(){Sd===3&&(Sd=0,Pu(wd,Cd),Sd=4)}function lf(){if(Sd===1){Sd=0;var e=Cd,t=wd,n=Td,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=F.T,F.T=null;var i=I.p;I.p=2;var a=ed;ed|=4;try{uu=du=!1,Au(t,e,n),n=fp;var o=Kr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Gr(s.ownerDocument.documentElement,s)){if(c!==null&&qr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Wr(s,h),v=Wr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}vh=!!dp,fp=dp=null}finally{ed=a,I.p=i,F.T=r}}e.current=t,Sd=2}}function uf(){if(Sd===2){Sd=0;var e=Cd,t=wd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=F.T,F.T=null;var r=I.p;I.p=2;var i=ed;ed|=4;try{hu(e,t.alternate,t)}finally{ed=i,I.p=r,F.T=n}}Sd=3}}function df(){if(Sd===4||Sd===3){Sd=0;var e=kd;kd=null,Be();var t=Cd,n=wd,r=Td,i=Od,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Sd=5:(Sd=0,wd=Cd=null,ff(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(xd=null),vt(r),n=n.stateNode,Ze&&typeof Ze.onCommitFiberRoot==`function`)try{Ze.onCommitFiberRoot(Xe,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=F.T,a=I.p,I.p=2,F.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{F.T=n,I.p=a}}if(i=Ad,o=jd,jd=null,i!==null&&(Ad=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Td&3&&pf(),kf(t),a=t.pendingLanes,r&261930&&a&42?t===Nd?Md++:(Md=0,Nd=t):(Md=0,Nd=null),Af(0,!1)}}function ff(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ja(t)))}function pf(){return kd!==null&&(kd.skipTransition(),kd=null),lf(),uf(),df(),mf()}function mf(){if(Sd!==5)return!1;var e=Cd,t=Ed;Ed=0;var n=vt(Td),r=F.T,a=I.p;try{I.p=32>n?32:n,F.T=null,n=Dd,Dd=null;var o=Cd,s=Td;if(Sd=0,wd=Cd=null,Td=0,ed&6)throw Error(i(331));var c=ed;if(ed|=4,Yu(o.current),Vu(o,o.current,s,n),ed=c,Af(0,!1),Ze&&typeof Ze.onPostCommitFiberRoot==`function`)try{Ze.onPostCommitFiberRoot(Xe,o)}catch{}return!0}finally{I.p=a,F.T=r,ff(e,t)}}function hf(e,t,n){t=Vi(n,t),t=Ec(e.stateNode,t,2),e=go(e,t,2),e!==null&&(pt(e,2),kf(e))}function gf(e,t,n){if(e.tag===3)hf(e,e,n);else for(;t!==null;){if(t.tag===3){hf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(xd===null||!xd.has(r))){e=Vi(n,e),n=Dc(2),r=go(t,n,2),r!==null&&(Oc(n,r,t,e),pt(r,2),kf(r));break}}t=t.return}}function _f(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new $u;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(od=!0,i.add(n),e=vf.bind(null,e,t,n),t.then(e,e))}function vf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,td===e&&(q&n)===n&&(cd===4||cd===3&&(q&62914560)===q&&300>Ve()-_d?ed&2?dd|=n:Wd(e,0):dd|=n,pd===q&&(pd=0)),kf(e)}function yf(e,t){t===0&&(t=dt()),e=Ei(e,t),e!==null&&(pt(e,t),kf(e))}function bf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),yf(e,n)}function xf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),yf(e,n)}function Sf(e,t){return Le(e,t)}var Cf=null,wf=null,Tf=!1,Ef=!1,Df=!1,Of=0;function kf(e){e!==wf&&e.next===null&&(wf===null?Cf=wf=e:wf=wf.next=e),Ef=!0,Tf||(Tf=!0,If())}function Af(e,t){if(!Df&&Ef){Df=!0;do for(var n=!1,r=Cf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-$e(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Ff(r,a))}else a=q,a=st(r,r===td?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ct(r,a)||(n=!0,Ff(r,a))}r=r.next}while(n);Df=!1}}function jf(){Mf()}function Mf(){Ef=Tf=!1;var e=0;Of!==0&&yp()&&(e=Of);for(var t=Ve(),n=null,r=Cf;r!==null;){var i=r.next,a=Nf(r,t);a===0?(r.next=null,n===null?Cf=i:n.next=i,i===null&&(wf=n)):(n=r,(e!==0||a&3)&&(Ef=!0)),r=i}Sd!==0&&Sd!==5||Af(e,!1),Of!==0&&(Of=0)}function Nf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-$e(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=ut(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=td,n=q,n=st(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(nd===2||nd===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Re(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ct(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Re(r),vt(n)){case 2:case 8:n=We;break;case 32:n=Ge;break;case 268435456:n=qe;break;default:n=Ge}return r=Pf.bind(null,e),n=Le(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Re(r),e.callbackPriority=2,e.callbackNode=null,2}function Pf(e,t){if(Sd!==0&&Sd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(pf()&&e.callbackNode!==n)return null;var r=q;return r=st(e,e===td?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Rd(e,r,t),Nf(e,Ve()),e.callbackNode!=null&&e.callbackNode===n?Pf.bind(null,e):null)}function Ff(e,t){if(pf())return null;Rd(e,t,!0)}function If(){wp(function(){ed&6?Le(Ue,jf):Mf()})}function Lf(){if(Of===0){var e=La;e===0&&(e=rt,rt<<=1,!(rt&261888)&&(rt=256)),Of=e}return Of}function Rf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:gn(e)}function zf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Rf((i[Ct]||null).action),o=r.submitter;o&&(t=(t=o[Ct]||null)?Rf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Rn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Of!==0){var e=new FormData(i,o);Qs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Qs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Bf=0;Bf<pi.length;Bf++){var Vf=pi[Bf];mi(Vf.toLowerCase(),`on`+(Vf[0].toUpperCase()+Vf.slice(1)))}mi(ai,`onAnimationEnd`),mi(oi,`onAnimationIteration`),mi(si,`onAnimationStart`),mi(`dblclick`,`onDoubleClick`),mi(`focusin`,`onFocus`),mi(`focusout`,`onBlur`),mi(ci,`onTransitionRun`),mi(li,`onTransitionStart`),mi(ui,`onTransitionCancel`),mi(di,`onTransitionEnd`),Bt(`onMouseEnter`,[`mouseout`,`mouseover`]),Bt(`onMouseLeave`,[`mouseout`,`mouseover`]),Bt(`onPointerEnter`,[`pointerout`,`pointerover`]),Bt(`onPointerLeave`,[`pointerout`,`pointerover`]),zt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),zt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),zt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),zt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),zt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),zt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Hf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Uf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Hf));function Wf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}}}}function Y(e,t){var n=t[Tt];n===void 0&&(n=t[Tt]=new Set);var r=e+`__bubble`;n.has(r)||(Jf(t,e,2,!1),n.add(r))}function Gf(e,t,n){var r=0;t&&(r|=4),Jf(n,e,r,t)}var Kf=`_reactListening`+Math.random().toString(36).slice(2);function qf(e){if(!e[Kf]){e[Kf]=!0,Lt.forEach(function(t){t!==`selectionchange`&&(Uf.has(t)||Gf(t,!1,e),Gf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Kf]||(t[Kf]=!0,Gf(`selectionchange`,!1,t))}}function Jf(e,t,n,r){switch(Th(t)){case 2:var i=yh;break;case 8:i=bh;break;default:i=xh}n=i.bind(null,t,n,e),i=void 0,!Dn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Yf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=jt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}wn(function(){var r=a,i=yn(n),s=[];a:{var c=fi.get(e);if(c!==void 0){var l=Rn,u=e;switch(e){case`keypress`:if(Nn(n)===0)break a;case`keydown`:case`keyup`:l=nr;break;case`focusin`:u=`focus`,l=qn;break;case`focusout`:u=`blur`,l=qn;break;case`beforeblur`:case`afterblur`:l=qn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Gn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Kn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=ar;break;case ai:case oi:case si:l=Jn;break;case di:l=or;break;case`scroll`:case`scrollend`:l=Bn;break;case`wheel`:l=sr;break;case`copy`:case`cut`:case`paste`:l=Yn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=rr;break;case`submit`:l=ir;break;case`toggle`:case`beforetoggle`:l=cr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Tn(m,p),g!=null&&d.push(Xf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==vn&&(u=n.relatedTarget||n.fromElement)&&(jt(u)||u[wt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?jt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Gn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=rr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Nt(c),h=l==null?u:Nt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,jt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Qf):null,c!==null&&$f(s,u,c,d,!1),l!==null&&f!==null&&$f(s,f,l,d,!0)))}a:{if(c=r?Nt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Or;else if(Sr(c)){if(kr)_=Rr;else{_=Ir;var v=Fr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&pn(r.elementType)&&(_=Or):_=Lr;if(_&&=_(e,r)){Cr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Nt(r):window,e){case`focusin`:(Sr(v)||v.contentEditable===`true`)&&(Yr=v,Xr=r,Zr=null);break;case`focusout`:Zr=Xr=Yr=null;break;case`mousedown`:Qr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Qr=!1,$r(s,n,i);break;case`selectionchange`:if(Jr)break;case`keydown`:case`keyup`:$r(s,n,i)}var y;if(ur)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else vr?gr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(pr&&n.locale!==`ko`&&(vr||b!==`onCompositionStart`?b===`onCompositionEnd`&&vr&&(y=Mn()):(kn=i,An=`value`in kn?kn.value:kn.textContent,vr=!0)),v=Zf(r,b),0<v.length&&(b=new Xn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=_r(n),y!==null&&(b.data=y)))),(y=fr?yr(e,n):br(e,n))&&(b=Zf(r,`onBeforeInput`),0<b.length&&(v=new Xn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),zf(s,e,r,n,i)}Wf(s,t)})}function Xf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Zf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Tn(e,n),i!=null&&r.unshift(Xf(e,i,a)),i=Tn(e,t),i!=null&&r.push(Xf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Qf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function $f(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Tn(n,a),l!=null&&o.unshift(Xf(n,l,c))):i||(l=Tn(n,a),l!=null&&o.push(Xf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var ep=/\r\n?/g,tp=/\u0000|\uFFFD/g;function np(e){return(typeof e==`string`?e:``+e).replace(ep,`
`).replace(tp,``)}function rp(e,t){return t=np(t),np(e)===t}function ip(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||ln(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&ln(e,``+r);else return;break;case`className`:qt(e,`class`,r);break;case`tabIndex`:qt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:qt(e,n,r);break;case`style`:fn(e,r,o);return;case`data`:if(t!==`object`){qt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=gn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&ip(e,t,`name`,a.name,a,null),ip(e,t,`formEncType`,a.formEncType,a,null),ip(e,t,`formMethod`,a.formMethod,a,null),ip(e,t,`formTarget`,a.formTarget,a,null)):(ip(e,t,`encType`,a.encType,a,null),ip(e,t,`method`,a.method,a,null),ip(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=gn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=_n);return;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=gn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Y(`beforetoggle`,e),Y(`toggle`,e),Kt(e,`popover`,r);break;case`xlinkActuate`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Kt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=mn.get(n)||n,Kt(e,n,r);else return}B=!0}function ap(e,t,n,r,a,o){switch(n){case`style`:fn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)ln(e,r);else if(typeof r==`number`||typeof r==`bigint`)ln(e,``+r);else return;break;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=_n);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Rt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Ct]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}B=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Kt(e,n,r)}return}B=!0}function op(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Y(`error`,e),Y(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,o,s,n,null)}}a&&ip(e,t,`srcSet`,n.srcSet,n,null),r&&ip(e,t,`src`,n.src,n,null);return;case`input`:Y(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:ip(e,t,r,d,n,null)}}rn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Y(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:ip(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&on(e,!!r,n,!0):on(e,!!r,t,!1);return;case`textarea`:for(s in Y(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:ip(e,t,s,c,n,null)}cn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:ip(e,t,l,r,n,null)}return;case`dialog`:Y(`beforetoggle`,e),Y(`toggle`,e),Y(`cancel`,e),Y(`close`,e);break;case`iframe`:case`object`:Y(`load`,e);break;case`video`:case`audio`:for(r=0;r<Hf.length;r++)Y(Hf[r],e);break;case`image`:Y(`error`,e),Y(`load`,e);break;case`details`:Y(`toggle`,e);break;case`embed`:case`source`:case`link`:Y(`error`,e),Y(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,u,r,n,null)}return;default:if(pn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&ap(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&ip(e,t,c,r,n,null))}var sp={};function cp(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||ip(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(B=!0),o=m;break;case`name`:m!==f&&(B=!0),a=m;break;case`checked`:m!==f&&(B=!0),u=m;break;case`defaultChecked`:m!==f&&(B=!0),d=m;break;case`value`:m!==f&&(B=!0),s=m;break;case`defaultValue`:m!==f&&(B=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&ip(e,t,p,m,r,f)}}nn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||ip(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(B=!0),p=o;break;case`defaultValue`:o!==l&&(B=!0),c=o;break;case`multiple`:o!==l&&(B=!0),s=o;default:o!==l&&ip(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?on(e,!!n,n?[]:``,!1):on(e,!!n,t,!0)):on(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:ip(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(B=!0),p=a;break;case`defaultValue`:a!==o&&(B=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&ip(e,t,s,a,r,o)}sn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:ip(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(B=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:ip(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&ip(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:ip(e,t,u,p,r,m)}return;default:if(pn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&ap(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||ap(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&ip(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||ip(e,t,f,p,r,m)}function lp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function up(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&lp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&lp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var dp=null,fp=null;function pp(e){return e.nodeType===9?e:e.ownerDocument}function mp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function hp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function gp(e,t,n,r){return n=pp(n).createElement(e),n[St]=r,n[Ct]=t,op(n,e,t),Ft(n),n}function _p(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vp=null;function yp(){var e=window.event;return e&&e.type===`popstate`?e!==vp&&(vp=e,!0):(vp=null,!1)}var bp=typeof setTimeout==`function`?setTimeout:void 0,xp=typeof clearTimeout==`function`?clearTimeout:void 0,Sp=typeof Promise==`function`?Promise:void 0,Cp=typeof requestAnimationFrame==`function`?requestAnimationFrame:bp,wp=typeof queueMicrotask==`function`?queueMicrotask:Sp===void 0?bp:function(e){return Sp.resolve(null).then(e).catch(Tp)};function Tp(e){setTimeout(function(){throw e})}function Ep(e){return e===`head`}function Dp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Wh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)xm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,xm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ot]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&xm(e.ownerDocument.body)}n=i}while(n);Wh(t)}function Op(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function kp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ap(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function jp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Mp(e){return jp(e.getBoundingClientRect(),getComputedStyle(e),e)}function Np(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return jp(t,n,e)}function Pp(e){return e.documentElement.clientHeight}function Fp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Ip(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Pp(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Qm(f),u>th){s.length=o;break}f=new Promise(Fp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Lp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Lp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Lp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Lp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Rp(e){return{name:e,group:new Lp(`group`,e),imagePair:new Lp(`image-pair`,e),old:new Lp(`old`,e),new:new Lp(`new`,e)}}function zp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}zp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Wp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Hp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Bp,e,s,r)}this._eventListeners=a}};function Bp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}zp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Wp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Hp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Vp,e,n,i),r.splice(t,1),a!==null&&a()}};function Vp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Hp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Up(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Wp(e,t,n,r){if(e.length===0)return-1;r=Up(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Up(a.optionsOrUseCapture)===r)return i}return-1}zp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},zp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Gp,e,void 0,void 0)};function Gp(e,t){return e.tag!==6&&(e=b(e),_m(e,t))}zp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Kp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Gp(t[n],e);n--);};function Kp(e,t){return t.push(e),!1}zp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=pp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,qp,e,void 0,void 0))};function qp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}zp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Jp,e,void 0,void 0)};function Jp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}zp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Yp,e,void 0,void 0);for(var n=t=0;n<Xp.length;n++){var r=Xp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Xp[t++]=r}Xp.length=t}};function Yp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Xp=[],Zp=!1;function Qp(e,t,n){Xp.push({fragmentInstance:e,observer:t,instance:n}),Zp||(Zp=!0,vm(function(){Zp=!1;var e=Xp;Xp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}zp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,$p,e,void 0,void 0),e};function $p(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}zp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},zp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Kp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||em(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function em(e,t,n,r,i){var a=jt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function tm(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}zp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Kp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),tm(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),tm(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function nm(e,t){return e=b(e),rm(e,t),!1}function rm(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function im(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Xp.length;i++){var a=Xp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Xp[r++]=a)}Xp.length=r,n.observe(e)}),rm(e,t))}function am(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Qp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function om(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:om(n),At(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function sm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Ot])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=pm(e.nextSibling),e===null)break}return null}function cm(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=pm(e.nextSibling),e===null))return null;return e}function lm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=pm(e.nextSibling),e===null))return null;return e}function um(e){return e.data===`$?`||e.data===`$~`}function dm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function fm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function pm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var mm=null;function hm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return pm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function gm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function _m(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function vm(e){Cp(function(){Cp(function(t){return e(t)})})}function ym(e,t,n){switch(t=pp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function bm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&ip(e,t,r,null,sp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===_n&&(e.onclick=null),At(e)}function xm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);At(e)}var Sm=new Map,Cm=new Set;function wm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Tm=I.d;I.d={f:Em,r:Dm,D:Am,C:jm,L:Mm,m:Nm,X:Pm,S:X,M:Fm};function Em(){var e=Tm.f(),t=Hd();return e||t}function Dm(e){var t=Mt(e);t!==null&&t.tag===5&&t.type===`form`?ec(t):Tm.r(e)}var Om=typeof document>`u`?null:document;function km(e,t,n){var r=Om;if(r&&typeof t==`string`&&t){var i=tn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Cm.has(i)||(Cm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),op(t,`link`,e),Ft(t),r.head.appendChild(t)))}}function Am(e){Tm.D(e),km(`dns-prefetch`,e,null)}function jm(e,t){Tm.C(e,t),km(`preconnect`,e,t)}function Mm(e,t,n){Tm.L(e,t,n);var r=Om;if(r&&e&&t){var i=`link[rel="preload"][as="`+tn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+tn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+tn(n.imageSizes)+`"]`)):i+=`[href="`+tn(e)+`"]`;var a=i;switch(t){case`style`:a=Lm(e);break;case`script`:a=Bm(e)}if(!(Sm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),Sm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Rm(a))||t===`script`&&r.querySelector(Vm(a))))){var o=r.createElement(`link`);op(o,`link`,e),t===`style`&&(o[kt]=!0,o.onload=o.onerror=function(){It(o)}),Ft(o),r.head.appendChild(o)}}}function Nm(e,t){Tm.m(e,t);var n=Om;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+tn(r)+`"][href="`+tn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Bm(e)}if(!Sm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),Sm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Vm(a)))return}r=n.createElement(`link`),op(r,`link`,e),Ft(r),n.head.appendChild(r)}}}function X(e,t,n){Tm.S(e,t,n);var r=Om;if(r&&e){var i=Pt(r).hoistableStyles,a=Lm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Rm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=Sm.get(a))&&Wm(e,n);var c=o=r.createElement(`link`);Ft(c),op(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Um(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Pm(e,t){Tm.X(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Bm(e),a=r.get(i);a||(a=n.querySelector(Vm(i)),a||(e=D({src:e,async:!0},t),(t=Sm.get(i))&&Gm(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Fm(e,t){Tm.M(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Bm(e),a=r.get(i);a||(a=n.querySelector(Vm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=Sm.get(i))&&Gm(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Im(e,t,n,r){var a=(a=Ce.current)?wm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Lm(n.href),t=Pt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Lm(n.href);var o=Pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Rm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=Sm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Sm.set(e,o)),Z(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Bm(n),t=Pt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Lm(e){return`href="`+tn(e)+`"`}function Rm(e){return`link[rel="stylesheet"][`+e+`]`}function zm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Z(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[kt]){r.loading=1;return}}else t=e.createElement(`link`),t[kt]=!0,t.onload=t.onerror=It.bind(null,t),op(t,`link`,n),Ft(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Bm(e){return`[src="`+tn(e)+`"]`}function Vm(e){return`script[async]`+e}function Hm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+tn(n.href)+`"]`);if(r)return t.instance=r,Ft(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ft(r),op(r,`style`,a),Um(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Lm(n.href);var o=e.querySelector(Rm(a));if(o)return t.state.loading|=4,t.instance=o,Ft(o),o;r=zm(n),(a=Sm.get(a))&&Wm(r,a),o=(e.ownerDocument||e).createElement(`link`),Ft(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),op(o,`link`,r),t.state.loading|=4,Um(o,n.precedence,e),t.instance=o;case`script`:return o=Bm(n.src),(a=e.querySelector(Vm(o)))?(t.instance=a,Ft(a),a):(r=n,(a=Sm.get(o))&&(r=D({},n),Gm(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ft(a),op(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Um(r,n.precedence,e));return t.instance}function Um(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Wm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Gm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Km=null;function qm(e,t,n){if(Km===null){var r=new Map,i=Km=new Map;i.set(n,r)}else i=Km,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ot]||a[St]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Jm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Ym(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Xm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Zm(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Qm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function $m(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Qm(t),e.suspenseyImages.push(t)),e=ah.bind(e),t.decode().then(e,e))}function eh(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Lm(r.href),a=t.querySelector(Rm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=ih.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ft(a);return}a=t.ownerDocument||t,r=zm(r),(i=Sm.get(i))&&Wm(r,i),a=a.createElement(`link`),Ft(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),op(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=ih.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var th=0;function nh(e,t){return e.stylesheets&&e.count===0&&sh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&th===0&&(th=62500*up());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>th?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function rh(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)sh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function ih(){this.count--,rh(this)}function ah(){this.imgCount--,rh(this)}var oh=null;function sh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,oh=new Map,t.forEach(ch,e),oh=null,ih.call(e))}function ch(e,t){if(!(t.state.loading&4)){var n=oh.get(e);if(n)var r=n.get(null);else{n=new Map,oh.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=ih.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var lh={$$typeof:N,Provider:null,Consumer:null,_currentValue:ge,_currentValue2:ge,_threadCount:0};function uh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ft(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ft(0),this.hiddenUpdates=ft(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function dh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new uh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ji(3,null,null,t),e.current=a,a.stateNode=e,t=Aa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},po(a),e}function fh(e){return e?(e=ki,e):ki}function ph(e,t,n,r,i,a){i=fh(i),r.context===null?r.context=i:r.pendingContext=i,r=ho(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=go(e,r,t),n!==null&&(Ld(n,e,t),_o(n,e,t))}function mh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function hh(e,t){mh(e,t),(e=e.alternate)&&mh(e,t)}function gh(e){if(e.tag===13||e.tag===31){var t=Ei(e,67108864);t!==null&&Ld(t,e,67108864),hh(e,67108864)}}function _h(e){if(e.tag===13||e.tag===31){var t=Pd();t=_t(t);var n=Ei(e,t);n!==null&&Ld(n,e,t),hh(e,t)}}var vh=!0;function yh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=2,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function bh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=8,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function xh(e,t,n,r){if(vh){var i=Sh(r);if(i===null)Yf(e,t,r,Ch,n),Ph(e,r);else if(Ih(i,e,t,n,r))r.stopPropagation();else if(Ph(e,r),t&4&&-1<Nh.indexOf(e)){for(;i!==null;){var a=Mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ot(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-$e(o);s.entanglements[1]|=c,o&=~c}kf(a),!(ed&6)&&(yd=Ve()+500,Af(0,!1))}}break;case 31:case 13:s=Ei(a,2),s!==null&&Ld(s,a,2),Hd(),hh(a,2)}if(a=Sh(r),a===null&&Yf(e,t,r,Ch,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Yf(e,t,r,null,n)}}function Sh(e){return e=yn(e),wh(e)}var Ch=null;function wh(e){if(Ch=null,e=jt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ch=e,null}function Th(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(He()){case Ue:return 2;case We:return 8;case Ge:case Ke:return 32;case qe:return 268435456;default:return 32}default:return 32}}var Eh=!1,Dh=null,Oh=null,kh=null,Ah=new Map,jh=new Map,Mh=[],Nh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ph(e,t){switch(e){case`focusin`:case`focusout`:Dh=null;break;case`dragenter`:case`dragleave`:Oh=null;break;case`mouseover`:case`mouseout`:kh=null;break;case`pointerover`:case`pointerout`:Ah.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:jh.delete(t.pointerId)}}function Fh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Mt(t),t!==null&&gh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ih(e,t,n,r,i){switch(t){case`focusin`:return Dh=Fh(Dh,e,t,n,r,i),!0;case`dragenter`:return Oh=Fh(Oh,e,t,n,r,i),!0;case`mouseover`:return kh=Fh(kh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Ah.set(a,Fh(Ah.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,jh.set(a,Fh(jh.get(a)||null,e,t,n,r,i)),!0}return!1}function Lh(e){var t=jt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,bt(e.priority,function(){_h(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,bt(e.priority,function(){_h(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Rh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Sh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);vn=r,n.target.dispatchEvent(r),vn=null}else return t=Mt(n),t!==null&&gh(t),e.blockedOn=n,!1;t.shift()}return!0}function zh(e,t,n){Rh(e)&&n.delete(t)}function Bh(){Eh=!1,Dh!==null&&Rh(Dh)&&(Dh=null),Oh!==null&&Rh(Oh)&&(Oh=null),kh!==null&&Rh(kh)&&(kh=null),Ah.forEach(zh),jh.forEach(zh)}function Vh(e,n){e.blockedOn===n&&(e.blockedOn=null,Eh||(Eh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Bh)))}var Hh=null;function Uh(e){Hh!==e&&(Hh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Hh===e&&(Hh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(wh(r||n)===null)continue;break}var a=Mt(n);a!==null&&(e.splice(t,3),t-=3,Qs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Wh(e){function t(t){return Vh(t,e)}Dh!==null&&Vh(Dh,e),Oh!==null&&Vh(Oh,e),kh!==null&&Vh(kh,e),Ah.forEach(t),jh.forEach(t);for(var n=0;n<Mh.length;n++){var r=Mh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Mh.length&&(n=Mh[0],n.blockedOn===null);)Lh(n),n.blockedOn===null&&Mh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Ct]||null;if(typeof a==`function`)o||Uh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Ct]||null)s=o.formAction;else if(wh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Uh(n)}}}function Gh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Kh(e){this._internalRoot=e}qh.prototype.render=Kh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;ph(n,Pd(),e,t,null,null)},qh.prototype.unmount=Kh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ph(e.current,2,null,e,null,null),Hd(),t[wt]=null}};function qh(e){this._internalRoot=e}qh.prototype.unstable_scheduleHydration=function(e){if(e){var t=yt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Mh.length&&t!==0&&t<Mh[n].priority;n++);Mh.splice(n,0,e),n===0&&Lh(e)}};var Jh=n.version;if(Jh!==`19.3.1`)throw Error(i(527,Jh,`19.3.1`));I.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Yh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:F,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Xh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xh.isDisabled&&Xh.supportsFiber)try{Xe=Xh.inject(Yh),Ze=Xh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=xc,s=Sc,c=Cc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=dh(e,1,!1,null,null,n,r,null,o,s,c,Gh),e[wt]=t.current,qf(e),new Kh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,ee=10**120*8,j=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),te=[j(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),j(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),j(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:6}),j(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),j(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),j(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:3,clockSpeedPower:2}),j(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:5}),j(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),j(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),j(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),j(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),j(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),j(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),j(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),j(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),j(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:30}),j(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),j(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),j(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),j(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:ee,levers:{clockSpeedPower:.5}}],M=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),N=te.map(e=>({...e,rule:[e.rule,M(e.levers)].filter(Boolean).join(` `)})),ne=.5,re=1e3,ie=.01,P=1e3,ae=1e6,oe=.05,se=.02,ce=Object.fromEntries(N.map(e=>[e.id,e])),le=new Set(N.map(e=>e.id)),ue={enabled:!0},de={enabled:!0},fe=.05,pe=[1,2,3,4,5,6,7,8,9,10],me=[{id:`firstSession`,name:`First session`,boostArea:`foundry`},{id:`foundry`,name:`Foundry`,boostArea:`foundry`},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`},{id:`levelPower`,name:`Level power`,boostArea:`factory`},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`}],he=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],F=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,short:`Ping`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,short:`Compile`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,short:`Ping ×256`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,short:`1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...b.flatMap((e,t)=>[1,2].map(n=>({id:`pool${String(t+1).padStart(2,`0`)}Reset${n===1?`I`:`II`}`,name:`${e.symbol} Reclamation ${n===1?`I`:`II`}`,group:`foundry`,trigger:`Compact the ${e.symbol} pool ${n===1?`once`:`twice`}`,short:`Compact ${e.symbol} pool${n===1?``:` ×2`}`,shortBonus:`Disk step ${n} ↑`,bonus:`The ${n===1?`first`:`second`} disk-size exponent step now closes 10% of the gap to 1.0`,condition:{kind:`poolExponentBonus`,poolIndex:t+1,min:n}}))),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:he[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,short:`Buy ${e.symbol}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,name:`Spent QB`,group:`tierLadder`,trigger:`Restage while holding 0 Quettabytes`,short:`Restage at 0 QB`,shortBonus:`QB credited without balance`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`counter`,key:`emptyRestages`,min:1}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,short:`Accelerate 1`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,short:`Accelerate 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,short:`Overclock`,condition:{kind:`overclocked`}},...pe.map((e,t)=>({id:`levelPower${t+1}`,name:`${b[e-1].symbol} Level 10`,group:`levelPower`,trigger:`Reach level 10 on ${b[e-1].name} (9 levels completed)`,short:`${b[e-1].symbol} level 10`,shortBonus:`+${fe} per-level multiplier`,bonus:`The per-level production multiplier rises by ${fe} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:10}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,short:`First Overclock at 6+`,shortBonus:`Overclock step −1`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,short:`2 Overclocks/Purge, no Accelerate`,shortBonus:`Overclock step −1`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,short:`DeGoogol, Overclock at 12+`,shortBonus:`Overclock step −1`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}}].map(e=>({secret:!1,platformDependent:!1,bonus:null,short:null,shortBonus:null,...e})),I=[{id:`ping`,name:`Ping`,members:[`helloWorld`,`pingOfDeath`]},{id:`poolReset`,name:`Reclamation`,members:b.flatMap((e,t)=>[`pool${String(t+1).padStart(2,`0`)}ResetI`,`pool${String(t+1).padStart(2,`0`)}ResetII`])},{id:`tierBought`,name:`First purchase`,members:b.map((e,t)=>`tier${String(t+1).padStart(2,`0`)}Bought`)},{id:`accelerate`,name:`Accelerate`,members:[`tickTock`,`megahertzMyth`]},{id:`levelPower`,name:`Level power`,members:pe.map((e,t)=>`levelPower${t+1}`)},{id:`overclockStep`,name:`Overclock step`,members:[`overclockStep1`,`overclockStep2`,`overclockStep3`]}],ge=Object.fromEntries(I.flatMap(e=>e.members.map((t,n)=>[t,{...e,level:n+1}]))),_e=Object.fromEntries(F.map(e=>[e.id,e])),ve=1024,ye=1e3,be=8*ye**2/10,L=(e=1)=>({startBits:8,endBits:8/10*ye**(Math.max(1,Math.floor(Number(e)||1))+1)}),xe=.5,Se=.9,Ce=8e3,we=1e3,Te=8*ve,Ee=8e3,De=be/2,Oe=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],ke={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},Ae=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],je=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],Me=[1,10,100],Ne=[9,9,9],Pe=1e3,Fe=[1,10,100,Pe],Ie=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],Le=10*Me.length,Re=[1,10,100,1e3],ze=.5,Be=86400,Ve=14400,He=14400,Ue=[4,40,400,4e3,4e4],We=2e3,Ge=1024,Ke=1.1,qe=.01,Je=.1,Ye=Math.floor(Math.log2(Ge)),Xe=.9,Ze=.01,Qe={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},$e={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},et={baseCost:100,baseSeconds:16},tt=.01,nt=.1,rt=.01,it=.01,at=.1,ot=1e3,st=1e30,ct=1e-4,lt=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],ut=Object.assign(Object.create(null),Object.fromEntries(lt.map(e=>[e.id,e]))),dt=Object.assign(Object.create(null),Object.fromEntries(lt.map((e,t)=>[e.id,t]))),ft=k,pt=1e-5,mt=()=>b[b.length-1].id,R=e=>Math.max(0,Number.isFinite(e)?e:0),ht=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),gt=1e-9,_t=1e-9,vt=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},yt=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),bt=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=yt();return e},xt=()=>({resources:vt().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,accelerateBoughtThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:ht()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:Wr(1),unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:lt.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:lt.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:lt.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:lt.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:bt(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),St=new Intl.NumberFormat(`en-US`),Ct=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),wt=1e4,Tt=1e3,Et=1+1e-12,Dt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*Et;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*Tt)/Tt;return`${Number(r.toFixed(3))}e${t}`},z=e=>{let t=R(e);return t<wt?St.format(t):Dt(t)},Ot=1e-9,kt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>Ot?null:`${Dt(10**t)} ${E(T)}`},At=e=>{let t=Math.floor(R(e)),n=E(O);return t<wt?`${Ct.format(t)} ${n}`:kt(t)??`${Dt(t)} ${n}`},jt=e=>{let t=Math.floor(R(e)),n=E(T);return t<wt?`${Ct.format(t)} ${n}`:`${Dt(t)} ${n}`},Mt=8e3,Nt=e=>{let t=Math.floor(R(e));if(t<Mt)return At(t);let n=Math.floor(t/8);return n<wt?`${Ct.format(n)} B`:`${Dt(n)} B`},Pt=e=>{let t=R(e);return t===0?1:2+(t-1)*t/2},Ft=e=>{let t=e.purchaseLevels?.[mt()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},It=(e,t)=>{let n=S[e?.id];if(n===void 0)return Pt(t);let r=R(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},Lt=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(It(e,n)-1)},Rt=(e,t,n)=>{let r=Math.max(0,R(e)-R(t));return Math.max(0,Math.min(R(n),r))},zt=(e,t,n,r,i)=>Lt(e,t)*Rt(n,r,i),Bt=(e,t,n,r,i,a)=>{let o=Rt(n,r,a),s=Lt(e,t);return s<=0?o:Math.min(o,Math.floor(R(i)/s))},Vt=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),Ht=(e,t)=>Vt(Math.max(0,S[e]??-1))**Math.max(0,R(t)-1),Ut=(e,t)=>Ht(e,t),Wt=e=>1+Math.max(0,S[e]??-1)*1,B=e=>11+Math.max(0,S[e]??-1)*1,Gt=e=>{let t=R(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=Wt(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=B(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=Qe.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=Qe.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=Qe.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=Qe.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=Qe.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},Kt=(e,t=Je)=>(1+t)**R((e??1)-1),qt=e=>10**(R(e)+1),Jt=e=>qt(e)*8,Yt=e=>(e.resources?.base??0)>=Jt(e.globalTickspeedMultiplier??0),Xt=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,Zt=(e,t=0)=>{let n=R(e??0);return(1+tt*dr(t))**n},Qt=e=>(e.scaleUpTierCounts?.[Tr(e).id]??0)>=1,$t=e=>(1+it)**R(e),en=e=>Math.max(1,Math.ceil(at*R(e))),tn=(e,t=!0)=>{let n=R(e);return!t||n<1?1:n<2?Ke:1+Math.log10(n)},nn=e=>!!e.prestigeSpeedBonusUnlocked,rn=e=>{if(e.prestigeSpeedBonusUnlocked||R(e.purge.points)<1)return e;let t=vn(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},an=e=>e.playtimeBonusUnlocked?1+qe*(R(e.activePlaySeconds??0)/3600):1,on=e=>{if(e.playtimeBonusUnlocked||R(e.purge.points)<100)return e;let t=vn(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},sn=e=>{if(e.buyMaxUnlocked||R(e.purge.points)<2)return e;let t=vn(e);return{...t,purge:{...t.purge,points:t.purge.points-2},buyMaxUnlocked:!0}},cn=e=>{if(e.cacheWarmUnlocked||R(e.purge.points)<20)return e;let t=vn(e);return un({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},ln=e=>b[Math.min(b.length,Math.max(1,ra(e)))-1],un=e=>{if(!e.cacheWarmUnlocked||gr(e))return e;let t=ln(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,Ft(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:gi(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},dn=Ue.length,fn=e=>Math.min(dn,Math.floor(R(e?.sleepModeCapLevel??0))),pn=e=>Math.min(Be,Ve+He*fn(e)),mn=e=>Ue[e]??null,hn=e=>{let t=fn(e),n=mn(t);if(n===null||R(e.purge.points)<n)return e;let r=vn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},gn=e=>t=>({...t,activePlaySeconds:R(t.activePlaySeconds??0)+R(e)}),_n=e=>!!e.computeFlops?.pageUnlocked||R(e.purge?.points??0)>=100,vn=e=>e.computeFlops?.pageUnlocked||R(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},yn=(e,t,n)=>{let r=ut[t];if(!r)return{affordable:0,totalCost:0};let i=R(e.computeFlops?.owned?.[t]??0),a=R(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=xn(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},bn=(e,t,n)=>r=>{if(t<=0)return r;let i=vn(r),a=R(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},xn=(e,t=0)=>{let n=t+1;return Lt({baseCost:e.baseCostPP},n)},Sn=(e,t)=>{let n=ut[t];if(!n)return!1;let r=xn(n,R(e.computeFlops?.owned?.[t]??0));return R(e.purge?.points??0)>=r},Cn=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=xn(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},wn=(e,t=1)=>n=>{let r=ut[e];if(!r)return n;let i=vn(n),a=R(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=Cn(r,a,R(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:R(a+o)}}}},Tn=e=>10**R(e),En=e=>lt.reduce((t,n,r)=>t+R(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*Tn(r),0),Dn=e=>{let t=R(e.hyperscalerCount??0);return t<=0?0:t*(ct+R(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*pt)},On=(e,t)=>1+R(e.computeFlops?.cumulativeBoost?.[t]??0)+Dn(e),kn=e=>{let t=R(e);return t===0?`0 Flops`:`${z(t)} Flops`},An=e=>t=>{if(e<=0)return vn(t);let n=vn(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost};return lt.forEach(t=>{let n=R(r[t.id]??0);if(n<=0)return;let o=n*ct*e;if(o<=0)return;let s=t.boostsTierId;a[s]=R((a[s]??0)+o),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},jn=e=>R(e.purge?.points??0)>=ft,Mn=e=>1+R(e.eonsUpgrades?.eonAmplifierLevel??0)*1,Nn=e=>1*10**R(e),Pn=e=>R(e.eons?.balance??0)>=Nn(e.hyperscalerCount??0),Fn=e=>{if(!Pn(e))return e;let t=Nn(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:R(e.eons.balance)-t},hyperscalerCount:R(e.hyperscalerCount??0)+1}},In=e=>1+Math.max(0,dt[e]??-1)*1,Ln=e=>{let t=R(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return lt.forEach(e=>{(r[e.id]??null)===null&&t>=In(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},Rn=(e,t)=>n=>!lt.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},zn=e=>t=>{if(e<=0)return t;let n=t;return lt.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+gt);if(i>=1){let{affordable:e,totalCost:a}=yn(n,t.id,i);e>0&&(n=bn(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},Bn=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},Vn=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||Ka(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolExponentBonus`:return(e.intro?.poolExponentBonuses?.[t.poolIndex]??0)>=t.min;default:return!1}},Hn=(e,t)=>{if(t.min<=1)return null;switch(t.kind){case`counter`:return t.key===`maxFirstOverclock`?null:{current:e.achievements?.counters?.[t.key]??0,target:t.min};case`clockSpeedLevel`:return{current:e.globalTickspeedMultiplier??0,target:t.min};case`tierLevel`:return{current:e.purchaseLevels?.[t.tierId]??1,target:t.min};case`poolExponentBonus`:return{current:e.intro?.poolExponentBonuses?.[t.poolIndex]??0,target:t.min};case`storageUnlocked`:{let t=e=>Math.log2(Math.max(e,8)/8);return{current:Math.floor(t(e.intro?.capacity??0)),target:t(Te)}}default:return null}},Un=e=>e.bonus??null,Wn=e=>e.short??e.trigger,Gn=e=>e.shortBonus??e.bonus??null,Kn=e=>e>=1?Math.max(rt,10/(1+Math.log10(e))):1/0,qn=(e,t)=>!!e.achievements?.earned?.[t],Jn=e=>{if(!ue.enabled)return e;let t=F.filter(t=>!qn(e,t.id)&&Vn(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},Yn=e=>me.filter(t=>{let n=F.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>qn(e,t.id))}).map(e=>e.id),Xn=.1,Zn=(e,t)=>{let n=F.filter(e=>e.group===t&&!e.platformDependent),r=n.filter(t=>qn(e,t.id)).length,i=n.length>0&&r===n.length,a=Math.ceil(n.length*Xn);return{earned:r,bonus:i?a:0,total:n.length+a,complete:i}},Qn=e=>me.reduce((t,n)=>{let{earned:r,bonus:i}=Zn(e,n.id);return t+r+i},0),$n=e=>{if(!jn(e))return e;let t=xt(),n=Mn(e),r=R(e.era?.count??0)+1,i=mr(e);return un(Ln({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:Bn(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:ht()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:R(e.eons?.balance??0)+n},hyperscalerCount:R(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},er=e=>{let t=e.prestigeDoublePpLevel??0,n=ti(t);if(R(e.purge.points)<n)return e;let r=vn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},tr=e=>{let t=F.filter(t=>t.group===`levelPower`&&qn(e,t.id)).length;return Math.round((1+fe*t)*1e6)/1e6},nr=(e,t=1)=>{let n=Math.max(0,R(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},rr=e=>2**R(e),ir=(e,t)=>vr(e,`scaleUpNoDoubling`)||yr(e,`singleInstance`)===t?1:rr(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**xr(e,`scaleUpPower`,1),ar=e=>Math.min(R(e.scaleUpTargetTierIndex??0),wr(e)-1),or=e=>b[ar(e)],sr=e=>3*(Math.max(0,R(e.scaleUpCount??0)-(wr(e)-1))+1),cr=e=>{let t=ur(e);return t===null?5:t+lr(e)},lr=e=>{let t=F.filter(t=>t.group===`overclockStep`&&qn(e,t.id)).length;return Math.max(1,4-t)},ur=e=>{let t=e.overclockLastClaimCompletedLevels??(R(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:R(t)},dr=e=>(1+nt)**R(e),fr=e=>Qe[e],pr=e=>1/qu(e,`purge`),mr=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&qu(e,`purge`)<=1,hr=e=>!!ce[e]&&le.has(e),gr=e=>{let t=e.challenges?.active;return t&&hr(t)?ce[t]:null},_r=(e,t)=>!!e.challenges?.completed?.[t],vr=(e,t)=>gr(e)?.effect===t,yr=(e,t)=>{let n=gr(e);return n?.effect===t?n.automation.key:null},br=(e,t)=>({balance:Math.max(e.balance??0,R(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),xr=(e,t,n)=>gr(e)?.levers?.[t]??e.runLevers?.[t]??n,Sr=(e,t)=>(yr(e,`halfDuplex`)===t?ne:1)*xr(e,`production`,1),Cr=(e,t)=>{let n=x[t];if(!n)return n;let r=(yr(e,`premiumTier`)===t?re:1)*xr(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},wr=e=>vr(e,`addressSpace`)?6:b.length,Tr=e=>b[wr(e)-1],Er=e=>Math.floor(R(e.challenges?.activeSeconds)/30+1e-9)%2==0,Dr=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!gr(e))return n;if(yr(e,`clockGated`)===t||yr(e,`dutyCycle`)===t&&!Er(e))return 1;if(yr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},Or=e=>{if(!vr(e,`bitRot`))return 0;let t=R(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(ae,P*2**(t/30))/10**(Ai(e.intro)-1)},kr=e=>gr(e)?.goal??8e100,Ar=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,jr=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?Wt(n):t===`tierTickspeed`?B(n):fr(n))},Mr=(e,t)=>{let n=ce[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:Yu(e,i))&&R(e.purge?.count??0)>=jr(n)},Nr=(e,t)=>N.find(n=>n.automation.kind===e&&n.automation.key===t&&hr(n.id))??null,Pr=(e,t,n)=>{let r=Nr(t,n);return!!r&&!_r(e,r.id)},Fr=e=>{let t=e.challenges?.completed??{},n=N.filter(n=>hr(n.id)&&!t[n.id]&&Ar(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...xt().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},Ir=e=>t=>{if(!gr(t))return t;let n=t.challenges.run??ht();return{...t,challenges:{...t.challenges,activeSeconds:R(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:R(n.cycleSeconds)+e}}}},Lr=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??ht(),...t}}}),Rr=(e,t,n)=>{if(n===t)return n;let r=n;if(yr(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return yr(n,`writeLock`)===e&&(r=Lr(r,{haltSeconds:10})),r},zr={hardRefresh:{interval:300,apply:(e,t)=>Lr({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},Br=(e,t)=>{let n=t,r=yr(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-ie)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=Lr({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(vr(n,`bitRot`)&&Or(n)>R(n.resources.base)){let e=md(n,!1);n={...e,challenges:{...e.challenges,run:{...ht(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},Vr=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=gr(r);if(!e)return ci(i,t,0)(r);let n=zr[e.effect],a=R(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=R(r.challenges.run?.haltSeconds),l=c>0?Lr(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>gr(e)?Ir(o)(e):e)(ci(o,t,c)(l)),d=!gr(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=gr(d)?Br(o,d):d,s&&gr(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},Hr=e=>!mr(e)&&R(e.resources.base)>=kr(e),Ur=e=>t=>{let n=S[t.id]??-1;if(n>=wr(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},Wr=e=>Gr(R(e)/8),Gr=e=>{let t=R(e);return t<1?0:Math.floor(Math.log10(t))},Kr=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=Gr(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},qr=e=>{let t=R(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},Jr=e=>vr(e,`clockSpeedDisabled`)?1:Zt(e.globalTickspeedMultiplier??null,ur(e)??0)**xr(e,`clockSpeedPower`,1),Yr=e=>vr(e,`clockSpeedDisabled`)?0:(1+tt*dr(ur(e)??0))**xr(e,`clockSpeedPower`,1)-1,Xr=e=>vr(e,`scaleUpNoDoubling`)?1:2**xr(e,`scaleUpPower`,1),Zr=(e,t)=>{let n=Kt(Dr(e,t),yr(e,`halfStep`)===t?oe:Je)*(t===Tr(e).id?$t(e.lastTierXpConsumed??0):1),r=Jr(e),i=yr(e,`noisyNeighbour`),a=(yr(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+se)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:_t},Qr=()=>Math.log2(64),$r=(e=0)=>{let t=R(e);return 64/2**Math.min(t,Qr())},ei=(e=0)=>{let t=R(e),n=Qr();return t>n?2**(t-n):1},ti=(e=0)=>10**(R(e)+1),ni=(e,t=0)=>{let n=R(e);if(n<8e100)return 0;let r=Math.floor(Math.log10(k)),i=Math.max(0,Gr(n)-r),a=$r(t),o=ei(t);return(1+Math.floor(i/a))*o},ri=(e,t)=>{let n=Wr(R(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},ii=200,ai=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<ii;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=ii&&(o=Math.min(o,1)),{state:a,budget:o}},oi=(e,t,n,r)=>{let{state:i,budget:a}=ai(e,t,qu(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},si=`unit`,ci=(e,t=1,n=0)=>r=>{let i=go(r),a=Sa(e)(i),o=ka(Ko(e)(Ra(e)(Va(e)(_o(e)(a))))),s=ys(e)(o),c=ps(e)(s),l=ld(ys(0)(c)),u=eu.reduce((t,n)=>n(e)(t),l),d=yc(e)(u),f=vo(wu(e)(d)),p=Pc(Gc(e,f)(Ca(e)(f))),m=Vc(e)(p),h=zn(e)(An(e)(m)),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=Os(Es(t)),r=Vo(e)(Wo(e)(n));return r===t?t:ys(0)(r)};if(Hr(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+pr(h)*e;return _(t>=.999999999?dd(h):{...h,autoPurgeAttemptBudget:t})}let v=tn(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*an(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!Ur(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/Lu(n,r.id);for(;a>=.999999999&&!(Math.floor(a+gt)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=vi(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=zu(i,r.id);if(n>1&&e===0){let e=Di(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!Si(i,r))break;let o=vi(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,R(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!Ur(y)(e)||k)return;let t=Zr(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+gt)/t);if(T[e.id]=n-r*t,r<=0)return;let i=yr(y,`flatRate`)===e.id?1:nr(y.purchaseLevels?.[e.id]??1,tr(y)),a=Sr(y,e.id),o=uu(y.intro,S[e.id]+1),s=On(y,e.id),c=ir(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=R((C.base??0)+l*8)):C[e.producesResourceId]=R((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=R((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,ee=x[mt()],j=Math.max(0,(y.purchaseLevels?.[ee.id]??1)-1);if(j>0&&qn(y,`quettaSpent`)&&Ur(y)(ee)&&!k){let e=Kn(j);A+=D;let t=Math.floor(A/e+gt);t>0&&(A=Math.max(0,A-t*e),C[ee.id]=R((C[ee.id]??0)+t),w[ee.id]=R((w[ee.id]??0)+t))}let te={...y,lastTierLevelCreditTimer:A,resources:C,owned:w,tierProductionAccumulators:T,purge:ri(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+pr(y)*e}:{}},M=te.runPeaks?br(te.runPeaks,te):null,N=te;mr(N)&&g&&R(N.resources.base)>=kr(N)&&(N.autoPurgeAttemptBudget??0)>=.999999999&&(N=dd(N));let ne=N.autoOverclock&&(N.autoOverclockEnabled??!0)?oi(N,e,`overclock`,bd):N,re=ne.autoScaleUp&&(ne.autoScaleUpEnabled??!0)?oi(ne,e,`scaleUp`,yd):ne,ie=re.autoXpTickspeed&&(re.autoXpTickspeedEnabled??!0)?oi(re,e,`restage`,e=>Dd(e.purge.xp)(e)):re,P=M?{...ie,runPeaks:M}:ie,ae=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=ai(t,e,$u(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>Nu(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},P);return _(ae.autoGlobalTickspeed&&(ae.autoGlobalTickspeedEnabled??!0)?oi(ae,e,`speedUp`,id):ae)},li=(e,t=1)=>n=>Jn(gr(n)&&e>0?Vr(e,t,n):ci(e,t,0)(n)),ui=(e,t=Be)=>{let n=Math.min(R(e),t,Be);return Math.floor(n*(n>600?ze:1))},di=(e,t=1)=>n=>{let r=ui(e,pn(n)),i=n;for(let e=0;e<r;e++)i=li(1,t)(i);return i},fi=(e,t=Be)=>Math.floor(Math.min(R(e),t,Be))-ui(e,t),pi=(e,t=1,n)=>r=>{let i=fi(e,n??pn(r)),a=r;for(let e=0;e<i;e++)a=li(1,t)(a);return a},mi=e=>{let t=Math.max(0,Math.floor(R(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},hi=(e,t)=>e.resources[t.costResourceId]??0,gi=(e,t)=>e.purchased?.[t]??0,_i=(e,t)=>n=>{if(Hr(n))return n;let r=Cr(n,e);if(!r||!Ur(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Ft(n),s=Bt(r,i,o,a,hi(n,r),t);if(s<=0)return n;let c=Lt(r,i)*s,l=gi(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:R((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},vi=(e,t)=>n=>Rr(e,n,_i(e,t)(n)),yi=e=>!!e.buyMaxUnlocked,bi=e=>R(e.purge?.count??0)>=1||R(e.era?.count??0)>=1||Oe.some(t=>!!e.intro?.[t.autoFlagField]),xi=e=>t=>{let n=t;for(let t=0;t<Ge;t++){let t=e(n);if(t===n)break;n=t}return n},Si=(e,t)=>{let n=Cr(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=Ft(e),a=e.purchaseLevelProgress?.[n.id]??0;return Bt(n,r,i,a,hi(e,n),i)>=i-a},Ci=(e,t)=>{let n=Cr(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=Ft(e);return Bt(n,r,i,0,hi(e,n),i)>=i},wi=e=>t=>{if(Hr(t))return t;let n=Cr(t,e);if(!n||!Ur(t)(n))return t;if(!Ci(t,n))return vi(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&Ci(r,n);t++){let t=vi(e,2**53-1)(r);if(t===r)break;r=t}return r},Ti=e=>t=>Rr(e,t,wi(e)(t)),Ei=(e,t)=>n=>{if(Hr(n))return n;let r=Cr(n,e);if(!r||!Ur(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,Ge)&&Ci(i,r);n++){let t=vi(e,2**53-1)(i);if(t===i)break;i=t}return i},Di=(e,t)=>n=>Rr(e,n,Ei(e,t)(n)),Oi=(e,t)=>{let n=Cr(e,t);if(Hr(e)||!n||!Ur(e)(n)||!Ci(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&Ci(r,n);e++){let e=vi(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=Ft(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,Bt(n,o,a,0,hi(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:hi(e,n)-hi(r,n),lastLevelCost:hi(i,n)-hi(r,n),partialQuantity:s,partialCost:s>0?zt(n,o,a,0,s):0}},ki=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=Ft(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=gi(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},Ai=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*Me.length,Number.isFinite(t)&&t>=1?t:1)},ji=e=>{let t=Ai(e),n=Math.floor((t-1)/Me.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(Me.length-1,Math.max(0,t-1-(n-1)*Me.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=Se,o=1-(1-a)**2;return 1-(1-xe)*a**(n+i)*o**(r-i)},Mi=(e,t=xe)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},Ni=e=>Mi(e.speedCapacity??e.capacity??0,ji(e))*8,Pi=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(we);return 10**(n-t*(n-Math.log10(10)))},Fi=Math.log(we/100),Ii=Math.log(we/10),Li=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-Fi)*(Math.exp(Ii*s)-Math.exp(Ii*o))/Ii},Ri=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(Ii*a)+Ii*n/t*Math.exp(Fi)*r,s=t/Ii*Math.log(o);return Math.min(t,s)-i},zi=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,Bi=e=>Pi(zi(e)),Vi=e=>Bi(e),Hi=e=>1+(e?.dataStreamTapBonusPercent??0)/100,Ui=e=>Vi(e)/100,Wi=e=>Ni(e)*lu(e)*Ui(e),Gi=100,Ki=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?Fa(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=Hi(e),o=Gi*a,s=Ni(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},qi=e=>{if(Ka(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(Ni(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},Ji=e=>{let t=qi(e);if(!ue.enabled||t===e)return t;let n=t.achievements??xt().achievements;return Jn({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}})},Yi=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},Xi=()=>10,V=e=>{let t=ks(e);return t?Math.ceil(t/Me.length):null},Zi=(e,t)=>{if(!Number.isInteger(t)||t<1||t>Xi())return!1;let n=(t-1)*Me.length+1;return Me.every((t,r)=>{let i=yo(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},Qi=e=>{let t=(e-1)*Me.length+1;return Me.map((e,n)=>yo(t+n))},$i=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!G(e,r)?.rebuilding}),ea=(e,t)=>!!G(e,t)?.rebuilding,ta=(e,t)=>!Number.isInteger(t)||t<1||t>Xi()?!1:t===1||Zi(e,t-1),na=e=>{let t=0;for(let n=1;n<=Xi()&&ta(e,n);n+=1)t=n;return t},H=e=>8*ve**e,ra=e=>{let t=1;for(let n=2;n<=Xi()&&!((e.intro?.capacity??0)<H(n));n+=1)t=n;return t},ia=[1,2,4,8,16,32,64,125,250,500],aa=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return ia[t%10]*1e3**Math.floor(t/10)*8},oa=Math.log10(2),sa=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*oa)*8},ca=(e,t)=>{if(!Number.isInteger(t)||t<1||t>ra(e))return 0;let n=(da(e,t)/8)**ji(e.intro),r=Ni(e.intro??{})/8,i=aa(Math.min(r,n)*8),a=Math.max(0,G(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=aa(o*Math.SQRT2);if(t>=Xi())return o;let s=ca(e,t+1);return Math.max(i,Math.min(o,s/2))},la=(e,t)=>{let n=ca(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,H(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=ca({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:aa(Ni(e.intro??{}))},ua=(e,t)=>{let n=sa(e??0),r=t===1?L(1).startBits:L(t-1).endBits,i=L(t).endBits;return Math.min(Math.max(n,r),i)},da=(e,t)=>!Number.isInteger(t)||t<1||t>ra(e)?0:ua(e.intro?.capacity??0,t),fa=(e,t)=>da(e,t),pa=(e,t)=>t<=ra(e)?fa(e,t):ua(H(t),t),ma=(e,t)=>e.intro?.poolBuffers?.[t]??0,ha=(e,t)=>{let n=fa(e,t);return n>0?Math.min(1,ma(e,t)/n):0},ga=(e,t)=>Pi(ha(e,t)),_a=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,va=(e,t)=>ga(e,t),ya=(e,t)=>1+_a(e,t)/100,ba=(e,t)=>{let n=Ni(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-ca(e,r));return Math.min(ca(e,t),n)},xa=e=>t=>{if(!Number.isInteger(e)||e<1||e>ra(t))return t;let n=_a(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},Sa=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},Ca=e=>t=>{if(!Ka(t))return t;let n=ra(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=ba(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=fa(t,s),u=Math.max(0,l-c),d=n*fu(t.intro,s),f=e;if(u>0){let t=Ri(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=Li(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!oc(t,s)||!Zi(t,s)||Wc(t,s))continue;let{lake:p,remainingBits:m,changed:h}=zc(t,s,n*ac(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},wa=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||ja(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,ks(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,ks(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,ks(i.diskBuild.size)??1)),o>Ai(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>Xi())continue;let i=e[r]??0,a=pa(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=V(c);if(u){let t=pa({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=Lc(o),c=Math.max(Ls(Is(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),Re[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=Fe.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=Do(t),a=Ao(t,n),o=Oo(t,n),s=cd(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},Ta=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=xs(e,t);return!n||S[n.id]>=wr(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},Ea=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>Ta(e,t)),Da=(e,t)=>{if(!t||t>ra(e))return 0;let n=Lc(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},Oa=e=>{if(e.intro.diskBuild||Co(e)||Eo(e))return!1;let t=Do(e);if(Ao(e,t)>=Oo(e,t))return!0;let n=V(t);return ea(e,n)||$i(e,n)?!1:ca(e,n)>0&&fa(e,n)>=t},ka=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=Xi();e+=1){let n=G(t,e);if(!n?.rebuilding)continue;let r=Qi(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=Dc(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(fa(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},Aa=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!ja(e),ja=e=>{let t=Xi(),{endBits:n}=L(t);return da(e,t)>=n},Ma=e=>Aa(e),Na=e=>{let t=Zc(e)?Wa(e):e;return go({...t,intro:{...t.intro,speedCapacity:t.intro.speedCapacity??t.intro.capacity,capacity:t.intro.capacity*2,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},Pa=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!ja(e)},Fa=e=>e.speedCapacity??e.capacity??0,Ia=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:Fa(t)*2<=t.capacity},La=e=>Ia(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,Ra=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Fa(t.intro),a=Math.min(t.intro.bits,Ni(t.intro)*Hi(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},za=e=>Ba(e),Ba=e=>Pa(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,Va=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(ja(t))return Ha(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,Ni(t.intro)*Hi(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?Na(a):a},Ha=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,Ua=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],Wa=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of je)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of Ua)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},Ga=e=>(e.intro?.capacity??0)>=Ce,Ka=e=>(e.intro?.capacity??0)>=Te,qa=[`B`,...b.map(e=>e.symbol)],Ja=1e3,Ya=[`b`,...qa.slice(1).map(e=>e.replace(/B$/,`b`))],Xa=e=>{let t=1,n=0;for(;e/t>=Ja&&n<Ya.length-1;)t*=Ja,n+=1;return{symbol:Ya[n],divisor:t}},Za=e=>{let t=8,n=0;for(;e/t>=Ja&&n<qa.length-1;)t*=Ja,n+=1;return{symbol:qa[n],divisor:t}},Qa=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],$a=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<Qa.length-1;)n*=ve,r+=1;return{symbol:Qa[r],divisor:n}},eo=(e,t)=>Math.floor(e*10**t)/10**t,to=e=>{let t=Math.floor(e);return`${z(t)} bit${t===1?``:`s`}`},no=3,ro=5,io=e=>e>=4?ro:4,ao=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(no,Math.max(0,io(t)-t))},oo=(e,t)=>{if(t){let n=e/t.divisor,r=eo(n,ao(n));return r>0&&r<1?to(e):`${z(r)} ${t.symbol}`}return to(e)},so=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),co=(e,t)=>{if(!t)return to(e);let n=e/t.divisor,r=ao(n),i=eo(n,r);return i>0&&i<1?to(e):i===0?`${z(i)} ${t.symbol}`:`${so[r].format(i)} ${t.symbol}`},lo=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},uo=e=>e.replace(/^[\d,]*\.?\d+/,e=>lo(Number(e.replace(/,/g,``)))),fo=e=>oo(e,$a(e,!0)),po=e=>oo(e,Za(e)),mo=e=>Lt(b[0],e.purchaseLevels?.[b[0].id]??1)*8,ho=e=>{let t=mo(e);if(e.intro.bits<t)return e;let n=b[0].id;return ki(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},go=e=>e.intro?.mainGameUnlocked||!Ka(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},_o=e=>t=>{if(!t.intro.byteCreated)return t;let n=Ni(t.intro)*lu(t.intro),r=Ri(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},vo=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=Rt(Ft(e),n,2**53-1),i=mo(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return ki(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},yo=e=>Ee*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),bo=e=>na(e)*Me.length,xo=e=>Math.min(bo(e),Ai(e.intro)),So=e=>yo(Ai(e.intro)),Co=e=>{let t=Do(e);return t<So(e)&&!ea(e,V(t))},wo=e=>e.intro?.diskBuild||!Eo(e)?!1:Ai(e.intro)<bo(e),To=e=>{if(!wo(e))return e;let t=Ai(e.intro)+1,n=ud(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},Eo=e=>((e.intro?.disksBuiltTotal??{})[yo(xo(e))]??0)>=9,Do=e=>{let t=e.intro?.disksBuiltTotal??{},n=xo(e),r=1,i=yo(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=yo(r);return i},Oo=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),ko=(e,t)=>t*Oo(e,t),Ao=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,U=po,jo=e=>({symbol:qa[e]??qa[qa.length-1],divisor:8*Ja**e}),Mo=(e,t)=>oo(e,jo(t)),No=(e,t)=>{let n=jo(t);return e>0&&e<n.divisor?Za(e):n},Po=(e,t)=>oo(e,No(e,t)),Fo=(e,t)=>co(e,No(e,t)),Io=e=>oo(e,Xa(e)),Lo=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=Do(e),i=[];for(let t=1;t<=ra(e);t+=1)i.push(Lc(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},Ro=e=>Oa(e)&&!Ea(e),zo=e=>!Ro(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},W=e=>e.intro?.diskBuildQueued||Co(e)||e.intro.diskBuild||Eo(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},Bo=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,Vo=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!Ro(t))return t;let n=Do(t),r=V(n),i=Ao(t,n),a=Oo(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?cd(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=ma(t,r),u=Math.max(0,l-Da(t,r)),d=ca(t,r)*ya(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-gt){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-gt;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},Ho=200,Uo=(e,t)=>{let n=V(t);return t/Math.max(la(e,n)*ya(e,n),Number.MIN_VALUE)},Wo=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!Co(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<Ho;e+=1){let e={...t,intro:n};if(!Co(e))break;let a=Do(e),o=V(a);if(ea(e,o)||$i(e,o)||fa(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=ca(e,o)*ya(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-Da(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},Go=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!Co(e))return t;let n=Ai(e.intro);for(let r=1;r<n;r+=1){let n=yo(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,ca(e,V(n))<=0&&(t.projected=!0);let s=Uo(e,n);t.seconds+=(9-a-o)*s}return t},Ko=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>gt?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},qo=e=>{let t=ks(e);return t?yo(t+1):e*10},Jo=e=>{let t=V(e);return!!t&&V(qo(e))===t},Yo=(e,t)=>e.intro?.diskWriteCache?.[t]??null,Xo=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,Zo=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],Qo=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,$o=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,Xo(e)-(e.segmentsCollected??0)*t),r=Zo(e).reduce((e,t)=>e+Qo(t),0);return Math.min(1,Math.max(0,(n+r)/t))},es=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,ts=(e,t)=>{let n=Yo(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=Zo(n);return r.length>0&&r.every(t=>Ss(e,t.size))},ns=e=>{let t=ks(e);if(!t||t<=1)return null;let n=yo(t-1),r=V(e);return r&&V(n)===r?n:null},rs=(e,t)=>!ns(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),is=(e,t,n=!1)=>({sourceSize:ns(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),as=(e,t)=>{if(!ns(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=Yo(e,t);return!n||!n.expedite&&n.segmentsCollected<10},os=(e,t)=>!!Yo(e,t)?.expedite,ss=e=>t=>{if(!as(t,e))return t;let n=Yo(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:is(t,e,!0)}}}},cs=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},ls=(e,t)=>{let n=ca(e,V(t))*5;return t/Math.max(n,Number.MIN_VALUE)},us=(e,t,n,r)=>{let i=V(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of Zo(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=Qi(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||Ss(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},ds=1-1e-9,fs=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),ps=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=V(s.sourceSize);if(c===V(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,pa(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;rs(t,e)&&(i[e]=is(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=V(c),d=ya(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>gt){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??ns(c);if(!(p>0))continue;let m=Zo(l),h=Xo(l),g=[];for(let t of m){if(Ss(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>gt?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=cs(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-Da(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*ds){let e=g.reduce((e,t)=>e+t.size,0);for(let n of us(s,c,c-h-e,g)){let e=ls(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*ds){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&fs(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},ms=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,hs=(e,t)=>{let n=t/8,r=ca(e,V(t))*2;return n/Math.max(r,Number.MIN_VALUE)},gs=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,_s=(e,t)=>ms(e,t)?Ss(e,t):!1,vs=e=>js(e)===Me[0],ys=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=ra(t),d=e=>{if(!vs(e))return!1;let t=V(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=V(n);r&&(i[r]=Math.min(a(r)+s[n],pa(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(Lc(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=V(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*ca(t,r)*5*ya(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*gt?n:e,l=!0}}}for(let e of p){if(c[e]||Yo(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||Ss(t,e))continue;let a=hs(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||Ss(h,r))continue;let a=i.remainingSeconds-e*ya(t,V(r));if(a>gt){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},bs=e=>{let t=js(e);return t?Me.indexOf(t)+1:null},xs=(e,t)=>{let n=As(t),r=bs(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},Ss=(e,t)=>xs(e,t)!==void 0,Cs=(e,t)=>{let n=As(t),r=bs(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},ws=(e,t)=>xs(e,t)?.name??null,Ts=e=>t=>{if(!Ta(t,e))return t;let n=xs(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return ki(n.id,Ft(t))({...t,intro:{...t.intro,disks:o}})},Es=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>Ta(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:Ts(t)(e)},Ds=(e,t)=>{if(e<1||e>10)return null;let n=Me[t-1];return n===void 0?null:yo(Ic(e,n))},Os=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=wr(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=Ds(S[e.id]+1,1);if(i===null||Ta(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=Lt(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=Ft(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=ki(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},ks=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/Ee;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||yo(n)!==e?null:n},As=e=>{let t=ks(e);return!t||t>Le?null:Math.floor((t-1)/Me.length)+1},js=e=>{let t=ks(e);return!t||t>Le?null:Me[(t-1)%Me.length]},Ms=e=>Ie[e-1]??null,G=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??yt(),Ns=(e,t)=>G(e,t)?.capacityLevel??0,Ps=(e,t)=>Ns(e,t)>=3,Fs=(e,t)=>Re[Math.min(Ns(e,t),3)]+Math.max(0,G(e,t)?.resetCount??0)*1e3,Is=(e,t)=>{let n={};return Me.forEach((t,r)=>{n[t]=r<e?Ne[r]:0}),n[Pe]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},Ls=e=>Fe.reduce((t,n)=>t+n*(e[n]??0),0),Rs=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},zs=(e,t)=>Is(Ns(e,t),G(e,t)?.resetCount??0),Bs=(e,t)=>Ls(zs(e,t)),Vs=(e,t)=>Math.min(Fs(e,t),Bs(e,t)+1),Hs=(e,t)=>Rs(G(e,t)?.depositedUnits??0).disks,Us=(e,t)=>G(e,t)?.fillBits??0,Ws=(e,t)=>{let n=Lc(t);return n>0&&Us(e,t)>=n},Gs=(e,t)=>{let n=Lc(t);return n>0?Math.min(1,Math.max(0,Us(e,t)/n)):0},Ks=(e,t)=>G(e,t)?.lakeTransfer??null,qs=(e,t)=>{let n=Ks(e,t);if(!n)return 0;let r=n.target*Lc(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},Js=(e,t)=>(G(e,t)?.depositedUnits??0)+ +!!Ws(e,t),Ys=(e,t)=>{let n=G(e,t),r=Lc(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},Xs=(e,t)=>{let n=cc(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=Ys(e,t);return r>=n*(1-1e-9)&&bc(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},Zs=(e,t)=>cc(t)(e)<=Vs(e,t),Qs=(e,t)=>!Ws(e,t),$s=(e,t)=>{let n=G(e,t);if(!n||n.lakeTransfer||!Ws(e,t))return null;let r=zs(e,t),i=n.depositedUnits??0,a=Rs(i).disks;for(let e=Fe.length-1;e>=0;--e){let t=Fe[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},ec=(e,t,n)=>ca(e,t)*ya(e,t)*(n===1?2:5),tc=(e,t)=>{let n=Us(e,t);return n>0&&n<Lc(t)},nc=(e,t)=>{let n=fa(e,t);return n>0&&ma(e,t)>=n},rc=(e,t)=>!!G(e,t)?.acquiring,ic=(e,t)=>tc(e,t)?!0:rc(e,t)?Hc(e,t)&&!Uc(e,t,!0)&&ma(e,t)>Da(e,t):nc(e,t),ac=(e,t)=>.1+.1*Math.max(0,G(e,t)?.resetCount??0),oc=(e,t)=>(e.intro?.disksBuiltTotal?.[Lc(t)]??0)>0,sc=(e,t)=>(G(e,t)?.boostersUnlocked??!1)||oc(e,t),cc=e=>t=>{let n=G(t,e);return n?(n.purchased??0)+1:0},lc=(e,t)=>{let n=Oe[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},uc=(e,t)=>lc(e,t)?18:10,dc=(e,t)=>uc(e,je.indexOf(t)+1),fc=(e,t)=>{let n=je[t-1];return n?Math.max(0,uc(e,t)-(e.intro?.[n]??0)):0},pc=(e,t)=>{if(!lc(e,t))return 0;let n=Oe[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=je[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+gc(e,t-1))},mc=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},hc=(e,t)=>mc(e,t)!==null,gc=(e,t)=>{let n=mc(e,t);return n===null?0:Math.floor(n/1+gt)},_c=(e,t)=>{let n=Oe[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!hc(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<dc(e,n.outputField)},vc=e=>t=>_c(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,yc=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=Oe[r],s=mc(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=dc({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+gt)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=dc({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},bc=(e,t,n)=>{if(!G(e,t)||!(n>0))return null;let r=Hs(e,t),i=[(r[1]??0)+ +!!Ws(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},xc=(e,t)=>sc(e,t)&&fc(e,t)>0&&bc(e,t,cc(t)(e))!==null,Sc=(e,t)=>fc(e,t)<=0,Cc=(e,t=1)=>n=>{let r=G(n,e);if(!r||!sc(n,e))return n;let i=je[e-1];if(!i)return n;let a=fc(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=bc(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=Hs(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=Fc(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},wc=(e,t)=>{let n=cc(t)(e);if(bc(e,t,n)!==null)return 0;let r=Lc(t);return Math.max(r,(n-Ys(e,t))*r)},Tc=(e,t)=>{if(Zi(e,t)||!oc(e,t))return!1;let n=Lc(t);return wc(e,t)<=n*1e-9||cc(t)(e)>Vs(e,t)||!Qs(e,t)?!1:ma(e,t)>0&&ic(e,t)},Ec=e=>t=>{if(!Tc(t,e))return t;let n=wc(t,e),r=ma(t,e),i=Lc(e)-Us(t,e),a=rc(t,e)&&!tc(t,e)?Math.max(0,r-Da(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=Rc(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},Dc=(e,t)=>n=>{let r=G(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},Oc=(e,t)=>G(e,t)?.autoConvertActive??!1,kc=(e,t)=>!!G(e,t)?.boosterAuto||Zi(e,t),Ac=(e,t)=>{let n=G(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!sc(e,t)||!oc(e,t)?!1:fc(e,t)>0},jc=(e,t)=>{let n=G(e,t);return!n||n.rebuilding||!Zi(e,t)?!1:!n.lakeTransfer&&Js(e,t)>=Fs(e,t)&&cc(t)(e)>Fs(e,t)},Mc=e=>t=>{if(!jc(t,e))return t;let n=G(t,e),r=Qi(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=V(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return Jn({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},Nc=e=>t=>{let n=G(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&xc(t,e)?Cc(e,1)(t):Ac(t,e)?Dc(e,!0)(t):t},Pc=e=>{let t=e;for(let e=1;e<=10;e+=1){if(Zi(t,e)&&!G(t,e)?.boosterAuto){let n=G(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}G(t,e)?.boosterAuto&&cc(e)(t)<=Fs(t,e)&&xc(t,e)&&(t=Cc(e,1)(t)),Oc(t,e)&&(fc(t,e)<=0?t=Dc(e,!1)(t):oc(t,e)?xc(t,e)?(t=Cc(e,1)(t),t=Dc(e,!1)(t)):t=Ec(e)(t):t=Dc(e,!1)(t))}return t},Fc=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},Ic=(e,t)=>(e-1)*Me.length+Me.indexOf(t)+1,Lc=e=>yo(Ic(e,Me[0])),Rc=(e,t,n,r)=>{let i=t[n]??G(e,n),a=Lc(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},zc=(e,t,n,r,i)=>{let a=G(e,t),o=Math.max(0,Lc(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=Rc(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},Bc=(e,t,n)=>{let r=G(e,t);if(!r||!oc(e,t))return r;let i=Lc(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=$s(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=ec(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},Vc=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=G(t,r),a=Bc(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},Hc=(e,t)=>Qi(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),Uc=(e,t,n=!1)=>{let r=e.intro??{};if(ea(e,t))return!0;if(Co(e)){let n=Do(e);if(V(n)===t&&fa(e,t)>=n)return!0}if(r.diskBuild&&V(r.diskBuild.size)===t)return!0;let i=Qi(t);return!n&&i.some(t=>Ao(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(Do(e))},Wc=(e,t)=>!oc(e,t)||!Qs(e,t)?!1:tc(e,t)?ma(e,t)>0:(rc(e,t)||nc(e,t))&&Hc(e,t)&&!Uc(e,t,rc(e,t))&&ma(e,t)>Da(e,t),Gc=(e,t=null)=>n=>{if(!(e>0))return n;let r=ra(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!Wc(n,o))continue;let r=ma(n,o),s=tc(n,o)?r:Math.max(0,r-Da(n,o));if(s<=0)continue;let c=ca(n,o)*ya(n,o)*ac(n,o),{lake:l,remainingBits:u,changed:d}=zc(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},Kc=(e,t)=>Ys(e,t)*Lc(t),qc=(e,t)=>yo(Ic(e,Me[t])),Jc=(e,t)=>{if(t<1||t>10||Ps(e,t))return!1;let n=qc(t,Ns(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},Yc=(e,t)=>Jc(e,t),Xc=e=>t=>{if(!Yc(t,e))return t;let n=G(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:Ns(t,e)+1}}}}},Zc=e=>(e.intro?.capacity??0)>=De,Qc=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},$c=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=Qc(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,dc(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},el=$c(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),tl=$c(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),nl=$c(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),rl=$c(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),il=$c(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),al=$c(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),ol=$c(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),sl=$c(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),cl=$c(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),ll=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=dc(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},ul=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(dc(r,n),(r.intro?.[n]??0)+1))}}},dl=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!hc(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=fl(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?ll(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?Du(d,a+1):d;return ul(e,i,n)(f)},fl=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=Oe.length)return 0;let n=t+1,r=ca(e,n);return!(r>0)||!Number.isFinite(r)?0:8*hs(e,yo((n-1)*Me.length+1))},pl=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,ml=(e,t)=>n=>pl(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,hl=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<dc(e,n),gl=(e,t)=>{let n=Oe[t];return n?hl(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},_l=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=Oe[e];return hl(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},vl=e=>dl(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),yl=ml(`computeNodes`,`autoMergeCoresIntoNode`),bl=e=>pl(e,`computeNodes`,`autoMergeCoresIntoNode`),xl=_l(0),Sl=e=>dl(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),Cl=ml(`computeClusters`,`autoMergeNodesIntoCluster`),wl=e=>pl(e,`computeClusters`,`autoMergeNodesIntoCluster`),Tl=_l(1),El=e=>dl(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),Dl=ml(`computeNetworks`,`autoMergeClustersIntoNetwork`),Ol=e=>pl(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),kl=_l(2),Al=e=>dl(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),jl=ml(`computeGrids`,`autoMergeNetworksIntoGrid`),Ml=e=>pl(e,`computeGrids`,`autoMergeNetworksIntoGrid`),Nl=_l(3),Pl=e=>dl(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),Fl=ml(`computeFabrics`,`autoMergeGridsIntoFabric`),Il=e=>pl(e,`computeFabrics`,`autoMergeGridsIntoFabric`),Ll=_l(4),Rl=e=>dl(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),zl=ml(`computeClouds`,`autoMergeFabricsIntoCloud`),Bl=e=>pl(e,`computeClouds`,`autoMergeFabricsIntoCloud`),Vl=_l(5),Hl=e=>dl(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),Ul=ml(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Wl=e=>pl(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Gl=_l(6),Kl=e=>dl(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),ql=ml(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Jl=e=>pl(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Yl=_l(7),Xl=e=>dl(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),Zl=ml(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Ql=e=>pl(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),$l=_l(8),eu=[vl,Sl,El,Al,Pl,Rl,Hl,Kl,Xl],tu=e=>Number.isInteger(e)&&e>=1&&e<=je.length,nu=e=>tu(e)?je[e-1]:null,ru=(e,t)=>{let n=ke[e];return!n||!tu(t)?0:n.multiplier},iu=(e,t)=>{let n=ke[e];return!n||!tu(t)?0:n.durationSeconds},au=e=>{let t=e?.computeBoostType??null;if(!t||!ke[t])return null;let n=e.computeBoostTierIndex??1,r=tu(n)?n:1,i=ke[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},ou=e=>{let t=e?.computeBoosts??{},n=au(e),r=[];for(let e of Object.keys(ke)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},su=(e,t)=>ou(e).find(e=>e.type===t)??null,cu=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},lu=e=>ou(e).reduce((e,t)=>e+ke[t.type].multiplier,0)||1,uu=(e,t)=>ou(e).reduce((e,n)=>e+(n.queue[0]>=t?ke[n.type].multiplier:0),0)||1,du=e=>ou(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),fu=(e,t)=>1+ou(e).reduce((e,n)=>e+(n.queue[0]>=t?ke[n.type].poolBonusPercent??0:0),0)/100,pu=(e,t,n)=>{if(!ke[t])return!1;let r=nu(n);return!r||(su(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},mu=(e,t,n)=>pu(e,t,n),hu=(e,t)=>{let n=su(e.intro,t);return!!n&&pu(e,t,n.queue[0])},gu=(e,t)=>hu(e,t),_u=(e,t)=>Math.max(0,(su(e.intro,t)?.queue.length??0)-1),vu=(e,t)=>_u(e,t)>0,yu=e=>t=>{if(!vu(t,e))return t;let n=ou(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=nu(i),o=cu(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},bu=(e,t)=>{let n=su(e.intro,t);return!!n&&n.queue.length===1},xu=e=>t=>bu(t,e)?cu(t,ou(t.intro).filter(t=>t.type!==e)):t,Su=(e,t)=>n=>{if(!mu(n,e,t))return n;let r=nu(t),i=ou(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:iu(e,t)};let s=cu(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},Cu=e=>t=>gu(t,e)?Su(e,su(t.intro,e).queue[0])(t):t,wu=e=>t=>{let n=ou(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=iu(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return cu(t,r)},Tu=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},Eu=e=>t=>!ke[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},Du=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=ke[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return mu(e,n,t)?Su(n,t)(e):e},Ou=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},ku=(e,t,n)=>n+ +(yr(e,`egressFees`)===t),Au=(e,t,n)=>{let r=ku(e,t,n);return yr(e,`burnRate`)===t?Ht(t,r):Ut(t,r)},ju=(e,t,n)=>Math.max(Ht(t,ku(e,t,n)),Au(e,t,n)+(t===mt()?0:1)),Mu=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(yr(e,`clockGated`)===t||yr(e,`rateLimit`)===t&&n+1>4)return!0;if(yr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},Nu=e=>t=>{if(Hr(t))return t;let n=x[e];if(!n||!Ur(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(Mu(t,e))return t;let i=Au(t,e,r+1),a=t.resources[n.id]??0;return a<ju(t,e,r+1)?t:Jn({...t,resources:{...t.resources,[n.id]:R(a-i)},owned:{...t.owned,[n.id]:R(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},Pu=e=>1*((S[e]??0)+1),Fu=e=>Math.max(0,Math.ceil(Math.log(Ze/Pu(e))/Math.log(Xe))),Iu=(e,t)=>Math.max(Ze,Pu(e)*Xe**t),Lu=(e,t)=>Iu(t,e.autobuyerIntervalLevels?.[t]??0),Ru=(e,t)=>Math.min(Ye,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-Fu(t))),zu=(e,t)=>2**Ru(e,t),Bu=e=>Fu(e)+Ye,Vu=e=>ia[e%10]*1e3**Math.floor(e/10),Hu=(e,t)=>{let n=1,r=ia.indexOf(e);for(;r===-1&&n<e;)n*=10,r=ia.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*Vu(r+t)},Uu=(e,t=b[0].id)=>((S[t]??0)+1)*Hu(10,e),Wu=e=>t=>{if(Hr(t)||Pr(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=Bu(e))return t;let r=Uu(n,e);if(R(t.purge.points)<r)return t;let i=vn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},Gu=e=>Math.max(0,Math.ceil(Math.log(Ze/e)/Math.log(Xe))),Ku=e=>Gu($e[e].baseSeconds),qu=(e,t)=>Math.max(Ze,$e[t].baseSeconds*Xe**(e.automationIntervalLevels?.[t]??0)),Ju=(e,t)=>Hu($e[e].baseCost,t),Yu=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,Xu=Yu,Zu=e=>t=>{if(!$e[e]||Hr(t)||Pr(t,`global`,e)||!Yu(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=Ku(e))return t;let r=Ju(e,n);if(R(t.purge.points)<r)return t;let i=vn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},Qu=()=>Gu(et.baseSeconds),$u=(e,t)=>Math.max(Ze,et.baseSeconds*Xe**(e.tierTickspeedIntervalLevels?.[t]??0)),ed=(e,t=b[0].id)=>((S[t]??0)+1)*Hu(et.baseCost,e),td=e=>t=>{if(Hr(t)||Pr(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=Qu())return t;let r=ed(n,e);if(R(t.purge.points)<r)return t;let i=vn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},K=e=>t=>({...t,computeAutoChargeEnabled:!!e}),q=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,nd=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,rd=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},id=e=>{if(Hr(e)||vr(e,`clockSpeedDisabled`)||!Xt(e))return e;let t=e.globalTickspeedMultiplier??null,n=Jt(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},ad=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(R(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(R(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(R(n?.capacityLevel??0))),r=Math.max(0,Math.floor(R(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,R(e?.capacity??8)),speedCapacity:Math.max(8,R(e?.speedCapacity??e?.capacity??8))}},od=(e,t)=>{let n=e??ad(null),r=t??ad(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},sd=(e,t)=>{let n=Do(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:Ao(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},cd=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=Ao(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},ld=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=Yi(n);e!==n&&(n=e,r=!0)}if(!Co(n)&&sd(n,t)){let e=zo(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=La(n)),a===n&&i&&(a=Ba(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((G(n,t)?.purchased??0)<(i.purchased??0)&&xc(n,t)){let e=Cc(t,(i.purchased??0)-(G(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((G(n,t)?.purchased??0)>=(i.purchased??0)||Sc(n,t)||cc(t)(n)>Fs(n,t))&&Ns(n,t)<(i.capacityLevel??0)){let e=Xc(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},ud=e=>{let t=xt().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=od(n.foundryResetCaps,ad(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:Ai(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},dd=e=>{if(R(e.resources.base)<kr(e))return e;let t=gr(e);if(!t)return un(md(e,!0));let n=_r(e,t.id),r=R(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return un({...md(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:ht(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},fd=e=>t=>{if(!hr(e)||gr(t)||!Mr(t,e))return t;let n={...xt().challenges,...t.challenges};return{...md(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:ht()}}},pd=e=>gr(e)?un({...md(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:ht()}}):e,md=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=t?ni(e.resources[O],n):0,i=xt(),a=e.purge.count+ +!!t,o=mr(e),s={id:`p${a}-${Date.now()}`,at:Date.now(),purgeNumber:a,pointsAwarded:r,moneyBits:R(e.resources[O])},c=e.prestigeMuseum??i.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return Gt({...i,challenges:e.challenges??i.challenges,achievements:e.achievements??i.achievements,daily:e.daily??i.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...i.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??i.intro.mainGameUnlocked,capacity:e.intro?.capacity??i.intro.capacity,byteCreated:e.intro?.byteCreated??i.intro.byteCreated,bits:e.intro?.bits??i.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??i.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??i.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??i.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??i.intro.diskCache,diskBuild:e.intro?.diskBuild??i.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??i.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??i.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??i.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??i.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??i.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:Ai(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??i.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??i.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??i.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??i.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??i.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??i.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??i.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??i.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??i.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??i.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??i.intro.computeNodes,computeClusters:e.intro?.computeClusters??i.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??i.intro.computeNetworks,computeGrids:e.intro?.computeGrids??i.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??i.intro.computeFabrics,computeClouds:e.intro?.computeClouds??i.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??i.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??i.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??i.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??i.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??i.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??i.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??i.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??i.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??i.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??i.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??i.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??i.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??i.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??i.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??i.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??i.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??i.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??i.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??i.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??i.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??i.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??i.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??i.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??i.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??i.autobuyers,autobuyersEnabled:e.autobuyersEnabled??i.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??i.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??i.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??i.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??i.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??i.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??i.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??i.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??i.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??i.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??i.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??i.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??i.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??i.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??i.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??i.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??i.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??i.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??i.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??i.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??i.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??i.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??i.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??i.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??i.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??i.autoGlobalTickspeedEnabled,era:e.era??i.era,eons:e.eons??i.eons,hyperscalerCount:e.hyperscalerCount??i.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??i.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??i.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??i.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||R(e.purge.points)+r>=100,owned:e.computeFlops?.owned??i.computeFlops.owned,cumulativeBoost:i.computeFlops.cumulativeBoost},purge:{...i.purge,points:R(e.purge.points)+r,count:a,unboundedUnlocked:o}})},hd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},gd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},_d=(e,t)=>t!==e&&vr(t,`bitRot`)?Lr(t,{cycleSeconds:0}):t,vd=(e,t)=>t===e?t:un(t),yd=e=>_d(e,vd(e,xd(e))),bd=e=>{let t=Cd(e);return t===e?_d(e,vd(e,t)):Jn(Sd(e,_d(e,vd(e,t))))},xd=e=>{if(Hr(e))return e;let t=or(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<sr(e))return e;let n=xt(),r=ar(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<wr(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:R(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:ur(e)??n.overclockLastClaimCompletedLevels}},Sd=(e,t)=>{let n=Math.max(0,(e.purchaseLevels?.[Tr(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=ur(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&qn(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),mr(e)&&n>=12&&qn(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},Cd=e=>{if(Hr(e)||vr(e,`overclockDisabled`))return e;let t=Tr(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<cr(e))return e;let r=xt();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},wd=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,Td=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,Ed=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,Dd=e=>t=>kd(e,!1)(t),Od=e=>t=>{let n=R(t.owned?.[Tr(t).id])<=0,r=kd(e,!0)(t);if(!n||r===t||!ue.enabled)return r;let i=r.achievements??xt().achievements;return Jn({...r,achievements:{...i,counters:{...i.counters,emptyRestages:(i.counters?.emptyRestages??0)+1}}})},kd=(e,t)=>n=>{if(Hr(n)||vr(n,`restageDisabled`)||!Qt(n))return n;let r=Tr(n).id;if(!t&&R(n.owned?.[r])<=0)return n;let i=Math.floor(R(e));if(i<=0)return n;let a=n.lastTierXpConsumed??0;if(i<en(a))return n;let o=R(n.purge.xp);if(i>o)return n;let s=b.filter(e=>e.id!==r).map(e=>e.id);return{...n,purge:{...n.purge,xp:o-i},lastTierXpConsumed:a+i,owned:{...n.owned,...s.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...n.resources,[O]:0,...s.reduce((e,t)=>({...e,[t]:0}),{})}}},Ad=`-ms-`,jd=`-moz-`,Md=`-webkit-`,Nd=`comm`,Pd=`rule`,Fd=`decl`,Id=`@import`,Ld=`@namespace`,Rd=`@keyframes`,zd=`@layer`,Bd=Math.abs,Vd=String.fromCharCode,Hd=Object.assign;function Ud(e,t){return qd(e,0)^45?(((t<<2^qd(e,0))<<2^qd(e,1))<<2^qd(e,2))<<2^qd(e,3):0}function Wd(e){return e.trim()}function Gd(e,t){return(e=t.exec(e))?e[0]:e}function J(e,t,n){return e.replace(t,n)}function Kd(e,t,n){return e.indexOf(t,n)}function qd(e,t){return e.charCodeAt(t)|0}function Jd(e,t,n){return e.slice(t,n)}function Yd(e){return e.length}function Xd(e){return e.length}function Zd(e,t){return t.push(e),e}function Qd(e,t){return e.map(t).join(``)}function $d(e,t){return e.filter(function(e){return!Gd(e,t)})}var ef=1,tf=1,nf=0,rf=0,af=0,of=``;function sf(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:ef,column:tf,length:o,return:``,siblings:s}}function cf(e,t){return Hd(sf(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function lf(e){for(;e.root;)e=cf(e.root,{children:[e]});Zd(e,e.siblings)}function uf(){return af}function df(){return af=rf>0?qd(of,--rf):0,tf--,af===10&&(tf=1,ef--),af}function ff(){return af=rf<nf?qd(of,rf++):0,tf++,af===10&&(tf=1,ef++),af}function pf(){return qd(of,rf)}function mf(){return rf}function hf(e,t){return Jd(of,e,t)}function gf(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function _f(e){return ef=tf=1,nf=Yd(of=e),rf=0,[]}function vf(e){return of=``,e}function yf(e){return Wd(hf(rf-1,Sf(e===91?e+2:e===40?e+1:e)))}function bf(e){for(;(af=pf())&&af<33;)ff();return gf(e)>2||gf(af)>3?``:` `}function xf(e,t){for(;--t&&ff()&&!(af<48||af>102||af>57&&af<65||af>70&&af<97););return hf(e,mf()+(t<6&&pf()==32&&ff()==32))}function Sf(e){for(;ff();)switch(af){case e:return rf;case 34:case 39:e!==34&&e!==39&&Sf(af);break;case 40:e===41&&Sf(e);break;case 92:ff()}return rf}function Cf(e,t){for(;ff()&&e+af!==57&&(e+af!==84||pf()!==47););return`/*`+hf(t,rf-1)+`*`+Vd(e===47?e:ff())}function wf(e){for(;!gf(pf());)ff();return hf(e,rf)}function Tf(e){return vf(Ef(``,null,null,null,[``],e=_f(e),0,[0],e))}function Ef(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=ff()){case 40:if(m!=108&&qd(C,d-1)==58){Kd(C+=J(yf(v),`&`,`&\f`),`&\f`,Bd(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=yf(v);break;case 9:case 10:case 13:case 32:C+=bf(m);break;case 92:C+=xf(mf()-1,7);continue;case 47:switch(pf()){case 42:case 47:Zd(Of(Cf(ff(),mf()),t,n,c),c),(gf(m||1)==5||gf(pf()||1)==5)&&Yd(C)&&Jd(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=Yd(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=J(C,/\f/g,``)),p>0&&(Yd(C)-d||h===0&&m===47)&&Zd(p>32?kf(C+`;`,r,n,d-1,c):kf(J(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Zd(S=Df(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)Ef(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(qd(C,3)===110)break;case 108:if(qd(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Ef(e,S,S,r&&Zd(Df(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Ef(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+Yd(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&df()==125)continue}switch(C+=Vd(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(Yd(C)-1)*_,_=1;break;case 64:pf()===45&&(C+=yf(ff())),f=pf(),u=d=Yd(y=C+=wf(mf())),v++;break;case 45:m===45&&Yd(C)==2&&(h=0)}}return a}function Df(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=Xd(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=Jd(e,f+1,f=Bd(g=o[h])),b=e;v<m;++v)(b=Wd(g>0?p[v]+` `+y:J(y,/&\f/g,p[v])))&&(c[_++]=b);return sf(e,t,n,i===0?Pd:s,c,l,u,d)}function Of(e,t,n,r){return sf(e,t,n,Nd,Vd(uf()),Jd(e,2,-2),0,r)}function kf(e,t,n,r,i){return sf(e,t,n,Fd,Jd(e,0,r),Jd(e,r+1,-1),r,i)}function Af(e,t,n){switch(Ud(e,t)){case 5103:return Md+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Md+e+e;case 4855:return Md+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return jd+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Md+e+jd+e+Ad+e+e;case 5936:switch(qd(e,t+11)){case 114:return Md+e+Ad+J(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return Md+e+Ad+J(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return Md+e+Ad+J(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return Md+e+Ad+e+e;case 6165:return Md+e+Ad+`flex-`+e+e;case 5187:return Md+e+J(e,/(\w+).+(:[^]+)/,Md+`box-$1$2`+Ad+`flex-$1$2`)+e;case 5443:return Md+e+Ad+`flex-item-`+J(e,/flex-|-self/g,``)+(Gd(e,/flex-|baseline/)?``:Ad+`grid-row-`+J(e,/flex-|-self/g,``))+e;case 4675:return Md+e+Ad+`flex-line-pack`+J(e,/align-content|flex-|-self/g,``)+e;case 5548:return Md+e+Ad+J(e,`shrink`,`negative`)+e;case 5292:return Md+e+Ad+J(e,`basis`,`preferred-size`)+e;case 6060:return Md+`box-`+J(e,`-grow`,``)+Md+e+Ad+J(e,`grow`,`positive`)+e;case 4554:return Md+J(e,/([^-])(transform)/g,`$1`+Md+`$2`)+e;case 6187:return J(J(J(e,/(zoom-|grab)/,Md+`$1`),/(image-set)/,Md+`$1`),e,``)+e;case 5495:case 3959:return J(e,/(image-set\([^]*)/,Md+"$1$`$1");case 4968:return J(J(e,/(.+:)(flex-)?(.*)/,Md+`box-pack:$3`+Ad+`flex-pack:$3`),/space-between/,`justify`)+Md+e+e;case 4200:if(!Gd(e,/flex-|baseline/))return Ad+`grid-column-align`+Jd(e,t)+e;break;case 2592:case 3360:return Ad+J(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Gd(e.props,/grid-\w+-end/)})?~Kd(e+(n=n[t].value),`span`,0)?e:Ad+J(e,`-start`,``)+e+Ad+`grid-row-span:`+(~Kd(n,`span`,0)?Gd(n,/\d+/):+Gd(n,/\d+/)-Gd(e,/\d+/))+`;`:Ad+J(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Gd(e.props,/grid-\w+-start/)})?e:Ad+J(J(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return J(e,/(.+)-inline(.+)/,Md+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Yd(e)-1-t>6)switch(qd(e,t+1)){case 109:if(qd(e,t+4)!==45)break;case 102:return J(e,/(.+:)(.+)-([^]+)/,`$1`+Md+`$2-$3$1`+jd+(qd(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Kd(e,`stretch`,0)?Af(J(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return J(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return Ad+n+`:`+r+s+(i?Ad+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(qd(e,t+6)===121)return J(e,`:`,`:`+Md)+e;break;case 6444:switch(qd(e,qd(e,14)===45?18:11)){case 120:return J(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+Md+(qd(e,14)===45?`inline-`:``)+`box$3$1`+Md+`$2$3$1`+Ad+`$2box$3`)+e;case 100:return J(e,`:`,`:`+Ad)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return J(e,`scroll-`,`scroll-snap-`)+e}return e}function jf(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Mf(e,t,n,r){switch(e.type){case zd:if(e.children.length)break;case Id:case Ld:case Fd:return e.return=e.return||e.value;case Nd:return``;case Rd:return e.return=e.value+`{`+jf(e.children,r)+`}`;case Pd:if(!Yd(e.value=e.props.join(`,`)))return``}return Yd(n=jf(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Nf(e){var t=Xd(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Pf(e){return function(t){t.root||(t=t.return)&&e(t)}}function Ff(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Fd:e.return=Af(e.value,e.length,n);return;case Rd:return jf([cf(e,{value:J(e.value,`@`,`@`+Md)})],r);case Pd:if(e.length)return Qd(n=e.props,function(t){switch(Gd(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:lf(cf(e,{props:[J(t,/:(read-\w+)/,`:`+jd+`$1`)]})),lf(cf(e,{props:[t]})),Hd(e,{props:$d(n,r)});break;case`::placeholder`:lf(cf(e,{props:[J(t,/:(plac\w+)/,`:`+Md+`input-$1`)]})),lf(cf(e,{props:[J(t,/:(plac\w+)/,`:`+jd+`$1`)]})),lf(cf(e,{props:[J(t,/:(plac\w+)/,Ad+`input-$1`)]})),lf(cf(e,{props:[t]})),Hd(e,{props:$d(n,r)})}return``})}}function If(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Lf=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Rf=`active`,zf=`data-styled-version`,Bf=`6.6.0`,Vf=`/*!sc*/
`,Hf=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw If(19);function Uf(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var Wf=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Uf(`REACT_APP_SC_DISABLE_SPEEDY`)??Uf(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Y=`sc-keyframes-`,Gf={},Kf=new Map,qf=new Map,Jf=1,Yf=e=>{if(Kf.has(e))return Kf.get(e);for(;qf.has(Jf);)Jf++;let t=Jf++;return Kf.set(e,t),qf.set(t,e),t},Xf=e=>qf.get(e),Zf=(e,t)=>{Jf=t+1,Kf.set(e,t),qf.set(t,e)},Qf=Object.freeze([]),$f=Object.freeze({});function ep(e,t,n=$f){return e.theme!==n.theme&&e.theme||t||n.theme}var tp=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,np=/(^-|-$)/g;function rp(e){return e.replace(tp,`-`).replace(np,``)}var ip=/(a)(d)/gi,ap=e=>String.fromCharCode(e+(e>25?39:97));function op(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=ap(t%52)+n;return(ap(t%52)+n).replace(ip,`$1-$2`)}var sp=5381,cp=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},lp=e=>cp(sp,e);function up(e){return op(lp(e)>>>0)}function dp(e){return e.displayName||e.name||`Component`}function fp(e){return typeof e==`string`&&!0}function pp(e){return fp(e)?`styled.${e}`:`Styled(${dp(e)})`}var mp=Symbol.for(`react.memo`),hp=Symbol.for(`react.forward_ref`),gp={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},_p={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},vp={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},yp={[hp]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[mp]:vp};function bp(e){return(`type`in(t=e)&&t.type.$$typeof)===mp?vp:`$$typeof`in e?yp[e.$$typeof]:gp;var t}var xp=Object.defineProperty,Sp=Object.getOwnPropertyNames,Cp=Object.getOwnPropertySymbols,wp=Object.getOwnPropertyDescriptor,Tp=Object.getPrototypeOf,Ep=Object.prototype;function Dp(e,t,n){if(typeof t!=`string`){let r=Tp(t);r&&r!==Ep&&Dp(e,r,n);let i=Sp(t).concat(Cp(t)),a=bp(e),o=bp(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in _p||n&&n[s]||o&&s in o||a&&s in a)){let n=wp(t,s);try{xp(e,s,n)}catch{}}}}return e}function Op(e){return typeof e==`function`}var kp=Symbol.for(`react.forward_ref`);function Ap(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===kp&&`styledComponentId`in e}function jp(e,t){return e&&t?e+` `+t:e||t||``}function Mp(e,t){return e.join(t||``)}function Np(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Pp(e,t,n=!1){if(!n&&!Np(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=Pp(e[n],t[n]);else if(Np(t))for(let n in t)e[n]=Pp(e[n],t[n]);return e}function Fp(e,t){Object.defineProperty(e,"toString",{value:t})}var Ip=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw If(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Vf;return t}},Lp=`style[${Lf}][${zf}="${Bf}"]`,Rp=RegExp(`^${Lf}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),zp=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Bp=e=>{if(!e)return document;if(zp(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(zp(t))return t}return document},Vp=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},Hp=(e,t)=>{let n=(t.textContent??``).split(Vf),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Rp);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Zf(n,t),Vp(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Up=e=>{let t=Bp(e.options.target).querySelectorAll(Lp);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Lf)!==Rf&&(Hp(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Wp=!1;function Gp(){if(!1!==Wp)return Wp;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Wp=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Wp=t.getAttribute(`content`)||void 0}return Wp=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var Kp=(e,t)=>{if(typeof document>`u`)throw If(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Lf}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Lf,Rf),i.setAttribute(zf,Bf);let s=t||Gp();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},qp=class{constructor(e,t){this.element=Kp(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw If(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Jp=class{constructor(e,t){this.element=Kp(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Yp=Hf,Xp={isServer:!Hf,useCSSOMInjection:!Wf},Zp=class e{static registerId(e){return Yf(e)}constructor(e=$f,t={},n){this.options=Object.assign(Object.assign({},Xp),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Hf&&Yp&&(Yp=!1,Up(this)),Fp(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Xf(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Lf+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Hf&&Up(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Hf&&t.target!==this.options.target&&Bp(this.options.target)!==Bp(t.target)&&Up(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new qp(t,n):new Jp(t,n))(this.options),new Ip(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Yf(e),e.startsWith(Y)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Yf(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Yf(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},Qp=new WeakSet,$p={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function em(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in $p||e.startsWith(`--`)?String(t).trim():t+`px`}var tm=47;function nm(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var rm=Symbol.for(`sc-keyframes`);function im(e){return typeof e==`object`&&!!e&&rm in e}function am(e){return Op(e)&&!(e.prototype&&e.prototype.isReactComponent)}var om=e=>e==null||!1===e||e===``,sm=Symbol.for(`react.client.reference`);function cm(e){return e.$$typeof===sm}function lm(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!om(r)&&(Array.isArray(r)&&Qp.has(r)||Op(r)?t.push(nm(n)+`:`,r,`;`):Np(r)?(t.push(n+` {`),lm(r,t),t.push(`}`)):t.push(nm(n)+`: `+em(n,r)+`;`))}}function um(e,t,n,r,i=[]){if(om(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return cm(e)?i:am(e)&&t?um(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)um(e[a],t,n,r,i);return i}return Ap(e)?(i.push(`.${e.styledComponentId}`),i):im(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):cm(e)?i:Np(e)&&e.toString===Object.prototype.toString?(lm(e,i),i):(i.push(e.toString()),i)}var dm=lp(Bf),fm=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=cp(dm,t),this.baseStyle=n,Zp.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(am(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Mp(um(r,e,t,n)))}else i+=Mp(um(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=op(cp(cp(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=jp(r,a)}}return r}},pm=/&/g;function mm(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function hm(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==tm||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===tm&&(o=!1,c++);else if(l!==34&&l!==39||mm(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function gm(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&gm(a.children,t)}return e}function _m({options:e=$f,plugins:t=Qf}=$f){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(pm,r).replace(i,a))}),e.prefix&&o.push(Ff),o.push(Mf);let s=[],c=Nf(o.concat(Pf(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return hm(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||mm(e,o)){if(s===0){if(t===tm&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==tm);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===tm)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===tm&&o+1<r&&e.charCodeAt(o+1)===tm){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:hm(i)):l===0?e:hm(e)}(t),d=Tf(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=gm(d,e.namespace)),s=[],jf(d,c),s},u=e,d=sp;for(let e=0;e<t.length;e++)t[e].name||If(15),d=cp(d,t[e].name);return u!=null&&u.namespace&&(d=cp(d,u.namespace)),u!=null&&u.prefix&&(d=cp(d,`p`)),l.hash=d===sp?``:d.toString(),l}var vm=new Zp,ym=_m(),bm=v.createContext({shouldForwardProp:void 0,styleSheet:vm,stylis:ym,stylisPlugins:void 0});bm.Consumer;function xm(){return v.useContext(bm)}var Sm=v.createContext(void 0);Sm.Consumer;function Cm(){let e=v.useContext(Sm);if(!e)throw If(18);return e}function wm(e){let t=v.useContext(Sm),n=v.useMemo(()=>function(e,t){if(!e)throw If(14);if(Op(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw If(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(Sm.Provider,{value:n},e.children):null}var Tm={};function Em(e,t){let n=typeof e==`string`?rp(e):`sc`;Tm[n]=(Tm[n]||0)+1;let r=n+`-`+up(Bf+n+Tm[n]);return t?t+`-`+r:r}function Dm(e,t,n){let r=Ap(e),i=e,a=!fp(e),{attrs:o=Qf,componentId:s=Em(t.displayName,t.parentComponentId),displayName:c=pp(e)}=t,l=t.displayName&&t.componentId?rp(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new fm(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(Sm),u=xm(),d=e.shouldForwardProp||u.shouldForwardProp,f=ep(t,l,a)||$f,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=Op(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=jp(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=jp(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=fp(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=jp(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?jp(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)Pp(e,n,!0);return e}({},i.defaultProps,e):e}}),Fp(m,()=>`.${m.styledComponentId}`),a&&Dp(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Om=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function km(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Am=e=>(Qp.add(e),e);function jm(e,...t){if(Op(e)||Np(e))return Am(um(km(Qf,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?um(n):Am(um(km(n,t)))}function Mm(e,t,n=$f){if(!t)throw If(1,t);let r=(r,...i)=>e(t,n,jm(r,...i));return r.attrs=r=>Mm(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Mm(e,t,Object.assign(Object.assign({},n),r)),r}var Nm=e=>Mm(Dm,e),X=Nm;Om.forEach(e=>{X[e]=Nm(e)});var Pm=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(Op(n)&&!Ap(n))return!1}return!0}(e),Zp.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=Mp(um(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function Fm(e,...t){let n=jm(e,...t),r=`sc-global-${up(JSON.stringify(n))}`,i=new Pm(n,r),a=e=>{let t=xm(),n=v.useContext(Sm),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,Gf,n,o);else{let s=Object.assign(Object.assign({},t),{theme:ep(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var Im,Lm=class{constructor(e,t){this[Im]=!0,this.inject=(e,t=ym)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Y+e,this.rules=t,Yf(this.id),Fp(this,()=>{throw If(12,String(this.name))})}getName(e=ym){return e.hash?this.name+op(e.hash>>>0):this.name}};function Rm(e,...t){let n=Mp(jm(e,...t));return new Lm(up(n),n)}Im=rm,`${Lf}`,`${Lf}`,`${Lf}`;var zm=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Z=o(((e,t)=>{t.exports=zm()}))(),Bm=5e3,Vm=X.div`
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
`,Hm=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,Um=X.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,Wm=X.div`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  margin-top: ${e=>e.theme.space.xs};
`,Gm=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),Km=()=>typeof document<`u`&&document.visibilityState===`hidden`,qm=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||Km()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+Bm};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{Km()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function Jm({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=qm(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=ue.enabled?Gm(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&_e[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,Z.jsx)(Vm,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,Z.jsxs)(Hm,{children:[(0,Z.jsx)(Um,{children:`Achievement unlocked`}),_e[t].name,Gn(_e[t])&&(0,Z.jsx)(Wm,{children:Gn(_e[t])})]},e))})}var Ym=X.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,Xm=X.div`
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
`,Zm=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,Qm=X.button`
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
`,$m=X.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,eh=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,Z.jsx)(Ym,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,Z.jsxs)(Xm,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,Z.jsx)(Zm,{children:`More`}),(0,Z.jsxs)(Qm,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,Z.jsx)($m,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,Z.jsxs)(Qm,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,Z.jsx)($m,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),ue.enabled&&(0,Z.jsxs)(Qm,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,Z.jsx)($m,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,Z.jsxs)(Qm,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,Z.jsx)($m,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),(0,Z.jsxs)(Qm,{"aria-label":`open dev mode`,onClick:()=>r(`dev`),type:`button`,children:[(0,Z.jsx)($m,{"aria-hidden":`true`,children:`🛠️`}),`Dev Mode`]})]})})},th=X.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,nh=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,rh=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,ih=X.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,ah=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,oh=X(th)`
  gap: 0.4rem;
`,sh=X.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,ch=X.button`
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
`,lh=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,uh=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,dh=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,fh=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,ph=X.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,mh=(e,t,n)=>{let r=Hn(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},hh=e=>{let t=[],n={};return e.forEach(e=>{let r=ge[e.id];r?(n[r.id]||(n[r.id]={key:r.id,name:r.name,levels:[]},t.push(n[r.id])),n[r.id].levels.push(e)):t.push({key:e.id,def:e})}),t},gh=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=Cm(),c=new Set(Yn(t)),l=me.map(e=>({...e,members:F.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0),u=Qn(t),d=l.reduce((e,n)=>e+Zn(t,n.id).bonus,0),f=l.reduce((e,n)=>e+Zn(t,n.id).total,0);return(0,Z.jsxs)(nh,{children:[(0,Z.jsxs)(rh,{children:[(0,Z.jsx)(`h1`,{children:`Achievements`}),(0,Z.jsxs)(ih,{"aria-label":`total stars ${u} of ${f}`,children:[`⭐ `,u,`/`,f,d>0?` (incl. ${d} bonus)`:``]})]}),(0,Z.jsx)(ah,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>qn(t,e.id)).length,u=c.has(e.id),d=Zn(t,e.id);return(0,Z.jsxs)(oh,{"aria-label":`${e.name} achievement group`,children:[(0,Z.jsxs)(sh,{children:[(0,Z.jsxs)(ch,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,Z.jsxs)(ph,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length,u&&d.bonus>0?` · ⭐ +${d.bonus}`:``]})]}),n[e.id]&&hh(e.members).map(e=>{if(e.levels){let n=e.levels.filter(e=>qn(t,e.id)).length,r=e.levels.length,c=n===r,l=e.levels.find(e=>!qn(t,e.id)),u=e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,d=e.levels.length>4,f=[...new Map(e.levels.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,Z.jsxs)(lh,{"aria-label":`${e.name} achievement level ${n} of ${r}`,style:{alignItems:`flex-start`},children:[(0,Z.jsxs)(uh,{$earned:n>0,children:[(0,Z.jsx)(ch,{"aria-expanded":!!i[e.key],"aria-label":`${e.name} details`,onClick:()=>o(a,e.key),type:`button`,children:(0,Z.jsx)(`strong`,{children:e.name})}),!i[e.key]&&l&&(0,Z.jsxs)(dh,{children:[`Next: `,Wn(l),mh(t,l,!1)?` (${mh(t,l,!1)})`:``]}),!i[e.key]&&l&&Gn(l)&&(0,Z.jsxs)(dh,{"aria-label":`${e.name} next reward`,children:[`Reward: `,Gn(l)]}),i[e.key]&&u&&(0,Z.jsxs)(dh,{children:[`Reward each level: `,u]}),i[e.key]&&d&&!u&&f.map(([e,t])=>(0,Z.jsxs)(dh,{children:[e,`: `,t]},e)),i[e.key]&&e.levels.map((n,r)=>{let i=qn(t,n.id),a=mh(t,n,i);if(d){let t=u?null:Gn(n);return(0,Z.jsxs)(dh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,Wn(n),a&&!i?` (${a})`:``,t?` · ${t}`:``]},n.id)}return(0,Z.jsxs)(fh,{children:[(0,Z.jsxs)(dh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,n.trigger,a&&!i?` (${a})`:``]}),!u&&Un(n)&&(0,Z.jsxs)(dh,{"aria-label":`${e.name} level ${r+1} reward ${i?`earned`:`pending`}`,children:[i?`Reward earned`:`Reward`,`: `,Un(n)]})]},n.id)})]}),(0,Z.jsxs)(ph,{$color:c?s.color.good:s.color.textMuted,children:[c?`✅ `:n===0?`🔒 `:``,`Lv `,n,`/`,r]})]},e.key)}let{def:n}=e,r=qn(t,n.id),c=n.secret&&!r,l=c?null:mh(t,n,r),u=c?`???`:n.name;return(0,Z.jsxs)(lh,{"aria-label":`${u} achievement ${r?`earned`:`not yet earned`}`,children:[(0,Z.jsxs)(uh,{$earned:r,children:[c?(0,Z.jsx)(`strong`,{children:u}):(0,Z.jsx)(ch,{"aria-expanded":!!i[n.id],"aria-label":`${n.name} details`,onClick:()=>o(a,n.id),type:`button`,children:(0,Z.jsx)(`strong`,{children:u})}),!c&&i[n.id]&&(0,Z.jsx)(dh,{children:n.trigger}),!c&&i[n.id]&&Un(n)&&(0,Z.jsxs)(dh,{"aria-label":`${n.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,Un(n)]})]}),(0,Z.jsxs)(ph,{$color:r?s.color.good:s.color.textMuted,children:[l&&!r?`${l} `:``,r?`✅`:`🔒`]})]},n.id)})]},e.id)})})]})},_h=`high`,vh=`normal`,yh=()=>b[b.length-1],bh=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],xh=[bl,wl,Ol,Ml,Il,Bl,Wl,Jl,Ql],Sh=e=>bh.some((t,n)=>_c(e,n)),Ch=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,wh=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,Th=e=>Ga(e)&&(e.intro?.bits??0)>=mo(e),Eh=1,Dh={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},Oh=(e,t)=>{let[n,r]=Dh[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&qu(e,t)<Eh},kh=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&Lu(e,t)<Eh,Ah=(e,t)=>e?_h:t?vh:!1,jh=e=>{if(Hr(e))return!1;let t=Ft(e);return b.some(n=>{if(!Ur(e)(n)||kh(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:Bt(n,r,t,i,hi(e,n),2**53-1)>=a})},Mh=e=>Hr(e)||!Xt(e)||Oh(e,`speedUp`)?!1:Yt(e),Nh=e=>{if(Hr(e)||Oh(e,`scaleUp`))return!1;let t=or(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=sr(e)},Ph=e=>{if(Hr(e)||Oh(e,`overclock`))return!1;let t=yh();return Ur(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=cr(e):!1},Fh=e=>Hr(e)&&!Oh(e,`purge`),Ih=e=>Fh(e)||jh(e)||Mh(e)||Nh(e)||Ph(e),Lh=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],Rh=e=>{if((e.purge?.count??0)<1||Hr(e))return!1;let t=e.purge?.points??0;return Lh.some(n=>{if(!Xu(e,n))return!1;let r=Nr(`global`,n);if(r&&!_r(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<Ku(n)&&t>=Ju(n,i)})},zh=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=ti(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.buyMaxUnlocked&&t>=2||!e.cacheWarmUnlocked&&t>=20)return!0;let n=mn(fn(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},Bh=e=>Rh(e)||zh(e),Vh=e=>Ih(e),Hh=e=>Ah(Fh(e)||jh(e),Vh(e)),Uh=e=>Ch(e)||wh(e)||Ma(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||Ia(e)&&(e.intro?.bits??0)>=Fa(e.intro)||Ro(e)&&!e.intro?.diskBuildQueued||wo(e)||Th(e),Wh=e=>Ah(Ch(e)||wh(e),Uh(e)),Gh=e=>bh.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(Qc(e,r)<10||a<dc(e,n))}),Kh=e=>Zc(e)?Gh(e)||xh.some(t=>t(e))||Sh(e):!1,qh=e=>Zc(e)?Ah(Gh(e),Kh(e)):!1,Jh=e=>_n(e)?lt.some(t=>Sn(e,t.id)):!1,Yh=e=>Jh(e)?vh:!1,Xh=e=>({game:Hh(e),foundry:Wh(e),boosters:qh(e),compute:Yh(e),perks:Bh(e)?vh:!1}),Zh=`3.25rem`,Qh=Rm`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,$h=X.nav`
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
`,eg=X.button`
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
`,tg=X.span`
  font-size: 1.05rem;
  line-height: 1;
`,ng=X.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,rg=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?jm`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${Qh} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:jm`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,ig=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,Z.jsxs)($h,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,Z.jsxs)(eg,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,Z.jsx)(rg,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,Z.jsx)(tg,{"aria-hidden":`true`,children:n.icon}),(0,Z.jsx)(ng,{children:n.label})]},n.id)}),(0,Z.jsxs)(eg,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,Z.jsx)(tg,{"aria-hidden":`true`,children:`⋯`}),(0,Z.jsx)(ng,{children:`More`})]})]})},ag=`calc(${Zh} + env(safe-area-inset-bottom))`,og={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},sg=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&og[e];return i?r?n.color.disabled:n.color[i]:t},cg={white:`255, 255, 255`,darkgrey:`169, 169, 169`},lg=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},ug=e=>e?e.startsWith(`#`)?lg(e):cg[e]??`255, 255, 255`:`255, 255, 255`,dg=Rm`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,fg=e=>Math.min(100,Math.max(0,e??0)),pg=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=fg(t),l=fg(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return jm`
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
  color: ${sg};
  border: 1.5px solid ${sg};
  background: ${e=>e.theme.color.surfaceSunken};
  ${pg}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>ug(sg(e))};
  animation: ${e=>e.$pulse&&!e.disabled?jm`${dg} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${sg};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,mg=X.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,hg=X.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,gg=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,$=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,Z.jsx)(hg,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!gg.test(n)?(0,Z.jsx)(hg,{children:n}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(mg,{children:n.slice(0,r+1)}),(0,Z.jsx)(hg,{children:n.slice(r+1)})]})},_g=X.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,vg=X.div`
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
`,yg=X(th)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,bg=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,xg=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,Sg=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,Z.jsx)(vg,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,Z.jsxs)(yg,{$raised:!0,children:[(0,Z.jsx)(bg,{id:n,children:`Save not compatible`}),(0,Z.jsx)(xg,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,Z.jsx)(Q,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},Cg=1e80,wg=30,Tg=20,Eg=2**53-1,Dg=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],Og=[1,2,5],kg=Object.fromEntries(Dg.map(e=>[e.id,e])),Ag=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],jg=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>Ou(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>nd(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:Ed,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:Td,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:wd,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:q,isOn:e=>e.autoOverclockEnabled??!0}],Mg=Object.fromEntries(jg.map(e=>[e.key,e])),Ng=(e,t)=>!!Mg[t]?.isOn(e),Pg=e=>new Date(e).toISOString().slice(0,10),Fg=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},Ig=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},Lg=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},Rg=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),zg=(e,t)=>{let n=jg.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},Bg=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},Vg=e=>e.startBytes*8,Hg=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,Ug=(e,t,n)=>{let r=Bg(t,n.levers);return Hg(e)===Hg(r)?r:{...r,resources:{...r.resources,[O]:Vg(n)}}},Wg={buyTier:{make:e=>vi(e,Eg)},tierTickspeed:{make:e=>Nu(e)},clockSpeed:{make:()=>id},scaleUp:{make:()=>yd},overclock:{make:()=>bd},restage:{make:e=>Od(e)},automation:{make:e=>Object.hasOwn(Mg,e?.key??``)?Mg[e.key].set(!!e.enabled):e=>e}},Gg=b[b.length-1],Kg=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${z(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${z(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${Gg.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),qg=Object.fromEntries(Kg.map(e=>[e.key,e])),Jg=Object.fromEntries(Kg.map(e=>[e.key,0])),Yg={balance:0,clock:0,owned:{},purchaseLevels:{}},Xg=(e,t=e)=>({...e,runPeaks:br(e.runPeaks??Yg,t)}),Zg=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=ur(t)??0;return a!==(ur(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},Qg=(e,t,n,r)=>{let i=e.game,a=Ug(i,Xg(li(n,Eg)(i)),t);return r&&Hg(i)!==Hg(a)&&r(a),{game:a,metrics:Zg(i,a,e.metrics)}},$g=(e,t,n,r,i)=>{let a=e.game,o=Wg[n].make(r)(a);if(o===a)return e;let s=Ug(a,Xg({...o,runPeaks:a.runPeaks},o),t);return i&&Hg(a)!==Hg(s)&&i(s),{game:s,metrics:Zg(a,s,e.metrics)}},e_=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],t_=(e,t,n)=>{let r=e;for(let e=0;e<Tg;e++){let e=r;for(let[r,i]of e_)e=$g(e,t,r,i,n);if(e===r)break;r=e}return r},n_=e=>({...e,runPeaks:br(Yg,e)}),r_=e=>({game:e,metrics:Zg(e,e,Jg)}),i_=(e,t,n,r,i)=>{let a=t_(r_(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=t_(Qg(a,t,n,i),t,i),o.push(a.metrics);return o},a_=(e,t=0)=>e.map(e=>[t,e,!0]),o_=[a_([`scaleUp`,`restage`,`overclock`]),a_([`scaleUp`,`restage`]),[...a_([`scaleUp`,`restage`]),...a_([`overclock`],1)],[...a_([`scaleUp`,`restage`]),...a_([`overclock`],2)],[...a_([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...a_([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],a_([`overclock`,`restage`])],s_=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},c_=(e,t,n,r,i)=>{let a=r_(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=Qg(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=$g(a,t,e,n);o.push(a.metrics)}return o},l_=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},u_=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:ur(e)??0}),d_=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=l_(n,e);if(t>i)return t}return null},f_=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(l_(t/e,1));if(i>n&&i<t)return i}let i=r(l_(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},p_=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},m_=(e,t,n)=>{let r=kg[t],i=n===`fallback`,a=Ig(`${e}|${t}|v7|${n}`),o=Lg(a),s=i?1e6:Og[Math.floor(o()*Og.length)]*10**Rg(o,r.startExponent),c=[];if(!i){let e=[...Ag],t=Rg(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:zg(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:Rg(o,r.warmupSeconds.map(e=>e/wg))*wg,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:7,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>Ag.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=xt();v.resources={...v.resources,[O]:Vg(_)};for(let e of u)v=Mg[e].unlock(v);v=n_(Bg(v,l));let y=v;i_(v,_,wg,f/wg,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=Ug(y,Mg[e].set(!1)(y),_);y=n_(y);let b=[r_(y).metrics];for(let e=r_(y),t=0;t<p;t++)e=Qg(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?Kg:p_(o,Kg),C=(e,t)=>{let n=d_(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=f_(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=o_.map(e=>s_(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:c_(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=Cg);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=i_(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:u_(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},h_=new Map,g_=(e,t)=>{let n=`${e}|${t}`,r=h_.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=m_(e,t,n);r??=m_(e,t,`fallback`),h_.size>64&&h_.clear(),h_.set(n,r)}return r},__=(e,t)=>g_(e,t).def,v_=e=>de.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),y_=e=>e.metrics?.[e.def.objective?.key]??0,b_=e=>y_(e)>=e.def.objective?.target,x_=e=>{let t=e.def.objective;if(!t)return 0;let n=y_(e);if(n>=t.target)return 1;if(!qg[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},S_=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),C_=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=b_(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||y_(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=S_(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},w_=(e,t)=>n=>{if(!v_(n)||!kg[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=g_(Pg(t),e);return S_(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:r_(i).metrics})},T_=e=>t=>t.daily.runs[e]?S_(t,e,null):t,E_=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===Pg(n)},D_=(e,t)=>n=>E_(n,e,t)?w_(e,t)(T_(e)(n)):n,O_=e=>t=>{let n=t;for(let t of Dg){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==7){n=S_(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=Qg(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=C_(S_(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},k_=(e,t,n,r)=>i=>{if(!Object.hasOwn(Wg,t))return i;let a=O_(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=$g(s,o.def,t,n);return c===s?a:C_(S_(a,e,{...o,...c}),e,r)},A_=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},j_=X.div`
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
`,M_=X(th)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,N_=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,P_=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,F_=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,I_=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,Z.jsx)(j_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,Z.jsxs)(M_,{$raised:!0,children:[(0,Z.jsx)(N_,{id:d,children:t}),(0,Z.jsx)(P_,{children:n}),(0,Z.jsxs)(F_,{children:[(0,Z.jsx)(Q,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,Z.jsx)(Q,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},L_={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},R_=e=>du(e)>0,z_=e=>R_(e),B_=(e,t)=>t<du(e),V_=(e,t)=>t<=du(e),H_=(e,t=0)=>{let n=ou(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*ke[e.type].durationSeconds;return`${L_[e.type]??e.type} ×${ke[e.type].multiplier} (${mi(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${uu(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},U_=jm`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${Rm`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,W_={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},G_=e=>mi(e).replace(/ 0[ms]$/,``),K_=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,q_=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,J_=X.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Y_=`2.8em`,X_=X(q_)`
  flex: 0 0 ${Y_};
  width: ${Y_};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,Z_=X.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${Y_};
  width: ${Y_};
`,Q_=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,$_=X.div`
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
`,ev=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,tv=X.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,nv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,rv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,iv=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},av=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=W_[r]??{icon:`⚡`,label:r},s=iu(r,i[0]),c=ru(r,i[0]),l=iv(i),u=l.length-1;return(0,Z.jsx)(Q_,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=K_(e.tierIndex);return(0,Z.jsxs)(J_,{children:[i===u?vu(t,r)?(0,Z.jsx)(X_,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↩`})}):(0,Z.jsx)(X_,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!bu(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`✕`})}):(0,Z.jsx)(Z_,{"aria-hidden":`true`}),(0,Z.jsxs)($_,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${K_(e.tierIndex,`name`)}, ${mi(f)}${l?` once it starts`:` left`}`,children:[(0,Z.jsx)(ev,{children:`${e.count}x`}),(0,Z.jsx)(tv,{children:`${m} ${o.icon} ×${c}`}),(0,Z.jsx)(nv,{children:mi(f)})]}),i===0?(0,Z.jsx)(X_,{"aria-label":`stack the ${o.label} compute boost`,disabled:!gu(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${G_(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`+`})}):(0,Z.jsx)(Z_,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},ov=({state:e,actions:t})=>{let n=ou(e.intro??{});return n.length===0?null:(0,Z.jsx)(rv,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,Z.jsx)(av,{lane:n,state:e,actions:t},n.type))})},sv=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,Z.jsx)(I_,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,Z.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},cv=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},lv=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,uv=e=>`Unlocks at Purge ${jr(e)}`,dv=e=>`${e.id} · ${e.target} · ${e.codename}`,fv=(e,t)=>t-e%t,pv=e=>{let t=gr(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${cv(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${cv(fv(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${cv(fv(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${cv(Math.ceil(fv(n,30)))}`];case`bitRot`:return[`Corruption ${At(Or(e))} vs ${At(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},mv=X.section`
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
`,hv=X.button`
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
`,gv=X.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,_v=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,vv=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=gr(e);if(!a)return null;let o=cv(e.challenges.activeSeconds);return(0,Z.jsxs)(mv,{"aria-label":`active challenge banner`,children:[(0,Z.jsxs)(gv,{children:[(0,Z.jsxs)(hv,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,Z.jsx)(_v,{children:a.rule}),(0,Z.jsxs)(_v,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,lv(a.goal)]}),pv(e).map(e=>(0,Z.jsx)(_v,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,Z.jsx)(sv,{challenge:a,onExit:t})]})},yv=X.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,bv=Object.freeze({removeAds:!1}),xv=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>bv}),Sv=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return xv();let n=null,r=null,i=null,a=bv,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},Cv=null,wv=()=>(Cv??=Sv({loadAds:null,loadIap:null}),Cv),Tv=1e4,Ev=400,Dv=100,Ov=X.div`
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
`,kv=X(th).attrs({role:`status`,"aria-live":`polite`})`
  align-items: center;
  max-width: 26rem;
  opacity: ${e=>+!e.$fading};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${Ev}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Av=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,jv=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,Mv=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=wv()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+Tv}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+Tv})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,Dv);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,Ev);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&fi(e.elapsedRealSeconds,e.capSeconds)>0;return(0,Z.jsx)(Ov,{children:(0,Z.jsxs)(kv,{"aria-label":`offline progress notice`,$fading:c,children:[(0,Z.jsxs)(Av,{children:[`Resumed from sleep! You were away for `,mi(e.elapsedRealSeconds),` — simulated `,mi(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,Z.jsxs)(jv,{children:[f&&(0,Z.jsx)(Q,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,Z.jsxs)(Q,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},Nv=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,Pv=jm`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Fv=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,Iv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Lv=Rm`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Rv=X(th)`
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
  animation: ${e=>e.$animateReveal?jm`${Lv} 0.4s ease-out`:`none`};
  ${e=>e.$boosted&&U_}

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
`,zv=e=>jm`
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
`,Bv=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,Vv=X.div`
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
`,Hv=X(th)`
  ${zv(`#0e7490`)}
`,Uv=X(th)`
  ${zv(`#1d4ed8`)}
`,Wv=X(th)`
  ${zv(`#8b5cf6`)}
`,Gv=X(th)`
  ${zv(`#c2410c`)}
`,Kv=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,qv=X(th)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&jm`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&jm`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,Jv=X.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Yv=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Xv=X.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,Zv=X(yv)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,Qv=X(Yv)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,$v=X.div`
  position: relative;
`,ey=X.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,ty=X.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,ny=X.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,ry=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${ag};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,iy=X.div`
  ${e=>pg({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,ay=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,oy=X(qv)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,sy=X.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,cy=X.div`
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

  ${e=>e.$compressed&&jm`
    box-shadow: ${e.theme.shadow.md};
    padding: 0.25rem 0;

    ${qv} {
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
    ${yv} {
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
`,ly=X.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,uy=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,dy=X.div`
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
`,fy=X.div`
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
`,py=X.div`
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
`,my=X.div`
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
`,hy=X.div`
  height: ${e=>e.$height}px;
`,gy=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,_y=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,vy=X.h3`
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
`,yy=X.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,by=X.details`
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
  summary:has(${Vv}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${Vv}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`,xy=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  margin: 0;
  ${Pv}

  @media (max-width: 24.5rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    line-height: 1.15;
  }
`,Sy=X(Q)`
  grid-area: buy;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  min-height: 2rem;
  padding: 0 0.6em;
  ${Pv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,Cy=X(mg)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,wy=X.span`
  font-weight: 800;
`,Ty=X(hg)`
  flex: 1 0 auto;
  text-align: right;
`,Ey=X(Q)`
  grid-area: upgrade;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  min-height: 2rem;
  padding: 0 0.5em;
  ${Pv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.4em;
  }
`,Dy=(e,t)=>t===`base`?At(e):t===`bytes`?jt(e):`${z(e)} ${E(t)}`,Oy=(e,t)=>Math.min(100,Math.round(e/t*100)),ky=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),Ay=e=>Math.round((e-1)*100),jy=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),My=(e,{precise:t=!1}={})=>e>=2?`${ky(e)}x`:`+${t?jy(e):Ay(e)}%`,Ny=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=Cm(),{purge:s}=a,c=a.resources[O]>=kr(a),l=mr(a),u=a.prestigeDoublePpLevel??0,d=nn(a),f=tn(s.count,d),p=ni(a.resources[O],u),m=Kr(a.resources[O],kr(a)),h=qr(a.resources[O]),g=Math.round(h*100),_=a.resources[O],y=Nt(_),x=At(_),S=!!gr(a)&&_r(a,gr(a).id),C=lv(kr(a)),w=S?0:Math.max(1,p),T=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${C})`,k=S?`${T} — completes the challenge repeat, awards no Purge Points`:`${T} — awards +${z(w)} Purge Point${w===1?``:`s`}`,[A]=(0,v.useState)(()=>new Set(b.filter(e=>Ur(a)(e)).map(e=>e.id))),[ee,j]=(0,v.useState)(()=>new Set),te=e=>j(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),M=(0,v.useRef)(null),N=(0,v.useRef)(new Map),ne=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;j(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return M.current=e,()=>e.disconnect()},[]);let re=e=>(ne.current.has(e)||ne.current.set(e,t=>{let n=M.current,r=N.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(N.current.set(e,t),n&&n.observe(t)):N.current.delete(e)}),ne.current.get(e)),[ie,P]=(0,v.useState)(!1),ae=()=>P(e=>!e),oe=Hr(a),se=gr(a),ce=e=>se?.effect===e,le=se?` — disabled by challenge ${se.id} ${se.codename}`:``,ue=s.count===0,de=!!e.buyUnitMode,fe=!!e.buyMaxMode&&yi(a)&&!de,pe=Ft(a),me=oe&&ue,he=oe&&!ue,F=!!se||he||!!e.goal||ou(a.intro??{}).length>0,I=Tr(a),ge=a.purchaseLevels?.[I.id]??1,_e=Ur(a)(I),ve=or(a),ye=a.purchaseLevels?.[ve.id]??1,be=a.scaleUpCount??0,L=sr(a),xe=Math.max(0,ge-1),Se=Math.max(0,ye-1),Ce=L,we=Oy(Se,Ce),Te=!oe&&Se>=L,Ee=b[b.indexOf(ve)+1]??null,De=Ee?.symbol===`TB`,Oe=Xr(a),ke=Number.isInteger(Oe)?String(Oe):Oe.toFixed(2),Ae=Oe===2?`doubles`:`multiplies by ${ke}`,[je,Me]=(0,v.useState)(_e);(0,v.useEffect)(()=>{_e&&Me(!0)},[_e]);let Ne=ur(a)??0,Pe=cr(a),Fe=Pe,Ie=1+Yr(a),Le=1+Yr({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),Re=1+nt,ze=Oy(xe,Fe),Be=!oe&&!ce(`overclockDisabled`)&&xe>=Pe,Ve=a.globalTickspeedMultiplier??null,He=Ve!==null,Ue=Jr(a),We=qt(Ve??0),Ge=Xt(a),Ke=!oe&&!ce(`clockSpeedDisabled`)&&Ge&&Yt(a),qe=Qt(a),Je=a.owned[I.id]??0,Ye=a.lastTierXpConsumed??0,Xe=Math.floor(a.purge.xp??0),Ze=en(Ye),Qe=Oy(Xe,Ze),$e=qe&&!oe&&!ce(`restageDisabled`)&&Xe>=Ze,et=My($t(Xe)),tt=()=>{$e&&window.confirm(`Restage: consume ${z(Xe)} XP for ${et} faster ${I.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.${Je>0?``:` You own no ${I.name}, so nothing will be left producing.`}`)&&t.consumeXpForLastTierTickspeed(Xe)},rt=Oy(a.resources.base??0,Jt(Ve??0)),[it,at]=(0,v.useState)(Ge);(0,v.useEffect)(()=>{Ge&&at(!0)},[Ge]);let ot=(0,v.useRef)(null);(0,v.useEffect)(()=>{me&&ot.current?.focus()},[me]);let st=(0,v.useRef)(null),[ct,lt]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=st.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>lt(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[me]);let ut=(0,v.useRef)(null),[dt,ft]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=ut.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>ft(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[he]),me?(0,Z.jsx)(fy,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,Z.jsxs)(py,{children:[(0,Z.jsx)(`h2`,{children:`💾 Disk full`}),(0,Z.jsxs)(gy,{children:[`You've reached `,At(a.resources[O]),` — 1 Googol Bytes. All production has stopped.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Resets your resources, owned tiers, and purchases`}),(0,Z.jsxs)(`li`,{children:[`Awards `,z(p),` Purge Point`,p===1?``:`s`,` — spend them on the Firmware page for automation and production bonuses`]}),(0,Z.jsx)(`li`,{children:`Keeps your unlocked autobuyers and Purge Points`})]}),(0,Z.jsx)(Q,{ref:ot,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:(0,Z.jsx)($,{children:`✦ Purge Now`})})]})}):(0,Z.jsxs)(Nv,{children:[(0,Z.jsx)(vv,{onExit:t.exitChallenge,state:a}),he&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(my,{ref:ut,"aria-label":`purge available banner`,children:[(0,Z.jsxs)(gy,{children:[C,` reached — production has stopped.`]}),(0,Z.jsxs)(Q,{"aria-label":k,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,Z.jsx)(mg,{children:`✦ `}),(0,Z.jsx)(hg,{children:S?`Complete challenge`:`Purge +${z(w)} PP`})]})]}),(0,Z.jsx)(hy,{$height:dt})]}),(0,Z.jsx)(ry,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,Z.jsxs)(iy,{$percent:e.goal?e.goal.percent:m,children:[(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${C}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:m,"aria-valuemin":0,"aria-valuemax":100}),(0,Z.jsx)(ay,{children:e.goal?e.goal.label:`${m}% to Purge`})]})}),F?(0,Z.jsx)(_g,{as:`h1`,children:`Byte Factory`}):(0,Z.jsx)(Fv,{children:(0,Z.jsx)(`h1`,{children:`Byte Factory`})}),(0,Z.jsx)(ov,{actions:t,state:a}),(0,Z.jsx)(Mv,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,Z.jsx)(ly,{ref:st,"aria-hidden":`true`}),(0,Z.jsxs)(cy,{$compressed:ct,$belowBar:he,$belowBarHeight:dt,children:[(0,Z.jsxs)(qv,{$raised:!0,children:[(0,Z.jsxs)($v,{children:[(0,Z.jsx)(Jv,{"aria-controls":`global-multipliers-details`,"aria-expanded":ie,"aria-label":`money display`,onClick:ae,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ae())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,Z.jsx)(Zv,{children:y})}),!ct&&y!==x&&(0,Z.jsx)(Qv,{"aria-label":`balance in bits: ${x}`,children:x})]}),!ct&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(ey,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(h-n)/.125));return(0,Z.jsx)(ty,{children:(0,Z.jsx)(ny,{$fraction:r})},t)})}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":g,"aria-valuemin":0,"aria-valuemax":100})]}),ie&&!ct&&(0,Z.jsxs)(sy,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!ue&&(0,Z.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${My(an(a))} production speed from ${z(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${z(100)} PP on Firmware → Prestige)`]}),!ue&&(0,Z.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${My(f)} production speed from ${z(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${z(1)} PP on Firmware → Prestige)`]}),(0,Z.jsxs)(`li`,{children:[`Scale Up: `,be>0?`${be} activation${be===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${z(Ce)} completed levels on ${ve.name})`]}),it&&(0,Z.jsxs)(`li`,{children:[`Accelerate: `,He?`${My(Ue,{precise:!0})} faster ticks on every tier`:`not yet active`]}),je&&(0,Z.jsxs)(`li`,{children:[`Overclock: `,Ne>0?`The per-level speed bonus is now ${jy(Ie)}% (was ${jy(Le)}%)`:`not yet claimed (reach ${z(Fe)} completed levels on ${I.name})`]})]})]}),!ue&&(0,Z.jsx)(oy,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,Z.jsxs)(Yv,{children:[(0,Z.jsxs)(Xv,{children:[z(s.points),` PP`]}),d&&` · ${My(f)} production speed`]})})]}),(it||qe)&&(0,Z.jsxs)(Kv,{children:[it&&(0,Z.jsxs)(Uv,{"aria-label":`global accelerate panel`,children:[(0,Z.jsxs)(by,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Vv,{children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(Bv,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,jy(Ie),`%/lvl`]})]})}),(0,Z.jsx)(_y,{children:He?`${My(Ue,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,Z.jsxs)(Q,{"aria-label":He?`Upgrade Accelerate for ${jt(We)} (currently ${My(Ue,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${jt(We)}`,color:Ke?`#3b82f6`:`darkgrey`,disabled:!Ke,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${ce(`clockSpeedDisabled`)?le:``}`,type:`button`,$progress:rt,$progressColor:`#3b82f6`,$pulse:Ke,children:[(0,Z.jsx)(mg,{children:`🌐 `}),(0,Z.jsx)(hg,{children:jt(We)}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":rt,"aria-valuemin":0,"aria-valuemax":100})]})]}),qe&&(0,Z.jsxs)(Wv,{"aria-label":`restage panel`,children:[(0,Z.jsxs)(by,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Vv,{children:[(0,Z.jsx)(`h2`,{children:`Restage`}),(0,Z.jsxs)(Bv,{title:`Each XP consumed makes ${I.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[I.symbol,` +`,Ay($t(1)),`%/XP`]})]})}),(0,Z.jsxs)(_y,{children:[My($t(Ye),{precise:!0}),` faster `,I.name,` ticks`,` `,`from `,z(Ye),` XP consumed. Next consumption needs at least `,z(Ze),` XP.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Restage: consume ${z(Xe)} XP for ${et} ${I.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${ce(`restageDisabled`)?le:``}`,variant:`smart`,disabled:!$e,onClick:tt,title:Je>0?`Consume XP for a compounding +1% ${I.name} tickspeed per XP (min ${z(Ze)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${I.name} owned right now — Restaging now resets everything with nothing left producing`,type:`button`,$progress:Qe,$pulse:$e,children:[(0,Z.jsx)(mg,{children:`🧬 `}),(0,Z.jsxs)(hg,{children:[z(Xe),` XP`]}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`${I.name} Restage progress`,"aria-valuenow":Qe,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,Z.jsx)(Iv,{children:b.map((e,n)=>{if(!Ur(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=gi(a,e.id),c=hi(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,p=Cr(a,e.id)??e,m=Bt(p,l,pe,d,c,2**53-1),h=de?Math.min(1,m):m,g=zt(p,l,pe,d,1),_=h>0?zt(p,l,pe,d,h):g,v=m>0&&!oe,y=d/pe*100,b=h/pe*100,x=a.tickspeedLevels?.[e.id]??1,S=Kt(x)*(e.id===I.id?$t(a.lastTierXpConsumed??0):1),C=My(S),w=nr(l,tr(a)),T=ir(a,e.id),O=Math.floor(i*f*T*w*Sr(a,e.id)),k=e.producesResourceId===`base`?At(O):e.producesResourceId===`bytes`?jt(O):`${z(O)} ${E(e.producesResourceId)}`,j=D(e.id),M=Zr(a,e.id),N=Au(a,e.id,x+1),ne=ju(a,e.id,x+1),ie=r>=ne&&!oe&&!Mu(a,e.id),P=fe?Oi(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ae=P.levels>0?`Buy ${z(P.levels)} full level${P.levels===1?``:`s`} for ${At(P.cost)} total; highest level costs ${At(P.partialQuantity>0?P.partialCost:P.lastLevelCost)}${P.partialQuantity>0?` (${P.partialQuantity} of ${pe} purchases toward the next level)`:``} (${z(u)} completed levels)`:`Buy${h>1?` ×${h}`:``} for ${At(_)} (${z(u)} completed levels, ${z(d)} of ${pe} purchased toward the next)`,se=`Tickspeed multiplier (+10% faster ticks) for ${Dy(N,e.id)}${ne>N+1?` (requires ${Dy(ne,e.id)} owned)`:``}`,ce=P.levels>0?`+${z(P.levels)}`:``,le=`⚙ ${Dy(N,e.id)}`,ue=Oy(r,ne),me=o.tierAccents[n%o.tierAccents.length],he=ee.has(e.id),F=`${e.id}-details`,ge=B_(a.intro,n);return(0,Z.jsxs)(Rv,{ref:re(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:me,$animateReveal:!A.has(e.id),$boosted:ge,children:[(0,Z.jsxs)(uy,{children:[(0,Z.jsx)(vy,{children:(0,Z.jsxs)(yy,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":he,"aria-controls":F,onClick:()=>te(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),te(e.id))},children:[(0,Z.jsx)(_g,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,Z.jsxs)(xy,{title:`Owned`,children:[(0,Z.jsx)(_g,{children:`Owned: `}),z(i)]})]}),he&&(0,Z.jsx)(dy,{id:F,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Production: +`,k,` per delivery`]}),(0,Z.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,ky(j),`s`]}),(0,Z.jsxs)(`li`,{children:[`Effective tickspeed: every `,ky(M),`s (tier ×`,ky(S),`, global ×`,ky(Ue),`)`]}),(0,Z.jsxs)(`li`,{children:[`Completed levels: `,z(u),` (`,z(d),`/`,pe,` purchased toward the next) — purchase milestone bonus: ×`,ky(w),` from `,z(s),` lifetime purchases`]}),T>1&&(0,Z.jsxs)(`li`,{children:[`Scale Up bonus: ×`,ky(T)]}),ge&&(0,Z.jsx)(`li`,{children:H_(a.intro,n)}),(0,Z.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,Z.jsxs)(Ey,{"aria-label":se,variant:`success`,disabled:!ie,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${x} (${C} faster ticks) — the next level makes it 10% more`,$progress:ue,$pulse:ie,children:[(0,Z.jsx)($,{children:le}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":ue,"aria-valuemin":0,"aria-valuemax":100})]}),(0,Z.jsxs)(Sy,{"aria-label":ae,variant:`plain`,disabled:!v,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${pe} purchases) also multiplies it by ×${tr(a)}`,$progress:y,$secondaryProgress:b,$pulse:v,children:[(0,Z.jsxs)(Cy,{children:[`🛒 `,z(u),ce&&(0,Z.jsx)(wy,{children:ce})]}),(0,Z.jsx)(Ty,{children:At(P.levels>0?P.partialQuantity>0?P.partialCost:P.lastLevelCost:_)}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":pe})]})]},e.id)})}),(0,Z.jsxs)(Kv,{children:[(0,Z.jsxs)(Hv,{"aria-label":`scale up panel`,children:[(0,Z.jsxs)(by,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Vv,{children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(Bv,{title:`${Oe===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,ke,De?` · 🔓 TB`:``]})]})}),(0,Z.jsxs)(_y,{children:[`Resets tiers and `,Ae,` production of every tier unlocked so far`,Ee?`, and unlocks ${Ee.name}`:``,`. Needs `,z(Ce),` completed `,ve.name,` levels.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Scale Up (requires ${Ce} completed ${ve.name} levels) — ${Ae} production for tiers unlocked so far${De?` and unlocks TB`:``}`,color:Te?`#22d3ee`:`darkgrey`,disabled:!Te,onClick:t.scaleUp,title:`Resets tiers, ${Ae} production for tiers unlocked so far${Ee?`, and unlocks ${Ee.name}`:``} — requires ${Ce} completed ${ve.name} levels`,type:`button`,$progress:we,$progressColor:`#22d3ee`,$pulse:Te,children:[(0,Z.jsx)(mg,{children:`⏩ `}),(0,Z.jsxs)(hg,{children:[ve.symbol,` `,z(Se),`/`,z(Ce)]}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":we,"aria-valuemin":0,"aria-valuemax":100})]})]}),je&&(0,Z.jsxs)(Gv,{"aria-label":`overclock panel`,children:[(0,Z.jsxs)(by,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Vv,{children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(Bv,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,ky(10),`%/lvl`]})]})}),(0,Z.jsx)(_y,{children:Ne>0?`The per-level speed bonus is now ${jy(Ie)}% (was ${jy(Le)}%).`:`Not claimed yet — reach ${z(Fe)} completed ${I.name} levels. Each completed level then multiplies the per-level speed bonus by ×${Re}.`})]}),(0,Z.jsxs)(Q,{"aria-label":`Overclock (requires ${Fe} completed ${I.name} levels) — resets Scale Up's bonus; each completed ${I.name} level (${z(xe)} now) multiplies the per-level speed bonus by ×${Re}`,color:Be?`#fb923c`:`darkgrey`,disabled:!Be,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${I.name} level multiplies the per-level speed bonus by ×${Re} — requires ${Fe} completed levels${ce(`overclockDisabled`)?le:``}`,type:`button`,$progress:ze,$progressColor:`#fb923c`,$pulse:Be,children:[(0,Z.jsx)(mg,{children:`⚡ `}),(0,Z.jsxs)(hg,{children:[I.symbol,` `,z(xe),`/`,z(Fe)]}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":ze,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},Py=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Fy=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,Iy={"10m":`good`,"1h":`info`,"10h":`violet`},Ly=X(th)`
  align-items: center;
  border-left: 3px solid ${e=>e.theme.color[Iy[e.$formatId]]??e.theme.color.accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${e=>e.theme.space.sm};
  row-gap: 0;
`,Ry=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,zy=X.span`
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
`,By=X.span`
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
`,Vy=X(Q)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,Hy=X.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color[Iy[e.$formatId]]??e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,Uy=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,Wy=X.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,Gy=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Ky=X.div`
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
`,qy=X.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,Jy=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Yy=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],Xy=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=Yy.map(e=>({group:e,missing:jg.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},Zy=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,Qy=X.button`
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
`,$y=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return Yy.map(r=>{let i=jg.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,Z.jsxs)(Zy,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,Z.jsx)(Gy,{as:`span`,children:r.title}),i.map(n=>{let i=Ng(e.game,n.key),a=`${r.title} ${n.label}`;return(0,Z.jsx)(Qy,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},eb=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${z(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,Xy(e)].filter(Boolean).join(` · `),tb={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},nb=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(x_(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(th,{"aria-label":`daily run ${e.id}`,children:[(0,Z.jsxs)(qy,{children:[(0,Z.jsxs)(Py,{children:[`Daily `,e.label]}),(0,Z.jsx)(Q,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,Z.jsxs)(Gy,{children:[o.label,` · now `,z(s),` · `,Jy(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,Z.jsxs)(Gy,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),eb(t.def)&&(0,Z.jsx)(Gy,{"aria-label":`daily run conditions`,children:eb(t.def)}),(0,Z.jsx)(Ky,{$percent:a,children:(0,Z.jsx)(`span`,{})}),(0,Z.jsx)($y,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,Z.jsx)(Ny,{game:c})]})},rb=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=Pg(n),f=A_(e,d),p=i?e.daily.runs[i]:null;return p?(0,Z.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,Z.jsx)(nb,{actions:t,format:Dg.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,Z.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,Z.jsxs)(Fy,{children:[d,` · `,(0,Z.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,Jy(Fg(n)/1e3)]})]}),(0,Z.jsx)(Ry,{children:Dg.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:__(d,n.id),f=c.has(n.id),p=eb(l),m=r?`${o?`from ${r.def.dateId} · `:``}${Jy(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(x_(r)*100)}%`:[i&&tb[i.lastOutcome],i?.bestSeconds!=null&&`best ${Jy(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,Z.jsxs)(Ly,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,Z.jsx)(zy,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,Z.jsxs)(By,{title:`${l.objective.label} · ${m}`,children:[(0,Z.jsx)(`strong`,{children:l.objective.label}),m&&(0,Z.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,Z.jsx)(Vy,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,Z.jsx)(Vy,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,Z.jsx)(Hy,{$formatId:n.id,$percent:Math.round(x_(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(x_(r)*100),role:`progressbar`,children:(0,Z.jsx)(`span`,{})}),f&&(0,Z.jsxs)(Uy,{children:[p&&(0,Z.jsx)(Gy,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,Z.jsxs)(Wy,{children:[!o&&(0,Z.jsx)(Q,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,Z.jsx)(Q,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,Z.jsx)(I_,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?E_(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,Z.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},ib=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,ab=X.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,ob=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,sb={completed:jm`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:jm`
    border-color: ${e=>e.theme.color.warn};
  `,active:jm`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:jm``},cb=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,lb=X.button`
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
  ${e=>sb[e.$status]}
  ${e=>e.$selected&&jm`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,ub=X.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,db=X.span`
  color: ${e=>cb(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,fb=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,pb=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,mb=Object.fromEntries(b.map(e=>[e.name,e.symbol])),hb={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},gb=e=>{if(e.automation?.kind===`global`)return hb[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${mb[n]??n}`},_b={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},vb=(e,t)=>gr(e)?.id===t.id?`active`:_r(e,t.id)?`completed`:`available`,yb=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=_r(t,e.id);return(0,Z.jsxs)(I_,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${dv(e)}?`,children:[(0,Z.jsx)(`p`,{children:e.rule}),(0,Z.jsxs)(`p`,{children:[`Goal: `,lv(e.goal),`, then Purge.`]}),(0,Z.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},bb=({state:e,onStart:t,onExit:n})=>{let r=gr(e),i=N.filter(e=>le.has(e.id)).map(t=>{let n=Mr(e,t.id);return{def:t,unlocked:n,status:n?vb(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${jr(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${cv(i).replace(` `,``)}`:gb(t)};return(0,Z.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,Z.jsxs)(th,{children:[(0,Z.jsx)(ib,{children:`Factory challenges`}),(0,Z.jsxs)(ab,{"aria-label":`challenge counts`,children:[(0,Z.jsxs)(db,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,Z.jsxs)(db,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,Z.jsxs)(db,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,Z.jsx)(ob,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,Z.jsxs)(lb,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${_b[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?dv(t):`${t.id} · ${t.target} · ${uv(t)}`,type:`button`,children:[(0,Z.jsx)(ub,{$status:r,children:t.id}),(0,Z.jsx)(db,{$status:r,children:u(e)})]},t.id)})}),c&&(0,Z.jsxs)(fb,{"aria-label":`challenge ${c.def.id}`,children:[(0,Z.jsxs)(`span`,{children:[c.unlocked?(0,Z.jsx)(`strong`,{children:dv(c.def)}):(0,Z.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,Z.jsx)(pb,{children:c.def.rule}):(0,Z.jsxs)(pb,{children:[`🔒 `,uv(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,Z.jsx)(sv,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,Z.jsx)(Q,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${dv(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},xb=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Sb=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,Cb=X.div`
  display: flex;
  gap: 0.5rem;
`,wb=X(Q)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,Tb=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],Eb=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=Cm(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=v_(n),u=a===`daily`&&!l?`factory`:a;return(0,Z.jsxs)(xb,{children:[(0,Z.jsx)(Sb,{children:(0,Z.jsx)(`h1`,{children:`Challenges`})}),(0,Z.jsx)(Cb,{role:`tablist`,"aria-label":`challenge types`,children:Tb.filter(e=>e.id!==`daily`||l).map(e=>(0,Z.jsxs)(wb,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,Z.jsx)(bb,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,Z.jsx)(rb,{actions:r,state:n}),(0,Z.jsx)(yb,{def:s?N.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},Db=`🏷️`,Ob=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,kb=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Ab=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,jb=X.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,Mb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,Nb=Rm`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,Pb=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,Fb=Rm`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,Ib=X.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${Pb(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
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
  border: 1.5px solid ${e=>e.$activeKind?Pb(e):e.$full?e.theme.color.accent:e.$empty?e.theme.color.textMuted:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$pullEligible?e.theme.color.good:`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:e.$empty?e.theme.color.surfaceSunken:`transparent`};
  ${e=>e.$activeKind?`--disk-glow: ${Pb(e)}; box-shadow: 0 0 0 1px var(--disk-glow), 0 0 10px 2px var(--disk-glow);`:``}
  ${e=>e.$queued?`border-style: dashed; border-color: ${e.theme.color.info};`:``}
  animation: ${e=>e.$activeKind&&!e.$paused?Fb:e.$pullEligible?Nb:`none`} 1.4s ease-in-out infinite;
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
`,Lb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Rb=X.div`
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
`,zb=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,Bb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Vb=X.div`
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
`,Hb=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Ub=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=ws(n,t),l=c!==null,u=Ta(n,t),d=Cs(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=U(t),g=Io(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=Do(n),b=Co(n),x=t===y?Ao(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/Oo(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!Ro(n)||Math.max(0,(ma(n,V(t))??0)-Da(n,V(t)))<=0),O=Math.round(E*100),k=Yo(n,t),A=k?ts(n,t):!1,ee=k?$o(k):0,j=k?es(k):0,te=k&&k.segmentsCollected<10,M=k&&k.segmentsCollected>=10,N=as(n,t)&&typeof e?.expediteDiskFill==`function`,ne=os(n,t),re=Zo(k).length>0,ie=ms(n,t),P=!!ie,ae=P&&_s(n,t),oe=P?Math.max(0,1-gs(ie)):1,se=P?t*oe:p,ce=vs(t);return(0,Z.jsxs)(Ob,{children:[f?(0,Z.jsx)(jb,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):ce?(0,Z.jsxs)(kb,{children:[(0,Z.jsx)(Ab,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,Z.jsx)(Lb,{role:`group`,"aria-label":P?`${h} read cache flushing to disk${ae?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,se-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,Z.jsx)(Rb,{"aria-label":P?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:P?ae?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(ie.remainingSeconds/ya(n,V(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:P&&(a||o>0),children:o>0?(0,Z.jsx)(zb,{$fill:o,$flushing:P}):null},r)})})]}):null,k&&!f?(0,Z.jsxs)(kb,{children:[(0,Z.jsxs)(Ab,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,Z.jsx)(Bb,{role:`progressbar`,"aria-label":M?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((M?j:ee)*100),children:te?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=$o(k),i=t<n,a=t===n&&r>0;return(0,Z.jsx)(Vb,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?re?`Collecting from smaller disks and Staging`:`Filling from Staging`:ne?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,Z.jsx)(Vb,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,Z.jsx)(Hb,{$fill:j})})})]}):null,(0,Z.jsxs)(kb,{children:[(0,Z.jsx)(Ab,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,Z.jsx)(Mb,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&N,g=o&&!p&&ne&&r===i;return(0,Z.jsx)(Ib,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${Jo(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?ce?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},Wb=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,Gb=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,Kb=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,qb=X.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,Jb=X.h4`
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
`,Yb=X.span`
  flex-shrink: 0;
`,Xb=X.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,Zb=X.div`
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
`,Qb=X.span`
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
`,$b=X.div`
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
`,ex=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,tx=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,nx=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:mi(t)},rx=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,ix=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,ax=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,ox=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,sx=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,cx=X.div`
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
`,lx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,ux=X(Q)`
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
`,dx=X.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,fx=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=G(e,n),a=Ns(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},px=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?fx(t):[r];if(c.length===0)return null;let l=(0,Z.jsx)(Gb,{children:c.map(n=>{let r=Ms(n),i=cc(n)(t),c=Ae[n-1]??`Cell`,l=Lc(n),u=Fs(t,n),d=!Ps(t,n)&&Re[Ns(t,n)+1],f=Mo(u*l,n),p=Mo(i*l,n),m=zs(t,n),h=Hs(t,n),g=Us(t,n),_=Ks(t,n),v=Xs(t,n),y=Zs(t,n),b=Jc(t,n),x=Kc(t,n),S=oc(t,n),C=Zi(t,n),w=kc(t,n),T=xc(t,n),E=!T&&Sc(t,n),D=Oc(t,n),O=jc(t,n),k=Ys(t,n)*l,A=Qs(t,n),ee=A&&Wc(t,n),j=ee||A&&C&&ma(t,n)>=fa(t,n)?ca(t,n)*(ee?ya(t,n):1)*ac(t,n):0,te=O||b&&!D&&!E&&!T,M=i*l,N=!te&&S&&!E&&j>0&&i<=u&&k<M?nx((M-k)/j):null,ne=S?v/100:0,re=(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Wb,{children:Db}),p]}),ie=`${S?v:0}%`;return(0,Z.jsxs)(Kb,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,Z.jsxs)(Xb,{$flush:s,children:[(0,Z.jsxs)(qb,{children:[(0,Z.jsxs)(Jb,{title:`${r} Data Lake — funds ${c}`,children:[(0,Z.jsxs)(Yb,{"aria-hidden":`true`,children:[(0,Z.jsx)(Wb,{children:`🏞️`}),r]}),(0,Z.jsx)(`span`,{children:`Lake`})]}),(0,Z.jsxs)(ex,{title:`Current fill speed`,children:[`⚡ `,U(j),`/s`]})]}),(0,Z.jsxs)(Zb,{children:[D?(0,Z.jsx)(rx,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:re}):E?(0,Z.jsx)(rx,{title:`${c} is already at the max — spend or charge it up first`,children:re}):w?(0,Z.jsx)(rx,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:re}):T?(0,Z.jsx)(ux,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:re})}):S?(0,Z.jsx)(ux,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:re})}):(0,Z.jsx)(rx,{title:`Build a ${U(l)} disk in Storage to unlock ${c} here`,children:re}),O?(0,Z.jsx)(ux,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,Z.jsx)(ux,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${U(x)} banked) to grow its capacity from ${f} to ${Mo(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⚡ Scale Out`})}):N?(0,Z.jsxs)(tx,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,N]}):null]}),s?(0,Z.jsx)(Qb,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:ie}):(0,Z.jsx)(Qb,{$withBar:!0,title:`Currently filled`,children:uo(Po(k,n))}),(0,Z.jsx)($b,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:ne})]}),o&&(()=>{let e=S?Gs(t,n):0,i=U(l);return(0,Z.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,Z.jsxs)(sx,{children:[(0,Z.jsx)(`span`,{children:`buffer`}),(0,Z.jsx)(`span`,{children:S?`${U(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,Z.jsx)($b,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=qs(t,n),i=Mo(l*_.target,n);return(0,Z.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,Z.jsxs)(sx,{children:[(0,Z.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,Z.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,Z.jsx)($b,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&Fe.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?qs(t,n):0,u=Mo(s,n);return(0,Z.jsxs)(ax,{children:[(0,Z.jsx)(ox,{"aria-hidden":`true`,children:u}),(0,Z.jsx)(ix,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,Z.jsx)(cx,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,Z.jsx)(lx,{$fill:c})},t)})})]},e)}),o&&(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,Ys(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,Z.jsxs)(Z.Fragment,{children:[a&&!s&&(0,Z.jsx)(dx,{}),l]}):(0,Z.jsx)(th,{"aria-label":`Data Lakes`,children:l})},mx=h(),hx=X.div`
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
`,gx=X.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,_x=X.dl`
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
`,vx=X.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,yx=8,bx=6,xx=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-yx-n,i=t.bottom+bx,a=t.top-bx-n,s=i<=r||a<yx?Math.max(yx,Math.min(i,r)):a,l=Math.max(yx,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,mx.createPortal)((0,Z.jsxs)(hx,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:yx,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,Z.jsx)(gx,{children:r}),(0,Z.jsx)(_x,{children:i.map(({label:e,value:t})=>(0,Z.jsxs)(`div`,{style:{display:`contents`},children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),a&&(0,Z.jsx)(vx,{children:a})]}),document.body)},Sx=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,Cx=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,wx=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,Tx=X.p`
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
`,Ex=X.button`
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
`,Dx=({theme:e})=>jm`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,Ox=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,kx=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>jm`
  button {
    background-color: ${Ox(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,Ax=X(th)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${Dx}

  button {
    background-color: ${Ox};
    border: 0;
    border-radius: 0;
  }
`,jx=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:mi(t)},Mx=(e,t,n)=>Li(e,t,t,n),Nx=(e,t,n)=>{let r=Mx(e,t,n);return r===null?null:jx(r)},Px=X.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,Fx=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,Ix=Rm`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,Lx=X.span`
  display: inline-block;
  animation: ${Ix} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Rx=X.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,zx=X.span`
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
`,Bx=X.span`
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
`,Vx=X.span`
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
`,Hx=X.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Ux=X.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Wx=X($b)`
  margin-top: 0;
`,Gx=X.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Kx=X(th)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${Dx}
  ${e=>e.$boosted&&U_}
`,qx=X.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,Jx=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,Yx=X(th)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${Dx}
  ${e=>e.$boosted&&U_}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`,Xx=X.button`
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
`,Zx=X.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,Qx=X.button`
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
`,$x=X.div`
  position: relative;
  width: 100%;
`,eS=X.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,tS=X.h3`
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
`,nS=X.span`
  flex-shrink: 0;
`,rS=X(X.span`
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
`,iS=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${pg}
  background-color: ${Ox};
`,aS=X(iS)`
  position: relative;
`,oS=X(iS)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,sS=X(iS)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,cS=(e,t,n,r=!0)=>{let i=$a(t,n),a=i&&e>0&&e<i.divisor?$a(e,n):i;return r?co(e,a):oo(e,a)},lS=(e,t,n=``)=>{let r=$a(e,!0);return`${lo(e/r.divisor)} → ${lo(t/r.divisor)} ${r.symbol}${n}`},uS=(e,t)=>oo(e,$a(e,t)),dS=5e3,fS=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),pS=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!fS(e))return;let t=setTimeout(()=>n(e),dS);return()=>clearTimeout(t)},[e,r]),t===e},mS=({bits:e,poolIndex:t,large:n})=>{let r=pS(Fo(e,t))?Po(e,t):Fo(e,t);return(0,Z.jsx)(Tx,{$large:n,children:r})},hS=e=>Math.min(100,Math.max(0,e)),gS=8,_S=X.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,vS=X.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,yS=X.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,bS=X.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,xS=X.div`
  position: relative;
  min-width: 0;
  height: ${gS}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,SS=X(X.div`
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
`,CS=X.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,wS=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,Z.jsxs)(_S,{children:[(0,Z.jsxs)(vS,{children:[(0,Z.jsx)(Wb,{children:`📦`}),e]}),o&&(0,Z.jsx)(xS,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,Z.jsx)(SS,{$widthPercent:a/100*100})}),o&&(0,Z.jsxs)(yS,{children:[`+`,Math.round(a),`% `,(0,Z.jsx)(CS,{children:`👆`})]}),!o&&r&&(0,Z.jsxs)(bS,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},TS=[[10,[229,72,77]],[100,[59,130,246]],[we,[48,164,108]]],ES=e=>{let t=TS.length-1;if(e<=TS[0][0])return`rgb(${TS[0][1].join(`,`)})`;if(e>=TS[t][0])return`rgb(${TS[t][1].join(`,`)})`;let n=TS.findIndex(([t])=>e<=t),[r,i]=TS[n-1],[a,o]=TS[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},DS=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=pS(cS(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=Ka(o),f=ra(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${uo(fo(e))}/s`,w=Ni(s),T=lu(s),E=s.byteCreated?C(Wi(s)):null,D=Vi(s),O=Nx(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=Co(o),ee=Do(o),j=So(o),te=ko(o,j),M=Oo(o,j),N=V(j),ne=Math.max(0,ma(o,N)-Da(o,N)),re=Eo(o),ie=wo(o),P=ji(s).toFixed(2),ae=ji({...s,unlockedDiskSteps:Ai(s)+1}).toFixed(2),oe=U(yo(Ai(s)+1)),se=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${oe} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${P} → ${ae}.`))&&n.unlockNextDiskSize()},ce=d?Lo(o):[],le=!A&&Ro(o),ue=s.diskBuild,de=!A&&!re&&Oa(o)&&!le&&!ue,fe=Math.min(M,Ao(o,j)),pe=Math.floor(fe+1e-9),me=fe>0||s.diskBuildQueued,he=ue?hS(100-ue.remainingSeconds/ue.totalSeconds*100):re?100:me?hS(fe/M*100):0,F=ws(o,j),I=Pa(o),ge=Ia(o),_e=!!s.capacityUpgradeQueued,ve=!!s.speedUpgradeQueued,ye=_e||ve,be=s.capacity,L=Fa(s),xe=s.capacity*2,Se=uS(xe,!0),Ce=Ni({...s,speedCapacity:L*2}),we=`${fo(Ce)}/s`,Te=w>0?`×${Number((Ce/w).toFixed(2))}`:``,Ee=hS(s.bits/8*100),De=hS((s.capacityUpgradeProgress??0)/be*100),Oe=hS((s.speedUpgradeProgress??0)/L*100),ke=ve?Oe:De,Ae=Ki(s),je=Ae?.cost??0,Me=Ae?.progress??0,Ne=Ae?.multiplierPercent??100,Pe=C(Ae?.rate??0),Fe=Ae?.rate??0,Ie=jx(Fe>0&&je>0?Math.max(0,je-Me)/Fe:1/0),Le=hS(s.bits/s.capacity*100),Re=()=>{le?n.provisionDisk():n.queueDiskBuild()},ze=s.diskBuildQueued,Be=`${pe}/${M}`,Ve=M>1||pe>0?` · ${Be}`:``,He=`Provision ${U(j)} Disk`,Ue=!!ze&&!ue&&!re&&!A,We=V(ee),Ge=A?s.diskBuild?`waiting for build`:$i(o,We)?`waiting for earlier pool`:ca(o,We)<=0?`waiting for pool`:ma(o,We)<=Da(o,We)?`waiting for staging`:null:null,Ke=ue?{icon:`🏗`,label:`Provisioning ${U(ue.size)} Disk`,status:`${Math.ceil(ue.remainingSeconds)}s left`}:re?{icon:`✅`,label:`All Pools Complete (${U(j)})`,status:null}:A?{icon:`🔁`,label:He,status:`Rebuilding ${U(ee)} first · ${Ge??`automatic`}`}:ze?{icon:`⏳`,label:`Provisioning ${U(j)} Disk`,status:`${pe>0?Be:`Queued`} · ${le?ne>0?`building`:`waiting for staging`:de?`after disk fill`:`waiting for pool`}`}:le?{icon:`🏦`,label:He,status:`Ready · ${Db} ${U(te)}${Ve}`}:{icon:`🏦`,label:He,status:`${Db} ${U(te)}${Ve} · tap to queue`,reason:de?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},qe=ya(o,A?We:N),Je=100*qe,Ye=(A?la(o,We):ca(o,N))*qe,Xe=`${uo(U(Ye))}/s`,Ze=A&&ca(o,We)<=0,Qe=Go(o),$e=Qe.disksTotal>0?hS(Qe.disksDone/Qe.disksTotal*100):0,et=Qe.seconds,tt=A?$e:he,nt=Math.max(0,(M-fe)*j),rt=ba(o,N)*va(o,N)/100*fu(s,N),it=Math.min(nt,ne),at=Ye>0?it/Ye+(nt-it)/Math.max(Math.min(Ye,rt),Number.MIN_VALUE):1/0,ot=A?jx(et):de?`—`:jx(at),st=d&&!re&&!ue&&Ye>0&&(A||ze),ct=(0,Z.jsx)(Q,{"aria-label":`reformat to unlock disk size`,onClick:se,title:`Reformat the Byte Foundry to unlock ${oe} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${P} → ${ae}.`,type:`button`,variant:`prestige`,children:(0,Z.jsxs)(Fx,{children:[(0,Z.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,oe,` Disks`]}),(0,Z.jsx)(Gx,{children:`Bitrate exponent ${P} → ${ae} · auto-rebuilds to your highs`})]})}),lt=ie?ct:(0,Z.jsxs)(Q,{"aria-label":ue?`disk array rebuilding`:re?`disk ladder complete`:`provision disk`,"aria-description":Ke.reason?`${Ke.status} (${Ke.reason})`:Ke.status??void 0,disabled:!!ue||re||A,onClick:Re,title:ue?`Provisioning ${U(ue.size)} — ${Math.ceil(ue.remainingSeconds)}s (array offline)`:re?`All ${Xi()} storage pools are complete through ${U(j)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${U(ee)} now); ${U(j)} unlocks for provisioning once they are done`:ze?`Armed — draws from the pool staging at the pool's fixed bandwidth${de?` once Disk Fill is done`:``} (${pe}/${M} passes so far)`:le?F?`Costs ${U(te)}, paid in ${M} pass${M===1?``:`es`} of ${U(j)} each (${pe}/${M} collected) — creates an empty ${U(j)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${F} level`:`Costs ${U(te)}, paid in ${M} pass${M===1?``:`es`} of ${U(j)} each (${pe}/${M} collected) — creates an empty ${U(j)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:de?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${pe}/${M} passes so far)`,type:`button`,variant:re||A?`neutral`:ze?`smart`:le?`info`:`neutral`,$progress:tt,$pulse:Ue,children:[st?(0,Z.jsxs)(Rx,{children:[(0,Z.jsxs)(zx,{children:[Ke.icon,` `,A?`Rebuilding`:`${U(j)} Disk…`]}),(0,Z.jsx)(Bx,{children:A?(()=>{let e=yo(Ai(s)-1);return e>ee?`${U(ee)} → ${U(e)}`:`${U(ee)} disks`})():pe>0?Be:`Queued`}),(0,Z.jsxs)(Vx,{children:[Math.floor(tt),`%`]}),(0,Z.jsxs)(Ux,{style:{color:ES(Je),...A&&Qe.projected?{opacity:.55}:null},title:Ze?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&Qe.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&Qe.projected?`~`:``,Xe]}),ot!==`—`&&(0,Z.jsxs)(Hx,{style:Qe.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:Qe.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,Qe.projected?`~`:``,ot]})]}):(0,Z.jsxs)(Fx,{children:[(0,Z.jsxs)(`span`,{children:[Ke.icon,` `,Ke.label,Ue?`…`:``]}),Ke.status&&(0,Z.jsx)(Gx,{children:Ke.status})]}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(tt),"aria-valuemin":0,"aria-valuemax":100})]}),ut=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&ye&&!!Ae||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{ut||_(null)},[ut]);let dt=g===`stream`,ft=null;if(dt){let e=Bi(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=ca(o,e);ft=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:P},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...Ae?[{label:`Upgrade bar drawing`,value:Pe}]:[],{label:`Buffer`,value:`${Math.floor(Le*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...ge&&!ye?[{label:`After Upgrade Bitrate`,value:`${we} (${Te})`}]:[]]}let pt=g===`upgrade`&&!!Ae,mt=pt?[{label:`Draw now`,value:Pe},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${fo(Me)} / ${fo(je)}`},{label:`Time left`,value:Ie},Ae.kind===`speed`?{label:`Bitrate after`,value:lS(w,Ce,`/s`)}:{label:`Capacity after`,value:lS(s.capacity,xe)}]:null;return(0,Z.jsxs)(Sx,{children:[(0,Z.jsx)(Mv,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,Z.jsx)(wx,{children:(0,Z.jsx)(Cx,{children:`🔥 Byte Foundry`})}),(0,Z.jsxs)(Yx,{"aria-label":`Data Stream`,$boosted:z_(s),children:[(0,Z.jsxs)(aS,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:Le,children:[s.mainGameUnlocked&&(0,Z.jsx)(Xx,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,Z.jsxs)(Zx,{children:[(0,Z.jsxs)($x,{children:[(0,Z.jsxs)(eS,{children:[(0,Z.jsx)(tS,{children:(0,Z.jsxs)(`span`,{children:[(0,Z.jsx)(Wb,{children:`🌊`}),`Data Stream`]})}),(0,Z.jsx)(Tx,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:cS(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,Z.jsxs)(rS,{ref:dt?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:ES(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":dt,"aria-controls":dt?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),dt&&(0,Z.jsx)(xx,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:ft})]}),(0,Z.jsx)(wS,{capacityText:uS(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&ye&&(0,Z.jsxs)(oS,{"aria-label":ve?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:ve?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${Se} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,Z.jsxs)(Rx,{children:[(0,Z.jsxs)(zx,{children:[(0,Z.jsx)(Wb,{children:`⏫`}),`Upgrading`,(0,Z.jsx)(Lx,{children:`…`})]}),(0,Z.jsxs)(Bx,{children:[(0,Z.jsx)(Wb,{children:ve?`⚡`:`📦`}),ve?lS(w,Ce,`/s`):lS(s.capacity,xe)]}),(0,Z.jsxs)(Vx,{children:[Math.floor(ke),`%`]}),(0,Z.jsxs)(rS,{ref:pt?y:void 0,$color:ES(Ne),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Pe}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":pt,"aria-controls":pt?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Pe]}),pt&&(0,Z.jsx)(xx,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:Ae.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:mt}),(0,Z.jsxs)(Hx,{children:[`⏳ `,Ie]})]}),(0,Z.jsx)(Wx,{$fill:Math.min(1,Math.max(0,ke/100)),"aria-hidden":`true`}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(ke),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!ye)&&(0,Z.jsxs)(kx,{children:[u&&(0,Z.jsxs)(Q,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:Ee,children:[(0,Z.jsx)($,{children:`🔗 Compile into a Byte`}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!ye&&(0,Z.jsx)(Px,{children:!ye&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`upgrade data stream capacity`,disabled:!I,onClick:n.pickIntroCapacityMilestone,title:I?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity`:`Capacity is already at its maximum`,"aria-description":I?`Costs ${fo(be)}; capacity ${Se} after upgrading`:void 0,type:`button`,variant:I?`prestige`:`neutral`,children:(0,Z.jsxs)(Fx,{children:[(0,Z.jsx)(`span`,{children:`Upgrade Capacity`}),(0,Z.jsx)(Gx,{children:I?`🏷️ ${fo(be)} · 📦 ×2`:`📦 Max capacity`})]})}),(0,Z.jsx)(Q,{"aria-label":`upgrade data stream bitrate`,disabled:!ge,onClick:n.queueIntroSpeedUpgrade,title:ge?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${P} — upgrade Capacity first`,"aria-description":ge?`Costs ${fo(L)}; bitrate ${we} after upgrading`:void 0,type:`button`,variant:ge?`prestige`:`neutral`,children:(0,Z.jsxs)(Fx,{children:[(0,Z.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,Z.jsx)(Gx,{children:ge?`🏷️ ${fo(L)} · ⚡ ${Te}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,Z.jsx)(Ax,{"aria-label":`Provision Disk`,children:lt}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=ba(o,r),a=ma(o,r),c=fa(o,r),l=c>0?hS(a/c*100):0,u=a>=c,d=va(o,r),f=_a(o,r),p=Nx(a,c,i),_=Wc(o,r),v=ce.filter(e=>V(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${uo(U(e))}/s`,D=E(i*d/100*fu(s,r)),O=g===`pool-${r}`,k=null,A=ca(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=ca(o,t);let t=ga(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*ya(o,r))}]:[]]}return(0,Z.jsxs)(Kx,{"aria-label":`pool ${r}`,$boosted:V_(s,r),children:[(0,Z.jsxs)(sS,{$progress:l,children:[(0,Z.jsx)(Xx,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,Z.jsxs)(Zx,{children:[(0,Z.jsxs)($x,{children:[(0,Z.jsxs)(eS,{children:[(0,Z.jsx)(tS,{children:(0,Z.jsxs)(Qx,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,Z.jsxs)(nS,{"aria-hidden":`true`,children:[(0,Z.jsx)(Wb,{children:`💧`}),T]}),(0,Z.jsx)(`span`,{children:`Pool`})]})}),(0,Z.jsx)(mS,{bits:a,poolIndex:r,large:f<=0}),(0,Z.jsxs)(rS,{ref:O?y:void 0,$centered:f<=0&&!p,$color:ES(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,Z.jsx)(xx,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,Z.jsx)(wS,{capacityText:Mo(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,Z.jsx)(qx,{children:(0,Z.jsx)(px,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,Z.jsxs)(Jx,{children:[v.map(e=>(0,Z.jsx)(Ub,{actions:n,size:e,state:o},e)),(0,Z.jsx)(px,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,Z.jsx)(Ex,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},OS=X.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,kS=X.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,AS=X.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,jS=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,MS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,NS=X(th)`
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
`,PS=jm`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,FS=X.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,IS=X.span`
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
`,LS=X.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${PS}
`,RS=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${PS}
`,zS=X(Q)`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${PS}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,BS=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,VS=Object.fromEntries(b.map(e=>[e.id,e])),HS=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=En(n),a=_n(n),o=Cm(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});return(0,Z.jsxs)(OS,{"aria-label":`compute flops screen`,children:[(0,Z.jsxs)(kS,{children:[(0,Z.jsx)(`h1`,{children:`🖥 Compute`}),(0,Z.jsx)(AS,{"aria-label":`cumulative flops boost`,children:kn(i)})]}),!a&&(0,Z.jsxs)(jS,{children:[`Unlocks at `,100,` PP — you have `,z(r),` PP.`]}),(0,Z.jsx)(MS,{"aria-label":`compute flops tiers`,children:lt.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=On(n,e.boostsTierId),d=xn(e,c),f=Sn(n,e.id),p=VS[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(ct*100).toFixed(2);return(0,Z.jsxs)(NS,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,Z.jsxs)(FS,{children:[(0,Z.jsx)(IS,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,Z.jsxs)(LS,{title:`Owned`,children:[(0,Z.jsx)(_g,{children:`Owned: `}),z(c)]})]}),(0,Z.jsxs)(RS,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,Z.jsx)(zS,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${z(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${z(d)} PP for +${g}%/s on ${m}`:`Costs ${z(d)} PP — you have ${z(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,Z.jsxs)($,{children:[z(d),` PP`]})}),h&&(0,Z.jsxs)(BS,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},US=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,WS=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,GS=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,KS=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,qS=X.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,JS=X.div`
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
`,YS=X.div`
  height: 0.6rem;
`,XS=X.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,ZS=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,QS=X.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,$S=X.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,eC=X.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,tC=X.button`
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
`,nC=X.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,rC=X.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,iC=X.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,aC=X.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,oC=X.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,sC=X.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,cC=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,lC=X(cC)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,uC=X(cC)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,dC=X.span`
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
`,fC=X.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,pC=X.div`
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
`,mC=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],hC=(e,t,n)=>e>=8&&t<n,gC=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=mC.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:ou(r)[0]?.queue[0]??1}),o=ou(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=r.computeMergePageUnlocked?i:1,u=(l?mC[l-1]:null)&&(0,Z.jsxs)(Z.Fragment,{children:[!r.computeMergePageUnlocked&&(0,Z.jsx)(fC,{title:`Boosts ${K_(l,`name`)}`,children:`Boosts ${K_(l)}`}),(0,Z.jsx)(pC,{role:`group`,"aria-label":`compute boost`,children:Object.keys(ke).map(e=>{let i=ru(e,l),a=iu(e,l),o=W_[e].label,s=!!su(r,e),c=`×${i} production, ${G_(a)}`;return(0,Z.jsx)(cC,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!mu(n,e,l),onClick:()=>t.activateComputeBoost(e,l),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`${W_[e].icon} ×${i} · ${G_(a)}`})},e)})})]});return(0,Z.jsxs)(US,{children:[s?(0,Z.jsx)(_g,{as:`h1`,children:`⚡ Power`}):(0,Z.jsx)(WS,{children:(0,Z.jsx)(GS,{children:`⚡ Power`})}),s&&(0,Z.jsx)(ov,{actions:t,state:n}),!s&&(0,Z.jsx)(fC,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,Z.jsx)($S,{"aria-label":`boost`,children:u}),r.computeMergePageUnlocked?(0,Z.jsx)(qS,{"aria-label":`compute entities`,children:mC.map((e,i)=>{let o=i+1,s=r[e.countField]??0,d=!!e.autoFlagField,f=d?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=d&&!f&&p>=10,h=d?Qc(n,e.autoFlagField):0,g=d&&!f&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=d?dc(n,e.mergeOutputField):10,S=d&&gl(n,i),C=d?pc(n,o):0,w=d&&hc(n,i),T=d&&_c(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=f?S:hC(s,r[e.mergeOutputField]??0,x),O=d&&(!f||l===o||b||w||D||C>0),k=i>0?mC[i-1]:null,A=mC.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||f||b||l===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let ee=mC[i+1]?.symbol??`⬆`,j=d&&(f?(0,Z.jsx)(lC,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,Z.jsx)(lC,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!hC(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:`${e.symbol} 8→1 ${g?`🔌`:ee}`})})),te=d&&(f?(0,Z.jsx)(dC,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${mi(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${mi(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${mi(y)}`:`🔌 ${C}/8`}):m?(0,Z.jsx)(uC,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${z(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,Z.jsx)($,{children:`🔓 10/10`})}):(0,Z.jsx)(dC,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),M=d&&O;return(0,Z.jsxs)(v.Fragment,{children:[(0,Z.jsxs)(QS,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:l===o,children:[(0,Z.jsxs)(eC,{children:[(0,Z.jsxs)(tC,{type:`button`,onClick:()=>a(o),"aria-pressed":l===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${K_(o,`name`)}`,$selected:l===o,children:[(0,Z.jsx)(aC,{"aria-hidden":`true`,children:e.symbol}),(0,Z.jsxs)(rC,{children:[(0,Z.jsxs)(iC,{children:[(0,Z.jsxs)(nC,{children:[e.label,(0,Z.jsx)(_g,{children:` ${z(E)}/10`})]}),(0,Z.jsxs)(ZS,{"aria-hidden":`true`,children:[`→ `,K_(o)]})]}),(0,Z.jsx)(oC,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,Z.jsx)(sC,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),te&&(0,Z.jsx)(XS,{children:te})]}),l===o&&u]}),M?(0,Z.jsx)(JS,{children:j}):(0,Z.jsx)(YS,{})]},e.key)})}):(0,Z.jsx)(KS,{children:`⬡ ${z(r.computeCores??0)}/10 · 🔗 ${z(r.computeNodes??0)}/10`})]})},_C=X.button.attrs({type:`button`})`
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
`,vC=b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),yC=lt.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{}),bC=e=>vC[e]??yC[e]??e,xC=e=>typeof e==`number`||typeof e==`boolean`||typeof e==`string`,SC=(e,t,n)=>{let[r,...i]=t;return r===`__proto__`||r===`constructor`||r===`prototype`?e:i.length===0?{...e,[r]:n}:{...e,[r]:SC(e[r]??{},i,n)}},CC=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}],wC=e=>CC.find(t=>t.match(e)).id,TC=e=>{if(typeof e!=`string`)return null;let t=e.trim().replace(/[,_\s]/g,``);if(t===``)return null;let n=/^10\^(-?\d+(?:\.\d+)?)$/.exec(t);if(!n&&!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t))return null;let r=n?10**Number(n[1]):Number(t);return Number.isFinite(r)?r:null},EC=(e,t=[])=>e!==null&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype)?Object.entries(e).flatMap(([e,n])=>EC(n,[...t,e])):t.length===0?[]:[{path:t,value:e}],DC=e=>e.map(bC).join(` › `),OC=(e,t)=>{let n=t.trim().toLowerCase();return n===``||e.join(`.`).toLowerCase().includes(n)||DC(e).toLowerCase().includes(n)},kC=X.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,AC=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,jC=X(th)`
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
`,MC=X.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`,NC=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,PC=X.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`,FC=X.div`
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
`,IC=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`,LC=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`,RC=X(Q)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`,zC=X.input`
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
`,BC=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`,VC=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`,HC=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`,UC=X.div`
  display: flex;
  gap: 0.3rem;
`,WC=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`,GC=X(Q)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`,KC=X.span`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
`,qC=X.details`
  border-left: 2px solid ${e=>e.theme.color.border};
  padding-left: 0.6rem;
`,JC=X.summary`
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
`,YC=X.textarea`
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
`,XC=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.good} !important;
  font-size: 0.8rem;
`,ZC=e=>Number.isInteger(e)&&Math.abs(e)<1e4?null:z(e),QC=e=>{let t=Number.isInteger(e),n=[{id:`div10`,label:`÷10`,apply:e=>t?Math.floor(e/10):e/10},{id:`mul10`,label:`×10`,apply:e=>e===0?10:e*10}];return t&&Math.abs(e)<2**53-1&&(n.unshift({id:`minus1`,label:`−1`,apply:e=>Math.max(0,e-1)}),n.push({id:`plus1`,label:`+1`,apply:e=>e+1})),n},$C=({path:e,value:t,label:n,onCommit:r})=>{let[i,a]=(0,v.useState)(null),o=e.join(`.`),s=typeof t==`number`,c=s&&i!==null?TC(i):null,l=s&&i!==null&&c===null,u=i!==null&&!l,d=()=>{u&&(r(e,s?c:i),a(null))},f=s?l?`Not a number (try 1e100, 1,000 or 10^6)`:ZC(c??t):null;return(0,Z.jsxs)(BC,{children:[(0,Z.jsx)(VC,{title:o,children:n}),(0,Z.jsxs)(HC,{children:[(0,Z.jsxs)(UC,{children:[(0,Z.jsx)(zC,{"aria-invalid":l||void 0,"aria-label":o,autoComplete:`off`,enterKeyHint:`done`,inputMode:s?`decimal`:`text`,onBlur:()=>i!==null&&i===String(t)&&a(null),onChange:e=>a(e.target.value),onKeyDown:e=>{e.key===`Enter`&&d(),e.key===`Escape`&&a(null)},spellCheck:!1,type:`text`,value:i??String(t)}),(0,Z.jsx)(GC,{"aria-label":`set ${o}`,disabled:!u,onClick:d,title:`Set (Enter) — Escape reverts`,type:`button`,variant:u?`primary`:`neutral`,children:(0,Z.jsx)($,{children:`✓`})})]}),s&&(0,Z.jsx)(WC,{children:QC(t).map(n=>{let i=n.apply(t);return(0,Z.jsx)(GC,{"aria-label":`${o} ${n.label}`,disabled:!Number.isFinite(i),onClick:()=>{a(null),r(e,i)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:n.label})},n.id)})}),f&&(0,Z.jsx)(KC,{$error:l,children:l?f:`= ${f}`})]})]})},ew=({path:e,value:t,label:n,onCommit:r})=>{let i=e.join(`.`);return typeof t==`boolean`?(0,Z.jsxs)(BC,{children:[(0,Z.jsx)(VC,{title:i,children:n}),(0,Z.jsx)(HC,{children:(0,Z.jsxs)(UC,{children:[(0,Z.jsx)(_C,{$on:t,"aria-label":i,"aria-pressed":t,onClick:()=>r(e,!t)}),(0,Z.jsx)(KC,{children:t?`On`:`Off`})]})})]}):xC(t)?(0,Z.jsx)($C,{label:n,onCommit:r,path:e,value:t}):(0,Z.jsxs)(BC,{children:[(0,Z.jsx)(VC,{title:i,children:n}),(0,Z.jsxs)(KC,{children:[Array.isArray(t)?`[${t.length} item${t.length===1?``:`s`}]`:`not set`,` · edit in raw JSON`]})]})},tw=({path:e,value:t,onCommit:n})=>{let r=bC(e[e.length-1]);if(typeof t!=`object`||!t||Array.isArray(t))return(0,Z.jsx)(ew,{label:r,onCommit:n,path:e,value:t});let i=Object.entries(t);return i.length===0?null:(0,Z.jsxs)(qC,{children:[(0,Z.jsxs)(JC,{children:[r,` (`,i.length,`)`]}),i.map(([t,r])=>(0,Z.jsx)(tw,{onCommit:n,path:[...e,t],value:r},t))]})},nw=[{id:`foundry`,label:`🔥 Foundry`,presets:[{id:`unlock-factory`,label:`🏭 Unlock Byte Factory`,apply:e=>({...e,intro:{...e.intro,mainGameUnlocked:!0}})},{id:`unlock-boosters`,label:`🔧 Unlock Power (Cells)`,apply:e=>({...e,intro:{...e.intro,capacity:Math.max(e.intro?.capacity??0,De)}})}]},{id:`factory`,label:`📶 Factory`,presets:[{id:`near-prestige`,label:`💰 Bits → 99% to Purge`,apply:e=>({...e,resources:{...e.resources,base:A*.99}})},{id:`prestige-ready`,label:`💰 Bits → Purge threshold`,apply:e=>({...e,resources:{...e.resources,base:A}})}]},{id:`purge`,label:`🏆 Purge`,presets:[{id:`grant-1000-pp`,label:`🏆 +1,000 PP`,apply:e=>({...e,purge:{...e.purge,points:(e.purge?.points??0)+1e3}})},{id:`add-prestige`,label:`🏆 +1 Purge count`,apply:e=>Gt({...e,purge:{...e.purge,count:(e.purge?.count??0)+1}})},{id:`unlock-flops`,label:`🖥️ Unlock Compute (Flops)`,apply:e=>({...e,purge:{...e.purge,points:Math.max(e.purge?.points??0,100)},computeFlops:{...e.computeFlops,pageUnlocked:!0}})}]},{id:`era`,label:`⏻ Reboot`,presets:[{id:`era-ready`,label:`🏆 PP → Reboot-ready (1 Googol)`,apply:e=>({...e,purge:{...e.purge,points:ft}})}]}],rw=[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>CC.find(t=>t.id===e)),iw=e=>JSON.stringify(e,null,2),aw=e=>{try{let t=JSON.parse(e);return t!==null&&Object.prototype.toString.call(t)===`[object Object]`&&(Object.getPrototypeOf(t)===null||Object.getPrototypeOf(t)===Object.prototype)?null:`Must be a JSON object`}catch(e){return e.message}},ow=({game:e})=>{let t=e.devModeActive,[n,r]=(0,v.useState)(rw[0].id),[i,a]=(0,v.useState)(``),[o,s]=(0,v.useState)(()=>iw(e.state)),[c,l]=(0,v.useState)(null),[u,d]=(0,v.useState)(0);(0,v.useEffect)(()=>{s(iw(e.state)),l(null)},[t]);let f=(0,v.useMemo)(()=>aw(o),[o]),p=(0,v.useMemo)(()=>Object.keys(e.state).filter(e=>wC(e)===n),[e.state,n]),m=(0,v.useMemo)(()=>i.trim()===``?null:EC(e.state).filter(e=>OC(e.path,i)),[e.state,i]),h=()=>{window.confirm(`Wipe the dev save back to a fresh state?`)&&(e.resetDevState(),l(null),d(e=>e+1))},g=(t,n)=>{e.setDevState(e=>SC(e,t,n))},_=()=>{let t=e.applyDevStateJson(o);t.ok?(l({error:!1,text:`Applied.`}),s(iw(t.state)),d(e=>e+1)):l({error:!0,text:`Could not apply (${t.reason}).`})},y=async()=>{try{await navigator.clipboard.writeText(iw(e.state)),l({error:!1,text:`Copied live state.`})}catch{l({error:!0,text:`Clipboard unavailable.`})}},{state:b}=e,x=[[`Bits`,At(b.resources?.base??0)],[`Purge Points`,`✦ ${z(b.purge?.points??0)}`],[`Purges`,z(b.purge?.count??0)],[`Reboot · Kernels`,`${z(b.era?.count??0)} · ${z(b.eons?.balance??0)}`],[`Capacity`,fo(b.intro?.capacity??0)]];return(0,Z.jsxs)(kC,{children:[(0,Z.jsx)(AC,{children:(0,Z.jsx)(`h1`,{children:`Dev Mode`})}),(0,Z.jsxs)(jC,{"aria-label":`dev save section`,children:[(0,Z.jsxs)(MC,{children:[(0,Z.jsxs)(NC,{children:[(0,Z.jsx)(`strong`,{children:t?`Playing the dev save`:`Playing your real save`}),(0,Z.jsx)(`p`,{children:`A separate sandbox save — enabling never touches real progress; disabling resumes it exactly where you left it.`})]}),(0,Z.jsx)(_C,{$on:t,"aria-label":`dev mode`,"aria-pressed":t,onClick:e.toggleDevMode})]}),t&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(PC,{"aria-label":`dev save readouts`,role:`group`,children:x.map(([e,t])=>(0,Z.jsxs)(FC,{children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),(0,Z.jsx)(IC,{children:(0,Z.jsx)(Q,{"aria-label":`reset dev save`,onClick:h,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`↺ Reset dev save`})})})]})]}),t&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(jC,{"aria-label":`quick seed section`,children:[(0,Z.jsx)(`h2`,{children:`Quick seed`}),(0,Z.jsx)(`p`,{children:`Jump straight to a milestone — applied on top of the current dev save.`}),nw.map(t=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h3`,{children:t.label}),(0,Z.jsx)(IC,{children:t.presets.map(t=>(0,Z.jsx)(Q,{"aria-label":t.label,onClick:()=>{e.setDevState(t.apply),d(e=>e+1)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:t.label})},t.id))})]},t.id))]}),(0,Z.jsxs)(jC,{"aria-label":`variables section`,children:[(0,Z.jsx)(`h2`,{children:`Variables`}),(0,Z.jsxs)(`p`,{children:[`Every field of the live save, grouped like the game's own screens. Switches apply instantly; numbers take `,(0,Z.jsx)(`code`,{children:`1e100`}),`, `,(0,Z.jsx)(`code`,{children:`1,000`}),` or `,(0,Z.jsx)(`code`,{children:`10^6`}),` — press Enter or ✓ to set, or step by powers of ten.`]}),(0,Z.jsx)(zC,{"aria-label":`search variables`,autoComplete:`off`,onChange:e=>a(e.target.value),placeholder:`🔍 Search every field (e.g. Kilobytes, capacity)`,spellCheck:!1,type:`search`,value:i}),m?(0,Z.jsxs)(`div`,{"aria-label":`variable search results`,role:`region`,children:[m.length===0&&(0,Z.jsxs)(KC,{children:[`No field matches “`,i.trim(),`”.`]}),m.slice(0,60).map(e=>(0,Z.jsx)(ew,{label:DC(e.path),onCommit:g,path:e.path,value:e.value},e.path.join(`.`))),m.length>60&&(0,Z.jsxs)(KC,{children:[`+`,m.length-60,` more — refine the search.`]})]},u):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(LC,{role:`tablist`,"aria-label":`variable areas`,children:rw.map(e=>(0,Z.jsx)(RC,{"aria-controls":`dev-variables-panel`,"aria-label":`show ${e.label} variables`,"aria-selected":n===e.id,onClick:()=>r(e.id),role:`tab`,type:`button`,variant:n===e.id?`primary`:`neutral`,children:(0,Z.jsxs)($,{children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]})},e.id))}),(0,Z.jsx)(`div`,{"aria-label":`${n} variables`,id:`dev-variables-panel`,role:`tabpanel`,children:p.map(e=>(0,Z.jsx)(tw,{onCommit:g,path:[e],value:b[e]},e))},u)]})]}),(0,Z.jsx)(jC,{"aria-label":`raw state json section`,children:(0,Z.jsxs)(qC,{children:[(0,Z.jsx)(JC,{children:`Advanced: raw state (JSON)`}),(0,Z.jsxs)(`p`,{children:[`Paste a partial object (e.g. `,(0,Z.jsx)(`code`,{children:`{ "resources": { "base": 1e50 } }`}),`) — missing fields keep their current values. The only way to edit null fields and arrays.`]}),(0,Z.jsx)(YC,{"aria-invalid":!!f||void 0,"aria-label":`dev save state json`,onChange:e=>{s(e.target.value),l(null)},spellCheck:!1,value:o}),f&&(0,Z.jsxs)(XC,{$error:!0,children:[`✕ `,f]}),(0,Z.jsxs)(IC,{children:[(0,Z.jsx)(Q,{"aria-label":`apply json to dev save`,disabled:!!f,onClick:_,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Apply`})}),(0,Z.jsx)(Q,{"aria-label":`refresh json from live state`,onClick:()=>{s(iw(e.state)),l(null)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↻ Load live state`})}),(0,Z.jsx)(Q,{"aria-label":`copy live state json`,onClick:y,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`⧉ Copy`})})]}),c&&(0,Z.jsx)(XC,{$error:c.error,children:c.text})]})})]})]})},sw=`0.5.0`,cw=X.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,lw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,uw=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,dw=X(th)`
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
`,fw=()=>{let e=Wt(b[0].id),t=Wt(b[b.length-1].id),n=B(b[0].id),r=cr({}),i=b[b.length-1].name,a=b[0].name;return(0,Z.jsxs)(cw,{children:[(0,Z.jsxs)(lw,{children:[(0,Z.jsx)(`h1`,{children:`Tens — Manual`}),(0,Z.jsxs)(uw,{children:[`v`,sw]})]}),(0,Z.jsxs)(dw,{"aria-label":`overview section`,children:[(0,Z.jsx)(`h2`,{children:`Overview`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Buy every tier with `,(0,Z.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,Z.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,a,` produce Bytes, which are added to your Bits.`]}),(0,Z.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,Z.jsxs)(`li`,{children:[`Reaching `,(0,Z.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge — unless you have unlocked Overflow mode (see Purge).`]}),(0,Z.jsxs)(`li`,{children:[`Once bought (`,2,` PP on Firmware → ✦ Prestige), the `,(0,Z.jsx)(`strong`,{children:`Buy max`}),` toggle makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})]}),(0,Z.jsxs)(dw,{"aria-label":`prestige ladder section`,children:[(0,Z.jsx)(`h2`,{children:`Prestige ladder`}),(0,Z.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP, the per-cycle Compute (Flops) boost.`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, Overflow mode, the Byte generator, Capacity, Disks, Data Lakes, Compute entities, owned Compute (Flops) units and the System log.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reinstall`}),` — a future layer above Reboot, not yet in the game.`]})]})]}),(0,Z.jsxs)(dw,{"aria-label":`byte foundry section`,children:[(0,Z.jsx)(`h2`,{children:`Byte Foundry`}),(0,Z.jsxs)(`p`,{children:[`Every new save starts here, before any `,a,` exist. Unlocking the main game is permanent — no Purge or Reboot sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,Z.jsx)(`h3`,{children:`The loop`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,fo(Te),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,fo(L(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,we/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,we/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,Z.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,Z.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,Z.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,xe,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-Se)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,a,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,fo(Te),` threshold.`]})]}),(0,Z.jsx)(`h3`,{children:`What resets vs. what stays`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,a,` level.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, every Compute entity, and the main-game unlock. Reboot resets most of this (see Reboot).`]}),(0,Z.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]}),(0,Z.jsx)(`h3`,{children:`Forced priority`}),(0,Z.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Disk Fill → Provision Disk → Compute Boost`}),(0,Z.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]}),(0,Z.jsxs)(dw,{"aria-label":`storage section`,children:[(0,Z.jsx)(`h2`,{children:`Storage`}),(0,Z.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,fo(Te),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,Z.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,Z.jsx)(`h3`,{children:`Provisioning Disks`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,Z.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]}),(0,Z.jsx)(`h3`,{children:`Cache and automatic pulling`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,Z.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,Z.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,Z.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,Z.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,Z.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]}),(0,Z.jsx)(`h3`,{children:`Data Lakes`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,Z.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,Z.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,Z.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,Ne.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,Z.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,Re.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,Z.jsx)(`li`,{children:`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the Reboot cycle — through pool flushes, Reformats and Purges.`})]}),(0,Z.jsx)(`h3`,{children:`Flushing`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,Z.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,Z.jsx)(`li`,{children:`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. The first two flushes also earn Reclamation I and II achievements: each upgrades one of that pool’s two disk-size exponent steps to close 10% of the gap to 1.0. These rewards survive Reformat, Purge, and Reboot. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`}),(0,Z.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})]}),(0,Z.jsxs)(dw,{"aria-label":`power section`,children:[(0,Z.jsx)(`h2`,{children:`Power`}),(0,Z.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,fo(De),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,Z.jsx)(`h3`,{children:`Cells and the charge chain`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,Z.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,Z.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,Z.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,Z.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]}),(0,Z.jsx)(`h3`,{children:`Compute Boost`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,Z.jsxs)(`li`,{children:[`Turbo ×`,ke.burst.multiplier,` for`,` `,mi(ke.burst.durationSeconds),`; Balanced ×`,ke.standard.multiplier,` for`,` `,mi(ke.standard.durationSeconds),`; Eco ×`,ke.sustain.multiplier,` for`,` `,mi(ke.sustain.durationSeconds),`.`]}),(0,Z.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,ke.burst.poolBonusPercent,`% / +`,ke.standard.poolBonusPercent,`% / +`,ke.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,Z.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,Z.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,Z.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,Z.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,Z.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,Z.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,Z.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,Z.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})]}),(0,Z.jsxs)(dw,{"aria-label":`compute flops section`,children:[(0,Z.jsx)(`h2`,{children:`Compute`}),(0,Z.jsxs)(`p`,{children:[`A separate screen (nav `,(0,Z.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,Z.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,ot.toLocaleString(),` PP.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,ot.toLocaleString(),` –`,` `,st.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,Z.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,Z.jsxs)(`li`,{children:[`Each owned unit adds `,(ct*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,Z.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,Z.jsxs)(`li`,{children:[`The header’s `,(0,Z.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,Z.jsx)(`sup`,{children:`n`}),` `,`(`,(0,Z.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,Z.jsxs)(dw,{"aria-label":`accelerate section`,children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,Z.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,Z.jsxs)(`li`,{children:[`Unlocks once `,a,` complete their first level.`]}),(0,Z.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,Z.jsxs)(`li`,{children:[i,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Restage while holding 0 `,i,` (nothing is left producing) to earn Spent QB — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,Z.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,i,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,i,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,Qe.restage,`) spends it for you, every `,$e.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})]}),(0,Z.jsxs)(dw,{"aria-label":`scale up section`,children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,a,` — to claim a Scale Up.`]}),(0,Z.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,Z.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,Z.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,Z.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})]}),(0,Z.jsxs)(dw,{"aria-label":`overclock section`,children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach the required number of completed `,i,` levels to claim an Overclock.`]}),(0,Z.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,Z.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,Z.jsxs)(`li`,{children:[`The first claim needs `,r,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,Z.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})]}),(0,Z.jsxs)(dw,{"aria-label":`tier autobuyers section`,children:[(0,Z.jsx)(`h2`,{children:`Tier Autobuyers`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,Z.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,Z.jsxs)(`li`,{children:[`An autobuyer buys `,(0,Z.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,Z.jsx)(`strong`,{children:`Single`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,et.baseCost,` PP × the same.`]})]})]}),(0,Z.jsxs)(dw,{"aria-label":`milestones section`,children:[(0,Z.jsx)(`h2`,{children:`Milestones`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,e,` (`,a,`) through Purge`,` `,t,` (`,i,`).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,n,`, then every`,` `,`Purge`,` after that.`]}),(0,Z.jsx)(`li`,{children:`More → Milestones tracks your story milestones and Reboot progress.`})]})]}),(0,Z.jsxs)(dw,{"aria-label":`prestige section`,children:[(0,Z.jsx)(`h2`,{children:`Purge`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge, Reboot, Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,Z.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge. Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,Z.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]}),(0,Z.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) at 1 Googol Bytes, plus 1 PP for every`,` `,64,` further powers of ten in your balance. Each Compression upgrade halves the powers needed per PP, and once that reaches 1, doubles the PP per power.`]}),(0,Z.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,Z.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,Z.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,Z.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,qe*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,Z.jsx)(`li`,{children:`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage and Power progress carries over.`}),(0,Z.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})]}),(0,Z.jsxs)(dw,{"aria-label":`sleep mode section`,children:[(0,Z.jsx)(`h2`,{children:`Sleep mode`}),(0,Z.jsx)(`ul`,{children:(0,Z.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,mi(Ve),` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,Ue.map(e=>z(e)).join(` / `),` PP) adds`,` `,mi(He),`, up to `,mi(Be),`. Absences of `,mi(600),` `,`or less run at full speed; longer ones run at`,` `,ze*100,`% speed and show a “Resumed from sleep” summary.`]})})]}),(0,Z.jsxs)(dw,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,ft.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,Z.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel plus `,1,` per Kernel Amplifier level. Ways to spend Kernels are coming in a later update.`]}),(0,Z.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,Z.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,Z.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})]})]})},pw=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,mw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,hw=X(th)`
  gap: 0.4rem;
`,gw=X.ol`
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
`,_w=X.li`
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
`,vw=X.p`
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
`,yw=X.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,bw=({game:e})=>{let{state:t}=e,n=Cm(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=jn(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:mr(t)},{label:`First Reboot`,reached:i>0}];return(0,Z.jsxs)(pw,{children:[(0,Z.jsx)(mw,{children:(0,Z.jsx)(`h1`,{children:`Milestones`})}),(0,Z.jsxs)(hw,{"aria-label":`milestones page`,children:[(0,Z.jsx)(gw,{"aria-label":`milestones category`,children:s.map(e=>(0,Z.jsx)(_w,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),(0,Z.jsxs)(vw,{"aria-label":`reboot status`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,Z.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,Z.jsx)(`strong`,{children:i}),` Reboots`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,Z.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,Z.jsx)(`strong`,{children:a}),` Kernels`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,Z.jsx)(yw,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,Z.jsx)(yw,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${ft.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},xw=({game:e})=>{if(!yi(e.state))return null;let t=!!e.buyMaxMode;return(0,Z.jsx)(_C,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},Sw=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,Cw=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&jm`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,ww=[{id:`level`,unit:!1,icon:`📶`,label:`Level`,title:`Buy level: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Single`,title:`Buy single: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],Tw=({game:e})=>(0,Z.jsx)(Sw,{role:`group`,"aria-label":`buy mode`,children:ww.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,Z.jsx)(Cw,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),Ew=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,Dw=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&jm`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,Ow=({value:e,onChange:t})=>(0,Z.jsx)(Ew,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(ke).map(n=>{let r=W_[n],i=e===n;return(0,Z.jsx)(Dw,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),kw=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Aw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,jw=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,Mw=X.div`
  display: flex;
  gap: 0.5rem;
`,Nw=X(Q)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,Pw=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,Fw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,Iw=X(th)`
  gap: 0.4rem;
`,Lw=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Rw=X.div`
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
`,zw=X.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,Bw=({tier:e})=>(0,Z.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,Z.jsx)(_g,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),Vw=X.div`
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
`,Hw=X.div`
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
`,Uw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Ww=X.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,Gw=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Kw=X.div`
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
`,qw=X.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,Jw=X.span`
  display: flex;
  gap: 4px;
`,Yw=X.button`
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
`,Xw=X.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,Zw=X.div`
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
`,Qw=X.span`
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
`,$w=X.span`
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
`,eT=X.div`
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
`,tT=X.span`
  font-weight: 600;
  min-width: 0;
`,nT=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,rT=X.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,iT=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,aT=X.button`
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
`,oT=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,sT=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,cT=X.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,lT=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,uT=X(Q)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,dT=X.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,fT=(e,t)=>Math.min(100,Math.round(e/t*100)),pT=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=Cm();return(0,Z.jsxs)(sT,{children:[(0,Z.jsx)(dT,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,Z.jsxs)(Z.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},mT=({name:e,icon:t,title:n})=>{let r=Cm();return(0,Z.jsxs)(dT,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},hT=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,Z.jsxs)(uT,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:fT(r,n),$progressColor:t,children:[(0,Z.jsx)(mg,{children:s}),(0,Z.jsx)(hg,{children:c}),(0,Z.jsx)(_g,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),gT=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,Z.jsxs)(Vw,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,Z.jsxs)(Zw,{$narrow:t,$wrap:r,children:[(0,Z.jsxs)(tT,{children:[s&&l&&!i&&(0,Z.jsx)(_g,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,Z.jsx)(rT,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,Z.jsx)(nT,{children:i})),o]}),s&&p&&(0,Z.jsx)(Qw,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,Z.jsx)($w,{$narrow:t,children:y}),s&&l&&(0,Z.jsx)(_C,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,Z.jsx)(eT,{$narrow:t,children:y})]})},_T=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],vT=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,yT=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,bT=e=>String(Number(e.toFixed(2))),xT=e=>`${Number((e/3600).toFixed(1))}h`,ST=e=>{let t=ei(e+1);if(t>1)return`${z(ei(e))} → ${z(t)} PP per extra digit`;let[n,r]=[$r(e),$r(e+1)];return`1 PP per ${z(n)} → ${z(r)} extra digit${r===1?``:`s`}`},CT=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,Z.jsxs)(Rw,{"aria-label":e,children:[(0,Z.jsxs)(iT,{children:[(0,Z.jsx)(tT,{children:(0,Z.jsxs)(aT,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(nT,{children:t}),n]})}),r&&(0,Z.jsx)(lT,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,Z.jsx)(oT,{"aria-label":`${n} description`,children:i})]})},wT=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],TT=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=Cm(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=Hr(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=gr(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=ti(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=tn(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=!yi(n)&&o>=2,T=fn(n),E=mn(T),D=xT(pn(n)),O=xT(pn({...n,sleepModeCapLevel:T+1})),k=xT(He),A=!n.cacheWarmUnlocked&&o>=20,ee=ln(n),j=an({...n,playtimeBonusUnlocked:!0}),te=Oe.some(e=>!!n.intro?.[e.autoFlagField]),M=n.computeAutoChargeEnabled??!0,ne=n.intro?.computeAutoBoostEnabled??!0,re={automation:Rh(n)&&`automation perk available`,prestige:zh(n)&&`prestige perk available`},ie=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,Z.jsx)(hT,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${z(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),P=e=>Mr(n,e.id)?(0,Z.jsxs)(Q,{"aria-label":`Start challenge ${dv(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,Z.jsxs)(Q,{"aria-label":`Challenge ${e.id} ${uv(e).toLowerCase()}`,disabled:!0,title:uv(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),ae=(e,t)=>{let r=Nr(e,t);return r&&!_r(n,r.id)?r:null},oe=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=Bu(e.id)&&r>=Qu()&&!ae(`tierTickspeed`,e.id)&&!ae(`tierAutobuyer`,e.id)});return(0,Z.jsxs)(kw,{children:[(0,Z.jsxs)(Aw,{children:[(0,Z.jsx)(`h1`,{children:`Firmware`}),(0,Z.jsxs)(jw,{"aria-label":`purge points display`,children:[`✦ `,z(o),` PP`]})]}),(0,Z.jsx)(Mw,{role:`tablist`,"aria-label":`firmware view`,children:_T.map(e=>(0,Z.jsxs)(Nw,{"aria-label":e.ariaLabel,"aria-selected":d===e.id,color:d===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),re[e.id]&&(0,Z.jsx)(Pw,{"aria-label":re[e.id]})]},e.id))}),d===`automation`&&(0,Z.jsxs)(Fw,{"aria-label":`automation firmware page`,children:[(0,Z.jsxs)(Iw,{"aria-label":`global automation category`,children:[(0,Z.jsx)(Lw,{children:`Global Automation`}),(0,Z.jsx)(zw,{children:wT.map(e=>{let t=e.owned(n),i=e.enabled(n),a=Xu(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=Ku(e.key),l=Ju(e.key,o),u=Nr(`global`,e.key),d=u&&!_r(n,u.id)?u:null;return(0,Z.jsx)(gT,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,Z.jsx)(pT,{current:s,milestone:fr(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?P(d):ie({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${z(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?yT(qu(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${vT(qu(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})})]}),(0,Z.jsxs)(Iw,{"aria-label":`tier autobuyers category`,children:[(0,Z.jsx)(Lw,{children:`Tier Autobuyers`}),oe?(0,Z.jsx)(Gw,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,Z.jsxs)(Kw,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,Z.jsx)(qw,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,Z.jsx)(Bw,{tier:e})}),(0,Z.jsxs)(Jw,{children:[(0,Z.jsx)(_g,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,Z.jsx)(Yw,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,Z.jsx)(_g,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,Z.jsx)(Yw,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,Z.jsxs)(Uw,{children:[(0,Z.jsxs)(Ww,{"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{children:`Tier`}),(0,Z.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,Z.jsx)(`span`,{children:`🤖 Buy`})]}),b.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=Wt(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=Bu(e.id),d=l>=Fu(e.id),f=a?zu(n,e.id):1,p=Uu(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=Qu(),v=ed(g,e.id),y=ae(`tierTickspeed`,e.id),b=ae(`tierAutobuyer`,e.id);return(0,Z.jsxs)(Hw,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,Z.jsx)(Bw,{tier:e}),(0,Z.jsx)(gT,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(pT,{current:s,milestone:B(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?P(y):ie({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${z(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?yT($u(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${vT($u(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,Z.jsx)(gT,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(pT,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?P(b):ie({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${z(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${z(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:yT(Lu(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${vT(Lu(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),te&&(0,Z.jsxs)(Iw,{"aria-label":`power automation category`,children:[(0,Z.jsx)(Lw,{children:`Power Automation`}),(0,Z.jsxs)(zw,{children:[te&&(0,Z.jsx)(gT,{ariaLabel:`auto-charge row`,enabled:M,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!M),owned:!0,statusTitle:M?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,Z.jsx)(gT,{ariaLabel:`auto boost row`,enabled:ne,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!ne),owned:!0,statusTitle:ne?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,Z.jsxs)(Vw,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,Z.jsx)(Zw,{children:(0,Z.jsx)(tT,{children:`Boost preset`})}),(0,Z.jsx)(Ow,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,Z.jsxs)(Iw,{"aria-label":`compute autobuyers category`,children:[(0,Z.jsx)(Lw,{children:`Compute Autobuyers`}),(0,Z.jsx)(Gw,{"aria-label":`compute autobuyer tiles`,role:`group`,children:lt.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=In(e.id);return(0,Z.jsxs)(Kw,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,Z.jsx)(qw,{$dimmed:!t,children:(0,Z.jsx)(Bw,{tier:e})}),t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(_g,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,Z.jsx)(Yw,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,Z.jsx)(Xw,{children:(0,Z.jsx)(pT,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),d===`prestige`&&(0,Z.jsxs)(Fw,{"aria-label":`prestige firmware page`,children:[(0,Z.jsxs)(Iw,{"aria-label":`purge points category`,children:[(0,Z.jsx)(Lw,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,Z.jsx)(cT,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,Z.jsx)(CT,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${bT(S)}`:`Production ×1 → ×${bT(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,Z.jsx)(mT,{icon:`🚀`,name:`Speed bonus`}):(0,Z.jsx)(hT,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${z(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,Z.jsx)(CT,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at ${ze*100}% speed past 10 min). Each level adds ${k}: ${Ue.map(e=>z(e)).join(` / `)} PP, up to ${xT(Be)}.`,icon:`😴`,name:`Sleep mode`,value:E===null?`Time away: up to ${D}`:`Time away: up to ${D} → ${O}`,children:E===null?(0,Z.jsx)(mT,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,Z.jsx)(hT,{ariaLabel:`Buy Sleep mode level ${T+1} for ${z(E)} Purge Points — +${k} of time away`,color:`#a78bfa`,cost:E,disabled:o<E,icon:`⏫`,label:`${z(E)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,Z.jsx)(CT,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:ST(g),children:(0,Z.jsx)(hT,{ariaLabel:`Buy Compression level ${g+1} for ${z(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${z(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,Z.jsx)(CT,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${ee.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${ee.symbol} level 1 done`:`Start runs with ${ee.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,Z.jsx)(mT,{icon:`🔥`,name:`Cache Warm`}):(0,Z.jsx)(hT,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!A,icon:`🔓`,label:`${z(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,Z.jsx)(CT,{ariaLabel:`playtime bonus upgrade`,details:`+${qe*100}% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${bT(j)}`:`+${qe*100}% production per hour played`,children:n.playtimeBonusUnlocked?(0,Z.jsx)(mT,{icon:`⏱`,name:`Playtime bonus`}):(0,Z.jsx)(hT,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${z(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(0,Z.jsx)(CT,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:mr(n)?null:`Keep producing past 1 Googol Bytes`,children:mr(n)?(0,Z.jsx)(mT,{icon:`♾`,name:`Overflow mode`}):(0,Z.jsx)(dT,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,Z.jsxs)(Iw,{"aria-label":`purchasing category`,children:[(0,Z.jsx)(Lw,{children:`Purchasing`}),(0,Z.jsx)(CT,{ariaLabel:`buy mode toggle`,details:`Level (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Single: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Single they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,Z.jsx)(Tw,{game:e})}),(0,Z.jsx)(CT,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. One-time purchase; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:yi(n)?null:`Buy every affordable level in one tap`,children:yi(n)?(0,Z.jsx)(xw,{game:e}):(0,Z.jsx)(hT,{ariaLabel:`Unlock Buy max for 2 Purge Points`,color:`#38bdf8`,cost:2,disabled:!w,icon:`🔓`,label:`${z(2)} PP`,onClick:r.buyBuyMaxUnlock,points:o,progressLabel:`Buy max unlock PP progress`})})]})]}),(0,Z.jsx)(yb,{def:p?N.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},ET=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),DT=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),OT=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],kT=e=>e&&ET(e)&&Object.keys(e).some(e=>DT.has(e)),AT=e=>{if(!e||!ET(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if(OT.some(t=>{let n=e[t];return n&&ET(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:OT.some(t=>kT(e[t]))?`legacy_tier_ids`:null},jT=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],MT=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],NT=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],PT=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},FT=e=>{let t=PT(e,jT);return t.automationIntervalLevels&&=PT(t.automationIntervalLevels,MT),t.automationAttemptBudgets&&=PT(t.automationAttemptBudgets,MT),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>PT(e,NT))}),t},IT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),LT=e=>{let{saveSchemaVersion:t,...n}=e;return n},RT=e=>{if(!IT(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:LT(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:FT(LT(e))};let t=AT(e);return t?{ok:!1,reason:t}:{ok:!0,payload:FT(e)}},zT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),BT=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),VT=()=>!0,HT=(e,t=VT())=>{if(!t)return RT(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:FT(r)}},UT=`tens_game_state`,WT=`tens_last_save_timestamp`,GT=`tens_saves_meta`,KT=`tens_dev_mode_active`,qT=`dev`,JT=`tens_dev_state`,YT=`tens_dev_timestamp`,XT=`TENS-SUPPORT`,ZT=e=>e===qT?JT:e===`0`?UT:`tens_slot_${e}_state`,QT=e=>e===qT?YT:e===`0`?WT:`tens_slot_${e}_timestamp`,$T=e=>`Save ${e+1}`,eE=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:$T(0)}]}),tE=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),nE=()=>{try{let e=localStorage.getItem(GT);return e?BT(e):null}catch{return null}},rE=e=>{try{localStorage.setItem(GT,JSON.stringify(e))}catch{}},iE=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:$T(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},aE=e=>{let t=eE();if(!zT(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!zT(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():$T(n)})}return iE({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},oE=()=>{let e=aE(nE());return rE(e),e},sE=()=>{try{return localStorage.getItem(KT)===`1`}catch{return!1}},cE=e=>{try{e?localStorage.setItem(KT,`1`):localStorage.removeItem(KT)}catch{}},lE=()=>sE()?qT:oE().activeSlotId,uE=(e=`code`)=>{let t=oE();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=iE({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return rE(n),{ok:!0,meta:n}},dE=e=>{try{return localStorage.getItem(ZT(e))!=null}catch{return!1}},fE=()=>{let e=oE(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??$T(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!dE(i)})}return t},pE=e=>{if(sE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=oE(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return rE(i),{ok:!0,meta:i}},mE=(e,t)=>{let n=String(e),r=oE(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return rE(s),{ok:!0,meta:s}},hE=e=>tE(e)===`TENS-SUPPORT`?uE(`code`):{ok:!1,reason:`invalid`},gE=()=>uE(`dummy_purchase`),_E=()=>{let e=oE();return e.slots.find(t=>t.id===e.activeSlotId)?.name??$T(0)},vE=()=>{let e=oE(),t=_E(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},yE=()=>`Reformat Byte Foundry on "${_E()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,bE=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,xE=()=>`Erase ALL save progress on this device?\n\n${oE().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,SE=e=>{try{localStorage.removeItem(ZT(e)),localStorage.removeItem(QT(e))}catch{}},CE=e=>{if(sE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=oE(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(SE(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},wE=()=>{if(sE())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)SE(String(e));return{ok:!0,meta:oE()}},TE=e=>{try{let t=lE(),n=(e??localStorage).getItem(ZT(t));return n?BT(n):null}catch{return null}},EE=()=>{let e=lE(),t=TE();if(!t)return null;let n=HT(t);return n.ok?null:(SE(e),VT()?null:n.reason)},DE=(e,t)=>({...e,...t??{}}),OE=e=>zT(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),kE=e=>OE(e)&&Array.isArray(e.transfers)?e.transfers.length:0,AE=e=>{let t=e.deposits??{},n=Me.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+kE(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},jE=(e,t)=>{let n=bt(),r={};for(let e of Object.keys(n)){let i=t?.[e];if(OE(i)){n[e]={...n[e],...AE(i)};let t=kE(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},ME=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=je[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},NE=e=>{let t=e,n=xt(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=jE(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return Fr(Gt(wa(Ln({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:DE(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:DE(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:DE(n.owned,t.owned),purchased:DE(n.purchased,t.purchased),purchaseLevels:DE(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:DE(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:DE(n.autobuyers,t.autobuyers),autobuyersEnabled:DE(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:DE(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:DE(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:DE(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:DE(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:DE(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:DE(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:DE(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:DE(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:DE(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:{...n.eonsUpgrades,...t.eonsUpgrades??{}},computeFlopsAutobuyers:DE(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:DE(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:DE(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:ME({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},PE=e=>{let t=lE();try{localStorage.setItem(ZT(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem(QT(t),String(Date.now()))}catch{}},FE=e=>{try{let t=TE(e);if(!t)return null;let n=HT(t);return n.ok?NE(n.payload):null}catch{return null}},IE=()=>{let e=lE();try{let t=localStorage.getItem(QT(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},LE=()=>{sE()?RE():CE(lE())},RE=()=>(SE(qT),{ok:!0}),zE=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=zT(i)&&zT(a)?zE(a,i):i,n},{...e}),BE=(e,t)=>{if(!sE())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=BT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!zT(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...zT(t)?zE(t,n):n};try{localStorage.setItem(JT,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=FE();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},VE=e=>JSON.stringify({saveSchemaVersion:3,...e}),HE=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(xt(),e))||e.resources!==void 0&&!zT(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},UE=e=>{let t;try{t=BT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!zT(t))return{ok:!1,reason:`invalid_json`};let n=HT(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!VT()&&!HE(n.payload))return{ok:!1,reason:`invalid_state`};let r=NE(n.payload);return PE(r),{ok:!0,state:r}},WE=`tens_buy_max_mode`,GE=()=>{try{return localStorage.getItem(WE)===`true`}catch{return!1}},KE=e=>{try{localStorage.setItem(WE,e?`true`:`false`)}catch{}},qE=`tens_buy_unit_mode`,JE=()=>{try{return localStorage.getItem(qE)===`true`}catch{return!1}},YE=e=>{try{localStorage.setItem(qE,e?`true`:`false`)}catch{}},XE=`tens_theme_preference`,ZE=()=>{try{let e=localStorage.getItem(XE);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},QE=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(XE,e)}catch{}},$E;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})($E||={});var eD=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},tD=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,nD=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?tD(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new eD(`"${e}" plugin is not implemented on ${c}`,$E.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new eD(`"${e}.${t}()" is not implemented on ${c}`,$E.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{let r=await n;g({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=eD,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},rD=(e=>e.Capacitor=nD(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),iD=rD.registerPlugin,aD=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new rD.Exception(e,$E.Unimplemented)}unavailable(e=`not available`){return new rD.Exception(e,$E.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},oD=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),sD=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),cD=class extends aD{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=sD(n).trim(),r=sD(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=oD(e.key),n=oD(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};iD(`CapacitorCookies`,{web:()=>new cD});var lD=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),uD=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},dD=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,fD=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=uD(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},pD=class extends aD{async request(e){let t=fD(e,e.webFetchExtra),n=dD(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await lD(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};iD(`CapacitorHttp`,{web:()=>new pD});var mD;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(mD||={});var hD;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(hD||={});var gD=class extends aD{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};iD(`SystemBars`,{web:()=>new gD});var _D=`https://mohanpednekar.github.io/tens/`,vD=`${_D}privacy.html`,yD=`${_D}terms.html`,bD=X(th)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,xD=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,SD=X.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,CD=X.input`
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
`,wD=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,TD=X.textarea`
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
`,ED={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},DD=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:ED[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,Z.jsxs)(bD,{"aria-label":`manual save section`,children:[(0,Z.jsx)(`h2`,{children:`Backup / Restore`}),(0,Z.jsx)(TD,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,Z.jsxs)(xD,{children:[(0,Z.jsx)(Q,{onClick:o,type:`button`,children:(0,Z.jsx)($,{children:`Copy save`})}),(0,Z.jsx)(Q,{onClick:s,type:`button`,children:(0,Z.jsx)($,{children:`Download file`})}),(0,Z.jsx)(Q,{onClick:()=>a.current?.click(),type:`button`,children:(0,Z.jsx)($,{children:`Choose file…`})}),(0,Z.jsx)(Q,{onClick:()=>c(t),type:`button`,children:(0,Z.jsx)($,{children:`Import`})}),(0,Z.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,Z.jsx)(wD,{$error:r.error,children:r.text})]})},OD=X.div`
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
`,kD=()=>(0,Z.jsxs)(bD,{"aria-label":`legal section`,children:[(0,Z.jsx)(`h2`,{children:`Legal`}),(0,Z.jsxs)(OD,{children:[(0,Z.jsx)(`a`,{href:vD,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,Z.jsx)(`a`,{href:yD,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),AD={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},jD=({service:e=wv()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,Z.jsxs)(bD,{"aria-label":`store section`,children:[(0,Z.jsx)(`h2`,{children:`Store`}),(0,Z.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,Z.jsxs)(xD,{children:[(0,Z.jsx)(Q,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),AD.removeAds),type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,Z.jsx)(Q,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),AD.supportTip),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Leave a tip`})}),(0,Z.jsx)(Q,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,Z.jsx)($,{children:`Restore purchases`})})]}),a&&(0,Z.jsx)(wD,{$error:a.error,children:a.text})]})},MD=X.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,ND=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,PD=X(xD)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,FD=X.div`
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
`,ID=X.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,LD=X.li`
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
`,RD=X.svg`
  display: block;
  height: 64px;
  width: 100%;
`,zD=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,BD=X.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,VD=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},HD=X.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,UD=X.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,WD=({label:e,danger:t=!1,children:n})=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(HD,{$danger:t,children:e}),(0,Z.jsx)(UD,{children:n})]}),GD=X.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,KD=jm`
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
`,qD=X.button`
  ${KD}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,JD=X.div`
  ${KD}
`,YD=X.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,XD=X.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ZD=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,QD=X.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,$D=X.div`
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
`,eO=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,Z.jsx)(GD,{children:(0,Z.jsxs)(JD,{$danger:r,children:[(0,Z.jsx)(YD,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(XD,{children:t}),i]})}):(0,Z.jsxs)(GD,{children:[(0,Z.jsxs)(qD,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(YD,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(XD,{children:t}),n!=null&&n!==``&&(0,Z.jsx)(ZD,{children:n}),(0,Z.jsx)(QD,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,Z.jsx)($D,{children:a})]})},tO=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=Hr(e.state),o=!!e.devModeActive,s=!!e.savesMeta?.supporterUnlocked,[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(null),[f,p]=(0,v.useState)(!1),m=e.state.era?.count??0,h=e.state.eons?.balance??0,g=jn(e.state),_=Mn(e.state),y=e.state.purge?.points??0,b=e=>e===1?`Kernel`:`Kernels`,x=e.state.prestigeMuseum??{history:[],pinnedIds:[]},S=new Set(x.pinnedIds??[]),C=x.history??[],w=C.filter(e=>S.has(e.id)),T=s?C:C.slice(0,1),E=t=>{t.preventDefault();let n=e.redeemUnlockCode(c);n.ok?(l(``),d({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):d({error:!0,text:`That code is not valid.`})},D=()=>{let t=e.purchaseSupporterDummy();d({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},O=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},k=t=>{o||a&&t.isActive||window.confirm(bE(t))&&e.clearSlot(t.id)},A=()=>{a||o||window.confirm(xE())&&e.eraseAllSaveProgress()},ee=()=>{jn(e.state)&&(e.actions.eraAscend(),p(!1))},j=!!wv().iapAvailable,te=VD(e.opsSamples??[],`money`),M=VD(e.opsSamples??[],`prestigePoints`);return(0,Z.jsxs)(MD,{children:[(0,Z.jsx)(ND,{children:(0,Z.jsx)(`h1`,{children:`Settings`})}),(0,Z.jsxs)(WD,{label:`Game`,children:[(0,Z.jsx)(eO,{icon:`💛`,label:`Supporter`,value:s?`Unlocked`:`Free`,children:(0,Z.jsxs)(bD,{"aria-label":`supporter pack section`,children:[(0,Z.jsx)(`h2`,{children:`Supporter pack`}),(0,Z.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),s?(0,Z.jsxs)(wD,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(zD,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,Z.jsx)(`code`,{children:XT})]}),(0,Z.jsxs)(SD,{onSubmit:E,children:[(0,Z.jsx)(CD,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>l(e.target.value),placeholder:`Enter unlock code`,value:c}),(0,Z.jsx)(Q,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,Z.jsx)($,{children:`Redeem code`})})]}),(0,Z.jsx)(Q,{"aria-label":`dummy supporter checkout`,onClick:D,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Dummy checkout (free)`})})]}),u&&(0,Z.jsx)(wD,{$error:u.error,children:u.text})]})}),(0,Z.jsx)(eO,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,Z.jsxs)(bD,{"aria-label":`save slots section`,children:[(0,Z.jsx)(`h2`,{children:`Save slots`}),(0,Z.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),o&&(0,Z.jsx)(zD,{children:`Dev Mode is active — Play/Clear are disabled here so a dev-only session can't touch a real save. Disable Dev Mode first.`}),(e.saveSlots??[]).map(t=>(0,Z.jsxs)(PD,{$active:t.isActive,children:[(0,Z.jsxs)(FD,{children:[(0,Z.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,Z.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,Z.jsxs)(xD,{children:[!t.isActive&&(0,Z.jsx)(Q,{"aria-label":`switch to ${t.name}`,disabled:o,onClick:()=>e.switchSaveSlot(t.id),title:o?`Disable Dev Mode first`:void 0,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Play`})}),(0,Z.jsx)(Q,{"aria-label":`rename ${t.name}`,onClick:()=>O(t),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Rename`})}),(0,Z.jsx)(Q,{"aria-label":`clear ${t.name}`,disabled:o||a&&t.isActive,onClick:()=>k(t),title:o?`Disable Dev Mode first`:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Clear…`})})]})]},t.id))]})}),(0,Z.jsx)(eO,{icon:`⏻`,label:`Reboot`,value:`${h} ${b(h)}`,children:(0,Z.jsxs)(bD,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,Z.jsxs)(xD,{children:[(0,Z.jsx)(`span`,{children:`Reboots`}),(0,Z.jsx)(`strong`,{children:m})]}),(0,Z.jsxs)(xD,{children:[(0,Z.jsx)(`span`,{children:`Kernels`}),(0,Z.jsxs)(`strong`,{children:[h,` `,b(h)]})]}),(0,Z.jsx)(`p`,{children:g?`Ready — next Reboot awards ${_} ${b(_)}.`:`Requires 1 Googol PP unspent (you have ${z(y)} PP).`}),(0,Z.jsx)(Q,{"aria-label":g?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!g,onClick:()=>p(!0),type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⏻ Reboot…`})})]})}),(0,Z.jsx)(eO,{icon:`📜`,label:`System log`,value:s?`${C.length}`:`🔒`,children:(0,Z.jsxs)(bD,{"aria-label":`system log section`,children:[(0,Z.jsx)(`h2`,{children:`System log`}),s?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),w.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(zD,{children:`Pinned`}),(0,Z.jsx)(ID,{"aria-label":`pinned purge entries`,children:w.map(t=>(0,Z.jsxs)(LD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,Nt(t.moneyBits)]})})]}),(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,Z.jsx)(zD,{children:`Recent history`}),T.length===0?(0,Z.jsx)(zD,{children:`No purges recorded yet.`}):(0,Z.jsx)(ID,{"aria-label":`system log history`,children:T.map(t=>(0,Z.jsxs)(LD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,At(t.moneyBits)]})})]}),S.has(t.id)?(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})}):(0,Z.jsx)(Q,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:S.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Pin`})})]},t.id))})]}):(0,Z.jsxs)(zD,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,C.length>0&&` Latest: Purge #${C[0].purgeNumber} (+${C[0].pointsAwarded} PP).`]})]})}),(0,Z.jsx)(eO,{icon:`📈`,label:`Task Manager`,value:s?null:`🔒`,children:(0,Z.jsxs)(bD,{"aria-label":`task manager section`,children:[(0,Z.jsx)(`h2`,{children:`Task Manager`}),s?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,Nt(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,Z.jsx)(zD,{children:`Bits`}),(0,Z.jsx)(RD,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:te||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,Z.jsx)(zD,{children:`Purge Points`}),(0,Z.jsx)(RD,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:M||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,Z.jsx)(zD,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,Z.jsxs)(WD,{label:`Data`,children:[!1,(0,Z.jsx)(eO,{icon:`🗄`,label:`Backup / Restore`,children:(0,Z.jsx)(DD,{game:e})}),j&&(0,Z.jsx)(eO,{icon:`🛒`,label:`Store`,children:(0,Z.jsx)(jD,{})}),(0,Z.jsx)(eO,{icon:`ℹ`,label:`About`,children:(0,Z.jsxs)(bD,{"aria-label":`about section`,children:[(0,Z.jsx)(`h2`,{children:`About`}),(0,Z.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,Z.jsx)(eO,{icon:`⚖`,label:`Legal`,children:(0,Z.jsx)(kD,{})})]}),(0,Z.jsx)(WD,{label:`Display`,children:(0,Z.jsx)(eO,{icon:`🎨`,inline:(0,Z.jsx)(BD,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,Z.jsx)(Q,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,Z.jsx)($,{children:t})},e))}),label:`Theme`})}),(0,Z.jsx)(WD,{danger:!0,label:`Danger zone`,children:(0,Z.jsx)(eO,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,Z.jsxs)(bD,{"aria-label":`danger zone`,children:[(0,Z.jsx)(`h2`,{children:`Danger zone`}),(0,Z.jsxs)(`p`,{children:[`Erase the `,(0,Z.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reset active save…`}),(0,Z.jsx)(_g,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,Z.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reformat Byte Foundry…`}),(0,Z.jsx)(_g,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,Z.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,Z.jsx)(Q,{"aria-label":`Erase all save progress`,disabled:a||o,onClick:A,title:o?`Disable Dev Mode first`:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Erase all save progress…`})})]})})}),(0,Z.jsxs)(I_,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>p(!1),onConfirm:ee,open:f,title:`Reboot?`,children:[(0,Z.jsxs)(`p`,{children:[`Awards `,_,` `,b(_),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},nO=2**53-1,rO=e=>e?si:nO,iO=2,aO=(e,t,n=nO)=>{let r=e>0?ui(e,pn(t)):0;return r<=0?null:{state:di(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:pn(t)}:null}},oO=()=>{oE();let e=EE(),t=FE();if(!t)return{state:xt(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=IE(),r=aO(n?(Date.now()-n)/1e3:0,t,rO(JE()))??{state:t,offlineProgress:null};return{...r,state:vn(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},sO=()=>{let[e]=(0,v.useState)(oO),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>oE()),[l,u]=(0,v.useState)(()=>fE()),[d,f]=(0,v.useState)(()=>sE()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(oE()),u(fE())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>iO){let r=pn(y.current),a=ui(t,r);if(a>0){n(e=>di(t,rO(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=li(r,rO(D.current))(e);return document.visibilityState===`visible`?gn(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>O_(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{PE(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,We);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)(GE),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,KE(!!e),S(!!e)},[]),[T,E]=(0,v.useState)(JE),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,YE(!!e),E(!!e)},[]),k=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&yi(n)?t:e)(n));return{buyTierQuantity:t=>D.current?n(e=>vi(t,1)(e)):e(vi(t,nO),Ti(t)),buyTickspeedMultiplier:t=>e(Nu(t),xi(Nu(t))),buyAutobuyerIntervalUpgrade:e=>n(Wu(e)),buyAutomationIntervalUpgrade:e=>n(Zu(e)),buyTierTickspeedIntervalUpgrade:e=>n(td(e)),setAutoOverclockEnabled:e=>n(q(e)),startComputeCharge:e=>n(vc(e)),setComputeAutoChargeEnabled:e=>n(K(e)),buyGlobalTickspeedMultiplier:()=>e(id,xi(id)),buyPlaytimeBonus:()=>n(on),buyBuyMaxUnlock:()=>n(sn),buyCacheWarm:()=>n(cn),buySleepModeCapUpgrade:()=>e(hn,xi(hn)),buyPrestigeSpeedBonus:()=>n(rn),buyPrestigeDoublePp:()=>e(er,xi(er)),buyComputeFlopsTier:t=>e(wn(t),xi(wn(t))),buyHyperscaler:()=>n(Fn),eraAscend:()=>n($n),enterChallenge:e=>n(fd(e)),exitChallenge:()=>n(pd),purge:()=>n(dd),dailyStart:e=>n(w_(e,Date.now())),dailyForfeit:e=>n(T_(e)),dailyRestart:e=>n(D_(e,Date.now())),dailyPlay:(e,t,r)=>n(k_(e,t,r,Date.now())),scaleUp:()=>n(yd),overclock:()=>n(bd),setComputeAutoBoostEnabled:e=>n(Tu(e)),setComputeAutoBoostType:e=>n(Eu(e)),consumeXpForLastTierTickspeed:e=>n(Od(e)),setAutoScaleUpEnabled:e=>n(Td(e)),setAutoXpTickspeedEnabled:e=>n(wd(e)),setAutoGlobalTickspeedEnabled:e=>n(Ed(e)),setAutoPurgeEnabled:e=>n(rd(e)),setAutobuyerEnabled:(e,t)=>n(Ou(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(nd(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(Rn(e,t)),tapIntroBit:()=>n(Ji),tapPoolBuffer:e=>n(xa(e)),combineIntroByte:()=>n(Yi),pickIntroCapacityMilestone:()=>n(za),queueIntroSpeedUpgrade:()=>n(La),unlockNextDiskSize:()=>n(To),clearIntroCapacityUpgradeQueue:()=>n(Ha),convertIntroBitsToKilobytes:()=>n(ho),provisionDisk:()=>n(zo),queueDiskBuild:()=>n(W),clearDiskBuildQueue:()=>n(Bo),expediteDiskFill:e=>n(ss(e)),doubleDataLakeCapacity:e=>n(Xc(e)),activateComputeBoost:(e,t)=>n(Su(e,t)),stackComputeBoost:e=>n(Cu(e)),reclaimComputeBoost:e=>n(yu(e)),forfeitComputeBoost:e=>n(xu(e)),mergeComputeCoresIntoNode:()=>n(el),mergeComputeNodesIntoCluster:()=>n(tl),mergeComputeClustersIntoNetwork:()=>n(nl),mergeComputeNetworksIntoGrid:()=>n(rl),mergeComputeGridsIntoFabric:()=>n(il),mergeComputeFabricsIntoCloud:()=>n(al),mergeComputeCloudsIntoDatacenter:()=>n(ol),mergeComputeDatacentersIntoSupercomputer:()=>n(sl),mergeComputeSupercomputersIntoMegacomputer:()=>n(cl),enableAutoMergeCoresIntoNode:()=>n(yl),enableAutoMergeNodesIntoCluster:()=>n(Cl),enableAutoMergeClustersIntoNetwork:()=>n(Dl),enableAutoMergeNetworksIntoGrid:()=>n(jl),enableAutoMergeGridsIntoFabric:()=>n(Fl),enableAutoMergeFabricsIntoCloud:()=>n(zl),enableAutoMergeCloudsIntoDatacenter:()=>n(Ul),enableAutoMergeDatacentersIntoSupercomputer:()=>n(ql),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(Zl),startComputeCoresMerge:()=>n(xl),startComputeNodesMerge:()=>n(Tl),startComputeClustersMerge:()=>n(kl),startComputeNetworksMerge:()=>n(Nl),startComputeGridsMerge:()=>n(Ll),startComputeFabricsMerge:()=>n(Vl),startComputeCloudsMerge:()=>n(Gl),startComputeDatacentersMerge:()=>n(Yl),startComputeSupercomputersMerge:()=>n($l),startDataLakeAutoConvert:e=>n(Nc(e)),flushStoragePool:e=>n(Mc(e)),pinMuseumEntry:e=>n(hd(e)),unpinMuseumEntry:e=>n(gd(e))}},[]),A=(0,v.useCallback)(()=>{LE(),_(null),n(xt()),i(null),o(null),m([]),b()},[b]),ee=(0,v.useCallback)(()=>{n(ud)},[]),j=(0,v.useCallback)(e=>{let t=CE(e);return t.ok&&(t.clearedActive&&(_(null),n(xt()),i(null),o(null),m([])),b()),t},[b]),te=(0,v.useCallback)(()=>{let e=wE();return e.ok&&(_(null),n(xt()),i(null),o(null),m([]),b()),e},[b]),M=(0,v.useCallback)(()=>i(null),[]),N=(0,v.useRef)(new WeakSet),ne=(0,v.useCallback)(e=>!e||e.rewardClaimed||N.current.has(e)?!1:(N.current.add(e),n(t=>pi(e.elapsedRealSeconds,rO(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+fi(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),re=(0,v.useCallback)(()=>o(null),[]),ie=(0,v.useCallback)(e=>{PE(y.current);let t=pE(e);if(!t.ok)return t;if(t.already)return b(),t;let r=EE(),a=FE()??xt(),s=IE(),c=aO(s?(Date.now()-s)/1e3:0,a,rO(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),P=(0,v.useCallback)(()=>{PE(y.current);let e=!sE();cE(e),f(e);let t=EE(),r=FE();_(r),n(r??xt()),i(null),o(t),m([]),b()},[b]),ae=(0,v.useCallback)(()=>{sE()&&(RE(),_(null),n(xt()),i(null),o(null),m([]))},[]),oe=(0,v.useCallback)(e=>{let t=BE(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),se=(0,v.useCallback)(e=>{sE()&&n(t=>wa(e(t)))},[]),ce=(0,v.useCallback)(()=>VE(y.current),[]),le=(0,v.useCallback)(e=>{let t=UE(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),ue=(0,v.useCallback)((e,t)=>{let n=mE(e,t);return n.ok&&b(),n},[b]),de=(0,v.useCallback)(e=>{let t=hE(e);return t.ok&&b(),t},[b]);return{actions:k,applyCloudSave:le,applyDevStateJson:oe,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:ne,clearSlot:j,devModeActive:d,dismissIncompatibleSaveNotice:re,dismissOfflineProgress:M,eraseAllSaveProgress:te,exportSaveJson:ce,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=gE();return e.ok&&b(),e},[b]),redeemUnlockCode:de,renameSaveSlot:ue,resetByteFoundry:ee,resetDevState:ae,resetGame:A,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:se,state:t,switchSaveSlot:ie,toggleDevMode:P}},cO=Fm`
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
`,lO={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},uO={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},dO={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},fO={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},pO={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},mO={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},hO={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},gO={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},_O=[`dark`,`light`],vO=`dark`,yO=e=>{let t=_O.includes(e)?e:vO;return{mode:t,color:lO[t],shadow:uO[t],tierAccents:dO[t],space:fO,radius:pO,motion:mO,font:hO,type:gO}},bO={dark:yO(`dark`),light:yO(`light`)},xO=()=>typeof window>`u`||typeof window.matchMedia!=`function`?vO:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,SO=e=>e===`light`||e===`dark`?e:xO(),CO=({mode:e=vO,children:t})=>(0,Z.jsx)(wm,{theme:bO[e]??bO.dark,children:t}),wO=()=>SO(ZE()),TO=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`settings`,`dev`]),EO=X.div`
  padding-bottom: ${ag};
`;function DO(){let e=sO(),[t,n]=(0,v.useState)(ZE),[r,i]=(0,v.useState)(wO),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!TO.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=Zc(e.state),b=_n(e.state),x=h,S=h&&bi(e.state),C=S,w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{Hr(e.state)||window.confirm(vE())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{Hr(e.state)||window.confirm(yE())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(SO(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{QE(e),n(e),i(SO(e))},O;O=g?(0,Z.jsx)(DS,{focusNonce:p,game:e}):a===`info`?(0,Z.jsx)(fw,{}):a===`boosters`?(0,Z.jsx)(gC,{game:e}):a===`compute`?(0,Z.jsx)(HS,{game:e}):a===`perks`&&S?(0,Z.jsx)(TT,{focusNonce:l,game:e}):a===`challenges`&&C?(0,Z.jsx)(Eb,{focusNonce:d,game:e}):a===`milestones`?(0,Z.jsx)(bw,{game:e}):a===`achievements`&&ue.enabled?(0,Z.jsx)(gh,{game:e}):a===`dev`?(0,Z.jsx)(ow,{game:e}):a===`settings`?(0,Z.jsx)(tO,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,Z.jsx)(Ny,{game:e});let k=Xh(e.state);return(0,Z.jsxs)(CO,{mode:r,children:[(0,Z.jsx)(cO,{}),(0,Z.jsx)(EO,{children:O}),(0,Z.jsx)(ig,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,Z.jsx)(eh,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,Z.jsx)(Jm,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,Z.jsx)(Sg,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})}var OO=`modulepreload`,kO=function(e){return`/tens/dev/`+e},AO={},jO=function(e){return e.pathname.endsWith(`.css`)},MO=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},NO=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=kO(t,n);let r=s(t),i=jO(r);return MO(AO,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:OO,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},PO=e=>{e&&e instanceof Function&&NO(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},FO=document.getElementById(`root`);if(!FO)throw Error(`Root element not found`);(0,y.createRoot)(FO).render((0,Z.jsx)(v.StrictMode,{children:(0,Z.jsx)(DO,{})})),PO();