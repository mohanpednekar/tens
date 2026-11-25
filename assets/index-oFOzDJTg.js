var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=void 0)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function te(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=M(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(te(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function N(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var P=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function re(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,P)}catch(e){P(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function ie(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else re(ie.bind(null,e))}var F={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=F,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=ie,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=re,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),ee=Symbol.for(`react.fragment`),j=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),M=Symbol.for(`react.consumer`),N=Symbol.for(`react.context`),ne=Symbol.for(`react.forward_ref`),P=Symbol.for(`react.suspense`),re=Symbol.for(`react.suspense_list`),ie=Symbol.for(`react.memo`),F=Symbol.for(`react.lazy`),ae=Symbol.for(`react.activity`),oe=Symbol.for(`react.legacy_hidden`),se=Symbol.for(`react.memo_cache_sentinel`),ce=Symbol.for(`react.view_transition`),le=Symbol.for(`react.recoverable`),ue=Symbol.iterator;function de(e){return typeof e!=`object`||!e?null:(e=ue&&e[ue]||e[`@@iterator`],typeof e==`function`?e:null)}var fe=Symbol.for(`react.client.reference`);function pe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===fe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ee:return`Fragment`;case te:return`Profiler`;case j:return`StrictMode`;case P:return`Suspense`;case re:return`SuspenseList`;case ae:return`Activity`;case ce:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case N:return e.displayName||`Context`;case M:return(e._context.displayName||`Context`)+`.Consumer`;case ne:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ie:return t=e.displayName||null,t===null?pe(e.type)||`Memo`:t;case F:t=e._payload,e=e._init;try{return pe(e(t))}catch{}}return null}var me=Array.isArray,I=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R={pending:!1,data:null,method:null,action:null},he=[],ge=-1;function _e(e){return{current:e}}function ve(e){0>ge||(e.current=he[ge],he[ge]=null,ge--)}function ye(e,t){ge++,he[ge]=e.current,e.current=t}var be=_e(null),xe=_e(null),Se=_e(null),Ce=_e(null);function we(e,t){switch(ye(Se,t),ye(xe,e),ye(be,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?pp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=pp(t),e=mp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ve(be),ye(be,e)}function Te(){ve(be),ve(xe),ve(Se)}function Ee(e){var t=e.memoizedState;t!==null&&(uh._currentValue=t.memoizedState,ye(Ce,e)),t=be.current;var n=mp(t,e.type);t!==n&&(ye(xe,e),ye(be,n))}function De(e){xe.current===e&&(ve(be),ve(xe)),Ce.current===e&&(ve(Ce),uh._currentValue=R)}var Oe,ke;function Ae(e){if(Oe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Oe=t&&t[1]||``,ke=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Oe+e+ke}var je=!1;function Me(e,t){if(!e||je)return``;je=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{je=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ae(n):``}function Ne(e,t){switch(e.tag){case 26:case 27:case 5:return Ae(e.type);case 16:return Ae(`Lazy`);case 13:return e.child!==t&&t!==null?Ae(`Suspense Fallback`):Ae(`Suspense`);case 19:return Ae(`SuspenseList`);case 0:case 15:return Me(e.type,!1);case 11:return Me(e.type.render,!1);case 1:return Me(e.type,!0);case 31:return Ae(`Activity`);case 30:return Ae(`ViewTransition`);default:return``}}function Pe(e){try{var t=``,n=null;do t+=Ne(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Fe=Object.prototype.hasOwnProperty,Ie=t.unstable_scheduleCallback,Le=t.unstable_cancelCallback,Re=t.unstable_shouldYield,ze=t.unstable_requestPaint,Be=t.unstable_now,Ve=t.unstable_getCurrentPriorityLevel,He=t.unstable_ImmediatePriority,Ue=t.unstable_UserBlockingPriority,We=t.unstable_NormalPriority,Ge=t.unstable_LowPriority,Ke=t.unstable_IdlePriority,qe=t.log,Je=t.unstable_setDisableYieldValue,Ye=null,Xe=null;function Ze(e){if(typeof qe==`function`&&Je(e),Xe&&typeof Xe.setStrictMode==`function`)try{Xe.setStrictMode(Ye,e)}catch{}}var Qe=Math.clz32?Math.clz32:tt,$e=Math.log,et=Math.LN2;function tt(e){return e>>>=0,e===0?32:31-($e(e)/et|0)|0}var nt=256,rt=262144,it=4194304;function at(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ot(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=at(n))):i=at(o):i=at(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=at(n))):i=at(o)):i=at(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function st(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ct(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-Qe(n),i=1<<r;t|=e[r],n&=~i}return t}function lt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ut(){var e=it;return it<<=1,!(it&62914560)&&(it=4194304),e}function dt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ft(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function pt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&mt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function mt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ht(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function gt(e,t){var n=t&-t;return n=n&42?1:_t(n),(n&(e.suspendedLanes|t))===0?n:0}function _t(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function vt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function yt(){var e=L.p;return e===0?(e=window.event,e===void 0?32:Th(e.type)):e}function bt(e,t){var n=L.p;try{return L.p=e,t()}finally{L.p=n}}var xt=Math.random().toString(36).slice(2),St=`__reactFiber$`+xt,Ct=`__reactProps$`+xt,z=`__reactContainer$`+xt,wt=`__reactEvents$`+xt,Tt=`__reactListeners$`+xt,Et=`__reactHandles$`+xt,Dt=`__reactResources$`+xt,Ot=`__reactMarker$`+xt,kt=`__reactLoad$`+xt;function At(e){delete e[St],delete e[Ct],delete e[Tt],delete e[Et]}function jt(e){var t;if(t=e[St])return t;for(var n=e.parentNode;n;){if(t=n[z]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=hm(e);e!==null;){if(n=e[St])return n;e=hm(e)}return t}e=n,n=e.parentNode}return null}function Mt(e){if(e=e[St]||e[z]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Pt(e){var t=e[Dt];return t||=e[Dt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ft(e){e[Ot]=!0}function It(e){e[kt]=void 0}var B=new Set,Lt={};function Rt(e,t){zt(e,t),zt(e+`Capture`,t)}function zt(e,t){for(Lt[e]=t,e=0;e<t.length;e++)B.add(t[e])}var Bt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Vt={},Ht={};function Ut(e){return Fe.call(Ht,e)?!0:Fe.call(Vt,e)?!1:Bt.test(e)?Ht[e]=!0:(Vt[e]=!0,!1)}var V=!1;function Wt(){var e=V;return V=!1,e}function Gt(e,t,n){if(Ut(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Kt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function qt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Jt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Yt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Xt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Zt(e){if(!e._valueTracker){var t=Yt(e)?`checked`:`value`;e._valueTracker=Xt(e,t,``+e[t])}}function Qt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Yt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var $t=/[\n"\\]/g;function en(e){return e.replace($t,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function tn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Jt(t)):e.value!==``+Jt(t)&&(e.value=``+Jt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):rn(e,Jt(n)):o===`number`&&e.value==t?rn(e,Jt(e.value)):rn(e,Jt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Jt(s):e.removeAttribute(`name`)}function nn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Zt(e);return}n=n==null?``:``+Jt(n),t=t==null?n:``+Jt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Zt(e)}function rn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function an(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Jt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function on(e,t,n){t!=null&&(t=``+Jt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Jt(n)}function sn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(me(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Jt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Zt(e)}function cn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ln=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function un(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||ln.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function dn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,V=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(un(e,a,r),V=!0)}else for(var o in t)t.hasOwnProperty(o)&&un(e,o,t[o])}function fn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var pn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),mn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function hn(e){return mn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function gn(){}var _n=null;function vn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var yn=null,bn=null;function xn(e){var t=Mt(e);if(t&&(e=t.stateNode)){var n=e[Ct]||null;a:switch(e=t.stateNode,t.type){case`input`:if(tn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+en(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ct]||null;if(!a)throw Error(i(90));tn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Qt(r)}break a;case`textarea`:on(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&an(e,!!n.multiple,t,!1)}}}var Sn=!1;function Cn(e,t,n){if(Sn)return e(t,n);Sn=!0;try{return e(t)}finally{if(Sn=!1,(yn!==null||bn!==null)&&(Vd(),yn&&(t=yn,e=bn,bn=yn=null,xn(t),e)))for(t=0;t<e.length;t++)xn(e[t])}}function wn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Ct]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Tn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,En=!1;if(Tn)try{var Dn={};Object.defineProperty(Dn,"passive",{get:function(){En=!0}}),window.addEventListener(`test`,Dn,Dn),window.removeEventListener(`test`,Dn,Dn)}catch{En=!1}var On=null,kn=null,An=null;function jn(){if(An)return An;var e,t=kn,n=t.length,r,i=`value`in On?On.value:On.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return An=i.slice(e,1<r?1-r:void 0)}function Mn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Nn(){return!0}function Pn(){return!1}function Fn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Nn:Pn,this.isPropagationStopped=Pn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Nn)},persist:function(){},isPersistent:Nn}),t}var In={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ln=Fn(In),Rn=D({},In,{view:0,detail:0}),zn=Fn(Rn),Bn,Vn,Hn,Un=D({},Rn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:er,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Hn&&(Hn&&e.type===`mousemove`?(Bn=e.screenX-Hn.screenX,Vn=e.screenY-Hn.screenY):Vn=Bn=0,Hn=e),Bn)},movementY:function(e){return`movementY`in e?e.movementY:Vn}}),Wn=Fn(Un),Gn=Fn(D({},Un,{dataTransfer:0})),Kn=Fn(D({},Rn,{relatedTarget:0})),qn=Fn(D({},In,{animationName:0,elapsedTime:0,pseudoElement:0})),Jn=Fn(D({},In,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Yn=Fn(D({},In,{data:0})),Xn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Zn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Qn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function $n(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qn[e])?!!t[e]:!1}function er(){return $n}var tr=Fn(D({},Rn,{key:function(e){if(e.key){var t=Xn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Mn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Zn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:er,charCode:function(e){return e.type===`keypress`?Mn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Mn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),nr=Fn(D({},Un,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),rr=Fn(D({},In,{submitter:0})),ir=Fn(D({},Rn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:er})),ar=Fn(D({},In,{propertyName:0,elapsedTime:0,pseudoElement:0})),or=Fn(D({},Un,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),sr=Fn(D({},In,{newState:0,oldState:0,source:0})),cr=[9,13,27,32],lr=Tn&&`CompositionEvent`in window,ur=null;Tn&&`documentMode`in document&&(ur=document.documentMode);var dr=Tn&&`TextEvent`in window&&!ur,fr=Tn&&(!lr||ur&&8<ur&&11>=ur),pr=` `,mr=!1;function hr(e,t){switch(e){case`keyup`:return cr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function gr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var _r=!1;function vr(e,t){switch(e){case`compositionend`:return gr(t);case`keypress`:return t.which===32?(mr=!0,pr):null;case`textInput`:return e=t.data,e===pr&&mr?null:e;default:return null}}function yr(e,t){if(_r)return e===`compositionend`||!lr&&hr(e,t)?(e=jn(),An=kn=On=null,_r=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return fr&&t.locale!==`ko`?null:t.data;default:return null}}var br={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!br[e.type]:t===`textarea`}function Sr(e,t,n,r){yn?bn?bn.push(r):bn=[r]:yn=r,t=Xf(t,`onChange`),0<t.length&&(n=new Ln(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Cr=null,wr=null;function Tr(e){Uf(e,0)}function Er(e){if(Qt(Nt(e)))return e}function Dr(e,t){if(e===`change`)return t}var Or=!1;if(Tn){var kr;if(Tn){var Ar=`oninput`in document;if(!Ar){var jr=document.createElement(`div`);jr.setAttribute(`oninput`,`return;`),Ar=typeof jr.oninput==`function`}kr=Ar}else kr=!1;Or=kr&&(!document.documentMode||9<document.documentMode)}function Mr(){Cr&&(Cr.detachEvent(`onpropertychange`,Nr),wr=Cr=null)}function Nr(e){if(e.propertyName===`value`&&Er(wr)){var t=[];Sr(t,wr,e,vn(e)),Cn(Tr,t)}}function Pr(e,t,n){e===`focusin`?(Mr(),Cr=t,wr=n,Cr.attachEvent(`onpropertychange`,Nr)):e===`focusout`&&Mr()}function Fr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Er(wr)}function Ir(e,t){if(e===`click`)return Er(t)}function Lr(e,t){if(e===`input`||e===`change`)return Er(t)}function Rr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var zr=typeof Object.is==`function`?Object.is:Rr;function Br(e,t){if(zr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Fe.call(t,i)||!zr(e[i],t[i]))return!1}return!0}function Vr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Hr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ur(e,t){var n=Hr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Hr(n)}}function Wr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Wr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Vr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Vr(e.document)}return t}function Kr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var qr=Tn&&`documentMode`in document&&11>=document.documentMode,Jr=null,Yr=null,Xr=null,Zr=!1;function Qr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Zr||Jr==null||Jr!==Vr(r)||(r=Jr,`selectionStart`in r&&Kr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Xr&&Br(Xr,r)||(Xr=r,r=Xf(Yr,`onSelect`),0<r.length&&(t=new Ln(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Jr)))}function $r(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ei={animationend:$r(`Animation`,`AnimationEnd`),animationiteration:$r(`Animation`,`AnimationIteration`),animationstart:$r(`Animation`,`AnimationStart`),transitionrun:$r(`Transition`,`TransitionRun`),transitionstart:$r(`Transition`,`TransitionStart`),transitioncancel:$r(`Transition`,`TransitionCancel`),transitionend:$r(`Transition`,`TransitionEnd`)},ti={},ni={};Tn&&(ni=document.createElement(`div`).style,`AnimationEvent`in window||(delete ei.animationend.animation,delete ei.animationiteration.animation,delete ei.animationstart.animation),`TransitionEvent`in window||delete ei.transitionend.transition);function ri(e){if(ti[e])return ti[e];if(!ei[e])return e;var t=ei[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ni)return ti[e]=t[n];return e}var ii=ri(`animationend`),ai=ri(`animationiteration`),oi=ri(`animationstart`),si=ri(`transitionrun`),ci=ri(`transitionstart`),li=ri(`transitioncancel`),ui=ri(`transitionend`),di=new Map,fi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);fi.push(`scrollEnd`);function pi(e,t){di.set(e,t),Rt(t,[e])}var mi=0;function hi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=Sd.identifierPrefix;var n=mi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function gi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Ad;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function _i(e,t){return e=gi(e),t=gi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var vi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},yi=[],bi=0,xi=0;function Si(){for(var e=bi,t=xi=bi=0;t<e;){var n=yi[t];yi[t++]=null;var r=yi[t];yi[t++]=null;var i=yi[t];yi[t++]=null;var a=yi[t];if(yi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ei(n,i,a)}}function Ci(e,t,n,r){yi[bi++]=e,yi[bi++]=t,yi[bi++]=n,yi[bi++]=r,xi|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function wi(e,t,n,r){return Ci(e,t,n,r),Di(e)}function Ti(e,t){return Ci(e,null,null,t),Di(e)}function Ei(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Di(e){if(50<jd)throw jd=0,Md=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Oi={};function ki(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ai(e,t,n,r){return new ki(e,t,n,r)}function ji(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mi(e,t){var n=e.alternate;return n===null?(n=Ai(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ni(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Pi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)ji(r)&&(s=1);else if(typeof r==`string`)s=Xm(e,n,be.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case ae:return e=Ai(31,n,t,a),e.elementType=ae,e.lanes=o,e;case ee:return Fi(n.children,a,o,t);case j:s=8,a|=24;break;case te:return e=Ai(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case P:return e=Ai(13,n,t,a),e.elementType=P,e.lanes=o,e;case re:return e=Ai(19,n,t,a),e.elementType=re,e.lanes=o,e;case oe:case ce:return e=a|32,e=Ai(30,n,t,e),e.elementType=ce,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case N:s=10;break a;case M:s=9;break a;case ne:s=11;break a;case ie:s=14;break a;case F:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Ai(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Fi(e,t,n,r){return e=Ai(7,e,r,t),e.lanes=n,e}function Ii(e,t,n){return e=Ai(6,e,null,t),e.lanes=n,e}function Li(e){var t=Ai(18,null,null,0);return t.stateNode=e,t}function Ri(e,t,n){return t=Ai(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var zi=new WeakMap;function Bi(e,t){if(typeof e==`object`&&e){var n=zi.get(e);return n===void 0?(t={value:e,source:t,stack:Pe(t)},zi.set(e,t),t):n}return{value:e,source:t,stack:Pe(t)}}var Vi=[],Hi=0,Ui=null,Wi=0,Gi=[],Ki=0,qi=null,Ji=1,Yi=``;function Xi(e,t){Vi[Hi++]=Wi,Vi[Hi++]=Ui,Ui=e,Wi=t}function Zi(e,t,n){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,qi=e;var r=Ji;e=Yi;var i=32-Qe(r)-1;r&=~(1<<i),n+=1;var a=32-Qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ji=1<<32-Qe(t)+i|n<<i|r,Yi=a+e}else Ji=1<<a|n<<i|r,Yi=e}function Qi(e){e.return!==null&&(Xi(e,1),Zi(e,1,0))}function $i(e){for(;e===Ui;)Ui=Vi[--Hi],Vi[Hi]=null,Wi=Vi[--Hi],Vi[Hi]=null;for(;e===qi;)qi=Gi[--Ki],Gi[Ki]=null,Yi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null}function ea(e,t){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,Ji=t.id,Yi=t.overflow,qi=e}var ta=null,na=null,H=!1,ra=null,ia=!1,aa=Error(i(519));function oa(e){throw fa(Bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),aa}function sa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[St]=e,t[Ct]=r,n){case`dialog`:X(`cancel`,t),X(`close`,t);break;case`iframe`:case`object`:case`embed`:X(`load`,t);break;case`video`:case`audio`:for(n=0;n<Vf.length;n++)X(Vf[n],t);break;case`source`:X(`error`,t);break;case`img`:case`image`:case`link`:X(`error`,t),X(`load`,t);break;case`details`:X(`toggle`,t);break;case`input`:X(`invalid`,t),nn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:X(`invalid`,t);break;case`textarea`:X(`invalid`,t),sn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||np(t.textContent,n)?(r.popover!=null&&(X(`beforetoggle`,t),X(`toggle`,t)),r.onScroll!=null&&X(`scroll`,t),r.onScrollEnd!=null&&X(`scrollend`,t),r.onClick!=null&&(t.onclick=gn),t=!0):t=!1,t||oa(e,!0)}function ca(e){for(ta=e.return;ta;)switch(ta.tag){case 5:case 31:case 13:ia=!1;return;case 27:case 3:ia=!0;return;default:ta=ta.return}}function la(e){if(e!==ta)return!1;if(!H)return ca(e),H=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||gp(e.type,e.memoizedProps)),n=!n),n&&na&&oa(e),ca(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=mm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=mm(e)}else t===27?(t=na,Tp(e.type)?(e=pm,pm=null,na=e):na=t):na=ta?fm(e.stateNode.nextSibling):null;return!0}function ua(){na=ta=null,H=!1}function da(){var e=ra;return e!==null&&(md===null?md=e:md.push.apply(md,e),ra=null),e}function fa(e){ra===null?ra=[e]:ra.push(e)}var pa=_e(null),ma=null,ha=null;function ga(e,t,n){ye(pa,t._currentValue),t._currentValue=n}function _a(e){e._currentValue=pa.current,ve(pa)}function va(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ya(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),va(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),va(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),va(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ba(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;zr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Ce.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[uh]:e.push(uh))}a=a.return}return e!==null&&ya(t,e,n,r),t.flags|=262144,e!==null}function xa(e){for(e=e.firstContext;e!==null;){if(!zr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Sa(e){ma=e,ha=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ca(e){return Ta(ma,e)}function wa(e,t){return ma===null&&Sa(e),Ta(e,t)}function Ta(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ha===null){if(e===null)throw Error(i(308));ha=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ha=ha.next=t;return n}var Ea=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Da=t.unstable_scheduleCallback,Oa=t.unstable_NormalPriority,U={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ka(){return{controller:new Ea,data:new Map,refCount:0}}function Aa(e){e.refCount--,e.refCount===0&&Da(Oa,function(){e.controller.abort()})}function ja(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Ma=null;function Na(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Pa=null,Fa=0,Ia=0,La=null;function Ra(e,t){if(Pa===null){var n=Pa=[];Fa=0,Ia=If(),La={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Fa++,t.then(za,za),t}function za(){if(--Fa===0&&(Ma=null,Pa!==null)){La!==null&&(La.status=`fulfilled`);var e=Pa;Pa=null,Ia=0,La=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ba(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Va=I.S;I.S=function(e,t){if(_d=Be(),typeof t==`object`&&t&&typeof t.then==`function`&&Ra(e,t),Ma!==null)for(var n=Cf;n!==null;)ja(n,Ma),n=n.next;if(n=e.types,n!==null){for(var r=Cf;r!==null;)ja(r,n),r=r.next;if(Ia!==0){r=Ma,r===null&&(r=Ma=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Va!==null&&Va(e,t)};var Ha=_e(null);function Ua(){var e=Ha.current;return e===null?ed.pooledCache:e}function Wa(e,t){t===null?ye(Ha,Ha.current):ye(Ha,t.pool)}function Ga(){var e=Ua();return e===null?null:{parent:U._currentValue,pool:e}}var Ka=Error(i(460)),qa=Error(i(474)),Ja=Error(i(542)),Ya={then:function(){}};function Xa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Za(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(gn,gn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,to(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(gn,gn);else{if(e=ed,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,to(e),e}throw $a=t,Ka}}function Qa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?($a=e,Ka):e}}var $a=null;function eo(){if($a===null)throw Error(i(459));var e=$a;return $a=null,e}function to(e){if(e===Ka||e===Ja)throw Error(i(483))}var no=null,ro=0;function io(e){var t=ro;return ro+=1,no===null&&(no=[]),Za(no,e,t)}function ao(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function oo(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function so(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Mi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ii(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ee?(e=d(e,t,n.props.children,r,n.key),ao(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===F&&Qa(i)===t.type)?(t=a(t,n.props),ao(t,n),t.return=e,t):(t=Pi(n.type,n.key,n.props,null,e.mode,r),ao(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ri(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Fi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ii(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Pi(t.type,t.key,t.props,null,e.mode,n),ao(n,t),n.return=e,n;case A:return t=Ri(t,e.mode,n),t.return=e,t;case F:return t=Qa(t),f(e,t,n)}if(me(t)||de(t))return t=Fi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,io(t),n);if(t.$$typeof===N)return f(e,wa(e,t),n);oo(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case F:return n=Qa(n),p(e,t,n,r)}if(me(n)||de(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,io(n),r);if(n.$$typeof===N)return p(e,t,wa(e,n),r);oo(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case F:return r=Qa(r),m(e,t,n,r,i)}if(me(r)||de(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,io(r),i);if(r.$$typeof===N)return m(e,t,n,wa(t,r),i);oo(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),H&&Xi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return H&&Xi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),H&&Xi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),H&&Xi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return H&&Xi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),H&&Xi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ee&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ee){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),ao(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===F&&Qa(l)===r.type){n(e,r.sibling),c=a(r,o.props),ao(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ee?(c=Fi(o.props.children,e.mode,c,o.key),ao(c,o),c.return=e,e=c):(c=Pi(o.type,o.key,o.props,null,e.mode,c),ao(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ri(o,e.mode,c),c.return=e,e=c}return s(e);case F:return o=Qa(o),_(e,r,o,c)}if(me(o))return h(e,r,o,c);if(de(o)){if(l=de(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,io(o),c);if(o.$$typeof===N)return _(e,r,wa(e,o),c);oo(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ii(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ro=0;var i=_(e,t,n,r);return no=null,i}catch(t){if(t===Ka||t===Ja)throw t;var a=Ai(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var co=so(!0),lo=so(!1),uo=!1;function fo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function po(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function mo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ho(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,$u&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Di(e),Ei(e,null,n),t}return Ci(e,r,t,n),Di(e)}function go(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}function _o(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var vo=!1;function yo(){if(vo){var e=La;if(e!==null)throw e}}function bo(e,t,n,r){vo=!1;var i=e.updateQueue;uo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(J&f)===f:(r&f)===f){f!==0&&f===Ia&&(vo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:uo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),cd|=o,e.lanes=o,e.memoizedState=d}}function xo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function So(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)xo(n[e],t)}var Co=_e(null),wo=_e(0);function To(e,t){e=od,ye(wo,e),ye(Co,t),od=e|t.baseLanes}function Eo(){ye(wo,od),ye(Co,Co.current)}function Do(){od=wo.current,ve(Co),ve(wo)}var Oo=_e(null),ko=null;function Ao(e){var t=e.alternate;ye(Fo,Fo.current&1),ye(Oo,e),ko===null&&(t===null||Co.current!==null||t.memoizedState!==null)&&(ko=e)}function jo(e){ye(Fo,Fo.current),ye(Oo,e),ko===null&&(ko=e)}function Mo(e){e.tag===22?(ye(Fo,Fo.current),ye(Oo,e),ko===null&&(ko=e)):No()}function No(){ye(Fo,Fo.current),ye(Oo,Oo.current)}function Po(e){ve(Oo),ko===e&&(ko=null),ve(Fo)}var Fo=_e(0);function Io(e,t){ye(Oo,Oo.current),ye(Fo,t)}function Lo(e){ve(Fo),ve(Oo),ko===e&&(ko=null)}function Ro(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||lm(n)||um(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zo=0,W=null,Bo=null,Vo=null,Ho=!1,Uo=!1,Wo=!1,Go=0,Ko=0,qo=null,Jo=0;function Yo(){throw Error(i(321))}function Xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zr(e[n],t[n]))return!1;return!0}function Zo(e,t,n,r,i,a){return zo=a,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,I.H=e===null||e.memoizedState===null?K:pc,Wo=!1,a=n(r,i),Wo=!1,Uo&&(a=$o(t,n,r,i)),Qo(e),a}function Qo(e){I.H=fc;var t=Bo!==null&&Bo.next!==null;if(zo=0,Vo=Bo=W=null,Ho=!1,Ko=0,qo=null,t)throw Error(i(300));e===null||Ac||(e=e.dependencies,e!==null&&xa(e)&&(Ac=!0))}function $o(e,t,n,r){W=e;var a=0;do{if(Uo&&(qo=null),Ko=0,Uo=!1,25<=a)throw Error(i(301));if(a+=1,Vo=Bo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}I.H=mc,o=t(n,r)}while(Uo);return o}function es(){var e=I.H,t=e.useState()[0];return t=typeof t.then==`function`?ss(t):t,e=e.useState()[0],(Bo===null?null:Bo.memoizedState)!==e&&(W.flags|=1024),t}function ts(){var e=Go!==0;return Go=0,e}function ns(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function rs(e){if(Ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ho=!1}zo=0,Vo=Bo=W=null,Uo=!1,Ko=Go=0,qo=null}function is(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vo===null?W.memoizedState=Vo=e:Vo=Vo.next=e,Vo}function as(){if(Bo===null){var e=W.alternate;e=e===null?null:e.memoizedState}else e=Bo.next;var t=Vo===null?W.memoizedState:Vo.next;if(t!==null)Vo=t,Bo=e;else{if(e===null)throw W.alternate===null?Error(i(467)):Error(i(310));Bo=e,e={memoizedState:Bo.memoizedState,baseState:Bo.baseState,baseQueue:Bo.baseQueue,queue:Bo.queue,next:null},Vo===null?W.memoizedState=Vo=e:Vo=Vo.next=e}return Vo}function os(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ss(e){var t=Ko;return Ko+=1,qo===null&&(qo=[]),e=Za(qo,e,t),t=W,(Vo===null?t.memoizedState:Vo.next)===null&&(t=t.alternate,I.H=t===null||t.memoizedState===null?K:pc),e}function cs(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ss(e);if(e.$$typeof===le)return;if(e.$$typeof===N)return Ca(e)}throw Error(i(438,String(e)))}function ls(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=W.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=os(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=se;return t.index++,n}function G(e,t){return typeof t==`function`?t(e):t}function us(e){return ds(as(),Bo,e)}function ds(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(zo&f)===f:(J&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ia&&(d=!0);else if((zo&p)===p){u=u.next,p===Ia&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,W.lanes|=p,cd|=p;f=u.action,Wo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,W.lanes|=f,cd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!zr(o,e.memoizedState)&&(Ac=!0,d&&(n=La,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function fs(e){var t=as(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);zr(o,t.memoizedState)||(Ac=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ps(e,t,n){var r=W,a=as(),o=H;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!zr((Bo||a).memoizedState,n);if(s&&(a.memoizedState=n,Ac=!0),a=a.queue,Rs(gs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Vo!==null&&!!(Vo.memoizedState.tag&1),Ns(e?9:8,{destroy:void 0},hs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,ed===null)throw Error(i(349));o||zo&127||ms(r,t,n)}return n}function ms(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=os(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hs(e,t,n,r){t.value=n,t.getSnapshot=r,_s(t)&&vs(e)}function gs(e,t,n){return n(function(){_s(t)&&vs(e)})}function _s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zr(e,n)}catch{return!0}}function vs(e){var t=Ti(e,2);t!==null&&Id(t,e,2)}function ys(e){var t=is();if(typeof e==`function`){var n=e;if(e=n(),Wo){Ze(!0);try{n()}finally{Ze(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:G,lastRenderedState:e},t}function bs(e,t,n,r){return e.baseState=n,ds(e,Bo,typeof r==`function`?r:G)}function xs(e,t,n,r,a){if(lc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};I.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ss(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ss(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=I.T,o={};o.types=a===null?null:a.types,I.T=o;try{var s=n(i,r),c=I.S;c!==null&&c(o,s),Cs(e,t,s)}catch(n){Ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),I.T=a}}else try{a=n(i,r),Cs(e,t,a)}catch(n){Ts(e,t,n)}}function Cs(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ws(e,t,n)},function(n){return Ts(e,t,n)}):ws(e,t,n)}function ws(e,t,n){t.status=`fulfilled`,t.value=n,Es(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ss(e,n)))}function Ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Es(t),t=t.next;while(t!==r)}e.action=null}function Es(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ds(e,t){return t}function Os(e,t){if(H){var n=ed.formState;if(n!==null){a:{var r=W;if(H){if(na){b:{for(var i=na,a=ia;i.nodeType!==8;)if(!a||(i=fm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){na=fm(i.nextSibling),r=i.data===`F!`;break a}}oa(r)}r=!1}r&&(t=n[0])}}return n=is(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:t},n.queue=r,n=oc.bind(null,W,r),r.dispatch=n,r=ys(!1),a=cc.bind(null,W,!1,r.queue),r=is(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=xs.bind(null,W,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ks(e){return As(as(),Bo,e)}function As(e,t,n){if(t=ds(e,t,Ds)[0],e=us(G)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ss(t)}catch(e){throw e===Ka?Ja:e}else r=t;t=as();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(W.flags|=2048,Ns(9,{destroy:void 0},js.bind(null,i,n),null)),[r,a,e]}function js(e,t){e.action=t}function Ms(e){var t=as(),n=Bo;if(n!==null)return As(t,n,e);as(),t=t.memoizedState,n=as();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ns(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=W.updateQueue,t===null&&(t=os(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ps(){return as().memoizedState}function Fs(e,t,n,r){var i=is();W.flags|=e,i.memoizedState=Ns(1|t,{destroy:void 0},n,r===void 0?null:r)}function Is(e,t,n,r){var i=as();r=r===void 0?null:r;var a=i.memoizedState.inst;Bo!==null&&r!==null&&Xo(r,Bo.memoizedState.deps)?i.memoizedState=Ns(t,a,n,r):(W.flags|=e,i.memoizedState=Ns(1|t,a,n,r))}function Ls(e,t){Fs(8390656,8,e,t)}function Rs(e,t){Is(2048,8,e,t)}function zs(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=os(),W.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Bs(e){var t=as().memoizedState;return zs({ref:t,nextImpl:e}),function(){if($u&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Vs(e,t){return Is(4,2,e,t)}function Hs(e,t){return Is(4,4,e,t)}function Us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ws(e,t,n){n=n==null?null:n.concat([e]),Is(4,4,Us.bind(null,t,e),n)}function Gs(){}function Ks(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qs(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xo(t,r[1]))return r[0];if(r=e(),Wo){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r}function Js(e,t,n){return n===void 0||zo&1073741824&&!(J&261930)?e.memoizedState=t:(e.memoizedState=n,e=Pd(),W.lanes|=e,cd|=e,n)}function Ys(e,t,n,r){return zr(n,t)?n:Co.current===null?!(zo&106)||zo&1073741824&&!(J&261930)?(Ac=!0,e.memoizedState=n):(e=Pd(),W.lanes|=e,cd|=e,t):(e=Js(e,n,r),zr(e,t)||(Ac=!0),e)}function Xs(e,t,n,r,i){var a=L.p;L.p=a!==0&&8>a?a:8;var o=I.T,s={};s.types=o===null?null:o.types,I.T=s,cc(e,!1,t,n);try{var c=i(),l=I.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?sc(e,t,Ba(c,r),Nd(e)):sc(e,t,r,Nd(e))}catch(n){sc(e,t,{then:function(){},status:`rejected`,reason:n},Nd())}finally{L.p=a,o!==null&&s.types!==null&&(o.types=s.types),I.T=o}}function Zs(){}function Qs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=$s(e).queue;Xs(e,a,t,R,n===null?Zs:function(){return ec(e),n(r)})}function $s(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:R,baseState:R,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:G,lastRenderedState:R},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:G,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ec(e){var t=$s(e);t.next===null&&(t=e.alternate.memoizedState),sc(e,t.next.queue,{},Nd())}function tc(){return Ca(uh)}function nc(){return as().memoizedState}function rc(){return as().memoizedState}function ic(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Nd();e=mo(n);var r=ho(t,e,n);r!==null&&(Id(r,t,n),go(r,t,n)),t={cache:ka()},e.payload=t;return}t=t.return}}function ac(e,t,n){var r=Nd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},lc(e)?uc(t,n):(n=wi(e,t,n,r),n!==null&&(Id(n,e,r),dc(n,t,r)))}function oc(e,t,n){sc(e,t,n,Nd())}function sc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(lc(e))uc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,zr(s,o))return Ci(e,t,i,0),ed===null&&Si(),!1}catch{}if(n=wi(e,t,i,r),n!==null)return Id(n,e,r),dc(n,t,r),!0}return!1}function cc(e,t,n,r){if(r={lane:2,revertLane:If(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(e)){if(t)throw Error(i(479))}else t=wi(e,n,r,2),t!==null&&Id(t,e,2)}function lc(e){var t=e.alternate;return e===W||t!==null&&t===W}function uc(e,t){Uo=Ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}var fc={readContext:Ca,use:cs,useCallback:Yo,useContext:Yo,useEffect:Yo,useImperativeHandle:Yo,useLayoutEffect:Yo,useInsertionEffect:Yo,useMemo:Yo,useReducer:Yo,useRef:Yo,useState:Yo,useDebugValue:Yo,useDeferredValue:Yo,useTransition:Yo,useSyncExternalStore:Yo,useId:Yo,useHostTransitionStatus:Yo,useFormState:Yo,useActionState:Yo,useOptimistic:Yo,useMemoCache:Yo,useCacheRefresh:Yo,useEffectEvent:Yo},K={readContext:Ca,use:cs,useCallback:function(e,t){return is().memoizedState=[e,t===void 0?null:t],e},useContext:Ca,useEffect:Ls,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Fs(4194308,4,Us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fs(4194308,4,e,t)},useInsertionEffect:function(e,t){Fs(4,2,e,t)},useMemo:function(e,t){var n=is();t=t===void 0?null:t;var r=e();if(Wo){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=is();if(n!==void 0){var i=n(t);if(Wo){Ze(!0);try{n(t)}finally{Ze(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ac.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var t=is();return e={current:e},t.memoizedState=e},useState:function(e){e=ys(e);var t=e.queue,n=oc.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Gs,useDeferredValue:function(e,t){return Js(is(),e,t)},useTransition:function(){var e=ys(!1);return e=Xs.bind(null,W,e.queue,!0,!1),is().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=W,a=is();if(H){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),ed===null)throw Error(i(349));J&127||ms(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Ls(gs.bind(null,r,o,e),[e]),r.flags|=2048,Ns(9,{destroy:void 0},hs.bind(null,r,o,n,t),null),n},useId:function(){var e=is(),t=ed.identifierPrefix;if(H){var n=Yi,r=Ji;n=(r&~(1<<32-Qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Jo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:tc,useFormState:Os,useActionState:Os,useOptimistic:function(e){var t=is();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=cc.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:ls,useCacheRefresh:function(){return is().memoizedState=ic.bind(null,W)},useEffectEvent:function(e){var t=is(),n={impl:e};return t.memoizedState=n,function(){if($u&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},pc={readContext:Ca,use:cs,useCallback:Ks,useContext:Ca,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:us,useRef:Ps,useState:function(){return us(G)},useDebugValue:Gs,useDeferredValue:function(e,t){return Ys(as(),Bo.memoizedState,e,t)},useTransition:function(){var e=us(G)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:ks,useActionState:ks,useOptimistic:function(e,t){return bs(as(),Bo,e,t)},useMemoCache:ls,useCacheRefresh:rc,useEffectEvent:Bs},mc={readContext:Ca,use:cs,useCallback:Ks,useContext:Ca,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:fs,useRef:Ps,useState:function(){return fs(G)},useDebugValue:Gs,useDeferredValue:function(e,t){var n=as();return Bo===null?Js(n,e,t):Ys(n,Bo.memoizedState,e,t)},useTransition:function(){var e=fs(G)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:Ms,useActionState:Ms,useOptimistic:function(e,t){var n=as();return Bo===null?(n.baseState=e,[e,n.queue.dispatch]):bs(n,Bo,e,t)},useMemoCache:ls,useCacheRefresh:rc,useEffectEvent:Bs};function hc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var gc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Nd(),i=mo(r);i.payload=t,n!=null&&(i.callback=n),t=ho(e,i,r),t!==null&&(Id(t,e,r),go(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Nd(),i=mo(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ho(e,i,r),t!==null&&(Id(t,e,r),go(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Nd(),r=mo(n);r.tag=2,t!=null&&(r.callback=t),t=ho(e,r,n),t!==null&&(Id(t,e,n),go(t,e,n))}};function _c(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Br(n,r)||!Br(i,a):!0}function vc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&gc.enqueueReplaceState(t,t.state,null)}function yc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function bc(e){vi(e)}function xc(e){console.error(e)}function Sc(e){vi(e)}function Cc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function wc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){return n=mo(n),n.tag=3,n.payload={element:null},n.callback=function(){Cc(e,t)},n}function Ec(e){return e=mo(e),e.tag=3,e}function Dc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){wc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){wc(t,n,r),typeof i!=`function`&&(bd===null?bd=new Set([this]):bd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Oc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ba(t,n,a,!0),n=Oo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return ko===null?Jd():n.alternate===null&&sd===0&&(sd=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ya?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),_f(e,r,a)),!1;case 22:return n.flags|=65536,r===Ya?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),_f(e,r,a)),!1}throw Error(i(435,n.tag))}return _f(e,r,a),Jd(),!1}if(H)return t=Oo.current,t===null?(r!==aa&&(t=Error(i(423),{cause:r}),fa(Bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Bi(r,n),a=Tc(e.stateNode,r,a),_o(e,a),sd!==4&&(sd=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==aa&&(e=Error(i(422),{cause:r}),fa(Bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Bi(o,n),pd===null?pd=[o]:pd.push(o),sd!==4&&(sd=2),t===null)return!0;r=Bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Tc(n.stateNode,r,e),_o(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(bd===null||!bd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ec(a),Dc(a,e,n,r),_o(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var kc=Error(i(461)),Ac=!1;function jc(e,t,n,r){t.child=e===null?lo(t,null,n,r):co(t,e.child,n,r)}function Mc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Sa(t),r=Zo(e,t,n,o,a,i),s=ts(),e!==null&&!Ac?(ns(e,t,i),ol(e,t,i)):(H&&s&&Qi(t),t.flags|=1,jc(e,t,r,i),t.child)}function Nc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ji(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Pc(e,t,a,r,i)):(e=Pi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!sl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Br:n,n(o,r)&&e.ref===t.ref)return ol(e,t,i)}return t.flags|=1,e=Mi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Pc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Br(a,r)&&e.ref===t.ref){if(Ac=!1,t.pendingProps=r=a,sl(e,i))e.flags&131072&&(Ac=!0);else return t.lanes=e.lanes,ol(e,t,i)}}return Hc(e,t,n,r,i)}function Fc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Lc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Wa(t,a===null?null:a.cachePool),a===null?Eo():To(t,a),Mo(t);else return r=t.lanes=536870912,Lc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Wa(t,null),Eo(),No()):(Wa(t,a.cachePool),To(t,a),No(),t.memoizedState=null);return jc(e,t,i,n),t.child}function Ic(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Lc(e,t,n,r,i){var a=Ua();return a=a===null?null:{parent:U._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Wa(t,null),Eo(),Mo(t),e!==null&&ba(e,t,r,!0),t.childLanes=i,null}function Rc(e,t){return t=Zc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function zc(e,t,n){return co(t,e.child,null,n),e=Rc(t,t.pendingProps),e.flags|=2,Po(t),t.memoizedState=null,e}function Bc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(H){if(r.mode===`hidden`)return e=Rc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Ic(null,e);if(jo(t),(e=na)?(e=cm(e,ia),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=536870912,null}return Rc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(jo(t),a){if(t.flags&256)t.flags&=-257,t=zc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Ac||ba(e,t,n,!1),a=(n&e.childLanes)!==0,Ac||a){if(Co.current===null){if(r=ed,r!==null&&(s=gt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ti(e,s),Id(r,e,s),kc;Jd()}t=zc(e,t,n)}else e=o.treeContext,na=fm(s.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=Rc(t,r),t.flags|=134221824;return t}return e=Mi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Vc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Hc(e,t,n,r,i){return Sa(t),n=Zo(e,t,n,r,void 0,i),r=ts(),e!==null&&!Ac?(ns(e,t,i),ol(e,t,i)):(H&&r&&Qi(t),t.flags|=1,jc(e,t,n,i),t.child)}function Uc(e,t,n,r,i,a){return Sa(t),t.updateQueue=null,n=$o(t,r,n,i),Qo(e),r=ts(),e!==null&&!Ac?(ns(e,t,a),ol(e,t,a)):(H&&r&&Qi(t),t.flags|=1,jc(e,t,n,a),t.child)}function Wc(e,t,n,r,i){if(Sa(t),t.stateNode===null){var a=Oi,o=n.contextType;typeof o==`object`&&o&&(a=Ca(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=gc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},fo(t),o=n.contextType,a.context=typeof o==`object`&&o?Ca(o):Oi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(hc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&gc.enqueueReplaceState(a,a.state,null),bo(t,r,a,i),yo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=yc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Oi,typeof u==`object`&&u&&(o=Ca(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&vc(t,a,r,o),uo=!1;var f=t.memoizedState;a.state=f,bo(t,r,a,i),yo(),l=t.memoizedState,s||f!==l||uo?(typeof d==`function`&&(hc(t,n,d,r),l=t.memoizedState),(c=uo||_c(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,po(e,t),o=t.memoizedProps,u=yc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Oi,typeof l==`object`&&l&&(c=Ca(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&vc(t,a,r,c),uo=!1,f=t.memoizedState,a.state=f,bo(t,r,a,i),yo();var p=t.memoizedState;o!==d||f!==p||uo||e!==null&&e.dependencies!==null&&xa(e.dependencies)?(typeof s==`function`&&(hc(t,n,s,r),p=t.memoizedState),(u=uo||_c(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&xa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Vc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=co(t,e.child,null,i),t.child=co(t,null,n,i)):jc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=ol(e,t,i),e}function Gc(e,t,n,r){return ua(),t.flags|=256,jc(e,t,n,r),t.child}var Kc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qc(e){return{baseLanes:e,cachePool:Ga()}}function Jc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=dd),e}function Yc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Fo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(H){if(i?Ao(t):No(),(e=na)?(e=cm(e,ia),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=um(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(No(),i=t.mode,a=Zc({mode:`hidden`,children:a},i),r=Fi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=qc(n),r.childLanes=Jc(e,o,n),t.memoizedState=Kc,Ic(null,r)):(Ao(t),Xc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return $c(e,t,a,o,r,c,s,n)}return i?(No(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Mi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Fi(i,a,n,null),i.flags|=2):i=Mi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Ic(null,r),r=t.child,i=e.child.memoizedState,i===null?i=qc(n):(a=i.cachePool,a===null?a=Ga():(s=U._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Jc(e,o,n),t.memoizedState=Kc,Ic(e.child,r)):(Ao(t),n=e.child,e=n.sibling,n=Mi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Xc(e,t){return t=Zc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Zc(e,t){return e=Ai(22,e,null,t),e.lanes=0,e}function Qc(e,t,n){return co(t,e.child,null,n),e=Xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function $c(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Ao(t),t.flags&=-257,Qc(e,t,c)):t.memoizedState===null?(No(),o=a.fallback,s=t.mode,a=Zc({mode:`visible`,children:a.children},s),o=Fi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,co(t,e.child,null,c),a=t.child,a.memoizedState=qc(c),a.childLanes=Jc(e,r,c),t.memoizedState=Kc,Ic(null,a)):(No(),t.child=e.child,t.flags|=128,null);if(Ao(t),um(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,fa({value:a,source:null,stack:null})),Qc(e,t,c)}if(Ac||ba(e,t,c,!1),r=(c&e.childLanes)!==0,Ac||r){if(Co.current!==null)return Qc(e,t,c);if(r=ed,r!==null&&(a=gt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ti(e,a),Id(r,e,a),kc;return lm(o)||Jd(),Qc(e,t,c)}return lm(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,na=fm(o.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=Xc(t,a.children),t.flags|=134221824,t)}function el(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),va(e.return,t,n)}function tl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Ro(n)===null&&(t=e),e=e.sibling}return t}function nl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function rl(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function il(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Fo.current;if(t.flags&128)return Io(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Io(t,o),i===`backwards`&&e!==null?(rl(e),jc(e,t,r,n),rl(e)):jc(e,t,r,n),r=H?Wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&el(e,n,t);else if(e.tag===19)el(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=tl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,rl(t)),nl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ro(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}nl(t,!0,n,null,a,r);break;case`together`:nl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=tl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),nl(t,!1,i,n,a,r)}return t.child}function al(e,t,n){var r=t.pendingProps;return ga(t,t.type,r.value),jc(e,t,r.children,n),t.child}function ol(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),cd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ba(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Mi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Mi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function sl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&xa(e)))}function cl(e,t,n){switch(t.tag){case 3:we(t,t.stateNode.containerInfo),ga(t,U,e.memoizedState.cache),ua();break;case 27:case 5:Ee(t);break;case 4:we(t,t.stateNode.containerInfo);break;case 10:ga(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,jo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Ao(t),t.flags|=128,null;r=ba(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Yc(e,t,n):(Ao(t),e=ol(e,t,n),e===null?null:e.sibling)}Ao(t);break;case 19:if(t.flags&128)return il(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ba(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return il(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Io(t,Fo.current),r)break;return null;case 22:return t.lanes=0,Fc(e,t,n,t.pendingProps);case 24:ga(t,U,e.memoizedState.cache)}return ol(e,t,n)}function ll(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Ac=!0;else{if(!sl(e,n)&&!(t.flags&128))return Ac=!1,cl(e,t,n);Ac=!!(e.flags&131072)}}else Ac=!1,H&&t.flags&1048576&&Zi(t,Wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Qa(t.elementType),t.type=e,typeof e==`function`)ji(e)?(r=yc(e,r),t.tag=1,t=Wc(null,t,e,r,n)):(t.tag=0,t=Hc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ne){t.tag=11,t=Mc(null,t,e,r,n);break a}if(a===ie){t.tag=14,t=Nc(null,t,e,r,n);break a}if(a===N){t.tag=10,t.type=e,t=al(null,t,n);break a}}throw t=pe(e)||e,Error(i(306,t,``))}}return t;case 0:return Hc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=yc(r,t.pendingProps),Wc(e,t,r,a,n);case 3:a:{if(we(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,po(e,t),bo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ga(t,U,r),r!==o.cache&&ya(t,[U],n,!0),yo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Gc(e,t,r,n);break a}if(r!==a){a=Bi(Error(i(424)),t),fa(a),t=Gc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(na=fm(e.firstChild),ta=t,H=!0,ra=null,ia=!0,n=lo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ua(),r===a){t=ol(e,t,n);break a}jc(e,t,r,n)}t=t.child}return t;case 26:return Vc(e,t),e===null?(n=Im(t.type,null,t.pendingProps,null))?t.memoizedState=n:H||(t.stateNode=hp(t.type,t.pendingProps,Se.current,t)):t.memoizedState=Im(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ee(t),e===null&&H&&(r=t.stateNode=vm(t.type,t.pendingProps,Se.current),ta=t,ia=!0,a=na,Tp(t.type)?(pm=a,na=fm(r.firstChild)):na=a),jc(e,t,t.pendingProps.children,n),Vc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&H&&((a=r=na)&&(r=om(r,t.type,t.pendingProps,ia),r===null?a=!1:(t.stateNode=r,ta=t,na=fm(r.firstChild),ia=!1,a=!0)),a||oa(t)),Ee(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,gp(a,o)?r=null:s!==null&&gp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Zo(e,t,es,null,null,n),uh._currentValue=a),Vc(e,t),jc(e,t,r,n),t.child;case 6:return e===null&&H&&((e=n=na)&&(n=sm(n,t.pendingProps,ia),n===null?e=!1:(t.stateNode=n,ta=t,na=null,e=!0)),e||oa(t)),null;case 13:return Yc(e,t,n);case 4:return we(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=co(t,null,r,n):jc(e,t,r,n),t.child;case 11:return Mc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Vc(e,t),jc(e,t,r,n),t.child;case 8:return jc(e,t,t.pendingProps.children,n),t.child;case 12:return jc(e,t,t.pendingProps.children,n),t.child;case 10:return al(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Sa(t),a=Ca(a),r=r(a),t.flags|=1,jc(e,t,r,n),t.child;case 14:return Nc(e,t,t.type,t.pendingProps,n);case 15:return Pc(e,t,t.type,t.pendingProps,n);case 19:return il(e,t,n);case 31:return Bc(e,t,n);case 22:return Fc(e,t,n,t.pendingProps);case 24:return Sa(t),r=Ca(U),e===null?(a=Ua(),a===null&&(a=ed,o=ka(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},fo(t),ga(t,U,a)):((e.lanes&n)!==0&&(po(e,t),bo(t,null,null,n),yo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ga(t,U,r),r!==a.cache&&ya(t,[U],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ga(t,U,r))),jc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:H&&Qi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Vc(e,t),jc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function ul(e){e.flags|=4}function dl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Zm(t,r):Zm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Gd())e.flags|=8192;else throw $a=Ya,qa}}else e.flags&=-16777217}function fl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Qm(t)){if(Gd())e.flags|=8192;else throw $a=Ya,qa}}function pl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ut(),e.lanes|=t,fd|=t)}function ml(e,t){if(!H)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function hl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function gl(e,t,n){var r=t.pendingProps;switch($i(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hl(t),null;case 1:return hl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),_a(U),Te(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(la(t)?ul(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,da())),hl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(ul(t),o===null?(hl(t),dl(t,a,null,r,n)):(hl(t),fl(t,o))):o?o===e.memoizedState?(hl(t),t.flags&=-16777217):(ul(t),hl(t),fl(t,o)):(e=e.memoizedProps,e!==r&&ul(t),hl(t),dl(t,a,e,r,n)),null;case 27:if(De(t),n=Se.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return hl(t),t.subtreeFlags&=-33554433,null}e=be.current,la(t)?sa(t,e):(e=vm(a,r,n),t.stateNode=e,ul(t))}return hl(t),t.subtreeFlags&=-33554433,null;case 5:if(De(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return hl(t),t.subtreeFlags&=-33554433,null}if(o=be.current,la(t))sa(t,o);else{var s=fp(Se.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[St]=t,o[Ct]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(ap(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&ul(t)}}return hl(t),t.subtreeFlags&=-33554433,dl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Se.current,la(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ta,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[St]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||np(e.nodeValue,n)),e||oa(t,!0)}else e=fp(e).createTextNode(r),e[St]=t,t.stateNode=e}return hl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=la(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[St]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;hl(t),e=!1}else n=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Po(t),t):(Po(t),null);if(t.flags&128)throw Error(i(558))}return hl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=la(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[St]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;hl(t),a=!1}else a=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Po(t),t):(Po(t),null)}return Po(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),pl(t,t.updateQueue),hl(t),null);case 4:return Te(),e===null&&Kf(t.stateNode.containerInfo),t.flags|=67108864,hl(t),null;case 10:return _a(t.type),hl(t),null;case 19:if(Lo(t),r=t.memoizedState,r===null)return hl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)ml(r,!1);else{if(sd!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ro(e),o!==null){for(t.flags|=128,ml(r,!1),e=o.updateQueue,t.updateQueue=e,pl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ni(n,e),n=n.sibling;return Io(t,Fo.current&1|2),H&&Xi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Be()>vd&&(t.flags|=128,a=!0,ml(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Ro(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,pl(t,e),ml(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!H)return hl(t),null}else 2*Be()-r.renderingStartTime>vd&&n!==536870912&&(t.flags|=128,a=!0,ml(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Be(),e.sibling=null,o=Fo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||H?Io(t,o):(n=o,ye(Oo,t),ye(Fo,n),ko===null&&(ko=t)),H&&Xi(t,r.treeForkCount),e}return hl(t),null;case 22:case 23:return Po(t),Do(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(hl(t),t.subtreeFlags&6&&(t.flags|=8192)):hl(t),n=t.updateQueue,n!==null&&pl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ve(Ha),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),_a(U),hl(t),null;case 25:return null;case 30:return t.flags|=33554432,hl(t),null}throw Error(i(156,t.tag))}function _l(e,t){switch($i(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return _a(U),Te(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return De(t),null;case 31:if(t.memoizedState!==null){if(Po(t),t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Po(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Lo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Te(),null;case 10:return _a(t.type),null;case 22:case 23:return Po(t),Do(),e!==null&&ve(Ha),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return _a(U),null;case 25:return null;default:return null}}function vl(e,t){switch($i(t),t.tag){case 3:_a(U),Te();break;case 26:case 27:case 5:De(t);break;case 4:Te();break;case 31:t.memoizedState!==null&&Po(t);break;case 13:Po(t);break;case 19:Lo(t);break;case 10:_a(t.type);break;case 22:case 23:Po(t),Do(),e!==null&&ve(Ha);break;case 24:_a(U)}}function yl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){gf(t,t.return,e)}}function bl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){gf(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){gf(t,t.return,e)}}function xl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{So(t,n)}catch(t){gf(e,e.return,t)}}}function Sl(e,t,n){n.props=yc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){gf(e,t,n)}}function Cl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=hi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Lp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Rp(e);m(e.child,!1,tm,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){gf(e,t,n)}}function wl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){gf(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){gf(e,t,n)}else n.current=null}}function Tl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)rm(e.stateNode,t[n])}function El(e){for(var t=e.return;t!==null&&(kl(t)&&rm(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Dl(e){for(var t=e.return;t!==null&&(kl(t)&&im(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Ol(e){return e.tag===5||e.tag===3||e.tag===27}function kl(e){return e&&e.tag===7&&e.stateNode!==null}function Al(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){gf(e,e.return,t)}}function jl(e,t,n){try{var r=e.stateNode;sp(r,e.type,n,t),r[Ct]=t}catch(t){gf(e,e.return,t)}}function Ml(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Tp(e.type)||e.tag===4}function Nl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ml(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Tp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Pl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=gn)),Tl(e,r),V=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Tp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Pl(e,t,n,r),e=e.sibling;e!==null;)Pl(e,t,n,r),e=e.sibling}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Tl(e,r),V=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Tp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);ap(t,r,n),t[St]=e,t[Ct]=n}catch(t){gf(e,e.return,t)}}var Ll=!1,Rl=null;function zl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Ll=!0)}var Bl=null;function Vl(){var e=Bl;return Bl=null,e}var Hl=0;function Ul(e,t,n,r,i){return Hl=0,Wl(e.child,t,n,r,i)}function Wl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=jp(o);r.push(s),s.view&&(a=!0)}else a||jp(o).view&&(a=!0);Ll=!0,Op(o,Hl===0?t:t+`_`+Hl,n),Hl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Wl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Gl(e,t){for(;e!==null;)e.tag===5?kp(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Gl(e.child,t),e=e.sibling}function Kl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Kl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=_i(t.default,t.share),t!==`none`&&(Ul(e,n,t,null,!1)||Gl(e.child,!1))}e=e.sibling}}function ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=hi(r,n),a=_i(r.default,n.paired?r.share:r.enter);a===`none`?Kl(e):Ul(e,i,a,null,!1)?(Kl(e),n.paired||t||Fd(e,r.onEnter)):Gl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ql(e,t),e=e.sibling;else Kl(e)}function Jl(e){if(Rl!==null&&Rl.size!==0){var t=Rl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=_i(n.default,n.share);if(a!==`none`&&(Ul(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Fd(e,n.onShare)):Gl(e.child,!1)),t.delete(r),t.size===0)break}}}Jl(e)}e=e.sibling}}}function Yl(e){if(e.tag===30){var t=e.memoizedProps,n=hi(t,e.stateNode),r=Rl===null?void 0:Rl.get(n),i=_i(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Ul(e,n,i,null,!1)?r===void 0?Fd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Rl.delete(n),Fd(e,t.onShare)):Gl(e.child,!1)),Rl!==null&&Jl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Yl(e),e=e.sibling;else Rl!==null&&Jl(e)}function Xl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=hi(t,e.stateNode);t=_i(t.default,t.update),e.flags&=-5,t!==`none`&&Ul(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Xl(e);e=e.sibling}}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Gl(e.child,!1))}Zl(e)}e=e.sibling}}function Ql(e){if(e.tag===30)e.stateNode.paired=null,Gl(e.child,!1),Zl(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e),e=e.sibling;else Zl(e)}function $l(e){for(e=e.child;e!==null;)e.tag===30?Gl(e.child,!1):e.subtreeFlags&33554432&&$l(e),e=e.sibling}function eu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Hl<a.length){var l=a[Hl],u=jp(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Op(c,Hl===0?n:n+`_`+Hl,i),s&&e.flags&4||(Bl===null&&(Bl=[]),Bl.push(c,Hl===0?r:r+`_`+Hl,t.memoizedProps)),Hl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:eu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function tu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=hi(n,r),a=_i(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Mp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Hl=0,i=eu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Fd(e,n.onUpdate))}else e.subtreeFlags&33554432&&tu(e,t);e=e.sibling}}var nu=!1,ru=!1,iu=!1,au=!1,ou=typeof WeakSet==`function`?WeakSet:Set,su=null,cu=!1,lu=!1,uu=!1,du=!1;function fu(e,t,n){if(e=e.containerInfo,up=yh,e=Gr(e),Kr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(dp={focusedElem:e,selectionRange:r},yh=!1,n=(n&335544064)===n,su=t,t=n?9270:1024;su!==null;){if(e=su,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Yl(r[a]);if(e.alternate===null&&e.flags&2)n&&zl(e),pu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Yl(r),pu(n);continue}if(r!==null&&r.memoizedState!==null){n&&zl(e),pu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,su=r):(n&&Xl(e),pu(n))}}Rl=null}function pu(e){for(;su!==null;){var t=su,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=yc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){gf(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)am(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:am(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=hi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=_i(a.default,a.update),a!==`none`&&Ul(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,su=r;break}su=t.return}}function mu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Pu(e,n),r&4&&yl(5,n);break;case 1:if(Pu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){gf(n,n.return,e)}else{var i=yc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){gf(n,n.return,e)}}}r&64&&xl(n),r&512&&Cl(n,n.return);break;case 3:if(Pu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{So(e,t)}catch(e){gf(n,n.return,e)}}break;case 27:t===null&&r&4&&Il(n);case 26:case 5:Pu(e,n),t===null&&r&4&&Al(n),r&512&&Cl(n,n.return);break;case 12:Pu(e,n);break;case 31:Pu(e,n),r&4&&Cu(e,n);break;case 13:Pu(e,n),r&4&&wu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=bf.bind(null,n),dm(e,n))));break;case 22:if(r=n.memoizedState!==null||nu,!r){var a=t!==null&&t.memoizedState!==null||ru;t=nu,i=ru,nu=r,(ru=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Iu(e,n,r)):Pu(e,n),nu=t,ru=i}break;case 30:Pu(e,n),r&512&&Cl(n,n.return);break;case 7:r&512&&Cl(n,n.return);default:Pu(e,n)}}function hu(e,t){for(e=e.child;e!==null;)gu(e,t),e=e.sibling}function gu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){gf(e,e.return,t)}_u(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,V=!0}catch(t){gf(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Dp(s,!0):Dp(e.stateNode,!1)}catch(t){gf(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&hu(e,t);break;default:hu(e,t)}}function _u(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:gu(n,r);break a;case 22:n.memoizedState===null&&_u(n,r);break a;default:_u(n,r)}}e=e.sibling}}function vu(e){var t=e.alternate;t!==null&&(e.alternate=null,vu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&At(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var yu=null,bu=!1;function xu(e,t,n){for(n=n.child;n!==null;)Su(e,t,n),n=n.sibling}function Su(e,t,n){if(Xe&&typeof Xe.onCommitFiberUnmount==`function`)try{Xe.onCommitFiberUnmount(Ye,n)}catch{}switch(n.tag){case 26:ru||wl(n,t),xu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!ru&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ru||wl(n,t),Dl(n);var r=yu,i=bu;Tp(n.type)&&(yu=n.stateNode,bu=!1),xu(e,t,n),ym(n.stateNode,n.type,n.memoizedProps),yu=r,bu=i;break;case 5:ru||wl(n,t),Dl(n);case 6:if(n.tag===6&&Dl(n),r=yu,i=bu,yu=null,xu(e,t,n),yu=r,bu=i,yu!==null){if(bu)try{(yu.nodeType===9?yu.body:yu.nodeName===`HTML`?yu.ownerDocument.body:yu).removeChild(n.stateNode),V=!0}catch(e){gf(n,t,e)}else try{yu.removeChild(n.stateNode),V=!0}catch(e){gf(n,t,e)}}break;case 18:yu!==null&&(bu?(e=yu,Ep(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Uh(e)):Ep(yu,n.stateNode));break;case 4:r=yu,i=bu,yu=n.stateNode.containerInfo,bu=!0,xu(e,t,n),yu=r,bu=i;break;case 0:case 11:case 14:case 15:bl(2,n,t),ru||bl(4,n,t),xu(e,t,n);break;case 1:ru||(wl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Sl(n,t,r)),xu(e,t,n);break;case 21:xu(e,t,n);break;case 22:ru=(r=ru)||n.memoizedState!==null,xu(e,t,n),ru=r;break;case 30:wl(n,t),xu(e,t,n);break;case 7:ru||wl(n,t),xu(e,t,n);break;default:xu(e,t,n)}}function Cu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Uh(e)}catch(e){gf(t,t.return,e)}}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Uh(e)}catch(e){gf(t,t.return,e)}}function Tu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ou),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ou),t;default:throw Error(i(435,e.tag))}}function Eu(e,t){var n=Tu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=xf.bind(null,e,t);t.then(r,r)}})}function Du(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Tp(l.type)){yu=l.stateNode,bu=!1;break a}break;case 5:yu=l.stateNode,bu=!1;break a;case 3:case 4:yu=l.stateNode.containerInfo,bu=!0;break a}l=l.return}if(yu===null)throw Error(i(160));Su(s,c,o),yu=null,bu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ku(t,e,n),t=t.sibling}var Ou=null;function ku(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Du(t,e,n),Au(e),a&4&&(bl(3,e,e.return),yl(3,e),bl(5,e,e.return));break;case 1:Du(t,e,n),Au(e),a&512&&(ru||r===null||wl(r,r.return)),a&64&&nu&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Ou,Du(t,e,n),Au(e),a&512&&(ru||r===null||wl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(nu)e.stateNode=hp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Ot]||r[St]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),ap(r,t,n),r[St]=e,Ft(r),t=r;break a;case`link`:if(o=Jm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),ap(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Jm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),ap(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[St]=e,Ft(r),t=r}e.stateNode=t}}else nu||Ym(o,e.type,e.stateNode)}else e.stateNode=Um(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&jl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||ru||t.parentNode.removeChild(t)):a.count--,n===null?nu||Ym(o,e.type,e.stateNode):Um(o,n,e.memoizedProps))}break;case 27:Du(t,e,n),Au(e),a&512&&(ru||r===null||wl(r,r.return)),r!==null&&a&4&&jl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=iu,iu=!1,Du(t,e,n),iu=o,Au(e),a&512&&(ru||r===null||wl(r,r.return)),e.flags&32){t=e.stateNode;try{cn(t,``),V=!0}catch(t){gf(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,jl(e,t,r===null?t:r.memoizedProps)),a&1024&&(au=!0);break;case 6:if(Du(t,e,n),Au(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,V=!0}catch(t){gf(e,e.return,t)}}break;case 3:if(V=!1,qm=null,o=Ou,Ou=Cm(t.containerInfo),Du(t,e,n),Ou=o,Au(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Uh(t.containerInfo)}catch(t){gf(e,e.return,t)}au&&(au=!1,ju(e)),V=!1;break;case 4:a=iu,iu=nu,r=Wt(),o=Ou,Ou=Cm(e.stateNode.containerInfo),Du(t,e,n),Au(e),Ou=o,V&&lu&&(uu=!0),V=r,iu=a;break;case 12:Du(t,e,n),Au(e);break;case 31:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 13:Du(t,e,n),Au(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(gd=Be()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=nu,l=ru,u=iu;nu=c||o,iu=u||o,ru=l||s,Du(t,e,n),ru=l,iu=u,nu=c,Au(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||nu||ru||(t=s||ru,n=nu,r=ru,nu=o||nu,ru=t,Fu(e,2),nu=n,ru=r),!o&&iu||hu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Eu(e,n))));break;case 19:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 30:a&512&&(ru||r===null||wl(r,r.return)),a=Wt(),o=lu,s=(n&335544064)===n,c=e.memoizedProps,lu=s&&_i(c.default,c.update)!==`none`,Du(t,e,n),Au(e),s&&r!==null&&V&&(e.flags|=4),lu=o,V=a;break;case 21:break;case 7:a&512&&(ru||r===null||wl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Du(t,e,n),Au(e)}}function Au(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ml(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(kl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Ol(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Fl(e,Nl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(cn(l,``),n.flags&=-33),Fl(e,Nl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Pl(e,Nl(e),u,s);break;default:throw Error(i(161))}}catch(t){gf(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ju(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ju(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,yh=!0,t.reset(),yh=!1),e=e.sibling}}function Mu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Nu(t,e),t=t.sibling;else tu(t,!1)}function Nu(e,t){var n=e.alternate;if(n===null)ql(e,!1);else switch(e.tag){case 3:if(du=cu=!1,Vl(),Mu(t,e),!cu&&!uu){if(e=Bl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];kp(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),du=!0}Bl=null;break;case 5:Mu(t,e);break;case 4:r=cu,cu=!1,Mu(t,e),cu&&(uu=!0),cu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Mu(t,e):ql(e,!1));break;case 30:r=cu,i=Vl(),cu=!1,Mu(t,e),cu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=hi(a,o),o=hi(n.memoizedProps,o);var s=_i(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Hl=0,t=eu(e,n,t,o,s,a,!0),Hl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Fd(e,e.memoizedProps.onUpdate),Bl=i):i!==null&&(i.push.apply(i,Bl),Bl=i),cu=e.flags&32?!0:r;break;default:Mu(t,e)}}function Pu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)mu(e,t.alternate,t),t=t.sibling}function Fu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:bl(4,n,n.return),Fu(n,r);break;case 1:wl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Sl(n,n.return,i),Fu(n,r);break;case 27:r&2&&ym(n.stateNode,n.type,n.memoizedProps);case 5:wl(n,n.return),n.tag!==5&&n.tag!==27||Dl(n),Fu(n,r);break;case 6:Dl(n);break;case 26:wl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||ru||i.parentNode.removeChild(i),Fu(n,r);break;case 22:n.memoizedState===null&&Fu(n,r);break;case 30:wl(n,n.return),Fu(n,r);break;case 7:wl(n,n.return);default:Fu(n,r)}e=e.sibling}}function Iu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Iu(i,a,n),yl(4,a);break;case 1:if(Iu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){gf(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)xo(l[i],c)}catch(e){gf(r,r.return,e)}}s&&o&64&&xl(a),Cl(a,a.return);break;case 27:n&2&&Il(a);case 5:a.tag!==5&&a.tag!==27||El(a),Iu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 6:El(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||nu||Ym(Cm(c.ownerDocument),a.type,c),Iu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 12:Iu(i,a,n);break;case 31:Iu(i,a,n),s&&o&4&&Cu(i,a);break;case 13:Iu(i,a,n),s&&o&4&&wu(i,a);break;case 22:a.memoizedState===null&&Iu(i,a,n),Cl(a,a.return);break;case 30:Iu(i,a,n),Cl(a,a.return);break;case 7:Cl(a,a.return);default:Iu(i,a,n)}t=t.sibling}}function Lu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Aa(n))}function Ru(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Aa(e))}function zu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Bu(e,t,n,r),t=t.sibling;else i&&$l(t)}function Bu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Ql(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:zu(e,t,n,r),a&2048&&yl(9,t);break;case 1:zu(e,t,n,r);break;case 3:zu(e,t,n,r),i&&du&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Aa(a)));break;case 12:if(a&2048){zu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){gf(t,t.return,e)}}else zu(e,t,n,r);break;case 31:zu(e,t,n,r);break;case 13:zu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&Ql(t),o._visibility&2?zu(e,t,n,r):(o._visibility|=2,Vu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&Ql(s),o._visibility&2?zu(e,t,n,r):Hu(e,t)),a&2048&&Lu(s,t);break;case 24:zu(e,t,n,r),a&2048&&Ru(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Gl(a.child,!0),Gl(t.child,!0))),zu(e,t,n,r);break;default:zu(e,t,n,r)}}function Vu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Vu(a,o,s,c,i),yl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Vu(a,o,s,c,i)):u._visibility&2?Vu(a,o,s,c,i):Hu(a,o),i&&l&2048&&Lu(o.alternate,o);break;case 24:Vu(a,o,s,c,i),i&&l&2048&&Ru(o.alternate,o);break;default:Vu(a,o,s,c,i)}t=t.sibling}}function Hu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Hu(n,r),i&2048&&Lu(r.alternate,r);break;case 24:Hu(n,r),i&2048&&Ru(r.alternate,r);break;default:Hu(n,r)}t=t.sibling}}var Uu=8192;function Wu(e,t,n){if(e.subtreeFlags&Uu)for(e=e.child;e!==null;)Gu(e,t,n),e=e.sibling}function Gu(e,t,n){switch(e.tag){case 26:Wu(e,t,n),e.flags&Uu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&eh(n,e)):th(n,Ou,e.memoizedState,e.memoizedProps));break;case 5:Wu(e,t,n),e.flags&Uu&&(e=e.stateNode,(t&335544128)===t&&eh(n,e));break;case 3:case 4:var r=Ou;Ou=Cm(e.stateNode.containerInfo),Wu(e,t,n),Ou=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Uu,Uu=16777216,Wu(e,t,n),Uu=r):Wu(e,t,n));break;case 30:if((e.flags&Uu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Rl===null&&(Rl=new Map),Rl.set(r,i)}Wu(e,t,n);break;default:Wu(e,t,n)}}function Ku(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,Xu(r,e)}Ku(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ju(e),e=e.sibling}function Ju(e){switch(e.tag){case 0:case 11:case 15:qu(e),e.flags&2048&&bl(9,e,e.return);break;case 3:qu(e);break;case 12:qu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Yu(e)):qu(e);break;default:qu(e)}}function Yu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,Xu(r,e)}Ku(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:bl(8,t,t.return),Yu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Yu(t));break;default:Yu(t)}e=e.sibling}}function Xu(e,t){for(;su!==null;){var n=su;switch(n.tag){case 0:case 11:case 15:bl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Aa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,su=r;else a:for(n=e;su!==null;){r=su;var i=r.sibling,a=r.return;if(vu(r),r===n){su=null;break a}if(i!==null){i.return=a,su=i;break a}su=a}}}var Zu={getCacheForType:function(e){var t=Ca(U),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ca(U).controller.signal}},Qu=typeof WeakMap==`function`?WeakMap:Map,$u=0,ed=null,q=null,J=0,td=0,nd=null,rd=!1,id=!1,ad=!1,od=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=0,pd=null,md=null,hd=!1,gd=0,_d=0,vd=1/0,yd=null,bd=null,xd=0,Sd=null,Cd=null,wd=0,Td=0,Ed=null,Dd=null,Od=null,kd=null,Ad=null,jd=0,Md=null;function Nd(){return $u&2&&J!==0?J&-J:I.T===null?yt():If()}function Pd(){if(dd===0){if(!(J&536870912)||H){var e=rt;rt<<=1,!(rt&3932160)&&(rt=262144),dd=e}else dd=536870912}return e=Oo.current,e!==null&&(e.flags|=32),dd}function Fd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Lp(hi(e.memoizedProps,n))),kd===null&&(kd=[]),kd.push(t.bind(null,r))}}function Id(e,t,n){(e===ed&&(td===2||td===9)||e.cancelPendingCommit!==null)&&(Ud(e,0),Bd(e,J,dd,!1)),ft(e,n),$u&2&&e===ed||(e===ed&&(!($u&2)&&(ld|=n),sd===4&&Bd(e,J,dd,!1)),kf(e))}function Ld(e,t,n){if($u&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||st(e,t),a=r?Zd(e,t):Yd(e,t,!0),o=r;do{if(a===0){id&&!r&&Bd(e,t,0,!1);break}if(n=e.current.alternate,o&&!zd(n))a=Yd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=pd;var l=c.current.memoizedState.isDehydrated;if(l&&(Ud(c,s).flags|=256),s=Yd(c,s,!1),s!==2&&s!==6){if(ad&&!l){c.errorRecoveryDisabledLanes|=o,ld|=o,a=4;break a}o=md,md=a,o!==null&&(md===null?md=o:md.push.apply(md,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Ud(e,0),Bd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Bd(r,t,dd,!rd);break a;case 2:md=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=gd+300-Be(),10<a)){if(Bd(r,t,dd,!rd),ot(r,0,!0)!==0)break a;wd=t,r.timeoutHandle=yp(Rd.bind(null,r,n,md,yd,hd,t,dd,ld,fd,rd,o,`Throttled`,-0,0),a);break a}Rd(r,n,md,yd,hd,t,dd,ld,fd,rd,o,null,-0,0)}break}}while(1);kf(e)}function Rd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:gn},Rl=null,Gu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=ah.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?gd-Be():(a&4194048)===a?_d-Be():0,m=rh(d,m),m!==null)?(wd=a,e.cancelPendingCommit=m(af.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Bd(e,a,o,!l)):af(e,t,a,n,r,i,o,s,c,l,u,d)}function zd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!zr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Bd(e,t,n,r){t=ct(e,t),t&=~ud,t&=~ld,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&mt(e,n,t)}function Vd(){return $u&6?!0:(Af(0,!1),!1)}function Hd(){if(q!==null){if(td===0)var e=q.return;else e=q,ha=ma=null,rs(e),no=null,ro=0,e=q;for(;e!==null;)vl(e.alternate,e),e=e.return;q=null}}function Ud(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,bp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),wd=0,Hd(),ed=e,q=n=Mi(e.current,null),J=t,td=0,nd=null,rd=!1,id=st(e,t),ad=!1,fd=dd=ud=ld=cd=sd=0,md=pd=null,hd=!1,od=ct(e,t),Si(),n}function Wd(e,t){W=null,I.H=fc,t===Ka||t===Ja?(t=eo(),td=3):t===qa?(t=eo(),td=4):td=t===kc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,nd=t,q===null&&(sd=1,Cc(e,Bi(t,e.current)))}function Gd(){var e=Oo.current;return e===null?!0:(J&4194048)===J?ko===null:(J&62914560)===J||J&536870912?e===ko:!1}function Kd(){var e=I.H;return I.H=fc,e===null?fc:e}function qd(){var e=I.A;return I.A=Zu,e}function Jd(){sd=4,rd||(J&4194048)!==J&&Oo.current!==null||(id=!0),!(cd&134217727)&&!(ld&134217727)||ed===null||Bd(ed,J,dd,!1)}function Yd(e,t,n){var r=$u;$u|=2;var i=Kd(),a=qd();(ed!==e||J!==t)&&(yd=null,Ud(e,t)),t=!1;var o=sd;a:do try{if(td!==0&&q!==null){var s=q,c=nd;switch(td){case 8:Hd(),o=6;break a;case 3:case 2:case 9:case 6:Oo.current===null&&(t=!0);var l=td;if(td=0,nd=null,tf(e,s,c,l),n&&id){o=0;break a}break;default:l=td,td=0,nd=null,tf(e,s,c,l)}}Xd(),o=sd;break}catch(t){Wd(e,t)}while(1);return t&&e.shellSuspendCounter++,ha=ma=null,$u=r,I.H=i,I.A=a,q===null&&(ed=null,J=0,Si()),o}function Xd(){for(;q!==null;)$d(q)}function Zd(e,t){var n=$u;$u|=2;var r=Kd(),a=qd();ed!==e||J!==t?(yd=null,vd=Be()+500,Ud(e,t)):id=st(e,t);a:do try{if(td!==0&&q!==null){t=q;var o=nd;b:switch(td){case 1:td=0,nd=null,tf(e,t,o,1);break;case 2:case 9:if(Xa(o)){td=0,nd=null,ef(t);break}t=function(){td!==2&&td!==9||ed!==e||(td=7),kf(e)},o.then(t,t);break a;case 3:td=7;break a;case 4:td=5;break a;case 7:Xa(o)?(td=0,nd=null,ef(t)):(td=0,nd=null,tf(e,t,o,7));break;case 5:var s=null;switch(q.tag){case 26:s=q.memoizedState;case 5:case 27:var c=q;if(s?Qm(s):c.stateNode.complete){td=0,nd=null;var l=c.sibling;if(l!==null)q=l;else{var u=c.return;u===null?q=null:(q=u,nf(u))}break b}}td=0,nd=null,tf(e,t,o,5);break;case 6:td=0,nd=null,tf(e,t,o,6);break;case 8:Hd(),sd=6;break a;default:throw Error(i(462))}}Qd();break}catch(t){Wd(e,t)}while(1);return ha=ma=null,I.H=r,I.A=a,$u=n,q===null?(ed=null,J=0,Si(),sd):0}function Qd(){for(;q!==null&&!Re();)$d(q)}function $d(e){var t=ll(e.alternate,e,od);e.memoizedProps=e.pendingProps,t===null?nf(e):q=t}function ef(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Uc(n,t,t.pendingProps,t.type,void 0,J);break;case 11:t=Uc(n,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:rs(t);var r=t;r===ta&&(H?(ca(r),r.tag===5&&r.stateNode!=null&&(na=r.stateNode)):(ca(r),H=!0));default:vl(n,t),t=q=Ni(t,od),t=ll(n,t,od)}e.memoizedProps=e.pendingProps,t===null?nf(e):q=t}function tf(e,t,n,r){ha=ma=null,rs(t),no=null,ro=0;var i=t.return;try{if(Oc(e,i,t,n,J)){sd=1,Cc(e,Bi(n,e.current)),q=null;return}}catch(t){if(i!==null)throw q=i,t;sd=1,Cc(e,Bi(n,e.current)),q=null;return}t.flags&32768?(H||r===1?e=!0:id||J&536870912?e=!1:(rd=e=!0,(r===2||r===9||r===3||r===6)&&(r=Oo.current,r!==null&&r.tag===13&&(r.flags|=16384))),rf(t,e)):nf(t)}function nf(e){var t=e;do{if(t.flags&32768){rf(t,rd);return}e=t.return;var n=gl(t.alternate,t,od);if(n!==null){q=n;return}if(t=t.sibling,t!==null){q=t;return}q=t=e}while(t!==null);sd===0&&(sd=5)}function rf(e,t){do{var n=_l(e.alternate,e);if(n!==null){n.flags&=32767,q=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){q=e;return}q=e=n}while(e!==null);sd=6,q=null}function af(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do pf();while(xd!==0);if($u&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===ed&&(q=ed=null,J=0),Cd=t,Sd=e,wd=n,Ed=a,Dd=r,of(e,t,n,s,c,l,f)}}function of(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Td=s,s|=xi,pt(e,n,s,r,i,a),kd=null,(n&335544064)===n?(Ad=Na(e),r=10262):(Ad=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,Sf(We,function(){return mf(),null})):(e.callbackNode=null,e.callbackPriority=0),Ll=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=I.T,I.T=null,i=L.p,L.p=2,a=$u,$u|=4;try{fu(e,t,n)}finally{$u=a,L.p=i,I.T=r}}xd=1,Ll?Od=Fp(o,e.containerInfo,Ad,lf,uf,cf,df,mf,sf,null,null):(lf(),uf(),df())}function sf(e){if(xd!==0){var t=Sd.onRecoverableError;t(e,{componentStack:null})}}function cf(){xd===3&&(xd=0,Nu(Cd,Sd),xd=4)}function lf(){if(xd===1){xd=0;var e=Sd,t=Cd,n=wd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=I.T,I.T=null;var i=L.p;L.p=2;var a=$u;$u|=4;try{lu=uu=!1,ku(t,e,n),n=dp;var o=Gr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Wr(s.ownerDocument.documentElement,s)){if(c!==null&&Kr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Ur(s,h),v=Ur(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}yh=!!up,dp=up=null}finally{$u=a,L.p=i,I.T=r}}e.current=t,xd=2}}function uf(){if(xd===2){xd=0;var e=Sd,t=Cd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=I.T,I.T=null;var r=L.p;L.p=2;var i=$u;$u|=4;try{mu(e,t.alternate,t)}finally{$u=i,L.p=r,I.T=n}}xd=3}}function df(){if(xd===4||xd===3){xd=0;var e=Od;Od=null,ze();var t=Sd,n=Cd,r=wd,i=Dd,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?xd=5:(xd=0,Cd=Sd=null,ff(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(bd=null),vt(r),n=n.stateNode,Xe&&typeof Xe.onCommitFiberRoot==`function`)try{Xe.onCommitFiberRoot(Ye,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=I.T,a=L.p,L.p=2,I.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{I.T=n,L.p=a}}if(i=kd,o=Ad,Ad=null,i!==null&&(kd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);wd&3&&pf(),kf(t),a=t.pendingLanes,r&261930&&a&42?t===Md?jd++:(jd=0,Md=t):(jd=0,Md=null),Af(0,!1)}}function ff(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Aa(t)))}function pf(){return Od!==null&&(Od.skipTransition(),Od=null),lf(),uf(),df(),mf()}function mf(){if(xd!==5)return!1;var e=Sd,t=Td;Td=0;var n=vt(wd),r=I.T,a=L.p;try{L.p=32>n?32:n,I.T=null,n=Ed,Ed=null;var o=Sd,s=wd;if(xd=0,Cd=Sd=null,wd=0,$u&6)throw Error(i(331));var c=$u;if($u|=4,Ju(o.current),Bu(o,o.current,s,n),$u=c,Af(0,!1),Xe&&typeof Xe.onPostCommitFiberRoot==`function`)try{Xe.onPostCommitFiberRoot(Ye,o)}catch{}return!0}finally{L.p=a,I.T=r,ff(e,t)}}function hf(e,t,n){t=Bi(n,t),t=Tc(e.stateNode,t,2),e=ho(e,t,2),e!==null&&(ft(e,2),kf(e))}function gf(e,t,n){if(e.tag===3)hf(e,e,n);else for(;t!==null;){if(t.tag===3){hf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(bd===null||!bd.has(r))){e=Bi(n,e),n=Ec(2),r=ho(t,n,2),r!==null&&(Dc(n,r,t,e),ft(r,2),kf(r));break}}t=t.return}}function _f(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Qu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ad=!0,i.add(n),e=vf.bind(null,e,t,n),t.then(e,e))}function vf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ed===e&&(J&n)===n&&(sd===4||sd===3&&(J&62914560)===J&&300>Be()-gd?$u&2?ud|=n:Ud(e,0):ud|=n,fd===J&&(fd=0)),kf(e)}function yf(e,t){t===0&&(t=ut()),e=Ti(e,t),e!==null&&(ft(e,t),kf(e))}function bf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),yf(e,n)}function xf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),yf(e,n)}function Sf(e,t){return Ie(e,t)}var Cf=null,wf=null,Tf=!1,Ef=!1,Df=!1,Of=0;function kf(e){e!==wf&&e.next===null&&(wf===null?Cf=wf=e:wf=wf.next=e),Ef=!0,Tf||(Tf=!0,Ff())}function Af(e,t){if(!Df&&Ef){Df=!0;do for(var n=!1,r=Cf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Pf(r,a))}else a=J,a=ot(r,r===ed?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||st(r,a)||(n=!0,Pf(r,a))}r=r.next}while(n);Df=!1}}function jf(){Mf()}function Mf(){Ef=Tf=!1;var e=0;Of!==0&&vp()&&(e=Of);for(var t=Be(),n=null,r=Cf;r!==null;){var i=r.next,a=Y(r,t);a===0?(r.next=null,n===null?Cf=i:n.next=i,i===null&&(wf=n)):(n=r,(e!==0||a&3)&&(Ef=!0)),r=i}xd!==0&&xd!==5||Af(e,!1),Of!==0&&(Of=0)}function Y(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=lt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=ed,n=J,n=ot(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(td===2||td===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Le(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||st(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Le(r),vt(n)){case 2:case 8:n=Ue;break;case 32:n=We;break;case 268435456:n=Ke;break;default:n=We}return r=Nf.bind(null,e),n=Ie(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Le(r),e.callbackPriority=2,e.callbackNode=null,2}function Nf(e,t){if(xd!==0&&xd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(pf()&&e.callbackNode!==n)return null;var r=J;return r=ot(e,e===ed?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Ld(e,r,t),Y(e,Be()),e.callbackNode!=null&&e.callbackNode===n?Nf.bind(null,e):null)}function Pf(e,t){if(pf())return null;Ld(e,t,!0)}function Ff(){Cp(function(){$u&6?Ie(He,jf):Mf()})}function If(){if(Of===0){var e=Ia;e===0&&(e=nt,nt<<=1,!(nt&261888)&&(nt=256)),Of=e}return Of}function Lf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:hn(e)}function Rf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Lf((i[Ct]||null).action),o=r.submitter;o&&(t=(t=o[Ct]||null)?Lf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Ln(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Of!==0){var e=new FormData(i,o);Qs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Qs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var zf=0;zf<fi.length;zf++){var Bf=fi[zf];pi(Bf.toLowerCase(),`on`+(Bf[0].toUpperCase()+Bf.slice(1)))}pi(ii,`onAnimationEnd`),pi(ai,`onAnimationIteration`),pi(oi,`onAnimationStart`),pi(`dblclick`,`onDoubleClick`),pi(`focusin`,`onFocus`),pi(`focusout`,`onBlur`),pi(si,`onTransitionRun`),pi(ci,`onTransitionStart`),pi(li,`onTransitionCancel`),pi(ui,`onTransitionEnd`),zt(`onMouseEnter`,[`mouseout`,`mouseover`]),zt(`onMouseLeave`,[`mouseout`,`mouseover`]),zt(`onPointerEnter`,[`pointerout`,`pointerover`]),zt(`onPointerLeave`,[`pointerout`,`pointerover`]),Rt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Rt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Rt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Rt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Rt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Rt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Vf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Hf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Vf));function Uf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){vi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){vi(e)}i.currentTarget=null,a=c}}}}function X(e,t){var n=t[wt];n===void 0&&(n=t[wt]=new Set);var r=e+`__bubble`;n.has(r)||(qf(t,e,2,!1),n.add(r))}function Wf(e,t,n){var r=0;t&&(r|=4),qf(n,e,r,t)}var Gf=`_reactListening`+Math.random().toString(36).slice(2);function Kf(e){if(!e[Gf]){e[Gf]=!0,B.forEach(function(t){t!==`selectionchange`&&(Hf.has(t)||Wf(t,!1,e),Wf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gf]||(t[Gf]=!0,Wf(`selectionchange`,!1,t))}}function qf(e,t,n,r){switch(Th(t)){case 2:var i=Z;break;case 8:i=bh;break;default:i=xh}n=i.bind(null,t,n,e),i=void 0,!En||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Jf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=jt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Cn(function(){var r=a,i=vn(n),s=[];a:{var c=di.get(e);if(c!==void 0){var l=Ln,u=e;switch(e){case`keypress`:if(Mn(n)===0)break a;case`keydown`:case`keyup`:l=tr;break;case`focusin`:u=`focus`,l=Kn;break;case`focusout`:u=`blur`,l=Kn;break;case`beforeblur`:case`afterblur`:l=Kn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Wn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Gn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=ir;break;case ii:case ai:case oi:l=qn;break;case ui:l=ar;break;case`scroll`:case`scrollend`:l=zn;break;case`wheel`:l=or;break;case`copy`:case`cut`:case`paste`:l=Jn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=nr;break;case`submit`:l=rr;break;case`toggle`:case`beforetoggle`:l=sr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=wn(m,p),g!=null&&d.push(Yf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==_n&&(u=n.relatedTarget||n.fromElement)&&(jt(u)||u[z]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?jt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Wn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=nr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Nt(c),h=l==null?u:Nt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,jt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Zf):null,c!==null&&Qf(s,u,c,d,!1),l!==null&&f!==null&&Qf(s,f,l,d,!0)))}a:{if(c=r?Nt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Dr;else if(xr(c)){if(Or)_=Lr;else{_=Fr;var v=Pr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&fn(r.elementType)&&(_=Dr):_=Ir;if(_&&=_(e,r)){Sr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Nt(r):window,e){case`focusin`:(xr(v)||v.contentEditable===`true`)&&(Jr=v,Yr=r,Xr=null);break;case`focusout`:Xr=Yr=Jr=null;break;case`mousedown`:Zr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Zr=!1,Qr(s,n,i);break;case`selectionchange`:if(qr)break;case`keydown`:case`keyup`:Qr(s,n,i)}var y;if(lr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else _r?hr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(fr&&n.locale!==`ko`&&(_r||b!==`onCompositionStart`?b===`onCompositionEnd`&&_r&&(y=jn()):(On=i,kn=`value`in On?On.value:On.textContent,_r=!0)),v=Xf(r,b),0<v.length&&(b=new Yn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=gr(n),y!==null&&(b.data=y)))),(y=dr?vr(e,n):yr(e,n))&&(b=Xf(r,`onBeforeInput`),0<b.length&&(v=new Yn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),Rf(s,e,r,n,i)}Uf(s,t)})}function Yf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Xf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=wn(e,n),i!=null&&r.unshift(Yf(e,i,a)),i=wn(e,t),i!=null&&r.push(Yf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Zf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Qf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=wn(n,a),l!=null&&o.unshift(Yf(n,l,c))):i||(l=wn(n,a),l!=null&&o.push(Yf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var $f=/\r\n?/g,ep=/\u0000|\uFFFD/g;function tp(e){return(typeof e==`string`?e:``+e).replace($f,`
`).replace(ep,``)}function np(e,t){return t=tp(t),tp(e)===t}function rp(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||cn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&cn(e,``+r);else return;break;case`className`:Kt(e,`class`,r);break;case`tabIndex`:Kt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Kt(e,n,r);break;case`style`:dn(e,r,o);return;case`data`:if(t!==`object`){Kt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=hn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&rp(e,t,`name`,a.name,a,null),rp(e,t,`formEncType`,a.formEncType,a,null),rp(e,t,`formMethod`,a.formMethod,a,null),rp(e,t,`formTarget`,a.formTarget,a,null)):(rp(e,t,`encType`,a.encType,a,null),rp(e,t,`method`,a.method,a,null),rp(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=hn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=gn);return;case`onScroll`:r!=null&&X(`scroll`,e);return;case`onScrollEnd`:r!=null&&X(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=hn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:X(`beforetoggle`,e),X(`toggle`,e),Gt(e,`popover`,r);break;case`xlinkActuate`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Gt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=pn.get(n)||n,Gt(e,n,r);else return}V=!0}function ip(e,t,n,r,a,o){switch(n){case`style`:dn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)cn(e,r);else if(typeof r==`number`||typeof r==`bigint`)cn(e,``+r);else return;break;case`onScroll`:r!=null&&X(`scroll`,e);return;case`onScrollEnd`:r!=null&&X(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=gn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Lt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Ct]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}V=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Gt(e,n,r)}return}V=!0}function ap(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:X(`error`,e),X(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:rp(e,t,o,s,n,null)}}a&&rp(e,t,`srcSet`,n.srcSet,n,null),r&&rp(e,t,`src`,n.src,n,null);return;case`input`:X(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:rp(e,t,r,d,n,null)}}nn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in X(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:rp(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&an(e,!!r,n,!0):an(e,!!r,t,!1);return;case`textarea`:for(s in X(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:rp(e,t,s,c,n,null)}sn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:rp(e,t,l,r,n,null)}return;case`dialog`:X(`beforetoggle`,e),X(`toggle`,e),X(`cancel`,e),X(`close`,e);break;case`iframe`:case`object`:X(`load`,e);break;case`video`:case`audio`:for(r=0;r<Vf.length;r++)X(Vf[r],e);break;case`image`:X(`error`,e),X(`load`,e);break;case`details`:X(`toggle`,e);break;case`embed`:case`source`:case`link`:X(`error`,e),X(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:rp(e,t,u,r,n,null)}return;default:if(fn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&ip(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&rp(e,t,c,r,n,null))}var op={};function sp(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||rp(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(V=!0),o=m;break;case`name`:m!==f&&(V=!0),a=m;break;case`checked`:m!==f&&(V=!0),u=m;break;case`defaultChecked`:m!==f&&(V=!0),d=m;break;case`value`:m!==f&&(V=!0),s=m;break;case`defaultValue`:m!==f&&(V=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&rp(e,t,p,m,r,f)}}tn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||rp(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(V=!0),p=o;break;case`defaultValue`:o!==l&&(V=!0),c=o;break;case`multiple`:o!==l&&(V=!0),s=o;default:o!==l&&rp(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?an(e,!!n,n?[]:``,!1):an(e,!!n,t,!0)):an(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:rp(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(V=!0),p=a;break;case`defaultValue`:a!==o&&(V=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&rp(e,t,s,a,r,o)}on(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:rp(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(V=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:rp(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&rp(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:rp(e,t,u,p,r,m)}return;default:if(fn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&ip(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||ip(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&rp(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||rp(e,t,f,p,r,m)}function cp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function lp(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&cp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&cp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var up=null,dp=null;function fp(e){return e.nodeType===9?e:e.ownerDocument}function pp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function mp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function hp(e,t,n,r){return n=fp(n).createElement(e),n[St]=r,n[Ct]=t,ap(n,e,t),Ft(n),n}function gp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var _p=null;function vp(){var e=window.event;return e&&e.type===`popstate`?e!==_p&&(_p=e,!0):(_p=null,!1)}var yp=typeof setTimeout==`function`?setTimeout:void 0,bp=typeof clearTimeout==`function`?clearTimeout:void 0,xp=typeof Promise==`function`?Promise:void 0,Sp=typeof requestAnimationFrame==`function`?requestAnimationFrame:yp,Cp=typeof queueMicrotask==`function`?queueMicrotask:xp===void 0?yp:function(e){return xp.resolve(null).then(e).catch(wp)};function wp(e){setTimeout(function(){throw e})}function Tp(e){return e===`head`}function Ep(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Uh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)bm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,bm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ot]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&bm(e.ownerDocument.body)}n=i}while(n);Uh(t)}function Dp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Op(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function kp(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Ap(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function jp(e){return Ap(e.getBoundingClientRect(),getComputedStyle(e),e)}function Mp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Ap(t,n,e)}function Np(e){return e.documentElement.clientHeight}function Pp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Fp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Np(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=$m(f),u>nh){s.length=o;break}f=new Promise(Pp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Ip(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Ip.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Ip.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Ip.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Lp(e){return{name:e,group:new Ip(`group`,e),imagePair:new Ip(`image-pair`,e),old:new Ip(`old`,e),new:new Ip(`new`,e)}}function Rp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Rp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Up(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Vp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,zp,e,s,r)}this._eventListeners=a}};function zp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Rp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Up(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Vp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Bp,e,n,i),r.splice(t,1),a!==null&&a()}};function Bp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Vp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Hp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Up(e,t,n,r){if(e.length===0)return-1;r=Hp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Hp(a.optionsOrUseCapture)===r)return i}return-1}Rp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Vp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Vp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Rp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag!==6&&(e=b(e),gm(e,t))}Rp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Gp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Wp(t[n],e);n--);};function Gp(e,t){return t.push(e),!1}Rp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=fp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,Kp,e,void 0,void 0))};function Kp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Rp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,qp,e,void 0,void 0)};function qp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Rp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Jp,e,void 0,void 0);for(var n=t=0;n<Yp.length;n++){var r=Yp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Yp[t++]=r}Yp.length=t}};function Jp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Yp=[],Xp=!1;function Zp(e,t,n){Yp.push({fragmentInstance:e,observer:t,instance:n}),Xp||(Xp=!0,_m(function(){Xp=!1;var e=Yp;Yp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Rp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,Qp,e,void 0,void 0),e};function Qp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Rp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Rp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Gp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||$p(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function $p(e,t,n,r,i){var a=jt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function em(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Rp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Gp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),em(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),em(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function tm(e,t){return e=b(e),nm(e,t),!1}function nm(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function rm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Vp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Yp.length;i++){var a=Yp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Yp[r++]=a)}Yp.length=r,n.observe(e)}),nm(e,t))}function im(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Vp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Zp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function am(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:am(n),At(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function om(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Ot])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=fm(e.nextSibling),e===null)break}return null}function sm(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=fm(e.nextSibling),e===null))return null;return e}function cm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=fm(e.nextSibling),e===null))return null;return e}function lm(e){return e.data===`$?`||e.data===`$~`}function um(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function dm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function fm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var pm=null;function mm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return fm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function hm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function gm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function _m(e){Sp(function(){Sp(function(t){return e(t)})})}function vm(e,t,n){switch(t=fp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function ym(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&rp(e,t,r,null,op,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===gn&&(e.onclick=null),At(e)}function bm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);At(e)}var xm=new Map,Sm=new Set;function Cm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var wm=L.d;L.d={f:Tm,r:Em,D:km,C:Am,L:jm,m:Mm,X:Pm,S:Nm,M:Fm};function Tm(){var e=wm.f(),t=Vd();return e||t}function Em(e){var t=Mt(e);t!==null&&t.tag===5&&t.type===`form`?ec(t):wm.r(e)}var Dm=typeof document>`u`?null:document;function Om(e,t,n){var r=Dm;if(r&&typeof t==`string`&&t){var i=en(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Sm.has(i)||(Sm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),ap(t,`link`,e),Ft(t),r.head.appendChild(t)))}}function km(e){wm.D(e),Om(`dns-prefetch`,e,null)}function Am(e,t){wm.C(e,t),Om(`preconnect`,e,t)}function jm(e,t,n){wm.L(e,t,n);var r=Dm;if(r&&e&&t){var i=`link[rel="preload"][as="`+en(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+en(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+en(n.imageSizes)+`"]`)):i+=`[href="`+en(e)+`"]`;var a=i;switch(t){case`style`:a=Lm(e);break;case`script`:a=Vm(e)}if(!(xm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),xm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Rm(a))||t===`script`&&r.querySelector(Hm(a))))){var o=r.createElement(`link`);ap(o,`link`,e),t===`style`&&(o[kt]=!0,o.onload=o.onerror=function(){It(o)}),Ft(o),r.head.appendChild(o)}}}function Mm(e,t){wm.m(e,t);var n=Dm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+en(r)+`"][href="`+en(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Vm(e)}if(!xm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),xm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Hm(a)))return}r=n.createElement(`link`),ap(r,`link`,e),Ft(r),n.head.appendChild(r)}}}function Nm(e,t,n){wm.S(e,t,n);var r=Dm;if(r&&e){var i=Pt(r).hoistableStyles,a=Lm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Rm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=xm.get(a))&&Gm(e,n);var c=o=r.createElement(`link`);Ft(c),ap(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Wm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Pm(e,t){wm.X(e,t);var n=Dm;if(n&&e){var r=Pt(n).hoistableScripts,i=Vm(e),a=r.get(i);a||(a=n.querySelector(Hm(i)),a||(e=D({src:e,async:!0},t),(t=xm.get(i))&&Km(e,t),a=n.createElement(`script`),Ft(a),ap(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Fm(e,t){wm.M(e,t);var n=Dm;if(n&&e){var r=Pt(n).hoistableScripts,i=Vm(e),a=r.get(i);a||(a=n.querySelector(Hm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=xm.get(i))&&Km(e,t),a=n.createElement(`script`),Ft(a),ap(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Im(e,t,n,r){var a=(a=Se.current)?Cm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Lm(n.href),t=Pt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Lm(n.href);var o=Pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Rm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=xm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},xm.set(e,o)),Bm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Vm(n),t=Pt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Lm(e){return`href="`+en(e)+`"`}function Rm(e){return`link[rel="stylesheet"][`+e+`]`}function zm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Bm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[kt]){r.loading=1;return}}else t=e.createElement(`link`),t[kt]=!0,t.onload=t.onerror=It.bind(null,t),ap(t,`link`,n),Ft(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Vm(e){return`[src="`+en(e)+`"]`}function Hm(e){return`script[async]`+e}function Um(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+en(n.href)+`"]`);if(r)return t.instance=r,Ft(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ft(r),ap(r,`style`,a),Wm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Lm(n.href);var o=e.querySelector(Rm(a));if(o)return t.state.loading|=4,t.instance=o,Ft(o),o;r=zm(n),(a=xm.get(a))&&Gm(r,a),o=(e.ownerDocument||e).createElement(`link`),Ft(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),ap(o,`link`,r),t.state.loading|=4,Wm(o,n.precedence,e),t.instance=o;case`script`:return o=Vm(n.src),(a=e.querySelector(Hm(o)))?(t.instance=a,Ft(a),a):(r=n,(a=xm.get(o))&&(r=D({},n),Km(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ft(a),ap(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Wm(r,n.precedence,e));return t.instance}function Wm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Gm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Km(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var qm=null;function Jm(e,t,n){if(qm===null){var r=new Map,i=qm=new Map;i.set(n,r)}else i=qm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ot]||a[St]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Ym(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Xm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Zm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Qm(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function $m(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function eh(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=$m(t),e.suspenseyImages.push(t)),e=oh.bind(e),t.decode().then(e,e))}function th(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Lm(r.href),a=t.querySelector(Rm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=ah.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ft(a);return}a=t.ownerDocument||t,r=zm(r),(i=xm.get(i))&&Gm(r,i),a=a.createElement(`link`),Ft(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),ap(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=ah.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var nh=0;function rh(e,t){return e.stylesheets&&e.count===0&&ch(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ch(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&nh===0&&(nh=62500*lp());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ch(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>nh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function ih(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ch(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function ah(){this.count--,ih(this)}function oh(){this.imgCount--,ih(this)}var sh=null;function ch(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,sh=new Map,t.forEach(lh,e),sh=null,ah.call(e))}function lh(e,t){if(!(t.state.loading&4)){var n=sh.get(e);if(n)var r=n.get(null);else{n=new Map,sh.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=ah.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var uh={$$typeof:N,Provider:null,Consumer:null,_currentValue:R,_currentValue2:R,_threadCount:0};function dh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=dt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dt(0),this.hiddenUpdates=dt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function fh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new dh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ai(3,null,null,t),e.current=a,a.stateNode=e,t=ka(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},fo(a),e}function ph(e){return e?(e=Oi,e):Oi}function mh(e,t,n,r,i,a){i=ph(i),r.context===null?r.context=i:r.pendingContext=i,r=mo(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=ho(e,r,t),n!==null&&(Id(n,e,t),go(n,e,t))}function hh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function gh(e,t){hh(e,t),(e=e.alternate)&&hh(e,t)}function _h(e){if(e.tag===13||e.tag===31){var t=Ti(e,67108864);t!==null&&Id(t,e,67108864),gh(e,67108864)}}function vh(e){if(e.tag===13||e.tag===31){var t=Nd();t=_t(t);var n=Ti(e,t);n!==null&&Id(n,e,t),gh(e,t)}}var yh=!0;function Z(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=2,xh(e,t,n,r)}finally{L.p=a,I.T=i}}function bh(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=8,xh(e,t,n,r)}finally{L.p=a,I.T=i}}function xh(e,t,n,r){if(yh){var i=Sh(r);if(i===null)Jf(e,t,r,Ch,n),Nh(e,r);else if(Fh(i,e,t,n,r))r.stopPropagation();else if(Nh(e,r),t&4&&-1<Mh.indexOf(e)){for(;i!==null;){var a=Mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=at(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Qe(o);s.entanglements[1]|=c,o&=~c}kf(a),!($u&6)&&(vd=Be()+500,Af(0,!1))}}break;case 31:case 13:s=Ti(a,2),s!==null&&Id(s,a,2),Vd(),gh(a,2)}if(a=Sh(r),a===null&&Jf(e,t,r,Ch,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Jf(e,t,r,null,n)}}function Sh(e){return e=vn(e),wh(e)}var Ch=null;function wh(e){if(Ch=null,e=jt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ch=e,null}function Th(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ve()){case He:return 2;case Ue:return 8;case We:case Ge:return 32;case Ke:return 268435456;default:return 32}default:return 32}}var Q=!1,Eh=null,Dh=null,Oh=null,kh=new Map,Ah=new Map,jh=[],Mh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Nh(e,t){switch(e){case`focusin`:case`focusout`:Eh=null;break;case`dragenter`:case`dragleave`:Dh=null;break;case`mouseover`:case`mouseout`:Oh=null;break;case`pointerover`:case`pointerout`:kh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:Ah.delete(t.pointerId)}}function Ph(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Mt(t),t!==null&&_h(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Fh(e,t,n,r,i){switch(t){case`focusin`:return Eh=Ph(Eh,e,t,n,r,i),!0;case`dragenter`:return Dh=Ph(Dh,e,t,n,r,i),!0;case`mouseover`:return Oh=Ph(Oh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return kh.set(a,Ph(kh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,Ah.set(a,Ph(Ah.get(a)||null,e,t,n,r,i)),!0}return!1}function Ih(e){var t=jt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,bt(e.priority,function(){vh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,bt(e.priority,function(){vh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Lh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Sh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);_n=r,n.target.dispatchEvent(r),_n=null}else return t=Mt(n),t!==null&&_h(t),e.blockedOn=n,!1;t.shift()}return!0}function Rh(e,t,n){Lh(e)&&n.delete(t)}function zh(){Q=!1,Eh!==null&&Lh(Eh)&&(Eh=null),Dh!==null&&Lh(Dh)&&(Dh=null),Oh!==null&&Lh(Oh)&&(Oh=null),kh.forEach(Rh),Ah.forEach(Rh)}function Bh(e,n){e.blockedOn===n&&(e.blockedOn=null,Q||(Q=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,zh)))}var Vh=null;function Hh(e){Vh!==e&&(Vh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Vh===e&&(Vh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(wh(r||n)===null)continue;break}var a=Mt(n);a!==null&&(e.splice(t,3),t-=3,Qs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Uh(e){function t(t){return Bh(t,e)}Eh!==null&&Bh(Eh,e),Dh!==null&&Bh(Dh,e),Oh!==null&&Bh(Oh,e),kh.forEach(t),Ah.forEach(t);for(var n=0;n<jh.length;n++){var r=jh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<jh.length&&(n=jh[0],n.blockedOn===null);)Ih(n),n.blockedOn===null&&jh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Ct]||null;if(typeof a==`function`)o||Hh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Ct]||null)s=o.formAction;else if(wh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Hh(n)}}}function Wh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Gh(e){this._internalRoot=e}Kh.prototype.render=Gh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;mh(n,Nd(),e,t,null,null)},Kh.prototype.unmount=Gh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mh(e.current,2,null,e,null,null),Vd(),t[z]=null}};function Kh(e){this._internalRoot=e}Kh.prototype.unstable_scheduleHydration=function(e){if(e){var t=yt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<jh.length&&t!==0&&t<jh[n].priority;n++);jh.splice(n,0,e),n===0&&Ih(e)}};var qh=n.version;if(qh!==`19.3.1`)throw Error(i(527,qh,`19.3.1`));L.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Jh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:I,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Yh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yh.isDisabled&&Yh.supportsFiber)try{Ye=Yh.inject(Jh),Xe=Yh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=bc,s=xc,c=Sc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=fh(e,1,!1,null,null,n,r,null,o,s,c,Wh),e[z]=t.current,Kf(e),new Gh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,ee=10**120*8,j=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),te=[j(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),j(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),j(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:3}),j(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),j(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),j(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:2,clockSpeedPower:1.5}),j(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:3}),j(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),j(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),j(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),j(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),j(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),j(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),j(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),j(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),j(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:20}),j(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),j(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),j(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),j(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A,levers:{costMultiplier:30}},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5,costMultiplier:40}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:ee,levers:{clockSpeedPower:.5,costMultiplier:30}}],M=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),N=te.map(e=>({...e,rule:[e.rule,M(e.levers)].filter(Boolean).join(` `)})),ne=.5,P=1e3,re=.01,ie=1e3,F=1e6,ae=.05,oe=.02,se=Object.fromEntries(N.map(e=>[e.id,e])),ce=new Set(N.map(e=>e.id)),le={enabled:!0},ue={enabled:!0},de=.05,fe=.01,pe=e=>Math.max(5,e),me=[1,2,3,4,5,6,7,8,9,10],I=[{id:`firstSession`,name:`First session`,boostArea:`foundry`},{id:`foundry`,name:`Foundry`,boostArea:`foundry`},{id:`power`,name:`Power`,boostArea:`power`},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`},{id:`levelPower`,name:`Level power`,boostArea:`factory`},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`},{id:`firstPurge`,name:`First Purge and after`,boostArea:`purgePoints`},{id:`latePurge`,name:`Late Purge layer`,boostArea:`purgePoints`},{id:`reboot`,name:`Reboot`,boostArea:`kernels`}],L=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],R=[1,3,6,8,b.length],he=[{arrayStepGain:.02},{arrayStepGain:.03},{lakeSpeed:.05},{lakeSpeed:.05},{syncedBitrate:!0}],ge=e=>`${Math.round(e*1e3)/10}%`,_e=({arrayStepGain:e,lakeSpeed:t,syncedBitrate:n})=>{let r=[],i=[];return e&&(r.push(`Disk step ${ge(e)}`),i.push(`Disk-size steps without a Flush Pool upgrade close ${ge(e)} of the gap to 1.0 (was 1%)`)),t&&(r.push(`Lake speed +${ge(t)}`),i.push(`Every Data Lake fills at +${ge(t)} more of its pool's Bandwidth`)),n&&(r.push(`One Upgrade does both`),i.push(`Bitrate always matches Capacity: there is no separate Upgrade Bitrate, and every Upgrade raises both`)),{shortBonus:r.join(`, `),bonus:i.join(`. `)}},ve=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,short:`Ping`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,short:`Compile`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,short:`Ping ×256`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,short:`1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...R.map((e,t)=>({id:`reclaim${t+1}`,name:`Reclamation ${[`I`,`II`,`III`,`IV`,`V`][t]}`,group:`foundry`,trigger:e===1?`Flush a Storage pool for the first time`:t===R.length-1?`Flush every Storage pool at least once`:`Flush ${e} different Storage pools`,short:e===1?`Flush a pool`:t===R.length-1?`Flush every pool`:`Flush ${e} pools`,..._e(he[t]),condition:{kind:`poolsCompacted`,min:e}})),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:L[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,short:`Buy ${e.symbol}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,name:`Spent QB`,group:`tierLadder`,trigger:`Restage while holding 0 Quettabytes`,short:`Restage at 0 QB`,shortBonus:`QB credited without balance`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`counter`,key:`emptyRestages`,min:1}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,short:`Accelerate 1`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,short:`Accelerate 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,short:`Overclock`,condition:{kind:`overclocked`}},...me.map((e,t)=>({id:`levelPower${t+1}`,name:`${b[e-1].symbol} Level ${pe(e)}`,group:`levelPower`,trigger:`Complete ${pe(e)} levels on ${b[e-1].name}`,short:`${b[e-1].symbol} level ${pe(e)}`,shortBonus:`+${de} per-level multiplier`,bonus:`The per-level production multiplier rises by ${de} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:pe(e)+1}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,short:`First Overclock at 6+`,shortBonus:`Overclock step −1`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,short:`2 Overclocks/Purge, no Accelerate`,shortBonus:`Overclock step −1`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,short:`DeGoogol, Overclock at 12+`,shortBonus:`Overclock step −1`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}},{id:`powerUser`,name:`Power user`,group:`power`,trigger:`Unlock the Power page`,short:`Unlock Power`,condition:{kind:`powerPageUnlocked`}},{id:`batteriesIncluded`,name:`Batteries included`,group:`power`,trigger:`Build your first Battery`,short:`First Battery`,condition:{kind:`computeEntityBuilt`,fromIndex:1}},{id:`turboButton`,name:`Turbo button`,group:`power`,trigger:`Activate your first Turbo Boost`,short:`First Turbo`,condition:{kind:`counter`,key:`turboBoosts`,min:1}},{id:`stackOverflow`,name:`Stack Overflow`,group:`power`,trigger:`Stack a Boost to its maximum`,short:`Max Boost stack`,condition:{kind:`counter`,key:`maxBoostStack`,min:1}},{id:`coldFusion`,name:`Cold fusion`,group:`power`,trigger:`Build your first Fusion`,short:`First Fusion`,condition:{kind:`computeEntityBuilt`,fromIndex:9}},{id:`justGoogolIt`,name:`Just Googol it`,group:`firstPurge`,trigger:`Reach 1 Googol Bytes`,short:`1 Googol Bytes`,condition:{kind:`googolReached`}},{id:`remindMeLater`,name:`Remind me later`,group:`firstPurge`,trigger:`Leave a Purge available but unclaimed for 60 seconds (pause Auto-Purge if you own it)`,short:`Purge pending 1 min`,condition:{kind:`counter`,key:`purgeWaitSeconds`,min:60}},{id:`startAllOver`,name:`Wait, do I start all over?`,group:`firstPurge`,trigger:`Purge for the first time`,short:`Purge`,condition:{kind:`lifetimePurges`,min:1}},{id:`tenTypes`,name:`There are 10 types of people`,group:`firstPurge`,trigger:`Purge at least 2 times`,short:`Purge ×2`,condition:{kind:`lifetimePurges`,min:2}},{id:`scriptKiddie`,name:`Script kiddie`,group:`firstPurge`,trigger:`Unlock your first autobuyer`,short:`First autobuyer`,condition:{kind:`autobuyers`,mode:`any`}},{id:`hex10`,name:`0x10`,group:`firstPurge`,trigger:`Purge at least 16 times`,short:`Purge ×16`,condition:{kind:`lifetimePurges`,min:16}},{id:`cronJob`,name:`Cron job`,group:`firstPurge`,trigger:`Unlock every tier autobuyer`,short:`All autobuyers`,condition:{kind:`autobuyers`,mode:`all`}},{id:`noHands`,name:`Look ma, no hands`,group:`firstPurge`,trigger:`Purge in a cycle with no manual tier purchase`,short:`Hands-free Purge`,condition:{kind:`counter`,key:`handsFreePurges`,min:1}},{id:`stillClicker`,name:`Oh, it's still a clicker game!`,group:`firstPurge`,trigger:`Ping while every tier autobuyer is unlocked`,short:`Ping, all automated`,condition:{kind:`counter`,key:`automatedPings`,min:1}},{id:`lossless`,name:`Lossless`,group:`latePurge`,trigger:`Buy your first Compression level`,short:`Compression 1`,condition:{kind:`doublePpLevel`,min:1}},{id:`middleOut`,name:`Middle-out`,group:`latePurge`,trigger:`Reach Compression level 5`,short:`Compression 5`,condition:{kind:`doublePpLevel`,min:5}},{id:`zipBomb`,name:`Zip bomb`,group:`latePurge`,trigger:`Compress until 1 power earns 1 PP`,short:`1 power per PP`,condition:{kind:`onePowerPerPp`}},{id:`whileTrue`,name:`while (true)`,group:`latePurge`,trigger:`Run Auto-Purge at a 1 second interval`,short:`Auto-Purge 1 s`,condition:{kind:`fastAutoPurge`}},{id:`notABug`,name:`It's not a bug, it's a feature`,group:`latePurge`,trigger:`Pass 1 Googol Bytes in Overflow mode`,short:`Googol in Overflow`,condition:{kind:`overflowPastGoogol`}},{id:`bit64`,name:`64-bit upgrade`,group:`latePurge`,trigger:`Purge at least 64 times`,short:`Purge ×64`,condition:{kind:`lifetimePurges`,min:64}},{id:`someoneElsesComputer`,name:`The cloud is just someone else's computer`,group:`latePurge`,trigger:`Buy your first Supercloud`,short:`First Supercloud`,condition:{kind:`superCloudOwned`}},{id:`offAndOn`,name:`Have you tried turning it off and on again?`,group:`reboot`,trigger:`Reboot for the first time`,short:`Reboot`,condition:{kind:`eraCount`,min:1}},{id:`rmRf`,name:`rm -rf`,group:`reboot`,trigger:`Reformat the Byte Foundry`,short:`Reformat Foundry`,condition:{kind:`counter`,key:`reformats`,min:1}},{id:`kernelPanic`,name:`Kernel panic`,group:`reboot`,trigger:`Reboot twice within an hour of play`,short:`Reboot ×2 in 1 h`,condition:{kind:`counter`,key:`quickReboots`,min:1}},{id:`popcorn`,name:`Popcorn`,group:`reboot`,trigger:`Earn 100 Kernels in total`,short:`100 Kernels`,condition:{kind:`kernelsEarned`,min:100}}].map(e=>({secret:!1,platformDependent:!1,bonus:null,short:null,shortBonus:null,...e})),ye=[{id:`ping`,name:`Ping`,members:[`helloWorld`,`pingOfDeath`]},{id:`poolReset`,name:`Reclamation`,members:R.map((e,t)=>`reclaim${t+1}`)},{id:`tierBought`,name:`First purchase`,members:b.map((e,t)=>`tier${String(t+1).padStart(2,`0`)}Bought`)},{id:`accelerate`,name:`Accelerate`,members:[`tickTock`,`megahertzMyth`]},{id:`levelPower`,name:`Level power`,members:me.map((e,t)=>`levelPower${t+1}`)},{id:`overclockStep`,name:`Overclock step`,members:[`overclockStep1`,`overclockStep2`,`overclockStep3`]}],be=Object.fromEntries(ye.flatMap(e=>e.members.map((t,n)=>[t,{...e,level:n+1}]))),xe=Object.fromEntries(ve.map(e=>[e.id,e])),Se=1024,Ce=1e3,we=8*Ce**2/10,Te=(e=1)=>({startBits:8,endBits:8/10*Ce**(Math.max(1,Math.floor(Number(e)||1))+1)}),Ee=.5,De=.9,Oe=8e3,ke=1e3,Ae=8*Se,je=8e3,Me=we/2,Ne=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],Pe={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},Fe=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],Ie=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],Le=[1,10,100],Re=[9,9,9],ze=1e3,Be=[1,10,100,ze],Ve=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],He=10*Le.length,Ue=[1,10,100,1e3],We=.5,Ge=86400,Ke=14400,qe=14400,Je=[4,40,400,4e3,4e4],Ye=2e3,Xe=1024,Ze=1.1,Qe=.01,$e=.1,et=Math.floor(Math.log2(Xe)),tt=.9,nt=.01,rt={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},it={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},at={baseCost:100,baseSeconds:16},ot=.01,st=.1,ct=.01,lt=.01,ut=.1,dt=1e3,ft=1e30,pt=1e-4,mt=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],ht=Object.assign(Object.create(null),Object.fromEntries(mt.map(e=>[e.id,e]))),gt=Object.assign(Object.create(null),Object.fromEntries(mt.map((e,t)=>[e.id,t]))),_t=k,vt=[0,10,60,600,3600,21600,86400],yt=[0,1.5,2,5,10,100],bt=1e-5,xt=[{id:`hyperscalerEfficiency`,levelField:`hyperscalerEfficiencyLevel`,costBase:1,costGrowth:10,maxLevel:10},{id:`eonAmplifier`,levelField:`eonAmplifierLevel`,costBase:10,costGrowth:10,maxLevel:9}],St=Object.assign(Object.create(null),Object.fromEntries(xt.map(e=>[e.id,e]))),Ct=()=>b[b.length-1].id,z=e=>Math.max(0,Number.isFinite(e)?e:0),wt=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),Tt=1e-9,Et=1e-9,Dt=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},Ot=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),kt=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=Ot();return e},At=()=>({resources:Dt().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,accelerateBoughtThisCycle:!1,manualPurchaseThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,autoPurgeSettings:{targetPpExponent:0,minSeconds:0,bestMultiplier:0},globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:wt()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:bi(1),cycleSeconds:0,highestAward:0,unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:mt.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:mt.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:mt.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:mt.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:kt(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),jt=new Intl.NumberFormat(`en-US`),Mt=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),Nt=1e4,Pt=1e3,Ft=1+1e-12,It=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*Ft;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*Pt)/Pt;return`${Number(r.toFixed(3))}e${t}`},B=e=>{let t=z(e);return t<Nt?jt.format(t):It(t)},Lt=1e-9,Rt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>Lt?null:`${It(10**t)} ${E(T)}`},zt=e=>{let t=Math.floor(z(e)),n=E(O);return t<Nt?`${Mt.format(t)} ${n}`:Rt(t)??`${It(t)} ${n}`},Bt=e=>{let t=Math.floor(z(e)),n=E(T);return t<Nt?`${Mt.format(t)} ${n}`:`${It(t)} ${n}`},Vt=8e3,Ht=e=>{let t=Math.floor(z(e));if(t<Vt)return zt(t);let n=Math.floor(t/8);return n<Nt?`${Mt.format(n)} B`:`${It(n)} B`},Ut=e=>{let t=z(e);return t===0?1:2+(t-1)*t/2},V=e=>{let t=e.purchaseLevels?.[Ct()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},Wt=(e,t)=>{let n=S[e?.id];if(n===void 0)return Ut(t);let r=z(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},Gt=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(Wt(e,n)-1)},Kt=(e,t,n)=>{let r=Math.max(0,z(e)-z(t));return Math.max(0,Math.min(z(n),r))},qt=(e,t,n,r,i)=>Gt(e,t)*Kt(n,r,i),Jt=(e,t,n,r,i,a)=>{let o=Kt(n,r,a),s=Gt(e,t);return s<=0?o:Math.min(o,Math.floor(z(i)/s))},Yt=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),Xt=(e,t)=>Yt(Math.max(0,S[e]??-1))**Math.max(0,z(t)-1),Zt=(e,t)=>Xt(e,t),Qt=e=>1+Math.max(0,S[e]??-1)*1,$t=e=>11+Math.max(0,S[e]??-1)*1,en=e=>{let t=z(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=Qt(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=$t(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=rt.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=rt.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=rt.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=rt.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=rt.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},tn=(e,t=$e)=>(1+t)**z((e??1)-1),nn=e=>10**(z(e)+1),rn=e=>nn(e)*8,an=e=>(e.resources?.base??0)>=rn(e.globalTickspeedMultiplier??0),on=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,sn=(e,t=0)=>{let n=z(e??0);return(1+ot*Rr(t))**n},cn=e=>(e.scaleUpTierCounts?.[ti(e).id]??0)>=1,ln=e=>(1+lt)**z(e),un=e=>Math.max(1,Math.ceil(ut*z(e))),dn=(e,t=!0)=>{let n=z(e);return!t||n<1?1:n<2?Ze:1+Math.log10(n)},fn=e=>!!e.prestigeSpeedBonusUnlocked,pn=e=>{if(e.prestigeSpeedBonusUnlocked||z(e.purge.points)<1)return e;let t=Dn(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},mn=e=>e.playtimeBonusUnlocked?1+Qe*(z(e.activePlaySeconds??0)/3600):1,hn=e=>{if(e.playtimeBonusUnlocked||z(e.purge.points)<100)return e;let t=Dn(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},gn=e=>{if(e.buyMaxUnlocked||z(e.purge.points)<2)return e;let t=Dn(e);return{...t,purge:{...t.purge,points:t.purge.points-2},buyMaxUnlocked:!0}},_n=e=>{if(e.cacheWarmUnlocked||z(e.purge.points)<20)return e;let t=Dn(e);return yn({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},vn=e=>b[Math.min(b.length,Math.max(1,Ia(e)))-1],yn=e=>{if(!e.cacheWarmUnlocked||Kr(e))return e;let t=vn(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,V(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:qi(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},bn=Je.length,xn=e=>Math.min(bn,Math.floor(z(e?.sleepModeCapLevel??0))),Sn=e=>Math.min(Ge,Ke+qe*xn(e)),Cn=e=>Je[e]??null,wn=e=>{let t=xn(e),n=Cn(t);if(n===null||z(e.purge.points)<n)return e;let r=Dn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},Tn=e=>t=>({...t,activePlaySeconds:z(t.activePlaySeconds??0)+z(e)}),En=e=>!!e.computeFlops?.pageUnlocked||z(e.purge?.points??0)>=100,Dn=e=>e.computeFlops?.pageUnlocked||z(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},On=(e,t,n)=>{let r=ht[t];if(!r)return{affordable:0,totalCost:0};let i=z(e.computeFlops?.owned?.[t]??0),a=z(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=An(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},kn=(e,t,n)=>r=>{if(t<=0)return r;let i=Dn(r),a=z(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},An=(e,t=0)=>{let n=t+1;return Gt({baseCost:e.baseCostPP},n)},jn=(e,t)=>{let n=ht[t];if(!n)return!1;let r=An(n,z(e.computeFlops?.owned?.[t]??0));return z(e.purge?.points??0)>=r},Mn=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=An(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},Nn=(e,t=1)=>n=>{let r=ht[e];if(!r)return n;let i=Dn(n),a=z(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=Mn(r,a,z(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:z(a+o)}}}},Pn=e=>10**z(e),Fn=e=>mt.reduce((t,n,r)=>t+z(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*Pn(r),0),In=e=>{let t=z(e.hyperscalerCount??0);return t<=0?0:t*(pt+z(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*bt)},Ln=(e,t)=>1+z(e.computeFlops?.cumulativeBoost?.[t]??0),Rn=e=>{let t=z(e);return t===0?`0 Flops`:`${B(t)} Flops`},zn=e=>t=>{if(e<=0)return Dn(t);let n=Dn(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost},o=In(n)*e;return mt.forEach(t=>{let n=z(r[t.id]??0)*pt*e+o;if(n<=0)return;let s=t.boostsTierId;a[s]=z((a[s]??0)+n),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},Bn=e=>z(e.purge?.points??0)>=_t,Vn=e=>10**z(e.eonsUpgrades?.eonAmplifierLevel??0),Hn=e=>1*10**z(e),Un=e=>z(e.eons?.balance??0)>=Hn(e.hyperscalerCount??0),Wn=e=>{if(!Un(e))return e;let t=Hn(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:z(e.eons.balance)-t},hyperscalerCount:z(e.hyperscalerCount??0)+1}},Gn=(e,t)=>{let n=St[t];return n?z(e.eonsUpgrades?.[n.levelField]??0):0},Kn=(e,t)=>{let n=St[e];return n?n.costBase*n.costGrowth**z(t):1/0},qn=(e,t)=>{let n=St[t];return!n||n.maxLevel!=null&&Gn(e,t)>=n.maxLevel},Jn=(e,t)=>!qn(e,t)&&z(e.eons?.balance??0)>=Kn(t,Gn(e,t)),Yn=e=>t=>{if(!Jn(t,e))return t;let n=St[e],r=Gn(t,e);return{...t,eons:{...t.eons,balance:z(t.eons.balance)-Kn(e,r)},eonsUpgrades:{...t.eonsUpgrades,[n.levelField]:r+1}}},Xn=e=>!e.eonsUpgrades?.autoHyperscalerUnlocked&&z(e.eons?.balance??0)>=100,Zn=e=>Xn(e)?{...e,eons:{...e.eons,balance:z(e.eons.balance)-100},eonsUpgrades:{...e.eonsUpgrades,autoHyperscalerUnlocked:!0}}:e,Qn=e=>t=>{let n=!!e;return(t.eonsUpgrades?.autoHyperscalerEnabled??!0)===n?t:{...t,eonsUpgrades:{...t.eonsUpgrades,autoHyperscalerEnabled:n}}},$n=e=>{if(!e.eonsUpgrades?.autoHyperscalerUnlocked||!(e.eonsUpgrades.autoHyperscalerEnabled??!0))return e;let t=e;for(;Un(t);)t=Wn(t);return t},er=e=>1+Math.max(0,gt[e]??-1)*1,tr=e=>{let t=z(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return mt.forEach(e=>{(r[e.id]??null)===null&&t>=er(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},nr=(e,t)=>n=>!mt.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},rr=e=>t=>{if(e<=0)return t;let n=t;return mt.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+Tt);if(i>=1){let{affordable:e,totalCost:a}=On(n,t.id,i);e>0&&(n=kn(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},ir=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},ar=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],or=e=>Math.max(e.achievements?.counters?.purges??0,e.purge?.count??0),sr=(e,t,n=1,r=`add`)=>{if(!le.enabled)return e;let i=e.achievements??At().achievements,a=i.counters?.[t]??0,o=r===`max`?Math.max(a,n):r===`set`?n:a+n;return o===a&&i.counters?.[t]!==void 0?e:br({...e,achievements:{...i,counters:{...i.counters,[t]:o}}})},cr=e=>b.every(t=>(e.autobuyers?.[t.id]??null)!==null),lr=e=>ur(e.intro),ur=e=>{let t=0;for(let n=1;n<=10;n+=1)Number(e?.poolExponentBonuses?.[n])>=1&&(t+=1);return t},dr=e=>{let t=ur(e);return R.filter(e=>t>=e).length},fr=(e,t)=>{let n=he.slice(0,dr(e)).filter(e=>e.arrayStepGain);return n.length?n.at(-1).arrayStepGain:t},pr=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||Do(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolsCompacted`:return lr(e)>=t.min;case`lifetimePurges`:return or(e)>=t.min;case`kernelsEarned`:return Math.max(e.achievements?.counters?.kernelsEarned??0,e.eons?.balance??0)>=t.min;case`eraCount`:return(e.era?.count??0)>=t.min;case`doublePpLevel`:return(e.prestigeDoublePpLevel??0)>=t.min;case`onePowerPerPp`:return ki(e.prestigeDoublePpLevel??0)<=1;case`googolReached`:return(e.resources?.base??0)>=8e100||or(e)>0||(e.era?.count??0)>0;case`fastAutoPurge`:return(e.autoPurge??null)!==null&&Ed(e,`purge`)<=1;case`overflowPastGoogol`:return(e.achievements?.counters?.overflowPurges??0)>=1||Wr(e)&&(e.resources?.base??0)>=8e100;case`superCloudOwned`:return(e.computeFlops?.owned?.flop10??0)>=1;case`powerPageUnlocked`:return Ml(e)||!!e.intro?.computeMergePageUnlocked||(e.intro?.computeCoresEverEarned??0)>0||ar.some(t=>(e.intro?.[t]??0)>0);case`computeEntityBuilt`:return ar.slice(t.fromIndex).some(t=>(e.intro?.[t]??0)>0);case`autobuyers`:{let n=b.map(t=>(e.autobuyers?.[t.id]??null)!==null);return t.mode===`all`?n.every(Boolean):n.some(Boolean)}default:return!1}},mr=(e,t)=>{if(t.min<=1)return null;switch(t.kind){case`counter`:return t.key===`maxFirstOverclock`?null:{current:e.achievements?.counters?.[t.key]??0,target:t.min};case`kernelsEarned`:return{current:Math.max(e.achievements?.counters?.kernelsEarned??0,e.eons?.balance??0),target:t.min};case`lifetimePurges`:return{current:or(e),target:t.min};case`clockSpeedLevel`:return{current:e.globalTickspeedMultiplier??0,target:t.min};case`tierLevel`:return{current:Math.max(0,(e.purchaseLevels?.[t.tierId]??1)-1),target:t.min-1};case`poolsCompacted`:return{current:lr(e),target:t.min};case`storageUnlocked`:{let t=e=>Math.log2(Math.max(e,8)/8);return{current:Math.floor(t(e.intro?.capacity??0)),target:t(Ae)}}default:return null}},hr=e=>e.bonus??null,gr=e=>e.short??e.trigger,_r=e=>e.shortBonus??e.bonus??null,vr=e=>e>=1?Math.max(ct,10/(1+Math.log10(e))):1/0,yr=(e,t)=>!!e.achievements?.earned?.[t],br=e=>{if(!le.enabled)return e;let t=ve.filter(t=>!yr(e,t.id)&&pr(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},xr=e=>I.filter(t=>{let n=ve.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>yr(e,t.id))}).map(e=>e.id),Sr=.1,Cr=(e,t)=>{let n=ve.filter(e=>e.group===t&&!e.platformDependent),r=n.filter(t=>yr(e,t.id)).length,i=n.length>0&&r===n.length,a=Math.ceil(n.length*Sr);return{earned:r,bonus:i?a:0,total:n.length+a,complete:i}},wr=e=>I.reduce((t,n)=>{let{earned:r,bonus:i}=Cr(e,n.id);return t+r+i},0),Tr=e=>le.enabled?Math.round((1+fe*wr(e))*1e6)/1e6:1,Er=e=>{if(!Bn(e))return e;let t=At(),n=Vn(e),r=z(e.era?.count??0)+1,i=Wr(e);return yn(tr({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:ir(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??t.autoPurgeSettings,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:wt()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:z(e.eons?.balance??0)+n},hyperscalerCount:z(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},Dr=e=>{let t=e.prestigeDoublePpLevel??0,n=ji(t);if(z(e.purge.points)<n)return e;let r=Dn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},Or=e=>{let t=ve.filter(t=>t.group===`levelPower`&&yr(e,t.id)).length;return Math.round((1+de*t)*1e6)/1e6},kr=(e,t=1)=>{let n=Math.max(0,z(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},Ar=e=>2**z(e),jr=(e,t)=>Jr(e,`scaleUpNoDoubling`)||Yr(e,`singleInstance`)===t?1:Ar(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**Zr(e,`scaleUpPower`,1),Mr=e=>Math.min(z(e.scaleUpTargetTierIndex??0),ei(e)-1),Nr=e=>b[Mr(e)],Pr=e=>3*(Math.max(0,z(e.scaleUpCount??0)-(ei(e)-1))+1),Fr=e=>{let t=Lr(e);return t===null?5:t+Ir(e)},Ir=e=>{let t=ve.filter(t=>t.group===`overclockStep`&&yr(e,t.id)).length;return Math.max(1,4-t)},Lr=e=>{let t=e.overclockLastClaimCompletedLevels??(z(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:z(t)},Rr=e=>(1+st)**z(e),zr=e=>rt[e],Br=e=>({...At().autoPurgeSettings,...e.autoPurgeSettings??{}}),Vr=e=>{let t=Br(e);if(t.minSeconds>0&&z(e.purge?.cycleSeconds??0)<t.minSeconds-Tt)return!1;if(!Wr(e))return!0;let n=Mi(e.resources[O],e.prestigeDoublePpLevel??0,!0);if(t.targetPpExponent>0&&n<10**t.targetPpExponent)return!1;let r=z(e.purge?.highestAward??0);return!(t.bestMultiplier>0&&r>0&&n<t.bestMultiplier*r)},Hr=(e,t)=>n=>{if(!(e===`targetPpExponent`?Number.isInteger(t)&&t>=0&&t<=100:e===`minSeconds`?vt.includes(t):e===`bestMultiplier`&&yt.includes(t)))return n;let r=Br(n);return r[e]===t?n:{...n,autoPurgeSettings:{...r,[e]:t}}},Ur=e=>1/Ed(e,`purge`),Wr=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&Ed(e,`purge`)<=1,Gr=e=>!!se[e]&&ce.has(e),Kr=e=>{let t=e.challenges?.active;return t&&Gr(t)?se[t]:null},qr=(e,t)=>!!e.challenges?.completed?.[t],Jr=(e,t)=>Kr(e)?.effect===t,Yr=(e,t)=>{let n=Kr(e);return n?.effect===t?n.automation.key:null},Xr=(e,t)=>({balance:Math.max(e.balance??0,z(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),Zr=(e,t,n)=>Kr(e)?.levers?.[t]??e.runLevers?.[t]??n,Qr=(e,t)=>(Yr(e,`halfDuplex`)===t?ne:1)*Zr(e,`production`,1),$r=(e,t)=>{let n=x[t];if(!n)return n;let r=(Yr(e,`premiumTier`)===t?P:1)*Zr(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},ei=e=>Jr(e,`addressSpace`)?6:b.length,ti=e=>b[ei(e)-1],ni=e=>Math.floor(z(e.challenges?.activeSeconds)/30+1e-9)%2==0,ri=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!Kr(e))return n;if(Yr(e,`clockGated`)===t||Yr(e,`dutyCycle`)===t&&!ni(e))return 1;if(Yr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},ii=e=>{if(!Jr(e,`bitRot`))return 0;let t=z(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(F,ie*2**(t/30))/10**(oa(e.intro)-1)},ai=e=>Kr(e)?.goal??8e100,oi=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,si=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?Qt(n):t===`tierTickspeed`?$t(n):zr(n))},ci=(e,t)=>{let n=se[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:Od(e,i))&&z(e.purge?.count??0)>=si(n)},li=(e,t)=>N.find(n=>n.automation.kind===e&&n.automation.key===t&&Gr(n.id))??null,ui=(e,t,n)=>{let r=li(t,n);return!!r&&!qr(e,r.id)},di=e=>{let t=e.challenges?.completed??{},n=N.filter(n=>Gr(n.id)&&!t[n.id]&&oi(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...At().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},fi=e=>t=>{if(!Kr(t))return t;let n=t.challenges.run??wt();return{...t,challenges:{...t.challenges,activeSeconds:z(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:z(n.cycleSeconds)+e}}}},pi=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??wt(),...t}}}),mi=(e,t,n)=>{if(n===t)return n;let r=n;if(Yr(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return Yr(n,`writeLock`)===e&&(r=pi(r,{haltSeconds:10})),r},hi={hardRefresh:{interval:300,apply:(e,t)=>pi({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},gi=(e,t)=>{let n=t,r=Yr(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-re)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=pi({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(Jr(n,`bitRot`)&&ii(n)>z(n.resources.base)){let e=Yd(n,!1);n={...e,challenges:{...e.challenges,run:{...wt(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},_i=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=Kr(r);if(!e)return Ri(i,t,0)(r);let n=hi[e.effect],a=z(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=z(r.challenges.run?.haltSeconds),l=c>0?pi(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>Kr(e)?fi(o)(e):e)(Ri(o,t,c)(l)),d=!Kr(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=Kr(d)?gi(o,d):d,s&&Kr(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},vi=e=>!Wr(e)&&z(e.resources.base)>=ai(e),yi=e=>t=>{let n=S[t.id]??-1;if(n>=ei(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},bi=e=>xi(z(e)/8),xi=e=>{let t=z(e);return t<1?0:Math.floor(Math.log10(t))},Si=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=xi(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},Ci=e=>{let t=z(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},wi=e=>Jr(e,`clockSpeedDisabled`)?1:sn(e.globalTickspeedMultiplier??null,Lr(e)??0)**Zr(e,`clockSpeedPower`,1),Ti=e=>Jr(e,`clockSpeedDisabled`)?0:(1+ot*Rr(Lr(e)??0))**Zr(e,`clockSpeedPower`,1)-1,Ei=e=>Jr(e,`scaleUpNoDoubling`)?1:2**Zr(e,`scaleUpPower`,1),Di=(e,t)=>{let n=tn(ri(e,t),Yr(e,`halfStep`)===t?ae:$e)*(t===ti(e).id?ln(e.lastTierXpConsumed??0):1),r=wi(e),i=Yr(e,`noisyNeighbour`),a=(Yr(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+oe)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:Et},Oi=()=>Math.log2(64),ki=(e=0)=>{let t=z(e);return 64/2**Math.min(t,Oi())},Ai=(e=0)=>{let t=z(e),n=Oi();return t>n?2**(t-n):1},ji=(e=0)=>10**(z(e)+1),Mi=(e,t=0,n=!1)=>{let r=z(e);if(r<8e100)return 0;let i=Math.floor(Math.log10(k)),a=n?Math.max(i,xi(r/8)):i,o=ki(t),s=Ai(t);return Math.floor(a/o)*s},Ni=(e,t)=>{let n=bi(z(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},Pi=200,Fi=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<Pi;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=Pi&&(o=Math.min(o,1)),{state:a,budget:o}},Ii=(e,t,n,r)=>{let{state:i,budget:a}=Fi(e,t,Ed(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},Li=`unit`,Ri=(e,t=1,n=0)=>r=>{let i=Yo(r),a=to(e)(i),o=co(Es(e)(yo(e)(So(e)(Xo(e)(a))))),s=$s(e)(o),c=qs(e)(s),l=Wd($s(0)(c)),u=Fu.reduce((t,n)=>n(e)(t),l),d=el(e)(u),f=Zo(rd(e)(d)),p=hl(El(e,f)(no(e)(f))),m=Sl(e)(p),h=$n(rr(e)(zn(e)(m))),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=cc(oc(t)),r=xs(e)(ws(e)(n));return r===t?t:$s(0)(r)};if(vi(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+Ur(h)*e;return t>=.999999999&&Vr(h)?_(ff(h)):_({...h,autoPurgeAttemptBudget:t})}let v=dn(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*mn(h)*Tr(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!yi(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/gd(n,r.id);for(;a>=.999999999&&!(Math.floor(a+Tt)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=Yi(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=vd(i,r.id);if(n>1&&e===0){let e=ra(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!$i(i,r))break;let o=Yi(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,z(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!yi(y)(e)||k)return;let t=Di(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+Tt)/t);if(T[e.id]=n-r*t,r<=0)return;let i=Yr(y,`flatRate`)===e.id?1:kr(y.purchaseLevels?.[e.id]??1,Or(y)),a=Qr(y,e.id),o=Gu(y.intro,S[e.id]+1),s=Ln(y,e.id),c=jr(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=z((C.base??0)+l*8)):C[e.producesResourceId]=z((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=z((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,ee=x[Ct()],j=Math.max(0,(y.purchaseLevels?.[ee.id]??1)-1);if(j>0&&yr(y,`quettaSpent`)&&yi(y)(ee)&&!k){let e=vr(j);A+=D;let t=Math.floor(A/e+Tt);t>0&&(A=Math.max(0,A-t*e),C[ee.id]=z((C[ee.id]??0)+t),w[ee.id]=z((w[ee.id]??0)+t))}let te={...y,lastTierLevelCreditTimer:A,resources:C,owned:w,tierProductionAccumulators:T,purge:Ni(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+Ur(y)*e}:{}},M=te.runPeaks?Xr(te.runPeaks,te):null,N=Wr(te)&&z(te.resources.base)>=8e100?sr(te,`overflowPurges`,1,`max`):te;Wr(N)&&g&&z(N.resources.base)>=ai(N)&&(N.autoPurgeAttemptBudget??0)>=.999999999&&Vr(N)&&(N=ff(N));let ne=N.autoOverclock&&(N.autoOverclockEnabled??!0)?Ii(N,e,`overclock`,tf):N,P=ne.autoScaleUp&&(ne.autoScaleUpEnabled??!0)?Ii(ne,e,`scaleUp`,ef):ne,re=P.autoXpTickspeed&&(P.autoXpTickspeedEnabled??!0)?Ii(P,e,`restage`,e=>lf(e.purge.xp)(e)):P,ie=M?{...re,runPeaks:M}:re,F=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=Fi(t,e,Md(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>fd(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},ie);return _(F.autoGlobalTickspeed&&(F.autoGlobalTickspeedEnabled??!0)?Ii(F,e,`speedUp`,zd):F)},zi=(e,t)=>{if(!le.enabled||e<=0||yr(t,`remindMeLater`))return t;let n=!Kr(t)&&z(t.resources?.base)>=8e100,r=t.achievements?.counters?.purgeWaitSeconds??0;return n?sr(t,`purgeWaitSeconds`,Math.min(60,r+e),`set`):r===0?t:sr(t,`purgeWaitSeconds`,0,`set`)},Bi=(e,t=1)=>n=>{let r=br(zi(e,Kr(n)&&e>0?_i(e,t,n):Ri(e,t,0)(n)));return r===n||e<=0||r.purge?.count!==n.purge?.count?r:{...r,purge:{...r.purge,cycleSeconds:z(r.purge.cycleSeconds??0)+e}}},Vi=(e,t=Ge)=>{let n=Math.min(z(e),t,Ge);return Math.floor(n*(n>600?We:1))},Hi=(e,t=1)=>n=>{let r=Vi(e,Sn(n)),i=n;for(let e=0;e<r;e++)i=Bi(1,t)(i);return i},Ui=(e,t=Ge)=>Math.floor(Math.min(z(e),t,Ge))-Vi(e,t),Wi=(e,t=1,n)=>r=>{let i=Ui(e,n??Sn(r)),a=r;for(let e=0;e<i;e++)a=Bi(1,t)(a);return a},Gi=e=>{let t=Math.max(0,Math.floor(z(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Ki=(e,t)=>e.resources[t.costResourceId]??0,qi=(e,t)=>e.purchased?.[t]??0,Ji=(e,t)=>n=>{if(vi(n))return n;let r=$r(n,e);if(!r||!yi(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=V(n),s=Jt(r,i,o,a,Ki(n,r),t);if(s<=0)return n;let c=Gt(r,i)*s,l=qi(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:z((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},Yi=(e,t)=>n=>mi(e,n,Ji(e,t)(n)),Xi=e=>!!e.buyMaxUnlocked,Zi=e=>z(e.purge?.count??0)>=1||z(e.era?.count??0)>=1||Ne.some(t=>!!e.intro?.[t.autoFlagField]),Qi=e=>t=>{let n=t;for(let t=0;t<Xe;t++){let t=e(n);if(t===n)break;n=t}return n},$i=(e,t)=>{let n=$r(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=V(e),a=e.purchaseLevelProgress?.[n.id]??0;return Jt(n,r,i,a,Ki(e,n),i)>=i-a},ea=(e,t)=>{let n=$r(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=V(e);return Jt(n,r,i,0,Ki(e,n),i)>=i},ta=e=>t=>{if(vi(t))return t;let n=$r(t,e);if(!n||!yi(t)(n))return t;if(!ea(t,n))return Yi(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&ea(r,n);t++){let t=Yi(e,2**53-1)(r);if(t===r)break;r=t}return r},na=e=>t=>mi(e,t,ta(e)(t)),H=(e,t)=>n=>{if(vi(n))return n;let r=$r(n,e);if(!r||!yi(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,Xe)&&ea(i,r);n++){let t=Yi(e,2**53-1)(i);if(t===i)break;i=t}return i},ra=(e,t)=>n=>mi(e,n,H(e,t)(n)),ia=(e,t)=>{let n=$r(e,t);if(vi(e)||!n||!yi(e)(n)||!ea(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&ea(r,n);e++){let e=Yi(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=V(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,Jt(n,o,a,0,Ki(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:Ki(e,n)-Ki(r,n),lastLevelCost:Ki(i,n)-Ki(r,n),partialQuantity:s,partialCost:s>0?qt(n,o,a,0,s):0}},aa=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=V(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=qi(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},oa=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*Le.length,Number.isFinite(t)&&t>=1?t:1)},sa=e=>{let t=oa(e),n=Math.floor((t-1)/Le.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(Le.length-1,Math.max(0,t-1-(n-1)*Le.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=De,o=1-fr(e,(1-a)**2);return 1-(1-Ee)*a**(n+i)*o**(r-i)},ca=(e,t=Ee)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},la=e=>he.slice(0,dr(e)).some(e=>e.syncedBitrate),ua=e=>la(e)?e.capacity??0:e.speedCapacity??e.capacity??0,da=e=>ca(ua(e),sa(e))*8,fa=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(ke);return 10**(n-t*(n-Math.log10(10)))},pa=Math.log(ke/100),ma=Math.log(ke/10),ha=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-pa)*(Math.exp(ma*s)-Math.exp(ma*o))/ma},ga=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(ma*a)+ma*n/t*Math.exp(pa)*r,s=t/ma*Math.log(o);return Math.min(t,s)-i},_a=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,va=e=>fa(_a(e)),ya=e=>va(e),ba=e=>1+(e?.dataStreamTapBonusPercent??0)/100,xa=e=>ya(e)/100,Sa=e=>da(e)*Wu(e)*xa(e),Ca=100,wa=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?ho(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=ba(e),o=Ca*a,s=da(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},Ta=e=>{if(Do(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(da(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},Ea=e=>{let t=Ta(e);if(!le.enabled||t===e)return t;let n=t.achievements??At().achievements,r=br({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}});return cr(r)?sr(r,`automatedPings`,1,`max`):r},Da=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},Oa=()=>10,U=e=>{let t=lc(e);return t?Math.ceil(t/Le.length):null},ka=(e,t)=>{if(!Number.isInteger(t)||t<1||t>Oa())return!1;let n=(t-1)*Le.length+1;return Le.every((t,r)=>{let i=Qo(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},Aa=e=>{let t=(e-1)*Le.length+1;return Le.map((e,n)=>Qo(t+n))},ja=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!K(e,r)?.rebuilding}),Ma=(e,t)=>!!K(e,t)?.rebuilding,Na=(e,t)=>!Number.isInteger(t)||t<1||t>Oa()?!1:t===1||ka(e,t-1),Pa=e=>{let t=0;for(let n=1;n<=Oa()&&Na(e,n);n+=1)t=n;return t},Fa=e=>8*Se**e,Ia=e=>{let t=1;for(let n=2;n<=Oa()&&!((e.intro?.capacity??0)<Fa(n));n+=1)t=n;return t},La=[1,2,4,8,16,32,64,125,250,500],Ra=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return La[t%10]*1e3**Math.floor(t/10)*8},za=Math.log10(2),Ba=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*za)*8},Va=(e,t)=>{if(!Number.isInteger(t)||t<1||t>Ia(e))return 0;let n=(Wa(e,t)/8)**sa(e.intro),r=da(e.intro??{})/8,i=Ra(Math.min(r,n)*8),a=Math.max(0,K(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=Ra(o*Math.SQRT2);if(t>=Oa())return o;let s=Va(e,t+1);return Math.max(i,Math.min(o,s/2))},Ha=(e,t)=>{let n=Va(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,Fa(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=Va({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:Ra(da(e.intro??{}))},Ua=(e,t)=>{let n=Ba(e??0),r=t===1?Te(1).startBits:Te(t-1).endBits,i=Te(t).endBits;return Math.min(Math.max(n,r),i)},Wa=(e,t)=>!Number.isInteger(t)||t<1||t>Ia(e)?0:Ua(e.intro?.capacity??0,t),Ga=(e,t)=>Wa(e,t),Ka=(e,t)=>t<=Ia(e)?Ga(e,t):Ua(Fa(t),t),qa=(e,t)=>e.intro?.poolBuffers?.[t]??0,Ja=(e,t)=>{let n=Ga(e,t);return n>0?Math.min(1,qa(e,t)/n):0},Ya=(e,t)=>fa(Ja(e,t)),Xa=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,Za=(e,t)=>Ya(e,t),Qa=(e,t)=>1+Xa(e,t)/100,$a=(e,t)=>{let n=da(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-Va(e,r));return Math.min(Va(e,t),n)},eo=e=>t=>{if(!Number.isInteger(e)||e<1||e>Ia(t))return t;let n=Xa(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},to=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},no=e=>t=>{if(!Do(t))return t;let n=Ia(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=$a(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=Ga(t,s),u=Math.max(0,l-c),d=n*qu(t.intro,s),f=e;if(u>0){let t=ga(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=ha(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!Vc(t,s)||!ka(t,s)||Tl(t,s))continue;let{lake:p,remainingBits:m,changed:h}=bl(t,s,n*Bc(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},ro=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||uo(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,lc(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,lc(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,lc(i.diskBuild.size)??1)),o>oa(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>Oa())continue;let i=e[r]??0,a=Ka(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=U(c);if(u){let t=Ka({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=vl(o),c=Math.max(_c(gc(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),Ue[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=Be.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=os(t),a=ls(t,n),o=ss(t,n),s=Ud(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},io=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=tc(e,t);return!n||S[n.id]>=ei(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},ao=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>io(e,t)),oo=(e,t)=>{if(!t||t>Ia(e))return 0;let n=vl(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},so=e=>{if(e.intro.diskBuild||ns(e)||as(e))return!1;let t=os(e);if(ls(e,t)>=ss(e,t))return!0;let n=U(t);return Ma(e,n)||ja(e,n)?!1:Va(e,n)>0&&Ga(e,n)>=t},co=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=Oa();e+=1){let n=K(t,e);if(!n?.rebuilding)continue;let r=Aa(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=cl(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(Ga(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},lo=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!uo(e),uo=e=>{let t=Oa(),{endBits:n}=Te(t);return Wa(e,t)>=n},fo=e=>lo(e),po=e=>{let t=Ml(e)?To(e):e,n=t.intro.capacity*2,r=la(t.intro)?n:t.intro.speedCapacity??t.intro.capacity;return Yo({...t,intro:{...t.intro,speedCapacity:r,capacity:n,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},mo=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!uo(e)},ho=e=>ua(e),go=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated||la(t)?!1:ho(t)*2<=t.capacity},_o=e=>go(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,vo=e=>{if(!e.intro?.speedUpgradeQueued||!la(e.intro))return e;let t=Math.max(0,Number(e.intro.speedUpgradeProgress)||0);return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t),speedUpgradeQueued:!1,speedUpgradeProgress:0}}},yo=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;if(la(t.intro))return vo(t);let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=ho(t.intro),a=Math.min(t.intro.bits,da(t.intro)*ba(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},bo=e=>xo(e),xo=e=>mo(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,So=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(uo(t))return Co(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,da(t.intro)*ba(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?po(a):a},Co=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,wo=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],To=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of Ie)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of wo)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},Eo=e=>(e.intro?.capacity??0)>=Oe,Do=e=>(e.intro?.capacity??0)>=Ae,Oo=[`B`,...b.map(e=>e.symbol)],ko=1e3,Ao=[`b`,...Oo.slice(1).map(e=>e.replace(/B$/,`b`))],jo=e=>{let t=1,n=0;for(;e/t>=ko&&n<Ao.length-1;)t*=ko,n+=1;return{symbol:Ao[n],divisor:t}},Mo=e=>{let t=8,n=0;for(;e/t>=ko&&n<Oo.length-1;)t*=ko,n+=1;return{symbol:Oo[n],divisor:t}},No=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],Po=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<No.length-1;)n*=Se,r+=1;return{symbol:No[r],divisor:n}},Fo=(e,t)=>Math.floor(e*10**t)/10**t,Io=e=>{let t=Math.floor(e);return`${B(t)} bit${t===1?``:`s`}`},Lo=3,Ro=5,zo=e=>e>=4?Ro:4,W=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(Lo,Math.max(0,zo(t)-t))},Bo=(e,t)=>{if(t){let n=e/t.divisor,r=Fo(n,W(n));return r>0&&r<1?Io(e):`${B(r)} ${t.symbol}`}return Io(e)},Vo=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),Ho=(e,t)=>{if(!t)return Io(e);let n=e/t.divisor,r=W(n),i=Fo(n,r);return i>0&&i<1?Io(e):i===0?`${B(i)} ${t.symbol}`:`${Vo[r].format(i)} ${t.symbol}`},Uo=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},Wo=e=>e.replace(/^[\d,]*\.?\d+/,e=>Uo(Number(e.replace(/,/g,``)))),Go=e=>Bo(e,Po(e,!0)),Ko=e=>Bo(e,Mo(e)),qo=e=>Gt(b[0],e.purchaseLevels?.[b[0].id]??1)*8,Jo=e=>{let t=qo(e);if(e.intro.bits<t)return e;let n=b[0].id;return aa(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},Yo=e=>e.intro?.mainGameUnlocked||!Do(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},Xo=e=>t=>{if(!t.intro.byteCreated)return t;let n=da(t.intro)*Wu(t.intro),r=ga(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},Zo=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=Kt(V(e),n,2**53-1),i=qo(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return aa(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},Qo=e=>je*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),$o=e=>Pa(e)*Le.length,es=e=>Math.min($o(e),oa(e.intro)),ts=e=>Qo(oa(e.intro)),ns=e=>{let t=os(e);return t<ts(e)&&!Ma(e,U(t))},rs=e=>e.intro?.diskBuild||!as(e)?!1:oa(e.intro)<$o(e),is=e=>{if(!rs(e))return e;let t=oa(e.intro)+1,n=mf(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},as=e=>((e.intro?.disksBuiltTotal??{})[Qo(es(e))]??0)>=9,os=e=>{let t=e.intro?.disksBuiltTotal??{},n=es(e),r=1,i=Qo(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=Qo(r);return i},ss=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),cs=(e,t)=>t*ss(e,t),ls=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,G=Ko,us=e=>({symbol:Oo[e]??Oo[Oo.length-1],divisor:8*ko**e}),ds=(e,t)=>Bo(e,us(t)),fs=(e,t)=>{let n=us(t);return e>0&&e<n.divisor?Mo(e):n},ps=(e,t)=>Bo(e,fs(e,t)),ms=(e,t)=>Ho(e,fs(e,t)),hs=e=>Bo(e,jo(e)),gs=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=os(e),i=[];for(let t=1;t<=Ia(e);t+=1)i.push(vl(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},_s=e=>so(e)&&!ao(e),vs=e=>!_s(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},ys=e=>e.intro?.diskBuildQueued||ns(e)||e.intro.diskBuild||as(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},bs=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,xs=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!_s(t))return t;let n=os(t),r=U(n),i=ls(t,n),a=ss(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?Ud(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=qa(t,r),u=Math.max(0,l-oo(t,r)),d=Va(t,r)*Qa(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-Tt){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-Tt;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},Ss=200,Cs=(e,t)=>{let n=U(t);return t/Math.max(Ha(e,n)*Qa(e,n),Number.MIN_VALUE)},ws=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!ns(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<Ss;e+=1){let e={...t,intro:n};if(!ns(e))break;let a=os(e),o=U(a);if(Ma(e,o)||ja(e,o)||Ga(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=Va(e,o)*Qa(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-oo(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},Ts=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!ns(e))return t;let n=oa(e.intro);for(let r=1;r<n;r+=1){let n=Qo(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,Va(e,U(n))<=0&&(t.projected=!0);let s=Cs(e,n);t.seconds+=(9-a-o)*s}return t},Es=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>Tt?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},Ds=e=>{let t=lc(e);return t?Qo(t+1):e*10},Os=e=>{let t=U(e);return!!t&&U(Ds(e))===t},ks=(e,t)=>e.intro?.diskWriteCache?.[t]??null,As=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,js=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],Ms=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,Ns=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,As(e)-(e.segmentsCollected??0)*t),r=js(e).reduce((e,t)=>e+Ms(t),0);return Math.min(1,Math.max(0,(n+r)/t))},Ps=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,Fs=(e,t)=>{let n=ks(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=js(n);return r.length>0&&r.every(t=>nc(e,t.size))},Is=e=>{let t=lc(e);if(!t||t<=1)return null;let n=Qo(t-1),r=U(e);return r&&U(n)===r?n:null},Ls=(e,t)=>!Is(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),Rs=(e,t,n=!1)=>({sourceSize:Is(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),zs=(e,t)=>{if(!Is(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=ks(e,t);return!n||!n.expedite&&n.segmentsCollected<10},Bs=(e,t)=>!!ks(e,t)?.expedite,Vs=e=>t=>{if(!zs(t,e))return t;let n=ks(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:Rs(t,e,!0)}}}},Hs=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},Us=(e,t)=>{let n=Va(e,U(t))*5;return t/Math.max(n,Number.MIN_VALUE)},Ws=(e,t,n,r)=>{let i=U(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of js(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=Aa(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||nc(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},Gs=1-1e-9,Ks=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),qs=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=U(s.sourceSize);if(c===U(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,Ka(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;Ls(t,e)&&(i[e]=Rs(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=U(c),d=Qa(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>Tt){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??Is(c);if(!(p>0))continue;let m=js(l),h=As(l),g=[];for(let t of m){if(nc(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>Tt?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=Hs(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-oo(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*Gs){let e=g.reduce((e,t)=>e+t.size,0);for(let n of Ws(s,c,c-h-e,g)){let e=Us(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*Gs){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&Ks(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},Js=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,Ys=(e,t)=>{let n=t/8,r=Va(e,U(t))*2;return n/Math.max(r,Number.MIN_VALUE)},Xs=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,Zs=(e,t)=>Js(e,t)?nc(e,t):!1,Qs=e=>dc(e)===Le[0],$s=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=Ia(t),d=e=>{if(!Qs(e))return!1;let t=U(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=U(n);r&&(i[r]=Math.min(a(r)+s[n],Ka(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(vl(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=U(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*Va(t,r)*5*Qa(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*Tt?n:e,l=!0}}}for(let e of p){if(c[e]||ks(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||nc(t,e))continue;let a=Ys(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||nc(h,r))continue;let a=i.remainingSeconds-e*Qa(t,U(r));if(a>Tt){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},ec=e=>{let t=dc(e);return t?Le.indexOf(t)+1:null},tc=(e,t)=>{let n=uc(t),r=ec(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},nc=(e,t)=>tc(e,t)!==void 0,rc=(e,t)=>{let n=uc(t),r=ec(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},ic=(e,t)=>tc(e,t)?.name??null,ac=e=>t=>{if(!io(t,e))return t;let n=tc(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return aa(n.id,V(t))({...t,intro:{...t.intro,disks:o}})},oc=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>io(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:ac(t)(e)},sc=(e,t)=>{if(e<1||e>10)return null;let n=Le[t-1];return n===void 0?null:Qo(_l(e,n))},cc=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=ei(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=sc(S[e.id]+1,1);if(i===null||io(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=Gt(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=V(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=aa(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},lc=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/je;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||Qo(n)!==e?null:n},uc=e=>{let t=lc(e);return!t||t>He?null:Math.floor((t-1)/Le.length)+1},dc=e=>{let t=lc(e);return!t||t>He?null:Le[(t-1)%Le.length]},fc=e=>Ve[e-1]??null,K=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??Ot(),pc=(e,t)=>K(e,t)?.capacityLevel??0,mc=(e,t)=>pc(e,t)>=3,hc=(e,t)=>Ue[Math.min(pc(e,t),3)]+Math.max(0,K(e,t)?.resetCount??0)*1e3,gc=(e,t)=>{let n={};return Le.forEach((t,r)=>{n[t]=r<e?Re[r]:0}),n[ze]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},_c=e=>Be.reduce((t,n)=>t+n*(e[n]??0),0),vc=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},yc=(e,t)=>gc(pc(e,t),K(e,t)?.resetCount??0),bc=(e,t)=>_c(yc(e,t)),xc=(e,t)=>Math.min(hc(e,t),bc(e,t)+1),Sc=(e,t)=>vc(K(e,t)?.depositedUnits??0).disks,Cc=(e,t)=>K(e,t)?.fillBits??0,wc=(e,t)=>{let n=vl(t);return n>0&&Cc(e,t)>=n},Tc=(e,t)=>{let n=vl(t);return n>0?Math.min(1,Math.max(0,Cc(e,t)/n)):0},Ec=(e,t)=>K(e,t)?.lakeTransfer??null,Dc=(e,t)=>{let n=Ec(e,t);if(!n)return 0;let r=n.target*vl(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},Oc=(e,t)=>(K(e,t)?.depositedUnits??0)+ +!!wc(e,t),kc=(e,t)=>{let n=K(e,t),r=vl(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},Ac=(e,t)=>{let n=Uc(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=kc(e,t);return r>=n*(1-1e-9)&&tl(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},jc=(e,t)=>Uc(t)(e)<=xc(e,t),Mc=(e,t)=>!wc(e,t),Nc=(e,t)=>{let n=K(e,t);if(!n||n.lakeTransfer||!wc(e,t))return null;let r=yc(e,t),i=n.depositedUnits??0,a=vc(i).disks;for(let e=Be.length-1;e>=0;--e){let t=Be[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},Pc=(e,t,n)=>Va(e,t)*Qa(e,t)*(n===1?2:5),Fc=(e,t)=>{let n=Cc(e,t);return n>0&&n<vl(t)},Ic=(e,t)=>{let n=Ga(e,t);return n>0&&qa(e,t)>=n},Lc=(e,t)=>!!K(e,t)?.acquiring,Rc=(e,t)=>Fc(e,t)?!0:Lc(e,t)?Cl(e,t)&&!wl(e,t,!0)&&qa(e,t)>oo(e,t):Ic(e,t),zc=e=>he.slice(0,dr(e.intro)).reduce((e,t)=>e+(t.lakeSpeed??0),0),Bc=(e,t)=>Math.round((.1+.1*Math.max(0,K(e,t)?.resetCount??0)+zc(e))*1e6)/1e6,Vc=(e,t)=>(e.intro?.disksBuiltTotal?.[vl(t)]??0)>0,Hc=(e,t)=>(K(e,t)?.boostersUnlocked??!1)||Vc(e,t),Uc=e=>t=>{let n=K(t,e);return n?(n.purchased??0)+1:0},Wc=(e,t)=>{let n=Ne[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},Gc=(e,t)=>Wc(e,t)?18:10,Kc=(e,t)=>Gc(e,Ie.indexOf(t)+1),qc=(e,t)=>{let n=Ie[t-1];return n?Math.max(0,Gc(e,t)-(e.intro?.[n]??0)):0},Jc=(e,t)=>{if(!Wc(e,t))return 0;let n=Ne[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=Ie[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+Zc(e,t-1))},Yc=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},Xc=(e,t)=>Yc(e,t)!==null,Zc=(e,t)=>{let n=Yc(e,t);return n===null?0:Math.floor(n/1+Tt)},Qc=(e,t)=>{let n=Ne[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!Xc(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<Kc(e,n.outputField)},$c=e=>t=>Qc(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,el=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=Ne[r],s=Yc(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=Kc({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+Tt)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=Kc({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},tl=(e,t,n)=>{if(!K(e,t)||!(n>0))return null;let r=Sc(e,t),i=[(r[1]??0)+ +!!wc(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},nl=(e,t)=>Hc(e,t)&&qc(e,t)>0&&tl(e,t,Uc(t)(e))!==null,rl=(e,t)=>qc(e,t)<=0,il=(e,t=1)=>n=>{let r=K(n,e);if(!r||!Hc(n,e))return n;let i=Ie[e-1];if(!i)return n;let a=qc(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=tl(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=Sc(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=gl(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},al=(e,t)=>{let n=Uc(t)(e);if(tl(e,t,n)!==null)return 0;let r=vl(t);return Math.max(r,(n-kc(e,t))*r)},ol=(e,t)=>{if(ka(e,t)||!Vc(e,t))return!1;let n=vl(t);return al(e,t)<=n*1e-9||Uc(t)(e)>xc(e,t)||!Mc(e,t)?!1:qa(e,t)>0&&Rc(e,t)},sl=e=>t=>{if(!ol(t,e))return t;let n=al(t,e),r=qa(t,e),i=vl(e)-Cc(t,e),a=Lc(t,e)&&!Fc(t,e)?Math.max(0,r-oo(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=yl(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},cl=(e,t)=>n=>{let r=K(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},ll=(e,t)=>K(e,t)?.autoConvertActive??!1,ul=(e,t)=>!!K(e,t)?.boosterAuto||ka(e,t),dl=(e,t)=>{let n=K(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!Hc(e,t)||!Vc(e,t)?!1:qc(e,t)>0},fl=(e,t)=>{let n=K(e,t);return!n||n.rebuilding||!ka(e,t)?!1:!n.lakeTransfer&&Oc(e,t)>=hc(e,t)&&Uc(t)(e)>hc(e,t)},pl=e=>t=>{if(!fl(t,e))return t;let n=K(t,e),r=Aa(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=U(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return br({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},ml=e=>t=>{let n=K(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&nl(t,e)?il(e,1)(t):dl(t,e)?cl(e,!0)(t):t},hl=e=>{let t=e;for(let e=1;e<=10;e+=1){if(ka(t,e)&&!K(t,e)?.boosterAuto){let n=K(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}K(t,e)?.boosterAuto&&Uc(e)(t)<=hc(t,e)&&nl(t,e)&&(t=il(e,1)(t)),ll(t,e)&&(qc(t,e)<=0?t=cl(e,!1)(t):Vc(t,e)?nl(t,e)?(t=il(e,1)(t),t=cl(e,!1)(t)):t=sl(e)(t):t=cl(e,!1)(t))}return t},gl=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},_l=(e,t)=>(e-1)*Le.length+Le.indexOf(t)+1,vl=e=>Qo(_l(e,Le[0])),yl=(e,t,n,r)=>{let i=t[n]??K(e,n),a=vl(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},bl=(e,t,n,r,i)=>{let a=K(e,t),o=Math.max(0,vl(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=yl(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},xl=(e,t,n)=>{let r=K(e,t);if(!r||!Vc(e,t))return r;let i=vl(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=Nc(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=Pc(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},Sl=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=K(t,r),a=xl(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},Cl=(e,t)=>Aa(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),wl=(e,t,n=!1)=>{let r=e.intro??{};if(Ma(e,t))return!0;if(ns(e)){let n=os(e);if(U(n)===t&&Ga(e,t)>=n)return!0}if(r.diskBuild&&U(r.diskBuild.size)===t)return!0;let i=Aa(t);return!n&&i.some(t=>ls(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(os(e))},Tl=(e,t)=>!Vc(e,t)||!Mc(e,t)?!1:Fc(e,t)?qa(e,t)>0:(Lc(e,t)||Ic(e,t))&&Cl(e,t)&&!wl(e,t,Lc(e,t))&&qa(e,t)>oo(e,t),El=(e,t=null)=>n=>{if(!(e>0))return n;let r=Ia(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!Tl(n,o))continue;let r=qa(n,o),s=Fc(n,o)?r:Math.max(0,r-oo(n,o));if(s<=0)continue;let c=Va(n,o)*Qa(n,o)*Bc(n,o),{lake:l,remainingBits:u,changed:d}=bl(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},Dl=(e,t)=>kc(e,t)*vl(t),Ol=(e,t)=>Qo(_l(e,Le[t])),kl=(e,t)=>{if(t<1||t>10||mc(e,t))return!1;let n=Ol(t,pc(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},Al=(e,t)=>kl(e,t),jl=e=>t=>{if(!Al(t,e))return t;let n=K(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:pc(t,e)+1}}}}},Ml=e=>(e.intro?.capacity??0)>=Me,Nl=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},Pl=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=Nl(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,Kc(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},Fl=Pl(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),Il=Pl(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),Ll=Pl(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),Rl=Pl(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),zl=Pl(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),Bl=Pl(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),Vl=Pl(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Hl=Pl(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Ul=Pl(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Wl=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=Kc(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},Gl=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(Kc(r,n),(r.intro?.[n]??0)+1))}}},Kl=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!Xc(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=ql(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?Wl(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?od(d,a+1):d;return Gl(e,i,n)(f)},ql=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=Ne.length)return 0;let n=t+1,r=Va(e,n);return!(r>0)||!Number.isFinite(r)?0:8*Ys(e,Qo((n-1)*Le.length+1))},Jl=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,Yl=(e,t)=>n=>Jl(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,Xl=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<Kc(e,n),Zl=(e,t)=>{let n=Ne[t];return n?Xl(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},Ql=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=Ne[e];return Xl(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},$l=e=>Kl(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),eu=Yl(`computeNodes`,`autoMergeCoresIntoNode`),tu=e=>Jl(e,`computeNodes`,`autoMergeCoresIntoNode`),nu=Ql(0),ru=e=>Kl(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),iu=Yl(`computeClusters`,`autoMergeNodesIntoCluster`),au=e=>Jl(e,`computeClusters`,`autoMergeNodesIntoCluster`),ou=Ql(1),su=e=>Kl(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),cu=Yl(`computeNetworks`,`autoMergeClustersIntoNetwork`),lu=e=>Jl(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),uu=Ql(2),du=e=>Kl(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),fu=Yl(`computeGrids`,`autoMergeNetworksIntoGrid`),pu=e=>Jl(e,`computeGrids`,`autoMergeNetworksIntoGrid`),mu=Ql(3),hu=e=>Kl(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),gu=Yl(`computeFabrics`,`autoMergeGridsIntoFabric`),_u=e=>Jl(e,`computeFabrics`,`autoMergeGridsIntoFabric`),vu=Ql(4),yu=e=>Kl(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),bu=Yl(`computeClouds`,`autoMergeFabricsIntoCloud`),xu=e=>Jl(e,`computeClouds`,`autoMergeFabricsIntoCloud`),Su=Ql(5),Cu=e=>Kl(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),wu=Yl(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Tu=e=>Jl(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Eu=Ql(6),Du=e=>Kl(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),Ou=Yl(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),ku=e=>Jl(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Au=Ql(7),ju=e=>Kl(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),Mu=Yl(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Nu=e=>Jl(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Pu=Ql(8),Fu=[$l,ru,su,du,hu,yu,Cu,Du,ju],Iu=e=>Number.isInteger(e)&&e>=1&&e<=Ie.length,Lu=e=>Iu(e)?Ie[e-1]:null,Ru=(e,t)=>{let n=Pe[e];return!n||!Iu(t)?0:n.multiplier},zu=(e,t)=>{let n=Pe[e];return!n||!Iu(t)?0:n.durationSeconds},Bu=e=>{let t=e?.computeBoostType??null;if(!t||!Pe[t])return null;let n=e.computeBoostTierIndex??1,r=Iu(n)?n:1,i=Pe[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},Vu=e=>{let t=e?.computeBoosts??{},n=Bu(e),r=[];for(let e of Object.keys(Pe)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},Hu=(e,t)=>Vu(e).find(e=>e.type===t)??null,Uu=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},Wu=e=>Vu(e).reduce((e,t)=>e+Pe[t.type].multiplier,0)||1,Gu=(e,t)=>Vu(e).reduce((e,n)=>e+(n.queue[0]>=t?Pe[n.type].multiplier:0),0)||1,Ku=e=>Vu(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),qu=(e,t)=>1+Vu(e).reduce((e,n)=>e+(n.queue[0]>=t?Pe[n.type].poolBonusPercent??0:0),0)/100,Ju=(e,t,n)=>{if(!Pe[t])return!1;let r=Lu(n);return!r||(Hu(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},Yu=(e,t,n)=>Ju(e,t,n),Xu=(e,t)=>{let n=Hu(e.intro,t);return!!n&&Ju(e,t,n.queue[0])},Zu=(e,t)=>Xu(e,t),Qu=(e,t)=>Math.max(0,(Hu(e.intro,t)?.queue.length??0)-1),$u=(e,t)=>Qu(e,t)>0,ed=e=>t=>{if(!$u(t,e))return t;let n=Vu(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=Lu(i),o=Uu(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},q=(e,t)=>{let n=Hu(e.intro,t);return!!n&&n.queue.length===1},J=e=>t=>q(t,e)?Uu(t,Vu(t.intro).filter(t=>t.type!==e)):t,td=(e,t)=>n=>{if(!Yu(n,e,t))return n;let r=Lu(t),i=Vu(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:zu(e,t)};let s=Uu(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},nd=e=>t=>Zu(t,e)?hf(e,Hu(t.intro,e).queue[0])(t):t,rd=e=>t=>{let n=Vu(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=zu(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return Uu(t,r)},id=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},ad=e=>t=>!Pe[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},od=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=Pe[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return Yu(e,n,t)?hf(n,t)(e):e},sd=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},cd=(e,t,n)=>n+ +(Yr(e,`egressFees`)===t),ld=(e,t,n)=>{let r=cd(e,t,n);return Yr(e,`burnRate`)===t?Xt(t,r):Zt(t,r)},ud=(e,t,n)=>Math.max(Xt(t,cd(e,t,n)),ld(e,t,n)+(t===Ct()?0:1)),dd=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(Yr(e,`clockGated`)===t||Yr(e,`rateLimit`)===t&&n+1>4)return!0;if(Yr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},fd=e=>t=>{if(vi(t))return t;let n=x[e];if(!n||!yi(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(dd(t,e))return t;let i=ld(t,e,r+1),a=t.resources[n.id]??0;return a<ud(t,e,r+1)?t:br({...t,resources:{...t.resources,[n.id]:z(a-i)},owned:{...t.owned,[n.id]:z(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},pd=e=>1*((S[e]??0)+1),md=e=>Math.max(0,Math.ceil(Math.log(nt/pd(e))/Math.log(tt))),hd=(e,t)=>Math.max(nt,pd(e)*tt**t),gd=(e,t)=>hd(t,e.autobuyerIntervalLevels?.[t]??0),_d=(e,t)=>Math.min(et,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-md(t))),vd=(e,t)=>2**_d(e,t),yd=e=>md(e)+et,bd=e=>La[e%10]*1e3**Math.floor(e/10),xd=(e,t)=>{let n=1,r=La.indexOf(e);for(;r===-1&&n<e;)n*=10,r=La.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*bd(r+t)},Sd=(e,t=b[0].id)=>((S[t]??0)+1)*xd(10,e),Cd=e=>t=>{if(vi(t)||ui(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=yd(e))return t;let r=Sd(n,e);if(z(t.purge.points)<r)return t;let i=Dn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},wd=e=>Math.max(0,Math.ceil(Math.log(nt/e)/Math.log(tt))),Td=e=>wd(it[e].baseSeconds),Ed=(e,t)=>Math.max(nt,it[t].baseSeconds*tt**(e.automationIntervalLevels?.[t]??0)),Dd=(e,t)=>xd(it[e].baseCost,t),Od=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,kd=Od,Ad=e=>t=>{if(!it[e]||vi(t)||ui(t,`global`,e)||!Od(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=Td(e))return t;let r=Dd(e,n);if(z(t.purge.points)<r)return t;let i=Dn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},jd=()=>wd(at.baseSeconds),Md=(e,t)=>Math.max(nt,at.baseSeconds*tt**(e.tierTickspeedIntervalLevels?.[t]??0)),Nd=(e,t=b[0].id)=>((S[t]??0)+1)*xd(at.baseCost,e),Pd=e=>t=>{if(vi(t)||ui(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=jd())return t;let r=Nd(n,e);if(z(t.purge.points)<r)return t;let i=Dn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},Fd=e=>t=>({...t,computeAutoChargeEnabled:!!e}),Id=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,Ld=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,Rd=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},zd=e=>{if(vi(e)||Jr(e,`clockSpeedDisabled`)||!on(e))return e;let t=e.globalTickspeedMultiplier??null,n=rn(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},Bd=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(z(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(z(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(z(n?.capacityLevel??0))),r=Math.max(0,Math.floor(z(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,z(e?.capacity??8)),speedCapacity:Math.max(8,z(e?.speedCapacity??e?.capacity??8))}},Vd=(e,t)=>{let n=e??Bd(null),r=t??Bd(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},Hd=(e,t)=>{let n=os(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:ls(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},Ud=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=ls(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},Wd=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=Da(n);e!==n&&(n=e,r=!0)}if(!ns(n)&&Hd(n,t)){let e=vs(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=!la(n.intro)&&(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=_o(n)),a===n&&i&&(a=xo(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((K(n,t)?.purchased??0)<(i.purchased??0)&&nl(n,t)){let e=il(t,(i.purchased??0)-(K(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((K(n,t)?.purchased??0)>=(i.purchased??0)||rl(n,t)||Uc(t)(n)>hc(n,t))&&pc(n,t)<(i.capacityLevel??0)){let e=jl(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},Gd=e=>{let t=At().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=Vd(n.foundryResetCaps,Bd(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:oa(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},Kd=e=>{if(z(e.resources.base)<ai(e))return e;let t=Kr(e);if(!t)return yn(Yd(e,!0));let n=qr(e,t.id),r=z(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return yn({...Yd(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:wt(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},qd=e=>t=>{if(!Gr(e)||Kr(t)||!ci(t,e))return t;let n={...At().challenges,...t.challenges};return{...Yd(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:wt()}}},Jd=e=>Kr(e)?yn({...Yd(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:wt()}}):e,Yd=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=Wr(e),i=t?Mi(e.resources[O],n,r):0,a=At(),o=e.purge.count+ +!!t,s={id:`p${o}-${Date.now()}`,at:Date.now(),purgeNumber:o,pointsAwarded:i,moneyBits:z(e.resources[O])},c=e.prestigeMuseum??a.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return en({...a,challenges:e.challenges??a.challenges,achievements:e.achievements??a.achievements,daily:e.daily??a.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...a.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??a.intro.mainGameUnlocked,capacity:e.intro?.capacity??a.intro.capacity,byteCreated:e.intro?.byteCreated??a.intro.byteCreated,bits:e.intro?.bits??a.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??a.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??a.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??a.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??a.intro.diskCache,diskBuild:e.intro?.diskBuild??a.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??a.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??a.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??a.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??a.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??a.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:oa(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??a.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??a.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??a.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??a.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??a.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??a.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??a.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??a.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??a.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??a.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??a.intro.computeNodes,computeClusters:e.intro?.computeClusters??a.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??a.intro.computeNetworks,computeGrids:e.intro?.computeGrids??a.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??a.intro.computeFabrics,computeClouds:e.intro?.computeClouds??a.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??a.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??a.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??a.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??a.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??a.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??a.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??a.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??a.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??a.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??a.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??a.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??a.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??a.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??a.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??a.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??a.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??a.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??a.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??a.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??a.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??a.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??a.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??a.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??a.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??a.autobuyers,autobuyersEnabled:e.autobuyersEnabled??a.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??a.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??a.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??a.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??a.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??a.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??a.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??a.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??a.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??a.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??a.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??a.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??a.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??a.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??a.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??a.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??a.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??a.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??a.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??a.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??a.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??a.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??a.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??a.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??a.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??a.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??a.autoGlobalTickspeedEnabled,era:e.era??a.era,eons:e.eons??a.eons,hyperscalerCount:e.hyperscalerCount??a.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??a.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??a.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??a.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||z(e.purge.points)+i>=100,owned:e.computeFlops?.owned??a.computeFlops.owned,cumulativeBoost:a.computeFlops.cumulativeBoost},purge:{...a.purge,points:z(e.purge.points)+i,count:o,unboundedUnlocked:r,highestAward:Math.max(z(e.purge.highestAward??0),i)}})},Xd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},Zd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},Qd=(e,t)=>t!==e&&Jr(t,`bitRot`)?pi(t,{cycleSeconds:0}):t,$d=(e,t)=>t===e?t:yn(t),ef=e=>Qd(e,$d(e,nf(e))),tf=e=>{let t=af(e);return t===e?Qd(e,$d(e,t)):br(rf(e,Qd(e,$d(e,t))))},nf=e=>{if(vi(e))return e;let t=Nr(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<Pr(e))return e;let n=At(),r=Mr(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<ei(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??n.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,manualPurchaseThisCycle:!!e.manualPurchaseThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:z(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:Lr(e)??n.overclockLastClaimCompletedLevels}},rf=(e,t)=>{let n=Math.max(0,(e.purchaseLevels?.[ti(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=Lr(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&yr(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),Wr(e)&&n>=12&&yr(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},af=e=>{if(vi(e)||Jr(e,`overclockDisabled`))return e;let t=ti(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<Fr(e))return e;let r=At();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??r.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,manualPurchaseThisCycle:!!e.manualPurchaseThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},of=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,sf=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,cf=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,lf=e=>t=>df(e,!1)(t),uf=e=>t=>{let n=z(t.owned?.[ti(t).id])<=0,r=df(e,!0)(t);if(!n||r===t||!le.enabled)return r;let i=r.achievements??At().achievements;return br({...r,achievements:{...i,counters:{...i.counters,emptyRestages:(i.counters?.emptyRestages??0)+1}}})},df=(e,t)=>n=>{if(vi(n)||Jr(n,`restageDisabled`)||!cn(n))return n;let r=ti(n).id;if(!t&&z(n.owned?.[r])<=0)return n;let i=Math.floor(z(e));if(i<=0)return n;let a=n.lastTierXpConsumed??0;if(i<un(a))return n;let o=z(n.purge.xp);if(i>o)return n;let s=b.filter(e=>e.id!==r).map(e=>e.id);return{...n,purge:{...n.purge,xp:o-i},lastTierXpConsumed:a+i,owned:{...n.owned,...s.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...n.resources,[O]:0,...s.reduce((e,t)=>({...e,[t]:0}),{})}}},ff=e=>{let t=Kd(e);if(t===e||!le.enabled)return t;let n=Wr(e)&&z(e.resources?.base)>=8e100?sr(t,`overflowPurges`,1,`max`):t;if(t.purge.count<=e.purge.count)return n;let r=sr(n,`purges`,or(e)+1,`max`);return e.manualPurchaseThisCycle?r:sr(r,`handsFreePurges`,1,`max`)},pf=e=>{let t=Er(e);if(t===e||!le.enabled)return t;let n=Vn(e),r=z(t.activePlaySeconds??0),i=t.achievements?.counters?.lastRebootPlaySeconds,a=sr(t,`purges`,or(e),`max`);return a=sr(a,`kernelsEarned`,Math.max(a.achievements.counters.kernelsEarned??0,z(e.eons?.balance??0))+n,`max`),i!=null&&r-i<=3600&&(a=sr(a,`quickReboots`,1,`max`)),sr(a,`lastRebootPlaySeconds`,r,`set`)},mf=e=>{let t=Gd(e);return t===e?t:sr(t,`reformats`,1)},hf=(e,t)=>n=>{let r=td(e,t)(n);if(r===n||!le.enabled)return r;let i=e===`burst`?sr(r,`turboBoosts`,1,`max`):r;return(Hu(i.intro,e)?.queue.length??0)>=10?sr(i,`maxBoostStack`,1,`max`):i},gf=e=>t=>{let n=e(t);return n===t||n.manualPurchaseThisCycle?n:{...n,manualPurchaseThisCycle:!0}},_f=`-ms-`,vf=`-moz-`,yf=`-webkit-`,bf=`comm`,xf=`rule`,Sf=`decl`,Cf=`@import`,wf=`@namespace`,Tf=`@keyframes`,Ef=`@layer`,Df=Math.abs,Of=String.fromCharCode,kf=Object.assign;function Af(e,t){return Pf(e,0)^45?(((t<<2^Pf(e,0))<<2^Pf(e,1))<<2^Pf(e,2))<<2^Pf(e,3):0}function jf(e){return e.trim()}function Mf(e,t){return(e=t.exec(e))?e[0]:e}function Y(e,t,n){return e.replace(t,n)}function Nf(e,t,n){return e.indexOf(t,n)}function Pf(e,t){return e.charCodeAt(t)|0}function Ff(e,t,n){return e.slice(t,n)}function If(e){return e.length}function Lf(e){return e.length}function Rf(e,t){return t.push(e),e}function zf(e,t){return e.map(t).join(``)}function Bf(e,t){return e.filter(function(e){return!Mf(e,t)})}var Vf=1,Hf=1,Uf=0,X=0,Wf=0,Gf=``;function Kf(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Vf,column:Hf,length:o,return:``,siblings:s}}function qf(e,t){return kf(Kf(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Jf(e){for(;e.root;)e=qf(e.root,{children:[e]});Rf(e,e.siblings)}function Yf(){return Wf}function Xf(){return Wf=X>0?Pf(Gf,--X):0,Hf--,Wf===10&&(Hf=1,Vf--),Wf}function Zf(){return Wf=X<Uf?Pf(Gf,X++):0,Hf++,Wf===10&&(Hf=1,Vf++),Wf}function Qf(){return Pf(Gf,X)}function $f(){return X}function ep(e,t){return Ff(Gf,e,t)}function tp(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function np(e){return Vf=Hf=1,Uf=If(Gf=e),X=0,[]}function rp(e){return Gf=``,e}function ip(e){return jf(ep(X-1,sp(e===91?e+2:e===40?e+1:e)))}function ap(e){for(;(Wf=Qf())&&Wf<33;)Zf();return tp(e)>2||tp(Wf)>3?``:` `}function op(e,t){for(;--t&&Zf()&&!(Wf<48||Wf>102||Wf>57&&Wf<65||Wf>70&&Wf<97););return ep(e,$f()+(t<6&&Qf()==32&&Zf()==32))}function sp(e){for(;Zf();)switch(Wf){case e:return X;case 34:case 39:e!==34&&e!==39&&sp(Wf);break;case 40:e===41&&sp(e);break;case 92:Zf()}return X}function cp(e,t){for(;Zf()&&e+Wf!==57&&(e+Wf!==84||Qf()!==47););return`/*`+ep(t,X-1)+`*`+Of(e===47?e:Zf())}function lp(e){for(;!tp(Qf());)Zf();return ep(e,X)}function up(e){return rp(dp(``,null,null,null,[``],e=np(e),0,[0],e))}function dp(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Zf()){case 40:if(m!=108&&Pf(C,d-1)==58){Nf(C+=Y(ip(v),`&`,`&\f`),`&\f`,Df(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=ip(v);break;case 9:case 10:case 13:case 32:C+=ap(m);break;case 92:C+=op($f()-1,7);continue;case 47:switch(Qf()){case 42:case 47:Rf(pp(cp(Zf(),$f()),t,n,c),c),(tp(m||1)==5||tp(Qf()||1)==5)&&If(C)&&Ff(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=If(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=Y(C,/\f/g,``)),p>0&&(If(C)-d||h===0&&m===47)&&Rf(p>32?mp(C+`;`,r,n,d-1,c):mp(Y(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Rf(S=fp(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)dp(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(Pf(C,3)===110)break;case 108:if(Pf(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?dp(e,S,S,r&&Rf(fp(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):dp(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+If(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Xf()==125)continue}switch(C+=Of(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(If(C)-1)*_,_=1;break;case 64:Qf()===45&&(C+=ip(Zf())),f=Qf(),u=d=If(y=C+=lp($f())),v++;break;case 45:m===45&&If(C)==2&&(h=0)}}return a}function fp(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=Lf(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=Ff(e,f+1,f=Df(g=o[h])),b=e;v<m;++v)(b=jf(g>0?p[v]+` `+y:Y(y,/&\f/g,p[v])))&&(c[_++]=b);return Kf(e,t,n,i===0?xf:s,c,l,u,d)}function pp(e,t,n,r){return Kf(e,t,n,bf,Of(Yf()),Ff(e,2,-2),0,r)}function mp(e,t,n,r,i){return Kf(e,t,n,Sf,Ff(e,0,r),Ff(e,r+1,-1),r,i)}function hp(e,t,n){switch(Af(e,t)){case 5103:return yf+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return yf+e+e;case 4855:return yf+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return vf+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return yf+e+vf+e+_f+e+e;case 5936:switch(Pf(e,t+11)){case 114:return yf+e+_f+Y(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return yf+e+_f+Y(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return yf+e+_f+Y(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return yf+e+_f+e+e;case 6165:return yf+e+_f+`flex-`+e+e;case 5187:return yf+e+Y(e,/(\w+).+(:[^]+)/,yf+`box-$1$2`+_f+`flex-$1$2`)+e;case 5443:return yf+e+_f+`flex-item-`+Y(e,/flex-|-self/g,``)+(Mf(e,/flex-|baseline/)?``:_f+`grid-row-`+Y(e,/flex-|-self/g,``))+e;case 4675:return yf+e+_f+`flex-line-pack`+Y(e,/align-content|flex-|-self/g,``)+e;case 5548:return yf+e+_f+Y(e,`shrink`,`negative`)+e;case 5292:return yf+e+_f+Y(e,`basis`,`preferred-size`)+e;case 6060:return yf+`box-`+Y(e,`-grow`,``)+yf+e+_f+Y(e,`grow`,`positive`)+e;case 4554:return yf+Y(e,/([^-])(transform)/g,`$1`+yf+`$2`)+e;case 6187:return Y(Y(Y(e,/(zoom-|grab)/,yf+`$1`),/(image-set)/,yf+`$1`),e,``)+e;case 5495:case 3959:return Y(e,/(image-set\([^]*)/,yf+"$1$`$1");case 4968:return Y(Y(e,/(.+:)(flex-)?(.*)/,yf+`box-pack:$3`+_f+`flex-pack:$3`),/space-between/,`justify`)+yf+e+e;case 4200:if(!Mf(e,/flex-|baseline/))return _f+`grid-column-align`+Ff(e,t)+e;break;case 2592:case 3360:return _f+Y(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Mf(e.props,/grid-\w+-end/)})?~Nf(e+(n=n[t].value),`span`,0)?e:_f+Y(e,`-start`,``)+e+_f+`grid-row-span:`+(~Nf(n,`span`,0)?Mf(n,/\d+/):+Mf(n,/\d+/)-Mf(e,/\d+/))+`;`:_f+Y(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Mf(e.props,/grid-\w+-start/)})?e:_f+Y(Y(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return Y(e,/(.+)-inline(.+)/,yf+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(If(e)-1-t>6)switch(Pf(e,t+1)){case 109:if(Pf(e,t+4)!==45)break;case 102:return Y(e,/(.+:)(.+)-([^]+)/,`$1`+yf+`$2-$3$1`+vf+(Pf(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Nf(e,`stretch`,0)?hp(Y(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return Y(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return _f+n+`:`+r+s+(i?_f+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(Pf(e,t+6)===121)return Y(e,`:`,`:`+yf)+e;break;case 6444:switch(Pf(e,Pf(e,14)===45?18:11)){case 120:return Y(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+yf+(Pf(e,14)===45?`inline-`:``)+`box$3$1`+yf+`$2$3$1`+_f+`$2box$3`)+e;case 100:return Y(e,`:`,`:`+_f)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Y(e,`scroll-`,`scroll-snap-`)+e}return e}function gp(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function _p(e,t,n,r){switch(e.type){case Ef:if(e.children.length)break;case Cf:case wf:case Sf:return e.return=e.return||e.value;case bf:return``;case Tf:return e.return=e.value+`{`+gp(e.children,r)+`}`;case xf:if(!If(e.value=e.props.join(`,`)))return``}return If(n=gp(e.children,r))?e.return=e.value+`{`+n+`}`:``}function vp(e){var t=Lf(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function yp(e){return function(t){t.root||(t=t.return)&&e(t)}}function bp(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Sf:e.return=hp(e.value,e.length,n);return;case Tf:return gp([qf(e,{value:Y(e.value,`@`,`@`+yf)})],r);case xf:if(e.length)return zf(n=e.props,function(t){switch(Mf(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Jf(qf(e,{props:[Y(t,/:(read-\w+)/,`:`+vf+`$1`)]})),Jf(qf(e,{props:[t]})),kf(e,{props:Bf(n,r)});break;case`::placeholder`:Jf(qf(e,{props:[Y(t,/:(plac\w+)/,`:`+yf+`input-$1`)]})),Jf(qf(e,{props:[Y(t,/:(plac\w+)/,`:`+vf+`$1`)]})),Jf(qf(e,{props:[Y(t,/:(plac\w+)/,_f+`input-$1`)]})),Jf(qf(e,{props:[t]})),kf(e,{props:Bf(n,r)})}return``})}}function xp(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Sp=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Cp=`active`,wp=`data-styled-version`,Tp=`6.6.0`,Ep=`/*!sc*/
`,Dp=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw xp(19);function Op(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var kp=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Op(`REACT_APP_SC_DISABLE_SPEEDY`)??Op(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Ap=`sc-keyframes-`,jp={},Mp=new Map,Np=new Map,Pp=1,Fp=e=>{if(Mp.has(e))return Mp.get(e);for(;Np.has(Pp);)Pp++;let t=Pp++;return Mp.set(e,t),Np.set(t,e),t},Ip=e=>Np.get(e),Lp=(e,t)=>{Pp=t+1,Mp.set(e,t),Np.set(t,e)},Rp=Object.freeze([]),zp=Object.freeze({});function Bp(e,t,n=zp){return e.theme!==n.theme&&e.theme||t||n.theme}var Vp=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Hp=/(^-|-$)/g;function Up(e){return e.replace(Vp,`-`).replace(Hp,``)}var Wp=/(a)(d)/gi,Gp=e=>String.fromCharCode(e+(e>25?39:97));function Kp(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Gp(t%52)+n;return(Gp(t%52)+n).replace(Wp,`$1-$2`)}var qp=5381,Jp=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Yp=e=>Jp(qp,e);function Xp(e){return Kp(Yp(e)>>>0)}function Zp(e){return e.displayName||e.name||`Component`}function Qp(e){return typeof e==`string`&&!0}function $p(e){return Qp(e)?`styled.${e}`:`Styled(${Zp(e)})`}var em=Symbol.for(`react.memo`),tm=Symbol.for(`react.forward_ref`),nm={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},rm={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},im={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},am={[tm]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[em]:im};function om(e){return(`type`in(t=e)&&t.type.$$typeof)===em?im:`$$typeof`in e?am[e.$$typeof]:nm;var t}var sm=Object.defineProperty,cm=Object.getOwnPropertyNames,lm=Object.getOwnPropertySymbols,um=Object.getOwnPropertyDescriptor,dm=Object.getPrototypeOf,fm=Object.prototype;function pm(e,t,n){if(typeof t!=`string`){let r=dm(t);r&&r!==fm&&pm(e,r,n);let i=cm(t).concat(lm(t)),a=om(e),o=om(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in rm||n&&n[s]||o&&s in o||a&&s in a)){let n=um(t,s);try{sm(e,s,n)}catch{}}}}return e}function mm(e){return typeof e==`function`}var hm=Symbol.for(`react.forward_ref`);function gm(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===hm&&`styledComponentId`in e}function _m(e,t){return e&&t?e+` `+t:e||t||``}function vm(e,t){return e.join(t||``)}function ym(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function bm(e,t,n=!1){if(!n&&!ym(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=bm(e[n],t[n]);else if(ym(t))for(let n in t)e[n]=bm(e[n],t[n]);return e}function xm(e,t){Object.defineProperty(e,"toString",{value:t})}var Sm=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw xp(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Ep;return t}},Cm=`style[${Sp}][${wp}="${Tp}"]`,wm=RegExp(`^${Sp}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Tm=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Em=e=>{if(!e)return document;if(Tm(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Tm(t))return t}return document},Dm=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},Om=(e,t)=>{let n=(t.textContent??``).split(Ep),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(wm);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Lp(n,t),Dm(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},km=e=>{let t=Em(e.options.target).querySelectorAll(Cm);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Sp)!==Cp&&(Om(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Am=!1;function jm(){if(!1!==Am)return Am;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Am=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Am=t.getAttribute(`content`)||void 0}return Am=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var Mm=(e,t)=>{if(typeof document>`u`)throw xp(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Sp}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Sp,Cp),i.setAttribute(wp,Tp);let s=t||jm();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Nm=class{constructor(e,t){this.element=Mm(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw xp(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Pm=class{constructor(e,t){this.element=Mm(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Fm=Dp,Im={isServer:!Dp,useCSSOMInjection:!kp},Lm=class e{static registerId(e){return Fp(e)}constructor(e=zp,t={},n){this.options=Object.assign(Object.assign({},Im),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Dp&&Fm&&(Fm=!1,km(this)),xm(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Ip(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Sp+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Dp&&km(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Dp&&t.target!==this.options.target&&Em(this.options.target)!==Em(t.target)&&km(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Nm(t,n):new Pm(t,n))(this.options),new Sm(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Fp(e),e.startsWith(Ap)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Fp(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Fp(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},Rm=new WeakSet,zm={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Bm(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in zm||e.startsWith(`--`)?String(t).trim():t+`px`}var Vm=47;function Hm(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Um=Symbol.for(`sc-keyframes`);function Wm(e){return typeof e==`object`&&!!e&&Um in e}function Gm(e){return mm(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Km=e=>e==null||!1===e||e===``,qm=Symbol.for(`react.client.reference`);function Jm(e){return e.$$typeof===qm}function Ym(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Km(r)&&(Array.isArray(r)&&Rm.has(r)||mm(r)?t.push(Hm(n)+`:`,r,`;`):ym(r)?(t.push(n+` {`),Ym(r,t),t.push(`}`)):t.push(Hm(n)+`: `+Bm(n,r)+`;`))}}function Xm(e,t,n,r,i=[]){if(Km(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return Jm(e)?i:Gm(e)&&t?Xm(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Xm(e[a],t,n,r,i);return i}return gm(e)?(i.push(`.${e.styledComponentId}`),i):Wm(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):Jm(e)?i:ym(e)&&e.toString===Object.prototype.toString?(Ym(e,i),i):(i.push(e.toString()),i)}var Zm=Yp(Tp),Qm=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=Jp(Zm,t),this.baseStyle=n,Lm.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Gm(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=vm(Xm(r,e,t,n)))}else i+=vm(Xm(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Kp(Jp(Jp(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=_m(r,a)}}return r}},$m=/&/g;function eh(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function th(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==Vm||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===Vm&&(o=!1,c++);else if(l!==34&&l!==39||eh(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function nh(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&nh(a.children,t)}return e}function rh({options:e=zp,plugins:t=Rp}=zp){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace($m,r).replace(i,a))}),e.prefix&&o.push(bp),o.push(_p);let s=[],c=vp(o.concat(yp(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return th(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||eh(e,o)){if(s===0){if(t===Vm&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==Vm);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===Vm)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===Vm&&o+1<r&&e.charCodeAt(o+1)===Vm){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:th(i)):l===0?e:th(e)}(t),d=up(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=nh(d,e.namespace)),s=[],gp(d,c),s},u=e,d=qp;for(let e=0;e<t.length;e++)t[e].name||xp(15),d=Jp(d,t[e].name);return u!=null&&u.namespace&&(d=Jp(d,u.namespace)),u!=null&&u.prefix&&(d=Jp(d,`p`)),l.hash=d===qp?``:d.toString(),l}var ih=new Lm,ah=rh(),oh=v.createContext({shouldForwardProp:void 0,styleSheet:ih,stylis:ah,stylisPlugins:void 0});oh.Consumer;function sh(){return v.useContext(oh)}var ch=v.createContext(void 0);ch.Consumer;function lh(){let e=v.useContext(ch);if(!e)throw xp(18);return e}function uh(e){let t=v.useContext(ch),n=v.useMemo(()=>function(e,t){if(!e)throw xp(14);if(mm(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw xp(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(ch.Provider,{value:n},e.children):null}var dh={};function fh(e,t){let n=typeof e==`string`?Up(e):`sc`;dh[n]=(dh[n]||0)+1;let r=n+`-`+Xp(Tp+n+dh[n]);return t?t+`-`+r:r}function ph(e,t,n){let r=gm(e),i=e,a=!Qp(e),{attrs:o=Rp,componentId:s=fh(t.displayName,t.parentComponentId),displayName:c=$p(e)}=t,l=t.displayName&&t.componentId?Up(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Qm(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(ch),u=sh(),d=e.shouldForwardProp||u.shouldForwardProp,f=Bp(t,l,a)||zp,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=mm(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=_m(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=_m(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=Qp(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=_m(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?_m(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)bm(e,n,!0);return e}({},i.defaultProps,e):e}}),xm(m,()=>`.${m.styledComponentId}`),a&&pm(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var mh=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function hh(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var gh=e=>(Rm.add(e),e);function _h(e,...t){if(mm(e)||ym(e))return gh(Xm(hh(Rp,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Xm(n):gh(Xm(hh(n,t)))}function vh(e,t,n=zp){if(!t)throw xp(1,t);let r=(r,...i)=>e(t,n,_h(r,...i));return r.attrs=r=>vh(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>vh(e,t,Object.assign(Object.assign({},n),r)),r}var yh=e=>vh(ph,e),Z=yh;mh.forEach(e=>{Z[e]=yh(e)});var bh=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(mm(n)&&!gm(n))return!1}return!0}(e),Lm.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=vm(Xm(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function xh(e,...t){let n=_h(e,...t),r=`sc-global-${Xp(JSON.stringify(n))}`,i=new bh(n,r),a=e=>{let t=sh(),n=v.useContext(ch),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,jp,n,o);else{let s=Object.assign(Object.assign({},t),{theme:Bp(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var Sh,Ch=class{constructor(e,t){this[Sh]=!0,this.inject=(e,t=ah)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Ap+e,this.rules=t,Fp(this.id),xm(this,()=>{throw xp(12,String(this.name))})}getName(e=ah){return e.hash?this.name+Kp(e.hash>>>0):this.name}};function wh(e,...t){let n=vm(_h(e,...t));return new Ch(Xp(n),n)}Sh=Um,`${Sp}`,`${Sp}`,`${Sp}`;var Th=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Q=o(((e,t)=>{t.exports=Th()}))(),Eh=5e3,Dh=Z.div`
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
`,Oh=Z.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,kh=Z.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,Ah=Z.div`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  margin-top: ${e=>e.theme.space.xs};
`,jh=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),Mh=()=>typeof document<`u`&&document.visibilityState===`hidden`,Nh=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||Mh()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+Eh};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{Mh()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function Ph({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=Nh(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=le.enabled?jh(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&xe[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,Q.jsx)(Dh,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,Q.jsxs)(Oh,{children:[(0,Q.jsx)(kh,{children:`Achievement unlocked`}),xe[t].name,_r(xe[t])&&(0,Q.jsx)(Ah,{children:_r(xe[t])})]},e))})}var Fh=Z.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,Ih=Z.div`
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
`,Lh=Z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,Rh=Z.button`
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
`,zh=Z.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,Bh=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,Q.jsx)(Fh,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,Q.jsxs)(Ih,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,Q.jsx)(Lh,{children:`More`}),(0,Q.jsxs)(Rh,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,Q.jsx)(zh,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,Q.jsxs)(Rh,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,Q.jsx)(zh,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),le.enabled&&(0,Q.jsxs)(Rh,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,Q.jsx)(zh,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,Q.jsxs)(Rh,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,Q.jsx)(zh,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),!1]})})},Vh=Z.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,Hh=Z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Uh=Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,Wh=Z.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,Gh=Z.div`
  color: ${e=>e.theme.color.textMuted??e.theme.color.text};
  font-size: 0.9rem;
  margin-top: 0.15rem;
`,Kh=Z.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,qh=Z(Vh)`
  gap: 0.4rem;
`,Jh=Z.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Yh=Z.button`
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
`,Xh=Z.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Zh=Z.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,Qh=Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,$h=Z.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,eg=Z.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,tg=(e,t,n)=>{let r=mr(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},ng=e=>{let t=[],n={};return e.forEach(e=>{let r=be[e.id];r?(n[r.id]||(n[r.id]={key:r.id,name:r.name,levels:[]},t.push(n[r.id])),n[r.id].levels.push(e)):t.push({key:e.id,def:e})}),t},rg=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=lh(),c=new Set(xr(t)),l=I.map(e=>({...e,members:ve.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0),u=wr(t),d=l.reduce((e,n)=>e+Cr(t,n.id).bonus,0),f=l.reduce((e,n)=>e+Cr(t,n.id).total,0);return(0,Q.jsxs)(Hh,{children:[(0,Q.jsxs)(Uh,{children:[(0,Q.jsx)(`h1`,{children:`Achievements`}),(0,Q.jsxs)(Wh,{"aria-label":`total stars ${u} of ${f}`,children:[`⭐ `,u,`/`,f,d>0?` (incl. ${d} bonus)`:``]}),(0,Q.jsxs)(Gh,{"aria-label":`star production bonus`,children:[`+`,Math.round((Tr(t)-1)*100),`% production`]})]}),(0,Q.jsx)(Kh,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>yr(t,e.id)).length,u=c.has(e.id),d=Cr(t,e.id);return(0,Q.jsxs)(qh,{"aria-label":`${e.name} achievement group`,children:[(0,Q.jsxs)(Jh,{children:[(0,Q.jsxs)(Yh,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,Q.jsxs)(eg,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length,u&&d.bonus>0?` · ⭐ +${d.bonus}`:``]})]}),n[e.id]&&ng(e.members).map(e=>{if(e.levels){let n=e.levels.filter(e=>yr(t,e.id)).length,r=e.levels.length,c=n===r,l=e.levels.find(e=>!yr(t,e.id)),u=e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,d=e.levels.length>4,f=[...new Map(e.levels.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,Q.jsxs)(Xh,{"aria-label":`${e.name} achievement level ${n} of ${r}`,style:{alignItems:`flex-start`},children:[(0,Q.jsxs)(Zh,{$earned:n>0,children:[(0,Q.jsx)(Yh,{"aria-expanded":!!i[e.key],"aria-label":`${e.name} details`,onClick:()=>o(a,e.key),type:`button`,children:(0,Q.jsx)(`strong`,{children:e.name})}),!i[e.key]&&l&&(0,Q.jsxs)(Qh,{children:[`Next: `,gr(l),tg(t,l,!1)?` (${tg(t,l,!1)})`:``]}),!i[e.key]&&l&&_r(l)&&(0,Q.jsxs)(Qh,{"aria-label":`${e.name} next reward`,children:[`Reward: `,_r(l)]}),i[e.key]&&u&&(0,Q.jsxs)(Qh,{children:[`Reward each level: `,u]}),i[e.key]&&d&&!u&&f.map(([e,t])=>(0,Q.jsxs)(Qh,{children:[e,`: `,t]},e)),i[e.key]&&e.levels.map((n,r)=>{let i=yr(t,n.id),a=tg(t,n,i);if(d){let t=u?null:_r(n);return(0,Q.jsxs)(Qh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,gr(n),a&&!i?` (${a})`:``,t?` · ${t}`:``]},n.id)}return(0,Q.jsxs)($h,{children:[(0,Q.jsxs)(Qh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,n.trigger,a&&!i?` (${a})`:``]}),!u&&hr(n)&&(0,Q.jsxs)(Qh,{"aria-label":`${e.name} level ${r+1} reward ${i?`earned`:`pending`}`,children:[i?`Reward earned`:`Reward`,`: `,hr(n)]})]},n.id)})]}),(0,Q.jsxs)(eg,{$color:c?s.color.good:s.color.textMuted,children:[c?`✅ `:n===0?`🔒 `:``,`Lv `,n,`/`,r]})]},e.key)}let{def:n}=e,r=yr(t,n.id),c=n.secret&&!r,l=c?null:tg(t,n,r),u=c?`???`:n.name;return(0,Q.jsxs)(Xh,{"aria-label":`${u} achievement ${r?`earned`:`not yet earned`}`,children:[(0,Q.jsxs)(Zh,{$earned:r,children:[c?(0,Q.jsx)(`strong`,{children:u}):(0,Q.jsx)(Yh,{"aria-expanded":!!i[n.id],"aria-label":`${n.name} details`,onClick:()=>o(a,n.id),type:`button`,children:(0,Q.jsx)(`strong`,{children:u})}),!c&&i[n.id]&&(0,Q.jsx)(Qh,{children:n.trigger}),!c&&i[n.id]&&hr(n)&&(0,Q.jsxs)(Qh,{"aria-label":`${n.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,hr(n)]})]}),(0,Q.jsxs)(eg,{$color:r?s.color.good:s.color.textMuted,children:[l&&!r?`${l} `:``,r?`✅`:`🔒`]})]},n.id)})]},e.id)})})]})},ig=`high`,ag=`normal`,og=()=>b[b.length-1],sg=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],cg=[tu,au,lu,pu,_u,xu,Tu,ku,Nu],lg=e=>sg.some((t,n)=>Qc(e,n)),ug=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,dg=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,fg=e=>Eo(e)&&(e.intro?.bits??0)>=qo(e),pg=1,mg={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},hg=(e,t)=>{let[n,r]=mg[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&Ed(e,t)<pg},gg=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&gd(e,t)<pg,_g=(e,t)=>e?ig:t?ag:!1,vg=e=>{if(vi(e))return!1;let t=V(e);return b.some(n=>{if(!yi(e)(n)||gg(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:Jt(n,r,t,i,Ki(e,n),2**53-1)>=a})},yg=e=>vi(e)||!on(e)||hg(e,`speedUp`)?!1:an(e),bg=e=>{if(vi(e)||hg(e,`scaleUp`))return!1;let t=Nr(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=Pr(e)},xg=e=>{if(vi(e)||hg(e,`overclock`))return!1;let t=og();return yi(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=Fr(e):!1},Sg=e=>vi(e)&&!hg(e,`purge`),Cg=e=>Sg(e)||vg(e)||yg(e)||bg(e)||xg(e),wg=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],Tg=e=>{if((e.purge?.count??0)<1||vi(e))return!1;let t=e.purge?.points??0;return wg.some(n=>{if(!kd(e,n))return!1;let r=li(`global`,n);if(r&&!qr(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<Td(n)&&t>=Dd(n,i)})},Eg=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=ji(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.buyMaxUnlocked&&t>=2||!e.cacheWarmUnlocked&&t>=20)return!0;let n=Cn(xn(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},Dg=e=>Tg(e)||Eg(e),Og=e=>Cg(e),kg=e=>_g(Sg(e)||vg(e),Og(e)),Ag=e=>ug(e)||dg(e)||fo(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||go(e)&&(e.intro?.bits??0)>=ho(e.intro)||_s(e)&&!e.intro?.diskBuildQueued||rs(e)||fg(e),jg=e=>_g(ug(e)||dg(e),Ag(e)),Mg=e=>sg.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(Nl(e,r)<10||a<Kc(e,n))}),Ng=e=>Ml(e)?Mg(e)||cg.some(t=>t(e))||lg(e):!1,Pg=e=>Ml(e)?_g(Mg(e),Ng(e)):!1,Fg=e=>En(e)?mt.some(t=>jn(e,t.id)):!1,Ig=e=>Fg(e)?ag:!1,Lg=e=>({game:kg(e),foundry:jg(e),boosters:Pg(e),compute:Ig(e),perks:Dg(e)?ag:!1}),Rg=`3.25rem`,zg=wh`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,Bg=Z.nav`
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
`,Vg=Z.button`
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
`,Hg=Z.span`
  font-size: 1.05rem;
  line-height: 1;
`,Ug=Z.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,Wg=Z.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?_h`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${zg} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:_h`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,Gg=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,Q.jsxs)(Bg,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,Q.jsxs)(Vg,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,Q.jsx)(Wg,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,Q.jsx)(Hg,{"aria-hidden":`true`,children:n.icon}),(0,Q.jsx)(Ug,{children:n.label})]},n.id)}),(0,Q.jsxs)(Vg,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,Q.jsx)(Hg,{"aria-hidden":`true`,children:`⋯`}),(0,Q.jsx)(Ug,{children:`More`})]})]})},Kg=`calc(${Rg} + env(safe-area-inset-bottom))`,qg={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},Jg=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&qg[e];return i?r?n.color.disabled:n.color[i]:t},Yg={white:`255, 255, 255`,darkgrey:`169, 169, 169`},Xg=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},Zg=e=>e?e.startsWith(`#`)?Xg(e):Yg[e]??`255, 255, 255`:`255, 255, 255`,Qg=wh`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,$g=e=>Math.min(100,Math.max(0,e??0)),e_=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=$g(t),l=$g(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return _h`
    background: linear-gradient(
      to right,
      ${o}${u} 0%,
      ${o}${u} ${c}%,
      ${s}${d} ${c}%,
      ${s}${d} ${l}%,
      transparent ${l}%,
      transparent 100%
    ), ${a.color.surfaceSunken};
  `},$=Z.button.withConfig({shouldForwardProp:e=>e!==`variant`})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95em;
  font-weight: 600;
  margin: 0;
  padding: 0.5em 0.9em;
  border-radius: 6px;
  color: ${Jg};
  border: 1.5px solid ${Jg};
  background: ${e=>e.theme.color.surfaceSunken};
  ${e_}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>Zg(Jg(e))};
  animation: ${e=>e.$pulse&&!e.disabled?_h`${Qg} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${Jg};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,t_=Z.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,n_=Z.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,r_=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,i_=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,Q.jsx)(n_,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!r_.test(n)?(0,Q.jsx)(n_,{children:n}):(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t_,{children:n.slice(0,r+1)}),(0,Q.jsx)(n_,{children:n.slice(r+1)})]})},a_=Z.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,o_=Z.div`
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
`,s_=Z(Vh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,c_=Z.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,l_=Z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,u_=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,Q.jsx)(o_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,Q.jsxs)(s_,{$raised:!0,children:[(0,Q.jsx)(c_,{id:n,children:`Save not compatible`}),(0,Q.jsx)(l_,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,Q.jsx)($,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},d_=1e80,f_=30,p_=20,m_=2**53-1,h_=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],g_=[1,2,5],__=Object.fromEntries(h_.map(e=>[e.id,e])),v_=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],y_=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>sd(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>Ld(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:cf,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:sf,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:of,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:Id,isOn:e=>e.autoOverclockEnabled??!0}],b_=Object.fromEntries(y_.map(e=>[e.key,e])),x_=(e,t)=>!!b_[t]?.isOn(e),S_=e=>new Date(e).toISOString().slice(0,10),C_=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},w_=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},T_=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},E_=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),D_=(e,t)=>{let n=y_.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},O_=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},k_=e=>e.startBytes*8,A_=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,j_=(e,t,n)=>{let r=O_(t,n.levers);return A_(e)===A_(r)?r:{...r,resources:{...r.resources,[O]:k_(n)}}},M_={buyTier:{make:e=>Yi(e,m_)},tierTickspeed:{make:e=>fd(e)},clockSpeed:{make:()=>zd},scaleUp:{make:()=>ef},overclock:{make:()=>tf},restage:{make:e=>uf(e)},automation:{make:e=>Object.hasOwn(b_,e?.key??``)?b_[e.key].set(!!e.enabled):e=>e}},N_=b[b.length-1],P_=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${B(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${B(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${N_.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),F_=Object.fromEntries(P_.map(e=>[e.key,e])),I_=Object.fromEntries(P_.map(e=>[e.key,0])),L_={balance:0,clock:0,owned:{},purchaseLevels:{}},R_=(e,t=e)=>({...e,runPeaks:Xr(e.runPeaks??L_,t)}),z_=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=Lr(t)??0;return a!==(Lr(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},B_=(e,t,n,r)=>{let i=e.game,a=j_(i,R_(Bi(n,m_)(i)),t);return r&&A_(i)!==A_(a)&&r(a),{game:a,metrics:z_(i,a,e.metrics)}},V_=(e,t,n,r,i)=>{let a=e.game,o=M_[n].make(r)(a);if(o===a)return e;let s=j_(a,R_({...o,runPeaks:a.runPeaks},o),t);return i&&A_(a)!==A_(s)&&i(s),{game:s,metrics:z_(a,s,e.metrics)}},H_=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],U_=(e,t,n)=>{let r=e;for(let e=0;e<p_;e++){let e=r;for(let[r,i]of H_)e=V_(e,t,r,i,n);if(e===r)break;r=e}return r},W_=e=>({...e,runPeaks:Xr(L_,e)}),G_=e=>({game:e,metrics:z_(e,e,I_)}),K_=(e,t,n,r,i)=>{let a=U_(G_(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=U_(B_(a,t,n,i),t,i),o.push(a.metrics);return o},q_=(e,t=0)=>e.map(e=>[t,e,!0]),J_=[q_([`scaleUp`,`restage`,`overclock`]),q_([`scaleUp`,`restage`]),[...q_([`scaleUp`,`restage`]),...q_([`overclock`],1)],[...q_([`scaleUp`,`restage`]),...q_([`overclock`],2)],[...q_([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...q_([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],q_([`overclock`,`restage`])],Y_=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},X_=(e,t,n,r,i)=>{let a=G_(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=B_(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=V_(a,t,e,n);o.push(a.metrics)}return o},Z_=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},Q_=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:Lr(e)??0}),$_=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=Z_(n,e);if(t>i)return t}return null},ev=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(Z_(t/e,1));if(i>n&&i<t)return i}let i=r(Z_(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},tv=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},nv=(e,t,n)=>{let r=__[t],i=n===`fallback`,a=w_(`${e}|${t}|v10|${n}`),o=T_(a),s=i?1e6:g_[Math.floor(o()*g_.length)]*10**E_(o,r.startExponent),c=[];if(!i){let e=[...v_],t=E_(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:D_(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:E_(o,r.warmupSeconds.map(e=>e/f_))*f_,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:10,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>v_.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=At();v.resources={...v.resources,[O]:k_(_)};for(let e of u)v=b_[e].unlock(v);v=W_(O_(v,l));let y=v;K_(v,_,f_,f/f_,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=j_(y,b_[e].set(!1)(y),_);y=W_(y);let b=[G_(y).metrics];for(let e=G_(y),t=0;t<p;t++)e=B_(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?P_:tv(o,P_),C=(e,t)=>{let n=$_(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=ev(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=J_.map(e=>Y_(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:X_(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=d_);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=K_(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:Q_(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},rv=new Map,iv=(e,t)=>{let n=`${e}|${t}`,r=rv.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=nv(e,t,n);r??=nv(e,t,`fallback`),rv.size>64&&rv.clear(),rv.set(n,r)}return r},av=(e,t)=>iv(e,t).def,ov=e=>ue.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),sv=e=>e.metrics?.[e.def.objective?.key]??0,cv=e=>sv(e)>=e.def.objective?.target,lv=e=>{let t=e.def.objective;if(!t)return 0;let n=sv(e);if(n>=t.target)return 1;if(!F_[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},uv=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),dv=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=cv(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||sv(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=uv(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},fv=(e,t)=>n=>{if(!ov(n)||!__[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=iv(S_(t),e);return uv(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:G_(i).metrics})},pv=e=>t=>t.daily.runs[e]?uv(t,e,null):t,mv=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===S_(n)},hv=(e,t)=>n=>mv(n,e,t)?fv(e,t)(pv(e)(n)):n,gv=e=>t=>{let n=t;for(let t of h_){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==10){n=uv(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=B_(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=dv(uv(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},_v=(e,t,n,r)=>i=>{if(!Object.hasOwn(M_,t))return i;let a=gv(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=V_(s,o.def,t,n);return c===s?a:dv(uv(a,e,{...o,...c}),e,r)},vv=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},yv=Z.div`
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
`,bv=Z(Vh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,xv=Z.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,Sv=Z.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,Cv=Z.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,wv=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,Q.jsx)(yv,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,Q.jsxs)(bv,{$raised:!0,children:[(0,Q.jsx)(xv,{id:d,children:t}),(0,Q.jsx)(Sv,{children:n}),(0,Q.jsxs)(Cv,{children:[(0,Q.jsx)($,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,Q.jsx)($,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},Tv={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},Ev=e=>Ku(e)>0,Dv=e=>Ev(e),Ov=(e,t)=>t<Ku(e),kv=(e,t)=>t<=Ku(e),Av=(e,t=0)=>{let n=Vu(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*Pe[e.type].durationSeconds;return`${Tv[e.type]??e.type} ×${Pe[e.type].multiplier} (${Gi(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${Gu(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},jv=_h`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${wh`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Mv={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},Nv=e=>Gi(e).replace(/ 0[ms]$/,``),Pv=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,Fv=Z($)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,Iv=Z.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Lv=`2.8em`,Rv=Z(Fv)`
  flex: 0 0 ${Lv};
  width: ${Lv};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,zv=Z.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${Lv};
  width: ${Lv};
`,Bv=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Vv=Z.div`
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
`,Hv=Z.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,Uv=Z.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Wv=Z.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,Gv=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Kv=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},qv=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=Mv[r]??{icon:`⚡`,label:r},s=zu(r,i[0]),c=Ru(r,i[0]),l=Kv(i),u=l.length-1;return(0,Q.jsx)(Bv,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=Pv(e.tierIndex);return(0,Q.jsxs)(Iv,{children:[i===u?$u(t,r)?(0,Q.jsx)(Rv,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,Q.jsx)(i_,{children:`↩`})}):(0,Q.jsx)(Rv,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!q(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,Q.jsx)(i_,{children:`✕`})}):(0,Q.jsx)(zv,{"aria-hidden":`true`}),(0,Q.jsxs)(Vv,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${Pv(e.tierIndex,`name`)}, ${Gi(f)}${l?` once it starts`:` left`}`,children:[(0,Q.jsx)(Hv,{children:`${e.count}x`}),(0,Q.jsx)(Uv,{children:`${m} ${o.icon} ×${c}`}),(0,Q.jsx)(Wv,{children:Gi(f)})]}),i===0?(0,Q.jsx)(Rv,{"aria-label":`stack the ${o.label} compute boost`,disabled:!Zu(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${Nv(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,Q.jsx)(i_,{children:`+`})}):(0,Q.jsx)(zv,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},Jv=({state:e,actions:t})=>{let n=Vu(e.intro??{});return n.length===0?null:(0,Q.jsx)(Gv,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,Q.jsx)(qv,{lane:n,state:e,actions:t},n.type))})},Yv=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)($,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,Q.jsx)(wv,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,Q.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},Xv=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},Zv=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,Qv=e=>`Unlocks at Purge ${si(e)}`,$v=e=>`${e.id} · ${e.target} · ${e.codename}`,ey=(e,t)=>t-e%t,ty=e=>{let t=Kr(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${Xv(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${Xv(ey(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${Xv(ey(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${Xv(Math.ceil(ey(n,30)))}`];case`bitRot`:return[`Corruption ${zt(ii(e))} vs ${zt(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},ny=Z.section`
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
`,ry=Z.button`
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
`,iy=Z.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,ay=Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,oy=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=Kr(e);if(!a)return null;let o=Xv(e.challenges.activeSeconds);return(0,Q.jsxs)(ny,{"aria-label":`active challenge banner`,children:[(0,Q.jsxs)(iy,{children:[(0,Q.jsxs)(ry,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,Q.jsx)(ay,{children:a.rule}),(0,Q.jsxs)(ay,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,Zv(a.goal)]}),ty(e).map(e=>(0,Q.jsx)(ay,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,Q.jsx)(Yv,{challenge:a,onExit:t})]})},sy=Z.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,cy=Object.freeze({removeAds:!1}),ly=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>cy}),uy=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return ly();let n=null,r=null,i=null,a=cy,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},dy=null,fy=()=>(dy??=uy({loadAds:null,loadIap:null}),dy),py=1e4,my=400,hy=100,gy=Z.div`
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
`,_y=Z(Vh).attrs({role:`status`,"aria-live":`polite`})`
  align-items: center;
  max-width: 26rem;
  opacity: ${e=>+!e.$fading};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${my}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,vy=Z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,yy=Z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,by=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=fy()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+py}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+py})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,hy);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,my);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&Ui(e.elapsedRealSeconds,e.capSeconds)>0;return(0,Q.jsx)(gy,{children:(0,Q.jsxs)(_y,{"aria-label":`offline progress notice`,$fading:c,children:[(0,Q.jsxs)(vy,{children:[`Resumed from sleep! You were away for `,Gi(e.elapsedRealSeconds),` — simulated `,Gi(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,Q.jsxs)(yy,{children:[f&&(0,Q.jsx)($,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,Q.jsxs)($,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},xy=Z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,Sy=_h`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Cy=Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,wy=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Ty=wh`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Ey=Z(Vh)`
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
  animation: ${e=>e.$animateReveal?_h`${Ty} 0.4s ease-out`:`none`};
  ${e=>e.$boosted&&jv}

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
`,Dy=e=>_h`
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
`,Oy=Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,ky=Z.div`
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
`,Ay=Z(Vh)`
  ${Dy(`#0e7490`)}
`,jy=Z(Vh)`
  ${Dy(`#1d4ed8`)}
`,My=Z(Vh)`
  ${Dy(`#8b5cf6`)}
`,Ny=Z(Vh)`
  ${Dy(`#c2410c`)}
`,Py=Z.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,Fy=Z(Vh)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&_h`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&_h`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,Iy=Z.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Ly=Z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Ry=Z.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,zy=Z(sy)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,By=Z(Ly)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,Vy=Z.div`
  position: relative;
`,Hy=Z.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,Uy=Z.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,Wy=Z.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Gy=Z.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${Kg};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,Ky=Z.div`
  ${e=>e_({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,qy=Z.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,Jy=Z(Fy)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,Yy=Z.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,Xy=Z.div`
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

  ${e=>e.$compressed&&_h`
    box-shadow: ${e.theme.shadow.md};
    padding: 0.25rem 0;

    ${Fy} {
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
    ${sy} {
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
`,Zy=Z.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,Qy=Z.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,$y=Z.div`
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
`,eb=Z.div`
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
`,tb=Z.div`
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
`,nb=Z.div`
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
`,rb=Z.div`
  height: ${e=>e.$height}px;
`,ib=Z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,ab=Z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,ob=Z.h3`
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
`,sb=Z.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,cb=Z.details`
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
  summary:has(${ky}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${ky}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`,lb=Z.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  margin: 0;
  ${Sy}

  @media (max-width: 24.5rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    line-height: 1.15;
  }
`,ub=Z($)`
  grid-area: buy;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  min-height: 2rem;
  padding: 0 0.6em;
  ${Sy}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,db=Z(t_)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,fb=Z.span`
  font-weight: 800;
`,pb=Z(n_)`
  flex: 1 0 auto;
  text-align: right;
`,mb=Z($)`
  grid-area: upgrade;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  min-height: 2rem;
  padding: 0 0.5em;
  ${Sy}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.4em;
  }
`,hb=(e,t)=>t===`base`?zt(e):t===`bytes`?Bt(e):`${B(e)} ${E(t)}`,gb=(e,t)=>Math.min(100,Math.round(e/t*100)),_b=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),vb=e=>Math.round((e-1)*100),yb=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),bb=(e,{precise:t=!1}={})=>e>=2?`${_b(e)}x`:`+${t?yb(e):vb(e)}%`,xb=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=lh(),{purge:s}=a,c=a.resources[O]>=ai(a),l=Wr(a),u=a.prestigeDoublePpLevel??0,d=fn(a),f=dn(s.count,d),p=Tr(a),m=Mi(a.resources[O],u,Wr(a)),h=Si(a.resources[O],ai(a)),g=Ci(a.resources[O]),_=Math.round(g*100),y=a.resources[O],x=Ht(y),S=zt(y),C=!!Kr(a)&&qr(a,Kr(a).id),w=Zv(ai(a)),T=C?0:Math.max(1,m),k=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${w})`,A=C?`${k} — completes the challenge repeat, awards no Purge Points`:`${k} — awards +${B(T)} Purge Point${T===1?``:`s`}`,[ee]=(0,v.useState)(()=>new Set(b.filter(e=>yi(a)(e)).map(e=>e.id))),[j,te]=(0,v.useState)(()=>new Set),M=e=>te(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),N=(0,v.useRef)(null),ne=(0,v.useRef)(new Map),P=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;te(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return N.current=e,()=>e.disconnect()},[]);let re=e=>(P.current.has(e)||P.current.set(e,t=>{let n=N.current,r=ne.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(ne.current.set(e,t),n&&n.observe(t)):ne.current.delete(e)}),P.current.get(e)),[ie,F]=(0,v.useState)(!1),ae=()=>F(e=>!e),oe=vi(a),se=Kr(a),ce=e=>se?.effect===e,le=se?` — disabled by challenge ${se.id} ${se.codename}`:``,ue=s.count===0,de=!!e.buyUnitMode,fe=!!e.buyMaxMode&&Xi(a)&&!de,pe=V(a),me=oe&&ue,I=oe&&!ue,L=!!se||I||!!e.goal||Vu(a.intro??{}).length>0,R=ti(a),he=a.purchaseLevels?.[R.id]??1,ge=yi(a)(R),_e=Nr(a),ve=a.purchaseLevels?.[_e.id]??1,ye=a.scaleUpCount??0,be=Pr(a),xe=Math.max(0,he-1),Se=Math.max(0,ve-1),Ce=be,we=gb(Se,Ce),Te=!oe&&Se>=be,Ee=b[b.indexOf(_e)+1]??null,De=Ee?.symbol===`TB`,Oe=Ei(a),ke=Number.isInteger(Oe)?String(Oe):Oe.toFixed(2),Ae=Oe===2?`doubles`:`multiplies by ${ke}`,[je,Me]=(0,v.useState)(ge);(0,v.useEffect)(()=>{ge&&Me(!0)},[ge]);let Ne=Lr(a)??0,Pe=Fr(a),Fe=Pe,Ie=1+Ti(a),Le=1+Ti({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),Re=1+st,ze=gb(xe,Fe),Be=!oe&&!ce(`overclockDisabled`)&&xe>=Pe,Ve=a.globalTickspeedMultiplier??null,He=Ve!==null,Ue=wi(a),We=nn(Ve??0),Ge=on(a),Ke=!oe&&!ce(`clockSpeedDisabled`)&&Ge&&an(a),qe=cn(a),Je=a.owned[R.id]??0,Ye=a.lastTierXpConsumed??0,Xe=Math.floor(a.purge.xp??0),Ze=un(Ye),Qe=gb(Xe,Ze),$e=qe&&!oe&&!ce(`restageDisabled`)&&Xe>=Ze,et=bb(ln(Xe)),tt=()=>{$e&&window.confirm(`Restage: consume ${B(Xe)} XP for ${et} faster ${R.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.${Je>0?``:` You own no ${R.name}, so nothing will be left producing.`}`)&&t.consumeXpForLastTierTickspeed(Xe)},nt=gb(a.resources.base??0,rn(Ve??0)),[rt,it]=(0,v.useState)(Ge);(0,v.useEffect)(()=>{Ge&&it(!0)},[Ge]);let at=(0,v.useRef)(null);(0,v.useEffect)(()=>{me&&at.current?.focus()},[me]);let ot=(0,v.useRef)(null),[ct,lt]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=ot.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>lt(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[me]);let ut=(0,v.useRef)(null),[dt,ft]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=ut.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>ft(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[I]),me?(0,Q.jsx)(eb,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,Q.jsxs)(tb,{children:[(0,Q.jsx)(`h2`,{children:`💾 Disk full`}),(0,Q.jsxs)(ib,{children:[`You've reached `,zt(a.resources[O]),` — 1 Googol Bytes. All production has stopped.`]}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Resets your resources, owned tiers, and purchases`}),(0,Q.jsxs)(`li`,{children:[`Awards `,B(m),` Purge Point`,m===1?``:`s`,` — spend them on the Firmware page for automation and production bonuses`]}),(0,Q.jsx)(`li`,{children:`Keeps your unlocked autobuyers and Purge Points`})]}),(0,Q.jsx)($,{ref:at,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:(0,Q.jsx)(i_,{children:`✦ Purge Now`})})]})}):(0,Q.jsxs)(xy,{children:[(0,Q.jsx)(oy,{onExit:t.exitChallenge,state:a}),I&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(nb,{ref:ut,"aria-label":`purge available banner`,children:[(0,Q.jsxs)(ib,{children:[w,` reached — production has stopped.`]}),(0,Q.jsxs)($,{"aria-label":A,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,Q.jsx)(t_,{children:`✦ `}),(0,Q.jsx)(n_,{children:C?`Complete challenge`:`Purge +${B(T)} PP`})]})]}),(0,Q.jsx)(rb,{$height:dt})]}),(0,Q.jsx)(Gy,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,Q.jsxs)(Ky,{$percent:e.goal?e.goal.percent:h,children:[(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${w}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:h,"aria-valuemin":0,"aria-valuemax":100}),(0,Q.jsx)(qy,{children:e.goal?e.goal.label:`${h}% to Purge`})]})}),L?(0,Q.jsx)(a_,{as:`h1`,children:`Byte Factory`}):(0,Q.jsx)(Cy,{children:(0,Q.jsx)(`h1`,{children:`Byte Factory`})}),(0,Q.jsx)(Jv,{actions:t,state:a}),(0,Q.jsx)(by,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,Q.jsx)(Zy,{ref:ot,"aria-hidden":`true`}),(0,Q.jsxs)(Xy,{$compressed:ct,$belowBar:I,$belowBarHeight:dt,children:[(0,Q.jsxs)(Fy,{$raised:!0,children:[(0,Q.jsxs)(Vy,{children:[(0,Q.jsx)(Iy,{"aria-controls":`global-multipliers-details`,"aria-expanded":ie,"aria-label":`money display`,onClick:ae,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ae())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,Q.jsx)(zy,{children:x})}),!ct&&x!==S&&(0,Q.jsx)(By,{"aria-label":`balance in bits: ${S}`,children:S})]}),!ct&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Hy,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(g-n)/.125));return(0,Q.jsx)(Uy,{children:(0,Q.jsx)(Wy,{$fraction:r})},t)})}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":_,"aria-valuemin":0,"aria-valuemax":100})]}),ie&&!ct&&(0,Q.jsxs)(Yy,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!ue&&(0,Q.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${bb(mn(a))} production speed from ${B(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${B(100)} PP on Firmware → Prestige)`]}),!ue&&(0,Q.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${bb(f)} production speed from ${B(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${B(1)} PP on Firmware → Prestige)`]}),p>1&&(0,Q.jsxs)(`li`,{children:[`Achievement stars: `,bb(p),` production speed`]}),(0,Q.jsxs)(`li`,{children:[`Scale Up: `,ye>0?`${ye} activation${ye===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${B(Ce)} completed levels on ${_e.name})`]}),rt&&(0,Q.jsxs)(`li`,{children:[`Accelerate: `,He?`${bb(Ue,{precise:!0})} faster ticks on every tier`:`not yet active`]}),je&&(0,Q.jsxs)(`li`,{children:[`Overclock: `,Ne>0?`The per-level speed bonus is now ${yb(Ie)}% (was ${yb(Le)}%)`:`not yet claimed (reach ${B(Fe)} completed levels on ${R.name})`]})]})]}),!ue&&(0,Q.jsx)(Jy,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,Q.jsxs)(Ly,{children:[(0,Q.jsxs)(Ry,{children:[B(s.points),` PP`]}),d&&` · ${bb(f)} production speed`]})})]}),(rt||qe)&&(0,Q.jsxs)(Py,{children:[rt&&(0,Q.jsxs)(jy,{"aria-label":`global accelerate panel`,children:[(0,Q.jsxs)(cb,{children:[(0,Q.jsx)(`summary`,{children:(0,Q.jsxs)(ky,{children:[(0,Q.jsx)(`h2`,{children:`Accelerate`}),(0,Q.jsxs)(Oy,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,yb(Ie),`%/lvl`]})]})}),(0,Q.jsx)(ab,{children:He?`${bb(Ue,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,Q.jsxs)($,{"aria-label":He?`Upgrade Accelerate for ${Bt(We)} (currently ${bb(Ue,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${Bt(We)}`,color:Ke?`#3b82f6`:`darkgrey`,disabled:!Ke,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${ce(`clockSpeedDisabled`)?le:``}`,type:`button`,$progress:nt,$progressColor:`#3b82f6`,$pulse:Ke,children:[(0,Q.jsx)(t_,{children:`🌐 `}),(0,Q.jsx)(n_,{children:Bt(We)}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":nt,"aria-valuemin":0,"aria-valuemax":100})]})]}),qe&&(0,Q.jsxs)(My,{"aria-label":`restage panel`,children:[(0,Q.jsxs)(cb,{children:[(0,Q.jsx)(`summary`,{children:(0,Q.jsxs)(ky,{children:[(0,Q.jsx)(`h2`,{children:`Restage`}),(0,Q.jsxs)(Oy,{title:`Each XP consumed makes ${R.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[R.symbol,` +`,vb(ln(1)),`%/XP`]})]})}),(0,Q.jsxs)(ab,{children:[bb(ln(Ye),{precise:!0}),` faster `,R.name,` ticks`,` `,`from `,B(Ye),` XP consumed. Next consumption needs at least `,B(Ze),` XP.`]})]}),(0,Q.jsxs)($,{"aria-label":`Restage: consume ${B(Xe)} XP for ${et} ${R.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${ce(`restageDisabled`)?le:``}`,variant:`smart`,disabled:!$e,onClick:tt,title:Je>0?`Consume XP for a compounding +1% ${R.name} tickspeed per XP (min ${B(Ze)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${R.name} owned right now — Restaging now resets everything with nothing left producing`,type:`button`,$progress:Qe,$pulse:$e,children:[(0,Q.jsx)(t_,{children:`🧬 `}),(0,Q.jsxs)(n_,{children:[B(Xe),` XP`]}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`${R.name} Restage progress`,"aria-valuenow":Qe,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,Q.jsx)(wy,{children:b.map((e,n)=>{if(!yi(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=qi(a,e.id),c=Ki(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,m=$r(a,e.id)??e,h=Jt(m,l,pe,d,c,2**53-1),g=de?Math.min(1,h):h,_=qt(m,l,pe,d,1),v=g>0?qt(m,l,pe,d,g):_,y=h>0&&!oe,b=d/pe*100,x=g/pe*100,S=a.tickspeedLevels?.[e.id]??1,C=tn(S)*(e.id===R.id?ln(a.lastTierXpConsumed??0):1),w=bb(C),T=kr(l,Or(a)),O=jr(a,e.id),k=Math.floor(i*f*p*O*T*Qr(a,e.id)),A=e.producesResourceId===`base`?zt(k):e.producesResourceId===`bytes`?Bt(k):`${B(k)} ${E(e.producesResourceId)}`,te=D(e.id),N=Di(a,e.id),ne=ld(a,e.id,S+1),P=ud(a,e.id,S+1),ie=r>=P&&!oe&&!dd(a,e.id),F=fe?ia(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ae=F.levels>0?`Buy ${B(F.levels)} full level${F.levels===1?``:`s`} for ${zt(F.cost)} total; highest level costs ${zt(F.partialQuantity>0?F.partialCost:F.lastLevelCost)}${F.partialQuantity>0?` (${F.partialQuantity} of ${pe} purchases toward the next level)`:``} (${B(u)} completed levels)`:`Buy${g>1?` ×${g}`:``} for ${zt(v)} (${B(u)} completed levels, ${B(d)} of ${pe} purchased toward the next)`,se=`Tickspeed multiplier (+10% faster ticks) for ${hb(ne,e.id)}${P>ne+1?` (requires ${hb(P,e.id)} owned)`:``}`,ce=F.levels>0?`+${B(F.levels)}`:``,le=`⚙ ${hb(ne,e.id)}`,ue=gb(r,P),me=o.tierAccents[n%o.tierAccents.length],I=j.has(e.id),L=`${e.id}-details`,he=Ov(a.intro,n);return(0,Q.jsxs)(Ey,{ref:re(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:me,$animateReveal:!ee.has(e.id),$boosted:he,children:[(0,Q.jsxs)(Qy,{children:[(0,Q.jsx)(ob,{children:(0,Q.jsxs)(sb,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":I,"aria-controls":L,onClick:()=>M(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),M(e.id))},children:[(0,Q.jsx)(a_,{children:e.name}),(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,Q.jsxs)(lb,{title:`Owned`,children:[(0,Q.jsx)(a_,{children:`Owned: `}),B(i)]})]}),I&&(0,Q.jsx)($y,{id:L,children:(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[`Production: +`,A,` per delivery`]}),(0,Q.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,_b(te),`s`]}),(0,Q.jsxs)(`li`,{children:[`Effective tickspeed: every `,_b(N),`s (tier ×`,_b(C),`, global ×`,_b(Ue),`)`]}),(0,Q.jsxs)(`li`,{children:[`Completed levels: `,B(u),` (`,B(d),`/`,pe,` purchased toward the next) — purchase milestone bonus: ×`,_b(T),` from `,B(s),` lifetime purchases`]}),O>1&&(0,Q.jsxs)(`li`,{children:[`Scale Up bonus: ×`,_b(O)]}),he&&(0,Q.jsx)(`li`,{children:Av(a.intro,n)}),(0,Q.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,Q.jsxs)(mb,{"aria-label":se,variant:`success`,disabled:!ie,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${S} (${w} faster ticks) — the next level makes it 10% more`,$progress:ue,$pulse:ie,children:[(0,Q.jsx)(i_,{children:le}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":ue,"aria-valuemin":0,"aria-valuemax":100})]}),(0,Q.jsxs)(ub,{"aria-label":ae,variant:`plain`,disabled:!y,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${pe} purchases) also multiplies it by ×${Or(a)}`,$progress:b,$secondaryProgress:x,$pulse:y,children:[(0,Q.jsxs)(db,{children:[`🛒 `,B(u),ce&&(0,Q.jsx)(fb,{children:ce})]}),(0,Q.jsx)(pb,{children:zt(F.levels>0?F.partialQuantity>0?F.partialCost:F.lastLevelCost:v)}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":pe})]})]},e.id)})}),(0,Q.jsxs)(Py,{children:[(0,Q.jsxs)(Ay,{"aria-label":`scale up panel`,children:[(0,Q.jsxs)(cb,{children:[(0,Q.jsx)(`summary`,{children:(0,Q.jsxs)(ky,{children:[(0,Q.jsx)(`h2`,{children:`Scale Up`}),(0,Q.jsxs)(Oy,{title:`${Oe===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,ke,De?` · 🔓 TB`:``]})]})}),(0,Q.jsxs)(ab,{children:[`Resets tiers and `,Ae,` production of every tier unlocked so far`,Ee?`, and unlocks ${Ee.name}`:``,`. Needs `,B(Ce),` completed `,_e.name,` levels.`]})]}),(0,Q.jsxs)($,{"aria-label":`Scale Up (requires ${Ce} completed ${_e.name} levels) — ${Ae} production for tiers unlocked so far${De?` and unlocks TB`:``}`,color:Te?`#22d3ee`:`darkgrey`,disabled:!Te,onClick:t.scaleUp,title:`Resets tiers, ${Ae} production for tiers unlocked so far${Ee?`, and unlocks ${Ee.name}`:``} — requires ${Ce} completed ${_e.name} levels`,type:`button`,$progress:we,$progressColor:`#22d3ee`,$pulse:Te,children:[(0,Q.jsx)(t_,{children:`⏩ `}),(0,Q.jsxs)(n_,{children:[_e.symbol,` `,B(Se),`/`,B(Ce)]}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":we,"aria-valuemin":0,"aria-valuemax":100})]})]}),je&&(0,Q.jsxs)(Ny,{"aria-label":`overclock panel`,children:[(0,Q.jsxs)(cb,{children:[(0,Q.jsx)(`summary`,{children:(0,Q.jsxs)(ky,{children:[(0,Q.jsx)(`h2`,{children:`Overclock`}),(0,Q.jsxs)(Oy,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,_b(10),`%/lvl`]})]})}),(0,Q.jsx)(ab,{children:Ne>0?`The per-level speed bonus is now ${yb(Ie)}% (was ${yb(Le)}%).`:`Not claimed yet — reach ${B(Fe)} completed ${R.name} levels. Each completed level then multiplies the per-level speed bonus by ×${Re}.`})]}),(0,Q.jsxs)($,{"aria-label":`Overclock (requires ${Fe} completed ${R.name} levels) — resets Scale Up's bonus; each completed ${R.name} level (${B(xe)} now) multiplies the per-level speed bonus by ×${Re}`,color:Be?`#fb923c`:`darkgrey`,disabled:!Be,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${R.name} level multiplies the per-level speed bonus by ×${Re} — requires ${Fe} completed levels${ce(`overclockDisabled`)?le:``}`,type:`button`,$progress:ze,$progressColor:`#fb923c`,$pulse:Be,children:[(0,Q.jsx)(t_,{children:`⚡ `}),(0,Q.jsxs)(n_,{children:[R.symbol,` `,B(xe),`/`,B(Fe)]}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":ze,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},Sb=Z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Cb=Z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,wb={"10m":`good`,"1h":`info`,"10h":`violet`},Tb=Z(Vh)`
  align-items: center;
  border-left: 3px solid ${e=>e.theme.color[wb[e.$formatId]]??e.theme.color.accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${e=>e.theme.space.sm};
  row-gap: 0;
`,Eb=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Db=Z.span`
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
`,Ob=Z.span`
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
`,kb=Z($)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,Ab=Z.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color[wb[e.$formatId]]??e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,jb=Z.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,Mb=Z.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,Nb=Z.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Pb=Z.div`
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
`,Fb=Z.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,Ib=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Lb=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],Rb=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=Lb.map(e=>({group:e,missing:y_.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},zb=Z.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,Bb=Z.button`
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
`,Vb=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return Lb.map(r=>{let i=y_.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,Q.jsxs)(zb,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,Q.jsx)(Nb,{as:`span`,children:r.title}),i.map(n=>{let i=x_(e.game,n.key),a=`${r.title} ${n.label}`;return(0,Q.jsx)(Bb,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},Hb=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${B(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,Rb(e)].filter(Boolean).join(` · `),Ub={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},Wb=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(lv(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(Vh,{"aria-label":`daily run ${e.id}`,children:[(0,Q.jsxs)(Fb,{children:[(0,Q.jsxs)(Sb,{children:[`Daily `,e.label]}),(0,Q.jsx)($,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,Q.jsxs)(Nb,{children:[o.label,` · now `,B(s),` · `,Ib(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,Q.jsxs)(Nb,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),Hb(t.def)&&(0,Q.jsx)(Nb,{"aria-label":`daily run conditions`,children:Hb(t.def)}),(0,Q.jsx)(Pb,{$percent:a,children:(0,Q.jsx)(`span`,{})}),(0,Q.jsx)(Vb,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,Q.jsx)(xb,{game:c})]})},Gb=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=S_(n),f=vv(e,d),p=i?e.daily.runs[i]:null;return p?(0,Q.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,Q.jsx)(Wb,{actions:t,format:h_.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,Q.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,Q.jsxs)(Cb,{children:[d,` · `,(0,Q.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,Ib(C_(n)/1e3)]})]}),(0,Q.jsx)(Eb,{children:h_.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:av(d,n.id),f=c.has(n.id),p=Hb(l),m=r?`${o?`from ${r.def.dateId} · `:``}${Ib(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(lv(r)*100)}%`:[i&&Ub[i.lastOutcome],i?.bestSeconds!=null&&`best ${Ib(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,Q.jsxs)(Tb,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,Q.jsx)(Db,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,Q.jsxs)(Ob,{title:`${l.objective.label} · ${m}`,children:[(0,Q.jsx)(`strong`,{children:l.objective.label}),m&&(0,Q.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,Q.jsx)(kb,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,Q.jsx)(kb,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,Q.jsx)(Ab,{$formatId:n.id,$percent:Math.round(lv(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(lv(r)*100),role:`progressbar`,children:(0,Q.jsx)(`span`,{})}),f&&(0,Q.jsxs)(jb,{children:[p&&(0,Q.jsx)(Nb,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,Q.jsxs)(Mb,{children:[!o&&(0,Q.jsx)($,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,Q.jsx)($,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,Q.jsx)(wv,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?mv(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,Q.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},Kb=Z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,qb=Z.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,Jb=Z.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Yb={completed:_h`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:_h`
    border-color: ${e=>e.theme.color.warn};
  `,active:_h`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:_h``},Xb=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,Zb=Z.button`
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
  ${e=>Yb[e.$status]}
  ${e=>e.$selected&&_h`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Qb=Z.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,$b=Z.span`
  color: ${e=>Xb(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ex=Z.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,tx=Z.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,nx=Object.fromEntries(b.map(e=>[e.name,e.symbol])),rx={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},ix=e=>{if(e.automation?.kind===`global`)return rx[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${nx[n]??n}`},ax={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},ox=(e,t)=>Kr(e)?.id===t.id?`active`:qr(e,t.id)?`completed`:`available`,sx=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=qr(t,e.id);return(0,Q.jsxs)(wv,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${$v(e)}?`,children:[(0,Q.jsx)(`p`,{children:e.rule}),(0,Q.jsxs)(`p`,{children:[`Goal: `,Zv(e.goal),`, then Purge.`]}),(0,Q.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},cx=({state:e,onStart:t,onExit:n})=>{let r=Kr(e),i=N.filter(e=>ce.has(e.id)).map(t=>{let n=ci(e,t.id);return{def:t,unlocked:n,status:n?ox(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${si(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${Xv(i).replace(` `,``)}`:ix(t)};return(0,Q.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,Q.jsxs)(Vh,{children:[(0,Q.jsx)(Kb,{children:`Factory challenges`}),(0,Q.jsxs)(qb,{"aria-label":`challenge counts`,children:[(0,Q.jsxs)($b,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,Q.jsxs)($b,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,Q.jsxs)($b,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,Q.jsx)(Jb,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,Q.jsxs)(Zb,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${ax[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?$v(t):`${t.id} · ${t.target} · ${Qv(t)}`,type:`button`,children:[(0,Q.jsx)(Qb,{$status:r,children:t.id}),(0,Q.jsx)($b,{$status:r,children:u(e)})]},t.id)})}),c&&(0,Q.jsxs)(ex,{"aria-label":`challenge ${c.def.id}`,children:[(0,Q.jsxs)(`span`,{children:[c.unlocked?(0,Q.jsx)(`strong`,{children:$v(c.def)}):(0,Q.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,Q.jsx)(tx,{children:c.def.rule}):(0,Q.jsxs)(tx,{children:[`🔒 `,Qv(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,Q.jsx)(Yv,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,Q.jsx)($,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${$v(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},lx=Z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,ux=Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,dx=Z.div`
  display: flex;
  gap: 0.5rem;
`,fx=Z($)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,px=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],mx=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=lh(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=ov(n),u=a===`daily`&&!l?`factory`:a;return(0,Q.jsxs)(lx,{children:[(0,Q.jsx)(ux,{children:(0,Q.jsx)(`h1`,{children:`Challenges`})}),(0,Q.jsx)(dx,{role:`tablist`,"aria-label":`challenge types`,children:px.filter(e=>e.id!==`daily`||l).map(e=>(0,Q.jsxs)(fx,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,Q.jsx)(cx,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,Q.jsx)(Gb,{actions:r,state:n}),(0,Q.jsx)(sx,{def:s?N.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},hx=`🏷️`,gx=Z.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,_x=Z.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,vx=Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,yx=Z.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,bx=Z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,xx=wh`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,Sx=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,Cx=wh`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,wx=Z.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${Sx(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
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
  border: 1.5px solid ${e=>e.$activeKind?Sx(e):e.$full?e.theme.color.accent:e.$empty?e.theme.color.textMuted:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$pullEligible?e.theme.color.good:`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:e.$empty?e.theme.color.surfaceSunken:`transparent`};
  ${e=>e.$activeKind?`--disk-glow: ${Sx(e)}; box-shadow: 0 0 0 1px var(--disk-glow), 0 0 10px 2px var(--disk-glow);`:``}
  ${e=>e.$queued?`border-style: dashed; border-color: ${e.theme.color.info};`:``}
  animation: ${e=>e.$activeKind&&!e.$paused?Cx:e.$pullEligible?xx:`none`} 1.4s ease-in-out infinite;
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
`,Tx=Z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Ex=Z.div`
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
`,Dx=Z.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,Ox=Z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,kx=Z.div`
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
`,Ax=Z.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,jx=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=ic(n,t),l=c!==null,u=io(n,t),d=rc(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=G(t),g=hs(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=os(n),b=ns(n),x=t===y?ls(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/ss(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!_s(n)||Math.max(0,(qa(n,U(t))??0)-oo(n,U(t)))<=0),O=Math.round(E*100),k=ks(n,t),A=k?Fs(n,t):!1,ee=k?Ns(k):0,j=k?Ps(k):0,te=k&&k.segmentsCollected<10,M=k&&k.segmentsCollected>=10,N=zs(n,t)&&typeof e?.expediteDiskFill==`function`,ne=Bs(n,t),P=js(k).length>0,re=Js(n,t),ie=!!re,F=ie&&Zs(n,t),ae=ie?Math.max(0,1-Xs(re)):1,oe=ie?t*ae:p,se=Qs(t);return(0,Q.jsxs)(gx,{children:[f?(0,Q.jsx)(yx,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):se?(0,Q.jsxs)(_x,{children:[(0,Q.jsx)(vx,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,Q.jsx)(Tx,{role:`group`,"aria-label":ie?`${h} read cache flushing to disk${F?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,oe-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,Q.jsx)(Ex,{"aria-label":ie?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:ie?F?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(re.remainingSeconds/Qa(n,U(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:ie&&(a||o>0),children:o>0?(0,Q.jsx)(Dx,{$fill:o,$flushing:ie}):null},r)})})]}):null,k&&!f?(0,Q.jsxs)(_x,{children:[(0,Q.jsxs)(vx,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,Q.jsx)(Ox,{role:`progressbar`,"aria-label":M?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((M?j:ee)*100),children:te?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=Ns(k),i=t<n,a=t===n&&r>0;return(0,Q.jsx)(kx,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?P?`Collecting from smaller disks and Staging`:`Filling from Staging`:ne?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,Q.jsx)(kx,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,Q.jsx)(Ax,{$fill:j})})})]}):null,(0,Q.jsxs)(_x,{children:[(0,Q.jsx)(vx,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,Q.jsx)(bx,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&N,g=o&&!p&&ne&&r===i;return(0,Q.jsx)(wx,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${Os(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?se?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},Mx=Z.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,Nx=Z.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,Px=Z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Fx=Z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,Ix=Z.h4`
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
`,Lx=Z.span`
  flex-shrink: 0;
`,Rx=Z.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,zx=Z.div`
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
`,Bx=Z.span`
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
`,Vx=Z.div`
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
`,Hx=Z.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Ux=Z.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Wx=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Gi(t)},Gx=Z.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,Kx=Z.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,qx=Z.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Jx=Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Yx=Z.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,Xx=Z.div`
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
`,Zx=Z.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Qx=Z($)`
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
`,$x=Z.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,eS=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=K(e,n),a=pc(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},tS=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?eS(t):[r];if(c.length===0)return null;let l=(0,Q.jsx)(Nx,{children:c.map(n=>{let r=fc(n),i=Uc(n)(t),c=Fe[n-1]??`Cell`,l=vl(n),u=hc(t,n),d=!mc(t,n)&&Ue[pc(t,n)+1],f=ds(u*l,n),p=ds(i*l,n),m=yc(t,n),h=Sc(t,n),g=Cc(t,n),_=Ec(t,n),v=Ac(t,n),y=jc(t,n),b=kl(t,n),x=Dl(t,n),S=Vc(t,n),C=ka(t,n),w=ul(t,n),T=nl(t,n),E=!T&&rl(t,n),D=ll(t,n),O=fl(t,n),k=kc(t,n)*l,A=Mc(t,n),ee=A&&Tl(t,n),j=ee||A&&C&&qa(t,n)>=Ga(t,n)?Va(t,n)*(ee?Qa(t,n):1)*Bc(t,n):0,te=O||b&&!D&&!E&&!T,M=i*l,N=!te&&S&&!E&&j>0&&i<=u&&k<M?Wx((M-k)/j):null,ne=S?v/100:0,P=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Mx,{children:hx}),p]}),re=`${S?v:0}%`;return(0,Q.jsxs)(Px,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,Q.jsxs)(Rx,{$flush:s,children:[(0,Q.jsxs)(Fx,{children:[(0,Q.jsxs)(Ix,{title:`${r} Data Lake — funds ${c}`,children:[(0,Q.jsxs)(Lx,{"aria-hidden":`true`,children:[(0,Q.jsx)(Mx,{children:`🏞️`}),r]}),(0,Q.jsx)(`span`,{children:`Lake`})]}),(0,Q.jsxs)(Hx,{title:`Current fill speed`,children:[`⚡ `,G(j),`/s`]})]}),(0,Q.jsxs)(zx,{children:[D?(0,Q.jsx)(Gx,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:P}):E?(0,Q.jsx)(Gx,{title:`${c} is already at the max — spend or charge it up first`,children:P}):w?(0,Q.jsx)(Gx,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:P}):T?(0,Q.jsx)(Qx,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,Q.jsx)(i_,{children:P})}):S?(0,Q.jsx)(Qx,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,Q.jsx)(i_,{children:P})}):(0,Q.jsx)(Gx,{title:`Build a ${G(l)} disk in Storage to unlock ${c} here`,children:P}),O?(0,Q.jsx)(Qx,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,Q.jsx)(i_,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,Q.jsx)(Qx,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${G(x)} banked) to grow its capacity from ${f} to ${ds(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,Q.jsx)(i_,{children:`⚡ Scale Out`})}):N?(0,Q.jsxs)(Ux,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,N]}):null]}),s?(0,Q.jsx)(Bx,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:re}):(0,Q.jsx)(Bx,{$withBar:!0,title:`Currently filled`,children:Wo(ps(k,n))}),(0,Q.jsx)(Vx,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:ne})]}),o&&(()=>{let e=S?Tc(t,n):0,i=G(l);return(0,Q.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,Q.jsxs)(Yx,{children:[(0,Q.jsx)(`span`,{children:`buffer`}),(0,Q.jsx)(`span`,{children:S?`${G(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,Q.jsx)(Vx,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=Dc(t,n),i=ds(l*_.target,n);return(0,Q.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,Q.jsxs)(Yx,{children:[(0,Q.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,Q.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,Q.jsx)(Vx,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&Be.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?Dc(t,n):0,u=ds(s,n);return(0,Q.jsxs)(qx,{children:[(0,Q.jsx)(Jx,{"aria-hidden":`true`,children:u}),(0,Q.jsx)(Kx,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,Q.jsx)(Xx,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,Q.jsx)(Zx,{$fill:c})},t)})})]},e)}),o&&(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,kc(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,Q.jsxs)(Q.Fragment,{children:[a&&!s&&(0,Q.jsx)($x,{}),l]}):(0,Q.jsx)(Vh,{"aria-label":`Data Lakes`,children:l})},nS=h(),rS=Z.div`
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
`,iS=Z.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,aS=Z.dl`
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
`,oS=Z.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,sS=8,cS=6,lS=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-sS-n,i=t.bottom+cS,a=t.top-cS-n,s=i<=r||a<sS?Math.max(sS,Math.min(i,r)):a,l=Math.max(sS,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,nS.createPortal)((0,Q.jsxs)(rS,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:sS,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,Q.jsx)(iS,{children:r}),(0,Q.jsx)(aS,{children:i.map(({label:e,value:t})=>(0,Q.jsxs)(`div`,{style:{display:`contents`},children:[(0,Q.jsx)(`dt`,{children:e}),(0,Q.jsx)(`dd`,{children:t})]},e))}),a&&(0,Q.jsx)(oS,{children:a})]}),document.body)},uS=Z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,dS=Z.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,fS=Z.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,pS=Z.p`
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
`,mS=Z.button`
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
`,hS=({theme:e})=>_h`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,gS=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,_S=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>_h`
  button {
    background-color: ${gS(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,vS=Z(Vh)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${hS}

  button {
    background-color: ${gS};
    border: 0;
    border-radius: 0;
  }
`,yS=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Gi(t)},bS=(e,t,n)=>ha(e,t,t,n),xS=(e,t,n)=>{let r=bS(e,t,n);return r===null?null:yS(r)},SS=Z.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,CS=Z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,wS=wh`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,TS=Z.span`
  display: inline-block;
  animation: ${wS} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,ES=Z.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,DS=Z.span`
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
`,OS=Z.span`
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
`,kS=Z.span`
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
`,AS=Z.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,jS=Z.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,MS=Z(Vx)`
  margin-top: 0;
`,NS=Z.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,PS=Z(Vh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${hS}
  ${e=>e.$boosted&&jv}
`,FS=Z.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,IS=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,LS=Z(Vh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${hS}
  ${e=>e.$boosted&&jv}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`,RS=Z.button`
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
`,zS=Z.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,BS=Z.button`
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
`,VS=Z.div`
  position: relative;
  width: 100%;
`,HS=Z.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,US=Z.h3`
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
`,WS=Z.span`
  flex-shrink: 0;
`,GS=Z(Z.span`
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
`,KS=Z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${e_}
  background-color: ${gS};
`,qS=Z(KS)`
  position: relative;
`,JS=Z(KS)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,YS=Z(KS)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,XS=(e,t,n,r=!0)=>{let i=Po(t,n),a=i&&e>0&&e<i.divisor?Po(e,n):i;return r?Ho(e,a):Bo(e,a)},ZS=(e,t,n=``)=>{let r=Po(e,!0);return`${Uo(e/r.divisor)} → ${Uo(t/r.divisor)} ${r.symbol}${n}`},QS=(e,t)=>Bo(e,Po(e,t)),$S=5e3,eC=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),tC=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!eC(e))return;let t=setTimeout(()=>n(e),$S);return()=>clearTimeout(t)},[e,r]),t===e},nC=({bits:e,poolIndex:t,large:n})=>{let r=tC(ms(e,t))?ps(e,t):ms(e,t);return(0,Q.jsx)(pS,{$large:n,children:r})},rC=e=>Math.min(100,Math.max(0,e)),iC=8,aC=Z.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,oC=Z.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,sC=Z.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,cC=Z.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,lC=Z.div`
  position: relative;
  min-width: 0;
  height: ${iC}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,uC=Z(Z.div`
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
`,dC=Z.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,fC=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,Q.jsxs)(aC,{children:[(0,Q.jsxs)(oC,{children:[(0,Q.jsx)(Mx,{children:`📦`}),e]}),o&&(0,Q.jsx)(lC,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,Q.jsx)(uC,{$widthPercent:a/100*100})}),o&&(0,Q.jsxs)(sC,{children:[`+`,Math.round(a),`% `,(0,Q.jsx)(dC,{children:`👆`})]}),!o&&r&&(0,Q.jsxs)(cC,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},pC=[[10,[229,72,77]],[100,[59,130,246]],[ke,[48,164,108]]],mC=e=>{let t=pC.length-1;if(e<=pC[0][0])return`rgb(${pC[0][1].join(`,`)})`;if(e>=pC[t][0])return`rgb(${pC[t][1].join(`,`)})`;let n=pC.findIndex(([t])=>e<=t),[r,i]=pC[n-1],[a,o]=pC[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},hC=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=tC(XS(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=Do(o),f=Ia(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${Wo(Go(e))}/s`,w=da(s),T=Wu(s),E=s.byteCreated?C(Sa(s)):null,D=ya(s),O=xS(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=ns(o),ee=os(o),j=ts(o),te=cs(o,j),M=ss(o,j),N=U(j),ne=Math.max(0,qa(o,N)-oo(o,N)),P=as(o),re=rs(o),ie=sa(s).toFixed(3),F=sa({...s,unlockedDiskSteps:oa(s)+1}).toFixed(3),ae=G(Qo(oa(s)+1)),oe=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${ae} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${ie} → ${F}.`))&&n.unlockNextDiskSize()},se=d?gs(o):[],ce=!A&&_s(o),le=s.diskBuild,ue=!A&&!P&&so(o)&&!ce&&!le,de=Math.min(M,ls(o,j)),fe=Math.floor(de+1e-9),pe=de>0||s.diskBuildQueued,me=le?rC(100-le.remainingSeconds/le.totalSeconds*100):P?100:pe?rC(de/M*100):0,I=ic(o,j),L=mo(o),R=go(o),he=!!s.capacityUpgradeQueued,ge=!!s.speedUpgradeQueued,_e=he||ge,ve=s.capacity,ye=ho(s),be=s.capacity*2,xe=QS(be,!0),Se=la(s),Ce=da(Se?{...s,capacity:be}:{...s,speedCapacity:ye*2}),we=`${Go(Ce)}/s`,Te=w>0?`×${Number((Ce/w).toFixed(2))}`:``,Ee=rC(s.bits/8*100),De=rC((s.capacityUpgradeProgress??0)/ve*100),Oe=rC((s.speedUpgradeProgress??0)/ye*100),ke=ge?Oe:De,Ae=wa(s),je=Ae?.cost??0,Me=Ae?.progress??0,Ne=Ae?.multiplierPercent??100,Pe=C(Ae?.rate??0),Fe=Ae?.rate??0,Ie=yS(Fe>0&&je>0?Math.max(0,je-Me)/Fe:1/0),Le=rC(s.bits/s.capacity*100),Re=()=>{ce?n.provisionDisk():n.queueDiskBuild()},ze=s.diskBuildQueued,Be=`${fe}/${M}`,Ve=M>1||fe>0?` · ${Be}`:``,He=`Provision ${G(j)} Disk`,Ue=!!ze&&!le&&!P&&!A,We=U(ee),Ge=A?s.diskBuild?`waiting for build`:ja(o,We)?`waiting for earlier pool`:Va(o,We)<=0?`waiting for pool`:qa(o,We)<=oo(o,We)?`waiting for staging`:null:null,Ke=le?{icon:`🏗`,label:`Provisioning ${G(le.size)} Disk`,status:`${Math.ceil(le.remainingSeconds)}s left`}:P?{icon:`✅`,label:`All Pools Complete (${G(j)})`,status:null}:A?{icon:`🔁`,label:He,status:`Rebuilding ${G(ee)} first · ${Ge??`automatic`}`}:ze?{icon:`⏳`,label:`Provisioning ${G(j)} Disk`,status:`${fe>0?Be:`Queued`} · ${ce?ne>0?`building`:`waiting for staging`:ue?`after disk fill`:`waiting for pool`}`}:ce?{icon:`🏦`,label:He,status:`Ready · ${hx} ${G(te)}${Ve}`}:{icon:`🏦`,label:He,status:`${hx} ${G(te)}${Ve} · tap to queue`,reason:ue?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},qe=Qa(o,A?We:N),Je=100*qe,Ye=(A?Ha(o,We):Va(o,N))*qe,Xe=`${Wo(G(Ye))}/s`,Ze=A&&Va(o,We)<=0,Qe=Ts(o),$e=Qe.disksTotal>0?rC(Qe.disksDone/Qe.disksTotal*100):0,et=Qe.seconds,tt=A?$e:me,nt=Math.max(0,(M-de)*j),rt=$a(o,N)*Za(o,N)/100*qu(s,N),it=Math.min(nt,ne),at=Ye>0?it/Ye+(nt-it)/Math.max(Math.min(Ye,rt),Number.MIN_VALUE):1/0,ot=A?yS(et):ue?`—`:yS(at),st=d&&!P&&!le&&Ye>0&&(A||ze),ct=(0,Q.jsx)($,{"aria-label":`reformat to unlock disk size`,onClick:oe,title:`Reformat the Byte Foundry to unlock ${ae} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${ie} → ${F}.`,type:`button`,variant:`prestige`,children:(0,Q.jsxs)(CS,{children:[(0,Q.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,ae,` Disks`]}),(0,Q.jsx)(NS,{children:`Bitrate exponent ${ie} → ${F} · auto-rebuilds to your highs`})]})}),lt=re?ct:(0,Q.jsxs)($,{"aria-label":le?`disk array rebuilding`:P?`disk ladder complete`:`provision disk`,"aria-description":Ke.reason?`${Ke.status} (${Ke.reason})`:Ke.status??void 0,disabled:!!le||P||A,onClick:Re,title:le?`Provisioning ${G(le.size)} — ${Math.ceil(le.remainingSeconds)}s (array offline)`:P?`All ${Oa()} storage pools are complete through ${G(j)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${G(ee)} now); ${G(j)} unlocks for provisioning once they are done`:ze?`Armed — draws from the pool staging at the pool's fixed bandwidth${ue?` once Disk Fill is done`:``} (${fe}/${M} passes so far)`:ce?I?`Costs ${G(te)}, paid in ${M} pass${M===1?``:`es`} of ${G(j)} each (${fe}/${M} collected) — creates an empty ${G(j)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${I} level`:`Costs ${G(te)}, paid in ${M} pass${M===1?``:`es`} of ${G(j)} each (${fe}/${M} collected) — creates an empty ${G(j)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:ue?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${fe}/${M} passes so far)`,type:`button`,variant:P||A?`neutral`:ze?`smart`:ce?`info`:`neutral`,$progress:tt,$pulse:Ue,children:[st?(0,Q.jsxs)(ES,{children:[(0,Q.jsxs)(DS,{children:[Ke.icon,` `,A?`Rebuilding`:`${G(j)} Disk…`]}),(0,Q.jsx)(OS,{children:A?(()=>{let e=Qo(oa(s)-1);return e>ee?`${G(ee)} → ${G(e)}`:`${G(ee)} disks`})():fe>0?Be:`Queued`}),(0,Q.jsxs)(kS,{children:[Math.floor(tt),`%`]}),(0,Q.jsxs)(jS,{style:{color:mC(Je),...A&&Qe.projected?{opacity:.55}:null},title:Ze?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&Qe.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&Qe.projected?`~`:``,Xe]}),ot!==`—`&&(0,Q.jsxs)(AS,{style:Qe.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:Qe.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,Qe.projected?`~`:``,ot]})]}):(0,Q.jsxs)(CS,{children:[(0,Q.jsxs)(`span`,{children:[Ke.icon,` `,Ke.label,Ue?`…`:``]}),Ke.status&&(0,Q.jsx)(NS,{children:Ke.status})]}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(tt),"aria-valuemin":0,"aria-valuemax":100})]}),ut=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&_e&&!!Ae||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{ut||_(null)},[ut]);let dt=g===`stream`,ft=null;if(dt){let e=va(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=Va(o,e);ft=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:ie},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...Ae?[{label:`Upgrade bar drawing`,value:Pe}]:[],{label:`Buffer`,value:`${Math.floor(Le*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...R&&!_e?[{label:`After Upgrade Bitrate`,value:`${we} (${Te})`}]:[]]}let pt=g===`upgrade`&&!!Ae,mt=pt?[{label:`Draw now`,value:Pe},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${Go(Me)} / ${Go(je)}`},{label:`Time left`,value:Ie},...Ae.kind===`speed`?[{label:`Bitrate after`,value:ZS(w,Ce,`/s`)}]:[{label:`Capacity after`,value:ZS(s.capacity,be)},...Se?[{label:`Bitrate after`,value:ZS(w,Ce,`/s`)}]:[]]]:null;return(0,Q.jsxs)(uS,{children:[(0,Q.jsx)(by,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,Q.jsx)(fS,{children:(0,Q.jsx)(dS,{children:`🔥 Byte Foundry`})}),(0,Q.jsxs)(LS,{"aria-label":`Data Stream`,$boosted:Dv(s),children:[(0,Q.jsxs)(qS,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:Le,children:[s.mainGameUnlocked&&(0,Q.jsx)(RS,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,Q.jsxs)(zS,{children:[(0,Q.jsxs)(VS,{children:[(0,Q.jsxs)(HS,{children:[(0,Q.jsx)(US,{children:(0,Q.jsxs)(`span`,{children:[(0,Q.jsx)(Mx,{children:`🌊`}),`Data Stream`]})}),(0,Q.jsx)(pS,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:XS(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,Q.jsxs)(GS,{ref:dt?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:mC(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":dt,"aria-controls":dt?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),dt&&(0,Q.jsx)(lS,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:ft})]}),(0,Q.jsx)(fC,{capacityText:QS(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&_e&&(0,Q.jsxs)(JS,{"aria-label":ge?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:ge?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${xe} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,Q.jsxs)(ES,{children:[(0,Q.jsxs)(DS,{children:[(0,Q.jsx)(Mx,{children:`⏫`}),`Upgrading`,(0,Q.jsx)(TS,{children:`…`})]}),(0,Q.jsxs)(OS,{children:[(0,Q.jsx)(Mx,{children:ge?`⚡`:`📦`}),ge?ZS(w,Ce,`/s`):ZS(s.capacity,be)]}),(0,Q.jsxs)(kS,{children:[Math.floor(ke),`%`]}),(0,Q.jsxs)(GS,{ref:pt?y:void 0,$color:mC(Ne),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Pe}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":pt,"aria-controls":pt?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Pe]}),pt&&(0,Q.jsx)(lS,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:Ae.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:mt}),(0,Q.jsxs)(AS,{children:[`⏳ `,Ie]})]}),(0,Q.jsx)(MS,{$fill:Math.min(1,Math.max(0,ke/100)),"aria-hidden":`true`}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(ke),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!_e)&&(0,Q.jsxs)(_S,{children:[u&&(0,Q.jsxs)($,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:Ee,children:[(0,Q.jsx)(i_,{children:`🔗 Compile into a Byte`}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!_e&&(0,Q.jsx)(SS,{children:!_e&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)($,{"aria-label":`upgrade data stream capacity`,disabled:!L,onClick:n.pickIntroCapacityMilestone,title:L?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity${Se?` and raises Bitrate with it`:``}`:`Capacity is already at its maximum`,"aria-description":L?`Costs ${Go(ve)}; capacity ${xe}${Se?` and bitrate ${we}`:``} after upgrading`:void 0,type:`button`,variant:L?`prestige`:`neutral`,children:(0,Q.jsxs)(CS,{children:[(0,Q.jsx)(`span`,{children:Se?`Upgrade`:`Upgrade Capacity`}),(0,Q.jsx)(NS,{children:L?`🏷️ ${Go(ve)} · 📦 ×2${Se?` · ⚡ ${Te}`:``}`:`📦 Max capacity`})]})}),!Se&&(0,Q.jsx)($,{"aria-label":`upgrade data stream bitrate`,disabled:!R,onClick:n.queueIntroSpeedUpgrade,title:R?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${ie} — upgrade Capacity first`,"aria-description":R?`Costs ${Go(ye)}; bitrate ${we} after upgrading`:void 0,type:`button`,variant:R?`prestige`:`neutral`,children:(0,Q.jsxs)(CS,{children:[(0,Q.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,Q.jsx)(NS,{children:R?`🏷️ ${Go(ye)} · ⚡ ${Te}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,Q.jsx)(vS,{"aria-label":`Provision Disk`,children:lt}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=$a(o,r),a=qa(o,r),c=Ga(o,r),l=c>0?rC(a/c*100):0,u=a>=c,d=Za(o,r),f=Xa(o,r),p=xS(a,c,i),_=Tl(o,r),v=se.filter(e=>U(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${Wo(G(e))}/s`,D=E(i*d/100*qu(s,r)),O=g===`pool-${r}`,k=null,A=Va(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=Va(o,t);let t=Ya(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*Qa(o,r))}]:[]]}return(0,Q.jsxs)(PS,{"aria-label":`pool ${r}`,$boosted:kv(s,r),children:[(0,Q.jsxs)(YS,{$progress:l,children:[(0,Q.jsx)(RS,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,Q.jsxs)(zS,{children:[(0,Q.jsxs)(VS,{children:[(0,Q.jsxs)(HS,{children:[(0,Q.jsx)(US,{children:(0,Q.jsxs)(BS,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,Q.jsxs)(WS,{"aria-hidden":`true`,children:[(0,Q.jsx)(Mx,{children:`💧`}),T]}),(0,Q.jsx)(`span`,{children:`Pool`})]})}),(0,Q.jsx)(nC,{bits:a,poolIndex:r,large:f<=0}),(0,Q.jsxs)(GS,{ref:O?y:void 0,$centered:f<=0&&!p,$color:mC(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,Q.jsx)(lS,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,Q.jsx)(fC,{capacityText:ds(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,Q.jsx)(FS,{children:(0,Q.jsx)(tS,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,Q.jsxs)(IS,{children:[v.map(e=>(0,Q.jsx)(jx,{actions:n,size:e,state:o},e)),(0,Q.jsx)(tS,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,Q.jsx)(mS,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},gC=Z.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,_C=Z.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,vC=Z.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,yC=Z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,bC=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,xC=Z(Vh)`
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
`,SC=_h`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,CC=Z.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,wC=Z.span`
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
`,TC=Z.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${SC}
`,EC=Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${SC}
`,DC=Z($)`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${SC}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,OC=Z.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,kC=Object.fromEntries(b.map(e=>[e.id,e])),AC=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=Fn(n),a=En(n),o=lh(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});return(0,Q.jsxs)(gC,{"aria-label":`compute flops screen`,children:[(0,Q.jsxs)(_C,{children:[(0,Q.jsx)(`h1`,{children:`🖥 Compute`}),(0,Q.jsx)(vC,{"aria-label":`cumulative flops boost`,children:Rn(i)})]}),!a&&(0,Q.jsxs)(yC,{children:[`Unlocks at `,100,` PP — you have `,B(r),` PP.`]}),(0,Q.jsx)(bC,{"aria-label":`compute flops tiers`,children:mt.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=Ln(n,e.boostsTierId),d=An(e,c),f=jn(n,e.id),p=kC[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(pt*100).toFixed(2);return(0,Q.jsxs)(xC,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,Q.jsxs)(CC,{children:[(0,Q.jsx)(wC,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,Q.jsxs)(TC,{title:`Owned`,children:[(0,Q.jsx)(a_,{children:`Owned: `}),B(c)]})]}),(0,Q.jsxs)(EC,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,Q.jsx)(DC,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${B(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${B(d)} PP for +${g}%/s on ${m}`:`Costs ${B(d)} PP — you have ${B(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,Q.jsxs)(i_,{children:[B(d),` PP`]})}),h&&(0,Q.jsxs)(OC,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},jC=Z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,MC=Z.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,NC=Z.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,PC=Z.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,FC=Z.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,IC=Z.div`
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
`,LC=Z.div`
  height: 0.6rem;
`,RC=Z.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,zC=Z.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,BC=Z.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,VC=Z.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,HC=Z.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,UC=Z.button`
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
`,WC=Z.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,GC=Z.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,KC=Z.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,qC=Z.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,JC=Z.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,YC=Z.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,XC=Z($)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,ZC=Z(XC)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,QC=Z(XC)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,$C=Z.span`
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
`,ew=Z.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,tw=Z.div`
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
`,nw=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],rw=(e,t,n)=>e>=8&&t<n,iw=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=nw.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:Vu(r)[0]?.queue[0]??1}),o=Vu(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=r.computeMergePageUnlocked?i:1,u=(l?nw[l-1]:null)&&(0,Q.jsxs)(Q.Fragment,{children:[!r.computeMergePageUnlocked&&(0,Q.jsx)(ew,{title:`Boosts ${Pv(l,`name`)}`,children:`Boosts ${Pv(l)}`}),(0,Q.jsx)(tw,{role:`group`,"aria-label":`compute boost`,children:Object.keys(Pe).map(e=>{let i=Ru(e,l),a=zu(e,l),o=Mv[e].label,s=!!Hu(r,e),c=`×${i} production, ${Nv(a)}`;return(0,Q.jsx)(XC,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!Yu(n,e,l),onClick:()=>t.activateComputeBoost(e,l),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,Q.jsx)(i_,{children:`${Mv[e].icon} ×${i} · ${Nv(a)}`})},e)})})]});return(0,Q.jsxs)(jC,{children:[s?(0,Q.jsx)(a_,{as:`h1`,children:`⚡ Power`}):(0,Q.jsx)(MC,{children:(0,Q.jsx)(NC,{children:`⚡ Power`})}),s&&(0,Q.jsx)(Jv,{actions:t,state:n}),!s&&(0,Q.jsx)(ew,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,Q.jsx)(VC,{"aria-label":`boost`,children:u}),r.computeMergePageUnlocked?(0,Q.jsx)(FC,{"aria-label":`compute entities`,children:nw.map((e,i)=>{let o=i+1,s=r[e.countField]??0,d=!!e.autoFlagField,f=d?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=d&&!f&&p>=10,h=d?Nl(n,e.autoFlagField):0,g=d&&!f&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=d?Kc(n,e.mergeOutputField):10,S=d&&Zl(n,i),C=d?Jc(n,o):0,w=d&&Xc(n,i),T=d&&Qc(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=f?S:rw(s,r[e.mergeOutputField]??0,x),O=d&&(!f||l===o||b||w||D||C>0),k=i>0?nw[i-1]:null,A=nw.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||f||b||l===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let ee=nw[i+1]?.symbol??`⬆`,j=d&&(f?(0,Q.jsx)(ZC,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,Q.jsx)(i_,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,Q.jsx)(ZC,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!rw(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,Q.jsx)(i_,{children:`${e.symbol} 8→1 ${g?`🔌`:ee}`})})),te=d&&(f?(0,Q.jsx)($C,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${Gi(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${Gi(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${Gi(y)}`:`🔌 ${C}/8`}):m?(0,Q.jsx)(QC,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${B(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,Q.jsx)(i_,{children:`🔓 10/10`})}):(0,Q.jsx)($C,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),M=d&&O;return(0,Q.jsxs)(v.Fragment,{children:[(0,Q.jsxs)(BC,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:l===o,children:[(0,Q.jsxs)(HC,{children:[(0,Q.jsxs)(UC,{type:`button`,onClick:()=>a(o),"aria-pressed":l===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${Pv(o,`name`)}`,$selected:l===o,children:[(0,Q.jsx)(qC,{"aria-hidden":`true`,children:e.symbol}),(0,Q.jsxs)(GC,{children:[(0,Q.jsxs)(KC,{children:[(0,Q.jsxs)(WC,{children:[e.label,(0,Q.jsx)(a_,{children:` ${B(E)}/10`})]}),(0,Q.jsxs)(zC,{"aria-hidden":`true`,children:[`→ `,Pv(o)]})]}),(0,Q.jsx)(JC,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,Q.jsx)(YC,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),te&&(0,Q.jsx)(RC,{children:te})]}),l===o&&u]}),M?(0,Q.jsx)(IC,{children:j}):(0,Q.jsx)(LC,{})]},e.key)})}):(0,Q.jsx)(PC,{children:`⬡ ${B(r.computeCores??0)}/10 · 🔗 ${B(r.computeNodes??0)}/10`})]})},aw=Z.button.attrs({type:`button`})`
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
`;b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),mt.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{});var ow=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}];Z.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,Z(Vh)`
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
`,Z.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`,Z.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,Z.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`,Z.div`
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
`,Z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`,Z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`,Z($)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`,Z.input`
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
`,Z.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`,Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`,Z.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`,Z.div`
  display: flex;
  gap: 0.3rem;
`,Z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`,Z($)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`,Z.span`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
`,Z.details`
  border-left: 2px solid ${e=>e.theme.color.border};
  padding-left: 0.6rem;
`,Z.summary`
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
`,Z.textarea`
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
`,Z.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.good} !important;
  font-size: 0.8rem;
`,[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>ow.find(t=>t.id===e));var sw=`0.5.0`,cw=Z.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,lw=Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,uw=Z.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,dw=Z(Vh)`
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
`,fw=()=>{let e=Qt(b[0].id),t=Qt(b[b.length-1].id),n=$t(b[0].id),r=Fr({}),i=b[b.length-1].name,a=b[0].name;return(0,Q.jsxs)(cw,{children:[(0,Q.jsxs)(lw,{children:[(0,Q.jsx)(`h1`,{children:`Tens — Manual`}),(0,Q.jsxs)(uw,{children:[`v`,sw]})]}),(0,Q.jsxs)(dw,{"aria-label":`overview section`,children:[(0,Q.jsx)(`h2`,{children:`Overview`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,Q.jsxs)(`li`,{children:[`Buy every tier with `,(0,Q.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,Q.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,a,` produce Bytes, which are added to your Bits.`]}),(0,Q.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,Q.jsxs)(`li`,{children:[`Reaching `,(0,Q.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge — unless you have unlocked Overflow mode (see Purge).`]}),(0,Q.jsxs)(`li`,{children:[`Once bought (`,2,` PP on Firmware → ✦ Prestige), the `,(0,Q.jsx)(`strong`,{children:`Buy max`}),` toggle makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})]}),(0,Q.jsxs)(dw,{"aria-label":`prestige ladder section`,children:[(0,Q.jsx)(`h2`,{children:`Prestige ladder`}),(0,Q.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,Q.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP, the per-cycle Compute (Flops) boost.`,` `,(0,Q.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, Overflow mode, the Byte generator, Capacity, Disks, Data Lakes, Compute entities, owned Compute (Flops) units and the System log.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,Q.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,Q.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Reinstall`}),` — a future layer above Reboot, not yet in the game.`]})]})]}),(0,Q.jsxs)(dw,{"aria-label":`byte foundry section`,children:[(0,Q.jsx)(`h2`,{children:`Byte Foundry`}),(0,Q.jsxs)(`p`,{children:[`Every new save starts here, before any `,a,` exist. Unlocking the main game is permanent — no Purge or Reboot sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,Q.jsx)(`h3`,{children:`The loop`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,Go(Ae),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,Go(Te(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,ke/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,ke/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,Q.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,Q.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,Q.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,Ee,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-De)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,a,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,Go(Ae),` threshold.`]})]}),(0,Q.jsx)(`h3`,{children:`What resets vs. what stays`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,a,` level.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, every Compute entity, and the main-game unlock. Reboot resets most of this (see Reboot).`]}),(0,Q.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]}),(0,Q.jsx)(`h3`,{children:`Forced priority`}),(0,Q.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Disk Fill → Provision Disk → Compute Boost`}),(0,Q.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]}),(0,Q.jsxs)(dw,{"aria-label":`storage section`,children:[(0,Q.jsx)(`h2`,{children:`Storage`}),(0,Q.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,Go(Ae),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,Q.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,Q.jsx)(`h3`,{children:`Provisioning Disks`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,Q.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]}),(0,Q.jsx)(`h3`,{children:`Cache and automatic pulling`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,Q.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,Q.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,Q.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,Q.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,Q.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]}),(0,Q.jsx)(`h3`,{children:`Data Lakes`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,Q.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,Q.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,Q.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,Re.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,Q.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,Ue.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,Q.jsx)(`li`,{children:`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the Reboot cycle — through pool flushes, Reformats and Purges.`})]}),(0,Q.jsx)(`h3`,{children:`Flushing`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,Q.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,Q.jsx)(`li`,{children:`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. A pool’s first two flushes also each upgrade one of its two disk-size exponent steps to close 10% of the gap to 1.0. These upgrades survive Reformat, Purge, and Reboot. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`}),(0,Q.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})]}),(0,Q.jsxs)(dw,{"aria-label":`power section`,children:[(0,Q.jsx)(`h2`,{children:`Power`}),(0,Q.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,Go(Me),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,Q.jsx)(`h3`,{children:`Cells and the charge chain`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,Q.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,Q.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,Q.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,Q.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]}),(0,Q.jsx)(`h3`,{children:`Compute Boost`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,Q.jsxs)(`li`,{children:[`Turbo ×`,Pe.burst.multiplier,` for`,` `,Gi(Pe.burst.durationSeconds),`; Balanced ×`,Pe.standard.multiplier,` for`,` `,Gi(Pe.standard.durationSeconds),`; Eco ×`,Pe.sustain.multiplier,` for`,` `,Gi(Pe.sustain.durationSeconds),`.`]}),(0,Q.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,Pe.burst.poolBonusPercent,`% / +`,Pe.standard.poolBonusPercent,`% / +`,Pe.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,Q.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,Q.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,Q.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,Q.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,Q.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,Q.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,Q.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,Q.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})]}),(0,Q.jsxs)(dw,{"aria-label":`compute flops section`,children:[(0,Q.jsx)(`h2`,{children:`Compute`}),(0,Q.jsxs)(`p`,{children:[`A separate screen (nav `,(0,Q.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,Q.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,dt.toLocaleString(),` PP.`]}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,dt.toLocaleString(),` –`,` `,ft.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,Q.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,Q.jsxs)(`li`,{children:[`Each owned unit adds `,(pt*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,Q.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,Q.jsxs)(`li`,{children:[`The header’s `,(0,Q.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,Q.jsx)(`sup`,{children:`n`}),` `,`(`,(0,Q.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,Q.jsxs)(dw,{"aria-label":`accelerate section`,children:[(0,Q.jsx)(`h2`,{children:`Accelerate`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,Q.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,Q.jsxs)(`li`,{children:[`Unlocks once `,a,` complete their first level.`]}),(0,Q.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,Q.jsxs)(`li`,{children:[i,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Restage while holding 0 `,i,` (nothing is left producing) to earn Spent QB — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,Q.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,i,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,i,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,rt.restage,`) spends it for you, every `,it.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})]}),(0,Q.jsxs)(dw,{"aria-label":`scale up section`,children:[(0,Q.jsx)(`h2`,{children:`Scale Up`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,a,` — to claim a Scale Up.`]}),(0,Q.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,Q.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,Q.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,Q.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})]}),(0,Q.jsxs)(dw,{"aria-label":`overclock section`,children:[(0,Q.jsx)(`h2`,{children:`Overclock`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[`Reach the required number of completed `,i,` levels to claim an Overclock.`]}),(0,Q.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,Q.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,Q.jsxs)(`li`,{children:[`The first claim needs `,r,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,Q.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})]}),(0,Q.jsxs)(dw,{"aria-label":`tier autobuyers section`,children:[(0,Q.jsx)(`h2`,{children:`Tier Autobuyers`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,Q.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,Q.jsxs)(`li`,{children:[`An autobuyer buys `,(0,Q.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,Q.jsx)(`strong`,{children:`Single`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,at.baseCost,` PP × the same.`]})]})]}),(0,Q.jsxs)(dw,{"aria-label":`milestones section`,children:[(0,Q.jsx)(`h2`,{children:`Milestones`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,e,` (`,a,`) through Purge`,` `,t,` (`,i,`).`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,n,`, then every`,` `,`Purge`,` after that.`]}),(0,Q.jsx)(`li`,{children:`More → Milestones tracks your story milestones and Reboot progress.`})]})]}),(0,Q.jsxs)(dw,{"aria-label":`prestige section`,children:[(0,Q.jsx)(`h2`,{children:`Purge`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge, Reboot, Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,Q.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge. Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,Q.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]}),(0,Q.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) for every `,64,` powers of ten in your balance: 100 powers at 1 Googol Bytes is 1 PP. Each Compression upgrade halves the powers needed per PP (100 ÷ 32 = 3 PP, then 6, 12, …), and once that reaches 1, doubles the PP per power. Past 1 Googol Bytes the count only keeps growing in Overflow mode.`]}),(0,Q.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,Q.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,Q.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,Q.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,Q.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,Qe*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,Q.jsx)(`li`,{children:`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage and Power progress carries over.`}),(0,Q.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})]}),(0,Q.jsxs)(dw,{"aria-label":`sleep mode section`,children:[(0,Q.jsx)(`h2`,{children:`Sleep mode`}),(0,Q.jsx)(`ul`,{children:(0,Q.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,Gi(Ke),` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,Je.map(e=>B(e)).join(` / `),` PP) adds`,` `,Gi(qe),`, up to `,Gi(Ge),`. Absences of `,Gi(600),` `,`or less run at full speed; longer ones run at`,` `,We*100,`% speed and show a “Resumed from sleep” summary.`]})})]}),(0,Q.jsxs)(dw,{"aria-label":`reboot section`,children:[(0,Q.jsx)(`h2`,{children:`Reboot`}),(0,Q.jsxs)(`ul`,{children:[(0,Q.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,_t.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,Q.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel, ×`,10,` per Kernel Amplifier level. Spend Kernels on Firmware → ⏻ Kernels: hyperscalers (a Flops boost that builds up every second on every tier, until the next Purge, Scale Up or Overclock), Hyperscaler efficiency, Kernel amplifier and Auto Hyperscaler.`]}),(0,Q.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,Q.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,Q.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})]})]})},pw=Z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,mw=Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,hw=Z(Vh)`
  gap: 0.4rem;
`,gw=Z.ol`
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
`,_w=Z.li`
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
`,vw=Z.p`
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
`,yw=Z.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,bw=({game:e})=>{let{state:t}=e,n=lh(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=Bn(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:Wr(t)},{label:`First Reboot`,reached:i>0}];return(0,Q.jsxs)(pw,{children:[(0,Q.jsx)(mw,{children:(0,Q.jsx)(`h1`,{children:`Milestones`})}),(0,Q.jsxs)(hw,{"aria-label":`milestones page`,children:[(0,Q.jsx)(gw,{"aria-label":`milestones category`,children:s.map(e=>(0,Q.jsx)(_w,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),(0,Q.jsxs)(vw,{"aria-label":`reboot status`,children:[(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,Q.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,Q.jsx)(`strong`,{children:i}),` Reboots`]}),(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,Q.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,Q.jsx)(`strong`,{children:a}),` Kernels`]}),(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,Q.jsx)(yw,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,Q.jsx)(yw,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${_t.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},xw=({game:e})=>{if(!Xi(e.state))return null;let t=!!e.buyMaxMode;return(0,Q.jsx)(aw,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},Sw=Z.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,Cw=Z($)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&_h`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,ww=[{id:`level`,unit:!1,icon:`📶`,label:`Level`,title:`Buy level: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Single`,title:`Buy single: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],Tw=({game:e})=>(0,Q.jsx)(Sw,{role:`group`,"aria-label":`buy mode`,children:ww.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,Q.jsx)(Cw,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),Ew=Z.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,Dw=Z($)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&_h`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,Ow=({value:e,onChange:t})=>(0,Q.jsx)(Ew,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(Pe).map(n=>{let r=Mv[n],i=e===n;return(0,Q.jsx)(Dw,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),kw=Z.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Aw=Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,jw=Z.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,Mw=Z.div`
  display: flex;
  gap: 0.5rem;
`,Nw=Z($)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,Pw=Z.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,Fw=Z.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,Iw=Z(Vh)`
  gap: 0.4rem;
`,Lw=Z.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Rw=Z.div`
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
`,zw=Z.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,Bw=({tier:e})=>(0,Q.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,Q.jsx)(a_,{children:e.name}),(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),Vw=Z.div`
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
`,Hw=Z.div`
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
`,Uw=Z.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Ww=Z.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,Gw=Z.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Kw=Z.div`
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
`,qw=Z.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,Jw=Z.span`
  display: flex;
  gap: 4px;
`,Yw=Z.button`
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
`,Xw=Z.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,Zw=Z.div`
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
`,Qw=Z.span`
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
`,$w=Z.span`
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
`,eT=Z.div`
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
`,tT=Z.span`
  font-weight: 600;
  min-width: 0;
`,nT=Z.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,rT=Z.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,iT=Z.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,aT=Z.button`
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
`,oT=Z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,sT=Z.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,cT=Z.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,lT=Z.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,uT=Z($)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,dT=Z.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,fT=(e,t)=>Math.min(100,Math.round(e/t*100)),pT=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=lh();return(0,Q.jsxs)(sT,{children:[(0,Q.jsx)(dT,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,Q.jsxs)(Q.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},mT=({name:e,icon:t,title:n})=>{let r=lh();return(0,Q.jsxs)(dT,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},hT=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,Q.jsxs)(uT,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:fT(r,n),$progressColor:t,children:[(0,Q.jsx)(t_,{children:s}),(0,Q.jsx)(n_,{children:c}),(0,Q.jsx)(a_,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),gT=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,Q.jsxs)(Vw,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,Q.jsxs)(Zw,{$narrow:t,$wrap:r,children:[(0,Q.jsxs)(tT,{children:[s&&l&&!i&&(0,Q.jsx)(a_,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,Q.jsx)(rT,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,Q.jsx)(nT,{children:i})),o]}),s&&p&&(0,Q.jsx)(Qw,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,Q.jsx)($w,{$narrow:t,children:y}),s&&l&&(0,Q.jsx)(aw,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,Q.jsx)(eT,{$narrow:t,children:y})]})},_T=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],vT=Z.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.color.text};
`,yT=Z.span`
  min-width: 4.5em;
  text-align: center;
  font-size: 0.9rem;
`,bT=Z($)`
  min-width: 32px;
  min-height: 32px;
  padding: 0;
`,xT={id:`kernels`,icon:`⏻`,ariaLabel:`open kernels`,title:`Kernels — spend Kernels earned by Rebooting`},ST=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,CT=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,wT=e=>String(Number(e.toFixed(2))),TT=e=>`${Number((e/3600).toFixed(1))}h`,ET=e=>{let t=Ai(e+1);if(t>1)return`${B(Ai(e))} → ${B(t)} PP per extra digit`;let[n,r]=[ki(e),ki(e+1)];return`1 PP per ${B(n)} → ${B(r)} extra digit${r===1?``:`s`}`},DT=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,Q.jsxs)(Rw,{"aria-label":e,children:[(0,Q.jsxs)(iT,{children:[(0,Q.jsx)(tT,{children:(0,Q.jsxs)(aT,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Q.jsx)(nT,{children:t}),n]})}),r&&(0,Q.jsx)(lT,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,Q.jsx)(oT,{"aria-label":`${n} description`,children:i})]})},OT=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],kT=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=lh(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=vi(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=Kr(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=ji(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=dn(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=!Xi(n)&&o>=2,T=xn(n),E=Cn(T),D=TT(Sn(n)),O=TT(Sn({...n,sleepModeCapLevel:T+1})),k=TT(qe),A=!n.cacheWarmUnlocked&&o>=20,ee=vn(n),j=mn({...n,playtimeBonusUnlocked:!0}),te=Ne.some(e=>!!n.intro?.[e.autoFlagField]),M=n.computeAutoChargeEnabled??!0,ne=n.intro?.computeAutoBoostEnabled??!0,P=n.eons?.balance??0,re=c>=1||P>0,ie=re?[..._T,xT]:_T,F=Un(n)||Xn(n)||Object.keys(St).some(e=>Jn(n,e)),ae={kernels:re&&F&&`kernel upgrade available`,automation:Tg(n)&&`automation perk available`,prestige:Eg(n)&&`prestige perk available`},oe=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,Q.jsx)(hT,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${B(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),se=e=>ci(n,e.id)?(0,Q.jsxs)($,{"aria-label":`Start challenge ${$v(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,Q.jsxs)($,{"aria-label":`Challenge ${e.id} ${Qv(e).toLowerCase()}`,disabled:!0,title:Qv(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),ce=(e,t)=>{let r=li(e,t);return r&&!qr(n,r.id)?r:null},le=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=yd(e.id)&&r>=jd()&&!ce(`tierTickspeed`,e.id)&&!ce(`tierAutobuyer`,e.id)}),ue=()=>{let e=Br(n),t=(e,t,n)=>{let r=Math.max(0,e.indexOf(t));return e[Math.min(e.length-1,Math.max(0,r+n))]},i=[{key:`targetPpExponent`,icon:`✦`,name:`Purge at PP`,options:Array.from({length:101},(e,t)=>t),label:e=>e===0?`Off`:`10^${e} PP`,details:`Auto Purge waits until a Purge would award at least this many PP. Needs Overflow mode (production must keep running past 1 Googol Bytes); the manual Purge always works.`},{key:`minSeconds`,icon:`⏳`,name:`Minimum time`,options:vt,label:e=>e===0?`Off`:e>=3600?`${e/3600} h`:e>=60?`${e/60} min`:`${e} s`,details:`Auto Purge waits until this much time has passed since the last Purge, or Googol Bytes is reached, whichever is later.`},{key:`bestMultiplier`,icon:`📈`,name:`Best PP multiple`,options:yt,label:e=>e===0?`Off`:`×${e}`,details:`Auto Purge waits until a Purge would award at least this multiple of your best Purge award since the last Reboot. Needs Overflow mode.`}];return(0,Q.jsx)(Q.Fragment,{children:i.map(n=>{let i=e[n.key],a=t(n.options,i,-1),o=t(n.options,i,1);return(0,Q.jsx)(DT,{ariaLabel:`auto purge ${n.name.toLowerCase()} setting`,details:n.details,icon:n.icon,name:n.name,children:(0,Q.jsxs)(vT,{role:`group`,"aria-label":`${n.name} stepper`,children:[(0,Q.jsx)(bT,{"aria-label":`Decrease ${n.name}`,disabled:a===i,onClick:()=>r.setAutoPurgeSetting(n.key,a),type:`button`,children:`−`}),(0,Q.jsx)(yT,{"aria-label":`${n.name} value`,children:n.label(i)}),(0,Q.jsx)(bT,{"aria-label":`Increase ${n.name}`,disabled:o===i,onClick:()=>r.setAutoPurgeSetting(n.key,o),type:`button`,children:`+`})]})},n.key)})})},de=()=>(0,Q.jsxs)(Fw,{"aria-label":`automation firmware page`,children:[(0,Q.jsxs)(Iw,{"aria-label":`global automation category`,children:[(0,Q.jsx)(Lw,{children:`Global Automation`}),(0,Q.jsx)(zw,{children:OT.map(e=>{let t=e.owned(n),i=e.enabled(n),a=kd(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=Td(e.key),l=Dd(e.key,o),u=li(`global`,e.key),d=u&&!qr(n,u.id)?u:null;return(0,Q.jsx)(gT,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,Q.jsx)(pT,{current:s,milestone:zr(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?se(d):oe({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${B(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?CT(Ed(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${ST(Ed(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})}),n.autoPurge!=null&&ue()]}),(0,Q.jsxs)(Iw,{"aria-label":`tier autobuyers category`,children:[(0,Q.jsx)(Lw,{children:`Tier Autobuyers`}),le?(0,Q.jsx)(Gw,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,Q.jsxs)(Kw,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,Q.jsx)(qw,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,Q.jsx)(Bw,{tier:e})}),(0,Q.jsxs)(Jw,{children:[(0,Q.jsx)(a_,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,Q.jsx)(Yw,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,Q.jsx)(a_,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,Q.jsx)(Yw,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,Q.jsxs)(Uw,{children:[(0,Q.jsxs)(Ww,{"aria-hidden":`true`,children:[(0,Q.jsx)(`span`,{children:`Tier`}),(0,Q.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,Q.jsx)(`span`,{children:`🤖 Buy`})]}),b.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=Qt(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=yd(e.id),d=l>=md(e.id),f=a?vd(n,e.id):1,p=Sd(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=jd(),v=Nd(g,e.id),y=ce(`tierTickspeed`,e.id),b=ce(`tierAutobuyer`,e.id);return(0,Q.jsxs)(Hw,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,Q.jsx)(Bw,{tier:e}),(0,Q.jsx)(gT,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Q.jsx)(pT,{current:s,milestone:$t(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?se(y):oe({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${B(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?CT(Md(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${ST(Md(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,Q.jsx)(gT,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Q.jsx)(pT,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?se(b):oe({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${B(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${B(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:CT(gd(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${ST(gd(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),te&&(0,Q.jsxs)(Iw,{"aria-label":`power automation category`,children:[(0,Q.jsx)(Lw,{children:`Power Automation`}),(0,Q.jsxs)(zw,{children:[te&&(0,Q.jsx)(gT,{ariaLabel:`auto-charge row`,enabled:M,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!M),owned:!0,statusTitle:M?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,Q.jsx)(gT,{ariaLabel:`auto boost row`,enabled:ne,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!ne),owned:!0,statusTitle:ne?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,Q.jsxs)(Vw,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,Q.jsx)(Zw,{children:(0,Q.jsx)(tT,{children:`Boost preset`})}),(0,Q.jsx)(Ow,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,Q.jsxs)(Iw,{"aria-label":`compute autobuyers category`,children:[(0,Q.jsx)(Lw,{children:`Compute Autobuyers`}),(0,Q.jsx)(Gw,{"aria-label":`compute autobuyer tiles`,role:`group`,children:mt.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=er(e.id);return(0,Q.jsxs)(Kw,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,Q.jsx)(qw,{$dimmed:!t,children:(0,Q.jsx)(Bw,{tier:e})}),t?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(a_,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,Q.jsx)(Yw,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,Q.jsx)(Xw,{children:(0,Q.jsx)(pT,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),fe=()=>(0,Q.jsxs)(Fw,{"aria-label":`prestige firmware page`,children:[(0,Q.jsxs)(Iw,{"aria-label":`purge points category`,children:[(0,Q.jsx)(Lw,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,Q.jsx)(cT,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,Q.jsx)(DT,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${wT(S)}`:`Production ×1 → ×${wT(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,Q.jsx)(mT,{icon:`🚀`,name:`Speed bonus`}):(0,Q.jsx)(hT,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${B(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,Q.jsx)(DT,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at ${We*100}% speed past 10 min). Each level adds ${k}: ${Je.map(e=>B(e)).join(` / `)} PP, up to ${TT(Ge)}.`,icon:`😴`,name:`Sleep mode`,value:E===null?`Time away: up to ${D}`:`Time away: up to ${D} → ${O}`,children:E===null?(0,Q.jsx)(mT,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,Q.jsx)(hT,{ariaLabel:`Buy Sleep mode level ${T+1} for ${B(E)} Purge Points — +${k} of time away`,color:`#a78bfa`,cost:E,disabled:o<E,icon:`⏫`,label:`${B(E)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,Q.jsx)(DT,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:ET(g),children:(0,Q.jsx)(hT,{ariaLabel:`Buy Compression level ${g+1} for ${B(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${B(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,Q.jsx)(DT,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${ee.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${ee.symbol} level 1 done`:`Start runs with ${ee.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,Q.jsx)(mT,{icon:`🔥`,name:`Cache Warm`}):(0,Q.jsx)(hT,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!A,icon:`🔓`,label:`${B(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,Q.jsx)(DT,{ariaLabel:`playtime bonus upgrade`,details:`+${Qe*100}% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${wT(j)}`:`+${Qe*100}% production per hour played`,children:n.playtimeBonusUnlocked?(0,Q.jsx)(mT,{icon:`⏱`,name:`Playtime bonus`}):(0,Q.jsx)(hT,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${B(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(0,Q.jsx)(DT,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:Wr(n)?null:`Keep producing past 1 Googol Bytes`,children:Wr(n)?(0,Q.jsx)(mT,{icon:`♾`,name:`Overflow mode`}):(0,Q.jsx)(dT,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,Q.jsxs)(Iw,{"aria-label":`purchasing category`,children:[(0,Q.jsx)(Lw,{children:`Purchasing`}),(0,Q.jsx)(DT,{ariaLabel:`buy mode toggle`,details:`Level (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Single: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Single they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,Q.jsx)(Tw,{game:e})}),(0,Q.jsx)(DT,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. One-time purchase; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:Xi(n)?null:`Buy every affordable level in one tap`,children:Xi(n)?(0,Q.jsx)(xw,{game:e}):(0,Q.jsx)(hT,{ariaLabel:`Unlock Buy max for 2 Purge Points`,color:`#38bdf8`,cost:2,disabled:!w,icon:`🔓`,label:`${B(2)} PP`,onClick:r.buyBuyMaxUnlock,points:o,progressLabel:`Buy max unlock PP progress`})})]})]}),pe=({ariaLabel:e,cost:t,disabled:n,onClick:r,progressLabel:i})=>(0,Q.jsx)(hT,{ariaLabel:e,color:`#a78bfa`,cost:t,disabled:n,icon:`🏷️`,label:`${B(t)} ${t===1?`Kernel`:`Kernels`}`,onClick:r,points:P,progressLabel:i}),me=e=>`${B(e*100)}%/s`;return(0,Q.jsxs)(kw,{children:[(0,Q.jsxs)(Aw,{children:[(0,Q.jsx)(`h1`,{children:`Firmware`}),d===`kernels`&&re?(0,Q.jsxs)(jw,{"aria-label":`kernels display`,children:[`⏻ `,B(P),` `,P===1?`Kernel`:`Kernels`]}):(0,Q.jsxs)(jw,{"aria-label":`purge points display`,children:[`✦ `,B(o),` PP`]})]}),(0,Q.jsx)(Mw,{role:`tablist`,"aria-label":`firmware view`,children:ie.map(e=>(0,Q.jsxs)(Nw,{"aria-label":e.ariaLabel,"aria-selected":d===e.id,color:d===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Q.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),ae[e.id]&&(0,Q.jsx)(Pw,{"aria-label":ae[e.id]})]},e.id))}),d===`automation`&&de(),d===`prestige`&&fe(),d===`kernels`&&re&&(()=>{let e=n.hyperscalerCount??0,t=Gn(n,`hyperscalerEfficiency`),i=qn(n,`hyperscalerEfficiency`),a=pt,o=e=>a+e*bt,s=Kn(`hyperscalerEfficiency`,t),c=Gn(n,`eonAmplifier`),l=qn(n,`eonAmplifier`),u=Kn(`eonAmplifier`,c),d=!!n.eonsUpgrades?.autoHyperscalerUnlocked,f=n.eonsUpgrades?.autoHyperscalerEnabled??!0,p=Hn(e);return(0,Q.jsx)(Fw,{children:(0,Q.jsxs)(Iw,{"aria-label":`kernels category`,children:[(0,Q.jsx)(Lw,{children:`Kernels`}),(0,Q.jsx)(DT,{ariaLabel:`hyperscaler upgrade`,details:`Each hyperscaler adds ${me(o(t))} per second to every Factory tier's Flops boost until the next Purge, Scale Up or Overclock. Hyperscalers are permanent and survive Purge and Reboot; the boost they have built resets with it.`,icon:`☁`,name:`Hyperscaler`,value:`${e} owned · +${me(o(t))} each`,children:pe({ariaLabel:`Buy hyperscaler for ${B(p)} Kernels`,cost:p,disabled:!Un(n),onClick:r.buyHyperscaler,progressLabel:`Hyperscaler Kernel progress`})}),(0,Q.jsx)(DT,{ariaLabel:`hyperscaler efficiency upgrade`,details:`Each level adds ${me(bt)} per second to every hyperscaler. Level ${t} of ${St.hyperscalerEfficiency.maxLevel}.`,icon:`⚙`,name:`Hyperscaler efficiency`,value:i?`Level ${t} (max)`:`+${me(o(t))} → +${me(o(t+1))} each`,children:i?(0,Q.jsx)(mT,{icon:`⚙`,name:`Hyperscaler efficiency`}):pe({ariaLabel:`Buy hyperscaler efficiency for ${B(s)} Kernels`,cost:s,disabled:!Jn(n,`hyperscalerEfficiency`),onClick:()=>r.buyEonUpgrade(`hyperscalerEfficiency`),progressLabel:`Hyperscaler efficiency Kernel progress`})}),(0,Q.jsx)(DT,{ariaLabel:`kernel amplifier upgrade`,details:`Each level multiplies the Kernels a Reboot awards by 10. Level ${c} of ${St.eonAmplifier.maxLevel}.`,icon:`🔆`,name:`Kernel amplifier`,value:l?`${B(Vn(n))} Kernels per Reboot (max)`:`${B(Vn(n))} → ${B(Vn({...n,eonsUpgrades:{...n.eonsUpgrades,eonAmplifierLevel:c+1}}))} Kernels per Reboot`,children:l?(0,Q.jsx)(mT,{icon:`🔆`,name:`Kernel amplifier`}):pe({ariaLabel:`Buy kernel amplifier for ${B(u)} Kernels`,cost:u,disabled:!Jn(n,`eonAmplifier`),onClick:()=>r.buyEonUpgrade(`eonAmplifier`),progressLabel:`Kernel amplifier Kernel progress`})}),(0,Q.jsx)(DT,{ariaLabel:`auto hyperscaler upgrade`,details:`Buys a hyperscaler automatically whenever you can afford one. Pause it to save Kernels for other upgrades. One-time purchase, permanent.`,icon:`🤖`,name:`Auto Hyperscaler`,value:d?null:`Buys hyperscalers for you`,children:d?(0,Q.jsx)(aw,{$on:f,"aria-label":`Auto Hyperscaler`,"aria-pressed":f,onClick:()=>r.setAutoHyperscalerEnabled(!f),title:`${f?`Pause`:`Resume`} Auto Hyperscaler`}):pe({ariaLabel:`Unlock Auto Hyperscaler for 100 Kernels`,cost:100,disabled:!Xn(n),onClick:r.buyAutoHyperscaler,progressLabel:`Auto Hyperscaler Kernel progress`})})]})})})(),(0,Q.jsx)(sx,{def:p?N.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},AT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),jT=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),MT=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],NT=e=>e&&AT(e)&&Object.keys(e).some(e=>jT.has(e)),PT=e=>{if(!e||!AT(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if(MT.some(t=>{let n=e[t];return n&&AT(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:MT.some(t=>NT(e[t]))?`legacy_tier_ids`:null},FT=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],IT=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],LT=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],RT=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},zT=e=>{let t=RT(e,FT);return t.automationIntervalLevels&&=RT(t.automationIntervalLevels,IT),t.automationAttemptBudgets&&=RT(t.automationAttemptBudgets,IT),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>RT(e,LT))}),t},BT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),VT=e=>{let{saveSchemaVersion:t,...n}=e;return n},HT=e=>{if(!BT(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:VT(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:zT(VT(e))};let t=PT(e);return t?{ok:!1,reason:t}:{ok:!0,payload:zT(e)}},UT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),WT=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),GT=()=>dE(),KT=(e,t=GT())=>{if(!t)return HT(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:zT(r)}},qT=`tens_game_state`,JT=`tens_last_save_timestamp`,YT=`tens_saves_meta`,XT=`tens_dev_mode_active`,ZT=`dev`,QT=`tens_dev_state`,$T=`tens_dev_timestamp`,eE=`TENS-SUPPORT`,tE=e=>e===ZT?QT:e===`0`?qT:`tens_slot_${e}_state`,nE=e=>e===ZT?$T:e===`0`?JT:`tens_slot_${e}_timestamp`,rE=e=>`Save ${e+1}`,iE=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:rE(0)}]}),aE=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),oE=()=>{try{let e=localStorage.getItem(YT);return e?WT(e):null}catch{return null}},sE=e=>{try{localStorage.setItem(YT,JSON.stringify(e))}catch{}},cE=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:rE(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},lE=e=>{let t=iE();if(!UT(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!UT(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():rE(n)})}return cE({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},uE=()=>{let e=lE(oE());return sE(e),e},dE=()=>{try{return localStorage.getItem(XT)===`1`}catch{return!1}},fE=e=>{try{e?localStorage.setItem(XT,`1`):localStorage.removeItem(XT)}catch{}},pE=()=>dE()?ZT:uE().activeSlotId,mE=(e=`code`)=>{let t=uE();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=cE({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return sE(n),{ok:!0,meta:n}},hE=e=>{try{return localStorage.getItem(tE(e))!=null}catch{return!1}},gE=()=>{let e=uE(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??rE(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!hE(i)})}return t},_E=e=>{if(dE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=uE(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return sE(i),{ok:!0,meta:i}},vE=(e,t)=>{let n=String(e),r=uE(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return sE(s),{ok:!0,meta:s}},yE=e=>aE(e)===`TENS-SUPPORT`?mE(`code`):{ok:!1,reason:`invalid`},bE=()=>mE(`dummy_purchase`),xE=()=>{let e=uE();return e.slots.find(t=>t.id===e.activeSlotId)?.name??rE(0)},SE=()=>{let e=uE(),t=xE(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},CE=()=>`Reformat Byte Foundry on "${xE()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,wE=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,TE=()=>`Erase ALL save progress on this device?\n\n${uE().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,EE=e=>{try{localStorage.removeItem(tE(e)),localStorage.removeItem(nE(e))}catch{}},DE=e=>{if(dE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=uE(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(EE(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},OE=()=>{if(dE())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)EE(String(e));return{ok:!0,meta:uE()}},kE=e=>{try{let t=pE(),n=(e??localStorage).getItem(tE(t));return n?WT(n):null}catch{return null}},AE=()=>{let e=pE(),t=kE();if(!t)return null;let n=KT(t);return n.ok?null:(EE(e),GT()?null:n.reason)},jE=(e,t)=>({...e,...t??{}}),ME=e=>UT(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),NE=e=>ME(e)&&Array.isArray(e.transfers)?e.transfers.length:0,PE=e=>{let t=e.deposits??{},n=Le.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+NE(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},FE=(e,t)=>{let n=kt(),r={};for(let e of Object.keys(n)){let i=t?.[e];if(ME(i)){n[e]={...n[e],...PE(i)};let t=NE(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},IE=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=Ie[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},LE=(e,t)=>{let n={...e,...t??{}};return xt.forEach(e=>{let t=Number(n[e.levelField]),r=Number.isFinite(t)?Math.max(0,Math.floor(t)):0;n[e.levelField]=e.maxLevel==null?r:Math.min(r,e.maxLevel)}),n},RE=e=>{let t=e,n=At(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=FE(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return di(en(ro(tr({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,manualPurchaseThisCycle:typeof t.manualPurchaseThisCycle==`boolean`?t.manualPurchaseThisCycle:Object.values(t.purchased??{}).some(e=>e>0)||t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??c??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:jE(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:jE(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:jE(n.owned,t.owned),purchased:jE(n.purchased,t.purchased),purchaseLevels:jE(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:jE(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:jE(n.autobuyers,t.autobuyers),autobuyersEnabled:jE(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:jE(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:jE(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:jE(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:jE(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:jE(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:jE(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:jE(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:jE(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:jE(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{},...t.eons?.balance>(t.achievements?.counters?.kernelsEarned??0)?{kernelsEarned:t.eons.balance}:{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:LE(n.eonsUpgrades,t.eonsUpgrades),autoPurgeSettings:{...n.autoPurgeSettings,...t.autoPurgeSettings??{}},computeFlopsAutobuyers:jE(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:jE(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:jE(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:IE({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},zE=e=>{let t=pE();try{localStorage.setItem(tE(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem(nE(t),String(Date.now()))}catch{}},BE=e=>{try{let t=kE(e);if(!t)return null;let n=KT(t);return n.ok?RE(n.payload):null}catch{return null}},VE=()=>{let e=pE();try{let t=localStorage.getItem(nE(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},HE=()=>{dE()?UE():DE(pE())},UE=()=>(EE(ZT),{ok:!0}),WE=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=UT(i)&&UT(a)?WE(a,i):i,n},{...e}),GE=(e,t)=>{if(!dE())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=WT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!UT(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...UT(t)?WE(t,n):n};try{localStorage.setItem(QT,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=BE();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},KE=e=>JSON.stringify({saveSchemaVersion:3,...e}),qE=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(At(),e))||e.resources!==void 0&&!UT(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},JE=e=>{let t;try{t=WT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!UT(t))return{ok:!1,reason:`invalid_json`};let n=KT(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!GT()&&!qE(n.payload))return{ok:!1,reason:`invalid_state`};let r=RE(n.payload);return zE(r),{ok:!0,state:r}},YE=`tens_buy_max_mode`,XE=()=>{try{return localStorage.getItem(YE)===`true`}catch{return!1}},ZE=e=>{try{localStorage.setItem(YE,e?`true`:`false`)}catch{}},QE=`tens_buy_unit_mode`,$E=()=>{try{return localStorage.getItem(QE)===`true`}catch{return!1}},eD=e=>{try{localStorage.setItem(QE,e?`true`:`false`)}catch{}},tD=`tens_theme_preference`,nD=()=>{try{let e=localStorage.getItem(tD);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},rD=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(tD,e)}catch{}},iD;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(iD||={});var aD=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},oD=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,sD=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?oD(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new aD(`"${e}" plugin is not implemented on ${c}`,iD.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new aD(`"${e}.${t}()" is not implemented on ${c}`,iD.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=aD,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},cD=(e=>e.Capacitor=sD(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),lD=cD.registerPlugin,uD=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new cD.Exception(e,iD.Unimplemented)}unavailable(e=`not available`){return new cD.Exception(e,iD.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},dD=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),fD=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),pD=class extends uD{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=fD(n).trim(),r=fD(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=dD(e.key),n=dD(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};lD(`CapacitorCookies`,{web:()=>new pD});var mD=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),hD=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},gD=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,_D=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=hD(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},vD=class extends uD{async request(e){let t=_D(e,e.webFetchExtra),n=gD(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await mD(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};lD(`CapacitorHttp`,{web:()=>new vD});var yD;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(yD||={});var bD;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(bD||={});var xD=class extends uD{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};lD(`SystemBars`,{web:()=>new xD});var SD=`https://mohanpednekar.github.io/tens/`,CD=`${SD}privacy.html`,wD=`${SD}terms.html`,TD=Z(Vh)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,ED=Z.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,DD=Z.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,OD=Z.input`
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
`,kD=Z.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,AD=Z.textarea`
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
`,jD={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},MD=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:jD[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,Q.jsxs)(TD,{"aria-label":`manual save section`,children:[(0,Q.jsx)(`h2`,{children:`Backup / Restore`}),(0,Q.jsx)(AD,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,Q.jsxs)(ED,{children:[(0,Q.jsx)($,{onClick:o,type:`button`,children:(0,Q.jsx)(i_,{children:`Copy save`})}),(0,Q.jsx)($,{onClick:s,type:`button`,children:(0,Q.jsx)(i_,{children:`Download file`})}),(0,Q.jsx)($,{onClick:()=>a.current?.click(),type:`button`,children:(0,Q.jsx)(i_,{children:`Choose file…`})}),(0,Q.jsx)($,{onClick:()=>c(t),type:`button`,children:(0,Q.jsx)(i_,{children:`Import`})}),(0,Q.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,Q.jsx)(kD,{$error:r.error,children:r.text})]})},ND=Z.div`
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
`,PD=()=>(0,Q.jsxs)(TD,{"aria-label":`legal section`,children:[(0,Q.jsx)(`h2`,{children:`Legal`}),(0,Q.jsxs)(ND,{children:[(0,Q.jsx)(`a`,{href:CD,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,Q.jsx)(`a`,{href:wD,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),FD={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},ID=({service:e=fy()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,Q.jsxs)(TD,{"aria-label":`store section`,children:[(0,Q.jsx)(`h2`,{children:`Store`}),(0,Q.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,Q.jsxs)(ED,{children:[(0,Q.jsx)($,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),FD.removeAds),type:`button`,variant:`primary`,children:(0,Q.jsx)(i_,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,Q.jsx)($,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),FD.supportTip),type:`button`,variant:`neutral`,children:(0,Q.jsx)(i_,{children:`Leave a tip`})}),(0,Q.jsx)($,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,Q.jsx)(i_,{children:`Restore purchases`})})]}),a&&(0,Q.jsx)(kD,{$error:a.error,children:a.text})]})},LD=Z.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,RD=Z.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,zD=Z(ED)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,BD=Z.div`
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
`,VD=Z.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,HD=Z.li`
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
`,UD=Z.svg`
  display: block;
  height: 64px;
  width: 100%;
`,WD=Z.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,GD=Z.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,KD=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},qD=Z.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,JD=Z.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,YD=({label:e,danger:t=!1,children:n})=>(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(qD,{$danger:t,children:e}),(0,Q.jsx)(JD,{children:n})]}),XD=Z.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,ZD=_h`
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
`,QD=Z.button`
  ${ZD}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,$D=Z.div`
  ${ZD}
`,eO=Z.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,tO=Z.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,nO=Z.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,rO=Z.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,iO=Z.div`
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
`,aO=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,Q.jsx)(XD,{children:(0,Q.jsxs)($D,{$danger:r,children:[(0,Q.jsx)(eO,{"aria-hidden":`true`,children:e}),(0,Q.jsx)(tO,{children:t}),i]})}):(0,Q.jsxs)(XD,{children:[(0,Q.jsxs)(QD,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Q.jsx)(eO,{"aria-hidden":`true`,children:e}),(0,Q.jsx)(tO,{children:t}),n!=null&&n!==``&&(0,Q.jsx)(nO,{children:n}),(0,Q.jsx)(rO,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,Q.jsx)(iO,{children:a})]})},oO=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=vi(e.state),o=!!e.savesMeta?.supporterUnlocked,[s,c]=(0,v.useState)(``),[l,u]=(0,v.useState)(null),[d,f]=(0,v.useState)(!1),p=e.state.era?.count??0,m=e.state.eons?.balance??0,h=Bn(e.state),g=Vn(e.state),_=e.state.purge?.points??0,y=e=>e===1?`Kernel`:`Kernels`,b=e.state.prestigeMuseum??{history:[],pinnedIds:[]},x=new Set(b.pinnedIds??[]),S=b.history??[],C=S.filter(e=>x.has(e.id)),w=o?S:S.slice(0,1),T=t=>{t.preventDefault();let n=e.redeemUnlockCode(s);n.ok?(c(``),u({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):u({error:!0,text:`That code is not valid.`})},E=()=>{let t=e.purchaseSupporterDummy();u({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},D=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},O=t=>{a&&t.isActive||window.confirm(wE(t))&&e.clearSlot(t.id)},k=()=>{a||window.confirm(TE())&&e.eraseAllSaveProgress()},A=()=>{Bn(e.state)&&(e.actions.eraAscend(),f(!1))},ee=!!fy().iapAvailable,j=KD(e.opsSamples??[],`money`),te=KD(e.opsSamples??[],`prestigePoints`);return(0,Q.jsxs)(LD,{children:[(0,Q.jsx)(RD,{children:(0,Q.jsx)(`h1`,{children:`Settings`})}),(0,Q.jsxs)(YD,{label:`Game`,children:[(0,Q.jsx)(aO,{icon:`💛`,label:`Supporter`,value:o?`Unlocked`:`Free`,children:(0,Q.jsxs)(TD,{"aria-label":`supporter pack section`,children:[(0,Q.jsx)(`h2`,{children:`Supporter pack`}),(0,Q.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),o?(0,Q.jsxs)(kD,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(WD,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,Q.jsx)(`code`,{children:eE})]}),(0,Q.jsxs)(DD,{onSubmit:T,children:[(0,Q.jsx)(OD,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>c(e.target.value),placeholder:`Enter unlock code`,value:s}),(0,Q.jsx)($,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,Q.jsx)(i_,{children:`Redeem code`})})]}),(0,Q.jsx)($,{"aria-label":`dummy supporter checkout`,onClick:E,type:`button`,variant:`neutral`,children:(0,Q.jsx)(i_,{children:`Dummy checkout (free)`})})]}),l&&(0,Q.jsx)(kD,{$error:l.error,children:l.text})]})}),(0,Q.jsx)(aO,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,Q.jsxs)(TD,{"aria-label":`save slots section`,children:[(0,Q.jsx)(`h2`,{children:`Save slots`}),(0,Q.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),!1,(e.saveSlots??[]).map(t=>(0,Q.jsxs)(zD,{$active:t.isActive,children:[(0,Q.jsxs)(BD,{children:[(0,Q.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,Q.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,Q.jsxs)(ED,{children:[!t.isActive&&(0,Q.jsx)($,{"aria-label":`switch to ${t.name}`,disabled:!1,onClick:()=>e.switchSaveSlot(t.id),title:void 0,type:`button`,variant:`primary`,children:(0,Q.jsx)(i_,{children:`Play`})}),(0,Q.jsx)($,{"aria-label":`rename ${t.name}`,onClick:()=>D(t),type:`button`,variant:`neutral`,children:(0,Q.jsx)(i_,{children:`Rename`})}),(0,Q.jsx)($,{"aria-label":`clear ${t.name}`,disabled:a&&t.isActive,onClick:()=>O(t),title:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Q.jsx)(i_,{children:`Clear…`})})]})]},t.id))]})}),(0,Q.jsx)(aO,{icon:`⏻`,label:`Reboot`,value:`${m} ${y(m)}`,children:(0,Q.jsxs)(TD,{"aria-label":`reboot section`,children:[(0,Q.jsx)(`h2`,{children:`Reboot`}),(0,Q.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,Q.jsxs)(ED,{children:[(0,Q.jsx)(`span`,{children:`Reboots`}),(0,Q.jsx)(`strong`,{children:p})]}),(0,Q.jsxs)(ED,{children:[(0,Q.jsx)(`span`,{children:`Kernels`}),(0,Q.jsxs)(`strong`,{children:[m,` `,y(m)]})]}),(0,Q.jsx)(`p`,{children:h?`Ready — next Reboot awards ${g} ${y(g)}.`:`Requires 1 Googol PP unspent (you have ${B(_)} PP).`}),(0,Q.jsx)($,{"aria-label":h?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!h,onClick:()=>f(!0),type:`button`,variant:`prestige`,children:(0,Q.jsx)(i_,{children:`⏻ Reboot…`})})]})}),(0,Q.jsx)(aO,{icon:`📜`,label:`System log`,value:o?`${S.length}`:`🔒`,children:(0,Q.jsxs)(TD,{"aria-label":`system log section`,children:[(0,Q.jsx)(`h2`,{children:`System log`}),o?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),C.length>0&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(WD,{children:`Pinned`}),(0,Q.jsx)(VD,{"aria-label":`pinned purge entries`,children:C.map(t=>(0,Q.jsxs)(HD,{children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Q.jsx)(`div`,{children:(0,Q.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,Ht(t.moneyBits)]})})]}),(0,Q.jsx)($,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Q.jsx)(i_,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,Q.jsx)(WD,{children:`Recent history`}),w.length===0?(0,Q.jsx)(WD,{children:`No purges recorded yet.`}):(0,Q.jsx)(VD,{"aria-label":`system log history`,children:w.map(t=>(0,Q.jsxs)(HD,{children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Q.jsx)(`div`,{children:(0,Q.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,zt(t.moneyBits)]})})]}),x.has(t.id)?(0,Q.jsx)($,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Q.jsx)(i_,{children:`Unpin`})}):(0,Q.jsx)($,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:x.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Q.jsx)(i_,{children:`Pin`})})]},t.id))})]}):(0,Q.jsxs)(WD,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,S.length>0&&` Latest: Purge #${S[0].purgeNumber} (+${S[0].pointsAwarded} PP).`]})]})}),(0,Q.jsx)(aO,{icon:`📈`,label:`Task Manager`,value:o?null:`🔒`,children:(0,Q.jsxs)(TD,{"aria-label":`task manager section`,children:[(0,Q.jsx)(`h2`,{children:`Task Manager`}),o?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,Ht(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,Q.jsx)(WD,{children:`Bits`}),(0,Q.jsx)(UD,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Q.jsx)(`path`,{d:j||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,Q.jsx)(WD,{children:`Purge Points`}),(0,Q.jsx)(UD,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Q.jsx)(`path`,{d:te||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,Q.jsx)(WD,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,Q.jsxs)(YD,{label:`Data`,children:[!1,(0,Q.jsx)(aO,{icon:`🗄`,label:`Backup / Restore`,children:(0,Q.jsx)(MD,{game:e})}),ee&&(0,Q.jsx)(aO,{icon:`🛒`,label:`Store`,children:(0,Q.jsx)(ID,{})}),(0,Q.jsx)(aO,{icon:`ℹ`,label:`About`,children:(0,Q.jsxs)(TD,{"aria-label":`about section`,children:[(0,Q.jsx)(`h2`,{children:`About`}),(0,Q.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,Q.jsx)(aO,{icon:`⚖`,label:`Legal`,children:(0,Q.jsx)(PD,{})})]}),(0,Q.jsx)(YD,{label:`Display`,children:(0,Q.jsx)(aO,{icon:`🎨`,inline:(0,Q.jsx)(GD,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,Q.jsx)($,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,Q.jsx)(i_,{children:t})},e))}),label:`Theme`})}),(0,Q.jsx)(YD,{danger:!0,label:`Danger zone`,children:(0,Q.jsx)(aO,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,Q.jsxs)(TD,{"aria-label":`danger zone`,children:[(0,Q.jsx)(`h2`,{children:`Danger zone`}),(0,Q.jsxs)(`p`,{children:[`Erase the `,(0,Q.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,Q.jsxs)($,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,Q.jsx)(i_,{children:`↺ Reset active save…`}),(0,Q.jsx)(a_,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,Q.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,Q.jsxs)($,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,Q.jsx)(i_,{children:`↺ Reformat Byte Foundry…`}),(0,Q.jsx)(a_,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,Q.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,Q.jsx)($,{"aria-label":`Erase all save progress`,disabled:a||!1,onClick:k,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Q.jsx)(i_,{children:`Erase all save progress…`})})]})})}),(0,Q.jsxs)(wv,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>f(!1),onConfirm:A,open:d,title:`Reboot?`,children:[(0,Q.jsxs)(`p`,{children:[`Awards `,g,` `,y(g),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,Q.jsxs)(`p`,{children:[(0,Q.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,Q.jsxs)(`p`,{children:[(0,Q.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},sO=2**53-1,cO=e=>e?Li:sO,lO=2,uO=(e,t,n=sO)=>{let r=e>0?Vi(e,Sn(t)):0;return r<=0?null:{state:Hi(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:Sn(t)}:null}},dO=()=>{uE();let e=AE(),t=BE();if(!t)return{state:At(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=VE(),r=uO(n?(Date.now()-n)/1e3:0,t,cO($E()))??{state:t,offlineProgress:null};return{...r,state:Dn(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},fO=()=>{let[e]=(0,v.useState)(dO),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>uE()),[l,u]=(0,v.useState)(()=>gE()),[d,f]=(0,v.useState)(()=>dE()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(uE()),u(gE())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>lO){let r=Sn(y.current),a=Vi(t,r);if(a>0){n(e=>Hi(t,cO(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=Bi(r,cO(D.current))(e);return document.visibilityState===`visible`?Tn(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>gv(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{zE(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,Ye);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)(XE),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,ZE(!!e),S(!!e)},[]),[T,E]=(0,v.useState)($E),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,eD(!!e),E(!!e)},[]),k=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&Xi(n)?t:e)(n));return{buyTierQuantity:t=>D.current?n(e=>gf(Yi(t,1))(e)):e(gf(Yi(t,sO)),gf(na(t))),buyTickspeedMultiplier:t=>e(fd(t),Qi(fd(t))),buyAutobuyerIntervalUpgrade:e=>n(Cd(e)),buyAutomationIntervalUpgrade:e=>n(Ad(e)),buyTierTickspeedIntervalUpgrade:e=>n(Pd(e)),setAutoOverclockEnabled:e=>n(Id(e)),startComputeCharge:e=>n($c(e)),setComputeAutoChargeEnabled:e=>n(Fd(e)),buyGlobalTickspeedMultiplier:()=>e(zd,Qi(zd)),buyPlaytimeBonus:()=>n(hn),buyBuyMaxUnlock:()=>n(gn),buyCacheWarm:()=>n(_n),buySleepModeCapUpgrade:()=>e(wn,Qi(wn)),buyPrestigeSpeedBonus:()=>n(pn),buyPrestigeDoublePp:()=>e(Dr,Qi(Dr)),buyComputeFlopsTier:t=>e(Nn(t),Qi(Nn(t))),buyHyperscaler:()=>n(Wn),setAutoPurgeSetting:(e,t)=>n(Hr(e,t)),buyEonUpgrade:e=>n(Yn(e)),buyAutoHyperscaler:()=>n(Zn),setAutoHyperscalerEnabled:e=>n(Qn(e)),eraAscend:()=>n(pf),enterChallenge:e=>n(qd(e)),exitChallenge:()=>n(Jd),purge:()=>n(ff),dailyStart:e=>n(fv(e,Date.now())),dailyForfeit:e=>n(pv(e)),dailyRestart:e=>n(hv(e,Date.now())),dailyPlay:(e,t,r)=>n(_v(e,t,r,Date.now())),scaleUp:()=>n(ef),overclock:()=>n(tf),setComputeAutoBoostEnabled:e=>n(id(e)),setComputeAutoBoostType:e=>n(ad(e)),consumeXpForLastTierTickspeed:e=>n(uf(e)),setAutoScaleUpEnabled:e=>n(sf(e)),setAutoXpTickspeedEnabled:e=>n(of(e)),setAutoGlobalTickspeedEnabled:e=>n(cf(e)),setAutoPurgeEnabled:e=>n(Rd(e)),setAutobuyerEnabled:(e,t)=>n(sd(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(Ld(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(nr(e,t)),tapIntroBit:()=>n(Ea),tapPoolBuffer:e=>n(eo(e)),combineIntroByte:()=>n(Da),pickIntroCapacityMilestone:()=>n(bo),queueIntroSpeedUpgrade:()=>n(_o),unlockNextDiskSize:()=>n(is),clearIntroCapacityUpgradeQueue:()=>n(Co),convertIntroBitsToKilobytes:()=>n(Jo),provisionDisk:()=>n(vs),queueDiskBuild:()=>n(ys),clearDiskBuildQueue:()=>n(bs),expediteDiskFill:e=>n(Vs(e)),doubleDataLakeCapacity:e=>n(jl(e)),activateComputeBoost:(e,t)=>n(hf(e,t)),stackComputeBoost:e=>n(nd(e)),reclaimComputeBoost:e=>n(ed(e)),forfeitComputeBoost:e=>n(J(e)),mergeComputeCoresIntoNode:()=>n(Fl),mergeComputeNodesIntoCluster:()=>n(Il),mergeComputeClustersIntoNetwork:()=>n(Ll),mergeComputeNetworksIntoGrid:()=>n(Rl),mergeComputeGridsIntoFabric:()=>n(zl),mergeComputeFabricsIntoCloud:()=>n(Bl),mergeComputeCloudsIntoDatacenter:()=>n(Vl),mergeComputeDatacentersIntoSupercomputer:()=>n(Hl),mergeComputeSupercomputersIntoMegacomputer:()=>n(Ul),enableAutoMergeCoresIntoNode:()=>n(eu),enableAutoMergeNodesIntoCluster:()=>n(iu),enableAutoMergeClustersIntoNetwork:()=>n(cu),enableAutoMergeNetworksIntoGrid:()=>n(fu),enableAutoMergeGridsIntoFabric:()=>n(gu),enableAutoMergeFabricsIntoCloud:()=>n(bu),enableAutoMergeCloudsIntoDatacenter:()=>n(wu),enableAutoMergeDatacentersIntoSupercomputer:()=>n(Ou),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(Mu),startComputeCoresMerge:()=>n(nu),startComputeNodesMerge:()=>n(ou),startComputeClustersMerge:()=>n(uu),startComputeNetworksMerge:()=>n(mu),startComputeGridsMerge:()=>n(vu),startComputeFabricsMerge:()=>n(Su),startComputeCloudsMerge:()=>n(Eu),startComputeDatacentersMerge:()=>n(Au),startComputeSupercomputersMerge:()=>n(Pu),startDataLakeAutoConvert:e=>n(ml(e)),flushStoragePool:e=>n(pl(e)),pinMuseumEntry:e=>n(Xd(e)),unpinMuseumEntry:e=>n(Zd(e))}},[]),A=(0,v.useCallback)(()=>{HE(),_(null),n(At()),i(null),o(null),m([]),b()},[b]),ee=(0,v.useCallback)(()=>{n(mf)},[]),j=(0,v.useCallback)(e=>{let t=DE(e);return t.ok&&(t.clearedActive&&(_(null),n(At()),i(null),o(null),m([])),b()),t},[b]),te=(0,v.useCallback)(()=>{let e=OE();return e.ok&&(_(null),n(At()),i(null),o(null),m([]),b()),e},[b]),M=(0,v.useCallback)(()=>i(null),[]),N=(0,v.useRef)(new WeakSet),ne=(0,v.useCallback)(e=>!e||e.rewardClaimed||N.current.has(e)?!1:(N.current.add(e),n(t=>Wi(e.elapsedRealSeconds,cO(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+Ui(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),P=(0,v.useCallback)(()=>o(null),[]),re=(0,v.useCallback)(e=>{zE(y.current);let t=_E(e);if(!t.ok)return t;if(t.already)return b(),t;let r=AE(),a=BE()??At(),s=VE(),c=uO(s?(Date.now()-s)/1e3:0,a,cO(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),ie=(0,v.useCallback)(()=>{zE(y.current);let e=!dE();fE(e),f(e);let t=AE(),r=BE();_(r),n(r??At()),i(null),o(t),m([]),b()},[b]),F=(0,v.useCallback)(()=>{dE()&&(UE(),_(null),n(At()),i(null),o(null),m([]))},[]),ae=(0,v.useCallback)(e=>{let t=GE(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),oe=(0,v.useCallback)(e=>{dE()&&n(t=>ro(e(t)))},[]),se=(0,v.useCallback)(()=>KE(y.current),[]),ce=(0,v.useCallback)(e=>{let t=JE(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),le=(0,v.useCallback)((e,t)=>{let n=vE(e,t);return n.ok&&b(),n},[b]),ue=(0,v.useCallback)(e=>{let t=yE(e);return t.ok&&b(),t},[b]);return{actions:k,applyCloudSave:ce,applyDevStateJson:ae,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:ne,clearSlot:j,devModeActive:d,dismissIncompatibleSaveNotice:P,dismissOfflineProgress:M,eraseAllSaveProgress:te,exportSaveJson:se,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=bE();return e.ok&&b(),e},[b]),redeemUnlockCode:ue,renameSaveSlot:le,resetByteFoundry:ee,resetDevState:F,resetGame:A,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:oe,state:t,switchSaveSlot:re,toggleDevMode:ie}},pO=xh`
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
`,mO={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},hO={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},gO={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},_O={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},vO={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},yO={minHeight:500,medium:600,expanded:900,wide:1360,splitMinWidth:784,splitMinAspect:.8},bO={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},xO={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},SO={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},CO=[`dark`,`light`],wO=`dark`,TO=e=>{let t=CO.includes(e)?e:wO;return{mode:t,color:mO[t],shadow:hO[t],tierAccents:gO[t],space:_O,radius:vO,motion:bO,breakpoints:yO,font:xO,type:SO}},EO={dark:TO(`dark`),light:TO(`light`)},DO=({width:e,height:t})=>!(t>=yO.minHeight)||!(e>=yO.medium)?`compact`:e<yO.expanded?`medium`:e<yO.wide?`expanded`:`wide`;yO.medium,yO.expanded,yO.wide;var OO={layoutClass:`compact`,width:0,height:0},kO=()=>{if(typeof window>`u`)return null;let e=window.visualViewport,t=Math.round(window.innerWidth||e?.width||0),n=Math.round(window.innerHeight||e?.height||0);return t>0&&n>0?{width:t,height:n}:null},AO=()=>{let e=kO();return e?{...e,layoutClass:DO(e)}:OO},jO=()=>{let[e,t]=(0,v.useState)(AO);return(0,v.useEffect)(()=>{if(typeof window>`u`)return;let e=null,n=window.requestAnimationFrame??(e=>setTimeout(e,16)),r=window.cancelAnimationFrame??clearTimeout,i=()=>{e=null;let n=AO();t(e=>e.width===n.width&&e.height===n.height&&e.layoutClass===n.layoutClass?e:n)},a=()=>{e===null&&(e=n(i))};window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,a);let o=window.visualViewport;return o?.addEventListener(`resize`,a),a(),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,a),o?.removeEventListener(`resize`,a),e!==null&&r(e)}},[]),e},MO=(0,v.createContext)(OO),NO=({children:e})=>(0,Q.jsx)(MO.Provider,{value:jO(),children:e}),PO=()=>typeof window>`u`||typeof window.matchMedia!=`function`?wO:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,FO=e=>e===`light`||e===`dark`?e:PO(),IO=({mode:e=wO,children:t})=>(0,Q.jsx)(uh,{theme:EO[e]??EO.dark,children:t}),LO=()=>FO(nD()),RO=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`settings`,`dev`]),zO=Z.div`
  padding-bottom: ${Kg};
`;function BO(){let e=fO(),[t,n]=(0,v.useState)(nD),[r,i]=(0,v.useState)(LO),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!RO.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=Ml(e.state),b=En(e.state),x=h,S=h&&Zi(e.state),C=S,w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{vi(e.state)||window.confirm(SE())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{vi(e.state)||window.confirm(CE())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(FO(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{rD(e),n(e),i(FO(e))},O;O=g?(0,Q.jsx)(hC,{focusNonce:p,game:e}):a===`info`?(0,Q.jsx)(fw,{}):a===`boosters`?(0,Q.jsx)(iw,{game:e}):a===`compute`?(0,Q.jsx)(AC,{game:e}):a===`perks`&&S?(0,Q.jsx)(kT,{focusNonce:l,game:e}):a===`challenges`&&C?(0,Q.jsx)(mx,{focusNonce:d,game:e}):a===`milestones`?(0,Q.jsx)(bw,{game:e}):a===`achievements`&&le.enabled?(0,Q.jsx)(rg,{game:e}):a===`dev`?(0,Q.jsx)(xb,{game:e}):a===`settings`?(0,Q.jsx)(oO,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,Q.jsx)(xb,{game:e});let k=Lg(e.state);return(0,Q.jsxs)(IO,{mode:r,children:[(0,Q.jsx)(pO,{}),(0,Q.jsxs)(NO,{children:[(0,Q.jsx)(zO,{children:O}),(0,Q.jsx)(Gg,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,Q.jsx)(Bh,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,Q.jsx)(Ph,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,Q.jsx)(u_,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})]})}var VO=`modulepreload`,HO=function(e){return`/tens/`+e},UO={},WO=function(e){return e.pathname.endsWith(`.css`)},GO=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},KO=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=HO(t,n);let r=s(t),i=WO(r);return GO(UO,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:VO,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},qO=e=>{e&&e instanceof Function&&KO(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},JO=document.getElementById(`root`);if(!JO)throw Error(`Root element not found`);(0,y.createRoot)(JO).render((0,Q.jsx)(v.StrictMode,{children:(0,Q.jsx)(BO,{})})),qO();