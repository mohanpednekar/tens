var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=`dev:`)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function te(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=M(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(te(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function N(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var re=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ie(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,re)}catch(e){re(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function P(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ie(P.bind(null,e))}var ae={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ae,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=P,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ie,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),ee=Symbol.for(`react.fragment`),j=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),M=Symbol.for(`react.consumer`),N=Symbol.for(`react.context`),ne=Symbol.for(`react.forward_ref`),re=Symbol.for(`react.suspense`),ie=Symbol.for(`react.suspense_list`),P=Symbol.for(`react.memo`),ae=Symbol.for(`react.lazy`),oe=Symbol.for(`react.activity`),se=Symbol.for(`react.legacy_hidden`),ce=Symbol.for(`react.memo_cache_sentinel`),le=Symbol.for(`react.view_transition`),ue=Symbol.for(`react.recoverable`),de=Symbol.iterator;function fe(e){return typeof e!=`object`||!e?null:(e=de&&e[de]||e[`@@iterator`],typeof e==`function`?e:null)}var pe=Symbol.for(`react.client.reference`);function me(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ee:return`Fragment`;case te:return`Profiler`;case j:return`StrictMode`;case re:return`Suspense`;case ie:return`SuspenseList`;case oe:return`Activity`;case le:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case N:return e.displayName||`Context`;case M:return(e._context.displayName||`Context`)+`.Consumer`;case ne:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case P:return t=e.displayName||null,t===null?me(e.type)||`Memo`:t;case ae:t=e._payload,e=e._init;try{return me(e(t))}catch{}}return null}var he=Array.isArray,F=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ge={pending:!1,data:null,method:null,action:null},_e=[],ve=-1;function ye(e){return{current:e}}function be(e){0>ve||(e.current=_e[ve],_e[ve]=null,ve--)}function L(e,t){ve++,_e[ve]=e.current,e.current=t}var xe=ye(null),Se=ye(null),Ce=ye(null),we=ye(null);function Te(e,t){switch(L(Ce,t),L(Se,e),L(xe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mp(t),e=hp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}be(xe),L(xe,e)}function Ee(){be(xe),be(Se),be(Ce)}function De(e){var t=e.memoizedState;t!==null&&(lh._currentValue=t.memoizedState,L(we,e)),t=xe.current;var n=hp(t,e.type);t!==n&&(L(Se,e),L(xe,n))}function Oe(e){Se.current===e&&(be(xe),be(Se)),we.current===e&&(be(we),lh._currentValue=ge)}var ke,Ae;function je(e){if(ke===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ke=t&&t[1]||``,Ae=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ke+e+Ae}var Me=!1;function Ne(e,t){if(!e||Me)return``;Me=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Me=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?je(n):``}function Pe(e,t){switch(e.tag){case 26:case 27:case 5:return je(e.type);case 16:return je(`Lazy`);case 13:return e.child!==t&&t!==null?je(`Suspense Fallback`):je(`Suspense`);case 19:return je(`SuspenseList`);case 0:case 15:return Ne(e.type,!1);case 11:return Ne(e.type.render,!1);case 1:return Ne(e.type,!0);case 31:return je(`Activity`);case 30:return je(`ViewTransition`);default:return``}}function Fe(e){try{var t=``,n=null;do t+=Pe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ie=Object.prototype.hasOwnProperty,Le=t.unstable_scheduleCallback,Re=t.unstable_cancelCallback,ze=t.unstable_shouldYield,Be=t.unstable_requestPaint,Ve=t.unstable_now,He=t.unstable_getCurrentPriorityLevel,Ue=t.unstable_ImmediatePriority,We=t.unstable_UserBlockingPriority,Ge=t.unstable_NormalPriority,Ke=t.unstable_LowPriority,qe=t.unstable_IdlePriority,Je=t.log,Ye=t.unstable_setDisableYieldValue,Xe=null,Ze=null;function Qe(e){if(typeof Je==`function`&&Ye(e),Ze&&typeof Ze.setStrictMode==`function`)try{Ze.setStrictMode(Xe,e)}catch{}}var $e=Math.clz32?Math.clz32:nt,et=Math.log,tt=Math.LN2;function nt(e){return e>>>=0,e===0?32:31-(et(e)/tt|0)|0}var rt=256,it=262144,at=4194304;function ot(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function st(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ot(n))):i=ot(o):i=ot(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ot(n))):i=ot(o)):i=ot(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ct(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function lt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-$e(n),i=1<<r;t|=e[r],n&=~i}return t}function ut(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dt(){var e=at;return at<<=1,!(at&62914560)&&(at=4194304),e}function ft(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function pt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function mt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-$e(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ht(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ht(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-$e(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function gt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-$e(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function _t(e,t){var n=t&-t;return n=n&42?1:vt(n),(n&(e.suspendedLanes|t))===0?n:0}function vt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function R(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function yt(){var e=I.p;return e===0?(e=window.event,e===void 0?32:Th(e.type)):e}function bt(e,t){var n=I.p;try{return I.p=e,t()}finally{I.p=n}}var xt=Math.random().toString(36).slice(2),St=`__reactFiber$`+xt,Ct=`__reactProps$`+xt,wt=`__reactContainer$`+xt,Tt=`__reactEvents$`+xt,Et=`__reactListeners$`+xt,Dt=`__reactHandles$`+xt,Ot=`__reactResources$`+xt,kt=`__reactMarker$`+xt,At=`__reactLoad$`+xt;function jt(e){delete e[St],delete e[Ct],delete e[Et],delete e[Dt]}function z(e){var t;if(t=e[St])return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gm(e);e!==null;){if(n=e[St])return n;e=gm(e)}return t}e=n,n=e.parentNode}return null}function Mt(e){if(e=e[St]||e[wt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Pt(e){var t=e[Ot];return t||=e[Ot]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ft(e){e[kt]=!0}function It(e){e[At]=void 0}var Lt=new Set,Rt={};function zt(e,t){Bt(e,t),Bt(e+`Capture`,t)}function Bt(e,t){for(Rt[e]=t,e=0;e<t.length;e++)Lt.add(t[e])}var Vt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ht={},Ut={};function Wt(e){return Ie.call(Ut,e)?!0:Ie.call(Ht,e)?!1:Vt.test(e)?Ut[e]=!0:(Ht[e]=!0,!1)}var Gt=!1;function Kt(){var e=Gt;return Gt=!1,e}function qt(e,t,n){if(Wt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Jt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Yt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Xt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Qt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $t(e){if(!e._valueTracker){var t=Zt(e)?`checked`:`value`;e._valueTracker=Qt(e,t,``+e[t])}}function en(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Zt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var tn=/[\n"\\]/g;function nn(e){return e.replace(tn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function rn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Xt(t)):e.value!==``+Xt(t)&&(e.value=``+Xt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):on(e,Xt(n)):o===`number`&&e.value==t?on(e,Xt(e.value)):on(e,Xt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Xt(s):e.removeAttribute(`name`)}function an(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){$t(e);return}n=n==null?``:``+Xt(n),t=t==null?n:``+Xt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),$t(e)}function on(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function sn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Xt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function cn(e,t,n){t!=null&&(t=``+Xt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Xt(n)}function ln(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(he(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Xt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),$t(e)}function un(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var dn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function fn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||dn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function pn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,Gt=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(fn(e,a,r),Gt=!0)}else for(var o in t)t.hasOwnProperty(o)&&fn(e,o,t[o])}function mn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var hn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),gn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function _n(e){return gn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function vn(){}var yn=null;function bn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xn=null,Sn=null;function Cn(e){var t=Mt(e);if(t&&(e=t.stateNode)){var n=e[Ct]||null;a:switch(e=t.stateNode,t.type){case`input`:if(rn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+nn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ct]||null;if(!a)throw Error(i(90));rn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&en(r)}break a;case`textarea`:cn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&sn(e,!!n.multiple,t,!1)}}}var wn=!1;function Tn(e,t,n){if(wn)return e(t,n);wn=!0;try{return e(t)}finally{if(wn=!1,(xn!==null||Sn!==null)&&(Wd(),xn&&(t=xn,e=Sn,Sn=xn=null,Cn(t),e)))for(t=0;t<e.length;t++)Cn(e[t])}}function En(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Ct]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Dn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,On=!1;if(Dn)try{var kn={};Object.defineProperty(kn,"passive",{get:function(){On=!0}}),window.addEventListener(`test`,kn,kn),window.removeEventListener(`test`,kn,kn)}catch{On=!1}var An=null,jn=null,Mn=null;function Nn(){if(Mn)return Mn;var e,t=jn,n=t.length,r,i=`value`in An?An.value:An.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Mn=i.slice(e,1<r?1-r:void 0)}function Pn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Fn(){return!0}function In(){return!1}function Ln(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Fn:In,this.isPropagationStopped=In,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Fn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Fn)},persist:function(){},isPersistent:Fn}),t}var Rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zn=Ln(Rn),Bn=D({},Rn,{view:0,detail:0}),Vn=Ln(Bn),Hn,Un,Wn,Gn=D({},Bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Wn&&(Wn&&e.type===`mousemove`?(Hn=e.screenX-Wn.screenX,Un=e.screenY-Wn.screenY):Un=Hn=0,Wn=e),Hn)},movementY:function(e){return`movementY`in e?e.movementY:Un}}),Kn=Ln(Gn),qn=Ln(D({},Gn,{dataTransfer:0})),Jn=Ln(D({},Bn,{relatedTarget:0})),Yn=Ln(D({},Rn,{animationName:0,elapsedTime:0,pseudoElement:0})),Xn=Ln(D({},Rn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Zn=Ln(D({},Rn,{data:0})),Qn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},$n={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},er={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function tr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=er[e])?!!t[e]:!1}function nr(){return tr}var rr=Ln(D({},Bn,{key:function(e){if(e.key){var t=Qn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Pn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?$n[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nr,charCode:function(e){return e.type===`keypress`?Pn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Pn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ir=Ln(D({},Gn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ar=Ln(D({},Rn,{submitter:0})),or=Ln(D({},Bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nr})),sr=Ln(D({},Rn,{propertyName:0,elapsedTime:0,pseudoElement:0})),cr=Ln(D({},Gn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),lr=Ln(D({},Rn,{newState:0,oldState:0,source:0})),ur=[9,13,27,32],dr=Dn&&`CompositionEvent`in window,fr=null;Dn&&`documentMode`in document&&(fr=document.documentMode);var pr=Dn&&`TextEvent`in window&&!fr,mr=Dn&&(!dr||fr&&8<fr&&11>=fr),hr=` `,gr=!1;function _r(e,t){switch(e){case`keyup`:return ur.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function vr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var yr=!1;function br(e,t){switch(e){case`compositionend`:return vr(t);case`keypress`:return t.which===32?(gr=!0,hr):null;case`textInput`:return e=t.data,e===hr&&gr?null:e;default:return null}}function xr(e,t){if(yr)return e===`compositionend`||!dr&&_r(e,t)?(e=Nn(),Mn=jn=An=null,yr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return mr&&t.locale!==`ko`?null:t.data;default:return null}}var Sr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Sr[e.type]:t===`textarea`}function wr(e,t,n,r){xn?Sn?Sn.push(r):Sn=[r]:xn=r,t=Zf(t,`onChange`),0<t.length&&(n=new zn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Tr=null,Er=null;function Dr(e){Wf(e,0)}function Or(e){if(en(Nt(e)))return e}function kr(e,t){if(e===`change`)return t}var Ar=!1;if(Dn){var jr;if(Dn){var Mr=`oninput`in document;if(!Mr){var Nr=document.createElement(`div`);Nr.setAttribute(`oninput`,`return;`),Mr=typeof Nr.oninput==`function`}jr=Mr}else jr=!1;Ar=jr&&(!document.documentMode||9<document.documentMode)}function Pr(){Tr&&(Tr.detachEvent(`onpropertychange`,Fr),Er=Tr=null)}function Fr(e){if(e.propertyName===`value`&&Or(Er)){var t=[];wr(t,Er,e,bn(e)),Tn(Dr,t)}}function Ir(e,t,n){e===`focusin`?(Pr(),Tr=t,Er=n,Tr.attachEvent(`onpropertychange`,Fr)):e===`focusout`&&Pr()}function Lr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Or(Er)}function Rr(e,t){if(e===`click`)return Or(t)}function zr(e,t){if(e===`input`||e===`change`)return Or(t)}function Br(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Vr=typeof Object.is==`function`?Object.is:Br;function Hr(e,t){if(Vr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ie.call(t,i)||!Vr(e[i],t[i]))return!1}return!0}function Ur(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Wr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gr(e,t){var n=Wr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Wr(n)}}function Kr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ur(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ur(e.document)}return t}function Jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Yr=Dn&&`documentMode`in document&&11>=document.documentMode,Xr=null,Zr=null,Qr=null,$r=!1;function ei(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$r||Xr==null||Xr!==Ur(r)||(r=Xr,`selectionStart`in r&&Jr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qr&&Hr(Qr,r)||(Qr=r,r=Zf(Zr,`onSelect`),0<r.length&&(t=new zn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Xr)))}function ti(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ni={animationend:ti(`Animation`,`AnimationEnd`),animationiteration:ti(`Animation`,`AnimationIteration`),animationstart:ti(`Animation`,`AnimationStart`),transitionrun:ti(`Transition`,`TransitionRun`),transitionstart:ti(`Transition`,`TransitionStart`),transitioncancel:ti(`Transition`,`TransitionCancel`),transitionend:ti(`Transition`,`TransitionEnd`)},ri={},ii={};Dn&&(ii=document.createElement(`div`).style,`AnimationEvent`in window||(delete ni.animationend.animation,delete ni.animationiteration.animation,delete ni.animationstart.animation),`TransitionEvent`in window||delete ni.transitionend.transition);function ai(e){if(ri[e])return ri[e];if(!ni[e])return e;var t=ni[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ii)return ri[e]=t[n];return e}var oi=ai(`animationend`),si=ai(`animationiteration`),ci=ai(`animationstart`),li=ai(`transitionrun`),ui=ai(`transitionstart`),di=ai(`transitioncancel`),fi=ai(`transitionend`),pi=new Map,mi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);mi.push(`scrollEnd`);function hi(e,t){pi.set(e,t),zt(t,[e])}var gi=0;function _i(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=Td.identifierPrefix;var n=gi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function vi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Nd;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function yi(e,t){return e=vi(e),t=vi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var bi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},xi=[],Si=0,Ci=0;function wi(){for(var e=Si,t=Ci=Si=0;t<e;){var n=xi[t];xi[t++]=null;var r=xi[t];xi[t++]=null;var i=xi[t];xi[t++]=null;var a=xi[t];if(xi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Oi(n,i,a)}}function Ti(e,t,n,r){xi[Si++]=e,xi[Si++]=t,xi[Si++]=n,xi[Si++]=r,Ci|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ei(e,t,n,r){return Ti(e,t,n,r),ki(e)}function Di(e,t){return Ti(e,null,null,t),ki(e)}function Oi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-$e(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ki(e){if(50<Pd)throw Pd=0,Fd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ai={};function ji(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mi(e,t,n,r){return new ji(e,t,n,r)}function Ni(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Pi(e,t){var n=e.alternate;return n===null?(n=Mi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Fi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ii(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Ni(r)&&(s=1);else if(typeof r==`string`)s=Xm(e,n,xe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case oe:return e=Mi(31,n,t,a),e.elementType=oe,e.lanes=o,e;case ee:return Li(n.children,a,o,t);case j:s=8,a|=24;break;case te:return e=Mi(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case re:return e=Mi(13,n,t,a),e.elementType=re,e.lanes=o,e;case ie:return e=Mi(19,n,t,a),e.elementType=ie,e.lanes=o,e;case se:case le:return e=a|32,e=Mi(30,n,t,e),e.elementType=le,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case N:s=10;break a;case M:s=9;break a;case ne:s=11;break a;case P:s=14;break a;case ae:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Mi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Li(e,t,n,r){return e=Mi(7,e,r,t),e.lanes=n,e}function Ri(e,t,n){return e=Mi(6,e,null,t),e.lanes=n,e}function zi(e){var t=Mi(18,null,null,0);return t.stateNode=e,t}function Bi(e,t,n){return t=Mi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Vi=new WeakMap;function Hi(e,t){if(typeof e==`object`&&e){var n=Vi.get(e);return n===void 0?(t={value:e,source:t,stack:Fe(t)},Vi.set(e,t),t):n}return{value:e,source:t,stack:Fe(t)}}var Ui=[],Wi=0,Gi=null,Ki=0,qi=[],Ji=0,Yi=null,Xi=1,Zi=``;function Qi(e,t){Ui[Wi++]=Ki,Ui[Wi++]=Gi,Gi=e,Ki=t}function $i(e,t,n){qi[Ji++]=Xi,qi[Ji++]=Zi,qi[Ji++]=Yi,Yi=e;var r=Xi;e=Zi;var i=32-$e(r)-1;r&=~(1<<i),n+=1;var a=32-$e(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Xi=1<<32-$e(t)+i|n<<i|r,Zi=a+e}else Xi=1<<a|n<<i|r,Zi=e}function ea(e){e.return!==null&&(Qi(e,1),$i(e,1,0))}function ta(e){for(;e===Gi;)Gi=Ui[--Wi],Ui[Wi]=null,Ki=Ui[--Wi],Ui[Wi]=null;for(;e===Yi;)Yi=qi[--Ji],qi[Ji]=null,Zi=qi[--Ji],qi[Ji]=null,Xi=qi[--Ji],qi[Ji]=null}function na(e,t){qi[Ji++]=Xi,qi[Ji++]=Zi,qi[Ji++]=Yi,Xi=t.id,Zi=t.overflow,Yi=e}var ra=null,ia=null,B=!1,aa=null,oa=!1,sa=Error(i(519));function ca(e){throw ma(Hi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),sa}function la(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[St]=e,t[Ct]=r,n){case`dialog`:Y(`cancel`,t),Y(`close`,t);break;case`iframe`:case`object`:case`embed`:Y(`load`,t);break;case`video`:case`audio`:for(n=0;n<Hf.length;n++)Y(Hf[n],t);break;case`source`:Y(`error`,t);break;case`img`:case`image`:case`link`:Y(`error`,t),Y(`load`,t);break;case`details`:Y(`toggle`,t);break;case`input`:Y(`invalid`,t),an(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Y(`invalid`,t);break;case`textarea`:Y(`invalid`,t),ln(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||rp(t.textContent,n)?(r.popover!=null&&(Y(`beforetoggle`,t),Y(`toggle`,t)),r.onScroll!=null&&Y(`scroll`,t),r.onScrollEnd!=null&&Y(`scrollend`,t),r.onClick!=null&&(t.onclick=vn),t=!0):t=!1,t||ca(e,!0)}function ua(e){for(ra=e.return;ra;)switch(ra.tag){case 5:case 31:case 13:oa=!1;return;case 27:case 3:oa=!0;return;default:ra=ra.return}}function da(e){if(e!==ra)return!1;if(!B)return ua(e),B=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||_p(e.type,e.memoizedProps)),n=!n),n&&ia&&ca(e),ua(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ia=hm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ia=hm(e)}else t===27?(t=ia,Ep(e.type)?(e=mm,mm=null,ia=e):ia=t):ia=ra?pm(e.stateNode.nextSibling):null;return!0}function fa(){ia=ra=null,B=!1}function pa(){var e=aa;return e!==null&&(_d===null?_d=e:_d.push.apply(_d,e),aa=null),e}function ma(e){aa===null?aa=[e]:aa.push(e)}var ha=ye(null),ga=null,_a=null;function va(e,t,n){L(ha,t._currentValue),t._currentValue=n}function ya(e){e._currentValue=ha.current,be(ha)}function ba(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function xa(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ba(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ba(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ba(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Sa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Vr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===we.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[lh]:e.push(lh))}a=a.return}return e!==null&&xa(t,e,n,r),t.flags|=262144,e!==null}function Ca(e){for(e=e.firstContext;e!==null;){if(!Vr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function wa(e){ga=e,_a=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ta(e){return Da(ga,e)}function Ea(e,t){return ga===null&&wa(e),Da(e,t)}function Da(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},_a===null){if(e===null)throw Error(i(308));_a=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else _a=_a.next=t;return n}var Oa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ka=t.unstable_scheduleCallback,Aa=t.unstable_NormalPriority,ja={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ma(){return{controller:new Oa,data:new Map,refCount:0}}function Na(e){e.refCount--,e.refCount===0&&ka(Aa,function(){e.controller.abort()})}function Pa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Fa=null;function Ia(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var La=null,Ra=0,za=0,Ba=null;function Va(e,t){if(La===null){var n=La=[];Ra=0,za=Lf(),Ba={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ra++,t.then(Ha,Ha),t}function Ha(){if(--Ra===0&&(Fa=null,La!==null)){Ba!==null&&(Ba.status=`fulfilled`);var e=La;La=null,za=0,Ba=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ua(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Wa=F.S;F.S=function(e,t){if(bd=Ve(),typeof t==`object`&&t&&typeof t.then==`function`&&Va(e,t),Fa!==null)for(var n=Cf;n!==null;)Pa(n,Fa),n=n.next;if(n=e.types,n!==null){for(var r=Cf;r!==null;)Pa(r,n),r=r.next;if(za!==0){r=Fa,r===null&&(r=Fa=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Wa!==null&&Wa(e,t)};var Ga=ye(null);function Ka(){var e=Ga.current;return e===null?rd.pooledCache:e}function qa(e,t){t===null?L(Ga,Ga.current):L(Ga,t.pool)}function Ja(){var e=Ka();return e===null?null:{parent:ja._currentValue,pool:e}}var Ya=Error(i(460)),Xa=Error(i(474)),Za=Error(i(542)),Qa={then:function(){}};function $a(e){return e=e.status,e===`fulfilled`||e===`rejected`}function eo(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(vn,vn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,io(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(vn,vn);else{if(e=rd,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,io(e),e}throw no=t,Ya}}function to(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(no=e,Ya):e}}var no=null;function ro(){if(no===null)throw Error(i(459));var e=no;return no=null,e}function io(e){if(e===Ya||e===Za)throw Error(i(483))}var ao=null,oo=0;function so(e){var t=oo;return oo+=1,ao===null&&(ao=[]),eo(ao,e,t)}function co(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function lo(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function uo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Pi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ri(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ee?(e=d(e,t,n.props.children,r,n.key),co(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ae&&to(i)===t.type)?(t=a(t,n.props),co(t,n),t.return=e,t):(t=Ii(n.type,n.key,n.props,null,e.mode,r),co(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Bi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Li(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ri(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Ii(t.type,t.key,t.props,null,e.mode,n),co(n,t),n.return=e,n;case A:return t=Bi(t,e.mode,n),t.return=e,t;case ae:return t=to(t),f(e,t,n)}if(he(t)||fe(t))return t=Li(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,so(t),n);if(t.$$typeof===N)return f(e,Ea(e,t),n);lo(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case ae:return n=to(n),p(e,t,n,r)}if(he(n)||fe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,so(n),r);if(n.$$typeof===N)return p(e,t,Ea(e,n),r);lo(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ae:return r=to(r),m(e,t,n,r,i)}if(he(r)||fe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,so(r),i);if(r.$$typeof===N)return m(e,t,n,Ea(t,r),i);lo(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),B&&Qi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return B&&Qi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),B&&Qi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),B&&Qi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return B&&Qi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),B&&Qi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ee&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ee){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),co(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ae&&to(l)===r.type){n(e,r.sibling),c=a(r,o.props),co(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ee?(c=Li(o.props.children,e.mode,c,o.key),co(c,o),c.return=e,e=c):(c=Ii(o.type,o.key,o.props,null,e.mode,c),co(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Bi(o,e.mode,c),c.return=e,e=c}return s(e);case ae:return o=to(o),_(e,r,o,c)}if(he(o))return h(e,r,o,c);if(fe(o)){if(l=fe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,so(o),c);if(o.$$typeof===N)return _(e,r,Ea(e,o),c);lo(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ri(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{oo=0;var i=_(e,t,n,r);return ao=null,i}catch(t){if(t===Ya||t===Za)throw t;var a=Mi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var fo=uo(!0),po=uo(!1),mo=!1;function ho(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function go(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function _o(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function vo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,nd&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ki(e),Oi(e,null,n),t}return Ti(e,r,t,n),ki(e)}function yo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,gt(e,n)}}function bo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var xo=!1;function So(){if(xo){var e=Ba;if(e!==null)throw e}}function Co(e,t,n,r){xo=!1;var i=e.updateQueue;mo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(G&f)===f:(r&f)===f){f!==0&&f===za&&(xo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:mo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),dd|=o,e.lanes=o,e.memoizedState=d}}function wo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function To(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)wo(n[e],t)}var Eo=ye(null),Do=ye(0);function Oo(e,t){e=ld,L(Do,e),L(Eo,t),ld=e|t.baseLanes}function ko(){L(Do,ld),L(Eo,Eo.current)}function Ao(){ld=Do.current,be(Eo),be(Do)}var jo=ye(null),Mo=null;function No(e){var t=e.alternate;L(Ro,Ro.current&1),L(jo,e),Mo===null&&(t===null||Eo.current!==null||t.memoizedState!==null)&&(Mo=e)}function Po(e){L(Ro,Ro.current),L(jo,e),Mo===null&&(Mo=e)}function Fo(e){e.tag===22?(L(Ro,Ro.current),L(jo,e),Mo===null&&(Mo=e)):Io()}function Io(){L(Ro,Ro.current),L(jo,jo.current)}function Lo(e){be(jo),Mo===e&&(Mo=null),be(Ro)}var Ro=ye(0);function zo(e,t){L(jo,jo.current),L(Ro,t)}function Bo(e){be(Ro),be(jo),Mo===e&&(Mo=null)}function Vo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||um(n)||dm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ho=0,V=null,H=null,Uo=null,Wo=!1,Go=!1,Ko=!1,qo=0,Jo=0,Yo=null,Xo=0;function Zo(){throw Error(i(321))}function Qo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Vr(e[n],t[n]))return!1;return!0}function $o(e,t,n,r,i,a){return Ho=a,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,F.H=e===null||e.memoizedState===null?hc:gc,Ko=!1,a=n(r,i),Ko=!1,Go&&(a=ts(t,n,r,i)),es(e),a}function es(e){F.H=mc;var t=H!==null&&H.next!==null;if(Ho=0,Uo=H=V=null,Wo=!1,Jo=0,Yo=null,t)throw Error(i(300));e===null||Nc||(e=e.dependencies,e!==null&&Ca(e)&&(Nc=!0))}function ts(e,t,n,r){V=e;var a=0;do{if(Go&&(Yo=null),Jo=0,Go=!1,25<=a)throw Error(i(301));if(a+=1,Uo=H=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}F.H=_c,o=t(n,r)}while(Go);return o}function ns(){var e=F.H,t=e.useState()[0];return t=typeof t.then==`function`?ls(t):t,e=e.useState()[0],(H===null?null:H.memoizedState)!==e&&(V.flags|=1024),t}function rs(){var e=qo!==0;return qo=0,e}function is(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function as(e){if(Wo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Wo=!1}Ho=0,Uo=H=V=null,Go=!1,Jo=qo=0,Yo=null}function os(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Uo===null?V.memoizedState=Uo=e:Uo=Uo.next=e,Uo}function ss(){if(H===null){var e=V.alternate;e=e===null?null:e.memoizedState}else e=H.next;var t=Uo===null?V.memoizedState:Uo.next;if(t!==null)Uo=t,H=e;else{if(e===null)throw V.alternate===null?Error(i(467)):Error(i(310));H=e,e={memoizedState:H.memoizedState,baseState:H.baseState,baseQueue:H.baseQueue,queue:H.queue,next:null},Uo===null?V.memoizedState=Uo=e:Uo=Uo.next=e}return Uo}function cs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ls(e){var t=Jo;return Jo+=1,Yo===null&&(Yo=[]),e=eo(Yo,e,t),t=V,(Uo===null?t.memoizedState:Uo.next)===null&&(t=t.alternate,F.H=t===null||t.memoizedState===null?hc:gc),e}function us(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ls(e);if(e.$$typeof===ue)return;if(e.$$typeof===N)return Ta(e)}throw Error(i(438,String(e)))}function ds(e){var t=null,n=V.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=V.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=cs(),V.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ce;return t.index++,n}function fs(e,t){return typeof t==`function`?t(e):t}function ps(e){return ms(ss(),H,e)}function ms(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Ho&f)===f:(G&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===za&&(d=!0);else if((Ho&p)===p){u=u.next,p===za&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,V.lanes|=p,dd|=p;f=u.action,Ko&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,V.lanes|=f,dd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Vr(o,e.memoizedState)&&(Nc=!0,d&&(n=Ba,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function hs(e){var t=ss(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Vr(o,t.memoizedState)||(Nc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function gs(e,t,n){var r=V,a=ss(),o=B;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Vr((H||a).memoizedState,n);if(s&&(a.memoizedState=n,Nc=!0),a=a.queue,Vs(ys.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Uo!==null&&!!(Uo.memoizedState.tag&1),Is(e?9:8,{destroy:void 0},vs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,rd===null)throw Error(i(349));o||Ho&127||_s(r,t,n)}return n}function _s(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t=cs(),V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function vs(e,t,n,r){t.value=n,t.getSnapshot=r,bs(t)&&xs(e)}function ys(e,t,n){return n(function(){bs(t)&&xs(e)})}function bs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Vr(e,n)}catch{return!0}}function xs(e){var t=Di(e,2);t!==null&&zd(t,e,2)}function Ss(e){var t=os();if(typeof e==`function`){var n=e;if(e=n(),Ko){Qe(!0);try{n()}finally{Qe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:e},t}function Cs(e,t,n,r){return e.baseState=n,ms(e,H,typeof r==`function`?r:fs)}function ws(e,t,n,r,a){if(dc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};F.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ts(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ts(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=F.T,o={};o.types=a===null?null:a.types,F.T=o;try{var s=n(i,r),c=F.S;c!==null&&c(o,s),Es(e,t,s)}catch(n){Os(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),F.T=a}}else try{a=n(i,r),Es(e,t,a)}catch(n){Os(e,t,n)}}function Es(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Ds(e,t,n)},function(n){return Os(e,t,n)}):Ds(e,t,n)}function Ds(e,t,n){t.status=`fulfilled`,t.value=n,ks(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ts(e,n)))}function Os(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ks(t),t=t.next;while(t!==r)}e.action=null}function ks(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function As(e,t){return t}function js(e,t){if(B){var n=rd.formState;if(n!==null){a:{var r=V;if(B){if(ia){b:{for(var i=ia,a=oa;i.nodeType!==8;)if(!a||(i=pm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ia=pm(i.nextSibling),r=i.data===`F!`;break a}}ca(r)}r=!1}r&&(t=n[0])}}return n=os(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:As,lastRenderedState:t},n.queue=r,n=cc.bind(null,V,r),r.dispatch=n,r=Ss(!1),a=uc.bind(null,V,!1,r.queue),r=os(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=ws.bind(null,V,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Ms(e){return Ns(ss(),H,e)}function Ns(e,t,n){if(t=ms(e,t,As)[0],e=ps(fs)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ls(t)}catch(e){throw e===Ya?Za:e}else r=t;t=ss();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(V.flags|=2048,Is(9,{destroy:void 0},Ps.bind(null,i,n),null)),[r,a,e]}function Ps(e,t){e.action=t}function Fs(e){var t=ss(),n=H;if(n!==null)return Ns(t,n,e);ss(),t=t.memoizedState,n=ss();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Is(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=V.updateQueue,t===null&&(t=cs(),V.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ls(){return ss().memoizedState}function Rs(e,t,n,r){var i=os();V.flags|=e,i.memoizedState=Is(1|t,{destroy:void 0},n,r===void 0?null:r)}function zs(e,t,n,r){var i=ss();r=r===void 0?null:r;var a=i.memoizedState.inst;H!==null&&r!==null&&Qo(r,H.memoizedState.deps)?i.memoizedState=Is(t,a,n,r):(V.flags|=e,i.memoizedState=Is(1|t,a,n,r))}function Bs(e,t){Rs(8390656,8,e,t)}function Vs(e,t){zs(2048,8,e,t)}function Hs(e){V.flags|=4;var t=V.updateQueue;if(t===null)t=cs(),V.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Us(e){var t=ss().memoizedState;return Hs({ref:t,nextImpl:e}),function(){if(nd&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Ws(e,t){return zs(4,2,e,t)}function Gs(e,t){return zs(4,4,e,t)}function U(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ks(e,t,n){n=n==null?null:n.concat([e]),zs(4,4,U.bind(null,t,e),n)}function qs(){}function Js(e,t){var n=ss();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Qo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ys(e,t){var n=ss();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Qo(t,r[1]))return r[0];if(r=e(),Ko){Qe(!0);try{e()}finally{Qe(!1)}}return n.memoizedState=[r,t],r}function Xs(e,t,n){return n===void 0||Ho&1073741824&&!(G&261930)?e.memoizedState=t:(e.memoizedState=n,e=Ld(),V.lanes|=e,dd|=e,n)}function Zs(e,t,n,r){return Vr(n,t)?n:Eo.current===null?!(Ho&106)||Ho&1073741824&&!(G&261930)?(Nc=!0,e.memoizedState=n):(e=Ld(),V.lanes|=e,dd|=e,t):(e=Xs(e,n,r),Vr(e,t)||(Nc=!0),e)}function Qs(e,t,n,r,i){var a=I.p;I.p=a!==0&&8>a?a:8;var o=F.T,s={};s.types=o===null?null:o.types,F.T=s,uc(e,!1,t,n);try{var c=i(),l=F.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?lc(e,t,Ua(c,r),Id(e)):lc(e,t,r,Id(e))}catch(n){lc(e,t,{then:function(){},status:`rejected`,reason:n},Id())}finally{I.p=a,o!==null&&s.types!==null&&(o.types=s.types),F.T=o}}function $s(){}function ec(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=tc(e).queue;Qs(e,a,t,ge,n===null?$s:function(){return nc(e),n(r)})}function tc(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ge,baseState:ge,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:ge},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function nc(e){var t=tc(e);t.next===null&&(t=e.alternate.memoizedState),lc(e,t.next.queue,{},Id())}function rc(){return Ta(lh)}function ic(){return ss().memoizedState}function ac(){return ss().memoizedState}function oc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Id();e=_o(n);var r=vo(t,e,n);r!==null&&(zd(r,t,n),yo(r,t,n)),t={cache:Ma()},e.payload=t;return}t=t.return}}function sc(e,t,n){var r=Id();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},dc(e)?fc(t,n):(n=Ei(e,t,n,r),n!==null&&(zd(n,e,r),pc(n,t,r)))}function cc(e,t,n){lc(e,t,n,Id())}function lc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(dc(e))fc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Vr(s,o))return Ti(e,t,i,0),rd===null&&wi(),!1}catch{}if(n=Ei(e,t,i,r),n!==null)return zd(n,e,r),pc(n,t,r),!0}return!1}function uc(e,t,n,r){if(r={lane:2,revertLane:Lf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},dc(e)){if(t)throw Error(i(479))}else t=Ei(e,n,r,2),t!==null&&zd(t,e,2)}function dc(e){var t=e.alternate;return e===V||t!==null&&t===V}function fc(e,t){Go=Wo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function pc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,gt(e,n)}}var mc={readContext:Ta,use:us,useCallback:Zo,useContext:Zo,useEffect:Zo,useImperativeHandle:Zo,useLayoutEffect:Zo,useInsertionEffect:Zo,useMemo:Zo,useReducer:Zo,useRef:Zo,useState:Zo,useDebugValue:Zo,useDeferredValue:Zo,useTransition:Zo,useSyncExternalStore:Zo,useId:Zo,useHostTransitionStatus:Zo,useFormState:Zo,useActionState:Zo,useOptimistic:Zo,useMemoCache:Zo,useCacheRefresh:Zo,useEffectEvent:Zo},hc={readContext:Ta,use:us,useCallback:function(e,t){return os().memoizedState=[e,t===void 0?null:t],e},useContext:Ta,useEffect:Bs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Rs(4194308,4,U.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Rs(4194308,4,e,t)},useInsertionEffect:function(e,t){Rs(4,2,e,t)},useMemo:function(e,t){var n=os();t=t===void 0?null:t;var r=e();if(Ko){Qe(!0);try{e()}finally{Qe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=os();if(n!==void 0){var i=n(t);if(Ko){Qe(!0);try{n(t)}finally{Qe(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=sc.bind(null,V,e),[r.memoizedState,e]},useRef:function(e){var t=os();return e={current:e},t.memoizedState=e},useState:function(e){e=Ss(e);var t=e.queue,n=cc.bind(null,V,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:qs,useDeferredValue:function(e,t){return Xs(os(),e,t)},useTransition:function(){var e=Ss(!1);return e=Qs.bind(null,V,e.queue,!0,!1),os().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=V,a=os();if(B){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),rd===null)throw Error(i(349));G&127||_s(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Bs(ys.bind(null,r,o,e),[e]),r.flags|=2048,Is(9,{destroy:void 0},vs.bind(null,r,o,n,t),null),n},useId:function(){var e=os(),t=rd.identifierPrefix;if(B){var n=Zi,r=Xi;n=(r&~(1<<32-$e(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=qo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Xo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:rc,useFormState:js,useActionState:js,useOptimistic:function(e){var t=os();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=uc.bind(null,V,!0,n),n.dispatch=t,[e,t]},useMemoCache:ds,useCacheRefresh:function(){return os().memoizedState=oc.bind(null,V)},useEffectEvent:function(e){var t=os(),n={impl:e};return t.memoizedState=n,function(){if(nd&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},gc={readContext:Ta,use:us,useCallback:Js,useContext:Ta,useEffect:Vs,useImperativeHandle:Ks,useInsertionEffect:Ws,useLayoutEffect:Gs,useMemo:Ys,useReducer:ps,useRef:Ls,useState:function(){return ps(fs)},useDebugValue:qs,useDeferredValue:function(e,t){return Zs(ss(),H.memoizedState,e,t)},useTransition:function(){var e=ps(fs)[0],t=ss().memoizedState;return[typeof e==`boolean`?e:ls(e),t]},useSyncExternalStore:gs,useId:ic,useHostTransitionStatus:rc,useFormState:Ms,useActionState:Ms,useOptimistic:function(e,t){return Cs(ss(),H,e,t)},useMemoCache:ds,useCacheRefresh:ac,useEffectEvent:Us},_c={readContext:Ta,use:us,useCallback:Js,useContext:Ta,useEffect:Vs,useImperativeHandle:Ks,useInsertionEffect:Ws,useLayoutEffect:Gs,useMemo:Ys,useReducer:hs,useRef:Ls,useState:function(){return hs(fs)},useDebugValue:qs,useDeferredValue:function(e,t){var n=ss();return H===null?Xs(n,e,t):Zs(n,H.memoizedState,e,t)},useTransition:function(){var e=hs(fs)[0],t=ss().memoizedState;return[typeof e==`boolean`?e:ls(e),t]},useSyncExternalStore:gs,useId:ic,useHostTransitionStatus:rc,useFormState:Fs,useActionState:Fs,useOptimistic:function(e,t){var n=ss();return H===null?(n.baseState=e,[e,n.queue.dispatch]):Cs(n,H,e,t)},useMemoCache:ds,useCacheRefresh:ac,useEffectEvent:Us};function vc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var yc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Id(),i=_o(r);i.payload=t,n!=null&&(i.callback=n),t=vo(e,i,r),t!==null&&(zd(t,e,r),yo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Id(),i=_o(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=vo(e,i,r),t!==null&&(zd(t,e,r),yo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Id(),r=_o(n);r.tag=2,t!=null&&(r.callback=t),t=vo(e,r,n),t!==null&&(zd(t,e,n),yo(t,e,n))}};function bc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Hr(n,r)||!Hr(i,a):!0}function xc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&yc.enqueueReplaceState(t,t.state,null)}function Sc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Cc(e){bi(e)}function wc(e){console.error(e)}function Tc(e){bi(e)}function Ec(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Dc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Oc(e,t,n){return n=_o(n),n.tag=3,n.payload={element:null},n.callback=function(){Ec(e,t)},n}function kc(e){return e=_o(e),e.tag=3,e}function Ac(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Dc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Dc(t,n,r),typeof i!=`function`&&(Cd===null?Cd=new Set([this]):Cd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function jc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Sa(t,n,a,!0),n=jo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Mo===null?Xd():n.alternate===null&&ud===0&&(ud=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Qa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),_f(e,r,a)),!1;case 22:return n.flags|=65536,r===Qa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),_f(e,r,a)),!1}throw Error(i(435,n.tag))}return _f(e,r,a),Xd(),!1}if(B)return t=jo.current,t===null?(r!==sa&&(t=Error(i(423),{cause:r}),ma(Hi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Hi(r,n),a=Oc(e.stateNode,r,a),bo(e,a),ud!==4&&(ud=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==sa&&(e=Error(i(422),{cause:r}),ma(Hi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Hi(o,n),gd===null?gd=[o]:gd.push(o),ud!==4&&(ud=2),t===null)return!0;r=Hi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Oc(n.stateNode,r,e),bo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(Cd===null||!Cd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=kc(a),Ac(a,e,n,r),bo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Mc=Error(i(461)),Nc=!1;function Pc(e,t,n,r){t.child=e===null?po(t,null,n,r):fo(t,e.child,n,r)}function Fc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return wa(t),r=$o(e,t,n,o,a,i),s=rs(),e!==null&&!Nc?(is(e,t,i),ll(e,t,i)):(B&&s&&ea(t),t.flags|=1,Pc(e,t,r,i),t.child)}function Ic(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Ni(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Lc(e,t,a,r,i)):(e=Ii(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!ul(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Hr:n,n(o,r)&&e.ref===t.ref)return ll(e,t,i)}return t.flags|=1,e=Pi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Lc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Hr(a,r)&&e.ref===t.ref){if(Nc=!1,t.pendingProps=r=a,ul(e,i))e.flags&131072&&(Nc=!0);else return t.lanes=e.lanes,ll(e,t,i)}}return Gc(e,t,n,r,i)}function Rc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Bc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&qa(t,a===null?null:a.cachePool),a===null?ko():Oo(t,a),Fo(t);else return r=t.lanes=536870912,Bc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&qa(t,null),ko(),Io()):(qa(t,a.cachePool),Oo(t,a),Io(),t.memoizedState=null);return Pc(e,t,i,n),t.child}function zc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Bc(e,t,n,r,i){var a=Ka();return a=a===null?null:{parent:ja._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&qa(t,null),ko(),Fo(t),e!==null&&Sa(e,t,r,!0),t.childLanes=i,null}function Vc(e,t){return t=el({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Hc(e,t,n){return fo(t,e.child,null,n),e=Vc(t,t.pendingProps),e.flags|=2,Lo(t),t.memoizedState=null,e}function Uc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(B){if(r.mode===`hidden`)return e=Vc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},zc(null,e);if(Po(t),(e=ia)?(e=lm(e,oa),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Yi===null?null:{id:Xi,overflow:Zi},retryLane:536870912,hydrationErrors:null},n=zi(e),n.return=t,t.child=n,ra=t,ia=null)):e=null,e===null)throw ca(t);return t.lanes=536870912,null}return Vc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Po(t),a){if(t.flags&256)t.flags&=-257,t=Hc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Nc||Sa(e,t,n,!1),a=(n&e.childLanes)!==0,Nc||a){if(Eo.current===null){if(r=rd,r!==null&&(s=_t(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Di(e,s),zd(r,e,s),Mc;Xd()}t=Hc(e,t,n)}else e=o.treeContext,ia=pm(s.nextSibling),ra=t,B=!0,aa=null,oa=!1,e!==null&&na(t,e),t=Vc(t,r),t.flags|=134221824;return t}return e=Pi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Wc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Gc(e,t,n,r,i){return wa(t),n=$o(e,t,n,r,void 0,i),r=rs(),e!==null&&!Nc?(is(e,t,i),ll(e,t,i)):(B&&r&&ea(t),t.flags|=1,Pc(e,t,n,i),t.child)}function Kc(e,t,n,r,i,a){return wa(t),t.updateQueue=null,n=ts(t,r,n,i),es(e),r=rs(),e!==null&&!Nc?(is(e,t,a),ll(e,t,a)):(B&&r&&ea(t),t.flags|=1,Pc(e,t,n,a),t.child)}function qc(e,t,n,r,i){if(wa(t),t.stateNode===null){var a=Ai,o=n.contextType;typeof o==`object`&&o&&(a=Ta(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=yc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},ho(t),o=n.contextType,a.context=typeof o==`object`&&o?Ta(o):Ai,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(vc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&yc.enqueueReplaceState(a,a.state,null),Co(t,r,a,i),So(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Sc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ai,typeof u==`object`&&u&&(o=Ta(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&xc(t,a,r,o),mo=!1;var f=t.memoizedState;a.state=f,Co(t,r,a,i),So(),l=t.memoizedState,s||f!==l||mo?(typeof d==`function`&&(vc(t,n,d,r),l=t.memoizedState),(c=mo||bc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,go(e,t),o=t.memoizedProps,u=Sc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ai,typeof l==`object`&&l&&(c=Ta(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&xc(t,a,r,c),mo=!1,f=t.memoizedState,a.state=f,Co(t,r,a,i),So();var p=t.memoizedState;o!==d||f!==p||mo||e!==null&&e.dependencies!==null&&Ca(e.dependencies)?(typeof s==`function`&&(vc(t,n,s,r),p=t.memoizedState),(u=mo||bc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Ca(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Wc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=fo(t,e.child,null,i),t.child=fo(t,null,n,i)):Pc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=ll(e,t,i),e}function Jc(e,t,n,r){return fa(),t.flags|=256,Pc(e,t,n,r),t.child}var Yc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Xc(e){return{baseLanes:e,cachePool:Ja()}}function Zc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=md),e}function Qc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Ro.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(B){if(i?No(t):Io(),(e=ia)?(e=lm(e,oa),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Yi===null?null:{id:Xi,overflow:Zi},retryLane:536870912,hydrationErrors:null},n=zi(e),n.return=t,t.child=n,ra=t,ia=null)):e=null,e===null)throw ca(t);return t.lanes=dm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Io(),i=t.mode,a=el({mode:`hidden`,children:a},i),r=Li(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Xc(n),r.childLanes=Zc(e,o,n),t.memoizedState=Yc,zc(null,r)):(No(t),$c(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return nl(e,t,a,o,r,c,s,n)}return i?(Io(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Pi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Li(i,a,n,null),i.flags|=2):i=Pi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,zc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Xc(n):(a=i.cachePool,a===null?a=Ja():(s=ja._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Zc(e,o,n),t.memoizedState=Yc,zc(e.child,r)):(No(t),n=e.child,e=n.sibling,n=Pi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function $c(e,t){return t=el({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function el(e,t){return e=Mi(22,e,null,t),e.lanes=0,e}function tl(e,t,n){return fo(t,e.child,null,n),e=$c(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function nl(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(No(t),t.flags&=-257,tl(e,t,c)):t.memoizedState===null?(Io(),o=a.fallback,s=t.mode,a=el({mode:`visible`,children:a.children},s),o=Li(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,fo(t,e.child,null,c),a=t.child,a.memoizedState=Xc(c),a.childLanes=Zc(e,r,c),t.memoizedState=Yc,zc(null,a)):(Io(),t.child=e.child,t.flags|=128,null);if(No(t),dm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ma({value:a,source:null,stack:null})),tl(e,t,c)}if(Nc||Sa(e,t,c,!1),r=(c&e.childLanes)!==0,Nc||r){if(Eo.current!==null)return tl(e,t,c);if(r=rd,r!==null&&(a=_t(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Di(e,a),zd(r,e,a),Mc;return um(o)||Xd(),tl(e,t,c)}return um(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,ia=pm(o.nextSibling),ra=t,B=!0,aa=null,oa=!1,e!==null&&na(t,e),t=$c(t,a.children),t.flags|=134221824,t)}function rl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ba(e.return,t,n)}function il(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Vo(n)===null&&(t=e),e=e.sibling}return t}function al(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function ol(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function sl(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Ro.current;if(t.flags&128)return zo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,zo(t,o),i===`backwards`&&e!==null?(ol(e),Pc(e,t,r,n),ol(e)):Pc(e,t,r,n),r=B?Ki:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&rl(e,n,t);else if(e.tag===19)rl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=il(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,ol(t)),al(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Vo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}al(t,!0,n,null,a,r);break;case`together`:al(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=il(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),al(t,!1,i,n,a,r)}return t.child}function cl(e,t,n){var r=t.pendingProps;return va(t,t.type,r.value),Pc(e,t,r.children,n),t.child}function ll(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Sa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Pi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Pi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ul(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Ca(e)))}function dl(e,t,n){switch(t.tag){case 3:Te(t,t.stateNode.containerInfo),va(t,ja,e.memoizedState.cache),fa();break;case 27:case 5:De(t);break;case 4:Te(t,t.stateNode.containerInfo);break;case 10:va(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Po(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return No(t),t.flags|=128,null;r=Sa(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Qc(e,t,n):(No(t),e=ll(e,t,n),e===null?null:e.sibling)}No(t);break;case 19:if(t.flags&128)return sl(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(Sa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return sl(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),zo(t,Ro.current),r)break;return null;case 22:return t.lanes=0,Rc(e,t,n,t.pendingProps);case 24:va(t,ja,e.memoizedState.cache)}return ll(e,t,n)}function fl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Nc=!0;else{if(!ul(e,n)&&!(t.flags&128))return Nc=!1,dl(e,t,n);Nc=!!(e.flags&131072)}}else Nc=!1,B&&t.flags&1048576&&$i(t,Ki,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=to(t.elementType),t.type=e,typeof e==`function`)Ni(e)?(r=Sc(e,r),t.tag=1,t=qc(null,t,e,r,n)):(t.tag=0,t=Gc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ne){t.tag=11,t=Fc(null,t,e,r,n);break a}if(a===P){t.tag=14,t=Ic(null,t,e,r,n);break a}if(a===N){t.tag=10,t.type=e,t=cl(null,t,n);break a}}throw t=me(e)||e,Error(i(306,t,``))}}return t;case 0:return Gc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Sc(r,t.pendingProps),qc(e,t,r,a,n);case 3:a:{if(Te(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,go(e,t),Co(t,r,null,n);var s=t.memoizedState;if(r=s.cache,va(t,ja,r),r!==o.cache&&xa(t,[ja],n,!0),So(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Jc(e,t,r,n);break a}if(r!==a){a=Hi(Error(i(424)),t),ma(a),t=Jc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ia=pm(e.firstChild),ra=t,B=!0,aa=null,oa=!0,n=po(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(fa(),r===a){t=ll(e,t,n);break a}Pc(e,t,r,n)}t=t.child}return t;case 26:return Wc(e,t),e===null?(n=Lm(t.type,null,t.pendingProps,null))?t.memoizedState=n:B||(t.stateNode=gp(t.type,t.pendingProps,Ce.current,t)):t.memoizedState=Lm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return De(t),e===null&&B&&(r=t.stateNode=ym(t.type,t.pendingProps,Ce.current),ra=t,oa=!0,a=ia,Ep(t.type)?(mm=a,ia=pm(r.firstChild)):ia=a),Pc(e,t,t.pendingProps.children,n),Wc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&B&&((a=r=ia)&&(r=sm(r,t.type,t.pendingProps,oa),r===null?a=!1:(t.stateNode=r,ra=t,ia=pm(r.firstChild),oa=!1,a=!0)),a||ca(t)),De(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,_p(a,o)?r=null:s!==null&&_p(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=$o(e,t,ns,null,null,n),lh._currentValue=a),Wc(e,t),Pc(e,t,r,n),t.child;case 6:return e===null&&B&&((e=n=ia)&&(n=cm(n,t.pendingProps,oa),n===null?e=!1:(t.stateNode=n,ra=t,ia=null,e=!0)),e||ca(t)),null;case 13:return Qc(e,t,n);case 4:return Te(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=fo(t,null,r,n):Pc(e,t,r,n),t.child;case 11:return Fc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Wc(e,t),Pc(e,t,r,n),t.child;case 8:return Pc(e,t,t.pendingProps.children,n),t.child;case 12:return Pc(e,t,t.pendingProps.children,n),t.child;case 10:return cl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,wa(t),a=Ta(a),r=r(a),t.flags|=1,Pc(e,t,r,n),t.child;case 14:return Ic(e,t,t.type,t.pendingProps,n);case 15:return Lc(e,t,t.type,t.pendingProps,n);case 19:return sl(e,t,n);case 31:return Uc(e,t,n);case 22:return Rc(e,t,n,t.pendingProps);case 24:return wa(t),r=Ta(ja),e===null?(a=Ka(),a===null&&(a=rd,o=Ma(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},ho(t),va(t,ja,a)):((e.lanes&n)!==0&&(go(e,t),Co(t,null,null,n),So()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,va(t,ja,r),r!==a.cache&&xa(t,[ja],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),va(t,ja,r))),Pc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:B&&ea(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Wc(e,t),Pc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function pl(e){e.flags|=4}function ml(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Zm(t,r):Zm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(qd())e.flags|=8192;else throw no=Qa,Xa}}else e.flags&=-16777217}function hl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Z(t)){if(qd())e.flags|=8192;else throw no=Qa,Xa}}function gl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:dt(),e.lanes|=t,hd|=t)}function _l(e,t){if(!B)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function vl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function yl(e,t,n){var r=t.pendingProps;switch(ta(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vl(t),null;case 1:return vl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ya(ja),Ee(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(da(t)?pl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,pa())),vl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(pl(t),o===null?(vl(t),ml(t,a,null,r,n)):(vl(t),hl(t,o))):o?o===e.memoizedState?(vl(t),t.flags&=-16777217):(pl(t),vl(t),hl(t,o)):(e=e.memoizedProps,e!==r&&pl(t),vl(t),ml(t,a,e,r,n)),null;case 27:if(Oe(t),n=Ce.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&pl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return vl(t),t.subtreeFlags&=-33554433,null}e=xe.current,da(t)?la(t,e):(e=ym(a,r,n),t.stateNode=e,pl(t))}return vl(t),t.subtreeFlags&=-33554433,null;case 5:if(Oe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&pl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return vl(t),t.subtreeFlags&=-33554433,null}if(o=xe.current,da(t))la(t,o);else{var s=pp(Ce.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[St]=t,o[Ct]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(op(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&pl(t)}}return vl(t),t.subtreeFlags&=-33554433,ml(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&pl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Ce.current,da(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ra,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[St]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||rp(e.nodeValue,n)),e||ca(t,!0)}else e=pp(e).createTextNode(r),e[St]=t,t.stateNode=e}return vl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=da(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[St]=t}else fa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;vl(t),e=!1}else n=pa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Lo(t),t):(Lo(t),null);if(t.flags&128)throw Error(i(558))}return vl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=da(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[St]=t}else fa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;vl(t),a=!1}else a=pa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Lo(t),t):(Lo(t),null)}return Lo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),gl(t,t.updateQueue),vl(t),null);case 4:return Ee(),e===null&&qf(t.stateNode.containerInfo),t.flags|=67108864,vl(t),null;case 10:return ya(t.type),vl(t),null;case 19:if(Bo(t),r=t.memoizedState,r===null)return vl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)_l(r,!1);else{if(ud!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Vo(e),o!==null){for(t.flags|=128,_l(r,!1),e=o.updateQueue,t.updateQueue=e,gl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Fi(n,e),n=n.sibling;return zo(t,Ro.current&1|2),B&&Qi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ve()>xd&&(t.flags|=128,a=!0,_l(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Vo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,gl(t,e),_l(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!B)return vl(t),null}else 2*Ve()-r.renderingStartTime>xd&&n!==536870912&&(t.flags|=128,a=!0,_l(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ve(),e.sibling=null,o=Ro.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||B?zo(t,o):(n=o,L(jo,t),L(Ro,n),Mo===null&&(Mo=t)),B&&Qi(t,r.treeForkCount),e}return vl(t),null;case 22:case 23:return Lo(t),Ao(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(vl(t),t.subtreeFlags&6&&(t.flags|=8192)):vl(t),n=t.updateQueue,n!==null&&gl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&be(Ga),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ya(ja),vl(t),null;case 25:return null;case 30:return t.flags|=33554432,vl(t),null}throw Error(i(156,t.tag))}function bl(e,t){switch(ta(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ya(ja),Ee(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Oe(t),null;case 31:if(t.memoizedState!==null){if(Lo(t),t.alternate===null)throw Error(i(340));fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Lo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Bo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ee(),null;case 10:return ya(t.type),null;case 22:case 23:return Lo(t),Ao(),e!==null&&be(Ga),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ya(ja),null;case 25:return null;default:return null}}function xl(e,t){switch(ta(t),t.tag){case 3:ya(ja),Ee();break;case 26:case 27:case 5:Oe(t);break;case 4:Ee();break;case 31:t.memoizedState!==null&&Lo(t);break;case 13:Lo(t);break;case 19:Bo(t);break;case 10:ya(t.type);break;case 22:case 23:Lo(t),Ao(),e!==null&&be(Ga);break;case 24:ya(ja)}}function Sl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){J(t,t.return,e)}}function Cl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){J(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){J(t,t.return,e)}}function wl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{To(t,n)}catch(t){J(e,e.return,t)}}}function Tl(e,t,n){n.props=Sc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){J(e,t,n)}}function El(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=_i(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Rp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new zp(e);m(e.child,!1,nm,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){J(e,t,n)}}function Dl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){J(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){J(e,t,n)}else n.current=null}}function Ol(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)im(e.stateNode,t[n])}function kl(e){for(var t=e.return;t!==null&&(Ml(t)&&im(e.stateNode,t.stateNode),!jl(t));)t=t.return}function Al(e){for(var t=e.return;t!==null&&(Ml(t)&&am(e.stateNode,t.stateNode),!jl(t));)t=t.return}function jl(e){return e.tag===5||e.tag===3||e.tag===27}function Ml(e){return e&&e.tag===7&&e.stateNode!==null}function Nl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){J(e,e.return,t)}}function Pl(e,t,n){try{var r=e.stateNode;cp(r,e.type,n,t),r[Ct]=t}catch(t){J(e,e.return,t)}}function Fl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ep(e.type)||e.tag===4}function Il(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Fl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ep(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ll(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=vn)),Ol(e,r),Gt=!0;else if(i!==4&&(i===27&&(Ol(e,r),r=null,Ep(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Ll(e,t,n,r),e=e.sibling;e!==null;)Ll(e,t,n,r),e=e.sibling}function Rl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Ol(e,r),Gt=!0;else if(i!==4&&(i===27&&(Ol(e,r),r=null,Ep(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Rl(e,t,n,r),e=e.sibling;e!==null;)Rl(e,t,n,r),e=e.sibling}function zl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);op(t,r,n),t[St]=e,t[Ct]=n}catch(t){J(e,e.return,t)}}var Bl=!1,Vl=null;function Hl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Bl=!0)}var Ul=null;function Wl(){var e=Ul;return Ul=null,e}var Gl=0;function Kl(e,t,n,r,i){return Gl=0,ql(e.child,t,n,r,i)}function ql(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Mp(o);r.push(s),s.view&&(a=!0)}else a||Mp(o).view&&(a=!0);Bl=!0,kp(o,Gl===0?t:t+`_`+Gl,n),Gl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||ql(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Jl(e,t){for(;e!==null;)e.tag===5?Ap(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Jl(e.child,t),e=e.sibling}function Yl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Yl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=yi(t.default,t.share),t!==`none`&&(Kl(e,n,t,null,!1)||Jl(e.child,!1))}e=e.sibling}}function Xl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=_i(r,n),a=yi(r.default,n.paired?r.share:r.enter);a===`none`?Yl(e):Kl(e,i,a,null,!1)?(Yl(e),n.paired||t||Rd(e,r.onEnter)):Jl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Xl(e,t),e=e.sibling;else Yl(e)}function Zl(e){if(Vl!==null&&Vl.size!==0){var t=Vl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=yi(n.default,n.share);if(a!==`none`&&(Kl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Rd(e,n.onShare)):Jl(e.child,!1)),t.delete(r),t.size===0)break}}}Zl(e)}e=e.sibling}}}function Ql(e){if(e.tag===30){var t=e.memoizedProps,n=_i(t,e.stateNode),r=Vl===null?void 0:Vl.get(n),i=yi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Kl(e,n,i,null,!1)?r===void 0?Rd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Vl.delete(n),Rd(e,t.onShare)):Jl(e.child,!1)),Vl!==null&&Zl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e),e=e.sibling;else Vl!==null&&Zl(e)}function $l(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=_i(t,e.stateNode);t=yi(t.default,t.update),e.flags&=-5,t!==`none`&&Kl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&$l(e);e=e.sibling}}function eu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Jl(e.child,!1))}eu(e)}e=e.sibling}}function tu(e){if(e.tag===30)e.stateNode.paired=null,Jl(e.child,!1),eu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)tu(e),e=e.sibling;else eu(e)}function nu(e){for(e=e.child;e!==null;)e.tag===30?Jl(e.child,!1):e.subtreeFlags&33554432&&nu(e),e=e.sibling}function ru(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Gl<a.length){var l=a[Gl],u=Mp(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&kp(c,Gl===0?n:n+`_`+Gl,i),s&&e.flags&4||(Ul===null&&(Ul=[]),Ul.push(c,Gl===0?r:r+`_`+Gl,t.memoizedProps)),Gl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:ru(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function iu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=_i(n,r),a=yi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Np)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Gl=0,i=ru(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Rd(e,n.onUpdate))}else e.subtreeFlags&33554432&&iu(e,t);e=e.sibling}}var au=!1,ou=!1,su=!1,cu=!1,lu=typeof WeakSet==`function`?WeakSet:Set,uu=null,du=!1,fu=!1,pu=!1,mu=!1;function hu(e,t,n){if(e=e.containerInfo,dp=vh,e=qr(e),Jr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(fp={focusedElem:e,selectionRange:r},vh=!1,n=(n&335544064)===n,uu=t,t=n?9270:1024;uu!==null;){if(e=uu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Ql(r[a]);if(e.alternate===null&&e.flags&2)n&&Hl(e),gu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Ql(r),gu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Hl(e),gu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,uu=r):(n&&$l(e),gu(n))}}Vl=null}function gu(e){for(;uu!==null;){var t=uu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=Sc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){J(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)om(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:om(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=_i(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=yi(a.default,a.update),a!==`none`&&Kl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,uu=r;break}uu=t.return}}function _u(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Lu(e,n),r&4&&Sl(5,n);break;case 1:if(Lu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){J(n,n.return,e)}else{var i=Sc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){J(n,n.return,e)}}}r&64&&wl(n),r&512&&El(n,n.return);break;case 3:if(Lu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{To(e,t)}catch(e){J(n,n.return,e)}}break;case 27:t===null&&r&4&&zl(n);case 26:case 5:Lu(e,n),t===null&&r&4&&Nl(n),r&512&&El(n,n.return);break;case 12:Lu(e,n);break;case 31:Lu(e,n),r&4&&Eu(e,n);break;case 13:Lu(e,n),r&4&&Du(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=bf.bind(null,n),fm(e,n))));break;case 22:if(r=n.memoizedState!==null||au,!r){var a=t!==null&&t.memoizedState!==null||ou;t=au,i=ou,au=r,(ou=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),zu(e,n,r)):Lu(e,n),au=t,ou=i}break;case 30:Lu(e,n),r&512&&El(n,n.return);break;case 7:r&512&&El(n,n.return);default:Lu(e,n)}}function vu(e,t){for(e=e.child;e!==null;)yu(e,t),e=e.sibling}function yu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){J(e,e.return,t)}bu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,Gt=!0}catch(t){J(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Op(s,!0):Op(e.stateNode,!1)}catch(t){J(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&vu(e,t);break;default:vu(e,t)}}function bu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:yu(n,r);break a;case 22:n.memoizedState===null&&bu(n,r);break a;default:bu(n,r)}}e=e.sibling}}function xu(e){var t=e.alternate;t!==null&&(e.alternate=null,xu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&jt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Su=null,Cu=!1;function wu(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(Ze&&typeof Ze.onCommitFiberUnmount==`function`)try{Ze.onCommitFiberUnmount(Xe,n)}catch{}switch(n.tag){case 26:ou||Dl(n,t),wu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!ou&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ou||Dl(n,t),Al(n);var r=Su,i=Cu;Ep(n.type)&&(Su=n.stateNode,Cu=!1),wu(e,t,n),bm(n.stateNode,n.type,n.memoizedProps),Su=r,Cu=i;break;case 5:ou||Dl(n,t),Al(n);case 6:if(n.tag===6&&Al(n),r=Su,i=Cu,Su=null,wu(e,t,n),Su=r,Cu=i,Su!==null){if(Cu)try{(Su.nodeType===9?Su.body:Su.nodeName===`HTML`?Su.ownerDocument.body:Su).removeChild(n.stateNode),Gt=!0}catch(e){J(n,t,e)}else try{Su.removeChild(n.stateNode),Gt=!0}catch(e){J(n,t,e)}}break;case 18:Su!==null&&(Cu?(e=Su,Dp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Wh(e)):Dp(Su,n.stateNode));break;case 4:r=Su,i=Cu,Su=n.stateNode.containerInfo,Cu=!0,wu(e,t,n),Su=r,Cu=i;break;case 0:case 11:case 14:case 15:Cl(2,n,t),ou||Cl(4,n,t),wu(e,t,n);break;case 1:ou||(Dl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Tl(n,t,r)),wu(e,t,n);break;case 21:wu(e,t,n);break;case 22:ou=(r=ou)||n.memoizedState!==null,wu(e,t,n),ou=r;break;case 30:Dl(n,t),wu(e,t,n);break;case 7:ou||Dl(n,t),wu(e,t,n);break;default:wu(e,t,n)}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Wh(e)}catch(e){J(t,t.return,e)}}}function Du(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Wh(e)}catch(e){J(t,t.return,e)}}function Ou(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new lu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new lu),t;default:throw Error(i(435,e.tag))}}function ku(e,t){var n=Ou(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=xf.bind(null,e,t);t.then(r,r)}})}function Au(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Ep(l.type)){Su=l.stateNode,Cu=!1;break a}break;case 5:Su=l.stateNode,Cu=!1;break a;case 3:case 4:Su=l.stateNode.containerInfo,Cu=!0;break a}l=l.return}if(Su===null)throw Error(i(160));Tu(s,c,o),Su=null,Cu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Mu(t,e,n),t=t.sibling}var ju=null;function Mu(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Au(t,e,n),Nu(e),a&4&&(Cl(3,e,e.return),Sl(3,e),Cl(5,e,e.return));break;case 1:Au(t,e,n),Nu(e),a&512&&(ou||r===null||Dl(r,r.return)),a&64&&au&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ju,Au(t,e,n),Nu(e),a&512&&(ou||r===null||Dl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(au)e.stateNode=gp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[kt]||r[St]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),op(r,t,n),r[St]=e,Ft(r),t=r;break a;case`link`:if(o=Jm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Jm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[St]=e,Ft(r),t=r}e.stateNode=t}}else au||Ym(o,e.type,e.stateNode)}else e.stateNode=Wm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Pl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||ou||t.parentNode.removeChild(t)):a.count--,n===null?au||Ym(o,e.type,e.stateNode):Wm(o,n,e.memoizedProps))}break;case 27:Au(t,e,n),Nu(e),a&512&&(ou||r===null||Dl(r,r.return)),r!==null&&a&4&&Pl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=su,su=!1,Au(t,e,n),su=o,Nu(e),a&512&&(ou||r===null||Dl(r,r.return)),e.flags&32){t=e.stateNode;try{un(t,``),Gt=!0}catch(t){J(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Pl(e,t,r===null?t:r.memoizedProps)),a&1024&&(cu=!0);break;case 6:if(Au(t,e,n),Nu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Gt=!0}catch(t){J(e,e.return,t)}}break;case 3:if(Gt=!1,qm=null,o=ju,ju=wm(t.containerInfo),Au(t,e,n),ju=o,Nu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Wh(t.containerInfo)}catch(t){J(e,e.return,t)}cu&&(cu=!1,Pu(e)),Gt=!1;break;case 4:a=su,su=au,r=Kt(),o=ju,ju=wm(e.stateNode.containerInfo),Au(t,e,n),Nu(e),ju=o,Gt&&fu&&(pu=!0),Gt=r,su=a;break;case 12:Au(t,e,n),Nu(e);break;case 31:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:Au(t,e,n),Nu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(yd=Ve()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=au,l=ou,u=su;au=c||o,su=u||o,ou=l||s,Au(t,e,n),ou=l,su=u,au=c,Nu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||au||ou||(t=s||ou,n=au,r=ou,au=o||au,ou=t,Ru(e,2),au=n,ou=r),!o&&su||vu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:a&512&&(ou||r===null||Dl(r,r.return)),a=Kt(),o=fu,s=(n&335544064)===n,c=e.memoizedProps,fu=s&&yi(c.default,c.update)!==`none`,Au(t,e,n),Nu(e),s&&r!==null&&Gt&&(e.flags|=4),fu=o,Gt=a;break;case 21:break;case 7:a&512&&(ou||r===null||Dl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Au(t,e,n),Nu(e)}}function Nu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Fl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Ml(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(jl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Rl(e,Il(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(un(l,``),n.flags&=-33),Rl(e,Il(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Ll(e,Il(e),u,s);break;default:throw Error(i(161))}}catch(t){J(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,vh=!0,t.reset(),vh=!1),e=e.sibling}}function Fu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Iu(t,e),t=t.sibling;else iu(t,!1)}function Iu(e,t){var n=e.alternate;if(n===null)Xl(e,!1);else switch(e.tag){case 3:if(mu=du=!1,Wl(),Fu(t,e),!du&&!pu){if(e=Ul,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ap(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),mu=!0}Ul=null;break;case 5:Fu(t,e);break;case 4:r=du,du=!1,Fu(t,e),du&&(pu=!0),du=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Fu(t,e):Xl(e,!1));break;case 30:r=du,i=Wl(),du=!1,Fu(t,e),du&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=_i(a,o),o=_i(n.memoizedProps,o);var s=yi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Gl=0,t=ru(e,n,t,o,s,a,!0),Gl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Rd(e,e.memoizedProps.onUpdate),Ul=i):i!==null&&(i.push.apply(i,Ul),Ul=i),du=e.flags&32?!0:r;break;default:Fu(t,e)}}function Lu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)_u(e,t.alternate,t),t=t.sibling}function Ru(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Cl(4,n,n.return),Ru(n,r);break;case 1:Dl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Tl(n,n.return,i),Ru(n,r);break;case 27:r&2&&bm(n.stateNode,n.type,n.memoizedProps);case 5:Dl(n,n.return),n.tag!==5&&n.tag!==27||Al(n),Ru(n,r);break;case 6:Al(n);break;case 26:Dl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||ou||i.parentNode.removeChild(i),Ru(n,r);break;case 22:n.memoizedState===null&&Ru(n,r);break;case 30:Dl(n,n.return),Ru(n,r);break;case 7:Dl(n,n.return);default:Ru(n,r)}e=e.sibling}}function zu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:zu(i,a,n),Sl(4,a);break;case 1:if(zu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){J(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)wo(l[i],c)}catch(e){J(r,r.return,e)}}s&&o&64&&wl(a),El(a,a.return);break;case 27:n&2&&zl(a);case 5:a.tag!==5&&a.tag!==27||kl(a),zu(i,a,n),s&&r===null&&o&4&&Nl(a),El(a,a.return);break;case 6:kl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||au||Ym(wm(c.ownerDocument),a.type,c),zu(i,a,n),s&&r===null&&o&4&&Nl(a),El(a,a.return);break;case 12:zu(i,a,n);break;case 31:zu(i,a,n),s&&o&4&&Eu(i,a);break;case 13:zu(i,a,n),s&&o&4&&Du(i,a);break;case 22:a.memoizedState===null&&zu(i,a,n),El(a,a.return);break;case 30:zu(i,a,n),El(a,a.return);break;case 7:El(a,a.return);default:zu(i,a,n)}t=t.sibling}}function Bu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Na(n))}function Vu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Na(e))}function Hu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Uu(e,t,n,r),t=t.sibling;else i&&nu(t)}function Uu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&tu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Hu(e,t,n,r),a&2048&&Sl(9,t);break;case 1:Hu(e,t,n,r);break;case 3:Hu(e,t,n,r),i&&mu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Na(a)));break;case 12:if(a&2048){Hu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){J(t,t.return,e)}}else Hu(e,t,n,r);break;case 31:Hu(e,t,n,r);break;case 13:Hu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&tu(t),o._visibility&2?Hu(e,t,n,r):(o._visibility|=2,Wu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&tu(s),o._visibility&2?Hu(e,t,n,r):Gu(e,t)),a&2048&&Bu(s,t);break;case 24:Hu(e,t,n,r),a&2048&&Vu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Jl(a.child,!0),Jl(t.child,!0))),Hu(e,t,n,r);break;default:Hu(e,t,n,r)}}function Wu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Wu(a,o,s,c,i),Sl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Wu(a,o,s,c,i)):u._visibility&2?Wu(a,o,s,c,i):Gu(a,o),i&&l&2048&&Bu(o.alternate,o);break;case 24:Wu(a,o,s,c,i),i&&l&2048&&Vu(o.alternate,o);break;default:Wu(a,o,s,c,i)}t=t.sibling}}function Gu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Gu(n,r),i&2048&&Bu(r.alternate,r);break;case 24:Gu(n,r),i&2048&&Vu(r.alternate,r);break;default:Gu(n,r)}t=t.sibling}}var Ku=8192;function qu(e,t,n){if(e.subtreeFlags&Ku)for(e=e.child;e!==null;)Ju(e,t,n),e=e.sibling}function Ju(e,t,n){switch(e.tag){case 26:qu(e,t,n),e.flags&Ku&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&$m(n,e)):eh(n,ju,e.memoizedState,e.memoizedProps));break;case 5:qu(e,t,n),e.flags&Ku&&(e=e.stateNode,(t&335544128)===t&&$m(n,e));break;case 3:case 4:var r=ju;ju=wm(e.stateNode.containerInfo),qu(e,t,n),ju=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ku,Ku=16777216,qu(e,t,n),Ku=r):qu(e,t,n));break;case 30:if((e.flags&Ku)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Vl===null&&(Vl=new Map),Vl.set(r,i)}qu(e,t,n);break;default:qu(e,t,n)}}function Yu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];uu=r,$u(r,e)}Yu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zu(e),e=e.sibling}function Zu(e){switch(e.tag){case 0:case 11:case 15:Xu(e),e.flags&2048&&Cl(9,e,e.return);break;case 3:Xu(e);break;case 12:Xu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):Xu(e);break;default:Xu(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];uu=r,$u(r,e)}Yu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Cl(8,t,t.return),Qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function $u(e,t){for(;uu!==null;){var n=uu;switch(n.tag){case 0:case 11:case 15:Cl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Na(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,uu=r;else a:for(n=e;uu!==null;){r=uu;var i=r.sibling,a=r.return;if(xu(r),r===n){uu=null;break a}if(i!==null){i.return=a,uu=i;break a}uu=a}}}var ed={getCacheForType:function(e){var t=Ta(ja),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ta(ja).controller.signal}},td=typeof WeakMap==`function`?WeakMap:Map,nd=0,rd=null,W=null,G=0,id=0,ad=null,od=!1,sd=!1,cd=!1,ld=0,ud=0,dd=0,fd=0,pd=0,md=0,hd=0,gd=null,_d=null,vd=!1,yd=0,bd=0,xd=1/0,Sd=null,Cd=null,wd=0,Td=null,Ed=null,Dd=0,Od=0,kd=null,Ad=null,jd=null,Md=null,Nd=null,Pd=0,Fd=null;function Id(){return nd&2&&G!==0?G&-G:F.T===null?yt():Lf()}function Ld(){if(md===0){if(!(G&536870912)||B){var e=it;it<<=1,!(it&3932160)&&(it=262144),md=e}else md=536870912}return e=jo.current,e!==null&&(e.flags|=32),md}function Rd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Rp(_i(e.memoizedProps,n))),Md===null&&(Md=[]),Md.push(t.bind(null,r))}}function zd(e,t,n){(e===rd&&(id===2||id===9)||e.cancelPendingCommit!==null)&&(K(e,0),Ud(e,G,md,!1)),pt(e,n),nd&2&&e===rd||(e===rd&&(!(nd&2)&&(fd|=n),ud===4&&Ud(e,G,md,!1)),kf(e))}function Bd(e,t,n){if(nd&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ct(e,t),a=r?$d(e,t):Zd(e,t,!0),o=r;do{if(a===0){sd&&!r&&Ud(e,t,0,!1);break}if(n=e.current.alternate,o&&!Hd(n))a=Zd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=gd;var l=c.current.memoizedState.isDehydrated;if(l&&(K(c,s).flags|=256),s=Zd(c,s,!1),s!==2&&s!==6){if(cd&&!l){c.errorRecoveryDisabledLanes|=o,fd|=o,a=4;break a}o=_d,_d=a,o!==null&&(_d===null?_d=o:_d.push.apply(_d,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){K(e,0),Ud(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Ud(r,t,md,!od);break a;case 2:_d=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=yd+300-Ve(),10<a)){if(Ud(r,t,md,!od),st(r,0,!0)!==0)break a;Dd=t,r.timeoutHandle=bp(Vd.bind(null,r,n,_d,Sd,vd,t,md,fd,hd,od,o,`Throttled`,-0,0),a);break a}Vd(r,n,_d,Sd,vd,t,md,fd,hd,od,o,null,-0,0)}break}}while(1);kf(e)}function Vd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vn},Vl=null,Ju(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=ih.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?yd-Ve():(a&4194048)===a?bd-Ve():0,m=nh(d,m),m!==null)?(Dd=a,e.cancelPendingCommit=m(of.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Ud(e,a,o,!l)):of(e,t,a,n,r,i,o,s,c,l,u,d)}function Hd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Vr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ud(e,t,n,r){t=lt(e,t),t&=~pd,t&=~fd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-$e(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ht(e,n,t)}function Wd(){return nd&6?!0:(Af(0,!1),!1)}function Gd(){if(W!==null){if(id===0)var e=W.return;else e=W,_a=ga=null,as(e),ao=null,oo=0,e=W;for(;e!==null;)xl(e.alternate,e),e=e.return;W=null}}function K(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,xp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Dd=0,Gd(),rd=e,W=n=Pi(e.current,null),G=t,id=0,ad=null,od=!1,sd=ct(e,t),cd=!1,hd=md=pd=fd=dd=ud=0,_d=gd=null,vd=!1,ld=lt(e,t),wi(),n}function Kd(e,t){V=null,F.H=mc,t===Ya||t===Za?(t=ro(),id=3):t===Xa?(t=ro(),id=4):id=t===Mc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,ad=t,W===null&&(ud=1,Ec(e,Hi(t,e.current)))}function qd(){var e=jo.current;return e===null?!0:(G&4194048)===G?Mo===null:(G&62914560)===G||G&536870912?e===Mo:!1}function Jd(){var e=F.H;return F.H=mc,e===null?mc:e}function Yd(){var e=F.A;return F.A=ed,e}function Xd(){ud=4,od||(G&4194048)!==G&&jo.current!==null||(sd=!0),!(dd&134217727)&&!(fd&134217727)||rd===null||Ud(rd,G,md,!1)}function Zd(e,t,n){var r=nd;nd|=2;var i=Jd(),a=Yd();(rd!==e||G!==t)&&(Sd=null,K(e,t)),t=!1;var o=ud;a:do try{if(id!==0&&W!==null){var s=W,c=ad;switch(id){case 8:Gd(),o=6;break a;case 3:case 2:case 9:case 6:jo.current===null&&(t=!0);var l=id;if(id=0,ad=null,rf(e,s,c,l),n&&sd){o=0;break a}break;default:l=id,id=0,ad=null,rf(e,s,c,l)}}Qd(),o=ud;break}catch(t){Kd(e,t)}while(1);return t&&e.shellSuspendCounter++,_a=ga=null,nd=r,F.H=i,F.A=a,W===null&&(rd=null,G=0,wi()),o}function Qd(){for(;W!==null;)tf(W)}function $d(e,t){var n=nd;nd|=2;var r=Jd(),a=Yd();rd!==e||G!==t?(Sd=null,xd=Ve()+500,K(e,t)):sd=ct(e,t);a:do try{if(id!==0&&W!==null){t=W;var o=ad;b:switch(id){case 1:id=0,ad=null,rf(e,t,o,1);break;case 2:case 9:if($a(o)){id=0,ad=null,nf(t);break}t=function(){id!==2&&id!==9||rd!==e||(id=7),kf(e)},o.then(t,t);break a;case 3:id=7;break a;case 4:id=5;break a;case 7:$a(o)?(id=0,ad=null,nf(t)):(id=0,ad=null,rf(e,t,o,7));break;case 5:var s=null;switch(W.tag){case 26:s=W.memoizedState;case 5:case 27:var c=W;if(s?Z(s):c.stateNode.complete){id=0,ad=null;var l=c.sibling;if(l!==null)W=l;else{var u=c.return;u===null?W=null:(W=u,af(u))}break b}}id=0,ad=null,rf(e,t,o,5);break;case 6:id=0,ad=null,rf(e,t,o,6);break;case 8:Gd(),ud=6;break a;default:throw Error(i(462))}}ef();break}catch(t){Kd(e,t)}while(1);return _a=ga=null,F.H=r,F.A=a,nd=n,W===null?(rd=null,G=0,wi(),ud):0}function ef(){for(;W!==null&&!ze();)tf(W)}function tf(e){var t=fl(e.alternate,e,ld);e.memoizedProps=e.pendingProps,t===null?af(e):W=t}function nf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Kc(n,t,t.pendingProps,t.type,void 0,G);break;case 11:t=Kc(n,t,t.pendingProps,t.type.render,t.ref,G);break;case 5:as(t);var r=t;r===ra&&(B?(ua(r),r.tag===5&&r.stateNode!=null&&(ia=r.stateNode)):(ua(r),B=!0));default:xl(n,t),t=W=Fi(t,ld),t=fl(n,t,ld)}e.memoizedProps=e.pendingProps,t===null?af(e):W=t}function rf(e,t,n,r){_a=ga=null,as(t),ao=null,oo=0;var i=t.return;try{if(jc(e,i,t,n,G)){ud=1,Ec(e,Hi(n,e.current)),W=null;return}}catch(t){if(i!==null)throw W=i,t;ud=1,Ec(e,Hi(n,e.current)),W=null;return}t.flags&32768?(B||r===1?e=!0:sd||G&536870912?e=!1:(od=e=!0,(r===2||r===9||r===3||r===6)&&(r=jo.current,r!==null&&r.tag===13&&(r.flags|=16384))),q(t,e)):af(t)}function af(e){var t=e;do{if(t.flags&32768){q(t,od);return}e=t.return;var n=yl(t.alternate,t,ld);if(n!==null){W=n;return}if(t=t.sibling,t!==null){W=t;return}W=t=e}while(t!==null);ud===0&&(ud=5)}function q(e,t){do{var n=bl(e.alternate,e);if(n!==null){n.flags&=32767,W=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){W=e;return}W=e=n}while(e!==null);ud=6,W=null}function of(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do mf();while(wd!==0);if(nd&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===rd&&(W=rd=null,G=0),Ed=t,Td=e,Dd=n,kd=a,Ad=r,sf(e,t,n,s,c,l,f)}}function sf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Od=s,s|=Ci,mt(e,n,s,r,i,a),Md=null,(n&335544064)===n?(Nd=Ia(e),r=10262):(Nd=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,Sf(Ge,function(){return hf(),null})):(e.callbackNode=null,e.callbackPriority=0),Bl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=F.T,F.T=null,i=I.p,I.p=2,a=nd,nd|=4;try{hu(e,t,n)}finally{nd=a,I.p=i,F.T=r}}wd=1,Bl?jd=Ip(o,e.containerInfo,Nd,uf,df,lf,ff,hf,cf,null,null):(uf(),df(),ff())}function cf(e){if(wd!==0){var t=Td.onRecoverableError;t(e,{componentStack:null})}}function lf(){wd===3&&(wd=0,Iu(Ed,Td),wd=4)}function uf(){if(wd===1){wd=0;var e=Td,t=Ed,n=Dd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=F.T,F.T=null;var i=I.p;I.p=2;var a=nd;nd|=4;try{fu=pu=!1,Mu(t,e,n),n=fp;var o=qr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Kr(s.ownerDocument.documentElement,s)){if(c!==null&&Jr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Gr(s,h),v=Gr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}vh=!!dp,fp=dp=null}finally{nd=a,I.p=i,F.T=r}}e.current=t,wd=2}}function df(){if(wd===2){wd=0;var e=Td,t=Ed,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=F.T,F.T=null;var r=I.p;I.p=2;var i=nd;nd|=4;try{_u(e,t.alternate,t)}finally{nd=i,I.p=r,F.T=n}}wd=3}}function ff(){if(wd===4||wd===3){wd=0;var e=jd;jd=null,Be();var t=Td,n=Ed,r=Dd,i=Ad,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?wd=5:(wd=0,Ed=Td=null,pf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(Cd=null),R(r),n=n.stateNode,Ze&&typeof Ze.onCommitFiberRoot==`function`)try{Ze.onCommitFiberRoot(Xe,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=F.T,a=I.p,I.p=2,F.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{F.T=n,I.p=a}}if(i=Md,o=Nd,Nd=null,i!==null&&(Md=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Dd&3&&mf(),kf(t),a=t.pendingLanes,r&261930&&a&42?t===Fd?Pd++:(Pd=0,Fd=t):(Pd=0,Fd=null),Af(0,!1)}}function pf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Na(t)))}function mf(){return jd!==null&&(jd.skipTransition(),jd=null),uf(),df(),ff(),hf()}function hf(){if(wd!==5)return!1;var e=Td,t=Od;Od=0;var n=R(Dd),r=F.T,a=I.p;try{I.p=32>n?32:n,F.T=null,n=kd,kd=null;var o=Td,s=Dd;if(wd=0,Ed=Td=null,Dd=0,nd&6)throw Error(i(331));var c=nd;if(nd|=4,Zu(o.current),Uu(o,o.current,s,n),nd=c,Af(0,!1),Ze&&typeof Ze.onPostCommitFiberRoot==`function`)try{Ze.onPostCommitFiberRoot(Xe,o)}catch{}return!0}finally{I.p=a,F.T=r,pf(e,t)}}function gf(e,t,n){t=Hi(n,t),t=Oc(e.stateNode,t,2),e=vo(e,t,2),e!==null&&(pt(e,2),kf(e))}function J(e,t,n){if(e.tag===3)gf(e,e,n);else for(;t!==null;){if(t.tag===3){gf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(Cd===null||!Cd.has(r))){e=Hi(n,e),n=kc(2),r=vo(t,n,2),r!==null&&(Ac(n,r,t,e),pt(r,2),kf(r));break}}t=t.return}}function _f(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new td;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(cd=!0,i.add(n),e=vf.bind(null,e,t,n),t.then(e,e))}function vf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,rd===e&&(G&n)===n&&(ud===4||ud===3&&(G&62914560)===G&&300>Ve()-yd?nd&2?pd|=n:K(e,0):pd|=n,hd===G&&(hd=0)),kf(e)}function yf(e,t){t===0&&(t=dt()),e=Di(e,t),e!==null&&(pt(e,t),kf(e))}function bf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),yf(e,n)}function xf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),yf(e,n)}function Sf(e,t){return Le(e,t)}var Cf=null,wf=null,Tf=!1,Ef=!1,Df=!1,Of=0;function kf(e){e!==wf&&e.next===null&&(wf===null?Cf=wf=e:wf=wf.next=e),Ef=!0,Tf||(Tf=!0,If())}function Af(e,t){if(!Df&&Ef){Df=!0;do for(var n=!1,r=Cf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-$e(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Ff(r,a))}else a=G,a=st(r,r===rd?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ct(r,a)||(n=!0,Ff(r,a))}r=r.next}while(n);Df=!1}}function jf(){Mf()}function Mf(){Ef=Tf=!1;var e=0;Of!==0&&yp()&&(e=Of);for(var t=Ve(),n=null,r=Cf;r!==null;){var i=r.next,a=Nf(r,t);a===0?(r.next=null,n===null?Cf=i:n.next=i,i===null&&(wf=n)):(n=r,(e!==0||a&3)&&(Ef=!0)),r=i}wd!==0&&wd!==5||Af(e,!1),Of!==0&&(Of=0)}function Nf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-$e(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=ut(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=rd,n=G,n=st(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(id===2||id===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Re(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ct(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Re(r),R(n)){case 2:case 8:n=We;break;case 32:n=Ge;break;case 268435456:n=qe;break;default:n=Ge}return r=Pf.bind(null,e),n=Le(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Re(r),e.callbackPriority=2,e.callbackNode=null,2}function Pf(e,t){if(wd!==0&&wd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(mf()&&e.callbackNode!==n)return null;var r=G;return r=st(e,e===rd?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Bd(e,r,t),Nf(e,Ve()),e.callbackNode!=null&&e.callbackNode===n?Pf.bind(null,e):null)}function Ff(e,t){if(mf())return null;Bd(e,t,!0)}function If(){wp(function(){nd&6?Le(Ue,jf):Mf()})}function Lf(){if(Of===0){var e=za;e===0&&(e=rt,rt<<=1,!(rt&261888)&&(rt=256)),Of=e}return Of}function Rf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:_n(e)}function zf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Rf((i[Ct]||null).action),o=r.submitter;o&&(t=(t=o[Ct]||null)?Rf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new zn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Of!==0){var e=new FormData(i,o);ec(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),ec(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Bf=0;Bf<mi.length;Bf++){var Vf=mi[Bf];hi(Vf.toLowerCase(),`on`+(Vf[0].toUpperCase()+Vf.slice(1)))}hi(oi,`onAnimationEnd`),hi(si,`onAnimationIteration`),hi(ci,`onAnimationStart`),hi(`dblclick`,`onDoubleClick`),hi(`focusin`,`onFocus`),hi(`focusout`,`onBlur`),hi(li,`onTransitionRun`),hi(ui,`onTransitionStart`),hi(di,`onTransitionCancel`),hi(fi,`onTransitionEnd`),Bt(`onMouseEnter`,[`mouseout`,`mouseover`]),Bt(`onMouseLeave`,[`mouseout`,`mouseover`]),Bt(`onPointerEnter`,[`pointerout`,`pointerover`]),Bt(`onPointerLeave`,[`pointerout`,`pointerover`]),zt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),zt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),zt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),zt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),zt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),zt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Hf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Uf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Hf));function Wf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){bi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){bi(e)}i.currentTarget=null,a=c}}}}function Y(e,t){var n=t[Tt];n===void 0&&(n=t[Tt]=new Set);var r=e+`__bubble`;n.has(r)||(Jf(t,e,2,!1),n.add(r))}function Gf(e,t,n){var r=0;t&&(r|=4),Jf(n,e,r,t)}var Kf=`_reactListening`+Math.random().toString(36).slice(2);function qf(e){if(!e[Kf]){e[Kf]=!0,Lt.forEach(function(t){t!==`selectionchange`&&(Uf.has(t)||Gf(t,!1,e),Gf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Kf]||(t[Kf]=!0,Gf(`selectionchange`,!1,t))}}function Jf(e,t,n,r){switch(Th(t)){case 2:var i=yh;break;case 8:i=bh;break;default:i=xh}n=i.bind(null,t,n,e),i=void 0,!On||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Yf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=z(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Tn(function(){var r=a,i=bn(n),s=[];a:{var c=pi.get(e);if(c!==void 0){var l=zn,u=e;switch(e){case`keypress`:if(Pn(n)===0)break a;case`keydown`:case`keyup`:l=rr;break;case`focusin`:u=`focus`,l=Jn;break;case`focusout`:u=`blur`,l=Jn;break;case`beforeblur`:case`afterblur`:l=Jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=qn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=or;break;case oi:case si:case ci:l=Yn;break;case fi:l=sr;break;case`scroll`:case`scrollend`:l=Vn;break;case`wheel`:l=cr;break;case`copy`:case`cut`:case`paste`:l=Xn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=ir;break;case`submit`:l=ar;break;case`toggle`:case`beforetoggle`:l=lr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=En(m,p),g!=null&&d.push(Xf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==yn&&(u=n.relatedTarget||n.fromElement)&&(z(u)||u[wt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?z(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Kn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=ir,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Nt(c),h=l==null?u:Nt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,z(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Qf):null,c!==null&&$f(s,u,c,d,!1),l!==null&&f!==null&&$f(s,f,l,d,!0)))}a:{if(c=r?Nt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=kr;else if(Cr(c)){if(Ar)_=zr;else{_=Lr;var v=Ir}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&mn(r.elementType)&&(_=kr):_=Rr;if(_&&=_(e,r)){wr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Nt(r):window,e){case`focusin`:(Cr(v)||v.contentEditable===`true`)&&(Xr=v,Zr=r,Qr=null);break;case`focusout`:Qr=Zr=Xr=null;break;case`mousedown`:$r=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:$r=!1,ei(s,n,i);break;case`selectionchange`:if(Yr)break;case`keydown`:case`keyup`:ei(s,n,i)}var y;if(dr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else yr?_r(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(mr&&n.locale!==`ko`&&(yr||b!==`onCompositionStart`?b===`onCompositionEnd`&&yr&&(y=Nn()):(An=i,jn=`value`in An?An.value:An.textContent,yr=!0)),v=Zf(r,b),0<v.length&&(b=new Zn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=vr(n),y!==null&&(b.data=y)))),(y=pr?br(e,n):xr(e,n))&&(b=Zf(r,`onBeforeInput`),0<b.length&&(v=new Zn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),zf(s,e,r,n,i)}Wf(s,t)})}function Xf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Zf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=En(e,n),i!=null&&r.unshift(Xf(e,i,a)),i=En(e,t),i!=null&&r.push(Xf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Qf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function $f(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=En(n,a),l!=null&&o.unshift(Xf(n,l,c))):i||(l=En(n,a),l!=null&&o.push(Xf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var ep=/\r\n?/g,tp=/\u0000|\uFFFD/g;function np(e){return(typeof e==`string`?e:``+e).replace(ep,`
`).replace(tp,``)}function rp(e,t){return t=np(t),np(e)===t}function ip(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||un(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&un(e,``+r);else return;break;case`className`:Jt(e,`class`,r);break;case`tabIndex`:Jt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Jt(e,n,r);break;case`style`:pn(e,r,o);return;case`data`:if(t!==`object`){Jt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=_n(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&ip(e,t,`name`,a.name,a,null),ip(e,t,`formEncType`,a.formEncType,a,null),ip(e,t,`formMethod`,a.formMethod,a,null),ip(e,t,`formTarget`,a.formTarget,a,null)):(ip(e,t,`encType`,a.encType,a,null),ip(e,t,`method`,a.method,a,null),ip(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=_n(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=vn);return;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=_n(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Y(`beforetoggle`,e),Y(`toggle`,e),qt(e,`popover`,r);break;case`xlinkActuate`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:qt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=hn.get(n)||n,qt(e,n,r);else return}Gt=!0}function ap(e,t,n,r,a,o){switch(n){case`style`:pn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)un(e,r);else if(typeof r==`number`||typeof r==`bigint`)un(e,``+r);else return;break;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=vn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Rt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Ct]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}Gt=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):qt(e,n,r)}return}Gt=!0}function op(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Y(`error`,e),Y(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,o,s,n,null)}}a&&ip(e,t,`srcSet`,n.srcSet,n,null),r&&ip(e,t,`src`,n.src,n,null);return;case`input`:Y(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:ip(e,t,r,d,n,null)}}an(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Y(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:ip(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&sn(e,!!r,n,!0):sn(e,!!r,t,!1);return;case`textarea`:for(s in Y(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:ip(e,t,s,c,n,null)}ln(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:ip(e,t,l,r,n,null)}return;case`dialog`:Y(`beforetoggle`,e),Y(`toggle`,e),Y(`cancel`,e),Y(`close`,e);break;case`iframe`:case`object`:Y(`load`,e);break;case`video`:case`audio`:for(r=0;r<Hf.length;r++)Y(Hf[r],e);break;case`image`:Y(`error`,e),Y(`load`,e);break;case`details`:Y(`toggle`,e);break;case`embed`:case`source`:case`link`:Y(`error`,e),Y(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,u,r,n,null)}return;default:if(mn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&ap(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&ip(e,t,c,r,n,null))}var sp={};function cp(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||ip(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(Gt=!0),o=m;break;case`name`:m!==f&&(Gt=!0),a=m;break;case`checked`:m!==f&&(Gt=!0),u=m;break;case`defaultChecked`:m!==f&&(Gt=!0),d=m;break;case`value`:m!==f&&(Gt=!0),s=m;break;case`defaultValue`:m!==f&&(Gt=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&ip(e,t,p,m,r,f)}}rn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||ip(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(Gt=!0),p=o;break;case`defaultValue`:o!==l&&(Gt=!0),c=o;break;case`multiple`:o!==l&&(Gt=!0),s=o;default:o!==l&&ip(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?sn(e,!!n,n?[]:``,!1):sn(e,!!n,t,!0)):sn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:ip(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(Gt=!0),p=a;break;case`defaultValue`:a!==o&&(Gt=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&ip(e,t,s,a,r,o)}cn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:ip(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(Gt=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:ip(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&ip(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:ip(e,t,u,p,r,m)}return;default:if(mn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&ap(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||ap(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&ip(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||ip(e,t,f,p,r,m)}function lp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function up(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&lp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&lp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var dp=null,fp=null;function pp(e){return e.nodeType===9?e:e.ownerDocument}function mp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function hp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function gp(e,t,n,r){return n=pp(n).createElement(e),n[St]=r,n[Ct]=t,op(n,e,t),Ft(n),n}function _p(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vp=null;function yp(){var e=window.event;return e&&e.type===`popstate`?e!==vp&&(vp=e,!0):(vp=null,!1)}var bp=typeof setTimeout==`function`?setTimeout:void 0,xp=typeof clearTimeout==`function`?clearTimeout:void 0,Sp=typeof Promise==`function`?Promise:void 0,Cp=typeof requestAnimationFrame==`function`?requestAnimationFrame:bp,wp=typeof queueMicrotask==`function`?queueMicrotask:Sp===void 0?bp:function(e){return Sp.resolve(null).then(e).catch(Tp)};function Tp(e){setTimeout(function(){throw e})}function Ep(e){return e===`head`}function Dp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Wh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)xm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,xm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[kt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&xm(e.ownerDocument.body)}n=i}while(n);Wh(t)}function Op(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function kp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ap(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function jp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Mp(e){return jp(e.getBoundingClientRect(),getComputedStyle(e),e)}function Np(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return jp(t,n,e)}function Pp(e){return e.documentElement.clientHeight}function Fp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Ip(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Pp(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Qm(f),u>th){s.length=o;break}f=new Promise(Fp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Lp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Lp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Lp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Lp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Rp(e){return{name:e,group:new Lp(`group`,e),imagePair:new Lp(`image-pair`,e),old:new Lp(`old`,e),new:new Lp(`new`,e)}}function zp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}zp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Wp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Hp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Bp,e,s,r)}this._eventListeners=a}};function Bp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}zp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Wp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Hp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Vp,e,n,i),r.splice(t,1),a!==null&&a()}};function Vp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Hp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Up(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Wp(e,t,n,r){if(e.length===0)return-1;r=Up(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Up(a.optionsOrUseCapture)===r)return i}return-1}zp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},zp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Gp,e,void 0,void 0)};function Gp(e,t){return e.tag!==6&&(e=b(e),_m(e,t))}zp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Kp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Gp(t[n],e);n--);};function Kp(e,t){return t.push(e),!1}zp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=pp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,qp,e,void 0,void 0))};function qp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}zp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Jp,e,void 0,void 0)};function Jp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}zp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Yp,e,void 0,void 0);for(var n=t=0;n<Xp.length;n++){var r=Xp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Xp[t++]=r}Xp.length=t}};function Yp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Xp=[],Zp=!1;function Qp(e,t,n){Xp.push({fragmentInstance:e,observer:t,instance:n}),Zp||(Zp=!0,vm(function(){Zp=!1;var e=Xp;Xp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}zp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,$p,e,void 0,void 0),e};function $p(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}zp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},zp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Kp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||em(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function em(e,t,n,r,i){var a=z(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function tm(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}zp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Kp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),tm(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),tm(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function nm(e,t){return e=b(e),rm(e,t),!1}function rm(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function im(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Xp.length;i++){var a=Xp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Xp[r++]=a)}Xp.length=r,n.observe(e)}),rm(e,t))}function am(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Qp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function om(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:om(n),jt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function sm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[kt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=pm(e.nextSibling),e===null)break}return null}function cm(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=pm(e.nextSibling),e===null))return null;return e}function lm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=pm(e.nextSibling),e===null))return null;return e}function um(e){return e.data===`$?`||e.data===`$~`}function dm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function fm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function pm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var mm=null;function hm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return pm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function gm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function _m(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function vm(e){Cp(function(){Cp(function(t){return e(t)})})}function ym(e,t,n){switch(t=pp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function bm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&ip(e,t,r,null,sp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===vn&&(e.onclick=null),jt(e)}function xm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);jt(e)}var Sm=new Map,Cm=new Set;function wm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Tm=I.d;I.d={f:Em,r:Dm,D:Am,C:jm,L:Mm,m:Nm,X:Fm,S:Pm,M:Im};function Em(){var e=Tm.f(),t=Wd();return e||t}function Dm(e){var t=Mt(e);t!==null&&t.tag===5&&t.type===`form`?nc(t):Tm.r(e)}var Om=typeof document>`u`?null:document;function km(e,t,n){var r=Om;if(r&&typeof t==`string`&&t){var i=nn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Cm.has(i)||(Cm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),op(t,`link`,e),Ft(t),r.head.appendChild(t)))}}function Am(e){Tm.D(e),km(`dns-prefetch`,e,null)}function jm(e,t){Tm.C(e,t),km(`preconnect`,e,t)}function Mm(e,t,n){Tm.L(e,t,n);var r=Om;if(r&&e&&t){var i=`link[rel="preload"][as="`+nn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+nn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+nn(n.imageSizes)+`"]`)):i+=`[href="`+nn(e)+`"]`;var a=i;switch(t){case`style`:a=Rm(e);break;case`script`:a=Hm(e)}if(!(Sm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),Sm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(zm(a))||t===`script`&&r.querySelector(Um(a))))){var o=r.createElement(`link`);op(o,`link`,e),t===`style`&&(o[At]=!0,o.onload=o.onerror=function(){It(o)}),Ft(o),r.head.appendChild(o)}}}function Nm(e,t){Tm.m(e,t);var n=Om;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+nn(r)+`"][href="`+nn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Hm(e)}if(!Sm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),Sm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Um(a)))return}r=n.createElement(`link`),op(r,`link`,e),Ft(r),n.head.appendChild(r)}}}function Pm(e,t,n){Tm.S(e,t,n);var r=Om;if(r&&e){var i=Pt(r).hoistableStyles,a=Rm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(zm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=Sm.get(a))&&X(e,n);var c=o=r.createElement(`link`);Ft(c),op(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Gm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Fm(e,t){Tm.X(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0},t),(t=Sm.get(i))&&Km(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Im(e,t){Tm.M(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=Sm.get(i))&&Km(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Lm(e,t,n,r){var a=(a=Ce.current)?wm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Rm(n.href),t=Pt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Rm(n.href);var o=Pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(zm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=Sm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Sm.set(e,o)),Vm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Hm(n),t=Pt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Rm(e){return`href="`+nn(e)+`"`}function zm(e){return`link[rel="stylesheet"][`+e+`]`}function Bm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Vm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[At]){r.loading=1;return}}else t=e.createElement(`link`),t[At]=!0,t.onload=t.onerror=It.bind(null,t),op(t,`link`,n),Ft(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Hm(e){return`[src="`+nn(e)+`"]`}function Um(e){return`script[async]`+e}function Wm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+nn(n.href)+`"]`);if(r)return t.instance=r,Ft(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ft(r),op(r,`style`,a),Gm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Rm(n.href);var o=e.querySelector(zm(a));if(o)return t.state.loading|=4,t.instance=o,Ft(o),o;r=Bm(n),(a=Sm.get(a))&&X(r,a),o=(e.ownerDocument||e).createElement(`link`),Ft(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),op(o,`link`,r),t.state.loading|=4,Gm(o,n.precedence,e),t.instance=o;case`script`:return o=Hm(n.src),(a=e.querySelector(Um(o)))?(t.instance=a,Ft(a),a):(r=n,(a=Sm.get(o))&&(r=D({},n),Km(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ft(a),op(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Gm(r,n.precedence,e));return t.instance}function Gm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function X(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Km(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var qm=null;function Jm(e,t,n){if(qm===null){var r=new Map,i=qm=new Map;i.set(n,r)}else i=qm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[kt]||a[St]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Ym(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Xm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Zm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Z(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Qm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function $m(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Qm(t),e.suspenseyImages.push(t)),e=ah.bind(e),t.decode().then(e,e))}function eh(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Rm(r.href),a=t.querySelector(zm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=ih.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ft(a);return}a=t.ownerDocument||t,r=Bm(r),(i=Sm.get(i))&&X(r,i),a=a.createElement(`link`),Ft(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),op(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=ih.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var th=0;function nh(e,t){return e.stylesheets&&e.count===0&&sh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&th===0&&(th=62500*up());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&sh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>th?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function rh(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)sh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function ih(){this.count--,rh(this)}function ah(){this.imgCount--,rh(this)}var oh=null;function sh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,oh=new Map,t.forEach(ch,e),oh=null,ih.call(e))}function ch(e,t){if(!(t.state.loading&4)){var n=oh.get(e);if(n)var r=n.get(null);else{n=new Map,oh.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=ih.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var lh={$$typeof:N,Provider:null,Consumer:null,_currentValue:ge,_currentValue2:ge,_threadCount:0};function uh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ft(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ft(0),this.hiddenUpdates=ft(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function dh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new uh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Mi(3,null,null,t),e.current=a,a.stateNode=e,t=Ma(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},ho(a),e}function fh(e){return e?(e=Ai,e):Ai}function ph(e,t,n,r,i,a){i=fh(i),r.context===null?r.context=i:r.pendingContext=i,r=_o(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=vo(e,r,t),n!==null&&(zd(n,e,t),yo(n,e,t))}function mh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function hh(e,t){mh(e,t),(e=e.alternate)&&mh(e,t)}function gh(e){if(e.tag===13||e.tag===31){var t=Di(e,67108864);t!==null&&zd(t,e,67108864),hh(e,67108864)}}function _h(e){if(e.tag===13||e.tag===31){var t=Id();t=vt(t);var n=Di(e,t);n!==null&&zd(n,e,t),hh(e,t)}}var vh=!0;function yh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=2,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function bh(e,t,n,r){var i=F.T;F.T=null;var a=I.p;try{I.p=8,xh(e,t,n,r)}finally{I.p=a,F.T=i}}function xh(e,t,n,r){if(vh){var i=Sh(r);if(i===null)Yf(e,t,r,Ch,n),Ph(e,r);else if(Ih(i,e,t,n,r))r.stopPropagation();else if(Ph(e,r),t&4&&-1<Nh.indexOf(e)){for(;i!==null;){var a=Mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ot(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-$e(o);s.entanglements[1]|=c,o&=~c}kf(a),!(nd&6)&&(xd=Ve()+500,Af(0,!1))}}break;case 31:case 13:s=Di(a,2),s!==null&&zd(s,a,2),Wd(),hh(a,2)}if(a=Sh(r),a===null&&Yf(e,t,r,Ch,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Yf(e,t,r,null,n)}}function Sh(e){return e=bn(e),wh(e)}var Ch=null;function wh(e){if(Ch=null,e=z(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ch=e,null}function Th(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(He()){case Ue:return 2;case We:return 8;case Ge:case Ke:return 32;case qe:return 268435456;default:return 32}default:return 32}}var Eh=!1,Dh=null,Oh=null,kh=null,Ah=new Map,jh=new Map,Mh=[],Nh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ph(e,t){switch(e){case`focusin`:case`focusout`:Dh=null;break;case`dragenter`:case`dragleave`:Oh=null;break;case`mouseover`:case`mouseout`:kh=null;break;case`pointerover`:case`pointerout`:Ah.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:jh.delete(t.pointerId)}}function Fh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Mt(t),t!==null&&gh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ih(e,t,n,r,i){switch(t){case`focusin`:return Dh=Fh(Dh,e,t,n,r,i),!0;case`dragenter`:return Oh=Fh(Oh,e,t,n,r,i),!0;case`mouseover`:return kh=Fh(kh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Ah.set(a,Fh(Ah.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,jh.set(a,Fh(jh.get(a)||null,e,t,n,r,i)),!0}return!1}function Lh(e){var t=z(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,bt(e.priority,function(){_h(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,bt(e.priority,function(){_h(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Rh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Sh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);yn=r,n.target.dispatchEvent(r),yn=null}else return t=Mt(n),t!==null&&gh(t),e.blockedOn=n,!1;t.shift()}return!0}function zh(e,t,n){Rh(e)&&n.delete(t)}function Bh(){Eh=!1,Dh!==null&&Rh(Dh)&&(Dh=null),Oh!==null&&Rh(Oh)&&(Oh=null),kh!==null&&Rh(kh)&&(kh=null),Ah.forEach(zh),jh.forEach(zh)}function Vh(e,n){e.blockedOn===n&&(e.blockedOn=null,Eh||(Eh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Bh)))}var Hh=null;function Uh(e){Hh!==e&&(Hh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Hh===e&&(Hh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(wh(r||n)===null)continue;break}var a=Mt(n);a!==null&&(e.splice(t,3),t-=3,ec(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Wh(e){function t(t){return Vh(t,e)}Dh!==null&&Vh(Dh,e),Oh!==null&&Vh(Oh,e),kh!==null&&Vh(kh,e),Ah.forEach(t),jh.forEach(t);for(var n=0;n<Mh.length;n++){var r=Mh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Mh.length&&(n=Mh[0],n.blockedOn===null);)Lh(n),n.blockedOn===null&&Mh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Ct]||null;if(typeof a==`function`)o||Uh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Ct]||null)s=o.formAction;else if(wh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Uh(n)}}}function Gh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Kh(e){this._internalRoot=e}qh.prototype.render=Kh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;ph(n,Id(),e,t,null,null)},qh.prototype.unmount=Kh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ph(e.current,2,null,e,null,null),Wd(),t[wt]=null}};function qh(e){this._internalRoot=e}qh.prototype.unstable_scheduleHydration=function(e){if(e){var t=yt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Mh.length&&t!==0&&t<Mh[n].priority;n++);Mh.splice(n,0,e),n===0&&Lh(e)}};var Jh=n.version;if(Jh!==`19.3.1`)throw Error(i(527,Jh,`19.3.1`));I.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Yh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:F,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Xh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xh.isDisabled&&Xh.supportsFiber)try{Xe=Xh.inject(Yh),Ze=Xh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Cc,s=wc,c=Tc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=dh(e,1,!1,null,null,n,r,null,o,s,c,Gh),e[wt]=t.current,qf(e),new Kh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,ee=10**120*8,j=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),te=[j(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),j(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),j(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:6}),j(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),j(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),j(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:3,clockSpeedPower:2}),j(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:5}),j(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),j(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),j(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),j(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),j(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),j(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),j(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),j(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),j(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:30}),j(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),j(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),j(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),j(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:ee,levers:{clockSpeedPower:.5}}],M=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),N=te.map(e=>({...e,rule:[e.rule,M(e.levers)].filter(Boolean).join(` `)})),ne=.5,re=1e3,ie=.01,P=1e3,ae=1e6,oe=.05,se=.02,ce=Object.fromEntries(N.map(e=>[e.id,e])),le=new Set(N.map(e=>e.id)),ue={enabled:!0},de={enabled:!0},fe=.05,pe=[1,2,3,4,5,6,7,8,9,10],me=[{id:`firstSession`,name:`First session`,boostArea:`foundry`},{id:`foundry`,name:`Foundry`,boostArea:`foundry`},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`},{id:`levelPower`,name:`Level power`,boostArea:`factory`},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`}],he=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],F=[1,3,6,8,b.length],I=[{arrayStepGain:.02},{arrayStepGain:.03},{lakeSpeed:.05},{lakeSpeed:.05},{syncedBitrate:!0}],ge=e=>`${Math.round(e*1e3)/10}%`,_e=({arrayStepGain:e,lakeSpeed:t,syncedBitrate:n})=>{let r=[],i=[];return e&&(r.push(`Disk step ${ge(e)}`),i.push(`Disk-size steps without a Flush Pool upgrade close ${ge(e)} of the gap to 1.0 (was 1%)`)),t&&(r.push(`Lake speed +${ge(t)}`),i.push(`Every Data Lake fills at +${ge(t)} more of its pool's Bandwidth`)),n&&(r.push(`One Upgrade does both`),i.push(`Bitrate always matches Capacity: there is no separate Upgrade Bitrate, and every Upgrade raises both`)),{shortBonus:r.join(`, `),bonus:i.join(`. `)}},ve=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,short:`Ping`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,short:`Compile`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,short:`Ping ×256`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,short:`1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...F.map((e,t)=>({id:`reclaim${t+1}`,name:`Reclamation ${[`I`,`II`,`III`,`IV`,`V`][t]}`,group:`foundry`,trigger:e===1?`Flush a Storage pool for the first time`:t===F.length-1?`Flush every Storage pool at least once`:`Flush ${e} different Storage pools`,short:e===1?`Flush a pool`:t===F.length-1?`Flush every pool`:`Flush ${e} pools`,..._e(I[t]),condition:{kind:`poolsCompacted`,min:e}})),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:he[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,short:`Buy ${e.symbol}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,name:`Spent QB`,group:`tierLadder`,trigger:`Restage while holding 0 Quettabytes`,short:`Restage at 0 QB`,shortBonus:`QB credited without balance`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`counter`,key:`emptyRestages`,min:1}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,short:`Accelerate 1`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,short:`Accelerate 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,short:`Overclock`,condition:{kind:`overclocked`}},...pe.map((e,t)=>({id:`levelPower${t+1}`,name:`${b[e-1].symbol} Level 10`,group:`levelPower`,trigger:`Reach level 10 on ${b[e-1].name} (9 levels completed)`,short:`${b[e-1].symbol} level 10`,shortBonus:`+${fe} per-level multiplier`,bonus:`The per-level production multiplier rises by ${fe} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:10}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,short:`First Overclock at 6+`,shortBonus:`Overclock step −1`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,short:`2 Overclocks/Purge, no Accelerate`,shortBonus:`Overclock step −1`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,short:`DeGoogol, Overclock at 12+`,shortBonus:`Overclock step −1`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}}].map(e=>({secret:!1,platformDependent:!1,bonus:null,short:null,shortBonus:null,...e})),ye=[{id:`ping`,name:`Ping`,members:[`helloWorld`,`pingOfDeath`]},{id:`poolReset`,name:`Reclamation`,members:F.map((e,t)=>`reclaim${t+1}`)},{id:`tierBought`,name:`First purchase`,members:b.map((e,t)=>`tier${String(t+1).padStart(2,`0`)}Bought`)},{id:`accelerate`,name:`Accelerate`,members:[`tickTock`,`megahertzMyth`]},{id:`levelPower`,name:`Level power`,members:pe.map((e,t)=>`levelPower${t+1}`)},{id:`overclockStep`,name:`Overclock step`,members:[`overclockStep1`,`overclockStep2`,`overclockStep3`]}],be=Object.fromEntries(ye.flatMap(e=>e.members.map((t,n)=>[t,{...e,level:n+1}]))),L=Object.fromEntries(ve.map(e=>[e.id,e])),xe=1024,Se=1e3,Ce=8*Se**2/10,we=(e=1)=>({startBits:8,endBits:8/10*Se**(Math.max(1,Math.floor(Number(e)||1))+1)}),Te=.5,Ee=.9,De=8e3,Oe=1e3,ke=8*xe,Ae=8e3,je=Ce/2,Me=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],Ne={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},Pe=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],Fe=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],Ie=[1,10,100],Le=[9,9,9],Re=1e3,ze=[1,10,100,Re],Be=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],Ve=10*Ie.length,He=[1,10,100,1e3],Ue=.5,We=86400,Ge=14400,Ke=14400,qe=[4,40,400,4e3,4e4],Je=2e3,Ye=1024,Xe=1.1,Ze=.01,Qe=.1,$e=Math.floor(Math.log2(Ye)),et=.9,tt=.01,nt={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},rt={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},it={baseCost:100,baseSeconds:16},at=.01,ot=.1,st=.01,ct=.01,lt=.1,ut=1e3,dt=1e30,ft=1e-4,pt=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],mt=Object.assign(Object.create(null),Object.fromEntries(pt.map(e=>[e.id,e]))),ht=Object.assign(Object.create(null),Object.fromEntries(pt.map((e,t)=>[e.id,t]))),gt=k,_t=1e-5,vt=()=>b[b.length-1].id,R=e=>Math.max(0,Number.isFinite(e)?e:0),yt=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),bt=1e-9,xt=1e-9,St=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},Ct=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),wt=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=Ct();return e},Tt=()=>({resources:St().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,accelerateBoughtThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:yt()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:$r(1),unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:pt.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:pt.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:pt.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:pt.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:wt(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),Et=new Intl.NumberFormat(`en-US`),Dt=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),Ot=1e4,kt=1e3,At=1+1e-12,jt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*At;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*kt)/kt;return`${Number(r.toFixed(3))}e${t}`},z=e=>{let t=R(e);return t<Ot?Et.format(t):jt(t)},Mt=1e-9,Nt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>Mt?null:`${jt(10**t)} ${E(T)}`},Pt=e=>{let t=Math.floor(R(e)),n=E(O);return t<Ot?`${Dt.format(t)} ${n}`:Nt(t)??`${jt(t)} ${n}`},Ft=e=>{let t=Math.floor(R(e)),n=E(T);return t<Ot?`${Dt.format(t)} ${n}`:`${jt(t)} ${n}`},It=8e3,Lt=e=>{let t=Math.floor(R(e));if(t<It)return Pt(t);let n=Math.floor(t/8);return n<Ot?`${Dt.format(n)} B`:`${jt(n)} B`},Rt=e=>{let t=R(e);return t===0?1:2+(t-1)*t/2},zt=e=>{let t=e.purchaseLevels?.[vt()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},Bt=(e,t)=>{let n=S[e?.id];if(n===void 0)return Rt(t);let r=R(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},Vt=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(Bt(e,n)-1)},Ht=(e,t,n)=>{let r=Math.max(0,R(e)-R(t));return Math.max(0,Math.min(R(n),r))},Ut=(e,t,n,r,i)=>Vt(e,t)*Ht(n,r,i),Wt=(e,t,n,r,i,a)=>{let o=Ht(n,r,a),s=Vt(e,t);return s<=0?o:Math.min(o,Math.floor(R(i)/s))},Gt=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),Kt=(e,t)=>Gt(Math.max(0,S[e]??-1))**Math.max(0,R(t)-1),qt=(e,t)=>Kt(e,t),Jt=e=>1+Math.max(0,S[e]??-1)*1,Yt=e=>11+Math.max(0,S[e]??-1)*1,Xt=e=>{let t=R(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=Jt(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=Yt(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=nt.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=nt.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=nt.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=nt.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=nt.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},Zt=(e,t=Qe)=>(1+t)**R((e??1)-1),Qt=e=>10**(R(e)+1),$t=e=>Qt(e)*8,en=e=>(e.resources?.base??0)>=$t(e.globalTickspeedMultiplier??0),tn=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,nn=(e,t=0)=>{let n=R(e??0);return(1+at*br(t))**n},rn=e=>(e.scaleUpTierCounts?.[Pr(e).id]??0)>=1,an=e=>(1+ct)**R(e),on=e=>Math.max(1,Math.ceil(lt*R(e))),sn=(e,t=!0)=>{let n=R(e);return!t||n<1?1:n<2?Xe:1+Math.log10(n)},cn=e=>!!e.prestigeSpeedBonusUnlocked,ln=e=>{if(e.prestigeSpeedBonusUnlocked||R(e.purge.points)<1)return e;let t=Cn(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},un=e=>e.playtimeBonusUnlocked?1+Ze*(R(e.activePlaySeconds??0)/3600):1,dn=e=>{if(e.playtimeBonusUnlocked||R(e.purge.points)<100)return e;let t=Cn(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},fn=e=>{if(e.buyMaxUnlocked||R(e.purge.points)<2)return e;let t=Cn(e);return{...t,purge:{...t.purge,points:t.purge.points-2},buyMaxUnlocked:!0}},pn=e=>{if(e.cacheWarmUnlocked||R(e.purge.points)<20)return e;let t=Cn(e);return hn({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},mn=e=>b[Math.min(b.length,Math.max(1,ha(e)))-1],hn=e=>{if(!e.cacheWarmUnlocked||Tr(e))return e;let t=mn(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,zt(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:Ti(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},gn=qe.length,_n=e=>Math.min(gn,Math.floor(R(e?.sleepModeCapLevel??0))),vn=e=>Math.min(We,Ge+Ke*_n(e)),yn=e=>qe[e]??null,bn=e=>{let t=_n(e),n=yn(t);if(n===null||R(e.purge.points)<n)return e;let r=Cn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},xn=e=>t=>({...t,activePlaySeconds:R(t.activePlaySeconds??0)+R(e)}),Sn=e=>!!e.computeFlops?.pageUnlocked||R(e.purge?.points??0)>=100,Cn=e=>e.computeFlops?.pageUnlocked||R(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},wn=(e,t,n)=>{let r=mt[t];if(!r)return{affordable:0,totalCost:0};let i=R(e.computeFlops?.owned?.[t]??0),a=R(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=En(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},Tn=(e,t,n)=>r=>{if(t<=0)return r;let i=Cn(r),a=R(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},En=(e,t=0)=>{let n=t+1;return Vt({baseCost:e.baseCostPP},n)},Dn=(e,t)=>{let n=mt[t];if(!n)return!1;let r=En(n,R(e.computeFlops?.owned?.[t]??0));return R(e.purge?.points??0)>=r},On=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=En(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},kn=(e,t=1)=>n=>{let r=mt[e];if(!r)return n;let i=Cn(n),a=R(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=On(r,a,R(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:R(a+o)}}}},An=e=>10**R(e),jn=e=>pt.reduce((t,n,r)=>t+R(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*An(r),0),Mn=e=>{let t=R(e.hyperscalerCount??0);return t<=0?0:t*(ft+R(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*_t)},Nn=(e,t)=>1+R(e.computeFlops?.cumulativeBoost?.[t]??0)+Mn(e),Pn=e=>{let t=R(e);return t===0?`0 Flops`:`${z(t)} Flops`},Fn=e=>t=>{if(e<=0)return Cn(t);let n=Cn(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost};return pt.forEach(t=>{let n=R(r[t.id]??0);if(n<=0)return;let o=n*ft*e;if(o<=0)return;let s=t.boostsTierId;a[s]=R((a[s]??0)+o),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},In=e=>R(e.purge?.points??0)>=gt,Ln=e=>1+R(e.eonsUpgrades?.eonAmplifierLevel??0)*1,Rn=e=>1*10**R(e),zn=e=>R(e.eons?.balance??0)>=Rn(e.hyperscalerCount??0),Bn=e=>{if(!zn(e))return e;let t=Rn(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:R(e.eons.balance)-t},hyperscalerCount:R(e.hyperscalerCount??0)+1}},Vn=e=>1+Math.max(0,ht[e]??-1)*1,Hn=e=>{let t=R(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return pt.forEach(e=>{(r[e.id]??null)===null&&t>=Vn(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},Un=(e,t)=>n=>!pt.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},Wn=e=>t=>{if(e<=0)return t;let n=t;return pt.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+bt);if(i>=1){let{affordable:e,totalCost:a}=wn(n,t.id,i);e>0&&(n=Tn(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},Gn=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},Kn=e=>qn(e.intro),qn=e=>{let t=0;for(let n=1;n<=10;n+=1)Number(e?.poolExponentBonuses?.[n])>=1&&(t+=1);return t},Jn=e=>{let t=qn(e);return F.filter(e=>t>=e).length},Yn=(e,t)=>{let n=I.slice(0,Jn(e)).filter(e=>e.arrayStepGain);return n.length?n.at(-1).arrayStepGain:t},Xn=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||ao(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolsCompacted`:return Kn(e)>=t.min;default:return!1}},Zn=(e,t)=>{if(t.min<=1)return null;switch(t.kind){case`counter`:return t.key===`maxFirstOverclock`?null:{current:e.achievements?.counters?.[t.key]??0,target:t.min};case`clockSpeedLevel`:return{current:e.globalTickspeedMultiplier??0,target:t.min};case`tierLevel`:return{current:e.purchaseLevels?.[t.tierId]??1,target:t.min};case`poolsCompacted`:return{current:Kn(e),target:t.min};case`storageUnlocked`:{let t=e=>Math.log2(Math.max(e,8)/8);return{current:Math.floor(t(e.intro?.capacity??0)),target:t(ke)}}default:return null}},Qn=e=>e.bonus??null,$n=e=>e.short??e.trigger,er=e=>e.shortBonus??e.bonus??null,tr=e=>e>=1?Math.max(st,10/(1+Math.log10(e))):1/0,nr=(e,t)=>!!e.achievements?.earned?.[t],rr=e=>{if(!ue.enabled)return e;let t=ve.filter(t=>!nr(e,t.id)&&Xn(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},ir=e=>me.filter(t=>{let n=ve.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>nr(e,t.id))}).map(e=>e.id),ar=.1,or=(e,t)=>{let n=ve.filter(e=>e.group===t&&!e.platformDependent),r=n.filter(t=>nr(e,t.id)).length,i=n.length>0&&r===n.length,a=Math.ceil(n.length*ar);return{earned:r,bonus:i?a:0,total:n.length+a,complete:i}},sr=e=>me.reduce((t,n)=>{let{earned:r,bonus:i}=or(e,n.id);return t+r+i},0),cr=e=>{if(!In(e))return e;let t=Tt(),n=Ln(e),r=R(e.era?.count??0)+1,i=Cr(e);return hn(Hn({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:Gn(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:yt()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:R(e.eons?.balance??0)+n},hyperscalerCount:R(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},lr=e=>{let t=e.prestigeDoublePpLevel??0,n=ui(t);if(R(e.purge.points)<n)return e;let r=Cn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},ur=e=>{let t=ve.filter(t=>t.group===`levelPower`&&nr(e,t.id)).length;return Math.round((1+fe*t)*1e6)/1e6},dr=(e,t=1)=>{let n=Math.max(0,R(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},fr=e=>2**R(e),pr=(e,t)=>Dr(e,`scaleUpNoDoubling`)||Or(e,`singleInstance`)===t?1:fr(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**Ar(e,`scaleUpPower`,1),mr=e=>Math.min(R(e.scaleUpTargetTierIndex??0),Nr(e)-1),hr=e=>b[mr(e)],gr=e=>3*(Math.max(0,R(e.scaleUpCount??0)-(Nr(e)-1))+1),_r=e=>{let t=yr(e);return t===null?5:t+vr(e)},vr=e=>{let t=ve.filter(t=>t.group===`overclockStep`&&nr(e,t.id)).length;return Math.max(1,4-t)},yr=e=>{let t=e.overclockLastClaimCompletedLevels??(R(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:R(t)},br=e=>(1+ot)**R(e),xr=e=>nt[e],Sr=e=>1/ad(e,`purge`),Cr=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&ad(e,`purge`)<=1,wr=e=>!!ce[e]&&le.has(e),Tr=e=>{let t=e.challenges?.active;return t&&wr(t)?ce[t]:null},Er=(e,t)=>!!e.challenges?.completed?.[t],Dr=(e,t)=>Tr(e)?.effect===t,Or=(e,t)=>{let n=Tr(e);return n?.effect===t?n.automation.key:null},kr=(e,t)=>({balance:Math.max(e.balance??0,R(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),Ar=(e,t,n)=>Tr(e)?.levers?.[t]??e.runLevers?.[t]??n,jr=(e,t)=>(Or(e,`halfDuplex`)===t?ne:1)*Ar(e,`production`,1),Mr=(e,t)=>{let n=x[t];if(!n)return n;let r=(Or(e,`premiumTier`)===t?re:1)*Ar(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},Nr=e=>Dr(e,`addressSpace`)?6:b.length,Pr=e=>b[Nr(e)-1],Fr=e=>Math.floor(R(e.challenges?.activeSeconds)/30+1e-9)%2==0,Ir=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!Tr(e))return n;if(Or(e,`clockGated`)===t||Or(e,`dutyCycle`)===t&&!Fr(e))return 1;if(Or(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},Lr=e=>{if(!Dr(e,`bitRot`))return 0;let t=R(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(ae,P*2**(t/30))/10**(zi(e.intro)-1)},Rr=e=>Tr(e)?.goal??8e100,zr=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,Br=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?Jt(n):t===`tierTickspeed`?Yt(n):xr(n))},Vr=(e,t)=>{let n=ce[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:sd(e,i))&&R(e.purge?.count??0)>=Br(n)},Hr=(e,t)=>N.find(n=>n.automation.kind===e&&n.automation.key===t&&wr(n.id))??null,Ur=(e,t,n)=>{let r=Hr(t,n);return!!r&&!Er(e,r.id)},Wr=e=>{let t=e.challenges?.completed??{},n=N.filter(n=>wr(n.id)&&!t[n.id]&&zr(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...Tt().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},Gr=e=>t=>{if(!Tr(t))return t;let n=t.challenges.run??yt();return{...t,challenges:{...t.challenges,activeSeconds:R(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:R(n.cycleSeconds)+e}}}},Kr=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??yt(),...t}}}),qr=(e,t,n)=>{if(n===t)return n;let r=n;if(Or(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return Or(n,`writeLock`)===e&&(r=Kr(r,{haltSeconds:10})),r},Jr={hardRefresh:{interval:300,apply:(e,t)=>Kr({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},Yr=(e,t)=>{let n=t,r=Or(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-ie)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=Kr({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(Dr(n,`bitRot`)&&Lr(n)>R(n.resources.base)){let e=Od(n,!1);n={...e,challenges:{...e.challenges,run:{...yt(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},Xr=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=Tr(r);if(!e)return _i(i,t,0)(r);let n=Jr[e.effect],a=R(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=R(r.challenges.run?.haltSeconds),l=c>0?Kr(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>Tr(e)?Gr(o)(e):e)(_i(o,t,c)(l)),d=!Tr(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=Tr(d)?Yr(o,d):d,s&&Tr(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},Zr=e=>!Cr(e)&&R(e.resources.base)>=Rr(e),Qr=e=>t=>{let n=S[t.id]??-1;if(n>=Nr(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},$r=e=>ei(R(e)/8),ei=e=>{let t=R(e);return t<1?0:Math.floor(Math.log10(t))},ti=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=ei(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},ni=e=>{let t=R(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},ri=e=>Dr(e,`clockSpeedDisabled`)?1:nn(e.globalTickspeedMultiplier??null,yr(e)??0)**Ar(e,`clockSpeedPower`,1),ii=e=>Dr(e,`clockSpeedDisabled`)?0:(1+at*br(yr(e)??0))**Ar(e,`clockSpeedPower`,1)-1,ai=e=>Dr(e,`scaleUpNoDoubling`)?1:2**Ar(e,`scaleUpPower`,1),oi=(e,t)=>{let n=Zt(Ir(e,t),Or(e,`halfStep`)===t?oe:Qe)*(t===Pr(e).id?an(e.lastTierXpConsumed??0):1),r=ri(e),i=Or(e,`noisyNeighbour`),a=(Or(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+se)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:xt},si=()=>Math.log2(64),ci=(e=0)=>{let t=R(e);return 64/2**Math.min(t,si())},li=(e=0)=>{let t=R(e),n=si();return t>n?2**(t-n):1},ui=(e=0)=>10**(R(e)+1),di=(e,t=0)=>{let n=R(e);if(n<8e100)return 0;let r=Math.floor(Math.log10(k)),i=Math.max(0,ei(n)-r),a=ci(t),o=li(t);return(1+Math.floor(i/a))*o},fi=(e,t)=>{let n=$r(R(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},pi=200,mi=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<pi;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=pi&&(o=Math.min(o,1)),{state:a,budget:o}},hi=(e,t,n,r)=>{let{state:i,budget:a}=mi(e,t,ad(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},gi=`unit`,_i=(e,t=1,n=0)=>r=>{let i=ko(r),a=Pa(e)(i),o=Va(as(e)(Za(e)(eo(e)(Ao(e)(a))))),s=Ms(e)(o),c=Es(e)(s),l=Cd(Ms(0)(c)),u=mu.reduce((t,n)=>n(e)(t),l),d=Nc(e)(u),f=jo(Ru(e)(d)),p=Jc(al(e,f)(Fa(e)(f))),m=tl(e)(p),h=Wn(e)(Fn(e)(m)),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=Vs(zs(t)),r=es(e)(rs(e)(n));return r===t?t:Ms(0)(r)};if(Zr(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+Sr(h)*e;return _(t>=.999999999?Td(h):{...h,autoPurgeAttemptBudget:t})}let v=sn(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*un(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!Qr(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/Zu(n,r.id);for(;a>=.999999999&&!(Math.floor(a+bt)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=Di(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=$u(i,r.id);if(n>1&&e===0){let e=Ii(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!ji(i,r))break;let o=Di(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,R(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!Qr(y)(e)||k)return;let t=oi(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+bt)/t);if(T[e.id]=n-r*t,r<=0)return;let i=Or(y,`flatRate`)===e.id?1:dr(y.purchaseLevels?.[e.id]??1,ur(y)),a=jr(y,e.id),o=wu(y.intro,S[e.id]+1),s=Nn(y,e.id),c=pr(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=R((C.base??0)+l*8)):C[e.producesResourceId]=R((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=R((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,ee=x[vt()],j=Math.max(0,(y.purchaseLevels?.[ee.id]??1)-1);if(j>0&&nr(y,`quettaSpent`)&&Qr(y)(ee)&&!k){let e=tr(j);A+=D;let t=Math.floor(A/e+bt);t>0&&(A=Math.max(0,A-t*e),C[ee.id]=R((C[ee.id]??0)+t),w[ee.id]=R((w[ee.id]??0)+t))}let te={...y,lastTierLevelCreditTimer:A,resources:C,owned:w,tierProductionAccumulators:T,purge:fi(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+Sr(y)*e}:{}},M=te.runPeaks?kr(te.runPeaks,te):null,N=te;Cr(N)&&g&&R(N.resources.base)>=Rr(N)&&(N.autoPurgeAttemptBudget??0)>=.999999999&&(N=Td(N));let ne=N.autoOverclock&&(N.autoOverclockEnabled??!0)?hi(N,e,`overclock`,Pd):N,re=ne.autoScaleUp&&(ne.autoScaleUpEnabled??!0)?hi(ne,e,`scaleUp`,Nd):ne,ie=re.autoXpTickspeed&&(re.autoXpTickspeedEnabled??!0)?hi(re,e,`restage`,e=>Vd(e.purge.xp)(e)):re,P=M?{...ie,runPeaks:M}:ie,ae=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=mi(t,e,dd(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>qu(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},P);return _(ae.autoGlobalTickspeed&&(ae.autoGlobalTickspeedEnabled??!0)?hi(ae,e,`speedUp`,vd):ae)},vi=(e,t=1)=>n=>rr(Tr(n)&&e>0?Xr(e,t,n):_i(e,t,0)(n)),yi=(e,t=We)=>{let n=Math.min(R(e),t,We);return Math.floor(n*(n>600?Ue:1))},bi=(e,t=1)=>n=>{let r=yi(e,vn(n)),i=n;for(let e=0;e<r;e++)i=vi(1,t)(i);return i},xi=(e,t=We)=>Math.floor(Math.min(R(e),t,We))-yi(e,t),Si=(e,t=1,n)=>r=>{let i=xi(e,n??vn(r)),a=r;for(let e=0;e<i;e++)a=vi(1,t)(a);return a},Ci=e=>{let t=Math.max(0,Math.floor(R(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},wi=(e,t)=>e.resources[t.costResourceId]??0,Ti=(e,t)=>e.purchased?.[t]??0,Ei=(e,t)=>n=>{if(Zr(n))return n;let r=Mr(n,e);if(!r||!Qr(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=zt(n),s=Wt(r,i,o,a,wi(n,r),t);if(s<=0)return n;let c=Vt(r,i)*s,l=Ti(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:R((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},Di=(e,t)=>n=>qr(e,n,Ei(e,t)(n)),Oi=e=>!!e.buyMaxUnlocked,ki=e=>R(e.purge?.count??0)>=1||R(e.era?.count??0)>=1||Me.some(t=>!!e.intro?.[t.autoFlagField]),Ai=e=>t=>{let n=t;for(let t=0;t<Ye;t++){let t=e(n);if(t===n)break;n=t}return n},ji=(e,t)=>{let n=Mr(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=zt(e),a=e.purchaseLevelProgress?.[n.id]??0;return Wt(n,r,i,a,wi(e,n),i)>=i-a},Mi=(e,t)=>{let n=Mr(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=zt(e);return Wt(n,r,i,0,wi(e,n),i)>=i},Ni=e=>t=>{if(Zr(t))return t;let n=Mr(t,e);if(!n||!Qr(t)(n))return t;if(!Mi(t,n))return Di(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&Mi(r,n);t++){let t=Di(e,2**53-1)(r);if(t===r)break;r=t}return r},Pi=e=>t=>qr(e,t,Ni(e)(t)),Fi=(e,t)=>n=>{if(Zr(n))return n;let r=Mr(n,e);if(!r||!Qr(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,Ye)&&Mi(i,r);n++){let t=Di(e,2**53-1)(i);if(t===i)break;i=t}return i},Ii=(e,t)=>n=>qr(e,n,Fi(e,t)(n)),Li=(e,t)=>{let n=Mr(e,t);if(Zr(e)||!n||!Qr(e)(n)||!Mi(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&Mi(r,n);e++){let e=Di(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=zt(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,Wt(n,o,a,0,wi(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:wi(e,n)-wi(r,n),lastLevelCost:wi(i,n)-wi(r,n),partialQuantity:s,partialCost:s>0?Ut(n,o,a,0,s):0}},Ri=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=zt(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Ti(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},zi=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*Ie.length,Number.isFinite(t)&&t>=1?t:1)},Bi=e=>{let t=zi(e),n=Math.floor((t-1)/Ie.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(Ie.length-1,Math.max(0,t-1-(n-1)*Ie.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=Ee,o=1-Yn(e,(1-a)**2);return 1-(1-Te)*a**(n+i)*o**(r-i)},Vi=(e,t=Te)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},Hi=e=>I.slice(0,Jn(e)).some(e=>e.syncedBitrate),Ui=e=>Hi(e)?e.capacity??0:e.speedCapacity??e.capacity??0,Wi=e=>Vi(Ui(e),Bi(e))*8,Gi=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(Oe);return 10**(n-t*(n-Math.log10(10)))},Ki=Math.log(Oe/100),qi=Math.log(Oe/10),Ji=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-Ki)*(Math.exp(qi*s)-Math.exp(qi*o))/qi},Yi=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(qi*a)+qi*n/t*Math.exp(Ki)*r,s=t/qi*Math.log(o);return Math.min(t,s)-i},Xi=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,Zi=e=>Gi(Xi(e)),Qi=e=>Zi(e),$i=e=>1+(e?.dataStreamTapBonusPercent??0)/100,ea=e=>Qi(e)/100,ta=e=>Wi(e)*Cu(e)*ea(e),na=100,ra=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?qa(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=$i(e),o=na*a,s=Wi(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},ia=e=>{if(ao(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(Wi(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},B=e=>{let t=ia(e);if(!ue.enabled||t===e)return t;let n=t.achievements??Tt().achievements;return rr({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}})},aa=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},oa=()=>10,sa=e=>{let t=Hs(e);return t?Math.ceil(t/Ie.length):null},ca=(e,t)=>{if(!Number.isInteger(t)||t<1||t>oa())return!1;let n=(t-1)*Ie.length+1;return Ie.every((t,r)=>{let i=Mo(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},la=e=>{let t=(e-1)*Ie.length+1;return Ie.map((e,n)=>Mo(t+n))},ua=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!U(e,r)?.rebuilding}),da=(e,t)=>!!U(e,t)?.rebuilding,fa=(e,t)=>!Number.isInteger(t)||t<1||t>oa()?!1:t===1||ca(e,t-1),pa=e=>{let t=0;for(let n=1;n<=oa()&&fa(e,n);n+=1)t=n;return t},ma=e=>8*xe**e,ha=e=>{let t=1;for(let n=2;n<=oa()&&!((e.intro?.capacity??0)<ma(n));n+=1)t=n;return t},ga=[1,2,4,8,16,32,64,125,250,500],_a=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return ga[t%10]*1e3**Math.floor(t/10)*8},va=Math.log10(2),ya=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*va)*8},ba=(e,t)=>{if(!Number.isInteger(t)||t<1||t>ha(e))return 0;let n=(Ca(e,t)/8)**Bi(e.intro),r=Wi(e.intro??{})/8,i=_a(Math.min(r,n)*8),a=Math.max(0,U(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=_a(o*Math.SQRT2);if(t>=oa())return o;let s=ba(e,t+1);return Math.max(i,Math.min(o,s/2))},xa=(e,t)=>{let n=ba(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,ma(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=ba({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:_a(Wi(e.intro??{}))},Sa=(e,t)=>{let n=ya(e??0),r=t===1?we(1).startBits:we(t-1).endBits,i=we(t).endBits;return Math.min(Math.max(n,r),i)},Ca=(e,t)=>!Number.isInteger(t)||t<1||t>ha(e)?0:Sa(e.intro?.capacity??0,t),wa=(e,t)=>Ca(e,t),Ta=(e,t)=>t<=ha(e)?wa(e,t):Sa(ma(t),t),Ea=(e,t)=>e.intro?.poolBuffers?.[t]??0,Da=(e,t)=>{let n=wa(e,t);return n>0?Math.min(1,Ea(e,t)/n):0},Oa=(e,t)=>Gi(Da(e,t)),ka=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,Aa=(e,t)=>Oa(e,t),ja=(e,t)=>1+ka(e,t)/100,Ma=(e,t)=>{let n=Wi(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-ba(e,r));return Math.min(ba(e,t),n)},Na=e=>t=>{if(!Number.isInteger(e)||e<1||e>ha(t))return t;let n=ka(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},Pa=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},Fa=e=>t=>{if(!ao(t))return t;let n=ha(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=Ma(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=wa(t,s),u=Math.max(0,l-c),d=n*Eu(t.intro,s),f=e;if(u>0){let t=Yi(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=Ji(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!bc(t,s)||!ca(t,s)||il(t,s))continue;let{lake:p,remainingBits:m,changed:h}=$c(t,s,n*yc(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},Ia=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||Ua(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,Hs(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,Hs(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,Hs(i.diskBuild.size)??1)),o>zi(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>oa())continue;let i=e[r]??0,a=Ta(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=sa(c);if(u){let t=Ta({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=Zc(o),c=Math.max(Xs(Ys(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),He[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=ze.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=Bo(t),a=V(t,n),o=Vo(t,n),s=Sd(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},La=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=Ps(e,t);return!n||S[n.id]>=Nr(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},Ra=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>La(e,t)),za=(e,t)=>{if(!t||t>ha(e))return 0;let n=Zc(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},Ba=e=>{if(e.intro.diskBuild||Io(e)||zo(e))return!1;let t=Bo(e);if(V(e,t)>=Vo(e,t))return!0;let n=sa(t);return da(e,n)||ua(e,n)?!1:ba(e,n)>0&&wa(e,n)>=t},Va=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=oa();e+=1){let n=U(t,e);if(!n?.rebuilding)continue;let r=la(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=Vc(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(wa(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},Ha=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!Ua(e),Ua=e=>{let t=oa(),{endBits:n}=we(t);return Ca(e,t)>=n},Wa=e=>Ha(e),Ga=e=>{let t=dl(e)?ro(e):e,n=t.intro.capacity*2,r=Hi(t.intro)?n:t.intro.speedCapacity??t.intro.capacity;return ko({...t,intro:{...t.intro,speedCapacity:r,capacity:n,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},Ka=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!Ua(e)},qa=e=>Ui(e),Ja=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated||Hi(t)?!1:qa(t)*2<=t.capacity},Ya=e=>Ja(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,Xa=e=>{if(!e.intro?.speedUpgradeQueued||!Hi(e.intro))return e;let t=Math.max(0,Number(e.intro.speedUpgradeProgress)||0);return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t),speedUpgradeQueued:!1,speedUpgradeProgress:0}}},Za=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;if(Hi(t.intro))return Xa(t);let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=qa(t.intro),a=Math.min(t.intro.bits,Wi(t.intro)*$i(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},Qa=e=>$a(e),$a=e=>Ka(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,eo=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(Ua(t))return to(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,Wi(t.intro)*$i(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?Ga(a):a},to=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,no=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],ro=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of Fe)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of no)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},io=e=>(e.intro?.capacity??0)>=De,ao=e=>(e.intro?.capacity??0)>=ke,oo=[`B`,...b.map(e=>e.symbol)],so=1e3,co=[`b`,...oo.slice(1).map(e=>e.replace(/B$/,`b`))],lo=e=>{let t=1,n=0;for(;e/t>=so&&n<co.length-1;)t*=so,n+=1;return{symbol:co[n],divisor:t}},uo=e=>{let t=8,n=0;for(;e/t>=so&&n<oo.length-1;)t*=so,n+=1;return{symbol:oo[n],divisor:t}},fo=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],po=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<fo.length-1;)n*=xe,r+=1;return{symbol:fo[r],divisor:n}},mo=(e,t)=>Math.floor(e*10**t)/10**t,ho=e=>{let t=Math.floor(e);return`${z(t)} bit${t===1?``:`s`}`},go=3,_o=5,vo=e=>e>=4?_o:4,yo=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(go,Math.max(0,vo(t)-t))},bo=(e,t)=>{if(t){let n=e/t.divisor,r=mo(n,yo(n));return r>0&&r<1?ho(e):`${z(r)} ${t.symbol}`}return ho(e)},xo=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),So=(e,t)=>{if(!t)return ho(e);let n=e/t.divisor,r=yo(n),i=mo(n,r);return i>0&&i<1?ho(e):i===0?`${z(i)} ${t.symbol}`:`${xo[r].format(i)} ${t.symbol}`},Co=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},wo=e=>e.replace(/^[\d,]*\.?\d+/,e=>Co(Number(e.replace(/,/g,``)))),To=e=>bo(e,po(e,!0)),Eo=e=>bo(e,uo(e)),Do=e=>Vt(b[0],e.purchaseLevels?.[b[0].id]??1)*8,Oo=e=>{let t=Do(e);if(e.intro.bits<t)return e;let n=b[0].id;return Ri(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},ko=e=>e.intro?.mainGameUnlocked||!ao(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},Ao=e=>t=>{if(!t.intro.byteCreated)return t;let n=Wi(t.intro)*Cu(t.intro),r=Yi(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},jo=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=Ht(zt(e),n,2**53-1),i=Do(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return Ri(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},Mo=e=>Ae*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),No=e=>pa(e)*Ie.length,Po=e=>Math.min(No(e),zi(e.intro)),Fo=e=>Mo(zi(e.intro)),Io=e=>{let t=Bo(e);return t<Fo(e)&&!da(e,sa(t))},Lo=e=>e.intro?.diskBuild||!zo(e)?!1:zi(e.intro)<No(e),Ro=e=>{if(!Lo(e))return e;let t=zi(e.intro)+1,n=wd(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},zo=e=>((e.intro?.disksBuiltTotal??{})[Mo(Po(e))]??0)>=9,Bo=e=>{let t=e.intro?.disksBuiltTotal??{},n=Po(e),r=1,i=Mo(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=Mo(r);return i},Vo=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),Ho=(e,t)=>t*Vo(e,t),V=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,H=Eo,Uo=e=>({symbol:oo[e]??oo[oo.length-1],divisor:8*so**e}),Wo=(e,t)=>bo(e,Uo(t)),Go=(e,t)=>{let n=Uo(t);return e>0&&e<n.divisor?uo(e):n},Ko=(e,t)=>bo(e,Go(e,t)),qo=(e,t)=>So(e,Go(e,t)),Jo=e=>bo(e,lo(e)),Yo=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=Bo(e),i=[];for(let t=1;t<=ha(e);t+=1)i.push(Zc(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},Xo=e=>Ba(e)&&!Ra(e),Zo=e=>!Xo(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},Qo=e=>e.intro?.diskBuildQueued||Io(e)||e.intro.diskBuild||zo(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},$o=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,es=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!Xo(t))return t;let n=Bo(t),r=sa(n),i=V(t,n),a=Vo(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?Sd(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=Ea(t,r),u=Math.max(0,l-za(t,r)),d=ba(t,r)*ja(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-bt){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-bt;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},ts=200,ns=(e,t)=>{let n=sa(t);return t/Math.max(xa(e,n)*ja(e,n),Number.MIN_VALUE)},rs=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!Io(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<ts;e+=1){let e={...t,intro:n};if(!Io(e))break;let a=Bo(e),o=sa(a);if(da(e,o)||ua(e,o)||wa(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=ba(e,o)*ja(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-za(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},is=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!Io(e))return t;let n=zi(e.intro);for(let r=1;r<n;r+=1){let n=Mo(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,ba(e,sa(n))<=0&&(t.projected=!0);let s=ns(e,n);t.seconds+=(9-a-o)*s}return t},as=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>bt?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},os=e=>{let t=Hs(e);return t?Mo(t+1):e*10},ss=e=>{let t=sa(e);return!!t&&sa(os(e))===t},cs=(e,t)=>e.intro?.diskWriteCache?.[t]??null,ls=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,us=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],ds=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,fs=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,ls(e)-(e.segmentsCollected??0)*t),r=us(e).reduce((e,t)=>e+ds(t),0);return Math.min(1,Math.max(0,(n+r)/t))},ps=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,ms=(e,t)=>{let n=cs(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=us(n);return r.length>0&&r.every(t=>Fs(e,t.size))},hs=e=>{let t=Hs(e);if(!t||t<=1)return null;let n=Mo(t-1),r=sa(e);return r&&sa(n)===r?n:null},gs=(e,t)=>!hs(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),_s=(e,t,n=!1)=>({sourceSize:hs(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),vs=(e,t)=>{if(!hs(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=cs(e,t);return!n||!n.expedite&&n.segmentsCollected<10},ys=(e,t)=>!!cs(e,t)?.expedite,bs=e=>t=>{if(!vs(t,e))return t;let n=cs(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:_s(t,e,!0)}}}},xs=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},Ss=(e,t)=>{let n=ba(e,sa(t))*5;return t/Math.max(n,Number.MIN_VALUE)},Cs=(e,t,n,r)=>{let i=sa(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of us(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=la(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||Fs(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},ws=1-1e-9,Ts=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),Es=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=sa(s.sourceSize);if(c===sa(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,Ta(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;gs(t,e)&&(i[e]=_s(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=sa(c),d=ja(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>bt){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??hs(c);if(!(p>0))continue;let m=us(l),h=ls(l),g=[];for(let t of m){if(Fs(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>bt?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=xs(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-za(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*ws){let e=g.reduce((e,t)=>e+t.size,0);for(let n of Cs(s,c,c-h-e,g)){let e=Ss(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*ws){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&Ts(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},Ds=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,Os=(e,t)=>{let n=t/8,r=ba(e,sa(t))*2;return n/Math.max(r,Number.MIN_VALUE)},ks=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,As=(e,t)=>Ds(e,t)?Fs(e,t):!1,js=e=>Ws(e)===Ie[0],Ms=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=ha(t),d=e=>{if(!js(e))return!1;let t=sa(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=sa(n);r&&(i[r]=Math.min(a(r)+s[n],Ta(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(Zc(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=sa(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*ba(t,r)*5*ja(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*bt?n:e,l=!0}}}for(let e of p){if(c[e]||cs(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||Fs(t,e))continue;let a=Os(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||Fs(h,r))continue;let a=i.remainingSeconds-e*ja(t,sa(r));if(a>bt){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},Ns=e=>{let t=Ws(e);return t?Ie.indexOf(t)+1:null},Ps=(e,t)=>{let n=Us(t),r=Ns(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},Fs=(e,t)=>Ps(e,t)!==void 0,Is=(e,t)=>{let n=Us(t),r=Ns(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},Ls=(e,t)=>Ps(e,t)?.name??null,Rs=e=>t=>{if(!La(t,e))return t;let n=Ps(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return Ri(n.id,zt(t))({...t,intro:{...t.intro,disks:o}})},zs=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>La(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:Rs(t)(e)},Bs=(e,t)=>{if(e<1||e>10)return null;let n=Ie[t-1];return n===void 0?null:Mo(Xc(e,n))},Vs=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=Nr(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=Bs(S[e.id]+1,1);if(i===null||La(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=Vt(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=zt(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=Ri(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},Hs=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/Ae;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||Mo(n)!==e?null:n},Us=e=>{let t=Hs(e);return!t||t>Ve?null:Math.floor((t-1)/Ie.length)+1},Ws=e=>{let t=Hs(e);return!t||t>Ve?null:Ie[(t-1)%Ie.length]},Gs=e=>Be[e-1]??null,U=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??Ct(),Ks=(e,t)=>U(e,t)?.capacityLevel??0,qs=(e,t)=>Ks(e,t)>=3,Js=(e,t)=>He[Math.min(Ks(e,t),3)]+Math.max(0,U(e,t)?.resetCount??0)*1e3,Ys=(e,t)=>{let n={};return Ie.forEach((t,r)=>{n[t]=r<e?Le[r]:0}),n[Re]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},Xs=e=>ze.reduce((t,n)=>t+n*(e[n]??0),0),Zs=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},Qs=(e,t)=>Ys(Ks(e,t),U(e,t)?.resetCount??0),$s=(e,t)=>Xs(Qs(e,t)),ec=(e,t)=>Math.min(Js(e,t),$s(e,t)+1),tc=(e,t)=>Zs(U(e,t)?.depositedUnits??0).disks,nc=(e,t)=>U(e,t)?.fillBits??0,rc=(e,t)=>{let n=Zc(t);return n>0&&nc(e,t)>=n},ic=(e,t)=>{let n=Zc(t);return n>0?Math.min(1,Math.max(0,nc(e,t)/n)):0},ac=(e,t)=>U(e,t)?.lakeTransfer??null,oc=(e,t)=>{let n=ac(e,t);if(!n)return 0;let r=n.target*Zc(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},sc=(e,t)=>(U(e,t)?.depositedUnits??0)+ +!!rc(e,t),cc=(e,t)=>{let n=U(e,t),r=Zc(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},lc=(e,t)=>{let n=Sc(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=cc(e,t);return r>=n*(1-1e-9)&&Pc(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},uc=(e,t)=>Sc(t)(e)<=ec(e,t),dc=(e,t)=>!rc(e,t),fc=(e,t)=>{let n=U(e,t);if(!n||n.lakeTransfer||!rc(e,t))return null;let r=Qs(e,t),i=n.depositedUnits??0,a=Zs(i).disks;for(let e=ze.length-1;e>=0;--e){let t=ze[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},pc=(e,t,n)=>ba(e,t)*ja(e,t)*(n===1?2:5),mc=(e,t)=>{let n=nc(e,t);return n>0&&n<Zc(t)},hc=(e,t)=>{let n=wa(e,t);return n>0&&Ea(e,t)>=n},gc=(e,t)=>!!U(e,t)?.acquiring,_c=(e,t)=>mc(e,t)?!0:gc(e,t)?nl(e,t)&&!rl(e,t,!0)&&Ea(e,t)>za(e,t):hc(e,t),vc=e=>I.slice(0,Jn(e.intro)).reduce((e,t)=>e+(t.lakeSpeed??0),0),yc=(e,t)=>Math.round((.1+.1*Math.max(0,U(e,t)?.resetCount??0)+vc(e))*1e6)/1e6,bc=(e,t)=>(e.intro?.disksBuiltTotal?.[Zc(t)]??0)>0,xc=(e,t)=>(U(e,t)?.boostersUnlocked??!1)||bc(e,t),Sc=e=>t=>{let n=U(t,e);return n?(n.purchased??0)+1:0},Cc=(e,t)=>{let n=Me[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},wc=(e,t)=>Cc(e,t)?18:10,Tc=(e,t)=>wc(e,Fe.indexOf(t)+1),Ec=(e,t)=>{let n=Fe[t-1];return n?Math.max(0,wc(e,t)-(e.intro?.[n]??0)):0},Dc=(e,t)=>{if(!Cc(e,t))return 0;let n=Me[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=Fe[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+Ac(e,t-1))},Oc=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},kc=(e,t)=>Oc(e,t)!==null,Ac=(e,t)=>{let n=Oc(e,t);return n===null?0:Math.floor(n/1+bt)},jc=(e,t)=>{let n=Me[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!kc(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<Tc(e,n.outputField)},Mc=e=>t=>jc(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,Nc=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=Me[r],s=Oc(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=Tc({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+bt)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=Tc({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},Pc=(e,t,n)=>{if(!U(e,t)||!(n>0))return null;let r=tc(e,t),i=[(r[1]??0)+ +!!rc(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},Fc=(e,t)=>xc(e,t)&&Ec(e,t)>0&&Pc(e,t,Sc(t)(e))!==null,Ic=(e,t)=>Ec(e,t)<=0,Lc=(e,t=1)=>n=>{let r=U(n,e);if(!r||!xc(n,e))return n;let i=Fe[e-1];if(!i)return n;let a=Ec(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=Pc(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=tc(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=Yc(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},Rc=(e,t)=>{let n=Sc(t)(e);if(Pc(e,t,n)!==null)return 0;let r=Zc(t);return Math.max(r,(n-cc(e,t))*r)},zc=(e,t)=>{if(ca(e,t)||!bc(e,t))return!1;let n=Zc(t);return Rc(e,t)<=n*1e-9||Sc(t)(e)>ec(e,t)||!dc(e,t)?!1:Ea(e,t)>0&&_c(e,t)},Bc=e=>t=>{if(!zc(t,e))return t;let n=Rc(t,e),r=Ea(t,e),i=Zc(e)-nc(t,e),a=gc(t,e)&&!mc(t,e)?Math.max(0,r-za(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=Qc(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},Vc=(e,t)=>n=>{let r=U(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},Hc=(e,t)=>U(e,t)?.autoConvertActive??!1,Uc=(e,t)=>!!U(e,t)?.boosterAuto||ca(e,t),Wc=(e,t)=>{let n=U(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!xc(e,t)||!bc(e,t)?!1:Ec(e,t)>0},Gc=(e,t)=>{let n=U(e,t);return!n||n.rebuilding||!ca(e,t)?!1:!n.lakeTransfer&&sc(e,t)>=Js(e,t)&&Sc(t)(e)>Js(e,t)},Kc=e=>t=>{if(!Gc(t,e))return t;let n=U(t,e),r=la(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=sa(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return rr({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},qc=e=>t=>{let n=U(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&Fc(t,e)?Lc(e,1)(t):Wc(t,e)?Vc(e,!0)(t):t},Jc=e=>{let t=e;for(let e=1;e<=10;e+=1){if(ca(t,e)&&!U(t,e)?.boosterAuto){let n=U(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}U(t,e)?.boosterAuto&&Sc(e)(t)<=Js(t,e)&&Fc(t,e)&&(t=Lc(e,1)(t)),Hc(t,e)&&(Ec(t,e)<=0?t=Vc(e,!1)(t):bc(t,e)?Fc(t,e)?(t=Lc(e,1)(t),t=Vc(e,!1)(t)):t=Bc(e)(t):t=Vc(e,!1)(t))}return t},Yc=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},Xc=(e,t)=>(e-1)*Ie.length+Ie.indexOf(t)+1,Zc=e=>Mo(Xc(e,Ie[0])),Qc=(e,t,n,r)=>{let i=t[n]??U(e,n),a=Zc(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},$c=(e,t,n,r,i)=>{let a=U(e,t),o=Math.max(0,Zc(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=Qc(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},el=(e,t,n)=>{let r=U(e,t);if(!r||!bc(e,t))return r;let i=Zc(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=fc(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=pc(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},tl=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=U(t,r),a=el(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},nl=(e,t)=>la(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),rl=(e,t,n=!1)=>{let r=e.intro??{};if(da(e,t))return!0;if(Io(e)){let n=Bo(e);if(sa(n)===t&&wa(e,t)>=n)return!0}if(r.diskBuild&&sa(r.diskBuild.size)===t)return!0;let i=la(t);return!n&&i.some(t=>V(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(Bo(e))},il=(e,t)=>!bc(e,t)||!dc(e,t)?!1:mc(e,t)?Ea(e,t)>0:(gc(e,t)||hc(e,t))&&nl(e,t)&&!rl(e,t,gc(e,t))&&Ea(e,t)>za(e,t),al=(e,t=null)=>n=>{if(!(e>0))return n;let r=ha(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!il(n,o))continue;let r=Ea(n,o),s=mc(n,o)?r:Math.max(0,r-za(n,o));if(s<=0)continue;let c=ba(n,o)*ja(n,o)*yc(n,o),{lake:l,remainingBits:u,changed:d}=$c(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},ol=(e,t)=>cc(e,t)*Zc(t),sl=(e,t)=>Mo(Xc(e,Ie[t])),cl=(e,t)=>{if(t<1||t>10||qs(e,t))return!1;let n=sl(t,Ks(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},ll=(e,t)=>cl(e,t),ul=e=>t=>{if(!ll(t,e))return t;let n=U(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:Ks(t,e)+1}}}}},dl=e=>(e.intro?.capacity??0)>=je,fl=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},pl=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=fl(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,Tc(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},ml=pl(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),hl=pl(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),gl=pl(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),_l=pl(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),vl=pl(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),yl=pl(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),bl=pl(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),xl=pl(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Sl=pl(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Cl=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=Tc(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},wl=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(Tc(r,n),(r.intro?.[n]??0)+1))}}},Tl=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!kc(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=El(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?Cl(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?Vu(d,a+1):d;return wl(e,i,n)(f)},El=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=Me.length)return 0;let n=t+1,r=ba(e,n);return!(r>0)||!Number.isFinite(r)?0:8*Os(e,Mo((n-1)*Ie.length+1))},Dl=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,Ol=(e,t)=>n=>Dl(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,kl=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<Tc(e,n),Al=(e,t)=>{let n=Me[t];return n?kl(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},jl=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=Me[e];return kl(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},Ml=e=>Tl(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),Nl=Ol(`computeNodes`,`autoMergeCoresIntoNode`),Pl=e=>Dl(e,`computeNodes`,`autoMergeCoresIntoNode`),Fl=jl(0),Il=e=>Tl(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),Ll=Ol(`computeClusters`,`autoMergeNodesIntoCluster`),Rl=e=>Dl(e,`computeClusters`,`autoMergeNodesIntoCluster`),zl=jl(1),Bl=e=>Tl(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),Vl=Ol(`computeNetworks`,`autoMergeClustersIntoNetwork`),Hl=e=>Dl(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),Ul=jl(2),Wl=e=>Tl(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),Gl=Ol(`computeGrids`,`autoMergeNetworksIntoGrid`),Kl=e=>Dl(e,`computeGrids`,`autoMergeNetworksIntoGrid`),ql=jl(3),Jl=e=>Tl(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),Yl=Ol(`computeFabrics`,`autoMergeGridsIntoFabric`),Xl=e=>Dl(e,`computeFabrics`,`autoMergeGridsIntoFabric`),Zl=jl(4),Ql=e=>Tl(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),$l=Ol(`computeClouds`,`autoMergeFabricsIntoCloud`),eu=e=>Dl(e,`computeClouds`,`autoMergeFabricsIntoCloud`),tu=jl(5),nu=e=>Tl(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),ru=Ol(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),iu=e=>Dl(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),au=jl(6),ou=e=>Tl(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),su=Ol(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),cu=e=>Dl(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),lu=jl(7),uu=e=>Tl(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),du=Ol(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),fu=e=>Dl(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),pu=jl(8),mu=[Ml,Il,Bl,Wl,Jl,Ql,nu,ou,uu],hu=e=>Number.isInteger(e)&&e>=1&&e<=Fe.length,gu=e=>hu(e)?Fe[e-1]:null,_u=(e,t)=>{let n=Ne[e];return!n||!hu(t)?0:n.multiplier},vu=(e,t)=>{let n=Ne[e];return!n||!hu(t)?0:n.durationSeconds},yu=e=>{let t=e?.computeBoostType??null;if(!t||!Ne[t])return null;let n=e.computeBoostTierIndex??1,r=hu(n)?n:1,i=Ne[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},bu=e=>{let t=e?.computeBoosts??{},n=yu(e),r=[];for(let e of Object.keys(Ne)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},xu=(e,t)=>bu(e).find(e=>e.type===t)??null,Su=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},Cu=e=>bu(e).reduce((e,t)=>e+Ne[t.type].multiplier,0)||1,wu=(e,t)=>bu(e).reduce((e,n)=>e+(n.queue[0]>=t?Ne[n.type].multiplier:0),0)||1,Tu=e=>bu(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),Eu=(e,t)=>1+bu(e).reduce((e,n)=>e+(n.queue[0]>=t?Ne[n.type].poolBonusPercent??0:0),0)/100,Du=(e,t,n)=>{if(!Ne[t])return!1;let r=gu(n);return!r||(xu(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},Ou=(e,t,n)=>Du(e,t,n),ku=(e,t)=>{let n=xu(e.intro,t);return!!n&&Du(e,t,n.queue[0])},Au=(e,t)=>ku(e,t),ju=(e,t)=>Math.max(0,(xu(e.intro,t)?.queue.length??0)-1),Mu=(e,t)=>ju(e,t)>0,Nu=e=>t=>{if(!Mu(t,e))return t;let n=bu(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=gu(i),o=Su(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},Pu=(e,t)=>{let n=xu(e.intro,t);return!!n&&n.queue.length===1},Fu=e=>t=>Pu(t,e)?Su(t,bu(t.intro).filter(t=>t.type!==e)):t,Iu=(e,t)=>n=>{if(!Ou(n,e,t))return n;let r=gu(t),i=bu(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:vu(e,t)};let s=Su(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},Lu=e=>t=>Au(t,e)?Iu(e,xu(t.intro,e).queue[0])(t):t,Ru=e=>t=>{let n=bu(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=vu(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return Su(t,r)},zu=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},Bu=e=>t=>!Ne[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},Vu=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=Ne[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return Ou(e,n,t)?Iu(n,t)(e):e},Hu=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},Uu=(e,t,n)=>n+ +(Or(e,`egressFees`)===t),Wu=(e,t,n)=>{let r=Uu(e,t,n);return Or(e,`burnRate`)===t?Kt(t,r):qt(t,r)},Gu=(e,t,n)=>Math.max(Kt(t,Uu(e,t,n)),Wu(e,t,n)+(t===vt()?0:1)),Ku=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(Or(e,`clockGated`)===t||Or(e,`rateLimit`)===t&&n+1>4)return!0;if(Or(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},qu=e=>t=>{if(Zr(t))return t;let n=x[e];if(!n||!Qr(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(Ku(t,e))return t;let i=Wu(t,e,r+1),a=t.resources[n.id]??0;return a<Gu(t,e,r+1)?t:rr({...t,resources:{...t.resources,[n.id]:R(a-i)},owned:{...t.owned,[n.id]:R(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},Ju=e=>1*((S[e]??0)+1),Yu=e=>Math.max(0,Math.ceil(Math.log(tt/Ju(e))/Math.log(et))),Xu=(e,t)=>Math.max(tt,Ju(e)*et**t),Zu=(e,t)=>Xu(t,e.autobuyerIntervalLevels?.[t]??0),Qu=(e,t)=>Math.min($e,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-Yu(t))),$u=(e,t)=>2**Qu(e,t),ed=e=>Yu(e)+$e,td=e=>ga[e%10]*1e3**Math.floor(e/10),nd=(e,t)=>{let n=1,r=ga.indexOf(e);for(;r===-1&&n<e;)n*=10,r=ga.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*td(r+t)},rd=(e,t=b[0].id)=>((S[t]??0)+1)*nd(10,e),W=e=>t=>{if(Zr(t)||Ur(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=ed(e))return t;let r=rd(n,e);if(R(t.purge.points)<r)return t;let i=Cn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},G=e=>Math.max(0,Math.ceil(Math.log(tt/e)/Math.log(et))),id=e=>G(rt[e].baseSeconds),ad=(e,t)=>Math.max(tt,rt[t].baseSeconds*et**(e.automationIntervalLevels?.[t]??0)),od=(e,t)=>nd(rt[e].baseCost,t),sd=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,cd=sd,ld=e=>t=>{if(!rt[e]||Zr(t)||Ur(t,`global`,e)||!sd(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=id(e))return t;let r=od(e,n);if(R(t.purge.points)<r)return t;let i=Cn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},ud=()=>G(it.baseSeconds),dd=(e,t)=>Math.max(tt,it.baseSeconds*et**(e.tierTickspeedIntervalLevels?.[t]??0)),fd=(e,t=b[0].id)=>((S[t]??0)+1)*nd(it.baseCost,e),pd=e=>t=>{if(Zr(t)||Ur(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=ud())return t;let r=fd(n,e);if(R(t.purge.points)<r)return t;let i=Cn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},md=e=>t=>({...t,computeAutoChargeEnabled:!!e}),hd=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,gd=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,_d=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},vd=e=>{if(Zr(e)||Dr(e,`clockSpeedDisabled`)||!tn(e))return e;let t=e.globalTickspeedMultiplier??null,n=$t(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},yd=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(R(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(R(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(R(n?.capacityLevel??0))),r=Math.max(0,Math.floor(R(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,R(e?.capacity??8)),speedCapacity:Math.max(8,R(e?.speedCapacity??e?.capacity??8))}},bd=(e,t)=>{let n=e??yd(null),r=t??yd(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},xd=(e,t)=>{let n=Bo(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:V(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},Sd=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=V(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},Cd=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=aa(n);e!==n&&(n=e,r=!0)}if(!Io(n)&&xd(n,t)){let e=Zo(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=!Hi(n.intro)&&(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=Ya(n)),a===n&&i&&(a=$a(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((U(n,t)?.purchased??0)<(i.purchased??0)&&Fc(n,t)){let e=Lc(t,(i.purchased??0)-(U(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((U(n,t)?.purchased??0)>=(i.purchased??0)||Ic(n,t)||Sc(t)(n)>Js(n,t))&&Ks(n,t)<(i.capacityLevel??0)){let e=ul(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},wd=e=>{let t=Tt().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=bd(n.foundryResetCaps,yd(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:zi(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},Td=e=>{if(R(e.resources.base)<Rr(e))return e;let t=Tr(e);if(!t)return hn(Od(e,!0));let n=Er(e,t.id),r=R(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return hn({...Od(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:yt(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},Ed=e=>t=>{if(!wr(e)||Tr(t)||!Vr(t,e))return t;let n={...Tt().challenges,...t.challenges};return{...Od(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:yt()}}},Dd=e=>Tr(e)?hn({...Od(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:yt()}}):e,Od=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=t?di(e.resources[O],n):0,i=Tt(),a=e.purge.count+ +!!t,o=Cr(e),s={id:`p${a}-${Date.now()}`,at:Date.now(),purgeNumber:a,pointsAwarded:r,moneyBits:R(e.resources[O])},c=e.prestigeMuseum??i.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return Xt({...i,challenges:e.challenges??i.challenges,achievements:e.achievements??i.achievements,daily:e.daily??i.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...i.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??i.intro.mainGameUnlocked,capacity:e.intro?.capacity??i.intro.capacity,byteCreated:e.intro?.byteCreated??i.intro.byteCreated,bits:e.intro?.bits??i.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??i.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??i.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??i.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??i.intro.diskCache,diskBuild:e.intro?.diskBuild??i.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??i.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??i.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??i.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??i.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??i.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:zi(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??i.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??i.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??i.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??i.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??i.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??i.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??i.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??i.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??i.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??i.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??i.intro.computeNodes,computeClusters:e.intro?.computeClusters??i.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??i.intro.computeNetworks,computeGrids:e.intro?.computeGrids??i.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??i.intro.computeFabrics,computeClouds:e.intro?.computeClouds??i.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??i.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??i.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??i.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??i.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??i.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??i.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??i.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??i.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??i.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??i.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??i.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??i.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??i.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??i.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??i.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??i.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??i.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??i.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??i.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??i.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??i.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??i.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??i.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??i.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??i.autobuyers,autobuyersEnabled:e.autobuyersEnabled??i.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??i.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??i.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??i.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??i.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??i.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??i.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??i.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??i.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??i.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??i.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??i.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??i.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??i.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??i.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??i.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??i.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??i.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??i.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??i.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??i.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??i.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??i.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??i.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??i.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??i.autoGlobalTickspeedEnabled,era:e.era??i.era,eons:e.eons??i.eons,hyperscalerCount:e.hyperscalerCount??i.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??i.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??i.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??i.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||R(e.purge.points)+r>=100,owned:e.computeFlops?.owned??i.computeFlops.owned,cumulativeBoost:i.computeFlops.cumulativeBoost},purge:{...i.purge,points:R(e.purge.points)+r,count:a,unboundedUnlocked:o}})},kd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},Ad=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},jd=(e,t)=>t!==e&&Dr(t,`bitRot`)?Kr(t,{cycleSeconds:0}):t,Md=(e,t)=>t===e?t:hn(t),Nd=e=>jd(e,Md(e,Fd(e))),Pd=e=>{let t=Ld(e);return t===e?jd(e,Md(e,t)):rr(Id(e,jd(e,Md(e,t))))},Fd=e=>{if(Zr(e))return e;let t=hr(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<gr(e))return e;let n=Tt(),r=mr(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<Nr(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:R(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:yr(e)??n.overclockLastClaimCompletedLevels}},Id=(e,t)=>{let n=Math.max(0,(e.purchaseLevels?.[Pr(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=yr(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&nr(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),Cr(e)&&n>=12&&nr(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},Ld=e=>{if(Zr(e)||Dr(e,`overclockDisabled`))return e;let t=Pr(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<_r(e))return e;let r=Tt();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},Rd=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,zd=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,Bd=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,Vd=e=>t=>Ud(e,!1)(t),Hd=e=>t=>{let n=R(t.owned?.[Pr(t).id])<=0,r=Ud(e,!0)(t);if(!n||r===t||!ue.enabled)return r;let i=r.achievements??Tt().achievements;return rr({...r,achievements:{...i,counters:{...i.counters,emptyRestages:(i.counters?.emptyRestages??0)+1}}})},Ud=(e,t)=>n=>{if(Zr(n)||Dr(n,`restageDisabled`)||!rn(n))return n;let r=Pr(n).id;if(!t&&R(n.owned?.[r])<=0)return n;let i=Math.floor(R(e));if(i<=0)return n;let a=n.lastTierXpConsumed??0;if(i<on(a))return n;let o=R(n.purge.xp);if(i>o)return n;let s=b.filter(e=>e.id!==r).map(e=>e.id);return{...n,purge:{...n.purge,xp:o-i},lastTierXpConsumed:a+i,owned:{...n.owned,...s.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...n.resources,[O]:0,...s.reduce((e,t)=>({...e,[t]:0}),{})}}},Wd=`-ms-`,Gd=`-moz-`,K=`-webkit-`,Kd=`comm`,qd=`rule`,Jd=`decl`,Yd=`@import`,Xd=`@namespace`,Zd=`@keyframes`,Qd=`@layer`,$d=Math.abs,ef=String.fromCharCode,tf=Object.assign;function nf(e,t){return sf(e,0)^45?(((t<<2^sf(e,0))<<2^sf(e,1))<<2^sf(e,2))<<2^sf(e,3):0}function rf(e){return e.trim()}function af(e,t){return(e=t.exec(e))?e[0]:e}function q(e,t,n){return e.replace(t,n)}function of(e,t,n){return e.indexOf(t,n)}function sf(e,t){return e.charCodeAt(t)|0}function cf(e,t,n){return e.slice(t,n)}function lf(e){return e.length}function uf(e){return e.length}function df(e,t){return t.push(e),e}function ff(e,t){return e.map(t).join(``)}function pf(e,t){return e.filter(function(e){return!af(e,t)})}var mf=1,hf=1,gf=0,J=0,_f=0,vf=``;function yf(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:mf,column:hf,length:o,return:``,siblings:s}}function bf(e,t){return tf(yf(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function xf(e){for(;e.root;)e=bf(e.root,{children:[e]});df(e,e.siblings)}function Sf(){return _f}function Cf(){return _f=J>0?sf(vf,--J):0,hf--,_f===10&&(hf=1,mf--),_f}function wf(){return _f=J<gf?sf(vf,J++):0,hf++,_f===10&&(hf=1,mf++),_f}function Tf(){return sf(vf,J)}function Ef(){return J}function Df(e,t){return cf(vf,e,t)}function Of(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function kf(e){return mf=hf=1,gf=lf(vf=e),J=0,[]}function Af(e){return vf=``,e}function jf(e){return rf(Df(J-1,Pf(e===91?e+2:e===40?e+1:e)))}function Mf(e){for(;(_f=Tf())&&_f<33;)wf();return Of(e)>2||Of(_f)>3?``:` `}function Nf(e,t){for(;--t&&wf()&&!(_f<48||_f>102||_f>57&&_f<65||_f>70&&_f<97););return Df(e,Ef()+(t<6&&Tf()==32&&wf()==32))}function Pf(e){for(;wf();)switch(_f){case e:return J;case 34:case 39:e!==34&&e!==39&&Pf(_f);break;case 40:e===41&&Pf(e);break;case 92:wf()}return J}function Ff(e,t){for(;wf()&&e+_f!==57&&(e+_f!==84||Tf()!==47););return`/*`+Df(t,J-1)+`*`+ef(e===47?e:wf())}function If(e){for(;!Of(Tf());)wf();return Df(e,J)}function Lf(e){return Af(Rf(``,null,null,null,[``],e=kf(e),0,[0],e))}function Rf(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=wf()){case 40:if(m!=108&&sf(C,d-1)==58){of(C+=q(jf(v),`&`,`&\f`),`&\f`,$d(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=jf(v);break;case 9:case 10:case 13:case 32:C+=Mf(m);break;case 92:C+=Nf(Ef()-1,7);continue;case 47:switch(Tf()){case 42:case 47:df(Bf(Ff(wf(),Ef()),t,n,c),c),(Of(m||1)==5||Of(Tf()||1)==5)&&lf(C)&&cf(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=lf(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=q(C,/\f/g,``)),p>0&&(lf(C)-d||h===0&&m===47)&&df(p>32?Vf(C+`;`,r,n,d-1,c):Vf(q(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(df(S=zf(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)Rf(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(sf(C,3)===110)break;case 108:if(sf(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Rf(e,S,S,r&&df(zf(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Rf(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+lf(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Cf()==125)continue}switch(C+=ef(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(lf(C)-1)*_,_=1;break;case 64:Tf()===45&&(C+=jf(wf())),f=Tf(),u=d=lf(y=C+=If(Ef())),v++;break;case 45:m===45&&lf(C)==2&&(h=0)}}return a}function zf(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=uf(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=cf(e,f+1,f=$d(g=o[h])),b=e;v<m;++v)(b=rf(g>0?p[v]+` `+y:q(y,/&\f/g,p[v])))&&(c[_++]=b);return yf(e,t,n,i===0?qd:s,c,l,u,d)}function Bf(e,t,n,r){return yf(e,t,n,Kd,ef(Sf()),cf(e,2,-2),0,r)}function Vf(e,t,n,r,i){return yf(e,t,n,Jd,cf(e,0,r),cf(e,r+1,-1),r,i)}function Hf(e,t,n){switch(nf(e,t)){case 5103:return K+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return K+e+e;case 4855:return K+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return Gd+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return K+e+Gd+e+Wd+e+e;case 5936:switch(sf(e,t+11)){case 114:return K+e+Wd+q(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return K+e+Wd+q(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return K+e+Wd+q(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return K+e+Wd+e+e;case 6165:return K+e+Wd+`flex-`+e+e;case 5187:return K+e+q(e,/(\w+).+(:[^]+)/,K+`box-$1$2`+Wd+`flex-$1$2`)+e;case 5443:return K+e+Wd+`flex-item-`+q(e,/flex-|-self/g,``)+(af(e,/flex-|baseline/)?``:Wd+`grid-row-`+q(e,/flex-|-self/g,``))+e;case 4675:return K+e+Wd+`flex-line-pack`+q(e,/align-content|flex-|-self/g,``)+e;case 5548:return K+e+Wd+q(e,`shrink`,`negative`)+e;case 5292:return K+e+Wd+q(e,`basis`,`preferred-size`)+e;case 6060:return K+`box-`+q(e,`-grow`,``)+K+e+Wd+q(e,`grow`,`positive`)+e;case 4554:return K+q(e,/([^-])(transform)/g,`$1`+K+`$2`)+e;case 6187:return q(q(q(e,/(zoom-|grab)/,K+`$1`),/(image-set)/,K+`$1`),e,``)+e;case 5495:case 3959:return q(e,/(image-set\([^]*)/,K+"$1$`$1");case 4968:return q(q(e,/(.+:)(flex-)?(.*)/,K+`box-pack:$3`+Wd+`flex-pack:$3`),/space-between/,`justify`)+K+e+e;case 4200:if(!af(e,/flex-|baseline/))return Wd+`grid-column-align`+cf(e,t)+e;break;case 2592:case 3360:return Wd+q(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,af(e.props,/grid-\w+-end/)})?~of(e+(n=n[t].value),`span`,0)?e:Wd+q(e,`-start`,``)+e+Wd+`grid-row-span:`+(~of(n,`span`,0)?af(n,/\d+/):+af(n,/\d+/)-af(e,/\d+/))+`;`:Wd+q(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return af(e.props,/grid-\w+-start/)})?e:Wd+q(q(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return q(e,/(.+)-inline(.+)/,K+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(lf(e)-1-t>6)switch(sf(e,t+1)){case 109:if(sf(e,t+4)!==45)break;case 102:return q(e,/(.+:)(.+)-([^]+)/,`$1`+K+`$2-$3$1`+Gd+(sf(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~of(e,`stretch`,0)?Hf(q(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return q(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return Wd+n+`:`+r+s+(i?Wd+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(sf(e,t+6)===121)return q(e,`:`,`:`+K)+e;break;case 6444:switch(sf(e,sf(e,14)===45?18:11)){case 120:return q(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+K+(sf(e,14)===45?`inline-`:``)+`box$3$1`+K+`$2$3$1`+Wd+`$2box$3`)+e;case 100:return q(e,`:`,`:`+Wd)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return q(e,`scroll-`,`scroll-snap-`)+e}return e}function Uf(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Wf(e,t,n,r){switch(e.type){case Qd:if(e.children.length)break;case Yd:case Xd:case Jd:return e.return=e.return||e.value;case Kd:return``;case Zd:return e.return=e.value+`{`+Uf(e.children,r)+`}`;case qd:if(!lf(e.value=e.props.join(`,`)))return``}return lf(n=Uf(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Y(e){var t=uf(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Gf(e){return function(t){t.root||(t=t.return)&&e(t)}}function Kf(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Jd:e.return=Hf(e.value,e.length,n);return;case Zd:return Uf([bf(e,{value:q(e.value,`@`,`@`+K)})],r);case qd:if(e.length)return ff(n=e.props,function(t){switch(af(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:xf(bf(e,{props:[q(t,/:(read-\w+)/,`:`+Gd+`$1`)]})),xf(bf(e,{props:[t]})),tf(e,{props:pf(n,r)});break;case`::placeholder`:xf(bf(e,{props:[q(t,/:(plac\w+)/,`:`+K+`input-$1`)]})),xf(bf(e,{props:[q(t,/:(plac\w+)/,`:`+Gd+`$1`)]})),xf(bf(e,{props:[q(t,/:(plac\w+)/,Wd+`input-$1`)]})),xf(bf(e,{props:[t]})),tf(e,{props:pf(n,r)})}return``})}}function qf(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Jf=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Yf=`active`,Xf=`data-styled-version`,Zf=`6.6.0`,Qf=`/*!sc*/
`,$f=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw qf(19);function ep(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var tp=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:ep(`REACT_APP_SC_DISABLE_SPEEDY`)??ep(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),np=`sc-keyframes-`,rp={},ip=new Map,ap=new Map,op=1,sp=e=>{if(ip.has(e))return ip.get(e);for(;ap.has(op);)op++;let t=op++;return ip.set(e,t),ap.set(t,e),t},cp=e=>ap.get(e),lp=(e,t)=>{op=t+1,ip.set(e,t),ap.set(t,e)},up=Object.freeze([]),dp=Object.freeze({});function fp(e,t,n=dp){return e.theme!==n.theme&&e.theme||t||n.theme}var pp=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,mp=/(^-|-$)/g;function hp(e){return e.replace(pp,`-`).replace(mp,``)}var gp=/(a)(d)/gi,_p=e=>String.fromCharCode(e+(e>25?39:97));function vp(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=_p(t%52)+n;return(_p(t%52)+n).replace(gp,`$1-$2`)}var yp=5381,bp=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},xp=e=>bp(yp,e);function Sp(e){return vp(xp(e)>>>0)}function Cp(e){return e.displayName||e.name||`Component`}function wp(e){return typeof e==`string`&&!0}function Tp(e){return wp(e)?`styled.${e}`:`Styled(${Cp(e)})`}var Ep=Symbol.for(`react.memo`),Dp=Symbol.for(`react.forward_ref`),Op={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},kp={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ap={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},jp={[Dp]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Ep]:Ap};function Mp(e){return(`type`in(t=e)&&t.type.$$typeof)===Ep?Ap:`$$typeof`in e?jp[e.$$typeof]:Op;var t}var Np=Object.defineProperty,Pp=Object.getOwnPropertyNames,Fp=Object.getOwnPropertySymbols,Ip=Object.getOwnPropertyDescriptor,Lp=Object.getPrototypeOf,Rp=Object.prototype;function zp(e,t,n){if(typeof t!=`string`){let r=Lp(t);r&&r!==Rp&&zp(e,r,n);let i=Pp(t).concat(Fp(t)),a=Mp(e),o=Mp(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in kp||n&&n[s]||o&&s in o||a&&s in a)){let n=Ip(t,s);try{Np(e,s,n)}catch{}}}}return e}function Bp(e){return typeof e==`function`}var Vp=Symbol.for(`react.forward_ref`);function Hp(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Vp&&`styledComponentId`in e}function Up(e,t){return e&&t?e+` `+t:e||t||``}function Wp(e,t){return e.join(t||``)}function Gp(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Kp(e,t,n=!1){if(!n&&!Gp(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=Kp(e[n],t[n]);else if(Gp(t))for(let n in t)e[n]=Kp(e[n],t[n]);return e}function qp(e,t){Object.defineProperty(e,"toString",{value:t})}var Jp=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw qf(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Qf;return t}},Yp=`style[${Jf}][${Xf}="${Zf}"]`,Xp=RegExp(`^${Jf}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Zp=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Qp=e=>{if(!e)return document;if(Zp(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Zp(t))return t}return document},$p=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},em=(e,t)=>{let n=(t.textContent??``).split(Qf),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Xp);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(lp(n,t),$p(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},tm=e=>{let t=Qp(e.options.target).querySelectorAll(Yp);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Jf)!==Yf&&(em(e,r),r.parentNode&&r.parentNode.removeChild(r))}},nm=!1;function rm(){if(!1!==nm)return nm;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return nm=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return nm=t.getAttribute(`content`)||void 0}return nm=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var im=(e,t)=>{if(typeof document>`u`)throw qf(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Jf}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Jf,Yf),i.setAttribute(Xf,Zf);let s=t||rm();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},am=class{constructor(e,t){this.element=im(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw qf(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},om=class{constructor(e,t){this.element=im(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},sm=$f,cm={isServer:!$f,useCSSOMInjection:!tp},lm=class e{static registerId(e){return sp(e)}constructor(e=dp,t={},n){this.options=Object.assign(Object.assign({},cm),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&$f&&sm&&(sm=!1,tm(this)),qp(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=cp(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Jf+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&$f&&tm(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&$f&&t.target!==this.options.target&&Qp(this.options.target)!==Qp(t.target)&&tm(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new am(t,n):new om(t,n))(this.options),new Jp(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){sp(e),e.startsWith(np)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(sp(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(sp(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},um=new WeakSet,dm={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function fm(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in dm||e.startsWith(`--`)?String(t).trim():t+`px`}var pm=47;function mm(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var hm=Symbol.for(`sc-keyframes`);function gm(e){return typeof e==`object`&&!!e&&hm in e}function _m(e){return Bp(e)&&!(e.prototype&&e.prototype.isReactComponent)}var vm=e=>e==null||!1===e||e===``,ym=Symbol.for(`react.client.reference`);function bm(e){return e.$$typeof===ym}function xm(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!vm(r)&&(Array.isArray(r)&&um.has(r)||Bp(r)?t.push(mm(n)+`:`,r,`;`):Gp(r)?(t.push(n+` {`),xm(r,t),t.push(`}`)):t.push(mm(n)+`: `+fm(n,r)+`;`))}}function Sm(e,t,n,r,i=[]){if(vm(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return bm(e)?i:_m(e)&&t?Sm(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Sm(e[a],t,n,r,i);return i}return Hp(e)?(i.push(`.${e.styledComponentId}`),i):gm(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):bm(e)?i:Gp(e)&&e.toString===Object.prototype.toString?(xm(e,i),i):(i.push(e.toString()),i)}var Cm=xp(Zf),wm=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=bp(Cm,t),this.baseStyle=n,lm.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(_m(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Wp(Sm(r,e,t,n)))}else i+=Wp(Sm(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=vp(bp(bp(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=Up(r,a)}}return r}},Tm=/&/g;function Em(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Dm(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==pm||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===pm&&(o=!1,c++);else if(l!==34&&l!==39||Em(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function Om(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&Om(a.children,t)}return e}function km({options:e=dp,plugins:t=up}=dp){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Tm,r).replace(i,a))}),e.prefix&&o.push(Kf),o.push(Wf);let s=[],c=Y(o.concat(Gf(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Dm(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Em(e,o)){if(s===0){if(t===pm&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==pm);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===pm)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===pm&&o+1<r&&e.charCodeAt(o+1)===pm){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Dm(i)):l===0?e:Dm(e)}(t),d=Lf(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=Om(d,e.namespace)),s=[],Uf(d,c),s},u=e,d=yp;for(let e=0;e<t.length;e++)t[e].name||qf(15),d=bp(d,t[e].name);return u!=null&&u.namespace&&(d=bp(d,u.namespace)),u!=null&&u.prefix&&(d=bp(d,`p`)),l.hash=d===yp?``:d.toString(),l}var Am=new lm,jm=km(),Mm=v.createContext({shouldForwardProp:void 0,styleSheet:Am,stylis:jm,stylisPlugins:void 0});Mm.Consumer;function Nm(){return v.useContext(Mm)}var Pm=v.createContext(void 0);Pm.Consumer;function Fm(){let e=v.useContext(Pm);if(!e)throw qf(18);return e}function Im(e){let t=v.useContext(Pm),n=v.useMemo(()=>function(e,t){if(!e)throw qf(14);if(Bp(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw qf(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(Pm.Provider,{value:n},e.children):null}var Lm={};function Rm(e,t){let n=typeof e==`string`?hp(e):`sc`;Lm[n]=(Lm[n]||0)+1;let r=n+`-`+Sp(Zf+n+Lm[n]);return t?t+`-`+r:r}function zm(e,t,n){let r=Hp(e),i=e,a=!wp(e),{attrs:o=up,componentId:s=Rm(t.displayName,t.parentComponentId),displayName:c=Tp(e)}=t,l=t.displayName&&t.componentId?hp(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new wm(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(Pm),u=Nm(),d=e.shouldForwardProp||u.shouldForwardProp,f=fp(t,l,a)||dp,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=Bp(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=Up(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=Up(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=wp(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=Up(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?Up(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)Kp(e,n,!0);return e}({},i.defaultProps,e):e}}),qp(m,()=>`.${m.styledComponentId}`),a&&zp(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Bm=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function Vm(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Hm=e=>(um.add(e),e);function Um(e,...t){if(Bp(e)||Gp(e))return Hm(Sm(Vm(up,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Sm(n):Hm(Sm(Vm(n,t)))}function Wm(e,t,n=dp){if(!t)throw qf(1,t);let r=(r,...i)=>e(t,n,Um(r,...i));return r.attrs=r=>Wm(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Wm(e,t,Object.assign(Object.assign({},n),r)),r}var Gm=e=>Wm(zm,e),X=Gm;Bm.forEach(e=>{X[e]=Gm(e)});var Km=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(Bp(n)&&!Hp(n))return!1}return!0}(e),lm.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=Wp(Sm(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function qm(e,...t){let n=Um(e,...t),r=`sc-global-${Sp(JSON.stringify(n))}`,i=new Km(n,r),a=e=>{let t=Nm(),n=v.useContext(Pm),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,rp,n,o);else{let s=Object.assign(Object.assign({},t),{theme:fp(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var Jm,Ym=class{constructor(e,t){this[Jm]=!0,this.inject=(e,t=jm)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=np+e,this.rules=t,sp(this.id),qp(this,()=>{throw qf(12,String(this.name))})}getName(e=jm){return e.hash?this.name+vp(e.hash>>>0):this.name}};function Xm(e,...t){let n=Wp(Um(e,...t));return new Ym(Sp(n),n)}Jm=hm,`${Jf}`,`${Jf}`,`${Jf}`;var Zm=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Z=o(((e,t)=>{t.exports=Zm()}))(),Qm=5e3,$m=X.div`
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
`,eh=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,th=X.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,nh=X.div`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  margin-top: ${e=>e.theme.space.xs};
`,rh=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),ih=()=>typeof document<`u`&&document.visibilityState===`hidden`,ah=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||ih()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+Qm};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{ih()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function oh({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=ah(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=ue.enabled?rh(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&L[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,Z.jsx)($m,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,Z.jsxs)(eh,{children:[(0,Z.jsx)(th,{children:`Achievement unlocked`}),L[t].name,er(L[t])&&(0,Z.jsx)(nh,{children:er(L[t])})]},e))})}var sh=X.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,ch=X.div`
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
`,lh=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,uh=X.button`
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
`,dh=X.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,fh=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,Z.jsx)(sh,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,Z.jsxs)(ch,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,Z.jsx)(lh,{children:`More`}),(0,Z.jsxs)(uh,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,Z.jsx)(dh,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,Z.jsxs)(uh,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,Z.jsx)(dh,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),ue.enabled&&(0,Z.jsxs)(uh,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,Z.jsx)(dh,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,Z.jsxs)(uh,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,Z.jsx)(dh,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),(0,Z.jsxs)(uh,{"aria-label":`open dev mode`,onClick:()=>r(`dev`),type:`button`,children:[(0,Z.jsx)(dh,{"aria-hidden":`true`,children:`🛠️`}),`Dev Mode`]})]})})},ph=X.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,mh=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,hh=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,gh=X.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,_h=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,vh=X(ph)`
  gap: 0.4rem;
`,yh=X.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,bh=X.button`
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
`,xh=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Sh=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,Ch=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,wh=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,Th=X.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,Eh=(e,t,n)=>{let r=Zn(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},Dh=e=>{let t=[],n={};return e.forEach(e=>{let r=be[e.id];r?(n[r.id]||(n[r.id]={key:r.id,name:r.name,levels:[]},t.push(n[r.id])),n[r.id].levels.push(e)):t.push({key:e.id,def:e})}),t},Oh=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=Fm(),c=new Set(ir(t)),l=me.map(e=>({...e,members:ve.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0),u=sr(t),d=l.reduce((e,n)=>e+or(t,n.id).bonus,0),f=l.reduce((e,n)=>e+or(t,n.id).total,0);return(0,Z.jsxs)(mh,{children:[(0,Z.jsxs)(hh,{children:[(0,Z.jsx)(`h1`,{children:`Achievements`}),(0,Z.jsxs)(gh,{"aria-label":`total stars ${u} of ${f}`,children:[`⭐ `,u,`/`,f,d>0?` (incl. ${d} bonus)`:``]})]}),(0,Z.jsx)(_h,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>nr(t,e.id)).length,u=c.has(e.id),d=or(t,e.id);return(0,Z.jsxs)(vh,{"aria-label":`${e.name} achievement group`,children:[(0,Z.jsxs)(yh,{children:[(0,Z.jsxs)(bh,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,Z.jsxs)(Th,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length,u&&d.bonus>0?` · ⭐ +${d.bonus}`:``]})]}),n[e.id]&&Dh(e.members).map(e=>{if(e.levels){let n=e.levels.filter(e=>nr(t,e.id)).length,r=e.levels.length,c=n===r,l=e.levels.find(e=>!nr(t,e.id)),u=e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,d=e.levels.length>4,f=[...new Map(e.levels.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,Z.jsxs)(xh,{"aria-label":`${e.name} achievement level ${n} of ${r}`,style:{alignItems:`flex-start`},children:[(0,Z.jsxs)(Sh,{$earned:n>0,children:[(0,Z.jsx)(bh,{"aria-expanded":!!i[e.key],"aria-label":`${e.name} details`,onClick:()=>o(a,e.key),type:`button`,children:(0,Z.jsx)(`strong`,{children:e.name})}),!i[e.key]&&l&&(0,Z.jsxs)(Ch,{children:[`Next: `,$n(l),Eh(t,l,!1)?` (${Eh(t,l,!1)})`:``]}),!i[e.key]&&l&&er(l)&&(0,Z.jsxs)(Ch,{"aria-label":`${e.name} next reward`,children:[`Reward: `,er(l)]}),i[e.key]&&u&&(0,Z.jsxs)(Ch,{children:[`Reward each level: `,u]}),i[e.key]&&d&&!u&&f.map(([e,t])=>(0,Z.jsxs)(Ch,{children:[e,`: `,t]},e)),i[e.key]&&e.levels.map((n,r)=>{let i=nr(t,n.id),a=Eh(t,n,i);if(d){let t=u?null:er(n);return(0,Z.jsxs)(Ch,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,$n(n),a&&!i?` (${a})`:``,t?` · ${t}`:``]},n.id)}return(0,Z.jsxs)(wh,{children:[(0,Z.jsxs)(Ch,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,n.trigger,a&&!i?` (${a})`:``]}),!u&&Qn(n)&&(0,Z.jsxs)(Ch,{"aria-label":`${e.name} level ${r+1} reward ${i?`earned`:`pending`}`,children:[i?`Reward earned`:`Reward`,`: `,Qn(n)]})]},n.id)})]}),(0,Z.jsxs)(Th,{$color:c?s.color.good:s.color.textMuted,children:[c?`✅ `:n===0?`🔒 `:``,`Lv `,n,`/`,r]})]},e.key)}let{def:n}=e,r=nr(t,n.id),c=n.secret&&!r,l=c?null:Eh(t,n,r),u=c?`???`:n.name;return(0,Z.jsxs)(xh,{"aria-label":`${u} achievement ${r?`earned`:`not yet earned`}`,children:[(0,Z.jsxs)(Sh,{$earned:r,children:[c?(0,Z.jsx)(`strong`,{children:u}):(0,Z.jsx)(bh,{"aria-expanded":!!i[n.id],"aria-label":`${n.name} details`,onClick:()=>o(a,n.id),type:`button`,children:(0,Z.jsx)(`strong`,{children:u})}),!c&&i[n.id]&&(0,Z.jsx)(Ch,{children:n.trigger}),!c&&i[n.id]&&Qn(n)&&(0,Z.jsxs)(Ch,{"aria-label":`${n.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,Qn(n)]})]}),(0,Z.jsxs)(Th,{$color:r?s.color.good:s.color.textMuted,children:[l&&!r?`${l} `:``,r?`✅`:`🔒`]})]},n.id)})]},e.id)})})]})},kh=`high`,Ah=`normal`,jh=()=>b[b.length-1],Mh=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],Nh=[Pl,Rl,Hl,Kl,Xl,eu,iu,cu,fu],Ph=e=>Mh.some((t,n)=>jc(e,n)),Fh=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,Ih=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,Lh=e=>io(e)&&(e.intro?.bits??0)>=Do(e),Rh=1,zh={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},Bh=(e,t)=>{let[n,r]=zh[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&ad(e,t)<Rh},Vh=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&Zu(e,t)<Rh,Hh=(e,t)=>e?kh:t?Ah:!1,Uh=e=>{if(Zr(e))return!1;let t=zt(e);return b.some(n=>{if(!Qr(e)(n)||Vh(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:Wt(n,r,t,i,wi(e,n),2**53-1)>=a})},Wh=e=>Zr(e)||!tn(e)||Bh(e,`speedUp`)?!1:en(e),Gh=e=>{if(Zr(e)||Bh(e,`scaleUp`))return!1;let t=hr(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=gr(e)},Kh=e=>{if(Zr(e)||Bh(e,`overclock`))return!1;let t=jh();return Qr(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=_r(e):!1},qh=e=>Zr(e)&&!Bh(e,`purge`),Jh=e=>qh(e)||Uh(e)||Wh(e)||Gh(e)||Kh(e),Yh=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],Xh=e=>{if((e.purge?.count??0)<1||Zr(e))return!1;let t=e.purge?.points??0;return Yh.some(n=>{if(!cd(e,n))return!1;let r=Hr(`global`,n);if(r&&!Er(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<id(n)&&t>=od(n,i)})},Zh=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=ui(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.buyMaxUnlocked&&t>=2||!e.cacheWarmUnlocked&&t>=20)return!0;let n=yn(_n(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},Qh=e=>Xh(e)||Zh(e),$h=e=>Jh(e),eg=e=>Hh(qh(e)||Uh(e),$h(e)),tg=e=>Fh(e)||Ih(e)||Wa(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||Ja(e)&&(e.intro?.bits??0)>=qa(e.intro)||Xo(e)&&!e.intro?.diskBuildQueued||Lo(e)||Lh(e),ng=e=>Hh(Fh(e)||Ih(e),tg(e)),rg=e=>Mh.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(fl(e,r)<10||a<Tc(e,n))}),ig=e=>dl(e)?rg(e)||Nh.some(t=>t(e))||Ph(e):!1,ag=e=>dl(e)?Hh(rg(e),ig(e)):!1,og=e=>Sn(e)?pt.some(t=>Dn(e,t.id)):!1,sg=e=>og(e)?Ah:!1,cg=e=>({game:eg(e),foundry:ng(e),boosters:ag(e),compute:sg(e),perks:Qh(e)?Ah:!1}),lg=`3.25rem`,ug=Xm`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,dg=X.nav`
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
`,fg=X.button`
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
`,pg=X.span`
  font-size: 1.05rem;
  line-height: 1;
`,mg=X.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,hg=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?Um`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${ug} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:Um`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,gg=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,Z.jsxs)(dg,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,Z.jsxs)(fg,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,Z.jsx)(hg,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,Z.jsx)(pg,{"aria-hidden":`true`,children:n.icon}),(0,Z.jsx)(mg,{children:n.label})]},n.id)}),(0,Z.jsxs)(fg,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,Z.jsx)(pg,{"aria-hidden":`true`,children:`⋯`}),(0,Z.jsx)(mg,{children:`More`})]})]})},_g=`calc(${lg} + env(safe-area-inset-bottom))`,vg={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},yg=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&vg[e];return i?r?n.color.disabled:n.color[i]:t},bg={white:`255, 255, 255`,darkgrey:`169, 169, 169`},xg=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},Sg=e=>e?e.startsWith(`#`)?xg(e):bg[e]??`255, 255, 255`:`255, 255, 255`,Cg=Xm`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,wg=e=>Math.min(100,Math.max(0,e??0)),Tg=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=wg(t),l=wg(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return Um`
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
  color: ${yg};
  border: 1.5px solid ${yg};
  background: ${e=>e.theme.color.surfaceSunken};
  ${Tg}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>Sg(yg(e))};
  animation: ${e=>e.$pulse&&!e.disabled?Um`${Cg} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${yg};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Eg=X.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,Dg=X.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Og=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,$=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,Z.jsx)(Dg,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!Og.test(n)?(0,Z.jsx)(Dg,{children:n}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Eg,{children:n.slice(0,r+1)}),(0,Z.jsx)(Dg,{children:n.slice(r+1)})]})},kg=X.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,Ag=X.div`
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
`,jg=X(ph)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,Mg=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,Ng=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,Pg=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,Z.jsx)(Ag,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,Z.jsxs)(jg,{$raised:!0,children:[(0,Z.jsx)(Mg,{id:n,children:`Save not compatible`}),(0,Z.jsx)(Ng,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,Z.jsx)(Q,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},Fg=1e80,Ig=30,Lg=20,Rg=2**53-1,zg=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],Bg=[1,2,5],Vg=Object.fromEntries(zg.map(e=>[e.id,e])),Hg=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],Ug=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>Hu(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>gd(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:Bd,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:zd,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:Rd,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:hd,isOn:e=>e.autoOverclockEnabled??!0}],Wg=Object.fromEntries(Ug.map(e=>[e.key,e])),Gg=(e,t)=>!!Wg[t]?.isOn(e),Kg=e=>new Date(e).toISOString().slice(0,10),qg=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},Jg=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},Yg=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},Xg=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),Zg=(e,t)=>{let n=Ug.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},Qg=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},$g=e=>e.startBytes*8,e_=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,t_=(e,t,n)=>{let r=Qg(t,n.levers);return e_(e)===e_(r)?r:{...r,resources:{...r.resources,[O]:$g(n)}}},n_={buyTier:{make:e=>Di(e,Rg)},tierTickspeed:{make:e=>qu(e)},clockSpeed:{make:()=>vd},scaleUp:{make:()=>Nd},overclock:{make:()=>Pd},restage:{make:e=>Hd(e)},automation:{make:e=>Object.hasOwn(Wg,e?.key??``)?Wg[e.key].set(!!e.enabled):e=>e}},r_=b[b.length-1],i_=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${z(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${z(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${r_.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),a_=Object.fromEntries(i_.map(e=>[e.key,e])),o_=Object.fromEntries(i_.map(e=>[e.key,0])),s_={balance:0,clock:0,owned:{},purchaseLevels:{}},c_=(e,t=e)=>({...e,runPeaks:kr(e.runPeaks??s_,t)}),l_=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=yr(t)??0;return a!==(yr(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},u_=(e,t,n,r)=>{let i=e.game,a=t_(i,c_(vi(n,Rg)(i)),t);return r&&e_(i)!==e_(a)&&r(a),{game:a,metrics:l_(i,a,e.metrics)}},d_=(e,t,n,r,i)=>{let a=e.game,o=n_[n].make(r)(a);if(o===a)return e;let s=t_(a,c_({...o,runPeaks:a.runPeaks},o),t);return i&&e_(a)!==e_(s)&&i(s),{game:s,metrics:l_(a,s,e.metrics)}},f_=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],p_=(e,t,n)=>{let r=e;for(let e=0;e<Lg;e++){let e=r;for(let[r,i]of f_)e=d_(e,t,r,i,n);if(e===r)break;r=e}return r},m_=e=>({...e,runPeaks:kr(s_,e)}),h_=e=>({game:e,metrics:l_(e,e,o_)}),g_=(e,t,n,r,i)=>{let a=p_(h_(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=p_(u_(a,t,n,i),t,i),o.push(a.metrics);return o},__=(e,t=0)=>e.map(e=>[t,e,!0]),v_=[__([`scaleUp`,`restage`,`overclock`]),__([`scaleUp`,`restage`]),[...__([`scaleUp`,`restage`]),...__([`overclock`],1)],[...__([`scaleUp`,`restage`]),...__([`overclock`],2)],[...__([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...__([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],__([`overclock`,`restage`])],y_=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},b_=(e,t,n,r,i)=>{let a=h_(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=u_(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=d_(a,t,e,n);o.push(a.metrics)}return o},x_=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},S_=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:yr(e)??0}),C_=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=x_(n,e);if(t>i)return t}return null},w_=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(x_(t/e,1));if(i>n&&i<t)return i}let i=r(x_(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},T_=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},E_=(e,t,n)=>{let r=Vg[t],i=n===`fallback`,a=Jg(`${e}|${t}|v7|${n}`),o=Yg(a),s=i?1e6:Bg[Math.floor(o()*Bg.length)]*10**Xg(o,r.startExponent),c=[];if(!i){let e=[...Hg],t=Xg(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:Zg(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:Xg(o,r.warmupSeconds.map(e=>e/Ig))*Ig,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:7,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>Hg.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=Tt();v.resources={...v.resources,[O]:$g(_)};for(let e of u)v=Wg[e].unlock(v);v=m_(Qg(v,l));let y=v;g_(v,_,Ig,f/Ig,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=t_(y,Wg[e].set(!1)(y),_);y=m_(y);let b=[h_(y).metrics];for(let e=h_(y),t=0;t<p;t++)e=u_(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?i_:T_(o,i_),C=(e,t)=>{let n=C_(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=w_(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=v_.map(e=>y_(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:b_(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=Fg);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=g_(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:S_(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},D_=new Map,O_=(e,t)=>{let n=`${e}|${t}`,r=D_.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=E_(e,t,n);r??=E_(e,t,`fallback`),D_.size>64&&D_.clear(),D_.set(n,r)}return r},k_=(e,t)=>O_(e,t).def,A_=e=>de.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),j_=e=>e.metrics?.[e.def.objective?.key]??0,M_=e=>j_(e)>=e.def.objective?.target,N_=e=>{let t=e.def.objective;if(!t)return 0;let n=j_(e);if(n>=t.target)return 1;if(!a_[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},P_=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),F_=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=M_(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||j_(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=P_(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},I_=(e,t)=>n=>{if(!A_(n)||!Vg[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=O_(Kg(t),e);return P_(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:h_(i).metrics})},L_=e=>t=>t.daily.runs[e]?P_(t,e,null):t,R_=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===Kg(n)},z_=(e,t)=>n=>R_(n,e,t)?I_(e,t)(L_(e)(n)):n,B_=e=>t=>{let n=t;for(let t of zg){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==7){n=P_(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=u_(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=F_(P_(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},V_=(e,t,n,r)=>i=>{if(!Object.hasOwn(n_,t))return i;let a=B_(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=d_(s,o.def,t,n);return c===s?a:F_(P_(a,e,{...o,...c}),e,r)},H_=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},U_=X.div`
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
`,W_=X(ph)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,G_=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,K_=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,q_=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,J_=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,Z.jsx)(U_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,Z.jsxs)(W_,{$raised:!0,children:[(0,Z.jsx)(G_,{id:d,children:t}),(0,Z.jsx)(K_,{children:n}),(0,Z.jsxs)(q_,{children:[(0,Z.jsx)(Q,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,Z.jsx)(Q,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},Y_={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},X_=e=>Tu(e)>0,Z_=e=>X_(e),Q_=(e,t)=>t<Tu(e),$_=(e,t)=>t<=Tu(e),ev=(e,t=0)=>{let n=bu(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*Ne[e.type].durationSeconds;return`${Y_[e.type]??e.type} ×${Ne[e.type].multiplier} (${Ci(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${wu(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},tv=Um`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${Xm`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,nv={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},rv=e=>Ci(e).replace(/ 0[ms]$/,``),iv=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,av=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,ov=X.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,sv=`2.8em`,cv=X(av)`
  flex: 0 0 ${sv};
  width: ${sv};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,lv=X.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${sv};
  width: ${sv};
`,uv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,dv=X.div`
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
`,fv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,pv=X.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,mv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,hv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,gv=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},_v=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=nv[r]??{icon:`⚡`,label:r},s=vu(r,i[0]),c=_u(r,i[0]),l=gv(i),u=l.length-1;return(0,Z.jsx)(uv,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=iv(e.tierIndex);return(0,Z.jsxs)(ov,{children:[i===u?Mu(t,r)?(0,Z.jsx)(cv,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↩`})}):(0,Z.jsx)(cv,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!Pu(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`✕`})}):(0,Z.jsx)(lv,{"aria-hidden":`true`}),(0,Z.jsxs)(dv,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${iv(e.tierIndex,`name`)}, ${Ci(f)}${l?` once it starts`:` left`}`,children:[(0,Z.jsx)(fv,{children:`${e.count}x`}),(0,Z.jsx)(pv,{children:`${m} ${o.icon} ×${c}`}),(0,Z.jsx)(mv,{children:Ci(f)})]}),i===0?(0,Z.jsx)(cv,{"aria-label":`stack the ${o.label} compute boost`,disabled:!Au(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${rv(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`+`})}):(0,Z.jsx)(lv,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},vv=({state:e,actions:t})=>{let n=bu(e.intro??{});return n.length===0?null:(0,Z.jsx)(hv,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,Z.jsx)(_v,{lane:n,state:e,actions:t},n.type))})},yv=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,Z.jsx)(J_,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,Z.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},bv=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},xv=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,Sv=e=>`Unlocks at Purge ${Br(e)}`,Cv=e=>`${e.id} · ${e.target} · ${e.codename}`,wv=(e,t)=>t-e%t,Tv=e=>{let t=Tr(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${bv(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${bv(wv(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${bv(wv(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${bv(Math.ceil(wv(n,30)))}`];case`bitRot`:return[`Corruption ${Pt(Lr(e))} vs ${Pt(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},Ev=X.section`
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
`,Dv=X.button`
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
`,Ov=X.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,kv=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,Av=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=Tr(e);if(!a)return null;let o=bv(e.challenges.activeSeconds);return(0,Z.jsxs)(Ev,{"aria-label":`active challenge banner`,children:[(0,Z.jsxs)(Ov,{children:[(0,Z.jsxs)(Dv,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,Z.jsx)(kv,{children:a.rule}),(0,Z.jsxs)(kv,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,xv(a.goal)]}),Tv(e).map(e=>(0,Z.jsx)(kv,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,Z.jsx)(yv,{challenge:a,onExit:t})]})},jv=X.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,Mv=Object.freeze({removeAds:!1}),Nv=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>Mv}),Pv=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return Nv();let n=null,r=null,i=null,a=Mv,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},Fv=null,Iv=()=>(Fv??=Pv({loadAds:null,loadIap:null}),Fv),Lv=1e4,Rv=400,zv=100,Bv=X.div`
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
`,Vv=X(ph).attrs({role:`status`,"aria-live":`polite`})`
  align-items: center;
  max-width: 26rem;
  opacity: ${e=>+!e.$fading};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${Rv}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Hv=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Uv=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,Wv=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=Iv()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+Lv}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+Lv})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,zv);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,Rv);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&xi(e.elapsedRealSeconds,e.capSeconds)>0;return(0,Z.jsx)(Bv,{children:(0,Z.jsxs)(Vv,{"aria-label":`offline progress notice`,$fading:c,children:[(0,Z.jsxs)(Hv,{children:[`Resumed from sleep! You were away for `,Ci(e.elapsedRealSeconds),` — simulated `,Ci(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,Z.jsxs)(Uv,{children:[f&&(0,Z.jsx)(Q,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,Z.jsxs)(Q,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},Gv=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,Kv=Um`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,qv=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,Jv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Yv=Xm`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Xv=X(ph)`
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
  animation: ${e=>e.$animateReveal?Um`${Yv} 0.4s ease-out`:`none`};
  ${e=>e.$boosted&&tv}

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
`,Zv=e=>Um`
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
`,Qv=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,$v=X.div`
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
`,ey=X(ph)`
  ${Zv(`#0e7490`)}
`,ty=X(ph)`
  ${Zv(`#1d4ed8`)}
`,ny=X(ph)`
  ${Zv(`#8b5cf6`)}
`,ry=X(ph)`
  ${Zv(`#c2410c`)}
`,iy=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,ay=X(ph)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&Um`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&Um`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,oy=X.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,sy=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,cy=X.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,ly=X(jv)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,uy=X(sy)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,dy=X.div`
  position: relative;
`,fy=X.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,py=X.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,my=X.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,hy=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${_g};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,gy=X.div`
  ${e=>Tg({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,_y=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,vy=X(ay)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,yy=X.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,by=X.div`
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

  ${e=>e.$compressed&&Um`
    box-shadow: ${e.theme.shadow.md};
    padding: 0.25rem 0;

    ${ay} {
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
    ${jv} {
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
`,xy=X.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,Sy=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,Cy=X.div`
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
`,wy=X.div`
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
`,Ty=X.div`
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
`,Ey=X.div`
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
`,Dy=X.div`
  height: ${e=>e.$height}px;
`,Oy=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,ky=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Ay=X.h3`
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
`,jy=X.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,My=X.details`
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
  summary:has(${$v}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${$v}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`,Ny=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  margin: 0;
  ${Kv}

  @media (max-width: 24.5rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    line-height: 1.15;
  }
`,Py=X(Q)`
  grid-area: buy;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  min-height: 2rem;
  padding: 0 0.6em;
  ${Kv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,Fy=X(Eg)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,Iy=X.span`
  font-weight: 800;
`,Ly=X(Dg)`
  flex: 1 0 auto;
  text-align: right;
`,Ry=X(Q)`
  grid-area: upgrade;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  min-height: 2rem;
  padding: 0 0.5em;
  ${Kv}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.4em;
  }
`,zy=(e,t)=>t===`base`?Pt(e):t===`bytes`?Ft(e):`${z(e)} ${E(t)}`,By=(e,t)=>Math.min(100,Math.round(e/t*100)),Vy=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),Hy=e=>Math.round((e-1)*100),Uy=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),Wy=(e,{precise:t=!1}={})=>e>=2?`${Vy(e)}x`:`+${t?Uy(e):Hy(e)}%`,Gy=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=Fm(),{purge:s}=a,c=a.resources[O]>=Rr(a),l=Cr(a),u=a.prestigeDoublePpLevel??0,d=cn(a),f=sn(s.count,d),p=di(a.resources[O],u),m=ti(a.resources[O],Rr(a)),h=ni(a.resources[O]),g=Math.round(h*100),_=a.resources[O],y=Lt(_),x=Pt(_),S=!!Tr(a)&&Er(a,Tr(a).id),C=xv(Rr(a)),w=S?0:Math.max(1,p),T=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${C})`,k=S?`${T} — completes the challenge repeat, awards no Purge Points`:`${T} — awards +${z(w)} Purge Point${w===1?``:`s`}`,[A]=(0,v.useState)(()=>new Set(b.filter(e=>Qr(a)(e)).map(e=>e.id))),[ee,j]=(0,v.useState)(()=>new Set),te=e=>j(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),M=(0,v.useRef)(null),N=(0,v.useRef)(new Map),ne=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;j(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return M.current=e,()=>e.disconnect()},[]);let re=e=>(ne.current.has(e)||ne.current.set(e,t=>{let n=M.current,r=N.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(N.current.set(e,t),n&&n.observe(t)):N.current.delete(e)}),ne.current.get(e)),[ie,P]=(0,v.useState)(!1),ae=()=>P(e=>!e),oe=Zr(a),se=Tr(a),ce=e=>se?.effect===e,le=se?` — disabled by challenge ${se.id} ${se.codename}`:``,ue=s.count===0,de=!!e.buyUnitMode,fe=!!e.buyMaxMode&&Oi(a)&&!de,pe=zt(a),me=oe&&ue,he=oe&&!ue,F=!!se||he||!!e.goal||bu(a.intro??{}).length>0,I=Pr(a),ge=a.purchaseLevels?.[I.id]??1,_e=Qr(a)(I),ve=hr(a),ye=a.purchaseLevels?.[ve.id]??1,be=a.scaleUpCount??0,L=gr(a),xe=Math.max(0,ge-1),Se=Math.max(0,ye-1),Ce=L,we=By(Se,Ce),Te=!oe&&Se>=L,Ee=b[b.indexOf(ve)+1]??null,De=Ee?.symbol===`TB`,Oe=ai(a),ke=Number.isInteger(Oe)?String(Oe):Oe.toFixed(2),Ae=Oe===2?`doubles`:`multiplies by ${ke}`,[je,Me]=(0,v.useState)(_e);(0,v.useEffect)(()=>{_e&&Me(!0)},[_e]);let Ne=yr(a)??0,Pe=_r(a),Fe=Pe,Ie=1+ii(a),Le=1+ii({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),Re=1+ot,ze=By(xe,Fe),Be=!oe&&!ce(`overclockDisabled`)&&xe>=Pe,Ve=a.globalTickspeedMultiplier??null,He=Ve!==null,Ue=ri(a),We=Qt(Ve??0),Ge=tn(a),Ke=!oe&&!ce(`clockSpeedDisabled`)&&Ge&&en(a),qe=rn(a),Je=a.owned[I.id]??0,Ye=a.lastTierXpConsumed??0,Xe=Math.floor(a.purge.xp??0),Ze=on(Ye),Qe=By(Xe,Ze),$e=qe&&!oe&&!ce(`restageDisabled`)&&Xe>=Ze,et=Wy(an(Xe)),tt=()=>{$e&&window.confirm(`Restage: consume ${z(Xe)} XP for ${et} faster ${I.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.${Je>0?``:` You own no ${I.name}, so nothing will be left producing.`}`)&&t.consumeXpForLastTierTickspeed(Xe)},nt=By(a.resources.base??0,$t(Ve??0)),[rt,it]=(0,v.useState)(Ge);(0,v.useEffect)(()=>{Ge&&it(!0)},[Ge]);let at=(0,v.useRef)(null);(0,v.useEffect)(()=>{me&&at.current?.focus()},[me]);let st=(0,v.useRef)(null),[ct,lt]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=st.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>lt(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[me]);let ut=(0,v.useRef)(null),[dt,ft]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=ut.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>ft(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[he]),me?(0,Z.jsx)(wy,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,Z.jsxs)(Ty,{children:[(0,Z.jsx)(`h2`,{children:`💾 Disk full`}),(0,Z.jsxs)(Oy,{children:[`You've reached `,Pt(a.resources[O]),` — 1 Googol Bytes. All production has stopped.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Resets your resources, owned tiers, and purchases`}),(0,Z.jsxs)(`li`,{children:[`Awards `,z(p),` Purge Point`,p===1?``:`s`,` — spend them on the Firmware page for automation and production bonuses`]}),(0,Z.jsx)(`li`,{children:`Keeps your unlocked autobuyers and Purge Points`})]}),(0,Z.jsx)(Q,{ref:at,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:(0,Z.jsx)($,{children:`✦ Purge Now`})})]})}):(0,Z.jsxs)(Gv,{children:[(0,Z.jsx)(Av,{onExit:t.exitChallenge,state:a}),he&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(Ey,{ref:ut,"aria-label":`purge available banner`,children:[(0,Z.jsxs)(Oy,{children:[C,` reached — production has stopped.`]}),(0,Z.jsxs)(Q,{"aria-label":k,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,Z.jsx)(Eg,{children:`✦ `}),(0,Z.jsx)(Dg,{children:S?`Complete challenge`:`Purge +${z(w)} PP`})]})]}),(0,Z.jsx)(Dy,{$height:dt})]}),(0,Z.jsx)(hy,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,Z.jsxs)(gy,{$percent:e.goal?e.goal.percent:m,children:[(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${C}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:m,"aria-valuemin":0,"aria-valuemax":100}),(0,Z.jsx)(_y,{children:e.goal?e.goal.label:`${m}% to Purge`})]})}),F?(0,Z.jsx)(kg,{as:`h1`,children:`Byte Factory`}):(0,Z.jsx)(qv,{children:(0,Z.jsx)(`h1`,{children:`Byte Factory`})}),(0,Z.jsx)(vv,{actions:t,state:a}),(0,Z.jsx)(Wv,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,Z.jsx)(xy,{ref:st,"aria-hidden":`true`}),(0,Z.jsxs)(by,{$compressed:ct,$belowBar:he,$belowBarHeight:dt,children:[(0,Z.jsxs)(ay,{$raised:!0,children:[(0,Z.jsxs)(dy,{children:[(0,Z.jsx)(oy,{"aria-controls":`global-multipliers-details`,"aria-expanded":ie,"aria-label":`money display`,onClick:ae,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ae())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,Z.jsx)(ly,{children:y})}),!ct&&y!==x&&(0,Z.jsx)(uy,{"aria-label":`balance in bits: ${x}`,children:x})]}),!ct&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(fy,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(h-n)/.125));return(0,Z.jsx)(py,{children:(0,Z.jsx)(my,{$fraction:r})},t)})}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":g,"aria-valuemin":0,"aria-valuemax":100})]}),ie&&!ct&&(0,Z.jsxs)(yy,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!ue&&(0,Z.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${Wy(un(a))} production speed from ${z(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${z(100)} PP on Firmware → Prestige)`]}),!ue&&(0,Z.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${Wy(f)} production speed from ${z(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${z(1)} PP on Firmware → Prestige)`]}),(0,Z.jsxs)(`li`,{children:[`Scale Up: `,be>0?`${be} activation${be===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${z(Ce)} completed levels on ${ve.name})`]}),rt&&(0,Z.jsxs)(`li`,{children:[`Accelerate: `,He?`${Wy(Ue,{precise:!0})} faster ticks on every tier`:`not yet active`]}),je&&(0,Z.jsxs)(`li`,{children:[`Overclock: `,Ne>0?`The per-level speed bonus is now ${Uy(Ie)}% (was ${Uy(Le)}%)`:`not yet claimed (reach ${z(Fe)} completed levels on ${I.name})`]})]})]}),!ue&&(0,Z.jsx)(vy,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,Z.jsxs)(sy,{children:[(0,Z.jsxs)(cy,{children:[z(s.points),` PP`]}),d&&` · ${Wy(f)} production speed`]})})]}),(rt||qe)&&(0,Z.jsxs)(iy,{children:[rt&&(0,Z.jsxs)(ty,{"aria-label":`global accelerate panel`,children:[(0,Z.jsxs)(My,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)($v,{children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(Qv,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,Uy(Ie),`%/lvl`]})]})}),(0,Z.jsx)(ky,{children:He?`${Wy(Ue,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,Z.jsxs)(Q,{"aria-label":He?`Upgrade Accelerate for ${Ft(We)} (currently ${Wy(Ue,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${Ft(We)}`,color:Ke?`#3b82f6`:`darkgrey`,disabled:!Ke,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${ce(`clockSpeedDisabled`)?le:``}`,type:`button`,$progress:nt,$progressColor:`#3b82f6`,$pulse:Ke,children:[(0,Z.jsx)(Eg,{children:`🌐 `}),(0,Z.jsx)(Dg,{children:Ft(We)}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":nt,"aria-valuemin":0,"aria-valuemax":100})]})]}),qe&&(0,Z.jsxs)(ny,{"aria-label":`restage panel`,children:[(0,Z.jsxs)(My,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)($v,{children:[(0,Z.jsx)(`h2`,{children:`Restage`}),(0,Z.jsxs)(Qv,{title:`Each XP consumed makes ${I.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[I.symbol,` +`,Hy(an(1)),`%/XP`]})]})}),(0,Z.jsxs)(ky,{children:[Wy(an(Ye),{precise:!0}),` faster `,I.name,` ticks`,` `,`from `,z(Ye),` XP consumed. Next consumption needs at least `,z(Ze),` XP.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Restage: consume ${z(Xe)} XP for ${et} ${I.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${ce(`restageDisabled`)?le:``}`,variant:`smart`,disabled:!$e,onClick:tt,title:Je>0?`Consume XP for a compounding +1% ${I.name} tickspeed per XP (min ${z(Ze)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${I.name} owned right now — Restaging now resets everything with nothing left producing`,type:`button`,$progress:Qe,$pulse:$e,children:[(0,Z.jsx)(Eg,{children:`🧬 `}),(0,Z.jsxs)(Dg,{children:[z(Xe),` XP`]}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`${I.name} Restage progress`,"aria-valuenow":Qe,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,Z.jsx)(Jv,{children:b.map((e,n)=>{if(!Qr(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=Ti(a,e.id),c=wi(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,p=Mr(a,e.id)??e,m=Wt(p,l,pe,d,c,2**53-1),h=de?Math.min(1,m):m,g=Ut(p,l,pe,d,1),_=h>0?Ut(p,l,pe,d,h):g,v=m>0&&!oe,y=d/pe*100,b=h/pe*100,x=a.tickspeedLevels?.[e.id]??1,S=Zt(x)*(e.id===I.id?an(a.lastTierXpConsumed??0):1),C=Wy(S),w=dr(l,ur(a)),T=pr(a,e.id),O=Math.floor(i*f*T*w*jr(a,e.id)),k=e.producesResourceId===`base`?Pt(O):e.producesResourceId===`bytes`?Ft(O):`${z(O)} ${E(e.producesResourceId)}`,j=D(e.id),M=oi(a,e.id),N=Wu(a,e.id,x+1),ne=Gu(a,e.id,x+1),ie=r>=ne&&!oe&&!Ku(a,e.id),P=fe?Li(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ae=P.levels>0?`Buy ${z(P.levels)} full level${P.levels===1?``:`s`} for ${Pt(P.cost)} total; highest level costs ${Pt(P.partialQuantity>0?P.partialCost:P.lastLevelCost)}${P.partialQuantity>0?` (${P.partialQuantity} of ${pe} purchases toward the next level)`:``} (${z(u)} completed levels)`:`Buy${h>1?` ×${h}`:``} for ${Pt(_)} (${z(u)} completed levels, ${z(d)} of ${pe} purchased toward the next)`,se=`Tickspeed multiplier (+10% faster ticks) for ${zy(N,e.id)}${ne>N+1?` (requires ${zy(ne,e.id)} owned)`:``}`,ce=P.levels>0?`+${z(P.levels)}`:``,le=`⚙ ${zy(N,e.id)}`,ue=By(r,ne),me=o.tierAccents[n%o.tierAccents.length],he=ee.has(e.id),F=`${e.id}-details`,ge=Q_(a.intro,n);return(0,Z.jsxs)(Xv,{ref:re(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:me,$animateReveal:!A.has(e.id),$boosted:ge,children:[(0,Z.jsxs)(Sy,{children:[(0,Z.jsx)(Ay,{children:(0,Z.jsxs)(jy,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":he,"aria-controls":F,onClick:()=>te(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),te(e.id))},children:[(0,Z.jsx)(kg,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,Z.jsxs)(Ny,{title:`Owned`,children:[(0,Z.jsx)(kg,{children:`Owned: `}),z(i)]})]}),he&&(0,Z.jsx)(Cy,{id:F,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Production: +`,k,` per delivery`]}),(0,Z.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,Vy(j),`s`]}),(0,Z.jsxs)(`li`,{children:[`Effective tickspeed: every `,Vy(M),`s (tier ×`,Vy(S),`, global ×`,Vy(Ue),`)`]}),(0,Z.jsxs)(`li`,{children:[`Completed levels: `,z(u),` (`,z(d),`/`,pe,` purchased toward the next) — purchase milestone bonus: ×`,Vy(w),` from `,z(s),` lifetime purchases`]}),T>1&&(0,Z.jsxs)(`li`,{children:[`Scale Up bonus: ×`,Vy(T)]}),ge&&(0,Z.jsx)(`li`,{children:ev(a.intro,n)}),(0,Z.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,Z.jsxs)(Ry,{"aria-label":se,variant:`success`,disabled:!ie,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${x} (${C} faster ticks) — the next level makes it 10% more`,$progress:ue,$pulse:ie,children:[(0,Z.jsx)($,{children:le}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":ue,"aria-valuemin":0,"aria-valuemax":100})]}),(0,Z.jsxs)(Py,{"aria-label":ae,variant:`plain`,disabled:!v,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${pe} purchases) also multiplies it by ×${ur(a)}`,$progress:y,$secondaryProgress:b,$pulse:v,children:[(0,Z.jsxs)(Fy,{children:[`🛒 `,z(u),ce&&(0,Z.jsx)(Iy,{children:ce})]}),(0,Z.jsx)(Ly,{children:Pt(P.levels>0?P.partialQuantity>0?P.partialCost:P.lastLevelCost:_)}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":pe})]})]},e.id)})}),(0,Z.jsxs)(iy,{children:[(0,Z.jsxs)(ey,{"aria-label":`scale up panel`,children:[(0,Z.jsxs)(My,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)($v,{children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(Qv,{title:`${Oe===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,ke,De?` · 🔓 TB`:``]})]})}),(0,Z.jsxs)(ky,{children:[`Resets tiers and `,Ae,` production of every tier unlocked so far`,Ee?`, and unlocks ${Ee.name}`:``,`. Needs `,z(Ce),` completed `,ve.name,` levels.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Scale Up (requires ${Ce} completed ${ve.name} levels) — ${Ae} production for tiers unlocked so far${De?` and unlocks TB`:``}`,color:Te?`#22d3ee`:`darkgrey`,disabled:!Te,onClick:t.scaleUp,title:`Resets tiers, ${Ae} production for tiers unlocked so far${Ee?`, and unlocks ${Ee.name}`:``} — requires ${Ce} completed ${ve.name} levels`,type:`button`,$progress:we,$progressColor:`#22d3ee`,$pulse:Te,children:[(0,Z.jsx)(Eg,{children:`⏩ `}),(0,Z.jsxs)(Dg,{children:[ve.symbol,` `,z(Se),`/`,z(Ce)]}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":we,"aria-valuemin":0,"aria-valuemax":100})]})]}),je&&(0,Z.jsxs)(ry,{"aria-label":`overclock panel`,children:[(0,Z.jsxs)(My,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)($v,{children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(Qv,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,Vy(10),`%/lvl`]})]})}),(0,Z.jsx)(ky,{children:Ne>0?`The per-level speed bonus is now ${Uy(Ie)}% (was ${Uy(Le)}%).`:`Not claimed yet — reach ${z(Fe)} completed ${I.name} levels. Each completed level then multiplies the per-level speed bonus by ×${Re}.`})]}),(0,Z.jsxs)(Q,{"aria-label":`Overclock (requires ${Fe} completed ${I.name} levels) — resets Scale Up's bonus; each completed ${I.name} level (${z(xe)} now) multiplies the per-level speed bonus by ×${Re}`,color:Be?`#fb923c`:`darkgrey`,disabled:!Be,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${I.name} level multiplies the per-level speed bonus by ×${Re} — requires ${Fe} completed levels${ce(`overclockDisabled`)?le:``}`,type:`button`,$progress:ze,$progressColor:`#fb923c`,$pulse:Be,children:[(0,Z.jsx)(Eg,{children:`⚡ `}),(0,Z.jsxs)(Dg,{children:[I.symbol,` `,z(xe),`/`,z(Fe)]}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":ze,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},Ky=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,qy=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,Jy={"10m":`good`,"1h":`info`,"10h":`violet`},Yy=X(ph)`
  align-items: center;
  border-left: 3px solid ${e=>e.theme.color[Jy[e.$formatId]]??e.theme.color.accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${e=>e.theme.space.sm};
  row-gap: 0;
`,Xy=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Zy=X.span`
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
`,Qy=X.span`
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
`,$y=X(Q)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,eb=X.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color[Jy[e.$formatId]]??e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,tb=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,nb=X.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,rb=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,ib=X.div`
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
`,ab=X.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,ob=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},sb=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],cb=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=sb.map(e=>({group:e,missing:Ug.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},lb=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,ub=X.button`
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
`,db=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return sb.map(r=>{let i=Ug.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,Z.jsxs)(lb,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,Z.jsx)(rb,{as:`span`,children:r.title}),i.map(n=>{let i=Gg(e.game,n.key),a=`${r.title} ${n.label}`;return(0,Z.jsx)(ub,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},fb=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${z(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,cb(e)].filter(Boolean).join(` · `),pb={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},mb=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(N_(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(ph,{"aria-label":`daily run ${e.id}`,children:[(0,Z.jsxs)(ab,{children:[(0,Z.jsxs)(Ky,{children:[`Daily `,e.label]}),(0,Z.jsx)(Q,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,Z.jsxs)(rb,{children:[o.label,` · now `,z(s),` · `,ob(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,Z.jsxs)(rb,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),fb(t.def)&&(0,Z.jsx)(rb,{"aria-label":`daily run conditions`,children:fb(t.def)}),(0,Z.jsx)(ib,{$percent:a,children:(0,Z.jsx)(`span`,{})}),(0,Z.jsx)(db,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,Z.jsx)(Gy,{game:c})]})},hb=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=Kg(n),f=H_(e,d),p=i?e.daily.runs[i]:null;return p?(0,Z.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,Z.jsx)(mb,{actions:t,format:zg.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,Z.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,Z.jsxs)(qy,{children:[d,` · `,(0,Z.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,ob(qg(n)/1e3)]})]}),(0,Z.jsx)(Xy,{children:zg.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:k_(d,n.id),f=c.has(n.id),p=fb(l),m=r?`${o?`from ${r.def.dateId} · `:``}${ob(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(N_(r)*100)}%`:[i&&pb[i.lastOutcome],i?.bestSeconds!=null&&`best ${ob(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,Z.jsxs)(Yy,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,Z.jsx)(Zy,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,Z.jsxs)(Qy,{title:`${l.objective.label} · ${m}`,children:[(0,Z.jsx)(`strong`,{children:l.objective.label}),m&&(0,Z.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,Z.jsx)($y,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,Z.jsx)($y,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,Z.jsx)(eb,{$formatId:n.id,$percent:Math.round(N_(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(N_(r)*100),role:`progressbar`,children:(0,Z.jsx)(`span`,{})}),f&&(0,Z.jsxs)(tb,{children:[p&&(0,Z.jsx)(rb,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,Z.jsxs)(nb,{children:[!o&&(0,Z.jsx)(Q,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,Z.jsx)(Q,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,Z.jsx)(J_,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?R_(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,Z.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},gb=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,_b=X.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,vb=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,yb={completed:Um`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:Um`
    border-color: ${e=>e.theme.color.warn};
  `,active:Um`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:Um``},bb=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,xb=X.button`
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
  ${e=>yb[e.$status]}
  ${e=>e.$selected&&Um`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Sb=X.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,Cb=X.span`
  color: ${e=>bb(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,wb=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,Tb=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Eb=Object.fromEntries(b.map(e=>[e.name,e.symbol])),Db={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},Ob=e=>{if(e.automation?.kind===`global`)return Db[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${Eb[n]??n}`},kb={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},Ab=(e,t)=>Tr(e)?.id===t.id?`active`:Er(e,t.id)?`completed`:`available`,jb=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=Er(t,e.id);return(0,Z.jsxs)(J_,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${Cv(e)}?`,children:[(0,Z.jsx)(`p`,{children:e.rule}),(0,Z.jsxs)(`p`,{children:[`Goal: `,xv(e.goal),`, then Purge.`]}),(0,Z.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},Mb=({state:e,onStart:t,onExit:n})=>{let r=Tr(e),i=N.filter(e=>le.has(e.id)).map(t=>{let n=Vr(e,t.id);return{def:t,unlocked:n,status:n?Ab(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${Br(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${bv(i).replace(` `,``)}`:Ob(t)};return(0,Z.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,Z.jsxs)(ph,{children:[(0,Z.jsx)(gb,{children:`Factory challenges`}),(0,Z.jsxs)(_b,{"aria-label":`challenge counts`,children:[(0,Z.jsxs)(Cb,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,Z.jsxs)(Cb,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,Z.jsxs)(Cb,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,Z.jsx)(vb,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,Z.jsxs)(xb,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${kb[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?Cv(t):`${t.id} · ${t.target} · ${Sv(t)}`,type:`button`,children:[(0,Z.jsx)(Sb,{$status:r,children:t.id}),(0,Z.jsx)(Cb,{$status:r,children:u(e)})]},t.id)})}),c&&(0,Z.jsxs)(wb,{"aria-label":`challenge ${c.def.id}`,children:[(0,Z.jsxs)(`span`,{children:[c.unlocked?(0,Z.jsx)(`strong`,{children:Cv(c.def)}):(0,Z.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,Z.jsx)(Tb,{children:c.def.rule}):(0,Z.jsxs)(Tb,{children:[`🔒 `,Sv(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,Z.jsx)(yv,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,Z.jsx)(Q,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${Cv(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},Nb=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Pb=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,Fb=X.div`
  display: flex;
  gap: 0.5rem;
`,Ib=X(Q)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,Lb=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],Rb=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=Fm(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=A_(n),u=a===`daily`&&!l?`factory`:a;return(0,Z.jsxs)(Nb,{children:[(0,Z.jsx)(Pb,{children:(0,Z.jsx)(`h1`,{children:`Challenges`})}),(0,Z.jsx)(Fb,{role:`tablist`,"aria-label":`challenge types`,children:Lb.filter(e=>e.id!==`daily`||l).map(e=>(0,Z.jsxs)(Ib,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,Z.jsx)(Mb,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,Z.jsx)(hb,{actions:r,state:n}),(0,Z.jsx)(jb,{def:s?N.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},zb=`🏷️`,Bb=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,Vb=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Hb=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ub=X.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,Wb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,Gb=Xm`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,Kb=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,qb=Xm`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,Jb=X.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${Kb(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
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
  border: 1.5px solid ${e=>e.$activeKind?Kb(e):e.$full?e.theme.color.accent:e.$empty?e.theme.color.textMuted:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$pullEligible?e.theme.color.good:`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:e.$empty?e.theme.color.surfaceSunken:`transparent`};
  ${e=>e.$activeKind?`--disk-glow: ${Kb(e)}; box-shadow: 0 0 0 1px var(--disk-glow), 0 0 10px 2px var(--disk-glow);`:``}
  ${e=>e.$queued?`border-style: dashed; border-color: ${e.theme.color.info};`:``}
  animation: ${e=>e.$activeKind&&!e.$paused?qb:e.$pullEligible?Gb:`none`} 1.4s ease-in-out infinite;
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
`,Yb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Xb=X.div`
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
`,Zb=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,Qb=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,$b=X.div`
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
`,ex=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,tx=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=Ls(n,t),l=c!==null,u=La(n,t),d=Is(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=H(t),g=Jo(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=Bo(n),b=Io(n),x=t===y?V(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/Vo(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!Xo(n)||Math.max(0,(Ea(n,sa(t))??0)-za(n,sa(t)))<=0),O=Math.round(E*100),k=cs(n,t),A=k?ms(n,t):!1,ee=k?fs(k):0,j=k?ps(k):0,te=k&&k.segmentsCollected<10,M=k&&k.segmentsCollected>=10,N=vs(n,t)&&typeof e?.expediteDiskFill==`function`,ne=ys(n,t),re=us(k).length>0,ie=Ds(n,t),P=!!ie,ae=P&&As(n,t),oe=P?Math.max(0,1-ks(ie)):1,se=P?t*oe:p,ce=js(t);return(0,Z.jsxs)(Bb,{children:[f?(0,Z.jsx)(Ub,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):ce?(0,Z.jsxs)(Vb,{children:[(0,Z.jsx)(Hb,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,Z.jsx)(Yb,{role:`group`,"aria-label":P?`${h} read cache flushing to disk${ae?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,se-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,Z.jsx)(Xb,{"aria-label":P?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:P?ae?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(ie.remainingSeconds/ja(n,sa(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:P&&(a||o>0),children:o>0?(0,Z.jsx)(Zb,{$fill:o,$flushing:P}):null},r)})})]}):null,k&&!f?(0,Z.jsxs)(Vb,{children:[(0,Z.jsxs)(Hb,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,Z.jsx)(Qb,{role:`progressbar`,"aria-label":M?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((M?j:ee)*100),children:te?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=fs(k),i=t<n,a=t===n&&r>0;return(0,Z.jsx)($b,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?re?`Collecting from smaller disks and Staging`:`Filling from Staging`:ne?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,Z.jsx)($b,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,Z.jsx)(ex,{$fill:j})})})]}):null,(0,Z.jsxs)(Vb,{children:[(0,Z.jsx)(Hb,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,Z.jsx)(Wb,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&N,g=o&&!p&&ne&&r===i;return(0,Z.jsx)(Jb,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${ss(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?ce?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},nx=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,rx=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,ix=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,ax=X.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,ox=X.h4`
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
`,sx=X.span`
  flex-shrink: 0;
`,cx=X.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,lx=X.div`
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
`,ux=X.span`
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
`,dx=X.div`
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
`,fx=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,px=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,mx=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Ci(t)},hx=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,gx=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,_x=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,vx=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,yx=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,bx=X.div`
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
`,xx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Sx=X(Q)`
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
`,Cx=X.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,wx=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=U(e,n),a=Ks(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},Tx=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?wx(t):[r];if(c.length===0)return null;let l=(0,Z.jsx)(rx,{children:c.map(n=>{let r=Gs(n),i=Sc(n)(t),c=Pe[n-1]??`Cell`,l=Zc(n),u=Js(t,n),d=!qs(t,n)&&He[Ks(t,n)+1],f=Wo(u*l,n),p=Wo(i*l,n),m=Qs(t,n),h=tc(t,n),g=nc(t,n),_=ac(t,n),v=lc(t,n),y=uc(t,n),b=cl(t,n),x=ol(t,n),S=bc(t,n),C=ca(t,n),w=Uc(t,n),T=Fc(t,n),E=!T&&Ic(t,n),D=Hc(t,n),O=Gc(t,n),k=cc(t,n)*l,A=dc(t,n),ee=A&&il(t,n),j=ee||A&&C&&Ea(t,n)>=wa(t,n)?ba(t,n)*(ee?ja(t,n):1)*yc(t,n):0,te=O||b&&!D&&!E&&!T,M=i*l,N=!te&&S&&!E&&j>0&&i<=u&&k<M?mx((M-k)/j):null,ne=S?v/100:0,re=(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(nx,{children:zb}),p]}),ie=`${S?v:0}%`;return(0,Z.jsxs)(ix,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,Z.jsxs)(cx,{$flush:s,children:[(0,Z.jsxs)(ax,{children:[(0,Z.jsxs)(ox,{title:`${r} Data Lake — funds ${c}`,children:[(0,Z.jsxs)(sx,{"aria-hidden":`true`,children:[(0,Z.jsx)(nx,{children:`🏞️`}),r]}),(0,Z.jsx)(`span`,{children:`Lake`})]}),(0,Z.jsxs)(fx,{title:`Current fill speed`,children:[`⚡ `,H(j),`/s`]})]}),(0,Z.jsxs)(lx,{children:[D?(0,Z.jsx)(hx,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:re}):E?(0,Z.jsx)(hx,{title:`${c} is already at the max — spend or charge it up first`,children:re}):w?(0,Z.jsx)(hx,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:re}):T?(0,Z.jsx)(Sx,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:re})}):S?(0,Z.jsx)(Sx,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:re})}):(0,Z.jsx)(hx,{title:`Build a ${H(l)} disk in Storage to unlock ${c} here`,children:re}),O?(0,Z.jsx)(Sx,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,Z.jsx)(Sx,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${H(x)} banked) to grow its capacity from ${f} to ${Wo(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⚡ Scale Out`})}):N?(0,Z.jsxs)(px,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,N]}):null]}),s?(0,Z.jsx)(ux,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:ie}):(0,Z.jsx)(ux,{$withBar:!0,title:`Currently filled`,children:wo(Ko(k,n))}),(0,Z.jsx)(dx,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:ne})]}),o&&(()=>{let e=S?ic(t,n):0,i=H(l);return(0,Z.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,Z.jsxs)(yx,{children:[(0,Z.jsx)(`span`,{children:`buffer`}),(0,Z.jsx)(`span`,{children:S?`${H(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,Z.jsx)(dx,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=oc(t,n),i=Wo(l*_.target,n);return(0,Z.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,Z.jsxs)(yx,{children:[(0,Z.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,Z.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,Z.jsx)(dx,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&ze.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?oc(t,n):0,u=Wo(s,n);return(0,Z.jsxs)(_x,{children:[(0,Z.jsx)(vx,{"aria-hidden":`true`,children:u}),(0,Z.jsx)(gx,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,Z.jsx)(bx,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,Z.jsx)(xx,{$fill:c})},t)})})]},e)}),o&&(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,cc(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,Z.jsxs)(Z.Fragment,{children:[a&&!s&&(0,Z.jsx)(Cx,{}),l]}):(0,Z.jsx)(ph,{"aria-label":`Data Lakes`,children:l})},Ex=h(),Dx=X.div`
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
`,Ox=X.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,kx=X.dl`
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
`,Ax=X.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,jx=8,Mx=6,Nx=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-jx-n,i=t.bottom+Mx,a=t.top-Mx-n,s=i<=r||a<jx?Math.max(jx,Math.min(i,r)):a,l=Math.max(jx,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,Ex.createPortal)((0,Z.jsxs)(Dx,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:jx,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,Z.jsx)(Ox,{children:r}),(0,Z.jsx)(kx,{children:i.map(({label:e,value:t})=>(0,Z.jsxs)(`div`,{style:{display:`contents`},children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),a&&(0,Z.jsx)(Ax,{children:a})]}),document.body)},Px=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,Fx=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,Ix=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,Lx=X.p`
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
`,Rx=X.button`
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
`,zx=({theme:e})=>Um`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,Bx=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,Vx=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>Um`
  button {
    background-color: ${Bx(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,Hx=X(ph)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${zx}

  button {
    background-color: ${Bx};
    border: 0;
    border-radius: 0;
  }
`,Ux=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Ci(t)},Wx=(e,t,n)=>Ji(e,t,t,n),Gx=(e,t,n)=>{let r=Wx(e,t,n);return r===null?null:Ux(r)},Kx=X.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,qx=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,Jx=Xm`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,Yx=X.span`
  display: inline-block;
  animation: ${Jx} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Xx=X.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,Zx=X.span`
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
`,Qx=X.span`
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
`,$x=X.span`
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
`,eS=X.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,tS=X.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,nS=X(dx)`
  margin-top: 0;
`,rS=X.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,iS=X(ph)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${zx}
  ${e=>e.$boosted&&tv}
`,aS=X.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,oS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,sS=X(ph)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${zx}
  ${e=>e.$boosted&&tv}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`,cS=X.button`
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
`,lS=X.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,uS=X.button`
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
`,dS=X.div`
  position: relative;
  width: 100%;
`,fS=X.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,pS=X.h3`
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
`,mS=X.span`
  flex-shrink: 0;
`,hS=X(X.span`
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
`,gS=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${Tg}
  background-color: ${Bx};
`,_S=X(gS)`
  position: relative;
`,vS=X(gS)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,yS=X(gS)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,bS=(e,t,n,r=!0)=>{let i=po(t,n),a=i&&e>0&&e<i.divisor?po(e,n):i;return r?So(e,a):bo(e,a)},xS=(e,t,n=``)=>{let r=po(e,!0);return`${Co(e/r.divisor)} → ${Co(t/r.divisor)} ${r.symbol}${n}`},SS=(e,t)=>bo(e,po(e,t)),CS=5e3,wS=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),TS=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!wS(e))return;let t=setTimeout(()=>n(e),CS);return()=>clearTimeout(t)},[e,r]),t===e},ES=({bits:e,poolIndex:t,large:n})=>{let r=TS(qo(e,t))?Ko(e,t):qo(e,t);return(0,Z.jsx)(Lx,{$large:n,children:r})},DS=e=>Math.min(100,Math.max(0,e)),OS=8,kS=X.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,AS=X.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,jS=X.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,MS=X.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,NS=X.div`
  position: relative;
  min-width: 0;
  height: ${OS}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,PS=X(X.div`
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
`,FS=X.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,IS=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,Z.jsxs)(kS,{children:[(0,Z.jsxs)(AS,{children:[(0,Z.jsx)(nx,{children:`📦`}),e]}),o&&(0,Z.jsx)(NS,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,Z.jsx)(PS,{$widthPercent:a/100*100})}),o&&(0,Z.jsxs)(jS,{children:[`+`,Math.round(a),`% `,(0,Z.jsx)(FS,{children:`👆`})]}),!o&&r&&(0,Z.jsxs)(MS,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},LS=[[10,[229,72,77]],[100,[59,130,246]],[Oe,[48,164,108]]],RS=e=>{let t=LS.length-1;if(e<=LS[0][0])return`rgb(${LS[0][1].join(`,`)})`;if(e>=LS[t][0])return`rgb(${LS[t][1].join(`,`)})`;let n=LS.findIndex(([t])=>e<=t),[r,i]=LS[n-1],[a,o]=LS[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},zS=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=TS(bS(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=ao(o),f=ha(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${wo(To(e))}/s`,w=Wi(s),T=Cu(s),E=s.byteCreated?C(ta(s)):null,D=Qi(s),O=Gx(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=Io(o),ee=Bo(o),j=Fo(o),te=Ho(o,j),M=Vo(o,j),N=sa(j),ne=Math.max(0,Ea(o,N)-za(o,N)),re=zo(o),ie=Lo(o),P=Bi(s).toFixed(3),ae=Bi({...s,unlockedDiskSteps:zi(s)+1}).toFixed(3),oe=H(Mo(zi(s)+1)),se=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${oe} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${P} → ${ae}.`))&&n.unlockNextDiskSize()},ce=d?Yo(o):[],le=!A&&Xo(o),ue=s.diskBuild,de=!A&&!re&&Ba(o)&&!le&&!ue,fe=Math.min(M,V(o,j)),pe=Math.floor(fe+1e-9),me=fe>0||s.diskBuildQueued,he=ue?DS(100-ue.remainingSeconds/ue.totalSeconds*100):re?100:me?DS(fe/M*100):0,F=Ls(o,j),I=Ka(o),ge=Ja(o),_e=!!s.capacityUpgradeQueued,ve=!!s.speedUpgradeQueued,ye=_e||ve,be=s.capacity,L=qa(s),xe=s.capacity*2,Se=SS(xe,!0),Ce=Hi(s),we=Wi(Ce?{...s,capacity:xe}:{...s,speedCapacity:L*2}),Te=`${To(we)}/s`,Ee=w>0?`×${Number((we/w).toFixed(2))}`:``,De=DS(s.bits/8*100),Oe=DS((s.capacityUpgradeProgress??0)/be*100),ke=DS((s.speedUpgradeProgress??0)/L*100),Ae=ve?ke:Oe,je=ra(s),Me=je?.cost??0,Ne=je?.progress??0,Pe=je?.multiplierPercent??100,Fe=C(je?.rate??0),Ie=je?.rate??0,Le=Ux(Ie>0&&Me>0?Math.max(0,Me-Ne)/Ie:1/0),Re=DS(s.bits/s.capacity*100),ze=()=>{le?n.provisionDisk():n.queueDiskBuild()},Be=s.diskBuildQueued,Ve=`${pe}/${M}`,He=M>1||pe>0?` · ${Ve}`:``,Ue=`Provision ${H(j)} Disk`,We=!!Be&&!ue&&!re&&!A,Ge=sa(ee),Ke=A?s.diskBuild?`waiting for build`:ua(o,Ge)?`waiting for earlier pool`:ba(o,Ge)<=0?`waiting for pool`:Ea(o,Ge)<=za(o,Ge)?`waiting for staging`:null:null,qe=ue?{icon:`🏗`,label:`Provisioning ${H(ue.size)} Disk`,status:`${Math.ceil(ue.remainingSeconds)}s left`}:re?{icon:`✅`,label:`All Pools Complete (${H(j)})`,status:null}:A?{icon:`🔁`,label:Ue,status:`Rebuilding ${H(ee)} first · ${Ke??`automatic`}`}:Be?{icon:`⏳`,label:`Provisioning ${H(j)} Disk`,status:`${pe>0?Ve:`Queued`} · ${le?ne>0?`building`:`waiting for staging`:de?`after disk fill`:`waiting for pool`}`}:le?{icon:`🏦`,label:Ue,status:`Ready · ${zb} ${H(te)}${He}`}:{icon:`🏦`,label:Ue,status:`${zb} ${H(te)}${He} · tap to queue`,reason:de?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},Je=ja(o,A?Ge:N),Ye=100*Je,Xe=(A?xa(o,Ge):ba(o,N))*Je,Ze=`${wo(H(Xe))}/s`,Qe=A&&ba(o,Ge)<=0,$e=is(o),et=$e.disksTotal>0?DS($e.disksDone/$e.disksTotal*100):0,tt=$e.seconds,nt=A?et:he,rt=Math.max(0,(M-fe)*j),it=Ma(o,N)*Aa(o,N)/100*Eu(s,N),at=Math.min(rt,ne),ot=Xe>0?at/Xe+(rt-at)/Math.max(Math.min(Xe,it),Number.MIN_VALUE):1/0,st=A?Ux(tt):de?`—`:Ux(ot),ct=d&&!re&&!ue&&Xe>0&&(A||Be),lt=(0,Z.jsx)(Q,{"aria-label":`reformat to unlock disk size`,onClick:se,title:`Reformat the Byte Foundry to unlock ${oe} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${P} → ${ae}.`,type:`button`,variant:`prestige`,children:(0,Z.jsxs)(qx,{children:[(0,Z.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,oe,` Disks`]}),(0,Z.jsx)(rS,{children:`Bitrate exponent ${P} → ${ae} · auto-rebuilds to your highs`})]})}),ut=ie?lt:(0,Z.jsxs)(Q,{"aria-label":ue?`disk array rebuilding`:re?`disk ladder complete`:`provision disk`,"aria-description":qe.reason?`${qe.status} (${qe.reason})`:qe.status??void 0,disabled:!!ue||re||A,onClick:ze,title:ue?`Provisioning ${H(ue.size)} — ${Math.ceil(ue.remainingSeconds)}s (array offline)`:re?`All ${oa()} storage pools are complete through ${H(j)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${H(ee)} now); ${H(j)} unlocks for provisioning once they are done`:Be?`Armed — draws from the pool staging at the pool's fixed bandwidth${de?` once Disk Fill is done`:``} (${pe}/${M} passes so far)`:le?F?`Costs ${H(te)}, paid in ${M} pass${M===1?``:`es`} of ${H(j)} each (${pe}/${M} collected) — creates an empty ${H(j)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${F} level`:`Costs ${H(te)}, paid in ${M} pass${M===1?``:`es`} of ${H(j)} each (${pe}/${M} collected) — creates an empty ${H(j)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:de?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${pe}/${M} passes so far)`,type:`button`,variant:re||A?`neutral`:Be?`smart`:le?`info`:`neutral`,$progress:nt,$pulse:We,children:[ct?(0,Z.jsxs)(Xx,{children:[(0,Z.jsxs)(Zx,{children:[qe.icon,` `,A?`Rebuilding`:`${H(j)} Disk…`]}),(0,Z.jsx)(Qx,{children:A?(()=>{let e=Mo(zi(s)-1);return e>ee?`${H(ee)} → ${H(e)}`:`${H(ee)} disks`})():pe>0?Ve:`Queued`}),(0,Z.jsxs)($x,{children:[Math.floor(nt),`%`]}),(0,Z.jsxs)(tS,{style:{color:RS(Ye),...A&&$e.projected?{opacity:.55}:null},title:Qe?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&$e.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&$e.projected?`~`:``,Ze]}),st!==`—`&&(0,Z.jsxs)(eS,{style:$e.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:$e.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,$e.projected?`~`:``,st]})]}):(0,Z.jsxs)(qx,{children:[(0,Z.jsxs)(`span`,{children:[qe.icon,` `,qe.label,We?`…`:``]}),qe.status&&(0,Z.jsx)(rS,{children:qe.status})]}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(nt),"aria-valuemin":0,"aria-valuemax":100})]}),dt=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&ye&&!!je||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{dt||_(null)},[dt]);let ft=g===`stream`,pt=null;if(ft){let e=Zi(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=ba(o,e);pt=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:P},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...je?[{label:`Upgrade bar drawing`,value:Fe}]:[],{label:`Buffer`,value:`${Math.floor(Re*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...ge&&!ye?[{label:`After Upgrade Bitrate`,value:`${Te} (${Ee})`}]:[]]}let mt=g===`upgrade`&&!!je,ht=mt?[{label:`Draw now`,value:Fe},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${To(Ne)} / ${To(Me)}`},{label:`Time left`,value:Le},...je.kind===`speed`?[{label:`Bitrate after`,value:xS(w,we,`/s`)}]:[{label:`Capacity after`,value:xS(s.capacity,xe)},...Ce?[{label:`Bitrate after`,value:xS(w,we,`/s`)}]:[]]]:null;return(0,Z.jsxs)(Px,{children:[(0,Z.jsx)(Wv,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,Z.jsx)(Ix,{children:(0,Z.jsx)(Fx,{children:`🔥 Byte Foundry`})}),(0,Z.jsxs)(sS,{"aria-label":`Data Stream`,$boosted:Z_(s),children:[(0,Z.jsxs)(_S,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:Re,children:[s.mainGameUnlocked&&(0,Z.jsx)(cS,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,Z.jsxs)(lS,{children:[(0,Z.jsxs)(dS,{children:[(0,Z.jsxs)(fS,{children:[(0,Z.jsx)(pS,{children:(0,Z.jsxs)(`span`,{children:[(0,Z.jsx)(nx,{children:`🌊`}),`Data Stream`]})}),(0,Z.jsx)(Lx,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:bS(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,Z.jsxs)(hS,{ref:ft?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:RS(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":ft,"aria-controls":ft?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),ft&&(0,Z.jsx)(Nx,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:pt})]}),(0,Z.jsx)(IS,{capacityText:SS(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&ye&&(0,Z.jsxs)(vS,{"aria-label":ve?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:ve?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${Se} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,Z.jsxs)(Xx,{children:[(0,Z.jsxs)(Zx,{children:[(0,Z.jsx)(nx,{children:`⏫`}),`Upgrading`,(0,Z.jsx)(Yx,{children:`…`})]}),(0,Z.jsxs)(Qx,{children:[(0,Z.jsx)(nx,{children:ve?`⚡`:`📦`}),ve?xS(w,we,`/s`):xS(s.capacity,xe)]}),(0,Z.jsxs)($x,{children:[Math.floor(Ae),`%`]}),(0,Z.jsxs)(hS,{ref:mt?y:void 0,$color:RS(Pe),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Fe}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":mt,"aria-controls":mt?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Fe]}),mt&&(0,Z.jsx)(Nx,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:je.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:ht}),(0,Z.jsxs)(eS,{children:[`⏳ `,Le]})]}),(0,Z.jsx)(nS,{$fill:Math.min(1,Math.max(0,Ae/100)),"aria-hidden":`true`}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(Ae),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!ye)&&(0,Z.jsxs)(Vx,{children:[u&&(0,Z.jsxs)(Q,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:De,children:[(0,Z.jsx)($,{children:`🔗 Compile into a Byte`}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!ye&&(0,Z.jsx)(Kx,{children:!ye&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`upgrade data stream capacity`,disabled:!I,onClick:n.pickIntroCapacityMilestone,title:I?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity${Ce?` and raises Bitrate with it`:``}`:`Capacity is already at its maximum`,"aria-description":I?`Costs ${To(be)}; capacity ${Se}${Ce?` and bitrate ${Te}`:``} after upgrading`:void 0,type:`button`,variant:I?`prestige`:`neutral`,children:(0,Z.jsxs)(qx,{children:[(0,Z.jsx)(`span`,{children:Ce?`Upgrade`:`Upgrade Capacity`}),(0,Z.jsx)(rS,{children:I?`🏷️ ${To(be)} · 📦 ×2${Ce?` · ⚡ ${Ee}`:``}`:`📦 Max capacity`})]})}),!Ce&&(0,Z.jsx)(Q,{"aria-label":`upgrade data stream bitrate`,disabled:!ge,onClick:n.queueIntroSpeedUpgrade,title:ge?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${P} — upgrade Capacity first`,"aria-description":ge?`Costs ${To(L)}; bitrate ${Te} after upgrading`:void 0,type:`button`,variant:ge?`prestige`:`neutral`,children:(0,Z.jsxs)(qx,{children:[(0,Z.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,Z.jsx)(rS,{children:ge?`🏷️ ${To(L)} · ⚡ ${Ee}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,Z.jsx)(Hx,{"aria-label":`Provision Disk`,children:ut}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=Ma(o,r),a=Ea(o,r),c=wa(o,r),l=c>0?DS(a/c*100):0,u=a>=c,d=Aa(o,r),f=ka(o,r),p=Gx(a,c,i),_=il(o,r),v=ce.filter(e=>sa(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${wo(H(e))}/s`,D=E(i*d/100*Eu(s,r)),O=g===`pool-${r}`,k=null,A=ba(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=ba(o,t);let t=Oa(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*ja(o,r))}]:[]]}return(0,Z.jsxs)(iS,{"aria-label":`pool ${r}`,$boosted:$_(s,r),children:[(0,Z.jsxs)(yS,{$progress:l,children:[(0,Z.jsx)(cS,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,Z.jsxs)(lS,{children:[(0,Z.jsxs)(dS,{children:[(0,Z.jsxs)(fS,{children:[(0,Z.jsx)(pS,{children:(0,Z.jsxs)(uS,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,Z.jsxs)(mS,{"aria-hidden":`true`,children:[(0,Z.jsx)(nx,{children:`💧`}),T]}),(0,Z.jsx)(`span`,{children:`Pool`})]})}),(0,Z.jsx)(ES,{bits:a,poolIndex:r,large:f<=0}),(0,Z.jsxs)(hS,{ref:O?y:void 0,$centered:f<=0&&!p,$color:RS(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,Z.jsx)(Nx,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,Z.jsx)(IS,{capacityText:Wo(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,Z.jsx)(aS,{children:(0,Z.jsx)(Tx,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,Z.jsxs)(oS,{children:[v.map(e=>(0,Z.jsx)(tx,{actions:n,size:e,state:o},e)),(0,Z.jsx)(Tx,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,Z.jsx)(Rx,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},BS=X.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,VS=X.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,HS=X.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,US=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,WS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,GS=X(ph)`
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
`,KS=Um`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,qS=X.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,JS=X.span`
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
`,YS=X.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${KS}
`,XS=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${KS}
`,ZS=X(Q)`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${KS}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,QS=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,$S=Object.fromEntries(b.map(e=>[e.id,e])),eC=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=jn(n),a=Sn(n),o=Fm(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});return(0,Z.jsxs)(BS,{"aria-label":`compute flops screen`,children:[(0,Z.jsxs)(VS,{children:[(0,Z.jsx)(`h1`,{children:`🖥 Compute`}),(0,Z.jsx)(HS,{"aria-label":`cumulative flops boost`,children:Pn(i)})]}),!a&&(0,Z.jsxs)(US,{children:[`Unlocks at `,100,` PP — you have `,z(r),` PP.`]}),(0,Z.jsx)(WS,{"aria-label":`compute flops tiers`,children:pt.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=Nn(n,e.boostsTierId),d=En(e,c),f=Dn(n,e.id),p=$S[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(ft*100).toFixed(2);return(0,Z.jsxs)(GS,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,Z.jsxs)(qS,{children:[(0,Z.jsx)(JS,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,Z.jsxs)(YS,{title:`Owned`,children:[(0,Z.jsx)(kg,{children:`Owned: `}),z(c)]})]}),(0,Z.jsxs)(XS,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,Z.jsx)(ZS,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${z(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${z(d)} PP for +${g}%/s on ${m}`:`Costs ${z(d)} PP — you have ${z(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,Z.jsxs)($,{children:[z(d),` PP`]})}),h&&(0,Z.jsxs)(QS,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},tC=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,nC=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,rC=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,iC=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,aC=X.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,oC=X.div`
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
`,sC=X.div`
  height: 0.6rem;
`,cC=X.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,lC=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,uC=X.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,dC=X.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,fC=X.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,pC=X.button`
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
`,mC=X.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,hC=X.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,gC=X.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,_C=X.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,vC=X.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,yC=X.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,bC=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,xC=X(bC)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,SC=X(bC)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,CC=X.span`
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
`,wC=X.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,TC=X.div`
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
`,EC=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],DC=(e,t,n)=>e>=8&&t<n,OC=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=EC.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:bu(r)[0]?.queue[0]??1}),o=bu(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=r.computeMergePageUnlocked?i:1,u=(l?EC[l-1]:null)&&(0,Z.jsxs)(Z.Fragment,{children:[!r.computeMergePageUnlocked&&(0,Z.jsx)(wC,{title:`Boosts ${iv(l,`name`)}`,children:`Boosts ${iv(l)}`}),(0,Z.jsx)(TC,{role:`group`,"aria-label":`compute boost`,children:Object.keys(Ne).map(e=>{let i=_u(e,l),a=vu(e,l),o=nv[e].label,s=!!xu(r,e),c=`×${i} production, ${rv(a)}`;return(0,Z.jsx)(bC,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!Ou(n,e,l),onClick:()=>t.activateComputeBoost(e,l),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`${nv[e].icon} ×${i} · ${rv(a)}`})},e)})})]});return(0,Z.jsxs)(tC,{children:[s?(0,Z.jsx)(kg,{as:`h1`,children:`⚡ Power`}):(0,Z.jsx)(nC,{children:(0,Z.jsx)(rC,{children:`⚡ Power`})}),s&&(0,Z.jsx)(vv,{actions:t,state:n}),!s&&(0,Z.jsx)(wC,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,Z.jsx)(dC,{"aria-label":`boost`,children:u}),r.computeMergePageUnlocked?(0,Z.jsx)(aC,{"aria-label":`compute entities`,children:EC.map((e,i)=>{let o=i+1,s=r[e.countField]??0,d=!!e.autoFlagField,f=d?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=d&&!f&&p>=10,h=d?fl(n,e.autoFlagField):0,g=d&&!f&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=d?Tc(n,e.mergeOutputField):10,S=d&&Al(n,i),C=d?Dc(n,o):0,w=d&&kc(n,i),T=d&&jc(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=f?S:DC(s,r[e.mergeOutputField]??0,x),O=d&&(!f||l===o||b||w||D||C>0),k=i>0?EC[i-1]:null,A=EC.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||f||b||l===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let ee=EC[i+1]?.symbol??`⬆`,j=d&&(f?(0,Z.jsx)(xC,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,Z.jsx)(xC,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!DC(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:`${e.symbol} 8→1 ${g?`🔌`:ee}`})})),te=d&&(f?(0,Z.jsx)(CC,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${Ci(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${Ci(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${Ci(y)}`:`🔌 ${C}/8`}):m?(0,Z.jsx)(SC,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${z(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,Z.jsx)($,{children:`🔓 10/10`})}):(0,Z.jsx)(CC,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),M=d&&O;return(0,Z.jsxs)(v.Fragment,{children:[(0,Z.jsxs)(uC,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:l===o,children:[(0,Z.jsxs)(fC,{children:[(0,Z.jsxs)(pC,{type:`button`,onClick:()=>a(o),"aria-pressed":l===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${iv(o,`name`)}`,$selected:l===o,children:[(0,Z.jsx)(_C,{"aria-hidden":`true`,children:e.symbol}),(0,Z.jsxs)(hC,{children:[(0,Z.jsxs)(gC,{children:[(0,Z.jsxs)(mC,{children:[e.label,(0,Z.jsx)(kg,{children:` ${z(E)}/10`})]}),(0,Z.jsxs)(lC,{"aria-hidden":`true`,children:[`→ `,iv(o)]})]}),(0,Z.jsx)(vC,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,Z.jsx)(yC,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),te&&(0,Z.jsx)(cC,{children:te})]}),l===o&&u]}),M?(0,Z.jsx)(oC,{children:j}):(0,Z.jsx)(sC,{})]},e.key)})}):(0,Z.jsx)(iC,{children:`⬡ ${z(r.computeCores??0)}/10 · 🔗 ${z(r.computeNodes??0)}/10`})]})},kC=X.button.attrs({type:`button`})`
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
`,AC=b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),jC=pt.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{}),MC=e=>AC[e]??jC[e]??e,NC=e=>typeof e==`number`||typeof e==`boolean`||typeof e==`string`,PC=(e,t,n)=>{let[r,...i]=t;return r===`__proto__`||r===`constructor`||r===`prototype`?e:i.length===0?{...e,[r]:n}:{...e,[r]:PC(e[r]??{},i,n)}},FC=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}],IC=e=>FC.find(t=>t.match(e)).id,LC=e=>{if(typeof e!=`string`)return null;let t=e.trim().replace(/[,_\s]/g,``);if(t===``)return null;let n=/^10\^(-?\d+(?:\.\d+)?)$/.exec(t);if(!n&&!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t))return null;let r=n?10**Number(n[1]):Number(t);return Number.isFinite(r)?r:null},RC=(e,t=[])=>e!==null&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype)?Object.entries(e).flatMap(([e,n])=>RC(n,[...t,e])):t.length===0?[]:[{path:t,value:e}],zC=e=>e.map(MC).join(` › `),BC=(e,t)=>{let n=t.trim().toLowerCase();return n===``||e.join(`.`).toLowerCase().includes(n)||zC(e).toLowerCase().includes(n)},VC=X.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,HC=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,UC=X(ph)`
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
`,WC=X.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`,GC=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,KC=X.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`,qC=X.div`
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
`,JC=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`,YC=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`,XC=X(Q)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`,ZC=X.input`
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
`,QC=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`,$C=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`,ew=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`,tw=X.div`
  display: flex;
  gap: 0.3rem;
`,nw=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`,rw=X(Q)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`,iw=X.span`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
`,aw=X.details`
  border-left: 2px solid ${e=>e.theme.color.border};
  padding-left: 0.6rem;
`,ow=X.summary`
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
`,sw=X.textarea`
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
`,cw=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.good} !important;
  font-size: 0.8rem;
`,lw=e=>Number.isInteger(e)&&Math.abs(e)<1e4?null:z(e),uw=e=>{let t=Number.isInteger(e),n=[{id:`div10`,label:`÷10`,apply:e=>t?Math.floor(e/10):e/10},{id:`mul10`,label:`×10`,apply:e=>e===0?10:e*10}];return t&&Math.abs(e)<2**53-1&&(n.unshift({id:`minus1`,label:`−1`,apply:e=>Math.max(0,e-1)}),n.push({id:`plus1`,label:`+1`,apply:e=>e+1})),n},dw=({path:e,value:t,label:n,onCommit:r})=>{let[i,a]=(0,v.useState)(null),o=e.join(`.`),s=typeof t==`number`,c=s&&i!==null?LC(i):null,l=s&&i!==null&&c===null,u=i!==null&&!l,d=()=>{u&&(r(e,s?c:i),a(null))},f=s?l?`Not a number (try 1e100, 1,000 or 10^6)`:lw(c??t):null;return(0,Z.jsxs)(QC,{children:[(0,Z.jsx)($C,{title:o,children:n}),(0,Z.jsxs)(ew,{children:[(0,Z.jsxs)(tw,{children:[(0,Z.jsx)(ZC,{"aria-invalid":l||void 0,"aria-label":o,autoComplete:`off`,enterKeyHint:`done`,inputMode:s?`decimal`:`text`,onBlur:()=>i!==null&&i===String(t)&&a(null),onChange:e=>a(e.target.value),onKeyDown:e=>{e.key===`Enter`&&d(),e.key===`Escape`&&a(null)},spellCheck:!1,type:`text`,value:i??String(t)}),(0,Z.jsx)(rw,{"aria-label":`set ${o}`,disabled:!u,onClick:d,title:`Set (Enter) — Escape reverts`,type:`button`,variant:u?`primary`:`neutral`,children:(0,Z.jsx)($,{children:`✓`})})]}),s&&(0,Z.jsx)(nw,{children:uw(t).map(n=>{let i=n.apply(t);return(0,Z.jsx)(rw,{"aria-label":`${o} ${n.label}`,disabled:!Number.isFinite(i),onClick:()=>{a(null),r(e,i)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:n.label})},n.id)})}),f&&(0,Z.jsx)(iw,{$error:l,children:l?f:`= ${f}`})]})]})},fw=({path:e,value:t,label:n,onCommit:r})=>{let i=e.join(`.`);return typeof t==`boolean`?(0,Z.jsxs)(QC,{children:[(0,Z.jsx)($C,{title:i,children:n}),(0,Z.jsx)(ew,{children:(0,Z.jsxs)(tw,{children:[(0,Z.jsx)(kC,{$on:t,"aria-label":i,"aria-pressed":t,onClick:()=>r(e,!t)}),(0,Z.jsx)(iw,{children:t?`On`:`Off`})]})})]}):NC(t)?(0,Z.jsx)(dw,{label:n,onCommit:r,path:e,value:t}):(0,Z.jsxs)(QC,{children:[(0,Z.jsx)($C,{title:i,children:n}),(0,Z.jsxs)(iw,{children:[Array.isArray(t)?`[${t.length} item${t.length===1?``:`s`}]`:`not set`,` · edit in raw JSON`]})]})},pw=({path:e,value:t,onCommit:n})=>{let r=MC(e[e.length-1]);if(typeof t!=`object`||!t||Array.isArray(t))return(0,Z.jsx)(fw,{label:r,onCommit:n,path:e,value:t});let i=Object.entries(t);return i.length===0?null:(0,Z.jsxs)(aw,{children:[(0,Z.jsxs)(ow,{children:[r,` (`,i.length,`)`]}),i.map(([t,r])=>(0,Z.jsx)(pw,{onCommit:n,path:[...e,t],value:r},t))]})},mw=[{id:`foundry`,label:`🔥 Foundry`,presets:[{id:`unlock-factory`,label:`🏭 Unlock Byte Factory`,apply:e=>({...e,intro:{...e.intro,mainGameUnlocked:!0}})},{id:`unlock-boosters`,label:`🔧 Unlock Power (Cells)`,apply:e=>({...e,intro:{...e.intro,capacity:Math.max(e.intro?.capacity??0,je)}})}]},{id:`factory`,label:`📶 Factory`,presets:[{id:`near-prestige`,label:`💰 Bits → 99% to Purge`,apply:e=>({...e,resources:{...e.resources,base:A*.99}})},{id:`prestige-ready`,label:`💰 Bits → Purge threshold`,apply:e=>({...e,resources:{...e.resources,base:A}})}]},{id:`purge`,label:`🏆 Purge`,presets:[{id:`grant-1000-pp`,label:`🏆 +1,000 PP`,apply:e=>({...e,purge:{...e.purge,points:(e.purge?.points??0)+1e3}})},{id:`add-prestige`,label:`🏆 +1 Purge count`,apply:e=>Xt({...e,purge:{...e.purge,count:(e.purge?.count??0)+1}})},{id:`unlock-flops`,label:`🖥️ Unlock Compute (Flops)`,apply:e=>({...e,purge:{...e.purge,points:Math.max(e.purge?.points??0,100)},computeFlops:{...e.computeFlops,pageUnlocked:!0}})}]},{id:`era`,label:`⏻ Reboot`,presets:[{id:`era-ready`,label:`🏆 PP → Reboot-ready (1 Googol)`,apply:e=>({...e,purge:{...e.purge,points:gt}})}]}],hw=[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>FC.find(t=>t.id===e)),gw=e=>JSON.stringify(e,null,2),_w=e=>{try{let t=JSON.parse(e);return t!==null&&Object.prototype.toString.call(t)===`[object Object]`&&(Object.getPrototypeOf(t)===null||Object.getPrototypeOf(t)===Object.prototype)?null:`Must be a JSON object`}catch(e){return e.message}},vw=({game:e})=>{let t=e.devModeActive,[n,r]=(0,v.useState)(hw[0].id),[i,a]=(0,v.useState)(``),[o,s]=(0,v.useState)(()=>gw(e.state)),[c,l]=(0,v.useState)(null),[u,d]=(0,v.useState)(0);(0,v.useEffect)(()=>{s(gw(e.state)),l(null)},[t]);let f=(0,v.useMemo)(()=>_w(o),[o]),p=(0,v.useMemo)(()=>Object.keys(e.state).filter(e=>IC(e)===n),[e.state,n]),m=(0,v.useMemo)(()=>i.trim()===``?null:RC(e.state).filter(e=>BC(e.path,i)),[e.state,i]),h=()=>{window.confirm(`Wipe the dev save back to a fresh state?`)&&(e.resetDevState(),l(null),d(e=>e+1))},g=(t,n)=>{e.setDevState(e=>PC(e,t,n))},_=()=>{let t=e.applyDevStateJson(o);t.ok?(l({error:!1,text:`Applied.`}),s(gw(t.state)),d(e=>e+1)):l({error:!0,text:`Could not apply (${t.reason}).`})},y=async()=>{try{await navigator.clipboard.writeText(gw(e.state)),l({error:!1,text:`Copied live state.`})}catch{l({error:!0,text:`Clipboard unavailable.`})}},{state:b}=e,x=[[`Bits`,Pt(b.resources?.base??0)],[`Purge Points`,`✦ ${z(b.purge?.points??0)}`],[`Purges`,z(b.purge?.count??0)],[`Reboot · Kernels`,`${z(b.era?.count??0)} · ${z(b.eons?.balance??0)}`],[`Capacity`,To(b.intro?.capacity??0)]];return(0,Z.jsxs)(VC,{children:[(0,Z.jsx)(HC,{children:(0,Z.jsx)(`h1`,{children:`Dev Mode`})}),(0,Z.jsxs)(UC,{"aria-label":`dev save section`,children:[(0,Z.jsxs)(WC,{children:[(0,Z.jsxs)(GC,{children:[(0,Z.jsx)(`strong`,{children:t?`Playing the dev save`:`Playing your real save`}),(0,Z.jsx)(`p`,{children:`A separate sandbox save — enabling never touches real progress; disabling resumes it exactly where you left it.`})]}),(0,Z.jsx)(kC,{$on:t,"aria-label":`dev mode`,"aria-pressed":t,onClick:e.toggleDevMode})]}),t&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(KC,{"aria-label":`dev save readouts`,role:`group`,children:x.map(([e,t])=>(0,Z.jsxs)(qC,{children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),(0,Z.jsx)(JC,{children:(0,Z.jsx)(Q,{"aria-label":`reset dev save`,onClick:h,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`↺ Reset dev save`})})})]})]}),t&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(UC,{"aria-label":`quick seed section`,children:[(0,Z.jsx)(`h2`,{children:`Quick seed`}),(0,Z.jsx)(`p`,{children:`Jump straight to a milestone — applied on top of the current dev save.`}),mw.map(t=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h3`,{children:t.label}),(0,Z.jsx)(JC,{children:t.presets.map(t=>(0,Z.jsx)(Q,{"aria-label":t.label,onClick:()=>{e.setDevState(t.apply),d(e=>e+1)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:t.label})},t.id))})]},t.id))]}),(0,Z.jsxs)(UC,{"aria-label":`variables section`,children:[(0,Z.jsx)(`h2`,{children:`Variables`}),(0,Z.jsxs)(`p`,{children:[`Every field of the live save, grouped like the game's own screens. Switches apply instantly; numbers take `,(0,Z.jsx)(`code`,{children:`1e100`}),`, `,(0,Z.jsx)(`code`,{children:`1,000`}),` or `,(0,Z.jsx)(`code`,{children:`10^6`}),` — press Enter or ✓ to set, or step by powers of ten.`]}),(0,Z.jsx)(ZC,{"aria-label":`search variables`,autoComplete:`off`,onChange:e=>a(e.target.value),placeholder:`🔍 Search every field (e.g. Kilobytes, capacity)`,spellCheck:!1,type:`search`,value:i}),m?(0,Z.jsxs)(`div`,{"aria-label":`variable search results`,role:`region`,children:[m.length===0&&(0,Z.jsxs)(iw,{children:[`No field matches “`,i.trim(),`”.`]}),m.slice(0,60).map(e=>(0,Z.jsx)(fw,{label:zC(e.path),onCommit:g,path:e.path,value:e.value},e.path.join(`.`))),m.length>60&&(0,Z.jsxs)(iw,{children:[`+`,m.length-60,` more — refine the search.`]})]},u):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(YC,{role:`tablist`,"aria-label":`variable areas`,children:hw.map(e=>(0,Z.jsx)(XC,{"aria-controls":`dev-variables-panel`,"aria-label":`show ${e.label} variables`,"aria-selected":n===e.id,onClick:()=>r(e.id),role:`tab`,type:`button`,variant:n===e.id?`primary`:`neutral`,children:(0,Z.jsxs)($,{children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]})},e.id))}),(0,Z.jsx)(`div`,{"aria-label":`${n} variables`,id:`dev-variables-panel`,role:`tabpanel`,children:p.map(e=>(0,Z.jsx)(pw,{onCommit:g,path:[e],value:b[e]},e))},u)]})]}),(0,Z.jsx)(UC,{"aria-label":`raw state json section`,children:(0,Z.jsxs)(aw,{children:[(0,Z.jsx)(ow,{children:`Advanced: raw state (JSON)`}),(0,Z.jsxs)(`p`,{children:[`Paste a partial object (e.g. `,(0,Z.jsx)(`code`,{children:`{ "resources": { "base": 1e50 } }`}),`) — missing fields keep their current values. The only way to edit null fields and arrays.`]}),(0,Z.jsx)(sw,{"aria-invalid":!!f||void 0,"aria-label":`dev save state json`,onChange:e=>{s(e.target.value),l(null)},spellCheck:!1,value:o}),f&&(0,Z.jsxs)(cw,{$error:!0,children:[`✕ `,f]}),(0,Z.jsxs)(JC,{children:[(0,Z.jsx)(Q,{"aria-label":`apply json to dev save`,disabled:!!f,onClick:_,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Apply`})}),(0,Z.jsx)(Q,{"aria-label":`refresh json from live state`,onClick:()=>{s(gw(e.state)),l(null)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↻ Load live state`})}),(0,Z.jsx)(Q,{"aria-label":`copy live state json`,onClick:y,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`⧉ Copy`})})]}),c&&(0,Z.jsx)(cw,{$error:c.error,children:c.text})]})})]})]})},yw=`0.5.0`,bw=X.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,xw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,Sw=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,Cw=X(ph)`
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
`,ww=()=>{let e=Jt(b[0].id),t=Jt(b[b.length-1].id),n=Yt(b[0].id),r=_r({}),i=b[b.length-1].name,a=b[0].name;return(0,Z.jsxs)(bw,{children:[(0,Z.jsxs)(xw,{children:[(0,Z.jsx)(`h1`,{children:`Tens — Manual`}),(0,Z.jsxs)(Sw,{children:[`v`,yw]})]}),(0,Z.jsxs)(Cw,{"aria-label":`overview section`,children:[(0,Z.jsx)(`h2`,{children:`Overview`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Buy every tier with `,(0,Z.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,Z.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,a,` produce Bytes, which are added to your Bits.`]}),(0,Z.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,Z.jsxs)(`li`,{children:[`Reaching `,(0,Z.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge — unless you have unlocked Overflow mode (see Purge).`]}),(0,Z.jsxs)(`li`,{children:[`Once bought (`,2,` PP on Firmware → ✦ Prestige), the `,(0,Z.jsx)(`strong`,{children:`Buy max`}),` toggle makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`prestige ladder section`,children:[(0,Z.jsx)(`h2`,{children:`Prestige ladder`}),(0,Z.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP, the per-cycle Compute (Flops) boost.`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, Overflow mode, the Byte generator, Capacity, Disks, Data Lakes, Compute entities, owned Compute (Flops) units and the System log.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reinstall`}),` — a future layer above Reboot, not yet in the game.`]})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`byte foundry section`,children:[(0,Z.jsx)(`h2`,{children:`Byte Foundry`}),(0,Z.jsxs)(`p`,{children:[`Every new save starts here, before any `,a,` exist. Unlocking the main game is permanent — no Purge or Reboot sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,Z.jsx)(`h3`,{children:`The loop`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,To(ke),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,To(we(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,Oe/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,Oe/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,Z.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,Z.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,Z.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,Te,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-Ee)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,a,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,To(ke),` threshold.`]})]}),(0,Z.jsx)(`h3`,{children:`What resets vs. what stays`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,a,` level.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, every Compute entity, and the main-game unlock. Reboot resets most of this (see Reboot).`]}),(0,Z.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]}),(0,Z.jsx)(`h3`,{children:`Forced priority`}),(0,Z.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Disk Fill → Provision Disk → Compute Boost`}),(0,Z.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`storage section`,children:[(0,Z.jsx)(`h2`,{children:`Storage`}),(0,Z.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,To(ke),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,Z.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,Z.jsx)(`h3`,{children:`Provisioning Disks`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,Z.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]}),(0,Z.jsx)(`h3`,{children:`Cache and automatic pulling`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,Z.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,Z.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,Z.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,Z.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,Z.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]}),(0,Z.jsx)(`h3`,{children:`Data Lakes`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,Z.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,Z.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,Z.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,Le.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,Z.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,He.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,Z.jsx)(`li`,{children:`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the Reboot cycle — through pool flushes, Reformats and Purges.`})]}),(0,Z.jsx)(`h3`,{children:`Flushing`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,Z.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,Z.jsx)(`li`,{children:`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. A pool’s first two flushes also each upgrade one of its two disk-size exponent steps to close 10% of the gap to 1.0. These upgrades survive Reformat, Purge, and Reboot. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`}),(0,Z.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`power section`,children:[(0,Z.jsx)(`h2`,{children:`Power`}),(0,Z.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,To(je),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,Z.jsx)(`h3`,{children:`Cells and the charge chain`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,Z.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,Z.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,Z.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,Z.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]}),(0,Z.jsx)(`h3`,{children:`Compute Boost`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,Z.jsxs)(`li`,{children:[`Turbo ×`,Ne.burst.multiplier,` for`,` `,Ci(Ne.burst.durationSeconds),`; Balanced ×`,Ne.standard.multiplier,` for`,` `,Ci(Ne.standard.durationSeconds),`; Eco ×`,Ne.sustain.multiplier,` for`,` `,Ci(Ne.sustain.durationSeconds),`.`]}),(0,Z.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,Ne.burst.poolBonusPercent,`% / +`,Ne.standard.poolBonusPercent,`% / +`,Ne.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,Z.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,Z.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,Z.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,Z.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,Z.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,Z.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,Z.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,Z.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`compute flops section`,children:[(0,Z.jsx)(`h2`,{children:`Compute`}),(0,Z.jsxs)(`p`,{children:[`A separate screen (nav `,(0,Z.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,Z.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,ut.toLocaleString(),` PP.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,ut.toLocaleString(),` –`,` `,dt.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,Z.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,Z.jsxs)(`li`,{children:[`Each owned unit adds `,(ft*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,Z.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,Z.jsxs)(`li`,{children:[`The header’s `,(0,Z.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,Z.jsx)(`sup`,{children:`n`}),` `,`(`,(0,Z.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`accelerate section`,children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,Z.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,Z.jsxs)(`li`,{children:[`Unlocks once `,a,` complete their first level.`]}),(0,Z.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,Z.jsxs)(`li`,{children:[i,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Restage while holding 0 `,i,` (nothing is left producing) to earn Spent QB — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,Z.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,i,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,i,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,nt.restage,`) spends it for you, every `,rt.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`scale up section`,children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,a,` — to claim a Scale Up.`]}),(0,Z.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,Z.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,Z.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,Z.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`overclock section`,children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach the required number of completed `,i,` levels to claim an Overclock.`]}),(0,Z.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,Z.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,Z.jsxs)(`li`,{children:[`The first claim needs `,r,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,Z.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`tier autobuyers section`,children:[(0,Z.jsx)(`h2`,{children:`Tier Autobuyers`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,Z.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,Z.jsxs)(`li`,{children:[`An autobuyer buys `,(0,Z.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,Z.jsx)(`strong`,{children:`Single`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,it.baseCost,` PP × the same.`]})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`milestones section`,children:[(0,Z.jsx)(`h2`,{children:`Milestones`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,e,` (`,a,`) through Purge`,` `,t,` (`,i,`).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,n,`, then every`,` `,`Purge`,` after that.`]}),(0,Z.jsx)(`li`,{children:`More → Milestones tracks your story milestones and Reboot progress.`})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`prestige section`,children:[(0,Z.jsx)(`h2`,{children:`Purge`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge, Reboot, Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,Z.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge. Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,Z.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]}),(0,Z.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) at 1 Googol Bytes, plus 1 PP for every`,` `,64,` further powers of ten in your balance. Each Compression upgrade halves the powers needed per PP, and once that reaches 1, doubles the PP per power.`]}),(0,Z.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,Z.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,Z.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,Z.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,Ze*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,Z.jsx)(`li`,{children:`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage and Power progress carries over.`}),(0,Z.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})]}),(0,Z.jsxs)(Cw,{"aria-label":`sleep mode section`,children:[(0,Z.jsx)(`h2`,{children:`Sleep mode`}),(0,Z.jsx)(`ul`,{children:(0,Z.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,Ci(Ge),` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,qe.map(e=>z(e)).join(` / `),` PP) adds`,` `,Ci(Ke),`, up to `,Ci(We),`. Absences of `,Ci(600),` `,`or less run at full speed; longer ones run at`,` `,Ue*100,`% speed and show a “Resumed from sleep” summary.`]})})]}),(0,Z.jsxs)(Cw,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,gt.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,Z.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel plus `,1,` per Kernel Amplifier level. Ways to spend Kernels are coming in a later update.`]}),(0,Z.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,Z.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,Z.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})]})]})},Tw=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Ew=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,Dw=X(ph)`
  gap: 0.4rem;
`,Ow=X.ol`
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
`,kw=X.li`
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
`,Aw=X.p`
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
`,jw=X.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,Mw=({game:e})=>{let{state:t}=e,n=Fm(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=In(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:Cr(t)},{label:`First Reboot`,reached:i>0}];return(0,Z.jsxs)(Tw,{children:[(0,Z.jsx)(Ew,{children:(0,Z.jsx)(`h1`,{children:`Milestones`})}),(0,Z.jsxs)(Dw,{"aria-label":`milestones page`,children:[(0,Z.jsx)(Ow,{"aria-label":`milestones category`,children:s.map(e=>(0,Z.jsx)(kw,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),(0,Z.jsxs)(Aw,{"aria-label":`reboot status`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,Z.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,Z.jsx)(`strong`,{children:i}),` Reboots`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,Z.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,Z.jsx)(`strong`,{children:a}),` Kernels`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,Z.jsx)(jw,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,Z.jsx)(jw,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${gt.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},Nw=({game:e})=>{if(!Oi(e.state))return null;let t=!!e.buyMaxMode;return(0,Z.jsx)(kC,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},Pw=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,Fw=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&Um`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,Iw=[{id:`level`,unit:!1,icon:`📶`,label:`Level`,title:`Buy level: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Single`,title:`Buy single: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],Lw=({game:e})=>(0,Z.jsx)(Pw,{role:`group`,"aria-label":`buy mode`,children:Iw.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,Z.jsx)(Fw,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),Rw=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,zw=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&Um`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,Bw=({value:e,onChange:t})=>(0,Z.jsx)(Rw,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(Ne).map(n=>{let r=nv[n],i=e===n;return(0,Z.jsx)(zw,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),Vw=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Hw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,Uw=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,Ww=X.div`
  display: flex;
  gap: 0.5rem;
`,Gw=X(Q)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,Kw=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,qw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,Jw=X(ph)`
  gap: 0.4rem;
`,Yw=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Xw=X.div`
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
`,Zw=X.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,Qw=({tier:e})=>(0,Z.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,Z.jsx)(kg,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),$w=X.div`
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
`,eT=X.div`
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
`,tT=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,nT=X.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,rT=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,iT=X.div`
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
`,aT=X.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,oT=X.span`
  display: flex;
  gap: 4px;
`,sT=X.button`
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
`,cT=X.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,lT=X.div`
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
`,uT=X.span`
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
`,dT=X.span`
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
`,fT=X.div`
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
`,pT=X.span`
  font-weight: 600;
  min-width: 0;
`,mT=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,hT=X.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,gT=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,_T=X.button`
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
`,vT=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,yT=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,bT=X.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,xT=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,ST=X(Q)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,CT=X.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,wT=(e,t)=>Math.min(100,Math.round(e/t*100)),TT=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=Fm();return(0,Z.jsxs)(yT,{children:[(0,Z.jsx)(CT,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,Z.jsxs)(Z.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},ET=({name:e,icon:t,title:n})=>{let r=Fm();return(0,Z.jsxs)(CT,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},DT=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,Z.jsxs)(ST,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:wT(r,n),$progressColor:t,children:[(0,Z.jsx)(Eg,{children:s}),(0,Z.jsx)(Dg,{children:c}),(0,Z.jsx)(kg,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),OT=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,Z.jsxs)($w,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,Z.jsxs)(lT,{$narrow:t,$wrap:r,children:[(0,Z.jsxs)(pT,{children:[s&&l&&!i&&(0,Z.jsx)(kg,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,Z.jsx)(hT,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,Z.jsx)(mT,{children:i})),o]}),s&&p&&(0,Z.jsx)(uT,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,Z.jsx)(dT,{$narrow:t,children:y}),s&&l&&(0,Z.jsx)(kC,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,Z.jsx)(fT,{$narrow:t,children:y})]})},kT=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],AT=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,jT=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,MT=e=>String(Number(e.toFixed(2))),NT=e=>`${Number((e/3600).toFixed(1))}h`,PT=e=>{let t=li(e+1);if(t>1)return`${z(li(e))} → ${z(t)} PP per extra digit`;let[n,r]=[ci(e),ci(e+1)];return`1 PP per ${z(n)} → ${z(r)} extra digit${r===1?``:`s`}`},FT=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,Z.jsxs)(Xw,{"aria-label":e,children:[(0,Z.jsxs)(gT,{children:[(0,Z.jsx)(pT,{children:(0,Z.jsxs)(_T,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(mT,{children:t}),n]})}),r&&(0,Z.jsx)(xT,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,Z.jsx)(vT,{"aria-label":`${n} description`,children:i})]})},IT=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],LT=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=Fm(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=Zr(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=Tr(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=ui(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=sn(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=!Oi(n)&&o>=2,T=_n(n),E=yn(T),D=NT(vn(n)),O=NT(vn({...n,sleepModeCapLevel:T+1})),k=NT(Ke),A=!n.cacheWarmUnlocked&&o>=20,ee=mn(n),j=un({...n,playtimeBonusUnlocked:!0}),te=Me.some(e=>!!n.intro?.[e.autoFlagField]),M=n.computeAutoChargeEnabled??!0,ne=n.intro?.computeAutoBoostEnabled??!0,re={automation:Xh(n)&&`automation perk available`,prestige:Zh(n)&&`prestige perk available`},ie=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,Z.jsx)(DT,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${z(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),P=e=>Vr(n,e.id)?(0,Z.jsxs)(Q,{"aria-label":`Start challenge ${Cv(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,Z.jsxs)(Q,{"aria-label":`Challenge ${e.id} ${Sv(e).toLowerCase()}`,disabled:!0,title:Sv(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),ae=(e,t)=>{let r=Hr(e,t);return r&&!Er(n,r.id)?r:null},oe=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=ed(e.id)&&r>=ud()&&!ae(`tierTickspeed`,e.id)&&!ae(`tierAutobuyer`,e.id)});return(0,Z.jsxs)(Vw,{children:[(0,Z.jsxs)(Hw,{children:[(0,Z.jsx)(`h1`,{children:`Firmware`}),(0,Z.jsxs)(Uw,{"aria-label":`purge points display`,children:[`✦ `,z(o),` PP`]})]}),(0,Z.jsx)(Ww,{role:`tablist`,"aria-label":`firmware view`,children:kT.map(e=>(0,Z.jsxs)(Gw,{"aria-label":e.ariaLabel,"aria-selected":d===e.id,color:d===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),re[e.id]&&(0,Z.jsx)(Kw,{"aria-label":re[e.id]})]},e.id))}),d===`automation`&&(0,Z.jsxs)(qw,{"aria-label":`automation firmware page`,children:[(0,Z.jsxs)(Jw,{"aria-label":`global automation category`,children:[(0,Z.jsx)(Yw,{children:`Global Automation`}),(0,Z.jsx)(Zw,{children:IT.map(e=>{let t=e.owned(n),i=e.enabled(n),a=cd(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=id(e.key),l=od(e.key,o),u=Hr(`global`,e.key),d=u&&!Er(n,u.id)?u:null;return(0,Z.jsx)(OT,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,Z.jsx)(TT,{current:s,milestone:xr(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?P(d):ie({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${z(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?jT(ad(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${AT(ad(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})})]}),(0,Z.jsxs)(Jw,{"aria-label":`tier autobuyers category`,children:[(0,Z.jsx)(Yw,{children:`Tier Autobuyers`}),oe?(0,Z.jsx)(rT,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,Z.jsxs)(iT,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,Z.jsx)(aT,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,Z.jsx)(Qw,{tier:e})}),(0,Z.jsxs)(oT,{children:[(0,Z.jsx)(kg,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,Z.jsx)(sT,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,Z.jsx)(kg,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,Z.jsx)(sT,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,Z.jsxs)(tT,{children:[(0,Z.jsxs)(nT,{"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{children:`Tier`}),(0,Z.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,Z.jsx)(`span`,{children:`🤖 Buy`})]}),b.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=Jt(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=ed(e.id),d=l>=Yu(e.id),f=a?$u(n,e.id):1,p=rd(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=ud(),v=fd(g,e.id),y=ae(`tierTickspeed`,e.id),b=ae(`tierAutobuyer`,e.id);return(0,Z.jsxs)(eT,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,Z.jsx)(Qw,{tier:e}),(0,Z.jsx)(OT,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(TT,{current:s,milestone:Yt(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?P(y):ie({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${z(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?jT(dd(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${AT(dd(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,Z.jsx)(OT,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(TT,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?P(b):ie({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${z(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${z(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:jT(Zu(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${AT(Zu(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),te&&(0,Z.jsxs)(Jw,{"aria-label":`power automation category`,children:[(0,Z.jsx)(Yw,{children:`Power Automation`}),(0,Z.jsxs)(Zw,{children:[te&&(0,Z.jsx)(OT,{ariaLabel:`auto-charge row`,enabled:M,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!M),owned:!0,statusTitle:M?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,Z.jsx)(OT,{ariaLabel:`auto boost row`,enabled:ne,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!ne),owned:!0,statusTitle:ne?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,Z.jsxs)($w,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,Z.jsx)(lT,{children:(0,Z.jsx)(pT,{children:`Boost preset`})}),(0,Z.jsx)(Bw,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,Z.jsxs)(Jw,{"aria-label":`compute autobuyers category`,children:[(0,Z.jsx)(Yw,{children:`Compute Autobuyers`}),(0,Z.jsx)(rT,{"aria-label":`compute autobuyer tiles`,role:`group`,children:pt.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=Vn(e.id);return(0,Z.jsxs)(iT,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,Z.jsx)(aT,{$dimmed:!t,children:(0,Z.jsx)(Qw,{tier:e})}),t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(kg,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,Z.jsx)(sT,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,Z.jsx)(cT,{children:(0,Z.jsx)(TT,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),d===`prestige`&&(0,Z.jsxs)(qw,{"aria-label":`prestige firmware page`,children:[(0,Z.jsxs)(Jw,{"aria-label":`purge points category`,children:[(0,Z.jsx)(Yw,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,Z.jsx)(bT,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,Z.jsx)(FT,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${MT(S)}`:`Production ×1 → ×${MT(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,Z.jsx)(ET,{icon:`🚀`,name:`Speed bonus`}):(0,Z.jsx)(DT,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${z(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,Z.jsx)(FT,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at ${Ue*100}% speed past 10 min). Each level adds ${k}: ${qe.map(e=>z(e)).join(` / `)} PP, up to ${NT(We)}.`,icon:`😴`,name:`Sleep mode`,value:E===null?`Time away: up to ${D}`:`Time away: up to ${D} → ${O}`,children:E===null?(0,Z.jsx)(ET,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,Z.jsx)(DT,{ariaLabel:`Buy Sleep mode level ${T+1} for ${z(E)} Purge Points — +${k} of time away`,color:`#a78bfa`,cost:E,disabled:o<E,icon:`⏫`,label:`${z(E)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,Z.jsx)(FT,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:PT(g),children:(0,Z.jsx)(DT,{ariaLabel:`Buy Compression level ${g+1} for ${z(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${z(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,Z.jsx)(FT,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${ee.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${ee.symbol} level 1 done`:`Start runs with ${ee.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,Z.jsx)(ET,{icon:`🔥`,name:`Cache Warm`}):(0,Z.jsx)(DT,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!A,icon:`🔓`,label:`${z(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,Z.jsx)(FT,{ariaLabel:`playtime bonus upgrade`,details:`+${Ze*100}% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${MT(j)}`:`+${Ze*100}% production per hour played`,children:n.playtimeBonusUnlocked?(0,Z.jsx)(ET,{icon:`⏱`,name:`Playtime bonus`}):(0,Z.jsx)(DT,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${z(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(0,Z.jsx)(FT,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:Cr(n)?null:`Keep producing past 1 Googol Bytes`,children:Cr(n)?(0,Z.jsx)(ET,{icon:`♾`,name:`Overflow mode`}):(0,Z.jsx)(CT,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,Z.jsxs)(Jw,{"aria-label":`purchasing category`,children:[(0,Z.jsx)(Yw,{children:`Purchasing`}),(0,Z.jsx)(FT,{ariaLabel:`buy mode toggle`,details:`Level (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Single: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Single they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,Z.jsx)(Lw,{game:e})}),(0,Z.jsx)(FT,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. One-time purchase; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:Oi(n)?null:`Buy every affordable level in one tap`,children:Oi(n)?(0,Z.jsx)(Nw,{game:e}):(0,Z.jsx)(DT,{ariaLabel:`Unlock Buy max for 2 Purge Points`,color:`#38bdf8`,cost:2,disabled:!w,icon:`🔓`,label:`${z(2)} PP`,onClick:r.buyBuyMaxUnlock,points:o,progressLabel:`Buy max unlock PP progress`})})]})]}),(0,Z.jsx)(jb,{def:p?N.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},RT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),zT=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),BT=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],VT=e=>e&&RT(e)&&Object.keys(e).some(e=>zT.has(e)),HT=e=>{if(!e||!RT(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if(BT.some(t=>{let n=e[t];return n&&RT(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:BT.some(t=>VT(e[t]))?`legacy_tier_ids`:null},UT=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],WT=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],GT=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],KT=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},qT=e=>{let t=KT(e,UT);return t.automationIntervalLevels&&=KT(t.automationIntervalLevels,WT),t.automationAttemptBudgets&&=KT(t.automationAttemptBudgets,WT),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>KT(e,GT))}),t},JT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),YT=e=>{let{saveSchemaVersion:t,...n}=e;return n},XT=e=>{if(!JT(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:YT(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:qT(YT(e))};let t=HT(e);return t?{ok:!1,reason:t}:{ok:!0,payload:qT(e)}},ZT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),QT=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),$T=()=>!0,eE=(e,t=$T())=>{if(!t)return XT(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:qT(r)}},tE=`tens_game_state`,nE=`tens_last_save_timestamp`,rE=`tens_saves_meta`,iE=`tens_dev_mode_active`,aE=`dev`,oE=`tens_dev_state`,sE=`tens_dev_timestamp`,cE=`TENS-SUPPORT`,lE=e=>e===aE?oE:e===`0`?tE:`tens_slot_${e}_state`,uE=e=>e===aE?sE:e===`0`?nE:`tens_slot_${e}_timestamp`,dE=e=>`Save ${e+1}`,fE=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:dE(0)}]}),pE=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),mE=()=>{try{let e=localStorage.getItem(rE);return e?QT(e):null}catch{return null}},hE=e=>{try{localStorage.setItem(rE,JSON.stringify(e))}catch{}},gE=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:dE(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},_E=e=>{let t=fE();if(!ZT(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!ZT(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():dE(n)})}return gE({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},vE=()=>{let e=_E(mE());return hE(e),e},yE=()=>{try{return localStorage.getItem(iE)===`1`}catch{return!1}},bE=e=>{try{e?localStorage.setItem(iE,`1`):localStorage.removeItem(iE)}catch{}},xE=()=>yE()?aE:vE().activeSlotId,SE=(e=`code`)=>{let t=vE();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=gE({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return hE(n),{ok:!0,meta:n}},CE=e=>{try{return localStorage.getItem(lE(e))!=null}catch{return!1}},wE=()=>{let e=vE(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??dE(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!CE(i)})}return t},TE=e=>{if(yE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=vE(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return hE(i),{ok:!0,meta:i}},EE=(e,t)=>{let n=String(e),r=vE(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return hE(s),{ok:!0,meta:s}},DE=e=>pE(e)===`TENS-SUPPORT`?SE(`code`):{ok:!1,reason:`invalid`},OE=()=>SE(`dummy_purchase`),kE=()=>{let e=vE();return e.slots.find(t=>t.id===e.activeSlotId)?.name??dE(0)},AE=()=>{let e=vE(),t=kE(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},jE=()=>`Reformat Byte Foundry on "${kE()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,ME=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,NE=()=>`Erase ALL save progress on this device?\n\n${vE().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,PE=e=>{try{localStorage.removeItem(lE(e)),localStorage.removeItem(uE(e))}catch{}},FE=e=>{if(yE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=vE(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(PE(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},IE=()=>{if(yE())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)PE(String(e));return{ok:!0,meta:vE()}},LE=e=>{try{let t=xE(),n=(e??localStorage).getItem(lE(t));return n?QT(n):null}catch{return null}},RE=()=>{let e=xE(),t=LE();if(!t)return null;let n=eE(t);return n.ok?null:(PE(e),$T()?null:n.reason)},zE=(e,t)=>({...e,...t??{}}),BE=e=>ZT(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),VE=e=>BE(e)&&Array.isArray(e.transfers)?e.transfers.length:0,HE=e=>{let t=e.deposits??{},n=Ie.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+VE(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},UE=(e,t)=>{let n=wt(),r={};for(let e of Object.keys(n)){let i=t?.[e];if(BE(i)){n[e]={...n[e],...HE(i)};let t=VE(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},WE=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=Fe[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},GE=e=>{let t=e,n=Tt(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=UE(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return Wr(Xt(Ia(Hn({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:zE(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:zE(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:zE(n.owned,t.owned),purchased:zE(n.purchased,t.purchased),purchaseLevels:zE(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:zE(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:zE(n.autobuyers,t.autobuyers),autobuyersEnabled:zE(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:zE(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:zE(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:zE(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:zE(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:zE(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:zE(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:zE(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:zE(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:zE(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:{...n.eonsUpgrades,...t.eonsUpgrades??{}},computeFlopsAutobuyers:zE(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:zE(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:zE(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:WE({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},KE=e=>{let t=xE();try{localStorage.setItem(lE(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem(uE(t),String(Date.now()))}catch{}},qE=e=>{try{let t=LE(e);if(!t)return null;let n=eE(t);return n.ok?GE(n.payload):null}catch{return null}},JE=()=>{let e=xE();try{let t=localStorage.getItem(uE(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},YE=()=>{yE()?XE():FE(xE())},XE=()=>(PE(aE),{ok:!0}),ZE=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=ZT(i)&&ZT(a)?ZE(a,i):i,n},{...e}),QE=(e,t)=>{if(!yE())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=QT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!ZT(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...ZT(t)?ZE(t,n):n};try{localStorage.setItem(oE,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=qE();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},$E=e=>JSON.stringify({saveSchemaVersion:3,...e}),eD=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(Tt(),e))||e.resources!==void 0&&!ZT(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},tD=e=>{let t;try{t=QT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!ZT(t))return{ok:!1,reason:`invalid_json`};let n=eE(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!$T()&&!eD(n.payload))return{ok:!1,reason:`invalid_state`};let r=GE(n.payload);return KE(r),{ok:!0,state:r}},nD=`tens_buy_max_mode`,rD=()=>{try{return localStorage.getItem(nD)===`true`}catch{return!1}},iD=e=>{try{localStorage.setItem(nD,e?`true`:`false`)}catch{}},aD=`tens_buy_unit_mode`,oD=()=>{try{return localStorage.getItem(aD)===`true`}catch{return!1}},sD=e=>{try{localStorage.setItem(aD,e?`true`:`false`)}catch{}},cD=`tens_theme_preference`,lD=()=>{try{let e=localStorage.getItem(cD);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},uD=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(cD,e)}catch{}},dD;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(dD||={});var fD=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},pD=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,mD=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?pD(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new fD(`"${e}" plugin is not implemented on ${c}`,dD.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new fD(`"${e}.${t}()" is not implemented on ${c}`,dD.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=fD,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},hD=(e=>e.Capacitor=mD(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),gD=hD.registerPlugin,_D=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new hD.Exception(e,dD.Unimplemented)}unavailable(e=`not available`){return new hD.Exception(e,dD.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},vD=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),yD=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),bD=class extends _D{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=yD(n).trim(),r=yD(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=vD(e.key),n=vD(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};gD(`CapacitorCookies`,{web:()=>new bD});var xD=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),SD=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},CD=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,wD=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=SD(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},TD=class extends _D{async request(e){let t=wD(e,e.webFetchExtra),n=CD(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await xD(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};gD(`CapacitorHttp`,{web:()=>new TD});var ED;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(ED||={});var DD;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(DD||={});var OD=class extends _D{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};gD(`SystemBars`,{web:()=>new OD});var kD=`https://mohanpednekar.github.io/tens/`,AD=`${kD}privacy.html`,jD=`${kD}terms.html`,MD=X(ph)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,ND=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,PD=X.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,FD=X.input`
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
`,ID=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,LD=X.textarea`
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
`,RD={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},zD=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:RD[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,Z.jsxs)(MD,{"aria-label":`manual save section`,children:[(0,Z.jsx)(`h2`,{children:`Backup / Restore`}),(0,Z.jsx)(LD,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,Z.jsxs)(ND,{children:[(0,Z.jsx)(Q,{onClick:o,type:`button`,children:(0,Z.jsx)($,{children:`Copy save`})}),(0,Z.jsx)(Q,{onClick:s,type:`button`,children:(0,Z.jsx)($,{children:`Download file`})}),(0,Z.jsx)(Q,{onClick:()=>a.current?.click(),type:`button`,children:(0,Z.jsx)($,{children:`Choose file…`})}),(0,Z.jsx)(Q,{onClick:()=>c(t),type:`button`,children:(0,Z.jsx)($,{children:`Import`})}),(0,Z.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,Z.jsx)(ID,{$error:r.error,children:r.text})]})},BD=X.div`
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
`,VD=()=>(0,Z.jsxs)(MD,{"aria-label":`legal section`,children:[(0,Z.jsx)(`h2`,{children:`Legal`}),(0,Z.jsxs)(BD,{children:[(0,Z.jsx)(`a`,{href:AD,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,Z.jsx)(`a`,{href:jD,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),HD={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},UD=({service:e=Iv()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,Z.jsxs)(MD,{"aria-label":`store section`,children:[(0,Z.jsx)(`h2`,{children:`Store`}),(0,Z.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,Z.jsxs)(ND,{children:[(0,Z.jsx)(Q,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),HD.removeAds),type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,Z.jsx)(Q,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),HD.supportTip),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Leave a tip`})}),(0,Z.jsx)(Q,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,Z.jsx)($,{children:`Restore purchases`})})]}),a&&(0,Z.jsx)(ID,{$error:a.error,children:a.text})]})},WD=X.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,GD=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,KD=X(ND)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,qD=X.div`
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
`,JD=X.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,YD=X.li`
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
`,XD=X.svg`
  display: block;
  height: 64px;
  width: 100%;
`,ZD=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,QD=X.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,$D=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},eO=X.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,tO=X.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,nO=({label:e,danger:t=!1,children:n})=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(eO,{$danger:t,children:e}),(0,Z.jsx)(tO,{children:n})]}),rO=X.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,iO=Um`
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
`,aO=X.button`
  ${iO}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,oO=X.div`
  ${iO}
`,sO=X.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,cO=X.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,lO=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,uO=X.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,dO=X.div`
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
`,fO=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,Z.jsx)(rO,{children:(0,Z.jsxs)(oO,{$danger:r,children:[(0,Z.jsx)(sO,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(cO,{children:t}),i]})}):(0,Z.jsxs)(rO,{children:[(0,Z.jsxs)(aO,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(sO,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(cO,{children:t}),n!=null&&n!==``&&(0,Z.jsx)(lO,{children:n}),(0,Z.jsx)(uO,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,Z.jsx)(dO,{children:a})]})},pO=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=Zr(e.state),o=!!e.devModeActive,s=!!e.savesMeta?.supporterUnlocked,[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(null),[f,p]=(0,v.useState)(!1),m=e.state.era?.count??0,h=e.state.eons?.balance??0,g=In(e.state),_=Ln(e.state),y=e.state.purge?.points??0,b=e=>e===1?`Kernel`:`Kernels`,x=e.state.prestigeMuseum??{history:[],pinnedIds:[]},S=new Set(x.pinnedIds??[]),C=x.history??[],w=C.filter(e=>S.has(e.id)),T=s?C:C.slice(0,1),E=t=>{t.preventDefault();let n=e.redeemUnlockCode(c);n.ok?(l(``),d({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):d({error:!0,text:`That code is not valid.`})},D=()=>{let t=e.purchaseSupporterDummy();d({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},O=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},k=t=>{o||a&&t.isActive||window.confirm(ME(t))&&e.clearSlot(t.id)},A=()=>{a||o||window.confirm(NE())&&e.eraseAllSaveProgress()},ee=()=>{In(e.state)&&(e.actions.eraAscend(),p(!1))},j=!!Iv().iapAvailable,te=$D(e.opsSamples??[],`money`),M=$D(e.opsSamples??[],`prestigePoints`);return(0,Z.jsxs)(WD,{children:[(0,Z.jsx)(GD,{children:(0,Z.jsx)(`h1`,{children:`Settings`})}),(0,Z.jsxs)(nO,{label:`Game`,children:[(0,Z.jsx)(fO,{icon:`💛`,label:`Supporter`,value:s?`Unlocked`:`Free`,children:(0,Z.jsxs)(MD,{"aria-label":`supporter pack section`,children:[(0,Z.jsx)(`h2`,{children:`Supporter pack`}),(0,Z.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),s?(0,Z.jsxs)(ID,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(ZD,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,Z.jsx)(`code`,{children:cE})]}),(0,Z.jsxs)(PD,{onSubmit:E,children:[(0,Z.jsx)(FD,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>l(e.target.value),placeholder:`Enter unlock code`,value:c}),(0,Z.jsx)(Q,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,Z.jsx)($,{children:`Redeem code`})})]}),(0,Z.jsx)(Q,{"aria-label":`dummy supporter checkout`,onClick:D,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Dummy checkout (free)`})})]}),u&&(0,Z.jsx)(ID,{$error:u.error,children:u.text})]})}),(0,Z.jsx)(fO,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,Z.jsxs)(MD,{"aria-label":`save slots section`,children:[(0,Z.jsx)(`h2`,{children:`Save slots`}),(0,Z.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),o&&(0,Z.jsx)(ZD,{children:`Dev Mode is active — Play/Clear are disabled here so a dev-only session can't touch a real save. Disable Dev Mode first.`}),(e.saveSlots??[]).map(t=>(0,Z.jsxs)(KD,{$active:t.isActive,children:[(0,Z.jsxs)(qD,{children:[(0,Z.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,Z.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,Z.jsxs)(ND,{children:[!t.isActive&&(0,Z.jsx)(Q,{"aria-label":`switch to ${t.name}`,disabled:o,onClick:()=>e.switchSaveSlot(t.id),title:o?`Disable Dev Mode first`:void 0,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Play`})}),(0,Z.jsx)(Q,{"aria-label":`rename ${t.name}`,onClick:()=>O(t),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Rename`})}),(0,Z.jsx)(Q,{"aria-label":`clear ${t.name}`,disabled:o||a&&t.isActive,onClick:()=>k(t),title:o?`Disable Dev Mode first`:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Clear…`})})]})]},t.id))]})}),(0,Z.jsx)(fO,{icon:`⏻`,label:`Reboot`,value:`${h} ${b(h)}`,children:(0,Z.jsxs)(MD,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,Z.jsxs)(ND,{children:[(0,Z.jsx)(`span`,{children:`Reboots`}),(0,Z.jsx)(`strong`,{children:m})]}),(0,Z.jsxs)(ND,{children:[(0,Z.jsx)(`span`,{children:`Kernels`}),(0,Z.jsxs)(`strong`,{children:[h,` `,b(h)]})]}),(0,Z.jsx)(`p`,{children:g?`Ready — next Reboot awards ${_} ${b(_)}.`:`Requires 1 Googol PP unspent (you have ${z(y)} PP).`}),(0,Z.jsx)(Q,{"aria-label":g?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!g,onClick:()=>p(!0),type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⏻ Reboot…`})})]})}),(0,Z.jsx)(fO,{icon:`📜`,label:`System log`,value:s?`${C.length}`:`🔒`,children:(0,Z.jsxs)(MD,{"aria-label":`system log section`,children:[(0,Z.jsx)(`h2`,{children:`System log`}),s?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),w.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(ZD,{children:`Pinned`}),(0,Z.jsx)(JD,{"aria-label":`pinned purge entries`,children:w.map(t=>(0,Z.jsxs)(YD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,Lt(t.moneyBits)]})})]}),(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,Z.jsx)(ZD,{children:`Recent history`}),T.length===0?(0,Z.jsx)(ZD,{children:`No purges recorded yet.`}):(0,Z.jsx)(JD,{"aria-label":`system log history`,children:T.map(t=>(0,Z.jsxs)(YD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,Pt(t.moneyBits)]})})]}),S.has(t.id)?(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})}):(0,Z.jsx)(Q,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:S.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Pin`})})]},t.id))})]}):(0,Z.jsxs)(ZD,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,C.length>0&&` Latest: Purge #${C[0].purgeNumber} (+${C[0].pointsAwarded} PP).`]})]})}),(0,Z.jsx)(fO,{icon:`📈`,label:`Task Manager`,value:s?null:`🔒`,children:(0,Z.jsxs)(MD,{"aria-label":`task manager section`,children:[(0,Z.jsx)(`h2`,{children:`Task Manager`}),s?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,Lt(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,Z.jsx)(ZD,{children:`Bits`}),(0,Z.jsx)(XD,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:te||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,Z.jsx)(ZD,{children:`Purge Points`}),(0,Z.jsx)(XD,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:M||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,Z.jsx)(ZD,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,Z.jsxs)(nO,{label:`Data`,children:[!1,(0,Z.jsx)(fO,{icon:`🗄`,label:`Backup / Restore`,children:(0,Z.jsx)(zD,{game:e})}),j&&(0,Z.jsx)(fO,{icon:`🛒`,label:`Store`,children:(0,Z.jsx)(UD,{})}),(0,Z.jsx)(fO,{icon:`ℹ`,label:`About`,children:(0,Z.jsxs)(MD,{"aria-label":`about section`,children:[(0,Z.jsx)(`h2`,{children:`About`}),(0,Z.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,Z.jsx)(fO,{icon:`⚖`,label:`Legal`,children:(0,Z.jsx)(VD,{})})]}),(0,Z.jsx)(nO,{label:`Display`,children:(0,Z.jsx)(fO,{icon:`🎨`,inline:(0,Z.jsx)(QD,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,Z.jsx)(Q,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,Z.jsx)($,{children:t})},e))}),label:`Theme`})}),(0,Z.jsx)(nO,{danger:!0,label:`Danger zone`,children:(0,Z.jsx)(fO,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,Z.jsxs)(MD,{"aria-label":`danger zone`,children:[(0,Z.jsx)(`h2`,{children:`Danger zone`}),(0,Z.jsxs)(`p`,{children:[`Erase the `,(0,Z.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reset active save…`}),(0,Z.jsx)(kg,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,Z.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reformat Byte Foundry…`}),(0,Z.jsx)(kg,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,Z.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,Z.jsx)(Q,{"aria-label":`Erase all save progress`,disabled:a||o,onClick:A,title:o?`Disable Dev Mode first`:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Erase all save progress…`})})]})})}),(0,Z.jsxs)(J_,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>p(!1),onConfirm:ee,open:f,title:`Reboot?`,children:[(0,Z.jsxs)(`p`,{children:[`Awards `,_,` `,b(_),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},mO=2**53-1,hO=e=>e?gi:mO,gO=2,_O=(e,t,n=mO)=>{let r=e>0?yi(e,vn(t)):0;return r<=0?null:{state:bi(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:vn(t)}:null}},vO=()=>{vE();let e=RE(),t=qE();if(!t)return{state:Tt(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=JE(),r=_O(n?(Date.now()-n)/1e3:0,t,hO(oD()))??{state:t,offlineProgress:null};return{...r,state:Cn(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},yO=()=>{let[e]=(0,v.useState)(vO),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>vE()),[l,u]=(0,v.useState)(()=>wE()),[d,f]=(0,v.useState)(()=>yE()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(vE()),u(wE())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>gO){let r=vn(y.current),a=yi(t,r);if(a>0){n(e=>bi(t,hO(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=vi(r,hO(D.current))(e);return document.visibilityState===`visible`?xn(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>B_(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{KE(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,Je);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)(rD),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,iD(!!e),S(!!e)},[]),[T,E]=(0,v.useState)(oD),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,sD(!!e),E(!!e)},[]),k=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&Oi(n)?t:e)(n));return{buyTierQuantity:t=>D.current?n(e=>Di(t,1)(e)):e(Di(t,mO),Pi(t)),buyTickspeedMultiplier:t=>e(qu(t),Ai(qu(t))),buyAutobuyerIntervalUpgrade:e=>n(W(e)),buyAutomationIntervalUpgrade:e=>n(ld(e)),buyTierTickspeedIntervalUpgrade:e=>n(pd(e)),setAutoOverclockEnabled:e=>n(hd(e)),startComputeCharge:e=>n(Mc(e)),setComputeAutoChargeEnabled:e=>n(md(e)),buyGlobalTickspeedMultiplier:()=>e(vd,Ai(vd)),buyPlaytimeBonus:()=>n(dn),buyBuyMaxUnlock:()=>n(fn),buyCacheWarm:()=>n(pn),buySleepModeCapUpgrade:()=>e(bn,Ai(bn)),buyPrestigeSpeedBonus:()=>n(ln),buyPrestigeDoublePp:()=>e(lr,Ai(lr)),buyComputeFlopsTier:t=>e(kn(t),Ai(kn(t))),buyHyperscaler:()=>n(Bn),eraAscend:()=>n(cr),enterChallenge:e=>n(Ed(e)),exitChallenge:()=>n(Dd),purge:()=>n(Td),dailyStart:e=>n(I_(e,Date.now())),dailyForfeit:e=>n(L_(e)),dailyRestart:e=>n(z_(e,Date.now())),dailyPlay:(e,t,r)=>n(V_(e,t,r,Date.now())),scaleUp:()=>n(Nd),overclock:()=>n(Pd),setComputeAutoBoostEnabled:e=>n(zu(e)),setComputeAutoBoostType:e=>n(Bu(e)),consumeXpForLastTierTickspeed:e=>n(Hd(e)),setAutoScaleUpEnabled:e=>n(zd(e)),setAutoXpTickspeedEnabled:e=>n(Rd(e)),setAutoGlobalTickspeedEnabled:e=>n(Bd(e)),setAutoPurgeEnabled:e=>n(_d(e)),setAutobuyerEnabled:(e,t)=>n(Hu(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(gd(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(Un(e,t)),tapIntroBit:()=>n(B),tapPoolBuffer:e=>n(Na(e)),combineIntroByte:()=>n(aa),pickIntroCapacityMilestone:()=>n(Qa),queueIntroSpeedUpgrade:()=>n(Ya),unlockNextDiskSize:()=>n(Ro),clearIntroCapacityUpgradeQueue:()=>n(to),convertIntroBitsToKilobytes:()=>n(Oo),provisionDisk:()=>n(Zo),queueDiskBuild:()=>n(Qo),clearDiskBuildQueue:()=>n($o),expediteDiskFill:e=>n(bs(e)),doubleDataLakeCapacity:e=>n(ul(e)),activateComputeBoost:(e,t)=>n(Iu(e,t)),stackComputeBoost:e=>n(Lu(e)),reclaimComputeBoost:e=>n(Nu(e)),forfeitComputeBoost:e=>n(Fu(e)),mergeComputeCoresIntoNode:()=>n(ml),mergeComputeNodesIntoCluster:()=>n(hl),mergeComputeClustersIntoNetwork:()=>n(gl),mergeComputeNetworksIntoGrid:()=>n(_l),mergeComputeGridsIntoFabric:()=>n(vl),mergeComputeFabricsIntoCloud:()=>n(yl),mergeComputeCloudsIntoDatacenter:()=>n(bl),mergeComputeDatacentersIntoSupercomputer:()=>n(xl),mergeComputeSupercomputersIntoMegacomputer:()=>n(Sl),enableAutoMergeCoresIntoNode:()=>n(Nl),enableAutoMergeNodesIntoCluster:()=>n(Ll),enableAutoMergeClustersIntoNetwork:()=>n(Vl),enableAutoMergeNetworksIntoGrid:()=>n(Gl),enableAutoMergeGridsIntoFabric:()=>n(Yl),enableAutoMergeFabricsIntoCloud:()=>n($l),enableAutoMergeCloudsIntoDatacenter:()=>n(ru),enableAutoMergeDatacentersIntoSupercomputer:()=>n(su),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(du),startComputeCoresMerge:()=>n(Fl),startComputeNodesMerge:()=>n(zl),startComputeClustersMerge:()=>n(Ul),startComputeNetworksMerge:()=>n(ql),startComputeGridsMerge:()=>n(Zl),startComputeFabricsMerge:()=>n(tu),startComputeCloudsMerge:()=>n(au),startComputeDatacentersMerge:()=>n(lu),startComputeSupercomputersMerge:()=>n(pu),startDataLakeAutoConvert:e=>n(qc(e)),flushStoragePool:e=>n(Kc(e)),pinMuseumEntry:e=>n(kd(e)),unpinMuseumEntry:e=>n(Ad(e))}},[]),A=(0,v.useCallback)(()=>{YE(),_(null),n(Tt()),i(null),o(null),m([]),b()},[b]),ee=(0,v.useCallback)(()=>{n(wd)},[]),j=(0,v.useCallback)(e=>{let t=FE(e);return t.ok&&(t.clearedActive&&(_(null),n(Tt()),i(null),o(null),m([])),b()),t},[b]),te=(0,v.useCallback)(()=>{let e=IE();return e.ok&&(_(null),n(Tt()),i(null),o(null),m([]),b()),e},[b]),M=(0,v.useCallback)(()=>i(null),[]),N=(0,v.useRef)(new WeakSet),ne=(0,v.useCallback)(e=>!e||e.rewardClaimed||N.current.has(e)?!1:(N.current.add(e),n(t=>Si(e.elapsedRealSeconds,hO(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+xi(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),re=(0,v.useCallback)(()=>o(null),[]),ie=(0,v.useCallback)(e=>{KE(y.current);let t=TE(e);if(!t.ok)return t;if(t.already)return b(),t;let r=RE(),a=qE()??Tt(),s=JE(),c=_O(s?(Date.now()-s)/1e3:0,a,hO(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),P=(0,v.useCallback)(()=>{KE(y.current);let e=!yE();bE(e),f(e);let t=RE(),r=qE();_(r),n(r??Tt()),i(null),o(t),m([]),b()},[b]),ae=(0,v.useCallback)(()=>{yE()&&(XE(),_(null),n(Tt()),i(null),o(null),m([]))},[]),oe=(0,v.useCallback)(e=>{let t=QE(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),se=(0,v.useCallback)(e=>{yE()&&n(t=>Ia(e(t)))},[]),ce=(0,v.useCallback)(()=>$E(y.current),[]),le=(0,v.useCallback)(e=>{let t=tD(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),ue=(0,v.useCallback)((e,t)=>{let n=EE(e,t);return n.ok&&b(),n},[b]),de=(0,v.useCallback)(e=>{let t=DE(e);return t.ok&&b(),t},[b]);return{actions:k,applyCloudSave:le,applyDevStateJson:oe,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:ne,clearSlot:j,devModeActive:d,dismissIncompatibleSaveNotice:re,dismissOfflineProgress:M,eraseAllSaveProgress:te,exportSaveJson:ce,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=OE();return e.ok&&b(),e},[b]),redeemUnlockCode:de,renameSaveSlot:ue,resetByteFoundry:ee,resetDevState:ae,resetGame:A,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:se,state:t,switchSaveSlot:ie,toggleDevMode:P}},bO=qm`
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
`,xO={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},SO={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},CO={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},wO={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},TO={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},EO={minHeight:500,medium:600,expanded:900,wide:1360,splitMinWidth:784,splitMinAspect:.8},DO={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},OO={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},kO={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},AO=[`dark`,`light`],jO=`dark`,MO=e=>{let t=AO.includes(e)?e:jO;return{mode:t,color:xO[t],shadow:SO[t],tierAccents:CO[t],space:wO,radius:TO,motion:DO,breakpoints:EO,font:OO,type:kO}},NO={dark:MO(`dark`),light:MO(`light`)},PO=({width:e,height:t})=>!(t>=EO.minHeight)||!(e>=EO.medium)?`compact`:e<EO.expanded?`medium`:e<EO.wide?`expanded`:`wide`;EO.medium,EO.expanded,EO.wide;var FO={layoutClass:`compact`,width:0,height:0},IO=()=>{if(typeof window>`u`)return null;let e=window.visualViewport,t=Math.round(window.innerWidth||e?.width||0),n=Math.round(window.innerHeight||e?.height||0);return t>0&&n>0?{width:t,height:n}:null},LO=()=>{let e=IO();return e?{...e,layoutClass:PO(e)}:FO},RO=()=>{let[e,t]=(0,v.useState)(LO);return(0,v.useEffect)(()=>{if(typeof window>`u`)return;let e=null,n=window.requestAnimationFrame??(e=>setTimeout(e,16)),r=window.cancelAnimationFrame??clearTimeout,i=()=>{e=null;let n=LO();t(e=>e.width===n.width&&e.height===n.height&&e.layoutClass===n.layoutClass?e:n)},a=()=>{e===null&&(e=n(i))};window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,a);let o=window.visualViewport;return o?.addEventListener(`resize`,a),a(),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,a),o?.removeEventListener(`resize`,a),e!==null&&r(e)}},[]),e},zO=(0,v.createContext)(FO),BO=({children:e})=>(0,Z.jsx)(zO.Provider,{value:RO(),children:e}),VO=()=>typeof window>`u`||typeof window.matchMedia!=`function`?jO:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,HO=e=>e===`light`||e===`dark`?e:VO(),UO=({mode:e=jO,children:t})=>(0,Z.jsx)(Im,{theme:NO[e]??NO.dark,children:t}),WO=()=>HO(lD()),GO=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`settings`,`dev`]),KO=X.div`
  padding-bottom: ${_g};
`;function qO(){let e=yO(),[t,n]=(0,v.useState)(lD),[r,i]=(0,v.useState)(WO),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!GO.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=dl(e.state),b=Sn(e.state),x=h,S=h&&ki(e.state),C=S,w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{Zr(e.state)||window.confirm(AE())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{Zr(e.state)||window.confirm(jE())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(HO(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{uD(e),n(e),i(HO(e))},O;O=g?(0,Z.jsx)(zS,{focusNonce:p,game:e}):a===`info`?(0,Z.jsx)(ww,{}):a===`boosters`?(0,Z.jsx)(OC,{game:e}):a===`compute`?(0,Z.jsx)(eC,{game:e}):a===`perks`&&S?(0,Z.jsx)(LT,{focusNonce:l,game:e}):a===`challenges`&&C?(0,Z.jsx)(Rb,{focusNonce:d,game:e}):a===`milestones`?(0,Z.jsx)(Mw,{game:e}):a===`achievements`&&ue.enabled?(0,Z.jsx)(Oh,{game:e}):a===`dev`?(0,Z.jsx)(vw,{game:e}):a===`settings`?(0,Z.jsx)(pO,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,Z.jsx)(Gy,{game:e});let k=cg(e.state);return(0,Z.jsxs)(UO,{mode:r,children:[(0,Z.jsx)(bO,{}),(0,Z.jsxs)(BO,{children:[(0,Z.jsx)(KO,{children:O}),(0,Z.jsx)(gg,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,Z.jsx)(fh,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,Z.jsx)(oh,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,Z.jsx)(Pg,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})]})}var JO=`modulepreload`,YO=function(e){return`/tens/dev/`+e},XO={},ZO=function(e){return e.pathname.endsWith(`.css`)},QO=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},$O=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=YO(t,n);let r=s(t),i=ZO(r);return QO(XO,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:JO,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ek=e=>{e&&e instanceof Function&&$O(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},tk=document.getElementById(`root`);if(!tk)throw Error(`Root element not found`);(0,y.createRoot)(tk).render((0,Z.jsx)(v.StrictMode,{children:(0,Z.jsx)(qO,{})})),ek();