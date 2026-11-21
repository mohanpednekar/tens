var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=void 0)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var j=/\/+/g;function M(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function ee(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function N(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,N(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+M(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(j,`$&/`)+`/`),N(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(j,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+M(a,u),c+=N(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+M(a,u++),c+=N(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return N(ee(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function P(e,t,n){if(e==null)return e;var r=[],i=0;return N(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function te(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ne=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function re(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,ne)}catch(e){ne(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function F(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else re(F.bind(null,e))}var ie={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ie,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=F,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:te}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=re,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&j(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&j(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function j(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,j(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),j=Symbol.for(`react.fragment`),M=Symbol.for(`react.strict_mode`),ee=Symbol.for(`react.profiler`),N=Symbol.for(`react.consumer`),P=Symbol.for(`react.context`),te=Symbol.for(`react.forward_ref`),ne=Symbol.for(`react.suspense`),re=Symbol.for(`react.suspense_list`),F=Symbol.for(`react.memo`),ie=Symbol.for(`react.lazy`),ae=Symbol.for(`react.activity`),oe=Symbol.for(`react.legacy_hidden`),se=Symbol.for(`react.memo_cache_sentinel`),ce=Symbol.for(`react.view_transition`),le=Symbol.for(`react.recoverable`),ue=Symbol.iterator;function de(e){return typeof e!=`object`||!e?null:(e=ue&&e[ue]||e[`@@iterator`],typeof e==`function`?e:null)}var fe=Symbol.for(`react.client.reference`);function pe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===fe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case j:return`Fragment`;case ee:return`Profiler`;case M:return`StrictMode`;case ne:return`Suspense`;case re:return`SuspenseList`;case ae:return`Activity`;case ce:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case P:return e.displayName||`Context`;case N:return(e._context.displayName||`Context`)+`.Consumer`;case te:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case F:return t=e.displayName||null,t===null?pe(e.type)||`Memo`:t;case ie:t=e._payload,e=e._init;try{return pe(e(t))}catch{}}return null}var me=Array.isArray,I=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,he={pending:!1,data:null,method:null,action:null},ge=[],_e=-1;function ve(e){return{current:e}}function ye(e){0>_e||(e.current=ge[_e],ge[_e]=null,_e--)}function be(e,t){_e++,ge[_e]=e.current,e.current=t}var xe=ve(null),Se=ve(null),Ce=ve(null),we=ve(null);function Te(e,t){switch(be(Ce,t),be(Se,e),be(xe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?dp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=dp(t),e=fp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ye(xe),be(xe,e)}function Ee(){ye(xe),ye(Se),ye(Ce)}function De(e){var t=e.memoizedState;t!==null&&(ch._currentValue=t.memoizedState,be(we,e)),t=xe.current;var n=fp(t,e.type);t!==n&&(be(Se,e),be(xe,n))}function Oe(e){Se.current===e&&(ye(xe),ye(Se)),we.current===e&&(ye(we),ch._currentValue=he)}var ke,R;function Ae(e){if(ke===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ke=t&&t[1]||``,R=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ke+e+R}var je=!1;function Me(e,t){if(!e||je)return``;je=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{je=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ae(n):``}function Ne(e,t){switch(e.tag){case 26:case 27:case 5:return Ae(e.type);case 16:return Ae(`Lazy`);case 13:return e.child!==t&&t!==null?Ae(`Suspense Fallback`):Ae(`Suspense`);case 19:return Ae(`SuspenseList`);case 0:case 15:return Me(e.type,!1);case 11:return Me(e.type.render,!1);case 1:return Me(e.type,!0);case 31:return Ae(`Activity`);case 30:return Ae(`ViewTransition`);default:return``}}function Pe(e){try{var t=``,n=null;do t+=Ne(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Fe=Object.prototype.hasOwnProperty,Ie=t.unstable_scheduleCallback,Le=t.unstable_cancelCallback,Re=t.unstable_shouldYield,ze=t.unstable_requestPaint,Be=t.unstable_now,Ve=t.unstable_getCurrentPriorityLevel,He=t.unstable_ImmediatePriority,Ue=t.unstable_UserBlockingPriority,We=t.unstable_NormalPriority,Ge=t.unstable_LowPriority,Ke=t.unstable_IdlePriority,qe=t.log,Je=t.unstable_setDisableYieldValue,Ye=null,Xe=null;function Ze(e){if(typeof qe==`function`&&Je(e),Xe&&typeof Xe.setStrictMode==`function`)try{Xe.setStrictMode(Ye,e)}catch{}}var Qe=Math.clz32?Math.clz32:tt,$e=Math.log,et=Math.LN2;function tt(e){return e>>>=0,e===0?32:31-($e(e)/et|0)|0}var nt=256,rt=262144,it=4194304;function at(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ot(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=at(n))):i=at(o):i=at(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=at(n))):i=at(o)):i=at(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function st(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ct(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-Qe(n),i=1<<r;t|=e[r],n&=~i}return t}function lt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ut(){var e=it;return it<<=1,!(it&62914560)&&(it=4194304),e}function dt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ft(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function pt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&mt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function mt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ht(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function gt(e,t){var n=t&-t;return n=n&42?1:_t(n),(n&(e.suspendedLanes|t))===0?n:0}function _t(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function vt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function yt(){var e=L.p;return e===0?(e=window.event,e===void 0?32:wh(e.type)):e}function bt(e,t){var n=L.p;try{return L.p=e,t()}finally{L.p=n}}var xt=Math.random().toString(36).slice(2),St=`__reactFiber$`+xt,Ct=`__reactProps$`+xt,wt=`__reactContainer$`+xt,Tt=`__reactEvents$`+xt,Et=`__reactListeners$`+xt,z=`__reactHandles$`+xt,Dt=`__reactResources$`+xt,Ot=`__reactMarker$`+xt,kt=`__reactLoad$`+xt;function At(e){delete e[St],delete e[Ct],delete e[Et],delete e[z]}function jt(e){var t;if(t=e[St])return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=pm(e);e!==null;){if(n=e[St])return n;e=pm(e)}return t}e=n,n=e.parentNode}return null}function Mt(e){if(e=e[St]||e[wt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Pt(e){var t=e[Dt];return t||=e[Dt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ft(e){e[Ot]=!0}function It(e){e[kt]=void 0}var Lt=new Set,Rt={};function zt(e,t){Bt(e,t),Bt(e+`Capture`,t)}function Bt(e,t){for(Rt[e]=t,e=0;e<t.length;e++)Lt.add(t[e])}var Vt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ht={},Ut={};function Wt(e){return Fe.call(Ut,e)?!0:Fe.call(Ht,e)?!1:Vt.test(e)?Ut[e]=!0:(Ht[e]=!0,!1)}var Gt=!1;function Kt(){var e=Gt;return Gt=!1,e}function qt(e,t,n){if(Wt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Jt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Yt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Xt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Qt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $t(e){if(!e._valueTracker){var t=Zt(e)?`checked`:`value`;e._valueTracker=Qt(e,t,``+e[t])}}function en(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Zt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var tn=/[\n"\\]/g;function nn(e){return e.replace(tn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function rn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Xt(t)):e.value!==``+Xt(t)&&(e.value=``+Xt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):on(e,Xt(n)):o===`number`&&e.value==t?on(e,Xt(e.value)):on(e,Xt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Xt(s):e.removeAttribute(`name`)}function an(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){$t(e);return}n=n==null?``:``+Xt(n),t=t==null?n:``+Xt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),$t(e)}function on(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function sn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Xt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function cn(e,t,n){t!=null&&(t=``+Xt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Xt(n)}function ln(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(me(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Xt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),$t(e)}function un(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var dn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function fn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||dn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function pn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,Gt=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(fn(e,a,r),Gt=!0)}else for(var o in t)t.hasOwnProperty(o)&&fn(e,o,t[o])}function mn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var hn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),gn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function _n(e){return gn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function vn(){}var yn=null;function bn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xn=null,Sn=null;function Cn(e){var t=Mt(e);if(t&&(e=t.stateNode)){var n=e[Ct]||null;a:switch(e=t.stateNode,t.type){case`input`:if(rn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+nn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ct]||null;if(!a)throw Error(i(90));rn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&en(r)}break a;case`textarea`:cn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&sn(e,!!n.multiple,t,!1)}}}var wn=!1;function Tn(e,t,n){if(wn)return e(t,n);wn=!0;try{return e(t)}finally{if(wn=!1,(xn!==null||Sn!==null)&&(zd(),xn&&(t=xn,e=Sn,Sn=xn=null,Cn(t),e)))for(t=0;t<e.length;t++)Cn(e[t])}}function En(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Ct]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Dn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,On=!1;if(Dn)try{var kn={};Object.defineProperty(kn,"passive",{get:function(){On=!0}}),window.addEventListener(`test`,kn,kn),window.removeEventListener(`test`,kn,kn)}catch{On=!1}var An=null,jn=null,Mn=null;function Nn(){if(Mn)return Mn;var e,t=jn,n=t.length,r,i=`value`in An?An.value:An.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Mn=i.slice(e,1<r?1-r:void 0)}function Pn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Fn(){return!0}function In(){return!1}function Ln(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Fn:In,this.isPropagationStopped=In,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Fn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Fn)},persist:function(){},isPersistent:Fn}),t}var Rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zn=Ln(Rn),Bn=D({},Rn,{view:0,detail:0}),Vn=Ln(Bn),Hn,Un,Wn,Gn=D({},Bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Wn&&(Wn&&e.type===`mousemove`?(Hn=e.screenX-Wn.screenX,Un=e.screenY-Wn.screenY):Un=Hn=0,Wn=e),Hn)},movementY:function(e){return`movementY`in e?e.movementY:Un}}),Kn=Ln(Gn),qn=Ln(D({},Gn,{dataTransfer:0})),Jn=Ln(D({},Bn,{relatedTarget:0})),Yn=Ln(D({},Rn,{animationName:0,elapsedTime:0,pseudoElement:0})),Xn=Ln(D({},Rn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Zn=Ln(D({},Rn,{data:0})),Qn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},$n={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},er={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function tr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=er[e])?!!t[e]:!1}function nr(){return tr}var rr=Ln(D({},Bn,{key:function(e){if(e.key){var t=Qn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Pn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?$n[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nr,charCode:function(e){return e.type===`keypress`?Pn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Pn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ir=Ln(D({},Gn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ar=Ln(D({},Rn,{submitter:0})),or=Ln(D({},Bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nr})),sr=Ln(D({},Rn,{propertyName:0,elapsedTime:0,pseudoElement:0})),cr=Ln(D({},Gn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),lr=Ln(D({},Rn,{newState:0,oldState:0,source:0})),ur=[9,13,27,32],dr=Dn&&`CompositionEvent`in window,fr=null;Dn&&`documentMode`in document&&(fr=document.documentMode);var pr=Dn&&`TextEvent`in window&&!fr,mr=Dn&&(!dr||fr&&8<fr&&11>=fr),hr=` `,gr=!1;function _r(e,t){switch(e){case`keyup`:return ur.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function vr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var yr=!1;function br(e,t){switch(e){case`compositionend`:return vr(t);case`keypress`:return t.which===32?(gr=!0,hr):null;case`textInput`:return e=t.data,e===hr&&gr?null:e;default:return null}}function xr(e,t){if(yr)return e===`compositionend`||!dr&&_r(e,t)?(e=Nn(),Mn=jn=An=null,yr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return mr&&t.locale!==`ko`?null:t.data;default:return null}}var Sr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Sr[e.type]:t===`textarea`}function wr(e,t,n,r){xn?Sn?Sn.push(r):Sn=[r]:xn=r,t=Jf(t,`onChange`),0<t.length&&(n=new zn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Tr=null,Er=null;function Dr(e){Vf(e,0)}function Or(e){if(en(Nt(e)))return e}function kr(e,t){if(e===`change`)return t}var Ar=!1;if(Dn){var jr;if(Dn){var Mr=`oninput`in document;if(!Mr){var Nr=document.createElement(`div`);Nr.setAttribute(`oninput`,`return;`),Mr=typeof Nr.oninput==`function`}jr=Mr}else jr=!1;Ar=jr&&(!document.documentMode||9<document.documentMode)}function Pr(){Tr&&(Tr.detachEvent(`onpropertychange`,Fr),Er=Tr=null)}function Fr(e){if(e.propertyName===`value`&&Or(Er)){var t=[];wr(t,Er,e,bn(e)),Tn(Dr,t)}}function Ir(e,t,n){e===`focusin`?(Pr(),Tr=t,Er=n,Tr.attachEvent(`onpropertychange`,Fr)):e===`focusout`&&Pr()}function Lr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Or(Er)}function Rr(e,t){if(e===`click`)return Or(t)}function zr(e,t){if(e===`input`||e===`change`)return Or(t)}function Br(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Vr=typeof Object.is==`function`?Object.is:Br;function Hr(e,t){if(Vr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Fe.call(t,i)||!Vr(e[i],t[i]))return!1}return!0}function Ur(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Wr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gr(e,t){var n=Wr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Wr(n)}}function Kr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ur(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ur(e.document)}return t}function Jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Yr=Dn&&`documentMode`in document&&11>=document.documentMode,Xr=null,Zr=null,Qr=null,$r=!1;function ei(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$r||Xr==null||Xr!==Ur(r)||(r=Xr,`selectionStart`in r&&Jr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qr&&Hr(Qr,r)||(Qr=r,r=Jf(Zr,`onSelect`),0<r.length&&(t=new zn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Xr)))}function ti(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ni={animationend:ti(`Animation`,`AnimationEnd`),animationiteration:ti(`Animation`,`AnimationIteration`),animationstart:ti(`Animation`,`AnimationStart`),transitionrun:ti(`Transition`,`TransitionRun`),transitionstart:ti(`Transition`,`TransitionStart`),transitioncancel:ti(`Transition`,`TransitionCancel`),transitionend:ti(`Transition`,`TransitionEnd`)},ri={},ii={};Dn&&(ii=document.createElement(`div`).style,`AnimationEvent`in window||(delete ni.animationend.animation,delete ni.animationiteration.animation,delete ni.animationstart.animation),`TransitionEvent`in window||delete ni.transitionend.transition);function ai(e){if(ri[e])return ri[e];if(!ni[e])return e;var t=ni[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ii)return ri[e]=t[n];return e}var oi=ai(`animationend`),si=ai(`animationiteration`),ci=ai(`animationstart`),li=ai(`transitionrun`),ui=ai(`transitionstart`),di=ai(`transitioncancel`),fi=ai(`transitionend`),pi=new Map,mi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);mi.push(`scrollEnd`);function hi(e,t){pi.set(e,t),zt(t,[e])}var B=0;function gi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=B++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function _i(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function vi(e,t){return e=_i(e),t=_i(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var yi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},bi=[],xi=0,V=0;function Si(){for(var e=xi,t=V=xi=0;t<e;){var n=bi[t];bi[t++]=null;var r=bi[t];bi[t++]=null;var i=bi[t];bi[t++]=null;var a=bi[t];if(bi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ei(n,i,a)}}function Ci(e,t,n,r){bi[xi++]=e,bi[xi++]=t,bi[xi++]=n,bi[xi++]=r,V|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function wi(e,t,n,r){return Ci(e,t,n,r),Di(e)}function Ti(e,t){return Ci(e,null,null,t),Di(e)}function Ei(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Di(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Oi={};function ki(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ai(e,t,n,r){return new ki(e,t,n,r)}function ji(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mi(e,t){var n=e.alternate;return n===null?(n=Ai(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ni(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Pi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)ji(r)&&(s=1);else if(typeof r==`string`)s=Jm(e,n,xe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case ae:return e=Ai(31,n,t,a),e.elementType=ae,e.lanes=o,e;case j:return Fi(n.children,a,o,t);case M:s=8,a|=24;break;case ee:return e=Ai(12,n,t,a|2),e.elementType=ee,e.lanes=o,e;case ne:return e=Ai(13,n,t,a),e.elementType=ne,e.lanes=o,e;case re:return e=Ai(19,n,t,a),e.elementType=re,e.lanes=o,e;case oe:case ce:return e=a|32,e=Ai(30,n,t,e),e.elementType=ce,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case P:s=10;break a;case N:s=9;break a;case te:s=11;break a;case F:s=14;break a;case ie:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Ai(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Fi(e,t,n,r){return e=Ai(7,e,r,t),e.lanes=n,e}function Ii(e,t,n){return e=Ai(6,e,null,t),e.lanes=n,e}function Li(e){var t=Ai(18,null,null,0);return t.stateNode=e,t}function H(e,t,n){return t=Ai(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ri=new WeakMap;function zi(e,t){if(typeof e==`object`&&e){var n=Ri.get(e);return n===void 0?(t={value:e,source:t,stack:Pe(t)},Ri.set(e,t),t):n}return{value:e,source:t,stack:Pe(t)}}var Bi=[],Vi=0,Hi=null,Ui=0,Wi=[],Gi=0,Ki=null,qi=1,Ji=``;function Yi(e,t){Bi[Vi++]=Ui,Bi[Vi++]=Hi,Hi=e,Ui=t}function Xi(e,t,n){Wi[Gi++]=qi,Wi[Gi++]=Ji,Wi[Gi++]=Ki,Ki=e;var r=qi;e=Ji;var i=32-Qe(r)-1;r&=~(1<<i),n+=1;var a=32-Qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,qi=1<<32-Qe(t)+i|n<<i|r,Ji=a+e}else qi=1<<a|n<<i|r,Ji=e}function U(e){e.return!==null&&(Yi(e,1),Xi(e,1,0))}function Zi(e){for(;e===Hi;)Hi=Bi[--Vi],Bi[Vi]=null,Ui=Bi[--Vi],Bi[Vi]=null;for(;e===Ki;)Ki=Wi[--Gi],Wi[Gi]=null,Ji=Wi[--Gi],Wi[Gi]=null,qi=Wi[--Gi],Wi[Gi]=null}function Qi(e,t){Wi[Gi++]=qi,Wi[Gi++]=Ji,Wi[Gi++]=Ki,qi=t.id,Ji=t.overflow,Ki=e}var $i=null,ea=null,W=!1,ta=null,na=!1,ra=Error(i(519));function ia(e){throw ua(zi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ra}function aa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[St]=e,t[Ct]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),an(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),ln(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=vn),t=!0):t=!1,t||ia(e,!0)}function oa(e){for($i=e.return;$i;)switch($i.tag){case 5:case 31:case 13:na=!1;return;case 27:case 3:na=!0;return;default:$i=$i.return}}function sa(e){if(e!==$i)return!1;if(!W)return oa(e),W=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||mp(e.type,e.memoizedProps)),n=!n),n&&ea&&ia(e),oa(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ea=fm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ea=fm(e)}else t===27?(t=ea,Cp(e.type)?(e=dm,dm=null,ea=e):ea=t):ea=$i?um(e.stateNode.nextSibling):null;return!0}function ca(){ea=$i=null,W=!1}function la(){var e=ta;return e!==null&&(fd===null?fd=e:fd.push.apply(fd,e),ta=null),e}function ua(e){ta===null?ta=[e]:ta.push(e)}var da=ve(null),fa=null,pa=null;function ma(e,t,n){be(da,t._currentValue),t._currentValue=n}function ha(e){e._currentValue=da.current,ye(da)}function ga(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function _a(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ga(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ga(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ga(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function va(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Vr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===we.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[ch]:e.push(ch))}a=a.return}return e!==null&&_a(t,e,n,r),t.flags|=262144,e!==null}function ya(e){for(e=e.firstContext;e!==null;){if(!Vr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ba(e){fa=e,pa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function xa(e){return Ca(fa,e)}function Sa(e,t){return fa===null&&ba(e),Ca(e,t)}function Ca(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},pa===null){if(e===null)throw Error(i(308));pa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else pa=pa.next=t;return n}var wa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ta=t.unstable_scheduleCallback,Ea=t.unstable_NormalPriority,Da={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Oa(){return{controller:new wa,data:new Map,refCount:0}}function ka(e){e.refCount--,e.refCount===0&&Ta(Ea,function(){e.controller.abort()})}function Aa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var ja=null;function Ma(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Na=null,Pa=0,Fa=0,Ia=null;function La(e,t){if(Na===null){var n=Na=[];Pa=0,Fa=Pf(),Ia={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Pa++,t.then(Ra,Ra),t}function Ra(){if(--Pa===0&&(ja=null,Na!==null)){Ia!==null&&(Ia.status=`fulfilled`);var e=Na;Na=null,Fa=0,Ia=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function za(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ba=I.S;I.S=function(e,t){if(hd=Be(),typeof t==`object`&&t&&typeof t.then==`function`&&La(e,t),ja!==null)for(var n=bf;n!==null;)Aa(n,ja),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Aa(r,n),r=r.next;if(Fa!==0){r=ja,r===null&&(r=ja=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ba!==null&&Ba(e,t)};var Va=ve(null);function Ha(){var e=Va.current;return e===null?Qu.pooledCache:e}function Ua(e,t){t===null?be(Va,Va.current):be(Va,t.pool)}function Wa(){var e=Ha();return e===null?null:{parent:Da._currentValue,pool:e}}var Ga=Error(i(460)),Ka=Error(i(474)),qa=Error(i(542)),Ja={then:function(){}};function Ya(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Xa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(vn,vn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,eo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(vn,vn);else{if(e=Qu,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,eo(e),e}throw Qa=t,Ga}}function Za(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Qa=e,Ga):e}}var Qa=null;function $a(){if(Qa===null)throw Error(i(459));var e=Qa;return Qa=null,e}function eo(e){if(e===Ga||e===qa)throw Error(i(483))}var to=null,no=0;function ro(e){var t=no;return no+=1,to===null&&(to=[]),Xa(to,e,t)}function io(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function ao(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function oo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Mi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ii(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===j?(e=d(e,t,n.props.children,r,n.key),io(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ie&&Za(i)===t.type)?(t=a(t,n.props),io(t,n),t.return=e,t):(t=Pi(n.type,n.key,n.props,null,e.mode,r),io(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=H(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Fi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ii(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Pi(t.type,t.key,t.props,null,e.mode,n),io(n,t),n.return=e,n;case A:return t=H(t,e.mode,n),t.return=e,t;case ie:return t=Za(t),f(e,t,n)}if(me(t)||de(t))return t=Fi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ro(t),n);if(t.$$typeof===P)return f(e,Sa(e,t),n);ao(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case ie:return n=Za(n),p(e,t,n,r)}if(me(n)||de(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ro(n),r);if(n.$$typeof===P)return p(e,t,Sa(e,n),r);ao(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ie:return r=Za(r),m(e,t,n,r,i)}if(me(r)||de(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ro(r),i);if(r.$$typeof===P)return m(e,t,n,Sa(t,r),i);ao(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),W&&Yi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return W&&Yi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),W&&Yi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),W&&Yi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return W&&Yi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),W&&Yi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===j&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===j){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),io(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ie&&Za(l)===r.type){n(e,r.sibling),c=a(r,o.props),io(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===j?(c=Fi(o.props.children,e.mode,c,o.key),io(c,o),c.return=e,e=c):(c=Pi(o.type,o.key,o.props,null,e.mode,c),io(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=H(o,e.mode,c),c.return=e,e=c}return s(e);case ie:return o=Za(o),_(e,r,o,c)}if(me(o))return h(e,r,o,c);if(de(o)){if(l=de(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,ro(o),c);if(o.$$typeof===P)return _(e,r,Sa(e,o),c);ao(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ii(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{no=0;var i=_(e,t,n,r);return to=null,i}catch(t){if(t===Ga||t===qa)throw t;var a=Ai(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var so=oo(!0),co=oo(!1),lo=!1;function uo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function fo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function po(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function mo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Di(e),Ei(e,null,n),t}return Ci(e,r,t,n),Di(e)}function ho(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}function go(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var _o=!1;function vo(){if(_o){var e=Ia;if(e!==null)throw e}}function yo(e,t,n,r){_o=!1;var i=e.updateQueue;lo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(X&f)===f:(r&f)===f){f!==0&&f===Fa&&(_o=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:lo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),od|=o,e.lanes=o,e.memoizedState=d}}function bo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function xo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)bo(n[e],t)}var So=ve(null),Co=ve(0);function wo(e,t){e=id,be(Co,e),be(So,t),id=e|t.baseLanes}function To(){be(Co,id),be(So,So.current)}function Eo(){id=Co.current,ye(So),ye(Co)}var Do=ve(null),Oo=null;function ko(e){var t=e.alternate;be(Po,Po.current&1),be(Do,e),Oo===null&&(t===null||So.current!==null||t.memoizedState!==null)&&(Oo=e)}function Ao(e){be(Po,Po.current),be(Do,e),Oo===null&&(Oo=e)}function jo(e){e.tag===22?(be(Po,Po.current),be(Do,e),Oo===null&&(Oo=e)):Mo()}function Mo(){be(Po,Po.current),be(Do,Do.current)}function No(e){ye(Do),Oo===e&&(Oo=null),ye(Po)}var Po=ve(0);function Fo(e,t){be(Do,Do.current),be(Po,t)}function Io(e){ye(Po),ye(Do),Oo===e&&(Oo=null)}function Lo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||sm(n)||cm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ro=0,G=null,zo=null,Bo=null,Vo=!1,Ho=!1,Uo=!1,Wo=0,Go=0,Ko=null,qo=0;function Jo(){throw Error(i(321))}function Yo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Vr(e[n],t[n]))return!1;return!0}function Xo(e,t,n,r,i,a){return Ro=a,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,I.H=e===null||e.memoizedState===null?fc:pc,Uo=!1,a=n(r,i),Uo=!1,Ho&&(a=Qo(t,n,r,i)),Zo(e),a}function Zo(e){I.H=dc;var t=zo!==null&&zo.next!==null;if(Ro=0,Bo=zo=G=null,Vo=!1,Go=0,Ko=null,t)throw Error(i(300));e===null||Ac||(e=e.dependencies,e!==null&&ya(e)&&(Ac=!0))}function Qo(e,t,n,r){G=e;var a=0;do{if(Ho&&(Ko=null),Go=0,Ho=!1,25<=a)throw Error(i(301));if(a+=1,Bo=zo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}I.H=mc,o=t(n,r)}while(Ho);return o}function $o(){var e=I.H,t=e.useState()[0];return t=typeof t.then==`function`?as(t):t,e=e.useState()[0],(zo===null?null:zo.memoizedState)!==e&&(G.flags|=1024),t}function es(){var e=Wo!==0;return Wo=0,e}function ts(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ns(e){if(Vo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Vo=!1}Ro=0,Bo=zo=G=null,Ho=!1,Go=Wo=0,Ko=null}function K(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Bo===null?G.memoizedState=Bo=e:Bo=Bo.next=e,Bo}function rs(){if(zo===null){var e=G.alternate;e=e===null?null:e.memoizedState}else e=zo.next;var t=Bo===null?G.memoizedState:Bo.next;if(t!==null)Bo=t,zo=e;else{if(e===null)throw G.alternate===null?Error(i(467)):Error(i(310));zo=e,e={memoizedState:zo.memoizedState,baseState:zo.baseState,baseQueue:zo.baseQueue,queue:zo.queue,next:null},Bo===null?G.memoizedState=Bo=e:Bo=Bo.next=e}return Bo}function is(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function as(e){var t=Go;return Go+=1,Ko===null&&(Ko=[]),e=Xa(Ko,e,t),t=G,(Bo===null?t.memoizedState:Bo.next)===null&&(t=t.alternate,I.H=t===null||t.memoizedState===null?fc:pc),e}function os(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return as(e);if(e.$$typeof===le)return;if(e.$$typeof===P)return xa(e)}throw Error(i(438,String(e)))}function ss(e){var t=null,n=G.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=G.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=is(),G.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=se;return t.index++,n}function cs(e,t){return typeof t==`function`?t(e):t}function ls(e){return us(rs(),zo,e)}function us(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Ro&f)===f:(X&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Fa&&(d=!0);else if((Ro&p)===p){u=u.next,p===Fa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,G.lanes|=p,od|=p;f=u.action,Uo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,G.lanes|=f,od|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Vr(o,e.memoizedState)&&(Ac=!0,d&&(n=Ia,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ds(e){var t=rs(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Vr(o,t.memoizedState)||(Ac=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function fs(e,t,n){var r=G,a=rs(),o=W;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Vr((zo||a).memoizedState,n);if(s&&(a.memoizedState=n,Ac=!0),a=a.queue,Ls(hs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Bo!==null&&!!(Bo.memoizedState.tag&1),Ms(e?9:8,{destroy:void 0},ms.bind(null,r,a,n,t),null),e){if(r.flags|=2048,Qu===null)throw Error(i(349));o||Ro&127||ps(r,t,n)}return n}function ps(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=G.updateQueue,t===null?(t=is(),G.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ms(e,t,n,r){t.value=n,t.getSnapshot=r,gs(t)&&_s(e)}function hs(e,t,n){return n(function(){gs(t)&&_s(e)})}function gs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Vr(e,n)}catch{return!0}}function _s(e){var t=Ti(e,2);t!==null&&Pd(t,e,2)}function vs(e){var t=K();if(typeof e==`function`){var n=e;if(e=n(),Uo){Ze(!0);try{n()}finally{Ze(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:cs,lastRenderedState:e},t}function ys(e,t,n,r){return e.baseState=n,us(e,zo,typeof r==`function`?r:cs)}function bs(e,t,n,r,a){if(cc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};I.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,xs(t,o)):(o.next=n.next,t.pending=n.next=o)}}function xs(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=I.T,o={};o.types=a===null?null:a.types,I.T=o;try{var s=n(i,r),c=I.S;c!==null&&c(o,s),Ss(e,t,s)}catch(n){ws(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),I.T=a}}else try{a=n(i,r),Ss(e,t,a)}catch(n){ws(e,t,n)}}function Ss(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Cs(e,t,n)},function(n){return ws(e,t,n)}):Cs(e,t,n)}function Cs(e,t,n){t.status=`fulfilled`,t.value=n,Ts(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,xs(e,n)))}function ws(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ts(t),t=t.next;while(t!==r)}e.action=null}function Ts(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Es(e,t){return t}function Ds(e,t){if(W){var n=Qu.formState;if(n!==null){a:{var r=G;if(W){if(ea){b:{for(var i=ea,a=na;i.nodeType!==8;)if(!a||(i=um(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ea=um(i.nextSibling),r=i.data===`F!`;break a}}ia(r)}r=!1}r&&(t=n[0])}}return n=K(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Es,lastRenderedState:t},n.queue=r,n=ac.bind(null,G,r),r.dispatch=n,r=vs(!1),a=sc.bind(null,G,!1,r.queue),r=K(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=bs.bind(null,G,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Os(e){return ks(rs(),zo,e)}function ks(e,t,n){if(t=us(e,t,Es)[0],e=ls(cs)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=as(t)}catch(e){throw e===Ga?qa:e}else r=t;t=rs();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(G.flags|=2048,Ms(9,{destroy:void 0},As.bind(null,i,n),null)),[r,a,e]}function As(e,t){e.action=t}function js(e){var t=rs(),n=zo;if(n!==null)return ks(t,n,e);rs(),t=t.memoizedState,n=rs();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ms(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=G.updateQueue,t===null&&(t=is(),G.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ns(){return rs().memoizedState}function Ps(e,t,n,r){var i=K();G.flags|=e,i.memoizedState=Ms(1|t,{destroy:void 0},n,r===void 0?null:r)}function Fs(e,t,n,r){var i=rs();r=r===void 0?null:r;var a=i.memoizedState.inst;zo!==null&&r!==null&&Yo(r,zo.memoizedState.deps)?i.memoizedState=Ms(t,a,n,r):(G.flags|=e,i.memoizedState=Ms(1|t,a,n,r))}function Is(e,t){Ps(8390656,8,e,t)}function Ls(e,t){Fs(2048,8,e,t)}function Rs(e){G.flags|=4;var t=G.updateQueue;if(t===null)t=is(),G.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function zs(e){var t=rs().memoizedState;return Rs({ref:t,nextImpl:e}),function(){if(J&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Bs(e,t){return Fs(4,2,e,t)}function Vs(e,t){return Fs(4,4,e,t)}function Hs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Us(e,t,n){n=n==null?null:n.concat([e]),Fs(4,4,Hs.bind(null,t,e),n)}function Ws(){}function Gs(e,t){var n=rs();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Yo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ks(e,t){var n=rs();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Yo(t,r[1]))return r[0];if(r=e(),Uo){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r}function qs(e,t,n){return n===void 0||Ro&1073741824&&!(X&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),G.lanes|=e,od|=e,n)}function Js(e,t,n,r){return Vr(n,t)?n:So.current===null?!(Ro&106)||Ro&1073741824&&!(X&261930)?(Ac=!0,e.memoizedState=n):(e=Md(),G.lanes|=e,od|=e,t):(e=qs(e,n,r),Vr(e,t)||(Ac=!0),e)}function Ys(e,t,n,r,i){var a=L.p;L.p=a!==0&&8>a?a:8;var o=I.T,s={};s.types=o===null?null:o.types,I.T=s,sc(e,!1,t,n);try{var c=i(),l=I.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?oc(e,t,za(c,r),jd(e)):oc(e,t,r,jd(e))}catch(n){oc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{L.p=a,o!==null&&s.types!==null&&(o.types=s.types),I.T=o}}function Xs(){}function Zs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Qs(e).queue;Ys(e,a,t,he,n===null?Xs:function(){return $s(e),n(r)})}function Qs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:he,baseState:he,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:cs,lastRenderedState:he},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:cs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function $s(e){var t=Qs(e);t.next===null&&(t=e.alternate.memoizedState),oc(e,t.next.queue,{},jd())}function ec(){return xa(ch)}function tc(){return rs().memoizedState}function nc(){return rs().memoizedState}function rc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=po(n);var r=mo(t,e,n);r!==null&&(Pd(r,t,n),ho(r,t,n)),t={cache:Oa()},e.payload=t;return}t=t.return}}function ic(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},cc(e)?lc(t,n):(n=wi(e,t,n,r),n!==null&&(Pd(n,e,r),uc(n,t,r)))}function ac(e,t,n){oc(e,t,n,jd())}function oc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(cc(e))lc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Vr(s,o))return Ci(e,t,i,0),Qu===null&&Si(),!1}catch{}if(n=wi(e,t,i,r),n!==null)return Pd(n,e,r),uc(n,t,r),!0}return!1}function sc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},cc(e)){if(t)throw Error(i(479))}else t=wi(e,n,r,2),t!==null&&Pd(t,e,2)}function cc(e){var t=e.alternate;return e===G||t!==null&&t===G}function lc(e,t){Ho=Vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function uc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}var dc={readContext:xa,use:os,useCallback:Jo,useContext:Jo,useEffect:Jo,useImperativeHandle:Jo,useLayoutEffect:Jo,useInsertionEffect:Jo,useMemo:Jo,useReducer:Jo,useRef:Jo,useState:Jo,useDebugValue:Jo,useDeferredValue:Jo,useTransition:Jo,useSyncExternalStore:Jo,useId:Jo,useHostTransitionStatus:Jo,useFormState:Jo,useActionState:Jo,useOptimistic:Jo,useMemoCache:Jo,useCacheRefresh:Jo,useEffectEvent:Jo},fc={readContext:xa,use:os,useCallback:function(e,t){return K().memoizedState=[e,t===void 0?null:t],e},useContext:xa,useEffect:Is,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ps(4194308,4,Hs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ps(4194308,4,e,t)},useInsertionEffect:function(e,t){Ps(4,2,e,t)},useMemo:function(e,t){var n=K();t=t===void 0?null:t;var r=e();if(Uo){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=K();if(n!==void 0){var i=n(t);if(Uo){Ze(!0);try{n(t)}finally{Ze(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ic.bind(null,G,e),[r.memoizedState,e]},useRef:function(e){var t=K();return e={current:e},t.memoizedState=e},useState:function(e){e=vs(e);var t=e.queue,n=ac.bind(null,G,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ws,useDeferredValue:function(e,t){return qs(K(),e,t)},useTransition:function(){var e=vs(!1);return e=Ys.bind(null,G,e.queue,!0,!1),K().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=G,a=K();if(W){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Qu===null)throw Error(i(349));X&127||ps(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Is(hs.bind(null,r,o,e),[e]),r.flags|=2048,Ms(9,{destroy:void 0},ms.bind(null,r,o,n,t),null),n},useId:function(){var e=K(),t=Qu.identifierPrefix;if(W){var n=Ji,r=qi;n=(r&~(1<<32-Qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Wo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=qo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ec,useFormState:Ds,useActionState:Ds,useOptimistic:function(e){var t=K();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=sc.bind(null,G,!0,n),n.dispatch=t,[e,t]},useMemoCache:ss,useCacheRefresh:function(){return K().memoizedState=rc.bind(null,G)},useEffectEvent:function(e){var t=K(),n={impl:e};return t.memoizedState=n,function(){if(J&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},pc={readContext:xa,use:os,useCallback:Gs,useContext:xa,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Bs,useLayoutEffect:Vs,useMemo:Ks,useReducer:ls,useRef:Ns,useState:function(){return ls(cs)},useDebugValue:Ws,useDeferredValue:function(e,t){return Js(rs(),zo.memoizedState,e,t)},useTransition:function(){var e=ls(cs)[0],t=rs().memoizedState;return[typeof e==`boolean`?e:as(e),t]},useSyncExternalStore:fs,useId:tc,useHostTransitionStatus:ec,useFormState:Os,useActionState:Os,useOptimistic:function(e,t){return ys(rs(),zo,e,t)},useMemoCache:ss,useCacheRefresh:nc,useEffectEvent:zs},mc={readContext:xa,use:os,useCallback:Gs,useContext:xa,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Bs,useLayoutEffect:Vs,useMemo:Ks,useReducer:ds,useRef:Ns,useState:function(){return ds(cs)},useDebugValue:Ws,useDeferredValue:function(e,t){var n=rs();return zo===null?qs(n,e,t):Js(n,zo.memoizedState,e,t)},useTransition:function(){var e=ds(cs)[0],t=rs().memoizedState;return[typeof e==`boolean`?e:as(e),t]},useSyncExternalStore:fs,useId:tc,useHostTransitionStatus:ec,useFormState:js,useActionState:js,useOptimistic:function(e,t){var n=rs();return zo===null?(n.baseState=e,[e,n.queue.dispatch]):ys(n,zo,e,t)},useMemoCache:ss,useCacheRefresh:nc,useEffectEvent:zs};function hc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var gc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=po(r);i.payload=t,n!=null&&(i.callback=n),t=mo(e,i,r),t!==null&&(Pd(t,e,r),ho(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=po(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=mo(e,i,r),t!==null&&(Pd(t,e,r),ho(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=po(n);r.tag=2,t!=null&&(r.callback=t),t=mo(e,r,n),t!==null&&(Pd(t,e,n),ho(t,e,n))}};function _c(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Hr(n,r)||!Hr(i,a):!0}function vc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&gc.enqueueReplaceState(t,t.state,null)}function yc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function bc(e){yi(e)}function xc(e){console.error(e)}function Sc(e){yi(e)}function Cc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function wc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){return n=po(n),n.tag=3,n.payload={element:null},n.callback=function(){Cc(e,t)},n}function Ec(e){return e=po(e),e.tag=3,e}function Dc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){wc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){wc(t,n,r),typeof i!=`function`&&(vd===null?vd=new Set([this]):vd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Oc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&va(t,n,a,!0),n=Do.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Oo===null?Kd():n.alternate===null&&ad===0&&(ad=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ja?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===Ja?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(W)return t=Do.current,t===null?(r!==ra&&(t=Error(i(423),{cause:r}),ua(zi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=zi(r,n),a=Tc(e.stateNode,r,a),go(e,a),ad!==4&&(ad=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ra&&(e=Error(i(422),{cause:r}),ua(zi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=zi(o,n),dd===null?dd=[o]:dd.push(o),ad!==4&&(ad=2),t===null)return!0;r=zi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Tc(n.stateNode,r,e),go(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(vd===null||!vd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ec(a),Dc(a,e,n,r),go(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var kc=Error(i(461)),Ac=!1;function jc(e,t,n,r){t.child=e===null?co(t,null,n,r):so(t,e.child,n,r)}function Mc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ba(t),r=Xo(e,t,n,o,a,i),s=es(),e!==null&&!Ac?(ts(e,t,i),ol(e,t,i)):(W&&s&&U(t),t.flags|=1,jc(e,t,r,i),t.child)}function Nc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ji(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Pc(e,t,a,r,i)):(e=Pi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!sl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Hr:n,n(o,r)&&e.ref===t.ref)return ol(e,t,i)}return t.flags|=1,e=Mi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Pc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Hr(a,r)&&e.ref===t.ref){if(Ac=!1,t.pendingProps=r=a,sl(e,i))e.flags&131072&&(Ac=!0);else return t.lanes=e.lanes,ol(e,t,i)}}return Hc(e,t,n,r,i)}function Fc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Lc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ua(t,a===null?null:a.cachePool),a===null?To():wo(t,a),jo(t);else return r=t.lanes=536870912,Lc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ua(t,null),To(),Mo()):(Ua(t,a.cachePool),wo(t,a),Mo(),t.memoizedState=null);return jc(e,t,i,n),t.child}function Ic(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Lc(e,t,n,r,i){var a=Ha();return a=a===null?null:{parent:Da._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ua(t,null),To(),jo(t),e!==null&&va(e,t,r,!0),t.childLanes=i,null}function Rc(e,t){return t=Zc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function zc(e,t,n){return so(t,e.child,null,n),e=Rc(t,t.pendingProps),e.flags|=2,No(t),t.memoizedState=null,e}function Bc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(W){if(r.mode===`hidden`)return e=Rc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Ic(null,e);if(Ao(t),(e=ea)?(e=om(e,na),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ki===null?null:{id:qi,overflow:Ji},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,$i=t,ea=null)):e=null,e===null)throw ia(t);return t.lanes=536870912,null}return Rc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Ao(t),a){if(t.flags&256)t.flags&=-257,t=zc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Ac||va(e,t,n,!1),a=(n&e.childLanes)!==0,Ac||a){if(So.current===null){if(r=Qu,r!==null&&(s=gt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ti(e,s),Pd(r,e,s),kc;Kd()}t=zc(e,t,n)}else e=o.treeContext,ea=um(s.nextSibling),$i=t,W=!0,ta=null,na=!1,e!==null&&Qi(t,e),t=Rc(t,r),t.flags|=134221824;return t}return e=Mi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Vc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Hc(e,t,n,r,i){return ba(t),n=Xo(e,t,n,r,void 0,i),r=es(),e!==null&&!Ac?(ts(e,t,i),ol(e,t,i)):(W&&r&&U(t),t.flags|=1,jc(e,t,n,i),t.child)}function Uc(e,t,n,r,i,a){return ba(t),t.updateQueue=null,n=Qo(t,r,n,i),Zo(e),r=es(),e!==null&&!Ac?(ts(e,t,a),ol(e,t,a)):(W&&r&&U(t),t.flags|=1,jc(e,t,n,a),t.child)}function Wc(e,t,n,r,i){if(ba(t),t.stateNode===null){var a=Oi,o=n.contextType;typeof o==`object`&&o&&(a=xa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=gc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},uo(t),o=n.contextType,a.context=typeof o==`object`&&o?xa(o):Oi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(hc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&gc.enqueueReplaceState(a,a.state,null),yo(t,r,a,i),vo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=yc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Oi,typeof u==`object`&&u&&(o=xa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&vc(t,a,r,o),lo=!1;var f=t.memoizedState;a.state=f,yo(t,r,a,i),vo(),l=t.memoizedState,s||f!==l||lo?(typeof d==`function`&&(hc(t,n,d,r),l=t.memoizedState),(c=lo||_c(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,fo(e,t),o=t.memoizedProps,u=yc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Oi,typeof l==`object`&&l&&(c=xa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&vc(t,a,r,c),lo=!1,f=t.memoizedState,a.state=f,yo(t,r,a,i),vo();var p=t.memoizedState;o!==d||f!==p||lo||e!==null&&e.dependencies!==null&&ya(e.dependencies)?(typeof s==`function`&&(hc(t,n,s,r),p=t.memoizedState),(u=lo||_c(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ya(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Vc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=so(t,e.child,null,i),t.child=so(t,null,n,i)):jc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=ol(e,t,i),e}function Gc(e,t,n,r){return ca(),t.flags|=256,jc(e,t,n,r),t.child}var Kc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qc(e){return{baseLanes:e,cachePool:Wa()}}function Jc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ld),e}function Yc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Po.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(W){if(i?ko(t):Mo(),(e=ea)?(e=om(e,na),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ki===null?null:{id:qi,overflow:Ji},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,$i=t,ea=null)):e=null,e===null)throw ia(t);return t.lanes=cm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Mo(),i=t.mode,a=Zc({mode:`hidden`,children:a},i),r=Fi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=qc(n),r.childLanes=Jc(e,o,n),t.memoizedState=Kc,Ic(null,r)):(ko(t),Xc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return $c(e,t,a,o,r,c,s,n)}return i?(Mo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Mi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Fi(i,a,n,null),i.flags|=2):i=Mi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Ic(null,r),r=t.child,i=e.child.memoizedState,i===null?i=qc(n):(a=i.cachePool,a===null?a=Wa():(s=Da._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Jc(e,o,n),t.memoizedState=Kc,Ic(e.child,r)):(ko(t),n=e.child,e=n.sibling,n=Mi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Xc(e,t){return t=Zc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Zc(e,t){return e=Ai(22,e,null,t),e.lanes=0,e}function Qc(e,t,n){return so(t,e.child,null,n),e=Xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function $c(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(ko(t),t.flags&=-257,Qc(e,t,c)):t.memoizedState===null?(Mo(),o=a.fallback,s=t.mode,a=Zc({mode:`visible`,children:a.children},s),o=Fi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,so(t,e.child,null,c),a=t.child,a.memoizedState=qc(c),a.childLanes=Jc(e,r,c),t.memoizedState=Kc,Ic(null,a)):(Mo(),t.child=e.child,t.flags|=128,null);if(ko(t),cm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ua({value:a,source:null,stack:null})),Qc(e,t,c)}if(Ac||va(e,t,c,!1),r=(c&e.childLanes)!==0,Ac||r){if(So.current!==null)return Qc(e,t,c);if(r=Qu,r!==null&&(a=gt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ti(e,a),Pd(r,e,a),kc;return sm(o)||Kd(),Qc(e,t,c)}return sm(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,ea=um(o.nextSibling),$i=t,W=!0,ta=null,na=!1,e!==null&&Qi(t,e),t=Xc(t,a.children),t.flags|=134221824,t)}function el(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ga(e.return,t,n)}function tl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Lo(n)===null&&(t=e),e=e.sibling}return t}function nl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function rl(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function il(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Po.current;if(t.flags&128)return Fo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Fo(t,o),i===`backwards`&&e!==null?(rl(e),jc(e,t,r,n),rl(e)):jc(e,t,r,n),r=W?Ui:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&el(e,n,t);else if(e.tag===19)el(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=tl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,rl(t)),nl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Lo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}nl(t,!0,n,null,a,r);break;case`together`:nl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=tl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),nl(t,!1,i,n,a,r)}return t.child}function al(e,t,n){var r=t.pendingProps;return ma(t,t.type,r.value),jc(e,t,r.children,n),t.child}function ol(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),od|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(va(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Mi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Mi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function sl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ya(e)))}function cl(e,t,n){switch(t.tag){case 3:Te(t,t.stateNode.containerInfo),ma(t,Da,e.memoizedState.cache),ca();break;case 27:case 5:De(t);break;case 4:Te(t,t.stateNode.containerInfo);break;case 10:ma(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ao(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return ko(t),t.flags|=128,null;r=va(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Yc(e,t,n):(ko(t),e=ol(e,t,n),e===null?null:e.sibling)}ko(t);break;case 19:if(t.flags&128)return il(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(va(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return il(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Fo(t,Po.current),r)break;return null;case 22:return t.lanes=0,Fc(e,t,n,t.pendingProps);case 24:ma(t,Da,e.memoizedState.cache)}return ol(e,t,n)}function ll(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Ac=!0;else{if(!sl(e,n)&&!(t.flags&128))return Ac=!1,cl(e,t,n);Ac=!!(e.flags&131072)}}else Ac=!1,W&&t.flags&1048576&&Xi(t,Ui,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Za(t.elementType),t.type=e,typeof e==`function`)ji(e)?(r=yc(e,r),t.tag=1,t=Wc(null,t,e,r,n)):(t.tag=0,t=Hc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===te){t.tag=11,t=Mc(null,t,e,r,n);break a}if(a===F){t.tag=14,t=Nc(null,t,e,r,n);break a}if(a===P){t.tag=10,t.type=e,t=al(null,t,n);break a}}throw t=pe(e)||e,Error(i(306,t,``))}}return t;case 0:return Hc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=yc(r,t.pendingProps),Wc(e,t,r,a,n);case 3:a:{if(Te(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,fo(e,t),yo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ma(t,Da,r),r!==o.cache&&_a(t,[Da],n,!0),vo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Gc(e,t,r,n);break a}if(r!==a){a=zi(Error(i(424)),t),ua(a),t=Gc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ea=um(e.firstChild),$i=t,W=!0,ta=null,na=!0,n=co(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ca(),r===a){t=ol(e,t,n);break a}jc(e,t,r,n)}t=t.child}return t;case 26:return Vc(e,t),e===null?(n=Pm(t.type,null,t.pendingProps,null))?t.memoizedState=n:W||(t.stateNode=pp(t.type,t.pendingProps,Ce.current,t)):t.memoizedState=Pm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return De(t),e===null&&W&&(r=t.stateNode=gm(t.type,t.pendingProps,Ce.current),$i=t,na=!0,a=ea,Cp(t.type)?(dm=a,ea=um(r.firstChild)):ea=a),jc(e,t,t.pendingProps.children,n),Vc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&W&&((a=r=ea)&&(r=im(r,t.type,t.pendingProps,na),r===null?a=!1:(t.stateNode=r,$i=t,ea=um(r.firstChild),na=!1,a=!0)),a||ia(t)),De(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,mp(a,o)?r=null:s!==null&&mp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Xo(e,t,$o,null,null,n),ch._currentValue=a),Vc(e,t),jc(e,t,r,n),t.child;case 6:return e===null&&W&&((e=n=ea)&&(n=am(n,t.pendingProps,na),n===null?e=!1:(t.stateNode=n,$i=t,ea=null,e=!0)),e||ia(t)),null;case 13:return Yc(e,t,n);case 4:return Te(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=so(t,null,r,n):jc(e,t,r,n),t.child;case 11:return Mc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Vc(e,t),jc(e,t,r,n),t.child;case 8:return jc(e,t,t.pendingProps.children,n),t.child;case 12:return jc(e,t,t.pendingProps.children,n),t.child;case 10:return al(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,ba(t),a=xa(a),r=r(a),t.flags|=1,jc(e,t,r,n),t.child;case 14:return Nc(e,t,t.type,t.pendingProps,n);case 15:return Pc(e,t,t.type,t.pendingProps,n);case 19:return il(e,t,n);case 31:return Bc(e,t,n);case 22:return Fc(e,t,n,t.pendingProps);case 24:return ba(t),r=xa(Da),e===null?(a=Ha(),a===null&&(a=Qu,o=Oa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},uo(t),ma(t,Da,a)):((e.lanes&n)!==0&&(fo(e,t),yo(t,null,null,n),vo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ma(t,Da,r),r!==a.cache&&_a(t,[Da],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ma(t,Da,r))),jc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:W&&U(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Vc(e,t),jc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function ul(e){e.flags|=4}function dl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Ym(t,r):Ym(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw Qa=Ja,Ka}}else e.flags&=-16777217}function fl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Xm(t)){if(Ud())e.flags|=8192;else throw Qa=Ja,Ka}}function pl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ut(),e.lanes|=t,ud|=t)}function ml(e,t){if(!W)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function hl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function gl(e,t,n){var r=t.pendingProps;switch(Zi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hl(t),null;case 1:return hl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ha(Da),Ee(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(sa(t)?ul(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,la())),hl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(ul(t),o===null?(hl(t),dl(t,a,null,r,n)):(hl(t),fl(t,o))):o?o===e.memoizedState?(hl(t),t.flags&=-16777217):(ul(t),hl(t),fl(t,o)):(e=e.memoizedProps,e!==r&&ul(t),hl(t),dl(t,a,e,r,n)),null;case 27:if(Oe(t),n=Ce.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return hl(t),t.subtreeFlags&=-33554433,null}e=xe.current,sa(t)?aa(t,e):(e=gm(a,r,n),t.stateNode=e,ul(t))}return hl(t),t.subtreeFlags&=-33554433,null;case 5:if(Oe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return hl(t),t.subtreeFlags&=-33554433,null}if(o=xe.current,sa(t))aa(t,o);else{var s=up(Ce.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[St]=t,o[Ct]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(rp(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&ul(t)}}return hl(t),t.subtreeFlags&=-33554433,dl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Ce.current,sa(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=$i,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[St]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ia(t,!0)}else e=up(e).createTextNode(r),e[St]=t,t.stateNode=e}return hl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=sa(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[St]=t}else ca(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;hl(t),e=!1}else n=la(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(No(t),t):(No(t),null);if(t.flags&128)throw Error(i(558))}return hl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=sa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[St]=t}else ca(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;hl(t),a=!1}else a=la(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(No(t),t):(No(t),null)}return No(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),pl(t,t.updateQueue),hl(t),null);case 4:return Ee(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,hl(t),null;case 10:return ha(t.type),hl(t),null;case 19:if(Io(t),r=t.memoizedState,r===null)return hl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)ml(r,!1);else{if(ad!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Lo(e),o!==null){for(t.flags|=128,ml(r,!1),e=o.updateQueue,t.updateQueue=e,pl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ni(n,e),n=n.sibling;return Fo(t,Po.current&1|2),W&&Yi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Be()>gd&&(t.flags|=128,a=!0,ml(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Lo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,pl(t,e),ml(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!W)return hl(t),null}else 2*Be()-r.renderingStartTime>gd&&n!==536870912&&(t.flags|=128,a=!0,ml(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Be(),e.sibling=null,o=Po.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||W?Fo(t,o):(n=o,be(Do,t),be(Po,n),Oo===null&&(Oo=t)),W&&Yi(t,r.treeForkCount),e}return hl(t),null;case 22:case 23:return No(t),Eo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(hl(t),t.subtreeFlags&6&&(t.flags|=8192)):hl(t),n=t.updateQueue,n!==null&&pl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ye(Va),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ha(Da),hl(t),null;case 25:return null;case 30:return t.flags|=33554432,hl(t),null}throw Error(i(156,t.tag))}function _l(e,t){switch(Zi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ha(Da),Ee(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Oe(t),null;case 31:if(t.memoizedState!==null){if(No(t),t.alternate===null)throw Error(i(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(No(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Io(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ee(),null;case 10:return ha(t.type),null;case 22:case 23:return No(t),Eo(),e!==null&&ye(Va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ha(Da),null;case 25:return null;default:return null}}function vl(e,t){switch(Zi(t),t.tag){case 3:ha(Da),Ee();break;case 26:case 27:case 5:Oe(t);break;case 4:Ee();break;case 31:t.memoizedState!==null&&No(t);break;case 13:No(t);break;case 19:Io(t);break;case 10:ha(t.type);break;case 22:case 23:No(t),Eo(),e!==null&&ye(Va);break;case 24:ha(Da)}}function yl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function bl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function xl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{xo(t,n)}catch(t){Z(e,e.return,t)}}}function Sl(e,t,n){n.props=yc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Cl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=gi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Fp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Ip(e);m(e.child,!1,$p,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function wl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Tl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)tm(e.stateNode,t[n])}function El(e){for(var t=e.return;t!==null&&(kl(t)&&tm(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Dl(e){for(var t=e.return;t!==null&&(kl(t)&&nm(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Ol(e){return e.tag===5||e.tag===3||e.tag===27}function kl(e){return e&&e.tag===7&&e.stateNode!==null}function Al(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function jl(e,t,n){try{var r=e.stateNode;ap(r,e.type,n,t),r[Ct]=t}catch(t){Z(e,e.return,t)}}function Ml(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Cp(e.type)||e.tag===4}function Nl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ml(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Cp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Pl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=vn)),Tl(e,r),Gt=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Cp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Pl(e,t,n,r),e=e.sibling;e!==null;)Pl(e,t,n,r),e=e.sibling}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Tl(e,r),Gt=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Cp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);rp(t,r,n),t[St]=e,t[Ct]=n}catch(t){Z(e,e.return,t)}}var Ll=!1,Rl=null;function zl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Ll=!0)}var Bl=null;function Vl(){var e=Bl;return Bl=null,e}var Hl=0;function Ul(e,t,n,r,i){return Hl=0,Wl(e.child,t,n,r,i)}function Wl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=kp(o);r.push(s),s.view&&(a=!0)}else a||kp(o).view&&(a=!0);Ll=!0,Ep(o,Hl===0?t:t+`_`+Hl,n),Hl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Wl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Gl(e,t){for(;e!==null;)e.tag===5?Dp(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Gl(e.child,t),e=e.sibling}function Kl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Kl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=vi(t.default,t.share),t!==`none`&&(Ul(e,n,t,null,!1)||Gl(e.child,!1))}e=e.sibling}}function ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=gi(r,n),a=vi(r.default,n.paired?r.share:r.enter);a===`none`?Kl(e):Ul(e,i,a,null,!1)?(Kl(e),n.paired||t||Nd(e,r.onEnter)):Gl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ql(e,t),e=e.sibling;else Kl(e)}function Jl(e){if(Rl!==null&&Rl.size!==0){var t=Rl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=vi(n.default,n.share);if(a!==`none`&&(Ul(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Gl(e.child,!1)),t.delete(r),t.size===0)break}}}Jl(e)}e=e.sibling}}}function Yl(e){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode),r=Rl===null?void 0:Rl.get(n),i=vi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Ul(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Rl.delete(n),Nd(e,t.onShare)):Gl(e.child,!1)),Rl!==null&&Jl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Yl(e),e=e.sibling;else Rl!==null&&Jl(e)}function Xl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode);t=vi(t.default,t.update),e.flags&=-5,t!==`none`&&Ul(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Xl(e);e=e.sibling}}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Gl(e.child,!1))}Zl(e)}e=e.sibling}}function Ql(e){if(e.tag===30)e.stateNode.paired=null,Gl(e.child,!1),Zl(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e),e=e.sibling;else Zl(e)}function $l(e){for(e=e.child;e!==null;)e.tag===30?Gl(e.child,!1):e.subtreeFlags&33554432&&$l(e),e=e.sibling}function eu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Hl<a.length){var l=a[Hl],u=kp(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Ep(c,Hl===0?n:n+`_`+Hl,i),s&&e.flags&4||(Bl===null&&(Bl=[]),Bl.push(c,Hl===0?r:r+`_`+Hl,t.memoizedProps)),Hl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:eu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function tu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=gi(n,r),a=vi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Ap)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Hl=0,i=eu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&tu(e,t);e=e.sibling}}var nu=!1,ru=!1,iu=!1,au=!1,ou=typeof WeakSet==`function`?WeakSet:Set,su=null,cu=!1,lu=!1,uu=!1,du=!1;function fu(e,t,n){if(e=e.containerInfo,cp=_h,e=qr(e),Jr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(lp={focusedElem:e,selectionRange:r},_h=!1,n=(n&335544064)===n,su=t,t=n?9270:1024;su!==null;){if(e=su,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Yl(r[a]);if(e.alternate===null&&e.flags&2)n&&zl(e),pu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Yl(r),pu(n);continue}if(r!==null&&r.memoizedState!==null){n&&zl(e),pu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,su=r):(n&&Xl(e),pu(n))}}Rl=null}function pu(e){for(;su!==null;){var t=su,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=yc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)rm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:rm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=gi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=vi(a.default,a.update),a!==`none`&&Ul(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,su=r;break}su=t.return}}function mu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Pu(e,n),r&4&&yl(5,n);break;case 1:if(Pu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=yc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&xl(n),r&512&&Cl(n,n.return);break;case 3:if(Pu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{xo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Il(n);case 26:case 5:Pu(e,n),t===null&&r&4&&Al(n),r&512&&Cl(n,n.return);break;case 12:Pu(e,n);break;case 31:Pu(e,n),r&4&&Cu(e,n);break;case 13:Pu(e,n),r&4&&wu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),lm(e,n))));break;case 22:if(r=n.memoizedState!==null||nu,!r){var a=t!==null&&t.memoizedState!==null||ru;t=nu,i=ru,nu=r,(ru=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Iu(e,n,r)):Pu(e,n),nu=t,ru=i}break;case 30:Pu(e,n),r&512&&Cl(n,n.return);break;case 7:r&512&&Cl(n,n.return);default:Pu(e,n)}}function hu(e,t){for(e=e.child;e!==null;)gu(e,t),e=e.sibling}function gu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}_u(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,Gt=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Tp(s,!0):Tp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&hu(e,t);break;default:hu(e,t)}}function _u(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:gu(n,r);break a;case 22:n.memoizedState===null&&_u(n,r);break a;default:_u(n,r)}}e=e.sibling}}function vu(e){var t=e.alternate;t!==null&&(e.alternate=null,vu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&At(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var yu=null,bu=!1;function xu(e,t,n){for(n=n.child;n!==null;)Su(e,t,n),n=n.sibling}function Su(e,t,n){if(Xe&&typeof Xe.onCommitFiberUnmount==`function`)try{Xe.onCommitFiberUnmount(Ye,n)}catch{}switch(n.tag){case 26:ru||wl(n,t),xu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!ru&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ru||wl(n,t),Dl(n);var r=yu,i=bu;Cp(n.type)&&(yu=n.stateNode,bu=!1),xu(e,t,n),_m(n.stateNode,n.type,n.memoizedProps),yu=r,bu=i;break;case 5:ru||wl(n,t),Dl(n);case 6:if(n.tag===6&&Dl(n),r=yu,i=bu,yu=null,xu(e,t,n),yu=r,bu=i,yu!==null){if(bu)try{(yu.nodeType===9?yu.body:yu.nodeName===`HTML`?yu.ownerDocument.body:yu).removeChild(n.stateNode),Gt=!0}catch(e){Z(n,t,e)}else try{yu.removeChild(n.stateNode),Gt=!0}catch(e){Z(n,t,e)}}break;case 18:yu!==null&&(bu?(e=yu,wp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Uh(e)):wp(yu,n.stateNode));break;case 4:r=yu,i=bu,yu=n.stateNode.containerInfo,bu=!0,xu(e,t,n),yu=r,bu=i;break;case 0:case 11:case 14:case 15:bl(2,n,t),ru||bl(4,n,t),xu(e,t,n);break;case 1:ru||(wl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Sl(n,t,r)),xu(e,t,n);break;case 21:xu(e,t,n);break;case 22:ru=(r=ru)||n.memoizedState!==null,xu(e,t,n),ru=r;break;case 30:wl(n,t),xu(e,t,n);break;case 7:ru||wl(n,t),xu(e,t,n);break;default:xu(e,t,n)}}function Cu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Uh(e)}catch(e){Z(t,t.return,e)}}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Uh(e)}catch(e){Z(t,t.return,e)}}function Tu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ou),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ou),t;default:throw Error(i(435,e.tag))}}function Eu(e,t){var n=Tu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Du(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Cp(l.type)){yu=l.stateNode,bu=!1;break a}break;case 5:yu=l.stateNode,bu=!1;break a;case 3:case 4:yu=l.stateNode.containerInfo,bu=!0;break a}l=l.return}if(yu===null)throw Error(i(160));Su(s,c,o),yu=null,bu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ku(t,e,n),t=t.sibling}var Ou=null;function ku(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Du(t,e,n),Au(e),a&4&&(bl(3,e,e.return),yl(3,e),bl(5,e,e.return));break;case 1:Du(t,e,n),Au(e),a&512&&(ru||r===null||wl(r,r.return)),a&64&&nu&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Ou,Du(t,e,n),Au(e),a&512&&(ru||r===null||wl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(nu)e.stateNode=pp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Ot]||r[St]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),rp(r,t,n),r[St]=e,Ft(r),t=r;break a;case`link`:if(o=Km(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),rp(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Km(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),rp(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[St]=e,Ft(r),t=r}e.stateNode=t}}else nu||qm(o,e.type,e.stateNode)}else e.stateNode=Vm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&jl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||ru||t.parentNode.removeChild(t)):a.count--,n===null?nu||qm(o,e.type,e.stateNode):Vm(o,n,e.memoizedProps))}break;case 27:Du(t,e,n),Au(e),a&512&&(ru||r===null||wl(r,r.return)),r!==null&&a&4&&jl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=iu,iu=!1,Du(t,e,n),iu=o,Au(e),a&512&&(ru||r===null||wl(r,r.return)),e.flags&32){t=e.stateNode;try{un(t,``),Gt=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,jl(e,t,r===null?t:r.memoizedProps)),a&1024&&(au=!0);break;case 6:if(Du(t,e,n),Au(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Gt=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(Gt=!1,Gm=null,o=Ou,Ou=xm(t.containerInfo),Du(t,e,n),Ou=o,Au(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Uh(t.containerInfo)}catch(t){Z(e,e.return,t)}au&&(au=!1,ju(e)),Gt=!1;break;case 4:a=iu,iu=nu,r=Kt(),o=Ou,Ou=xm(e.stateNode.containerInfo),Du(t,e,n),Au(e),Ou=o,Gt&&lu&&(uu=!0),Gt=r,iu=a;break;case 12:Du(t,e,n),Au(e);break;case 31:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 13:Du(t,e,n),Au(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(md=Be()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=nu,l=ru,u=iu;nu=c||o,iu=u||o,ru=l||s,Du(t,e,n),ru=l,iu=u,nu=c,Au(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||nu||ru||(t=s||ru,n=nu,r=ru,nu=o||nu,ru=t,Fu(e,2),nu=n,ru=r),!o&&iu||hu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Eu(e,n))));break;case 19:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 30:a&512&&(ru||r===null||wl(r,r.return)),a=Kt(),o=lu,s=(n&335544064)===n,c=e.memoizedProps,lu=s&&vi(c.default,c.update)!==`none`,Du(t,e,n),Au(e),s&&r!==null&&Gt&&(e.flags|=4),lu=o,Gt=a;break;case 21:break;case 7:a&512&&(ru||r===null||wl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Du(t,e,n),Au(e)}}function Au(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ml(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(kl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Ol(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Fl(e,Nl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(un(l,``),n.flags&=-33),Fl(e,Nl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Pl(e,Nl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ju(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ju(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,_h=!0,t.reset(),_h=!1),e=e.sibling}}function Mu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Nu(t,e),t=t.sibling;else tu(t,!1)}function Nu(e,t){var n=e.alternate;if(n===null)ql(e,!1);else switch(e.tag){case 3:if(du=cu=!1,Vl(),Mu(t,e),!cu&&!uu){if(e=Bl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Dp(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),du=!0}Bl=null;break;case 5:Mu(t,e);break;case 4:r=cu,cu=!1,Mu(t,e),cu&&(uu=!0),cu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Mu(t,e):ql(e,!1));break;case 30:r=cu,i=Vl(),cu=!1,Mu(t,e),cu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=gi(a,o),o=gi(n.memoizedProps,o);var s=vi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Hl=0,t=eu(e,n,t,o,s,a,!0),Hl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Bl=i):i!==null&&(i.push.apply(i,Bl),Bl=i),cu=e.flags&32?!0:r;break;default:Mu(t,e)}}function Pu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)mu(e,t.alternate,t),t=t.sibling}function Fu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:bl(4,n,n.return),Fu(n,r);break;case 1:wl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Sl(n,n.return,i),Fu(n,r);break;case 27:r&2&&_m(n.stateNode,n.type,n.memoizedProps);case 5:wl(n,n.return),n.tag!==5&&n.tag!==27||Dl(n),Fu(n,r);break;case 6:Dl(n);break;case 26:wl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||ru||i.parentNode.removeChild(i),Fu(n,r);break;case 22:n.memoizedState===null&&Fu(n,r);break;case 30:wl(n,n.return),Fu(n,r);break;case 7:wl(n,n.return);default:Fu(n,r)}e=e.sibling}}function Iu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Iu(i,a,n),yl(4,a);break;case 1:if(Iu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)bo(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&xl(a),Cl(a,a.return);break;case 27:n&2&&Il(a);case 5:a.tag!==5&&a.tag!==27||El(a),Iu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 6:El(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||nu||qm(xm(c.ownerDocument),a.type,c),Iu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 12:Iu(i,a,n);break;case 31:Iu(i,a,n),s&&o&4&&Cu(i,a);break;case 13:Iu(i,a,n),s&&o&4&&wu(i,a);break;case 22:a.memoizedState===null&&Iu(i,a,n),Cl(a,a.return);break;case 30:Iu(i,a,n),Cl(a,a.return);break;case 7:Cl(a,a.return);default:Iu(i,a,n)}t=t.sibling}}function Lu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ka(n))}function Ru(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ka(e))}function zu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Bu(e,t,n,r),t=t.sibling;else i&&$l(t)}function Bu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Ql(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:zu(e,t,n,r),a&2048&&yl(9,t);break;case 1:zu(e,t,n,r);break;case 3:zu(e,t,n,r),i&&du&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&ka(a)));break;case 12:if(a&2048){zu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else zu(e,t,n,r);break;case 31:zu(e,t,n,r);break;case 13:zu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&Ql(t),o._visibility&2?zu(e,t,n,r):(o._visibility|=2,Vu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&Ql(s),o._visibility&2?zu(e,t,n,r):Hu(e,t)),a&2048&&Lu(s,t);break;case 24:zu(e,t,n,r),a&2048&&Ru(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Gl(a.child,!0),Gl(t.child,!0))),zu(e,t,n,r);break;default:zu(e,t,n,r)}}function Vu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Vu(a,o,s,c,i),yl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Vu(a,o,s,c,i)):u._visibility&2?Vu(a,o,s,c,i):Hu(a,o),i&&l&2048&&Lu(o.alternate,o);break;case 24:Vu(a,o,s,c,i),i&&l&2048&&Ru(o.alternate,o);break;default:Vu(a,o,s,c,i)}t=t.sibling}}function Hu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Hu(n,r),i&2048&&Lu(r.alternate,r);break;case 24:Hu(n,r),i&2048&&Ru(r.alternate,r);break;default:Hu(n,r)}t=t.sibling}}var Uu=8192;function Wu(e,t,n){if(e.subtreeFlags&Uu)for(e=e.child;e!==null;)Gu(e,t,n),e=e.sibling}function Gu(e,t,n){switch(e.tag){case 26:Wu(e,t,n),e.flags&Uu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Qm(n,e)):$m(n,Ou,e.memoizedState,e.memoizedProps));break;case 5:Wu(e,t,n),e.flags&Uu&&(e=e.stateNode,(t&335544128)===t&&Qm(n,e));break;case 3:case 4:var r=Ou;Ou=xm(e.stateNode.containerInfo),Wu(e,t,n),Ou=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Uu,Uu=16777216,Wu(e,t,n),Uu=r):Wu(e,t,n));break;case 30:if((e.flags&Uu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Rl===null&&(Rl=new Map),Rl.set(r,i)}Wu(e,t,n);break;default:Wu(e,t,n)}}function Ku(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,q(r,e)}Ku(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ju(e),e=e.sibling}function Ju(e){switch(e.tag){case 0:case 11:case 15:qu(e),e.flags&2048&&bl(9,e,e.return);break;case 3:qu(e);break;case 12:qu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Yu(e)):qu(e);break;default:qu(e)}}function Yu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,q(r,e)}Ku(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:bl(8,t,t.return),Yu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Yu(t));break;default:Yu(t)}e=e.sibling}}function q(e,t){for(;su!==null;){var n=su;switch(n.tag){case 0:case 11:case 15:bl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ka(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,su=r;else a:for(n=e;su!==null;){r=su;var i=r.sibling,a=r.return;if(vu(r),r===n){su=null;break a}if(i!==null){i.return=a,su=i;break a}su=a}}}var Xu={getCacheForType:function(e){var t=xa(Da),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return xa(Da).controller.signal}},Zu=typeof WeakMap==`function`?WeakMap:Map,J=0,Qu=null,Y=null,X=0,$u=0,ed=null,td=!1,nd=!1,rd=!1,id=0,ad=0,od=0,sd=0,cd=0,ld=0,ud=0,dd=null,fd=null,pd=!1,md=0,hd=0,gd=1/0,_d=null,vd=null,yd=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return J&2&&X!==0?X&-X:I.T===null?yt():Pf()}function Md(){if(ld===0){if(!(X&536870912)||W){var e=rt;rt<<=1,!(rt&3932160)&&(rt=262144),ld=e}else ld=536870912}return e=Do.current,e!==null&&(e.flags|=32),ld}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Fp(gi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===Qu&&($u===2||$u===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,X,ld,!1)),ft(e,n),J&2&&e===Qu||(e===Qu&&(!(J&2)&&(sd|=n),ad===4&&Rd(e,X,ld,!1)),Ef(e))}function Fd(e,t,n){if(J&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||st(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){nd&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=dd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(rd&&!l){c.errorRecoveryDisabledLanes|=o,sd|=o,a=4;break a}o=fd,fd=a,o!==null&&(fd===null?fd=o:fd.push.apply(fd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ld,!td);break a;case 2:fd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=md+300-Be(),10<a)){if(Rd(r,t,ld,!td),ot(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=_p(Id.bind(null,r,n,fd,_d,pd,t,ld,sd,ud,td,o,`Throttled`,-0,0),a);break a}Id(r,n,fd,_d,pd,t,ld,sd,ud,td,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vn},Rl=null,Gu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=rh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?md-Be():(a&4194048)===a?hd-Be():0,m=th(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Vr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=ct(e,t),t&=~cd,t&=~sd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&mt(e,n,t)}function zd(){return J&6?!0:(Df(0,!1),!1)}function Bd(){if(Y!==null){if($u===0)var e=Y.return;else e=Y,pa=fa=null,ns(e),to=null,no=0,e=Y;for(;e!==null;)vl(e.alternate,e),e=e.return;Y=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,vp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),Qu=e,Y=n=Mi(e.current,null),X=t,$u=0,ed=null,td=!1,nd=st(e,t),rd=!1,ud=ld=cd=sd=od=ad=0,fd=dd=null,pd=!1,id=ct(e,t),Si(),n}function Hd(e,t){G=null,I.H=dc,t===Ga||t===qa?(t=$a(),$u=3):t===Ka?(t=$a(),$u=4):$u=t===kc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,ed=t,Y===null&&(ad=1,Cc(e,zi(t,e.current)))}function Ud(){var e=Do.current;return e===null?!0:(X&4194048)===X?Oo===null:(X&62914560)===X||X&536870912?e===Oo:!1}function Wd(){var e=I.H;return I.H=dc,e===null?dc:e}function Gd(){var e=I.A;return I.A=Xu,e}function Kd(){ad=4,td||(X&4194048)!==X&&Do.current!==null||(nd=!0),!(od&134217727)&&!(sd&134217727)||Qu===null||Rd(Qu,X,ld,!1)}function qd(e,t,n){var r=J;J|=2;var i=Wd(),a=Gd();(Qu!==e||X!==t)&&(_d=null,Vd(e,t)),t=!1;var o=ad;a:do try{if($u!==0&&Y!==null){var s=Y,c=ed;switch($u){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Do.current===null&&(t=!0);var l=$u;if($u=0,ed=null,$d(e,s,c,l),n&&nd){o=0;break a}break;default:l=$u,$u=0,ed=null,$d(e,s,c,l)}}Jd(),o=ad;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,pa=fa=null,J=r,I.H=i,I.A=a,Y===null&&(Qu=null,X=0,Si()),o}function Jd(){for(;Y!==null;)Zd(Y)}function Yd(e,t){var n=J;J|=2;var r=Wd(),a=Gd();Qu!==e||X!==t?(_d=null,gd=Be()+500,Vd(e,t)):nd=st(e,t);a:do try{if($u!==0&&Y!==null){t=Y;var o=ed;b:switch($u){case 1:$u=0,ed=null,$d(e,t,o,1);break;case 2:case 9:if(Ya(o)){$u=0,ed=null,Qd(t);break}t=function(){$u!==2&&$u!==9||Qu!==e||($u=7),Ef(e)},o.then(t,t);break a;case 3:$u=7;break a;case 4:$u=5;break a;case 7:Ya(o)?($u=0,ed=null,Qd(t)):($u=0,ed=null,$d(e,t,o,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var c=Y;if(s?Xm(s):c.stateNode.complete){$u=0,ed=null;var l=c.sibling;if(l!==null)Y=l;else{var u=c.return;u===null?Y=null:(Y=u,ef(u))}break b}}$u=0,ed=null,$d(e,t,o,5);break;case 6:$u=0,ed=null,$d(e,t,o,6);break;case 8:Bd(),ad=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return pa=fa=null,I.H=r,I.A=a,J=n,Y===null?(Qu=null,X=0,Si(),ad):0}function Xd(){for(;Y!==null&&!Re();)Zd(Y)}function Zd(e){var t=ll(e.alternate,e,id);e.memoizedProps=e.pendingProps,t===null?ef(e):Y=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Uc(n,t,t.pendingProps,t.type,void 0,X);break;case 11:t=Uc(n,t,t.pendingProps,t.type.render,t.ref,X);break;case 5:ns(t);var r=t;r===$i&&(W?(oa(r),r.tag===5&&r.stateNode!=null&&(ea=r.stateNode)):(oa(r),W=!0));default:vl(n,t),t=Y=Ni(t,id),t=ll(n,t,id)}e.memoizedProps=e.pendingProps,t===null?ef(e):Y=t}function $d(e,t,n,r){pa=fa=null,ns(t),to=null,no=0;var i=t.return;try{if(Oc(e,i,t,n,X)){ad=1,Cc(e,zi(n,e.current)),Y=null;return}}catch(t){if(i!==null)throw Y=i,t;ad=1,Cc(e,zi(n,e.current)),Y=null;return}t.flags&32768?(W||r===1?e=!0:nd||X&536870912?e=!1:(td=e=!0,(r===2||r===9||r===3||r===6)&&(r=Do.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,td);return}e=t.return;var n=gl(t.alternate,t,id);if(n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);ad===0&&(ad=5)}function tf(e,t){do{var n=_l(e.alternate,e);if(n!==null){n.flags&=32767,Y=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Y=e;return}Y=e=n}while(e!==null);ad=6,Y=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(yd!==0);if(J&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===Qu&&(Y=Qu=null,X=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=V,pt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ma(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(We,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Ll=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=I.T,I.T=null,i=L.p,L.p=2,a=J,J|=4;try{fu(e,t,n)}finally{J=a,L.p=i,I.T=r}}yd=1,Ll?Ed=Np(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(yd!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){yd===3&&(yd=0,Nu(xd,bd),yd=4)}function sf(){if(yd===1){yd=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=I.T,I.T=null;var i=L.p;L.p=2;var a=J;J|=4;try{lu=uu=!1,ku(t,e,n),n=lp;var o=qr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Kr(s.ownerDocument.documentElement,s)){if(c!==null&&Jr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Gr(s,h),v=Gr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}_h=!!cp,lp=cp=null}finally{J=a,L.p=i,I.T=r}}e.current=t,yd=2}}function cf(){if(yd===2){yd=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=I.T,I.T=null;var r=L.p;L.p=2;var i=J;J|=4;try{mu(e,t.alternate,t)}finally{J=i,L.p=r,I.T=n}}yd=3}}function lf(){if(yd===4||yd===3){yd=0;var e=Ed;Ed=null,ze();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?yd=5:(yd=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(vd=null),vt(r),n=n.stateNode,Xe&&typeof Xe.onCommitFiberRoot==`function`)try{Xe.onCommitFiberRoot(Ye,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=I.T,a=L.p,L.p=2,I.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{I.T=n,L.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ka(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(yd!==5)return!1;var e=bd,t=Cd;Cd=0;var n=vt(Sd),r=I.T,a=L.p;try{L.p=32>n?32:n,I.T=null,n=wd,wd=null;var o=bd,s=Sd;if(yd=0,xd=bd=null,Sd=0,J&6)throw Error(i(331));var c=J;if(J|=4,Ju(o.current),Bu(o,o.current,s,n),J=c,Df(0,!1),Xe&&typeof Xe.onPostCommitFiberRoot==`function`)try{Xe.onPostCommitFiberRoot(Ye,o)}catch{}return!0}finally{L.p=a,I.T=r,uf(e,t)}}function pf(e,t,n){t=zi(n,t),t=Tc(e.stateNode,t,2),e=mo(e,t,2),e!==null&&(ft(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(vd===null||!vd.has(r))){e=zi(n,e),n=Ec(2),r=mo(t,n,2),r!==null&&(Dc(n,r,t,e),ft(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Zu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(rd=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Qu===e&&(X&n)===n&&(ad===4||ad===3&&(X&62914560)===X&&300>Be()-md?J&2?cd|=n:Vd(e,0):cd|=n,ud===X&&(ud=0)),Ef(e)}function gf(e,t){t===0&&(t=ut()),e=Ti(e,t),e!==null&&(ft(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Ie(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=X,a=ot(r,r===Qu?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||st(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&gp()&&(e=Tf);for(var t=Be(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}yd!==0&&yd!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=lt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Qu,n=X,n=ot(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&($u===2||$u===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Le(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||st(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Le(r),vt(n)){case 2:case 8:n=Ue;break;case 32:n=We;break;case 268435456:n=Ke;break;default:n=We}return r=jf.bind(null,e),n=Ie(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Le(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(yd!==0&&yd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=X;return r=ot(e,e===Qu?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Be()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){xp(function(){J&6?Ie(He,Of):kf()})}function Pf(){if(Tf===0){var e=Fa;e===0&&(e=nt,nt<<=1,!(nt&261888)&&(nt=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:_n(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Ct]||null).action),o=r.submitter;o&&(t=(t=o[Ct]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new zn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);Zs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Zs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<mi.length;Lf++){var Rf=mi[Lf];hi(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}hi(oi,`onAnimationEnd`),hi(si,`onAnimationIteration`),hi(ci,`onAnimationStart`),hi(`dblclick`,`onDoubleClick`),hi(`focusin`,`onFocus`),hi(`focusout`,`onBlur`),hi(li,`onTransitionRun`),hi(ui,`onTransitionStart`),hi(di,`onTransitionCancel`),hi(fi,`onTransitionEnd`),Bt(`onMouseEnter`,[`mouseout`,`mouseover`]),Bt(`onMouseLeave`,[`mouseout`,`mouseover`]),Bt(`onPointerEnter`,[`pointerout`,`pointerover`]),Bt(`onPointerLeave`,[`pointerout`,`pointerover`]),zt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),zt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),zt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),zt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),zt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),zt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Tt];n===void 0&&(n=t[Tt]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Lt.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(wh(t)){case 2:var i=vh;break;case 8:i=yh;break;default:i=bh}n=i.bind(null,t,n,e),i=void 0,!On||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=jt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Tn(function(){var r=a,i=bn(n),s=[];a:{var c=pi.get(e);if(c!==void 0){var l=zn,u=e;switch(e){case`keypress`:if(Pn(n)===0)break a;case`keydown`:case`keyup`:l=rr;break;case`focusin`:u=`focus`,l=Jn;break;case`focusout`:u=`blur`,l=Jn;break;case`beforeblur`:case`afterblur`:l=Jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=qn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=or;break;case oi:case si:case ci:l=Yn;break;case fi:l=sr;break;case`scroll`:case`scrollend`:l=Vn;break;case`wheel`:l=cr;break;case`copy`:case`cut`:case`paste`:l=Xn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=ir;break;case`submit`:l=ar;break;case`toggle`:case`beforetoggle`:l=lr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=En(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==yn&&(u=n.relatedTarget||n.fromElement)&&(jt(u)||u[wt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?jt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Kn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=ir,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Nt(c),h=l==null?u:Nt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,jt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Nt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=kr;else if(Cr(c)){if(Ar)_=zr;else{_=Lr;var v=Ir}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&mn(r.elementType)&&(_=kr):_=Rr;if(_&&=_(e,r)){wr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Nt(r):window,e){case`focusin`:(Cr(v)||v.contentEditable===`true`)&&(Xr=v,Zr=r,Qr=null);break;case`focusout`:Qr=Zr=Xr=null;break;case`mousedown`:$r=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:$r=!1,ei(s,n,i);break;case`selectionchange`:if(Yr)break;case`keydown`:case`keyup`:ei(s,n,i)}var y;if(dr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else yr?_r(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(mr&&n.locale!==`ko`&&(yr||b!==`onCompositionStart`?b===`onCompositionEnd`&&yr&&(y=Nn()):(An=i,jn=`value`in An?An.value:An.textContent,yr=!0)),v=Jf(r,b),0<v.length&&(b=new Zn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=vr(n),y!==null&&(b.data=y)))),(y=pr?br(e,n):xr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new Zn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=En(e,n),i!=null&&r.unshift(qf(e,i,a)),i=En(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=En(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=En(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function tp(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||un(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&un(e,``+r);else return;break;case`className`:Jt(e,`class`,r);break;case`tabIndex`:Jt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Jt(e,n,r);break;case`style`:pn(e,r,o);return;case`data`:if(t!==`object`){Jt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=_n(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&tp(e,t,`name`,a.name,a,null),tp(e,t,`formEncType`,a.formEncType,a,null),tp(e,t,`formMethod`,a.formMethod,a,null),tp(e,t,`formTarget`,a.formTarget,a,null)):(tp(e,t,`encType`,a.encType,a,null),tp(e,t,`method`,a.method,a,null),tp(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=_n(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=vn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=_n(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),qt(e,`popover`,r);break;case`xlinkActuate`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Yt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Yt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:qt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=hn.get(n)||n,qt(e,n,r);else return}Gt=!0}function np(e,t,n,r,a,o){switch(n){case`style`:pn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)un(e,r);else if(typeof r==`number`||typeof r==`bigint`)un(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=vn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Rt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Ct]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}Gt=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):qt(e,n,r)}return}Gt=!0}function rp(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:tp(e,t,o,s,n,null)}}a&&tp(e,t,`srcSet`,n.srcSet,n,null),r&&tp(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:tp(e,t,r,d,n,null)}}an(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:tp(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&sn(e,!!r,n,!0):sn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:tp(e,t,s,c,n,null)}ln(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:tp(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:tp(e,t,u,r,n,null)}return;default:if(mn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&np(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&tp(e,t,c,r,n,null))}var ip={};function ap(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||tp(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(Gt=!0),o=m;break;case`name`:m!==f&&(Gt=!0),a=m;break;case`checked`:m!==f&&(Gt=!0),u=m;break;case`defaultChecked`:m!==f&&(Gt=!0),d=m;break;case`value`:m!==f&&(Gt=!0),s=m;break;case`defaultValue`:m!==f&&(Gt=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&tp(e,t,p,m,r,f)}}rn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||tp(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(Gt=!0),p=o;break;case`defaultValue`:o!==l&&(Gt=!0),c=o;break;case`multiple`:o!==l&&(Gt=!0),s=o;default:o!==l&&tp(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?sn(e,!!n,n?[]:``,!1):sn(e,!!n,t,!0)):sn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:tp(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(Gt=!0),p=a;break;case`defaultValue`:a!==o&&(Gt=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&tp(e,t,s,a,r,o)}cn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:tp(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(Gt=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:tp(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&tp(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:tp(e,t,u,p,r,m)}return;default:if(mn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&np(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||np(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&tp(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||tp(e,t,f,p,r,m)}function op(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function sp(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&op(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&op(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var cp=null,lp=null;function up(e){return e.nodeType===9?e:e.ownerDocument}function dp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function fp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function pp(e,t,n,r){return n=up(n).createElement(e),n[St]=r,n[Ct]=t,rp(n,e,t),Ft(n),n}function mp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hp=null;function gp(){var e=window.event;return e&&e.type===`popstate`?e!==hp&&(hp=e,!0):(hp=null,!1)}var _p=typeof setTimeout==`function`?setTimeout:void 0,vp=typeof clearTimeout==`function`?clearTimeout:void 0,yp=typeof Promise==`function`?Promise:void 0,bp=typeof requestAnimationFrame==`function`?requestAnimationFrame:_p,xp=typeof queueMicrotask==`function`?queueMicrotask:yp===void 0?_p:function(e){return yp.resolve(null).then(e).catch(Sp)};function Sp(e){setTimeout(function(){throw e})}function Cp(e){return e===`head`}function wp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Uh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)vm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,vm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ot]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&vm(e.ownerDocument.body)}n=i}while(n);Uh(t)}function Tp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Ep(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Dp(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Op(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function kp(e){return Op(e.getBoundingClientRect(),getComputedStyle(e),e)}function Ap(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Op(t,n,e)}function jp(e){return e.documentElement.clientHeight}function Mp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Np(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(jp(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Zm(f),u>eh){s.length=o;break}f=new Promise(Mp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Pp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Pp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Pp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Pp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Fp(e){return{name:e,group:new Pp(`group`,e),imagePair:new Pp(`image-pair`,e),old:new Pp(`old`,e),new:new Pp(`new`,e)}}function Ip(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Ip.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Vp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=zp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Lp,e,s,r)}this._eventListeners=a}};function Lp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Ip.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Vp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=zp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Rp,e,n,i),r.splice(t,1),a!==null&&a()}};function Rp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function zp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Bp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Vp(e,t,n,r){if(e.length===0)return-1;r=Bp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Bp(a.optionsOrUseCapture)===r)return i}return-1}Ip.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,zp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,zp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Ip.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Hp,e,void 0,void 0)};function Hp(e,t){return e.tag!==6&&(e=b(e),mm(e,t))}Ip.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Up,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Hp(t[n],e);n--);};function Up(e,t){return t.push(e),!1}Ip.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=up(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,Wp,e,void 0,void 0))};function Wp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Ip.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Gp,e,void 0,void 0)};function Gp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Ip.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Kp,e,void 0,void 0);for(var n=t=0;n<qp.length;n++){var r=qp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):qp[t++]=r}qp.length=t}};function Kp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var qp=[],Jp=!1;function Yp(e,t,n){qp.push({fragmentInstance:e,observer:t,instance:n}),Jp||(Jp=!0,hm(function(){Jp=!1;var e=qp;qp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Ip.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,Xp,e,void 0,void 0),e};function Xp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Ip.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Ip.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Up,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Zp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Zp(e,t,n,r,i){var a=jt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Qp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Ip.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Up,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Qp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Qp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function $p(e,t){return e=b(e),em(e,t),!1}function em(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,zp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<qp.length;i++){var a=qp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(qp[r++]=a)}qp.length=r,n.observe(e)}),em(e,t))}function nm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,zp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Yp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function rm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:rm(n),At(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function im(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Ot])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=um(e.nextSibling),e===null)break}return null}function am(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=um(e.nextSibling),e===null))return null;return e}function om(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=um(e.nextSibling),e===null))return null;return e}function sm(e){return e.data===`$?`||e.data===`$~`}function cm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function lm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function um(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var dm=null;function fm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return um(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function pm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function mm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function hm(e){bp(function(){bp(function(t){return e(t)})})}function gm(e,t,n){switch(t=up(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function _m(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&tp(e,t,r,null,ip,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===vn&&(e.onclick=null),At(e)}function vm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);At(e)}var ym=new Map,bm=new Set;function xm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Sm=L.d;L.d={f:Cm,r:wm,D:Dm,C:Om,L:km,m:Am,X:Mm,S:jm,M:Nm};function Cm(){var e=Sm.f(),t=zd();return e||t}function wm(e){var t=Mt(e);t!==null&&t.tag===5&&t.type===`form`?$s(t):Sm.r(e)}var Tm=typeof document>`u`?null:document;function Em(e,t,n){var r=Tm;if(r&&typeof t==`string`&&t){var i=nn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),bm.has(i)||(bm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),rp(t,`link`,e),Ft(t),r.head.appendChild(t)))}}function Dm(e){Sm.D(e),Em(`dns-prefetch`,e,null)}function Om(e,t){Sm.C(e,t),Em(`preconnect`,e,t)}function km(e,t,n){Sm.L(e,t,n);var r=Tm;if(r&&e&&t){var i=`link[rel="preload"][as="`+nn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+nn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+nn(n.imageSizes)+`"]`)):i+=`[href="`+nn(e)+`"]`;var a=i;switch(t){case`style`:a=Fm(e);break;case`script`:a=zm(e)}if(!(ym.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),ym.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Im(a))||t===`script`&&r.querySelector(Bm(a))))){var o=r.createElement(`link`);rp(o,`link`,e),t===`style`&&(o[kt]=!0,o.onload=o.onerror=function(){It(o)}),Ft(o),r.head.appendChild(o)}}}function Am(e,t){Sm.m(e,t);var n=Tm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+nn(r)+`"][href="`+nn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=zm(e)}if(!ym.has(a)&&(e=D({rel:`modulepreload`,href:e},t),ym.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Bm(a)))return}r=n.createElement(`link`),rp(r,`link`,e),Ft(r),n.head.appendChild(r)}}}function jm(e,t,n){Sm.S(e,t,n);var r=Tm;if(r&&e){var i=Pt(r).hoistableStyles,a=Fm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Im(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=ym.get(a))&&Um(e,n);var c=o=r.createElement(`link`);Ft(c),rp(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Hm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Mm(e,t){Sm.X(e,t);var n=Tm;if(n&&e){var r=Pt(n).hoistableScripts,i=zm(e),a=r.get(i);a||(a=n.querySelector(Bm(i)),a||(e=D({src:e,async:!0},t),(t=ym.get(i))&&Wm(e,t),a=n.createElement(`script`),Ft(a),rp(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t){Sm.M(e,t);var n=Tm;if(n&&e){var r=Pt(n).hoistableScripts,i=zm(e),a=r.get(i);a||(a=n.querySelector(Bm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=ym.get(i))&&Wm(e,t),a=n.createElement(`script`),Ft(a),rp(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Pm(e,t,n,r){var a=(a=Ce.current)?xm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Fm(n.href),t=Pt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Fm(n.href);var o=Pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Im(e)))?o._p||(s.instance=o,s.state.loading=5):(o=ym.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ym.set(e,o)),Rm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=zm(n),t=Pt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Fm(e){return`href="`+nn(e)+`"`}function Im(e){return`link[rel="stylesheet"][`+e+`]`}function Lm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Rm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[kt]){r.loading=1;return}}else t=e.createElement(`link`),t[kt]=!0,t.onload=t.onerror=It.bind(null,t),rp(t,`link`,n),Ft(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function zm(e){return`[src="`+nn(e)+`"]`}function Bm(e){return`script[async]`+e}function Vm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+nn(n.href)+`"]`);if(r)return t.instance=r,Ft(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ft(r),rp(r,`style`,a),Hm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Fm(n.href);var o=e.querySelector(Im(a));if(o)return t.state.loading|=4,t.instance=o,Ft(o),o;r=Lm(n),(a=ym.get(a))&&Um(r,a),o=(e.ownerDocument||e).createElement(`link`),Ft(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),rp(o,`link`,r),t.state.loading|=4,Hm(o,n.precedence,e),t.instance=o;case`script`:return o=zm(n.src),(a=e.querySelector(Bm(o)))?(t.instance=a,Ft(a),a):(r=n,(a=ym.get(o))&&(r=D({},n),Wm(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ft(a),rp(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Hm(r,n.precedence,e));return t.instance}function Hm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Wm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Gm=null;function Km(e,t,n){if(Gm===null){var r=new Map,i=Gm=new Map;i.set(n,r)}else i=Gm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ot]||a[St]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function qm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Jm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Ym(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Xm(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Zm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Qm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Zm(t),e.suspenseyImages.push(t)),e=ih.bind(e),t.decode().then(e,e))}function $m(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Fm(r.href),a=t.querySelector(Im(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=rh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ft(a);return}a=t.ownerDocument||t,r=Lm(r),(i=ym.get(i))&&Um(r,i),a=a.createElement(`link`),Ft(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),rp(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=rh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var eh=0;function th(e,t){return e.stylesheets&&e.count===0&&oh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&oh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&eh===0&&(eh=62500*sp());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&oh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>eh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function nh(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)oh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function rh(){this.count--,nh(this)}function ih(){this.imgCount--,nh(this)}var ah=null;function oh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ah=new Map,t.forEach(sh,e),ah=null,rh.call(e))}function sh(e,t){if(!(t.state.loading&4)){var n=ah.get(e);if(n)var r=n.get(null);else{n=new Map,ah.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=rh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var ch={$$typeof:P,Provider:null,Consumer:null,_currentValue:he,_currentValue2:he,_threadCount:0};function lh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=dt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dt(0),this.hiddenUpdates=dt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function uh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new lh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ai(3,null,null,t),e.current=a,a.stateNode=e,t=Oa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},uo(a),e}function dh(e){return e?(e=Oi,e):Oi}function fh(e,t,n,r,i,a){i=dh(i),r.context===null?r.context=i:r.pendingContext=i,r=po(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=mo(e,r,t),n!==null&&(Pd(n,e,t),ho(n,e,t))}function ph(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function mh(e,t){ph(e,t),(e=e.alternate)&&ph(e,t)}function hh(e){if(e.tag===13||e.tag===31){var t=Ti(e,67108864);t!==null&&Pd(t,e,67108864),mh(e,67108864)}}function gh(e){if(e.tag===13||e.tag===31){var t=jd();t=_t(t);var n=Ti(e,t);n!==null&&Pd(n,e,t),mh(e,t)}}var _h=!0;function vh(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=2,bh(e,t,n,r)}finally{L.p=a,I.T=i}}function yh(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=8,bh(e,t,n,r)}finally{L.p=a,I.T=i}}function bh(e,t,n,r){if(_h){var i=xh(r);if(i===null)Kf(e,t,r,Sh,n),Nh(e,r);else if(Fh(i,e,t,n,r))r.stopPropagation();else if(Nh(e,r),t&4&&-1<Mh.indexOf(e)){for(;i!==null;){var a=Mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=at(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Qe(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(J&6)&&(gd=Be()+500,Df(0,!1))}}break;case 31:case 13:s=Ti(a,2),s!==null&&Pd(s,a,2),zd(),mh(a,2)}if(a=xh(r),a===null&&Kf(e,t,r,Sh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function xh(e){return e=bn(e),Ch(e)}var Sh=null;function Ch(e){if(Sh=null,e=jt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Sh=e,null}function wh(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ve()){case He:return 2;case Ue:return 8;case We:case Ge:return 32;case Ke:return 268435456;default:return 32}default:return 32}}var Th=!1,Eh=null,Dh=null,Oh=null,kh=new Map,Ah=new Map,jh=[],Mh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Nh(e,t){switch(e){case`focusin`:case`focusout`:Eh=null;break;case`dragenter`:case`dragleave`:Dh=null;break;case`mouseover`:case`mouseout`:Oh=null;break;case`pointerover`:case`pointerout`:kh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:Ah.delete(t.pointerId)}}function Ph(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Mt(t),t!==null&&hh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Fh(e,t,n,r,i){switch(t){case`focusin`:return Eh=Ph(Eh,e,t,n,r,i),!0;case`dragenter`:return Dh=Ph(Dh,e,t,n,r,i),!0;case`mouseover`:return Oh=Ph(Oh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return kh.set(a,Ph(kh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,Ah.set(a,Ph(Ah.get(a)||null,e,t,n,r,i)),!0}return!1}function Ih(e){var t=jt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,bt(e.priority,function(){gh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,bt(e.priority,function(){gh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Lh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=xh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);yn=r,n.target.dispatchEvent(r),yn=null}else return t=Mt(n),t!==null&&hh(t),e.blockedOn=n,!1;t.shift()}return!0}function Rh(e,t,n){Lh(e)&&n.delete(t)}function zh(){Th=!1,Eh!==null&&Lh(Eh)&&(Eh=null),Dh!==null&&Lh(Dh)&&(Dh=null),Oh!==null&&Lh(Oh)&&(Oh=null),kh.forEach(Rh),Ah.forEach(Rh)}function Bh(e,n){e.blockedOn===n&&(e.blockedOn=null,Th||(Th=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,zh)))}var Vh=null;function Hh(e){Vh!==e&&(Vh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Vh===e&&(Vh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Ch(r||n)===null)continue;break}var a=Mt(n);a!==null&&(e.splice(t,3),t-=3,Zs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Uh(e){function t(t){return Bh(t,e)}Eh!==null&&Bh(Eh,e),Dh!==null&&Bh(Dh,e),Oh!==null&&Bh(Oh,e),kh.forEach(t),Ah.forEach(t);for(var n=0;n<jh.length;n++){var r=jh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<jh.length&&(n=jh[0],n.blockedOn===null);)Ih(n),n.blockedOn===null&&jh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Ct]||null;if(typeof a==`function`)o||Hh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Ct]||null)s=o.formAction;else if(Ch(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Hh(n)}}}function Wh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Gh(e){this._internalRoot=e}Kh.prototype.render=Gh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;fh(n,jd(),e,t,null,null)},Kh.prototype.unmount=Gh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;fh(e.current,2,null,e,null,null),zd(),t[wt]=null}};function Kh(e){this._internalRoot=e}Kh.prototype.unstable_scheduleHydration=function(e){if(e){var t=yt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<jh.length&&t!==0&&t<jh[n].priority;n++);jh.splice(n,0,e),n===0&&Ih(e)}};var qh=n.version;if(qh!==`19.3.1`)throw Error(i(527,qh,`19.3.1`));L.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Jh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:I,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Yh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yh.isDisabled&&Yh.supportsFiber)try{Ye=Yh.inject(Jh),Xe=Yh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=bc,s=xc,c=Sc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=uh(e,1,!1,null,null,n,r,null,o,s,c,Wh),e[wt]=t.current,Wf(e),new Gh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,j=10**120*8,M=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),ee=[M(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),M(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),M(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:6}),M(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),M(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),M(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:3,clockSpeedPower:2}),M(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:5}),M(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),M(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),M(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),M(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),M(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),M(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),M(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),M(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),M(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:30}),M(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),M(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),M(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),M(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:j,levers:{clockSpeedPower:.5}}],N=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),P=ee.map(e=>({...e,rule:[e.rule,N(e.levers)].filter(Boolean).join(` `)})),te=.5,ne=1e3,re=.01,F=1e3,ie=1e6,ae=.05,oe=.02,se=Object.fromEntries(P.map(e=>[e.id,e])),ce=new Set(P.map(e=>e.id)),le={enabled:!0},ue={enabled:!0},de=.05,fe=[1,2,3,4,5,6,7,8,9,10],pe=[{id:`firstSession`,name:`First session`,boostArea:`foundry`},{id:`foundry`,name:`Foundry`,boostArea:`foundry`},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`},{id:`levelPower`,name:`Level power`,boostArea:`factory`},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`}],me=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],I=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...b.flatMap((e,t)=>[1,2].map(n=>({id:`pool${String(t+1).padStart(2,`0`)}Reset${n===1?`I`:`II`}`,name:`${e.symbol} Reclamation ${n===1?`I`:`II`}`,group:`foundry`,trigger:`Compact the ${e.symbol} pool ${n===1?`once`:`twice`}`,bonus:`The ${n===1?`first`:`second`} disk-size exponent step now closes 10% of the gap to 1.0`,condition:{kind:`poolExponentBonus`,poolIndex:t+1,min:n}}))),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:me[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,name:`Spent QB`,group:`tierLadder`,trigger:`Spend all your Quettabytes after earning some in the same run`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`lastTierSpent`}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,condition:{kind:`overclocked`}},...fe.map((e,t)=>({id:`levelPower${t+1}`,name:`${b[e-1].symbol} Level 10`,group:`levelPower`,trigger:`Reach level 10 on ${b[e-1].name} (9 levels completed)`,bonus:`The per-level production multiplier rises by ${de} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:10}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}}].map(e=>({secret:!1,platformDependent:!1,bonus:null,...e})),L=Object.fromEntries(I.map(e=>[e.id,e])),he=1024,ge=1e3,_e=8*ge**2/10,ve=(e=1)=>({startBits:8,endBits:8/10*ge**(Math.max(1,Math.floor(Number(e)||1))+1)}),ye=.5,be=.9,xe=8e3,Se=1e3,Ce=8*he,we=8e3,Te=_e/2,Ee=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],De={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},Oe=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],ke=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],R=[1,10,100],Ae=[9,9,9],je=1e3,Me=[1,10,100,je],Ne=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],Pe=10*R.length,Fe=[1,10,100,1e3],Ie=.5,Le=86400,Re=14400,ze=14400,Be=[4,40,400,4e3,4e4],Ve=2e3,He=1024,Ue=1.1,We=.01,Ge=.1,Ke=Math.floor(Math.log2(He)),qe=.9,Je=.01,Ye={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},Xe={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},Ze={baseCost:100,baseSeconds:16},Qe=.01,$e=.1,et=.01,tt=.01,nt=.1,rt=1e3,it=1e30,at=1e-4,ot=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],st=Object.assign(Object.create(null),Object.fromEntries(ot.map(e=>[e.id,e]))),ct=Object.assign(Object.create(null),Object.fromEntries(ot.map((e,t)=>[e.id,t]))),lt=k,ut=1e-5,dt=`-ms-`,ft=`-moz-`,pt=`-webkit-`,mt=`comm`,ht=`rule`,gt=`decl`,_t=`@import`,vt=`@namespace`,yt=`@keyframes`,bt=`@layer`,xt=Math.abs,St=String.fromCharCode,Ct=Object.assign;function wt(e,t){return Ot(e,0)^45?(((t<<2^Ot(e,0))<<2^Ot(e,1))<<2^Ot(e,2))<<2^Ot(e,3):0}function Tt(e){return e.trim()}function Et(e,t){return(e=t.exec(e))?e[0]:e}function z(e,t,n){return e.replace(t,n)}function Dt(e,t,n){return e.indexOf(t,n)}function Ot(e,t){return e.charCodeAt(t)|0}function kt(e,t,n){return e.slice(t,n)}function At(e){return e.length}function jt(e){return e.length}function Mt(e,t){return t.push(e),e}function Nt(e,t){return e.map(t).join(``)}function Pt(e,t){return e.filter(function(e){return!Et(e,t)})}var Ft=1,It=1,Lt=0,Rt=0,zt=0,Bt=``;function Vt(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Ft,column:It,length:o,return:``,siblings:s}}function Ht(e,t){return Ct(Vt(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Ut(e){for(;e.root;)e=Ht(e.root,{children:[e]});Mt(e,e.siblings)}function Wt(){return zt}function Gt(){return zt=Rt>0?Ot(Bt,--Rt):0,It--,zt===10&&(It=1,Ft--),zt}function Kt(){return zt=Rt<Lt?Ot(Bt,Rt++):0,It++,zt===10&&(It=1,Ft++),zt}function qt(){return Ot(Bt,Rt)}function Jt(){return Rt}function Yt(e,t){return kt(Bt,e,t)}function Xt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Zt(e){return Ft=It=1,Lt=At(Bt=e),Rt=0,[]}function Qt(e){return Bt=``,e}function $t(e){return Tt(Yt(Rt-1,nn(e===91?e+2:e===40?e+1:e)))}function en(e){for(;(zt=qt())&&zt<33;)Kt();return Xt(e)>2||Xt(zt)>3?``:` `}function tn(e,t){for(;--t&&Kt()&&!(zt<48||zt>102||zt>57&&zt<65||zt>70&&zt<97););return Yt(e,Jt()+(t<6&&qt()==32&&Kt()==32))}function nn(e){for(;Kt();)switch(zt){case e:return Rt;case 34:case 39:e!==34&&e!==39&&nn(zt);break;case 40:e===41&&nn(e);break;case 92:Kt()}return Rt}function rn(e,t){for(;Kt()&&e+zt!==57&&(e+zt!==84||qt()!==47););return`/*`+Yt(t,Rt-1)+`*`+St(e===47?e:Kt())}function an(e){for(;!Xt(qt());)Kt();return Yt(e,Rt)}function on(e){return Qt(sn(``,null,null,null,[``],e=Zt(e),0,[0],e))}function sn(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Kt()){case 40:if(m!=108&&Ot(C,d-1)==58){Dt(C+=z($t(v),`&`,`&\f`),`&\f`,xt(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=$t(v);break;case 9:case 10:case 13:case 32:C+=en(m);break;case 92:C+=tn(Jt()-1,7);continue;case 47:switch(qt()){case 42:case 47:Mt(ln(rn(Kt(),Jt()),t,n,c),c),(Xt(m||1)==5||Xt(qt()||1)==5)&&At(C)&&kt(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=At(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=z(C,/\f/g,``)),p>0&&(At(C)-d||h===0&&m===47)&&Mt(p>32?un(C+`;`,r,n,d-1,c):un(z(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Mt(S=cn(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)sn(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(Ot(C,3)===110)break;case 108:if(Ot(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?sn(e,S,S,r&&Mt(cn(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):sn(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+At(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Gt()==125)continue}switch(C+=St(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(At(C)-1)*_,_=1;break;case 64:qt()===45&&(C+=$t(Kt())),f=qt(),u=d=At(y=C+=an(Jt())),v++;break;case 45:m===45&&At(C)==2&&(h=0)}}return a}function cn(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=jt(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=kt(e,f+1,f=xt(g=o[h])),b=e;v<m;++v)(b=Tt(g>0?p[v]+` `+y:z(y,/&\f/g,p[v])))&&(c[_++]=b);return Vt(e,t,n,i===0?ht:s,c,l,u,d)}function ln(e,t,n,r){return Vt(e,t,n,mt,St(Wt()),kt(e,2,-2),0,r)}function un(e,t,n,r,i){return Vt(e,t,n,gt,kt(e,0,r),kt(e,r+1,-1),r,i)}function dn(e,t,n){switch(wt(e,t)){case 5103:return pt+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return pt+e+e;case 4855:return pt+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return ft+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return pt+e+ft+e+dt+e+e;case 5936:switch(Ot(e,t+11)){case 114:return pt+e+dt+z(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return pt+e+dt+z(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return pt+e+dt+z(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return pt+e+dt+e+e;case 6165:return pt+e+dt+`flex-`+e+e;case 5187:return pt+e+z(e,/(\w+).+(:[^]+)/,pt+`box-$1$2`+dt+`flex-$1$2`)+e;case 5443:return pt+e+dt+`flex-item-`+z(e,/flex-|-self/g,``)+(Et(e,/flex-|baseline/)?``:dt+`grid-row-`+z(e,/flex-|-self/g,``))+e;case 4675:return pt+e+dt+`flex-line-pack`+z(e,/align-content|flex-|-self/g,``)+e;case 5548:return pt+e+dt+z(e,`shrink`,`negative`)+e;case 5292:return pt+e+dt+z(e,`basis`,`preferred-size`)+e;case 6060:return pt+`box-`+z(e,`-grow`,``)+pt+e+dt+z(e,`grow`,`positive`)+e;case 4554:return pt+z(e,/([^-])(transform)/g,`$1`+pt+`$2`)+e;case 6187:return z(z(z(e,/(zoom-|grab)/,pt+`$1`),/(image-set)/,pt+`$1`),e,``)+e;case 5495:case 3959:return z(e,/(image-set\([^]*)/,pt+"$1$`$1");case 4968:return z(z(e,/(.+:)(flex-)?(.*)/,pt+`box-pack:$3`+dt+`flex-pack:$3`),/space-between/,`justify`)+pt+e+e;case 4200:if(!Et(e,/flex-|baseline/))return dt+`grid-column-align`+kt(e,t)+e;break;case 2592:case 3360:return dt+z(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Et(e.props,/grid-\w+-end/)})?~Dt(e+(n=n[t].value),`span`,0)?e:dt+z(e,`-start`,``)+e+dt+`grid-row-span:`+(~Dt(n,`span`,0)?Et(n,/\d+/):+Et(n,/\d+/)-Et(e,/\d+/))+`;`:dt+z(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Et(e.props,/grid-\w+-start/)})?e:dt+z(z(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return z(e,/(.+)-inline(.+)/,pt+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(At(e)-1-t>6)switch(Ot(e,t+1)){case 109:if(Ot(e,t+4)!==45)break;case 102:return z(e,/(.+:)(.+)-([^]+)/,`$1`+pt+`$2-$3$1`+ft+(Ot(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Dt(e,`stretch`,0)?dn(z(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return z(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return dt+n+`:`+r+s+(i?dt+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(Ot(e,t+6)===121)return z(e,`:`,`:`+pt)+e;break;case 6444:switch(Ot(e,Ot(e,14)===45?18:11)){case 120:return z(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+pt+(Ot(e,14)===45?`inline-`:``)+`box$3$1`+pt+`$2$3$1`+dt+`$2box$3`)+e;case 100:return z(e,`:`,`:`+dt)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return z(e,`scroll-`,`scroll-snap-`)+e}return e}function fn(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function pn(e,t,n,r){switch(e.type){case bt:if(e.children.length)break;case _t:case vt:case gt:return e.return=e.return||e.value;case mt:return``;case yt:return e.return=e.value+`{`+fn(e.children,r)+`}`;case ht:if(!At(e.value=e.props.join(`,`)))return``}return At(n=fn(e.children,r))?e.return=e.value+`{`+n+`}`:``}function mn(e){var t=jt(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function hn(e){return function(t){t.root||(t=t.return)&&e(t)}}function gn(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case gt:e.return=dn(e.value,e.length,n);return;case yt:return fn([Ht(e,{value:z(e.value,`@`,`@`+pt)})],r);case ht:if(e.length)return Nt(n=e.props,function(t){switch(Et(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Ut(Ht(e,{props:[z(t,/:(read-\w+)/,`:`+ft+`$1`)]})),Ut(Ht(e,{props:[t]})),Ct(e,{props:Pt(n,r)});break;case`::placeholder`:Ut(Ht(e,{props:[z(t,/:(plac\w+)/,`:`+pt+`input-$1`)]})),Ut(Ht(e,{props:[z(t,/:(plac\w+)/,`:`+ft+`$1`)]})),Ut(Ht(e,{props:[z(t,/:(plac\w+)/,dt+`input-$1`)]})),Ut(Ht(e,{props:[t]})),Ct(e,{props:Pt(n,r)})}return``})}}function _n(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var vn=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,yn=`active`,bn=`data-styled-version`,xn=`6.6.0`,Sn=`/*!sc*/
`,Cn=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw _n(19);function wn(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var Tn=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:wn(`REACT_APP_SC_DISABLE_SPEEDY`)??wn(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),En=`sc-keyframes-`,Dn={},On=new Map,kn=new Map,An=1,jn=e=>{if(On.has(e))return On.get(e);for(;kn.has(An);)An++;let t=An++;return On.set(e,t),kn.set(t,e),t},Mn=e=>kn.get(e),Nn=(e,t)=>{An=t+1,On.set(e,t),kn.set(t,e)},Pn=Object.freeze([]),Fn=Object.freeze({});function In(e,t,n=Fn){return e.theme!==n.theme&&e.theme||t||n.theme}var Ln=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Rn=/(^-|-$)/g;function zn(e){return e.replace(Ln,`-`).replace(Rn,``)}var Bn=/(a)(d)/gi,Vn=e=>String.fromCharCode(e+(e>25?39:97));function Hn(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Vn(t%52)+n;return(Vn(t%52)+n).replace(Bn,`$1-$2`)}var Un=5381,Wn=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Gn=e=>Wn(Un,e);function Kn(e){return Hn(Gn(e)>>>0)}function qn(e){return e.displayName||e.name||`Component`}function Jn(e){return typeof e==`string`&&!0}function Yn(e){return Jn(e)?`styled.${e}`:`Styled(${qn(e)})`}var Xn=Symbol.for(`react.memo`),Zn=Symbol.for(`react.forward_ref`),Qn={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},$n={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},er={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},tr={[Zn]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Xn]:er};function nr(e){return(`type`in(t=e)&&t.type.$$typeof)===Xn?er:`$$typeof`in e?tr[e.$$typeof]:Qn;var t}var rr=Object.defineProperty,ir=Object.getOwnPropertyNames,ar=Object.getOwnPropertySymbols,or=Object.getOwnPropertyDescriptor,sr=Object.getPrototypeOf,cr=Object.prototype;function lr(e,t,n){if(typeof t!=`string`){let r=sr(t);r&&r!==cr&&lr(e,r,n);let i=ir(t).concat(ar(t)),a=nr(e),o=nr(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in $n||n&&n[s]||o&&s in o||a&&s in a)){let n=or(t,s);try{rr(e,s,n)}catch{}}}}return e}function ur(e){return typeof e==`function`}var dr=Symbol.for(`react.forward_ref`);function fr(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===dr&&`styledComponentId`in e}function pr(e,t){return e&&t?e+` `+t:e||t||``}function mr(e,t){return e.join(t||``)}function hr(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function gr(e,t,n=!1){if(!n&&!hr(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=gr(e[n],t[n]);else if(hr(t))for(let n in t)e[n]=gr(e[n],t[n]);return e}function _r(e,t){Object.defineProperty(e,"toString",{value:t})}var vr=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw _n(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Sn;return t}},yr=`style[${vn}][${bn}="${xn}"]`,br=RegExp(`^${vn}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),xr=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Sr=e=>{if(!e)return document;if(xr(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(xr(t))return t}return document},Cr=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},wr=(e,t)=>{let n=(t.textContent??``).split(Sn),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(br);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Nn(n,t),Cr(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Tr=e=>{let t=Sr(e.options.target).querySelectorAll(yr);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(vn)!==yn&&(wr(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Er=!1;function Dr(){if(!1!==Er)return Er;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Er=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Er=t.getAttribute(`content`)||void 0}return Er=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var Or=(e,t)=>{if(typeof document>`u`)throw _n(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${vn}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(vn,yn),i.setAttribute(bn,xn);let s=t||Dr();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},kr=class{constructor(e,t){this.element=Or(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw _n(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Ar=class{constructor(e,t){this.element=Or(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},jr=Cn,Mr={isServer:!Cn,useCSSOMInjection:!Tn},Nr=class e{static registerId(e){return jn(e)}constructor(e=Fn,t={},n){this.options=Object.assign(Object.assign({},Mr),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Cn&&jr&&(jr=!1,Tr(this)),_r(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Mn(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=vn+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Cn&&Tr(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Cn&&t.target!==this.options.target&&Sr(this.options.target)!==Sr(t.target)&&Tr(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new kr(t,n):new Ar(t,n))(this.options),new vr(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){jn(e),e.startsWith(En)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(jn(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(jn(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},Pr=new WeakSet,Fr={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Ir(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in Fr||e.startsWith(`--`)?String(t).trim():t+`px`}var Lr=47;function Rr(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var zr=Symbol.for(`sc-keyframes`);function Br(e){return typeof e==`object`&&!!e&&zr in e}function Vr(e){return ur(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Hr=e=>e==null||!1===e||e===``,Ur=Symbol.for(`react.client.reference`);function Wr(e){return e.$$typeof===Ur}function Gr(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Hr(r)&&(Array.isArray(r)&&Pr.has(r)||ur(r)?t.push(Rr(n)+`:`,r,`;`):hr(r)?(t.push(n+` {`),Gr(r,t),t.push(`}`)):t.push(Rr(n)+`: `+Ir(n,r)+`;`))}}function Kr(e,t,n,r,i=[]){if(Hr(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return Wr(e)?i:Vr(e)&&t?Kr(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Kr(e[a],t,n,r,i);return i}return fr(e)?(i.push(`.${e.styledComponentId}`),i):Br(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):Wr(e)?i:hr(e)&&e.toString===Object.prototype.toString?(Gr(e,i),i):(i.push(e.toString()),i)}var qr=Gn(xn),Jr=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=Wn(qr,t),this.baseStyle=n,Nr.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Vr(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=mr(Kr(r,e,t,n)))}else i+=mr(Kr(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Hn(Wn(Wn(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=pr(r,a)}}return r}},Yr=/&/g;function Xr(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Zr(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==Lr||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===Lr&&(o=!1,c++);else if(l!==34&&l!==39||Xr(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function Qr(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&Qr(a.children,t)}return e}function $r({options:e=Fn,plugins:t=Pn}=Fn){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Yr,r).replace(i,a))}),e.prefix&&o.push(gn),o.push(pn);let s=[],c=mn(o.concat(hn(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Zr(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Xr(e,o)){if(s===0){if(t===Lr&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==Lr);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===Lr)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===Lr&&o+1<r&&e.charCodeAt(o+1)===Lr){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Zr(i)):l===0?e:Zr(e)}(t),d=on(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=Qr(d,e.namespace)),s=[],fn(d,c),s},u=e,d=Un;for(let e=0;e<t.length;e++)t[e].name||_n(15),d=Wn(d,t[e].name);return u!=null&&u.namespace&&(d=Wn(d,u.namespace)),u!=null&&u.prefix&&(d=Wn(d,`p`)),l.hash=d===Un?``:d.toString(),l}var ei=new Nr,ti=$r(),ni=v.createContext({shouldForwardProp:void 0,styleSheet:ei,stylis:ti,stylisPlugins:void 0});ni.Consumer;function ri(){return v.useContext(ni)}var ii=v.createContext(void 0);ii.Consumer;function ai(){let e=v.useContext(ii);if(!e)throw _n(18);return e}function oi(e){let t=v.useContext(ii),n=v.useMemo(()=>function(e,t){if(!e)throw _n(14);if(ur(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw _n(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(ii.Provider,{value:n},e.children):null}var si={};function ci(e,t){let n=typeof e==`string`?zn(e):`sc`;si[n]=(si[n]||0)+1;let r=n+`-`+Kn(xn+n+si[n]);return t?t+`-`+r:r}function li(e,t,n){let r=fr(e),i=e,a=!Jn(e),{attrs:o=Pn,componentId:s=ci(t.displayName,t.parentComponentId),displayName:c=Yn(e)}=t,l=t.displayName&&t.componentId?zn(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Jr(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(ii),u=ri(),d=e.shouldForwardProp||u.shouldForwardProp,f=In(t,l,a)||Fn,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=ur(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=pr(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=pr(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=Jn(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=pr(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?pr(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)gr(e,n,!0);return e}({},i.defaultProps,e):e}}),_r(m,()=>`.${m.styledComponentId}`),a&&lr(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var ui=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function di(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var fi=e=>(Pr.add(e),e);function pi(e,...t){if(ur(e)||hr(e))return fi(Kr(di(Pn,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Kr(n):fi(Kr(di(n,t)))}function mi(e,t,n=Fn){if(!t)throw _n(1,t);let r=(r,...i)=>e(t,n,pi(r,...i));return r.attrs=r=>mi(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>mi(e,t,Object.assign(Object.assign({},n),r)),r}var hi=e=>mi(li,e),B=hi;ui.forEach(e=>{B[e]=hi(e)});var gi=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(ur(n)&&!fr(n))return!1}return!0}(e),Nr.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=mr(Kr(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function _i(e,...t){let n=pi(e,...t),r=`sc-global-${Kn(JSON.stringify(n))}`,i=new gi(n,r),a=e=>{let t=ri(),n=v.useContext(ii),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,Dn,n,o);else{let s=Object.assign(Object.assign({},t),{theme:In(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var vi,yi=class{constructor(e,t){this[vi]=!0,this.inject=(e,t=ti)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=En+e,this.rules=t,jn(this.id),_r(this,()=>{throw _n(12,String(this.name))})}getName(e=ti){return e.hash?this.name+Hn(e.hash>>>0):this.name}};function bi(e,...t){let n=mr(pi(e,...t));return new yi(Kn(n),n)}vi=zr,`${vn}`,`${vn}`,`${vn}`;var xi=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),V=o(((e,t)=>{t.exports=xi()}))(),Si=5e3,Ci=B.div`
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
`,wi=B.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,Ti=B.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,Ei=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),Di=()=>typeof document<`u`&&document.visibilityState===`hidden`,Oi=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||Di()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+Si};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{Di()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function ki({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=Oi(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=le.enabled?Ei(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&L[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,V.jsx)(Ci,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,V.jsxs)(wi,{children:[(0,V.jsx)(Ti,{children:`Achievement unlocked`}),L[t].name]},e))})}var Ai=B.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,ji=B.div`
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
`,Mi=B.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,Ni=B.button`
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
`,Pi=B.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,Fi=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,V.jsx)(Ai,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,V.jsxs)(ji,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,V.jsx)(Mi,{children:`More`}),(0,V.jsxs)(Ni,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,V.jsx)(Pi,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,V.jsxs)(Ni,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,V.jsx)(Pi,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),le.enabled&&(0,V.jsxs)(Ni,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,V.jsx)(Pi,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,V.jsxs)(Ni,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,V.jsx)(Pi,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),!1]})})},Ii=B.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,Li=()=>b[b.length-1].id,H=e=>Math.max(0,Number.isFinite(e)?e:0),Ri=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),zi=1e-9,Bi=1e-9,Vi=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},Hi=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),Ui=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=Hi();return e},Wi=()=>({resources:Vi().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,lastTierEarnedThisRun:!1,accelerateBoughtThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:Ri()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:is(1),unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:ot.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:ot.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:ot.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:ot.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:Ui(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),Gi=new Intl.NumberFormat(`en-US`),Ki=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),qi=1e4,Ji=1e3,Yi=1+1e-12,Xi=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*Yi;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*Ji)/Ji;return`${Number(r.toFixed(3))}e${t}`},U=e=>{let t=H(e);return t<qi?Gi.format(t):Xi(t)},Zi=1e-9,Qi=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>Zi?null:`${Xi(10**t)} ${E(T)}`},$i=e=>{let t=Math.floor(H(e)),n=E(O);return t<qi?`${Ki.format(t)} ${n}`:Qi(t)??`${Xi(t)} ${n}`},ea=e=>{let t=Math.floor(H(e)),n=E(T);return t<qi?`${Ki.format(t)} ${n}`:`${Xi(t)} ${n}`},W=8e3,ta=e=>{let t=Math.floor(H(e));if(t<W)return $i(t);let n=Math.floor(t/8);return n<qi?`${Ki.format(n)} B`:`${Xi(n)} B`},na=e=>{let t=H(e);return t===0?1:2+(t-1)*t/2},ra=e=>{let t=e.purchaseLevels?.[Li()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},ia=(e,t)=>{let n=S[e?.id];if(n===void 0)return na(t);let r=H(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},aa=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(ia(e,n)-1)},oa=(e,t,n)=>{let r=Math.max(0,H(e)-H(t));return Math.max(0,Math.min(H(n),r))},sa=(e,t,n,r,i)=>aa(e,t)*oa(n,r,i),ca=(e,t,n,r,i,a)=>{let o=oa(n,r,a),s=aa(e,t);return s<=0?o:Math.min(o,Math.floor(H(i)/s))},la=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),ua=(e,t)=>la(Math.max(0,S[e]??-1))**Math.max(0,H(t)-1),da=(e,t)=>ua(e,t),fa=e=>1+Math.max(0,S[e]??-1)*1,pa=e=>11+Math.max(0,S[e]??-1)*1,ma=e=>{let t=H(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=fa(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=pa(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=Ye.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=Ye.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=Ye.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=Ye.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=Ye.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},ha=(e,t=Ge)=>(1+t)**H((e??1)-1),ga=e=>10**(H(e)+1),_a=e=>ga(e)*8,va=e=>(e.resources?.base??0)>=_a(e.globalTickspeedMultiplier??0),ya=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,ba=(e,t=0)=>{let n=H(e??0);return(1+Qe*Do(t))**n},xa=e=>(e.scaleUpTierCounts?.[Bo(e).id]??0)>=1,Sa=e=>(1+tt)**H(e),Ca=e=>Math.max(1,Math.ceil(nt*H(e))),wa=(e,t=!0)=>{let n=H(e);return!t||n<1?1:n<2?Ue:1+Math.log10(n)},Ta=e=>!!e.prestigeSpeedBonusUnlocked,Ea=e=>{if(e.prestigeSpeedBonusUnlocked||H(e.purge.points)<1)return e;let t=Ba(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},Da=e=>e.playtimeBonusUnlocked?1+We*(H(e.activePlaySeconds??0)/3600):1,Oa=e=>{if(e.playtimeBonusUnlocked||H(e.purge.points)<100)return e;let t=Ba(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},ka=e=>{if(e.buyMaxUnlocked||H(e.purge.points)<2)return e;let t=Ba(e);return{...t,purge:{...t.purge,points:t.purge.points-2},buyMaxUnlocked:!0}},Aa=e=>{if(e.cacheWarmUnlocked||H(e.purge.points)<20)return e;let t=Ba(e);return Ma({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},ja=e=>b[Math.min(b.length,Math.max(1,yc(e)))-1],Ma=e=>{if(!e.cacheWarmUnlocked||Mo(e))return e;let t=ja(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,ra(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:As(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},Na=Be.length,Pa=e=>Math.min(Na,Math.floor(H(e?.sleepModeCapLevel??0))),Fa=e=>Math.min(Le,Re+ze*Pa(e)),Ia=e=>Be[e]??null,La=e=>{let t=Pa(e),n=Ia(t);if(n===null||H(e.purge.points)<n)return e;let r=Ba(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},Ra=e=>t=>({...t,activePlaySeconds:H(t.activePlaySeconds??0)+H(e)}),za=e=>!!e.computeFlops?.pageUnlocked||H(e.purge?.points??0)>=100,Ba=e=>e.computeFlops?.pageUnlocked||H(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},Va=(e,t,n)=>{let r=st[t];if(!r)return{affordable:0,totalCost:0};let i=H(e.computeFlops?.owned?.[t]??0),a=H(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=Ua(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},Ha=(e,t,n)=>r=>{if(t<=0)return r;let i=Ba(r),a=H(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},Ua=(e,t=0)=>{let n=t+1;return aa({baseCost:e.baseCostPP},n)},Wa=(e,t)=>{let n=st[t];if(!n)return!1;let r=Ua(n,H(e.computeFlops?.owned?.[t]??0));return H(e.purge?.points??0)>=r},Ga=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=Ua(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},Ka=(e,t=1)=>n=>{let r=st[e];if(!r)return n;let i=Ba(n),a=H(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=Ga(r,a,H(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:H(a+o)}}}},qa=e=>10**H(e),Ja=e=>ot.reduce((t,n,r)=>t+H(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*qa(r),0),Ya=e=>{let t=H(e.hyperscalerCount??0);return t<=0?0:t*(at+H(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*ut)},Xa=(e,t)=>1+H(e.computeFlops?.cumulativeBoost?.[t]??0)+Ya(e),Za=e=>{let t=H(e);return t===0?`0 Flops`:`${U(t)} Flops`},Qa=e=>t=>{if(e<=0)return Ba(t);let n=Ba(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost};return ot.forEach(t=>{let n=H(r[t.id]??0);if(n<=0)return;let o=n*at*e;if(o<=0)return;let s=t.boostsTierId;a[s]=H((a[s]??0)+o),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},$a=e=>H(e.purge?.points??0)>=lt,eo=e=>1+H(e.eonsUpgrades?.eonAmplifierLevel??0)*1,to=e=>1*10**H(e),no=e=>H(e.eons?.balance??0)>=to(e.hyperscalerCount??0),ro=e=>{if(!no(e))return e;let t=to(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:H(e.eons.balance)-t},hyperscalerCount:H(e.hyperscalerCount??0)+1}},io=e=>1+Math.max(0,ct[e]??-1)*1,ao=e=>{let t=H(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return ot.forEach(e=>{(r[e.id]??null)===null&&t>=io(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},oo=(e,t)=>n=>!ot.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},so=e=>t=>{if(e<=0)return t;let n=t;return ot.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+zi);if(i>=1){let{affordable:e,totalCost:a}=Va(n,t.id,i);e>0&&(n=Ha(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},co=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},lo=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||cl(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`lastTierSpent`:return!!e.lastTierEarnedThisRun&&(e.resources?.[Li()]??0)===0;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolExponentBonus`:return(e.intro?.poolExponentBonuses?.[t.poolIndex]??0)>=t.min;default:return!1}},uo=e=>e>=1?Math.max(et,10/(1+Math.log10(e))):1/0,fo=(e,t)=>!!e.achievements?.earned?.[t],po=e=>{if(!le.enabled)return e;let t=I.filter(t=>!fo(e,t.id)&&lo(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},mo=e=>pe.filter(t=>{let n=I.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>fo(e,t.id))}).map(e=>e.id),ho=e=>{if(!$a(e))return e;let t=Wi(),n=eo(e),r=H(e.era?.count??0)+1,i=Ao(e);return Ma(ao({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:co(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:Ri()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:H(e.eons?.balance??0)+n},hyperscalerCount:H(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},go=e=>{let t=e.prestigeDoublePpLevel??0,n=hs(t);if(H(e.purge.points)<n)return e;let r=Ba(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},_o=e=>{let t=I.filter(t=>t.group===`levelPower`&&fo(e,t.id)).length;return Math.round((1+de*t)*1e6)/1e6},vo=(e,t=1)=>{let n=Math.max(0,H(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},yo=e=>2**H(e),bo=(e,t)=>Po(e,`scaleUpNoDoubling`)||Fo(e,`singleInstance`)===t?1:yo(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**Lo(e,`scaleUpPower`,1),xo=e=>Math.min(H(e.scaleUpTargetTierIndex??0),zo(e)-1),So=e=>b[xo(e)],Co=e=>3*(Math.max(0,H(e.scaleUpCount??0)-(zo(e)-1))+1),wo=e=>{let t=Eo(e);return t===null?5:t+To(e)},To=e=>{let t=I.filter(t=>t.group===`overclockStep`&&fo(e,t.id)).length;return Math.max(1,4-t)},Eo=e=>{let t=e.overclockLastClaimCompletedLevels??(H(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:H(t)},Do=e=>(1+$e)**H(e),Oo=e=>Ye[e],ko=e=>1/om(e,`purge`),Ao=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&om(e,`purge`)<=1,jo=e=>!!se[e]&&ce.has(e),Mo=e=>{let t=e.challenges?.active;return t&&jo(t)?se[t]:null},No=(e,t)=>!!e.challenges?.completed?.[t],Po=(e,t)=>Mo(e)?.effect===t,Fo=(e,t)=>{let n=Mo(e);return n?.effect===t?n.automation.key:null},Io=(e,t)=>({balance:Math.max(e.balance??0,H(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),Lo=(e,t,n)=>Mo(e)?.levers?.[t]??e.runLevers?.[t]??n,Ro=(e,t)=>(Fo(e,`halfDuplex`)===t?te:1)*Lo(e,`production`,1),G=(e,t)=>{let n=x[t];if(!n)return n;let r=(Fo(e,`premiumTier`)===t?ne:1)*Lo(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},zo=e=>Po(e,`addressSpace`)?6:b.length,Bo=e=>b[zo(e)-1],Vo=e=>Math.floor(H(e.challenges?.activeSeconds)/30+1e-9)%2==0,Ho=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!Mo(e))return n;if(Fo(e,`clockGated`)===t||Fo(e,`dutyCycle`)===t&&!Vo(e))return 1;if(Fo(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},Uo=e=>{if(!Po(e,`bitRot`))return 0;let t=H(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(ie,F*2**(t/30))/10**(Ws(e.intro)-1)},Wo=e=>Mo(e)?.goal??8e100,Go=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,Ko=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?fa(n):t===`tierTickspeed`?pa(n):Oo(n))},qo=(e,t)=>{let n=se[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:cm(e,i))&&H(e.purge?.count??0)>=Ko(n)},Jo=(e,t)=>P.find(n=>n.automation.kind===e&&n.automation.key===t&&jo(n.id))??null,Yo=(e,t,n)=>{let r=Jo(t,n);return!!r&&!No(e,r.id)},Xo=e=>{let t=e.challenges?.completed??{},n=P.filter(n=>jo(n.id)&&!t[n.id]&&Go(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...Wi().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},Zo=e=>t=>{if(!Mo(t))return t;let n=t.challenges.run??Ri();return{...t,challenges:{...t.challenges,activeSeconds:H(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:H(n.cycleSeconds)+e}}}},Qo=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??Ri(),...t}}}),$o=(e,t,n)=>{if(n===t)return n;let r=n;if(Fo(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return Fo(n,`writeLock`)===e&&(r=Qo(r,{haltSeconds:10})),r},es={hardRefresh:{interval:300,apply:(e,t)=>Qo({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},ts=(e,t)=>{let n=t,r=Fo(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-re)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=Qo({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(Po(n,`bitRot`)&&Uo(n)>H(n.resources.base)){let e=km(n,!1);n={...e,challenges:{...e.challenges,run:{...Ri(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},ns=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=Mo(r);if(!e)return Ss(i,t,0)(r);let n=es[e.effect],a=H(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=H(r.challenges.run?.haltSeconds),l=c>0?Qo(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>Mo(e)?Zo(o)(e):e)(Ss(o,t,c)(l)),d=!Mo(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=Mo(d)?ts(o,d):d,s&&Mo(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},K=e=>!Ao(e)&&H(e.resources.base)>=Wo(e),rs=e=>t=>{let n=S[t.id]??-1;if(n>=zo(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},is=e=>as(H(e)/8),as=e=>{let t=H(e);return t<1?0:Math.floor(Math.log10(t))},os=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=as(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},ss=e=>{let t=H(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},cs=e=>Po(e,`clockSpeedDisabled`)?1:ba(e.globalTickspeedMultiplier??null,Eo(e)??0)**Lo(e,`clockSpeedPower`,1),ls=e=>Po(e,`clockSpeedDisabled`)?0:(1+Qe*Do(Eo(e)??0))**Lo(e,`clockSpeedPower`,1)-1,us=e=>Po(e,`scaleUpNoDoubling`)?1:2**Lo(e,`scaleUpPower`,1),ds=(e,t)=>{let n=ha(Ho(e,t),Fo(e,`halfStep`)===t?ae:Ge)*(t===Bo(e).id?Sa(e.lastTierXpConsumed??0):1),r=cs(e),i=Fo(e,`noisyNeighbour`),a=(Fo(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+oe)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:Bi},fs=()=>Math.log2(64),ps=(e=0)=>{let t=H(e);return 64/2**Math.min(t,fs())},ms=(e=0)=>{let t=H(e),n=fs();return t>n?2**(t-n):1},hs=(e=0)=>10**(H(e)+1),gs=(e,t=0)=>{let n=H(e);if(n<8e100)return 0;let r=Math.floor(Math.log10(k)),i=Math.max(0,as(n)-r),a=ps(t),o=ms(t);return(1+Math.floor(i/a))*o},_s=(e,t)=>{let n=is(H(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},vs=200,ys=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<vs;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=vs&&(o=Math.min(o,1)),{state:a,budget:o}},bs=(e,t,n,r)=>{let{state:i,budget:a}=ys(e,t,om(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},xs=`unit`,Ss=(e,t=1,n=0)=>r=>{let i=jl(r),a=Rc(e)(i),o=Gc(lu(e)(el(e)(rl(e)(Ml(e)(a))))),s=Iu(e)(o),c=Au(e)(s),l=wm(Iu(0)(c)),u=pp.reduce((t,n)=>n(e)(t),l),d=Nd(e)(u),f=Nl(Lp(e)(d)),p=Jd(of(e,f)(zc(e)(f))),m=tf(e)(p),h=so(e)(Qa(e)(m)),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=Gu(Uu(t)),r=iu(e)(su(e)(n));return r===t?t:Iu(0)(r)};if(K(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+ko(h)*e;return _(t>=.999999999?Em(h):{...h,autoPurgeAttemptBudget:t})}let v=wa(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*Da(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!rs(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/Xp(n,r.id);for(;a>=.999999999&&!(Math.floor(a+zi)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=Ms(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=Qp(i,r.id);if(n>1&&e===0){let e=Vs(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!Is(i,r))break;let o=Ms(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,H(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!rs(y)(e)||k)return;let t=ds(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+zi)/t);if(T[e.id]=n-r*t,r<=0)return;let i=Fo(y,`flatRate`)===e.id?1:vo(y.purchaseLevels?.[e.id]??1,_o(y)),a=Ro(y,e.id),o=Cp(y.intro,S[e.id]+1),s=Xa(y,e.id),c=bo(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=H((C.base??0)+l*8)):C[e.producesResourceId]=H((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=H((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,j=x[Li()],M=Math.max(0,(y.purchaseLevels?.[j.id]??1)-1);if(M>0&&fo(y,`quettaSpent`)&&rs(y)(j)&&!k){let e=uo(M);A+=D;let t=Math.floor(A/e+zi);t>0&&(A=Math.max(0,A-t*e),C[j.id]=H((C[j.id]??0)+t),w[j.id]=H((w[j.id]??0)+t))}let ee={...y,lastTierLevelCreditTimer:A,lastTierEarnedThisRun:!!y.lastTierEarnedThisRun||(C[j.id]??0)>0,resources:C,owned:w,tierProductionAccumulators:T,purge:_s(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+ko(y)*e}:{}},N=ee.runPeaks?Io(ee.runPeaks,ee):null,P=ee;Ao(P)&&g&&H(P.resources.base)>=Wo(P)&&(P.autoPurgeAttemptBudget??0)>=.999999999&&(P=Em(P));let te=P.autoOverclock&&(P.autoOverclockEnabled??!0)?bs(P,e,`overclock`,Fm):P,ne=te.autoScaleUp&&(te.autoScaleUpEnabled??!0)?bs(te,e,`scaleUp`,Pm):te,re=ne.autoXpTickspeed&&(ne.autoXpTickspeedEnabled??!0)?bs(ne,e,`restage`,e=>Hm(e.purge.xp)(e)):ne,F=N?{...re,runPeaks:N}:re,ie=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=ys(t,e,fm(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>Kp(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},F);return _(ie.autoGlobalTickspeed&&(ie.autoGlobalTickspeedEnabled??!0)?bs(ie,e,`speedUp`,ym):ie)},Cs=(e,t=1)=>n=>po(Mo(n)&&e>0?ns(e,t,n):Ss(e,t,0)(n)),ws=(e,t=Le)=>{let n=Math.min(H(e),t,Le);return Math.floor(n*(n>600?Ie:1))},Ts=(e,t=1)=>n=>{let r=ws(e,Fa(n)),i=n;for(let e=0;e<r;e++)i=Cs(1,t)(i);return i},Es=(e,t=Le)=>Math.floor(Math.min(H(e),t,Le))-ws(e,t),Ds=(e,t=1,n)=>r=>{let i=Es(e,n??Fa(r)),a=r;for(let e=0;e<i;e++)a=Cs(1,t)(a);return a},Os=e=>{let t=Math.max(0,Math.floor(H(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},ks=(e,t)=>e.resources[t.costResourceId]??0,As=(e,t)=>e.purchased?.[t]??0,js=(e,t)=>n=>{if(K(n))return n;let r=G(n,e);if(!r||!rs(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=ra(n),s=ca(r,i,o,a,ks(n,r),t);if(s<=0)return n;let c=aa(r,i)*s,l=As(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:H((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},Ms=(e,t)=>n=>$o(e,n,js(e,t)(n)),Ns=e=>!!e.buyMaxUnlocked,Ps=e=>H(e.purge?.count??0)>=1||H(e.era?.count??0)>=1||Ee.some(t=>!!e.intro?.[t.autoFlagField]),Fs=e=>t=>{let n=t;for(let t=0;t<He;t++){let t=e(n);if(t===n)break;n=t}return n},Is=(e,t)=>{let n=G(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=ra(e),a=e.purchaseLevelProgress?.[n.id]??0;return ca(n,r,i,a,ks(e,n),i)>=i-a},Ls=(e,t)=>{let n=G(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=ra(e);return ca(n,r,i,0,ks(e,n),i)>=i},Rs=e=>t=>{if(K(t))return t;let n=G(t,e);if(!n||!rs(t)(n))return t;if(!Ls(t,n))return Ms(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&Ls(r,n);t++){let t=Ms(e,2**53-1)(r);if(t===r)break;r=t}return r},zs=e=>t=>$o(e,t,Rs(e)(t)),Bs=(e,t)=>n=>{if(K(n))return n;let r=G(n,e);if(!r||!rs(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,He)&&Ls(i,r);n++){let t=Ms(e,2**53-1)(i);if(t===i)break;i=t}return i},Vs=(e,t)=>n=>$o(e,n,Bs(e,t)(n)),Hs=(e,t)=>{let n=G(e,t);if(K(e)||!n||!rs(e)(n)||!Ls(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&Ls(r,n);e++){let e=Ms(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=ra(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,ca(n,o,a,0,ks(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:ks(e,n)-ks(r,n),lastLevelCost:ks(i,n)-ks(r,n),partialQuantity:s,partialCost:s>0?sa(n,o,a,0,s):0}},Us=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=ra(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=As(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},Ws=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*R.length,Number.isFinite(t)&&t>=1?t:1)},Gs=e=>{let t=Ws(e),n=Math.floor((t-1)/R.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(R.length-1,Math.max(0,t-1-(n-1)*R.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=be,o=1-(1-a)**2;return 1-(1-ye)*a**(n+i)*o**(r-i)},Ks=(e,t=ye)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},qs=e=>Ks(e.speedCapacity??e.capacity??0,Gs(e))*8,Js=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(Se);return 10**(n-t*(n-Math.log10(10)))},Ys=Math.log(Se/100),Xs=Math.log(Se/10),Zs=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-Ys)*(Math.exp(Xs*s)-Math.exp(Xs*o))/Xs},Qs=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(Xs*a)+Xs*n/t*Math.exp(Ys)*r,s=t/Xs*Math.log(o);return Math.min(t,s)-i},$s=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,ec=e=>Js($s(e)),tc=e=>ec(e),nc=e=>1+(e?.dataStreamTapBonusPercent??0)/100,rc=e=>tc(e)/100,ic=e=>qs(e)*Sp(e)*rc(e),ac=100,oc=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?Zc(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=nc(e),o=ac*a,s=qs(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},sc=e=>{if(cl(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(qs(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},cc=e=>{let t=sc(e);if(!le.enabled||t===e)return t;let n=t.achievements??Wi().achievements;return po({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}})},lc=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},uc=()=>10,dc=e=>{let t=Ku(e);return t?Math.ceil(t/R.length):null},fc=(e,t)=>{if(!Number.isInteger(t)||t<1||t>uc())return!1;let n=(t-1)*R.length+1;return R.every((t,r)=>{let i=Pl(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},pc=e=>{let t=(e-1)*R.length+1;return R.map((e,n)=>Pl(t+n))},mc=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!q(e,r)?.rebuilding}),hc=(e,t)=>!!q(e,t)?.rebuilding,gc=(e,t)=>!Number.isInteger(t)||t<1||t>uc()?!1:t===1||fc(e,t-1),_c=e=>{let t=0;for(let n=1;n<=uc()&&gc(e,n);n+=1)t=n;return t},vc=e=>8*he**e,yc=e=>{let t=1;for(let n=2;n<=uc()&&!((e.intro?.capacity??0)<vc(n));n+=1)t=n;return t},bc=[1,2,4,8,16,32,64,125,250,500],xc=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return bc[t%10]*1e3**Math.floor(t/10)*8},Sc=Math.log10(2),Cc=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*Sc)*8},wc=(e,t)=>{if(!Number.isInteger(t)||t<1||t>yc(e))return 0;let n=(Dc(e,t)/8)**Gs(e.intro),r=qs(e.intro??{})/8,i=xc(Math.min(r,n)*8),a=Math.max(0,q(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=xc(o*Math.SQRT2);if(t>=uc())return o;let s=wc(e,t+1);return Math.max(i,Math.min(o,s/2))},Tc=(e,t)=>{let n=wc(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,vc(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=wc({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:xc(qs(e.intro??{}))},Ec=(e,t)=>{let n=Cc(e??0),r=t===1?ve(1).startBits:ve(t-1).endBits,i=ve(t).endBits;return Math.min(Math.max(n,r),i)},Dc=(e,t)=>!Number.isInteger(t)||t<1||t>yc(e)?0:Ec(e.intro?.capacity??0,t),Oc=(e,t)=>Dc(e,t),kc=(e,t)=>t<=yc(e)?Oc(e,t):Ec(vc(t),t),Ac=(e,t)=>e.intro?.poolBuffers?.[t]??0,jc=(e,t)=>{let n=Oc(e,t);return n>0?Math.min(1,Ac(e,t)/n):0},Mc=(e,t)=>Js(jc(e,t)),Nc=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,Pc=(e,t)=>Mc(e,t),Fc=(e,t)=>1+Nc(e,t)/100,Ic=(e,t)=>{let n=qs(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-wc(e,r));return Math.min(wc(e,t),n)},Lc=e=>t=>{if(!Number.isInteger(e)||e<1||e>yc(t))return t;let n=Nc(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},Rc=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},zc=e=>t=>{if(!cl(t))return t;let n=yc(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=Ic(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=Oc(t,s),u=Math.max(0,l-c),d=n*Tp(t.intro,s),f=e;if(u>0){let t=Qs(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=Zs(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!bd(t,s)||!fc(t,s)||af(t,s))continue;let{lake:p,remainingBits:m,changed:h}=$d(t,s,n*yd(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},Bc=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||qc(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,Ku(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,Ku(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,Ku(i.diskBuild.size)??1)),o>Ws(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>uc())continue;let i=e[r]??0,a=kc(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=dc(c);if(u){let t=kc({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=Zd(o),c=Math.max(Y(Qu(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),Fe[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=Me.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=Hl(t),a=Gl(t,n),o=Ul(t,n),s=Cm(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},Vc=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=Ru(e,t);return!n||S[n.id]>=zo(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},Hc=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>Vc(e,t)),Uc=(e,t)=>{if(!t||t>yc(e))return 0;let n=Zd(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},Wc=e=>{if(e.intro.diskBuild||Rl(e)||Vl(e))return!1;let t=Hl(e);if(Gl(e,t)>=Ul(e,t))return!0;let n=dc(t);return hc(e,n)||mc(e,n)?!1:wc(e,n)>0&&Oc(e,n)>=t},Gc=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=uc();e+=1){let n=q(t,e);if(!n?.rebuilding)continue;let r=pc(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=Vd(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(Oc(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},Kc=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!qc(e),qc=e=>{let t=uc(),{endBits:n}=ve(t);return Dc(e,t)>=n},Jc=e=>Kc(e),Yc=e=>{let t=ff(e)?ol(e):e;return jl({...t,intro:{...t.intro,speedCapacity:t.intro.speedCapacity??t.intro.capacity,capacity:t.intro.capacity*2,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},Xc=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!qc(e)},Zc=e=>e.speedCapacity??e.capacity??0,Qc=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:Zc(t)*2<=t.capacity},$c=e=>Qc(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,el=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Zc(t.intro),a=Math.min(t.intro.bits,qs(t.intro)*nc(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},tl=e=>nl(e),nl=e=>Xc(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,rl=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(qc(t))return il(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,qs(t.intro)*nc(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?Yc(a):a},il=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,al=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],ol=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of ke)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of al)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},sl=e=>(e.intro?.capacity??0)>=xe,cl=e=>(e.intro?.capacity??0)>=Ce,ll=[`B`,...b.map(e=>e.symbol)],ul=1e3,dl=[`b`,...ll.slice(1).map(e=>e.replace(/B$/,`b`))],fl=e=>{let t=1,n=0;for(;e/t>=ul&&n<dl.length-1;)t*=ul,n+=1;return{symbol:dl[n],divisor:t}},pl=e=>{let t=8,n=0;for(;e/t>=ul&&n<ll.length-1;)t*=ul,n+=1;return{symbol:ll[n],divisor:t}},ml=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],hl=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<ml.length-1;)n*=he,r+=1;return{symbol:ml[r],divisor:n}},gl=(e,t)=>Math.floor(e*10**t)/10**t,_l=e=>{let t=Math.floor(e);return`${U(t)} bit${t===1?``:`s`}`},vl=3,yl=5,bl=e=>e>=4?yl:4,xl=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(vl,Math.max(0,bl(t)-t))},Sl=(e,t)=>{if(t){let n=e/t.divisor,r=gl(n,xl(n));return r>0&&r<1?_l(e):`${U(r)} ${t.symbol}`}return _l(e)},Cl=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),wl=(e,t)=>{if(!t)return _l(e);let n=e/t.divisor,r=xl(n),i=gl(n,r);return i>0&&i<1?_l(e):i===0?`${U(i)} ${t.symbol}`:`${Cl[r].format(i)} ${t.symbol}`},Tl=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},El=e=>e.replace(/^[\d,]*\.?\d+/,e=>Tl(Number(e.replace(/,/g,``)))),Dl=e=>Sl(e,hl(e,!0)),Ol=e=>Sl(e,pl(e)),kl=e=>aa(b[0],e.purchaseLevels?.[b[0].id]??1)*8,Al=e=>{let t=kl(e);if(e.intro.bits<t)return e;let n=b[0].id;return Us(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},jl=e=>e.intro?.mainGameUnlocked||!cl(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},Ml=e=>t=>{if(!t.intro.byteCreated)return t;let n=qs(t.intro)*Sp(t.intro),r=Qs(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},Nl=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=oa(ra(e),n,2**53-1),i=kl(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return Us(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},Pl=e=>we*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),Fl=e=>_c(e)*R.length,Il=e=>Math.min(Fl(e),Ws(e.intro)),Ll=e=>Pl(Ws(e.intro)),Rl=e=>{let t=Hl(e);return t<Ll(e)&&!hc(e,dc(t))},zl=e=>e.intro?.diskBuild||!Vl(e)?!1:Ws(e.intro)<Fl(e),Bl=e=>{if(!zl(e))return e;let t=Ws(e.intro)+1,n=Tm(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},Vl=e=>((e.intro?.disksBuiltTotal??{})[Pl(Il(e))]??0)>=9,Hl=e=>{let t=e.intro?.disksBuiltTotal??{},n=Il(e),r=1,i=Pl(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=Pl(r);return i},Ul=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),Wl=(e,t)=>t*Ul(e,t),Gl=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,Kl=Ol,ql=e=>({symbol:ll[e]??ll[ll.length-1],divisor:8*ul**e}),Jl=(e,t)=>Sl(e,ql(t)),Yl=(e,t)=>{let n=ql(t);return e>0&&e<n.divisor?pl(e):n},Xl=(e,t)=>Sl(e,Yl(e,t)),Zl=(e,t)=>wl(e,Yl(e,t)),Ql=e=>Sl(e,fl(e)),$l=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=Hl(e),i=[];for(let t=1;t<=yc(e);t+=1)i.push(Zd(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},eu=e=>Wc(e)&&!Hc(e),tu=e=>!eu(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},nu=e=>e.intro?.diskBuildQueued||Rl(e)||e.intro.diskBuild||Vl(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},ru=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,iu=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!eu(t))return t;let n=Hl(t),r=dc(n),i=Gl(t,n),a=Ul(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?Cm(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=Ac(t,r),u=Math.max(0,l-Uc(t,r)),d=wc(t,r)*Fc(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-zi){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-zi;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},au=200,ou=(e,t)=>{let n=dc(t);return t/Math.max(Tc(e,n)*Fc(e,n),Number.MIN_VALUE)},su=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!Rl(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<au;e+=1){let e={...t,intro:n};if(!Rl(e))break;let a=Hl(e),o=dc(a);if(hc(e,o)||mc(e,o)||Oc(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=wc(e,o)*Fc(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-Uc(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},cu=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!Rl(e))return t;let n=Ws(e.intro);for(let r=1;r<n;r+=1){let n=Pl(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,wc(e,dc(n))<=0&&(t.projected=!0);let s=ou(e,n);t.seconds+=(9-a-o)*s}return t},lu=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>zi?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},uu=e=>{let t=Ku(e);return t?Pl(t+1):e*10},du=e=>{let t=dc(e);return!!t&&dc(uu(e))===t},fu=(e,t)=>e.intro?.diskWriteCache?.[t]??null,pu=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,mu=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],hu=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,gu=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,pu(e)-(e.segmentsCollected??0)*t),r=mu(e).reduce((e,t)=>e+hu(t),0);return Math.min(1,Math.max(0,(n+r)/t))},_u=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,vu=(e,t)=>{let n=fu(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=mu(n);return r.length>0&&r.every(t=>zu(e,t.size))},yu=e=>{let t=Ku(e);if(!t||t<=1)return null;let n=Pl(t-1),r=dc(e);return r&&dc(n)===r?n:null},bu=(e,t)=>!yu(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),xu=(e,t,n=!1)=>({sourceSize:yu(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),Su=(e,t)=>{if(!yu(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=fu(e,t);return!n||!n.expedite&&n.segmentsCollected<10},Cu=(e,t)=>!!fu(e,t)?.expedite,wu=e=>t=>{if(!Su(t,e))return t;let n=fu(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:xu(t,e,!0)}}}},Tu=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},Eu=(e,t)=>{let n=wc(e,dc(t))*5;return t/Math.max(n,Number.MIN_VALUE)},Du=(e,t,n,r)=>{let i=dc(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of mu(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=pc(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||zu(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},Ou=1-1e-9,ku=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),Au=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=dc(s.sourceSize);if(c===dc(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,kc(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;bu(t,e)&&(i[e]=xu(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=dc(c),d=Fc(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>zi){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??yu(c);if(!(p>0))continue;let m=mu(l),h=pu(l),g=[];for(let t of m){if(zu(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>zi?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=Tu(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-Uc(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*Ou){let e=g.reduce((e,t)=>e+t.size,0);for(let n of Du(s,c,c-h-e,g)){let e=Eu(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*Ou){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&ku(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},ju=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,Mu=(e,t)=>{let n=t/8,r=wc(e,dc(t))*2;return n/Math.max(r,Number.MIN_VALUE)},Nu=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,Pu=(e,t)=>ju(e,t)?zu(e,t):!1,Fu=e=>Ju(e)===R[0],Iu=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=yc(t),d=e=>{if(!Fu(e))return!1;let t=dc(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=dc(n);r&&(i[r]=Math.min(a(r)+s[n],kc(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(Zd(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=dc(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*wc(t,r)*5*Fc(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*zi?n:e,l=!0}}}for(let e of p){if(c[e]||fu(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||zu(t,e))continue;let a=Mu(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||zu(h,r))continue;let a=i.remainingSeconds-e*Fc(t,dc(r));if(a>zi){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},Lu=e=>{let t=Ju(e);return t?R.indexOf(t)+1:null},Ru=(e,t)=>{let n=qu(t),r=Lu(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},zu=(e,t)=>Ru(e,t)!==void 0,Bu=(e,t)=>{let n=qu(t),r=Lu(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},Vu=(e,t)=>Ru(e,t)?.name??null,Hu=e=>t=>{if(!Vc(t,e))return t;let n=Ru(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return Us(n.id,ra(t))({...t,intro:{...t.intro,disks:o}})},Uu=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>Vc(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:Hu(t)(e)},Wu=(e,t)=>{if(e<1||e>10)return null;let n=R[t-1];return n===void 0?null:Pl(Xd(e,n))},Gu=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=zo(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=Wu(S[e.id]+1,1);if(i===null||Vc(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=aa(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=ra(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=Us(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},Ku=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/we;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||Pl(n)!==e?null:n},qu=e=>{let t=Ku(e);return!t||t>Pe?null:Math.floor((t-1)/R.length)+1},Ju=e=>{let t=Ku(e);return!t||t>Pe?null:R[(t-1)%R.length]},Yu=e=>Ne[e-1]??null,q=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??Hi(),Xu=(e,t)=>q(e,t)?.capacityLevel??0,Zu=(e,t)=>Xu(e,t)>=3,J=(e,t)=>Fe[Math.min(Xu(e,t),3)]+Math.max(0,q(e,t)?.resetCount??0)*1e3,Qu=(e,t)=>{let n={};return R.forEach((t,r)=>{n[t]=r<e?Ae[r]:0}),n[je]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},Y=e=>Me.reduce((t,n)=>t+n*(e[n]??0),0),X=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},$u=(e,t)=>Qu(Xu(e,t),q(e,t)?.resetCount??0),ed=(e,t)=>Y($u(e,t)),td=(e,t)=>Math.min(J(e,t),ed(e,t)+1),nd=(e,t)=>X(q(e,t)?.depositedUnits??0).disks,rd=(e,t)=>q(e,t)?.fillBits??0,id=(e,t)=>{let n=Zd(t);return n>0&&rd(e,t)>=n},ad=(e,t)=>{let n=Zd(t);return n>0?Math.min(1,Math.max(0,rd(e,t)/n)):0},od=(e,t)=>q(e,t)?.lakeTransfer??null,sd=(e,t)=>{let n=od(e,t);if(!n)return 0;let r=n.target*Zd(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},cd=(e,t)=>(q(e,t)?.depositedUnits??0)+ +!!id(e,t),ld=(e,t)=>{let n=q(e,t),r=Zd(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},ud=(e,t)=>{let n=Sd(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=ld(e,t);return r>=n*(1-1e-9)&&Pd(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},dd=(e,t)=>Sd(t)(e)<=td(e,t),fd=(e,t)=>!id(e,t),pd=(e,t)=>{let n=q(e,t);if(!n||n.lakeTransfer||!id(e,t))return null;let r=$u(e,t),i=n.depositedUnits??0,a=X(i).disks;for(let e=Me.length-1;e>=0;--e){let t=Me[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},md=(e,t,n)=>wc(e,t)*Fc(e,t)*(n===1?2:5),hd=(e,t)=>{let n=rd(e,t);return n>0&&n<Zd(t)},gd=(e,t)=>{let n=Oc(e,t);return n>0&&Ac(e,t)>=n},_d=(e,t)=>!!q(e,t)?.acquiring,vd=(e,t)=>hd(e,t)?!0:_d(e,t)?nf(e,t)&&!rf(e,t,!0)&&Ac(e,t)>Uc(e,t):gd(e,t),yd=(e,t)=>.1+.1*Math.max(0,q(e,t)?.resetCount??0),bd=(e,t)=>(e.intro?.disksBuiltTotal?.[Zd(t)]??0)>0,xd=(e,t)=>(q(e,t)?.boostersUnlocked??!1)||bd(e,t),Sd=e=>t=>{let n=q(t,e);return n?(n.purchased??0)+1:0},Cd=(e,t)=>{let n=Ee[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},wd=(e,t)=>Cd(e,t)?18:10,Td=(e,t)=>wd(e,ke.indexOf(t)+1),Ed=(e,t)=>{let n=ke[t-1];return n?Math.max(0,wd(e,t)-(e.intro?.[n]??0)):0},Dd=(e,t)=>{if(!Cd(e,t))return 0;let n=Ee[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=ke[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+Ad(e,t-1))},Od=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},kd=(e,t)=>Od(e,t)!==null,Ad=(e,t)=>{let n=Od(e,t);return n===null?0:Math.floor(n/1+zi)},jd=(e,t)=>{let n=Ee[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!kd(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<Td(e,n.outputField)},Md=e=>t=>jd(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,Nd=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=Ee[r],s=Od(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=Td({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+zi)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=Td({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},Pd=(e,t,n)=>{if(!q(e,t)||!(n>0))return null;let r=nd(e,t),i=[(r[1]??0)+ +!!id(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},Fd=(e,t)=>xd(e,t)&&Ed(e,t)>0&&Pd(e,t,Sd(t)(e))!==null,Id=(e,t)=>Ed(e,t)<=0,Ld=(e,t=1)=>n=>{let r=q(n,e);if(!r||!xd(n,e))return n;let i=ke[e-1];if(!i)return n;let a=Ed(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=Pd(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=nd(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=Yd(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},Rd=(e,t)=>{let n=Sd(t)(e);if(Pd(e,t,n)!==null)return 0;let r=Zd(t);return Math.max(r,(n-ld(e,t))*r)},zd=(e,t)=>{if(fc(e,t)||!bd(e,t))return!1;let n=Zd(t);return Rd(e,t)<=n*1e-9||Sd(t)(e)>td(e,t)||!fd(e,t)?!1:Ac(e,t)>0&&vd(e,t)},Bd=e=>t=>{if(!zd(t,e))return t;let n=Rd(t,e),r=Ac(t,e),i=Zd(e)-rd(t,e),a=_d(t,e)&&!hd(t,e)?Math.max(0,r-Uc(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=Qd(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},Vd=(e,t)=>n=>{let r=q(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},Hd=(e,t)=>q(e,t)?.autoConvertActive??!1,Ud=(e,t)=>!!q(e,t)?.boosterAuto||fc(e,t),Wd=(e,t)=>{let n=q(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!xd(e,t)||!bd(e,t)?!1:Ed(e,t)>0},Gd=(e,t)=>{let n=q(e,t);return!n||n.rebuilding||!fc(e,t)?!1:!n.lakeTransfer&&cd(e,t)>=J(e,t)&&Sd(t)(e)>J(e,t)},Kd=e=>t=>{if(!Gd(t,e))return t;let n=q(t,e),r=pc(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=dc(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return po({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},qd=e=>t=>{let n=q(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&Fd(t,e)?Ld(e,1)(t):Wd(t,e)?Vd(e,!0)(t):t},Jd=e=>{let t=e;for(let e=1;e<=10;e+=1){if(fc(t,e)&&!q(t,e)?.boosterAuto){let n=q(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}q(t,e)?.boosterAuto&&Sd(e)(t)<=J(t,e)&&Fd(t,e)&&(t=Ld(e,1)(t)),Hd(t,e)&&(Ed(t,e)<=0?t=Vd(e,!1)(t):bd(t,e)?Fd(t,e)?(t=Ld(e,1)(t),t=Vd(e,!1)(t)):t=Bd(e)(t):t=Vd(e,!1)(t))}return t},Yd=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},Xd=(e,t)=>(e-1)*R.length+R.indexOf(t)+1,Zd=e=>Pl(Xd(e,R[0])),Qd=(e,t,n,r)=>{let i=t[n]??q(e,n),a=Zd(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},$d=(e,t,n,r,i)=>{let a=q(e,t),o=Math.max(0,Zd(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=Qd(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},ef=(e,t,n)=>{let r=q(e,t);if(!r||!bd(e,t))return r;let i=Zd(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=pd(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=md(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},tf=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=q(t,r),a=ef(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},nf=(e,t)=>pc(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),rf=(e,t,n=!1)=>{let r=e.intro??{};if(hc(e,t))return!0;if(Rl(e)){let n=Hl(e);if(dc(n)===t&&Oc(e,t)>=n)return!0}if(r.diskBuild&&dc(r.diskBuild.size)===t)return!0;let i=pc(t);return!n&&i.some(t=>Gl(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(Hl(e))},af=(e,t)=>!bd(e,t)||!fd(e,t)?!1:hd(e,t)?Ac(e,t)>0:(_d(e,t)||gd(e,t))&&nf(e,t)&&!rf(e,t,_d(e,t))&&Ac(e,t)>Uc(e,t),of=(e,t=null)=>n=>{if(!(e>0))return n;let r=yc(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!af(n,o))continue;let r=Ac(n,o),s=hd(n,o)?r:Math.max(0,r-Uc(n,o));if(s<=0)continue;let c=wc(n,o)*Fc(n,o)*yd(n,o),{lake:l,remainingBits:u,changed:d}=$d(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},sf=(e,t)=>ld(e,t)*Zd(t),cf=(e,t)=>Pl(Xd(e,R[t])),lf=(e,t)=>{if(t<1||t>10||Zu(e,t))return!1;let n=cf(t,Xu(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},uf=(e,t)=>lf(e,t),df=e=>t=>{if(!uf(t,e))return t;let n=q(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:Xu(t,e)+1}}}}},ff=e=>(e.intro?.capacity??0)>=Te,pf=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},Z=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=pf(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,Td(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},mf=Z(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),hf=Z(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),gf=Z(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),_f=Z(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),vf=Z(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),yf=Z(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),bf=Z(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),xf=Z(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Sf=Z(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Cf=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=Td(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},wf=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(Td(r,n),(r.intro?.[n]??0)+1))}}},Tf=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!kd(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=Ef(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?Cf(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?Bp(d,a+1):d;return wf(e,i,n)(f)},Ef=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=Ee.length)return 0;let n=t+1,r=wc(e,n);return!(r>0)||!Number.isFinite(r)?0:8*Mu(e,Pl((n-1)*R.length+1))},Df=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,Of=(e,t)=>n=>Df(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,kf=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<Td(e,n),Af=(e,t)=>{let n=Ee[t];return n?kf(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},jf=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=Ee[e];return kf(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},Mf=e=>Tf(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),Nf=Of(`computeNodes`,`autoMergeCoresIntoNode`),Pf=e=>Df(e,`computeNodes`,`autoMergeCoresIntoNode`),Ff=jf(0),If=e=>Tf(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),Lf=Of(`computeClusters`,`autoMergeNodesIntoCluster`),Rf=e=>Df(e,`computeClusters`,`autoMergeNodesIntoCluster`),zf=jf(1),Bf=e=>Tf(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),Vf=Of(`computeNetworks`,`autoMergeClustersIntoNetwork`),Q=e=>Df(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),Hf=jf(2),Uf=e=>Tf(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),Wf=Of(`computeGrids`,`autoMergeNetworksIntoGrid`),Gf=e=>Df(e,`computeGrids`,`autoMergeNetworksIntoGrid`),Kf=jf(3),qf=e=>Tf(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),Jf=Of(`computeFabrics`,`autoMergeGridsIntoFabric`),Yf=e=>Df(e,`computeFabrics`,`autoMergeGridsIntoFabric`),Xf=jf(4),Zf=e=>Tf(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),Qf=Of(`computeClouds`,`autoMergeFabricsIntoCloud`),$f=e=>Df(e,`computeClouds`,`autoMergeFabricsIntoCloud`),ep=jf(5),tp=e=>Tf(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),np=Of(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),rp=e=>Df(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),ip=jf(6),ap=e=>Tf(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),op=Of(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),sp=e=>Df(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),cp=jf(7),lp=e=>Tf(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),up=Of(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),dp=e=>Df(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),fp=jf(8),pp=[Mf,If,Bf,Uf,qf,Zf,tp,ap,lp],mp=e=>Number.isInteger(e)&&e>=1&&e<=ke.length,hp=e=>mp(e)?ke[e-1]:null,gp=(e,t)=>{let n=De[e];return!n||!mp(t)?0:n.multiplier},_p=(e,t)=>{let n=De[e];return!n||!mp(t)?0:n.durationSeconds},vp=e=>{let t=e?.computeBoostType??null;if(!t||!De[t])return null;let n=e.computeBoostTierIndex??1,r=mp(n)?n:1,i=De[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},yp=e=>{let t=e?.computeBoosts??{},n=vp(e),r=[];for(let e of Object.keys(De)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},bp=(e,t)=>yp(e).find(e=>e.type===t)??null,xp=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},Sp=e=>yp(e).reduce((e,t)=>e+De[t.type].multiplier,0)||1,Cp=(e,t)=>yp(e).reduce((e,n)=>e+(n.queue[0]>=t?De[n.type].multiplier:0),0)||1,wp=e=>yp(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),Tp=(e,t)=>1+yp(e).reduce((e,n)=>e+(n.queue[0]>=t?De[n.type].poolBonusPercent??0:0),0)/100,Ep=(e,t,n)=>{if(!De[t])return!1;let r=hp(n);return!r||(bp(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},Dp=(e,t,n)=>Ep(e,t,n),Op=(e,t)=>{let n=bp(e.intro,t);return!!n&&Ep(e,t,n.queue[0])},kp=(e,t)=>Op(e,t),Ap=(e,t)=>Math.max(0,(bp(e.intro,t)?.queue.length??0)-1),jp=(e,t)=>Ap(e,t)>0,Mp=e=>t=>{if(!jp(t,e))return t;let n=yp(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=hp(i),o=xp(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},Np=(e,t)=>{let n=bp(e.intro,t);return!!n&&n.queue.length===1},Pp=e=>t=>Np(t,e)?xp(t,yp(t.intro).filter(t=>t.type!==e)):t,Fp=(e,t)=>n=>{if(!Dp(n,e,t))return n;let r=hp(t),i=yp(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:_p(e,t)};let s=xp(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},Ip=e=>t=>kp(t,e)?Fp(e,bp(t.intro,e).queue[0])(t):t,Lp=e=>t=>{let n=yp(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=_p(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return xp(t,r)},Rp=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},zp=e=>t=>!De[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},Bp=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=De[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return Dp(e,n,t)?Fp(n,t)(e):e},Vp=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},Hp=(e,t,n)=>n+ +(Fo(e,`egressFees`)===t),Up=(e,t,n)=>{let r=Hp(e,t,n);return Fo(e,`burnRate`)===t?ua(t,r):da(t,r)},Wp=(e,t,n)=>Math.max(ua(t,Hp(e,t,n)),Up(e,t,n)+(t===Li()?0:1)),Gp=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(Fo(e,`clockGated`)===t||Fo(e,`rateLimit`)===t&&n+1>4)return!0;if(Fo(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},Kp=e=>t=>{if(K(t))return t;let n=x[e];if(!n||!rs(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(Gp(t,e))return t;let i=Up(t,e,r+1),a=t.resources[n.id]??0;return a<Wp(t,e,r+1)?t:po({...t,...e===Li()?{lastTierEarnedThisRun:!0}:{},resources:{...t.resources,[n.id]:H(a-i)},owned:{...t.owned,[n.id]:H(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},qp=e=>1*((S[e]??0)+1),Jp=e=>Math.max(0,Math.ceil(Math.log(Je/qp(e))/Math.log(qe))),Yp=(e,t)=>Math.max(Je,qp(e)*qe**t),Xp=(e,t)=>Yp(t,e.autobuyerIntervalLevels?.[t]??0),Zp=(e,t)=>Math.min(Ke,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-Jp(t))),Qp=(e,t)=>2**Zp(e,t),$p=e=>Jp(e)+Ke,em=e=>bc[e%10]*1e3**Math.floor(e/10),tm=(e,t)=>{let n=1,r=bc.indexOf(e);for(;r===-1&&n<e;)n*=10,r=bc.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*em(r+t)},nm=(e,t=b[0].id)=>((S[t]??0)+1)*tm(10,e),rm=e=>t=>{if(K(t)||Yo(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=$p(e))return t;let r=nm(n,e);if(H(t.purge.points)<r)return t;let i=Ba(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},im=e=>Math.max(0,Math.ceil(Math.log(Je/e)/Math.log(qe))),am=e=>im(Xe[e].baseSeconds),om=(e,t)=>Math.max(Je,Xe[t].baseSeconds*qe**(e.automationIntervalLevels?.[t]??0)),sm=(e,t)=>tm(Xe[e].baseCost,t),cm=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,lm=cm,um=e=>t=>{if(!Xe[e]||K(t)||Yo(t,`global`,e)||!cm(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=am(e))return t;let r=sm(e,n);if(H(t.purge.points)<r)return t;let i=Ba(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},dm=()=>im(Ze.baseSeconds),fm=(e,t)=>Math.max(Je,Ze.baseSeconds*qe**(e.tierTickspeedIntervalLevels?.[t]??0)),pm=(e,t=b[0].id)=>((S[t]??0)+1)*tm(Ze.baseCost,e),mm=e=>t=>{if(K(t)||Yo(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=dm())return t;let r=pm(n,e);if(H(t.purge.points)<r)return t;let i=Ba(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},hm=e=>t=>({...t,computeAutoChargeEnabled:!!e}),gm=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,_m=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,vm=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},ym=e=>{if(K(e)||Po(e,`clockSpeedDisabled`)||!ya(e))return e;let t=e.globalTickspeedMultiplier??null,n=_a(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},bm=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(H(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(H(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(H(n?.capacityLevel??0))),r=Math.max(0,Math.floor(H(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,H(e?.capacity??8)),speedCapacity:Math.max(8,H(e?.speedCapacity??e?.capacity??8))}},xm=(e,t)=>{let n=e??bm(null),r=t??bm(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},Sm=(e,t)=>{let n=Hl(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:Gl(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},Cm=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=Gl(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},wm=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=lc(n);e!==n&&(n=e,r=!0)}if(!Rl(n)&&Sm(n,t)){let e=tu(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=$c(n)),a===n&&i&&(a=nl(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((q(n,t)?.purchased??0)<(i.purchased??0)&&Fd(n,t)){let e=Ld(t,(i.purchased??0)-(q(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((q(n,t)?.purchased??0)>=(i.purchased??0)||Id(n,t)||Sd(t)(n)>J(n,t))&&Xu(n,t)<(i.capacityLevel??0)){let e=df(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},Tm=e=>{let t=Wi().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=xm(n.foundryResetCaps,bm(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:Ws(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},Em=e=>{if(H(e.resources.base)<Wo(e))return e;let t=Mo(e);if(!t)return Ma(km(e,!0));let n=No(e,t.id),r=H(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return Ma({...km(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:Ri(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},Dm=e=>t=>{if(!jo(e)||Mo(t)||!qo(t,e))return t;let n={...Wi().challenges,...t.challenges};return{...km(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:Ri()}}},Om=e=>Mo(e)?Ma({...km(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:Ri()}}):e,km=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=t?gs(e.resources[O],n):0,i=Wi(),a=e.purge.count+ +!!t,o=Ao(e),s={id:`p${a}-${Date.now()}`,at:Date.now(),purgeNumber:a,pointsAwarded:r,moneyBits:H(e.resources[O])},c=e.prestigeMuseum??i.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return ma({...i,challenges:e.challenges??i.challenges,achievements:e.achievements??i.achievements,daily:e.daily??i.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...i.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??i.intro.mainGameUnlocked,capacity:e.intro?.capacity??i.intro.capacity,byteCreated:e.intro?.byteCreated??i.intro.byteCreated,bits:e.intro?.bits??i.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??i.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??i.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??i.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??i.intro.diskCache,diskBuild:e.intro?.diskBuild??i.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??i.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??i.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??i.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??i.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??i.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:Ws(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??i.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??i.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??i.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??i.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??i.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??i.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??i.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??i.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??i.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??i.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??i.intro.computeNodes,computeClusters:e.intro?.computeClusters??i.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??i.intro.computeNetworks,computeGrids:e.intro?.computeGrids??i.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??i.intro.computeFabrics,computeClouds:e.intro?.computeClouds??i.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??i.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??i.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??i.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??i.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??i.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??i.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??i.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??i.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??i.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??i.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??i.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??i.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??i.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??i.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??i.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??i.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??i.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??i.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??i.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??i.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??i.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??i.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??i.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??i.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??i.autobuyers,autobuyersEnabled:e.autobuyersEnabled??i.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??i.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??i.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??i.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??i.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??i.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??i.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??i.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??i.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??i.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??i.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??i.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??i.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??i.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??i.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??i.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??i.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??i.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??i.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??i.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??i.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??i.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??i.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??i.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??i.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??i.autoGlobalTickspeedEnabled,era:e.era??i.era,eons:e.eons??i.eons,hyperscalerCount:e.hyperscalerCount??i.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??i.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??i.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??i.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||H(e.purge.points)+r>=100,owned:e.computeFlops?.owned??i.computeFlops.owned,cumulativeBoost:i.computeFlops.cumulativeBoost},purge:{...i.purge,points:H(e.purge.points)+r,count:a,unboundedUnlocked:o}})},Am=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},jm=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},Mm=(e,t)=>t!==e&&Po(t,`bitRot`)?Qo(t,{cycleSeconds:0}):t,Nm=(e,t)=>t===e?t:Ma(t),Pm=e=>Mm(e,Nm(e,Im(e))),Fm=e=>{let t=Rm(e);return t===e?Mm(e,Nm(e,t)):po(Lm(e,Mm(e,Nm(e,t))))},Im=e=>{if(K(e))return e;let t=So(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<Co(e))return e;let n=Wi(),r=xo(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<zo(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:H(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:Eo(e)??n.overclockLastClaimCompletedLevels}},Lm=(e,t)=>{if(Mo(e))return t;let n=Math.max(0,(e.purchaseLevels?.[Bo(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=Eo(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&fo(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),Ao(e)&&n>=12&&fo(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},Rm=e=>{if(K(e)||Po(e,`overclockDisabled`))return e;let t=Bo(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<wo(e))return e;let r=Wi();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},zm=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,Bm=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,Vm=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,Hm=e=>t=>{if(K(t)||Po(t,`restageDisabled`)||!xa(t))return t;let n=Bo(t).id;if(H(t.owned?.[n])<=0)return t;let r=Math.floor(H(e));if(r<=0)return t;let i=t.lastTierXpConsumed??0;if(r<Ca(i))return t;let a=H(t.purge.xp);if(r>a)return t;let o=b.filter(e=>e.id!==n).map(e=>e.id);return{...t,purge:{...t.purge,xp:a-r},lastTierXpConsumed:i+r,owned:{...t.owned,...o.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...t.resources,[O]:0,...o.reduce((e,t)=>({...e,[t]:0}),{})}}},Um=B.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Wm=B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,Gm=B.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,Km=B(Ii)`
  gap: 0.4rem;
`,qm=B.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Jm=B.button`
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
`,Ym=B.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Xm=B.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,Zm=B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,Qm=B.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,$m=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=ai(),c=new Set(mo(t)),l=pe.map(e=>({...e,members:I.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0);return(0,V.jsxs)(Um,{children:[(0,V.jsx)(Wm,{children:(0,V.jsx)(`h1`,{children:`Achievements`})}),(0,V.jsx)(Gm,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>fo(t,e.id)).length,u=c.has(e.id);return(0,V.jsxs)(Km,{"aria-label":`${e.name} achievement group`,children:[(0,V.jsxs)(qm,{children:[(0,V.jsxs)(Jm,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,V.jsxs)(Qm,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length]})]}),n[e.id]&&e.members.map(e=>{let n=fo(t,e.id),r=e.secret&&!n,c=r?`???`:e.name;return(0,V.jsxs)(Ym,{"aria-label":`${c} achievement ${n?`earned`:`not yet earned`}`,children:[(0,V.jsxs)(Xm,{$earned:n,children:[r?(0,V.jsx)(`strong`,{children:c}):(0,V.jsx)(Jm,{"aria-expanded":!!i[e.id],"aria-label":`${e.name} details`,onClick:()=>o(a,e.id),type:`button`,children:(0,V.jsx)(`strong`,{children:c})}),!r&&i[e.id]&&(0,V.jsxs)(Zm,{children:[e.trigger,e.bonus?` — ${e.bonus}`:``]})]}),(0,V.jsx)(Qm,{$color:n?s.color.good:s.color.disabled,children:n?`✅`:`🔒`})]},e.id)})]},e.id)})})]})},eh=`high`,th=`normal`,nh=()=>b[b.length-1],rh=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],ih=[Pf,Rf,Q,Gf,Yf,$f,rp,sp,dp],ah=e=>rh.some((t,n)=>jd(e,n)),oh=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,sh=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,ch=e=>sl(e)&&(e.intro?.bits??0)>=kl(e),lh=1,uh={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},dh=(e,t)=>{let[n,r]=uh[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&om(e,t)<lh},fh=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&Xp(e,t)<lh,ph=(e,t)=>e?eh:t?th:!1,mh=e=>{if(K(e))return!1;let t=ra(e);return b.some(n=>{if(!rs(e)(n)||fh(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:ca(n,r,t,i,ks(e,n),2**53-1)>=a})},hh=e=>K(e)||!ya(e)||dh(e,`speedUp`)?!1:va(e),gh=e=>{if(K(e)||dh(e,`scaleUp`))return!1;let t=So(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=Co(e)},_h=e=>{if(K(e)||dh(e,`overclock`))return!1;let t=nh();return rs(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=wo(e):!1},vh=e=>K(e)&&!dh(e,`purge`),yh=e=>vh(e)||mh(e)||hh(e)||gh(e)||_h(e),bh=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],xh=e=>{if((e.purge?.count??0)<1||K(e))return!1;let t=e.purge?.points??0;return bh.some(n=>{if(!lm(e,n))return!1;let r=Jo(`global`,n);if(r&&!No(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<am(n)&&t>=sm(n,i)})},Sh=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=hs(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.buyMaxUnlocked&&t>=2||!e.cacheWarmUnlocked&&t>=20)return!0;let n=Ia(Pa(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},Ch=e=>xh(e)||Sh(e),wh=e=>yh(e),Th=e=>ph(vh(e)||mh(e),wh(e)),Eh=e=>oh(e)||sh(e)||Jc(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||Qc(e)&&(e.intro?.bits??0)>=Zc(e.intro)||eu(e)&&!e.intro?.diskBuildQueued||zl(e)||ch(e),Dh=e=>ph(oh(e)||sh(e),Eh(e)),Oh=e=>rh.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(pf(e,r)<10||a<Td(e,n))}),kh=e=>ff(e)?Oh(e)||ih.some(t=>t(e))||ah(e):!1,Ah=e=>ff(e)?ph(Oh(e),kh(e)):!1,jh=e=>za(e)?ot.some(t=>Wa(e,t.id)):!1,Mh=e=>jh(e)?th:!1,Nh=e=>({game:Th(e),foundry:Dh(e),boosters:Ah(e),compute:Mh(e),perks:Ch(e)?th:!1}),Ph=`3.25rem`,Fh=bi`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,Ih=B.nav`
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
`,Lh=B.button`
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
`,Rh=B.span`
  font-size: 1.05rem;
  line-height: 1;
`,zh=B.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,Bh=B.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?pi`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${Fh} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:pi`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,Vh=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,V.jsxs)(Ih,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,V.jsxs)(Lh,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,V.jsx)(Bh,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,V.jsx)(Rh,{"aria-hidden":`true`,children:n.icon}),(0,V.jsx)(zh,{children:n.label})]},n.id)}),(0,V.jsxs)(Lh,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,V.jsx)(Rh,{"aria-hidden":`true`,children:`⋯`}),(0,V.jsx)(zh,{children:`More`})]})]})},Hh=`calc(${Ph} + env(safe-area-inset-bottom))`,Uh={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},Wh=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&Uh[e];return i?r?n.color.disabled:n.color[i]:t},Gh={white:`255, 255, 255`,darkgrey:`169, 169, 169`},Kh=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},qh=e=>e?e.startsWith(`#`)?Kh(e):Gh[e]??`255, 255, 255`:`255, 255, 255`,Jh=bi`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,Yh=e=>Math.min(100,Math.max(0,e??0)),Xh=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=Yh(t),l=Yh(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return pi`
    background: linear-gradient(
      to right,
      ${o}${u} 0%,
      ${o}${u} ${c}%,
      ${s}${d} ${c}%,
      ${s}${d} ${l}%,
      transparent ${l}%,
      transparent 100%
    ), ${a.color.surfaceSunken};
  `},$=B.button.withConfig({shouldForwardProp:e=>e!==`variant`})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95em;
  font-weight: 600;
  margin: 0;
  padding: 0.5em 0.9em;
  border-radius: 6px;
  color: ${Wh};
  border: 1.5px solid ${Wh};
  background: ${e=>e.theme.color.surfaceSunken};
  ${Xh}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>qh(Wh(e))};
  animation: ${e=>e.$pulse&&!e.disabled?pi`${Jh} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${Wh};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Zh=B.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,Qh=B.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,$h=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,eg=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,V.jsx)(Qh,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!$h.test(n)?(0,V.jsx)(Qh,{children:n}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Zh,{children:n.slice(0,r+1)}),(0,V.jsx)(Qh,{children:n.slice(r+1)})]})},tg=B.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,ng=B.div`
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
`,rg=B(Ii)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,ig=B.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,ag=B.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,og=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,V.jsx)(ng,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,V.jsxs)(rg,{$raised:!0,children:[(0,V.jsx)(ig,{id:n,children:`Save not compatible`}),(0,V.jsx)(ag,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,V.jsx)($,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},sg=1e80,cg=30,lg=20,ug=2**53-1,dg=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],fg=[1,2,5],pg=Object.fromEntries(dg.map(e=>[e.id,e])),mg=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],hg=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>Vp(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>_m(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:Vm,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:Bm,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:zm,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:gm,isOn:e=>e.autoOverclockEnabled??!0}],gg=Object.fromEntries(hg.map(e=>[e.key,e])),_g=(e,t)=>!!gg[t]?.isOn(e),vg=e=>new Date(e).toISOString().slice(0,10),yg=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},bg=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},xg=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},Sg=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),Cg=(e,t)=>{let n=hg.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},wg=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},Tg=e=>e.startBytes*8,Eg=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,Dg=(e,t,n)=>{let r=wg(t,n.levers);return Eg(e)===Eg(r)?r:{...r,resources:{...r.resources,[O]:Tg(n)}}},Og={buyTier:{make:e=>Ms(e,ug)},tierTickspeed:{make:e=>Kp(e)},clockSpeed:{make:()=>ym},scaleUp:{make:()=>Pm},overclock:{make:()=>Fm},restage:{make:e=>Hm(e)},automation:{make:e=>Object.hasOwn(gg,e?.key??``)?gg[e.key].set(!!e.enabled):e=>e}},kg=b[b.length-1],Ag=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${U(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${U(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${kg.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),jg=Object.fromEntries(Ag.map(e=>[e.key,e])),Mg=Object.fromEntries(Ag.map(e=>[e.key,0])),Ng={balance:0,clock:0,owned:{},purchaseLevels:{}},Pg=(e,t=e)=>({...e,runPeaks:Io(e.runPeaks??Ng,t)}),Fg=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=Eo(t)??0;return a!==(Eo(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},Ig=(e,t,n,r)=>{let i=e.game,a=Dg(i,Pg(Cs(n,ug)(i)),t);return r&&Eg(i)!==Eg(a)&&r(a),{game:a,metrics:Fg(i,a,e.metrics)}},Lg=(e,t,n,r,i)=>{let a=e.game,o=Og[n].make(r)(a);if(o===a)return e;let s=Dg(a,Pg({...o,runPeaks:a.runPeaks},o),t);return i&&Eg(a)!==Eg(s)&&i(s),{game:s,metrics:Fg(a,s,e.metrics)}},Rg=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],zg=(e,t,n)=>{let r=e;for(let e=0;e<lg;e++){let e=r;for(let[r,i]of Rg)e=Lg(e,t,r,i,n);if(e===r)break;r=e}return r},Bg=e=>({...e,runPeaks:Io(Ng,e)}),Vg=e=>({game:e,metrics:Fg(e,e,Mg)}),Hg=(e,t,n,r,i)=>{let a=zg(Vg(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=zg(Ig(a,t,n,i),t,i),o.push(a.metrics);return o},Ug=(e,t=0)=>e.map(e=>[t,e,!0]),Wg=[Ug([`scaleUp`,`restage`,`overclock`]),Ug([`scaleUp`,`restage`]),[...Ug([`scaleUp`,`restage`]),...Ug([`overclock`],1)],[...Ug([`scaleUp`,`restage`]),...Ug([`overclock`],2)],[...Ug([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...Ug([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],Ug([`overclock`,`restage`])],Gg=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},Kg=(e,t,n,r,i)=>{let a=Vg(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=Ig(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=Lg(a,t,e,n);o.push(a.metrics)}return o},qg=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},Jg=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:Eo(e)??0}),Yg=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=qg(n,e);if(t>i)return t}return null},Xg=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(qg(t/e,1));if(i>n&&i<t)return i}let i=r(qg(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},Zg=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},Qg=(e,t,n)=>{let r=pg[t],i=n===`fallback`,a=bg(`${e}|${t}|v7|${n}`),o=xg(a),s=i?1e6:fg[Math.floor(o()*fg.length)]*10**Sg(o,r.startExponent),c=[];if(!i){let e=[...mg],t=Sg(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:Cg(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:Sg(o,r.warmupSeconds.map(e=>e/cg))*cg,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:7,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>mg.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=Wi();v.resources={...v.resources,[O]:Tg(_)};for(let e of u)v=gg[e].unlock(v);v=Bg(wg(v,l));let y=v;Hg(v,_,cg,f/cg,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=Dg(y,gg[e].set(!1)(y),_);y=Bg(y);let b=[Vg(y).metrics];for(let e=Vg(y),t=0;t<p;t++)e=Ig(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?Ag:Zg(o,Ag),C=(e,t)=>{let n=Yg(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=Xg(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=Wg.map(e=>Gg(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:Kg(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=sg);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=Hg(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:Jg(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},$g=new Map,e_=(e,t)=>{let n=`${e}|${t}`,r=$g.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=Qg(e,t,n);r??=Qg(e,t,`fallback`),$g.size>64&&$g.clear(),$g.set(n,r)}return r},t_=(e,t)=>e_(e,t).def,n_=e=>ue.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),r_=e=>e.metrics?.[e.def.objective?.key]??0,i_=e=>r_(e)>=e.def.objective?.target,a_=e=>{let t=e.def.objective;if(!t)return 0;let n=r_(e);if(n>=t.target)return 1;if(!jg[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},o_=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),s_=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=i_(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||r_(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=o_(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},c_=(e,t)=>n=>{if(!n_(n)||!pg[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=e_(vg(t),e);return o_(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:Vg(i).metrics})},l_=e=>t=>t.daily.runs[e]?o_(t,e,null):t,u_=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===vg(n)},d_=(e,t)=>n=>u_(n,e,t)?c_(e,t)(l_(e)(n)):n,f_=e=>t=>{let n=t;for(let t of dg){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==7){n=o_(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=Ig(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=s_(o_(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},p_=(e,t,n,r)=>i=>{if(!Object.hasOwn(Og,t))return i;let a=f_(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=Lg(s,o.def,t,n);return c===s?a:s_(o_(a,e,{...o,...c}),e,r)},m_=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},h_=B.div`
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
`,g_=B(Ii)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,__=B.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,v_=B.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,y_=B.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,b_=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,V.jsx)(h_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,V.jsxs)(g_,{$raised:!0,children:[(0,V.jsx)(__,{id:d,children:t}),(0,V.jsx)(v_,{children:n}),(0,V.jsxs)(y_,{children:[(0,V.jsx)($,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,V.jsx)($,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},x_={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},S_=e=>wp(e)>0,C_=e=>S_(e),w_=(e,t)=>t<wp(e),T_=(e,t)=>t<=wp(e),E_=(e,t=0)=>{let n=yp(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*De[e.type].durationSeconds;return`${x_[e.type]??e.type} ×${De[e.type].multiplier} (${Os(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${Cp(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},D_=pi`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${bi`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,O_={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},k_=e=>Os(e).replace(/ 0[ms]$/,``),A_=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,j_=B($)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,M_=B.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,N_=`2.8em`,P_=B(j_)`
  flex: 0 0 ${N_};
  width: ${N_};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,F_=B.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${N_};
  width: ${N_};
`,I_=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,L_=B.div`
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
`,R_=B.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,z_=B.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B_=B.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,V_=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,H_=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},U_=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=O_[r]??{icon:`⚡`,label:r},s=_p(r,i[0]),c=gp(r,i[0]),l=H_(i),u=l.length-1;return(0,V.jsx)(I_,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=A_(e.tierIndex);return(0,V.jsxs)(M_,{children:[i===u?jp(t,r)?(0,V.jsx)(P_,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,V.jsx)(eg,{children:`↩`})}):(0,V.jsx)(P_,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!Np(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,V.jsx)(eg,{children:`✕`})}):(0,V.jsx)(F_,{"aria-hidden":`true`}),(0,V.jsxs)(L_,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${A_(e.tierIndex,`name`)}, ${Os(f)}${l?` once it starts`:` left`}`,children:[(0,V.jsx)(R_,{children:`${e.count}x`}),(0,V.jsx)(z_,{children:`${m} ${o.icon} ×${c}`}),(0,V.jsx)(B_,{children:Os(f)})]}),i===0?(0,V.jsx)(P_,{"aria-label":`stack the ${o.label} compute boost`,disabled:!kp(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${k_(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,V.jsx)(eg,{children:`+`})}):(0,V.jsx)(F_,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},W_=({state:e,actions:t})=>{let n=yp(e.intro??{});return n.length===0?null:(0,V.jsx)(V_,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,V.jsx)(U_,{lane:n,state:e,actions:t},n.type))})},G_=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)($,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,V.jsx)(b_,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,V.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},K_=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},q_=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,J_=e=>`Unlocks at Purge ${Ko(e)}`,Y_=e=>`${e.id} · ${e.target} · ${e.codename}`,X_=(e,t)=>t-e%t,Z_=e=>{let t=Mo(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${K_(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${K_(X_(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${K_(X_(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${K_(Math.ceil(X_(n,30)))}`];case`bitRot`:return[`Corruption ${$i(Uo(e))} vs ${$i(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},Q_=B.section`
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
`,$_=B.button`
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
`,ev=B.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,tv=B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,nv=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=Mo(e);if(!a)return null;let o=K_(e.challenges.activeSeconds);return(0,V.jsxs)(Q_,{"aria-label":`active challenge banner`,children:[(0,V.jsxs)(ev,{children:[(0,V.jsxs)($_,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,V.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,V.jsx)(tv,{children:a.rule}),(0,V.jsxs)(tv,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,q_(a.goal)]}),Z_(e).map(e=>(0,V.jsx)(tv,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,V.jsx)(G_,{challenge:a,onExit:t})]})},rv=B.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,iv=Object.freeze({removeAds:!1}),av=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>iv}),ov=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return av();let n=null,r=null,i=null,a=iv,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},sv=null,cv=()=>(sv??=ov({loadAds:null,loadIap:null}),sv),lv=1e4,uv=400,dv=100,fv=B.div`
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
`,pv=B(Ii).attrs({role:`status`,"aria-live":`polite`})`
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
`,mv=B.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,hv=B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,gv=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=cv()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+lv}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+lv})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,dv);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,uv);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&Es(e.elapsedRealSeconds,e.capSeconds)>0;return(0,V.jsx)(fv,{children:(0,V.jsxs)(pv,{"aria-label":`offline progress notice`,$fading:c,children:[(0,V.jsxs)(mv,{children:[`Resumed from sleep! You were away for `,Os(e.elapsedRealSeconds),` — simulated `,Os(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,V.jsxs)(hv,{children:[f&&(0,V.jsx)($,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,V.jsxs)($,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},_v=B.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,vv=pi`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,yv=B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,bv=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,xv=bi`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Sv=B(Ii)`
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
  animation: ${e=>e.$animateReveal?pi`${xv} 0.4s ease-out`:`none`};
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
`,Cv=e=>pi`
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
`,wv=B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,Tv=B.div`
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
`,Ev=B(Ii)`
  ${Cv(`#0e7490`)}
`,Dv=B(Ii)`
  ${Cv(`#1d4ed8`)}
`,Ov=B(Ii)`
  ${Cv(`#8b5cf6`)}
`,kv=B(Ii)`
  ${Cv(`#c2410c`)}
`,Av=B.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,jv=B(Ii)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&pi`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&pi`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,Mv=B.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Nv=B.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Pv=B.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,Fv=B(rv)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,Iv=B(Nv)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,Lv=B.div`
  position: relative;
`,Rv=B.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,zv=B.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,Bv=B.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Vv=B.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${Hh};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,Hv=B.div`
  ${e=>Xh({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,Uv=B.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,Wv=B(jv)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,Gv=B.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,Kv=B.div`
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

  ${e=>e.$compressed&&pi`
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
`,qv=B.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,Jv=B.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,Yv=B.div`
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
`,Xv=B.div`
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
`,Zv=B.div`
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
`,Qv=B.div`
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
`,$v=B.div`
  height: ${e=>e.$height}px;
`,ey=B.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,ty=B.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,ny=B.h3`
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
`,ry=B.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,iy=B.details`
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
`,ay=B.span`
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
`,oy=B($)`
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
`,sy=B(Zh)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,cy=B.span`
  font-weight: 800;
`,ly=B(Qh)`
  flex: 1 0 auto;
  text-align: right;
`,uy=B($)`
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
`,dy=(e,t)=>t===`base`?$i(e):t===`bytes`?ea(e):`${U(e)} ${E(t)}`,fy=(e,t)=>Math.min(100,Math.round(e/t*100)),py=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),my=e=>Math.round((e-1)*100),hy=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),gy=(e,{precise:t=!1}={})=>e>=2?`${py(e)}x`:`+${t?hy(e):my(e)}%`,_y=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=ai(),{purge:s}=a,c=a.resources[O]>=Wo(a),l=Ao(a),u=a.prestigeDoublePpLevel??0,d=Ta(a),f=wa(s.count,d),p=gs(a.resources[O],u),m=os(a.resources[O],Wo(a)),h=ss(a.resources[O]),g=Math.round(h*100),_=a.resources[O],y=ta(_),x=$i(_),S=!!Mo(a)&&No(a,Mo(a).id),C=q_(Wo(a)),w=S?0:Math.max(1,p),T=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${C})`,k=S?`${T} — completes the challenge repeat, awards no Purge Points`:`${T} — awards +${U(w)} Purge Point${w===1?``:`s`}`,[A]=(0,v.useState)(()=>new Set(b.filter(e=>rs(a)(e)).map(e=>e.id))),[j,M]=(0,v.useState)(()=>new Set),ee=e=>M(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),N=(0,v.useRef)(null),P=(0,v.useRef)(new Map),te=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;M(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return N.current=e,()=>e.disconnect()},[]);let ne=e=>(te.current.has(e)||te.current.set(e,t=>{let n=N.current,r=P.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(P.current.set(e,t),n&&n.observe(t)):P.current.delete(e)}),te.current.get(e)),[re,F]=(0,v.useState)(!1),ie=()=>F(e=>!e),ae=K(a),oe=Mo(a),se=e=>oe?.effect===e,ce=oe?` — disabled by challenge ${oe.id} ${oe.codename}`:``,le=s.count===0,ue=!!e.buyUnitMode,de=!!e.buyMaxMode&&Ns(a)&&!ue,fe=ra(a),pe=ae&&le,me=ae&&!le,I=!!oe||me||!!e.goal||yp(a.intro??{}).length>0,L=Bo(a),he=a.purchaseLevels?.[L.id]??1,ge=rs(a)(L),_e=So(a),ve=a.purchaseLevels?.[_e.id]??1,ye=a.scaleUpCount??0,be=Co(a),xe=Math.max(0,he-1),Se=Math.max(0,ve-1),Ce=be,we=fy(Se,Ce),Te=!ae&&Se>=be,Ee=b[b.indexOf(_e)+1]??null,De=Ee?.symbol===`TB`,Oe=us(a),ke=Number.isInteger(Oe)?String(Oe):Oe.toFixed(2),R=Oe===2?`doubles`:`multiplies by ${ke}`,[Ae,je]=(0,v.useState)(ge);(0,v.useEffect)(()=>{ge&&je(!0)},[ge]);let Me=Eo(a)??0,Ne=wo(a),Pe=Ne,Fe=1+ls(a),Ie=1+ls({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),Le=1+$e,Re=fy(xe,Pe),ze=!ae&&!se(`overclockDisabled`)&&xe>=Ne,Be=a.globalTickspeedMultiplier??null,Ve=Be!==null,He=cs(a),Ue=ga(Be??0),We=ya(a),Ge=!ae&&!se(`clockSpeedDisabled`)&&We&&va(a),Ke=xa(a),qe=a.owned[L.id]??0,Je=a.lastTierXpConsumed??0,Ye=Math.floor(a.purge.xp??0),Xe=Ca(Je),Ze=fy(Ye,Xe),Qe=Ke&&!ae&&!se(`restageDisabled`)&&qe>0&&Ye>=Xe,et=gy(Sa(Ye)),tt=()=>{Qe&&window.confirm(`Restage: consume ${U(Ye)} XP for ${et} faster ${L.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.`)&&t.consumeXpForLastTierTickspeed(Ye)},nt=fy(a.resources.base??0,_a(Be??0)),[rt,it]=(0,v.useState)(We);(0,v.useEffect)(()=>{We&&it(!0)},[We]);let at=(0,v.useRef)(null);(0,v.useEffect)(()=>{pe&&at.current?.focus()},[pe]);let ot=(0,v.useRef)(null),[st,ct]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=ot.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>ct(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[pe]);let lt=(0,v.useRef)(null),[ut,dt]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=lt.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>dt(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[me]),pe?(0,V.jsx)(Xv,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,V.jsxs)(Zv,{children:[(0,V.jsx)(`h2`,{children:`💾 Disk full`}),(0,V.jsxs)(ey,{children:[`You've reached `,$i(a.resources[O]),` — 1 Googol Bytes. All production has stopped.`]}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Resets your resources, owned tiers, and purchases`}),(0,V.jsxs)(`li`,{children:[`Awards `,U(p),` Purge Point`,p===1?``:`s`,` — spend them on the Firmware page for automation and production bonuses`]}),(0,V.jsx)(`li`,{children:`Keeps your unlocked autobuyers and Purge Points`})]}),(0,V.jsx)($,{ref:at,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:(0,V.jsx)(eg,{children:`✦ Purge Now`})})]})}):(0,V.jsxs)(_v,{children:[(0,V.jsx)(nv,{onExit:t.exitChallenge,state:a}),me&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(Qv,{ref:lt,"aria-label":`purge available banner`,children:[(0,V.jsxs)(ey,{children:[C,` reached — production has stopped.`]}),(0,V.jsxs)($,{"aria-label":k,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,V.jsx)(Zh,{children:`✦ `}),(0,V.jsx)(Qh,{children:S?`Complete challenge`:`Purge +${U(w)} PP`})]})]}),(0,V.jsx)($v,{$height:ut})]}),(0,V.jsx)(Vv,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,V.jsxs)(Hv,{$percent:e.goal?e.goal.percent:m,children:[(0,V.jsx)(tg,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${C}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:m,"aria-valuemin":0,"aria-valuemax":100}),(0,V.jsx)(Uv,{children:e.goal?e.goal.label:`${m}% to Purge`})]})}),I?(0,V.jsx)(tg,{as:`h1`,children:`Byte Factory`}):(0,V.jsx)(yv,{children:(0,V.jsx)(`h1`,{children:`Byte Factory`})}),(0,V.jsx)(W_,{actions:t,state:a}),(0,V.jsx)(gv,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,V.jsx)(qv,{ref:ot,"aria-hidden":`true`}),(0,V.jsxs)(Kv,{$compressed:st,$belowBar:me,$belowBarHeight:ut,children:[(0,V.jsxs)(jv,{$raised:!0,children:[(0,V.jsxs)(Lv,{children:[(0,V.jsx)(Mv,{"aria-controls":`global-multipliers-details`,"aria-expanded":re,"aria-label":`money display`,onClick:ie,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ie())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,V.jsx)(Fv,{children:y})}),!st&&y!==x&&(0,V.jsx)(Iv,{"aria-label":`balance in bits: ${x}`,children:x})]}),!st&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Rv,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(h-n)/.125));return(0,V.jsx)(zv,{children:(0,V.jsx)(Bv,{$fraction:r})},t)})}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":g,"aria-valuemin":0,"aria-valuemax":100})]}),re&&!st&&(0,V.jsxs)(Gv,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!le&&(0,V.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${gy(Da(a))} production speed from ${U(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${U(100)} PP on Firmware → Prestige)`]}),!le&&(0,V.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${gy(f)} production speed from ${U(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${U(1)} PP on Firmware → Prestige)`]}),(0,V.jsxs)(`li`,{children:[`Scale Up: `,ye>0?`${ye} activation${ye===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${U(Ce)} completed levels on ${_e.name})`]}),rt&&(0,V.jsxs)(`li`,{children:[`Accelerate: `,Ve?`${gy(He,{precise:!0})} faster ticks on every tier`:`not yet active`]}),Ae&&(0,V.jsxs)(`li`,{children:[`Overclock: `,Me>0?`The per-level speed bonus is now ${hy(Fe)}% (was ${hy(Ie)}%)`:`not yet claimed (reach ${U(Pe)} completed levels on ${L.name})`]})]})]}),!le&&(0,V.jsx)(Wv,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,V.jsxs)(Nv,{children:[(0,V.jsxs)(Pv,{children:[U(s.points),` PP`]}),d&&` · ${gy(f)} production speed`]})})]}),(rt||Ke)&&(0,V.jsxs)(Av,{children:[rt&&(0,V.jsxs)(Dv,{"aria-label":`global accelerate panel`,children:[(0,V.jsxs)(iy,{children:[(0,V.jsx)(`summary`,{children:(0,V.jsxs)(Tv,{children:[(0,V.jsx)(`h2`,{children:`Accelerate`}),(0,V.jsxs)(wv,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,hy(Fe),`%/lvl`]})]})}),(0,V.jsx)(ty,{children:Ve?`${gy(He,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,V.jsxs)($,{"aria-label":Ve?`Upgrade Accelerate for ${ea(Ue)} (currently ${gy(He,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${ea(Ue)}`,color:Ge?`#3b82f6`:`darkgrey`,disabled:!Ge,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${se(`clockSpeedDisabled`)?ce:``}`,type:`button`,$progress:nt,$progressColor:`#3b82f6`,$pulse:Ge,children:[(0,V.jsx)(Zh,{children:`🌐 `}),(0,V.jsx)(Qh,{children:ea(Ue)}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":nt,"aria-valuemin":0,"aria-valuemax":100})]})]}),Ke&&(0,V.jsxs)(Ov,{"aria-label":`restage panel`,children:[(0,V.jsxs)(iy,{children:[(0,V.jsx)(`summary`,{children:(0,V.jsxs)(Tv,{children:[(0,V.jsx)(`h2`,{children:`Restage`}),(0,V.jsxs)(wv,{title:`Each XP consumed makes ${L.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[L.symbol,` +`,my(Sa(1)),`%/XP`]})]})}),(0,V.jsxs)(ty,{children:[gy(Sa(Je),{precise:!0}),` faster `,L.name,` ticks`,` `,`from `,U(Je),` XP consumed. Next consumption needs at least `,U(Xe),` XP.`]})]}),(0,V.jsxs)($,{"aria-label":`Restage: consume ${U(Ye)} XP for ${et} ${L.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${se(`restageDisabled`)?ce:``}`,variant:`smart`,disabled:!Qe,onClick:tt,title:qe>0?`Consume XP for a compounding +1% ${L.name} tickspeed per XP (min ${U(Xe)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${L.name} owned right now — nothing to speed up, so this stays disabled until you own at least one again`,type:`button`,$progress:Ze,$pulse:Qe,children:[(0,V.jsx)(Zh,{children:`🧬 `}),(0,V.jsxs)(Qh,{children:[U(Ye),` XP`]}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`${L.name} Restage progress`,"aria-valuenow":Ze,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,V.jsx)(bv,{children:b.map((e,n)=>{if(!rs(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=As(a,e.id),c=ks(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,p=G(a,e.id)??e,m=ca(p,l,fe,d,c,2**53-1),h=ue?Math.min(1,m):m,g=sa(p,l,fe,d,1),_=h>0?sa(p,l,fe,d,h):g,v=m>0&&!ae,y=d/fe*100,b=h/fe*100,x=a.tickspeedLevels?.[e.id]??1,S=ha(x)*(e.id===L.id?Sa(a.lastTierXpConsumed??0):1),C=gy(S),w=vo(l,_o(a)),T=bo(a,e.id),O=Math.floor(i*f*T*w*Ro(a,e.id)),k=e.producesResourceId===`base`?$i(O):e.producesResourceId===`bytes`?ea(O):`${U(O)} ${E(e.producesResourceId)}`,M=D(e.id),N=ds(a,e.id),P=Up(a,e.id,x+1),te=Wp(a,e.id,x+1),re=r>=te&&!ae&&!Gp(a,e.id),F=de?Hs(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ie=F.levels>0?`Buy ${U(F.levels)} full level${F.levels===1?``:`s`} for ${$i(F.cost)} total; highest level costs ${$i(F.partialQuantity>0?F.partialCost:F.lastLevelCost)}${F.partialQuantity>0?` (${F.partialQuantity} of ${fe} purchases toward the next level)`:``} (${U(u)} completed levels)`:`Buy${h>1?` ×${h}`:``} for ${$i(_)} (${U(u)} completed levels, ${U(d)} of ${fe} purchased toward the next)`,oe=`Tickspeed multiplier (+10% faster ticks) for ${dy(P,e.id)}${te>P+1?` (requires ${dy(te,e.id)} owned)`:``}`,se=F.levels>0?`+${U(F.levels)}`:``,ce=`⚙ ${dy(P,e.id)}`,le=fy(r,te),pe=o.tierAccents[n%o.tierAccents.length],me=j.has(e.id),I=`${e.id}-details`,he=w_(a.intro,n);return(0,V.jsxs)(Sv,{ref:ne(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:pe,$animateReveal:!A.has(e.id),$boosted:he,children:[(0,V.jsxs)(Jv,{children:[(0,V.jsx)(ny,{children:(0,V.jsxs)(ry,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":me,"aria-controls":I,onClick:()=>ee(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),ee(e.id))},children:[(0,V.jsx)(tg,{children:e.name}),(0,V.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,V.jsxs)(ay,{title:`Owned`,children:[(0,V.jsx)(tg,{children:`Owned: `}),U(i)]})]}),me&&(0,V.jsx)(Yv,{id:I,children:(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[`Production: +`,k,` per delivery`]}),(0,V.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,py(M),`s`]}),(0,V.jsxs)(`li`,{children:[`Effective tickspeed: every `,py(N),`s (tier ×`,py(S),`, global ×`,py(He),`)`]}),(0,V.jsxs)(`li`,{children:[`Completed levels: `,U(u),` (`,U(d),`/`,fe,` purchased toward the next) — purchase milestone bonus: ×`,py(w),` from `,U(s),` lifetime purchases`]}),T>1&&(0,V.jsxs)(`li`,{children:[`Scale Up bonus: ×`,py(T)]}),he&&(0,V.jsx)(`li`,{children:E_(a.intro,n)}),(0,V.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,V.jsxs)(uy,{"aria-label":oe,variant:`success`,disabled:!re,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${x} (${C} faster ticks) — the next level makes it 10% more`,$progress:le,$pulse:re,children:[(0,V.jsx)(eg,{children:ce}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":le,"aria-valuemin":0,"aria-valuemax":100})]}),(0,V.jsxs)(oy,{"aria-label":ie,variant:`plain`,disabled:!v,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${fe} purchases) also multiplies it by ×${_o(a)}`,$progress:y,$secondaryProgress:b,$pulse:v,children:[(0,V.jsxs)(sy,{children:[`🛒 `,U(u),se&&(0,V.jsx)(cy,{children:se})]}),(0,V.jsx)(ly,{children:$i(F.levels>0?F.partialQuantity>0?F.partialCost:F.lastLevelCost:_)}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":fe})]})]},e.id)})}),(0,V.jsxs)(Av,{children:[(0,V.jsxs)(Ev,{"aria-label":`scale up panel`,children:[(0,V.jsxs)(iy,{children:[(0,V.jsx)(`summary`,{children:(0,V.jsxs)(Tv,{children:[(0,V.jsx)(`h2`,{children:`Scale Up`}),(0,V.jsxs)(wv,{title:`${Oe===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,ke,De?` · 🔓 TB`:``]})]})}),(0,V.jsxs)(ty,{children:[`Resets tiers and `,R,` production of every tier unlocked so far`,Ee?`, and unlocks ${Ee.name}`:``,`. Needs `,U(Ce),` completed `,_e.name,` levels.`]})]}),(0,V.jsxs)($,{"aria-label":`Scale Up (requires ${Ce} completed ${_e.name} levels) — ${R} production for tiers unlocked so far${De?` and unlocks TB`:``}`,color:Te?`#22d3ee`:`darkgrey`,disabled:!Te,onClick:t.scaleUp,title:`Resets tiers, ${R} production for tiers unlocked so far${Ee?`, and unlocks ${Ee.name}`:``} — requires ${Ce} completed ${_e.name} levels`,type:`button`,$progress:we,$progressColor:`#22d3ee`,$pulse:Te,children:[(0,V.jsx)(Zh,{children:`⏩ `}),(0,V.jsxs)(Qh,{children:[_e.symbol,` `,U(Se),`/`,U(Ce)]}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":we,"aria-valuemin":0,"aria-valuemax":100})]})]}),Ae&&(0,V.jsxs)(kv,{"aria-label":`overclock panel`,children:[(0,V.jsxs)(iy,{children:[(0,V.jsx)(`summary`,{children:(0,V.jsxs)(Tv,{children:[(0,V.jsx)(`h2`,{children:`Overclock`}),(0,V.jsxs)(wv,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,py(10),`%/lvl`]})]})}),(0,V.jsx)(ty,{children:Me>0?`The per-level speed bonus is now ${hy(Fe)}% (was ${hy(Ie)}%).`:`Not claimed yet — reach ${U(Pe)} completed ${L.name} levels. Each completed level then multiplies the per-level speed bonus by ×${Le}.`})]}),(0,V.jsxs)($,{"aria-label":`Overclock (requires ${Pe} completed ${L.name} levels) — resets Scale Up's bonus; each completed ${L.name} level (${U(xe)} now) multiplies the per-level speed bonus by ×${Le}`,color:ze?`#fb923c`:`darkgrey`,disabled:!ze,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${L.name} level multiplies the per-level speed bonus by ×${Le} — requires ${Pe} completed levels${se(`overclockDisabled`)?ce:``}`,type:`button`,$progress:Re,$progressColor:`#fb923c`,$pulse:ze,children:[(0,V.jsx)(Zh,{children:`⚡ `}),(0,V.jsxs)(Qh,{children:[L.symbol,` `,U(xe),`/`,U(Pe)]}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":Re,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},vy=B.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,yy=B.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,by={"10m":`good`,"1h":`info`,"10h":`violet`},xy=B(Ii)`
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
`,Sy=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Cy=B.span`
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
`,wy=B.span`
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
`,Ty=B($)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,Ey=B.div`
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
`,Dy=B.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,Oy=B.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,ky=B.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Ay=B.div`
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
`,jy=B.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,My=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Ny=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],Py=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=Ny.map(e=>({group:e,missing:hg.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},Fy=B.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,Iy=B.button`
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
`,Ly=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return Ny.map(r=>{let i=hg.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,V.jsxs)(Fy,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,V.jsx)(ky,{as:`span`,children:r.title}),i.map(n=>{let i=_g(e.game,n.key),a=`${r.title} ${n.label}`;return(0,V.jsx)(Iy,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},Ry=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${U(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,Py(e)].filter(Boolean).join(` · `),zy={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},By=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(a_(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(Ii,{"aria-label":`daily run ${e.id}`,children:[(0,V.jsxs)(jy,{children:[(0,V.jsxs)(vy,{children:[`Daily `,e.label]}),(0,V.jsx)($,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,V.jsxs)(ky,{children:[o.label,` · now `,U(s),` · `,My(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,V.jsxs)(ky,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),Ry(t.def)&&(0,V.jsx)(ky,{"aria-label":`daily run conditions`,children:Ry(t.def)}),(0,V.jsx)(Ay,{$percent:a,children:(0,V.jsx)(`span`,{})}),(0,V.jsx)(Ly,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,V.jsx)(_y,{game:c})]})},Vy=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=vg(n),f=m_(e,d),p=i?e.daily.runs[i]:null;return p?(0,V.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,V.jsx)(By,{actions:t,format:dg.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,V.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,V.jsxs)(yy,{children:[d,` · `,(0,V.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,My(yg(n)/1e3)]})]}),(0,V.jsx)(Sy,{children:dg.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:t_(d,n.id),f=c.has(n.id),p=Ry(l),m=r?`${o?`from ${r.def.dateId} · `:``}${My(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(a_(r)*100)}%`:[i&&zy[i.lastOutcome],i?.bestSeconds!=null&&`best ${My(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,V.jsxs)(xy,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,V.jsx)(Cy,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,V.jsxs)(wy,{title:`${l.objective.label} · ${m}`,children:[(0,V.jsx)(`strong`,{children:l.objective.label}),m&&(0,V.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,V.jsx)(Ty,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,V.jsx)(Ty,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,V.jsx)(Ey,{$formatId:n.id,$percent:Math.round(a_(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(a_(r)*100),role:`progressbar`,children:(0,V.jsx)(`span`,{})}),f&&(0,V.jsxs)(Dy,{children:[p&&(0,V.jsx)(ky,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,V.jsxs)(Oy,{children:[!o&&(0,V.jsx)($,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,V.jsx)($,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,V.jsx)(b_,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?u_(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,V.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},Hy=B.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Uy=B.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,Wy=B.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Gy={completed:pi`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:pi`
    border-color: ${e=>e.theme.color.warn};
  `,active:pi`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:pi``},Ky=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,qy=B.button`
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
  ${e=>e.$selected&&pi`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Jy=B.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,Yy=B.span`
  color: ${e=>Ky(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Xy=B.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,Zy=B.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Qy=Object.fromEntries(b.map(e=>[e.name,e.symbol])),$y={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},eb=e=>{if(e.automation?.kind===`global`)return $y[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${Qy[n]??n}`},tb={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},nb=(e,t)=>Mo(e)?.id===t.id?`active`:No(e,t.id)?`completed`:`available`,rb=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=No(t,e.id);return(0,V.jsxs)(b_,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${Y_(e)}?`,children:[(0,V.jsx)(`p`,{children:e.rule}),(0,V.jsxs)(`p`,{children:[`Goal: `,q_(e.goal),`, then Purge.`]}),(0,V.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},ib=({state:e,onStart:t,onExit:n})=>{let r=Mo(e),i=P.filter(e=>ce.has(e.id)).map(t=>{let n=qo(e,t.id);return{def:t,unlocked:n,status:n?nb(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${Ko(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${K_(i).replace(` `,``)}`:eb(t)};return(0,V.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,V.jsxs)(Ii,{children:[(0,V.jsx)(Hy,{children:`Factory challenges`}),(0,V.jsxs)(Uy,{"aria-label":`challenge counts`,children:[(0,V.jsxs)(Yy,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,V.jsxs)(Yy,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,V.jsxs)(Yy,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,V.jsx)(Wy,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,V.jsxs)(qy,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${tb[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?Y_(t):`${t.id} · ${t.target} · ${J_(t)}`,type:`button`,children:[(0,V.jsx)(Jy,{$status:r,children:t.id}),(0,V.jsx)(Yy,{$status:r,children:u(e)})]},t.id)})}),c&&(0,V.jsxs)(Xy,{"aria-label":`challenge ${c.def.id}`,children:[(0,V.jsxs)(`span`,{children:[c.unlocked?(0,V.jsx)(`strong`,{children:Y_(c.def)}):(0,V.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,V.jsx)(Zy,{children:c.def.rule}):(0,V.jsxs)(Zy,{children:[`🔒 `,J_(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,V.jsx)(G_,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,V.jsx)($,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${Y_(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},ab=B.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,ob=B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,sb=B.div`
  display: flex;
  gap: 0.5rem;
`,cb=B($)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,lb=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],ub=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=ai(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=n_(n),u=a===`daily`&&!l?`factory`:a;return(0,V.jsxs)(ab,{children:[(0,V.jsx)(ob,{children:(0,V.jsx)(`h1`,{children:`Challenges`})}),(0,V.jsx)(sb,{role:`tablist`,"aria-label":`challenge types`,children:lb.filter(e=>e.id!==`daily`||l).map(e=>(0,V.jsxs)(cb,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,V.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,V.jsx)(ib,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,V.jsx)(Vy,{actions:r,state:n}),(0,V.jsx)(rb,{def:s?P.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},db=`🏷️`,fb=B.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,pb=B.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,mb=B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,hb=B.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,gb=B.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,_b=bi`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,vb=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,yb=bi`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,bb=B.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${vb(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
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
`,xb=B.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Sb=B.div`
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
`,Cb=B.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,wb=B.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Tb=B.div`
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
`,Eb=B.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Db=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=Vu(n,t),l=c!==null,u=Vc(n,t),d=Bu(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=Kl(t),g=Ql(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=Hl(n),b=Rl(n),x=t===y?Gl(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/Ul(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!eu(n)||Math.max(0,(Ac(n,dc(t))??0)-Uc(n,dc(t)))<=0),O=Math.round(E*100),k=fu(n,t),A=k?vu(n,t):!1,j=k?gu(k):0,M=k?_u(k):0,ee=k&&k.segmentsCollected<10,N=k&&k.segmentsCollected>=10,P=Su(n,t)&&typeof e?.expediteDiskFill==`function`,te=Cu(n,t),ne=mu(k).length>0,re=ju(n,t),F=!!re,ie=F&&Pu(n,t),ae=F?Math.max(0,1-Nu(re)):1,oe=F?t*ae:p,se=Fu(t);return(0,V.jsxs)(fb,{children:[f?(0,V.jsx)(hb,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):se?(0,V.jsxs)(pb,{children:[(0,V.jsx)(mb,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,V.jsx)(xb,{role:`group`,"aria-label":F?`${h} read cache flushing to disk${ie?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,oe-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,V.jsx)(Sb,{"aria-label":F?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:F?ie?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(re.remainingSeconds/Fc(n,dc(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:F&&(a||o>0),children:o>0?(0,V.jsx)(Cb,{$fill:o,$flushing:F}):null},r)})})]}):null,k&&!f?(0,V.jsxs)(pb,{children:[(0,V.jsxs)(mb,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,V.jsx)(wb,{role:`progressbar`,"aria-label":N?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((N?M:j)*100),children:ee?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=gu(k),i=t<n,a=t===n&&r>0;return(0,V.jsx)(Tb,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?ne?`Collecting from smaller disks and Staging`:`Filling from Staging`:te?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,V.jsx)(Tb,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,V.jsx)(Eb,{$fill:M})})})]}):null,(0,V.jsxs)(pb,{children:[(0,V.jsx)(mb,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,V.jsx)(gb,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&P,g=o&&!p&&te&&r===i;return(0,V.jsx)(bb,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${du(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?se?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},Ob=B.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,kb=B.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,Ab=B.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,jb=B.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,Mb=B.h4`
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
`,Nb=B.span`
  flex-shrink: 0;
`,Pb=B.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,Fb=B.div`
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
`,Ib=B.span`
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
`,Lb=B.div`
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
`,Rb=B.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,zb=B.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Bb=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Os(t)},Vb=B.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,Hb=B.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,Ub=B.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Wb=B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Gb=B.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,Kb=B.div`
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
`,qb=B.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Jb=B($)`
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
`,Yb=B.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,Xb=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=q(e,n),a=Xu(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},Zb=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?Xb(t):[r];if(c.length===0)return null;let l=(0,V.jsx)(kb,{children:c.map(n=>{let r=Yu(n),i=Sd(n)(t),c=Oe[n-1]??`Cell`,l=Zd(n),u=J(t,n),d=!Zu(t,n)&&Fe[Xu(t,n)+1],f=Jl(u*l,n),p=Jl(i*l,n),m=$u(t,n),h=nd(t,n),g=rd(t,n),_=od(t,n),v=ud(t,n),y=dd(t,n),b=lf(t,n),x=sf(t,n),S=bd(t,n),C=fc(t,n),w=Ud(t,n),T=Fd(t,n),E=!T&&Id(t,n),D=Hd(t,n),O=Gd(t,n),k=ld(t,n)*l,A=fd(t,n),j=A&&af(t,n),M=j||A&&C&&Ac(t,n)>=Oc(t,n)?wc(t,n)*(j?Fc(t,n):1)*yd(t,n):0,ee=O||b&&!D&&!E&&!T,N=i*l,P=!ee&&S&&!E&&M>0&&i<=u&&k<N?Bb((N-k)/M):null,te=S?v/100:0,ne=(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Ob,{children:db}),p]}),re=`${S?v:0}%`;return(0,V.jsxs)(Ab,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,V.jsxs)(Pb,{$flush:s,children:[(0,V.jsxs)(jb,{children:[(0,V.jsxs)(Mb,{title:`${r} Data Lake — funds ${c}`,children:[(0,V.jsxs)(Nb,{"aria-hidden":`true`,children:[(0,V.jsx)(Ob,{children:`🏞️`}),r]}),(0,V.jsx)(`span`,{children:`Lake`})]}),(0,V.jsxs)(Rb,{title:`Current fill speed`,children:[`⚡ `,Kl(M),`/s`]})]}),(0,V.jsxs)(Fb,{children:[D?(0,V.jsx)(Vb,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:ne}):E?(0,V.jsx)(Vb,{title:`${c} is already at the max — spend or charge it up first`,children:ne}):w?(0,V.jsx)(Vb,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:ne}):T?(0,V.jsx)(Jb,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,V.jsx)(eg,{children:ne})}):S?(0,V.jsx)(Jb,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,V.jsx)(eg,{children:ne})}):(0,V.jsx)(Vb,{title:`Build a ${Kl(l)} disk in Storage to unlock ${c} here`,children:ne}),O?(0,V.jsx)(Jb,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,V.jsx)(eg,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,V.jsx)(Jb,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${Kl(x)} banked) to grow its capacity from ${f} to ${Jl(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,V.jsx)(eg,{children:`⚡ Scale Out`})}):P?(0,V.jsxs)(zb,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,P]}):null]}),s?(0,V.jsx)(Ib,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:re}):(0,V.jsx)(Ib,{$withBar:!0,title:`Currently filled`,children:El(Xl(k,n))}),(0,V.jsx)(Lb,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:te})]}),o&&(()=>{let e=S?ad(t,n):0,i=Kl(l);return(0,V.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,V.jsxs)(Gb,{children:[(0,V.jsx)(`span`,{children:`buffer`}),(0,V.jsx)(`span`,{children:S?`${Kl(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,V.jsx)(Lb,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=sd(t,n),i=Jl(l*_.target,n);return(0,V.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,V.jsxs)(Gb,{children:[(0,V.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,V.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,V.jsx)(Lb,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&Me.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?sd(t,n):0,u=Jl(s,n);return(0,V.jsxs)(Ub,{children:[(0,V.jsx)(Wb,{"aria-hidden":`true`,children:u}),(0,V.jsx)(Hb,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,V.jsx)(Kb,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,V.jsx)(qb,{$fill:c})},t)})})]},e)}),o&&(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,ld(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,V.jsxs)(V.Fragment,{children:[a&&!s&&(0,V.jsx)(Yb,{}),l]}):(0,V.jsx)(Ii,{"aria-label":`Data Lakes`,children:l})},Qb=h(),$b=B.div`
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
`,ex=B.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,tx=B.dl`
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
`,nx=B.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,rx=8,ix=6,ax=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-rx-n,i=t.bottom+ix,a=t.top-ix-n,s=i<=r||a<rx?Math.max(rx,Math.min(i,r)):a,l=Math.max(rx,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,Qb.createPortal)((0,V.jsxs)($b,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:rx,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,V.jsx)(ex,{children:r}),(0,V.jsx)(tx,{children:i.map(({label:e,value:t})=>(0,V.jsxs)(`div`,{style:{display:`contents`},children:[(0,V.jsx)(`dt`,{children:e}),(0,V.jsx)(`dd`,{children:t})]},e))}),a&&(0,V.jsx)(nx,{children:a})]}),document.body)},ox=B.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,sx=B.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,cx=B.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,lx=B.p`
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
`,ux=B.button`
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
`,dx=({theme:e})=>pi`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,fx=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,px=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>pi`
  button {
    background-color: ${fx(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,mx=B(Ii)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${dx}

  button {
    background-color: ${fx};
    border: 0;
    border-radius: 0;
  }
`,hx=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Os(t)},gx=(e,t,n)=>Zs(e,t,t,n),_x=(e,t,n)=>{let r=gx(e,t,n);return r===null?null:hx(r)},vx=B.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,yx=B.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,bx=bi`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,xx=B.span`
  display: inline-block;
  animation: ${bx} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Sx=B.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,Cx=B.span`
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
`,wx=B.span`
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
`,Tx=B.span`
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
`,Ex=B.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Dx=B.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Ox=B(Lb)`
  margin-top: 0;
`,kx=B.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ax=B(Ii)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${dx}
  ${e=>e.$boosted&&D_}
`,jx=B.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,Mx=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,Nx=B(Ii)`
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
`,Px=B.button`
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
`,Fx=B.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,Ix=B.button`
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
`,Lx=B.div`
  position: relative;
  width: 100%;
`,Rx=B.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,zx=B.h3`
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
`,Bx=B.span`
  flex-shrink: 0;
`,Vx=B(B.span`
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
`,Hx=B.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${Xh}
  background-color: ${fx};
`,Ux=B(Hx)`
  position: relative;
`,Wx=B(Hx)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,Gx=B(Hx)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,Kx=(e,t,n,r=!0)=>{let i=hl(t,n),a=i&&e>0&&e<i.divisor?hl(e,n):i;return r?wl(e,a):Sl(e,a)},qx=(e,t,n=``)=>{let r=hl(e,!0);return`${Tl(e/r.divisor)} → ${Tl(t/r.divisor)} ${r.symbol}${n}`},Jx=(e,t)=>Sl(e,hl(e,t)),Yx=5e3,Xx=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),Zx=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!Xx(e))return;let t=setTimeout(()=>n(e),Yx);return()=>clearTimeout(t)},[e,r]),t===e},Qx=({bits:e,poolIndex:t,large:n})=>{let r=Zx(Zl(e,t))?Xl(e,t):Zl(e,t);return(0,V.jsx)(lx,{$large:n,children:r})},$x=e=>Math.min(100,Math.max(0,e)),eS=8,tS=B.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,nS=B.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,rS=B.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,iS=B.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,aS=B.div`
  position: relative;
  min-width: 0;
  height: ${eS}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,oS=B(B.div`
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
`,sS=B.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,cS=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,V.jsxs)(tS,{children:[(0,V.jsxs)(nS,{children:[(0,V.jsx)(Ob,{children:`📦`}),e]}),o&&(0,V.jsx)(aS,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,V.jsx)(oS,{$widthPercent:a/100*100})}),o&&(0,V.jsxs)(rS,{children:[`+`,Math.round(a),`% `,(0,V.jsx)(sS,{children:`👆`})]}),!o&&r&&(0,V.jsxs)(iS,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},lS=[[10,[229,72,77]],[100,[59,130,246]],[Se,[48,164,108]]],uS=e=>{let t=lS.length-1;if(e<=lS[0][0])return`rgb(${lS[0][1].join(`,`)})`;if(e>=lS[t][0])return`rgb(${lS[t][1].join(`,`)})`;let n=lS.findIndex(([t])=>e<=t),[r,i]=lS[n-1],[a,o]=lS[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},dS=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=Zx(Kx(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=cl(o),f=yc(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${El(Dl(e))}/s`,w=qs(s),T=Sp(s),E=s.byteCreated?C(ic(s)):null,D=tc(s),O=_x(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=Rl(o),j=Hl(o),M=Ll(o),ee=Wl(o,M),N=Ul(o,M),P=dc(M),te=Math.max(0,Ac(o,P)-Uc(o,P)),ne=Vl(o),re=zl(o),F=Gs(s).toFixed(2),ie=Gs({...s,unlockedDiskSteps:Ws(s)+1}).toFixed(2),ae=Kl(Pl(Ws(s)+1)),oe=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${ae} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${F} → ${ie}.`))&&n.unlockNextDiskSize()},se=d?$l(o):[],ce=!A&&eu(o),le=s.diskBuild,ue=!A&&!ne&&Wc(o)&&!ce&&!le,de=Math.min(N,Gl(o,M)),fe=Math.floor(de+1e-9),pe=de>0||s.diskBuildQueued,me=le?$x(100-le.remainingSeconds/le.totalSeconds*100):ne?100:pe?$x(de/N*100):0,I=Vu(o,M),L=Xc(o),he=Qc(o),ge=!!s.capacityUpgradeQueued,_e=!!s.speedUpgradeQueued,ve=ge||_e,ye=s.capacity,be=Zc(s),xe=s.capacity*2,Se=Jx(xe,!0),Ce=qs({...s,speedCapacity:be*2}),we=`${Dl(Ce)}/s`,Te=w>0?`×${Number((Ce/w).toFixed(2))}`:``,Ee=$x(s.bits/8*100),De=$x((s.capacityUpgradeProgress??0)/ye*100),Oe=$x((s.speedUpgradeProgress??0)/be*100),ke=_e?Oe:De,R=oc(s),Ae=R?.cost??0,je=R?.progress??0,Me=R?.multiplierPercent??100,Ne=C(R?.rate??0),Pe=R?.rate??0,Fe=hx(Pe>0&&Ae>0?Math.max(0,Ae-je)/Pe:1/0),Ie=$x(s.bits/s.capacity*100),Le=()=>{ce?n.provisionDisk():n.queueDiskBuild()},Re=s.diskBuildQueued,ze=`${fe}/${N}`,Be=N>1||fe>0?` · ${ze}`:``,Ve=`Provision ${Kl(M)} Disk`,He=!!Re&&!le&&!ne&&!A,Ue=dc(j),We=A?s.diskBuild?`waiting for build`:mc(o,Ue)?`waiting for earlier pool`:wc(o,Ue)<=0?`waiting for pool`:Ac(o,Ue)<=Uc(o,Ue)?`waiting for staging`:null:null,Ge=le?{icon:`🏗`,label:`Provisioning ${Kl(le.size)} Disk`,status:`${Math.ceil(le.remainingSeconds)}s left`}:ne?{icon:`✅`,label:`All Pools Complete (${Kl(M)})`,status:null}:A?{icon:`🔁`,label:Ve,status:`Rebuilding ${Kl(j)} first · ${We??`automatic`}`}:Re?{icon:`⏳`,label:`Provisioning ${Kl(M)} Disk`,status:`${fe>0?ze:`Queued`} · ${ce?te>0?`building`:`waiting for staging`:ue?`after disk fill`:`waiting for pool`}`}:ce?{icon:`🏦`,label:Ve,status:`Ready · ${db} ${Kl(ee)}${Be}`}:{icon:`🏦`,label:Ve,status:`${db} ${Kl(ee)}${Be} · tap to queue`,reason:ue?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},Ke=Fc(o,A?Ue:P),qe=100*Ke,Je=(A?Tc(o,Ue):wc(o,P))*Ke,Ye=`${El(Kl(Je))}/s`,Xe=A&&wc(o,Ue)<=0,Ze=cu(o),Qe=Ze.disksTotal>0?$x(Ze.disksDone/Ze.disksTotal*100):0,$e=Ze.seconds,et=A?Qe:me,tt=Math.max(0,(N-de)*M),nt=Ic(o,P)*Pc(o,P)/100*Tp(s,P),rt=Math.min(tt,te),it=Je>0?rt/Je+(tt-rt)/Math.max(Math.min(Je,nt),Number.MIN_VALUE):1/0,at=A?hx($e):ue?`—`:hx(it),ot=d&&!ne&&!le&&Je>0&&(A||Re),st=(0,V.jsx)($,{"aria-label":`reformat to unlock disk size`,onClick:oe,title:`Reformat the Byte Foundry to unlock ${ae} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${F} → ${ie}.`,type:`button`,variant:`prestige`,children:(0,V.jsxs)(yx,{children:[(0,V.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,ae,` Disks`]}),(0,V.jsx)(kx,{children:`Bitrate exponent ${F} → ${ie} · auto-rebuilds to your highs`})]})}),ct=re?st:(0,V.jsxs)($,{"aria-label":le?`disk array rebuilding`:ne?`disk ladder complete`:`provision disk`,"aria-description":Ge.reason?`${Ge.status} (${Ge.reason})`:Ge.status??void 0,disabled:!!le||ne||A,onClick:Le,title:le?`Provisioning ${Kl(le.size)} — ${Math.ceil(le.remainingSeconds)}s (array offline)`:ne?`All ${uc()} storage pools are complete through ${Kl(M)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${Kl(j)} now); ${Kl(M)} unlocks for provisioning once they are done`:Re?`Armed — draws from the pool staging at the pool's fixed bandwidth${ue?` once Disk Fill is done`:``} (${fe}/${N} passes so far)`:ce?I?`Costs ${Kl(ee)}, paid in ${N} pass${N===1?``:`es`} of ${Kl(M)} each (${fe}/${N} collected) — creates an empty ${Kl(M)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${I} level`:`Costs ${Kl(ee)}, paid in ${N} pass${N===1?``:`es`} of ${Kl(M)} each (${fe}/${N} collected) — creates an empty ${Kl(M)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:ue?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${fe}/${N} passes so far)`,type:`button`,variant:ne||A?`neutral`:Re?`smart`:ce?`info`:`neutral`,$progress:et,$pulse:He,children:[ot?(0,V.jsxs)(Sx,{children:[(0,V.jsxs)(Cx,{children:[Ge.icon,` `,A?`Rebuilding`:`${Kl(M)} Disk…`]}),(0,V.jsx)(wx,{children:A?(()=>{let e=Pl(Ws(s)-1);return e>j?`${Kl(j)} → ${Kl(e)}`:`${Kl(j)} disks`})():fe>0?ze:`Queued`}),(0,V.jsxs)(Tx,{children:[Math.floor(et),`%`]}),(0,V.jsxs)(Dx,{style:{color:uS(qe),...A&&Ze.projected?{opacity:.55}:null},title:Xe?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&Ze.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&Ze.projected?`~`:``,Ye]}),at!==`—`&&(0,V.jsxs)(Ex,{style:Ze.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:Ze.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,Ze.projected?`~`:``,at]})]}):(0,V.jsxs)(yx,{children:[(0,V.jsxs)(`span`,{children:[Ge.icon,` `,Ge.label,He?`…`:``]}),Ge.status&&(0,V.jsx)(kx,{children:Ge.status})]}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(et),"aria-valuemin":0,"aria-valuemax":100})]}),lt=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&ve&&!!R||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{lt||_(null)},[lt]);let ut=g===`stream`,dt=null;if(ut){let e=ec(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=wc(o,e);dt=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:F},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...R?[{label:`Upgrade bar drawing`,value:Ne}]:[],{label:`Buffer`,value:`${Math.floor(Ie*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...he&&!ve?[{label:`After Upgrade Bitrate`,value:`${we} (${Te})`}]:[]]}let ft=g===`upgrade`&&!!R,pt=ft?[{label:`Draw now`,value:Ne},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${Dl(je)} / ${Dl(Ae)}`},{label:`Time left`,value:Fe},R.kind===`speed`?{label:`Bitrate after`,value:qx(w,Ce,`/s`)}:{label:`Capacity after`,value:qx(s.capacity,xe)}]:null;return(0,V.jsxs)(ox,{children:[(0,V.jsx)(gv,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,V.jsx)(cx,{children:(0,V.jsx)(sx,{children:`🔥 Byte Foundry`})}),(0,V.jsxs)(Nx,{"aria-label":`Data Stream`,$boosted:C_(s),children:[(0,V.jsxs)(Ux,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:Ie,children:[s.mainGameUnlocked&&(0,V.jsx)(Px,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,V.jsxs)(Fx,{children:[(0,V.jsxs)(Lx,{children:[(0,V.jsxs)(Rx,{children:[(0,V.jsx)(zx,{children:(0,V.jsxs)(`span`,{children:[(0,V.jsx)(Ob,{children:`🌊`}),`Data Stream`]})}),(0,V.jsx)(lx,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:Kx(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,V.jsxs)(Vx,{ref:ut?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:uS(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":ut,"aria-controls":ut?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),ut&&(0,V.jsx)(ax,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:dt})]}),(0,V.jsx)(cS,{capacityText:Jx(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&ve&&(0,V.jsxs)(Wx,{"aria-label":_e?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:_e?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${Se} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,V.jsxs)(Sx,{children:[(0,V.jsxs)(Cx,{children:[(0,V.jsx)(Ob,{children:`⏫`}),`Upgrading`,(0,V.jsx)(xx,{children:`…`})]}),(0,V.jsxs)(wx,{children:[(0,V.jsx)(Ob,{children:_e?`⚡`:`📦`}),_e?qx(w,Ce,`/s`):qx(s.capacity,xe)]}),(0,V.jsxs)(Tx,{children:[Math.floor(ke),`%`]}),(0,V.jsxs)(Vx,{ref:ft?y:void 0,$color:uS(Me),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Ne}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":ft,"aria-controls":ft?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Ne]}),ft&&(0,V.jsx)(ax,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:R.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:pt}),(0,V.jsxs)(Ex,{children:[`⏳ `,Fe]})]}),(0,V.jsx)(Ox,{$fill:Math.min(1,Math.max(0,ke/100)),"aria-hidden":`true`}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(ke),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!ve)&&(0,V.jsxs)(px,{children:[u&&(0,V.jsxs)($,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:Ee,children:[(0,V.jsx)(eg,{children:`🔗 Compile into a Byte`}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!ve&&(0,V.jsx)(vx,{children:!ve&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)($,{"aria-label":`upgrade data stream capacity`,disabled:!L,onClick:n.pickIntroCapacityMilestone,title:L?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity`:`Capacity is already at its maximum`,"aria-description":L?`Costs ${Dl(ye)}; capacity ${Se} after upgrading`:void 0,type:`button`,variant:L?`prestige`:`neutral`,children:(0,V.jsxs)(yx,{children:[(0,V.jsx)(`span`,{children:`Upgrade Capacity`}),(0,V.jsx)(kx,{children:L?`🏷️ ${Dl(ye)} · 📦 ×2`:`📦 Max capacity`})]})}),(0,V.jsx)($,{"aria-label":`upgrade data stream bitrate`,disabled:!he,onClick:n.queueIntroSpeedUpgrade,title:he?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${F} — upgrade Capacity first`,"aria-description":he?`Costs ${Dl(be)}; bitrate ${we} after upgrading`:void 0,type:`button`,variant:he?`prestige`:`neutral`,children:(0,V.jsxs)(yx,{children:[(0,V.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,V.jsx)(kx,{children:he?`🏷️ ${Dl(be)} · ⚡ ${Te}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,V.jsx)(mx,{"aria-label":`Provision Disk`,children:ct}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=Ic(o,r),a=Ac(o,r),c=Oc(o,r),l=c>0?$x(a/c*100):0,u=a>=c,d=Pc(o,r),f=Nc(o,r),p=_x(a,c,i),_=af(o,r),v=se.filter(e=>dc(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${El(Kl(e))}/s`,D=E(i*d/100*Tp(s,r)),O=g===`pool-${r}`,k=null,A=wc(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=wc(o,t);let t=Mc(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*Fc(o,r))}]:[]]}return(0,V.jsxs)(Ax,{"aria-label":`pool ${r}`,$boosted:T_(s,r),children:[(0,V.jsxs)(Gx,{$progress:l,children:[(0,V.jsx)(Px,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,V.jsxs)(Fx,{children:[(0,V.jsxs)(Lx,{children:[(0,V.jsxs)(Rx,{children:[(0,V.jsx)(zx,{children:(0,V.jsxs)(Ix,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,V.jsxs)(Bx,{"aria-hidden":`true`,children:[(0,V.jsx)(Ob,{children:`💧`}),T]}),(0,V.jsx)(`span`,{children:`Pool`})]})}),(0,V.jsx)(Qx,{bits:a,poolIndex:r,large:f<=0}),(0,V.jsxs)(Vx,{ref:O?y:void 0,$centered:f<=0&&!p,$color:uS(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,V.jsx)(ax,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,V.jsx)(cS,{capacityText:Jl(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,V.jsx)(jx,{children:(0,V.jsx)(Zb,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,V.jsxs)(Mx,{children:[v.map(e=>(0,V.jsx)(Db,{actions:n,size:e,state:o},e)),(0,V.jsx)(Zb,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,V.jsx)(ux,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},fS=B.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,pS=B.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,mS=B.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,hS=B.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,gS=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,_S=B(Ii)`
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
`,vS=pi`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,yS=B.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,bS=B.span`
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
`,xS=B.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${vS}
`,SS=B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${vS}
`,CS=B($)`
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
`,wS=B.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,TS=Object.fromEntries(b.map(e=>[e.id,e])),ES=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=Ja(n),a=za(n),o=ai(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});return(0,V.jsxs)(fS,{"aria-label":`compute flops screen`,children:[(0,V.jsxs)(pS,{children:[(0,V.jsx)(`h1`,{children:`🖥 Compute`}),(0,V.jsx)(mS,{"aria-label":`cumulative flops boost`,children:Za(i)})]}),!a&&(0,V.jsxs)(hS,{children:[`Unlocks at `,100,` PP — you have `,U(r),` PP.`]}),(0,V.jsx)(gS,{"aria-label":`compute flops tiers`,children:ot.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=Xa(n,e.boostsTierId),d=Ua(e,c),f=Wa(n,e.id),p=TS[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(at*100).toFixed(2);return(0,V.jsxs)(_S,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,V.jsxs)(yS,{children:[(0,V.jsx)(bS,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,V.jsxs)(xS,{title:`Owned`,children:[(0,V.jsx)(tg,{children:`Owned: `}),U(c)]})]}),(0,V.jsxs)(SS,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,V.jsx)(CS,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${U(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${U(d)} PP for +${g}%/s on ${m}`:`Costs ${U(d)} PP — you have ${U(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,V.jsxs)(eg,{children:[U(d),` PP`]})}),h&&(0,V.jsxs)(wS,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},DS=B.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,OS=B.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,kS=B.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,AS=B.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,jS=B.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,MS=B.div`
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
`,NS=B.div`
  height: 0.6rem;
`,PS=B.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,FS=B.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,IS=B.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,LS=B.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,RS=B.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,zS=B.button`
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
`,BS=B.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,VS=B.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,HS=B.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,US=B.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,WS=B.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,GS=B.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,KS=B($)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,qS=B(KS)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,JS=B(KS)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,YS=B.span`
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
`,XS=B.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,ZS=B.div`
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
`,QS=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],$S=(e,t,n)=>e>=8&&t<n,eC=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=QS.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:yp(r)[0]?.queue[0]??1}),o=yp(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=r.computeMergePageUnlocked?i:1,u=(l?QS[l-1]:null)&&(0,V.jsxs)(V.Fragment,{children:[!r.computeMergePageUnlocked&&(0,V.jsx)(XS,{title:`Boosts ${A_(l,`name`)}`,children:`Boosts ${A_(l)}`}),(0,V.jsx)(ZS,{role:`group`,"aria-label":`compute boost`,children:Object.keys(De).map(e=>{let i=gp(e,l),a=_p(e,l),o=O_[e].label,s=!!bp(r,e),c=`×${i} production, ${k_(a)}`;return(0,V.jsx)(KS,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!Dp(n,e,l),onClick:()=>t.activateComputeBoost(e,l),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,V.jsx)(eg,{children:`${O_[e].icon} ×${i} · ${k_(a)}`})},e)})})]});return(0,V.jsxs)(DS,{children:[s?(0,V.jsx)(tg,{as:`h1`,children:`⚡ Power`}):(0,V.jsx)(OS,{children:(0,V.jsx)(kS,{children:`⚡ Power`})}),s&&(0,V.jsx)(W_,{actions:t,state:n}),!s&&(0,V.jsx)(XS,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,V.jsx)(LS,{"aria-label":`boost`,children:u}),r.computeMergePageUnlocked?(0,V.jsx)(jS,{"aria-label":`compute entities`,children:QS.map((e,i)=>{let o=i+1,s=r[e.countField]??0,d=!!e.autoFlagField,f=d?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=d&&!f&&p>=10,h=d?pf(n,e.autoFlagField):0,g=d&&!f&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=d?Td(n,e.mergeOutputField):10,S=d&&Af(n,i),C=d?Dd(n,o):0,w=d&&kd(n,i),T=d&&jd(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=f?S:$S(s,r[e.mergeOutputField]??0,x),O=d&&(!f||l===o||b||w||D||C>0),k=i>0?QS[i-1]:null,A=QS.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||f||b||l===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let j=QS[i+1]?.symbol??`⬆`,M=d&&(f?(0,V.jsx)(qS,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,V.jsx)(eg,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,V.jsx)(qS,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!$S(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,V.jsx)(eg,{children:`${e.symbol} 8→1 ${g?`🔌`:j}`})})),ee=d&&(f?(0,V.jsx)(YS,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${Os(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${Os(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${Os(y)}`:`🔌 ${C}/8`}):m?(0,V.jsx)(JS,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${U(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,V.jsx)(eg,{children:`🔓 10/10`})}):(0,V.jsx)(YS,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),N=d&&O;return(0,V.jsxs)(v.Fragment,{children:[(0,V.jsxs)(IS,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:l===o,children:[(0,V.jsxs)(RS,{children:[(0,V.jsxs)(zS,{type:`button`,onClick:()=>a(o),"aria-pressed":l===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${A_(o,`name`)}`,$selected:l===o,children:[(0,V.jsx)(US,{"aria-hidden":`true`,children:e.symbol}),(0,V.jsxs)(VS,{children:[(0,V.jsxs)(HS,{children:[(0,V.jsxs)(BS,{children:[e.label,(0,V.jsx)(tg,{children:` ${U(E)}/10`})]}),(0,V.jsxs)(FS,{"aria-hidden":`true`,children:[`→ `,A_(o)]})]}),(0,V.jsx)(WS,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,V.jsx)(GS,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),ee&&(0,V.jsx)(PS,{children:ee})]}),l===o&&u]}),N?(0,V.jsx)(MS,{children:M}):(0,V.jsx)(NS,{})]},e.key)})}):(0,V.jsx)(AS,{children:`⬡ ${U(r.computeCores??0)}/10 · 🔗 ${U(r.computeNodes??0)}/10`})]})},tC=B.button.attrs({type:`button`})`
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
`;b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),ot.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{});var nC=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}];B.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,B(Ii)`
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
`,B.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`,B.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,B.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`,B.div`
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
`,B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`,B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`,B($)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`,B.input`
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
`,B.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`,B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`,B.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`,B.div`
  display: flex;
  gap: 0.3rem;
`,B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`,B($)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`,B.span`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
`,B.details`
  border-left: 2px solid ${e=>e.theme.color.border};
  padding-left: 0.6rem;
`,B.summary`
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
`,B.textarea`
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
`,B.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.good} !important;
  font-size: 0.8rem;
`,[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>nC.find(t=>t.id===e));var rC=`0.5.0`,iC=B.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,aC=B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,oC=B.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,sC=B(Ii)`
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
`,cC=()=>{let e=fa(b[0].id),t=fa(b[b.length-1].id),n=pa(b[0].id),r=wo({}),i=b[b.length-1].name,a=b[0].name;return(0,V.jsxs)(iC,{children:[(0,V.jsxs)(aC,{children:[(0,V.jsx)(`h1`,{children:`Tens — Manual`}),(0,V.jsxs)(oC,{children:[`v`,rC]})]}),(0,V.jsxs)(sC,{"aria-label":`overview section`,children:[(0,V.jsx)(`h2`,{children:`Overview`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,V.jsxs)(`li`,{children:[`Buy every tier with `,(0,V.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,V.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,a,` produce Bytes, which are added to your Bits.`]}),(0,V.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,V.jsxs)(`li`,{children:[`Reaching `,(0,V.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge — unless you have unlocked Overflow mode (see Purge).`]}),(0,V.jsxs)(`li`,{children:[`Once bought (`,2,` PP on Firmware → ✦ Prestige), the `,(0,V.jsx)(`strong`,{children:`Buy max`}),` toggle makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})]}),(0,V.jsxs)(sC,{"aria-label":`prestige ladder section`,children:[(0,V.jsx)(`h2`,{children:`Prestige ladder`}),(0,V.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,V.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP, the per-cycle Compute (Flops) boost.`,` `,(0,V.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, Overflow mode, the Byte generator, Capacity, Disks, Data Lakes, Compute entities, owned Compute (Flops) units and the System log.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,V.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,V.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Reinstall`}),` — a future layer above Reboot, not yet in the game.`]})]})]}),(0,V.jsxs)(sC,{"aria-label":`byte foundry section`,children:[(0,V.jsx)(`h2`,{children:`Byte Foundry`}),(0,V.jsxs)(`p`,{children:[`Every new save starts here, before any `,a,` exist. Unlocking the main game is permanent — no Purge or Reboot sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,V.jsx)(`h3`,{children:`The loop`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,Dl(Ce),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,Dl(ve(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,Se/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,Se/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,V.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,V.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,V.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,ye,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-be)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,a,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,Dl(Ce),` threshold.`]})]}),(0,V.jsx)(`h3`,{children:`What resets vs. what stays`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,a,` level.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, every Compute entity, and the main-game unlock. Reboot resets most of this (see Reboot).`]}),(0,V.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]}),(0,V.jsx)(`h3`,{children:`Forced priority`}),(0,V.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Disk Fill → Provision Disk → Compute Boost`}),(0,V.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]}),(0,V.jsxs)(sC,{"aria-label":`storage section`,children:[(0,V.jsx)(`h2`,{children:`Storage`}),(0,V.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,Dl(Ce),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,V.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,V.jsx)(`h3`,{children:`Provisioning Disks`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,V.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]}),(0,V.jsx)(`h3`,{children:`Cache and automatic pulling`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,V.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,V.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,V.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,V.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,V.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]}),(0,V.jsx)(`h3`,{children:`Data Lakes`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,V.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,V.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,V.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,Ae.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,V.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,Fe.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,V.jsx)(`li`,{children:`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the Reboot cycle — through pool flushes, Reformats and Purges.`})]}),(0,V.jsx)(`h3`,{children:`Flushing`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,V.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,V.jsx)(`li`,{children:`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. The first two flushes also earn Reclamation I and II achievements: each upgrades one of that pool’s two disk-size exponent steps to close 10% of the gap to 1.0. These rewards survive Reformat, Purge, and Reboot. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`}),(0,V.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})]}),(0,V.jsxs)(sC,{"aria-label":`power section`,children:[(0,V.jsx)(`h2`,{children:`Power`}),(0,V.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,Dl(Te),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,V.jsx)(`h3`,{children:`Cells and the charge chain`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,V.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,V.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,V.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,V.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]}),(0,V.jsx)(`h3`,{children:`Compute Boost`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,V.jsxs)(`li`,{children:[`Turbo ×`,De.burst.multiplier,` for`,` `,Os(De.burst.durationSeconds),`; Balanced ×`,De.standard.multiplier,` for`,` `,Os(De.standard.durationSeconds),`; Eco ×`,De.sustain.multiplier,` for`,` `,Os(De.sustain.durationSeconds),`.`]}),(0,V.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,De.burst.poolBonusPercent,`% / +`,De.standard.poolBonusPercent,`% / +`,De.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,V.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,V.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,V.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,V.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,V.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,V.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,V.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,V.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})]}),(0,V.jsxs)(sC,{"aria-label":`compute flops section`,children:[(0,V.jsx)(`h2`,{children:`Compute`}),(0,V.jsxs)(`p`,{children:[`A separate screen (nav `,(0,V.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,V.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,rt.toLocaleString(),` PP.`]}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,rt.toLocaleString(),` –`,` `,it.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,V.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,V.jsxs)(`li`,{children:[`Each owned unit adds `,(at*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,V.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,V.jsxs)(`li`,{children:[`The header’s `,(0,V.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,V.jsx)(`sup`,{children:`n`}),` `,`(`,(0,V.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,V.jsxs)(sC,{"aria-label":`accelerate section`,children:[(0,V.jsx)(`h2`,{children:`Accelerate`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,V.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,V.jsxs)(`li`,{children:[`Unlocks once `,a,` complete their first level.`]}),(0,V.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,V.jsxs)(`li`,{children:[i,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Spend all `,i,` after holding some in the same run to earn Spent QB — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,V.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,i,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,i,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,Ye.restage,`) spends it for you, every `,Xe.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})]}),(0,V.jsxs)(sC,{"aria-label":`scale up section`,children:[(0,V.jsx)(`h2`,{children:`Scale Up`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,a,` — to claim a Scale Up.`]}),(0,V.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,V.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,V.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,V.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})]}),(0,V.jsxs)(sC,{"aria-label":`overclock section`,children:[(0,V.jsx)(`h2`,{children:`Overclock`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[`Reach the required number of completed `,i,` levels to claim an Overclock.`]}),(0,V.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,V.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,V.jsxs)(`li`,{children:[`The first claim needs `,r,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,V.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})]}),(0,V.jsxs)(sC,{"aria-label":`tier autobuyers section`,children:[(0,V.jsx)(`h2`,{children:`Tier Autobuyers`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,V.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,V.jsxs)(`li`,{children:[`An autobuyer buys `,(0,V.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,V.jsx)(`strong`,{children:`Single`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,Ze.baseCost,` PP × the same.`]})]})]}),(0,V.jsxs)(sC,{"aria-label":`milestones section`,children:[(0,V.jsx)(`h2`,{children:`Milestones`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,e,` (`,a,`) through Purge`,` `,t,` (`,i,`).`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,n,`, then every`,` `,`Purge`,` after that.`]}),(0,V.jsx)(`li`,{children:`More → Milestones tracks your story milestones and Reboot progress.`})]})]}),(0,V.jsxs)(sC,{"aria-label":`prestige section`,children:[(0,V.jsx)(`h2`,{children:`Purge`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge, Reboot, Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,V.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge. Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,V.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]}),(0,V.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) at 1 Googol Bytes, plus 1 PP for every`,` `,64,` further powers of ten in your balance. Each Compression upgrade halves the powers needed per PP, and once that reaches 1, doubles the PP per power.`]}),(0,V.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,V.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,V.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,V.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,V.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,We*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,V.jsx)(`li`,{children:`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage and Power progress carries over.`}),(0,V.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})]}),(0,V.jsxs)(sC,{"aria-label":`sleep mode section`,children:[(0,V.jsx)(`h2`,{children:`Sleep mode`}),(0,V.jsx)(`ul`,{children:(0,V.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,Os(Re),` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,Be.map(e=>U(e)).join(` / `),` PP) adds`,` `,Os(ze),`, up to `,Os(Le),`. Absences of `,Os(600),` `,`or less run at full speed; longer ones run at`,` `,Ie*100,`% speed and show a “Resumed from sleep” summary.`]})})]}),(0,V.jsxs)(sC,{"aria-label":`reboot section`,children:[(0,V.jsx)(`h2`,{children:`Reboot`}),(0,V.jsxs)(`ul`,{children:[(0,V.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,lt.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,V.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel plus `,1,` per Kernel Amplifier level. Ways to spend Kernels are coming in a later update.`]}),(0,V.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,V.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,V.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})]})]})},lC=B.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,uC=B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,dC=B(Ii)`
  gap: 0.4rem;
`,fC=B.ol`
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
`,pC=B.li`
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
`,mC=B.p`
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
`,hC=B.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,gC=({game:e})=>{let{state:t}=e,n=ai(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=$a(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:Ao(t)},{label:`First Reboot`,reached:i>0}];return(0,V.jsxs)(lC,{children:[(0,V.jsx)(uC,{children:(0,V.jsx)(`h1`,{children:`Milestones`})}),(0,V.jsxs)(dC,{"aria-label":`milestones page`,children:[(0,V.jsx)(fC,{"aria-label":`milestones category`,children:s.map(e=>(0,V.jsx)(pC,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),(0,V.jsxs)(mC,{"aria-label":`reboot status`,children:[(0,V.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,V.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,V.jsx)(`strong`,{children:i}),` Reboots`]}),(0,V.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,V.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,V.jsx)(`strong`,{children:a}),` Kernels`]}),(0,V.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,V.jsx)(hC,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,V.jsx)(hC,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${lt.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},_C=({game:e})=>{if(!Ns(e.state))return null;let t=!!e.buyMaxMode;return(0,V.jsx)(tC,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},vC=B.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,yC=B($)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&pi`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,bC=[{id:`level`,unit:!1,icon:`📶`,label:`Level`,title:`Buy level: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Single`,title:`Buy single: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],xC=({game:e})=>(0,V.jsx)(vC,{role:`group`,"aria-label":`buy mode`,children:bC.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,V.jsx)(yC,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),SC=B.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,CC=B($)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&pi`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,wC=({value:e,onChange:t})=>(0,V.jsx)(SC,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(De).map(n=>{let r=O_[n],i=e===n;return(0,V.jsx)(CC,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),TC=B.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,EC=B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,DC=B.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,OC=B.div`
  display: flex;
  gap: 0.5rem;
`,kC=B($)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,AC=B.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,jC=B.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,MC=B(Ii)`
  gap: 0.4rem;
`,NC=B.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,PC=B.div`
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
`,FC=B.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,IC=({tier:e})=>(0,V.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,V.jsx)(tg,{children:e.name}),(0,V.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),LC=B.div`
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
`,RC=B.div`
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
`,zC=B.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,BC=B.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,VC=B.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,HC=B.div`
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
`,UC=B.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,WC=B.span`
  display: flex;
  gap: 4px;
`,GC=B.button`
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
`,KC=B.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,qC=B.div`
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
`,JC=B.span`
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
`,YC=B.span`
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
`,XC=B.div`
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
`,ZC=B.span`
  font-weight: 600;
  min-width: 0;
`,QC=B.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,$C=B.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,ew=B.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,tw=B.button`
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
`,nw=B.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,rw=B.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,iw=B.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,aw=B.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,ow=B($)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,sw=B.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,cw=(e,t)=>Math.min(100,Math.round(e/t*100)),lw=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=ai();return(0,V.jsxs)(rw,{children:[(0,V.jsx)(sw,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,V.jsxs)(V.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},uw=({name:e,icon:t,title:n})=>{let r=ai();return(0,V.jsxs)(sw,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},dw=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,V.jsxs)(ow,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:cw(r,n),$progressColor:t,children:[(0,V.jsx)(Zh,{children:s}),(0,V.jsx)(Qh,{children:c}),(0,V.jsx)(tg,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),fw=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,V.jsxs)(LC,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,V.jsxs)(qC,{$narrow:t,$wrap:r,children:[(0,V.jsxs)(ZC,{children:[s&&l&&!i&&(0,V.jsx)(tg,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,V.jsx)($C,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,V.jsx)(QC,{children:i})),o]}),s&&p&&(0,V.jsx)(JC,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,V.jsx)(YC,{$narrow:t,children:y}),s&&l&&(0,V.jsx)(tC,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,V.jsx)(XC,{$narrow:t,children:y})]})},pw=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],mw=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,hw=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,gw=e=>String(Number(e.toFixed(2))),_w=e=>`${Number((e/3600).toFixed(1))}h`,vw=e=>{let t=ms(e+1);if(t>1)return`${U(ms(e))} → ${U(t)} PP per extra digit`;let[n,r]=[ps(e),ps(e+1)];return`1 PP per ${U(n)} → ${U(r)} extra digit${r===1?``:`s`}`},yw=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,V.jsxs)(PC,{"aria-label":e,children:[(0,V.jsxs)(ew,{children:[(0,V.jsx)(ZC,{children:(0,V.jsxs)(tw,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,V.jsx)(QC,{children:t}),n]})}),r&&(0,V.jsx)(aw,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,V.jsx)(nw,{"aria-label":`${n} description`,children:i})]})},bw=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],xw=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=ai(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=K(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=Mo(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=hs(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=wa(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=!Ns(n)&&o>=2,T=Pa(n),E=Ia(T),D=_w(Fa(n)),O=_w(Fa({...n,sleepModeCapLevel:T+1})),k=_w(ze),A=!n.cacheWarmUnlocked&&o>=20,j=ja(n),M=Da({...n,playtimeBonusUnlocked:!0}),ee=Ee.some(e=>!!n.intro?.[e.autoFlagField]),N=n.computeAutoChargeEnabled??!0,te=n.intro?.computeAutoBoostEnabled??!0,ne={automation:xh(n)&&`automation perk available`,prestige:Sh(n)&&`prestige perk available`},re=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,V.jsx)(dw,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${U(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),F=e=>qo(n,e.id)?(0,V.jsxs)($,{"aria-label":`Start challenge ${Y_(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,V.jsxs)($,{"aria-label":`Challenge ${e.id} ${J_(e).toLowerCase()}`,disabled:!0,title:J_(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),ie=(e,t)=>{let r=Jo(e,t);return r&&!No(n,r.id)?r:null},ae=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=$p(e.id)&&r>=dm()&&!ie(`tierTickspeed`,e.id)&&!ie(`tierAutobuyer`,e.id)});return(0,V.jsxs)(TC,{children:[(0,V.jsxs)(EC,{children:[(0,V.jsx)(`h1`,{children:`Firmware`}),(0,V.jsxs)(DC,{"aria-label":`purge points display`,children:[`✦ `,U(o),` PP`]})]}),(0,V.jsx)(OC,{role:`tablist`,"aria-label":`firmware view`,children:pw.map(e=>(0,V.jsxs)(kC,{"aria-label":e.ariaLabel,"aria-selected":d===e.id,color:d===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,V.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),ne[e.id]&&(0,V.jsx)(AC,{"aria-label":ne[e.id]})]},e.id))}),d===`automation`&&(0,V.jsxs)(jC,{"aria-label":`automation firmware page`,children:[(0,V.jsxs)(MC,{"aria-label":`global automation category`,children:[(0,V.jsx)(NC,{children:`Global Automation`}),(0,V.jsx)(FC,{children:bw.map(e=>{let t=e.owned(n),i=e.enabled(n),a=lm(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=am(e.key),l=sm(e.key,o),u=Jo(`global`,e.key),d=u&&!No(n,u.id)?u:null;return(0,V.jsx)(fw,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,V.jsx)(lw,{current:s,milestone:Oo(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?F(d):re({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${U(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?hw(om(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${mw(om(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})})]}),(0,V.jsxs)(MC,{"aria-label":`tier autobuyers category`,children:[(0,V.jsx)(NC,{children:`Tier Autobuyers`}),ae?(0,V.jsx)(VC,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,V.jsxs)(HC,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,V.jsx)(UC,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,V.jsx)(IC,{tier:e})}),(0,V.jsxs)(WC,{children:[(0,V.jsx)(tg,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,V.jsx)(GC,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,V.jsx)(tg,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,V.jsx)(GC,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,V.jsxs)(zC,{children:[(0,V.jsxs)(BC,{"aria-hidden":`true`,children:[(0,V.jsx)(`span`,{children:`Tier`}),(0,V.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,V.jsx)(`span`,{children:`🤖 Buy`})]}),b.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=fa(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=$p(e.id),d=l>=Jp(e.id),f=a?Qp(n,e.id):1,p=nm(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=dm(),v=pm(g,e.id),y=ie(`tierTickspeed`,e.id),b=ie(`tierAutobuyer`,e.id);return(0,V.jsxs)(RC,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,V.jsx)(IC,{tier:e}),(0,V.jsx)(fw,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,V.jsx)(lw,{current:s,milestone:pa(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?F(y):re({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${U(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?hw(fm(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${mw(fm(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,V.jsx)(fw,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,V.jsx)(lw,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?F(b):re({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${U(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${U(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:hw(Xp(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${mw(Xp(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),ee&&(0,V.jsxs)(MC,{"aria-label":`power automation category`,children:[(0,V.jsx)(NC,{children:`Power Automation`}),(0,V.jsxs)(FC,{children:[ee&&(0,V.jsx)(fw,{ariaLabel:`auto-charge row`,enabled:N,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!N),owned:!0,statusTitle:N?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,V.jsx)(fw,{ariaLabel:`auto boost row`,enabled:te,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!te),owned:!0,statusTitle:te?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,V.jsxs)(LC,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,V.jsx)(qC,{children:(0,V.jsx)(ZC,{children:`Boost preset`})}),(0,V.jsx)(wC,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,V.jsxs)(MC,{"aria-label":`compute autobuyers category`,children:[(0,V.jsx)(NC,{children:`Compute Autobuyers`}),(0,V.jsx)(VC,{"aria-label":`compute autobuyer tiles`,role:`group`,children:ot.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=io(e.id);return(0,V.jsxs)(HC,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,V.jsx)(UC,{$dimmed:!t,children:(0,V.jsx)(IC,{tier:e})}),t?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(tg,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,V.jsx)(GC,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,V.jsx)(KC,{children:(0,V.jsx)(lw,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),d===`prestige`&&(0,V.jsxs)(jC,{"aria-label":`prestige firmware page`,children:[(0,V.jsxs)(MC,{"aria-label":`purge points category`,children:[(0,V.jsx)(NC,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,V.jsx)(iw,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,V.jsx)(yw,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${gw(S)}`:`Production ×1 → ×${gw(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,V.jsx)(uw,{icon:`🚀`,name:`Speed bonus`}):(0,V.jsx)(dw,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${U(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,V.jsx)(yw,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at ${Ie*100}% speed past 10 min). Each level adds ${k}: ${Be.map(e=>U(e)).join(` / `)} PP, up to ${_w(Le)}.`,icon:`😴`,name:`Sleep mode`,value:E===null?`Time away: up to ${D}`:`Time away: up to ${D} → ${O}`,children:E===null?(0,V.jsx)(uw,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,V.jsx)(dw,{ariaLabel:`Buy Sleep mode level ${T+1} for ${U(E)} Purge Points — +${k} of time away`,color:`#a78bfa`,cost:E,disabled:o<E,icon:`⏫`,label:`${U(E)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,V.jsx)(yw,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:vw(g),children:(0,V.jsx)(dw,{ariaLabel:`Buy Compression level ${g+1} for ${U(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${U(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,V.jsx)(yw,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${j.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${j.symbol} level 1 done`:`Start runs with ${j.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,V.jsx)(uw,{icon:`🔥`,name:`Cache Warm`}):(0,V.jsx)(dw,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!A,icon:`🔓`,label:`${U(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,V.jsx)(yw,{ariaLabel:`playtime bonus upgrade`,details:`+${We*100}% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${gw(M)}`:`+${We*100}% production per hour played`,children:n.playtimeBonusUnlocked?(0,V.jsx)(uw,{icon:`⏱`,name:`Playtime bonus`}):(0,V.jsx)(dw,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${U(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(0,V.jsx)(yw,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:Ao(n)?null:`Keep producing past 1 Googol Bytes`,children:Ao(n)?(0,V.jsx)(uw,{icon:`♾`,name:`Overflow mode`}):(0,V.jsx)(sw,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,V.jsxs)(MC,{"aria-label":`purchasing category`,children:[(0,V.jsx)(NC,{children:`Purchasing`}),(0,V.jsx)(yw,{ariaLabel:`buy mode toggle`,details:`Level (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Single: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Single they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,V.jsx)(xC,{game:e})}),(0,V.jsx)(yw,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. One-time purchase; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:Ns(n)?null:`Buy every affordable level in one tap`,children:Ns(n)?(0,V.jsx)(_C,{game:e}):(0,V.jsx)(dw,{ariaLabel:`Unlock Buy max for 2 Purge Points`,color:`#38bdf8`,cost:2,disabled:!w,icon:`🔓`,label:`${U(2)} PP`,onClick:r.buyBuyMaxUnlock,points:o,progressLabel:`Buy max unlock PP progress`})})]})]}),(0,V.jsx)(rb,{def:p?P.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},Sw=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),Cw=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),ww=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],Tw=e=>e&&Sw(e)&&Object.keys(e).some(e=>Cw.has(e)),Ew=e=>{if(!e||!Sw(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if(ww.some(t=>{let n=e[t];return n&&Sw(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:ww.some(t=>Tw(e[t]))?`legacy_tier_ids`:null},Dw=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],Ow=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],kw=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],Aw=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},jw=e=>{let t=Aw(e,Dw);return t.automationIntervalLevels&&=Aw(t.automationIntervalLevels,Ow),t.automationAttemptBudgets&&=Aw(t.automationAttemptBudgets,Ow),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>Aw(e,kw))}),t},Mw=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),Nw=e=>{let{saveSchemaVersion:t,...n}=e;return n},Pw=e=>{if(!Mw(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:Nw(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:jw(Nw(e))};let t=Ew(e);return t?{ok:!1,reason:t}:{ok:!0,payload:jw(e)}},Fw=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),Iw=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),Lw=()=>rT(),Rw=(e,t=Lw())=>{if(!t)return Pw(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:jw(r)}},zw=`tens_game_state`,Bw=`tens_last_save_timestamp`,Vw=`tens_saves_meta`,Hw=`tens_dev_mode_active`,Uw=`dev`,Ww=`tens_dev_state`,Gw=`tens_dev_timestamp`,Kw=`TENS-SUPPORT`,qw=e=>e===Uw?Ww:e===`0`?zw:`tens_slot_${e}_state`,Jw=e=>e===Uw?Gw:e===`0`?Bw:`tens_slot_${e}_timestamp`,Yw=e=>`Save ${e+1}`,Xw=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:Yw(0)}]}),Zw=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),Qw=()=>{try{let e=localStorage.getItem(Vw);return e?Iw(e):null}catch{return null}},$w=e=>{try{localStorage.setItem(Vw,JSON.stringify(e))}catch{}},eT=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:Yw(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},tT=e=>{let t=Xw();if(!Fw(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!Fw(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():Yw(n)})}return eT({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},nT=()=>{let e=tT(Qw());return $w(e),e},rT=()=>{try{return localStorage.getItem(Hw)===`1`}catch{return!1}},iT=e=>{try{e?localStorage.setItem(Hw,`1`):localStorage.removeItem(Hw)}catch{}},aT=()=>rT()?Uw:nT().activeSlotId,oT=(e=`code`)=>{let t=nT();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=eT({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return $w(n),{ok:!0,meta:n}},sT=e=>{try{return localStorage.getItem(qw(e))!=null}catch{return!1}},cT=()=>{let e=nT(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??Yw(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!sT(i)})}return t},lT=e=>{if(rT())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=nT(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return $w(i),{ok:!0,meta:i}},uT=(e,t)=>{let n=String(e),r=nT(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return $w(s),{ok:!0,meta:s}},dT=e=>Zw(e)===`TENS-SUPPORT`?oT(`code`):{ok:!1,reason:`invalid`},fT=()=>oT(`dummy_purchase`),pT=()=>{let e=nT();return e.slots.find(t=>t.id===e.activeSlotId)?.name??Yw(0)},mT=()=>{let e=nT(),t=pT(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},hT=()=>`Reformat Byte Foundry on "${pT()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,gT=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,_T=()=>`Erase ALL save progress on this device?\n\n${nT().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,vT=e=>{try{localStorage.removeItem(qw(e)),localStorage.removeItem(Jw(e))}catch{}},yT=e=>{if(rT())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=nT(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(vT(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},bT=()=>{if(rT())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)vT(String(e));return{ok:!0,meta:nT()}},xT=e=>{try{let t=aT(),n=(e??localStorage).getItem(qw(t));return n?Iw(n):null}catch{return null}},ST=()=>{let e=aT(),t=xT();if(!t)return null;let n=Rw(t);return n.ok?null:(vT(e),Lw()?null:n.reason)},CT=(e,t)=>({...e,...t??{}}),wT=e=>Fw(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),TT=e=>wT(e)&&Array.isArray(e.transfers)?e.transfers.length:0,ET=e=>{let t=e.deposits??{},n=R.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+TT(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},DT=(e,t)=>{let n=Ui(),r={};for(let e of Object.keys(n)){let i=t?.[e];if(wT(i)){n[e]={...n[e],...ET(i)};let t=TT(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},OT=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=ke[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},kT=e=>{let t=e,n=Wi(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=DT(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return Xo(ma(Bc(ao({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:CT(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:CT(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:CT(n.owned,t.owned),purchased:CT(n.purchased,t.purchased),purchaseLevels:CT(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:CT(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:CT(n.autobuyers,t.autobuyers),autobuyersEnabled:CT(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:CT(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:CT(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:CT(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:CT(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:CT(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:CT(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:CT(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:CT(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:CT(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:{...n.eonsUpgrades,...t.eonsUpgrades??{}},computeFlopsAutobuyers:CT(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:CT(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:CT(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:OT({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},AT=e=>{let t=aT();try{localStorage.setItem(qw(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem(Jw(t),String(Date.now()))}catch{}},jT=e=>{try{let t=xT(e);if(!t)return null;let n=Rw(t);return n.ok?kT(n.payload):null}catch{return null}},MT=()=>{let e=aT();try{let t=localStorage.getItem(Jw(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},NT=()=>{rT()?PT():yT(aT())},PT=()=>(vT(Uw),{ok:!0}),FT=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=Fw(i)&&Fw(a)?FT(a,i):i,n},{...e}),IT=(e,t)=>{if(!rT())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=Iw(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!Fw(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...Fw(t)?FT(t,n):n};try{localStorage.setItem(Ww,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=jT();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},LT=e=>JSON.stringify({saveSchemaVersion:3,...e}),RT=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(Wi(),e))||e.resources!==void 0&&!Fw(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},zT=e=>{let t;try{t=Iw(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!Fw(t))return{ok:!1,reason:`invalid_json`};let n=Rw(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!Lw()&&!RT(n.payload))return{ok:!1,reason:`invalid_state`};let r=kT(n.payload);return AT(r),{ok:!0,state:r}},BT=`tens_buy_max_mode`,VT=()=>{try{return localStorage.getItem(BT)===`true`}catch{return!1}},HT=e=>{try{localStorage.setItem(BT,e?`true`:`false`)}catch{}},UT=`tens_buy_unit_mode`,WT=()=>{try{return localStorage.getItem(UT)===`true`}catch{return!1}},GT=e=>{try{localStorage.setItem(UT,e?`true`:`false`)}catch{}},KT=`tens_theme_preference`,qT=()=>{try{let e=localStorage.getItem(KT);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},JT=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(KT,e)}catch{}},YT;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(YT||={});var XT=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},ZT=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,QT=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?ZT(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new XT(`"${e}" plugin is not implemented on ${c}`,YT.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new XT(`"${e}.${t}()" is not implemented on ${c}`,YT.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{let r=await n;g({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=XT,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},$T=(e=>e.Capacitor=QT(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),eE=$T.registerPlugin,tE=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new $T.Exception(e,YT.Unimplemented)}unavailable(e=`not available`){return new $T.Exception(e,YT.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},nE=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),rE=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),iE=class extends tE{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=rE(n).trim(),r=rE(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=nE(e.key),n=nE(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};eE(`CapacitorCookies`,{web:()=>new iE});var aE=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),oE=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},sE=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,cE=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=oE(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},lE=class extends tE{async request(e){let t=cE(e,e.webFetchExtra),n=sE(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await aE(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};eE(`CapacitorHttp`,{web:()=>new lE});var uE;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(uE||={});var dE;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(dE||={});var fE=class extends tE{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};eE(`SystemBars`,{web:()=>new fE});var pE=`https://mohanpednekar.github.io/tens/`,mE=`${pE}privacy.html`,hE=`${pE}terms.html`,gE=B(Ii)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,_E=B.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,vE=B.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,yE=B.input`
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
`,bE=B.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,xE=B.textarea`
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
`,SE={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},CE=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:SE[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,V.jsxs)(gE,{"aria-label":`manual save section`,children:[(0,V.jsx)(`h2`,{children:`Backup / Restore`}),(0,V.jsx)(xE,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,V.jsxs)(_E,{children:[(0,V.jsx)($,{onClick:o,type:`button`,children:(0,V.jsx)(eg,{children:`Copy save`})}),(0,V.jsx)($,{onClick:s,type:`button`,children:(0,V.jsx)(eg,{children:`Download file`})}),(0,V.jsx)($,{onClick:()=>a.current?.click(),type:`button`,children:(0,V.jsx)(eg,{children:`Choose file…`})}),(0,V.jsx)($,{onClick:()=>c(t),type:`button`,children:(0,V.jsx)(eg,{children:`Import`})}),(0,V.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,V.jsx)(bE,{$error:r.error,children:r.text})]})},wE=B.div`
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
`,TE=()=>(0,V.jsxs)(gE,{"aria-label":`legal section`,children:[(0,V.jsx)(`h2`,{children:`Legal`}),(0,V.jsxs)(wE,{children:[(0,V.jsx)(`a`,{href:mE,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,V.jsx)(`a`,{href:hE,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),EE={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},DE=({service:e=cv()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,V.jsxs)(gE,{"aria-label":`store section`,children:[(0,V.jsx)(`h2`,{children:`Store`}),(0,V.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,V.jsxs)(_E,{children:[(0,V.jsx)($,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),EE.removeAds),type:`button`,variant:`primary`,children:(0,V.jsx)(eg,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,V.jsx)($,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),EE.supportTip),type:`button`,variant:`neutral`,children:(0,V.jsx)(eg,{children:`Leave a tip`})}),(0,V.jsx)($,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,V.jsx)(eg,{children:`Restore purchases`})})]}),a&&(0,V.jsx)(bE,{$error:a.error,children:a.text})]})},OE=B.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,kE=B.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,AE=B(_E)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,jE=B.div`
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
`,ME=B.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,NE=B.li`
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
`,PE=B.svg`
  display: block;
  height: 64px;
  width: 100%;
`,FE=B.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,IE=B.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,LE=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},RE=B.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,zE=B.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,BE=({label:e,danger:t=!1,children:n})=>(0,V.jsxs)(`div`,{children:[(0,V.jsx)(RE,{$danger:t,children:e}),(0,V.jsx)(zE,{children:n})]}),VE=B.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,HE=pi`
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
`,UE=B.button`
  ${HE}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,WE=B.div`
  ${HE}
`,GE=B.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,KE=B.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,qE=B.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,JE=B.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,YE=B.div`
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
`,XE=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,V.jsx)(VE,{children:(0,V.jsxs)(WE,{$danger:r,children:[(0,V.jsx)(GE,{"aria-hidden":`true`,children:e}),(0,V.jsx)(KE,{children:t}),i]})}):(0,V.jsxs)(VE,{children:[(0,V.jsxs)(UE,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,V.jsx)(GE,{"aria-hidden":`true`,children:e}),(0,V.jsx)(KE,{children:t}),n!=null&&n!==``&&(0,V.jsx)(qE,{children:n}),(0,V.jsx)(JE,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,V.jsx)(YE,{children:a})]})},ZE=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=K(e.state),o=!!e.savesMeta?.supporterUnlocked,[s,c]=(0,v.useState)(``),[l,u]=(0,v.useState)(null),[d,f]=(0,v.useState)(!1),p=e.state.era?.count??0,m=e.state.eons?.balance??0,h=$a(e.state),g=eo(e.state),_=e.state.purge?.points??0,y=e=>e===1?`Kernel`:`Kernels`,b=e.state.prestigeMuseum??{history:[],pinnedIds:[]},x=new Set(b.pinnedIds??[]),S=b.history??[],C=S.filter(e=>x.has(e.id)),w=o?S:S.slice(0,1),T=t=>{t.preventDefault();let n=e.redeemUnlockCode(s);n.ok?(c(``),u({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):u({error:!0,text:`That code is not valid.`})},E=()=>{let t=e.purchaseSupporterDummy();u({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},D=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},O=t=>{a&&t.isActive||window.confirm(gT(t))&&e.clearSlot(t.id)},k=()=>{a||window.confirm(_T())&&e.eraseAllSaveProgress()},A=()=>{$a(e.state)&&(e.actions.eraAscend(),f(!1))},j=!!cv().iapAvailable,M=LE(e.opsSamples??[],`money`),ee=LE(e.opsSamples??[],`prestigePoints`);return(0,V.jsxs)(OE,{children:[(0,V.jsx)(kE,{children:(0,V.jsx)(`h1`,{children:`Settings`})}),(0,V.jsxs)(BE,{label:`Game`,children:[(0,V.jsx)(XE,{icon:`💛`,label:`Supporter`,value:o?`Unlocked`:`Free`,children:(0,V.jsxs)(gE,{"aria-label":`supporter pack section`,children:[(0,V.jsx)(`h2`,{children:`Supporter pack`}),(0,V.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),o?(0,V.jsxs)(bE,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(FE,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,V.jsx)(`code`,{children:Kw})]}),(0,V.jsxs)(vE,{onSubmit:T,children:[(0,V.jsx)(yE,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>c(e.target.value),placeholder:`Enter unlock code`,value:s}),(0,V.jsx)($,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,V.jsx)(eg,{children:`Redeem code`})})]}),(0,V.jsx)($,{"aria-label":`dummy supporter checkout`,onClick:E,type:`button`,variant:`neutral`,children:(0,V.jsx)(eg,{children:`Dummy checkout (free)`})})]}),l&&(0,V.jsx)(bE,{$error:l.error,children:l.text})]})}),(0,V.jsx)(XE,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,V.jsxs)(gE,{"aria-label":`save slots section`,children:[(0,V.jsx)(`h2`,{children:`Save slots`}),(0,V.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),!1,(e.saveSlots??[]).map(t=>(0,V.jsxs)(AE,{$active:t.isActive,children:[(0,V.jsxs)(jE,{children:[(0,V.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,V.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,V.jsxs)(_E,{children:[!t.isActive&&(0,V.jsx)($,{"aria-label":`switch to ${t.name}`,disabled:!1,onClick:()=>e.switchSaveSlot(t.id),title:void 0,type:`button`,variant:`primary`,children:(0,V.jsx)(eg,{children:`Play`})}),(0,V.jsx)($,{"aria-label":`rename ${t.name}`,onClick:()=>D(t),type:`button`,variant:`neutral`,children:(0,V.jsx)(eg,{children:`Rename`})}),(0,V.jsx)($,{"aria-label":`clear ${t.name}`,disabled:a&&t.isActive,onClick:()=>O(t),title:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,V.jsx)(eg,{children:`Clear…`})})]})]},t.id))]})}),(0,V.jsx)(XE,{icon:`⏻`,label:`Reboot`,value:`${m} ${y(m)}`,children:(0,V.jsxs)(gE,{"aria-label":`reboot section`,children:[(0,V.jsx)(`h2`,{children:`Reboot`}),(0,V.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,V.jsxs)(_E,{children:[(0,V.jsx)(`span`,{children:`Reboots`}),(0,V.jsx)(`strong`,{children:p})]}),(0,V.jsxs)(_E,{children:[(0,V.jsx)(`span`,{children:`Kernels`}),(0,V.jsxs)(`strong`,{children:[m,` `,y(m)]})]}),(0,V.jsx)(`p`,{children:h?`Ready — next Reboot awards ${g} ${y(g)}.`:`Requires 1 Googol PP unspent (you have ${U(_)} PP).`}),(0,V.jsx)($,{"aria-label":h?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!h,onClick:()=>f(!0),type:`button`,variant:`prestige`,children:(0,V.jsx)(eg,{children:`⏻ Reboot…`})})]})}),(0,V.jsx)(XE,{icon:`📜`,label:`System log`,value:o?`${S.length}`:`🔒`,children:(0,V.jsxs)(gE,{"aria-label":`system log section`,children:[(0,V.jsx)(`h2`,{children:`System log`}),o?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),C.length>0&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(FE,{children:`Pinned`}),(0,V.jsx)(ME,{"aria-label":`pinned purge entries`,children:C.map(t=>(0,V.jsxs)(NE,{children:[(0,V.jsxs)(`div`,{children:[(0,V.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,V.jsx)(`div`,{children:(0,V.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,ta(t.moneyBits)]})})]}),(0,V.jsx)($,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,V.jsx)(eg,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,V.jsx)(FE,{children:`Recent history`}),w.length===0?(0,V.jsx)(FE,{children:`No purges recorded yet.`}):(0,V.jsx)(ME,{"aria-label":`system log history`,children:w.map(t=>(0,V.jsxs)(NE,{children:[(0,V.jsxs)(`div`,{children:[(0,V.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,V.jsx)(`div`,{children:(0,V.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,$i(t.moneyBits)]})})]}),x.has(t.id)?(0,V.jsx)($,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,V.jsx)(eg,{children:`Unpin`})}):(0,V.jsx)($,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:x.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,V.jsx)(eg,{children:`Pin`})})]},t.id))})]}):(0,V.jsxs)(FE,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,S.length>0&&` Latest: Purge #${S[0].purgeNumber} (+${S[0].pointsAwarded} PP).`]})]})}),(0,V.jsx)(XE,{icon:`📈`,label:`Task Manager`,value:o?null:`🔒`,children:(0,V.jsxs)(gE,{"aria-label":`task manager section`,children:[(0,V.jsx)(`h2`,{children:`Task Manager`}),o?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,ta(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,V.jsx)(FE,{children:`Bits`}),(0,V.jsx)(PE,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,V.jsx)(`path`,{d:M||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,V.jsx)(FE,{children:`Purge Points`}),(0,V.jsx)(PE,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,V.jsx)(`path`,{d:ee||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,V.jsx)(FE,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,V.jsxs)(BE,{label:`Data`,children:[!1,(0,V.jsx)(XE,{icon:`🗄`,label:`Backup / Restore`,children:(0,V.jsx)(CE,{game:e})}),j&&(0,V.jsx)(XE,{icon:`🛒`,label:`Store`,children:(0,V.jsx)(DE,{})}),(0,V.jsx)(XE,{icon:`ℹ`,label:`About`,children:(0,V.jsxs)(gE,{"aria-label":`about section`,children:[(0,V.jsx)(`h2`,{children:`About`}),(0,V.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,V.jsx)(XE,{icon:`⚖`,label:`Legal`,children:(0,V.jsx)(TE,{})})]}),(0,V.jsx)(BE,{label:`Display`,children:(0,V.jsx)(XE,{icon:`🎨`,inline:(0,V.jsx)(IE,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,V.jsx)($,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,V.jsx)(eg,{children:t})},e))}),label:`Theme`})}),(0,V.jsx)(BE,{danger:!0,label:`Danger zone`,children:(0,V.jsx)(XE,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,V.jsxs)(gE,{"aria-label":`danger zone`,children:[(0,V.jsx)(`h2`,{children:`Danger zone`}),(0,V.jsxs)(`p`,{children:[`Erase the `,(0,V.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,V.jsxs)($,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,V.jsx)(eg,{children:`↺ Reset active save…`}),(0,V.jsx)(tg,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,V.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,V.jsxs)($,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,V.jsx)(eg,{children:`↺ Reformat Byte Foundry…`}),(0,V.jsx)(tg,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,V.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,V.jsx)($,{"aria-label":`Erase all save progress`,disabled:a||!1,onClick:k,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,V.jsx)(eg,{children:`Erase all save progress…`})})]})})}),(0,V.jsxs)(b_,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>f(!1),onConfirm:A,open:d,title:`Reboot?`,children:[(0,V.jsxs)(`p`,{children:[`Awards `,g,` `,y(g),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,V.jsxs)(`p`,{children:[(0,V.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,V.jsxs)(`p`,{children:[(0,V.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},QE=2**53-1,$E=e=>e?xs:QE,eD=2,tD=(e,t,n=QE)=>{let r=e>0?ws(e,Fa(t)):0;return r<=0?null:{state:Ts(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:Fa(t)}:null}},nD=()=>{nT();let e=ST(),t=jT();if(!t)return{state:Wi(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=MT(),r=tD(n?(Date.now()-n)/1e3:0,t,$E(WT()))??{state:t,offlineProgress:null};return{...r,state:Ba(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},rD=()=>{let[e]=(0,v.useState)(nD),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>nT()),[l,u]=(0,v.useState)(()=>cT()),[d,f]=(0,v.useState)(()=>rT()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(nT()),u(cT())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>eD){let r=Fa(y.current),a=ws(t,r);if(a>0){n(e=>Ts(t,$E(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=Cs(r,$E(D.current))(e);return document.visibilityState===`visible`?Ra(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>f_(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{AT(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,Ve);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)(VT),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,HT(!!e),S(!!e)},[]),[T,E]=(0,v.useState)(WT),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,GT(!!e),E(!!e)},[]),k=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&Ns(n)?t:e)(n));return{buyTierQuantity:t=>D.current?n(e=>Ms(t,1)(e)):e(Ms(t,QE),zs(t)),buyTickspeedMultiplier:t=>e(Kp(t),Fs(Kp(t))),buyAutobuyerIntervalUpgrade:e=>n(rm(e)),buyAutomationIntervalUpgrade:e=>n(um(e)),buyTierTickspeedIntervalUpgrade:e=>n(mm(e)),setAutoOverclockEnabled:e=>n(gm(e)),startComputeCharge:e=>n(Md(e)),setComputeAutoChargeEnabled:e=>n(hm(e)),buyGlobalTickspeedMultiplier:()=>e(ym,Fs(ym)),buyPlaytimeBonus:()=>n(Oa),buyBuyMaxUnlock:()=>n(ka),buyCacheWarm:()=>n(Aa),buySleepModeCapUpgrade:()=>e(La,Fs(La)),buyPrestigeSpeedBonus:()=>n(Ea),buyPrestigeDoublePp:()=>e(go,Fs(go)),buyComputeFlopsTier:t=>e(Ka(t),Fs(Ka(t))),buyHyperscaler:()=>n(ro),eraAscend:()=>n(ho),enterChallenge:e=>n(Dm(e)),exitChallenge:()=>n(Om),purge:()=>n(Em),dailyStart:e=>n(c_(e,Date.now())),dailyForfeit:e=>n(l_(e)),dailyRestart:e=>n(d_(e,Date.now())),dailyPlay:(e,t,r)=>n(p_(e,t,r,Date.now())),scaleUp:()=>n(Pm),overclock:()=>n(Fm),setComputeAutoBoostEnabled:e=>n(Rp(e)),setComputeAutoBoostType:e=>n(zp(e)),consumeXpForLastTierTickspeed:e=>n(Hm(e)),setAutoScaleUpEnabled:e=>n(Bm(e)),setAutoXpTickspeedEnabled:e=>n(zm(e)),setAutoGlobalTickspeedEnabled:e=>n(Vm(e)),setAutoPurgeEnabled:e=>n(vm(e)),setAutobuyerEnabled:(e,t)=>n(Vp(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(_m(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(oo(e,t)),tapIntroBit:()=>n(cc),tapPoolBuffer:e=>n(Lc(e)),combineIntroByte:()=>n(lc),pickIntroCapacityMilestone:()=>n(tl),queueIntroSpeedUpgrade:()=>n($c),unlockNextDiskSize:()=>n(Bl),clearIntroCapacityUpgradeQueue:()=>n(il),convertIntroBitsToKilobytes:()=>n(Al),provisionDisk:()=>n(tu),queueDiskBuild:()=>n(nu),clearDiskBuildQueue:()=>n(ru),expediteDiskFill:e=>n(wu(e)),doubleDataLakeCapacity:e=>n(df(e)),activateComputeBoost:(e,t)=>n(Fp(e,t)),stackComputeBoost:e=>n(Ip(e)),reclaimComputeBoost:e=>n(Mp(e)),forfeitComputeBoost:e=>n(Pp(e)),mergeComputeCoresIntoNode:()=>n(mf),mergeComputeNodesIntoCluster:()=>n(hf),mergeComputeClustersIntoNetwork:()=>n(gf),mergeComputeNetworksIntoGrid:()=>n(_f),mergeComputeGridsIntoFabric:()=>n(vf),mergeComputeFabricsIntoCloud:()=>n(yf),mergeComputeCloudsIntoDatacenter:()=>n(bf),mergeComputeDatacentersIntoSupercomputer:()=>n(xf),mergeComputeSupercomputersIntoMegacomputer:()=>n(Sf),enableAutoMergeCoresIntoNode:()=>n(Nf),enableAutoMergeNodesIntoCluster:()=>n(Lf),enableAutoMergeClustersIntoNetwork:()=>n(Vf),enableAutoMergeNetworksIntoGrid:()=>n(Wf),enableAutoMergeGridsIntoFabric:()=>n(Jf),enableAutoMergeFabricsIntoCloud:()=>n(Qf),enableAutoMergeCloudsIntoDatacenter:()=>n(np),enableAutoMergeDatacentersIntoSupercomputer:()=>n(op),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(up),startComputeCoresMerge:()=>n(Ff),startComputeNodesMerge:()=>n(zf),startComputeClustersMerge:()=>n(Hf),startComputeNetworksMerge:()=>n(Kf),startComputeGridsMerge:()=>n(Xf),startComputeFabricsMerge:()=>n(ep),startComputeCloudsMerge:()=>n(ip),startComputeDatacentersMerge:()=>n(cp),startComputeSupercomputersMerge:()=>n(fp),startDataLakeAutoConvert:e=>n(qd(e)),flushStoragePool:e=>n(Kd(e)),pinMuseumEntry:e=>n(Am(e)),unpinMuseumEntry:e=>n(jm(e))}},[]),A=(0,v.useCallback)(()=>{NT(),_(null),n(Wi()),i(null),o(null),m([]),b()},[b]),j=(0,v.useCallback)(()=>{n(Tm)},[]),M=(0,v.useCallback)(e=>{let t=yT(e);return t.ok&&(t.clearedActive&&(_(null),n(Wi()),i(null),o(null),m([])),b()),t},[b]),ee=(0,v.useCallback)(()=>{let e=bT();return e.ok&&(_(null),n(Wi()),i(null),o(null),m([]),b()),e},[b]),N=(0,v.useCallback)(()=>i(null),[]),P=(0,v.useRef)(new WeakSet),te=(0,v.useCallback)(e=>!e||e.rewardClaimed||P.current.has(e)?!1:(P.current.add(e),n(t=>Ds(e.elapsedRealSeconds,$E(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+Es(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),ne=(0,v.useCallback)(()=>o(null),[]),re=(0,v.useCallback)(e=>{AT(y.current);let t=lT(e);if(!t.ok)return t;if(t.already)return b(),t;let r=ST(),a=jT()??Wi(),s=MT(),c=tD(s?(Date.now()-s)/1e3:0,a,$E(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),F=(0,v.useCallback)(()=>{AT(y.current);let e=!rT();iT(e),f(e);let t=ST(),r=jT();_(r),n(r??Wi()),i(null),o(t),m([]),b()},[b]),ie=(0,v.useCallback)(()=>{rT()&&(PT(),_(null),n(Wi()),i(null),o(null),m([]))},[]),ae=(0,v.useCallback)(e=>{let t=IT(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),oe=(0,v.useCallback)(e=>{rT()&&n(t=>Bc(e(t)))},[]),se=(0,v.useCallback)(()=>LT(y.current),[]),ce=(0,v.useCallback)(e=>{let t=zT(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),le=(0,v.useCallback)((e,t)=>{let n=uT(e,t);return n.ok&&b(),n},[b]),ue=(0,v.useCallback)(e=>{let t=dT(e);return t.ok&&b(),t},[b]);return{actions:k,applyCloudSave:ce,applyDevStateJson:ae,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:te,clearSlot:M,devModeActive:d,dismissIncompatibleSaveNotice:ne,dismissOfflineProgress:N,eraseAllSaveProgress:ee,exportSaveJson:se,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=fT();return e.ok&&b(),e},[b]),redeemUnlockCode:ue,renameSaveSlot:le,resetByteFoundry:j,resetDevState:ie,resetGame:A,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:oe,state:t,switchSaveSlot:re,toggleDevMode:F}},iD=_i`
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
`,aD={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},oD={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},sD={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},cD={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},lD={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},uD={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},dD={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},fD={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},pD=[`dark`,`light`],mD=`dark`,hD=e=>{let t=pD.includes(e)?e:mD;return{mode:t,color:aD[t],shadow:oD[t],tierAccents:sD[t],space:cD,radius:lD,motion:uD,font:dD,type:fD}},gD={dark:hD(`dark`),light:hD(`light`)},_D=()=>typeof window>`u`||typeof window.matchMedia!=`function`?mD:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,vD=e=>e===`light`||e===`dark`?e:_D(),yD=({mode:e=mD,children:t})=>(0,V.jsx)(oi,{theme:gD[e]??gD.dark,children:t}),bD=()=>vD(qT()),xD=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`settings`,`dev`]),SD=B.div`
  padding-bottom: ${Hh};
`;function CD(){let e=rD(),[t,n]=(0,v.useState)(qT),[r,i]=(0,v.useState)(bD),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!xD.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=ff(e.state),b=za(e.state),x=h,S=h&&Ps(e.state),C=S,w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{K(e.state)||window.confirm(mT())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{K(e.state)||window.confirm(hT())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(vD(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{JT(e),n(e),i(vD(e))},O;O=g?(0,V.jsx)(dS,{focusNonce:p,game:e}):a===`info`?(0,V.jsx)(cC,{}):a===`boosters`?(0,V.jsx)(eC,{game:e}):a===`compute`?(0,V.jsx)(ES,{game:e}):a===`perks`&&S?(0,V.jsx)(xw,{focusNonce:l,game:e}):a===`challenges`&&C?(0,V.jsx)(ub,{focusNonce:d,game:e}):a===`milestones`?(0,V.jsx)(gC,{game:e}):a===`achievements`&&le.enabled?(0,V.jsx)($m,{game:e}):a===`dev`?(0,V.jsx)(_y,{game:e}):a===`settings`?(0,V.jsx)(ZE,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,V.jsx)(_y,{game:e});let k=Nh(e.state);return(0,V.jsxs)(yD,{mode:r,children:[(0,V.jsx)(iD,{}),(0,V.jsx)(SD,{children:O}),(0,V.jsx)(Vh,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,V.jsx)(Fi,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,V.jsx)(ki,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,V.jsx)(og,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})}var wD=`modulepreload`,TD=function(e){return`/tens/`+e},ED={},DD=function(e){return e.pathname.endsWith(`.css`)},OD=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},kD=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=TD(t,n);let r=s(t),i=DD(r);return OD(ED,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:wD,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},AD=e=>{e&&e instanceof Function&&kD(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},jD=document.getElementById(`root`);if(!jD)throw Error(`Root element not found`);(0,y.createRoot)(jD).render((0,V.jsx)(v.StrictMode,{children:(0,V.jsx)(CD,{})})),AD();