var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=`dev:`)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function te(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=M(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(te(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function N(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var re=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ie(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,re)}catch(e){re(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function P(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ie(P.bind(null,e))}var ae={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ae,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=P,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ie,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),ee=Symbol.for(`react.fragment`),j=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),M=Symbol.for(`react.consumer`),N=Symbol.for(`react.context`),ne=Symbol.for(`react.forward_ref`),re=Symbol.for(`react.suspense`),ie=Symbol.for(`react.suspense_list`),P=Symbol.for(`react.memo`),ae=Symbol.for(`react.lazy`),oe=Symbol.for(`react.activity`),se=Symbol.for(`react.legacy_hidden`),ce=Symbol.for(`react.memo_cache_sentinel`),le=Symbol.for(`react.view_transition`),ue=Symbol.for(`react.recoverable`),de=Symbol.iterator;function fe(e){return typeof e!=`object`||!e?null:(e=de&&e[de]||e[`@@iterator`],typeof e==`function`?e:null)}var pe=Symbol.for(`react.client.reference`);function me(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ee:return`Fragment`;case te:return`Profiler`;case j:return`StrictMode`;case re:return`Suspense`;case ie:return`SuspenseList`;case oe:return`Activity`;case le:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case N:return e.displayName||`Context`;case M:return(e._context.displayName||`Context`)+`.Consumer`;case ne:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case P:return t=e.displayName||null,t===null?me(e.type)||`Memo`:t;case ae:t=e._payload,e=e._init;try{return me(e(t))}catch{}}return null}var he=Array.isArray,F=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ge={pending:!1,data:null,method:null,action:null},_e=[],ve=-1;function ye(e){return{current:e}}function be(e){0>ve||(e.current=_e[ve],_e[ve]=null,ve--)}function xe(e,t){ve++,_e[ve]=e.current,e.current=t}var Se=ye(null),Ce=ye(null),we=ye(null),Te=ye(null);function Ee(e,t){switch(xe(we,t),xe(Ce,e),xe(Se,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?fp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=fp(t),e=pp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}be(Se),xe(Se,e)}function De(){be(Se),be(Ce),be(we)}function Oe(e){var t=e.memoizedState;t!==null&&(lh._currentValue=t.memoizedState,xe(Te,e)),t=Se.current;var n=pp(t,e.type);t!==n&&(xe(Ce,e),xe(Se,n))}function ke(e){Ce.current===e&&(be(Se),be(Ce)),Te.current===e&&(be(Te),lh._currentValue=ge)}var Ae,L;function je(e){if(Ae===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ae=t&&t[1]||``,L=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ae+e+L}var Me=!1;function Ne(e,t){if(!e||Me)return``;Me=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Me=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?je(n):``}function Pe(e,t){switch(e.tag){case 26:case 27:case 5:return je(e.type);case 16:return je(`Lazy`);case 13:return e.child!==t&&t!==null?je(`Suspense Fallback`):je(`Suspense`);case 19:return je(`SuspenseList`);case 0:case 15:return Ne(e.type,!1);case 11:return Ne(e.type.render,!1);case 1:return Ne(e.type,!0);case 31:return je(`Activity`);case 30:return je(`ViewTransition`);default:return``}}function Fe(e){try{var t=``,n=null;do t+=Pe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ie=Object.prototype.hasOwnProperty,Le=t.unstable_scheduleCallback,Re=t.unstable_cancelCallback,ze=t.unstable_shouldYield,Be=t.unstable_requestPaint,Ve=t.unstable_now,He=t.unstable_getCurrentPriorityLevel,Ue=t.unstable_ImmediatePriority,We=t.unstable_UserBlockingPriority,Ge=t.unstable_NormalPriority,Ke=t.unstable_LowPriority,qe=t.unstable_IdlePriority,Je=t.log,Ye=t.unstable_setDisableYieldValue,Xe=null,Ze=null;function Qe(e){if(typeof Je==`function`&&Ye(e),Ze&&typeof Ze.setStrictMode==`function`)try{Ze.setStrictMode(Xe,e)}catch{}}var $e=Math.clz32?Math.clz32:nt,et=Math.log,tt=Math.LN2;function nt(e){return e>>>=0,e===0?32:31-(et(e)/tt|0)|0}var rt=256,it=262144,at=4194304;function ot(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function st(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ot(n))):i=ot(o):i=ot(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ot(n))):i=ot(o)):i=ot(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ct(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function lt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-$e(n),i=1<<r;t|=e[r],n&=~i}return t}function ut(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dt(){var e=at;return at<<=1,!(at&62914560)&&(at=4194304),e}function ft(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function pt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function mt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-$e(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ht(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ht(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-$e(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function gt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-$e(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function _t(e,t){var n=t&-t;return n=n&42?1:vt(n),(n&(e.suspendedLanes|t))===0?n:0}function vt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function yt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function bt(){var e=I.p;return e===0?(e=window.event,e===void 0?32:Th(e.type)):e}function xt(e,t){var n=I.p;try{return I.p=e,t()}finally{I.p=n}}var St=Math.random().toString(36).slice(2),Ct=`__reactFiber$`+St,wt=`__reactProps$`+St,Tt=`__reactContainer$`+St,Et=`__reactEvents$`+St,Dt=`__reactListeners$`+St,R=`__reactHandles$`+St,Ot=`__reactResources$`+St,kt=`__reactMarker$`+St,At=`__reactLoad$`+St;function jt(e){delete e[Ct],delete e[wt],delete e[Dt],delete e[R]}function Mt(e){var t;if(t=e[Ct])return t;for(var n=e.parentNode;n;){if(t=n[Tt]||n[Ct]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=mm(e);e!==null;){if(n=e[Ct])return n;e=mm(e)}return t}e=n,n=e.parentNode}return null}function Nt(e){if(e=e[Ct]||e[Tt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Pt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ft(e){var t=e[Ot];return t||=e[Ot]={hoistableStyles:new Map,hoistableScripts:new Map},t}function It(e){e[kt]=!0}function Lt(e){e[At]=void 0}var Rt=new Set,zt={};function Bt(e,t){Vt(e,t),Vt(e+`Capture`,t)}function Vt(e,t){for(zt[e]=t,e=0;e<t.length;e++)Rt.add(t[e])}var Ht=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ut={},Wt={};function Gt(e){return Ie.call(Wt,e)?!0:Ie.call(Ut,e)?!1:Ht.test(e)?Wt[e]=!0:(Ut[e]=!0,!1)}var Kt=!1;function qt(){var e=Kt;return Kt=!1,e}function Jt(e,t,n){if(Gt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Yt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Xt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Zt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Qt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function $t(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function en(e){if(!e._valueTracker){var t=Qt(e)?`checked`:`value`;e._valueTracker=$t(e,t,``+e[t])}}function tn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Qt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var nn=/[\n"\\]/g;function rn(e){return e.replace(nn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function an(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Zt(t)):e.value!==``+Zt(t)&&(e.value=``+Zt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):sn(e,Zt(n)):o===`number`&&e.value==t?sn(e,Zt(e.value)):sn(e,Zt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Zt(s):e.removeAttribute(`name`)}function on(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){en(e);return}n=n==null?``:``+Zt(n),t=t==null?n:``+Zt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),en(e)}function sn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function cn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Zt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ln(e,t,n){t!=null&&(t=``+Zt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Zt(n)}function un(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(he(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Zt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),en(e)}function dn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var fn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function pn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||fn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function mn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,Kt=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(pn(e,a,r),Kt=!0)}else for(var o in t)t.hasOwnProperty(o)&&pn(e,o,t[o])}function hn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var gn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),_n=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function vn(e){return _n.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function yn(){}var bn=null;function xn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Sn=null,Cn=null;function wn(e){var t=Nt(e);if(t&&(e=t.stateNode)){var n=e[wt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(an(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+rn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[wt]||null;if(!a)throw Error(i(90));an(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&tn(r)}break a;case`textarea`:ln(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&cn(e,!!n.multiple,t,!1)}}}var Tn=!1;function En(e,t,n){if(Tn)return e(t,n);Tn=!0;try{return e(t)}finally{if(Tn=!1,(Sn!==null||Cn!==null)&&(Bd(),Sn&&(t=Sn,e=Cn,Cn=Sn=null,wn(t),e)))for(t=0;t<e.length;t++)wn(e[t])}}function Dn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[wt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var On=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,kn=!1;if(On)try{var An={};Object.defineProperty(An,"passive",{get:function(){kn=!0}}),window.addEventListener(`test`,An,An),window.removeEventListener(`test`,An,An)}catch{kn=!1}var jn=null,Mn=null,Nn=null;function Pn(){if(Nn)return Nn;var e,t=Mn,n=t.length,r,i=`value`in jn?jn.value:jn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Nn=i.slice(e,1<r?1-r:void 0)}function Fn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function In(){return!0}function Ln(){return!1}function Rn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?In:Ln,this.isPropagationStopped=Ln,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=In)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=In)},persist:function(){},isPersistent:In}),t}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bn=Rn(zn),Vn=D({},zn,{view:0,detail:0}),Hn=Rn(Vn),Un,Wn,Gn,Kn=D({},Vn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Gn&&(Gn&&e.type===`mousemove`?(Un=e.screenX-Gn.screenX,Wn=e.screenY-Gn.screenY):Wn=Un=0,Gn=e),Un)},movementY:function(e){return`movementY`in e?e.movementY:Wn}}),qn=Rn(Kn),Jn=Rn(D({},Kn,{dataTransfer:0})),Yn=Rn(D({},Vn,{relatedTarget:0})),Xn=Rn(D({},zn,{animationName:0,elapsedTime:0,pseudoElement:0})),Zn=Rn(D({},zn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Qn=Rn(D({},zn,{data:0})),$n={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},er={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},tr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function nr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=tr[e])?!!t[e]:!1}function rr(){return nr}var ir=Rn(D({},Vn,{key:function(e){if(e.key){var t=$n[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Fn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?er[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rr,charCode:function(e){return e.type===`keypress`?Fn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Fn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ar=Rn(D({},Kn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),or=Rn(D({},zn,{submitter:0})),sr=Rn(D({},Vn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rr})),cr=Rn(D({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0})),lr=Rn(D({},Kn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),ur=Rn(D({},zn,{newState:0,oldState:0,source:0})),dr=[9,13,27,32],fr=On&&`CompositionEvent`in window,pr=null;On&&`documentMode`in document&&(pr=document.documentMode);var mr=On&&`TextEvent`in window&&!pr,hr=On&&(!fr||pr&&8<pr&&11>=pr),gr=` `,_r=!1;function vr(e,t){switch(e){case`keyup`:return dr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function yr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var br=!1;function xr(e,t){switch(e){case`compositionend`:return yr(t);case`keypress`:return t.which===32?(_r=!0,gr):null;case`textInput`:return e=t.data,e===gr&&_r?null:e;default:return null}}function Sr(e,t){if(br)return e===`compositionend`||!fr&&vr(e,t)?(e=Pn(),Nn=Mn=jn=null,br=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return hr&&t.locale!==`ko`?null:t.data;default:return null}}var Cr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Cr[e.type]:t===`textarea`}function Tr(e,t,n,r){Sn?Cn?Cn.push(r):Cn=[r]:Sn=r,t=Yf(t,`onChange`),0<t.length&&(n=new Bn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Er=null,Dr=null;function Or(e){Hf(e,0)}function kr(e){if(tn(Pt(e)))return e}function Ar(e,t){if(e===`change`)return t}var jr=!1;if(On){var Mr;if(On){var Nr=`oninput`in document;if(!Nr){var Pr=document.createElement(`div`);Pr.setAttribute(`oninput`,`return;`),Nr=typeof Pr.oninput==`function`}Mr=Nr}else Mr=!1;jr=Mr&&(!document.documentMode||9<document.documentMode)}function Fr(){Er&&(Er.detachEvent(`onpropertychange`,Ir),Dr=Er=null)}function Ir(e){if(e.propertyName===`value`&&kr(Dr)){var t=[];Tr(t,Dr,e,xn(e)),En(Or,t)}}function Lr(e,t,n){e===`focusin`?(Fr(),Er=t,Dr=n,Er.attachEvent(`onpropertychange`,Ir)):e===`focusout`&&Fr()}function Rr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return kr(Dr)}function zr(e,t){if(e===`click`)return kr(t)}function Br(e,t){if(e===`input`||e===`change`)return kr(t)}function Vr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Hr=typeof Object.is==`function`?Object.is:Vr;function Ur(e,t){if(Hr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ie.call(t,i)||!Hr(e[i],t[i]))return!1}return!0}function Wr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Gr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Kr(e,t){var n=Gr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Gr(n)}}function qr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Jr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Wr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Wr(e.document)}return t}function Yr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Xr=On&&`documentMode`in document&&11>=document.documentMode,Zr=null,Qr=null,$r=null,ei=!1;function ti(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ei||Zr==null||Zr!==Wr(r)||(r=Zr,`selectionStart`in r&&Yr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),$r&&Ur($r,r)||($r=r,r=Yf(Qr,`onSelect`),0<r.length&&(t=new Bn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Zr)))}function ni(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ri={animationend:ni(`Animation`,`AnimationEnd`),animationiteration:ni(`Animation`,`AnimationIteration`),animationstart:ni(`Animation`,`AnimationStart`),transitionrun:ni(`Transition`,`TransitionRun`),transitionstart:ni(`Transition`,`TransitionStart`),transitioncancel:ni(`Transition`,`TransitionCancel`),transitionend:ni(`Transition`,`TransitionEnd`)},ii={},ai={};On&&(ai=document.createElement(`div`).style,`AnimationEvent`in window||(delete ri.animationend.animation,delete ri.animationiteration.animation,delete ri.animationstart.animation),`TransitionEvent`in window||delete ri.transitionend.transition);function oi(e){if(ii[e])return ii[e];if(!ri[e])return e;var t=ri[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ai)return ii[e]=t[n];return e}var si=oi(`animationend`),ci=oi(`animationiteration`),li=oi(`animationstart`),ui=oi(`transitionrun`),di=oi(`transitionstart`),fi=oi(`transitioncancel`),pi=oi(`transitionend`),mi=new Map,hi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);hi.push(`scrollEnd`);function gi(e,t){mi.set(e,t),Bt(t,[e])}var z=0;function _i(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=xd.identifierPrefix;var n=z++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function vi(e){if(e==null||typeof e==`string`)return e;var t=null,n=kd;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function yi(e,t){return e=vi(e),t=vi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var bi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},xi=[],Si=0,B=0;function Ci(){for(var e=Si,t=B=Si=0;t<e;){var n=xi[t];xi[t++]=null;var r=xi[t];xi[t++]=null;var i=xi[t];xi[t++]=null;var a=xi[t];if(xi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Di(n,i,a)}}function wi(e,t,n,r){xi[Si++]=e,xi[Si++]=t,xi[Si++]=n,xi[Si++]=r,B|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ti(e,t,n,r){return wi(e,t,n,r),Oi(e)}function Ei(e,t){return wi(e,null,null,t),Oi(e)}function Di(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-$e(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Oi(e){if(50<Ad)throw Ad=0,jd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ki={};function Ai(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ji(e,t,n,r){return new Ai(e,t,n,r)}function Mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ni(e,t){var n=e.alternate;return n===null?(n=ji(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Pi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Fi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Mi(r)&&(s=1);else if(typeof r==`string`)s=Ym(e,n,Se.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case oe:return e=ji(31,n,t,a),e.elementType=oe,e.lanes=o,e;case ee:return Ii(n.children,a,o,t);case j:s=8,a|=24;break;case te:return e=ji(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case re:return e=ji(13,n,t,a),e.elementType=re,e.lanes=o,e;case ie:return e=ji(19,n,t,a),e.elementType=ie,e.lanes=o,e;case se:case le:return e=a|32,e=ji(30,n,t,e),e.elementType=le,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case N:s=10;break a;case M:s=9;break a;case ne:s=11;break a;case P:s=14;break a;case ae:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ji(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ii(e,t,n,r){return e=ji(7,e,r,t),e.lanes=n,e}function Li(e,t,n){return e=ji(6,e,null,t),e.lanes=n,e}function Ri(e){var t=ji(18,null,null,0);return t.stateNode=e,t}function V(e,t,n){return t=ji(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var zi=new WeakMap;function Bi(e,t){if(typeof e==`object`&&e){var n=zi.get(e);return n===void 0?(t={value:e,source:t,stack:Fe(t)},zi.set(e,t),t):n}return{value:e,source:t,stack:Fe(t)}}var Vi=[],Hi=0,Ui=null,Wi=0,Gi=[],Ki=0,qi=null,Ji=1,Yi=``;function Xi(e,t){Vi[Hi++]=Wi,Vi[Hi++]=Ui,Ui=e,Wi=t}function Zi(e,t,n){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,qi=e;var r=Ji;e=Yi;var i=32-$e(r)-1;r&=~(1<<i),n+=1;var a=32-$e(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ji=1<<32-$e(t)+i|n<<i|r,Yi=a+e}else Ji=1<<a|n<<i|r,Yi=e}function H(e){e.return!==null&&(Xi(e,1),Zi(e,1,0))}function Qi(e){for(;e===Ui;)Ui=Vi[--Hi],Vi[Hi]=null,Wi=Vi[--Hi],Vi[Hi]=null;for(;e===qi;)qi=Gi[--Ki],Gi[Ki]=null,Yi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null}function $i(e,t){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,Ji=t.id,Yi=t.overflow,qi=e}var ea=null,ta=null,U=!1,na=null,ra=!1,ia=Error(i(519));function aa(e){throw da(Bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ia}function oa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Ct]=e,t[wt]=r,n){case`dialog`:Z(`cancel`,t),Z(`close`,t);break;case`iframe`:case`object`:case`embed`:Z(`load`,t);break;case`video`:case`audio`:for(n=0;n<Bf.length;n++)Z(Bf[n],t);break;case`source`:Z(`error`,t);break;case`img`:case`image`:case`link`:Z(`error`,t),Z(`load`,t);break;case`details`:Z(`toggle`,t);break;case`input`:Z(`invalid`,t),on(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Z(`invalid`,t);break;case`textarea`:Z(`invalid`,t),un(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||tp(t.textContent,n)?(r.popover!=null&&(Z(`beforetoggle`,t),Z(`toggle`,t)),r.onScroll!=null&&Z(`scroll`,t),r.onScrollEnd!=null&&Z(`scrollend`,t),r.onClick!=null&&(t.onclick=yn),t=!0):t=!1,t||aa(e,!0)}function sa(e){for(ea=e.return;ea;)switch(ea.tag){case 5:case 31:case 13:ra=!1;return;case 27:case 3:ra=!0;return;default:ea=ea.return}}function ca(e){if(e!==ea)return!1;if(!U)return sa(e),U=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||hp(e.type,e.memoizedProps)),n=!n),n&&ta&&aa(e),sa(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ta=pm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ta=pm(e)}else t===27?(t=ta,wp(e.type)?(e=fm,fm=null,ta=e):ta=t):ta=ea?dm(e.stateNode.nextSibling):null;return!0}function la(){ta=ea=null,U=!1}function ua(){var e=na;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),na=null),e}function da(e){na===null?na=[e]:na.push(e)}var fa=ye(null),pa=null,ma=null;function ha(e,t,n){xe(fa,t._currentValue),t._currentValue=n}function ga(e){e._currentValue=fa.current,be(fa)}function _a(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function va(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),_a(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),_a(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),_a(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ya(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Hr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Te.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[lh]:e.push(lh))}a=a.return}return e!==null&&va(t,e,n,r),t.flags|=262144,e!==null}function ba(e){for(e=e.firstContext;e!==null;){if(!Hr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function xa(e){pa=e,ma=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Sa(e){return wa(pa,e)}function Ca(e,t){return pa===null&&xa(e),wa(e,t)}function wa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ma===null){if(e===null)throw Error(i(308));ma=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ma=ma.next=t;return n}var Ta=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ea=t.unstable_scheduleCallback,Da=t.unstable_NormalPriority,Oa={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ka(){return{controller:new Ta,data:new Map,refCount:0}}function Aa(e){e.refCount--,e.refCount===0&&Ea(Da,function(){e.controller.abort()})}function ja(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Ma=null;function Na(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Pa=null,Fa=0,Ia=0,La=null;function Ra(e,t){if(Pa===null){var n=Pa=[];Fa=0,Ia=Ff(),La={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Fa++,t.then(za,za),t}function za(){if(--Fa===0&&(Ma=null,Pa!==null)){La!==null&&(La.status=`fulfilled`);var e=Pa;Pa=null,Ia=0,La=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ba(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Va=F.S;F.S=function(e,t){if(gd=Ve(),typeof t==`object`&&t&&typeof t.then==`function`&&Ra(e,t),Ma!==null)for(var n=xf;n!==null;)ja(n,Ma),n=n.next;if(n=e.types,n!==null){for(var r=xf;r!==null;)ja(r,n),r=r.next;if(Ia!==0){r=Ma,r===null&&(r=Ma=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Va!==null&&Va(e,t)};var Ha=ye(null);function Ua(){var e=Ha.current;return e===null?$u.pooledCache:e}function Wa(e,t){t===null?xe(Ha,Ha.current):xe(Ha,t.pool)}function Ga(){var e=Ua();return e===null?null:{parent:Oa._currentValue,pool:e}}var Ka=Error(i(460)),qa=Error(i(474)),Ja=Error(i(542)),Ya={then:function(){}};function Xa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Za(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(yn,yn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,to(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(yn,yn);else{if(e=$u,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,to(e),e}throw $a=t,Ka}}function Qa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?($a=e,Ka):e}}var $a=null;function eo(){if($a===null)throw Error(i(459));var e=$a;return $a=null,e}function to(e){if(e===Ka||e===Ja)throw Error(i(483))}var no=null,ro=0;function io(e){var t=ro;return ro+=1,no===null&&(no=[]),Za(no,e,t)}function ao(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function oo(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function so(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Ni(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Li(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ee?(e=d(e,t,n.props.children,r,n.key),ao(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ae&&Qa(i)===t.type)?(t=a(t,n.props),ao(t,n),t.return=e,t):(t=Fi(n.type,n.key,n.props,null,e.mode,r),ao(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=V(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ii(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Li(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Fi(t.type,t.key,t.props,null,e.mode,n),ao(n,t),n.return=e,n;case A:return t=V(t,e.mode,n),t.return=e,t;case ae:return t=Qa(t),f(e,t,n)}if(he(t)||fe(t))return t=Ii(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,io(t),n);if(t.$$typeof===N)return f(e,Ca(e,t),n);oo(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case ae:return n=Qa(n),p(e,t,n,r)}if(he(n)||fe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,io(n),r);if(n.$$typeof===N)return p(e,t,Ca(e,n),r);oo(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ae:return r=Qa(r),m(e,t,n,r,i)}if(he(r)||fe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,io(r),i);if(r.$$typeof===N)return m(e,t,n,Ca(t,r),i);oo(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),U&&Xi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return U&&Xi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),U&&Xi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),U&&Xi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return U&&Xi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),U&&Xi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ee&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ee){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),ao(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ae&&Qa(l)===r.type){n(e,r.sibling),c=a(r,o.props),ao(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ee?(c=Ii(o.props.children,e.mode,c,o.key),ao(c,o),c.return=e,e=c):(c=Fi(o.type,o.key,o.props,null,e.mode,c),ao(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=V(o,e.mode,c),c.return=e,e=c}return s(e);case ae:return o=Qa(o),_(e,r,o,c)}if(he(o))return h(e,r,o,c);if(fe(o)){if(l=fe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,io(o),c);if(o.$$typeof===N)return _(e,r,Ca(e,o),c);oo(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Li(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ro=0;var i=_(e,t,n,r);return no=null,i}catch(t){if(t===Ka||t===Ja)throw t;var a=ji(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var co=so(!0),lo=so(!1),uo=!1;function fo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function po(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function mo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ho(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,q&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Oi(e),Di(e,null,n),t}return wi(e,r,t,n),Oi(e)}function go(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,gt(e,n)}}function _o(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var vo=!1;function yo(){if(vo){var e=La;if(e!==null)throw e}}function bo(e,t,n,r){vo=!1;var i=e.updateQueue;uo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===Ia&&(vo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:uo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function xo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function So(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)xo(n[e],t)}var Co=ye(null),wo=ye(0);function To(e,t){e=ad,xe(wo,e),xe(Co,t),ad=e|t.baseLanes}function Eo(){xe(wo,ad),xe(Co,Co.current)}function Do(){ad=wo.current,be(Co),be(wo)}var Oo=ye(null),ko=null;function Ao(e){var t=e.alternate;xe(Fo,Fo.current&1),xe(Oo,e),ko===null&&(t===null||Co.current!==null||t.memoizedState!==null)&&(ko=e)}function jo(e){xe(Fo,Fo.current),xe(Oo,e),ko===null&&(ko=e)}function Mo(e){e.tag===22?(xe(Fo,Fo.current),xe(Oo,e),ko===null&&(ko=e)):No()}function No(){xe(Fo,Fo.current),xe(Oo,Oo.current)}function Po(e){be(Oo),ko===e&&(ko=null),be(Fo)}var Fo=ye(0);function Io(e,t){xe(Oo,Oo.current),xe(Fo,t)}function Lo(e){be(Fo),be(Oo),ko===e&&(ko=null)}function Ro(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||cm(n)||lm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zo=0,W=null,Bo=null,Vo=null,Ho=!1,Uo=!1,Wo=!1,Go=0,Ko=0,qo=null,Jo=0;function Yo(){throw Error(i(321))}function Xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Hr(e[n],t[n]))return!1;return!0}function Zo(e,t,n,r,i,a){return zo=a,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,F.H=e===null||e.memoizedState===null?pc:mc,Wo=!1,a=n(r,i),Wo=!1,Uo&&(a=$o(t,n,r,i)),Qo(e),a}function Qo(e){F.H=fc;var t=Bo!==null&&Bo.next!==null;if(zo=0,Vo=Bo=W=null,Ho=!1,Ko=0,qo=null,t)throw Error(i(300));e===null||jc||(e=e.dependencies,e!==null&&ba(e)&&(jc=!0))}function $o(e,t,n,r){W=e;var a=0;do{if(Uo&&(qo=null),Ko=0,Uo=!1,25<=a)throw Error(i(301));if(a+=1,Vo=Bo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}F.H=hc,o=t(n,r)}while(Uo);return o}function es(){var e=F.H,t=e.useState()[0];return t=typeof t.then==`function`?os(t):t,e=e.useState()[0],(Bo===null?null:Bo.memoizedState)!==e&&(W.flags|=1024),t}function ts(){var e=Go!==0;return Go=0,e}function ns(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function rs(e){if(Ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ho=!1}zo=0,Vo=Bo=W=null,Uo=!1,Ko=Go=0,qo=null}function G(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vo===null?W.memoizedState=Vo=e:Vo=Vo.next=e,Vo}function is(){if(Bo===null){var e=W.alternate;e=e===null?null:e.memoizedState}else e=Bo.next;var t=Vo===null?W.memoizedState:Vo.next;if(t!==null)Vo=t,Bo=e;else{if(e===null)throw W.alternate===null?Error(i(467)):Error(i(310));Bo=e,e={memoizedState:Bo.memoizedState,baseState:Bo.baseState,baseQueue:Bo.baseQueue,queue:Bo.queue,next:null},Vo===null?W.memoizedState=Vo=e:Vo=Vo.next=e}return Vo}function as(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function os(e){var t=Ko;return Ko+=1,qo===null&&(qo=[]),e=Za(qo,e,t),t=W,(Vo===null?t.memoizedState:Vo.next)===null&&(t=t.alternate,F.H=t===null||t.memoizedState===null?pc:mc),e}function ss(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return os(e);if(e.$$typeof===ue)return;if(e.$$typeof===N)return Sa(e)}throw Error(i(438,String(e)))}function cs(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=W.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=as(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ce;return t.index++,n}function ls(e,t){return typeof t==`function`?t(e):t}function us(e){return ds(is(),Bo,e)}function ds(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(zo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ia&&(d=!0);else if((zo&p)===p){u=u.next,p===Ia&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,W.lanes|=p,sd|=p;f=u.action,Wo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,W.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Hr(o,e.memoizedState)&&(jc=!0,d&&(n=La,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function fs(e){var t=is(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Hr(o,t.memoizedState)||(jc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ps(e,t,n){var r=W,a=is(),o=U;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Hr((Bo||a).memoizedState,n);if(s&&(a.memoizedState=n,jc=!0),a=a.queue,Rs(gs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Vo!==null&&!!(Vo.memoizedState.tag&1),Ns(e?9:8,{destroy:void 0},hs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,$u===null)throw Error(i(349));o||zo&127||ms(r,t,n)}return n}function ms(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=as(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hs(e,t,n,r){t.value=n,t.getSnapshot=r,_s(t)&&vs(e)}function gs(e,t,n){return n(function(){_s(t)&&vs(e)})}function _s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Hr(e,n)}catch{return!0}}function vs(e){var t=Ei(e,2);t!==null&&Fd(t,e,2)}function ys(e){var t=G();if(typeof e==`function`){var n=e;if(e=n(),Wo){Qe(!0);try{n()}finally{Qe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:e},t}function bs(e,t,n,r){return e.baseState=n,ds(e,Bo,typeof r==`function`?r:ls)}function xs(e,t,n,r,a){if(lc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};F.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ss(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ss(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=F.T,o={};o.types=a===null?null:a.types,F.T=o;try{var s=n(i,r),c=F.S;c!==null&&c(o,s),Cs(e,t,s)}catch(n){Ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),F.T=a}}else try{a=n(i,r),Cs(e,t,a)}catch(n){Ts(e,t,n)}}function Cs(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ws(e,t,n)},function(n){return Ts(e,t,n)}):ws(e,t,n)}function ws(e,t,n){t.status=`fulfilled`,t.value=n,Es(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ss(e,n)))}function Ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Es(t),t=t.next;while(t!==r)}e.action=null}function Es(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ds(e,t){return t}function Os(e,t){if(U){var n=$u.formState;if(n!==null){a:{var r=W;if(U){if(ta){b:{for(var i=ta,a=ra;i.nodeType!==8;)if(!a||(i=dm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ta=dm(i.nextSibling),r=i.data===`F!`;break a}}aa(r)}r=!1}r&&(t=n[0])}}return n=G(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:t},n.queue=r,n=oc.bind(null,W,r),r.dispatch=n,r=ys(!1),a=cc.bind(null,W,!1,r.queue),r=G(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=xs.bind(null,W,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ks(e){return As(is(),Bo,e)}function As(e,t,n){if(t=ds(e,t,Ds)[0],e=us(ls)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=os(t)}catch(e){throw e===Ka?Ja:e}else r=t;t=is();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(W.flags|=2048,Ns(9,{destroy:void 0},js.bind(null,i,n),null)),[r,a,e]}function js(e,t){e.action=t}function Ms(e){var t=is(),n=Bo;if(n!==null)return As(t,n,e);is(),t=t.memoizedState,n=is();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ns(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=W.updateQueue,t===null&&(t=as(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ps(){return is().memoizedState}function Fs(e,t,n,r){var i=G();W.flags|=e,i.memoizedState=Ns(1|t,{destroy:void 0},n,r===void 0?null:r)}function Is(e,t,n,r){var i=is();r=r===void 0?null:r;var a=i.memoizedState.inst;Bo!==null&&r!==null&&Xo(r,Bo.memoizedState.deps)?i.memoizedState=Ns(t,a,n,r):(W.flags|=e,i.memoizedState=Ns(1|t,a,n,r))}function Ls(e,t){Fs(8390656,8,e,t)}function Rs(e,t){Is(2048,8,e,t)}function zs(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=as(),W.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Bs(e){var t=is().memoizedState;return zs({ref:t,nextImpl:e}),function(){if(q&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Vs(e,t){return Is(4,2,e,t)}function Hs(e,t){return Is(4,4,e,t)}function Us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ws(e,t,n){n=n==null?null:n.concat([e]),Is(4,4,Us.bind(null,t,e),n)}function Gs(){}function Ks(e,t){var n=is();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qs(e,t){var n=is();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xo(t,r[1]))return r[0];if(r=e(),Wo){Qe(!0);try{e()}finally{Qe(!1)}}return n.memoizedState=[r,t],r}function Js(e,t,n){return n===void 0||zo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=Nd(),W.lanes|=e,sd|=e,n)}function Ys(e,t,n,r){return Hr(n,t)?n:Co.current===null?!(zo&106)||zo&1073741824&&!(Y&261930)?(jc=!0,e.memoizedState=n):(e=Nd(),W.lanes|=e,sd|=e,t):(e=Js(e,n,r),Hr(e,t)||(jc=!0),e)}function Xs(e,t,n,r,i){var a=I.p;I.p=a!==0&&8>a?a:8;var o=F.T,s={};s.types=o===null?null:o.types,F.T=s,cc(e,!1,t,n);try{var c=i(),l=F.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?sc(e,t,Ba(c,r),Md(e)):sc(e,t,r,Md(e))}catch(n){sc(e,t,{then:function(){},status:`rejected`,reason:n},Md())}finally{I.p=a,o!==null&&s.types!==null&&(o.types=s.types),F.T=o}}function Zs(){}function Qs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=$s(e).queue;Xs(e,a,t,ge,n===null?Zs:function(){return ec(e),n(r)})}function $s(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ge,baseState:ge,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:ge},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ec(e){var t=$s(e);t.next===null&&(t=e.alternate.memoizedState),sc(e,t.next.queue,{},Md())}function tc(){return Sa(lh)}function nc(){return is().memoizedState}function rc(){return is().memoizedState}function ic(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Md();e=mo(n);var r=ho(t,e,n);r!==null&&(Fd(r,t,n),go(r,t,n)),t={cache:ka()},e.payload=t;return}t=t.return}}function ac(e,t,n){var r=Md();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},lc(e)?uc(t,n):(n=Ti(e,t,n,r),n!==null&&(Fd(n,e,r),dc(n,t,r)))}function oc(e,t,n){sc(e,t,n,Md())}function sc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(lc(e))uc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Hr(s,o))return wi(e,t,i,0),$u===null&&Ci(),!1}catch{}if(n=Ti(e,t,i,r),n!==null)return Fd(n,e,r),dc(n,t,r),!0}return!1}function cc(e,t,n,r){if(r={lane:2,revertLane:Ff(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(e)){if(t)throw Error(i(479))}else t=Ti(e,n,r,2),t!==null&&Fd(t,e,2)}function lc(e){var t=e.alternate;return e===W||t!==null&&t===W}function uc(e,t){Uo=Ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,gt(e,n)}}var fc={readContext:Sa,use:ss,useCallback:Yo,useContext:Yo,useEffect:Yo,useImperativeHandle:Yo,useLayoutEffect:Yo,useInsertionEffect:Yo,useMemo:Yo,useReducer:Yo,useRef:Yo,useState:Yo,useDebugValue:Yo,useDeferredValue:Yo,useTransition:Yo,useSyncExternalStore:Yo,useId:Yo,useHostTransitionStatus:Yo,useFormState:Yo,useActionState:Yo,useOptimistic:Yo,useMemoCache:Yo,useCacheRefresh:Yo,useEffectEvent:Yo},pc={readContext:Sa,use:ss,useCallback:function(e,t){return G().memoizedState=[e,t===void 0?null:t],e},useContext:Sa,useEffect:Ls,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Fs(4194308,4,Us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fs(4194308,4,e,t)},useInsertionEffect:function(e,t){Fs(4,2,e,t)},useMemo:function(e,t){var n=G();t=t===void 0?null:t;var r=e();if(Wo){Qe(!0);try{e()}finally{Qe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=G();if(n!==void 0){var i=n(t);if(Wo){Qe(!0);try{n(t)}finally{Qe(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ac.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var t=G();return e={current:e},t.memoizedState=e},useState:function(e){e=ys(e);var t=e.queue,n=oc.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Gs,useDeferredValue:function(e,t){return Js(G(),e,t)},useTransition:function(){var e=ys(!1);return e=Xs.bind(null,W,e.queue,!0,!1),G().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=W,a=G();if(U){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),$u===null)throw Error(i(349));Y&127||ms(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Ls(gs.bind(null,r,o,e),[e]),r.flags|=2048,Ns(9,{destroy:void 0},hs.bind(null,r,o,n,t),null),n},useId:function(){var e=G(),t=$u.identifierPrefix;if(U){var n=Yi,r=Ji;n=(r&~(1<<32-$e(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Jo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:tc,useFormState:Os,useActionState:Os,useOptimistic:function(e){var t=G();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=cc.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:cs,useCacheRefresh:function(){return G().memoizedState=ic.bind(null,W)},useEffectEvent:function(e){var t=G(),n={impl:e};return t.memoizedState=n,function(){if(q&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},mc={readContext:Sa,use:ss,useCallback:Ks,useContext:Sa,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:us,useRef:Ps,useState:function(){return us(ls)},useDebugValue:Gs,useDeferredValue:function(e,t){return Ys(is(),Bo.memoizedState,e,t)},useTransition:function(){var e=us(ls)[0],t=is().memoizedState;return[typeof e==`boolean`?e:os(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:ks,useActionState:ks,useOptimistic:function(e,t){return bs(is(),Bo,e,t)},useMemoCache:cs,useCacheRefresh:rc,useEffectEvent:Bs},hc={readContext:Sa,use:ss,useCallback:Ks,useContext:Sa,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:fs,useRef:Ps,useState:function(){return fs(ls)},useDebugValue:Gs,useDeferredValue:function(e,t){var n=is();return Bo===null?Js(n,e,t):Ys(n,Bo.memoizedState,e,t)},useTransition:function(){var e=fs(ls)[0],t=is().memoizedState;return[typeof e==`boolean`?e:os(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:Ms,useActionState:Ms,useOptimistic:function(e,t){var n=is();return Bo===null?(n.baseState=e,[e,n.queue.dispatch]):bs(n,Bo,e,t)},useMemoCache:cs,useCacheRefresh:rc,useEffectEvent:Bs};function gc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _c={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Md(),i=mo(r);i.payload=t,n!=null&&(i.callback=n),t=ho(e,i,r),t!==null&&(Fd(t,e,r),go(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Md(),i=mo(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ho(e,i,r),t!==null&&(Fd(t,e,r),go(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Md(),r=mo(n);r.tag=2,t!=null&&(r.callback=t),t=ho(e,r,n),t!==null&&(Fd(t,e,n),go(t,e,n))}};function vc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ur(n,r)||!Ur(i,a):!0}function yc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&_c.enqueueReplaceState(t,t.state,null)}function bc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function xc(e){bi(e)}function Sc(e){console.error(e)}function Cc(e){bi(e)}function wc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){return n=mo(n),n.tag=3,n.payload={element:null},n.callback=function(){wc(e,t)},n}function Dc(e){return e=mo(e),e.tag=3,e}function Oc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Tc(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function kc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ya(t,n,a,!0),n=Oo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return ko===null?qd():n.alternate===null&&od===0&&(od=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ya?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),hf(e,r,a)),!1;case 22:return n.flags|=65536,r===Ya?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),hf(e,r,a)),!1}throw Error(i(435,n.tag))}return hf(e,r,a),qd(),!1}if(U)return t=Oo.current,t===null?(r!==ia&&(t=Error(i(423),{cause:r}),da(Bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Bi(r,n),a=Ec(e.stateNode,r,a),_o(e,a),od!==4&&(od=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ia&&(e=Error(i(422),{cause:r}),da(Bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Bi(o,n),fd===null?fd=[o]:fd.push(o),od!==4&&(od=2),t===null)return!0;r=Bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ec(n.stateNode,r,e),_o(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(yd===null||!yd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Dc(a),Oc(a,e,n,r),_o(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Ac=Error(i(461)),jc=!1;function Mc(e,t,n,r){t.child=e===null?lo(t,null,n,r):co(t,e.child,n,r)}function Nc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return xa(t),r=Zo(e,t,n,o,a,i),s=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(U&&s&&H(t),t.flags|=1,Mc(e,t,r,i),t.child)}function Pc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Fc(e,t,a,r,i)):(e=Fi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!cl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ur:n,n(o,r)&&e.ref===t.ref)return sl(e,t,i)}return t.flags|=1,e=Ni(a,r),e.ref=t.ref,e.return=t,t.child=e}function Fc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ur(a,r)&&e.ref===t.ref){if(jc=!1,t.pendingProps=r=a,cl(e,i))e.flags&131072&&(jc=!0);else return t.lanes=e.lanes,sl(e,t,i)}}return Uc(e,t,n,r,i)}function Ic(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Rc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Wa(t,a===null?null:a.cachePool),a===null?Eo():To(t,a),Mo(t);else return r=t.lanes=536870912,Rc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Wa(t,null),Eo(),No()):(Wa(t,a.cachePool),To(t,a),No(),t.memoizedState=null);return Mc(e,t,i,n),t.child}function Lc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Rc(e,t,n,r,i){var a=Ua();return a=a===null?null:{parent:Oa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Wa(t,null),Eo(),Mo(t),e!==null&&ya(e,t,r,!0),t.childLanes=i,null}function zc(e,t){return t=Qc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Bc(e,t,n){return co(t,e.child,null,n),e=zc(t,t.pendingProps),e.flags|=2,Po(t),t.memoizedState=null,e}function Vc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(U){if(r.mode===`hidden`)return e=zc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Lc(null,e);if(jo(t),(e=ta)?(e=sm(e,ra),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Ri(e),n.return=t,t.child=n,ea=t,ta=null)):e=null,e===null)throw aa(t);return t.lanes=536870912,null}return zc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(jo(t),a){if(t.flags&256)t.flags&=-257,t=Bc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(jc||ya(e,t,n,!1),a=(n&e.childLanes)!==0,jc||a){if(Co.current===null){if(r=$u,r!==null&&(s=_t(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ei(e,s),Fd(r,e,s),Ac;qd()}t=Bc(e,t,n)}else e=o.treeContext,ta=dm(s.nextSibling),ea=t,U=!0,na=null,ra=!1,e!==null&&$i(t,e),t=zc(t,r),t.flags|=134221824;return t}return e=Ni(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Uc(e,t,n,r,i){return xa(t),n=Zo(e,t,n,r,void 0,i),r=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(U&&r&&H(t),t.flags|=1,Mc(e,t,n,i),t.child)}function Wc(e,t,n,r,i,a){return xa(t),t.updateQueue=null,n=$o(t,r,n,i),Qo(e),r=ts(),e!==null&&!jc?(ns(e,t,a),sl(e,t,a)):(U&&r&&H(t),t.flags|=1,Mc(e,t,n,a),t.child)}function Gc(e,t,n,r,i){if(xa(t),t.stateNode===null){var a=ki,o=n.contextType;typeof o==`object`&&o&&(a=Sa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=_c,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},fo(t),o=n.contextType,a.context=typeof o==`object`&&o?Sa(o):ki,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(gc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&_c.enqueueReplaceState(a,a.state,null),bo(t,r,a,i),yo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=bc(n,s);a.props=c;var l=a.context,u=n.contextType;o=ki,typeof u==`object`&&u&&(o=Sa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&yc(t,a,r,o),uo=!1;var f=t.memoizedState;a.state=f,bo(t,r,a,i),yo(),l=t.memoizedState,s||f!==l||uo?(typeof d==`function`&&(gc(t,n,d,r),l=t.memoizedState),(c=uo||vc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,po(e,t),o=t.memoizedProps,u=bc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ki,typeof l==`object`&&l&&(c=Sa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&yc(t,a,r,c),uo=!1,f=t.memoizedState,a.state=f,bo(t,r,a,i),yo();var p=t.memoizedState;o!==d||f!==p||uo||e!==null&&e.dependencies!==null&&ba(e.dependencies)?(typeof s==`function`&&(gc(t,n,s,r),p=t.memoizedState),(u=uo||vc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ba(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Hc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=co(t,e.child,null,i),t.child=co(t,null,n,i)):Mc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=sl(e,t,i),e}function Kc(e,t,n,r){return la(),t.flags|=256,Mc(e,t,n,r),t.child}var qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:Ga()}}function Yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function Xc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Fo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(U){if(i?Ao(t):No(),(e=ta)?(e=sm(e,ra),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Ri(e),n.return=t,t.child=n,ea=t,ta=null)):e=null,e===null)throw aa(t);return t.lanes=lm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(No(),i=t.mode,a=Qc({mode:`hidden`,children:a},i),r=Ii(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Jc(n),r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(null,r)):(Ao(t),Zc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return el(e,t,a,o,r,c,s,n)}return i?(No(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ni(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ii(i,a,n,null),i.flags|=2):i=Ni(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Lc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Jc(n):(a=i.cachePool,a===null?a=Ga():(s=Oa._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(e.child,r)):(Ao(t),n=e.child,e=n.sibling,n=Ni(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Zc(e,t){return t=Qc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Qc(e,t){return e=ji(22,e,null,t),e.lanes=0,e}function $c(e,t,n){return co(t,e.child,null,n),e=Zc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function el(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Ao(t),t.flags&=-257,$c(e,t,c)):t.memoizedState===null?(No(),o=a.fallback,s=t.mode,a=Qc({mode:`visible`,children:a.children},s),o=Ii(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,co(t,e.child,null,c),a=t.child,a.memoizedState=Jc(c),a.childLanes=Yc(e,r,c),t.memoizedState=qc,Lc(null,a)):(No(),t.child=e.child,t.flags|=128,null);if(Ao(t),lm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,da({value:a,source:null,stack:null})),$c(e,t,c)}if(jc||ya(e,t,c,!1),r=(c&e.childLanes)!==0,jc||r){if(Co.current!==null)return $c(e,t,c);if(r=$u,r!==null&&(a=_t(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ei(e,a),Fd(r,e,a),Ac;return cm(o)||qd(),$c(e,t,c)}return cm(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,ta=dm(o.nextSibling),ea=t,U=!0,na=null,ra=!1,e!==null&&$i(t,e),t=Zc(t,a.children),t.flags|=134221824,t)}function tl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),_a(e.return,t,n)}function nl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Ro(n)===null&&(t=e),e=e.sibling}return t}function rl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function il(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function al(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Fo.current;if(t.flags&128)return Io(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Io(t,o),i===`backwards`&&e!==null?(il(e),Mc(e,t,r,n),il(e)):Mc(e,t,r,n),r=U?Wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tl(e,n,t);else if(e.tag===19)tl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,il(t)),rl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ro(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}rl(t,!0,n,null,a,r);break;case`together`:rl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),rl(t,!1,i,n,a,r)}return t.child}function ol(e,t,n){var r=t.pendingProps;return ha(t,t.type,r.value),Mc(e,t,r.children,n),t.child}function sl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ya(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Ni(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ni(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function cl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ba(e)))}function ll(e,t,n){switch(t.tag){case 3:Ee(t,t.stateNode.containerInfo),ha(t,Oa,e.memoizedState.cache),la();break;case 27:case 5:Oe(t);break;case 4:Ee(t,t.stateNode.containerInfo);break;case 10:ha(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,jo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Ao(t),t.flags|=128,null;r=ya(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Xc(e,t,n):(Ao(t),e=sl(e,t,n),e===null?null:e.sibling)}Ao(t);break;case 19:if(t.flags&128)return al(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ya(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return al(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Io(t,Fo.current),r)break;return null;case 22:return t.lanes=0,Ic(e,t,n,t.pendingProps);case 24:ha(t,Oa,e.memoizedState.cache)}return sl(e,t,n)}function ul(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)jc=!0;else{if(!cl(e,n)&&!(t.flags&128))return jc=!1,ll(e,t,n);jc=!!(e.flags&131072)}}else jc=!1,U&&t.flags&1048576&&Zi(t,Wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Qa(t.elementType),t.type=e,typeof e==`function`)Mi(e)?(r=bc(e,r),t.tag=1,t=Gc(null,t,e,r,n)):(t.tag=0,t=Uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ne){t.tag=11,t=Nc(null,t,e,r,n);break a}if(a===P){t.tag=14,t=Pc(null,t,e,r,n);break a}if(a===N){t.tag=10,t.type=e,t=ol(null,t,n);break a}}throw t=me(e)||e,Error(i(306,t,``))}}return t;case 0:return Uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=bc(r,t.pendingProps),Gc(e,t,r,a,n);case 3:a:{if(Ee(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,po(e,t),bo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ha(t,Oa,r),r!==o.cache&&va(t,[Oa],n,!0),yo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Kc(e,t,r,n);break a}if(r!==a){a=Bi(Error(i(424)),t),da(a),t=Kc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ta=dm(e.firstChild),ea=t,U=!0,na=null,ra=!0,n=lo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(la(),r===a){t=sl(e,t,n);break a}Mc(e,t,r,n)}t=t.child}return t;case 26:return Hc(e,t),e===null?(n=Fm(t.type,null,t.pendingProps,null))?t.memoizedState=n:U||(t.stateNode=mp(t.type,t.pendingProps,we.current,t)):t.memoizedState=Fm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Oe(t),e===null&&U&&(r=t.stateNode=_m(t.type,t.pendingProps,we.current),ea=t,ra=!0,a=ta,wp(t.type)?(fm=a,ta=dm(r.firstChild)):ta=a),Mc(e,t,t.pendingProps.children,n),Hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&U&&((a=r=ta)&&(r=am(r,t.type,t.pendingProps,ra),r===null?a=!1:(t.stateNode=r,ea=t,ta=dm(r.firstChild),ra=!1,a=!0)),a||aa(t)),Oe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,hp(a,o)?r=null:s!==null&&hp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Zo(e,t,es,null,null,n),lh._currentValue=a),Hc(e,t),Mc(e,t,r,n),t.child;case 6:return e===null&&U&&((e=n=ta)&&(n=om(n,t.pendingProps,ra),n===null?e=!1:(t.stateNode=n,ea=t,ta=null,e=!0)),e||aa(t)),null;case 13:return Xc(e,t,n);case 4:return Ee(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=co(t,null,r,n):Mc(e,t,r,n),t.child;case 11:return Nc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Hc(e,t),Mc(e,t,r,n),t.child;case 8:return Mc(e,t,t.pendingProps.children,n),t.child;case 12:return Mc(e,t,t.pendingProps.children,n),t.child;case 10:return ol(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,xa(t),a=Sa(a),r=r(a),t.flags|=1,Mc(e,t,r,n),t.child;case 14:return Pc(e,t,t.type,t.pendingProps,n);case 15:return Fc(e,t,t.type,t.pendingProps,n);case 19:return al(e,t,n);case 31:return Vc(e,t,n);case 22:return Ic(e,t,n,t.pendingProps);case 24:return xa(t),r=Sa(Oa),e===null?(a=Ua(),a===null&&(a=$u,o=ka(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},fo(t),ha(t,Oa,a)):((e.lanes&n)!==0&&(po(e,t),bo(t,null,null,n),yo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ha(t,Oa,r),r!==a.cache&&va(t,[Oa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ha(t,Oa,r))),Mc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:U&&H(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Hc(e,t),Mc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function dl(e){e.flags|=4}function fl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Xm(t,r):Xm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Wd())e.flags|=8192;else throw $a=Ya,qa}}else e.flags&=-16777217}function pl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Zm(t)){if(Wd())e.flags|=8192;else throw $a=Ya,qa}}function ml(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:dt(),e.lanes|=t,dd|=t)}function hl(e,t){if(!U)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function gl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _l(e,t,n){var r=t.pendingProps;switch(Qi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gl(t),null;case 1:return gl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ga(Oa),De(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ca(t)?dl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ua())),gl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(dl(t),o===null?(gl(t),fl(t,a,null,r,n)):(gl(t),pl(t,o))):o?o===e.memoizedState?(gl(t),t.flags&=-16777217):(dl(t),gl(t),pl(t,o)):(e=e.memoizedProps,e!==r&&dl(t),gl(t),fl(t,a,e,r,n)),null;case 27:if(ke(t),n=we.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}e=Se.current,ca(t)?oa(t,e):(e=_m(a,r,n),t.stateNode=e,dl(t))}return gl(t),t.subtreeFlags&=-33554433,null;case 5:if(ke(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}if(o=Se.current,ca(t))oa(t,o);else{var s=dp(we.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Ct]=t,o[wt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(ip(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&dl(t)}}return gl(t),t.subtreeFlags&=-33554433,fl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=we.current,ca(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ea,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Ct]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||tp(e.nodeValue,n)),e||aa(t,!0)}else e=dp(e).createTextNode(r),e[Ct]=t,t.stateNode=e}return gl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=ca(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Ct]=t}else la(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),e=!1}else n=ua(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Po(t),t):(Po(t),null);if(t.flags&128)throw Error(i(558))}return gl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=ca(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Ct]=t}else la(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),a=!1}else a=ua(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Po(t),t):(Po(t),null)}return Po(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ml(t,t.updateQueue),gl(t),null);case 4:return De(),e===null&&Gf(t.stateNode.containerInfo),t.flags|=67108864,gl(t),null;case 10:return ga(t.type),gl(t),null;case 19:if(Lo(t),r=t.memoizedState,r===null)return gl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)hl(r,!1);else{if(od!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ro(e),o!==null){for(t.flags|=128,hl(r,!1),e=o.updateQueue,t.updateQueue=e,ml(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Pi(n,e),n=n.sibling;return Io(t,Fo.current&1|2),U&&Xi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ve()>_d&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Ro(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ml(t,e),hl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!U)return gl(t),null}else 2*Ve()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ve(),e.sibling=null,o=Fo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||U?Io(t,o):(n=o,xe(Oo,t),xe(Fo,n),ko===null&&(ko=t)),U&&Xi(t,r.treeForkCount),e}return gl(t),null;case 22:case 23:return Po(t),Do(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(gl(t),t.subtreeFlags&6&&(t.flags|=8192)):gl(t),n=t.updateQueue,n!==null&&ml(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&be(Ha),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ga(Oa),gl(t),null;case 25:return null;case 30:return t.flags|=33554432,gl(t),null}throw Error(i(156,t.tag))}function vl(e,t){switch(Qi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ga(Oa),De(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ke(t),null;case 31:if(t.memoizedState!==null){if(Po(t),t.alternate===null)throw Error(i(340));la()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Po(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));la()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Lo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return De(),null;case 10:return ga(t.type),null;case 22:case 23:return Po(t),Do(),e!==null&&be(Ha),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ga(Oa),null;case 25:return null;default:return null}}function yl(e,t){switch(Qi(t),t.tag){case 3:ga(Oa),De();break;case 26:case 27:case 5:ke(t);break;case 4:De();break;case 31:t.memoizedState!==null&&Po(t);break;case 13:Po(t);break;case 19:Lo(t);break;case 10:ga(t.type);break;case 22:case 23:Po(t),Do(),e!==null&&be(Ha);break;case 24:ga(Oa)}}function bl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){X(t,t.return,e)}}function xl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){X(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){X(t,t.return,e)}}function Sl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{So(t,n)}catch(t){X(e,e.return,t)}}}function Cl(e,t,n){n.props=bc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){X(e,t,n)}}function wl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=_i(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Ip(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Lp(e);m(e.child,!1,em,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){X(e,t,n)}}function Tl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){X(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){X(e,t,n)}else n.current=null}}function El(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)nm(e.stateNode,t[n])}function Dl(e){for(var t=e.return;t!==null&&(Al(t)&&nm(e.stateNode,t.stateNode),!kl(t));)t=t.return}function Ol(e){for(var t=e.return;t!==null&&(Al(t)&&rm(e.stateNode,t.stateNode),!kl(t));)t=t.return}function kl(e){return e.tag===5||e.tag===3||e.tag===27}function Al(e){return e&&e.tag===7&&e.stateNode!==null}function jl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){X(e,e.return,t)}}function Ml(e,t,n){try{var r=e.stateNode;op(r,e.type,n,t),r[wt]=t}catch(t){X(e,e.return,t)}}function Nl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&wp(e.type)||e.tag===4}function Pl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Nl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&wp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=yn)),El(e,r),Kt=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,wp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),El(e,r),Kt=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,wp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Il(e,t,n,r),e=e.sibling;e!==null;)Il(e,t,n,r),e=e.sibling}function Ll(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);ip(t,r,n),t[Ct]=e,t[wt]=n}catch(t){X(e,e.return,t)}}var Rl=!1,zl=null;function Bl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Rl=!0)}var Vl=null;function Hl(){var e=Vl;return Vl=null,e}var Ul=0;function Wl(e,t,n,r,i){return Ul=0,Gl(e.child,t,n,r,i)}function Gl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Ap(o);r.push(s),s.view&&(a=!0)}else a||Ap(o).view&&(a=!0);Rl=!0,Dp(o,Ul===0?t:t+`_`+Ul,n),Ul++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Gl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Kl(e,t){for(;e!==null;)e.tag===5?Op(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Kl(e.child,t),e=e.sibling}function ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(ql(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=yi(t.default,t.share),t!==`none`&&(Wl(e,n,t,null,!1)||Kl(e.child,!1))}e=e.sibling}}function Jl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=_i(r,n),a=yi(r.default,n.paired?r.share:r.enter);a===`none`?ql(e):Wl(e,i,a,null,!1)?(ql(e),n.paired||t||Pd(e,r.onEnter)):Kl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Jl(e,t),e=e.sibling;else ql(e)}function Yl(e){if(zl!==null&&zl.size!==0){var t=zl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=yi(n.default,n.share);if(a!==`none`&&(Wl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Pd(e,n.onShare)):Kl(e.child,!1)),t.delete(r),t.size===0)break}}}Yl(e)}e=e.sibling}}}function Xl(e){if(e.tag===30){var t=e.memoizedProps,n=_i(t,e.stateNode),r=zl===null?void 0:zl.get(n),i=yi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Wl(e,n,i,null,!1)?r===void 0?Pd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,zl.delete(n),Pd(e,t.onShare)):Kl(e.child,!1)),zl!==null&&Yl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Xl(e),e=e.sibling;else zl!==null&&Yl(e)}function Zl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=_i(t,e.stateNode);t=yi(t.default,t.update),e.flags&=-5,t!==`none`&&Wl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Zl(e);e=e.sibling}}function Ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Kl(e.child,!1))}Ql(e)}e=e.sibling}}function $l(e){if(e.tag===30)e.stateNode.paired=null,Kl(e.child,!1),Ql(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)$l(e),e=e.sibling;else Ql(e)}function eu(e){for(e=e.child;e!==null;)e.tag===30?Kl(e.child,!1):e.subtreeFlags&33554432&&eu(e),e=e.sibling}function tu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Ul<a.length){var l=a[Ul],u=Ap(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Dp(c,Ul===0?n:n+`_`+Ul,i),s&&e.flags&4||(Vl===null&&(Vl=[]),Vl.push(c,Ul===0?r:r+`_`+Ul,t.memoizedProps)),Ul++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:tu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function nu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=_i(n,r),a=yi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(jp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Ul=0,i=tu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Pd(e,n.onUpdate))}else e.subtreeFlags&33554432&&nu(e,t);e=e.sibling}}var ru=!1,iu=!1,au=!1,ou=!1,su=typeof WeakSet==`function`?WeakSet:Set,cu=null,lu=!1,uu=!1,du=!1,fu=!1;function pu(e,t,n){if(e=e.containerInfo,lp=vh,e=Jr(e),Yr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(up={focusedElem:e,selectionRange:r},vh=!1,n=(n&335544064)===n,cu=t,t=n?9270:1024;cu!==null;){if(e=cu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Xl(r[a]);if(e.alternate===null&&e.flags&2)n&&Bl(e),mu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Xl(r),mu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Bl(e),mu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,cu=r):(n&&Zl(e),mu(n))}}zl=null}function mu(e){for(;cu!==null;){var t=cu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=bc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){X(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)im(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:im(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=_i(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=yi(a.default,a.update),a!==`none`&&Wl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,cu=r;break}cu=t.return}}function hu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Fu(e,n),r&4&&bl(5,n);break;case 1:if(Fu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){X(n,n.return,e)}else{var i=bc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){X(n,n.return,e)}}}r&64&&Sl(n),r&512&&wl(n,n.return);break;case 3:if(Fu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{So(e,t)}catch(e){X(n,n.return,e)}}break;case 27:t===null&&r&4&&Ll(n);case 26:case 5:Fu(e,n),t===null&&r&4&&jl(n),r&512&&wl(n,n.return);break;case 12:Fu(e,n);break;case 31:Fu(e,n),r&4&&wu(e,n);break;case 13:Fu(e,n),r&4&&Tu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=vf.bind(null,n),um(e,n))));break;case 22:if(r=n.memoizedState!==null||ru,!r){var a=t!==null&&t.memoizedState!==null||iu;t=ru,i=iu,ru=r,(iu=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Lu(e,n,r)):Fu(e,n),ru=t,iu=i}break;case 30:Fu(e,n),r&512&&wl(n,n.return);break;case 7:r&512&&wl(n,n.return);default:Fu(e,n)}}function gu(e,t){for(e=e.child;e!==null;)_u(e,t),e=e.sibling}function _u(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){X(e,e.return,t)}vu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,Kt=!0}catch(t){X(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Ep(s,!0):Ep(e.stateNode,!1)}catch(t){X(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&gu(e,t);break;default:gu(e,t)}}function vu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:_u(n,r);break a;case 22:n.memoizedState===null&&vu(n,r);break a;default:vu(n,r)}}e=e.sibling}}function yu(e){var t=e.alternate;t!==null&&(e.alternate=null,yu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&jt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var bu=null,xu=!1;function Su(e,t,n){for(n=n.child;n!==null;)Cu(e,t,n),n=n.sibling}function Cu(e,t,n){if(Ze&&typeof Ze.onCommitFiberUnmount==`function`)try{Ze.onCommitFiberUnmount(Xe,n)}catch{}switch(n.tag){case 26:iu||Tl(n,t),Su(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!iu&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:iu||Tl(n,t),Ol(n);var r=bu,i=xu;wp(n.type)&&(bu=n.stateNode,xu=!1),Su(e,t,n),vm(n.stateNode,n.type,n.memoizedProps),bu=r,xu=i;break;case 5:iu||Tl(n,t),Ol(n);case 6:if(n.tag===6&&Ol(n),r=bu,i=xu,bu=null,Su(e,t,n),bu=r,xu=i,bu!==null){if(xu)try{(bu.nodeType===9?bu.body:bu.nodeName===`HTML`?bu.ownerDocument.body:bu).removeChild(n.stateNode),Kt=!0}catch(e){X(n,t,e)}else try{bu.removeChild(n.stateNode),Kt=!0}catch(e){X(n,t,e)}}break;case 18:bu!==null&&(xu?(e=bu,Tp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Wh(e)):Tp(bu,n.stateNode));break;case 4:r=bu,i=xu,bu=n.stateNode.containerInfo,xu=!0,Su(e,t,n),bu=r,xu=i;break;case 0:case 11:case 14:case 15:xl(2,n,t),iu||xl(4,n,t),Su(e,t,n);break;case 1:iu||(Tl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Cl(n,t,r)),Su(e,t,n);break;case 21:Su(e,t,n);break;case 22:iu=(r=iu)||n.memoizedState!==null,Su(e,t,n),iu=r;break;case 30:Tl(n,t),Su(e,t,n);break;case 7:iu||Tl(n,t),Su(e,t,n);break;default:Su(e,t,n)}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Wh(e)}catch(e){X(t,t.return,e)}}}function Tu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Wh(e)}catch(e){X(t,t.return,e)}}function Eu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new su),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new su),t;default:throw Error(i(435,e.tag))}}function Du(e,t){var n=Eu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=yf.bind(null,e,t);t.then(r,r)}})}function Ou(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(wp(l.type)){bu=l.stateNode,xu=!1;break a}break;case 5:bu=l.stateNode,xu=!1;break a;case 3:case 4:bu=l.stateNode.containerInfo,xu=!0;break a}l=l.return}if(bu===null)throw Error(i(160));Cu(s,c,o),bu=null,xu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Au(t,e,n),t=t.sibling}var ku=null;function Au(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Ou(t,e,n),ju(e),a&4&&(xl(3,e,e.return),bl(3,e),xl(5,e,e.return));break;case 1:Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),a&64&&ru&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ku,Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(ru)e.stateNode=mp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[kt]||r[Ct]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),ip(r,t,n),r[Ct]=e,It(r),t=r;break a;case`link`:if(o=qm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),ip(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=qm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),ip(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Ct]=e,It(r),t=r}e.stateNode=t}}else ru||Jm(o,e.type,e.stateNode)}else e.stateNode=Hm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Ml(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||iu||t.parentNode.removeChild(t)):a.count--,n===null?ru||Jm(o,e.type,e.stateNode):Hm(o,n,e.memoizedProps))}break;case 27:Ou(t,e,n),ju(e),a&512&&(iu||r===null||Tl(r,r.return)),r!==null&&a&4&&Ml(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=au,au=!1,Ou(t,e,n),au=o,ju(e),a&512&&(iu||r===null||Tl(r,r.return)),e.flags&32){t=e.stateNode;try{dn(t,``),Kt=!0}catch(t){X(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Ml(e,t,r===null?t:r.memoizedProps)),a&1024&&(ou=!0);break;case 6:if(Ou(t,e,n),ju(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Kt=!0}catch(t){X(e,e.return,t)}}break;case 3:if(Kt=!1,Km=null,o=ku,ku=Sm(t.containerInfo),Ou(t,e,n),ku=o,ju(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Wh(t.containerInfo)}catch(t){X(e,e.return,t)}ou&&(ou=!1,Mu(e)),Kt=!1;break;case 4:a=au,au=ru,r=qt(),o=ku,ku=Sm(e.stateNode.containerInfo),Ou(t,e,n),ju(e),ku=o,Kt&&uu&&(du=!0),Kt=r,au=a;break;case 12:Ou(t,e,n),ju(e);break;case 31:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 13:Ou(t,e,n),ju(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=Ve()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=ru,l=iu,u=au;ru=c||o,au=u||o,iu=l||s,Ou(t,e,n),iu=l,au=u,ru=c,ju(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||ru||iu||(t=s||iu,n=ru,r=iu,ru=o||ru,iu=t,Iu(e,2),ru=n,iu=r),!o&&au||gu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Du(e,n))));break;case 19:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 30:a&512&&(iu||r===null||Tl(r,r.return)),a=qt(),o=uu,s=(n&335544064)===n,c=e.memoizedProps,uu=s&&yi(c.default,c.update)!==`none`,Ou(t,e,n),ju(e),s&&r!==null&&Kt&&(e.flags|=4),uu=o,Kt=a;break;case 21:break;case 7:a&512&&(iu||r===null||Tl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Ou(t,e,n),ju(e)}}function ju(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Nl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Al(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(kl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Il(e,Pl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(dn(l,``),n.flags&=-33),Il(e,Pl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Fl(e,Pl(e),u,s);break;default:throw Error(i(161))}}catch(t){X(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Mu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Mu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,vh=!0,t.reset(),vh=!1),e=e.sibling}}function Nu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Pu(t,e),t=t.sibling;else nu(t,!1)}function Pu(e,t){var n=e.alternate;if(n===null)Jl(e,!1);else switch(e.tag){case 3:if(fu=lu=!1,Hl(),Nu(t,e),!lu&&!du){if(e=Vl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Op(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),fu=!0}Vl=null;break;case 5:Nu(t,e);break;case 4:r=lu,lu=!1,Nu(t,e),lu&&(du=!0),lu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Nu(t,e):Jl(e,!1));break;case 30:r=lu,i=Hl(),lu=!1,Nu(t,e),lu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=_i(a,o),o=_i(n.memoizedProps,o);var s=yi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Ul=0,t=tu(e,n,t,o,s,a,!0),Ul!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Pd(e,e.memoizedProps.onUpdate),Vl=i):i!==null&&(i.push.apply(i,Vl),Vl=i),lu=e.flags&32?!0:r;break;default:Nu(t,e)}}function Fu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)hu(e,t.alternate,t),t=t.sibling}function Iu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:xl(4,n,n.return),Iu(n,r);break;case 1:Tl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Cl(n,n.return,i),Iu(n,r);break;case 27:r&2&&vm(n.stateNode,n.type,n.memoizedProps);case 5:Tl(n,n.return),n.tag!==5&&n.tag!==27||Ol(n),Iu(n,r);break;case 6:Ol(n);break;case 26:Tl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||iu||i.parentNode.removeChild(i),Iu(n,r);break;case 22:n.memoizedState===null&&Iu(n,r);break;case 30:Tl(n,n.return),Iu(n,r);break;case 7:Tl(n,n.return);default:Iu(n,r)}e=e.sibling}}function Lu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Lu(i,a,n),bl(4,a);break;case 1:if(Lu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){X(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)xo(l[i],c)}catch(e){X(r,r.return,e)}}s&&o&64&&Sl(a),wl(a,a.return);break;case 27:n&2&&Ll(a);case 5:a.tag!==5&&a.tag!==27||Dl(a),Lu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 6:Dl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||ru||Jm(Sm(c.ownerDocument),a.type,c),Lu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 12:Lu(i,a,n);break;case 31:Lu(i,a,n),s&&o&4&&wu(i,a);break;case 13:Lu(i,a,n),s&&o&4&&Tu(i,a);break;case 22:a.memoizedState===null&&Lu(i,a,n),wl(a,a.return);break;case 30:Lu(i,a,n),wl(a,a.return);break;case 7:wl(a,a.return);default:Lu(i,a,n)}t=t.sibling}}function Ru(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Aa(n))}function zu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Aa(e))}function Bu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Vu(e,t,n,r),t=t.sibling;else i&&eu(t)}function Vu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&$l(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Bu(e,t,n,r),a&2048&&bl(9,t);break;case 1:Bu(e,t,n,r);break;case 3:Bu(e,t,n,r),i&&fu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Aa(a)));break;case 12:if(a&2048){Bu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){X(t,t.return,e)}}else Bu(e,t,n,r);break;case 31:Bu(e,t,n,r);break;case 13:Bu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&$l(t),o._visibility&2?Bu(e,t,n,r):(o._visibility|=2,Hu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&$l(s),o._visibility&2?Bu(e,t,n,r):Uu(e,t)),a&2048&&Ru(s,t);break;case 24:Bu(e,t,n,r),a&2048&&zu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Kl(a.child,!0),Kl(t.child,!0))),Bu(e,t,n,r);break;default:Bu(e,t,n,r)}}function Hu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Hu(a,o,s,c,i),bl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Hu(a,o,s,c,i)):u._visibility&2?Hu(a,o,s,c,i):Uu(a,o),i&&l&2048&&Ru(o.alternate,o);break;case 24:Hu(a,o,s,c,i),i&&l&2048&&zu(o.alternate,o);break;default:Hu(a,o,s,c,i)}t=t.sibling}}function Uu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Uu(n,r),i&2048&&Ru(r.alternate,r);break;case 24:Uu(n,r),i&2048&&zu(r.alternate,r);break;default:Uu(n,r)}t=t.sibling}}var Wu=8192;function Gu(e,t,n){if(e.subtreeFlags&Wu)for(e=e.child;e!==null;)Ku(e,t,n),e=e.sibling}function Ku(e,t,n){switch(e.tag){case 26:Gu(e,t,n),e.flags&Wu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&$m(n,e)):eh(n,ku,e.memoizedState,e.memoizedProps));break;case 5:Gu(e,t,n),e.flags&Wu&&(e=e.stateNode,(t&335544128)===t&&$m(n,e));break;case 3:case 4:var r=ku;ku=Sm(e.stateNode.containerInfo),Gu(e,t,n),ku=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Wu,Wu=16777216,Gu(e,t,n),Wu=r):Gu(e,t,n));break;case 30:if((e.flags&Wu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,zl===null&&(zl=new Map),zl.set(r,i)}Gu(e,t,n);break;default:Gu(e,t,n)}}function qu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ju(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];cu=r,K(r,e)}qu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Yu(e),e=e.sibling}function Yu(e){switch(e.tag){case 0:case 11:case 15:Ju(e),e.flags&2048&&xl(9,e,e.return);break;case 3:Ju(e);break;case 12:Ju(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Xu(e)):Ju(e);break;default:Ju(e)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];cu=r,K(r,e)}qu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:xl(8,t,t.return),Xu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Xu(t));break;default:Xu(t)}e=e.sibling}}function K(e,t){for(;cu!==null;){var n=cu;switch(n.tag){case 0:case 11:case 15:xl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Aa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,cu=r;else a:for(n=e;cu!==null;){r=cu;var i=r.sibling,a=r.return;if(yu(r),r===n){cu=null;break a}if(i!==null){i.return=a,cu=i;break a}cu=a}}}var Zu={getCacheForType:function(e){var t=Sa(Oa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Sa(Oa).controller.signal}},Qu=typeof WeakMap==`function`?WeakMap:Map,q=0,$u=null,J=null,Y=0,ed=0,td=null,nd=!1,rd=!1,id=!1,ad=0,od=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,bd=0,xd=null,Sd=null,Cd=0,wd=0,Td=null,Ed=null,Dd=null,Od=null,kd=null,Ad=0,jd=null;function Md(){return q&2&&Y!==0?Y&-Y:F.T===null?bt():Ff()}function Nd(){if(ud===0){if(!(Y&536870912)||U){var e=it;it<<=1,!(it&3932160)&&(it=262144),ud=e}else ud=536870912}return e=Oo.current,e!==null&&(e.flags|=32),ud}function Pd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Ip(_i(e.memoizedProps,n))),Od===null&&(Od=[]),Od.push(t.bind(null,r))}}function Fd(e,t,n){(e===$u&&(ed===2||ed===9)||e.cancelPendingCommit!==null)&&(Hd(e,0),zd(e,Y,ud,!1)),pt(e,n),q&2&&e===$u||(e===$u&&(!(q&2)&&(cd|=n),od===4&&zd(e,Y,ud,!1)),Df(e))}function Id(e,t,n){if(q&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ct(e,t),a=r?Xd(e,t):Jd(e,t,!0),o=r;do{if(a===0){rd&&!r&&zd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Rd(n))a=Jd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Hd(c,s).flags|=256),s=Jd(c,s,!1),s!==2&&s!==6){if(id&&!l){c.errorRecoveryDisabledLanes|=o,cd|=o,a=4;break a}o=pd,pd=a,o!==null&&(pd===null?pd=o:pd.push.apply(pd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Hd(e,0),zd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:zd(r,t,ud,!nd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=hd+300-Ve(),10<a)){if(zd(r,t,ud,!nd),st(r,0,!0)!==0)break a;Cd=t,r.timeoutHandle=vp(Ld.bind(null,r,n,pd,vd,md,t,ud,cd,dd,nd,o,`Throttled`,-0,0),a);break a}Ld(r,n,pd,vd,md,t,ud,cd,dd,nd,o,null,-0,0)}break}}while(1);Df(e)}function Ld(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:yn},zl=null,Ku(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=ih.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-Ve():(a&4194048)===a?gd-Ve():0,m=nh(d,m),m!==null)?(Cd=a,e.cancelPendingCommit=m(rf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),zd(e,a,o,!l)):rf(e,t,a,n,r,i,o,s,c,l,u,d)}function Rd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Hr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function zd(e,t,n,r){t=lt(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-$e(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ht(e,n,t)}function Bd(){return q&6?!0:(Of(0,!1),!1)}function Vd(){if(J!==null){if(ed===0)var e=J.return;else e=J,ma=pa=null,rs(e),no=null,ro=0,e=J;for(;e!==null;)yl(e.alternate,e),e=e.return;J=null}}function Hd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,yp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Cd=0,Vd(),$u=e,J=n=Ni(e.current,null),Y=t,ed=0,td=null,nd=!1,rd=ct(e,t),id=!1,dd=ud=ld=cd=sd=od=0,pd=fd=null,md=!1,ad=lt(e,t),Ci(),n}function Ud(e,t){W=null,F.H=fc,t===Ka||t===Ja?(t=eo(),ed=3):t===qa?(t=eo(),ed=4):ed=t===Ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,td=t,J===null&&(od=1,wc(e,Bi(t,e.current)))}function Wd(){var e=Oo.current;return e===null?!0:(Y&4194048)===Y?ko===null:(Y&62914560)===Y||Y&536870912?e===ko:!1}function Gd(){var e=F.H;return F.H=fc,e===null?fc:e}function Kd(){var e=F.A;return F.A=Zu,e}function qd(){od=4,nd||(Y&4194048)!==Y&&Oo.current!==null||(rd=!0),!(sd&134217727)&&!(cd&134217727)||$u===null||zd($u,Y,ud,!1)}function Jd(e,t,n){var r=q;q|=2;var i=Gd(),a=Kd();($u!==e||Y!==t)&&(vd=null,Hd(e,t)),t=!1;var o=od;a:do try{if(ed!==0&&J!==null){var s=J,c=td;switch(ed){case 8:Vd(),o=6;break a;case 3:case 2:case 9:case 6:Oo.current===null&&(t=!0);var l=ed;if(ed=0,td=null,ef(e,s,c,l),n&&rd){o=0;break a}break;default:l=ed,ed=0,td=null,ef(e,s,c,l)}}Yd(),o=od;break}catch(t){Ud(e,t)}while(1);return t&&e.shellSuspendCounter++,ma=pa=null,q=r,F.H=i,F.A=a,J===null&&($u=null,Y=0,Ci()),o}function Yd(){for(;J!==null;)Qd(J)}function Xd(e,t){var n=q;q|=2;var r=Gd(),a=Kd();$u!==e||Y!==t?(vd=null,_d=Ve()+500,Hd(e,t)):rd=ct(e,t);a:do try{if(ed!==0&&J!==null){t=J;var o=td;b:switch(ed){case 1:ed=0,td=null,ef(e,t,o,1);break;case 2:case 9:if(Xa(o)){ed=0,td=null,$d(t);break}t=function(){ed!==2&&ed!==9||$u!==e||(ed=7),Df(e)},o.then(t,t);break a;case 3:ed=7;break a;case 4:ed=5;break a;case 7:Xa(o)?(ed=0,td=null,$d(t)):(ed=0,td=null,ef(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Zm(s):c.stateNode.complete){ed=0,td=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,tf(u))}break b}}ed=0,td=null,ef(e,t,o,5);break;case 6:ed=0,td=null,ef(e,t,o,6);break;case 8:Vd(),od=6;break a;default:throw Error(i(462))}}Zd();break}catch(t){Ud(e,t)}while(1);return ma=pa=null,F.H=r,F.A=a,q=n,J===null?($u=null,Y=0,Ci(),od):0}function Zd(){for(;J!==null&&!ze();)Qd(J)}function Qd(e){var t=ul(e.alternate,e,ad);e.memoizedProps=e.pendingProps,t===null?tf(e):J=t}function $d(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Wc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=Wc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:rs(t);var r=t;r===ea&&(U?(sa(r),r.tag===5&&r.stateNode!=null&&(ta=r.stateNode)):(sa(r),U=!0));default:yl(n,t),t=J=Pi(t,ad),t=ul(n,t,ad)}e.memoizedProps=e.pendingProps,t===null?tf(e):J=t}function ef(e,t,n,r){ma=pa=null,rs(t),no=null,ro=0;var i=t.return;try{if(kc(e,i,t,n,Y)){od=1,wc(e,Bi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;od=1,wc(e,Bi(n,e.current)),J=null;return}t.flags&32768?(U||r===1?e=!0:rd||Y&536870912?e=!1:(nd=e=!0,(r===2||r===9||r===3||r===6)&&(r=Oo.current,r!==null&&r.tag===13&&(r.flags|=16384))),nf(t,e)):tf(t)}function tf(e){var t=e;do{if(t.flags&32768){nf(t,nd);return}e=t.return;var n=_l(t.alternate,t,ad);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);od===0&&(od=5)}function nf(e,t){do{var n=vl(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);od=6,J=null}function rf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do ff();while(bd!==0);if(q&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===$u&&(J=$u=null,Y=0),Sd=t,xd=e,Cd=n,Td=a,Ed=r,af(e,t,n,s,c,l,f)}}function af(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(wd=s,s|=B,mt(e,n,s,r,i,a),Od=null,(n&335544064)===n?(kd=Na(e),r=10262):(kd=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,bf(Ge,function(){return pf(),null})):(e.callbackNode=null,e.callbackPriority=0),Rl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=F.T,F.T=null,i=I.p,I.p=2,a=q,q|=4;try{pu(e,t,n)}finally{q=a,I.p=i,F.T=r}}bd=1,Rl?Dd=Pp(o,e.containerInfo,kd,cf,lf,sf,uf,pf,of,null,null):(cf(),lf(),uf())}function of(e){if(bd!==0){var t=xd.onRecoverableError;t(e,{componentStack:null})}}function sf(){bd===3&&(bd=0,Pu(Sd,xd),bd=4)}function cf(){if(bd===1){bd=0;var e=xd,t=Sd,n=Cd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=F.T,F.T=null;var i=I.p;I.p=2;var a=q;q|=4;try{uu=du=!1,Au(t,e,n),n=up;var o=Jr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&qr(s.ownerDocument.documentElement,s)){if(c!==null&&Yr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Kr(s,h),v=Kr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}vh=!!lp,up=lp=null}finally{q=a,I.p=i,F.T=r}}e.current=t,bd=2}}function lf(){if(bd===2){bd=0;var e=xd,t=Sd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=F.T,F.T=null;var r=I.p;I.p=2;var i=q;q|=4;try{hu(e,t.alternate,t)}finally{q=i,I.p=r,F.T=n}}bd=3}}function uf(){if(bd===4||bd===3){bd=0;var e=Dd;Dd=null,Be();var t=xd,n=Sd,r=Cd,i=Ed,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?bd=5:(bd=0,Sd=xd=null,df(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),yt(r),n=n.stateNode,Ze&&typeof Ze.onCommitFiberRoot==`function`)try{Ze.onCommitFiberRoot(Xe,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=F.T,a=I.p,I.p=2,F.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{F.T=n,I.p=a}}if(i=Od,o=kd,kd=null,i!==null&&(Od=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Cd&3&&ff(),Df(t),a=t.pendingLanes,r&261930&&a&42?t===jd?Ad++:(Ad=0,jd=t):(Ad=0,jd=null),Of(0,!1)}}function df(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Aa(t)))}function ff(){return Dd!==null&&(Dd.skipTransition(),Dd=null),cf(),lf(),uf(),pf()}function pf(){if(bd!==5)return!1;var e=xd,t=wd;wd=0;var n=yt(Cd),r=F.T,a=I.p;try{I.p=32>n?32:n,F.T=null,n=Td,Td=null;var o=xd,s=Cd;if(bd=0,Sd=xd=null,Cd=0,q&6)throw Error(i(331));var c=q;if(q|=4,Yu(o.current),Vu(o,o.current,s,n),q=c,Of(0,!1),Ze&&typeof Ze.onPostCommitFiberRoot==`function`)try{Ze.onPostCommitFiberRoot(Xe,o)}catch{}return!0}finally{I.p=a,F.T=r,df(e,t)}}function mf(e,t,n){t=Bi(n,t),t=Ec(e.stateNode,t,2),e=ho(e,t,2),e!==null&&(pt(e,2),Df(e))}function X(e,t,n){if(e.tag===3)mf(e,e,n);else for(;t!==null;){if(t.tag===3){mf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Bi(n,e),n=Dc(2),r=ho(t,n,2),r!==null&&(Oc(n,r,t,e),pt(r,2),Df(r));break}}t=t.return}}function hf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Qu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(id=!0,i.add(n),e=gf.bind(null,e,t,n),t.then(e,e))}function gf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,$u===e&&(Y&n)===n&&(od===4||od===3&&(Y&62914560)===Y&&300>Ve()-hd?q&2?ld|=n:Hd(e,0):ld|=n,dd===Y&&(dd=0)),Df(e)}function _f(e,t){t===0&&(t=dt()),e=Ei(e,t),e!==null&&(pt(e,t),Df(e))}function vf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),_f(e,n)}function yf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),_f(e,n)}function bf(e,t){return Le(e,t)}var xf=null,Sf=null,Cf=!1,wf=!1,Tf=!1,Ef=0;function Df(e){e!==Sf&&e.next===null&&(Sf===null?xf=Sf=e:Sf=Sf.next=e),wf=!0,Cf||(Cf=!0,Pf())}function Of(e,t){if(!Tf&&wf){Tf=!0;do for(var n=!1,r=xf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-$e(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Nf(r,a))}else a=Y,a=st(r,r===$u?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ct(r,a)||(n=!0,Nf(r,a))}r=r.next}while(n);Tf=!1}}function kf(){Af()}function Af(){wf=Cf=!1;var e=0;Ef!==0&&_p()&&(e=Ef);for(var t=Ve(),n=null,r=xf;r!==null;){var i=r.next,a=jf(r,t);a===0?(r.next=null,n===null?xf=i:n.next=i,i===null&&(Sf=n)):(n=r,(e!==0||a&3)&&(wf=!0)),r=i}bd!==0&&bd!==5||Of(e,!1),Ef!==0&&(Ef=0)}function jf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-$e(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=ut(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=$u,n=Y,n=st(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(ed===2||ed===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Re(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ct(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Re(r),yt(n)){case 2:case 8:n=We;break;case 32:n=Ge;break;case 268435456:n=qe;break;default:n=Ge}return r=Mf.bind(null,e),n=Le(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Re(r),e.callbackPriority=2,e.callbackNode=null,2}function Mf(e,t){if(bd!==0&&bd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(ff()&&e.callbackNode!==n)return null;var r=Y;return r=st(e,e===$u?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Id(e,r,t),jf(e,Ve()),e.callbackNode!=null&&e.callbackNode===n?Mf.bind(null,e):null)}function Nf(e,t){if(ff())return null;Id(e,t,!0)}function Pf(){Sp(function(){q&6?Le(Ue,kf):Af()})}function Ff(){if(Ef===0){var e=Ia;e===0&&(e=rt,rt<<=1,!(rt&261888)&&(rt=256)),Ef=e}return Ef}function If(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:vn(e)}function Lf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=If((i[wt]||null).action),o=r.submitter;o&&(t=(t=o[wt]||null)?If(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Bn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Ef!==0){var e=new FormData(i,o);Qs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Qs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Rf=0;Rf<hi.length;Rf++){var zf=hi[Rf];gi(zf.toLowerCase(),`on`+(zf[0].toUpperCase()+zf.slice(1)))}gi(si,`onAnimationEnd`),gi(ci,`onAnimationIteration`),gi(li,`onAnimationStart`),gi(`dblclick`,`onDoubleClick`),gi(`focusin`,`onFocus`),gi(`focusout`,`onBlur`),gi(ui,`onTransitionRun`),gi(di,`onTransitionStart`),gi(fi,`onTransitionCancel`),gi(pi,`onTransitionEnd`),Vt(`onMouseEnter`,[`mouseout`,`mouseover`]),Vt(`onMouseLeave`,[`mouseout`,`mouseover`]),Vt(`onPointerEnter`,[`pointerout`,`pointerover`]),Vt(`onPointerLeave`,[`pointerout`,`pointerover`]),Bt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Bt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Bt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Bt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Bt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Bt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Bf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Vf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Bf));function Hf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){bi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){bi(e)}i.currentTarget=null,a=c}}}}function Z(e,t){var n=t[Et];n===void 0&&(n=t[Et]=new Set);var r=e+`__bubble`;n.has(r)||(Kf(t,e,2,!1),n.add(r))}function Uf(e,t,n){var r=0;t&&(r|=4),Kf(n,e,r,t)}var Wf=`_reactListening`+Math.random().toString(36).slice(2);function Gf(e){if(!e[Wf]){e[Wf]=!0,Rt.forEach(function(t){t!==`selectionchange`&&(Vf.has(t)||Uf(t,!1,e),Uf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Wf]||(t[Wf]=!0,Uf(`selectionchange`,!1,t))}}function Kf(e,t,n,r){switch(Th(t)){case 2:var i=yh;break;case 8:i=bh;break;default:i=xh}n=i.bind(null,t,n,e),i=void 0,!kn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function qf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Mt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}En(function(){var r=a,i=xn(n),s=[];a:{var c=mi.get(e);if(c!==void 0){var l=Bn,u=e;switch(e){case`keypress`:if(Fn(n)===0)break a;case`keydown`:case`keyup`:l=ir;break;case`focusin`:u=`focus`,l=Yn;break;case`focusout`:u=`blur`,l=Yn;break;case`beforeblur`:case`afterblur`:l=Yn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=qn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Jn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=sr;break;case si:case ci:case li:l=Xn;break;case pi:l=cr;break;case`scroll`:case`scrollend`:l=Hn;break;case`wheel`:l=lr;break;case`copy`:case`cut`:case`paste`:l=Zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=ar;break;case`submit`:l=or;break;case`toggle`:case`beforetoggle`:l=ur}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Dn(m,p),g!=null&&d.push(Jf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==bn&&(u=n.relatedTarget||n.fromElement)&&(Mt(u)||u[Tt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Mt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=qn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=ar,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Pt(c),h=l==null?u:Pt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Mt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Xf):null,c!==null&&Zf(s,u,c,d,!1),l!==null&&f!==null&&Zf(s,f,l,d,!0)))}a:{if(c=r?Pt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Ar;else if(wr(c)){if(jr)_=Br;else{_=Rr;var v=Lr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&hn(r.elementType)&&(_=Ar):_=zr;if(_&&=_(e,r)){Tr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Pt(r):window,e){case`focusin`:(wr(v)||v.contentEditable===`true`)&&(Zr=v,Qr=r,$r=null);break;case`focusout`:$r=Qr=Zr=null;break;case`mousedown`:ei=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ei=!1,ti(s,n,i);break;case`selectionchange`:if(Xr)break;case`keydown`:case`keyup`:ti(s,n,i)}var y;if(fr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else br?vr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(hr&&n.locale!==`ko`&&(br||b!==`onCompositionStart`?b===`onCompositionEnd`&&br&&(y=Pn()):(jn=i,Mn=`value`in jn?jn.value:jn.textContent,br=!0)),v=Yf(r,b),0<v.length&&(b=new Qn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=yr(n),y!==null&&(b.data=y)))),(y=mr?xr(e,n):Sr(e,n))&&(b=Yf(r,`onBeforeInput`),0<b.length&&(v=new Qn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),Lf(s,e,r,n,i)}Hf(s,t)})}function Jf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Yf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Dn(e,n),i!=null&&r.unshift(Jf(e,i,a)),i=Dn(e,t),i!=null&&r.push(Jf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Xf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Zf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Dn(n,a),l!=null&&o.unshift(Jf(n,l,c))):i||(l=Dn(n,a),l!=null&&o.push(Jf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Qf=/\r\n?/g,$f=/\u0000|\uFFFD/g;function ep(e){return(typeof e==`string`?e:``+e).replace(Qf,`
`).replace($f,``)}function tp(e,t){return t=ep(t),ep(e)===t}function np(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||dn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&dn(e,``+r);else return;break;case`className`:Yt(e,`class`,r);break;case`tabIndex`:Yt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Yt(e,n,r);break;case`style`:mn(e,r,o);return;case`data`:if(t!==`object`){Yt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=vn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&np(e,t,`name`,a.name,a,null),np(e,t,`formEncType`,a.formEncType,a,null),np(e,t,`formMethod`,a.formMethod,a,null),np(e,t,`formTarget`,a.formTarget,a,null)):(np(e,t,`encType`,a.encType,a,null),np(e,t,`method`,a.method,a,null),np(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=vn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=yn);return;case`onScroll`:r!=null&&Z(`scroll`,e);return;case`onScrollEnd`:r!=null&&Z(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=vn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Z(`beforetoggle`,e),Z(`toggle`,e),Jt(e,`popover`,r);break;case`xlinkActuate`:Xt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Xt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Xt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Xt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Xt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Xt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Xt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Xt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Xt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Jt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=gn.get(n)||n,Jt(e,n,r);else return}Kt=!0}function rp(e,t,n,r,a,o){switch(n){case`style`:mn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)dn(e,r);else if(typeof r==`number`||typeof r==`bigint`)dn(e,``+r);else return;break;case`onScroll`:r!=null&&Z(`scroll`,e);return;case`onScrollEnd`:r!=null&&Z(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=yn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!zt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[wt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}Kt=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Jt(e,n,r)}return}Kt=!0}function ip(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Z(`error`,e),Z(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:np(e,t,o,s,n,null)}}a&&np(e,t,`srcSet`,n.srcSet,n,null),r&&np(e,t,`src`,n.src,n,null);return;case`input`:Z(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:np(e,t,r,d,n,null)}}on(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Z(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:np(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&cn(e,!!r,n,!0):cn(e,!!r,t,!1);return;case`textarea`:for(s in Z(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:np(e,t,s,c,n,null)}un(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:np(e,t,l,r,n,null)}return;case`dialog`:Z(`beforetoggle`,e),Z(`toggle`,e),Z(`cancel`,e),Z(`close`,e);break;case`iframe`:case`object`:Z(`load`,e);break;case`video`:case`audio`:for(r=0;r<Bf.length;r++)Z(Bf[r],e);break;case`image`:Z(`error`,e),Z(`load`,e);break;case`details`:Z(`toggle`,e);break;case`embed`:case`source`:case`link`:Z(`error`,e),Z(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:np(e,t,u,r,n,null)}return;default:if(hn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&rp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&np(e,t,c,r,n,null))}var ap={};function op(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||np(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(Kt=!0),o=m;break;case`name`:m!==f&&(Kt=!0),a=m;break;case`checked`:m!==f&&(Kt=!0),u=m;break;case`defaultChecked`:m!==f&&(Kt=!0),d=m;break;case`value`:m!==f&&(Kt=!0),s=m;break;case`defaultValue`:m!==f&&(Kt=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&np(e,t,p,m,r,f)}}an(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||np(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(Kt=!0),p=o;break;case`defaultValue`:o!==l&&(Kt=!0),c=o;break;case`multiple`:o!==l&&(Kt=!0),s=o;default:o!==l&&np(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?cn(e,!!n,n?[]:``,!1):cn(e,!!n,t,!0)):cn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:np(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(Kt=!0),p=a;break;case`defaultValue`:a!==o&&(Kt=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&np(e,t,s,a,r,o)}ln(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:np(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(Kt=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:np(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&np(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:np(e,t,u,p,r,m)}return;default:if(hn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&rp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||rp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&np(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||np(e,t,f,p,r,m)}function sp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function cp(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&sp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&sp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var lp=null,up=null;function dp(e){return e.nodeType===9?e:e.ownerDocument}function fp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function pp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function mp(e,t,n,r){return n=dp(n).createElement(e),n[Ct]=r,n[wt]=t,ip(n,e,t),It(n),n}function hp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var gp=null;function _p(){var e=window.event;return e&&e.type===`popstate`?e!==gp&&(gp=e,!0):(gp=null,!1)}var vp=typeof setTimeout==`function`?setTimeout:void 0,yp=typeof clearTimeout==`function`?clearTimeout:void 0,bp=typeof Promise==`function`?Promise:void 0,xp=typeof requestAnimationFrame==`function`?requestAnimationFrame:vp,Sp=typeof queueMicrotask==`function`?queueMicrotask:bp===void 0?vp:function(e){return bp.resolve(null).then(e).catch(Cp)};function Cp(e){setTimeout(function(){throw e})}function wp(e){return e===`head`}function Tp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Wh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)ym(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,ym(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[kt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&ym(e.ownerDocument.body)}n=i}while(n);Wh(t)}function Ep(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Dp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Op(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function kp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Ap(e){return kp(e.getBoundingClientRect(),getComputedStyle(e),e)}function jp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return kp(t,n,e)}function Mp(e){return e.documentElement.clientHeight}function Np(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Pp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Mp(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Qm(f),u>th){s.length=o;break}f=new Promise(Np.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Fp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Fp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Fp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Fp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Ip(e){return{name:e,group:new Fp(`group`,e),imagePair:new Fp(`image-pair`,e),old:new Fp(`old`,e),new:new Fp(`new`,e)}}function Lp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Lp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Hp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Bp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Rp,e,s,r)}this._eventListeners=a}};function Rp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Lp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Hp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Bp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,zp,e,n,i),r.splice(t,1),a!==null&&a()}};function zp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Bp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Vp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Hp(e,t,n,r){if(e.length===0)return-1;r=Vp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Vp(a.optionsOrUseCapture)===r)return i}return-1}Lp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Bp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Bp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Lp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Up,e,void 0,void 0)};function Up(e,t){return e.tag!==6&&(e=b(e),hm(e,t))}Lp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Wp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Up(t[n],e);n--);};function Wp(e,t){return t.push(e),!1}Lp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=dp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,Gp,e,void 0,void 0))};function Gp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Lp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Kp,e,void 0,void 0)};function Kp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Lp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,qp,e,void 0,void 0);for(var n=t=0;n<Jp.length;n++){var r=Jp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Jp[t++]=r}Jp.length=t}};function qp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Jp=[],Yp=!1;function Xp(e,t,n){Jp.push({fragmentInstance:e,observer:t,instance:n}),Yp||(Yp=!0,gm(function(){Yp=!1;var e=Jp;Jp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Lp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,Zp,e,void 0,void 0),e};function Zp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Lp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Lp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Wp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Qp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Qp(e,t,n,r,i){var a=Mt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function $p(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Lp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Wp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),$p(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),$p(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function em(e,t){return e=b(e),tm(e,t),!1}function tm(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function nm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Bp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Jp.length;i++){var a=Jp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Jp[r++]=a)}Jp.length=r,n.observe(e)}),tm(e,t))}function rm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Bp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Xp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function im(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:im(n),jt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function am(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[kt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=dm(e.nextSibling),e===null)break}return null}function om(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=dm(e.nextSibling),e===null))return null;return e}function sm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=dm(e.nextSibling),e===null))return null;return e}function cm(e){return e.data===`$?`||e.data===`$~`}function lm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function um(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function dm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var fm=null;function pm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return dm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function mm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function hm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function gm(e){xp(function(){xp(function(t){return e(t)})})}function _m(e,t,n){switch(t=dp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function vm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&np(e,t,r,null,ap,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===yn&&(e.onclick=null),jt(e)}function ym(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);jt(e)}var bm=new Map,xm=new Set;function Sm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Cm=I.d;I.d={f:wm,r:Tm,D:Om,C:km,L:Am,m:jm,X:Nm,S:Mm,M:Pm};function wm(){var e=Cm.f(),t=Bd();return e||t}function Tm(e){var t=Nt(e);t!==null&&t.tag===5&&t.type===`form`?ec(t):Cm.r(e)}var Em=typeof document>`u`?null:document;function Dm(e,t,n){var r=Em;if(r&&typeof t==`string`&&t){var i=rn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),xm.has(i)||(xm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),ip(t,`link`,e),It(t),r.head.appendChild(t)))}}function Om(e){Cm.D(e),Dm(`dns-prefetch`,e,null)}function km(e,t){Cm.C(e,t),Dm(`preconnect`,e,t)}function Am(e,t,n){Cm.L(e,t,n);var r=Em;if(r&&e&&t){var i=`link[rel="preload"][as="`+rn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+rn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+rn(n.imageSizes)+`"]`)):i+=`[href="`+rn(e)+`"]`;var a=i;switch(t){case`style`:a=Im(e);break;case`script`:a=Bm(e)}if(!(bm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),bm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Lm(a))||t===`script`&&r.querySelector(Vm(a))))){var o=r.createElement(`link`);ip(o,`link`,e),t===`style`&&(o[At]=!0,o.onload=o.onerror=function(){Lt(o)}),It(o),r.head.appendChild(o)}}}function jm(e,t){Cm.m(e,t);var n=Em;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+rn(r)+`"][href="`+rn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Bm(e)}if(!bm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),bm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Vm(a)))return}r=n.createElement(`link`),ip(r,`link`,e),It(r),n.head.appendChild(r)}}}function Mm(e,t,n){Cm.S(e,t,n);var r=Em;if(r&&e){var i=Ft(r).hoistableStyles,a=Im(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Lm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=bm.get(a))&&Wm(e,n);var c=o=r.createElement(`link`);It(c),ip(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Um(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Nm(e,t){Cm.X(e,t);var n=Em;if(n&&e){var r=Ft(n).hoistableScripts,i=Bm(e),a=r.get(i);a||(a=n.querySelector(Vm(i)),a||(e=D({src:e,async:!0},t),(t=bm.get(i))&&Gm(e,t),a=n.createElement(`script`),It(a),ip(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Pm(e,t){Cm.M(e,t);var n=Em;if(n&&e){var r=Ft(n).hoistableScripts,i=Bm(e),a=r.get(i);a||(a=n.querySelector(Vm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=bm.get(i))&&Gm(e,t),a=n.createElement(`script`),It(a),ip(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Fm(e,t,n,r){var a=(a=we.current)?Sm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Im(n.href),t=Ft(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Im(n.href);var o=Ft(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Lm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=bm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},bm.set(e,o)),zm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Bm(n),t=Ft(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Im(e){return`href="`+rn(e)+`"`}function Lm(e){return`link[rel="stylesheet"][`+e+`]`}function Rm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function zm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[At]){r.loading=1;return}}else t=e.createElement(`link`),t[At]=!0,t.onload=t.onerror=Lt.bind(null,t),ip(t,`link`,n),It(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Bm(e){return`[src="`+rn(e)+`"]`}function Vm(e){return`script[async]`+e}function Hm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+rn(n.href)+`"]`);if(r)return t.instance=r,It(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),It(r),ip(r,`style`,a),Um(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Im(n.href);var o=e.querySelector(Lm(a));if(o)return t.state.loading|=4,t.instance=o,It(o),o;r=Rm(n),(a=bm.get(a))&&Wm(r,a),o=(e.ownerDocument||e).createElement(`link`),It(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),ip(o,`link`,r),t.state.loading|=4,Um(o,n.precedence,e),t.instance=o;case`script`:return o=Bm(n.src),(a=e.querySelector(Vm(o)))?(t.instance=a,It(a),a):(r=n,(a=bm.get(o))&&(r=D({},n),Gm(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),It(a),ip(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Um(r,n.precedence,e));return t.instance}function Um(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Wm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Gm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Km=null;function qm(e,t,n){if(Km===null){var r=new Map,i=Km=new Map;i.set(n,r)}else i=Km,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[kt]||a[Ct]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Jm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Ym(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Xm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Zm(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Qm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function $m(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Qm(t),e.suspenseyImages.push(t)),e=ah.bind(e),t.decode().then(e,e))}function eh(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Im(r.href),a=t.querySelector(Lm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=ih.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,It(a);return}a=t.ownerDocument||t,r=Rm(r),(i=bm.get(i))&&Wm(r,i),a=a.createElement(`link`),It(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),ip(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=ih.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var th=0;function nh(e,t){return e.stylesheets&&e.count===0&&sh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&th===0&&(th=62500*cp());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>th?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function rh(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)sh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function ih(){this.count--,rh(this)}function ah(){this.imgCount--,rh(this)}var oh=null;function sh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,oh=new Map,t.forEach(ch,e),oh=null,ih.call(e))}function ch(e,t){if(!(t.state.loading&4)){var n=oh.get(e);if(n)var r=n.get(null);else{n=new Map,oh.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=ih.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var lh={$$typeof:N,Provider:null,Consumer:null,_currentValue:ge,_currentValue2:ge,_threadCount:0};function uh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ft(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ft(0),this.hiddenUpdates=ft(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function dh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new uh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ji(3,null,null,t),e.current=a,a.stateNode=e,t=ka(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},fo(a),e}function fh(e){return e?(e=ki,e):ki}function ph(e,t,n,r,i,a){i=fh(i),r.context===null?r.context=i:r.pendingContext=i,r=mo(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=ho(e,r,t),n!==null&&(Fd(n,e,t),go(n,e,t))}function mh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function hh(e,t){mh(e,t),(e=e.alternate)&&mh(e,t)}function gh(e){if(e.tag===13||e.tag===31){var t=Ei(e,67108864);t!==null&&Fd(t,e,67108864),hh(e,67108864)}}function _h(e){if(e.tag===13||e.tag===31){var t=Md();t=vt(t);var n=Ei(e,t);n!==null&&Fd(n,e,t),hh(e,t)}}var vh=!0;function yh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=2,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function bh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=8,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function xh(e,t,n,r){if(vh){var i=Sh(r);if(i===null)qf(e,t,r,Ch,n),Ph(e,r);else if(Ih(i,e,t,n,r))r.stopPropagation();else if(Ph(e,r),t&4&&-1<Nh.indexOf(e)){for(;i!==null;){var a=Nt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ot(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-$e(o);s.entanglements[1]|=c,o&=~c}Df(a),!(q&6)&&(_d=Ve()+500,Of(0,!1))}}break;case 31:case 13:s=Ei(a,2),s!==null&&Fd(s,a,2),Bd(),hh(a,2)}if(a=Sh(r),a===null&&qf(e,t,r,Ch,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else qf(e,t,r,null,n)}}function Sh(e){return e=xn(e),wh(e)}var Ch=null;function wh(e){if(Ch=null,e=Mt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ch=e,null}function Th(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(He()){case Ue:return 2;case We:return 8;case Ge:case Ke:return 32;case qe:return 268435456;default:return 32}default:return 32}}var Eh=!1,Dh=null,Oh=null,kh=null,Ah=new Map,jh=new Map,Mh=[],Nh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ph(e,t){switch(e){case`focusin`:case`focusout`:Dh=null;break;case`dragenter`:case`dragleave`:Oh=null;break;case`mouseover`:case`mouseout`:kh=null;break;case`pointerover`:case`pointerout`:Ah.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:jh.delete(t.pointerId)}}function Fh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Nt(t),t!==null&&gh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ih(e,t,n,r,i){switch(t){case`focusin`:return Dh=Fh(Dh,e,t,n,r,i),!0;case`dragenter`:return Oh=Fh(Oh,e,t,n,r,i),!0;case`mouseover`:return kh=Fh(kh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Ah.set(a,Fh(Ah.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,jh.set(a,Fh(jh.get(a)||null,e,t,n,r,i)),!0}return!1}function Lh(e){var t=Mt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,xt(e.priority,function(){_h(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,xt(e.priority,function(){_h(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Rh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Sh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);bn=r,n.target.dispatchEvent(r),bn=null}else return t=Nt(n),t!==null&&gh(t),e.blockedOn=n,!1;t.shift()}return!0}function zh(e,t,n){Rh(e)&&n.delete(t)}function Bh(){Eh=!1,Dh!==null&&Rh(Dh)&&(Dh=null),Oh!==null&&Rh(Oh)&&(Oh=null),kh!==null&&Rh(kh)&&(kh=null),Ah.forEach(zh),jh.forEach(zh)}function Vh(e,n){e.blockedOn===n&&(e.blockedOn=null,Eh||(Eh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Bh)))}var Hh=null;function Uh(e){Hh!==e&&(Hh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Hh===e&&(Hh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(wh(r||n)===null)continue;break}var a=Nt(n);a!==null&&(e.splice(t,3),t-=3,Qs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Wh(e){function t(t){return Vh(t,e)}Dh!==null&&Vh(Dh,e),Oh!==null&&Vh(Oh,e),kh!==null&&Vh(kh,e),Ah.forEach(t),jh.forEach(t);for(var n=0;n<Mh.length;n++){var r=Mh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Mh.length&&(n=Mh[0],n.blockedOn===null);)Lh(n),n.blockedOn===null&&Mh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[wt]||null;if(typeof a==`function`)o||Uh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[wt]||null)s=o.formAction;else if(wh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Uh(n)}}}function Gh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Kh(e){this._internalRoot=e}qh.prototype.render=Kh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;ph(n,Md(),e,t,null,null)},qh.prototype.unmount=Kh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ph(e.current,2,null,e,null,null),Bd(),t[Tt]=null}};function qh(e){this._internalRoot=e}qh.prototype.unstable_scheduleHydration=function(e){if(e){var t=bt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Mh.length&&t!==0&&t<Mh[n].priority;n++);Mh.splice(n,0,e),n===0&&Lh(e)}};var Jh=n.version;if(Jh!==`19.3.1`)throw Error(i(527,Jh,`19.3.1`));I.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Yh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:F,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Xh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xh.isDisabled&&Xh.supportsFiber)try{Xe=Xh.inject(Yh),Ze=Xh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=xc,s=Sc,c=Cc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=dh(e,1,!1,null,null,n,r,null,o,s,c,Gh),e[Tt]=t.current,Gf(e),new Kh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,ee=10**120*8,j=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),te=[j(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),j(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),j(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:6}),j(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),j(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),j(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:3,clockSpeedPower:2}),j(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:5}),j(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),j(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),j(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),j(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),j(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),j(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),j(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),j(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),j(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:30}),j(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),j(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),j(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),j(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:ee,levers:{clockSpeedPower:.5}}],M=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),N=te.map(e=>({...e,rule:[e.rule,M(e.levers)].filter(Boolean).join(` `)})),ne=.5,re=1e3,ie=.01,P=1e3,ae=1e6,oe=.05,se=.02,ce=Object.fromEntries(N.map(e=>[e.id,e])),le=new Set(N.map(e=>e.id)),ue={enabled:!0},de={enabled:!0},fe=.05,pe=[1,2,3,4,5,6,7,8,9,10],me=[{id:`firstSession`,name:`First session`,boostArea:`foundry`},{id:`foundry`,name:`Foundry`,boostArea:`foundry`},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`},{id:`levelPower`,name:`Level power`,boostArea:`factory`},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`}],he=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],F=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...b.flatMap((e,t)=>[1,2].map(n=>({id:`pool${String(t+1).padStart(2,`0`)}Reset${n===1?`I`:`II`}`,name:`${e.symbol} Reclamation ${n===1?`I`:`II`}`,group:`foundry`,trigger:`Compact the ${e.symbol} pool ${n===1?`once`:`twice`}`,bonus:`The ${n===1?`first`:`second`} disk-size exponent step now closes 10% of the gap to 1.0`,condition:{kind:`poolExponentBonus`,poolIndex:t+1,min:n}}))),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:he[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,name:`Spent QB`,group:`tierLadder`,trigger:`Spend all your Quettabytes after earning some in the same run`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`lastTierSpent`}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,condition:{kind:`overclocked`}},...pe.map((e,t)=>({id:`levelPower${t+1}`,name:`${b[e-1].symbol} Level 10`,group:`levelPower`,trigger:`Reach level 10 on ${b[e-1].name} (9 levels completed)`,bonus:`The per-level production multiplier rises by ${fe} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:10}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}}].map(e=>({secret:!1,platformDependent:!1,bonus:null,...e})),I=Object.fromEntries(F.map(e=>[e.id,e])),ge=1024,_e=1e3,ve=8*_e**2/10,ye=(e=1)=>({startBits:8,endBits:8/10*_e**(Math.max(1,Math.floor(Number(e)||1))+1)}),be=.5,xe=.9,Se=8e3,Ce=1e3,we=8*ge,Te=8e3,Ee=ve/2,De=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],Oe={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},ke=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],Ae=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],L=[1,10,100],je=[9,9,9],Me=1e3,Ne=[1,10,100,Me],Pe=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],Fe=10*L.length,Ie=[1,10,100,1e3],Le=.5,Re=86400,ze=14400,Be=14400,Ve=[4,40,400,4e3,4e4],He=2e3,Ue=1024,We=1.1,Ge=.01,Ke=.1,qe=Math.floor(Math.log2(Ue)),Je=.9,Ye=.01,Xe={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},Ze={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},Qe={baseCost:100,baseSeconds:16},$e=.01,et=.1,tt=.01,nt=.01,rt=.1,it=1e3,at=1e30,ot=1e-4,st=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],ct=Object.assign(Object.create(null),Object.fromEntries(st.map(e=>[e.id,e]))),lt=Object.assign(Object.create(null),Object.fromEntries(st.map((e,t)=>[e.id,t]))),ut=k,dt=1e-5,ft=`-ms-`,pt=`-moz-`,mt=`-webkit-`,ht=`comm`,gt=`rule`,_t=`decl`,vt=`@import`,yt=`@namespace`,bt=`@keyframes`,xt=`@layer`,St=Math.abs,Ct=String.fromCharCode,wt=Object.assign;function Tt(e,t){return kt(e,0)^45?(((t<<2^kt(e,0))<<2^kt(e,1))<<2^kt(e,2))<<2^kt(e,3):0}function Et(e){return e.trim()}function Dt(e,t){return(e=t.exec(e))?e[0]:e}function R(e,t,n){return e.replace(t,n)}function Ot(e,t,n){return e.indexOf(t,n)}function kt(e,t){return e.charCodeAt(t)|0}function At(e,t,n){return e.slice(t,n)}function jt(e){return e.length}function Mt(e){return e.length}function Nt(e,t){return t.push(e),e}function Pt(e,t){return e.map(t).join(``)}function Ft(e,t){return e.filter(function(e){return!Dt(e,t)})}var It=1,Lt=1,Rt=0,zt=0,Bt=0,Vt=``;function Ht(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:It,column:Lt,length:o,return:``,siblings:s}}function Ut(e,t){return wt(Ht(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Wt(e){for(;e.root;)e=Ut(e.root,{children:[e]});Nt(e,e.siblings)}function Gt(){return Bt}function Kt(){return Bt=zt>0?kt(Vt,--zt):0,Lt--,Bt===10&&(Lt=1,It--),Bt}function qt(){return Bt=zt<Rt?kt(Vt,zt++):0,Lt++,Bt===10&&(Lt=1,It++),Bt}function Jt(){return kt(Vt,zt)}function Yt(){return zt}function Xt(e,t){return At(Vt,e,t)}function Zt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Qt(e){return It=Lt=1,Rt=jt(Vt=e),zt=0,[]}function $t(e){return Vt=``,e}function en(e){return Et(Xt(zt-1,rn(e===91?e+2:e===40?e+1:e)))}function tn(e){for(;(Bt=Jt())&&Bt<33;)qt();return Zt(e)>2||Zt(Bt)>3?``:` `}function nn(e,t){for(;--t&&qt()&&!(Bt<48||Bt>102||Bt>57&&Bt<65||Bt>70&&Bt<97););return Xt(e,Yt()+(t<6&&Jt()==32&&qt()==32))}function rn(e){for(;qt();)switch(Bt){case e:return zt;case 34:case 39:e!==34&&e!==39&&rn(Bt);break;case 40:e===41&&rn(e);break;case 92:qt()}return zt}function an(e,t){for(;qt()&&e+Bt!==57&&(e+Bt!==84||Jt()!==47););return`/*`+Xt(t,zt-1)+`*`+Ct(e===47?e:qt())}function on(e){for(;!Zt(Jt());)qt();return Xt(e,zt)}function sn(e){return $t(cn(``,null,null,null,[``],e=Qt(e),0,[0],e))}function cn(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=qt()){case 40:if(m!=108&&kt(C,d-1)==58){Ot(C+=R(en(v),`&`,`&\f`),`&\f`,St(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=en(v);break;case 9:case 10:case 13:case 32:C+=tn(m);break;case 92:C+=nn(Yt()-1,7);continue;case 47:switch(Jt()){case 42:case 47:Nt(un(an(qt(),Yt()),t,n,c),c),(Zt(m||1)==5||Zt(Jt()||1)==5)&&jt(C)&&At(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=jt(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=R(C,/\f/g,``)),p>0&&(jt(C)-d||h===0&&m===47)&&Nt(p>32?dn(C+`;`,r,n,d-1,c):dn(R(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Nt(S=ln(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)cn(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(kt(C,3)===110)break;case 108:if(kt(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?cn(e,S,S,r&&Nt(ln(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):cn(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+jt(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Kt()==125)continue}switch(C+=Ct(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(jt(C)-1)*_,_=1;break;case 64:Jt()===45&&(C+=en(qt())),f=Jt(),u=d=jt(y=C+=on(Yt())),v++;break;case 45:m===45&&jt(C)==2&&(h=0)}}return a}function ln(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=Mt(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=At(e,f+1,f=St(g=o[h])),b=e;v<m;++v)(b=Et(g>0?p[v]+` `+y:R(y,/&\f/g,p[v])))&&(c[_++]=b);return Ht(e,t,n,i===0?gt:s,c,l,u,d)}function un(e,t,n,r){return Ht(e,t,n,ht,Ct(Gt()),At(e,2,-2),0,r)}function dn(e,t,n,r,i){return Ht(e,t,n,_t,At(e,0,r),At(e,r+1,-1),r,i)}function fn(e,t,n){switch(Tt(e,t)){case 5103:return mt+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return mt+e+e;case 4855:return mt+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return pt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return mt+e+pt+e+ft+e+e;case 5936:switch(kt(e,t+11)){case 114:return mt+e+ft+R(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return mt+e+ft+R(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return mt+e+ft+R(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return mt+e+ft+e+e;case 6165:return mt+e+ft+`flex-`+e+e;case 5187:return mt+e+R(e,/(\w+).+(:[^]+)/,mt+`box-$1$2`+ft+`flex-$1$2`)+e;case 5443:return mt+e+ft+`flex-item-`+R(e,/flex-|-self/g,``)+(Dt(e,/flex-|baseline/)?``:ft+`grid-row-`+R(e,/flex-|-self/g,``))+e;case 4675:return mt+e+ft+`flex-line-pack`+R(e,/align-content|flex-|-self/g,``)+e;case 5548:return mt+e+ft+R(e,`shrink`,`negative`)+e;case 5292:return mt+e+ft+R(e,`basis`,`preferred-size`)+e;case 6060:return mt+`box-`+R(e,`-grow`,``)+mt+e+ft+R(e,`grow`,`positive`)+e;case 4554:return mt+R(e,/([^-])(transform)/g,`$1`+mt+`$2`)+e;case 6187:return R(R(R(e,/(zoom-|grab)/,mt+`$1`),/(image-set)/,mt+`$1`),e,``)+e;case 5495:case 3959:return R(e,/(image-set\([^]*)/,mt+"$1$`$1");case 4968:return R(R(e,/(.+:)(flex-)?(.*)/,mt+`box-pack:$3`+ft+`flex-pack:$3`),/space-between/,`justify`)+mt+e+e;case 4200:if(!Dt(e,/flex-|baseline/))return ft+`grid-column-align`+At(e,t)+e;break;case 2592:case 3360:return ft+R(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Dt(e.props,/grid-\w+-end/)})?~Ot(e+(n=n[t].value),`span`,0)?e:ft+R(e,`-start`,``)+e+ft+`grid-row-span:`+(~Ot(n,`span`,0)?Dt(n,/\d+/):+Dt(n,/\d+/)-Dt(e,/\d+/))+`;`:ft+R(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Dt(e.props,/grid-\w+-start/)})?e:ft+R(R(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return R(e,/(.+)-inline(.+)/,mt+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(jt(e)-1-t>6)switch(kt(e,t+1)){case 109:if(kt(e,t+4)!==45)break;case 102:return R(e,/(.+:)(.+)-([^]+)/,`$1`+mt+`$2-$3$1`+pt+(kt(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Ot(e,`stretch`,0)?fn(R(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return R(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return ft+n+`:`+r+s+(i?ft+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(kt(e,t+6)===121)return R(e,`:`,`:`+mt)+e;break;case 6444:switch(kt(e,kt(e,14)===45?18:11)){case 120:return R(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+mt+(kt(e,14)===45?`inline-`:``)+`box$3$1`+mt+`$2$3$1`+ft+`$2box$3`)+e;case 100:return R(e,`:`,`:`+ft)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return R(e,`scroll-`,`scroll-snap-`)+e}return e}function pn(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function mn(e,t,n,r){switch(e.type){case xt:if(e.children.length)break;case vt:case yt:case _t:return e.return=e.return||e.value;case ht:return``;case bt:return e.return=e.value+`{`+pn(e.children,r)+`}`;case gt:if(!jt(e.value=e.props.join(`,`)))return``}return jt(n=pn(e.children,r))?e.return=e.value+`{`+n+`}`:``}function hn(e){var t=Mt(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function gn(e){return function(t){t.root||(t=t.return)&&e(t)}}function _n(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case _t:e.return=fn(e.value,e.length,n);return;case bt:return pn([Ut(e,{value:R(e.value,`@`,`@`+mt)})],r);case gt:if(e.length)return Pt(n=e.props,function(t){switch(Dt(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Wt(Ut(e,{props:[R(t,/:(read-\w+)/,`:`+pt+`$1`)]})),Wt(Ut(e,{props:[t]})),wt(e,{props:Ft(n,r)});break;case`::placeholder`:Wt(Ut(e,{props:[R(t,/:(plac\w+)/,`:`+mt+`input-$1`)]})),Wt(Ut(e,{props:[R(t,/:(plac\w+)/,`:`+pt+`$1`)]})),Wt(Ut(e,{props:[R(t,/:(plac\w+)/,ft+`input-$1`)]})),Wt(Ut(e,{props:[t]})),wt(e,{props:Ft(n,r)})}return``})}}function vn(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var yn=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,bn=`active`,xn=`data-styled-version`,Sn=`6.6.0`,Cn=`/*!sc*/
`,wn=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw vn(19);function Tn(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var En=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Tn(`REACT_APP_SC_DISABLE_SPEEDY`)??Tn(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Dn=`sc-keyframes-`,On={},kn=new Map,An=new Map,jn=1,Mn=e=>{if(kn.has(e))return kn.get(e);for(;An.has(jn);)jn++;let t=jn++;return kn.set(e,t),An.set(t,e),t},Nn=e=>An.get(e),Pn=(e,t)=>{jn=t+1,kn.set(e,t),An.set(t,e)},Fn=Object.freeze([]),In=Object.freeze({});function Ln(e,t,n=In){return e.theme!==n.theme&&e.theme||t||n.theme}var Rn=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,zn=/(^-|-$)/g;function Bn(e){return e.replace(Rn,`-`).replace(zn,``)}var Vn=/(a)(d)/gi,Hn=e=>String.fromCharCode(e+(e>25?39:97));function Un(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Hn(t%52)+n;return(Hn(t%52)+n).replace(Vn,`$1-$2`)}var Wn=5381,Gn=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Kn=e=>Gn(Wn,e);function qn(e){return Un(Kn(e)>>>0)}function Jn(e){return e.displayName||e.name||`Component`}function Yn(e){return typeof e==`string`&&!0}function Xn(e){return Yn(e)?`styled.${e}`:`Styled(${Jn(e)})`}var Zn=Symbol.for(`react.memo`),Qn=Symbol.for(`react.forward_ref`),$n={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},er={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},tr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},nr={[Qn]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Zn]:tr};function rr(e){return(`type`in(t=e)&&t.type.$$typeof)===Zn?tr:`$$typeof`in e?nr[e.$$typeof]:$n;var t}var ir=Object.defineProperty,ar=Object.getOwnPropertyNames,or=Object.getOwnPropertySymbols,sr=Object.getOwnPropertyDescriptor,cr=Object.getPrototypeOf,lr=Object.prototype;function ur(e,t,n){if(typeof t!=`string`){let r=cr(t);r&&r!==lr&&ur(e,r,n);let i=ar(t).concat(or(t)),a=rr(e),o=rr(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in er||n&&n[s]||o&&s in o||a&&s in a)){let n=sr(t,s);try{ir(e,s,n)}catch{}}}}return e}function dr(e){return typeof e==`function`}var fr=Symbol.for(`react.forward_ref`);function pr(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===fr&&`styledComponentId`in e}function mr(e,t){return e&&t?e+` `+t:e||t||``}function hr(e,t){return e.join(t||``)}function gr(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function _r(e,t,n=!1){if(!n&&!gr(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=_r(e[n],t[n]);else if(gr(t))for(let n in t)e[n]=_r(e[n],t[n]);return e}function vr(e,t){Object.defineProperty(e,"toString",{value:t})}var yr=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw vn(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Cn;return t}},br=`style[${yn}][${xn}="${Sn}"]`,xr=RegExp(`^${yn}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Sr=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Cr=e=>{if(!e)return document;if(Sr(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Sr(t))return t}return document},wr=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},Tr=(e,t)=>{let n=(t.textContent??``).split(Cn),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(xr);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Pn(n,t),wr(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Er=e=>{let t=Cr(e.options.target).querySelectorAll(br);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(yn)!==bn&&(Tr(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Dr=!1;function Or(){if(!1!==Dr)return Dr;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Dr=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Dr=t.getAttribute(`content`)||void 0}return Dr=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var kr=(e,t)=>{if(typeof document>`u`)throw vn(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${yn}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(yn,bn),i.setAttribute(xn,Sn);let s=t||Or();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Ar=class{constructor(e,t){this.element=kr(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw vn(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},jr=class{constructor(e,t){this.element=kr(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Mr=wn,Nr={isServer:!wn,useCSSOMInjection:!En},Pr=class e{static registerId(e){return Mn(e)}constructor(e=In,t={},n){this.options=Object.assign(Object.assign({},Nr),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&wn&&Mr&&(Mr=!1,Er(this)),vr(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Nn(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=yn+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&wn&&Er(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&wn&&t.target!==this.options.target&&Cr(this.options.target)!==Cr(t.target)&&Er(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Ar(t,n):new jr(t,n))(this.options),new yr(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Mn(e),e.startsWith(Dn)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Mn(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Mn(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},Fr=new WeakSet,Ir={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Lr(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in Ir||e.startsWith(`--`)?String(t).trim():t+`px`}var Rr=47;function zr(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Br=Symbol.for(`sc-keyframes`);function Vr(e){return typeof e==`object`&&!!e&&Br in e}function Hr(e){return dr(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Ur=e=>e==null||!1===e||e===``,Wr=Symbol.for(`react.client.reference`);function Gr(e){return e.$$typeof===Wr}function Kr(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Ur(r)&&(Array.isArray(r)&&Fr.has(r)||dr(r)?t.push(zr(n)+`:`,r,`;`):gr(r)?(t.push(n+` {`),Kr(r,t),t.push(`}`)):t.push(zr(n)+`: `+Lr(n,r)+`;`))}}function qr(e,t,n,r,i=[]){if(Ur(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return Gr(e)?i:Hr(e)&&t?qr(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)qr(e[a],t,n,r,i);return i}return pr(e)?(i.push(`.${e.styledComponentId}`),i):Vr(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):Gr(e)?i:gr(e)&&e.toString===Object.prototype.toString?(Kr(e,i),i):(i.push(e.toString()),i)}var Jr=Kn(Sn),Yr=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=Gn(Jr,t),this.baseStyle=n,Pr.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Hr(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=hr(qr(r,e,t,n)))}else i+=hr(qr(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Un(Gn(Gn(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=mr(r,a)}}return r}},Xr=/&/g;function Zr(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Qr(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==Rr||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===Rr&&(o=!1,c++);else if(l!==34&&l!==39||Zr(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function $r(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&$r(a.children,t)}return e}function ei({options:e=In,plugins:t=Fn}=In){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Xr,r).replace(i,a))}),e.prefix&&o.push(_n),o.push(mn);let s=[],c=hn(o.concat(gn(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Qr(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Zr(e,o)){if(s===0){if(t===Rr&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==Rr);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===Rr)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===Rr&&o+1<r&&e.charCodeAt(o+1)===Rr){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Qr(i)):l===0?e:Qr(e)}(t),d=sn(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=$r(d,e.namespace)),s=[],pn(d,c),s},u=e,d=Wn;for(let e=0;e<t.length;e++)t[e].name||vn(15),d=Gn(d,t[e].name);return u!=null&&u.namespace&&(d=Gn(d,u.namespace)),u!=null&&u.prefix&&(d=Gn(d,`p`)),l.hash=d===Wn?``:d.toString(),l}var ti=new Pr,ni=ei(),ri=v.createContext({shouldForwardProp:void 0,styleSheet:ti,stylis:ni,stylisPlugins:void 0});ri.Consumer;function ii(){return v.useContext(ri)}var ai=v.createContext(void 0);ai.Consumer;function oi(){let e=v.useContext(ai);if(!e)throw vn(18);return e}function si(e){let t=v.useContext(ai),n=v.useMemo(()=>function(e,t){if(!e)throw vn(14);if(dr(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw vn(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(ai.Provider,{value:n},e.children):null}var ci={};function li(e,t){let n=typeof e==`string`?Bn(e):`sc`;ci[n]=(ci[n]||0)+1;let r=n+`-`+qn(Sn+n+ci[n]);return t?t+`-`+r:r}function ui(e,t,n){let r=pr(e),i=e,a=!Yn(e),{attrs:o=Fn,componentId:s=li(t.displayName,t.parentComponentId),displayName:c=Xn(e)}=t,l=t.displayName&&t.componentId?Bn(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Yr(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(ai),u=ii(),d=e.shouldForwardProp||u.shouldForwardProp,f=Ln(t,l,a)||In,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=dr(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=mr(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=mr(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=Yn(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=mr(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?mr(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)_r(e,n,!0);return e}({},i.defaultProps,e):e}}),vr(m,()=>`.${m.styledComponentId}`),a&&ur(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var di=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function fi(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var pi=e=>(Fr.add(e),e);function mi(e,...t){if(dr(e)||gr(e))return pi(qr(fi(Fn,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?qr(n):pi(qr(fi(n,t)))}function hi(e,t,n=In){if(!t)throw vn(1,t);let r=(r,...i)=>e(t,n,mi(r,...i));return r.attrs=r=>hi(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>hi(e,t,Object.assign(Object.assign({},n),r)),r}var gi=e=>hi(ui,e),z=gi;di.forEach(e=>{z[e]=gi(e)});var _i=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(dr(n)&&!pr(n))return!1}return!0}(e),Pr.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=hr(qr(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function vi(e,...t){let n=mi(e,...t),r=`sc-global-${qn(JSON.stringify(n))}`,i=new _i(n,r),a=e=>{let t=ii(),n=v.useContext(ai),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,On,n,o);else{let s=Object.assign(Object.assign({},t),{theme:Ln(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var yi,bi=class{constructor(e,t){this[yi]=!0,this.inject=(e,t=ni)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Dn+e,this.rules=t,Mn(this.id),vr(this,()=>{throw vn(12,String(this.name))})}getName(e=ni){return e.hash?this.name+Un(e.hash>>>0):this.name}};function xi(e,...t){let n=hr(mi(e,...t));return new bi(qn(n),n)}yi=Br,`${yn}`,`${yn}`,`${yn}`;var Si=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),B=o(((e,t)=>{t.exports=Si()}))(),Ci=5e3,wi=z.div`
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
`,Ti=z.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,Ei=z.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,Di=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),Oi=()=>typeof document<`u`&&document.visibilityState===`hidden`,ki=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||Oi()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+Ci};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{Oi()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function Ai({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=ki(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=ue.enabled?Di(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&I[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,B.jsx)(wi,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,B.jsxs)(Ti,{children:[(0,B.jsx)(Ei,{children:`Achievement unlocked`}),I[t].name]},e))})}var ji=z.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,Mi=z.div`
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
`,Ni=z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,Pi=z.button`
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
`,Fi=z.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,Ii=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,B.jsx)(ji,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,B.jsxs)(Mi,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,B.jsx)(Ni,{children:`More`}),(0,B.jsxs)(Pi,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,B.jsx)(Fi,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,B.jsxs)(Pi,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,B.jsx)(Fi,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),ue.enabled&&(0,B.jsxs)(Pi,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,B.jsx)(Fi,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,B.jsxs)(Pi,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,B.jsx)(Fi,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),(0,B.jsxs)(Pi,{"aria-label":`open dev mode`,onClick:()=>r(`dev`),type:`button`,children:[(0,B.jsx)(Fi,{"aria-hidden":`true`,children:`🛠️`}),`Dev Mode`]})]})})},Li=z.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,Ri=()=>b[b.length-1].id,V=e=>Math.max(0,Number.isFinite(e)?e:0),zi=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),Bi=1e-9,Vi=1e-9,Hi=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},Ui=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),Wi=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=Ui();return e},Gi=()=>({resources:Hi().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,lastTierEarnedThisRun:!1,accelerateBoughtThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:zi()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:as(1),unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:st.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:st.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:st.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:st.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:Wi(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),Ki=new Intl.NumberFormat(`en-US`),qi=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),Ji=1e4,Yi=1e3,Xi=1+1e-12,Zi=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*Xi;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*Yi)/Yi;return`${Number(r.toFixed(3))}e${t}`},H=e=>{let t=V(e);return t<Ji?Ki.format(t):Zi(t)},Qi=1e-9,$i=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>Qi?null:`${Zi(10**t)} ${E(T)}`},ea=e=>{let t=Math.floor(V(e)),n=E(O);return t<Ji?`${qi.format(t)} ${n}`:$i(t)??`${Zi(t)} ${n}`},ta=e=>{let t=Math.floor(V(e)),n=E(T);return t<Ji?`${qi.format(t)} ${n}`:`${Zi(t)} ${n}`},U=8e3,na=e=>{let t=Math.floor(V(e));if(t<U)return ea(t);let n=Math.floor(t/8);return n<Ji?`${qi.format(n)} B`:`${Zi(n)} B`},ra=e=>{let t=V(e);return t===0?1:2+(t-1)*t/2},ia=e=>{let t=e.purchaseLevels?.[Ri()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},aa=(e,t)=>{let n=S[e?.id];if(n===void 0)return ra(t);let r=V(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},oa=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(aa(e,n)-1)},sa=(e,t,n)=>{let r=Math.max(0,V(e)-V(t));return Math.max(0,Math.min(V(n),r))},ca=(e,t,n,r,i)=>oa(e,t)*sa(n,r,i),la=(e,t,n,r,i,a)=>{let o=sa(n,r,a),s=oa(e,t);return s<=0?o:Math.min(o,Math.floor(V(i)/s))},ua=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),da=(e,t)=>ua(Math.max(0,S[e]??-1))**Math.max(0,V(t)-1),fa=(e,t)=>da(e,t),pa=e=>1+Math.max(0,S[e]??-1)*1,ma=e=>11+Math.max(0,S[e]??-1)*1,ha=e=>{let t=V(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=pa(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=ma(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=Xe.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=Xe.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=Xe.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=Xe.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=Xe.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},ga=(e,t=Ke)=>(1+t)**V((e??1)-1),_a=e=>10**(V(e)+1),va=e=>_a(e)*8,ya=e=>(e.resources?.base??0)>=va(e.globalTickspeedMultiplier??0),ba=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,xa=(e,t=0)=>{let n=V(e??0);return(1+$e*Oo(t))**n},Sa=e=>(e.scaleUpTierCounts?.[Vo(e).id]??0)>=1,Ca=e=>(1+nt)**V(e),wa=e=>Math.max(1,Math.ceil(rt*V(e))),Ta=(e,t=!0)=>{let n=V(e);return!t||n<1?1:n<2?We:1+Math.log10(n)},Ea=e=>!!e.prestigeSpeedBonusUnlocked,Da=e=>{if(e.prestigeSpeedBonusUnlocked||V(e.purge.points)<1)return e;let t=Va(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},Oa=e=>e.playtimeBonusUnlocked?1+Ge*(V(e.activePlaySeconds??0)/3600):1,ka=e=>{if(e.playtimeBonusUnlocked||V(e.purge.points)<100)return e;let t=Va(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},Aa=e=>{if(e.buyMaxUnlocked||V(e.purge.points)<2)return e;let t=Va(e);return{...t,purge:{...t.purge,points:t.purge.points-2},buyMaxUnlocked:!0}},ja=e=>{if(e.cacheWarmUnlocked||V(e.purge.points)<20)return e;let t=Va(e);return Na({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},Ma=e=>b[Math.min(b.length,Math.max(1,bc(e)))-1],Na=e=>{if(!e.cacheWarmUnlocked||No(e))return e;let t=Ma(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,ia(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:js(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},Pa=Ve.length,Fa=e=>Math.min(Pa,Math.floor(V(e?.sleepModeCapLevel??0))),Ia=e=>Math.min(Re,ze+Be*Fa(e)),La=e=>Ve[e]??null,Ra=e=>{let t=Fa(e),n=La(t);if(n===null||V(e.purge.points)<n)return e;let r=Va(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},za=e=>t=>({...t,activePlaySeconds:V(t.activePlaySeconds??0)+V(e)}),Ba=e=>!!e.computeFlops?.pageUnlocked||V(e.purge?.points??0)>=100,Va=e=>e.computeFlops?.pageUnlocked||V(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},Ha=(e,t,n)=>{let r=ct[t];if(!r)return{affordable:0,totalCost:0};let i=V(e.computeFlops?.owned?.[t]??0),a=V(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=Wa(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},Ua=(e,t,n)=>r=>{if(t<=0)return r;let i=Va(r),a=V(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},Wa=(e,t=0)=>{let n=t+1;return oa({baseCost:e.baseCostPP},n)},Ga=(e,t)=>{let n=ct[t];if(!n)return!1;let r=Wa(n,V(e.computeFlops?.owned?.[t]??0));return V(e.purge?.points??0)>=r},Ka=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=Wa(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},qa=(e,t=1)=>n=>{let r=ct[e];if(!r)return n;let i=Va(n),a=V(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=Ka(r,a,V(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:V(a+o)}}}},Ja=e=>10**V(e),Ya=e=>st.reduce((t,n,r)=>t+V(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*Ja(r),0),Xa=e=>{let t=V(e.hyperscalerCount??0);return t<=0?0:t*(ot+V(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*dt)},Za=(e,t)=>1+V(e.computeFlops?.cumulativeBoost?.[t]??0)+Xa(e),Qa=e=>{let t=V(e);return t===0?`0 Flops`:`${H(t)} Flops`},$a=e=>t=>{if(e<=0)return Va(t);let n=Va(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost};return st.forEach(t=>{let n=V(r[t.id]??0);if(n<=0)return;let o=n*ot*e;if(o<=0)return;let s=t.boostsTierId;a[s]=V((a[s]??0)+o),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},eo=e=>V(e.purge?.points??0)>=ut,to=e=>1+V(e.eonsUpgrades?.eonAmplifierLevel??0)*1,no=e=>1*10**V(e),ro=e=>V(e.eons?.balance??0)>=no(e.hyperscalerCount??0),io=e=>{if(!ro(e))return e;let t=no(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:V(e.eons.balance)-t},hyperscalerCount:V(e.hyperscalerCount??0)+1}},ao=e=>1+Math.max(0,lt[e]??-1)*1,oo=e=>{let t=V(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return st.forEach(e=>{(r[e.id]??null)===null&&t>=ao(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},so=(e,t)=>n=>!st.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},co=e=>t=>{if(e<=0)return t;let n=t;return st.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+Bi);if(i>=1){let{affordable:e,totalCost:a}=Ha(n,t.id,i);e>0&&(n=Ua(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},lo=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},uo=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||ll(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`lastTierSpent`:return!!e.lastTierEarnedThisRun&&(e.resources?.[Ri()]??0)===0;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolExponentBonus`:return(e.intro?.poolExponentBonuses?.[t.poolIndex]??0)>=t.min;default:return!1}},fo=e=>e>=1?Math.max(tt,10/(1+Math.log10(e))):1/0,po=(e,t)=>!!e.achievements?.earned?.[t],mo=e=>{if(!ue.enabled)return e;let t=F.filter(t=>!po(e,t.id)&&uo(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},ho=e=>me.filter(t=>{let n=F.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>po(e,t.id))}).map(e=>e.id),go=e=>{if(!eo(e))return e;let t=Gi(),n=to(e),r=V(e.era?.count??0)+1,i=jo(e);return Na(oo({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:lo(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:zi()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:V(e.eons?.balance??0)+n},hyperscalerCount:V(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},_o=e=>{let t=e.prestigeDoublePpLevel??0,n=gs(t);if(V(e.purge.points)<n)return e;let r=Va(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},vo=e=>{let t=F.filter(t=>t.group===`levelPower`&&po(e,t.id)).length;return Math.round((1+fe*t)*1e6)/1e6},yo=(e,t=1)=>{let n=Math.max(0,V(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},bo=e=>2**V(e),xo=(e,t)=>Fo(e,`scaleUpNoDoubling`)||Io(e,`singleInstance`)===t?1:bo(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**Ro(e,`scaleUpPower`,1),So=e=>Math.min(V(e.scaleUpTargetTierIndex??0),Bo(e)-1),Co=e=>b[So(e)],wo=e=>3*(Math.max(0,V(e.scaleUpCount??0)-(Bo(e)-1))+1),To=e=>{let t=Do(e);return t===null?5:t+Eo(e)},Eo=e=>{let t=F.filter(t=>t.group===`overclockStep`&&po(e,t.id)).length;return Math.max(1,4-t)},Do=e=>{let t=e.overclockLastClaimCompletedLevels??(V(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:V(t)},Oo=e=>(1+et)**V(e),ko=e=>Xe[e],Ao=e=>1/sm(e,`purge`),jo=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&sm(e,`purge`)<=1,Mo=e=>!!ce[e]&&le.has(e),No=e=>{let t=e.challenges?.active;return t&&Mo(t)?ce[t]:null},Po=(e,t)=>!!e.challenges?.completed?.[t],Fo=(e,t)=>No(e)?.effect===t,Io=(e,t)=>{let n=No(e);return n?.effect===t?n.automation.key:null},Lo=(e,t)=>({balance:Math.max(e.balance??0,V(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),Ro=(e,t,n)=>No(e)?.levers?.[t]??e.runLevers?.[t]??n,zo=(e,t)=>(Io(e,`halfDuplex`)===t?ne:1)*Ro(e,`production`,1),W=(e,t)=>{let n=x[t];if(!n)return n;let r=(Io(e,`premiumTier`)===t?re:1)*Ro(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},Bo=e=>Fo(e,`addressSpace`)?6:b.length,Vo=e=>b[Bo(e)-1],Ho=e=>Math.floor(V(e.challenges?.activeSeconds)/30+1e-9)%2==0,Uo=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!No(e))return n;if(Io(e,`clockGated`)===t||Io(e,`dutyCycle`)===t&&!Ho(e))return 1;if(Io(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},Wo=e=>{if(!Fo(e,`bitRot`))return 0;let t=V(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(ae,P*2**(t/30))/10**(Gs(e.intro)-1)},Go=e=>No(e)?.goal??8e100,Ko=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,qo=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?pa(n):t===`tierTickspeed`?ma(n):ko(n))},Jo=(e,t)=>{let n=ce[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:lm(e,i))&&V(e.purge?.count??0)>=qo(n)},Yo=(e,t)=>N.find(n=>n.automation.kind===e&&n.automation.key===t&&Mo(n.id))??null,Xo=(e,t,n)=>{let r=Yo(t,n);return!!r&&!Po(e,r.id)},Zo=e=>{let t=e.challenges?.completed??{},n=N.filter(n=>Mo(n.id)&&!t[n.id]&&Ko(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...Gi().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},Qo=e=>t=>{if(!No(t))return t;let n=t.challenges.run??zi();return{...t,challenges:{...t.challenges,activeSeconds:V(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:V(n.cycleSeconds)+e}}}},$o=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??zi(),...t}}}),es=(e,t,n)=>{if(n===t)return n;let r=n;if(Io(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return Io(n,`writeLock`)===e&&(r=$o(r,{haltSeconds:10})),r},ts={hardRefresh:{interval:300,apply:(e,t)=>$o({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},ns=(e,t)=>{let n=t,r=Io(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-ie)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=$o({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(Fo(n,`bitRot`)&&Wo(n)>V(n.resources.base)){let e=Am(n,!1);n={...e,challenges:{...e.challenges,run:{...zi(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},rs=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=No(r);if(!e)return Cs(i,t,0)(r);let n=ts[e.effect],a=V(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=V(r.challenges.run?.haltSeconds),l=c>0?$o(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>No(e)?Qo(o)(e):e)(Cs(o,t,c)(l)),d=!No(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=No(d)?ns(o,d):d,s&&No(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},G=e=>!jo(e)&&V(e.resources.base)>=Go(e),is=e=>t=>{let n=S[t.id]??-1;if(n>=Bo(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},as=e=>os(V(e)/8),os=e=>{let t=V(e);return t<1?0:Math.floor(Math.log10(t))},ss=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=os(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},cs=e=>{let t=V(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},ls=e=>Fo(e,`clockSpeedDisabled`)?1:xa(e.globalTickspeedMultiplier??null,Do(e)??0)**Ro(e,`clockSpeedPower`,1),us=e=>Fo(e,`clockSpeedDisabled`)?0:(1+$e*Oo(Do(e)??0))**Ro(e,`clockSpeedPower`,1)-1,ds=e=>Fo(e,`scaleUpNoDoubling`)?1:2**Ro(e,`scaleUpPower`,1),fs=(e,t)=>{let n=ga(Uo(e,t),Io(e,`halfStep`)===t?oe:Ke)*(t===Vo(e).id?Ca(e.lastTierXpConsumed??0):1),r=ls(e),i=Io(e,`noisyNeighbour`),a=(Io(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+se)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:Vi},ps=()=>Math.log2(64),ms=(e=0)=>{let t=V(e);return 64/2**Math.min(t,ps())},hs=(e=0)=>{let t=V(e),n=ps();return t>n?2**(t-n):1},gs=(e=0)=>10**(V(e)+1),_s=(e,t=0)=>{let n=V(e);if(n<8e100)return 0;let r=Math.floor(Math.log10(k)),i=Math.max(0,os(n)-r),a=ms(t),o=hs(t);return(1+Math.floor(i/a))*o},vs=(e,t)=>{let n=as(V(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},ys=200,bs=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<ys;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=ys&&(o=Math.min(o,1)),{state:a,budget:o}},xs=(e,t,n,r)=>{let{state:i,budget:a}=bs(e,t,sm(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},Ss=`unit`,Cs=(e,t=1,n=0)=>r=>{let i=Ml(r),a=zc(e)(i),o=Kc(uu(e)(tl(e)(il(e)(Nl(e)(a))))),s=Lu(e)(o),c=ju(e)(s),l=Tm(Lu(0)(c)),u=mp.reduce((t,n)=>n(e)(t),l),d=Pd(e)(u),f=Pl(Rp(e)(d)),p=Yd(sf(e,f)(Bc(e)(f))),m=nf(e)(p),h=co(e)($a(e)(m)),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=Ku(Wu(t)),r=au(e)(cu(e)(n));return r===t?t:Lu(0)(r)};if(G(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+Ao(h)*e;return _(t>=.999999999?Dm(h):{...h,autoPurgeAttemptBudget:t})}let v=Ta(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*Oa(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!is(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/Zp(n,r.id);for(;a>=.999999999&&!(Math.floor(a+Bi)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=Ns(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=$p(i,r.id);if(n>1&&e===0){let e=Hs(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!Ls(i,r))break;let o=Ns(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,V(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!is(y)(e)||k)return;let t=fs(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+Bi)/t);if(T[e.id]=n-r*t,r<=0)return;let i=Io(y,`flatRate`)===e.id?1:yo(y.purchaseLevels?.[e.id]??1,vo(y)),a=zo(y,e.id),o=wp(y.intro,S[e.id]+1),s=Za(y,e.id),c=xo(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=V((C.base??0)+l*8)):C[e.producesResourceId]=V((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=V((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,ee=x[Ri()],j=Math.max(0,(y.purchaseLevels?.[ee.id]??1)-1);if(j>0&&po(y,`quettaSpent`)&&is(y)(ee)&&!k){let e=fo(j);A+=D;let t=Math.floor(A/e+Bi);t>0&&(A=Math.max(0,A-t*e),C[ee.id]=V((C[ee.id]??0)+t),w[ee.id]=V((w[ee.id]??0)+t))}let te={...y,lastTierLevelCreditTimer:A,lastTierEarnedThisRun:!!y.lastTierEarnedThisRun||(C[ee.id]??0)>0,resources:C,owned:w,tierProductionAccumulators:T,purge:vs(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+Ao(y)*e}:{}},M=te.runPeaks?Lo(te.runPeaks,te):null,N=te;jo(N)&&g&&V(N.resources.base)>=Go(N)&&(N.autoPurgeAttemptBudget??0)>=.999999999&&(N=Dm(N));let ne=N.autoOverclock&&(N.autoOverclockEnabled??!0)?xs(N,e,`overclock`,Im):N,re=ne.autoScaleUp&&(ne.autoScaleUpEnabled??!0)?xs(ne,e,`scaleUp`,Fm):ne,ie=re.autoXpTickspeed&&(re.autoXpTickspeedEnabled??!0)?xs(re,e,`restage`,e=>Um(e.purge.xp)(e)):re,P=M?{...ie,runPeaks:M}:ie,ae=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=bs(t,e,pm(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>qp(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},P);return _(ae.autoGlobalTickspeed&&(ae.autoGlobalTickspeedEnabled??!0)?xs(ae,e,`speedUp`,bm):ae)},ws=(e,t=1)=>n=>mo(No(n)&&e>0?rs(e,t,n):Cs(e,t,0)(n)),Ts=(e,t=Re)=>{let n=Math.min(V(e),t,Re);return Math.floor(n*(n>600?Le:1))},Es=(e,t=1)=>n=>{let r=Ts(e,Ia(n)),i=n;for(let e=0;e<r;e++)i=ws(1,t)(i);return i},Ds=(e,t=Re)=>Math.floor(Math.min(V(e),t,Re))-Ts(e,t),Os=(e,t=1,n)=>r=>{let i=Ds(e,n??Ia(r)),a=r;for(let e=0;e<i;e++)a=ws(1,t)(a);return a},ks=e=>{let t=Math.max(0,Math.floor(V(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},As=(e,t)=>e.resources[t.costResourceId]??0,js=(e,t)=>e.purchased?.[t]??0,Ms=(e,t)=>n=>{if(G(n))return n;let r=W(n,e);if(!r||!is(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=ia(n),s=la(r,i,o,a,As(n,r),t);if(s<=0)return n;let c=oa(r,i)*s,l=js(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:V((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},Ns=(e,t)=>n=>es(e,n,Ms(e,t)(n)),Ps=e=>!!e.buyMaxUnlocked,Fs=e=>V(e.purge?.count??0)>=1||V(e.era?.count??0)>=1||De.some(t=>!!e.intro?.[t.autoFlagField]),Is=e=>t=>{let n=t;for(let t=0;t<Ue;t++){let t=e(n);if(t===n)break;n=t}return n},Ls=(e,t)=>{let n=W(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=ia(e),a=e.purchaseLevelProgress?.[n.id]??0;return la(n,r,i,a,As(e,n),i)>=i-a},Rs=(e,t)=>{let n=W(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=ia(e);return la(n,r,i,0,As(e,n),i)>=i},zs=e=>t=>{if(G(t))return t;let n=W(t,e);if(!n||!is(t)(n))return t;if(!Rs(t,n))return Ns(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&Rs(r,n);t++){let t=Ns(e,2**53-1)(r);if(t===r)break;r=t}return r},Bs=e=>t=>es(e,t,zs(e)(t)),Vs=(e,t)=>n=>{if(G(n))return n;let r=W(n,e);if(!r||!is(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,Ue)&&Rs(i,r);n++){let t=Ns(e,2**53-1)(i);if(t===i)break;i=t}return i},Hs=(e,t)=>n=>es(e,n,Vs(e,t)(n)),Us=(e,t)=>{let n=W(e,t);if(G(e)||!n||!is(e)(n)||!Rs(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&Rs(r,n);e++){let e=Ns(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=ia(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,la(n,o,a,0,As(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:As(e,n)-As(r,n),lastLevelCost:As(i,n)-As(r,n),partialQuantity:s,partialCost:s>0?ca(n,o,a,0,s):0}},Ws=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=ia(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=js(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},Gs=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*L.length,Number.isFinite(t)&&t>=1?t:1)},Ks=e=>{let t=Gs(e),n=Math.floor((t-1)/L.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(L.length-1,Math.max(0,t-1-(n-1)*L.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=xe,o=1-(1-a)**2;return 1-(1-be)*a**(n+i)*o**(r-i)},qs=(e,t=be)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},Js=e=>qs(e.speedCapacity??e.capacity??0,Ks(e))*8,Ys=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(Ce);return 10**(n-t*(n-Math.log10(10)))},Xs=Math.log(Ce/100),Zs=Math.log(Ce/10),Qs=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-Xs)*(Math.exp(Zs*s)-Math.exp(Zs*o))/Zs},$s=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(Zs*a)+Zs*n/t*Math.exp(Xs)*r,s=t/Zs*Math.log(o);return Math.min(t,s)-i},ec=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,tc=e=>Ys(ec(e)),nc=e=>tc(e),rc=e=>1+(e?.dataStreamTapBonusPercent??0)/100,ic=e=>nc(e)/100,ac=e=>Js(e)*Cp(e)*ic(e),oc=100,sc=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?Qc(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=rc(e),o=oc*a,s=Js(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},cc=e=>{if(ll(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(Js(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},lc=e=>{let t=cc(e);if(!ue.enabled||t===e)return t;let n=t.achievements??Gi().achievements;return mo({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}})},uc=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},dc=()=>10,fc=e=>{let t=qu(e);return t?Math.ceil(t/L.length):null},pc=(e,t)=>{if(!Number.isInteger(t)||t<1||t>dc())return!1;let n=(t-1)*L.length+1;return L.every((t,r)=>{let i=Fl(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},mc=e=>{let t=(e-1)*L.length+1;return L.map((e,n)=>Fl(t+n))},hc=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!K(e,r)?.rebuilding}),gc=(e,t)=>!!K(e,t)?.rebuilding,_c=(e,t)=>!Number.isInteger(t)||t<1||t>dc()?!1:t===1||pc(e,t-1),vc=e=>{let t=0;for(let n=1;n<=dc()&&_c(e,n);n+=1)t=n;return t},yc=e=>8*ge**e,bc=e=>{let t=1;for(let n=2;n<=dc()&&!((e.intro?.capacity??0)<yc(n));n+=1)t=n;return t},xc=[1,2,4,8,16,32,64,125,250,500],Sc=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return xc[t%10]*1e3**Math.floor(t/10)*8},Cc=Math.log10(2),wc=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*Cc)*8},Tc=(e,t)=>{if(!Number.isInteger(t)||t<1||t>bc(e))return 0;let n=(Oc(e,t)/8)**Ks(e.intro),r=Js(e.intro??{})/8,i=Sc(Math.min(r,n)*8),a=Math.max(0,K(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=Sc(o*Math.SQRT2);if(t>=dc())return o;let s=Tc(e,t+1);return Math.max(i,Math.min(o,s/2))},Ec=(e,t)=>{let n=Tc(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,yc(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=Tc({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:Sc(Js(e.intro??{}))},Dc=(e,t)=>{let n=wc(e??0),r=t===1?ye(1).startBits:ye(t-1).endBits,i=ye(t).endBits;return Math.min(Math.max(n,r),i)},Oc=(e,t)=>!Number.isInteger(t)||t<1||t>bc(e)?0:Dc(e.intro?.capacity??0,t),kc=(e,t)=>Oc(e,t),Ac=(e,t)=>t<=bc(e)?kc(e,t):Dc(yc(t),t),jc=(e,t)=>e.intro?.poolBuffers?.[t]??0,Mc=(e,t)=>{let n=kc(e,t);return n>0?Math.min(1,jc(e,t)/n):0},Nc=(e,t)=>Ys(Mc(e,t)),Pc=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,Fc=(e,t)=>Nc(e,t),Ic=(e,t)=>1+Pc(e,t)/100,Lc=(e,t)=>{let n=Js(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-Tc(e,r));return Math.min(Tc(e,t),n)},Rc=e=>t=>{if(!Number.isInteger(e)||e<1||e>bc(t))return t;let n=Pc(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},zc=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},Bc=e=>t=>{if(!ll(t))return t;let n=bc(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=Lc(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=kc(t,s),u=Math.max(0,l-c),d=n*Ep(t.intro,s),f=e;if(u>0){let t=$s(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=Qs(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!xd(t,s)||!pc(t,s)||of(t,s))continue;let{lake:p,remainingBits:m,changed:h}=ef(t,s,n*bd(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},Vc=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||Jc(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,qu(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,qu(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,qu(i.diskBuild.size)??1)),o>Gs(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>dc())continue;let i=e[r]??0,a=Ac(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=fc(c);if(u){let t=Ac({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=Qd(o),c=Math.max(J($u(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),Ie[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=Ne.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=Ul(t),a=Kl(t,n),o=Wl(t,n),s=wm(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},Hc=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=zu(e,t);return!n||S[n.id]>=Bo(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},Uc=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>Hc(e,t)),Wc=(e,t)=>{if(!t||t>bc(e))return 0;let n=Qd(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},Gc=e=>{if(e.intro.diskBuild||zl(e)||Hl(e))return!1;let t=Ul(e);if(Kl(e,t)>=Wl(e,t))return!0;let n=fc(t);return gc(e,n)||hc(e,n)?!1:Tc(e,n)>0&&kc(e,n)>=t},Kc=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=dc();e+=1){let n=K(t,e);if(!n?.rebuilding)continue;let r=mc(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=Hd(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(kc(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},qc=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!Jc(e),Jc=e=>{let t=dc(),{endBits:n}=ye(t);return Oc(e,t)>=n},Yc=e=>qc(e),Xc=e=>{let t=pf(e)?sl(e):e;return Ml({...t,intro:{...t.intro,speedCapacity:t.intro.speedCapacity??t.intro.capacity,capacity:t.intro.capacity*2,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},Zc=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!Jc(e)},Qc=e=>e.speedCapacity??e.capacity??0,$c=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:Qc(t)*2<=t.capacity},el=e=>$c(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,tl=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Qc(t.intro),a=Math.min(t.intro.bits,Js(t.intro)*rc(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},nl=e=>rl(e),rl=e=>Zc(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,il=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(Jc(t))return al(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,Js(t.intro)*rc(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?Xc(a):a},al=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,ol=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],sl=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of Ae)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of ol)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},cl=e=>(e.intro?.capacity??0)>=Se,ll=e=>(e.intro?.capacity??0)>=we,ul=[`B`,...b.map(e=>e.symbol)],dl=1e3,fl=[`b`,...ul.slice(1).map(e=>e.replace(/B$/,`b`))],pl=e=>{let t=1,n=0;for(;e/t>=dl&&n<fl.length-1;)t*=dl,n+=1;return{symbol:fl[n],divisor:t}},ml=e=>{let t=8,n=0;for(;e/t>=dl&&n<ul.length-1;)t*=dl,n+=1;return{symbol:ul[n],divisor:t}},hl=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],gl=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<hl.length-1;)n*=ge,r+=1;return{symbol:hl[r],divisor:n}},_l=(e,t)=>Math.floor(e*10**t)/10**t,vl=e=>{let t=Math.floor(e);return`${H(t)} bit${t===1?``:`s`}`},yl=3,bl=5,xl=e=>e>=4?bl:4,Sl=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(yl,Math.max(0,xl(t)-t))},Cl=(e,t)=>{if(t){let n=e/t.divisor,r=_l(n,Sl(n));return r>0&&r<1?vl(e):`${H(r)} ${t.symbol}`}return vl(e)},wl=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),Tl=(e,t)=>{if(!t)return vl(e);let n=e/t.divisor,r=Sl(n),i=_l(n,r);return i>0&&i<1?vl(e):i===0?`${H(i)} ${t.symbol}`:`${wl[r].format(i)} ${t.symbol}`},El=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},Dl=e=>e.replace(/^[\d,]*\.?\d+/,e=>El(Number(e.replace(/,/g,``)))),Ol=e=>Cl(e,gl(e,!0)),kl=e=>Cl(e,ml(e)),Al=e=>oa(b[0],e.purchaseLevels?.[b[0].id]??1)*8,jl=e=>{let t=Al(e);if(e.intro.bits<t)return e;let n=b[0].id;return Ws(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},Ml=e=>e.intro?.mainGameUnlocked||!ll(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},Nl=e=>t=>{if(!t.intro.byteCreated)return t;let n=Js(t.intro)*Cp(t.intro),r=$s(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},Pl=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=sa(ia(e),n,2**53-1),i=Al(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return Ws(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},Fl=e=>Te*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),Il=e=>vc(e)*L.length,Ll=e=>Math.min(Il(e),Gs(e.intro)),Rl=e=>Fl(Gs(e.intro)),zl=e=>{let t=Ul(e);return t<Rl(e)&&!gc(e,fc(t))},Bl=e=>e.intro?.diskBuild||!Hl(e)?!1:Gs(e.intro)<Il(e),Vl=e=>{if(!Bl(e))return e;let t=Gs(e.intro)+1,n=Em(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},Hl=e=>((e.intro?.disksBuiltTotal??{})[Fl(Ll(e))]??0)>=9,Ul=e=>{let t=e.intro?.disksBuiltTotal??{},n=Ll(e),r=1,i=Fl(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=Fl(r);return i},Wl=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),Gl=(e,t)=>t*Wl(e,t),Kl=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,ql=kl,Jl=e=>({symbol:ul[e]??ul[ul.length-1],divisor:8*dl**e}),Yl=(e,t)=>Cl(e,Jl(t)),Xl=(e,t)=>{let n=Jl(t);return e>0&&e<n.divisor?ml(e):n},Zl=(e,t)=>Cl(e,Xl(e,t)),Ql=(e,t)=>Tl(e,Xl(e,t)),$l=e=>Cl(e,pl(e)),eu=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=Ul(e),i=[];for(let t=1;t<=bc(e);t+=1)i.push(Qd(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},tu=e=>Gc(e)&&!Uc(e),nu=e=>!tu(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},ru=e=>e.intro?.diskBuildQueued||zl(e)||e.intro.diskBuild||Hl(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},iu=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,au=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!tu(t))return t;let n=Ul(t),r=fc(n),i=Kl(t,n),a=Wl(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?wm(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=jc(t,r),u=Math.max(0,l-Wc(t,r)),d=Tc(t,r)*Ic(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-Bi){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-Bi;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},ou=200,su=(e,t)=>{let n=fc(t);return t/Math.max(Ec(e,n)*Ic(e,n),Number.MIN_VALUE)},cu=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!zl(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<ou;e+=1){let e={...t,intro:n};if(!zl(e))break;let a=Ul(e),o=fc(a);if(gc(e,o)||hc(e,o)||kc(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=Tc(e,o)*Ic(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-Wc(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},lu=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!zl(e))return t;let n=Gs(e.intro);for(let r=1;r<n;r+=1){let n=Fl(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,Tc(e,fc(n))<=0&&(t.projected=!0);let s=su(e,n);t.seconds+=(9-a-o)*s}return t},uu=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>Bi?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},du=e=>{let t=qu(e);return t?Fl(t+1):e*10},fu=e=>{let t=fc(e);return!!t&&fc(du(e))===t},pu=(e,t)=>e.intro?.diskWriteCache?.[t]??null,mu=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,hu=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],gu=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,_u=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,mu(e)-(e.segmentsCollected??0)*t),r=hu(e).reduce((e,t)=>e+gu(t),0);return Math.min(1,Math.max(0,(n+r)/t))},vu=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,yu=(e,t)=>{let n=pu(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=hu(n);return r.length>0&&r.every(t=>Bu(e,t.size))},bu=e=>{let t=qu(e);if(!t||t<=1)return null;let n=Fl(t-1),r=fc(e);return r&&fc(n)===r?n:null},xu=(e,t)=>!bu(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),Su=(e,t,n=!1)=>({sourceSize:bu(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),Cu=(e,t)=>{if(!bu(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=pu(e,t);return!n||!n.expedite&&n.segmentsCollected<10},wu=(e,t)=>!!pu(e,t)?.expedite,Tu=e=>t=>{if(!Cu(t,e))return t;let n=pu(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:Su(t,e,!0)}}}},Eu=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},Du=(e,t)=>{let n=Tc(e,fc(t))*5;return t/Math.max(n,Number.MIN_VALUE)},Ou=(e,t,n,r)=>{let i=fc(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of hu(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=mc(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||Bu(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},ku=1-1e-9,Au=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),ju=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=fc(s.sourceSize);if(c===fc(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,Ac(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;xu(t,e)&&(i[e]=Su(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=fc(c),d=Ic(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>Bi){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??bu(c);if(!(p>0))continue;let m=hu(l),h=mu(l),g=[];for(let t of m){if(Bu(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>Bi?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=Eu(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-Wc(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*ku){let e=g.reduce((e,t)=>e+t.size,0);for(let n of Ou(s,c,c-h-e,g)){let e=Du(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*ku){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&Au(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},Mu=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,Nu=(e,t)=>{let n=t/8,r=Tc(e,fc(t))*2;return n/Math.max(r,Number.MIN_VALUE)},Pu=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,Fu=(e,t)=>Mu(e,t)?Bu(e,t):!1,Iu=e=>Yu(e)===L[0],Lu=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=bc(t),d=e=>{if(!Iu(e))return!1;let t=fc(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=fc(n);r&&(i[r]=Math.min(a(r)+s[n],Ac(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(Qd(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=fc(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*Tc(t,r)*5*Ic(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*Bi?n:e,l=!0}}}for(let e of p){if(c[e]||pu(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||Bu(t,e))continue;let a=Nu(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||Bu(h,r))continue;let a=i.remainingSeconds-e*Ic(t,fc(r));if(a>Bi){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},Ru=e=>{let t=Yu(e);return t?L.indexOf(t)+1:null},zu=(e,t)=>{let n=Ju(t),r=Ru(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},Bu=(e,t)=>zu(e,t)!==void 0,Vu=(e,t)=>{let n=Ju(t),r=Ru(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},Hu=(e,t)=>zu(e,t)?.name??null,Uu=e=>t=>{if(!Hc(t,e))return t;let n=zu(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return Ws(n.id,ia(t))({...t,intro:{...t.intro,disks:o}})},Wu=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>Hc(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:Uu(t)(e)},Gu=(e,t)=>{if(e<1||e>10)return null;let n=L[t-1];return n===void 0?null:Fl(Zd(e,n))},Ku=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=Bo(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=Gu(S[e.id]+1,1);if(i===null||Hc(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=oa(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=ia(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=Ws(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},qu=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/Te;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||Fl(n)!==e?null:n},Ju=e=>{let t=qu(e);return!t||t>Fe?null:Math.floor((t-1)/L.length)+1},Yu=e=>{let t=qu(e);return!t||t>Fe?null:L[(t-1)%L.length]},Xu=e=>Pe[e-1]??null,K=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??Ui(),Zu=(e,t)=>K(e,t)?.capacityLevel??0,Qu=(e,t)=>Zu(e,t)>=3,q=(e,t)=>Ie[Math.min(Zu(e,t),3)]+Math.max(0,K(e,t)?.resetCount??0)*1e3,$u=(e,t)=>{let n={};return L.forEach((t,r)=>{n[t]=r<e?je[r]:0}),n[Me]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},J=e=>Ne.reduce((t,n)=>t+n*(e[n]??0),0),Y=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},ed=(e,t)=>$u(Zu(e,t),K(e,t)?.resetCount??0),td=(e,t)=>J(ed(e,t)),nd=(e,t)=>Math.min(q(e,t),td(e,t)+1),rd=(e,t)=>Y(K(e,t)?.depositedUnits??0).disks,id=(e,t)=>K(e,t)?.fillBits??0,ad=(e,t)=>{let n=Qd(t);return n>0&&id(e,t)>=n},od=(e,t)=>{let n=Qd(t);return n>0?Math.min(1,Math.max(0,id(e,t)/n)):0},sd=(e,t)=>K(e,t)?.lakeTransfer??null,cd=(e,t)=>{let n=sd(e,t);if(!n)return 0;let r=n.target*Qd(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},ld=(e,t)=>(K(e,t)?.depositedUnits??0)+ +!!ad(e,t),ud=(e,t)=>{let n=K(e,t),r=Qd(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},dd=(e,t)=>{let n=Cd(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=ud(e,t);return r>=n*(1-1e-9)&&Fd(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},fd=(e,t)=>Cd(t)(e)<=nd(e,t),pd=(e,t)=>!ad(e,t),md=(e,t)=>{let n=K(e,t);if(!n||n.lakeTransfer||!ad(e,t))return null;let r=ed(e,t),i=n.depositedUnits??0,a=Y(i).disks;for(let e=Ne.length-1;e>=0;--e){let t=Ne[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},hd=(e,t,n)=>Tc(e,t)*Ic(e,t)*(n===1?2:5),gd=(e,t)=>{let n=id(e,t);return n>0&&n<Qd(t)},_d=(e,t)=>{let n=kc(e,t);return n>0&&jc(e,t)>=n},vd=(e,t)=>!!K(e,t)?.acquiring,yd=(e,t)=>gd(e,t)?!0:vd(e,t)?rf(e,t)&&!af(e,t,!0)&&jc(e,t)>Wc(e,t):_d(e,t),bd=(e,t)=>.1+.1*Math.max(0,K(e,t)?.resetCount??0),xd=(e,t)=>(e.intro?.disksBuiltTotal?.[Qd(t)]??0)>0,Sd=(e,t)=>(K(e,t)?.boostersUnlocked??!1)||xd(e,t),Cd=e=>t=>{let n=K(t,e);return n?(n.purchased??0)+1:0},wd=(e,t)=>{let n=De[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},Td=(e,t)=>wd(e,t)?18:10,Ed=(e,t)=>Td(e,Ae.indexOf(t)+1),Dd=(e,t)=>{let n=Ae[t-1];return n?Math.max(0,Td(e,t)-(e.intro?.[n]??0)):0},Od=(e,t)=>{if(!wd(e,t))return 0;let n=De[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=Ae[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+jd(e,t-1))},kd=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},Ad=(e,t)=>kd(e,t)!==null,jd=(e,t)=>{let n=kd(e,t);return n===null?0:Math.floor(n/1+Bi)},Md=(e,t)=>{let n=De[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!Ad(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<Ed(e,n.outputField)},Nd=e=>t=>Md(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,Pd=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=De[r],s=kd(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=Ed({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+Bi)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=Ed({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},Fd=(e,t,n)=>{if(!K(e,t)||!(n>0))return null;let r=rd(e,t),i=[(r[1]??0)+ +!!ad(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},Id=(e,t)=>Sd(e,t)&&Dd(e,t)>0&&Fd(e,t,Cd(t)(e))!==null,Ld=(e,t)=>Dd(e,t)<=0,Rd=(e,t=1)=>n=>{let r=K(n,e);if(!r||!Sd(n,e))return n;let i=Ae[e-1];if(!i)return n;let a=Dd(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=Fd(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=rd(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=Xd(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},zd=(e,t)=>{let n=Cd(t)(e);if(Fd(e,t,n)!==null)return 0;let r=Qd(t);return Math.max(r,(n-ud(e,t))*r)},Bd=(e,t)=>{if(pc(e,t)||!xd(e,t))return!1;let n=Qd(t);return zd(e,t)<=n*1e-9||Cd(t)(e)>nd(e,t)||!pd(e,t)?!1:jc(e,t)>0&&yd(e,t)},Vd=e=>t=>{if(!Bd(t,e))return t;let n=zd(t,e),r=jc(t,e),i=Qd(e)-id(t,e),a=vd(t,e)&&!gd(t,e)?Math.max(0,r-Wc(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=$d(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},Hd=(e,t)=>n=>{let r=K(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},Ud=(e,t)=>K(e,t)?.autoConvertActive??!1,Wd=(e,t)=>!!K(e,t)?.boosterAuto||pc(e,t),Gd=(e,t)=>{let n=K(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!Sd(e,t)||!xd(e,t)?!1:Dd(e,t)>0},Kd=(e,t)=>{let n=K(e,t);return!n||n.rebuilding||!pc(e,t)?!1:!n.lakeTransfer&&ld(e,t)>=q(e,t)&&Cd(t)(e)>q(e,t)},qd=e=>t=>{if(!Kd(t,e))return t;let n=K(t,e),r=mc(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=fc(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return mo({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},Jd=e=>t=>{let n=K(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&Id(t,e)?Rd(e,1)(t):Gd(t,e)?Hd(e,!0)(t):t},Yd=e=>{let t=e;for(let e=1;e<=10;e+=1){if(pc(t,e)&&!K(t,e)?.boosterAuto){let n=K(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}K(t,e)?.boosterAuto&&Cd(e)(t)<=q(t,e)&&Id(t,e)&&(t=Rd(e,1)(t)),Ud(t,e)&&(Dd(t,e)<=0?t=Hd(e,!1)(t):xd(t,e)?Id(t,e)?(t=Rd(e,1)(t),t=Hd(e,!1)(t)):t=Vd(e)(t):t=Hd(e,!1)(t))}return t},Xd=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},Zd=(e,t)=>(e-1)*L.length+L.indexOf(t)+1,Qd=e=>Fl(Zd(e,L[0])),$d=(e,t,n,r)=>{let i=t[n]??K(e,n),a=Qd(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},ef=(e,t,n,r,i)=>{let a=K(e,t),o=Math.max(0,Qd(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=$d(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},tf=(e,t,n)=>{let r=K(e,t);if(!r||!xd(e,t))return r;let i=Qd(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=md(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=hd(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},nf=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=K(t,r),a=tf(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},rf=(e,t)=>mc(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),af=(e,t,n=!1)=>{let r=e.intro??{};if(gc(e,t))return!0;if(zl(e)){let n=Ul(e);if(fc(n)===t&&kc(e,t)>=n)return!0}if(r.diskBuild&&fc(r.diskBuild.size)===t)return!0;let i=mc(t);return!n&&i.some(t=>Kl(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(Ul(e))},of=(e,t)=>!xd(e,t)||!pd(e,t)?!1:gd(e,t)?jc(e,t)>0:(vd(e,t)||_d(e,t))&&rf(e,t)&&!af(e,t,vd(e,t))&&jc(e,t)>Wc(e,t),sf=(e,t=null)=>n=>{if(!(e>0))return n;let r=bc(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!of(n,o))continue;let r=jc(n,o),s=gd(n,o)?r:Math.max(0,r-Wc(n,o));if(s<=0)continue;let c=Tc(n,o)*Ic(n,o)*bd(n,o),{lake:l,remainingBits:u,changed:d}=ef(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},cf=(e,t)=>ud(e,t)*Qd(t),lf=(e,t)=>Fl(Zd(e,L[t])),uf=(e,t)=>{if(t<1||t>10||Qu(e,t))return!1;let n=lf(t,Zu(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},df=(e,t)=>uf(e,t),ff=e=>t=>{if(!df(t,e))return t;let n=K(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:Zu(t,e)+1}}}}},pf=e=>(e.intro?.capacity??0)>=Ee,mf=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},X=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=mf(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,Ed(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},hf=X(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),gf=X(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),_f=X(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),vf=X(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),yf=X(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),bf=X(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),xf=X(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Sf=X(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Cf=X(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),wf=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=Ed(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},Tf=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(Ed(r,n),(r.intro?.[n]??0)+1))}}},Ef=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!Ad(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=Df(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?wf(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?Vp(d,a+1):d;return Tf(e,i,n)(f)},Df=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=De.length)return 0;let n=t+1,r=Tc(e,n);return!(r>0)||!Number.isFinite(r)?0:8*Nu(e,Fl((n-1)*L.length+1))},Of=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,kf=(e,t)=>n=>Of(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,Af=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<Ed(e,n),jf=(e,t)=>{let n=De[t];return n?Af(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},Mf=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=De[e];return Af(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},Nf=e=>Ef(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),Pf=kf(`computeNodes`,`autoMergeCoresIntoNode`),Ff=e=>Of(e,`computeNodes`,`autoMergeCoresIntoNode`),If=Mf(0),Lf=e=>Ef(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),Rf=kf(`computeClusters`,`autoMergeNodesIntoCluster`),zf=e=>Of(e,`computeClusters`,`autoMergeNodesIntoCluster`),Bf=Mf(1),Vf=e=>Ef(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),Hf=kf(`computeNetworks`,`autoMergeClustersIntoNetwork`),Z=e=>Of(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),Uf=Mf(2),Wf=e=>Ef(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),Gf=kf(`computeGrids`,`autoMergeNetworksIntoGrid`),Kf=e=>Of(e,`computeGrids`,`autoMergeNetworksIntoGrid`),qf=Mf(3),Jf=e=>Ef(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),Yf=kf(`computeFabrics`,`autoMergeGridsIntoFabric`),Xf=e=>Of(e,`computeFabrics`,`autoMergeGridsIntoFabric`),Zf=Mf(4),Qf=e=>Ef(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),$f=kf(`computeClouds`,`autoMergeFabricsIntoCloud`),ep=e=>Of(e,`computeClouds`,`autoMergeFabricsIntoCloud`),tp=Mf(5),np=e=>Ef(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),rp=kf(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),ip=e=>Of(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),ap=Mf(6),op=e=>Ef(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),sp=kf(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),cp=e=>Of(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),lp=Mf(7),up=e=>Ef(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),dp=kf(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),fp=e=>Of(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),pp=Mf(8),mp=[Nf,Lf,Vf,Wf,Jf,Qf,np,op,up],hp=e=>Number.isInteger(e)&&e>=1&&e<=Ae.length,gp=e=>hp(e)?Ae[e-1]:null,_p=(e,t)=>{let n=Oe[e];return!n||!hp(t)?0:n.multiplier},vp=(e,t)=>{let n=Oe[e];return!n||!hp(t)?0:n.durationSeconds},yp=e=>{let t=e?.computeBoostType??null;if(!t||!Oe[t])return null;let n=e.computeBoostTierIndex??1,r=hp(n)?n:1,i=Oe[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},bp=e=>{let t=e?.computeBoosts??{},n=yp(e),r=[];for(let e of Object.keys(Oe)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},xp=(e,t)=>bp(e).find(e=>e.type===t)??null,Sp=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},Cp=e=>bp(e).reduce((e,t)=>e+Oe[t.type].multiplier,0)||1,wp=(e,t)=>bp(e).reduce((e,n)=>e+(n.queue[0]>=t?Oe[n.type].multiplier:0),0)||1,Tp=e=>bp(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),Ep=(e,t)=>1+bp(e).reduce((e,n)=>e+(n.queue[0]>=t?Oe[n.type].poolBonusPercent??0:0),0)/100,Dp=(e,t,n)=>{if(!Oe[t])return!1;let r=gp(n);return!r||(xp(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},Op=(e,t,n)=>Dp(e,t,n),kp=(e,t)=>{let n=xp(e.intro,t);return!!n&&Dp(e,t,n.queue[0])},Ap=(e,t)=>kp(e,t),jp=(e,t)=>Math.max(0,(xp(e.intro,t)?.queue.length??0)-1),Mp=(e,t)=>jp(e,t)>0,Np=e=>t=>{if(!Mp(t,e))return t;let n=bp(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=gp(i),o=Sp(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},Pp=(e,t)=>{let n=xp(e.intro,t);return!!n&&n.queue.length===1},Fp=e=>t=>Pp(t,e)?Sp(t,bp(t.intro).filter(t=>t.type!==e)):t,Ip=(e,t)=>n=>{if(!Op(n,e,t))return n;let r=gp(t),i=bp(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:vp(e,t)};let s=Sp(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},Lp=e=>t=>Ap(t,e)?Ip(e,xp(t.intro,e).queue[0])(t):t,Rp=e=>t=>{let n=bp(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=vp(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return Sp(t,r)},zp=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},Bp=e=>t=>!Oe[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},Vp=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=Oe[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return Op(e,n,t)?Ip(n,t)(e):e},Hp=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},Up=(e,t,n)=>n+ +(Io(e,`egressFees`)===t),Wp=(e,t,n)=>{let r=Up(e,t,n);return Io(e,`burnRate`)===t?da(t,r):fa(t,r)},Gp=(e,t,n)=>Math.max(da(t,Up(e,t,n)),Wp(e,t,n)+(t===Ri()?0:1)),Kp=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(Io(e,`clockGated`)===t||Io(e,`rateLimit`)===t&&n+1>4)return!0;if(Io(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},qp=e=>t=>{if(G(t))return t;let n=x[e];if(!n||!is(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(Kp(t,e))return t;let i=Wp(t,e,r+1),a=t.resources[n.id]??0;return a<Gp(t,e,r+1)?t:mo({...t,...e===Ri()?{lastTierEarnedThisRun:!0}:{},resources:{...t.resources,[n.id]:V(a-i)},owned:{...t.owned,[n.id]:V(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},Jp=e=>1*((S[e]??0)+1),Yp=e=>Math.max(0,Math.ceil(Math.log(Ye/Jp(e))/Math.log(Je))),Xp=(e,t)=>Math.max(Ye,Jp(e)*Je**t),Zp=(e,t)=>Xp(t,e.autobuyerIntervalLevels?.[t]??0),Qp=(e,t)=>Math.min(qe,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-Yp(t))),$p=(e,t)=>2**Qp(e,t),em=e=>Yp(e)+qe,tm=e=>xc[e%10]*1e3**Math.floor(e/10),nm=(e,t)=>{let n=1,r=xc.indexOf(e);for(;r===-1&&n<e;)n*=10,r=xc.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*tm(r+t)},rm=(e,t=b[0].id)=>((S[t]??0)+1)*nm(10,e),im=e=>t=>{if(G(t)||Xo(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=em(e))return t;let r=rm(n,e);if(V(t.purge.points)<r)return t;let i=Va(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},am=e=>Math.max(0,Math.ceil(Math.log(Ye/e)/Math.log(Je))),om=e=>am(Ze[e].baseSeconds),sm=(e,t)=>Math.max(Ye,Ze[t].baseSeconds*Je**(e.automationIntervalLevels?.[t]??0)),cm=(e,t)=>nm(Ze[e].baseCost,t),lm=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,um=lm,dm=e=>t=>{if(!Ze[e]||G(t)||Xo(t,`global`,e)||!lm(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=om(e))return t;let r=cm(e,n);if(V(t.purge.points)<r)return t;let i=Va(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},fm=()=>am(Qe.baseSeconds),pm=(e,t)=>Math.max(Ye,Qe.baseSeconds*Je**(e.tierTickspeedIntervalLevels?.[t]??0)),mm=(e,t=b[0].id)=>((S[t]??0)+1)*nm(Qe.baseCost,e),hm=e=>t=>{if(G(t)||Xo(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=fm())return t;let r=mm(n,e);if(V(t.purge.points)<r)return t;let i=Va(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},gm=e=>t=>({...t,computeAutoChargeEnabled:!!e}),_m=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,vm=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,ym=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},bm=e=>{if(G(e)||Fo(e,`clockSpeedDisabled`)||!ba(e))return e;let t=e.globalTickspeedMultiplier??null,n=va(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},xm=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(V(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(V(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(V(n?.capacityLevel??0))),r=Math.max(0,Math.floor(V(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,V(e?.capacity??8)),speedCapacity:Math.max(8,V(e?.speedCapacity??e?.capacity??8))}},Sm=(e,t)=>{let n=e??xm(null),r=t??xm(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},Cm=(e,t)=>{let n=Ul(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:Kl(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},wm=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=Kl(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},Tm=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=uc(n);e!==n&&(n=e,r=!0)}if(!zl(n)&&Cm(n,t)){let e=nu(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=el(n)),a===n&&i&&(a=rl(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((K(n,t)?.purchased??0)<(i.purchased??0)&&Id(n,t)){let e=Rd(t,(i.purchased??0)-(K(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((K(n,t)?.purchased??0)>=(i.purchased??0)||Ld(n,t)||Cd(t)(n)>q(n,t))&&Zu(n,t)<(i.capacityLevel??0)){let e=ff(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},Em=e=>{let t=Gi().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=Sm(n.foundryResetCaps,xm(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:Gs(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},Dm=e=>{if(V(e.resources.base)<Go(e))return e;let t=No(e);if(!t)return Na(Am(e,!0));let n=Po(e,t.id),r=V(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return Na({...Am(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:zi(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},Om=e=>t=>{if(!Mo(e)||No(t)||!Jo(t,e))return t;let n={...Gi().challenges,...t.challenges};return{...Am(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:zi()}}},km=e=>No(e)?Na({...Am(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:zi()}}):e,Am=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=t?_s(e.resources[O],n):0,i=Gi(),a=e.purge.count+ +!!t,o=jo(e),s={id:`p${a}-${Date.now()}`,at:Date.now(),purgeNumber:a,pointsAwarded:r,moneyBits:V(e.resources[O])},c=e.prestigeMuseum??i.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return ha({...i,challenges:e.challenges??i.challenges,achievements:e.achievements??i.achievements,daily:e.daily??i.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...i.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??i.intro.mainGameUnlocked,capacity:e.intro?.capacity??i.intro.capacity,byteCreated:e.intro?.byteCreated??i.intro.byteCreated,bits:e.intro?.bits??i.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??i.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??i.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??i.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??i.intro.diskCache,diskBuild:e.intro?.diskBuild??i.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??i.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??i.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??i.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??i.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??i.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:Gs(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??i.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??i.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??i.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??i.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??i.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??i.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??i.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??i.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??i.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??i.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??i.intro.computeNodes,computeClusters:e.intro?.computeClusters??i.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??i.intro.computeNetworks,computeGrids:e.intro?.computeGrids??i.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??i.intro.computeFabrics,computeClouds:e.intro?.computeClouds??i.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??i.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??i.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??i.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??i.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??i.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??i.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??i.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??i.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??i.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??i.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??i.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??i.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??i.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??i.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??i.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??i.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??i.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??i.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??i.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??i.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??i.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??i.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??i.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??i.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??i.autobuyers,autobuyersEnabled:e.autobuyersEnabled??i.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??i.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??i.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??i.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??i.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??i.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??i.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??i.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??i.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??i.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??i.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??i.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??i.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??i.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??i.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??i.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??i.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??i.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??i.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??i.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??i.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??i.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??i.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??i.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??i.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??i.autoGlobalTickspeedEnabled,era:e.era??i.era,eons:e.eons??i.eons,hyperscalerCount:e.hyperscalerCount??i.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??i.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??i.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??i.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||V(e.purge.points)+r>=100,owned:e.computeFlops?.owned??i.computeFlops.owned,cumulativeBoost:i.computeFlops.cumulativeBoost},purge:{...i.purge,points:V(e.purge.points)+r,count:a,unboundedUnlocked:o}})},jm=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},Mm=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},Nm=(e,t)=>t!==e&&Fo(t,`bitRot`)?$o(t,{cycleSeconds:0}):t,Pm=(e,t)=>t===e?t:Na(t),Fm=e=>Nm(e,Pm(e,Lm(e))),Im=e=>{let t=zm(e);return t===e?Nm(e,Pm(e,t)):mo(Rm(e,Nm(e,Pm(e,t))))},Lm=e=>{if(G(e))return e;let t=Co(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<wo(e))return e;let n=Gi(),r=So(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<Bo(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:V(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:Do(e)??n.overclockLastClaimCompletedLevels}},Rm=(e,t)=>{if(No(e))return t;let n=Math.max(0,(e.purchaseLevels?.[Vo(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=Do(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&po(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),jo(e)&&n>=12&&po(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},zm=e=>{if(G(e)||Fo(e,`overclockDisabled`))return e;let t=Vo(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<To(e))return e;let r=Gi();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},Bm=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,Vm=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,Hm=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,Um=e=>t=>{if(G(t)||Fo(t,`restageDisabled`)||!Sa(t))return t;let n=Vo(t).id;if(V(t.owned?.[n])<=0)return t;let r=Math.floor(V(e));if(r<=0)return t;let i=t.lastTierXpConsumed??0;if(r<wa(i))return t;let a=V(t.purge.xp);if(r>a)return t;let o=b.filter(e=>e.id!==n).map(e=>e.id);return{...t,purge:{...t.purge,xp:a-r},lastTierXpConsumed:i+r,owned:{...t.owned,...o.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...t.resources,[O]:0,...o.reduce((e,t)=>({...e,[t]:0}),{})}}},Wm=z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Gm=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,Km=z.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,qm=z(Li)`
  gap: 0.4rem;
`,Jm=z.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Ym=z.button`
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
`,Xm=z.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Zm=z.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,Qm=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,$m=z.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,eh=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=oi(),c=new Set(ho(t)),l=me.map(e=>({...e,members:F.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0);return(0,B.jsxs)(Wm,{children:[(0,B.jsx)(Gm,{children:(0,B.jsx)(`h1`,{children:`Achievements`})}),(0,B.jsx)(Km,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>po(t,e.id)).length,u=c.has(e.id);return(0,B.jsxs)(qm,{"aria-label":`${e.name} achievement group`,children:[(0,B.jsxs)(Jm,{children:[(0,B.jsxs)(Ym,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,B.jsxs)($m,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length]})]}),n[e.id]&&e.members.map(e=>{let n=po(t,e.id),r=e.secret&&!n,c=r?`???`:e.name;return(0,B.jsxs)(Xm,{"aria-label":`${c} achievement ${n?`earned`:`not yet earned`}`,children:[(0,B.jsxs)(Zm,{$earned:n,children:[r?(0,B.jsx)(`strong`,{children:c}):(0,B.jsx)(Ym,{"aria-expanded":!!i[e.id],"aria-label":`${e.name} details`,onClick:()=>o(a,e.id),type:`button`,children:(0,B.jsx)(`strong`,{children:c})}),!r&&i[e.id]&&(0,B.jsxs)(Qm,{children:[e.trigger,e.bonus?` — ${e.bonus}`:``]})]}),(0,B.jsx)($m,{$color:n?s.color.good:s.color.disabled,children:n?`✅`:`🔒`})]},e.id)})]},e.id)})})]})},th=`high`,nh=`normal`,rh=()=>b[b.length-1],ih=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],ah=[Ff,zf,Z,Kf,Xf,ep,ip,cp,fp],oh=e=>ih.some((t,n)=>Md(e,n)),sh=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,ch=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,lh=e=>cl(e)&&(e.intro?.bits??0)>=Al(e),uh=1,dh={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},fh=(e,t)=>{let[n,r]=dh[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&sm(e,t)<uh},ph=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&Zp(e,t)<uh,mh=(e,t)=>e?th:t?nh:!1,hh=e=>{if(G(e))return!1;let t=ia(e);return b.some(n=>{if(!is(e)(n)||ph(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:la(n,r,t,i,As(e,n),2**53-1)>=a})},gh=e=>G(e)||!ba(e)||fh(e,`speedUp`)?!1:ya(e),_h=e=>{if(G(e)||fh(e,`scaleUp`))return!1;let t=Co(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=wo(e)},vh=e=>{if(G(e)||fh(e,`overclock`))return!1;let t=rh();return is(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=To(e):!1},yh=e=>G(e)&&!fh(e,`purge`),bh=e=>yh(e)||hh(e)||gh(e)||_h(e)||vh(e),xh=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],Sh=e=>{if((e.purge?.count??0)<1||G(e))return!1;let t=e.purge?.points??0;return xh.some(n=>{if(!um(e,n))return!1;let r=Yo(`global`,n);if(r&&!Po(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<om(n)&&t>=cm(n,i)})},Ch=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=gs(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.buyMaxUnlocked&&t>=2||!e.cacheWarmUnlocked&&t>=20)return!0;let n=La(Fa(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},wh=e=>Sh(e)||Ch(e),Th=e=>bh(e),Eh=e=>mh(yh(e)||hh(e),Th(e)),Dh=e=>sh(e)||ch(e)||Yc(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||$c(e)&&(e.intro?.bits??0)>=Qc(e.intro)||tu(e)&&!e.intro?.diskBuildQueued||Bl(e)||lh(e),Oh=e=>mh(sh(e)||ch(e),Dh(e)),kh=e=>ih.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(mf(e,r)<10||a<Ed(e,n))}),Ah=e=>pf(e)?kh(e)||ah.some(t=>t(e))||oh(e):!1,jh=e=>pf(e)?mh(kh(e),Ah(e)):!1,Mh=e=>Ba(e)?st.some(t=>Ga(e,t.id)):!1,Nh=e=>Mh(e)?nh:!1,Ph=e=>({game:Eh(e),foundry:Oh(e),boosters:jh(e),compute:Nh(e),perks:wh(e)?nh:!1}),Fh=`3.25rem`,Ih=xi`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,Lh=z.nav`
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
`,Rh=z.button`
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
`,zh=z.span`
  font-size: 1.05rem;
  line-height: 1;
`,Bh=z.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,Vh=z.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?mi`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${Ih} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:mi`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,Hh=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,B.jsxs)(Lh,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,B.jsxs)(Rh,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,B.jsx)(Vh,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,B.jsx)(zh,{"aria-hidden":`true`,children:n.icon}),(0,B.jsx)(Bh,{children:n.label})]},n.id)}),(0,B.jsxs)(Rh,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,B.jsx)(zh,{"aria-hidden":`true`,children:`⋯`}),(0,B.jsx)(Bh,{children:`More`})]})]})},Uh=`calc(${Fh} + env(safe-area-inset-bottom))`,Wh={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},Gh=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&Wh[e];return i?r?n.color.disabled:n.color[i]:t},Kh={white:`255, 255, 255`,darkgrey:`169, 169, 169`},qh=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},Jh=e=>e?e.startsWith(`#`)?qh(e):Kh[e]??`255, 255, 255`:`255, 255, 255`,Yh=xi`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,Xh=e=>Math.min(100,Math.max(0,e??0)),Zh=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=Xh(t),l=Xh(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return mi`
    background: linear-gradient(
      to right,
      ${o}${u} 0%,
      ${o}${u} ${c}%,
      ${s}${d} ${c}%,
      ${s}${d} ${l}%,
      transparent ${l}%,
      transparent 100%
    ), ${a.color.surfaceSunken};
  `},Q=z.button.withConfig({shouldForwardProp:e=>e!==`variant`})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95em;
  font-weight: 600;
  margin: 0;
  padding: 0.5em 0.9em;
  border-radius: 6px;
  color: ${Gh};
  border: 1.5px solid ${Gh};
  background: ${e=>e.theme.color.surfaceSunken};
  ${Zh}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>Jh(Gh(e))};
  animation: ${e=>e.$pulse&&!e.disabled?mi`${Yh} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${Gh};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Qh=z.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,$h=z.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,eg=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,$=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,B.jsx)($h,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!eg.test(n)?(0,B.jsx)($h,{children:n}):(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(Qh,{children:n.slice(0,r+1)}),(0,B.jsx)($h,{children:n.slice(r+1)})]})},tg=z.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,ng=z.div`
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
`,rg=z(Li)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,ig=z.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,ag=z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,og=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,B.jsx)(ng,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,B.jsxs)(rg,{$raised:!0,children:[(0,B.jsx)(ig,{id:n,children:`Save not compatible`}),(0,B.jsx)(ag,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,B.jsx)(Q,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},sg=1e80,cg=30,lg=20,ug=2**53-1,dg=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],fg=[1,2,5],pg=Object.fromEntries(dg.map(e=>[e.id,e])),mg=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],hg=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>Hp(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>vm(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:Hm,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:Vm,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:Bm,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:_m,isOn:e=>e.autoOverclockEnabled??!0}],gg=Object.fromEntries(hg.map(e=>[e.key,e])),_g=(e,t)=>!!gg[t]?.isOn(e),vg=e=>new Date(e).toISOString().slice(0,10),yg=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},bg=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},xg=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},Sg=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),Cg=(e,t)=>{let n=hg.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},wg=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},Tg=e=>e.startBytes*8,Eg=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,Dg=(e,t,n)=>{let r=wg(t,n.levers);return Eg(e)===Eg(r)?r:{...r,resources:{...r.resources,[O]:Tg(n)}}},Og={buyTier:{make:e=>Ns(e,ug)},tierTickspeed:{make:e=>qp(e)},clockSpeed:{make:()=>bm},scaleUp:{make:()=>Fm},overclock:{make:()=>Im},restage:{make:e=>Um(e)},automation:{make:e=>Object.hasOwn(gg,e?.key??``)?gg[e.key].set(!!e.enabled):e=>e}},kg=b[b.length-1],Ag=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${H(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${H(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${kg.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),jg=Object.fromEntries(Ag.map(e=>[e.key,e])),Mg=Object.fromEntries(Ag.map(e=>[e.key,0])),Ng={balance:0,clock:0,owned:{},purchaseLevels:{}},Pg=(e,t=e)=>({...e,runPeaks:Lo(e.runPeaks??Ng,t)}),Fg=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=Do(t)??0;return a!==(Do(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},Ig=(e,t,n,r)=>{let i=e.game,a=Dg(i,Pg(ws(n,ug)(i)),t);return r&&Eg(i)!==Eg(a)&&r(a),{game:a,metrics:Fg(i,a,e.metrics)}},Lg=(e,t,n,r,i)=>{let a=e.game,o=Og[n].make(r)(a);if(o===a)return e;let s=Dg(a,Pg({...o,runPeaks:a.runPeaks},o),t);return i&&Eg(a)!==Eg(s)&&i(s),{game:s,metrics:Fg(a,s,e.metrics)}},Rg=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],zg=(e,t,n)=>{let r=e;for(let e=0;e<lg;e++){let e=r;for(let[r,i]of Rg)e=Lg(e,t,r,i,n);if(e===r)break;r=e}return r},Bg=e=>({...e,runPeaks:Lo(Ng,e)}),Vg=e=>({game:e,metrics:Fg(e,e,Mg)}),Hg=(e,t,n,r,i)=>{let a=zg(Vg(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=zg(Ig(a,t,n,i),t,i),o.push(a.metrics);return o},Ug=(e,t=0)=>e.map(e=>[t,e,!0]),Wg=[Ug([`scaleUp`,`restage`,`overclock`]),Ug([`scaleUp`,`restage`]),[...Ug([`scaleUp`,`restage`]),...Ug([`overclock`],1)],[...Ug([`scaleUp`,`restage`]),...Ug([`overclock`],2)],[...Ug([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...Ug([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],Ug([`overclock`,`restage`])],Gg=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},Kg=(e,t,n,r,i)=>{let a=Vg(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=Ig(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=Lg(a,t,e,n);o.push(a.metrics)}return o},qg=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},Jg=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:Do(e)??0}),Yg=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=qg(n,e);if(t>i)return t}return null},Xg=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(qg(t/e,1));if(i>n&&i<t)return i}let i=r(qg(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},Zg=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},Qg=(e,t,n)=>{let r=pg[t],i=n===`fallback`,a=bg(`${e}|${t}|v7|${n}`),o=xg(a),s=i?1e6:fg[Math.floor(o()*fg.length)]*10**Sg(o,r.startExponent),c=[];if(!i){let e=[...mg],t=Sg(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:Cg(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:Sg(o,r.warmupSeconds.map(e=>e/cg))*cg,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:7,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>mg.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=Gi();v.resources={...v.resources,[O]:Tg(_)};for(let e of u)v=gg[e].unlock(v);v=Bg(wg(v,l));let y=v;Hg(v,_,cg,f/cg,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=Dg(y,gg[e].set(!1)(y),_);y=Bg(y);let b=[Vg(y).metrics];for(let e=Vg(y),t=0;t<p;t++)e=Ig(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?Ag:Zg(o,Ag),C=(e,t)=>{let n=Yg(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=Xg(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=Wg.map(e=>Gg(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:Kg(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=sg);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=Hg(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:Jg(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},$g=new Map,e_=(e,t)=>{let n=`${e}|${t}`,r=$g.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=Qg(e,t,n);r??=Qg(e,t,`fallback`),$g.size>64&&$g.clear(),$g.set(n,r)}return r},t_=(e,t)=>e_(e,t).def,n_=e=>de.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),r_=e=>e.metrics?.[e.def.objective?.key]??0,i_=e=>r_(e)>=e.def.objective?.target,a_=e=>{let t=e.def.objective;if(!t)return 0;let n=r_(e);if(n>=t.target)return 1;if(!jg[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},o_=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),s_=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=i_(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||r_(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=o_(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},c_=(e,t)=>n=>{if(!n_(n)||!pg[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=e_(vg(t),e);return o_(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:Vg(i).metrics})},l_=e=>t=>t.daily.runs[e]?o_(t,e,null):t,u_=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===vg(n)},d_=(e,t)=>n=>u_(n,e,t)?c_(e,t)(l_(e)(n)):n,f_=e=>t=>{let n=t;for(let t of dg){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==7){n=o_(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=Ig(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=s_(o_(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},p_=(e,t,n,r)=>i=>{if(!Object.hasOwn(Og,t))return i;let a=f_(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=Lg(s,o.def,t,n);return c===s?a:s_(o_(a,e,{...o,...c}),e,r)},m_=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},h_=z.div`
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
`,g_=z(Li)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,__=z.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,v_=z.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,y_=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,b_=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,B.jsx)(h_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,B.jsxs)(g_,{$raised:!0,children:[(0,B.jsx)(__,{id:d,children:t}),(0,B.jsx)(v_,{children:n}),(0,B.jsxs)(y_,{children:[(0,B.jsx)(Q,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,B.jsx)(Q,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},x_={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},S_=e=>Tp(e)>0,C_=e=>S_(e),w_=(e,t)=>t<Tp(e),T_=(e,t)=>t<=Tp(e),E_=(e,t=0)=>{let n=bp(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*Oe[e.type].durationSeconds;return`${x_[e.type]??e.type} ×${Oe[e.type].multiplier} (${ks(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${wp(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},D_=mi`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${xi`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,O_={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},k_=e=>ks(e).replace(/ 0[ms]$/,``),A_=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,j_=z(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,M_=z.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,N_=`2.8em`,P_=z(j_)`
  flex: 0 0 ${N_};
  width: ${N_};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,F_=z.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${N_};
  width: ${N_};
`,I_=z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,L_=z.div`
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
`,R_=z.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,z_=z.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B_=z.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,V_=z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,H_=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},U_=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=O_[r]??{icon:`⚡`,label:r},s=vp(r,i[0]),c=_p(r,i[0]),l=H_(i),u=l.length-1;return(0,B.jsx)(I_,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=A_(e.tierIndex);return(0,B.jsxs)(M_,{children:[i===u?Mp(t,r)?(0,B.jsx)(P_,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`↩`})}):(0,B.jsx)(P_,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!Pp(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,B.jsx)($,{children:`✕`})}):(0,B.jsx)(F_,{"aria-hidden":`true`}),(0,B.jsxs)(L_,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${A_(e.tierIndex,`name`)}, ${ks(f)}${l?` once it starts`:` left`}`,children:[(0,B.jsx)(R_,{children:`${e.count}x`}),(0,B.jsx)(z_,{children:`${m} ${o.icon} ×${c}`}),(0,B.jsx)(B_,{children:ks(f)})]}),i===0?(0,B.jsx)(P_,{"aria-label":`stack the ${o.label} compute boost`,disabled:!Ap(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${k_(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,B.jsx)($,{children:`+`})}):(0,B.jsx)(F_,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},W_=({state:e,actions:t})=>{let n=bp(e.intro??{});return n.length===0?null:(0,B.jsx)(V_,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,B.jsx)(U_,{lane:n,state:e,actions:t},n.type))})},G_=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(Q,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,B.jsx)(b_,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,B.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},K_=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},q_=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,J_=e=>`Unlocks at Purge ${qo(e)}`,Y_=e=>`${e.id} · ${e.target} · ${e.codename}`,X_=(e,t)=>t-e%t,Z_=e=>{let t=No(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${K_(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${K_(X_(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${K_(X_(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${K_(Math.ceil(X_(n,30)))}`];case`bitRot`:return[`Corruption ${ea(Wo(e))} vs ${ea(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},Q_=z.section`
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
`,$_=z.button`
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
`,ev=z.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,tv=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,nv=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=No(e);if(!a)return null;let o=K_(e.challenges.activeSeconds);return(0,B.jsxs)(Q_,{"aria-label":`active challenge banner`,children:[(0,B.jsxs)(ev,{children:[(0,B.jsxs)($_,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,B.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,B.jsx)(tv,{children:a.rule}),(0,B.jsxs)(tv,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,q_(a.goal)]}),Z_(e).map(e=>(0,B.jsx)(tv,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,B.jsx)(G_,{challenge:a,onExit:t})]})},rv=z.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,iv=Object.freeze({removeAds:!1}),av=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>iv}),ov=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return av();let n=null,r=null,i=null,a=iv,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},sv=null,cv=()=>(sv??=ov({loadAds:null,loadIap:null}),sv),lv=1e4,uv=400,dv=100,fv=z.div`
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
`,pv=z(Li).attrs({role:`status`,"aria-live":`polite`})`
  align-items: center;
  max-width: 26rem;
  opacity: ${e=>+!e.$fading};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${uv}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,mv=z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,hv=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,gv=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=cv()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+lv}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+lv})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,dv);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,uv);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&Ds(e.elapsedRealSeconds,e.capSeconds)>0;return(0,B.jsx)(fv,{children:(0,B.jsxs)(pv,{"aria-label":`offline progress notice`,$fading:c,children:[(0,B.jsxs)(mv,{children:[`Resumed from sleep! You were away for `,ks(e.elapsedRealSeconds),` — simulated `,ks(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,B.jsxs)(hv,{children:[f&&(0,B.jsx)(Q,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,B.jsxs)(Q,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},_v=z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,vv=mi`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,yv=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,bv=z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,xv=xi`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Sv=z(Li)`
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
  animation: ${e=>e.$animateReveal?mi`${xv} 0.4s ease-out`:`none`};
  ${e=>e.$boosted&&D_}

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
`,Cv=e=>mi`
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
`,wv=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,Tv=z.div`
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
`,Ev=z(Li)`
  ${Cv(`#0e7490`)}
`,Dv=z(Li)`
  ${Cv(`#1d4ed8`)}
`,Ov=z(Li)`
  ${Cv(`#8b5cf6`)}
`,kv=z(Li)`
  ${Cv(`#c2410c`)}
`,Av=z.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,jv=z(Li)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&mi`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&mi`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,Mv=z.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Nv=z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Pv=z.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,Fv=z(rv)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,Iv=z(Nv)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,Lv=z.div`
  position: relative;
`,Rv=z.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,zv=z.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,Bv=z.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Vv=z.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${Uh};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,Hv=z.div`
  ${e=>Zh({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,Uv=z.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,Wv=z(jv)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,Gv=z.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,Kv=z.div`
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

  ${e=>e.$compressed&&mi`
    box-shadow: ${e.theme.shadow.md};
    padding: 0.25rem 0;

    ${jv} {
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
    ${rv} {
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
`,qv=z.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,Jv=z.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,Yv=z.div`
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
`,Xv=z.div`
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
`,Zv=z.div`
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
`,Qv=z.div`
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
`,$v=z.div`
  height: ${e=>e.$height}px;
`,ey=z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,ty=z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,ny=z.h3`
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
`,ry=z.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,iy=z.details`
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
  summary:has(${Tv}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${Tv}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`,ay=z.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  margin: 0;
  ${vv}

  @media (max-width: 24.5rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    line-height: 1.15;
  }
`,oy=z(Q)`
  grid-area: buy;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  min-height: 2rem;
  padding: 0 0.6em;
  ${vv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,sy=z(Qh)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,cy=z.span`
  font-weight: 800;
`,ly=z($h)`
  flex: 1 0 auto;
  text-align: right;
`,uy=z(Q)`
  grid-area: upgrade;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  min-height: 2rem;
  padding: 0 0.5em;
  ${vv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.4em;
  }
`,dy=(e,t)=>t===`base`?ea(e):t===`bytes`?ta(e):`${H(e)} ${E(t)}`,fy=(e,t)=>Math.min(100,Math.round(e/t*100)),py=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),my=e=>Math.round((e-1)*100),hy=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),gy=(e,{precise:t=!1}={})=>e>=2?`${py(e)}x`:`+${t?hy(e):my(e)}%`,_y=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=oi(),{purge:s}=a,c=a.resources[O]>=Go(a),l=jo(a),u=a.prestigeDoublePpLevel??0,d=Ea(a),f=Ta(s.count,d),p=_s(a.resources[O],u),m=ss(a.resources[O],Go(a)),h=cs(a.resources[O]),g=Math.round(h*100),_=a.resources[O],y=na(_),x=ea(_),S=!!No(a)&&Po(a,No(a).id),C=q_(Go(a)),w=S?0:Math.max(1,p),T=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${C})`,k=S?`${T} — completes the challenge repeat, awards no Purge Points`:`${T} — awards +${H(w)} Purge Point${w===1?``:`s`}`,[A]=(0,v.useState)(()=>new Set(b.filter(e=>is(a)(e)).map(e=>e.id))),[ee,j]=(0,v.useState)(()=>new Set),te=e=>j(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),M=(0,v.useRef)(null),N=(0,v.useRef)(new Map),ne=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;j(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return M.current=e,()=>e.disconnect()},[]);let re=e=>(ne.current.has(e)||ne.current.set(e,t=>{let n=M.current,r=N.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(N.current.set(e,t),n&&n.observe(t)):N.current.delete(e)}),ne.current.get(e)),[ie,P]=(0,v.useState)(!1),ae=()=>P(e=>!e),oe=G(a),se=No(a),ce=e=>se?.effect===e,le=se?` — disabled by challenge ${se.id} ${se.codename}`:``,ue=s.count===0,de=!!e.buyUnitMode,fe=!!e.buyMaxMode&&Ps(a)&&!de,pe=ia(a),me=oe&&ue,he=oe&&!ue,F=!!se||he||!!e.goal||bp(a.intro??{}).length>0,I=Vo(a),ge=a.purchaseLevels?.[I.id]??1,_e=is(a)(I),ve=Co(a),ye=a.purchaseLevels?.[ve.id]??1,be=a.scaleUpCount??0,xe=wo(a),Se=Math.max(0,ge-1),Ce=Math.max(0,ye-1),we=xe,Te=fy(Ce,we),Ee=!oe&&Ce>=xe,De=b[b.indexOf(ve)+1]??null,Oe=De?.symbol===`TB`,ke=ds(a),Ae=Number.isInteger(ke)?String(ke):ke.toFixed(2),L=ke===2?`doubles`:`multiplies by ${Ae}`,[je,Me]=(0,v.useState)(_e);(0,v.useEffect)(()=>{_e&&Me(!0)},[_e]);let Ne=Do(a)??0,Pe=To(a),Fe=Pe,Ie=1+us(a),Le=1+us({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),Re=1+et,ze=fy(Se,Fe),Be=!oe&&!ce(`overclockDisabled`)&&Se>=Pe,Ve=a.globalTickspeedMultiplier??null,He=Ve!==null,Ue=ls(a),We=_a(Ve??0),Ge=ba(a),Ke=!oe&&!ce(`clockSpeedDisabled`)&&Ge&&ya(a),qe=Sa(a),Je=a.owned[I.id]??0,Ye=a.lastTierXpConsumed??0,Xe=Math.floor(a.purge.xp??0),Ze=wa(Ye),Qe=fy(Xe,Ze),$e=qe&&!oe&&!ce(`restageDisabled`)&&Je>0&&Xe>=Ze,tt=gy(Ca(Xe)),nt=()=>{$e&&window.confirm(`Restage: consume ${H(Xe)} XP for ${tt} faster ${I.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.`)&&t.consumeXpForLastTierTickspeed(Xe)},rt=fy(a.resources.base??0,va(Ve??0)),[it,at]=(0,v.useState)(Ge);(0,v.useEffect)(()=>{Ge&&at(!0)},[Ge]);let ot=(0,v.useRef)(null);(0,v.useEffect)(()=>{me&&ot.current?.focus()},[me]);let st=(0,v.useRef)(null),[ct,lt]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=st.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>lt(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[me]);let ut=(0,v.useRef)(null),[dt,ft]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=ut.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>ft(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[he]),me?(0,B.jsx)(Xv,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,B.jsxs)(Zv,{children:[(0,B.jsx)(`h2`,{children:`💾 Disk full`}),(0,B.jsxs)(ey,{children:[`You've reached `,ea(a.resources[O]),` — 1 Googol Bytes. All production has stopped.`]}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Resets your resources, owned tiers, and purchases`}),(0,B.jsxs)(`li`,{children:[`Awards `,H(p),` Purge Point`,p===1?``:`s`,` — spend them on the Firmware page for automation and production bonuses`]}),(0,B.jsx)(`li`,{children:`Keeps your unlocked autobuyers and Purge Points`})]}),(0,B.jsx)(Q,{ref:ot,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:(0,B.jsx)($,{children:`✦ Purge Now`})})]})}):(0,B.jsxs)(_v,{children:[(0,B.jsx)(nv,{onExit:t.exitChallenge,state:a}),he&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(Qv,{ref:ut,"aria-label":`purge available banner`,children:[(0,B.jsxs)(ey,{children:[C,` reached — production has stopped.`]}),(0,B.jsxs)(Q,{"aria-label":k,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,B.jsx)(Qh,{children:`✦ `}),(0,B.jsx)($h,{children:S?`Complete challenge`:`Purge +${H(w)} PP`})]})]}),(0,B.jsx)($v,{$height:dt})]}),(0,B.jsx)(Vv,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,B.jsxs)(Hv,{$percent:e.goal?e.goal.percent:m,children:[(0,B.jsx)(tg,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${C}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:m,"aria-valuemin":0,"aria-valuemax":100}),(0,B.jsx)(Uv,{children:e.goal?e.goal.label:`${m}% to Purge`})]})}),F?(0,B.jsx)(tg,{as:`h1`,children:`Byte Factory`}):(0,B.jsx)(yv,{children:(0,B.jsx)(`h1`,{children:`Byte Factory`})}),(0,B.jsx)(W_,{actions:t,state:a}),(0,B.jsx)(gv,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,B.jsx)(qv,{ref:st,"aria-hidden":`true`}),(0,B.jsxs)(Kv,{$compressed:ct,$belowBar:he,$belowBarHeight:dt,children:[(0,B.jsxs)(jv,{$raised:!0,children:[(0,B.jsxs)(Lv,{children:[(0,B.jsx)(Mv,{"aria-controls":`global-multipliers-details`,"aria-expanded":ie,"aria-label":`money display`,onClick:ae,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ae())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,B.jsx)(Fv,{children:y})}),!ct&&y!==x&&(0,B.jsx)(Iv,{"aria-label":`balance in bits: ${x}`,children:x})]}),!ct&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(Rv,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(h-n)/.125));return(0,B.jsx)(zv,{children:(0,B.jsx)(Bv,{$fraction:r})},t)})}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":g,"aria-valuemin":0,"aria-valuemax":100})]}),ie&&!ct&&(0,B.jsxs)(Gv,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!ue&&(0,B.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${gy(Oa(a))} production speed from ${H(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${H(100)} PP on Firmware → Prestige)`]}),!ue&&(0,B.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${gy(f)} production speed from ${H(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${H(1)} PP on Firmware → Prestige)`]}),(0,B.jsxs)(`li`,{children:[`Scale Up: `,be>0?`${be} activation${be===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${H(we)} completed levels on ${ve.name})`]}),it&&(0,B.jsxs)(`li`,{children:[`Accelerate: `,He?`${gy(Ue,{precise:!0})} faster ticks on every tier`:`not yet active`]}),je&&(0,B.jsxs)(`li`,{children:[`Overclock: `,Ne>0?`The per-level speed bonus is now ${hy(Ie)}% (was ${hy(Le)}%)`:`not yet claimed (reach ${H(Fe)} completed levels on ${I.name})`]})]})]}),!ue&&(0,B.jsx)(Wv,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,B.jsxs)(Nv,{children:[(0,B.jsxs)(Pv,{children:[H(s.points),` PP`]}),d&&` · ${gy(f)} production speed`]})})]}),(it||qe)&&(0,B.jsxs)(Av,{children:[it&&(0,B.jsxs)(Dv,{"aria-label":`global accelerate panel`,children:[(0,B.jsxs)(iy,{children:[(0,B.jsx)(`summary`,{children:(0,B.jsxs)(Tv,{children:[(0,B.jsx)(`h2`,{children:`Accelerate`}),(0,B.jsxs)(wv,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,hy(Ie),`%/lvl`]})]})}),(0,B.jsx)(ty,{children:He?`${gy(Ue,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,B.jsxs)(Q,{"aria-label":He?`Upgrade Accelerate for ${ta(We)} (currently ${gy(Ue,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${ta(We)}`,color:Ke?`#3b82f6`:`darkgrey`,disabled:!Ke,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${ce(`clockSpeedDisabled`)?le:``}`,type:`button`,$progress:rt,$progressColor:`#3b82f6`,$pulse:Ke,children:[(0,B.jsx)(Qh,{children:`🌐 `}),(0,B.jsx)($h,{children:ta(We)}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":rt,"aria-valuemin":0,"aria-valuemax":100})]})]}),qe&&(0,B.jsxs)(Ov,{"aria-label":`restage panel`,children:[(0,B.jsxs)(iy,{children:[(0,B.jsx)(`summary`,{children:(0,B.jsxs)(Tv,{children:[(0,B.jsx)(`h2`,{children:`Restage`}),(0,B.jsxs)(wv,{title:`Each XP consumed makes ${I.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[I.symbol,` +`,my(Ca(1)),`%/XP`]})]})}),(0,B.jsxs)(ty,{children:[gy(Ca(Ye),{precise:!0}),` faster `,I.name,` ticks`,` `,`from `,H(Ye),` XP consumed. Next consumption needs at least `,H(Ze),` XP.`]})]}),(0,B.jsxs)(Q,{"aria-label":`Restage: consume ${H(Xe)} XP for ${tt} ${I.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${ce(`restageDisabled`)?le:``}`,variant:`smart`,disabled:!$e,onClick:nt,title:Je>0?`Consume XP for a compounding +1% ${I.name} tickspeed per XP (min ${H(Ze)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${I.name} owned right now — nothing to speed up, so this stays disabled until you own at least one again`,type:`button`,$progress:Qe,$pulse:$e,children:[(0,B.jsx)(Qh,{children:`🧬 `}),(0,B.jsxs)($h,{children:[H(Xe),` XP`]}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`${I.name} Restage progress`,"aria-valuenow":Qe,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,B.jsx)(bv,{children:b.map((e,n)=>{if(!is(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=js(a,e.id),c=As(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,p=W(a,e.id)??e,m=la(p,l,pe,d,c,2**53-1),h=de?Math.min(1,m):m,g=ca(p,l,pe,d,1),_=h>0?ca(p,l,pe,d,h):g,v=m>0&&!oe,y=d/pe*100,b=h/pe*100,x=a.tickspeedLevels?.[e.id]??1,S=ga(x)*(e.id===I.id?Ca(a.lastTierXpConsumed??0):1),C=gy(S),w=yo(l,vo(a)),T=xo(a,e.id),O=Math.floor(i*f*T*w*zo(a,e.id)),k=e.producesResourceId===`base`?ea(O):e.producesResourceId===`bytes`?ta(O):`${H(O)} ${E(e.producesResourceId)}`,j=D(e.id),M=fs(a,e.id),N=Wp(a,e.id,x+1),ne=Gp(a,e.id,x+1),ie=r>=ne&&!oe&&!Kp(a,e.id),P=fe?Us(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ae=P.levels>0?`Buy ${H(P.levels)} full level${P.levels===1?``:`s`} for ${ea(P.cost)} total; highest level costs ${ea(P.partialQuantity>0?P.partialCost:P.lastLevelCost)}${P.partialQuantity>0?` (${P.partialQuantity} of ${pe} purchases toward the next level)`:``} (${H(u)} completed levels)`:`Buy${h>1?` ×${h}`:``} for ${ea(_)} (${H(u)} completed levels, ${H(d)} of ${pe} purchased toward the next)`,se=`Tickspeed multiplier (+10% faster ticks) for ${dy(N,e.id)}${ne>N+1?` (requires ${dy(ne,e.id)} owned)`:``}`,ce=P.levels>0?`+${H(P.levels)}`:``,le=`⚙ ${dy(N,e.id)}`,ue=fy(r,ne),me=o.tierAccents[n%o.tierAccents.length],he=ee.has(e.id),F=`${e.id}-details`,ge=w_(a.intro,n);return(0,B.jsxs)(Sv,{ref:re(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:me,$animateReveal:!A.has(e.id),$boosted:ge,children:[(0,B.jsxs)(Jv,{children:[(0,B.jsx)(ny,{children:(0,B.jsxs)(ry,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":he,"aria-controls":F,onClick:()=>te(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),te(e.id))},children:[(0,B.jsx)(tg,{children:e.name}),(0,B.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,B.jsxs)(ay,{title:`Owned`,children:[(0,B.jsx)(tg,{children:`Owned: `}),H(i)]})]}),he&&(0,B.jsx)(Yv,{id:F,children:(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[`Production: +`,k,` per delivery`]}),(0,B.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,py(j),`s`]}),(0,B.jsxs)(`li`,{children:[`Effective tickspeed: every `,py(M),`s (tier ×`,py(S),`, global ×`,py(Ue),`)`]}),(0,B.jsxs)(`li`,{children:[`Completed levels: `,H(u),` (`,H(d),`/`,pe,` purchased toward the next) — purchase milestone bonus: ×`,py(w),` from `,H(s),` lifetime purchases`]}),T>1&&(0,B.jsxs)(`li`,{children:[`Scale Up bonus: ×`,py(T)]}),ge&&(0,B.jsx)(`li`,{children:E_(a.intro,n)}),(0,B.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,B.jsxs)(uy,{"aria-label":se,variant:`success`,disabled:!ie,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${x} (${C} faster ticks) — the next level makes it 10% more`,$progress:ue,$pulse:ie,children:[(0,B.jsx)($,{children:le}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":ue,"aria-valuemin":0,"aria-valuemax":100})]}),(0,B.jsxs)(oy,{"aria-label":ae,variant:`plain`,disabled:!v,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${pe} purchases) also multiplies it by ×${vo(a)}`,$progress:y,$secondaryProgress:b,$pulse:v,children:[(0,B.jsxs)(sy,{children:[`🛒 `,H(u),ce&&(0,B.jsx)(cy,{children:ce})]}),(0,B.jsx)(ly,{children:ea(P.levels>0?P.partialQuantity>0?P.partialCost:P.lastLevelCost:_)}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":pe})]})]},e.id)})}),(0,B.jsxs)(Av,{children:[(0,B.jsxs)(Ev,{"aria-label":`scale up panel`,children:[(0,B.jsxs)(iy,{children:[(0,B.jsx)(`summary`,{children:(0,B.jsxs)(Tv,{children:[(0,B.jsx)(`h2`,{children:`Scale Up`}),(0,B.jsxs)(wv,{title:`${ke===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,Ae,Oe?` · 🔓 TB`:``]})]})}),(0,B.jsxs)(ty,{children:[`Resets tiers and `,L,` production of every tier unlocked so far`,De?`, and unlocks ${De.name}`:``,`. Needs `,H(we),` completed `,ve.name,` levels.`]})]}),(0,B.jsxs)(Q,{"aria-label":`Scale Up (requires ${we} completed ${ve.name} levels) — ${L} production for tiers unlocked so far${Oe?` and unlocks TB`:``}`,color:Ee?`#22d3ee`:`darkgrey`,disabled:!Ee,onClick:t.scaleUp,title:`Resets tiers, ${L} production for tiers unlocked so far${De?`, and unlocks ${De.name}`:``} — requires ${we} completed ${ve.name} levels`,type:`button`,$progress:Te,$progressColor:`#22d3ee`,$pulse:Ee,children:[(0,B.jsx)(Qh,{children:`⏩ `}),(0,B.jsxs)($h,{children:[ve.symbol,` `,H(Ce),`/`,H(we)]}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":Te,"aria-valuemin":0,"aria-valuemax":100})]})]}),je&&(0,B.jsxs)(kv,{"aria-label":`overclock panel`,children:[(0,B.jsxs)(iy,{children:[(0,B.jsx)(`summary`,{children:(0,B.jsxs)(Tv,{children:[(0,B.jsx)(`h2`,{children:`Overclock`}),(0,B.jsxs)(wv,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,py(10),`%/lvl`]})]})}),(0,B.jsx)(ty,{children:Ne>0?`The per-level speed bonus is now ${hy(Ie)}% (was ${hy(Le)}%).`:`Not claimed yet — reach ${H(Fe)} completed ${I.name} levels. Each completed level then multiplies the per-level speed bonus by ×${Re}.`})]}),(0,B.jsxs)(Q,{"aria-label":`Overclock (requires ${Fe} completed ${I.name} levels) — resets Scale Up's bonus; each completed ${I.name} level (${H(Se)} now) multiplies the per-level speed bonus by ×${Re}`,color:Be?`#fb923c`:`darkgrey`,disabled:!Be,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${I.name} level multiplies the per-level speed bonus by ×${Re} — requires ${Fe} completed levels${ce(`overclockDisabled`)?le:``}`,type:`button`,$progress:ze,$progressColor:`#fb923c`,$pulse:Be,children:[(0,B.jsx)(Qh,{children:`⚡ `}),(0,B.jsxs)($h,{children:[I.symbol,` `,H(Se),`/`,H(Fe)]}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":ze,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},vy=z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,yy=z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,by={"10m":`good`,"1h":`info`,"10h":`violet`},xy=z(Li)`
  align-items: center;
  border-left: 3px solid ${e=>e.theme.color[by[e.$formatId]]??e.theme.color.accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${e=>e.theme.space.sm};
  row-gap: 0;
`,Sy=z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Cy=z.span`
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
`,wy=z.span`
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
`,Ty=z(Q)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,Ey=z.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color[by[e.$formatId]]??e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,Dy=z.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,Oy=z.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,ky=z.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Ay=z.div`
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
`,jy=z.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,My=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Ny=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],Py=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=Ny.map(e=>({group:e,missing:hg.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},Fy=z.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,Iy=z.button`
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
`,Ly=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return Ny.map(r=>{let i=hg.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,B.jsxs)(Fy,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,B.jsx)(ky,{as:`span`,children:r.title}),i.map(n=>{let i=_g(e.game,n.key),a=`${r.title} ${n.label}`;return(0,B.jsx)(Iy,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},Ry=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${H(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,Py(e)].filter(Boolean).join(` · `),zy={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},By=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(a_(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(Li,{"aria-label":`daily run ${e.id}`,children:[(0,B.jsxs)(jy,{children:[(0,B.jsxs)(vy,{children:[`Daily `,e.label]}),(0,B.jsx)(Q,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,B.jsxs)(ky,{children:[o.label,` · now `,H(s),` · `,My(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,B.jsxs)(ky,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),Ry(t.def)&&(0,B.jsx)(ky,{"aria-label":`daily run conditions`,children:Ry(t.def)}),(0,B.jsx)(Ay,{$percent:a,children:(0,B.jsx)(`span`,{})}),(0,B.jsx)(Ly,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,B.jsx)(_y,{game:c})]})},Vy=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=vg(n),f=m_(e,d),p=i?e.daily.runs[i]:null;return p?(0,B.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,B.jsx)(By,{actions:t,format:dg.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,B.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,B.jsxs)(yy,{children:[d,` · `,(0,B.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,My(yg(n)/1e3)]})]}),(0,B.jsx)(Sy,{children:dg.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:t_(d,n.id),f=c.has(n.id),p=Ry(l),m=r?`${o?`from ${r.def.dateId} · `:``}${My(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(a_(r)*100)}%`:[i&&zy[i.lastOutcome],i?.bestSeconds!=null&&`best ${My(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,B.jsxs)(xy,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,B.jsx)(Cy,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,B.jsxs)(wy,{title:`${l.objective.label} · ${m}`,children:[(0,B.jsx)(`strong`,{children:l.objective.label}),m&&(0,B.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,B.jsx)(Ty,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,B.jsx)(Ty,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,B.jsx)(Ey,{$formatId:n.id,$percent:Math.round(a_(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(a_(r)*100),role:`progressbar`,children:(0,B.jsx)(`span`,{})}),f&&(0,B.jsxs)(Dy,{children:[p&&(0,B.jsx)(ky,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,B.jsxs)(Oy,{children:[!o&&(0,B.jsx)(Q,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,B.jsx)(Q,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,B.jsx)(b_,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?u_(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,B.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},Hy=z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Uy=z.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,Wy=z.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Gy={completed:mi`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:mi`
    border-color: ${e=>e.theme.color.warn};
  `,active:mi`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:mi``},Ky=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,qy=z.button`
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
  ${e=>Gy[e.$status]}
  ${e=>e.$selected&&mi`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Jy=z.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,Yy=z.span`
  color: ${e=>Ky(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Xy=z.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,Zy=z.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Qy=Object.fromEntries(b.map(e=>[e.name,e.symbol])),$y={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},eb=e=>{if(e.automation?.kind===`global`)return $y[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${Qy[n]??n}`},tb={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},nb=(e,t)=>No(e)?.id===t.id?`active`:Po(e,t.id)?`completed`:`available`,rb=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=Po(t,e.id);return(0,B.jsxs)(b_,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${Y_(e)}?`,children:[(0,B.jsx)(`p`,{children:e.rule}),(0,B.jsxs)(`p`,{children:[`Goal: `,q_(e.goal),`, then Purge.`]}),(0,B.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},ib=({state:e,onStart:t,onExit:n})=>{let r=No(e),i=N.filter(e=>le.has(e.id)).map(t=>{let n=Jo(e,t.id);return{def:t,unlocked:n,status:n?nb(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${qo(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${K_(i).replace(` `,``)}`:eb(t)};return(0,B.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,B.jsxs)(Li,{children:[(0,B.jsx)(Hy,{children:`Factory challenges`}),(0,B.jsxs)(Uy,{"aria-label":`challenge counts`,children:[(0,B.jsxs)(Yy,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,B.jsxs)(Yy,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,B.jsxs)(Yy,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,B.jsx)(Wy,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,B.jsxs)(qy,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${tb[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?Y_(t):`${t.id} · ${t.target} · ${J_(t)}`,type:`button`,children:[(0,B.jsx)(Jy,{$status:r,children:t.id}),(0,B.jsx)(Yy,{$status:r,children:u(e)})]},t.id)})}),c&&(0,B.jsxs)(Xy,{"aria-label":`challenge ${c.def.id}`,children:[(0,B.jsxs)(`span`,{children:[c.unlocked?(0,B.jsx)(`strong`,{children:Y_(c.def)}):(0,B.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,B.jsx)(Zy,{children:c.def.rule}):(0,B.jsxs)(Zy,{children:[`🔒 `,J_(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,B.jsx)(G_,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,B.jsx)(Q,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${Y_(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},ab=z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,ob=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,sb=z.div`
  display: flex;
  gap: 0.5rem;
`,cb=z(Q)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,lb=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],ub=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=oi(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=n_(n),u=a===`daily`&&!l?`factory`:a;return(0,B.jsxs)(ab,{children:[(0,B.jsx)(ob,{children:(0,B.jsx)(`h1`,{children:`Challenges`})}),(0,B.jsx)(sb,{role:`tablist`,"aria-label":`challenge types`,children:lb.filter(e=>e.id!==`daily`||l).map(e=>(0,B.jsxs)(cb,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,B.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,B.jsx)(ib,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,B.jsx)(Vy,{actions:r,state:n}),(0,B.jsx)(rb,{def:s?N.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},db=`🏷️`,fb=z.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,pb=z.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,mb=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,hb=z.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,gb=z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,_b=xi`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,vb=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,yb=xi`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,bb=z.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${vb(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
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
  border: 1.5px solid ${e=>e.$activeKind?vb(e):e.$full?e.theme.color.accent:e.$empty?e.theme.color.textMuted:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$pullEligible?e.theme.color.good:`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:e.$empty?e.theme.color.surfaceSunken:`transparent`};
  ${e=>e.$activeKind?`--disk-glow: ${vb(e)}; box-shadow: 0 0 0 1px var(--disk-glow), 0 0 10px 2px var(--disk-glow);`:``}
  ${e=>e.$queued?`border-style: dashed; border-color: ${e.theme.color.info};`:``}
  animation: ${e=>e.$activeKind&&!e.$paused?yb:e.$pullEligible?_b:`none`} 1.4s ease-in-out infinite;
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
`,xb=z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Sb=z.div`
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
`,Cb=z.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,wb=z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Tb=z.div`
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
`,Eb=z.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Db=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=Hu(n,t),l=c!==null,u=Hc(n,t),d=Vu(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=ql(t),g=$l(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=Ul(n),b=zl(n),x=t===y?Kl(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/Wl(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!tu(n)||Math.max(0,(jc(n,fc(t))??0)-Wc(n,fc(t)))<=0),O=Math.round(E*100),k=pu(n,t),A=k?yu(n,t):!1,ee=k?_u(k):0,j=k?vu(k):0,te=k&&k.segmentsCollected<10,M=k&&k.segmentsCollected>=10,N=Cu(n,t)&&typeof e?.expediteDiskFill==`function`,ne=wu(n,t),re=hu(k).length>0,ie=Mu(n,t),P=!!ie,ae=P&&Fu(n,t),oe=P?Math.max(0,1-Pu(ie)):1,se=P?t*oe:p,ce=Iu(t);return(0,B.jsxs)(fb,{children:[f?(0,B.jsx)(hb,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):ce?(0,B.jsxs)(pb,{children:[(0,B.jsx)(mb,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,B.jsx)(xb,{role:`group`,"aria-label":P?`${h} read cache flushing to disk${ae?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,se-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,B.jsx)(Sb,{"aria-label":P?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:P?ae?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(ie.remainingSeconds/Ic(n,fc(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:P&&(a||o>0),children:o>0?(0,B.jsx)(Cb,{$fill:o,$flushing:P}):null},r)})})]}):null,k&&!f?(0,B.jsxs)(pb,{children:[(0,B.jsxs)(mb,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,B.jsx)(wb,{role:`progressbar`,"aria-label":M?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((M?j:ee)*100),children:te?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=_u(k),i=t<n,a=t===n&&r>0;return(0,B.jsx)(Tb,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?re?`Collecting from smaller disks and Staging`:`Filling from Staging`:ne?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,B.jsx)(Tb,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,B.jsx)(Eb,{$fill:j})})})]}):null,(0,B.jsxs)(pb,{children:[(0,B.jsx)(mb,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,B.jsx)(gb,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&N,g=o&&!p&&ne&&r===i;return(0,B.jsx)(bb,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${fu(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?ce?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},Ob=z.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,kb=z.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,Ab=z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,jb=z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,Mb=z.h4`
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
`,Nb=z.span`
  flex-shrink: 0;
`,Pb=z.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,Fb=z.div`
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
`,Ib=z.span`
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
`,Lb=z.div`
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
`,Rb=z.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,zb=z.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Bb=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:ks(t)},Vb=z.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,Hb=z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,Ub=z.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Wb=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Gb=z.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,Kb=z.div`
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
`,qb=z.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Jb=z(Q)`
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
`,Yb=z.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,Xb=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=K(e,n),a=Zu(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},Zb=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?Xb(t):[r];if(c.length===0)return null;let l=(0,B.jsx)(kb,{children:c.map(n=>{let r=Xu(n),i=Cd(n)(t),c=ke[n-1]??`Cell`,l=Qd(n),u=q(t,n),d=!Qu(t,n)&&Ie[Zu(t,n)+1],f=Yl(u*l,n),p=Yl(i*l,n),m=ed(t,n),h=rd(t,n),g=id(t,n),_=sd(t,n),v=dd(t,n),y=fd(t,n),b=uf(t,n),x=cf(t,n),S=xd(t,n),C=pc(t,n),w=Wd(t,n),T=Id(t,n),E=!T&&Ld(t,n),D=Ud(t,n),O=Kd(t,n),k=ud(t,n)*l,A=pd(t,n),ee=A&&of(t,n),j=ee||A&&C&&jc(t,n)>=kc(t,n)?Tc(t,n)*(ee?Ic(t,n):1)*bd(t,n):0,te=O||b&&!D&&!E&&!T,M=i*l,N=!te&&S&&!E&&j>0&&i<=u&&k<M?Bb((M-k)/j):null,ne=S?v/100:0,re=(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(Ob,{children:db}),p]}),ie=`${S?v:0}%`;return(0,B.jsxs)(Ab,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,B.jsxs)(Pb,{$flush:s,children:[(0,B.jsxs)(jb,{children:[(0,B.jsxs)(Mb,{title:`${r} Data Lake — funds ${c}`,children:[(0,B.jsxs)(Nb,{"aria-hidden":`true`,children:[(0,B.jsx)(Ob,{children:`🏞️`}),r]}),(0,B.jsx)(`span`,{children:`Lake`})]}),(0,B.jsxs)(Rb,{title:`Current fill speed`,children:[`⚡ `,ql(j),`/s`]})]}),(0,B.jsxs)(Fb,{children:[D?(0,B.jsx)(Vb,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:re}):E?(0,B.jsx)(Vb,{title:`${c} is already at the max — spend or charge it up first`,children:re}):w?(0,B.jsx)(Vb,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:re}):T?(0,B.jsx)(Jb,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,B.jsx)($,{children:re})}):S?(0,B.jsx)(Jb,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,B.jsx)($,{children:re})}):(0,B.jsx)(Vb,{title:`Build a ${ql(l)} disk in Storage to unlock ${c} here`,children:re}),O?(0,B.jsx)(Jb,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,B.jsx)($,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,B.jsx)(Jb,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${ql(x)} banked) to grow its capacity from ${f} to ${Yl(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,B.jsx)($,{children:`⚡ Scale Out`})}):N?(0,B.jsxs)(zb,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,N]}):null]}),s?(0,B.jsx)(Ib,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:ie}):(0,B.jsx)(Ib,{$withBar:!0,title:`Currently filled`,children:Dl(Zl(k,n))}),(0,B.jsx)(Lb,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:ne})]}),o&&(()=>{let e=S?od(t,n):0,i=ql(l);return(0,B.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,B.jsxs)(Gb,{children:[(0,B.jsx)(`span`,{children:`buffer`}),(0,B.jsx)(`span`,{children:S?`${ql(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,B.jsx)(Lb,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=cd(t,n),i=Yl(l*_.target,n);return(0,B.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,B.jsxs)(Gb,{children:[(0,B.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,B.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,B.jsx)(Lb,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&Ne.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?cd(t,n):0,u=Yl(s,n);return(0,B.jsxs)(Ub,{children:[(0,B.jsx)(Wb,{"aria-hidden":`true`,children:u}),(0,B.jsx)(Hb,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,B.jsx)(Kb,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,B.jsx)(qb,{$fill:c})},t)})})]},e)}),o&&(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,ud(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,B.jsxs)(B.Fragment,{children:[a&&!s&&(0,B.jsx)(Yb,{}),l]}):(0,B.jsx)(Li,{"aria-label":`Data Lakes`,children:l})},Qb=h(),$b=z.div`
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
`,ex=z.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,tx=z.dl`
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
`,nx=z.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,rx=8,ix=6,ax=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-rx-n,i=t.bottom+ix,a=t.top-ix-n,s=i<=r||a<rx?Math.max(rx,Math.min(i,r)):a,l=Math.max(rx,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,Qb.createPortal)((0,B.jsxs)($b,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:rx,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,B.jsx)(ex,{children:r}),(0,B.jsx)(tx,{children:i.map(({label:e,value:t})=>(0,B.jsxs)(`div`,{style:{display:`contents`},children:[(0,B.jsx)(`dt`,{children:e}),(0,B.jsx)(`dd`,{children:t})]},e))}),a&&(0,B.jsx)(nx,{children:a})]}),document.body)},ox=z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,sx=z.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,cx=z.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,lx=z.p`
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
`,ux=z.button`
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
`,dx=({theme:e})=>mi`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,fx=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,px=z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>mi`
  button {
    background-color: ${fx(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,mx=z(Li)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${dx}

  button {
    background-color: ${fx};
    border: 0;
    border-radius: 0;
  }
`,hx=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:ks(t)},gx=(e,t,n)=>Qs(e,t,t,n),_x=(e,t,n)=>{let r=gx(e,t,n);return r===null?null:hx(r)},vx=z.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,yx=z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,bx=xi`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,xx=z.span`
  display: inline-block;
  animation: ${bx} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Sx=z.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,Cx=z.span`
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
`,wx=z.span`
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
`,Tx=z.span`
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
`,Ex=z.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Dx=z.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Ox=z(Lb)`
  margin-top: 0;
`,kx=z.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ax=z(Li)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${dx}
  ${e=>e.$boosted&&D_}
`,jx=z.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,Mx=z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,Nx=z(Li)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${dx}
  ${e=>e.$boosted&&D_}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`,Px=z.button`
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
`,Fx=z.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,Ix=z.button`
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
`,Lx=z.div`
  position: relative;
  width: 100%;
`,Rx=z.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,zx=z.h3`
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
`,Bx=z.span`
  flex-shrink: 0;
`,Vx=z(z.span`
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
`,Hx=z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${Zh}
  background-color: ${fx};
`,Ux=z(Hx)`
  position: relative;
`,Wx=z(Hx)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,Gx=z(Hx)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,Kx=(e,t,n,r=!0)=>{let i=gl(t,n),a=i&&e>0&&e<i.divisor?gl(e,n):i;return r?Tl(e,a):Cl(e,a)},qx=(e,t,n=``)=>{let r=gl(e,!0);return`${El(e/r.divisor)} → ${El(t/r.divisor)} ${r.symbol}${n}`},Jx=(e,t)=>Cl(e,gl(e,t)),Yx=5e3,Xx=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),Zx=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!Xx(e))return;let t=setTimeout(()=>n(e),Yx);return()=>clearTimeout(t)},[e,r]),t===e},Qx=({bits:e,poolIndex:t,large:n})=>{let r=Zx(Ql(e,t))?Zl(e,t):Ql(e,t);return(0,B.jsx)(lx,{$large:n,children:r})},$x=e=>Math.min(100,Math.max(0,e)),eS=8,tS=z.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,nS=z.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,rS=z.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,iS=z.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,aS=z.div`
  position: relative;
  min-width: 0;
  height: ${eS}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,oS=z(z.div`
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
`,sS=z.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,cS=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,B.jsxs)(tS,{children:[(0,B.jsxs)(nS,{children:[(0,B.jsx)(Ob,{children:`📦`}),e]}),o&&(0,B.jsx)(aS,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,B.jsx)(oS,{$widthPercent:a/100*100})}),o&&(0,B.jsxs)(rS,{children:[`+`,Math.round(a),`% `,(0,B.jsx)(sS,{children:`👆`})]}),!o&&r&&(0,B.jsxs)(iS,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},lS=[[10,[229,72,77]],[100,[59,130,246]],[Ce,[48,164,108]]],uS=e=>{let t=lS.length-1;if(e<=lS[0][0])return`rgb(${lS[0][1].join(`,`)})`;if(e>=lS[t][0])return`rgb(${lS[t][1].join(`,`)})`;let n=lS.findIndex(([t])=>e<=t),[r,i]=lS[n-1],[a,o]=lS[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},dS=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=Zx(Kx(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=ll(o),f=bc(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${Dl(Ol(e))}/s`,w=Js(s),T=Cp(s),E=s.byteCreated?C(ac(s)):null,D=nc(s),O=_x(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=zl(o),ee=Ul(o),j=Rl(o),te=Gl(o,j),M=Wl(o,j),N=fc(j),ne=Math.max(0,jc(o,N)-Wc(o,N)),re=Hl(o),ie=Bl(o),P=Ks(s).toFixed(2),ae=Ks({...s,unlockedDiskSteps:Gs(s)+1}).toFixed(2),oe=ql(Fl(Gs(s)+1)),se=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${oe} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${P} → ${ae}.`))&&n.unlockNextDiskSize()},ce=d?eu(o):[],le=!A&&tu(o),ue=s.diskBuild,de=!A&&!re&&Gc(o)&&!le&&!ue,fe=Math.min(M,Kl(o,j)),pe=Math.floor(fe+1e-9),me=fe>0||s.diskBuildQueued,he=ue?$x(100-ue.remainingSeconds/ue.totalSeconds*100):re?100:me?$x(fe/M*100):0,F=Hu(o,j),I=Zc(o),ge=$c(o),_e=!!s.capacityUpgradeQueued,ve=!!s.speedUpgradeQueued,ye=_e||ve,be=s.capacity,xe=Qc(s),Se=s.capacity*2,Ce=Jx(Se,!0),we=Js({...s,speedCapacity:xe*2}),Te=`${Ol(we)}/s`,Ee=w>0?`×${Number((we/w).toFixed(2))}`:``,De=$x(s.bits/8*100),Oe=$x((s.capacityUpgradeProgress??0)/be*100),ke=$x((s.speedUpgradeProgress??0)/xe*100),Ae=ve?ke:Oe,L=sc(s),je=L?.cost??0,Me=L?.progress??0,Ne=L?.multiplierPercent??100,Pe=C(L?.rate??0),Fe=L?.rate??0,Ie=hx(Fe>0&&je>0?Math.max(0,je-Me)/Fe:1/0),Le=$x(s.bits/s.capacity*100),Re=()=>{le?n.provisionDisk():n.queueDiskBuild()},ze=s.diskBuildQueued,Be=`${pe}/${M}`,Ve=M>1||pe>0?` · ${Be}`:``,He=`Provision ${ql(j)} Disk`,Ue=!!ze&&!ue&&!re&&!A,We=fc(ee),Ge=A?s.diskBuild?`waiting for build`:hc(o,We)?`waiting for earlier pool`:Tc(o,We)<=0?`waiting for pool`:jc(o,We)<=Wc(o,We)?`waiting for staging`:null:null,Ke=ue?{icon:`🏗`,label:`Provisioning ${ql(ue.size)} Disk`,status:`${Math.ceil(ue.remainingSeconds)}s left`}:re?{icon:`✅`,label:`All Pools Complete (${ql(j)})`,status:null}:A?{icon:`🔁`,label:He,status:`Rebuilding ${ql(ee)} first · ${Ge??`automatic`}`}:ze?{icon:`⏳`,label:`Provisioning ${ql(j)} Disk`,status:`${pe>0?Be:`Queued`} · ${le?ne>0?`building`:`waiting for staging`:de?`after disk fill`:`waiting for pool`}`}:le?{icon:`🏦`,label:He,status:`Ready · ${db} ${ql(te)}${Ve}`}:{icon:`🏦`,label:He,status:`${db} ${ql(te)}${Ve} · tap to queue`,reason:de?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},qe=Ic(o,A?We:N),Je=100*qe,Ye=(A?Ec(o,We):Tc(o,N))*qe,Xe=`${Dl(ql(Ye))}/s`,Ze=A&&Tc(o,We)<=0,Qe=lu(o),$e=Qe.disksTotal>0?$x(Qe.disksDone/Qe.disksTotal*100):0,et=Qe.seconds,tt=A?$e:he,nt=Math.max(0,(M-fe)*j),rt=Lc(o,N)*Fc(o,N)/100*Ep(s,N),it=Math.min(nt,ne),at=Ye>0?it/Ye+(nt-it)/Math.max(Math.min(Ye,rt),Number.MIN_VALUE):1/0,ot=A?hx(et):de?`—`:hx(at),st=d&&!re&&!ue&&Ye>0&&(A||ze),ct=(0,B.jsx)(Q,{"aria-label":`reformat to unlock disk size`,onClick:se,title:`Reformat the Byte Foundry to unlock ${oe} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${P} → ${ae}.`,type:`button`,variant:`prestige`,children:(0,B.jsxs)(yx,{children:[(0,B.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,oe,` Disks`]}),(0,B.jsx)(kx,{children:`Bitrate exponent ${P} → ${ae} · auto-rebuilds to your highs`})]})}),lt=ie?ct:(0,B.jsxs)(Q,{"aria-label":ue?`disk array rebuilding`:re?`disk ladder complete`:`provision disk`,"aria-description":Ke.reason?`${Ke.status} (${Ke.reason})`:Ke.status??void 0,disabled:!!ue||re||A,onClick:Re,title:ue?`Provisioning ${ql(ue.size)} — ${Math.ceil(ue.remainingSeconds)}s (array offline)`:re?`All ${dc()} storage pools are complete through ${ql(j)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${ql(ee)} now); ${ql(j)} unlocks for provisioning once they are done`:ze?`Armed — draws from the pool staging at the pool's fixed bandwidth${de?` once Disk Fill is done`:``} (${pe}/${M} passes so far)`:le?F?`Costs ${ql(te)}, paid in ${M} pass${M===1?``:`es`} of ${ql(j)} each (${pe}/${M} collected) — creates an empty ${ql(j)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${F} level`:`Costs ${ql(te)}, paid in ${M} pass${M===1?``:`es`} of ${ql(j)} each (${pe}/${M} collected) — creates an empty ${ql(j)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:de?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${pe}/${M} passes so far)`,type:`button`,variant:re||A?`neutral`:ze?`smart`:le?`info`:`neutral`,$progress:tt,$pulse:Ue,children:[st?(0,B.jsxs)(Sx,{children:[(0,B.jsxs)(Cx,{children:[Ke.icon,` `,A?`Rebuilding`:`${ql(j)} Disk…`]}),(0,B.jsx)(wx,{children:A?(()=>{let e=Fl(Gs(s)-1);return e>ee?`${ql(ee)} → ${ql(e)}`:`${ql(ee)} disks`})():pe>0?Be:`Queued`}),(0,B.jsxs)(Tx,{children:[Math.floor(tt),`%`]}),(0,B.jsxs)(Dx,{style:{color:uS(Je),...A&&Qe.projected?{opacity:.55}:null},title:Ze?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&Qe.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&Qe.projected?`~`:``,Xe]}),ot!==`—`&&(0,B.jsxs)(Ex,{style:Qe.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:Qe.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,Qe.projected?`~`:``,ot]})]}):(0,B.jsxs)(yx,{children:[(0,B.jsxs)(`span`,{children:[Ke.icon,` `,Ke.label,Ue?`…`:``]}),Ke.status&&(0,B.jsx)(kx,{children:Ke.status})]}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(tt),"aria-valuemin":0,"aria-valuemax":100})]}),ut=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&ye&&!!L||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{ut||_(null)},[ut]);let dt=g===`stream`,ft=null;if(dt){let e=tc(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=Tc(o,e);ft=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:P},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...L?[{label:`Upgrade bar drawing`,value:Pe}]:[],{label:`Buffer`,value:`${Math.floor(Le*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...ge&&!ye?[{label:`After Upgrade Bitrate`,value:`${Te} (${Ee})`}]:[]]}let pt=g===`upgrade`&&!!L,mt=pt?[{label:`Draw now`,value:Pe},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${Ol(Me)} / ${Ol(je)}`},{label:`Time left`,value:Ie},L.kind===`speed`?{label:`Bitrate after`,value:qx(w,we,`/s`)}:{label:`Capacity after`,value:qx(s.capacity,Se)}]:null;return(0,B.jsxs)(ox,{children:[(0,B.jsx)(gv,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,B.jsx)(cx,{children:(0,B.jsx)(sx,{children:`🔥 Byte Foundry`})}),(0,B.jsxs)(Nx,{"aria-label":`Data Stream`,$boosted:C_(s),children:[(0,B.jsxs)(Ux,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:Le,children:[s.mainGameUnlocked&&(0,B.jsx)(Px,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,B.jsxs)(Fx,{children:[(0,B.jsxs)(Lx,{children:[(0,B.jsxs)(Rx,{children:[(0,B.jsx)(zx,{children:(0,B.jsxs)(`span`,{children:[(0,B.jsx)(Ob,{children:`🌊`}),`Data Stream`]})}),(0,B.jsx)(lx,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:Kx(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,B.jsxs)(Vx,{ref:dt?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:uS(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":dt,"aria-controls":dt?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),dt&&(0,B.jsx)(ax,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:ft})]}),(0,B.jsx)(cS,{capacityText:Jx(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&ye&&(0,B.jsxs)(Wx,{"aria-label":ve?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:ve?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${Ce} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,B.jsxs)(Sx,{children:[(0,B.jsxs)(Cx,{children:[(0,B.jsx)(Ob,{children:`⏫`}),`Upgrading`,(0,B.jsx)(xx,{children:`…`})]}),(0,B.jsxs)(wx,{children:[(0,B.jsx)(Ob,{children:ve?`⚡`:`📦`}),ve?qx(w,we,`/s`):qx(s.capacity,Se)]}),(0,B.jsxs)(Tx,{children:[Math.floor(Ae),`%`]}),(0,B.jsxs)(Vx,{ref:pt?y:void 0,$color:uS(Ne),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Pe}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":pt,"aria-controls":pt?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Pe]}),pt&&(0,B.jsx)(ax,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:L.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:mt}),(0,B.jsxs)(Ex,{children:[`⏳ `,Ie]})]}),(0,B.jsx)(Ox,{$fill:Math.min(1,Math.max(0,Ae/100)),"aria-hidden":`true`}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(Ae),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!ye)&&(0,B.jsxs)(px,{children:[u&&(0,B.jsxs)(Q,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:De,children:[(0,B.jsx)($,{children:`🔗 Compile into a Byte`}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!ye&&(0,B.jsx)(vx,{children:!ye&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(Q,{"aria-label":`upgrade data stream capacity`,disabled:!I,onClick:n.pickIntroCapacityMilestone,title:I?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity`:`Capacity is already at its maximum`,"aria-description":I?`Costs ${Ol(be)}; capacity ${Ce} after upgrading`:void 0,type:`button`,variant:I?`prestige`:`neutral`,children:(0,B.jsxs)(yx,{children:[(0,B.jsx)(`span`,{children:`Upgrade Capacity`}),(0,B.jsx)(kx,{children:I?`🏷️ ${Ol(be)} · 📦 ×2`:`📦 Max capacity`})]})}),(0,B.jsx)(Q,{"aria-label":`upgrade data stream bitrate`,disabled:!ge,onClick:n.queueIntroSpeedUpgrade,title:ge?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${P} — upgrade Capacity first`,"aria-description":ge?`Costs ${Ol(xe)}; bitrate ${Te} after upgrading`:void 0,type:`button`,variant:ge?`prestige`:`neutral`,children:(0,B.jsxs)(yx,{children:[(0,B.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,B.jsx)(kx,{children:ge?`🏷️ ${Ol(xe)} · ⚡ ${Ee}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,B.jsx)(mx,{"aria-label":`Provision Disk`,children:lt}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=Lc(o,r),a=jc(o,r),c=kc(o,r),l=c>0?$x(a/c*100):0,u=a>=c,d=Fc(o,r),f=Pc(o,r),p=_x(a,c,i),_=of(o,r),v=ce.filter(e=>fc(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${Dl(ql(e))}/s`,D=E(i*d/100*Ep(s,r)),O=g===`pool-${r}`,k=null,A=Tc(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=Tc(o,t);let t=Nc(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*Ic(o,r))}]:[]]}return(0,B.jsxs)(Ax,{"aria-label":`pool ${r}`,$boosted:T_(s,r),children:[(0,B.jsxs)(Gx,{$progress:l,children:[(0,B.jsx)(Px,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,B.jsxs)(Fx,{children:[(0,B.jsxs)(Lx,{children:[(0,B.jsxs)(Rx,{children:[(0,B.jsx)(zx,{children:(0,B.jsxs)(Ix,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,B.jsxs)(Bx,{"aria-hidden":`true`,children:[(0,B.jsx)(Ob,{children:`💧`}),T]}),(0,B.jsx)(`span`,{children:`Pool`})]})}),(0,B.jsx)(Qx,{bits:a,poolIndex:r,large:f<=0}),(0,B.jsxs)(Vx,{ref:O?y:void 0,$centered:f<=0&&!p,$color:uS(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,B.jsx)(ax,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,B.jsx)(cS,{capacityText:Yl(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,B.jsx)(jx,{children:(0,B.jsx)(Zb,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,B.jsxs)(Mx,{children:[v.map(e=>(0,B.jsx)(Db,{actions:n,size:e,state:o},e)),(0,B.jsx)(Zb,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,B.jsx)(ux,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},fS=z.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,pS=z.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,mS=z.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,hS=z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,gS=z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,_S=z(Li)`
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
`,vS=mi`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,yS=z.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,bS=z.span`
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
`,xS=z.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${vS}
`,SS=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${vS}
`,CS=z(Q)`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${vS}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,wS=z.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,TS=Object.fromEntries(b.map(e=>[e.id,e])),ES=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=Ya(n),a=Ba(n),o=oi(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});return(0,B.jsxs)(fS,{"aria-label":`compute flops screen`,children:[(0,B.jsxs)(pS,{children:[(0,B.jsx)(`h1`,{children:`🖥 Compute`}),(0,B.jsx)(mS,{"aria-label":`cumulative flops boost`,children:Qa(i)})]}),!a&&(0,B.jsxs)(hS,{children:[`Unlocks at `,100,` PP — you have `,H(r),` PP.`]}),(0,B.jsx)(gS,{"aria-label":`compute flops tiers`,children:st.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=Za(n,e.boostsTierId),d=Wa(e,c),f=Ga(n,e.id),p=TS[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(ot*100).toFixed(2);return(0,B.jsxs)(_S,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,B.jsxs)(yS,{children:[(0,B.jsx)(bS,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,B.jsxs)(xS,{title:`Owned`,children:[(0,B.jsx)(tg,{children:`Owned: `}),H(c)]})]}),(0,B.jsxs)(SS,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,B.jsx)(CS,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${H(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${H(d)} PP for +${g}%/s on ${m}`:`Costs ${H(d)} PP — you have ${H(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,B.jsxs)($,{children:[H(d),` PP`]})}),h&&(0,B.jsxs)(wS,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},DS=z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,OS=z.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,kS=z.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,AS=z.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,jS=z.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,MS=z.div`
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
`,NS=z.div`
  height: 0.6rem;
`,PS=z.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,FS=z.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,IS=z.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,LS=z.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,RS=z.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,zS=z.button`
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
`,BS=z.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,VS=z.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,HS=z.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,US=z.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,WS=z.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,GS=z.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,KS=z(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,qS=z(KS)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,JS=z(KS)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,YS=z.span`
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
`,XS=z.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,ZS=z.div`
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
`,QS=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],$S=(e,t,n)=>e>=8&&t<n,eC=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=QS.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:bp(r)[0]?.queue[0]??1}),o=bp(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=r.computeMergePageUnlocked?i:1,u=(l?QS[l-1]:null)&&(0,B.jsxs)(B.Fragment,{children:[!r.computeMergePageUnlocked&&(0,B.jsx)(XS,{title:`Boosts ${A_(l,`name`)}`,children:`Boosts ${A_(l)}`}),(0,B.jsx)(ZS,{role:`group`,"aria-label":`compute boost`,children:Object.keys(Oe).map(e=>{let i=_p(e,l),a=vp(e,l),o=O_[e].label,s=!!xp(r,e),c=`×${i} production, ${k_(a)}`;return(0,B.jsx)(KS,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!Op(n,e,l),onClick:()=>t.activateComputeBoost(e,l),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,B.jsx)($,{children:`${O_[e].icon} ×${i} · ${k_(a)}`})},e)})})]});return(0,B.jsxs)(DS,{children:[s?(0,B.jsx)(tg,{as:`h1`,children:`⚡ Power`}):(0,B.jsx)(OS,{children:(0,B.jsx)(kS,{children:`⚡ Power`})}),s&&(0,B.jsx)(W_,{actions:t,state:n}),!s&&(0,B.jsx)(XS,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,B.jsx)(LS,{"aria-label":`boost`,children:u}),r.computeMergePageUnlocked?(0,B.jsx)(jS,{"aria-label":`compute entities`,children:QS.map((e,i)=>{let o=i+1,s=r[e.countField]??0,d=!!e.autoFlagField,f=d?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=d&&!f&&p>=10,h=d?mf(n,e.autoFlagField):0,g=d&&!f&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=d?Ed(n,e.mergeOutputField):10,S=d&&jf(n,i),C=d?Od(n,o):0,w=d&&Ad(n,i),T=d&&Md(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=f?S:$S(s,r[e.mergeOutputField]??0,x),O=d&&(!f||l===o||b||w||D||C>0),k=i>0?QS[i-1]:null,A=QS.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||f||b||l===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let ee=QS[i+1]?.symbol??`⬆`,j=d&&(f?(0,B.jsx)(qS,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,B.jsx)($,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,B.jsx)(qS,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!$S(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,B.jsx)($,{children:`${e.symbol} 8→1 ${g?`🔌`:ee}`})})),te=d&&(f?(0,B.jsx)(YS,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${ks(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${ks(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${ks(y)}`:`🔌 ${C}/8`}):m?(0,B.jsx)(JS,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${H(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,B.jsx)($,{children:`🔓 10/10`})}):(0,B.jsx)(YS,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),M=d&&O;return(0,B.jsxs)(v.Fragment,{children:[(0,B.jsxs)(IS,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:l===o,children:[(0,B.jsxs)(RS,{children:[(0,B.jsxs)(zS,{type:`button`,onClick:()=>a(o),"aria-pressed":l===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${A_(o,`name`)}`,$selected:l===o,children:[(0,B.jsx)(US,{"aria-hidden":`true`,children:e.symbol}),(0,B.jsxs)(VS,{children:[(0,B.jsxs)(HS,{children:[(0,B.jsxs)(BS,{children:[e.label,(0,B.jsx)(tg,{children:` ${H(E)}/10`})]}),(0,B.jsxs)(FS,{"aria-hidden":`true`,children:[`→ `,A_(o)]})]}),(0,B.jsx)(WS,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,B.jsx)(GS,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),te&&(0,B.jsx)(PS,{children:te})]}),l===o&&u]}),M?(0,B.jsx)(MS,{children:j}):(0,B.jsx)(NS,{})]},e.key)})}):(0,B.jsx)(AS,{children:`⬡ ${H(r.computeCores??0)}/10 · 🔗 ${H(r.computeNodes??0)}/10`})]})},tC=z.button.attrs({type:`button`})`
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
`,nC=b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),rC=st.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{}),iC=e=>nC[e]??rC[e]??e,aC=e=>typeof e==`number`||typeof e==`boolean`||typeof e==`string`,oC=(e,t,n)=>{let[r,...i]=t;return r===`__proto__`||r===`constructor`||r===`prototype`?e:i.length===0?{...e,[r]:n}:{...e,[r]:oC(e[r]??{},i,n)}},sC=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}],cC=e=>sC.find(t=>t.match(e)).id,lC=e=>{if(typeof e!=`string`)return null;let t=e.trim().replace(/[,_\s]/g,``);if(t===``)return null;let n=/^10\^(-?\d+(?:\.\d+)?)$/.exec(t);if(!n&&!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t))return null;let r=n?10**Number(n[1]):Number(t);return Number.isFinite(r)?r:null},uC=(e,t=[])=>e!==null&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype)?Object.entries(e).flatMap(([e,n])=>uC(n,[...t,e])):t.length===0?[]:[{path:t,value:e}],dC=e=>e.map(iC).join(` › `),fC=(e,t)=>{let n=t.trim().toLowerCase();return n===``||e.join(`.`).toLowerCase().includes(n)||dC(e).toLowerCase().includes(n)},pC=z.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,mC=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,hC=z(Li)`
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
`,gC=z.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`,_C=z.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,vC=z.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`,yC=z.div`
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
`,bC=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`,xC=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`,SC=z(Q)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`,CC=z.input`
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
`,wC=z.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`,TC=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`,EC=z.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`,DC=z.div`
  display: flex;
  gap: 0.3rem;
`,OC=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`,kC=z(Q)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`,AC=z.span`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
`,jC=z.details`
  border-left: 2px solid ${e=>e.theme.color.border};
  padding-left: 0.6rem;
`,MC=z.summary`
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
`,NC=z.textarea`
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
`,PC=z.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.good} !important;
  font-size: 0.8rem;
`,FC=e=>Number.isInteger(e)&&Math.abs(e)<1e4?null:H(e),IC=e=>{let t=Number.isInteger(e),n=[{id:`div10`,label:`÷10`,apply:e=>t?Math.floor(e/10):e/10},{id:`mul10`,label:`×10`,apply:e=>e===0?10:e*10}];return t&&Math.abs(e)<2**53-1&&(n.unshift({id:`minus1`,label:`−1`,apply:e=>Math.max(0,e-1)}),n.push({id:`plus1`,label:`+1`,apply:e=>e+1})),n},LC=({path:e,value:t,label:n,onCommit:r})=>{let[i,a]=(0,v.useState)(null),o=e.join(`.`),s=typeof t==`number`,c=s&&i!==null?lC(i):null,l=s&&i!==null&&c===null,u=i!==null&&!l,d=()=>{u&&(r(e,s?c:i),a(null))},f=s?l?`Not a number (try 1e100, 1,000 or 10^6)`:FC(c??t):null;return(0,B.jsxs)(wC,{children:[(0,B.jsx)(TC,{title:o,children:n}),(0,B.jsxs)(EC,{children:[(0,B.jsxs)(DC,{children:[(0,B.jsx)(CC,{"aria-invalid":l||void 0,"aria-label":o,autoComplete:`off`,enterKeyHint:`done`,inputMode:s?`decimal`:`text`,onBlur:()=>i!==null&&i===String(t)&&a(null),onChange:e=>a(e.target.value),onKeyDown:e=>{e.key===`Enter`&&d(),e.key===`Escape`&&a(null)},spellCheck:!1,type:`text`,value:i??String(t)}),(0,B.jsx)(kC,{"aria-label":`set ${o}`,disabled:!u,onClick:d,title:`Set (Enter) — Escape reverts`,type:`button`,variant:u?`primary`:`neutral`,children:(0,B.jsx)($,{children:`✓`})})]}),s&&(0,B.jsx)(OC,{children:IC(t).map(n=>{let i=n.apply(t);return(0,B.jsx)(kC,{"aria-label":`${o} ${n.label}`,disabled:!Number.isFinite(i),onClick:()=>{a(null),r(e,i)},type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:n.label})},n.id)})}),f&&(0,B.jsx)(AC,{$error:l,children:l?f:`= ${f}`})]})]})},RC=({path:e,value:t,label:n,onCommit:r})=>{let i=e.join(`.`);return typeof t==`boolean`?(0,B.jsxs)(wC,{children:[(0,B.jsx)(TC,{title:i,children:n}),(0,B.jsx)(EC,{children:(0,B.jsxs)(DC,{children:[(0,B.jsx)(tC,{$on:t,"aria-label":i,"aria-pressed":t,onClick:()=>r(e,!t)}),(0,B.jsx)(AC,{children:t?`On`:`Off`})]})})]}):aC(t)?(0,B.jsx)(LC,{label:n,onCommit:r,path:e,value:t}):(0,B.jsxs)(wC,{children:[(0,B.jsx)(TC,{title:i,children:n}),(0,B.jsxs)(AC,{children:[Array.isArray(t)?`[${t.length} item${t.length===1?``:`s`}]`:`not set`,` · edit in raw JSON`]})]})},zC=({path:e,value:t,onCommit:n})=>{let r=iC(e[e.length-1]);if(typeof t!=`object`||!t||Array.isArray(t))return(0,B.jsx)(RC,{label:r,onCommit:n,path:e,value:t});let i=Object.entries(t);return i.length===0?null:(0,B.jsxs)(jC,{children:[(0,B.jsxs)(MC,{children:[r,` (`,i.length,`)`]}),i.map(([t,r])=>(0,B.jsx)(zC,{onCommit:n,path:[...e,t],value:r},t))]})},BC=[{id:`foundry`,label:`🔥 Foundry`,presets:[{id:`unlock-factory`,label:`🏭 Unlock Byte Factory`,apply:e=>({...e,intro:{...e.intro,mainGameUnlocked:!0}})},{id:`unlock-boosters`,label:`🔧 Unlock Power (Cells)`,apply:e=>({...e,intro:{...e.intro,capacity:Math.max(e.intro?.capacity??0,Ee)}})}]},{id:`factory`,label:`📶 Factory`,presets:[{id:`near-prestige`,label:`💰 Bits → 99% to Purge`,apply:e=>({...e,resources:{...e.resources,base:A*.99}})},{id:`prestige-ready`,label:`💰 Bits → Purge threshold`,apply:e=>({...e,resources:{...e.resources,base:A}})}]},{id:`purge`,label:`🏆 Purge`,presets:[{id:`grant-1000-pp`,label:`🏆 +1,000 PP`,apply:e=>({...e,purge:{...e.purge,points:(e.purge?.points??0)+1e3}})},{id:`add-prestige`,label:`🏆 +1 Purge count`,apply:e=>ha({...e,purge:{...e.purge,count:(e.purge?.count??0)+1}})},{id:`unlock-flops`,label:`🖥️ Unlock Compute (Flops)`,apply:e=>({...e,purge:{...e.purge,points:Math.max(e.purge?.points??0,100)},computeFlops:{...e.computeFlops,pageUnlocked:!0}})}]},{id:`era`,label:`⏻ Reboot`,presets:[{id:`era-ready`,label:`🏆 PP → Reboot-ready (1 Googol)`,apply:e=>({...e,purge:{...e.purge,points:ut}})}]}],VC=[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>sC.find(t=>t.id===e)),HC=e=>JSON.stringify(e,null,2),UC=e=>{try{let t=JSON.parse(e);return t!==null&&Object.prototype.toString.call(t)===`[object Object]`&&(Object.getPrototypeOf(t)===null||Object.getPrototypeOf(t)===Object.prototype)?null:`Must be a JSON object`}catch(e){return e.message}},WC=({game:e})=>{let t=e.devModeActive,[n,r]=(0,v.useState)(VC[0].id),[i,a]=(0,v.useState)(``),[o,s]=(0,v.useState)(()=>HC(e.state)),[c,l]=(0,v.useState)(null),[u,d]=(0,v.useState)(0);(0,v.useEffect)(()=>{s(HC(e.state)),l(null)},[t]);let f=(0,v.useMemo)(()=>UC(o),[o]),p=(0,v.useMemo)(()=>Object.keys(e.state).filter(e=>cC(e)===n),[e.state,n]),m=(0,v.useMemo)(()=>i.trim()===``?null:uC(e.state).filter(e=>fC(e.path,i)),[e.state,i]),h=()=>{window.confirm(`Wipe the dev save back to a fresh state?`)&&(e.resetDevState(),l(null),d(e=>e+1))},g=(t,n)=>{e.setDevState(e=>oC(e,t,n))},_=()=>{let t=e.applyDevStateJson(o);t.ok?(l({error:!1,text:`Applied.`}),s(HC(t.state)),d(e=>e+1)):l({error:!0,text:`Could not apply (${t.reason}).`})},y=async()=>{try{await navigator.clipboard.writeText(HC(e.state)),l({error:!1,text:`Copied live state.`})}catch{l({error:!0,text:`Clipboard unavailable.`})}},{state:b}=e,x=[[`Bits`,ea(b.resources?.base??0)],[`Purge Points`,`✦ ${H(b.purge?.points??0)}`],[`Purges`,H(b.purge?.count??0)],[`Reboot · Kernels`,`${H(b.era?.count??0)} · ${H(b.eons?.balance??0)}`],[`Capacity`,Ol(b.intro?.capacity??0)]];return(0,B.jsxs)(pC,{children:[(0,B.jsx)(mC,{children:(0,B.jsx)(`h1`,{children:`Dev Mode`})}),(0,B.jsxs)(hC,{"aria-label":`dev save section`,children:[(0,B.jsxs)(gC,{children:[(0,B.jsxs)(_C,{children:[(0,B.jsx)(`strong`,{children:t?`Playing the dev save`:`Playing your real save`}),(0,B.jsx)(`p`,{children:`A separate sandbox save — enabling never touches real progress; disabling resumes it exactly where you left it.`})]}),(0,B.jsx)(tC,{$on:t,"aria-label":`dev mode`,"aria-pressed":t,onClick:e.toggleDevMode})]}),t&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(vC,{"aria-label":`dev save readouts`,role:`group`,children:x.map(([e,t])=>(0,B.jsxs)(yC,{children:[(0,B.jsx)(`dt`,{children:e}),(0,B.jsx)(`dd`,{children:t})]},e))}),(0,B.jsx)(bC,{children:(0,B.jsx)(Q,{"aria-label":`reset dev save`,onClick:h,type:`button`,variant:`danger`,children:(0,B.jsx)($,{children:`↺ Reset dev save`})})})]})]}),t&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(hC,{"aria-label":`quick seed section`,children:[(0,B.jsx)(`h2`,{children:`Quick seed`}),(0,B.jsx)(`p`,{children:`Jump straight to a milestone — applied on top of the current dev save.`}),BC.map(t=>(0,B.jsxs)(`div`,{children:[(0,B.jsx)(`h3`,{children:t.label}),(0,B.jsx)(bC,{children:t.presets.map(t=>(0,B.jsx)(Q,{"aria-label":t.label,onClick:()=>{e.setDevState(t.apply),d(e=>e+1)},type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:t.label})},t.id))})]},t.id))]}),(0,B.jsxs)(hC,{"aria-label":`variables section`,children:[(0,B.jsx)(`h2`,{children:`Variables`}),(0,B.jsxs)(`p`,{children:[`Every field of the live save, grouped like the game's own screens. Switches apply instantly; numbers take `,(0,B.jsx)(`code`,{children:`1e100`}),`, `,(0,B.jsx)(`code`,{children:`1,000`}),` or `,(0,B.jsx)(`code`,{children:`10^6`}),` — press Enter or ✓ to set, or step by powers of ten.`]}),(0,B.jsx)(CC,{"aria-label":`search variables`,autoComplete:`off`,onChange:e=>a(e.target.value),placeholder:`🔍 Search every field (e.g. Kilobytes, capacity)`,spellCheck:!1,type:`search`,value:i}),m?(0,B.jsxs)(`div`,{"aria-label":`variable search results`,role:`region`,children:[m.length===0&&(0,B.jsxs)(AC,{children:[`No field matches “`,i.trim(),`”.`]}),m.slice(0,60).map(e=>(0,B.jsx)(RC,{label:dC(e.path),onCommit:g,path:e.path,value:e.value},e.path.join(`.`))),m.length>60&&(0,B.jsxs)(AC,{children:[`+`,m.length-60,` more — refine the search.`]})]},u):(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(xC,{role:`tablist`,"aria-label":`variable areas`,children:VC.map(e=>(0,B.jsx)(SC,{"aria-controls":`dev-variables-panel`,"aria-label":`show ${e.label} variables`,"aria-selected":n===e.id,onClick:()=>r(e.id),role:`tab`,type:`button`,variant:n===e.id?`primary`:`neutral`,children:(0,B.jsxs)($,{children:[(0,B.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]})},e.id))}),(0,B.jsx)(`div`,{"aria-label":`${n} variables`,id:`dev-variables-panel`,role:`tabpanel`,children:p.map(e=>(0,B.jsx)(zC,{onCommit:g,path:[e],value:b[e]},e))},u)]})]}),(0,B.jsx)(hC,{"aria-label":`raw state json section`,children:(0,B.jsxs)(jC,{children:[(0,B.jsx)(MC,{children:`Advanced: raw state (JSON)`}),(0,B.jsxs)(`p`,{children:[`Paste a partial object (e.g. `,(0,B.jsx)(`code`,{children:`{ "resources": { "base": 1e50 } }`}),`) — missing fields keep their current values. The only way to edit null fields and arrays.`]}),(0,B.jsx)(NC,{"aria-invalid":!!f||void 0,"aria-label":`dev save state json`,onChange:e=>{s(e.target.value),l(null)},spellCheck:!1,value:o}),f&&(0,B.jsxs)(PC,{$error:!0,children:[`✕ `,f]}),(0,B.jsxs)(bC,{children:[(0,B.jsx)(Q,{"aria-label":`apply json to dev save`,disabled:!!f,onClick:_,type:`button`,variant:`primary`,children:(0,B.jsx)($,{children:`Apply`})}),(0,B.jsx)(Q,{"aria-label":`refresh json from live state`,onClick:()=>{s(HC(e.state)),l(null)},type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`↻ Load live state`})}),(0,B.jsx)(Q,{"aria-label":`copy live state json`,onClick:y,type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`⧉ Copy`})})]}),c&&(0,B.jsx)(PC,{$error:c.error,children:c.text})]})})]})]})},GC=`0.5.0`,KC=z.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,qC=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,JC=z.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,YC=z(Li)`
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
`,XC=()=>{let e=pa(b[0].id),t=pa(b[b.length-1].id),n=ma(b[0].id),r=To({}),i=b[b.length-1].name,a=b[0].name;return(0,B.jsxs)(KC,{children:[(0,B.jsxs)(qC,{children:[(0,B.jsx)(`h1`,{children:`Tens — Manual`}),(0,B.jsxs)(JC,{children:[`v`,GC]})]}),(0,B.jsxs)(YC,{"aria-label":`overview section`,children:[(0,B.jsx)(`h2`,{children:`Overview`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,B.jsxs)(`li`,{children:[`Buy every tier with `,(0,B.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,B.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,a,` produce Bytes, which are added to your Bits.`]}),(0,B.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,B.jsxs)(`li`,{children:[`Reaching `,(0,B.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge — unless you have unlocked Overflow mode (see Purge).`]}),(0,B.jsxs)(`li`,{children:[`Once bought (`,2,` PP on Firmware → ✦ Prestige), the `,(0,B.jsx)(`strong`,{children:`Buy max`}),` toggle makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})]}),(0,B.jsxs)(YC,{"aria-label":`prestige ladder section`,children:[(0,B.jsx)(`h2`,{children:`Prestige ladder`}),(0,B.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,B.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP, the per-cycle Compute (Flops) boost.`,` `,(0,B.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, Overflow mode, the Byte generator, Capacity, Disks, Data Lakes, Compute entities, owned Compute (Flops) units and the System log.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,B.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,B.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Reinstall`}),` — a future layer above Reboot, not yet in the game.`]})]})]}),(0,B.jsxs)(YC,{"aria-label":`byte foundry section`,children:[(0,B.jsx)(`h2`,{children:`Byte Foundry`}),(0,B.jsxs)(`p`,{children:[`Every new save starts here, before any `,a,` exist. Unlocking the main game is permanent — no Purge or Reboot sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,B.jsx)(`h3`,{children:`The loop`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,Ol(we),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,Ol(ye(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,Ce/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,Ce/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,B.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,B.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,B.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,be,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-xe)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,a,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,Ol(we),` threshold.`]})]}),(0,B.jsx)(`h3`,{children:`What resets vs. what stays`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,a,` level.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, every Compute entity, and the main-game unlock. Reboot resets most of this (see Reboot).`]}),(0,B.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]}),(0,B.jsx)(`h3`,{children:`Forced priority`}),(0,B.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Disk Fill → Provision Disk → Compute Boost`}),(0,B.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]}),(0,B.jsxs)(YC,{"aria-label":`storage section`,children:[(0,B.jsx)(`h2`,{children:`Storage`}),(0,B.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,Ol(we),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,B.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,B.jsx)(`h3`,{children:`Provisioning Disks`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,B.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]}),(0,B.jsx)(`h3`,{children:`Cache and automatic pulling`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,B.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,B.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,B.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,B.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,B.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]}),(0,B.jsx)(`h3`,{children:`Data Lakes`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,B.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,B.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,B.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,je.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,B.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,Ie.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,B.jsx)(`li`,{children:`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the Reboot cycle — through pool flushes, Reformats and Purges.`})]}),(0,B.jsx)(`h3`,{children:`Flushing`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,B.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,B.jsx)(`li`,{children:`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. The first two flushes also earn Reclamation I and II achievements: each upgrades one of that pool’s two disk-size exponent steps to close 10% of the gap to 1.0. These rewards survive Reformat, Purge, and Reboot. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`}),(0,B.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})]}),(0,B.jsxs)(YC,{"aria-label":`power section`,children:[(0,B.jsx)(`h2`,{children:`Power`}),(0,B.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,Ol(Ee),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,B.jsx)(`h3`,{children:`Cells and the charge chain`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,B.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,B.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,B.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,B.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]}),(0,B.jsx)(`h3`,{children:`Compute Boost`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,B.jsxs)(`li`,{children:[`Turbo ×`,Oe.burst.multiplier,` for`,` `,ks(Oe.burst.durationSeconds),`; Balanced ×`,Oe.standard.multiplier,` for`,` `,ks(Oe.standard.durationSeconds),`; Eco ×`,Oe.sustain.multiplier,` for`,` `,ks(Oe.sustain.durationSeconds),`.`]}),(0,B.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,Oe.burst.poolBonusPercent,`% / +`,Oe.standard.poolBonusPercent,`% / +`,Oe.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,B.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,B.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,B.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,B.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,B.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,B.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,B.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,B.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})]}),(0,B.jsxs)(YC,{"aria-label":`compute flops section`,children:[(0,B.jsx)(`h2`,{children:`Compute`}),(0,B.jsxs)(`p`,{children:[`A separate screen (nav `,(0,B.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,B.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,it.toLocaleString(),` PP.`]}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,it.toLocaleString(),` –`,` `,at.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,B.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,B.jsxs)(`li`,{children:[`Each owned unit adds `,(ot*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,B.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,B.jsxs)(`li`,{children:[`The header’s `,(0,B.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,B.jsx)(`sup`,{children:`n`}),` `,`(`,(0,B.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,B.jsxs)(YC,{"aria-label":`accelerate section`,children:[(0,B.jsx)(`h2`,{children:`Accelerate`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,B.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,B.jsxs)(`li`,{children:[`Unlocks once `,a,` complete their first level.`]}),(0,B.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,B.jsxs)(`li`,{children:[i,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Spend all `,i,` after holding some in the same run to earn Spent QB — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,B.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,i,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,i,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,Xe.restage,`) spends it for you, every `,Ze.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})]}),(0,B.jsxs)(YC,{"aria-label":`scale up section`,children:[(0,B.jsx)(`h2`,{children:`Scale Up`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,a,` — to claim a Scale Up.`]}),(0,B.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,B.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,B.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,B.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})]}),(0,B.jsxs)(YC,{"aria-label":`overclock section`,children:[(0,B.jsx)(`h2`,{children:`Overclock`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[`Reach the required number of completed `,i,` levels to claim an Overclock.`]}),(0,B.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,B.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,B.jsxs)(`li`,{children:[`The first claim needs `,r,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,B.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})]}),(0,B.jsxs)(YC,{"aria-label":`tier autobuyers section`,children:[(0,B.jsx)(`h2`,{children:`Tier Autobuyers`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,B.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,B.jsxs)(`li`,{children:[`An autobuyer buys `,(0,B.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,B.jsx)(`strong`,{children:`Single`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,Qe.baseCost,` PP × the same.`]})]})]}),(0,B.jsxs)(YC,{"aria-label":`milestones section`,children:[(0,B.jsx)(`h2`,{children:`Milestones`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,e,` (`,a,`) through Purge`,` `,t,` (`,i,`).`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,n,`, then every`,` `,`Purge`,` after that.`]}),(0,B.jsx)(`li`,{children:`More → Milestones tracks your story milestones and Reboot progress.`})]})]}),(0,B.jsxs)(YC,{"aria-label":`prestige section`,children:[(0,B.jsx)(`h2`,{children:`Purge`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge, Reboot, Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,B.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge. Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,B.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]}),(0,B.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) at 1 Googol Bytes, plus 1 PP for every`,` `,64,` further powers of ten in your balance. Each Compression upgrade halves the powers needed per PP, and once that reaches 1, doubles the PP per power.`]}),(0,B.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,B.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,B.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,B.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,B.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,Ge*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,B.jsx)(`li`,{children:`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage and Power progress carries over.`}),(0,B.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})]}),(0,B.jsxs)(YC,{"aria-label":`sleep mode section`,children:[(0,B.jsx)(`h2`,{children:`Sleep mode`}),(0,B.jsx)(`ul`,{children:(0,B.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,ks(ze),` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,Ve.map(e=>H(e)).join(` / `),` PP) adds`,` `,ks(Be),`, up to `,ks(Re),`. Absences of `,ks(600),` `,`or less run at full speed; longer ones run at`,` `,Le*100,`% speed and show a “Resumed from sleep” summary.`]})})]}),(0,B.jsxs)(YC,{"aria-label":`reboot section`,children:[(0,B.jsx)(`h2`,{children:`Reboot`}),(0,B.jsxs)(`ul`,{children:[(0,B.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,ut.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,B.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel plus `,1,` per Kernel Amplifier level. Ways to spend Kernels are coming in a later update.`]}),(0,B.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,B.jsxs)(`li`,{children:[(0,B.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,B.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,B.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})]})]})},ZC=z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,QC=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,$C=z(Li)`
  gap: 0.4rem;
`,ew=z.ol`
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
`,tw=z.li`
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
`,nw=z.p`
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
`,rw=z.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,iw=({game:e})=>{let{state:t}=e,n=oi(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=eo(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:jo(t)},{label:`First Reboot`,reached:i>0}];return(0,B.jsxs)(ZC,{children:[(0,B.jsx)(QC,{children:(0,B.jsx)(`h1`,{children:`Milestones`})}),(0,B.jsxs)($C,{"aria-label":`milestones page`,children:[(0,B.jsx)(ew,{"aria-label":`milestones category`,children:s.map(e=>(0,B.jsx)(tw,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),(0,B.jsxs)(nw,{"aria-label":`reboot status`,children:[(0,B.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,B.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,B.jsx)(`strong`,{children:i}),` Reboots`]}),(0,B.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,B.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,B.jsx)(`strong`,{children:a}),` Kernels`]}),(0,B.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,B.jsx)(rw,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,B.jsx)(rw,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${ut.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},aw=({game:e})=>{if(!Ps(e.state))return null;let t=!!e.buyMaxMode;return(0,B.jsx)(tC,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},ow=z.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,sw=z(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&mi`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,cw=[{id:`level`,unit:!1,icon:`📶`,label:`Level`,title:`Buy level: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Single`,title:`Buy single: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],lw=({game:e})=>(0,B.jsx)(ow,{role:`group`,"aria-label":`buy mode`,children:cw.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,B.jsx)(sw,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),uw=z.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,dw=z(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&mi`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,fw=({value:e,onChange:t})=>(0,B.jsx)(uw,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(Oe).map(n=>{let r=O_[n],i=e===n;return(0,B.jsx)(dw,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),pw=z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,mw=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,hw=z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,gw=z.div`
  display: flex;
  gap: 0.5rem;
`,_w=z(Q)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,vw=z.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,yw=z.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,bw=z(Li)`
  gap: 0.4rem;
`,xw=z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Sw=z.div`
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
`,Cw=z.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,ww=({tier:e})=>(0,B.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,B.jsx)(tg,{children:e.name}),(0,B.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),Tw=z.div`
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
`,Ew=z.div`
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
`,Dw=z.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Ow=z.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,kw=z.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Aw=z.div`
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
`,jw=z.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,Mw=z.span`
  display: flex;
  gap: 4px;
`,Nw=z.button`
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
`,Pw=z.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,Fw=z.div`
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
`,Iw=z.span`
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
`,Lw=z.span`
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
`,Rw=z.div`
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
`,zw=z.span`
  font-weight: 600;
  min-width: 0;
`,Bw=z.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,Vw=z.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,Hw=z.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,Uw=z.button`
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
`,Ww=z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,Gw=z.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,Kw=z.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,qw=z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,Jw=z(Q)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,Yw=z.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,Xw=(e,t)=>Math.min(100,Math.round(e/t*100)),Zw=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=oi();return(0,B.jsxs)(Gw,{children:[(0,B.jsx)(Yw,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,B.jsxs)(B.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},Qw=({name:e,icon:t,title:n})=>{let r=oi();return(0,B.jsxs)(Yw,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},$w=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,B.jsxs)(Jw,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:Xw(r,n),$progressColor:t,children:[(0,B.jsx)(Qh,{children:s}),(0,B.jsx)($h,{children:c}),(0,B.jsx)(tg,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),eT=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,B.jsxs)(Tw,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,B.jsxs)(Fw,{$narrow:t,$wrap:r,children:[(0,B.jsxs)(zw,{children:[s&&l&&!i&&(0,B.jsx)(tg,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,B.jsx)(Vw,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,B.jsx)(Bw,{children:i})),o]}),s&&p&&(0,B.jsx)(Iw,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,B.jsx)(Lw,{$narrow:t,children:y}),s&&l&&(0,B.jsx)(tC,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,B.jsx)(Rw,{$narrow:t,children:y})]})},tT=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],nT=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,rT=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,iT=e=>String(Number(e.toFixed(2))),aT=e=>`${Number((e/3600).toFixed(1))}h`,oT=e=>{let t=hs(e+1);if(t>1)return`${H(hs(e))} → ${H(t)} PP per extra digit`;let[n,r]=[ms(e),ms(e+1)];return`1 PP per ${H(n)} → ${H(r)} extra digit${r===1?``:`s`}`},sT=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,B.jsxs)(Sw,{"aria-label":e,children:[(0,B.jsxs)(Hw,{children:[(0,B.jsx)(zw,{children:(0,B.jsxs)(Uw,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,B.jsx)(Bw,{children:t}),n]})}),r&&(0,B.jsx)(qw,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,B.jsx)(Ww,{"aria-label":`${n} description`,children:i})]})},cT=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],lT=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=oi(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=G(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=No(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=gs(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=Ta(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=!Ps(n)&&o>=2,T=Fa(n),E=La(T),D=aT(Ia(n)),O=aT(Ia({...n,sleepModeCapLevel:T+1})),k=aT(Be),A=!n.cacheWarmUnlocked&&o>=20,ee=Ma(n),j=Oa({...n,playtimeBonusUnlocked:!0}),te=De.some(e=>!!n.intro?.[e.autoFlagField]),M=n.computeAutoChargeEnabled??!0,ne=n.intro?.computeAutoBoostEnabled??!0,re={automation:Sh(n)&&`automation perk available`,prestige:Ch(n)&&`prestige perk available`},ie=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,B.jsx)($w,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${H(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),P=e=>Jo(n,e.id)?(0,B.jsxs)(Q,{"aria-label":`Start challenge ${Y_(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,B.jsxs)(Q,{"aria-label":`Challenge ${e.id} ${J_(e).toLowerCase()}`,disabled:!0,title:J_(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),ae=(e,t)=>{let r=Yo(e,t);return r&&!Po(n,r.id)?r:null},oe=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=em(e.id)&&r>=fm()&&!ae(`tierTickspeed`,e.id)&&!ae(`tierAutobuyer`,e.id)});return(0,B.jsxs)(pw,{children:[(0,B.jsxs)(mw,{children:[(0,B.jsx)(`h1`,{children:`Firmware`}),(0,B.jsxs)(hw,{"aria-label":`purge points display`,children:[`✦ `,H(o),` PP`]})]}),(0,B.jsx)(gw,{role:`tablist`,"aria-label":`firmware view`,children:tT.map(e=>(0,B.jsxs)(_w,{"aria-label":e.ariaLabel,"aria-selected":d===e.id,color:d===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,B.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),re[e.id]&&(0,B.jsx)(vw,{"aria-label":re[e.id]})]},e.id))}),d===`automation`&&(0,B.jsxs)(yw,{"aria-label":`automation firmware page`,children:[(0,B.jsxs)(bw,{"aria-label":`global automation category`,children:[(0,B.jsx)(xw,{children:`Global Automation`}),(0,B.jsx)(Cw,{children:cT.map(e=>{let t=e.owned(n),i=e.enabled(n),a=um(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=om(e.key),l=cm(e.key,o),u=Yo(`global`,e.key),d=u&&!Po(n,u.id)?u:null;return(0,B.jsx)(eT,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,B.jsx)(Zw,{current:s,milestone:ko(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?P(d):ie({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${H(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?rT(sm(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${nT(sm(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})})]}),(0,B.jsxs)(bw,{"aria-label":`tier autobuyers category`,children:[(0,B.jsx)(xw,{children:`Tier Autobuyers`}),oe?(0,B.jsx)(kw,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,B.jsxs)(Aw,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,B.jsx)(jw,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,B.jsx)(ww,{tier:e})}),(0,B.jsxs)(Mw,{children:[(0,B.jsx)(tg,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,B.jsx)(Nw,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,B.jsx)(tg,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,B.jsx)(Nw,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,B.jsxs)(Dw,{children:[(0,B.jsxs)(Ow,{"aria-hidden":`true`,children:[(0,B.jsx)(`span`,{children:`Tier`}),(0,B.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,B.jsx)(`span`,{children:`🤖 Buy`})]}),b.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=pa(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=em(e.id),d=l>=Yp(e.id),f=a?$p(n,e.id):1,p=rm(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=fm(),v=mm(g,e.id),y=ae(`tierTickspeed`,e.id),b=ae(`tierAutobuyer`,e.id);return(0,B.jsxs)(Ew,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,B.jsx)(ww,{tier:e}),(0,B.jsx)(eT,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,B.jsx)(Zw,{current:s,milestone:ma(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?P(y):ie({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${H(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?rT(pm(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${nT(pm(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,B.jsx)(eT,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,B.jsx)(Zw,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?P(b):ie({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${H(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${H(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:rT(Zp(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${nT(Zp(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),te&&(0,B.jsxs)(bw,{"aria-label":`power automation category`,children:[(0,B.jsx)(xw,{children:`Power Automation`}),(0,B.jsxs)(Cw,{children:[te&&(0,B.jsx)(eT,{ariaLabel:`auto-charge row`,enabled:M,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!M),owned:!0,statusTitle:M?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,B.jsx)(eT,{ariaLabel:`auto boost row`,enabled:ne,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!ne),owned:!0,statusTitle:ne?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,B.jsxs)(Tw,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,B.jsx)(Fw,{children:(0,B.jsx)(zw,{children:`Boost preset`})}),(0,B.jsx)(fw,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,B.jsxs)(bw,{"aria-label":`compute autobuyers category`,children:[(0,B.jsx)(xw,{children:`Compute Autobuyers`}),(0,B.jsx)(kw,{"aria-label":`compute autobuyer tiles`,role:`group`,children:st.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=ao(e.id);return(0,B.jsxs)(Aw,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,B.jsx)(jw,{$dimmed:!t,children:(0,B.jsx)(ww,{tier:e})}),t?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(tg,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,B.jsx)(Nw,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,B.jsx)(Pw,{children:(0,B.jsx)(Zw,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),d===`prestige`&&(0,B.jsxs)(yw,{"aria-label":`prestige firmware page`,children:[(0,B.jsxs)(bw,{"aria-label":`purge points category`,children:[(0,B.jsx)(xw,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,B.jsx)(Kw,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,B.jsx)(sT,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${iT(S)}`:`Production ×1 → ×${iT(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,B.jsx)(Qw,{icon:`🚀`,name:`Speed bonus`}):(0,B.jsx)($w,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${H(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,B.jsx)(sT,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at ${Le*100}% speed past 10 min). Each level adds ${k}: ${Ve.map(e=>H(e)).join(` / `)} PP, up to ${aT(Re)}.`,icon:`😴`,name:`Sleep mode`,value:E===null?`Time away: up to ${D}`:`Time away: up to ${D} → ${O}`,children:E===null?(0,B.jsx)(Qw,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,B.jsx)($w,{ariaLabel:`Buy Sleep mode level ${T+1} for ${H(E)} Purge Points — +${k} of time away`,color:`#a78bfa`,cost:E,disabled:o<E,icon:`⏫`,label:`${H(E)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,B.jsx)(sT,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:oT(g),children:(0,B.jsx)($w,{ariaLabel:`Buy Compression level ${g+1} for ${H(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${H(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,B.jsx)(sT,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${ee.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${ee.symbol} level 1 done`:`Start runs with ${ee.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,B.jsx)(Qw,{icon:`🔥`,name:`Cache Warm`}):(0,B.jsx)($w,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!A,icon:`🔓`,label:`${H(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,B.jsx)(sT,{ariaLabel:`playtime bonus upgrade`,details:`+${Ge*100}% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${iT(j)}`:`+${Ge*100}% production per hour played`,children:n.playtimeBonusUnlocked?(0,B.jsx)(Qw,{icon:`⏱`,name:`Playtime bonus`}):(0,B.jsx)($w,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${H(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(0,B.jsx)(sT,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:jo(n)?null:`Keep producing past 1 Googol Bytes`,children:jo(n)?(0,B.jsx)(Qw,{icon:`♾`,name:`Overflow mode`}):(0,B.jsx)(Yw,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,B.jsxs)(bw,{"aria-label":`purchasing category`,children:[(0,B.jsx)(xw,{children:`Purchasing`}),(0,B.jsx)(sT,{ariaLabel:`buy mode toggle`,details:`Level (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Single: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Single they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,B.jsx)(lw,{game:e})}),(0,B.jsx)(sT,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. One-time purchase; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:Ps(n)?null:`Buy every affordable level in one tap`,children:Ps(n)?(0,B.jsx)(aw,{game:e}):(0,B.jsx)($w,{ariaLabel:`Unlock Buy max for 2 Purge Points`,color:`#38bdf8`,cost:2,disabled:!w,icon:`🔓`,label:`${H(2)} PP`,onClick:r.buyBuyMaxUnlock,points:o,progressLabel:`Buy max unlock PP progress`})})]})]}),(0,B.jsx)(rb,{def:p?N.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},uT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),dT=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),fT=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],pT=e=>e&&uT(e)&&Object.keys(e).some(e=>dT.has(e)),mT=e=>{if(!e||!uT(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if(fT.some(t=>{let n=e[t];return n&&uT(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:fT.some(t=>pT(e[t]))?`legacy_tier_ids`:null},hT=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],gT=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],_T=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],vT=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},yT=e=>{let t=vT(e,hT);return t.automationIntervalLevels&&=vT(t.automationIntervalLevels,gT),t.automationAttemptBudgets&&=vT(t.automationAttemptBudgets,gT),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>vT(e,_T))}),t},bT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),xT=e=>{let{saveSchemaVersion:t,...n}=e;return n},ST=e=>{if(!bT(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:xT(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:yT(xT(e))};let t=mT(e);return t?{ok:!1,reason:t}:{ok:!0,payload:yT(e)}},CT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),wT=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),TT=()=>!0,ET=(e,t=TT())=>{if(!t)return ST(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:yT(r)}},DT=`tens_game_state`,OT=`tens_last_save_timestamp`,kT=`tens_saves_meta`,AT=`tens_dev_mode_active`,jT=`dev`,MT=`tens_dev_state`,NT=`tens_dev_timestamp`,PT=`TENS-SUPPORT`,FT=e=>e===jT?MT:e===`0`?DT:`tens_slot_${e}_state`,IT=e=>e===jT?NT:e===`0`?OT:`tens_slot_${e}_timestamp`,LT=e=>`Save ${e+1}`,RT=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:LT(0)}]}),zT=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),BT=()=>{try{let e=localStorage.getItem(kT);return e?wT(e):null}catch{return null}},VT=e=>{try{localStorage.setItem(kT,JSON.stringify(e))}catch{}},HT=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:LT(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},UT=e=>{let t=RT();if(!CT(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!CT(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():LT(n)})}return HT({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},WT=()=>{let e=UT(BT());return VT(e),e},GT=()=>{try{return localStorage.getItem(AT)===`1`}catch{return!1}},KT=e=>{try{e?localStorage.setItem(AT,`1`):localStorage.removeItem(AT)}catch{}},qT=()=>GT()?jT:WT().activeSlotId,JT=(e=`code`)=>{let t=WT();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=HT({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return VT(n),{ok:!0,meta:n}},YT=e=>{try{return localStorage.getItem(FT(e))!=null}catch{return!1}},XT=()=>{let e=WT(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??LT(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!YT(i)})}return t},ZT=e=>{if(GT())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=WT(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return VT(i),{ok:!0,meta:i}},QT=(e,t)=>{let n=String(e),r=WT(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return VT(s),{ok:!0,meta:s}},$T=e=>zT(e)===`TENS-SUPPORT`?JT(`code`):{ok:!1,reason:`invalid`},eE=()=>JT(`dummy_purchase`),tE=()=>{let e=WT();return e.slots.find(t=>t.id===e.activeSlotId)?.name??LT(0)},nE=()=>{let e=WT(),t=tE(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},rE=()=>`Reformat Byte Foundry on "${tE()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,iE=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,aE=()=>`Erase ALL save progress on this device?\n\n${WT().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,oE=e=>{try{localStorage.removeItem(FT(e)),localStorage.removeItem(IT(e))}catch{}},sE=e=>{if(GT())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=WT(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(oE(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},cE=()=>{if(GT())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)oE(String(e));return{ok:!0,meta:WT()}},lE=e=>{try{let t=qT(),n=(e??localStorage).getItem(FT(t));return n?wT(n):null}catch{return null}},uE=()=>{let e=qT(),t=lE();if(!t)return null;let n=ET(t);return n.ok?null:(oE(e),TT()?null:n.reason)},dE=(e,t)=>({...e,...t??{}}),fE=e=>CT(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),pE=e=>fE(e)&&Array.isArray(e.transfers)?e.transfers.length:0,mE=e=>{let t=e.deposits??{},n=L.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+pE(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},hE=(e,t)=>{let n=Wi(),r={};for(let e of Object.keys(n)){let i=t?.[e];if(fE(i)){n[e]={...n[e],...mE(i)};let t=pE(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},gE=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=Ae[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},_E=e=>{let t=e,n=Gi(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=hE(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return Zo(ha(Vc(oo({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:dE(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:dE(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:dE(n.owned,t.owned),purchased:dE(n.purchased,t.purchased),purchaseLevels:dE(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:dE(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:dE(n.autobuyers,t.autobuyers),autobuyersEnabled:dE(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:dE(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:dE(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:dE(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:dE(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:dE(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:dE(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:dE(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:dE(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:dE(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:{...n.eonsUpgrades,...t.eonsUpgrades??{}},computeFlopsAutobuyers:dE(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:dE(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:dE(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:gE({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},vE=e=>{let t=qT();try{localStorage.setItem(FT(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem(IT(t),String(Date.now()))}catch{}},yE=e=>{try{let t=lE(e);if(!t)return null;let n=ET(t);return n.ok?_E(n.payload):null}catch{return null}},bE=()=>{let e=qT();try{let t=localStorage.getItem(IT(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},xE=()=>{GT()?SE():sE(qT())},SE=()=>(oE(jT),{ok:!0}),CE=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=CT(i)&&CT(a)?CE(a,i):i,n},{...e}),wE=(e,t)=>{if(!GT())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=wT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!CT(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...CT(t)?CE(t,n):n};try{localStorage.setItem(MT,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=yE();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},TE=e=>JSON.stringify({saveSchemaVersion:3,...e}),EE=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(Gi(),e))||e.resources!==void 0&&!CT(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},DE=e=>{let t;try{t=wT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!CT(t))return{ok:!1,reason:`invalid_json`};let n=ET(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!TT()&&!EE(n.payload))return{ok:!1,reason:`invalid_state`};let r=_E(n.payload);return vE(r),{ok:!0,state:r}},OE=`tens_buy_max_mode`,kE=()=>{try{return localStorage.getItem(OE)===`true`}catch{return!1}},AE=e=>{try{localStorage.setItem(OE,e?`true`:`false`)}catch{}},jE=`tens_buy_unit_mode`,ME=()=>{try{return localStorage.getItem(jE)===`true`}catch{return!1}},NE=e=>{try{localStorage.setItem(jE,e?`true`:`false`)}catch{}},PE=`tens_theme_preference`,FE=()=>{try{let e=localStorage.getItem(PE);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},IE=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(PE,e)}catch{}},LE;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(LE||={});var RE=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},zE=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,BE=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?zE(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new RE(`"${e}" plugin is not implemented on ${c}`,LE.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new RE(`"${e}.${t}()" is not implemented on ${c}`,LE.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{let r=await n;g({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=RE,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},VE=(e=>e.Capacitor=BE(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),HE=VE.registerPlugin,UE=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new VE.Exception(e,LE.Unimplemented)}unavailable(e=`not available`){return new VE.Exception(e,LE.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},WE=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),GE=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),KE=class extends UE{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=GE(n).trim(),r=GE(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=WE(e.key),n=WE(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};HE(`CapacitorCookies`,{web:()=>new KE});var qE=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),JE=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},YE=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,XE=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=JE(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},ZE=class extends UE{async request(e){let t=XE(e,e.webFetchExtra),n=YE(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await qE(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};HE(`CapacitorHttp`,{web:()=>new ZE});var QE;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(QE||={});var $E;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})($E||={});var eD=class extends UE{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};HE(`SystemBars`,{web:()=>new eD});var tD=`https://mohanpednekar.github.io/tens/`,nD=`${tD}privacy.html`,rD=`${tD}terms.html`,iD=z(Li)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,aD=z.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,oD=z.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,sD=z.input`
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
`,cD=z.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,lD=z.textarea`
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
`,uD={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},dD=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:uD[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,B.jsxs)(iD,{"aria-label":`manual save section`,children:[(0,B.jsx)(`h2`,{children:`Backup / Restore`}),(0,B.jsx)(lD,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,B.jsxs)(aD,{children:[(0,B.jsx)(Q,{onClick:o,type:`button`,children:(0,B.jsx)($,{children:`Copy save`})}),(0,B.jsx)(Q,{onClick:s,type:`button`,children:(0,B.jsx)($,{children:`Download file`})}),(0,B.jsx)(Q,{onClick:()=>a.current?.click(),type:`button`,children:(0,B.jsx)($,{children:`Choose file…`})}),(0,B.jsx)(Q,{onClick:()=>c(t),type:`button`,children:(0,B.jsx)($,{children:`Import`})}),(0,B.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,B.jsx)(cD,{$error:r.error,children:r.text})]})},fD=z.div`
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
`,pD=()=>(0,B.jsxs)(iD,{"aria-label":`legal section`,children:[(0,B.jsx)(`h2`,{children:`Legal`}),(0,B.jsxs)(fD,{children:[(0,B.jsx)(`a`,{href:nD,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,B.jsx)(`a`,{href:rD,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),mD={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},hD=({service:e=cv()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,B.jsxs)(iD,{"aria-label":`store section`,children:[(0,B.jsx)(`h2`,{children:`Store`}),(0,B.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,B.jsxs)(aD,{children:[(0,B.jsx)(Q,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),mD.removeAds),type:`button`,variant:`primary`,children:(0,B.jsx)($,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,B.jsx)(Q,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),mD.supportTip),type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`Leave a tip`})}),(0,B.jsx)(Q,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,B.jsx)($,{children:`Restore purchases`})})]}),a&&(0,B.jsx)(cD,{$error:a.error,children:a.text})]})},gD=z.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,_D=z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,vD=z(aD)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,yD=z.div`
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
`,bD=z.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,xD=z.li`
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
`,SD=z.svg`
  display: block;
  height: 64px;
  width: 100%;
`,CD=z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,wD=z.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,TD=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},ED=z.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,DD=z.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,OD=({label:e,danger:t=!1,children:n})=>(0,B.jsxs)(`div`,{children:[(0,B.jsx)(ED,{$danger:t,children:e}),(0,B.jsx)(DD,{children:n})]}),kD=z.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,AD=mi`
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
`,jD=z.button`
  ${AD}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,MD=z.div`
  ${AD}
`,ND=z.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,PD=z.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,FD=z.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ID=z.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,LD=z.div`
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
`,RD=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,B.jsx)(kD,{children:(0,B.jsxs)(MD,{$danger:r,children:[(0,B.jsx)(ND,{"aria-hidden":`true`,children:e}),(0,B.jsx)(PD,{children:t}),i]})}):(0,B.jsxs)(kD,{children:[(0,B.jsxs)(jD,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,B.jsx)(ND,{"aria-hidden":`true`,children:e}),(0,B.jsx)(PD,{children:t}),n!=null&&n!==``&&(0,B.jsx)(FD,{children:n}),(0,B.jsx)(ID,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,B.jsx)(LD,{children:a})]})},zD=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=G(e.state),o=!!e.devModeActive,s=!!e.savesMeta?.supporterUnlocked,[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(null),[f,p]=(0,v.useState)(!1),m=e.state.era?.count??0,h=e.state.eons?.balance??0,g=eo(e.state),_=to(e.state),y=e.state.purge?.points??0,b=e=>e===1?`Kernel`:`Kernels`,x=e.state.prestigeMuseum??{history:[],pinnedIds:[]},S=new Set(x.pinnedIds??[]),C=x.history??[],w=C.filter(e=>S.has(e.id)),T=s?C:C.slice(0,1),E=t=>{t.preventDefault();let n=e.redeemUnlockCode(c);n.ok?(l(``),d({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):d({error:!0,text:`That code is not valid.`})},D=()=>{let t=e.purchaseSupporterDummy();d({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},O=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},k=t=>{o||a&&t.isActive||window.confirm(iE(t))&&e.clearSlot(t.id)},A=()=>{a||o||window.confirm(aE())&&e.eraseAllSaveProgress()},ee=()=>{eo(e.state)&&(e.actions.eraAscend(),p(!1))},j=!!cv().iapAvailable,te=TD(e.opsSamples??[],`money`),M=TD(e.opsSamples??[],`prestigePoints`);return(0,B.jsxs)(gD,{children:[(0,B.jsx)(_D,{children:(0,B.jsx)(`h1`,{children:`Settings`})}),(0,B.jsxs)(OD,{label:`Game`,children:[(0,B.jsx)(RD,{icon:`💛`,label:`Supporter`,value:s?`Unlocked`:`Free`,children:(0,B.jsxs)(iD,{"aria-label":`supporter pack section`,children:[(0,B.jsx)(`h2`,{children:`Supporter pack`}),(0,B.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),s?(0,B.jsxs)(cD,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(CD,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,B.jsx)(`code`,{children:PT})]}),(0,B.jsxs)(oD,{onSubmit:E,children:[(0,B.jsx)(sD,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>l(e.target.value),placeholder:`Enter unlock code`,value:c}),(0,B.jsx)(Q,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,B.jsx)($,{children:`Redeem code`})})]}),(0,B.jsx)(Q,{"aria-label":`dummy supporter checkout`,onClick:D,type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`Dummy checkout (free)`})})]}),u&&(0,B.jsx)(cD,{$error:u.error,children:u.text})]})}),(0,B.jsx)(RD,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,B.jsxs)(iD,{"aria-label":`save slots section`,children:[(0,B.jsx)(`h2`,{children:`Save slots`}),(0,B.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),o&&(0,B.jsx)(CD,{children:`Dev Mode is active — Play/Clear are disabled here so a dev-only session can't touch a real save. Disable Dev Mode first.`}),(e.saveSlots??[]).map(t=>(0,B.jsxs)(vD,{$active:t.isActive,children:[(0,B.jsxs)(yD,{children:[(0,B.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,B.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,B.jsxs)(aD,{children:[!t.isActive&&(0,B.jsx)(Q,{"aria-label":`switch to ${t.name}`,disabled:o,onClick:()=>e.switchSaveSlot(t.id),title:o?`Disable Dev Mode first`:void 0,type:`button`,variant:`primary`,children:(0,B.jsx)($,{children:`Play`})}),(0,B.jsx)(Q,{"aria-label":`rename ${t.name}`,onClick:()=>O(t),type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`Rename`})}),(0,B.jsx)(Q,{"aria-label":`clear ${t.name}`,disabled:o||a&&t.isActive,onClick:()=>k(t),title:o?`Disable Dev Mode first`:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,B.jsx)($,{children:`Clear…`})})]})]},t.id))]})}),(0,B.jsx)(RD,{icon:`⏻`,label:`Reboot`,value:`${h} ${b(h)}`,children:(0,B.jsxs)(iD,{"aria-label":`reboot section`,children:[(0,B.jsx)(`h2`,{children:`Reboot`}),(0,B.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,B.jsxs)(aD,{children:[(0,B.jsx)(`span`,{children:`Reboots`}),(0,B.jsx)(`strong`,{children:m})]}),(0,B.jsxs)(aD,{children:[(0,B.jsx)(`span`,{children:`Kernels`}),(0,B.jsxs)(`strong`,{children:[h,` `,b(h)]})]}),(0,B.jsx)(`p`,{children:g?`Ready — next Reboot awards ${_} ${b(_)}.`:`Requires 1 Googol PP unspent (you have ${H(y)} PP).`}),(0,B.jsx)(Q,{"aria-label":g?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!g,onClick:()=>p(!0),type:`button`,variant:`prestige`,children:(0,B.jsx)($,{children:`⏻ Reboot…`})})]})}),(0,B.jsx)(RD,{icon:`📜`,label:`System log`,value:s?`${C.length}`:`🔒`,children:(0,B.jsxs)(iD,{"aria-label":`system log section`,children:[(0,B.jsx)(`h2`,{children:`System log`}),s?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),w.length>0&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(CD,{children:`Pinned`}),(0,B.jsx)(bD,{"aria-label":`pinned purge entries`,children:w.map(t=>(0,B.jsxs)(xD,{children:[(0,B.jsxs)(`div`,{children:[(0,B.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,B.jsx)(`div`,{children:(0,B.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,na(t.moneyBits)]})})]}),(0,B.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,B.jsx)(CD,{children:`Recent history`}),T.length===0?(0,B.jsx)(CD,{children:`No purges recorded yet.`}):(0,B.jsx)(bD,{"aria-label":`system log history`,children:T.map(t=>(0,B.jsxs)(xD,{children:[(0,B.jsxs)(`div`,{children:[(0,B.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,B.jsx)(`div`,{children:(0,B.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,ea(t.moneyBits)]})})]}),S.has(t.id)?(0,B.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`Unpin`})}):(0,B.jsx)(Q,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:S.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,B.jsx)($,{children:`Pin`})})]},t.id))})]}):(0,B.jsxs)(CD,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,C.length>0&&` Latest: Purge #${C[0].purgeNumber} (+${C[0].pointsAwarded} PP).`]})]})}),(0,B.jsx)(RD,{icon:`📈`,label:`Task Manager`,value:s?null:`🔒`,children:(0,B.jsxs)(iD,{"aria-label":`task manager section`,children:[(0,B.jsx)(`h2`,{children:`Task Manager`}),s?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,na(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,B.jsx)(CD,{children:`Bits`}),(0,B.jsx)(SD,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,B.jsx)(`path`,{d:te||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,B.jsx)(CD,{children:`Purge Points`}),(0,B.jsx)(SD,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,B.jsx)(`path`,{d:M||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,B.jsx)(CD,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,B.jsxs)(OD,{label:`Data`,children:[!1,(0,B.jsx)(RD,{icon:`🗄`,label:`Backup / Restore`,children:(0,B.jsx)(dD,{game:e})}),j&&(0,B.jsx)(RD,{icon:`🛒`,label:`Store`,children:(0,B.jsx)(hD,{})}),(0,B.jsx)(RD,{icon:`ℹ`,label:`About`,children:(0,B.jsxs)(iD,{"aria-label":`about section`,children:[(0,B.jsx)(`h2`,{children:`About`}),(0,B.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,B.jsx)(RD,{icon:`⚖`,label:`Legal`,children:(0,B.jsx)(pD,{})})]}),(0,B.jsx)(OD,{label:`Display`,children:(0,B.jsx)(RD,{icon:`🎨`,inline:(0,B.jsx)(wD,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,B.jsx)(Q,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,B.jsx)($,{children:t})},e))}),label:`Theme`})}),(0,B.jsx)(OD,{danger:!0,label:`Danger zone`,children:(0,B.jsx)(RD,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,B.jsxs)(iD,{"aria-label":`danger zone`,children:[(0,B.jsx)(`h2`,{children:`Danger zone`}),(0,B.jsxs)(`p`,{children:[`Erase the `,(0,B.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,B.jsxs)(Q,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,B.jsx)($,{children:`↺ Reset active save…`}),(0,B.jsx)(tg,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,B.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,B.jsxs)(Q,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,B.jsx)($,{children:`↺ Reformat Byte Foundry…`}),(0,B.jsx)(tg,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,B.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,B.jsx)(Q,{"aria-label":`Erase all save progress`,disabled:a||o,onClick:A,title:o?`Disable Dev Mode first`:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,B.jsx)($,{children:`Erase all save progress…`})})]})})}),(0,B.jsxs)(b_,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>p(!1),onConfirm:ee,open:f,title:`Reboot?`,children:[(0,B.jsxs)(`p`,{children:[`Awards `,_,` `,b(_),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,B.jsxs)(`p`,{children:[(0,B.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,B.jsxs)(`p`,{children:[(0,B.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},BD=2**53-1,VD=e=>e?Ss:BD,HD=2,UD=(e,t,n=BD)=>{let r=e>0?Ts(e,Ia(t)):0;return r<=0?null:{state:Es(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:Ia(t)}:null}},WD=()=>{WT();let e=uE(),t=yE();if(!t)return{state:Gi(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=bE(),r=UD(n?(Date.now()-n)/1e3:0,t,VD(ME()))??{state:t,offlineProgress:null};return{...r,state:Va(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},GD=()=>{let[e]=(0,v.useState)(WD),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>WT()),[l,u]=(0,v.useState)(()=>XT()),[d,f]=(0,v.useState)(()=>GT()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(WT()),u(XT())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>HD){let r=Ia(y.current),a=Ts(t,r);if(a>0){n(e=>Es(t,VD(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=ws(r,VD(D.current))(e);return document.visibilityState===`visible`?za(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>f_(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{vE(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,He);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)(kE),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,AE(!!e),S(!!e)},[]),[T,E]=(0,v.useState)(ME),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,NE(!!e),E(!!e)},[]),k=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&Ps(n)?t:e)(n));return{buyTierQuantity:t=>D.current?n(e=>Ns(t,1)(e)):e(Ns(t,BD),Bs(t)),buyTickspeedMultiplier:t=>e(qp(t),Is(qp(t))),buyAutobuyerIntervalUpgrade:e=>n(im(e)),buyAutomationIntervalUpgrade:e=>n(dm(e)),buyTierTickspeedIntervalUpgrade:e=>n(hm(e)),setAutoOverclockEnabled:e=>n(_m(e)),startComputeCharge:e=>n(Nd(e)),setComputeAutoChargeEnabled:e=>n(gm(e)),buyGlobalTickspeedMultiplier:()=>e(bm,Is(bm)),buyPlaytimeBonus:()=>n(ka),buyBuyMaxUnlock:()=>n(Aa),buyCacheWarm:()=>n(ja),buySleepModeCapUpgrade:()=>e(Ra,Is(Ra)),buyPrestigeSpeedBonus:()=>n(Da),buyPrestigeDoublePp:()=>e(_o,Is(_o)),buyComputeFlopsTier:t=>e(qa(t),Is(qa(t))),buyHyperscaler:()=>n(io),eraAscend:()=>n(go),enterChallenge:e=>n(Om(e)),exitChallenge:()=>n(km),purge:()=>n(Dm),dailyStart:e=>n(c_(e,Date.now())),dailyForfeit:e=>n(l_(e)),dailyRestart:e=>n(d_(e,Date.now())),dailyPlay:(e,t,r)=>n(p_(e,t,r,Date.now())),scaleUp:()=>n(Fm),overclock:()=>n(Im),setComputeAutoBoostEnabled:e=>n(zp(e)),setComputeAutoBoostType:e=>n(Bp(e)),consumeXpForLastTierTickspeed:e=>n(Um(e)),setAutoScaleUpEnabled:e=>n(Vm(e)),setAutoXpTickspeedEnabled:e=>n(Bm(e)),setAutoGlobalTickspeedEnabled:e=>n(Hm(e)),setAutoPurgeEnabled:e=>n(ym(e)),setAutobuyerEnabled:(e,t)=>n(Hp(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(vm(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(so(e,t)),tapIntroBit:()=>n(lc),tapPoolBuffer:e=>n(Rc(e)),combineIntroByte:()=>n(uc),pickIntroCapacityMilestone:()=>n(nl),queueIntroSpeedUpgrade:()=>n(el),unlockNextDiskSize:()=>n(Vl),clearIntroCapacityUpgradeQueue:()=>n(al),convertIntroBitsToKilobytes:()=>n(jl),provisionDisk:()=>n(nu),queueDiskBuild:()=>n(ru),clearDiskBuildQueue:()=>n(iu),expediteDiskFill:e=>n(Tu(e)),doubleDataLakeCapacity:e=>n(ff(e)),activateComputeBoost:(e,t)=>n(Ip(e,t)),stackComputeBoost:e=>n(Lp(e)),reclaimComputeBoost:e=>n(Np(e)),forfeitComputeBoost:e=>n(Fp(e)),mergeComputeCoresIntoNode:()=>n(hf),mergeComputeNodesIntoCluster:()=>n(gf),mergeComputeClustersIntoNetwork:()=>n(_f),mergeComputeNetworksIntoGrid:()=>n(vf),mergeComputeGridsIntoFabric:()=>n(yf),mergeComputeFabricsIntoCloud:()=>n(bf),mergeComputeCloudsIntoDatacenter:()=>n(xf),mergeComputeDatacentersIntoSupercomputer:()=>n(Sf),mergeComputeSupercomputersIntoMegacomputer:()=>n(Cf),enableAutoMergeCoresIntoNode:()=>n(Pf),enableAutoMergeNodesIntoCluster:()=>n(Rf),enableAutoMergeClustersIntoNetwork:()=>n(Hf),enableAutoMergeNetworksIntoGrid:()=>n(Gf),enableAutoMergeGridsIntoFabric:()=>n(Yf),enableAutoMergeFabricsIntoCloud:()=>n($f),enableAutoMergeCloudsIntoDatacenter:()=>n(rp),enableAutoMergeDatacentersIntoSupercomputer:()=>n(sp),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(dp),startComputeCoresMerge:()=>n(If),startComputeNodesMerge:()=>n(Bf),startComputeClustersMerge:()=>n(Uf),startComputeNetworksMerge:()=>n(qf),startComputeGridsMerge:()=>n(Zf),startComputeFabricsMerge:()=>n(tp),startComputeCloudsMerge:()=>n(ap),startComputeDatacentersMerge:()=>n(lp),startComputeSupercomputersMerge:()=>n(pp),startDataLakeAutoConvert:e=>n(Jd(e)),flushStoragePool:e=>n(qd(e)),pinMuseumEntry:e=>n(jm(e)),unpinMuseumEntry:e=>n(Mm(e))}},[]),A=(0,v.useCallback)(()=>{xE(),_(null),n(Gi()),i(null),o(null),m([]),b()},[b]),ee=(0,v.useCallback)(()=>{n(Em)},[]),j=(0,v.useCallback)(e=>{let t=sE(e);return t.ok&&(t.clearedActive&&(_(null),n(Gi()),i(null),o(null),m([])),b()),t},[b]),te=(0,v.useCallback)(()=>{let e=cE();return e.ok&&(_(null),n(Gi()),i(null),o(null),m([]),b()),e},[b]),M=(0,v.useCallback)(()=>i(null),[]),N=(0,v.useRef)(new WeakSet),ne=(0,v.useCallback)(e=>!e||e.rewardClaimed||N.current.has(e)?!1:(N.current.add(e),n(t=>Os(e.elapsedRealSeconds,VD(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+Ds(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),re=(0,v.useCallback)(()=>o(null),[]),ie=(0,v.useCallback)(e=>{vE(y.current);let t=ZT(e);if(!t.ok)return t;if(t.already)return b(),t;let r=uE(),a=yE()??Gi(),s=bE(),c=UD(s?(Date.now()-s)/1e3:0,a,VD(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),P=(0,v.useCallback)(()=>{vE(y.current);let e=!GT();KT(e),f(e);let t=uE(),r=yE();_(r),n(r??Gi()),i(null),o(t),m([]),b()},[b]),ae=(0,v.useCallback)(()=>{GT()&&(SE(),_(null),n(Gi()),i(null),o(null),m([]))},[]),oe=(0,v.useCallback)(e=>{let t=wE(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),se=(0,v.useCallback)(e=>{GT()&&n(t=>Vc(e(t)))},[]),ce=(0,v.useCallback)(()=>TE(y.current),[]),le=(0,v.useCallback)(e=>{let t=DE(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),ue=(0,v.useCallback)((e,t)=>{let n=QT(e,t);return n.ok&&b(),n},[b]),de=(0,v.useCallback)(e=>{let t=$T(e);return t.ok&&b(),t},[b]);return{actions:k,applyCloudSave:le,applyDevStateJson:oe,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:ne,clearSlot:j,devModeActive:d,dismissIncompatibleSaveNotice:re,dismissOfflineProgress:M,eraseAllSaveProgress:te,exportSaveJson:ce,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=eE();return e.ok&&b(),e},[b]),redeemUnlockCode:de,renameSaveSlot:ue,resetByteFoundry:ee,resetDevState:ae,resetGame:A,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:se,state:t,switchSaveSlot:ie,toggleDevMode:P}},KD=vi`
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
`,qD={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},JD={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},YD={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},XD={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},ZD={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},QD={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},$D={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},eO={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},tO=[`dark`,`light`],nO=`dark`,rO=e=>{let t=tO.includes(e)?e:nO;return{mode:t,color:qD[t],shadow:JD[t],tierAccents:YD[t],space:XD,radius:ZD,motion:QD,font:$D,type:eO}},iO={dark:rO(`dark`),light:rO(`light`)},aO=()=>typeof window>`u`||typeof window.matchMedia!=`function`?nO:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,oO=e=>e===`light`||e===`dark`?e:aO(),sO=({mode:e=nO,children:t})=>(0,B.jsx)(si,{theme:iO[e]??iO.dark,children:t}),cO=()=>oO(FE()),lO=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`settings`,`dev`]),uO=z.div`
  padding-bottom: ${Uh};
`;function dO(){let e=GD(),[t,n]=(0,v.useState)(FE),[r,i]=(0,v.useState)(cO),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!lO.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=pf(e.state),b=Ba(e.state),x=h,S=h&&Fs(e.state),C=S,w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{G(e.state)||window.confirm(nE())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{G(e.state)||window.confirm(rE())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(oO(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{IE(e),n(e),i(oO(e))},O;O=g?(0,B.jsx)(dS,{focusNonce:p,game:e}):a===`info`?(0,B.jsx)(XC,{}):a===`boosters`?(0,B.jsx)(eC,{game:e}):a===`compute`?(0,B.jsx)(ES,{game:e}):a===`perks`&&S?(0,B.jsx)(lT,{focusNonce:l,game:e}):a===`challenges`&&C?(0,B.jsx)(ub,{focusNonce:d,game:e}):a===`milestones`?(0,B.jsx)(iw,{game:e}):a===`achievements`&&ue.enabled?(0,B.jsx)(eh,{game:e}):a===`dev`?(0,B.jsx)(WC,{game:e}):a===`settings`?(0,B.jsx)(zD,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,B.jsx)(_y,{game:e});let k=Ph(e.state);return(0,B.jsxs)(sO,{mode:r,children:[(0,B.jsx)(KD,{}),(0,B.jsx)(uO,{children:O}),(0,B.jsx)(Hh,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,B.jsx)(Ii,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,B.jsx)(Ai,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,B.jsx)(og,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})}var fO=`modulepreload`,pO=function(e){return`/tens/dev/`+e},mO={},hO=function(e){return e.pathname.endsWith(`.css`)},gO=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},_O=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=pO(t,n);let r=s(t),i=hO(r);return gO(mO,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:fO,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},vO=e=>{e&&e instanceof Function&&_O(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},yO=document.getElementById(`root`);if(!yO)throw Error(`Root element not found`);(0,y.createRoot)(yO).render((0,B.jsx)(v.StrictMode,{children:(0,B.jsx)(dO,{})})),vO();